# Component Refinement Batch 23

Status: Price complete for human review

Date: 2026-07-14

Components: Price

## Outcome

Price is prepared for explicit human stability review. Its dossier, accepted
semantic/formatting boundary, contract, canonical CSS/markup, shared
Exhibit/Studio renderer and fixture, Studio metadata, registry, MDX, composed
consumers, Shopify adapter, browser evidence, and individual report are
reconciled.

The primitive now uses native `s`, localized part labels, and `bdi` while the
target owns amounts, locale, commercial truth, legal copy, structured data, and
live updates. It remains `pilot`; Button is still the only human-approved
component. `site/dist` was not rebuilt or modified.

## Research And Decision

- HTML, ECMA-402, WAI-ARIA APG, WCAG, Shopify unit-pricing/Liquid/Hydrogen, Dawn,
  and Radix evidence establishes a passive native-text boundary rather than a
  custom widget or neutral formatter.
- ADR 0108 adopts native compare-at semantics, per-part localized content, BDI,
  target formatting/update ownership, one responsive size, and the five
  previously accepted OpenType switches.
- Contract, registry, MDX, Studio metadata, shared renderer, canonical CSS,
  consuming markup, and generated targets now describe the same anatomy,
  properties, variant constraints, and adapter gaps.

## Browser Evidence Summary

- Price has no group/widget/live role, accessible-name override, focus, keyboard
  model, or interactive descendant. Compare-at is native `s`; all values use
  `bdi`; localized labels remain in the accessibility tree.
- Exhibit and Studio outer markup is exactly identical. Current-only/default and
  empty optional parts omit cleanly; empty required current remains an explicit
  invalid authoring stress case.
- Current/compare/unit computed type is `20/32`, `16/24`, and `14/20px` with
  primary/supporting text contrast of `17.93:1`/`7.81:1` light and
  `17.18:1`/`12.09:1` dark.
- All five accepted OpenType attributes independently change computed feature
  settings. Reduced motion has no animation/transition, and forced colors maps
  all parts to CanvasText while retaining line-through.
- Long Arabic/ARS range content at 390px stays `326/326px` client/scroll width;
  the 200% CSS-zoom probe keeps component and document client/scroll widths
  equal.
- Thirteen after images include eight canonical Exhibit/Studio x
  Mobile/Tablet/Desktop/XL captures plus current-only, long RTL, dark, forced-
  colors and zoom evidence. Two desktop before images preserve the prior
  generic/named-group baseline.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Primitives CSS | `10,454 B` | `10.3 KiB` | pass (`93 B` headroom) |
| Shared neutral runtime | `10,321 B` | `8 KiB` | existing documented exception; unchanged |
| Batch 23 runtime delta | `0 B` | `0 B` passive target-owned behavior | pass |
| Neutral Web components CSS | `64,484 B` | `64 KiB` | pass (`1,052 B` headroom) |

Relative to the Batch 23 baseline, Primitives adds `98 B`, complete Web
component CSS adds `92 B`, and neutral runtime adds `0 B`. The delta covers type
pairs, resilient wrapping, part labels, and forced colors; it does not reset the
shared runtime exception.

## Validation

- Registry/docs, DTCG source, 183 contracts, and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; copied Primitives CSS and
  shared JS are byte-identical to canonical source. Shopify's 24 existing non-
  blocking maturity warnings remain backlog.
- Structural certification passes 183/183 with one stable contract and zero
  manifest drift. Exhibit/Studio parity is 183/183 shared with complete visual/
  interaction coverage. All static previews and the refinement audit pass.
- TypeScript, a complete Vite build into `/tmp`, browser semantic/content/
  responsive/special-media probes, component-console checks, locale parsing,
  deterministic gzip, generated-copy comparisons, syntax/diff checks, and
  explicit `site/dist` cleanliness pass.

## Remaining Human Risks And Open Input

1. Approve current/compare/unit hierarchy, weights, order, `4px 8px` wrap gap,
   strike treatment, supporting-color strength, long-value wrapping, and the
   fixture's sale composition.
2. Market-specific taxes, duties, legal unit-pricing, currency/range wording,
   financing, subscriptions, deposits, volume pricing, and discount claims stay
   target content/data policy.
3. Product Info, cart, and checkout targets must choose one update-announcement
   owner and cadence; passive Price must not create duplicate live regions.
4. Shopify product-wide versus selected-variant pricing and richer volume breaks
   need a separate adapter/product review.
5. No component-specific owner visual reference is registered; accept the
   repository candidate or provide replacement evidence.
6. Primitives has only `93 B` remaining under its provisional ceiling; shared
   runtime remains above budget but this passive batch adds `0 B`.
7. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The regenerated matrix shows 183 components, 105 dependency edges, 64 dossiers,
and 61 components ready for human review. Only Button is human-approved; Price
remains `pilot` pending explicit review. The next dependency-safe component is
Cart Drawer (review order 65).
