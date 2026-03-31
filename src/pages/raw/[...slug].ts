import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getCollection('paths');
  return paths.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props as { entry: { id: string } };
  const rawPath = path.join(process.cwd(), 'src', 'content', 'paths', `${entry.id}.md`);
  const rawContent = fs.readFileSync(rawPath, 'utf-8');
  return new Response(rawContent, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
