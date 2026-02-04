import fs from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('data/iosdevdirectory');
const BLOGS_JSON_URL =
  'https://raw.githubusercontent.com/daveverwer/iOSDevDirectory/main/blogs.json';

function normalizeUrl(u) {
  if (!u) return null;
  try {
    return new URL(u).toString();
  } catch {
    return null;
  }
}

function pickRssUrl(blog) {
  // blogs.json schema can evolve; try a few common keys.
  return (
    normalizeUrl(blog?.rss_url) ||
    normalizeUrl(blog?.feed_url) ||
    normalizeUrl(blog?.rss) ||
    normalizeUrl(blog?.feed)
  );
}

function pickSiteUrl(blog) {
  return (
    normalizeUrl(blog?.url) ||
    normalizeUrl(blog?.website_url) ||
    normalizeUrl(blog?.site_url)
  );
}

const res = await fetch(BLOGS_JSON_URL, {
  headers: {
    'user-agent': 'SwiftVietnam-Digest/1.0 (+https://github.com/SwiftVietnam/SwiftVietnam)',
    accept: 'application/json'
  }
});

if (!res.ok) {
  throw new Error(`Failed to fetch blogs.json: ${res.status} ${res.statusText}`);
}

const directoryJson = await res.json();
if (!Array.isArray(directoryJson)) {
  throw new Error('Unexpected blogs.json format: expected an array');
}

await fs.mkdir(OUT_DIR, { recursive: true });
await fs.writeFile(path.join(OUT_DIR, 'blogs.json'), JSON.stringify(directoryJson, null, 2));

// Current structure is language[] -> categories[] -> sites[]
const sites = [];
for (const lang of directoryJson) {
  for (const cat of lang?.categories || []) {
    for (const s of cat?.sites || []) {
      sites.push({
        ...s,
        __language: lang?.language || null,
        __category: cat?.title || null,
        __categorySlug: cat?.slug || null
      });
    }
  }
}

const sources = sites
  .map((b) => {
    const rss = pickRssUrl(b);
    const url = pickSiteUrl(b);
    const name = (b?.name || b?.title || '').trim();

    return {
      name: name || url || rss || 'Unknown',
      url,
      rss,
      author: b?.author || null,
      language: b?.__language || null,
      category: b?.__category || null,
      categorySlug: b?.__categorySlug || null
    };
  })
  .filter((s) => s.rss || s.url);

await fs.writeFile(path.join(OUT_DIR, 'sources.json'), JSON.stringify(sources, null, 2));

console.log(
  `Saved ${directoryJson.length} language groups, ${sites.length} sites, and ${sources.length} normalized sources to ${OUT_DIR}`
);
