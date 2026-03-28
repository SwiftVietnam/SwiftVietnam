# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SwiftVietnam is a Vietnamese iOS/macOS developer community news site at `https://swiftvietnam.dev`. The site is built with **Astro** (static site generator) and uses **GitHub Issues as a CMS** — articles are written as GitHub Issues with YAML frontmatter, synced to a JSON file, and rendered as static pages.

All content is written in **Vietnamese only** unless bilingual output is explicitly requested.

## Working Directory

All development work happens inside `newsletter/`. Run commands from there:

```bash
cd newsletter
```

## Commands

```bash
# Development
npm run dev           # Start Astro dev server
npm run build         # Build static site to dist/
npm run preview       # Preview production build

# Content management
npm run news:sync     # Sync published GitHub Issues → src/data/news.generated.json
npm run news:create   # Create a new draft issue
npm run news:list     # List issues
npm run news:publish  # Add 'published' label to an issue
npm run news:unpublish # Remove 'published' label

# Feed management
npm run sync:iosfeeds         # Sync iOS RSS feeds
npm run sync:iosdevdirectory  # Sync iOS Dev Directory feeds
npm run fetch:sources         # Fetch feed sources
npm run feeds:toggle          # Toggle feed enabled/disabled
npm run feeds:prune           # Remove broken feeds

# Weekly digest workflow
npm run crawl:week    # Crawl RSS for the week's content
npm run new:day       # Create new daily entry
npm run run:week      # Run weekly collection
npm run build:week    # Build weekly static site
```

## Architecture

### Content Flow

```
GitHub Issues (with YAML frontmatter)
    ↓ npm run news:sync
src/data/news.generated.json   ← DO NOT EDIT MANUALLY
    ↓ Astro build
dist/ (static HTML)
    ↓ GitHub Actions deploy
gh-pages branch → swiftvietnam.dev
```

### Key Files

- `src/pages/news/index.astro` — News list page
- `src/pages/news/[id].astro` — Dynamic article detail page (routed by GitHub Issue number)
- `src/pages/rss.xml.ts` — RSS feed generator
- `src/layouts/BaseLayout.astro` — Base template with SEO meta, header, footer
- `src/components/NewsCard.astro` — Article card component
- `src/data/news.generated.json` — Auto-generated from GitHub Issues; never edit directly
- `scripts/news/lib.mjs` — Core logic for GitHub Issues sync
- `scripts/news/sync.mjs` — Sync command entry point

### GitHub Issues as CMS

Articles require **both** labels: `news` + `published` to appear on the site.

Required YAML frontmatter in issue body:
```yaml
---
title: ""
summary_vi: ""          # Vietnamese summary
summary_en: ""          # English summary
published_at: "ISO8601"
source_url: "https://..."
cover_image: "https://..."
author_name: "Author Name"
platform: "ios|macos|both"
lang: "vi"
tags:
  - tag1
---
```

Article URLs are generated as `/news/{issue-number}/`.

### Deployment

Automated via GitHub Actions (`.github/workflows/deploy-digest.yml`):
- Triggers: manual dispatch, weekly (Sundays 00:00 SGT), or on RSS crawl workflow completion
- Steps: `news:sync` → `build` → deploy `dist/` to `gh-pages` branch
- Custom domain: `swiftvietnam.dev` (CNAME in GitHub Pages settings)

## Image URLs

When referencing Apple developer documentation images, use `docs-assets.developer.apple.com` — `devimages-cdn.apple.com` returns 403 errors.
