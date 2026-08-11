# Refinement Batch 103 — Article Hero

Status: Refined; visual, media-policy, metadata, target-consumer, and human
decisions required; remains `pilot`

Date: 2026-07-17

Component: Article Hero (`L2`, dependency order `116`)

## Outcome

Batch 103 replaces viewport/Studio response forks, duplicated markup,
inverse-on-transparency and empty-column failures, and fixed global padding with
one passive native Article Hero, one shared Exhibit/Studio renderer, three
intrinsic variants, readable missing-media states, and zero neutral runtime.

## Delivered

- Permanent L2 dossier, detailed audit, ADR 0194, Shopify mapping, and explicit
  visual/media/metadata/target-consumer questions.
- Contract and Studio `0.2.0`, registry, MDX, canonical Blog CSS, shared
  `ArticleHeroArtwork`, and semantic Blog Studio fixture.
- Native header/contextual heading/time semantics, contextual alt, visual-only
  overlay, hidden separators, complete content, and fail-closed required title.
- Named-container response, logical dimensions, stable on-image text, bounded
  full/text and split-specific private padding, zero motion, and no Studio L2
  implementation fork.
- Validated native Shopify snippet with verified Article data, explicit flags/
  variant/heading/loading/sizes/alt policy, and no inferred duration, taxonomy,
  query, SEO, navigation, or JavaScript.
- Four retained baseline images and sixteen final images across four viewports,
  container variants, missing-media states, 200px RTL/unbroken content,
  effective 200 percent, dark, forced colors, and reduced motion.
- Regenerated Neutral Web, Webflow, and Shopify projections; `site/dist`
  untouched; all owned server/browser resources closed.

## Verification Summary

- DOM is one passive header with one contextual heading, paragraph category,
  informative media alt, hidden overlay/separators, valid machine-readable
  metadata, and zero interactive/live/runtime behavior.
- Split changes from one 600px column to `350px 350px` at 700px; missing full/
  split media remains readable in one column. Normal viewports, localized RTL
  200px, and effective 200-percent/320px have zero part/document overflow.
- Exhibit/Studio exact-640px parity hashes are `81ae4007` DOM and `541b5aeb`
  selected computed style.
- Conservative full-image contrast is `7.81:1` on the brightest composite and
  `21:1` on black; dark/forced-colors/reduced-motion states pass.
- Neutral Web validates 183 components. Shopify validates 81 target-ready and
  53 dedicated ready Liquid surfaces; official L2 Liquid validation passes.
- Final resource hygiene gate: managed server stopped and
  `gallery-refinement` closed. Successful captures used one hermetic browser,
  one tab, and one fixed-port server only while collecting evidence. The
  initial default-browser compatibility timeout was terminated and cleaned
  before final capture.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| L2 CSS slice | `842 B` | `1,123 B` | component observation | `+281 B` gzip |
| Blog CSS | `4,908 B` | `5,197 B` | `5.4 KiB` | pass; about `332 B` headroom |
| Neutral Web component CSS | `68,640 B` | `68,883 B` | `65,536 B` | pre-existing global gap `3,347 B`; L2 delta `+243 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | pre-existing global gap; L2 delta `0 B` |
| Shopify L2 runtime | `0 B` | `0 B` | target observation | passive Liquid/CSS |

## Risks And Open Questions

- Final surface/elevation, media crop/focal point, type/rhythm, overlay, and
  three-variant visual approval.
- Full-without-media product policy and category/author Link policy.
- Metadata fields, ordering, localization, and reading-duration source.
- First Shopify consuming section/template and its schema/query/lifecycle.
- Corrected L2-specific Figma artwork and explicit human stability review.
- Complete Web CSS and shared runtime remain above pre-existing program
  ceilings; L2 stays inside Blog budget and adds no runtime.

## Readiness Decision

`refined-decision-needed`. Safe neutral and target-native work is complete, but
open human/product/architecture choices prevent cross-target human-review-ready
status and `stable` promotion. Contract remains `pilot`.
