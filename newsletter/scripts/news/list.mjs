import { ghJson, parseArgs, DEFAULT_REPO } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
const repo = args.repo || DEFAULT_REPO;
const state = args.state || 'all';
const limit = Number(args.limit || 30);

const cmdArgs = [
  'issue',
  'list',
  '--repo',
  repo,
  '--state',
  state,
  '--limit',
  String(limit),
  '--json',
  'number,title,state,labels,updatedAt,url'
];

if (args.label) {
  cmdArgs.push('--label', args.label);
}

const raw = await ghJson(cmdArgs);
const rows = JSON.parse(raw);

for (const row of rows) {
  const labels = (row.labels || []).map((l) => l.name).join(', ');
  console.log(`#${row.number} [${row.state}] (${labels}) ${row.title}`);
  console.log(`  ${row.url}`);
}

if (rows.length === 0) {
  console.log('No issues found for this filter.');
}
