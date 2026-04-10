import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const paths = await getCollection('paths');
  const sorted = [...paths].sort((a, b) => b.data.updated.localeCompare(a.data.updated));
  const baseUrl = 'https://pathkit-production.up.railway.app';

  const items = sorted.map((p) => `
    <item>
      <title><![CDATA[${p.data.title}]]></title>
      <link>${baseUrl}/paths/${p.id}</link>
      <description><![CDATA[${p.data['ai-summary']}]]></description>
      <author>${p.data.author}</author>
      <pubDate>${new Date(p.data.updated + '-15').toUTCString()}</pubDate>
      <guid>${baseUrl}/paths/${p.id}</guid>
      <category>${p.data.difficulty}</category>
      ${p.data.tools.map((t: string) => `<category>${t}</category>`).join('\n      ')}
    </item>`).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>pathkit — The Path Registry</title>
    <link>${baseUrl}</link>
    <description>Real AI workflows from real projects. Structured for humans and AI agents.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
