import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import Parser from 'rss-parser';
import { DateTime } from 'luxon';
import matter from 'gray-matter';

const TZ = process.env.TZ || 'Asia/Singapore';
const endDate = process.env.END_DATE
  ? DateTime.fromISO(process.env.END_DATE, { zone: TZ })
  : DateTime.now().setZone(TZ);

if (!endDate.isValid) throw new Error(`Invalid END_DATE: ${process.env.END_DATE}`);

const days = Number(process.env.DAYS || 7);
const startDate = endDate.minus({ days: days - 1 }).startOf('day');
const endOfWindow = endDate.endOf('day');

const FEEDS_YML = path.resolve('config/feeds.yml');
const contentRoot = path.resolve('content');

const CONCURRENCY = Number(process.env.CONCURRENCY || 25);
const MAX_ITEMS_PER_FEED = Number(process.env.MAX_ITEMS_PER_FEED || 15);

// Remove feeds that are clearly invalid (404/410 or not RSS/Atom).
const PRUNE_INVALID = String(process.env.PRUNE_INVALID || 'false').toLowerCase() === 'true';
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || 12000);

function normalizeUrl(u) {
  if (!u) return null;
  try {
    return new URL(u).toString();
  } catch {
    return null;
  }
}

function stripHtml(html) {
  if (!html) return '';
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractFirstImg(html) {
  if (!html) return null;
  const m = String(html).match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  return m ? normalizeUrl(m[1]) : null;
}

function pickImage(item) {
  const enc = item?.enclosure?.url ? normalizeUrl(item.enclosure.url) : null;
  if (enc && /\.(png|jpe?g|webp|gif)(\?|$)/i.test(enc)) return enc;

  const mediaUrl =
    normalizeUrl(item?.['media:content']?.url) ||
    normalizeUrl(item?.['media:thumbnail']?.url);
  if (mediaUrl) return mediaUrl;

  return extractFirstImg(item?.content) || extractFirstImg(item?.summary);
}

function pickDescription(item) {
  const snippet = item?.contentSnippet ? String(item.contentSnippet).trim() : '';
  if (snippet) return snippet;
  const content = stripHtml(item?.content);
  if (content) return content;
  const summary = stripHtml(item?.summary);
  if (summary) return summary;
  return '';
}

function truncate(s, n = 260) {
  const t = String(s || '').trim();
  if (!t) return '';
  if (t.length <= n) return t;
  const cut = t.slice(0, n);
  const idx = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  return (idx > 80 ? cut.slice(0, idx + 1) : cut).trim() + '…';
}

async function fetchWithTimeout(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'user-agent': 'SwiftVietnam-Digest/1.0 (+https://github.com/SwiftVietnam/SwiftVietnam)',
        accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*;q=0.5'
      }
    });
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function mapLimit(items, limit, fn) {
  const ret = [];
  const executing = new Set();
  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item));
    ret.push(p);

    // Ensure throttling doesn't throw on rejection.
    const pHandled = p.catch(() => undefined);
    executing.add(pHandled);
    const clean = () => executing.delete(pHandled);
    pHandled.then(clean, clean);

    if (executing.size >= limit) await Promise.race(executing);
  }
  return Promise.allSettled(ret);
}

const parser = new Parser();

const feedsRaw = await fs.readFile(FEEDS_YML, 'utf8');
const feedsDoc = YAML.parse(feedsRaw);
if (!feedsDoc || !Array.isArray(feedsDoc.feeds)) throw new Error('Invalid feeds.yml');

const feeds = feedsDoc.feeds
  .filter((f) => f?.enabled === true && f?.rss)
  .map((f) => ({
    id: f.id,
    name: f.name || f.id,
    site: f.site || null,
    rss: normalizeUrl(f.rss),
    priority: Number(f.priority || 9)
  }))
  .filter((f) => f.rss);

console.log(`Crawling ${feeds.length} feeds once and grouping items into ${days} days (${TZ})`);
console.log(`Window: ${startDate.toISO()} → ${endOfWindow.toISO()}`);

// Group items by ISO date
const byDay = new Map();
const invalidFeeds = [];

// De-dupe across all feeds + days in this run
const globalSeenUrl = new Set();

