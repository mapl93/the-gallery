# Refinement Batch 04: Toggle, FAB, Alert

Date: 2026-07-13

Status: Three components ready for human review; none promoted to `stable`

## Batch Result

| Component | Contract | Technical result | Human input |
| --- | --- | --- | --- |
| Toggle / Toggle Group | `0.3.0` | Exclusive pressed-state normalization, normal Tab model, reduced motion, extreme-label resilience, required-name visibility | Borders, selected treatment, extreme wrapping |
| FAB / Back-to-Top | `0.3.0` | Native activation/disabled, hidden focus exclusion, reduced motion, required-name visibility | Visual treatment, physical-right vs logical-end placement |
| Alert / Banner | `0.3.0` | Live-region timing, Close composition, semantic typography, content resilience, strengthened semantic accents | Tint/accent formula, typography and spacing |

ADR 0062 already owns Toggle and FAB's semantic API boundaries. ADR 0069 owns
the docs-only bounded FAB stage. Alert's live-region and passive composition
remain within its existing contract expansion. No new architecture/property ADR
was required; the private Alert accent formula remains visible human-review input.

## Shared Evidence

- 24 canonical screenshots: three components, Exhibit and Studio, Mobile
  `390 x 844`, Tablet `768 x 1024`, Desktop `1280 x 800`, XL `1600 x 1000`.
- 16 supplemental images cover reproduced before/after overflows, Toggle and FAB
  forced-colors focus, FAB dark hover, all four Alert variants in light/dark,
  Alert dismiss focus, and extreme content.
- Exhibit and Studio render byte-identical root markup and fixtures for Toggle,
  FAB, and Alert.
- The only browser console error was the docs site's missing `/favicon.ico`
  (`404`), unrelated to component runtime. No component exception or warning was
  observed.

Evidence directory: `output/playwright/refinement-batch-04/`.

## Source Changes

- Toggle: shrink/wrap resilience and a reduced-motion transition fallback.
- FAB: no CSS geometry change; empty required labels are no longer masked.
- Alert: title/message wrapping, body-small semantic typography, and private
  theme-aware feedback-family border/icon accents.
- Primitive/feedback Studio renderers: supplied required/conditional accessible
  names are rendered verbatim.
- Studio: removed the Toggle nowrap override; Alert exposes four accepted
  typography tokens.
- Contracts, registry, MDX, dossiers, Web adapter, and Shopify adapter were
  reconciled. `site/dist` was not rebuilt.

## Performance

| Surface | Current gzip | v1 ceiling | Result |
| --- | ---: | ---: | --- |
| Neutral component CSS | `56,644 B` | `64 KiB` | pass |
| Shared enhancement JS | `5,180 B` | `8 KiB` | pass |
| Primitives CSS | `9,442 B` | `10.3 KiB` | pass |
| Layout/overlay CSS | `4,421 B` | `4.8 KiB` | pass |

FAB and Alert add `0 B` component JS and no background work. Toggle reuses the
existing delegated enhancement: one listener per enhanced group and O(item
count) writes only on initialization/selection, with no timer, request, asset,
or component-owned observer.

## Open Review Items

1. Approve repository visuals or provide component-specific references for all
   three components.
2. Toggle: keep the subtle light unselected border and extreme wrapping
   (recommended), or specify a stronger border/stacking behavior.
3. FAB: choose current physical right or logical end for bidirectional targets;
   safe-area and fixed-chrome collision remain per-target responsibilities.
4. Alert: approve the private `75% feedback + 25% primary text` accent mix
   (recommended) or provide an owner color formula.
5. Alert dismissal focus/result remains consumer-owned; the Studio replacement
   status is demonstrative, not a cross-target default.

## Validation And Known Repository Risks

- Registry, token source, 183 contracts, 183 Studio definitions, and 183 MDX
  pages validate.
- Web and Shopify adapters are generated from canonical sources; existing
  Shopify maturity warnings remain unrelated backlog rather than new blockers.
- Component and refinement audits are structural evidence only. Human review is
  mandatory before any `stable` promotion.
- Static preview audit retains the pre-existing File Upload opacity warning.
- The docs production build continues to carry its existing large-chunk warning;
  it is a docs optimization risk, not component runtime introduced by this batch.
- `git diff --check` passes and `site/dist` remains untouched.

## Next Dependency-Ordered Batch

Continue phase 2 with Progress Bar / Circle, Spinner, and Stat / Statistic. No
component from this batch is stable until explicit human review is recorded.
