import fs from 'node:fs/promises';
import path from 'node:path';
import { DateTime } from 'luxon';

const TZ = process.env.TZ || 'Asia/Singapore';
const date = process.env.DATE
  ? DateTime.fromISO(process.env.DATE, { zone: TZ })
  : DateTime.now().setZone(TZ);

if (!date.isValid) throw new Error(`Invalid DATE: ${process.env.DATE}`);

const yyyy = date.toFormat('yyyy');
const mm = date.toFormat('LL');
const dd = date.toFormat('dd');

const outDir = path.resolve('content', yyyy, mm, dd);
await fs.mkdir(outDir, { recursive: true });

const outPath = path.join(outDir, 'content.md');

try {
  await fs.access(outPath);
  console.log(`Exists: ${outPath}`);
  process.exit(0);
} catch {}

const iso = date.toISODate();
const title = `SwiftVietnam Daily — ${date.toFormat('LLL d, yyyy')}`;

const md = `---
date: ${iso}
timezone: ${TZ}
title: "${title}"
summary: "Top Swift/Apple dev news and tools for today."
sources: []
tags: []
---

## Swift / iOS / macOS

## AI-assisted coding (Apple ecosystem)

## ML / MLX

## visionOS / AR/VR

## Links (uncategorized)
`;

await fs.writeFile(outPath, md, 'utf8');
console.log(`Created: ${outPath}`);
