import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const paths = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paths' }),
  schema: z.object({
    title: z.string(),
    goal: z.string(),
    tools: z.array(z.string()),
    'time-actual': z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    'result-quality': z.enum(['draft', 'presentation', 'production']),
    author: z.string(),
    updated: z.string(),
    'ai-summary': z.string(),
    icon: z.string().optional(),
    thumbnail: z.string().optional(),
    visibility: z.enum(['public', 'private', 'unlisted']).default('public'),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { paths };
