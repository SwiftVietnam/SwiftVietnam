import fs from 'node:fs/promises';
import path from 'node:path';
import { DateTime } from 'luxon';
import matter from 'gray-matter';

const TZ = process.env.TZ || 'Asia/Singapore';
const endDate = process.env.END_DATE
  ? DateTime.fromISO(process.env.END_DATE, { zone: TZ })
  : DateTime.now().setZone(TZ);

if (!endDate.isValid) throw new Error(`Invalid END_DATE: ${process.env.END_DATE}`);

const days = Number(process.env.DAYS || 7);
const weekStart = endDate.minus({ days: days - 1 }).startOf('day');

const root = path.resolve('content');
const dist = path.resolve('site-dist');

const WEEKLY_PREVIEW_LIMIT = Number(process.env.WEEKLY_PREVIEW_LIMIT || 25);
const PREVIEW_PER_KIND = Number(process.env.PREVIEW_PER_KIND || 8);

function dayMdPath(dt) {
  return path.join(root, dt.toFormat('yyyy'), dt.toFormat('LL'), dt.toFormat('dd'), 'content.md');
}

function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function safeHost(u) {
  try {
    const host = new URL(u).hostname.replace(/^www\./, '');
    return host;
  } catch {
    return '';
  }
}

function parseItemsFromContent(markdown) {
  const lines = String(markdown || '').split(/\r?\n/);

  /** @type {Array<{title:string,url:string,description:string,image:string|null}>} */
  const items = [];
  let current = null;

  const flush = () => {
    if (current && current.url) items.push(current);
    current = null;
  };

  for (const line of lines) {
    const l = line.trimEnd();

    // New bullet
    if (l.startsWith('- ')) {
      flush();

      const sourceMatch = l.match(/\[Source\]\(([^)]+)\)\s*$/);
      const url = sourceMatch ? sourceMatch[1] : '';
      const withoutSource = sourceMatch ? l.slice(0, sourceMatch.index).trim() : l.slice(2).trim();

      // Remove leading "- "
      const core = withoutSource.startsWith('- ') ? withoutSource.slice(2).trim() : withoutSource;

      // Expect "**Title** — Desc"
      const m = core.match(/^\*\*(.+?)\*\*\s*(?:—\s*(.*))?$/);
      const title = (m?.[1] || core).trim();
      const description = (m?.[2] || '').trim();

      current = {
        title,
        url,
        description,
        image: null
      };
      continue;
    }

    // Optional image line for previous bullet (indented)
    const img = l.trim();
    if (current && img.startsWith('![](') && img.endsWith(')')) {
      const u = img.slice('![]('.length, -1).trim();
      current.image = u || null;
      continue;
    }
  }

  flush();

  // De-dupe by URL
  const seen = new Set();
  return items.filter((it) => {
    if (!it.url) return false;
    if (seen.has(it.url)) return false;
    seen.add(it.url);
    return true;
  });
}

