# Contributing to openslm.ai

Thanks for your interest in the [Open Small Models Accord](https://openslm.ai)
and the site that hosts it. This document covers the kinds of contributions we
look for, the standards we hold them to, and the mechanics of getting a change
in.

The site is intentionally small and document-shaped. The visual register is
"standards document," not "product." When in doubt, err toward less.

## What we look for

In rough order of how much we welcome them:

1. **Corrections to the accord text.** Typos, broken anchors, factual errors,
   citation fixes. Substantive wording changes need an issue first so the
   thinking is visible.
2. **Translations.** The accord is CC0. See
   [`src/content/translations/_TEMPLATE.mdx.txt`](src/content/translations/_TEMPLATE.mdx.txt)
   and the public guide at [/translations](https://openslm.ai/translations/).
3. **FAQ entries.** A question we have not answered, with a careful answer.
   See `src/content/faq/`.
4. **Accessibility, typography, and page-weight improvements.** Smaller
   payload, better screen-reader experience, sharper rendering on more
   devices.
5. **Reference additions.** Standards, papers, or organizations that the
   accord meaningfully draws on, with a one-line note on relevance.
6. **Tooling.** Build scripts, link checking, schema validation for the
   forthcoming LWD-R disclosures.

## What we do not look for

- New features, animations, or interactive elements.
- Search, comments, analytics, or tracking.
- Theme switchers, dark mode toggles, or visual ornamentation.
- AI-generated prose for the accord itself. Tooling, scaffolding, and code
  comments are fine; the accord text is authored.

## Endorsement

Endorsement is not handled through pull requests right now. The endorsement
process opens after the first wave of conversations. To express interest,
write to <endorse@openslm.ai>. When the registry is live, signatories will be
added through a separate, structured submission process.

## Local development

Node 22+ is required.

```sh
npm install
npm run dev      # local dev server with HMR (also rebuilds accord.md)
npm run build    # static build to ./dist
npm run preview  # serve the built site
```

The accord markdown export at `public/downloads/accord.md` is **generated**
from the MDX in `src/content/accord/` by `scripts/build-accord-md.mjs`. Do not
edit it by hand. The `predev`, `prestart`, and `prebuild` npm hooks run the
script automatically; you can also regenerate it explicitly with
`npm run accord:md`.

## Editorial conventions

These keep the accord readable and translation-friendly.

- **No em-dashes in the accord.** Use commas or parentheses. The dash carries
  too much voice for a standards document, and it complicates translation.
- **Plain HTML over JSX where possible.** MDX is fine, but the accord must
  read cleanly as flat markdown after the build step strips JSX components.
- **Anchors are stable.** If you rename a section anchor, add a redirect or
  update every cross-reference. External citations point at these anchors.
- **One idea per paragraph.** Sections are short on purpose.
- **British or American English are both fine,** but be consistent within a
  single section.

## Pull request mechanics

1. Fork and branch from `main`. Use a short, descriptive branch name
   (`fix/anchor-section-7`, `translation/de`, `faq/legal-binding`).
2. Make focused commits. One logical change per PR is much easier to review
   than a sweep.
3. Run `npm run build` locally before opening the PR. CI runs the same build.
4. Fill in the PR template. The "what changed and why" matters more than the
   "how."
5. Be patient. The maintainer is one person and the project is deliberate.

## Issue templates

We provide templates for the common cases:

- **Accord correction** — typos, factual errors, broken anchors.
- **Translation proposal** — registering a new translation before you start.
- **FAQ suggestion** — a question we should answer.
- **Reference addition** — a standard or paper to cite.
- **Site bug** — broken layout, accessibility issue, slow page.
- **Other** — anything that does not fit the above.

Pick the closest match. We would rather you open an issue in the wrong
template than not open one.

## Code of conduct

Participation in this project is governed by the
[Code of Conduct](CODE_OF_CONDUCT.md), adapted from the Contributor Covenant.
By participating, you agree to uphold it.

## License

By contributing, you agree that:

- **Content** (accord text, prose, references, FAQ, translations) is released
  under [CC0 1.0](LICENSE). You waive copyright on the content you contribute.
- **Code** (Astro components, layouts, scripts, configuration) is licensed
  under [MIT](LICENSE-CODE).

If you have a specific reason a contribution cannot be released under these
terms, open an issue before submitting.

## Getting help

- General questions: <hello@openslm.ai>
- Endorsement: <endorse@openslm.ai>
- Bugs and contributions: <https://github.com/openslm-ai/website/issues>
