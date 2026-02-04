import fs from 'node:fs/promises';
import path from 'node:path';
import { DateTime } from 'luxon';
import matter from 'gray-matter';
import { marked } from 'marked';

const TZ = process.env.TZ || 'Asia/Singapore';
const endDate = process.env.END_DATE
  ? DateTime.fromISO(process.env.END_DATE, { zone: TZ })
  : DateTime.now().setZone(TZ);

const days = Number(process.env.DAYS || 7);
const weekStart = endDate.minus({ days: days - 1 }).startOf('day');

const root = path.resolve('content');
const dist = path.resolve('site-dist');

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

const style = `
:root{--bg:#0b0e14;--card:#121826;--text:#e7e9ee;--muted:#a7b0c0;--link:#8ab4ff;--border:#23304a;}
@media (prefers-color-scheme: light){:root{--bg:#ffffff;--card:#f6f7fb;--text:#0b1020;--muted:#4a5878;--link:#1a56db;--border:#d6dbea;}}
body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; background:var(--bg); color:var(--text);}
a{color:var(--link); text-decoration:none} a:hover{text-decoration:underline}
.container{max-width:980px;margin:0 auto;padding:28px 18px;}
.header{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-bottom:1px solid var(--border);padding-bottom:14px;margin-bottom:18px;}
.brand{font-weight:800;font-size:20px;letter-spacing:0.2px}
.sub{color:var(--muted);font-size:13px}
.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:14px;}
.card{grid-column:span 12;background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px 14px;}
.card h2{margin:0 0 10px 0;font-size:16px}
.card h3{margin:16px 0 8px 0;font-size:14px}
.card ul{margin:0;padding-left:18px}
.footer{margin-top:22px;color:var(--muted);font-size:12px}
.small{font-size:12px;color:var(--muted)}
.badge{display:inline-block;border:1px solid var(--border);border-radius:999px;padding:2px 9px;font-size:12px;color:var(--muted)}
`;

async function loadDay(dt) {
  const p = dayMdPath(dt);
  try {
    const raw = await fs.readFile(p, 'utf8');
    const parsed = matter(raw);
    return {
      date: dt.toISODate(),
      title: parsed.data?.title || dt.toISODate(),
      html: marked.parse(parsed.content)
    };
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

await fs.mkdir(dist, { recursive: true });

const issueTitle = `SwiftVietnam Digest — Week of ${weekStart.toFormat('LLL d, yyyy')} → ${endDate.toFormat('LLL d, yyyy')}`;

const issueBody = daysData
  .map(
    (d) => `
    <article class="card">
      <div class="small"><span class="badge">${esc(d.date)}</span></div>
      <h2>${esc(d.title)}</h2>
      <div>${d.html}</div>
    </article>`
  )
  .join('\n');

const dailyLinks = daysData
  .map((d) => {
    const [y, m, dd] = d.date.split('-');
    const rel = `daily/${y}/${m}/${dd}/index.html`;
    return { d, rel };
  })
  .map(
    ({ d, rel }) => `<li><a href="../${rel}">${esc(d.date)}</a> — ${esc(d.title)}</li>`
  )
  .join('\n');

const indexHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${esc(issueTitle)}</title>
  <style>${style}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <div class="brand">SwiftVietnam Digest</div>
        <div class="sub">Weekly issue • Generated from markdown • ${esc(TZ)}</div>
      </div>
      <div class="sub"><a href="daily/index.html">Daily links</a></div>
    </div>

    <div class="card">
      <h2>${esc(issueTitle)}</h2>
      <div class="small">This is an MVP build (layout + archive). Summaries may contain TODO placeholders.</div>
    </div>

    <div class="grid">
      ${issueBody}
    </div>

    <div class="footer">Built by SwiftVietnam Digest pipeline.</div>
  </div>
</body>
</html>`;

await fs.writeFile(path.join(dist, 'index.html'), indexHtml, 'utf8');

// Daily index page
await fs.mkdir(path.join(dist, 'daily'), { recursive: true });
const dailyIndex = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>SwiftVietnam Digest — Daily links</title>
  <style>${style}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <div class="brand">SwiftVietnam Digest</div>
        <div class="sub">Daily archive • ${esc(TZ)}</div>
      </div>
      <div class="sub"><a href="../index.html">Weekly issue</a></div>
    </div>

    <div class="card">
      <h2>Daily links (this week)</h2>
      <ul>${dailyLinks || '<li>No daily pages found.</li>'}</ul>
    </div>
  </div>
</body>
</html>`;

await fs.writeFile(path.join(dist, 'daily', 'index.html'), dailyIndex, 'utf8');

// Per-day pages
for (const d of daysData) {
  const [y, m, dd] = d.date.split('-');
  const dayDir = path.join(dist, 'daily', y, m, dd);
  await fs.mkdir(dayDir, { recursive: true });

  const dayHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${esc(d.title)}</title>
  <style>${style}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <div class="brand">SwiftVietnam Digest</div>
        <div class="sub"><a href="../../../index.html">Daily index</a> • <a href="../../../../index.html">Weekly issue</a></div>
      </div>
      <div class="sub"><span class="badge">${esc(d.date)}</span></div>
    </div>

    <article class="card">
      <h2>${esc(d.title)}</h2>
      <div>${d.html}</div>
    </article>
  </div>
</body>
</html>`;

  await fs.writeFile(path.join(dayDir, 'index.html'), dayHtml, 'utf8');
}

console.log(`Built site-dist for week ${weekStart.toISODate()} → ${endDate.toISODate()} (${TZ})`);
console.log(`Output: ${dist}`);
