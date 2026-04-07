import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const paths = await getCollection('paths');

  const allTools = [...new Set(paths.flatMap((p) => p.data.tools))].sort();
  const allAuthors = [...new Set(paths.map((p) => p.data.author))].sort();

  const toolIndex: Record<string, string[]> = {};
  paths.forEach((p) => {
    p.data.tools.forEach((t: string) => {
      if (!toolIndex[t]) toolIndex[t] = [];
      toolIndex[t].push(p.id);
    });
  });

  const toolPairs: Record<string, number> = {};
  paths.forEach((p) => {
    const tools = p.data.tools;
    for (let i = 0; i < tools.length; i++) {
      for (let j = i + 1; j < tools.length; j++) {
        const pair = [tools[i], tools[j]].sort().join(' + ');
        toolPairs[pair] = (toolPairs[pair] || 0) + 1;
      }
    }
  });

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
    version: '2.0',
    description: 'The Path Registry. Each path is a real workflow documented for AI agent replication.',
    totalPaths: data.length,
    totalTools: allTools.length,
    totalAuthors: allAuthors.length,
    agentGuide: '/agent',
    discovery: '/.well-known/ai-plugin.json',
    llmsTxt: '/llms.txt',
    tools: allTools,
    authors: allAuthors,
    toolIndex,
    toolPairs: Object.entries(toolPairs).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([pair, count]) => ({ pair, count })),
    paths: data,
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
