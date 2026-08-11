# Refinement Batch 02: Divider, Card, Link

Date: 2026-07-13

Status: Three components ready for human review; none promoted to `stable`

## Batch Result

| Component | Contract | Technical result | Human input |
| --- | --- | --- | --- |
| Divider | `0.3.0` | Vertical ARIA orientation, forced-colors visibility, six geometry combinations, four-view evidence | Variant orthogonality and visual approval |
| Card | `0.3.0` | Pointer/reduced-motion gating, full-bleed focus preservation, resilient content, variant matrix | Lift/zoom/shadow and visual approval |
| Link | `0.3.0` | Native mapping/keyboard checks, reduced motion, wrapping/RTL, six contrast measurements | Color/underline/type and visual approval |

The three components have no registered dependencies and therefore follow the
calibration batch at dependency depth zero. Accepted decisions were applied
without adding a new public token layer, target, framework runtime, or generated
registry field.

## Shared Evidence

- 24 canonical screenshots: three components, Exhibit and Studio, Mobile
  `390 x 844`, Tablet `768 x 1024`, Desktop `1280 x 800`, XL `1600 x 1000`.
- Additional named images cover variants, fine/coarse pointers, forced colors,
  reduced motion, keyboard focus, vertical semantics, localized/unbroken
  content, and reproduced before/after failures.
- Exhibit and Studio produced identical root markup and fixture content for all
  three components. Viewport-dependent available width is the only expected
  Divider geometry difference.
- Browser console reported no runtime errors during the final pass.

Evidence directory: `output/playwright/refinement-batch-02/`.

## Source Changes

- Divider: conditional `aria-orientation="vertical"` plus forced-colors system
  rule.
- Card: fine-pointer hover gating, reduced-motion fallback, focus-aware clipping,
  and resilient body/footer wrapping.
- Link: reduced-motion fallback and resilient unbroken-label wrapping.
- Contracts, MDX, dossiers, Web adapter, and Shopify adapter were reconciled.
- `site/dist` was not rebuilt.

## Performance

| Surface | Current gzip | v1 ceiling | Result |
| --- | ---: | ---: | --- |
| Neutral component CSS | `56,336 B` | `64 KiB` | pass |
| Shared enhancement JS | `5,171 B` | `8 KiB` | pass |
| Primitives CSS | `9,335 B` | `10.3 KiB` | pass |
| Layout/overlay CSS | `4,403 B` | `4.8 KiB` | pass |

Divider, Card, and Link remain passive: `0 B` component JS and zero owned
requests, observers, timers, or continuous work.

## Open Review Items

1. Divider: keep visual emphasis and section spacing exclusive for v1
   (recommended) or split them into orthogonal properties.
2. Approve the repository renders for Divider, Card, and Link, or supply
   component-specific visual references.
3. Card whole-card interaction and Link router/download expansion remain outside
   this batch; neither was inferred from visual precedent.

## Validation And Known Repository Risks

- Registry, token source, 183 contracts, 183 Studio definitions, and 183 MDX
  pages validate.
- Web adapter validates 183 components with no manifest drift. Shopify validates
  183 components and 43 target-ready entries; its existing warnings concern 26
  other dedicated adapters whose contracts still say planned.
- Component readiness reports 183/183 automated structural passes, zero gaps,
  and 182 components still requiring human review.
- Static preview audit reports zero errors and one pre-existing File Upload
  opacity warning in `components/css/forms.css`.
- The production docs build succeeds in `/tmp`. Its existing main application
  chunk is about `398 KiB` gzip and triggers Vite's large-chunk warning; this is
  a docs-app optimization risk, not component runtime added by this batch.
- `git diff --check` passes and `site/dist` remains untouched.

## Next Dependency-Ordered Batch

Continue phase 2 with Button Group after its accepted Button dependency, then
the next dependency-zero primitives in generated order. No component from this
batch is stable until explicit human review is recorded.
