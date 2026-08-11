# 0215. Canonical Store Pickup Accordion And Target Availability Snapshot

Status: Superseded by ADR 0244

Date: 2026-07-18

The owner later accepted D9-C. ADR 0244 replaces this passive snapshot with
Pickup Location Selector and adds a separate discovery-only Store Locator.

## Context

D9 Store Pickup Availability independently implemented a disclosure whose root,
Button, chevron, focus, transitions and CSS-driven visibility duplicated the
canonical Accordion contract. Its generic root repeated `aria-expanded`, its
panel used `display` rather than the canonical native `hidden` relationship,
and its locations were unstructured `div` records. Exhibit and Studio shared
only one inline Product Studio function and hardcoded fixture; there was no
standalone D9 renderer.

The contract exposed `toggleLabel` and `expanded` but omitted the defining
location composition. It described available/unavailable visual states without
specifying how a target supplies readable records. The repository has no
accepted cross-target inventory provider, merchandise identity, location
schema, ordering, refresh/error policy, selection flow, Shopify section or
store-locator architecture.

ADR 0075 requires synchronized disclosure state for D9. ADR 0099 already
assigns the heading, native Button, state relationship, hidden panel, focus,
indicator, reduced motion and optional target-native `details` translation to
canonical Accordion. Official Shopify availability records are variant-scoped
and may reflect transfers or overselling, so quantity is not a neutral source
of pickup truth.

## Decision

- D9 is a product-domain profile around exactly one canonical Accordion item.
- Canonical Accordion remains the sole owner of the contextual heading, native
  Button trigger, stable IDs, `aria-expanded`, `aria-controls`, native `hidden`
  panel, focus, indicator, activation and reduced-motion behavior.
- D9 owns only its quiet product-context root profile, optional summary media,
  native pickup-location list, record rhythm, readable text hierarchy and
  optional decorative status-media treatment.
- The public semantic API is `toggleLabel`, required `locations` composition
  and optional `expanded` with default `false`.
- `locations` is an opaque complete target-owned slot, not a universal record
  schema. Every valid rendered record is a native list item with a non-empty
  visible location name and readable availability statement. Supporting
  address, distance, readiness, hours, qualifications and instructions remain
  target-authored optional content.
- Missing label or zero valid records omits the complete D9 component. Optional
  record fields omit without empty nodes.
- Availability is content, not a D9 component state or public boolean. Color
  and icons may reinforce but never replace the readable statement.
- Stateful adapters may expose controlled `expanded/onExpandedChange` and an
  uncontrolled `defaultExpanded` convenience, but must retain one logical
  owner. Static adapters may use Accordion's accepted semantics-preserving
  native `details/summary` translation.
- Product or variant identity, market, selling plan, quantity, provider data,
  ordering, fetch/cancel/retry, loading/empty/error, stale-response suppression,
  replacement timing and any truthful status announcement belong to the target
  product coordinator.
- D9 is not a pickup selector, checkout delivery option, reservation flow,
  inventory engine, store locator, geocoder, map, directions or route-planning
  component.
- D9 adds zero neutral runtime, asset, listener, observer, timer, request,
  cache, formatter, storage, geolocation or layout read.
- Shopify remains planned. A target-native section or container, selected-
  variant coordinator, Liquid data mapping, localization, editor behavior and
  live-store proof are required before target readiness.
- D9 remains `pilot`; automated evidence cannot promote it to `stable`.

## Consequences

- Store Pickup consumes previously reviewed disclosure semantics instead of
  maintaining a parallel implementation.
- Exhibit and Studio can mount one `StorePickupArtwork` and one site-only
  fixture while fallback MDX uses the same canonical class contract.
- Native list semantics and text-complete records improve structure without
  turning target commerce data into a base component model.
- Product-family CSS and neutral runtime stay bounded while host-driven
  wrapping, RTL and special-color behavior become testable.
- Targets can bind their actual availability service without importing React,
  Shopify, Figma or provider concepts into the neutral base.
- Merchandise scope, provider truth, record ordering, update/status lifecycle,
  long-list or selection expansion, Shopify integration, final visual values,
  D9-specific Figma evidence and explicit human review remain open.
