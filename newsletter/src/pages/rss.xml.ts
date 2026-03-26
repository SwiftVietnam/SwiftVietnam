import type { APIRoute } from 'astro';
import dataset from '../data/news.generated.json';

export const GET: APIRoute = () => {
  const siteUrl = 'https://swiftvietnam.dev';

  const items = (dataset.items || []).map((item) => {
    const pubDate = new Date(item.publishedAt).toUTCString();
    const description = item.summaryVi || item.summaryEn || '';
    const link = `${siteUrl}${item.url}`;
    const enclosure = item.coverImage
      ? `<enclosure url="${item.coverImage}" type="image/jpeg" />`
      : '';
    const tags = (item.tags || []).map((t: string) => `<category>${t}</category>`).join('\n      ');
    return `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
      ${enclosure}
      ${tags}
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SwiftVietnam News</title>
    <link>${siteUrl}/news/</link>
    <description>Tin tức Apple cho lập trình viên iOS/macOS Việt Nam</description>
    <language>vi</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/logo.png</url>
      <title>SwiftVietnam News</title>
      <link>${siteUrl}/news/</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
