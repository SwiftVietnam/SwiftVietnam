import fs from 'node:fs/promises';
import path from 'node:path';

const q = process.argv.slice(2).join(' ').trim();
if (!q) {
  console.log('Usage: node scripts/search-iosdevdirectory.mjs <query>');
  console.log('Example: node scripts/search-iosdevdirectory.mjs "Paul Hudson"');
  process.exit(1);
}

const sourcesPath = path.resolve('data/iosdevdirectory/sources.json');
let sources;
try {
  sources = JSON.parse(await fs.readFile(sourcesPath, 'utf8'));
} catch {
  console.error('Missing data/iosdevdirectory/sources.json. Run: npm run fetch:sources');
  process.exit(1);
}

const needle = q.toLowerCase();
const matches = sources
  .filter((s) => {
    const hay = [s.name, s.author, s.url, s.rss, s.category, s.categorySlug]
      .filter(Boolean)
      .join(' | ')
      .toLowerCase();
    return hay.includes(needle);
  })
  .slice(0, 25);

if (!matches.length) {
  console.log('No matches.');
  process.exit(0);
}

for (const s of matches) {
  console.log(`- ${s.name} (${s.author || 'unknown'})`);
  console.log(`  category: ${s.categorySlug || ''}`);
  console.log(`  site: ${s.url || ''}`);
  console.log(`  rss:  ${s.rss || ''}`);
  console.log('  feeds.yml snippet:');
  console.log(`    - id: ${String(s.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40)}`);
  console.log(`      name: ${JSON.stringify(s.name)}`);
  if (s.url) console.log(`      site: ${s.url}`);
  if (s.rss) console.log(`      rss: ${s.rss}`);
  console.log('      enabled: false');
  console.log('');
}
