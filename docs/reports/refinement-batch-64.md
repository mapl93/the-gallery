# Refinement Batch 64: Gallery Grid

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 64 turns S5 into a truthful passive native media list. An optional title
names a thematic section; untitled output is generic; required items omit
coherently; native list semantics replace generic focusable wrappers; and one
named component container owns Grid and Masonry layout in both Exhibit and
Studio.

Grid now has a private regular crop and one-to-four-track candidate. Masonry
keeps natural proportions in intact source-flow columns. Both preserve DOM
order and add no neutral runtime. A dedicated localized Shopify Section Adapter
maps reorderable image blocks without introducing a neutral image record or
activation lifecycle.

## Safe Refinement

- Contract advances from `0.2.0` to `0.3.0` and remains `pilot`.
- Conditional named-section semantics, native `ul`/`li`, strict invalid
  omission and contextual fixture alternatives replace unnamed/generic output.
- Four passive tabindex stops and implied hover/focus zoom are removed. A real
  target-native descendant receives only the shared focus treatment.
- One named component container replaces competing viewport, generic and
  Studio-specific columns/heights without visual reordering.
- Complete semantic typography, spacing, color and radius references replace
  incomplete hardcoded values; crop and track geometry remain private human
  candidates.
- Shopify receives two section settings, three block settings, localized
  schema, a preset, zero dead settings, responsive image output and zero
  section runtime.
- ADR 0149 records the passive list, target ownership, variants and unresolved
  S5/Masonry Gallery identity boundary.

## Browser Evidence

- Exhibit and Studio normalize to exactly the same `1,073`-character root DOM,
  FNV-1a `1d528e87`, across all four paired viewports.
- Eight paired final screenshots cover Mobile, Tablet, Desktop and XL. Thirty-
  three final captures cover Grid/Masonry, direct roots, one/two/seven items,
  untitled/invalid composition, native focus, themes, forced colors, reduced
  motion, RTL and unbroken effective-zoom content.
- Final roots use conditional `SECTION`/`DIV`, valid title relationships,
  native `UL`/`LI`, contextual image alternatives and zero passive focus stops.
- Direct Grid roots produce one/two/three/four tracks at
  `200/520/900/1120px`; direct Masonry preserves natural media and reaches
  three columns at `900px`. All checked roots contain horizontally.
- Native target focus/Enter activation, title omission, invalid omission,
  contrast, dark/forced colors, source order, mixed ratios, localized RTL,
  unbroken/effective-zoom content and isolated console checks pass.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,857 B` | `6,855 B` | `6,861 B` | pass; `2 B` reduction, `6 B` remaining |
| Neutral Web component CSS | `67,868 B` | `67,874 B` | `65,536 B` | existing gap `2,338 B`; `6 B` delta |
| Shared neutral runtime | `10,589 B` | `10,589 B` | `8,192 B` | existing gap; `0 B` added |

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, Neutral Web, Shopify,
Webflow copies, static previews, official Shopify Liquid revision 1, real-
browser matrix, deterministic budgets, source/generated identity, console,
diff and `site/dist` checks pass. Shopify reports S5 `implemented`, every
required maturity layer ready, no dead settings and `ready: true`; remaining
maturity warnings concern other planned components.

No stability promotion was made and `site/dist` was not rebuilt or modified.

## Human Review Queue

1. Approve Grid crop, thresholds and one-to-four-track density.
2. Approve Masonry width/count, source-flow reading, gap, radius and media
   hierarchy.
3. Decide the long-term S5 Masonry versus Masonry Gallery identity boundary.
4. Confirm the three-property neutral API and minimal Shopify editor surface.
5. Confirm activation remains a target-owned native profile.
6. Add component-specific Figma examples after browser approval.

See `docs/refinement/dossiers/gallery-grid.md`,
`docs/reports/gallery-grid-web-refinement-audit.md`, and ADR 0149.

## Program Position

After Batch 64, the program has 105 dossiers and 92 components ready for human
review. All 183 automated gates pass. The graph has 128 declared dependency
edges, maximum depth 3, no missing dependencies and no cycles. The next
dependency-safe component is Lookbook (S6, review order 166).
