import fs from 'node:fs/promises';
import path from 'node:path';
import Parser from 'rss-parser';
import { DateTime } from 'luxon';
import YAML from 'yaml';

const CONFIG_PATH = process.env.CONFIG || path.resolve('config/content-sources.yml');

const DATA_DIR = path.resolve('data/iosdevdirectory');
const SOURCES_PATH = path.join(DATA_DIR, 'sources.json');
const OUT_DIR = path.resolve('data/daily');

let config = null;
try {
  const raw = await fs.readFile(CONFIG_PATH, 'utf8');
  config = YAML.parse(raw);
} catch {
  config = null;
}

const TZ = process.env.TZ || config?.timezone || 'Asia/Singapore';

const parser = new Parser({
  timeout: 20_000,
  headers: {
    'user-agent': 'SwiftVietnam-Digest/1.0 (+https://github.com/SwiftVietnam/SwiftVietnam)'
  }
});

function isoDayFolder(dt) {
  return dt.toFormat('yyyy/LL/dd');
}

function safeDate(d) {
  if (!d) return null;
  const dt = DateTime.fromJSDate(d);
  return dt.isValid ? dt : null;
}

function itemDate(item) {
  // rss-parser provides isoDate (string) sometimes.
  if (item?.isoDate) {
    const dt = DateTime.fromISO(item.isoDate);
    if (dt.isValid) return dt;
  }
  return safeDate(item?.pubDate ? new Date(item.pubDate) : null);
}

function normalizeUrl(u) {
  if (!u) return null;
  try {
    return new URL(u).toString();
  } catch {
    return null;
  }
}

// Limit concurrency to avoid hammering feeds.
async function mapLimit(items, limit, fn) {
  const ret = [];
  const executing = new Set();
  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item));
    ret.push(p);
    executing.add(p);
    const clean = () => executing.delete(p);
    p.then(clean, clean);
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }
  return Promise.allSettled(ret);
}

const runDate = process.env.DATE
  ? DateTime.fromISO(process.env.DATE, { zone: TZ })
  : DateTime.now().setZone(TZ);

if (!runDate.isValid) throw new Error(`Invalid DATE: ${process.env.DATE}`);

const dayStart = runDate.startOf('day');
const dayEnd = runDate.endOf('day');

const sourcesRaw = JSON.parse(await fs.readFile(SOURCES_PATH, 'utf8'));

const languageFilter = (process.env.LANGUAGE || config?.iosDevDirectory?.language || 'en').trim();

const categorySlugs = (
  process.env.CATEGORY_SLUGS ||
  (config?.iosDevDirectory?.includeCategorySlugs || []).join(',') ||
  ''
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const maxSourcesFromConfig = Number(config?.iosDevDirectory?.maxSources || 0);

const excludeSourceRssRegex = (config?.filters?.excludeSourceRssRegex || []).map((r) => new RegExp(r));
const excludeItemUrlRegex = (config?.filters?.excludeItemUrlRegex || []).map((r) => new RegExp(r));
const excludeItemTitleRegex = (config?.filters?.excludeItemTitleRegex || []).map((r) => new RegExp(r, 'i'));

let sources = sourcesRaw.filter((s) => s?.rss);

if (languageFilter) {
  sources = sources.filter(
    (s) => (s.language || '').toLowerCase() === languageFilter.toLowerCase()
  );
}

if (categorySlugs.length) {
  const set = new Set(categorySlugs.map((s) => s.toLowerCase()));
  sources = sources.filter((s) => set.has((s.categorySlug || '').toLowerCase()));
}

if (excludeSourceRssRegex.length) {
  sources = sources.filter((s) => !excludeSourceRssRegex.some((re) => re.test(s.rss)));
}

sources.sort((a, b) => String(a.name).localeCompare(String(b.name)));

const maxSourcesEnv = Number(process.env.MAX_SOURCES || 0);
const maxSources = maxSourcesEnv > 0 ? maxSourcesEnv : (maxSourcesFromConfig > 0 ? maxSourcesFromConfig : 200);
if (Number.isFinite(maxSources) && maxSources > 0) {
  sources = sources.slice(0, maxSources);
}

console.log(`Collecting from ${sources.length} RSS sources for ${dayStart.toISODate()} (${TZ})`);

const results = [];

const settled = await mapLimit(sources, Number(process.env.CONCURRENCY || 8), async (src) => {
  try {
    const feed = await parser.parseURL(src.rss);
    const items = (feed.items || []).slice(0, Number(process.env.MAX_ITEMS_PER_FEED || 20));

    for (const item of items) {
      const dt = itemDate(item);
      if (!dt || !dt.isValid) continue;
      const zdt = dt.setZone(TZ);
      if (zdt < dayStart || zdt > dayEnd) continue;

      const title = (item.title || '').trim();
      const url = normalizeUrl(item.link);

      if (url && excludeItemUrlRegex.some((re) => re.test(url))) continue;
      if (title && excludeItemTitleRegex.some((re) => re.test(title))) continue;

      results.push({
        source: src.name,
        sourceUrl: src.url,
        sourceRss: src.rss,
        title,
        url,
        publishedAt: zdt.toISO(),
        tags: src.tags || null
      });
    }
  } catch (e) {
    return { error: String(e), source: src };
  }
});

const errors = settled
  .filter((r) => r.status === 'fulfilled' && r.value?.error)
  .map((r) => r.value);

// De-dupe by URL
const seen = new Set();
const deduped = results.filter((r) => {
  if (!r.url) return false;
  const key = r.url;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

await fs.mkdir(OUT_DIR, { recursive: true });
const outPath = path.join(OUT_DIR, `${runDate.toISODate()}-iosdevdirectory.json`);
await fs.writeFile(outPath, JSON.stringify({
  date: runDate.toISODate(),
  timezone: TZ,
  count: deduped.length,
  items: deduped,
  errors
}, null, 2));

console.log(`Saved ${deduped.length} items to ${outPath}`);
if (errors.length) {
  console.log(`Feed errors: ${errors.length} (see output json)`);
}

// rss-parser / underlying HTTP libs can keep sockets open; force exit for cron usage.
process.exit(0);
