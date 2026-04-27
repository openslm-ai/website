import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const accord = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/accord' }),
  schema: z.object({
    order: z.number(),
    number: z.number().nullable(),
    title: z.string(),
    anchor: z.string(),
  }),
});

const references = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/references' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).optional(),
    year: z.number().optional(),
    url: z.string().url().optional(),
    type: z.enum(['standard', 'paper', 'specification', 'organization', 'article']),
    relevance: z.array(z.number()).optional(),
    note: z.string().optional(),
  }),
});

const disclosures = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/disclosures' }),
  schema: z.object({
    signatory: z.string(),
    date: z.coerce.date(),
    release: z.string(),
    layers: z.object({
      logic: z.enum(['met', 'partial', 'gap']),
      weights: z.enum(['met', 'partial', 'gap']),
      data: z.enum(['met', 'partial', 'gap']),
      representation: z.enum(['met', 'partial', 'gap']),
    }),
    notes: z.string().optional(),
  }),
});

export const collections = { accord, references, disclosures };