const style = `
*{box-sizing:border-box}
:root{
  --bg:#0b0e14;
  --panel:#101827;
  --card:#0f172a;
  --text:#e8edf6;
  --muted:#a7b0c0;
  --border:rgba(148,163,184,.18);
  --shadow:0 1px 0 rgba(255,255,255,.04), 0 8px 30px rgba(0,0,0,.22);
  --link:#8ab4ff;
}
@media (prefers-color-scheme: light){
  :root{
    --bg:#f5f6f8;
    --panel:#ffffff;
    --card:#ffffff;
    --text:#0b1020;
    --muted:#4a5878;
    --border:rgba(15,23,42,.12);
    --shadow:0 1px 0 rgba(15,23,42,.04), 0 10px 24px rgba(15,23,42,.08);
    --link:#1a56db;
  }
}

html,body{height:100%}
body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; background:var(--bg); color:var(--text); line-height:1.55}

a{color:var(--link); text-decoration:none}
a:hover{text-decoration:underline}

.container{max-width:980px;margin:0 auto;padding:20px 14px 40px}

.topbar{position:sticky;top:0;z-index:10;backdrop-filter:saturate(180%) blur(14px);background:rgba(11,14,20,.72);border-bottom:1px solid var(--border)}
@media (prefers-color-scheme: light){.topbar{background:rgba(245,246,248,.72)}}
.topbar-inner{max-width:980px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px}
.brand{display:flex;flex-direction:column;gap:2px}
.brand-title{font-weight:800;letter-spacing:.2px;font-size:16px}
.brand-sub{font-size:12px;color:var(--muted)}
.nav a{font-size:13px;color:var(--muted)}
.nav a:hover{color:var(--text)}

.hero{margin-top:16px;background:var(--panel);border:1px solid var(--border);border-radius:16px;box-shadow:var(--shadow);padding:16px}
.hero h1{margin:0;font-size:18px}
.hero p{margin:6px 0 0 0;color:var(--muted);font-size:13px}

.grid{display:flex;flex-direction:column;gap:14px;margin-top:14px}

.day-card{background:var(--card);border:1px solid var(--border);border-radius:16px;box-shadow:var(--shadow);overflow:hidden}
.day-head{display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:14px 14px 10px;border-bottom:1px solid var(--border)}
.day-title{margin:0;font-size:15px;font-weight:750}
.day-meta{display:flex;align-items:center;gap:10px;color:var(--muted);font-size:12px;white-space:nowrap}
.badge{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border);border-radius:999px;padding:3px 10px}

.items{list-style:none;margin:0;padding:10px 10px 12px}

.section{padding:10px 10px 12px}
.section+.section{border-top:1px solid var(--border)}
.section-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:2px 4px 10px;color:var(--muted);font-size:12px}
.section-title{font-weight:750;color:var(--muted)}
.section-count{color:var(--muted)}
.section .items{padding:0}
.section .item{padding:10px 4px}

.item{display:flex;gap:12px;padding:10px;border-radius:12px}
.item:hover{background:rgba(148,163,184,.10)}
@media (prefers-color-scheme: light){.item:hover{background:rgba(15,23,42,.05)}}

.item.no-thumb{gap:0}

.thumb{width:72px;height:72px;flex:0 0 auto;border-radius:12px;object-fit:cover;border:1px solid var(--border);background:rgba(148,163,184,.10)}
@media (prefers-color-scheme: light){.thumb{background:rgba(15,23,42,.04)}}

.item-body{min-width:0;display:flex;flex-direction:column;gap:4px}
.item-title{font-weight:650;font-size:14px;line-height:1.25;margin:0;overflow-wrap:anywhere}
.item-desc{color:var(--muted);font-size:13px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere}
.item-foot{display:flex;gap:10px;align-items:center;color:var(--muted);font-size:12px}
.domain{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace}

.more{padding:0 14px 14px}
.more a{font-size:13px;color:var(--muted)}
.more a:hover{color:var(--text)}

.footer{margin-top:18px;color:var(--muted);font-size:12px;text-align:center}

@media (max-width: 520px){
  .thumb{width:56px;height:56px;border-radius:10px}
  .item{padding:10px 8px}
  .container{padding-left:12px;padding-right:12px}
}
`;

async function loadDay(dt) {
  const p = dayMdPath(dt);
  try {
    const raw = await fs.readFile(p, 'utf8');
    const parsed = matter(raw);
    const date = dt.toISODate();
    const title = parsed.data?.title || `SwiftVietnam Daily — ${dt.toFormat('LLL d, yyyy')}`;
    const items = parseItemsFromContent(parsed.content);
    return { date, title, items };
  } catch {
    return null;
  }
}

const daysData = [];
for (let i = 0; i < days; i++) {
  const dt = weekStart.plus({ days: i });
  const d = await loadDay(dt);
  if (d) daysData.push(d);
}

// Sort newest day first (latest on top)
const daysDataSorted = daysData.slice().sort((a, b) => b.date.localeCompare(a.date));

await fs.mkdir(dist, { recursive: true });

const issueTitle = `SwiftVietnam Digest — Week of ${weekStart.toFormat('LLL d, yyyy')} → ${endDate.toFormat('LLL d, yyyy')}`;

function dailyRel(dateISO) {
  const [y, m, d] = dateISO.split('-');
  return `daily/${y}/${m}/${d}/index.html`;
}

