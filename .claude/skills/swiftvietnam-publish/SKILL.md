---
name: swiftvietnam-publish
description: >
  Create a GitHub Issue draft to publish an article to swiftvietnam.dev.
  Use when the user provides a URL and wants to publish content to the SwiftVietnam iOS/macOS news site.
  Fetches the page via Chrome, extracts metadata and cover image, writes Vietnamese article content,
  previews it in chat for review, then creates a GitHub Issue with the `news` label only (NOT `published` — human review required).
  Repo: SwiftVietnam/SwiftVietnam. Working directory: /Users/antran/Projects/Writting/SwiftVietnam/newsletter.
---

# SwiftVietnam Publish Skill

## Workflow

### Step 1 — Fetch the original content via Chrome

Before any Chrome tool calls, load them with ToolSearch first.

Navigate to the URL and extract with `mcp__claude-in-chrome__javascript_tool`:

```js
JSON.stringify({
  title: document.querySelector('meta[property="og:title"]')?.content || document.title,
  description: document.querySelector('meta[property="og:description"]')?.content
    || document.querySelector('meta[name="description"]')?.content,
  image: document.querySelector('meta[property="og:image"]')?.content
    || document.querySelector('article img, .post-image img, .hero img')?.src,
  author: document.querySelector('meta[name="author"]')?.content
    || document.querySelector('[rel="author"]')?.textContent
    || document.querySelector('.author, .byline')?.textContent?.trim(),
  date: document.querySelector('meta[property="article:published_time"]')?.content
    || document.querySelector('time[datetime]')?.getAttribute('datetime')
})
```

Also call `mcp__claude-in-chrome__get_page_text` for the full article body.

### Step 2 — Determine cover image

- **Use original**: Use the `og:image` or a prominent `<img>` from the page (absolute URL required).
  - Apple docs: always use `docs-assets.developer.apple.com` — never `devimages-cdn.apple.com` (returns 403).
- **Fallback**: If no usable image is found, leave `cover_image` empty (`""`). Do not invent URLs.

### Step 3 — Write the article in Vietnamese

All content is **Vietnamese only** unless user explicitly requests bilingual.

Produce these fields:
- `title`: Vietnamese article title (keep proper nouns / brand names in English)
- `summary_vi`: 1–2 sentence Vietnamese summary
- `summary_en`: 1–2 sentence English summary
- `author_name`: Original author name (verbatim)
- `platform`: `ios` | `macos` | `both`
- `lang`: `vi`
- `published_at`: ISO 8601 (original publication date if found; else today's date)
- `tags`: 3–5 tags from: `swift`, `swiftui`, `uikit`, `xcode`, `ios`, `macos`, `watchos`, `visionos`, `apple`, `wwdc`, `accessibility`, `performance`, `testing`, `concurrency`, `combine`

Article body structure (Vietnamese):

```markdown
## Bối cảnh

[1–2 paragraphs explaining the topic and why this article was written]

## Tại sao quan trọng với dev Việt Nam

[Why Vietnamese iOS/macOS developers should care]

## Chi tiết kỹ thuật

[Technical breakdown — preserve code blocks verbatim from the original, with language tags]
[All hyperlinks must use absolute URLs from the original source]

## Kết luận

[1 short takeaway paragraph]
```

**Link rule**: Every hyperlink in the body must be an absolute URL (e.g. `https://developer.apple.com/...`). No relative paths.

### Step 4 — Assemble the full issue body

```
---
title: "<title>"
summary_vi: "<summary_vi>"
summary_en: "<summary_en>"
published_at: "<ISO8601>"
source_url: "<original URL>"
cover_image: "<absolute image URL or empty string>"
author_name: "<author>"
platform: "<ios|macos|both>"
lang: "vi"
tags:
  - "<tag1>"
  - "<tag2>"
---

## Bối cảnh
...

## Tại sao quan trọng với dev Việt Nam
...

## Chi tiết kỹ thuật
...

## Kết luận
...
```

### Step 5 — Preview in chat (required before creating issue)

Display the full assembled issue body in the chat using a markdown code block so the user can review:

1. Show frontmatter + full article body inline.
2. If a cover image was found, display it with `mcp__claude-in-chrome__navigate` or simply note the URL.
3. Ask: **"Does this look correct? Should I create the GitHub Issue?"**

Do NOT create the issue until the user explicitly confirms.

### Step 6 — Create the GitHub Issue

Only after user approval:

1. Write the body to `/tmp/swiftvietnam_issue_body.md` to avoid shell escaping issues.
2. Create the issue with **only the `news` label**:

```bash
gh issue create \
  --repo SwiftVietnam/SwiftVietnam \
  --title "<Vietnamese title>" \
  --label "news" \
  --body-file /tmp/swiftvietnam_issue_body.md
```

3. Print the issue URL.
4. Remind the user: **"Issue created as draft with `news` label only. Add the `published` label when ready to deploy to swiftvietnam.dev."**

## Key constraints

- **Never add `published` label** — human review is required before the article goes live.
- **All links absolute** — no relative URLs anywhere in the article body.
- **Apple images**: use `docs-assets.developer.apple.com`, never `devimages-cdn.apple.com`.
- **Vietnamese content only** unless user requests bilingual.
- **Repo**: `SwiftVietnam/SwiftVietnam`
- **npm working directory**: `/Users/antran/Projects/Writting/SwiftVietnam/newsletter`
