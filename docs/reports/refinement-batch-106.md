# Refinement Batch 106 — Author Card

Status: Refined; article context, Shopify privacy/consumer, multi-author,
visual, Figma, and human decisions required; remains `pilot`

Date: 2026-07-17

Component: Author Card (`L6`, dependency order `120`)

## Outcome

Batch 106 replaces divergent guessed section/aside semantics, Button-styled
destinations and hidden compact content with one fail-closed neutral author
identity, canonical Avatar and Link composition, semantic full/compact output,
intrinsic layout, exact Exhibit/Studio parity, privacy-safe Shopify mapping, and
zero neutral runtime.

## Delivered

- Permanent L6 dossier, detailed audit, ADR 0197, Shopify adapter documentation
  and explicit context/privacy/multi-author/visual/Figma questions.
- Contract and Studio `0.2.0`, registry Avatar/Link dependencies, MDX, canonical
  Blog CSS, shared `AuthorCardArtwork`, and explicit data/Avatar/Link fixtures.
- Required-name omission, neutral root/name semantics, optional-part omission,
  full-only biography/Links, compact semantic omission, singular author scope,
  and target-owned article/data/privacy boundaries.
- Logical token-backed intrinsic geometry, complete text/Link wrapping,
  canonical Link focus/motion, corrected AA Nav hover, 44px destinations and
  zero L6 JavaScript.
- A validated passive Shopify snippet with explicit author source fallback,
  image/bio mapping, no derived initials, and homepage/email off until explicit
  opt-in plus localized labels.
- Four copied baseline images and seventeen final captures across paired
  viewports, compact, missing optionals, localized RTL/unbroken 200px, 200% type,
  text spacing, dark, forced colors and reduced motion.
- Regenerated Neutral Web, Webflow and Shopify projections; `site/dist`
  untouched; all owned browser/server resources closed.

## Verification Summary

- Neutral `DIV`/`P` anatomy, blank-name omission, canonical Avatar and two native
  Links, optional omission, compact DOM omission, native navigation, 44px
  keyboard targets, visible focus, high contrast, forced colors, reduced motion
  and zero runtime pass without console/page errors.
- State auditing found the canonical Nav hover at `3.56:1` light; the dependency
  correction now passes `5.88:1` light / `9.95:1` dark without an L6 override.
- Every paired natural viewport and 200px/200%-type/text-spacing stress has zero
  root, part and document overflow. RTL logical order and complete wrapping pass.
- Exhibit/Studio equal-width parity hashes are `71688a0c` DOM and `60fd8fed`
  selected computed style.
- Neutral Web validates 183 components. Shopify validates 83 target-ready, 55
  dedicated ready Liquid and 32/32 schema-ready surfaces; the official Shopify
  Liquid validator also passes Author Card.
- Structural Web readiness, static previews, TypeScript and temporary production
  build pass. Final resource gate confirms port 4173 free, server stopped and
  `gallery-refinement` closed. The complete matrix and short hover remediation
  check were separate bounded phases, each with one hermetic browser, one tab
  and one fixed-port server; cleanup passed between them and no resource
  overlapped.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| L6 CSS slice | `1,278 B / 490 B gzip` | `1,550 B / 474 B gzip` | component observation | `-16 B` gzip |
| Blog CSS | `5,486 B` gzip | `5,496 B` gzip | `5,529 B` | pass; `33 B` headroom |
| Neutral Web component CSS | `69,080 B` gzip | `69,092 B` gzip | `65,536 B` | pre-existing global gap `3,556 B`; `+12 B` batch delta |
| Shared neutral runtime | `10,501 B` gzip | `10,501 B` gzip | `8,192 B` | pre-existing global gap; `0 B` batch delta |
| L6 runtime/resources | `0` | `0` | zero neutral runtime | pass |

## Risks And Open Questions

- Approve article wrapper/placement and contextual name heading/Link policy.
- Approve Shopify author source, contact privacy, localized labels, first
  consumer and headless mapping.
- Decide multi-author grouping and role/social extension ownership.
- Approve final full/compact surface, Avatar, type/rhythm, Link/icon, intrinsic
  wrapping and responsive visuals.
- Resolve canonical Avatar fallback separately and supply L6-specific Figma/
  page-context evidence plus explicit human review.
- Complete Web CSS/runtime remain above program ceilings; Blog passes and L6
  adds no runtime.

## Readiness Decision

`refined-decision-needed`. Safe neutral and passive target work is complete, but
open owner product/architecture decisions prevent human stability review and
`stable` promotion. Contract remains `pilot`.
