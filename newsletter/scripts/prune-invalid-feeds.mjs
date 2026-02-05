import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

const FEEDS_YML = path.resolve('config/feeds.yml');

const CONCURRENCY = Number(process.env.CONCURRENCY || 25);
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS || 7000);

// When true: remove invalid feeds from feeds.yml.
// When false: just report.
const APPLY = String(process.env.APPLY || 'true').toLowerCase() === 'true';

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
        accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*;q=0.5'
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
    if (res.status === 404 || res.status === 410) return { ok: false, reason: `HTTP ${res.status}` };
    if (!res.ok) return { ok: true, reason: `Transient HTTP ${res.status}` }; // don't prune other statuses

    const text = (await res.text()).slice(0, 4096);
    const looksLikeFeed = /<(rss|feed|rdf:rdf)\b/i.test(text);
    if (!looksLikeFeed) return { ok: false, reason: 'Not RSS/Atom' };
    return { ok: true };
  } catch (e) {
    // timeouts/network errors could be transient; don't prune
    return { ok: true, reason: `Transient error: ${String(e)}` };
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

const raw = await fs.readFile(FEEDS_YML, 'utf8');
const doc = YAML.parse(raw);
if (!doc || !Array.isArray(doc.feeds)) throw new Error('Invalid feeds.yml');

const feeds = doc.feeds
  .map((f, idx) => ({ ...f, __idx: idx, rss: normalizeUrl(f.rss) }))
  .filter((f) => f.enabled === true && f.rss);

console.log(`Validating ${feeds.length} enabled feeds...`);

const results = await mapLimit(feeds, CONCURRENCY, async (f) => {
  const v = await isValidFeed(f.rss);
  return { rss: f.rss, id: f.id, name: f.name, ok: v.ok, reason: v.reason || null };
});

const invalid = results.filter((r) => r.ok === false);
console.log(`Invalid feeds: ${invalid.length}`);

if (invalid.length) {
  for (const r of invalid.slice(0, 25)) {
    console.log(`- ${r.name || r.id}: ${r.rss} (${r.reason})`);
  }
  if (invalid.length > 25) console.log(`...and ${invalid.length - 25} more`);
}

if (APPLY && invalid.length) {
  const invalidSet = new Set(invalid.map((r) => r.rss));
  doc.feeds = doc.feeds.filter((f) => !invalidSet.has(normalizeUrl(f.rss)));
  await fs.writeFile(FEEDS_YML, YAML.stringify(doc), 'utf8');
  console.log('Pruned invalid feeds from feeds.yml');
}
