# SwiftVietnam Digest (newsletter tooling)

This folder will hold the content + scripts + site generator for **SwiftVietnam Digest**.

## Content

Daily markdown files live under:

- `newsletter/content/YYYY/MM/DD/content.md`

Dates are based on **Asia/Singapore** timezone.

## Scripts

### Fetch iOSDevDirectory sources

Downloads the upstream directory JSON and writes a normalized list of RSS sources.

```bash
cd newsletter
npm run fetch:sources
```

Outputs:
- `newsletter/data/iosdevdirectory/blogs.json` (raw)
- `newsletter/data/iosdevdirectory/sources.json` (normalized)

### Sync RSS feeds from iosfeeds.com

This pulls RSS feed URLs from https://iosfeeds.com/feeds, validates them, and appends valid feeds to `newsletter/config/feeds.yml`.

```bash
cd newsletter
MAX_CHECK=250 CONCURRENCY=12 npm run sync:iosfeeds
```

### Collect daily candidates from RSS feeds

Fetches RSS feeds and extracts items published on a given day (default: today in SGT).

```bash
cd newsletter
DATE=2026-02-04 \
  TZ=Asia/Singapore \
  MAX_SOURCES=200 \
  CONCURRENCY=8 \
  MAX_ITEMS_PER_FEED=20 \
  node scripts/collect-from-iosdevdirectory.mjs
```

Configuration (committed for review):
- `newsletter/config/feeds.yml`: explicit RSS allowlist. If any `enabled: true`, crawler uses ONLY those.
- `newsletter/config/content-sources.yml`: iOSDevDirectory import settings + filters (used when allowlist is empty).

Environment variables (optional overrides):
- `CONFIG`: path to a different YAML config file
- `DATE`: `YYYY-MM-DD` in SGT
- `TZ`: timezone (defaults to config / `Asia/Singapore`)
- `LANGUAGE`: override language
- `CATEGORY_SLUGS`: override category slug filter
- `MAX_SOURCES`: override max sources cap
- `CONCURRENCY`: parallel feed fetches (default 8)
- `MAX_ITEMS_PER_FEED`: limit items scanned per feed (default 20)

Output:
- `newsletter/data/daily/YYYY-MM-DD-iosdevdirectory.json`

Note: this is a **candidate list**; human-written summaries still go into `content.md`.
