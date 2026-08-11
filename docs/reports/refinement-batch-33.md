# Component Refinement Batch 33

Status: Product Slider human-review-ready

Date: 2026-07-14

Components: Product Slider

## Outcome

Product Slider's dossier, finite-list decision, contract, intrinsic CSS, shared
Exhibit/Studio renderer and Product Card artwork, Studio metadata, MDX, Shopify
recommendations section, localized schema/storefront text, generated adapters,
browser evidence, and individual audit are reconciled. The contract remains
`pilot`; no component was promoted to `stable`.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Browser Evidence Summary

- The refined DOM is one named focusable native list with six list items, six
  canonical Product Cards, localized finite Icon Buttons, and no duplicate
  slide roles or physical-fraction controller.
- First, middle, and last bounds synchronize after controls, wheel, and keyboard
  scrolling. Enabled activation retains Button focus; a control that becomes
  natively disabled transfers focus to the named track rather than the document.
- Exhibit and Studio Product Slider outerHTML is exactly equal at `6,709` chars.
- Container probes render two cards at 480px, three at 802px, and four at 1052px.
  RTL, long Spanish text, mixed scripts/currencies, dark, forced colors, reduced
  motion, and narrow-in-wide composition are recorded.
- Four before and twenty-one after/special images live under
  `output/playwright/refinement-batch-33/`. Component runtime emitted no
  errors/warnings; the existing site favicon 404 remains unrelated baseline.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `5,322 B` | `5.2 KiB` | pass (`2 B` whole-byte headroom; `+11 B` from Batch 32) |
| Shared neutral runtime | `10,492 B` | `8 KiB` | existing exception (`2,300 B` over; no Product Slider runtime) |
| Neutral Web components CSS | `65,452 B` | `64 KiB` | pass (`84 B` headroom; `+29 B` from Batch 32) |

## Validation

- Registry/docs, DTCG source, 183 contracts and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate. Product Slider is an
  implemented, ready Shopify section adapter with CSS, Liquid, schema, data,
  behavior, composition, and editor evidence.
- Shopify Liquid validation, temporary Vite build, exact parity, native semantic
  and interaction probes, four viewports, container thresholds, special media,
  localized/RTL content, deterministic gzip, structural/static-preview/parity/
  refinement audits, diff checks, source/generated identity, and `site/dist`
  cleanliness pass.

## Human Review Scope

1. Approve two/three/four-card density and whether any deliberate card peek is
   desirable.
2. Approve Product Card crop/density in this composition and resolve inherited
   Product Card visual/media-direction questions.
3. Approve heading/control hierarchy, wrapping, gap, control surface/shadow, and
   overall vertical rhythm.
4. Confirm whether related/recommended/complementary are sufficient v1 intents
   for each target; recently viewed remains target-owned.
5. Keep autoplay, loop, dots, engine adoption, pagination, lazy-loading policy,
   virtualization, analytics, persistence, and public controlled events outside
   v1 unless explicitly requested.

## Program Progress

After regenerating the matrix, the program contains 183 components, 106
dependency edges, 74 dossiers and 64 components ready for human review. Product
Slider is ready for human review; only Button is human-approved. The next
dependency-safe component is Collection Hero (review order 75).
