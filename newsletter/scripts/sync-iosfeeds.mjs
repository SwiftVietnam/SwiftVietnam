import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import * as cheerio from 'cheerio';

const IOSFEEDS_URL = 'https://iosfeeds.com/feeds';
const FEEDS_YML = path.resolve('config/feeds.yml');

const MAX_CHECK = Number(process.env.MAX_CHECK || 250); // safety cap
const CONCURRENCY = Number(process.env.CONCURRENCY || 12);
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || 6000);

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

function normalizeUrl(u) {
  if (!u) return null;
  try {
    return new URL(u).toString();
  } catch {
    return null;
  }
}

async function fetchWithTimeout(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'user-agent': 'SwiftVietnam-Digest/1.0 (+https://github.com/SwiftVietnam/SwiftVietnam)',
        accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, text/html;q=0.8, */*;q=0.5'
      }
    });
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function isValidFeed(url) {
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) return false;
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    // read a small chunk
    const text = (await res.text()).slice(0, 4096);
    if (ct.includes('xml') || ct.includes('rss') || ct.includes('atom')) {
      return /<(rss|feed|rdf:rdf)\b/i.test(text);
    }
    // some servers mislabel; fallback sniff
    return /<(rss|feed|rdf:rdf)\b/i.test(text);
  } catch {
    return false;
  }
}

async function mapLimit(items, limit, fn) {
  const ret = [];
  const executing = new Set();
  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item));
    ret.push(p);
    executing.add(p);
    const clean = () => executing.delete(p);
    p.then(clean, clean);
    if (executing.size >= limit) await Promise.race(executing);
  }
  return Promise.all(ret);
}

// Load existing feeds.yml
const feedsRaw = await fs.readFile(FEEDS_YML, 'utf8');
const feedsDoc = YAML.parse(feedsRaw) || { version: 1, feeds: [] };
feedsDoc.feeds = Array.isArray(feedsDoc.feeds) ? feedsDoc.feeds : [];

const existingByRss = new Map(
  feedsDoc.feeds
    .filter((f) => f?.rss)
    .map((f) => [normalizeUrl(f.rss), f])
);

// Fetch iosfeeds page
const pageRes = await fetchWithTimeout(IOSFEEDS_URL);
if (!pageRes.ok) throw new Error(`Failed to fetch ${IOSFEEDS_URL}: ${pageRes.status}`);
const html = await pageRes.text();
const $ = cheerio.load(html);

// iosfeeds markup changes over time; this heuristic looks for headings followed by links.
const candidates = [];
$('a').each((_, el) => {
  const href = normalizeUrl($(el).attr('href'));
  if (!href) return;
  // keep only plausible feed urls
  if (!/(feed|rss|atom|\.xml|\.rss)(\b|\?|$)/i.test(href)) return;

  // try to find a nearby heading text
  const name =
    $(el).closest('div').find('h5,h4,h3').first().text().trim() ||
    $(el).parent().prevAll('h5,h4,h3').first().text().trim() ||
    $(el).text().trim();

  candidates.push({ name: name || href, rss: href });
});

// De-dupe
const seen = new Set();
const unique = [];
for (const c of candidates) {
  if (seen.has(c.rss)) continue;
  seen.add(c.rss);
  unique.push(c);
}

// Cap checks
const toCheck = unique.slice(0, MAX_CHECK);

console.log(`Found ${unique.length} candidate feed URLs on iosfeeds.com; validating first ${toCheck.length}...`);

const validated = await mapLimit(toCheck, CONCURRENCY, async (c) => {
  const ok = await isValidFeed(c.rss);
  return ok ? c : null;
});

const valid = validated.filter(Boolean);
console.log(`Valid feeds: ${valid.length}`);

let added = 0;
for (const v of valid) {
  if (existingByRss.has(v.rss)) continue;
  const id = `iosfeeds-${slugify(v.name) || slugify(v.rss)}`;
  feedsDoc.feeds.push({
    id,
    name: v.name,
    rss: v.rss,
    enabled: true,
    priority: 5,
    tags: ['iosfeeds']
  });
  added++;
}

// Sort by priority then name
feedsDoc.feeds.sort((a, b) => {
  const pa = Number(a.priority || 9);
  const pb = Number(b.priority || 9);
  if (pa !== pb) return pa - pb;
  return String(a.name || a.id).localeCompare(String(b.name || b.id));
});

await fs.writeFile(FEEDS_YML, YAML.stringify(feedsDoc), 'utf8');
console.log(`Updated feeds.yml. Added ${added} new feeds (enabled: true, priority: 5).`);
console.log(`Tip: rerun with MAX_CHECK=1000 to validate more, or lower enabled feeds to reduce volume.`);