function contentKind(url) {
  const u = String(url || '').toLowerCase();
  if (!u) return 'article';

  // video
  if (
    u.includes('youtube.com/') ||
    u.includes('youtu.be/') ||
    u.includes('vimeo.com/') ||
    u.includes('twitch.tv/')
  ) {
    return 'video';
  }

  // podcast / audio
  if (
    /\.(mp3|m4a|aac|ogg)(\?|$)/i.test(u) ||
    u.includes('podcasts.apple.com/') ||
    u.includes('open.spotify.com/show') ||
    u.includes('open.spotify.com/episode') ||
    u.includes('acast.com/') ||
    u.includes('buzzsprout.com/') ||
    u.includes('simplecast.com/') ||
    u.includes('libsyn.com/') ||
    u.includes('transistor.fm/') ||
    u.includes('megaphone.fm/') ||
    u.includes('pca.st/') ||
    u.includes('overcast.fm/') ||
    u.includes('pod.link/')
  ) {
    return 'podcast';
  }

  return 'article';
}

function splitByKind(items) {
  const out = { article: [], podcast: [], video: [] };
  for (const it of items || []) {
    const k = contentKind(it.url);
    out[k].push(it);
  }
  return out;
}

function kindLabel(kind) {
  if (kind === 'video') return 'Videos';
  if (kind === 'podcast') return 'Podcasts';
  return 'Articles';
}

function renderItem(it) {
  const host = safeHost(it.url);
  const hasImage = Boolean(it.image);
  const thumb = hasImage
    ? `<img class="thumb" src="${esc(it.image)}" alt="" loading="lazy" decoding="async"/>`
    : '';

  const desc = it.description ? `<div class="item-desc">${esc(it.description)}</div>` : '';

  return `
<li class="item${hasImage ? '' : ' no-thumb'}">
  ${thumb}
  <div class="item-body">
    <div class="item-title"><a href="${esc(it.url)}" target="_blank" rel="noopener noreferrer">${esc(it.title || it.url)}</a></div>
    ${desc}
    <div class="item-foot"><span class="domain">${esc(host)}</span></div>
  </div>
</li>`;
}

function renderSection(kind, items, { limit } = {}) {
  const list = typeof limit === 'number' ? items.slice(0, limit) : items;
  if (!list.length) return '';

  const itemsHtml = list.map(renderItem).join('\n');

  return `
  <div class="section">
    <div class="section-head">
      <div class="section-title">${esc(kindLabel(kind))}</div>
      <div class="section-count">${items.length}</div>
    </div>
    <ul class="items">${itemsHtml}</ul>
  </div>`;
}

function renderDayCard(d) {
  const rel = dailyRel(d.date);

  const groups = splitByKind(d.items);

  // keep weekly page concise but still show all types
  const maxPer = Math.max(3, PREVIEW_PER_KIND);
  const sections = [
    renderSection('article', groups.article, { limit: maxPer }),
    renderSection('podcast', groups.podcast, { limit: maxPer }),
    renderSection('video', groups.video, { limit: maxPer })
  ].filter(Boolean).join('\n');

  const more = d.items.length > WEEKLY_PREVIEW_LIMIT
    ? `<div class="more"><a href="${esc(rel)}">View all ${d.items.length} links →</a></div>`
    : `<div class="more"><a href="${esc(rel)}">Open daily page →</a></div>`;

  return `
<section class="day-card">
  <div class="day-head">
    <h2 class="day-title">${esc(d.title)}</h2>
    <div class="day-meta"><span class="badge">${esc(d.date)}</span><span>${d.items.length} links</span></div>
  </div>
  ${sections || `<div class="section"><ul class="items"><li class="item"><div class="item-body"><div class="item-title">No items found.</div></div></li></ul></div>`}
  ${more}
</section>`;
}

const indexHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${esc(issueTitle)}</title>
  <style>${style}</style>
</head>
<body>
  <div class="topbar">
    <div class="topbar-inner">
      <div class="brand">
        <div class="brand-title">SwiftVietnam Digest</div>
        <div class="brand-sub">Weekly issue • ${esc(TZ)}</div>
      </div>
      <div class="nav"><a href="daily/index.html">Daily links</a></div>
    </div>
  </div>

  <div class="container">
    <div class="hero">
      <h1>${esc(issueTitle)}</h1>
      <p>Minimal UI • Auto-collected from RSS • Images are thumbnails</p>
    </div>

    <div class="grid">
      ${daysDataSorted.map(renderDayCard).join('\n')}
    </div>

    <div class="footer">Built by SwiftVietnam Digest pipeline.</div>
  </div>
