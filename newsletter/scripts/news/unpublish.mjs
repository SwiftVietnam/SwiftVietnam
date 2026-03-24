import { ghJson, parseArgs, DEFAULT_REPO } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
if (!args.number) {
  console.error('Missing required --number argument.');
  process.exit(1);
}

const repo = args.repo || DEFAULT_REPO;

await ghJson([
  'issue',
  'edit',
  String(args.number),
  '--repo',
  repo,
  '--remove-label',
  'published'
]);

console.log(`Unpublished issue #${args.number} in ${repo}.`);
