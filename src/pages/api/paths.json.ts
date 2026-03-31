import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const paths = await getCollection('paths');

  const data = paths.map((p) => ({
    id: p.id,
    title: p.data.title,
    goal: p.data.goal,
    tools: p.data.tools,
    difficulty: p.data.difficulty,
    resultQuality: p.data['result-quality'],
    timeActual: p.data['time-actual'],
    author: p.data.author,
    updated: p.data.updated,
    aiSummary: p.data['ai-summary'],
    urls: {
      rendered: `/paths/${p.id}`,
      raw: `/raw/${p.id}`,
    },
  }));

  return new Response(JSON.stringify({
    registry: 'arch-kb',
    version: '1.0',
    totalPaths: data.length,
    paths: data,
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
