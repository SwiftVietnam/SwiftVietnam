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

### Collect daily candidates from iOSDevDirectory RSS feeds

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

Environment variables:
- `DATE` (optional): `YYYY-MM-DD` in SGT
- `TZ` (optional): defaults to `Asia/Singapore`
- `LANGUAGE` (optional): defaults to `en`
- `CATEGORY_SLUGS` (optional): comma-separated filter (only collect from those categories)
- `MAX_SOURCES` (optional): cap number of feeds to fetch (default 200)
- `CONCURRENCY` (optional): parallel feed fetches (default 8)
- `MAX_ITEMS_PER_FEED` (optional): limit items scanned per feed (default 20)

Output:
- `newsletter/data/daily/YYYY-MM-DD-iosdevdirectory.json`

Note: this is a **candidate list**; human-written summaries still go into `content.md`.
