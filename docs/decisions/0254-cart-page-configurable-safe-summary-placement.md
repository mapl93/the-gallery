# ADR 0254: Cart Page Configurable Safe Summary Placement

- Status: Accepted
- Date: 2026-07-21
- Owners: The Gallery
- Scope: K1 Cart Page neutral API, Web presentation, docs renderer, Shopify
  projection, and future target translation
- Supersedes: the unresolved summary-placement boundary in ADR 0212

## Context

ADR 0212 established Cart Page as a named populated-cart composition over one
non-empty canonical Cart Line Item collection and one canonical Cart Summary.
It intentionally left summary placement unresolved. The owner subsequently
accepted `K1-A` with a semantic placement choice: consumers need the same
summary either in normal flow or sticky, with sticky as the default only when a
target can prove that it will not obscure content or controls.

Stickiness is presentation, not cart state. It must not create another summary,
change source order, alter the target-confirmed cart snapshot, or move mutation,
checkout, focus, status, and refresh ownership into K1. A hardcoded universal
header offset would also be false across Web, Shopify, native shells, zoom,
safe areas, and future targets.

## Decision

- K1 remains populated-only. A target atomically replaces it with canonical
  Cart Empty after the final line is removed; K1 has no empty slot or mode.
- Add the optional semantic property
  `summaryPlacement: "sticky" | "flow"`, defaulting to `"sticky"`.
- Both values render the same canonical Cart Summary from the same coherent
  target snapshot and preserve the logical source order after line items.
- `flow` explicitly maps to `.cart-page--summary-flow`. The classless default
  represents the sticky preference and avoids requiring consumers to add a
  modifier for the default.
- Neutral Web CSS applies sticky positioning only when the Cart Page container
  is at least `56rem` wide and the viewport is at least `36rem` tall. Narrow or
  short contexts therefore degrade to flow without script or source reordering.
- A sticky summary is bounded to the remaining dynamic viewport height and may
  scroll internally. Scroll padding keeps focused controls away from its own
  edges, and CSS sticky containment stops the surface within the cart layout.
- K1 defines a component-private safe offset with a safe-area-aware fallback.
  A target with fixed or sticky chrome owns the real offset and may replace the
  private value inside its adapter implementation. It is not a consumer-facing
  component token or a second public property.
- A target must choose or degrade to flow when it cannot prove its header and
  safe-area offset, available height, collision boundary, zoom behavior, and
  focus-not-obscured behavior. The `sticky` input is a requested presentation,
  not permission to cover controls.
- Shopify exposes an editor `select` with sticky and flow options. Its adapter
  maps the owned Gallery Header height plus spacing and safe-area inset into the
  private sticky offset. The source remains `planned` until Theme Editor,
  localized/extreme content, zoom, keyboard, live-store, and mutation lifecycle
  evidence passes.
- Exhibit and Studio continue to use the same `CartPageArtwork`, fixture,
  canonical dependencies, and property value. Studio exposes one segmented
  placement control rather than a layout implementation control.
- K1 remains zero-runtime. It adds no listener, resize measurement, observer,
  timer, request, focus manager, cart store, or commerce calculation.
- The contract advances to `0.3.0` and remains `pilot`. Automated validation
  and visual evidence can make it ready for human review but never `stable`.

## Accessibility And Responsive Requirements

- Sticky and flow use identical document semantics, accessible names, Tab
  order, canonical controls, and Cart Summary content.
- At 200 percent zoom, narrow component widths and short viewports, default
  sticky presentation must fall back to flow rather than compressing or
  obscuring the summary.
- Tall summary content must remain reachable by keyboard and pointer. A target
  may not hide focused controls below fixed chrome or outside the available
  block-size boundary.
- Page scrolling must remain possible before and after the summary; an internal
  scroll region cannot become a keyboard trap.
- The target owns one contextual status announcement after confirmed mutations.
  Placement changes do not make count, totals, or the summary live regions.

## Consequences

- Consumers receive the requested semantic configuration without public grid,
  breakpoint, offset, height, collision, or scrollbar properties.
- The default expresses the owner's preferred wide-cart behavior while safe CSS
  fallbacks preserve mobile, zoomed, and short-viewport usability.
- Web, Shopify, and future capable targets have one stable mapping point and one
  explicit certification obligation instead of unrelated sticky copies.
- Cart Summary remains passive and canonical; K1 remains the only placement
  owner for the page composition.
- Final visual approval must compare sticky and flow at representative widths,
  tall content, zoom, focus, and localized content. Production Shopify
  certification remains separate from source validity.

## Not Approved

This decision does not approve:

- an empty K1 mode or Cart Empty dependency;
- public offset, breakpoint, summary-width, viewport-height, overflow, or
  scrollbar properties;
- automatic header measurement or neutral JavaScript;
- a universal sticky implementation for targets that cannot meet the safety
  contract;
- Shopify production readiness from Liquid/CSS validation alone;
- final Cart Page aesthetics, Figma artwork, native-target implementation, or
  package strategy; or
- promotion from `pilot` to `stable`.
