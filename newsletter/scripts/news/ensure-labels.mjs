import { ghJson, DEFAULT_REPO, parseArgs } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
const repo = args.repo || DEFAULT_REPO;

const labels = [
  { name: 'news', color: '1f6feb', description: 'SwiftVietnam news article' },
  { name: 'published', color: '238636', description: 'Published on SwiftVietnam News site' }
];

for (const label of labels) {
  await ghJson([
    'label',
    'create',
    label.name,
    '--repo',
    repo,
    '--color',
    label.color,
    '--description',
    label.description,
    '--force'
  ]);
  console.log(`Ensured label: ${label.name}`);
}
