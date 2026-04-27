# openslm.ai website

Source for [openslm.ai](https://openslm.ai), the home for the Open Small
Models Accord and related work on open, accessible, and correctable AI.

Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Development

```sh
npm install
npm run dev      # local dev server with HMR
npm run build    # static build to ./dist
npm run preview  # serve the built site
```

Node 22+ is required.

## Structure

```
src/
  content/
    accord/         # one MDX file per accord section (preamble + §1–§11)
    references/     # standards, papers, and organizations the accord draws on
    disclosures/    # placeholder for the public LWD-R registry
  content.config.ts # collection schemas (Zod)
  layouts/          # BaseLayout, PageLayout, AccordLayout
  components/       # site chrome and small reusable pieces
  pages/            # routes
  styles/global.css # Tailwind v4 + minimal custom CSS
public/
  CNAME             # custom domain for GitHub Pages
  llms.txt          # guidance for language models on what the site is and how to cite it
  robots.txt
  downloads/        # downloadable accord (markdown + PDF)
.github/workflows/
  deploy.yml        # GitHub Pages deploy
```

## Contributing

The site is intentionally small and document-shaped. Contributions that fit:

- Corrections to the accord text, the references, or the prose on other pages
  (open an issue first if the change is more than a typo)
- Improvements to typography, accessibility, or page weight
- Adding references with a clear note on relevance to the accord

Contributions that do not fit:

- New features, animations, or interactive elements
- Search, comments, analytics, or tracking
- Theme switchers, dark mode toggles, or visual ornamentation

The visual register is "standards document," not "product." When in doubt,
err toward less.

## License

- Content (accord text, prose, reference notes): [CC0 1.0](LICENSE)
- Code (Astro components, layouts, configuration): [MIT](LICENSE-CODE)
