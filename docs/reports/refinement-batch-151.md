# Refinement Batch 151

Date: 2026-08-10

Component: L1 Article Card

Result: `human-review-ready`; remains `pilot`

## Decision Closure

- Added accepted ADR 0267 for the owner-selected L1-A direction.
- One native Link contains contextual media, passive summary content, and the
  complete title; category, author, and future conflicting interactions remain
  outside it.
- Canonical Card owns default/flat/elevated surface while Article Card keeps
  standard/featured/minimal/horizontal/editorial as an independent layout axis.
- `excerptLines: none | 2 | 3 | 4` applies explicit visual fitting without
  shortening target source content.
- Canonical Skeleton is an external loading composition; L1 has no loading
  variant, busy lifecycle, placeholder markup, or runtime.
- Final inspection added token-based footer clearance so the 4px primary-Link
  focus outline does not cover the author.

## Evidence

- Contract `0.3.0`, registry, MDX, Studio definition, shared renderer, Shopify
  snippet, dossier, audit, ADR, and progress matrix agree.
- One `ArticleCardArtwork` and fixture serve Exhibit and Studio; Related
  Articles consumes the same renderer rather than duplicating L1 behavior.
- Exact `512px` parity: normalized DOM `8680eb46`, selected computed styles
  `7bf1e286`.
- One passive `ARTICLE`, one native Link, no nested interactive descendants or
  root delegation, canonical Card media/body/footer, passive Badge outside the
  Link, contextual alt, and machine-readable date/duration values.
- Pointer and Enter activate the Link; focus is a solid `4px` outline that
  clears the author and remains visible in forced colors.
- All five layouts, three surfaces, independent axes, optional omission,
  blank-required fail-closed behavior, and complete/2/3/4-line excerpt modes
  pass. All 302 supplied excerpt characters remain in DOM.
- Mobile, Tablet, Desktop, and XL in both modes; localized RTL at `200px`;
  effective `200%` text at `320px`; dark; forced colors; and reduced motion pass
  without overflow, console errors, page errors, or active reduced-motion
  animation.
- Machine-readable results and visual artifacts are in
  `output/playwright/refinement-batch-151/`.

## Performance

- L1 CSS: `4,884 B` raw / `1,277 B` gzip; neutral L1 runtime: `0 B`.
- Blog CSS: `5,603 B` gzip against `5,529 B`, a documented `74 B` family gap.
- Program audit: 18 surfaces, 10 passing, 8 documented gaps, and zero
  undocumented gaps. No ceiling was raised.

## Resource Lifecycle

The run reused one responsive user-owned Gallery server, opened one headless
`gallery-refinement` Playwright session with one page, closed the owned browser,
preserved the external server, and passed `npm run evidence:assert-clean`. No
additional port, tab, server, or normal Chrome process was left behind.

## Remaining Human And Target Gates

- Human approval of five layouts, three surfaces, typography, rhythm, crop,
  category overlay, footer clearance, explicit excerpt fitting, and four
  viewport visuals.
- Live Shopify evidence for query, section/block schema, editor lifecycle,
  locale/date policy, image priority, analytics, and empty/error handling.
- L1-specific Figma artwork/parity remains future work; generic registered
  nodes are not approval.
- No `stable` or live-target promotion was made.
