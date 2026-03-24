import { ghJson, parseArgs, loadTemplate, fillTemplate, DEFAULT_REPO } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
const title = String(args.title || '').trim() || `Apple News - ${new Date().toISOString().slice(0, 10)}`;
const repo = args.repo || DEFAULT_REPO;
const labels = (args.labels || 'news').split(',').map((x) => x.trim()).filter(Boolean);

const template = await loadTemplate();
const body = fillTemplate(template, args);

const createArgs = [
  'issue',
  'create',
  '--repo',
  repo,
  '--title',
  title,
  '--body',
  body
];

for (const label of labels) {
  createArgs.push('--label', label);
}

const url = (await ghJson(createArgs)).trim();
console.log(`Created draft issue: ${url}`);
