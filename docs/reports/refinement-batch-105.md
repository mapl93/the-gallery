# Refinement Batch 105 — Table of Contents

Status: Refined; Shopify heading data, sticky/current-state architecture,
visual, Figma, and human decisions required; remains `pilot`

Date: 2026-07-17

Component: Table of Contents (`L5`, dependency order `119`)

## Outcome

Batch 105 replaces an optionally unnamed, flat and duplicated article index
with one fail-closed named native navigation, real ordered-list hierarchy,
canonical Links, truthful optional current-location semantics, intrinsic
logical layout, exact Exhibit/Studio parity, and zero neutral runtime.

## Delivered

- Permanent L5 dossier, detailed audit, ADR 0196, Shopify adapter boundary, and
  explicit heading-data/sticky/tracking/visual/Figma questions.
- Contract and Studio `0.2.0`, registry Link dependency, MDX, canonical Blog CSS,
  shared `TableOfContentsArtwork`, and nested semantic fixture.
- Required label/items omission, optional neutral title, native `nav/ol/li/a`,
  stable fragments, exactly one optional `aria-current="location"`, and no
  custom widget/live-region behavior.
- Logical token-backed geometry, Body Small type, complete wrapping, actual
  hierarchy, canonical Link state ownership, non-color current cues, forced-
  color safety, and zero L5 JavaScript/motion.
- Four copied baseline images and fourteen final images across paired viewports,
  sticky, localized deep RTL/unbroken 200px, 200% type, text spacing, dark,
  forced colors and reduced motion.
- Regenerated Neutral Web, Webflow and Shopify projections; `site/dist`
  untouched; all owned browser/server resources closed.

## Verification Summary

- Native landmark/list/link anatomy, required/optional omission, one truthful
  current location, native fragment navigation, keyboard focus, contrast,
  forced colors, reduced motion and zero runtime pass without console/page
  errors.
- Every paired natural viewport and 200px/200%-type/text-spacing stress case has
  zero root, Link and document overflow. RTL nesting and current border switch
  to the logical right side.
- Exhibit/Studio equal-width parity hashes are `bfb46aa3` DOM and `612e7e4a`
  selected computed style.
- The first complete pass exposed a `3.56:1` light current-link failure. The
  corrected semantic mix passes at `5.88:1` light and `9.95:1` dark while Blog
  remains below its fixed budget.
- Neutral Web validates 183 components. Shopify validates 82 target-ready, 54
  dedicated ready Liquid and 32/32 schema-ready surfaces; L5 intentionally
  remains planned pending heading/id ownership.
- Structural Web readiness, static previews, shared-renderer/visual/interaction
  coverage, TypeScript and temporary production build pass. Final resource gate
  confirms port 4173 free, managed server stopped, and `gallery-refinement`
  closed after one hermetic browser, one tab and one fixed-port server per phase.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| L5 CSS slice | `1,190 B / 555 B gzip` | `1,402 B / 542 B gzip` | component observation | `-13 B` gzip |
| Blog CSS | `5,457 B` gzip | `5,486 B` gzip | `5,529 B` | pass; `43 B` headroom |
| Neutral Web component CSS | `69,074 B` | `69,080 B` | `65,536 B` | pre-existing global gap `3,544 B`; `+6 B` batch delta |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | pre-existing global gap; `0 B` batch delta |
| L5 runtime/resources | `0` | `0` | zero neutral runtime | pass |

## Risks And Open Questions

- Choose Shopify heading inventory and unique-id ownership.
- Approve sticky host placement, offsets, tall-list/focus behavior and target
  section scroll margins.
- Decide whether any target needs automatic current tracking or a shared
  target-owned reading-state service with L4.
- Approve final surface, typography, spacing, hierarchy/current treatment and
  responsive visuals.
- Supply L5-specific Figma/page-context evidence and explicit human review.
- Complete Web CSS/runtime remain above program ceilings; Blog passes and L5
  adds no runtime.

## Readiness Decision

`refined-decision-needed`. Safe Neutral Web work is complete, but open owner
product/architecture decisions prevent human stability review and `stable`
promotion. Contract remains `pilot`.
