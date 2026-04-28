import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const accord = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/accord' }),
  schema: z.object({
    order: z.number(),
    number: z.number().nullable(),
    title: z.string(),
    anchor: z.string(),
    // Which LWD-R layers this principle directly addresses, if any.
    // Used for the layer-tag chips on /accord and the summary grid.
    layers: z.array(z.enum(['L', 'W', 'D', 'R'])).optional(),
    // One-sentence gist used in the final summary grid.
    summary: z.string().optional(),
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

const endorsers = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/endorsers' }),
  schema: z.object({
    name: z.string(),
    type: z.enum([
      'research-institution',
      'model-developer',
      'infrastructure-provider',
      'civil-society',
      'enterprise',
      'standards-body',
      'individual',
    ]),
    url: z.string().url().optional(),
    logo: z.string().optional(),
    country: z.string().optional(),
    date: z.coerce.date(),
    order: z.number().optional(),
    statement: z.string().max(240).optional(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/faq' }),
  schema: z.object({
    order: z.number(),
    question: z.string(),
    anchor: z.string(),
    category: z.string().optional(),
  }),
});

const translations = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/translations' }),
  schema: z.object({
    language: z.string(),                  // English name, e.g. "Spanish"
    language_native: z.string(),           // Native name, e.g. "Español"
    code: z.string(),                      // BCP47, e.g. "es", "pt-BR"
    translator: z.string(),
    translator_url: z.string().url().optional(),
    version: z.string(),                   // accord version this translates
    status: z.enum(['draft', 'complete', 'outdated']),
    url: z.string().optional(),            // hosted location of translation
    date: z.coerce.date(),
  }),
});

export const collections = { accord, references, disclosures, endorsers, faq, translations };
