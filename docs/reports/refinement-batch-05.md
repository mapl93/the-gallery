# Refinement Batch 05: Progress, Spinner, Stat

Date: 2026-07-13

Status: Spinner and Stat ready for human review; Progress refined with one
explicit architecture/visual blocker; none promoted to `stable`

## Batch Result

| Component | Contract | Technical result | Human/architecture input |
| --- | --- | --- | --- |
| Progress Bar / Circle | `0.3.0` | Valid range/state normalization, truthful indeterminate semantics, responsive Bar, semantic type, forced colors | Choose Circle long visible-value policy |
| Spinner | `0.3.0` | Decorative/Status ownership, four sizes, canonical padding, content resilience, reduced motion, forced colors | Approve diameter/stroke/speed/spacing |
| Stat / Statistic | `0.3.0` | Passive target formatting, direction without sentiment, OpenType switches, semantic type, responsive root/group | Approve hierarchy/weights/colors/grid minimum |

ADR 0063 already owns all three semantic boundaries; ADR 0054 owns numeric
properties. This batch adds no public property, token layer, or new architecture
decision. The unresolved Circle choice is recorded rather than assumed.

## Shared Evidence

- 24 canonical screenshots: three components, Exhibit and Studio, Mobile
  `390 x 844`, Tablet `768 x 1024`, Desktop `1280 x 800`, and XL
  `1600 x 1000`.
- 16 supplemental images: five baselines plus comparable and stronger after
  cases, Progress/Spinner forced colors, Stat forced colors, and reduced-motion
  state evidence.
- Exhibit and Studio initial roots are byte-identical: Progress `398`, Spinner
  `187`, Stat `350` tested bytes.
- Browser console output contains only the existing docs `/favicon.ico` `404`;
  no component exception or warning was observed.

Evidence directory: `output/playwright/refinement-batch-05/`.

## Source Changes

- Progress: body-small/caption type, Bar wrapping, valid range/state merge,
  truthful indeterminate attributes/content, empty-name visibility, and system
  forced colors.
- Spinner: bounded canonical overlay, wrapping, body leading, forced-colors
  head/track, and removal of the Studio padding override.
- Stat: H2/body/caption type pairs, root/part wrapping, container-capped grid,
  direction wording/selectors, and removal of the Studio minimum width.
- Contracts, registry, Studio presentation metadata, MDX, dossiers, Web adapter,
  and Shopify adapter are reconciled. `site/dist` was not rebuilt.

## Performance

| Surface | Current gzip | v1 ceiling | Result |
| --- | ---: | ---: | --- |
| Neutral component CSS | `56,828 B` | `64 KiB` | pass |
| Shared enhancement JS | `5,180 B` | `8 KiB` | pass |
| Primitives CSS | `9,631 B` | `10.3 KiB` | pass |

All three components add `0 B` component JavaScript and no listener, observer,
timer, request, asset, or continuous background work. Indeterminate CSS motion
stops under reduced motion.

## Remaining Risks And Questions

1. Progress Circle needs owner/architecture input: compact-only contract,
   separate visible/accessibility value properties (recommended), or a defined
   truncation/scaling rule.
2. All three still require owner visual approval; automated evidence cannot
   promote them to `stable`.
3. Stat free-form change text can contradict its direction. Targets must validate
   sign/word consistency; Studio intentionally exposes rather than rewrites
   authored invalid content.
4. Existing Shopify maturity warnings and the docs build chunk warning remain
   repository backlog, not regressions from this batch.

## Validation

- Registry, token source, 183 contracts, 183 Studio definitions, and 183 MDX
  pages validate.
- Web and Shopify component adapters are generated and validate; existing
  Shopify maturity warnings remain non-blocking backlog.
- Token/component coverage, refinement audit, and `git diff --check` pass.
- Structural certification is automated evidence only; human review remains
  mandatory.

## Next Dependency-Ordered Batch

Continue phase 2 with Data Table, Data List / Description List, and Timeline.
Progress can remain in the decision queue while independent batches continue.
