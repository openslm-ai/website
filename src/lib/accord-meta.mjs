// Single source of truth for accord version metadata.
//
// Bumping a version: edit this file. Then run `npm run build`. Everything
// downstream — the markdown download, the PDF target, the homepage hero
// pill, the accord page stamp, the JSON-LD, llms.txt, the version-history
// page entry list — derives from these constants.
//
// Convention:
//   VERSION       — semver string: "0.2.0", "1.0.0", etc.
//   LABEL         — display label: "0.2 (draft)", "1.0", etc.
//   STATE         — "draft" | "rc" | "canonical"
//   ISSUED        — human-readable date for stamping the document
//   ISSUED_ISO    — ISO 8601 date for <time datetime>, JSON-LD, sitemap
//   TITLE         — accord title (rarely changes)
//   TAGLINE       — subtitle line (rarely changes)
//   AUTHOR        — primary author name + URL
//
// .mjs (not .ts) so the prebuild Node script can `import` it directly.

export const VERSION = '0.2.0';
export const LABEL = '0.2 (draft)';
export const STATE = 'draft';

export const ISSUED = '25 April 2026';
export const ISSUED_ISO = '2026-04-25';

export const TITLE = 'The Open Small Models Accord';
export const TAGLINE = 'On open, accessible, and correctable AI for the next decade.';

export const AUTHOR = {
  name: 'Anivar Aravind',
  url: 'https://anivar.net',
  orcid: '0009-0009-8995-0005',
  orcidUrl: 'https://orcid.org/0009-0009-8995-0005',
};

export const LICENSE = {
  name: 'CC0 1.0',
  url: 'https://creativecommons.org/publicdomain/zero/1.0/',
};

// Short form used in pills and the corner stamp on the accord page.
// Example: "v0.2 · Draft"
export function pillLabel() {
  const stateMap = { draft: 'Draft', rc: 'Release candidate', canonical: 'Canonical' };
  return `v${VERSION.replace(/\.0$/, '')} · ${stateMap[STATE] ?? STATE}`;
}
