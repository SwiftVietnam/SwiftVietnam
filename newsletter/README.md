# SwiftVietnam News (Astro + GitHub Issues)

Static website hiển thị tin tức Apple cho cộng đồng iOS/macOS developers Việt Nam.

- Framework: Astro (`newsletter/`)
- CMS/Database: GitHub Issues (`SwiftVietnam/SwiftVietnam`)
- Publish rule: issue có đủ label `news` + `published`
- URL bài viết: `/news/{issue-number}/`

## Setup

```bash
cd newsletter
npm install
```

## Content commands (GitHub Issues)

### Tạo draft issue

```bash
npm run news:create -- --title "Xcode 18 beta cập nhật SwiftUI" --summary_vi "Tóm tắt VI" --summary_en "EN summary"
```

### Publish / Unpublish

```bash
npm run news:publish -- --number 123
npm run news:unpublish -- --number 123
```

### Danh sách issues

```bash
npm run news:list -- --state all --label news
```

### Đồng bộ issue -> data JSON

```bash
npm run news:sync
```

## Run website

```bash
npm run dev
```

Build production:

```bash
npm run build
```

## Required front matter in issue body

```yaml
---
title: ""
summary_vi: ""
summary_en: ""
published_at: "2026-03-23T10:00:00.000Z"
source_url: "https://developer.apple.com/news/"
cover_image: ""
author_name: "SwiftVietnam"
platform: "ios" # ios|macos|both
lang: "vi"
tags:
  - "ios"
  - "macos"
---
```
