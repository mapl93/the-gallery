# Refinement Batch 102 — Article Card

Status: Refined; skeleton, surface, navigation-policy, target-consumer, and
human visual decisions required; remains `pilot`

Date: 2026-07-17

Component: Article Card (`L1`, dependency order `115`)

## Outcome

Batch 102 replaces duplicate media/title Links, root-wide motion cues, clipped
editorial content, duplicated Badge styling, viewport/Studio response forks,
and copied Related Articles markup with one passive native Article Card and one
shared Exhibit/Studio/Related Articles renderer.

L1 now has one required complete title destination, passive contextual media,
canonical Badge category, target metadata/author slots, complete wrapping
content, five container-responsive variants, a validated native Shopify
Article projection, and no neutral JavaScript.

## Delivered

- Permanent L1 dossier, detailed audit, ADR 0193, Shopify mapping, and explicit
  skeleton/surface/navigation/metadata/target questions.
- Contract and Studio `0.2.0`, registry, MDX, canonical Blog CSS, shared
  `ArticleCardArtwork`, Blog/Related Articles consumption, and conditional
  honest external feedback.
- Native `article`/heading/Link/time/footer semantics, one primary destination,
  contextual alt, hidden separator, canonical Badge ownership, and fail-closed
  required title/href rendering.
- Named-container featured/horizontal response, full available inline size,
  logical dimensions, complete content, zero L1 motion, and no Studio-specific
  surface or breakpoint implementation.
- Validated Shopify snippet with native Article data, responsive image, explicit
  flags/variant/heading/loading, optional passed label, and no inferred duration,
  taxonomy, truncation, navigation forwarding, or JS.
- Four retained baseline images and fourteen final images across four viewports,
  equal-container parity, container variants, 200px RTL/unbroken content,
  effective 200 percent, dark, forced colors, and reduced motion.
- Regenerated Neutral Web, Webflow, and Shopify projections; `site/dist`
  untouched; all owned server/browser resources closed.

## Verification Summary

- 183 registry/contracts/Studio/MDX entries validate; 251 previews have zero
  errors; 183 automated readiness gates pass; Exhibit/Studio structural sharing
  remains 183/183.
- DOM has one passive article, one contextual heading/title Link, zero media
  Links, canonical Badge, valid machine-readable metadata, footer author, and
  zero internal live regions or L1 runtime.
- Featured and horizontal switch from Flex to Grid at their private container
  thresholds. Normal viewports, forced widths, localized RTL/unbroken text, and
  effective 200-percent text all have zero part/document overflow.
- Exhibit/Studio exact-512px parity hashes are `66b026c1` DOM and `53d3d73a`
  selected computed style.
- Dark contrast is `17.18:1`/`12.09:1`/`12.09:1`; forced colors retains a solid
  4px Link outline; reduced motion has no L1 transition or transform.
- Neutral Web validates 183 components. Shopify validates 80 target-ready and
  52 dedicated ready Liquid surfaces; official L1 Liquid revision 1 passes.
- Final resource hygiene gate: server stopped, `gallery-refinement` closed,
  port 4173 free. No parallel servers, browsers, or tabs were used.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| L1 CSS slice | `1,294 B` | `1,315 B` | component observation | `+21 B` gzip |
| Blog CSS | `4,803 B` | `4,908 B` | `5.4 KiB` | pass; about `621 B` headroom |
| Neutral Web component CSS | `68,597 B` | `68,640 B` | `65,536 B` | pre-existing global gap `3,104 B`; L1 delta `+43 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | pre-existing global gap; L1 delta `0 B` |
| Shopify L1 runtime | `0 B` | `0 B` | target observation | passive Liquid/CSS |

## Risks And Open Questions

- Skeleton state versus canonical Skeleton composition.
- Default surface/elevation, media crop, rhythm, and five-variant visual approval.
- Permanent title-only destination versus a future supported combined Link.
- Category/author destinations, duration/localization, and truncation policy.
- First Shopify consuming section/block/template and its query/schema/lifecycle.
- Corrected L1-specific Figma artwork and explicit human stability review.
- Complete Web CSS and shared runtime remain above pre-existing program ceilings;
  L1 stays inside Blog family budget and adds no runtime.

## Readiness Decision

`refined-decision-needed`. Safe neutral and target-native work is complete, but
open human/product/architecture choices prevent cross-target human-review-ready
status and `stable` promotion. Contract remains `pilot`.
