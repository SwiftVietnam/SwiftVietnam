import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const execFileAsync = promisify(execFile);

export const DEFAULT_REPO = process.env.NEWS_REPO || 'SwiftVietnam/SwiftVietnam';
export const REQUIRED_LABELS = (process.env.NEWS_REQUIRED_LABELS || 'news,published')
  .split(',')
  .map((x) => x.trim().toLowerCase())
  .filter(Boolean);

export const OUTPUT_PATH = path.resolve('src/data/news.generated.json');

function normalizeFrontMatter(issue, fm) {
  const title = String(fm.title || issue.title || '').trim();
  const summaryVi = String(fm.summary_vi || '').trim();
  const summaryEn = String(fm.summary_en || '').trim();
  const publishedAtRaw = String(fm.published_at || issue.created_at || '').trim();
  const publishedAt = new Date(publishedAtRaw).toISOString();
  const sourceUrl = String(fm.source_url || '').trim();
  const coverImage = fm.cover_image ? String(fm.cover_image).trim() : null;
  const authorName = String(fm.author_name || issue.user?.login || '').trim();
  const platform = String(fm.platform || 'both').trim().toLowerCase();
  const lang = String(fm.lang || 'vi').trim().toLowerCase();
  const tags = Array.isArray(fm.tags)
    ? fm.tags.map((x) => String(x).trim()).filter(Boolean)
    : String(fm.tags || '')
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean);

  return {
    title,
    summaryVi,
    summaryEn,
    publishedAt,
    sourceUrl,
    coverImage,
    authorName,
    platform,
    lang,
    tags
  };
}

function validateItem(item) {
  const errors = [];
  if (!item.title) errors.push('missing title');
  if (!item.summaryVi) errors.push('missing summary_vi');
  if (!item.summaryEn) errors.push('missing summary_en');
  if (!item.sourceUrl) errors.push('missing source_url');
  if (!item.publishedAt || Number.isNaN(Date.parse(item.publishedAt))) {
    errors.push('invalid published_at');
  }
  if (item.platform && !['ios', 'macos', 'both'].includes(item.platform)) {
    errors.push('platform must be ios|macos|both');
  }
  return errors;
}

function parseNdjson(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

export async function ghJson(args) {
  const { stdout } = await execFileAsync('gh', args, {
    env: {
      ...process.env,
      GH_TOKEN: process.env.GH_TOKEN || process.env.GITHUB_TOKEN || process.env.GH_TOKEN
    },
    maxBuffer: 20 * 1024 * 1024
  });
  return stdout;
}

export async function fetchIssuesFromGithub(repo = DEFAULT_REPO) {
  const pathWithQuery = `repos/${repo}/issues?state=all&per_page=100&sort=created&direction=desc`;
  const raw = await ghJson(['api', '--paginate', pathWithQuery, '--jq', '.[]']);
  const issues = parseNdjson(raw).filter((item) => !item.pull_request);
  return issues;
}

export function issueHasRequiredLabels(issue, requiredLabels = REQUIRED_LABELS) {
  const labels = (issue.labels || [])
    .map((label) => (typeof label === 'string' ? label : label?.name || ''))
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean);
  return requiredLabels.every((required) => labels.includes(required));
}

export function normalizeIssue(issue) {
  const parsed = matter(issue.body || '');
  const fm = normalizeFrontMatter(issue, parsed.data || {});
  return {
    id: issue.number,
    url: `/news/${issue.number}/`,
    issueUrl: issue.html_url,
    githubNumber: issue.number,
    githubTitle: issue.title,
    ...fm,
    contentMarkdown: String(parsed.content || '').trim()
  };
}

export async function buildDataset({ repo = DEFAULT_REPO, requiredLabels = REQUIRED_LABELS, strict = true } = {}) {
  const issues = await fetchIssuesFromGithub(repo);
  const selected = issues.filter((issue) => issueHasRequiredLabels(issue, requiredLabels));
  const errors = [];
  const items = [];

  for (const issue of selected) {
    const item = normalizeIssue(issue);
    const validationErrors = validateItem(item);
    if (validationErrors.length > 0) {
      errors.push(`#${issue.number}: ${validationErrors.join(', ')}`);
      continue;
    }
    items.push(item);
  }

  items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (errors.length > 0 && strict) {
    const error = new Error(`Validation failed for ${errors.length} issue(s).`);
    error.details = errors;
    throw error;
  }

  return {
    repo,
    generatedAt: new Date().toISOString(),
    requiredLabels,
    totalIssues: issues.length,
    selectedIssues: selected.length,
    items,
    errors
  };
}

export async function writeDataset(dataset, outputPath = OUTPUT_PATH) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(dataset, null, 2) + '\n', 'utf8');
}

export function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const current = argv[i];
    if (!current.startsWith('--')) continue;
    const key = current.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      out[key] = true;
      continue;
    }
    out[key] = next;
    i += 1;
  }
  return out;
}

export async function loadTemplate() {
  const templatePath = path.resolve('scripts/news/templates/news-issue.md');
  return fs.readFile(templatePath, 'utf8');
}

export function fillTemplate(template, values) {
  const tags = String(values.tags || 'ios, macos, apple')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
  const tagsYaml = tags.map((tag) => `  - "${tag}"`).join('\n');

  return template
    .replaceAll('{{title}}', values.title || 'Tiêu đề bài viết')
    .replaceAll('{{summary_vi}}', values.summary_vi || 'Tóm tắt tiếng Việt')
    .replaceAll('{{summary_en}}', values.summary_en || 'English summary')
    .replaceAll('{{published_at}}', values.published_at || new Date().toISOString())
    .replaceAll('{{source_url}}', values.source_url || 'https://developer.apple.com/news/')
    .replaceAll('{{cover_image}}', values.cover_image || '')
    .replaceAll('{{author_name}}', values.author_name || 'SwiftVietnam')
    .replaceAll('{{platform}}', values.platform || 'both')
    .replaceAll('{{lang}}', values.lang || 'vi')
    .replaceAll('{{tags_yaml}}', tagsYaml);
}
