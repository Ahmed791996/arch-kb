import { getCollection } from 'astro:content';
import { users } from './users';

export async function buildSearchIndex() {
  const paths = await getCollection('paths');

  const pathItems = paths.map((p) => ({
    type: 'path',
    title: p.data.title,
    description: p.data.goal,
    tags: p.data.tools.join(', ') + ', ' + p.data.author + ', ' + p.data.difficulty,
    url: `/paths/${p.id}`,
  }));

  const toolSet = [...new Set(paths.flatMap((p) => p.data.tools))];
  const toolItems = toolSet.map((t) => ({
    type: 'tool',
    title: t,
    description: `Tool used in ${paths.filter((p) => p.data.tools.includes(t)).length} paths`,
    tags: t,
    url: `/tools/${t.toLowerCase().replace(/[\s.]+/g, '-')}`,
  }));

  const userItems = users.map((u) => ({
    type: 'user',
    title: u.displayName,
    description: `${u.role} · ${u.affiliation}`,
    tags: u.username + ', ' + u.affiliation,
    url: `/user/${u.username}`,
  }));

  const pageItems = [
    { type: 'page', title: 'Explore', description: 'Browse all published paths', tags: 'explore browse search', url: '/explore' },
    { type: 'page', title: 'Prompt Library', description: 'Working prompts from all paths', tags: 'prompts prompt library', url: '/prompts' },
    { type: 'page', title: 'Learning Paths', description: 'Structured beginner to advanced tracks', tags: 'learn learning track course', url: '/learn' },
    { type: 'page', title: 'Templates', description: 'Downloadable .path.md templates', tags: 'template download starter', url: '/templates' },
    { type: 'page', title: 'Collections', description: 'Curated path collections', tags: 'collection playlist curated', url: '/collections' },
    { type: 'page', title: 'Leaderboard', description: 'Top contributors and paths', tags: 'leaderboard ranking top', url: '/leaderboard' },
    { type: 'page', title: 'Activity Feed', description: 'Recent activity across the platform', tags: 'feed activity recent', url: '/feed' },
    { type: 'page', title: 'Compare Tools', description: 'Side-by-side tool comparisons', tags: 'compare comparison versus vs', url: '/compare' },
    { type: 'page', title: 'Tool Graph', description: 'Interactive visualization of the tool ecosystem', tags: 'graph visualization network tools connections ecosystem', url: '/graph' },
    { type: 'page', title: 'Path Remix', description: 'Build custom workflows by selecting tools', tags: 'remix builder compose custom workflow tools mix', url: '/remix' },
    { type: 'page', title: 'Agent Protocol', description: 'How AI agents discover and use this registry', tags: 'agent protocol api llm ai machine readable discovery', url: '/agent' },
    { type: 'page', title: 'Documentation', description: 'How to write and publish .path.md files with Claude Code', tags: 'docs documentation guide claude code publish write how to', url: '/docs' },
  ];

  return [...pathItems, ...toolItems, ...userItems, ...pageItems];
}
