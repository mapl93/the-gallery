# Lightbox Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-20

Accepted direction: ADR 0238

## Outcome

Lightbox is now the single canonical image-detail renderer used standalone and
inside Product Gallery. It composes canonical Modal, Close Button and Icon
Button sources; supports finite or explicit loop navigation, logical keys,
direct swipe and bounded zoom/pan; and keeps current media, caption, counter,
status and focus lifecycle synchronized.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Modal image detail only; no slideshow timer, editor, CDN, download/share, commerce or global overlay service. |
| Anatomy/composition | pass | Canonical Modal/Close/Icon Button, stable title, figure, viewport, image/fallback, caption, counter, zoom, nav and status. |
| States/modes | pass | Open/closed, finite/loop, first/middle/last, caption/none, image/fallback, 1x-3x zoom, pan, swipe, RTL and special media. |
| Public API | pass | `open`, `loop`, current `alt`, optional `caption`; collections/current id/labels remain target mappings. |
| Accessibility | pass | Stable named dialog, informative alt, trapped/restored focus, Escape/backdrop/Close, disabled bounds, named zoom/nav and polite status. |
| Responsive/content | pass | Desktop/mobile renewed evidence plus retained four viewports, long/localized/fallback, forced colors, reduced motion and 200% coverage. |
| Runtime/assets | pass with documented program gap | No package/asset/request/timer/observer; private finite zoom/pan in existing renderer/runtime. |
| Cross-target | pass | Shared React renderer, Neutral Web data/class contract and Shopify Product Gallery composition documented/implemented. |
| Parity | pass | Fresh Exhibit/Studio outer HTML exact equality, one root. |

## Contract And Browser Evidence

- Contract `0.4.0` records loop, viewport/zoom anatomy, direct swipe, bounded
  zoom/pan and Web/Shopify/React adapter mappings.
- Standalone Exhibit/Studio markup is exactly equal (`3,855` characters).
- Close receives initial focus; Tab remains inside; Escape closes. Product
  Gallery supplies a current-trigger focus fallback when internal navigation
  removes the original invoker.
- Finite Product Gallery detail traverses only its two image records and disables
  the last Next control. Enabling loop in standalone Lightbox wraps first to
  third and keeps both navigation controls enabled.
- Two Zoom In actions compute `matrix(2, 0, 0, 2, 0, 0)`; changing image resets
  zoom/pan to 1x. Named Reset and zoom bounds expose correct disabled states.
- Direct swipe and logical Arrow keys synchronize the current image and parent
  Product Gallery id. Status includes position plus caption/alt.
- Desktop and 390x844 standalone captures plus Product Gallery's four-viewports,
  dark, forced-colors/reduced-motion, 200% and zoom-detail captures were visually
  inspected. Final console: zero errors and zero warnings.
- Evidence manifest:
  `output/playwright/refinement-product/product-gallery-0238/manifest.json`.

## Performance And Token Debt

- Lightbox adds no framework, provider, player, gesture package, image asset,
  request, timer, observer, preload queue, cookie, storage or analytics work.
- Its implementation contributes to Layout CSS `7,174 B / 4,915 B` and shared
  runtime `21,633 B / 8,192 B`; ADR 0238 documents both program gaps without
  raising ceilings.
- Zoom scale, pan, transform, gesture threshold and bounds stay private.
- Black media canvas, white on-canvas text and translucent controls remain
  explicit private token debt pending human/token review.

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Canonical class/data contract and shared controller are implemented through the Product Gallery composition. |
| Documentation React | One shared controlled renderer is used by standalone Lightbox and Product Gallery. |
| Shopify | Product Gallery includes localized image-detail markup/controller with the same finite/loop/zoom lifecycle. |
| Future frameworks/native | Controlled open/current collection mapping and native modal/image services are documented; distributable adapters remain future work. |

## Human Review And Risks

- Approve canvas/scrim, image bounds, close/nav/zoom control presentation,
  caption/counter hierarchy and mobile layout.
- Confirm current 1x-3x range, 0.5 increments and private pan bounds.
- Decide whether the private on-canvas color family warrants public semantic
  tokens.
- Target portal/inertness/scroll lock/stacking services and the documented CSS/
  runtime program gaps remain release risks outside the component's semantic
  contract.
- Explicit human approval is required before `stable`.
