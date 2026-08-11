# 0174. Canonical Target-Controlled Cart Line Composition

Status: Accepted

Date: 2026-07-16

## Context

K2 Cart Line Item declared Price and Quantity Selector dependencies, but its
contract and concrete surfaces duplicated price markup, maintained separate
React quantity arithmetic, used `article` outside a native collection, required
media and destination, and exposed raw price/compare strings instead of canonical
dependency composition.

Cart Drawer had been refined earlier with a temporary independent
`.cart-items > .cart-item` anatomy because K2 was still unreviewed. Cart Page,
Cart Drawer, Order Detail, Studio, MDX, and Shopify therefore had multiple line
implementations even though the refinement goal requires composed components to
consume canonical dependencies.

Cart lines combine stable presentation semantics with target-specific cart/order
records, formatted money, inventory, mutation, persistence, focus, status and
network behavior. Shopify Liquid, Shopify Ajax, Hydrogen, generic web forms,
framework stores, and native apps do not share one runtime or raw record shape.

## Decision

- Cart Line Item is the one canonical line-record composition for Cart Page,
  Cart Drawer, Order Detail, and future cart/order collections.
- Populated records use `ul.cart-lines` with one `li.cart-line` per stable target
  line identity. The line is ordinary list content, not an `article`, widget,
  named group, or custom keyboard model.
- A non-empty visible `title` and canonical `price` slot are required. Optional
  semantic slots are `media`, `details`, `quantitySelector`, `removeAction`, and
  `saveAction`; optional `href` turns the one title into the only product
  destination.
- Adjacent media is decorative by default when title/details repeat its meaning.
  Targets provide informative alternative text only when the media adds unique
  content. Media and destination may be omitted for valid no-media or read-only
  records.
- `price` composes canonical Price. Cart Line Item does not expose or style
  separate current/compare/unit parts and performs no formatting or arithmetic.
- `quantitySelector` composes canonical Quantity Selector. Its native input is
  the sole local value/constraint/form/reset owner; parent targets observe
  changes and reconcile inventory, prices, totals, errors, and status.
- `removeAction` and the already accepted optional `saveAction` compose canonical
  Button. Targets render only supported capabilities and own pending, success,
  error, rollback, persistence, undo, analytics, focus placement and result copy.
- The parent target owns line identity and data. Neutral source adds no cart
  store, formatter, raw platform schema, hidden value, optimistic policy, request,
  retry, cache, live region, observer, timer, asset, or animation loop.
- `.cart-lines` owns the inline-size container. One intrinsic layout reflows from
  its actual Drawer/page/order width rather than viewport breakpoints.
- Cart Drawer migrates from its parallel `.cart-item` anatomy to canonical Cart
  Line Item. It continues to compose Drawer and own only the isolated compact
  `.cart-drawer__summary*` anatomy. This amends only the line-ownership portion
  of ADR 0109.
- The docs target extracts `CartLineItemArtwork`, reusing the canonical
  `PriceArtwork` and `QuantitySelectorArtwork`, so K2, Cart Page, and Cart Drawer
  share the same line implementation. Exhibit and Studio retain one renderer and
  initial fixture per documented component.
- Shopify maps line keys, localized identity/details, money filters, quantities,
  native form actions or optional Ajax/section refresh into the same canonical
  classes. Its adapter remains `planned` until target mutation, pending/error/
  status, editor preview, and live-store behavior are proven.
- Contracts remain `pilot`. Automated gates and visual evidence prepare human
  review but do not imply `stable` promotion.

## Performance

Cart Line Item remains passive with `0 B` neutral component JavaScript and no
asset or request. Cart CSS stays under its permanent `3.0 KiB` gzip ceiling.
Removing the duplicate Global line implementation must fund the canonical list,
container, logical layout, complete typography, Price/Quantity/Button composition,
forced-colors behavior, and content reflow rather than raising the total CSS or
runtime ceilings.

The complete neutral Web CSS `64 KiB` and shared runtime `8 KiB` ceilings remain
binding. Existing program overages are reported explicitly and are not reset by
this decision.

## Consequences

- Every higher-level cart/order surface can consume one semantic line contract
  without copying markup, CSS, numeric behavior, or price semantics.
- Cart Line Item supports editable and read-only targets through optional slots
  without a separate visual variant or universal cart model.
- Shopify retains platform-complete data and mutation semantics without leaking
  its `line_item` object into the neutral API.
- Cart Drawer's prior human-review evidence must be refreshed because its line
  dependency and visual layout changed; the prior `stable` boundary is unchanged.
- Human review must still approve media scale, density, title hierarchy,
  separators, Price placement, action treatment, compact reflow, and wide-line
  balance.
