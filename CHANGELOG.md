# Changelog

All notable changes to **the Open Small Models Accord** and the **openslm.ai** site
that hosts it. Each accord version is a discrete public artifact; the website carries
the current version and links to past versions via [GitHub releases][rel].

The accord is released under [CC0 1.0][cc0]. The website code is MIT.

[rel]: https://github.com/openslm-ai/website/releases
[cc0]: https://creativecommons.org/publicdomain/zero/1.0/

This file follows the spirit of [Keep a Changelog][kac] and [Semantic Versioning][sv]
applied to a document: `MAJOR.MINOR.PATCH` where MINOR bumps signal substantive
revision and MAJOR signals a canonical release.

[kac]: https://keepachangelog.com/en/1.1.0/
[sv]: https://semver.org/

## [0.2.0] — 2026-04-25

Substantive draft revision. Restructured the accord around ten principles
(previously eleven) and introduced new vocabulary throughout.

### Accord text

- **Restructured to ten principles.** The previous §9 ("where the work happens")
  and §10 ("the window") merged into a single §9 ("Coordination through open
  standards bodies matters now"). Old §11 became §10.
- **§ 2 — LWD-R expanded.** Added explicit treatment of routing/gating, MoE
  architectures, derivative releases, tokenizer disclosure, deployed vs.
  nominal Representation, and provenance through derivation chains.
- **§ 3 — Tokenizer openness.** Added language-coverage paragraph: a tokenizer
  trained primarily on English fragments other languages and constrains what
  any model built on it can learn about them.
- **§ 4 — New vocabulary.** Introduced *inference forkability*, *training
  forkability*, *compute capture*, and *data capture* as named terms.
- **§ 5 — Hardware capture.** Edge deployment escapes cloud capture but remains
  within hardware capture if NPUs, runtimes, or distribution channels are
  closed. ONNX/GGUF and open execution specifications named.
- **§ 7 — Agents rewritten.** *Action boundary* and *harness* defined as
  first-class disclosure surfaces alongside the model. Skills and tool
  specifications, deployment-time variables (system prompts, decoding,
  retrieval pipelines), and multi-run agent evaluation explicitly addressed.
- **§ 8 — Evaluation.** Harness specifications, multi-run protocols, transcript
  release, and honest cost disclosure called out as separating evaluation from
  marketing.
- **§ 10 — Accountability.** Rewritten around release-level disclosure and the
  community's role in contesting endorsements that diverge from practice.

### Site

- **Maintainability foundation.** Single source of truth for accord version
  metadata at `src/lib/accord-meta.mjs`. Bumping a version is now a one-file
  edit; the homepage stamp, the accord page, JSON-LD, llms.txt, and the
  version-history page all derive from it.
- **Single build pipeline for the accord artifact.** `scripts/build-accord.mjs`
  generates both `public/downloads/accord.md` and `public/downloads/accord.pdf`
  from the canonical MDX in `src/content/accord/`. PDF generation soft-fails if
  pandoc is not installed (markdown still ships).
- **Homepage.** New "Ten principles" grid: each principle is a clickable card
  linking to the corresponding accord section. The version pill on the hero is
  removed; the version belongs on the accord, not on the brand.
- **Research page.** LWD-R prose updated to v0.2 detail. New glossary section
  defining *inference forkability*, *training forkability*, *compute capture*,
  *data capture*, *hardware capture*, *action boundary*, *harness*, *DPI*,
  *EPI* with section-level links back into the accord.
- **Version-history page.** Now shows only the current version and the planned
  path to canonical. Past versions live as tagged GitHub releases — they are
  no longer catalogued on the website.
- **JSON-LD enriched.** Article schema gains `keywords`, `copyrightHolder`,
  `mainEntityOfPage`, and `encoding` entries pointing at the markdown and PDF.
  Added a `DefinedTermSet` for LWD-R and its four `DefinedTerm` entries.
- **llms.txt.** Bumped to ten sections, added the v0.2 vocabulary block, and
  pointed at both download URLs.
- **OG image.** Stale "v0.1 DRAFT · 6 APRIL 2026" eyebrow replaced with the
  permanent "OPEN. ACCESSIBLE. CORRECTABLE." line so the OG card does not
  date itself.
- **Footer.** Site-wide version pill removed. The footer "Read" link points to
  `/accord/` instead of an obsolete `/#accord` anchor.

## [0.1.0] — 2026-04-06

Initial draft. Eleven sections plus preamble and closing matter. LWD-R framework
introduced. Direction-of-travel framing for endorsement. CC0 1.0; site live at
openslm.ai. Circulated to an invited set of practitioners for review.