const settled = await mapLimit(feeds, CONCURRENCY, async (feed) => {
  let res;
  try {
    res = await fetchWithTimeout(feed.rss);
  } catch {
    // transient network/TLS error
    return;
  }

  if (res.status === 404 || res.status === 410) {
    invalidFeeds.push({ rss: feed.rss, reason: `HTTP ${res.status}`, name: feed.name, id: feed.id });
    return;
  }

  if (!res.ok) {
    // transient
    return;
  }

  const xml = await res.text();
  if (!/(<rss|<feed|<rdf:rdf)\b/i.test(xml.slice(0, 4096))) {
    invalidFeeds.push({ rss: feed.rss, reason: 'Not RSS/Atom', name: feed.name, id: feed.id });
    return;
  }

  const parsed = await parser.parseString(xml);
  const items = (parsed.items || []).slice(0, MAX_ITEMS_PER_FEED);

  for (const item of items) {
    // date
    let dt = null;
    if (item?.isoDate) {
      const d = DateTime.fromISO(item.isoDate);
      if (d.isValid) dt = d;
    }
    if (!dt && item?.pubDate) {
      const d = DateTime.fromJSDate(new Date(item.pubDate));
      if (d.isValid) dt = d;
    }
    if (!dt) continue;

    const zdt = dt.setZone(TZ);
    if (zdt < startDate || zdt > endOfWindow) continue;

    const day = zdt.toISODate();
    const url = normalizeUrl(item.link);
    if (!url) continue;

    // Deduplicate across feeds so we don't show the same URL multiple times
    if (globalSeenUrl.has(url)) continue;
    globalSeenUrl.add(url);

    const rec = {
      title: (item.title || '').replaceAll('\n', ' ').trim(),
      url,
      description: truncate(pickDescription(item)),
      image: pickImage(item),
      publishedAt: zdt.toISO(),
      source: feed.name,
      sourceRss: feed.rss
    };

    const arr = byDay.get(day) || [];
    arr.push(rec);
    byDay.set(day, arr);
  }
});

const rejected = settled.filter((s) => s.status === 'rejected');
if (rejected.length) {
  console.log(`Feed crawl errors (transient): ${rejected.length}`);
}

// Prune invalid feeds if requested
if (PRUNE_INVALID && invalidFeeds.length) {
  const invalidSet = new Set(invalidFeeds.map((f) => f.rss));
  feedsDoc.feeds = feedsDoc.feeds.filter((f) => !invalidSet.has(normalizeUrl(f.rss)));
  await fs.writeFile(FEEDS_YML, YAML.stringify(feedsDoc), 'utf8');
  console.log(`Pruned invalid feeds from feeds.yml: ${invalidFeeds.length}`);
}

function dayPath(dayISO) {
  const dt = DateTime.fromISO(dayISO, { zone: TZ });
  return path.join(
    contentRoot,
    dt.toFormat('yyyy'),
    dt.toFormat('LL'),
    dt.toFormat('dd'),
    'content.md'
  );
}

function toMarkdownList(items) {
  // Deduplicate by url
  const seen = new Set();
  const deduped = [];
  for (const it of items) {
    if (seen.has(it.url)) continue;
    seen.add(it.url);
    deduped.push(it);
  }

  // Sort newest first
  deduped.sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));

  return deduped
    .map((it) => {
      const line = it.description
        ? `- **${it.title}** — ${it.description} [Source](${it.url})`
        : `- **${it.title}** — [Source](${it.url})`;
      if (it.image) return `${line}\n  ![](${it.image})`;
      return line;
    })
    .join('\n');
}

for (let i = 0; i < days; i++) {
  const day = startDate.plus({ days: i }).toISODate();
  const outPath = dayPath(day);
  await fs.mkdir(path.dirname(outPath), { recursive: true });

  const mdItems = byDay.get(day) || [];

  const fm = {
    date: day,
    timezone: TZ,
    title: `SwiftVietnam Daily — ${DateTime.fromISO(day, { zone: TZ }).toFormat('LLL d, yyyy')}`,
    summary: 'Auto-collected links from RSS feeds.',
    sources: ['rss'],
    tags: []
  };

  const body = `## Links (auto-collected candidates)\n\n${
    mdItems.length ? toMarkdownList(mdItems) : '_No items found._'
  }\n`;

  const next = matter.stringify(body + '\n', fm);
  await fs.writeFile(outPath, next, 'utf8');
}

console.log(`Done. Wrote daily markdown for ${days} days under newsletter/content/`);
