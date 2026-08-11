# Refinement Batch 62: Image with Text

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 62 turns S3 into a truthful passive media-and-narrative composition. A
required visible heading names the section; required media/title/body omit
coherently; optional content collapses; five variants preserve source order;
Overlay has explicit contrast; and bounded intrinsic media replaces uncontrolled
portrait growth. Exhibit and Studio share the exact renderer, fixture and DOM.

The batch also adds a dedicated localized Shopify Section Adapter with native
responsive image/focal-point output and only semantic editor settings. Media
selection, art direction, rich text, heading rank, action lifecycle and editor
content remain target concerns rather than expanding the neutral API.

## Safe Refinement

- Contract advances from `0.2.0` to `0.3.0` and remains `pilot`.
- Media, non-empty title and non-empty body are one required composition.
- Root naming, native image semantics and real Button-composed navigation
  replace empty headings, imprecise alt and cancelled fragments.
- Intrinsic `4 / 3` media, private content measure and one component response
  replace viewport/site height and breakpoint ownership.
- Default/Reversed split at `768px`; Stacked stays single-column; Overlay has
  inverse foreground/scrim/system-color fallback; Offset remains contained.
- Shopify receives nine used settings, localized schema, one preset, zero dead
  settings and zero component runtime.
- ADR 0147 records the passive required composition and target ownership.

## Browser Evidence

- Exhibit and Studio initial root DOM is exactly equal: `737` characters,
  FNV-1a `aafe8637` across all four paired viewports.
- Eight paired final screenshots cover Mobile, Tablet, Desktop and XL; twelve
  special captures cover five variants, focus, dark, forced colors, mobile
  Overlay, long RTL, unbroken content and effective 200% layout.
- Exact root transition: one `767px` track to two `384px` tracks at `768px`;
  Reversed media changes `order 0 -> 2` while DOM remains media then content.
- Wide Default height falls from `840px` to `420px`; wide Stacked media falls
  from `1,680px` to `840px`. Overlay/Offset candidates measure `650px`/`502px`.
- Required/optional omission, real pointer/Enter navigation, focus, contrast,
  dark/forced colors, reduced motion, RTL/localized/extreme content and overflow
  checks pass. Fresh console has zero errors and zero warnings.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,464 B` | `6,743 B` | `6,861 B` | pass; `118 B` remaining |
| Neutral Web component CSS | `66,551 B` | `66,850 B` | `65,536 B` | existing gap `1,314 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing gap; `0 B` added |

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, Neutral Web, Shopify,
Webflow copies, static previews, official Shopify Liquid revision 1,
real-browser matrix, deterministic budgets, source/generated identity, console,
diff and `site/dist` checks pass. Shopify reports S3 `implemented`, every
required maturity layer ready, no dead settings and `ready: true`; remaining
maturity warnings concern other planned components.

No stability promotion was made and `site/dist` was not rebuilt or modified.

## Human Review Queue

1. Approve the `4 / 3` crop and Default/Reversed balance.
2. Approve Stacked rhythm and content padding.
3. Approve Offset inset/gap/radius and Overlay height/scrim/measure.
4. Confirm the neutral API and minimal Shopify settings.
5. Define interactive media policy only when a concrete target needs it.
6. Add component-specific Figma examples after browser approval.

See `docs/refinement/dossiers/image-text.md`,
`docs/reports/image-text-web-refinement-audit.md`, and ADR 0147.

## Program Position

After Batch 62, the program has 103 dossiers and 90 components ready for human
review. All 183 automated gates pass. The graph has 128 declared dependency
edges, maximum depth 3, no missing dependencies and no cycles. The next
dependency-safe component is Multicolumn (S4, review order 164).
