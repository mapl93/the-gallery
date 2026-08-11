# ADR 0212: Named Populated Cart Page And Target Lifecycle Boundary

- Status: Accepted
- Date: 2026-07-18
- Partially superseded by: ADR 0254 for configurable sticky/flow summary
  placement and its target safety boundary
- Owners: The Gallery
- Scope: K1 Cart Page neutral contract, Web presentation, docs renderer,
  Shopify projection, and future target translation

## Context

Cart Page was described as a full cart page but implemented mainly as a
viewport-driven two-column wrapper. Its root was not named, its nested items
wrapper used another unnamed section, the header lived inside that items
region, required dependency slots could disappear, and Studio invented
`#collection` when a continue destination was missing. Studio and Shopify
also overrode the canonical grid independently. Shopify placed the page heading
outside K1, omitted count and continue context, and introduced an unapproved
sticky summary with a hardcoded `100px` offset.

K1 already declares Cart Line Item and Cart Summary as dependencies. Those
components own line identity and actions, native summary facts, checkout
semantics, focus treatment, and their target boundaries. Cart Page should
compose them rather than becoming a second cart model, calculator, mutation
service, status system, checkout controller, or empty-state implementation.

There is no interoperable Cart Page ARIA pattern or Open UI primitive. HTML
section semantics, WCAG status-message guidance and Shopify's cart requirements
support native document structure with a target-owned commerce lifecycle.

## Decision

- K1 represents a populated cart composition only.
- The required root is a native `section.cart-page` named by a non-empty
  visible heading through a target-unique `aria-labelledby` relationship.
  Heading rank remains target-contextual.
- A required native `header.cart-page__header` contains the title, optional
  localized count snapshot, and optional continue-shopping link.
- Continue shopping renders only when both a non-empty label and a real
  target-owned destination exist. The neutral renderer never invents a URL.
- A private required `div.cart-page__layout` contains neutral items and
  summary wrappers. Items contain one non-empty canonical `ul.cart-lines`;
  summary contains one complete canonical `.cart-summary`.
- The items and summary wrappers remain neutral `div` elements. They do not
  add unnamed section or complementary landmarks around canonical children.
- A blank title, missing line-item collection, or missing summary omits the
  complete docs renderer.
- The root establishes an inline-size container. Only the private layout
  descendant changes from one flow to flexible main/bounded-summary tracks at
  a private threshold. Studio and targets do not override that layout.
- Count is optional localized snapshot text, not a calculation input or live
  region by default.
- After a confirmed mutation that changes content without navigation or focus
  context, one target coordinator may announce one complete contextual result.
  Count, lines and totals must not become competing live regions.
- The target owns cart storage and identity, inventory, pricing, discounts,
  taxes, shipping, localization, mutation transport, pending/error/rollback/
  retry, empty transition, focus, announcements, analytics, checkout and
  cross-surface synchronization.
- K1 adds no neutral listener, state store, request, timer, observer, layout
  read, focus manager, animation or asset.
- One docs-only `CartPageArtwork` owns Exhibit and Studio markup and fixture
  composition. It consumes the already canonical line-item and summary
  renderers.
- The contract advances to `0.2.0` and remains `pilot`.

## External Evidence

- HTML defines `section` as a thematic grouping normally identified by a
  heading and recommends `div` for generic layout.
- WCAG 2.2 status-message guidance covers important dynamic changes that do not
  receive focus and supports a single complete contextual announcement rather
  than indiscriminate live regions.
- WAI form guidance leaves validation, errors, confirmation and focus strategy
  with the complete form workflow.
- Open UI's component matrix and Radix primitives publish no Cart Page pattern.
- Polaris exposes general page, section, grid, link, button and status
  primitives rather than a platform-neutral cart controller.
- Shopify's cart template and Theme Store requirements require actual cart
  lines, quantities, removal, totals, discounts, notes, checkout and empty
  handling. Those are target data and lifecycle obligations, not neutral K1
  state.

## Shopify Projection

The populated branch of `main-cart.liquid` maps Shopify's native cart form,
`cart.items`, localized plural count, real all-products route, canonical line
snippet and canonical summary snippet into K1. Cart Note, the explicit update
submitter, Discount Field and the Cart Empty branch remain target composition
outside the K1 root.

The previous inline viewport grid and sticky summary are removed. Shopify
server-authoritative refresh, line errors, focus after removal, empty
transition, accelerated checkout, Theme Editor behavior and live-store proof
remain required before the adapter can claim target readiness.

## Performance

K1 contributes CSS only. Its family budget remains the existing Cart ceiling of
`3072` gzip bytes for `components/css/cart.css`; this decision does not raise
that budget. The implementation adds no runtime or asset.

## Open Human And Architecture Boundary

This decision intentionally did not approve the following. ADR 0254 later
resolves summary placement while preserving the remaining boundaries:

- consolidating Cart Empty into K1 or turning empty into a K1 variant;
- sticky summary behavior, scroll container, offset, collision policy, zoom
  behavior or mobile fallback (resolved by ADR 0254 as a safely degrading
  `summaryPlacement` target contract);
- mutation strategy, optimistic updates, error UI, retry/rollback, post-removal
  focus, announcement wording/cadence or cross-surface synchronization;
- final title/count/link hierarchy, track ratio, threshold, summary width,
  density, spacing, typography, color or visual artwork;
- final Shopify Ajax versus native navigation strategy, section refresh,
  editor integration, live-store behavior or accelerated checkout treatment;
- final Figma component set, framework implementation, native target
  implementation or target package strategy; or
- promotion from `pilot` to `stable`.

## Consequences

- Exhibit and Studio share one valid semantic tree and fixture path.
- K1 has a clear composition job and cannot silently become a cart service.
- Canonical dependencies retain one implementation of line and summary
  behavior.
- Layout follows component space rather than viewport or Studio framing.
- Incomplete optional links and required compositions fail closed.
- Shopify uses truthful cart data while retaining explicit runtime proof gaps.
- Product, visual and architecture choices remain visible for human review.
