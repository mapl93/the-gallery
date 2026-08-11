# 0109. Target-Owned Cart Drawer Composition

Status: Accepted (line ownership amended by ADR 0174)

Date: 2026-07-14

## Context

Cart Drawer had an accepted two-property contract and dependencies on Drawer,
Price and Quantity Selector, but its concrete surfaces did not honor that
composition. Studio duplicated Drawer close markup without a modal lifecycle,
used generic line and summary containers, gave one of two lines no Quantity
control, and competed with the canonical Quantity enhancer for step ownership.
Shared JavaScript listened for `.cart-drawer` and `.cart-drawer__overlay`
selectors that no canonical or Shopify markup used.

The compact summary also used the public `.cart-summary*` selectors owned by the
later Cart Summary component. Because `cart.css` loads after `global.css`, Cart
Summary's card surface silently overrode the Cart Drawer footer composition.
Reusing those classes would either make Cart Drawer depend on an unreviewed
later component or preserve an import-order collision.

A cart overlay combines stable presentation semantics with target-specific cart
records, formatted money, inventory, mutation, checkout, announcement and
overlay services. Those services differ across native forms, Shopify Ajax and
Section Rendering, framework stores, custom storefronts and native apps.

## Decision

- Cart Drawer is a target-controlled commerce composition inside canonical
  Drawer. Drawer owns open/closed state, title, naming, modal semantics, initial
  focus, focus containment, dismissal, focus restoration, placement, body
  scrolling and footer composition.
- `lineItems` and `summary` remain Cart Drawer's only public semantic
  properties. They are target-authored composition slots, not raw cart records
  or a neutral money/cart schema.
- Populated lines use `ul.cart-items` with one `li.cart-item` per target line.
  Each line has at most one product destination; an adjacent repeated image is
  decorative unless it communicates content not present in the text.
- Each rendered price composes canonical Price. Each rendered quantity composes
  canonical Quantity Selector, whose native input is the sole local value owner.
  Removal is a native Button with product context in its accessible name.
- The optional compact summary uses `dl.cart-drawer__summary`, row `div`s with
  `dt`/`dd`, and `.cart-drawer__summary-total`. These isolated classes avoid
  claiming or depending on the later Cart Summary component and remove the
  import-order collision.
- Empty content, pending and error presentation, discounts, taxes, shipping,
  checkout destinations and status text are target composition. Summary is
  omitted when the cart is empty.
- The target owns line identity, constraints, formatted values, calculation,
  controlled cart state, mutation policy, request cancellation, rollback,
  retry, persistence, status cadence, post-removal focus and synchronization
  with Header/Bottom Navigation counts.
- Selector-dead Cart Drawer JavaScript is removed. Neutral source does not infer
  a global overlay coordinator, cart provider, network client or universal
  optimistic-state model.
- The docs target may demonstrate the contract with bounded local state. Exhibit
  and Studio use the same `GlobalStudio` renderer and initial fixture; the MDX
  fallback uses the same anatomy and an opt-in shadow-root dialog lifecycle.
- Shopify maps real cart records into a native update form, list, Price,
  quantities, removal requests, localized empty/summary content and checkout
  destinations. Its adapter remains `planned` until a target controller proves
  lifecycle, form/Ajax mutation, section refresh, pending/errors/status,
  editor preview and live-store behavior.
- The contract remains `pilot`. Automated conformance and browser evidence do
  not imply visual approval or promotion to `stable`.

## Performance

Cart Drawer adds no neutral cart store, request, observer, timer, formatter or
new asset. Removing dead listeners reduces shared runtime. Deterministic level-9
gzip measures:

- Global CSS: `4,668 B` against the provisional `3.7 KiB` ceiling, an existing
  family exception now `880 B` over.
- Neutral Web component CSS: `64,719 B` against the `64 KiB` ceiling, leaving
  `817 B`.
- Shared neutral runtime: `10,171 B` against the provisional `8 KiB` ceiling,
  an existing exception now `1,979 B` over.

Relative to the Batch 24 baseline, Global CSS adds `198 B`, complete Web CSS
adds `235 B`, and shared runtime removes `150 B`. The CSS delta pays for native
list/description-list resets, isolated summary ownership, logical grid/wrapping,
complete semantic type pairs, a 44px removal target, container response and
forced-color focus/boundary behavior.

## Consequences

- Neutral Web gains one coherent semantic composition without embedding a
  target-specific cart architecture.
- The compact summary can evolve with the Drawer without being restyled by Cart
  Summary or implying a canonical dependency that the contract does not have.
- React, Angular, Hydrogen, Shopify, SwiftUI and Compose adapters can use their
  native controlled cart and overlay services while mapping the same line and
  summary anatomy.
- A production target still has to select and certify its overlay coordinator,
  cart data/mutation service, status policy, focus-after-removal behavior and
  empty/error visuals.
- Human review must approve media geometry, density, hierarchy, separators,
  removal treatment, footer balance, narrow layout and the repository fixture.

## 2026-07-16 Amendment

ADR 0174 supersedes only this decision's temporary `.cart-items > .cart-item`
line anatomy. Now that K2 Cart Line Item has been researched and refined, Cart
Drawer consumes canonical `.cart-lines > .cart-line` and no longer owns a
parallel line implementation. Drawer lifecycle, target cart ownership, compact
summary isolation, empty-content boundary, runtime deferral and adapter maturity
rules in this ADR remain accepted.
