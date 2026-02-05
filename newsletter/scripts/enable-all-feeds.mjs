import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';

const FEEDS_YML = path.resolve('config/feeds.yml');

const raw = await fs.readFile(FEEDS_YML, 'utf8');
const doc = YAML.parse(raw);
if (!doc || !Array.isArray(doc.feeds)) throw new Error('Invalid feeds.yml');

let changed = 0;
for (const f of doc.feeds) {
  if (f.enabled !== true) {
    f.enabled = true;
    changed++;
  }
}

await fs.writeFile(FEEDS_YML, YAML.stringify(doc), 'utf8');
console.log(`Enabled all feeds: ${changed} changed.`);
