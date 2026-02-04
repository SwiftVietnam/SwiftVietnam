import fs from 'node:fs/promises';
import path from 'node:path';
import { DateTime } from 'luxon';
import matter from 'gray-matter';

const TZ = process.env.TZ || 'Asia/Singapore';
const endDate = process.env.END_DATE
  ? DateTime.fromISO(process.env.END_DATE, { zone: TZ })
  : DateTime.now().setZone(TZ);

if (!endDate.isValid) throw new Error(`Invalid END_DATE: ${process.env.END_DATE}`);

const days = Number(process.env.DAYS || 7);

const weekStart = endDate.minus({ days: days - 1 }).startOf('day');

const contentRoot = path.resolve('content');

async function run(cmd, env = {}) {
  const { spawn } = await import('node:child_process');
  return new Promise((resolve, reject) => {
    const child = spawn(cmd[0], cmd.slice(1), {
      stdio: 'inherit',
      env: { ...process.env, ...env }
    });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed (${code}): ${cmd.join(' ')}`));
    });
  });
}

function dayPath(dt) {
  return path.join(contentRoot, dt.toFormat('yyyy'), dt.toFormat('LL'), dt.toFormat('dd'), 'content.md');
}

async function upsertDailyFile(dt, items) {
  const outPath = dayPath(dt);
  await fs.mkdir(path.dirname(outPath), { recursive: true });

  let existing = null;
  try {
    existing = await fs.readFile(outPath, 'utf8');
  } catch {}

  const iso = dt.toISODate();
  const title = `SwiftVietnam Daily — ${dt.toFormat('LLL d, yyyy')}`;

  const bullets = items
    .slice(0, 30)
    .map((it) => `- **${(it.title || '').replaceAll('\n', ' ').trim()}** — _TODO: add 1–3 sentence summary_. [Source](${it.url})`)
    .join('\n');

  const fm = {
    date: iso,
    timezone: TZ,
    title,
    summary: 'Auto-collected candidates (please edit summaries).',
    sources: ['iosdevdirectory'],
    tags: []
  };

  const body = `## Links (auto-collected candidates)\n\n${bullets || '_No items found._'}\n`;

  const next = matter.stringify(body + '\n', fm);

  if (existing) {
    // If file exists, replace entirely for now (simple MVP).
    // Later we can merge sections intelligently.
  }

  await fs.writeFile(outPath, next, 'utf8');
}

// Ensure we have sources.json
await run(['node', 'scripts/fetch-iosdevdirectory-sources.mjs']);

for (let i = 0; i < days; i++) {
  const dt = weekStart.plus({ days: i });
  const dateStr = dt.toISODate();

  // Collect candidates JSON
  await run(['node', 'scripts/collect-from-iosdevdirectory.mjs'], {
    DATE: dateStr,
    TZ,
    CONCURRENCY: process.env.CONCURRENCY || '8',
    MAX_ITEMS_PER_FEED: process.env.MAX_ITEMS_PER_FEED || '20'
  });

  // Read output candidate json
  const outJson = path.resolve(
    'data/daily',
    `${dateStr}-iosdevdirectory.json`
  );

  let items = [];
  try {
    const parsed = JSON.parse(await fs.readFile(outJson, 'utf8'));
    items = parsed.items || [];
  } catch {
    items = [];
  }

  await upsertDailyFile(dt, items);
}

console.log(`\nWeek generated: ${weekStart.toISODate()} → ${endDate.toISODate()} (${TZ})`);
console.log(`Daily markdown written under: newsletter/content/YYYY/MM/DD/content.md`);
