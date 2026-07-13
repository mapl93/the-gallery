# 0077. Cart And Checkout Semantic Studios

Status: Accepted

Date: 2026-07-12

## Context

The eleven Cart and Checkout components had canonical CSS and target-agnostic
contracts, but their contracts did not expose reviewed semantic properties and
their documentation still presented generic commerce examples. The category
also combines page composition, repeated line items, disclosures, progress,
modal content, viewport-edge UI, and composed form controls, so a single broad
content API would obscure ownership boundaries.

## Decision

- Cart Page exposes its heading, item count, continuation action, line-items
  slot, and summary slot. It does not own the data model of either composed
  region.
- Cart Line Item exposes the visible product identity, target-formatted prices,
  quantity-selector slot, and named remove and save actions. Quantity updates,
  removal, persistence, and price formatting remain target behavior.
- Cart Summary exposes its heading, repeated row slot, optional note, checkout
  action, disabled state, and optional express-checkout slot. It does not define
  payment-provider data.
- Discount Field and Cart Note are synchronized disclosures. Their semantic
  `expanded` property maps to the trigger's `aria-expanded` state and a root
  `data-expanded` state used by canonical CSS. Discount applied state is
  represented independently through `data-applied`.
- Free Shipping Bar exposes semantic `value` and `max` progress values plus the
  achieved state. The target coordinates the private visual percentage with the
  same values; the private CSS property is not promoted to public API.
- Cart Upsell keeps recommendation data in an items slot while exposing only
  the section title and add-action semantics.
- Cart Empty exposes its optional icon, visible empty-state copy, and recovery
  link without defining navigation policy.
- Quick View composes Modal, Product Gallery, and Product Form responsibilities.
  Its product content is semantic, while focus management, dismissal, gallery
  state, and add-to-cart behavior remain owned by the target or dependencies.
- Sticky Add-to-Cart exposes visibility, product identity, target-formatted
  price, and add-action semantics. Studio contains its fixed positioning within
  the preview stage without changing canonical consumer positioning.
- Gift Wrap composes the native Checkbox contract for selection and disabled
  behavior. Cart mutation and total updates remain target commerce behavior.
- Studio fixtures use representative products, prices, rows, and Lucide icons
  only as site-owned inspection content. They are not component defaults or
  target-agnostic API.
- No new public tokens are introduced. Canonical motion receives a reduced-
  motion fallback, and existing component classes remain the rendering source.

## Consequences

- All eleven Cart and Checkout components can be inspected independently while
  retaining their real composition boundaries.
- Disclosure and applied states now have deterministic neutral-web mappings
  instead of relying on undocumented fixture visibility.
- Large and viewport-edge cart surfaces remain contained in Exhibit and Studio
  on narrow viewports.
- Every Cart and Checkout contract remains `pilot` until owner review and the
  applicable neutral-web certification gates are complete.