</body>
</html>`;

await fs.writeFile(path.join(dist, 'index.html'), indexHtml, 'utf8');

// Daily index page
await fs.mkdir(path.join(dist, 'daily'), { recursive: true });

const dailyList = daysDataSorted
  .map((d) => {
    const rel = dailyRel(d.date);
    const g = splitByKind(d.items);
    const bits = [
      g.article.length ? `${g.article.length} articles` : null,
      g.podcast.length ? `${g.podcast.length} podcasts` : null,
      g.video.length ? `${g.video.length} videos` : null
    ].filter(Boolean).join(' • ');

    return `<li class="item no-thumb"><div class="item-body"><div class="item-title"><a href="../${esc(rel)}">${esc(d.date)}</a></div><div class="item-desc">${esc(d.title)} • ${d.items.length} links${bits ? ` • ${esc(bits)}` : ''}</div></div></li>`;
  })
  .join('\n');

const dailyIndexHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>SwiftVietnam Digest — Daily links</title>
  <style>${style}</style>
</head>
<body>
  <div class="topbar">
    <div class="topbar-inner">
      <div class="brand">
        <div class="brand-title">SwiftVietnam Digest</div>
        <div class="brand-sub">Daily archive • ${esc(TZ)}</div>
      </div>
      <div class="nav"><a href="../index.html">Weekly issue</a></div>
    </div>
  </div>

  <div class="container">
    <div class="hero">
      <h1>Daily links (this week)</h1>
      <p>Open a day for the full list.</p>
    </div>
    <section class="day-card">
      <ul class="items">${dailyList || '<li class="item"><div class="item-body"><div class="item-title">No daily pages found.</div></div></li>'}</ul>
    </section>
    <div class="footer">Built by SwiftVietnam Digest pipeline.</div>
  </div>
</body>
</html>`;

await fs.writeFile(path.join(dist, 'daily', 'index.html'), dailyIndexHtml, 'utf8');

// Per-day pages
for (const d of daysData) {
  const [y, m, dd] = d.date.split('-');
  const dayDir = path.join(dist, 'daily', y, m, dd);
  await fs.mkdir(dayDir, { recursive: true });

  const groups = splitByKind(d.items);

  const itemsHtml = ['article', 'podcast', 'video']
    .map((k) => {
      const list = groups[k];
      if (!list.length) return '';
      return `
      <div class="section">
        <div class="section-head">
          <div class="section-title">${esc(kindLabel(k))}</div>
          <div class="section-count">${list.length}</div>
        </div>
        <ul class="items">${list.map(renderItem).join('\n')}</ul>
      </div>`;
    })
    .filter(Boolean)
    .join('\n') || `<div class="section"><ul class="items"><li class="item"><div class="item-body"><div class="item-title">No items found.</div></div></li></ul></div>`;

  const dayHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${esc(d.title)}</title>
  <style>${style}</style>
</head>
<body>
  <div class="topbar">
    <div class="topbar-inner">
      <div class="brand">
        <div class="brand-title">SwiftVietnam Digest</div>
        <div class="brand-sub">${esc(d.date)} • ${d.items.length} links</div>
      </div>
      <div class="nav"><a href="../../../index.html">Daily index</a> &nbsp; <a href="../../../../index.html">Weekly</a></div>
    </div>
  </div>

  <div class="container">
    <div class="hero">
      <h1>${esc(d.title)}</h1>
      <p>${d.items.length} links</p>
    </div>

    <section class="day-card">
      ${itemsHtml}
    </section>

    <div class="footer">Built by SwiftVietnam Digest pipeline.</div>
  </div>
</body>
</html>`;

  await fs.writeFile(path.join(dayDir, 'index.html'), dayHtml, 'utf8');
}

console.log(`Built site-dist for week ${weekStart.toISODate()} → ${endDate.toISODate()} (${TZ})`);
console.log(`Output: ${dist}`);
