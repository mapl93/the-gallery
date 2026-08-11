# ADR 0178: Native Recommendation List And Per-Item Capability

Date: 2026-07-16

## Status

Accepted

## Context

K6 Cart Upsell already exposed its recommendation content through an `items`
slot, but also required one collection-wide `addLabel` and offered one global
`addDisabled` boolean. That model cannot represent heterogeneous products: one
recommendation may be directly addable, another may be unavailable, and another
may require product navigation and variant selection. It also made every item
action share the same accessible name.

The concrete implementation did not honor the composition boundary. Studio and
MDX duplicated a generic `div` collection and `article` row, raw price text and
Button markup. Studio added optimistic local “Added” state and an English live
status inside K6. Price was not a declared dependency, the `section` was unnamed,
and the layout depended on viewport-insensitive physical values and external
margin.

Standards define no Cart Upsell widget. Native section/list/link/button
semantics already cover the stable structure, while recommendation source,
product records, price formatting, variant selection, cart mutation, result
status, analytics and refresh differ by target. Shopify's recommendation object
is available only through its target-specific recommendation/section request
lifecycle and does not guarantee that every product has one safe addable variant.

## Decision

1. K6 is a named `section` containing a visible heading and one native
   `ul.cart-upsell__items` with `li.cart-upsell__item` recommendations.
2. Blank title or zero valid items omits the complete component. K6 does not
   expose an empty named region or define its own empty state.
3. The public neutral API is limited to required non-empty `title` and `items`
   slot. Remove collection-wide `addLabel` and `addDisabled` without compatibility
   aliases while the contract remains pilot.
4. Each target-authored item independently owns non-empty product identity,
   optional media, optional truthful destination, optional target-formatted
   Price and optional target-supported action.
5. Product navigation composes canonical Link, price content composes canonical
   Price, and add requests compose canonical Button. K6 owns no parallel link,
   price, disabled, busy, focus, motion or forced-colors implementation.
6. A direct action is optional. Targets omit it when variant selection,
   availability, permissions or commerce capability do not support truthful
   one-click addition. K6 never chooses a first variant.
7. Repeated actions require contextual accessible names and per-item
   unavailable/pending truth. No collection-wide label or disabled state is
   projected across heterogeneous items.
8. K6 is controlled target presentation, not a recommendation/cart state
   machine. It emits no neutral event and adds no request, formatter, cache,
   optimistic policy, live region, focus relocation, analytics or runtime.
9. The parent target confirms results, updates authoritative cart count/totals,
   announces success/error in one deliberate external status surface, and owns
   post-mutation focus policy.
10. K6 uses one intrinsic compact layout with inline-size container reflow. The
    parent owns external placement and spacing; no viewport breakpoint or
    external margin belongs to K6.
11. Exhibit and Studio consume one `CartUpsellArtwork`. The docs fixture may
    demonstrate a target-confirmed action result, but that state and its status
    remain outside the K6 subtree and are not promoted to public API.
12. Shopify remains planned. A target-native implementation requires an accepted
    recommendation source/context, cart placement, item limit, variant/add
    policy, merchant settings, tracking, refresh/status behavior and live/editor
    proof. Neutral certification does not infer those decisions.
13. K6 remains `pilot`; automated evidence can prepare human review but cannot
    promote it to `stable`.

This decision refines the Cart Upsell portion of ADR 0077. It preserves the
accepted semantic `items` boundary and target-owned add behavior while moving
action capability into each item, where it can remain coherent.

## Performance

K6 has a `0 B` neutral JavaScript budget and no component asset or request. Its
CSS should remain at or below the existing `391 B` gzip slice when practical,
and complete Cart CSS must remain under the permanent `3.0 KiB` gzip family
ceiling. The complete neutral Web CSS `64 KiB` and shared runtime `8 KiB`
ceilings remain binding; existing overages are reported rather than reset.

## Consequences

- Native structure and canonical dependencies replace duplicate row, price and
  interaction semantics without introducing a framework or platform record.
- Navigation-only and directly actionable recommendations can coexist without
  contradictory global state.
- Per-item accessible names, availability and pending truth become possible
  while K6 itself stays passive and runtime-free.
- Shopify can preserve official recommendation tracking URLs and use its own
  section/Ajax lifecycle without leaking those APIs into Neutral Web, React,
  Figma or native targets.
- Human review must still approve surface contrast, heading/Price hierarchy,
  media scale, Button emphasis, item density and narrow-container reflow.
