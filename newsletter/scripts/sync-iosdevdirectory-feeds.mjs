import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

const BLOGS_JSON_URL =
  'https://raw.githubusercontent.com/daveverwer/iOSDevDirectory/main/blogs.json';

const FEEDS_YML = path.resolve('config/feeds.yml');

const MAX_CHECK = Number(process.env.MAX_CHECK || 300); // validate this many candidate feeds
const CONCURRENCY = Number(process.env.CONCURRENCY || 16);
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || 7000);

const ENABLE_NEW = String(process.env.ENABLE_NEW || 'false').toLowerCase() === 'true';
const DISABLE_TAG = (process.env.DISABLE_TAG || 'iosfeeds').trim();

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

async function fetchWithTimeout(url, accept) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'user-agent': 'SwiftVietnam-Digest/1.0 (+https://github.com/SwiftVietnam/SwiftVietnam)',
        accept
      }
    });
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function isValidFeed(url) {
  try {
    const res = await fetchWithTimeout(
      url,
      'application/rss+xml, application/atom+xml, application/xml, text/xml, */*;q=0.5'
    );
    if (!res.ok) return false;
    const text = (await res.text()).slice(0, 4096);
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

// Load feeds.yml
const feedsRaw = await fs.readFile(FEEDS_YML, 'utf8');
const feedsDoc = YAML.parse(feedsRaw) || { version: 1, feeds: [] };
feedsDoc.feeds = Array.isArray(feedsDoc.feeds) ? feedsDoc.feeds : [];

// Optionally disable a tag (e.g., previous iosfeeds auto-import)
if (DISABLE_TAG) {
  for (const f of feedsDoc.feeds) {
    const tags = Array.isArray(f.tags) ? f.tags : [];
    if (tags.includes(DISABLE_TAG)) {
      f.enabled = false;
    }
  }
}

const existingByRss = new Map(
  feedsDoc.feeds
    .filter((f) => f?.rss)
    .map((f) => [normalizeUrl(f.rss), f])
);

// Fetch upstream blogs.json and flatten sites
const res = await fetchWithTimeout(BLOGS_JSON_URL, 'application/json');
if (!res.ok) throw new Error(`Failed to fetch blogs.json: ${res.status}`);
const directoryJson = await res.json();

const sites = [];
for (const lang of directoryJson || []) {
  for (const cat of lang?.categories || []) {
    for (const s of cat?.sites || []) {
      const rss = normalizeUrl(s.feed_url || s.rss_url || s.feed || s.rss);
      const site = normalizeUrl(s.site_url || s.url);
      const name = (s.title || s.name || '').trim();
      if (!rss) continue;

      sites.push({
        name: name || rss,
        author: s.author || null,
        rss,
        site,
        language: lang?.language || null,
        category: cat?.title || null,
        categorySlug: cat?.slug || null
      });
    }
  }
}

// Apply basic noise filters (Swift Evolution commits)
const filtered = sites.filter(
  (s) => !/github\.com\/swiftlang\/swift-evolution\/commits\/.*\.atom/i.test(s.rss)
);

// Dedupe by rss
const seen = new Set();
const unique = [];
for (const s of filtered) {
  if (seen.has(s.rss)) continue;
  seen.add(s.rss);
  unique.push(s);
}

const toCheck = unique.slice(0, MAX_CHECK);
console.log(`iOSDevDirectory: ${unique.length} RSS feeds found. Validating first ${toCheck.length}...`);

const checked = await mapLimit(toCheck, CONCURRENCY, async (s) => {
  const ok = await isValidFeed(s.rss);
  return ok ? s : null;
});

const valid = checked.filter(Boolean);
console.log(`Valid RSS feeds: ${valid.length}`);

let added = 0;
for (const v of valid) {
  if (existingByRss.has(v.rss)) continue;

  const id = `iosdev-${slugify(v.name) || slugify(v.rss)}`;
  feedsDoc.feeds.push({
    id,
    name: v.name,
    site: v.site || undefined,
    rss: v.rss,
    enabled: ENABLE_NEW,
    priority: 5,
    tags: ['iosdevdirectory', v.categorySlug].filter(Boolean),
    author: v.author || undefined
  });
  added++;
}

feedsDoc.feeds.sort((a, b) => {
  const pa = Number(a.priority || 9);
  const pb = Number(b.priority || 9);
  if (pa !== pb) return pa - pb;
  return String(a.name || a.id).localeCompare(String(b.name || b.id));
});

await fs.writeFile(FEEDS_YML, YAML.stringify(feedsDoc), 'utf8');
console.log(`Updated feeds.yml. Added ${added} new feeds (enabled: ${ENABLE_NEW}).`);
