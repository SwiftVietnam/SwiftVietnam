import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

const FEEDS_YML = path.resolve('config/feeds.yml');

const tag = (process.env.TAG || '').trim();
const id = (process.env.ID || '').trim();
const enable = String(process.env.ENABLE || 'true').toLowerCase() === 'true';

if (!tag && !id) {
  console.error('Usage: TAG=<tag> ENABLE=true node scripts/toggle-feeds.mjs');
  console.error('   or: ID=<feed-id> ENABLE=false node scripts/toggle-feeds.mjs');
  process.exit(1);
}

const raw = await fs.readFile(FEEDS_YML, 'utf8');
const doc = YAML.parse(raw);
if (!doc || !Array.isArray(doc.feeds)) throw new Error('Invalid feeds.yml');

let changed = 0;
for (const f of doc.feeds) {
  if (id) {
    if (f.id === id) {
      if (f.enabled !== enable) {
        f.enabled = enable;
        changed++;
      }
    }
    continue;
  }

  const tags = Array.isArray(f.tags) ? f.tags : [];
  if (tags.includes(tag)) {
    if (f.enabled !== enable) {
      f.enabled = enable;
      changed++;
    }
  }
}

await fs.writeFile(FEEDS_YML, YAML.stringify(doc), 'utf8');
console.log(`Updated feeds.yml: ${changed} feeds changed (enable=${enable}).`);
