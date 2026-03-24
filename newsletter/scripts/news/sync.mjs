import { buildDataset, writeDataset, DEFAULT_REPO, parseArgs } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
const strict = args.strict !== 'false' && args.strict !== false;

try {
  const dataset = await buildDataset({ repo: args.repo || DEFAULT_REPO, strict });
  await writeDataset(dataset, args.output);

  console.log(`Synced ${dataset.items.length} published article(s) from ${dataset.repo}.`);
  console.log(`Total issues in repo: ${dataset.totalIssues}. Matching labels: ${dataset.selectedIssues}.`);
  console.log(`Output: ${args.output || 'src/data/news.generated.json'}`);

  if (dataset.errors.length > 0) {
    console.log(`Validation skipped ${dataset.errors.length} issue(s):`);
    for (const error of dataset.errors) {
      console.log(`- ${error}`);
    }
  }
} catch (error) {
  console.error(error.message);
  if (error.details) {
    for (const detail of error.details) {
      console.error(`- ${detail}`);
    }
  }
  process.exit(1);
}
