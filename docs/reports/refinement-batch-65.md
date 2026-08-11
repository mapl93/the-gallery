# Refinement Batch 65: Lookbook

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 65 turns S6 into a truthful passive ordered editorial composition. A
title conditionally names the section; required items omit coherently; native
ordered-list and figure semantics replace generic focusable wrappers; captions
remain visible; and one named component container owns asymmetric layout in
both Exhibit and Studio.

A target may add only a complete native action. Shopify receives a localized
image-block Section Adapter with an optional native product link and target-
owned coordinates. Neutral S6 adds no commerce model, Popover lifecycle or
runtime.

## Safe Refinement

- Contract advances from `0.2.0` to `0.3.0` and remains `pilot`.
- Conditional root semantics, strict invalid omission, native `ol`/`li`,
  `figure`/`figcaption` and contextual alternatives replace generic output.
- Four passive tab stops, hover-only captions, image zoom and the empty pulsing
  hotspot are removed.
- One named container replaces viewport/generic/Studio geometry. Browser
  evidence also corrected the direct `200px` header overflow.
- The adaptive semantic caption pair passes light/dark worst-case contrast;
  opacity remains private because arbitrary public values are not safely
  combinable.
- Shopify receives one section setting, eight block settings, runtime/schema
  locales, a preset, responsive image output and zero section runtime.
- ADR 0150 records the passive sequence and target-owned hotspot boundary.

## Browser Evidence

- Exhibit and Studio normalize to the same `2,156`-character subtree and FNV-1a
  `1d32498f` at four paired viewports.
- Eight paired final screenshots plus 18 special captures cover direct roots,
  one/two/seven items, untitled/invalid/empty caption, native focus, themes,
  forced colors, reduced motion, RTL and unbroken effective zoom.
- Roots use valid conditional `SECTION`/`DIV`, native ordered lists/figures,
  persistent captions and zero passive focus stops.
- Direct roots produce one/one/two/four/four tracks at
  `200/260/520/900/1120px`; every checked case contains horizontally.
- The native target link is named, `44x44px`, focus-visible and Enter-activates.
  Title/caption contrast, forced colors, no authored motion, source order,
  localized extremes and console checks pass.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,855 B` | `6,814 B` | `6,861 B` | pass; `41 B` reduction, `47 B` remaining |
| Neutral Web component CSS | `67,874 B` | `66,941 B` | `65,536 B` | existing gap `1,405 B`; synchronized delta `-933 B` |
| Shared neutral runtime | `10,589 B` | `10,492 B` | `8,192 B` | existing gap; S6 adds `0 B` |

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, Neutral Web, Shopify,
Webflow copies, static previews, official Shopify Liquid revision 2, real-
browser matrix, budgets, source/generated identity, console, diff and clean
`site/dist` checks pass. Shopify reports S6 `implemented`, every required layer
ready, no dead settings and `ready: true`; remaining maturity warnings concern
other planned components.

No stability promotion was made and `site/dist` was not rebuilt or modified.

## Human Review Queue

1. Approve tracks, thresholds, clamped rows, spans and sparse rhythm.
2. Approve crop, gap, caption type/padding and adaptive dark-mode treatment.
3. Confirm the two-property neutral API and target-owned product/coordinate data.
4. Confirm link, Popover and Lightbox remain explicit target profiles.
5. Approve the Shopify block surface and maximum count.
6. Add component-specific Figma examples after visual approval.

See `docs/refinement/dossiers/lookbook.md`,
`docs/reports/lookbook-web-refinement-audit.md`, and ADR 0150.

## Program Position

After Batch 65, the program has 106 dossiers and 93 components ready for human
review. All 183 automated gates pass. The graph has 128 declared dependency
edges, maximum depth 3, no missing dependencies and no cycles. The next
dependency-safe component is Video Section (S7, review order 167).
