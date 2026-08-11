# 0175. Passive Cart Summary And Target Checkout Ownership

Status: Accepted

Date: 2026-07-16

## Context

Cart Summary had an accepted semantic API but its concrete implementation used
generic row containers, made the component sticky with a global-header offset,
and demonstrated a separate docs override that disabled the same behavior.
Shopify Main Cart labelled `cart.total_price` as subtotal, placed checkout and
the legal note outside K3, and omitted cart-level discounts and provider-native
accelerated checkout.

A summary combines stable presentation semantics with target-owned monetary,
tax, duty, shipping, discount, checkout and payment-provider truth. Those facts
and actions differ between native forms, Shopify Liquid/Ajax, framework stores,
custom storefronts and native apps.

## Decision

- Cart Summary is a passive, target-controlled named section. It owns no cart
  calculation, money formatter, network request, persistence, provider SDK,
  status queue or checkout navigation.
- `title`, `rows`, `note`, `checkoutLabel`, `checkoutDisabled`, and `express`
  remain the accepted public properties from ADR 0077.
- `checkoutBusy` is added as a direct composition of canonical Button's accepted
  busy/disabled behavior. The target still owns the asynchronous request, result,
  error, recovery and focus policy.
- Rows use one `dl.cart-summary__rows` with `div`-wrapped `dt`/`dd` name/value
  groups. At least one total row is required. Values are complete target-formatted
  strings and use `bdi`; no raw amounts/currency/locale schema is added.
- Price is not a dependency. Summary values may be formatted money, “Free,” an
  estimate or a qualified total and do not share product current/compare/unit
  semantics.
- The primary checkout action composes canonical Button. Optional express
  checkout remains an opaque target-native slot; K3 does not inspect, restyle or
  track provider-internal markup.
- Cart Summary itself is not sticky. Cart Page or another target owns placement,
  sticky offset, scroll-container behavior and focus-obscuration avoidance.
- Cart Drawer's compact summary remains isolated under ADR 0109 and does not
  depend on K3.
- Totals and checkout results are not live regions. A parent target may announce
  one complete contextual status after a cart or checkout operation.
- Exhibit and Studio use one shared Cart Summary artwork and fixture. Cart Page
  consumes that same docs-target implementation; MDX remains a static fallback.
- Shopify maps real cart facts, named checkout form submission and optional
  provider-owned accelerated checkout into a dedicated snippet. Its adapter
  remains `planned` until target runtime, editor and live-store proof exists.
- The contract remains `pilot`; automated gates do not imply visual approval or
  promotion to `stable`.

## Consequences

- Neutral Web gains native label/value relationships and a stable target-agnostic
  API without becoming a universal cart or payment schema.
- Checkout disabled and busy states reuse Button instead of adding parallel action
  behavior.
- Embedded, Drawer, page and native consumers can choose appropriate placement
  without undoing K3 source CSS.
- Targets remain responsible for coherent snapshots, estimates, discounts,
  taxes/duties/shipping qualification, provider availability, duplicate-submit
  prevention, errors, announcements and checkout navigation.
- Human review must approve the card surface, hierarchy, density, note/express
  treatment, narrow reflow and eventual Cart Page sticky composition.
