# Refinement Batch 63: Multicolumn

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 63 turns S4 into a truthful passive list of parallel target-owned items.
An optional visible heading names the thematic root; an untitled composition is
generic; required items omit coherently; native list semantics replace generic
articles; and intrinsic centered wrapping preserves source order at every
container size. Exhibit and Studio share the exact renderer, fixture, DOM, and
component-owned layout.

The batch also adds a dedicated localized Shopify Section Adapter whose
reorderable blocks map the accepted target-owned slot. Item content, native
media, heading rank, child actions, ordering meaning, and editor lifecycle stay
with the target rather than expanding the neutral API.

## Safe Refinement

- Contract advances from `0.2.0` to `0.3.0` and remains `pilot`.
- Conditional named-section semantics, native `ul`/`li`, strict required-item
  omission, and decorative icon handling replace unnamed/generic structures.
- Process-step claims are removed; chronological content remains Process
  Timeline's responsibility.
- Intrinsic flex wrapping and one named component container replace generic and
  Studio-specific column breakpoints without visual reordering.
- Complete semantic typography, spacing, and colors replace incomplete
  hardcoded type; private item/icon measures remain human candidates.
- Shopify receives one section setting, five block settings, localized schema,
  a preset, zero dead settings, responsive image output, and zero runtime.
- ADR 0148 records the passive native-list and target-ownership boundary.

## Browser Evidence

- Exhibit and Studio initial root DOM is exactly equal: `2,353` characters,
  FNV-1a `d8d03790`, across all four paired viewports.
- Eight paired final screenshots cover Mobile, Tablet, Desktop, and XL; special
  captures cover direct `260/520/900px` roots, one/two/seven items, untitled and
  invalid composition, dark, forced colors, localized RTL, unbroken content,
  and effective 200% layout.
- Final roots use conditional `SECTION`/`DIV`, named title relationship, native
  `UL`/`LI`, hidden decorative icons, and zero interactive descendants.
- Intrinsic response yields one row per item at `260px`, `2 + 1` at `520px`, and
  three columns at `900px`; one, two, and `3 + 3 + 1` item cases remain centered.
- Required/optional omission, heading/list semantics, contrast, dark/forced
  colors, reduced motion, RTL/localized/extreme content, effective zoom, and
  overflow checks pass. Isolated component console has zero errors/warnings.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,790 B` | `6,857 B` | `6,861 B` | pass; `4 B` remaining |
| Neutral Web component CSS | `67,789 B` | `67,868 B` | `65,536 B` | existing gap `2,332 B` |
| Shared neutral runtime | `10,589 B` | `10,589 B` | `8,192 B` | existing gap; `0 B` added |

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, Neutral Web, Shopify,
Webflow copies, static previews, official Shopify Liquid revision 1,
real-browser matrix, deterministic budgets, source/generated identity, console,
diff, and `site/dist` checks pass. Shopify reports S4 `implemented`, every
required maturity layer ready, no dead settings, and `ready: true`; remaining
maturity warnings concern other planned components.

No stability promotion was made and `site/dist` was not rebuilt or modified.

## Human Review Queue

1. Approve the item basis/maximum and one/two/three-column balance.
2. Approve icon scale/accent and title/body/vertical rhythm.
3. Approve centered alignment and copy measure under uneven/localized content.
4. Confirm the two-property neutral API and minimal Shopify block settings.
5. Revisit structured items or interactive profiles only for concrete target
   needs.
6. Add component-specific Figma examples after browser approval.

See `docs/refinement/dossiers/multicolumn.md`,
`docs/reports/multicolumn-web-refinement-audit.md`, and ADR 0148.

## Program Position

After Batch 63, the program has 104 dossiers and 91 components ready for human
review. All 183 automated gates pass. The graph has 128 declared dependency
edges, maximum depth 3, no missing dependencies, and no cycles. The next
dependency-safe component is Gallery Grid (S5, review order 165).
