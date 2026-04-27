import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://openslm.ai',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date('2026-04-06'),
      serialize(item) {
        if (item.url === 'https://openslm.ai/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url === 'https://openslm.ai/accord/') {
          item.priority = 0.95;
          item.changefreq = 'weekly';
        } else if (
          item.url === 'https://openslm.ai/research/' ||
          item.url === 'https://openslm.ai/faq/'
        ) {
          item.priority = 0.85;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
