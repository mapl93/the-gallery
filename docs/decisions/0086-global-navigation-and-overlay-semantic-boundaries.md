# 0086. Global Navigation And Overlay Semantic Boundaries

Status: Accepted

Date: 2026-07-12

## Context

Header, Announcement Bar, Footer, Mobile Menu, Search Overlay, Cart Drawer,
Mega Menu, and Bottom Navigation had structurally valid pilot contracts, but
their contracts exposed no reviewed semantic properties. Their CSS and current
documentation established useful visual anatomy while also describing behavior
that belongs to navigation data, search services, commerce state, Drawer, or a
target runtime.

The family also had neutral-web maturity gaps around intrinsic-width
containment, narrow viewports, visible keyboard focus, touch targets, overlay
pointer isolation, scroll containment, and reduced motion. These gaps can be
addressed without choosing a navigation model, search provider, commerce API,
or overlay controller.

## Decision

### The Global family remains a pilot

All eight contracts advance to contract version `0.2.0` and remain `pilot`.
They expose 27 reviewed properties in total. Automated validation remains
structural evidence and does not replace the human review required for
promotion to `stable`.

### Global shell content is supplied through semantic regions

- Header exposes brand content and destination, an optional accessible brand
  label, optional labelled primary navigation, target-owned navigation items,
  an action region, an optional target-formatted cart count, and an optional
  Button dependency for a mobile-menu trigger.
- Header does not decide which actions exist or connect those actions to Search
  Overlay, Cart Drawer, Mobile Menu, Drawer, or Mega Menu.
- Announcement Bar exposes an optional region label and required target-owned
  message content. That content may include a native link.
- Announcement Bar does not gain dismissal, rotation, countdown, scheduling,
  targeting, or campaign analytics behavior.
- Footer exposes required target-owned link groups and optional metadata. It
  does not define a CMS block schema, newsletter behavior, locale selection, or
  legal-content source.

### Navigation inventories remain target-owned

- Mobile Menu exposes one required item slot. Drawer remains responsible for
  overlay presentation, while the target supplies destinations, labels, nested
  structure, and current-page markup.
- Bottom Navigation exposes a required accessible region label and one required
  item slot. Items retain visible labels and may include icons, current-page
  state, and badges.
- Mega Menu exposes its accessible navigation label, open presentation state,
  and optional navigation columns, promo, and featured regions.
- Mega Menu's existing `default`, `promo`, and `featured` variants describe
  supported composition, not option classes. No semantic `variant` property is
  added because canonical source has no class mapping for those compositions.
- Targets own menu records, hierarchy, destination resolution, active state,
  promo and featured records, and breakpoint-specific choice between global
  navigation surfaces.

### Open is presentation state, not a runtime implementation

- Search Overlay and Mega Menu expose `open` because canonical source already
  establishes hidden and visible selectors. The property synchronizes the
  visible class with `aria-hidden`.
- `open` does not assign triggers, event listeners, keyboard entry, Escape or
  outside-click dismissal, focus movement, focus trapping, focus restoration,
  scroll locking, inert background behavior, or stacking coordination.
- Mobile Menu and Cart Drawer do not duplicate an `open` property. They compose
  Drawer, which retains visibility and overlay ownership.

### Search exposes input and result composition, not search logic

- Search Overlay exposes the native search input's accessible label, current
  query, optional placeholder, and a target-owned result region.
- The result region may contain result, loading, empty, or error content.
- The contract does not define an endpoint, provider, debounce policy, minimum
  query length, result types, ranking, highlighting, pagination, cache,
  localization, analytics, or live-region announcement strategy.

### Cart Drawer exposes composition, not commerce state management

- Cart Drawer exposes ordered line-item composition and an optional compact
  summary region.
- Current CSS anatomy may compose Price and Quantity Selector inside each item,
  while Drawer retains overlay behavior.
- Product records, variant truth, image data, stock, currency formatting,
  quantity mutation, removal, optimistic updates, errors, empty state, totals,
  checkout routing, and announcements remain target-owned.

### Neutral-web CSS receives bounded hardening

Canonical Global CSS now:

- Applies border-box sizing and intrinsic-width containment to the owned
  surfaces and their descendants.
- Bounds media, flexible text, grids, overlay panels, result regions, cart rows,
  and menu columns on narrow viewports.
- Gives owned native links, inputs, and actions visible focus using existing
  public focus tokens.
- Preserves the existing touch-target token for Mobile Menu, cart removal, and
  Bottom Navigation controls.
- Prevents closed overlays from intercepting pointer input and contains overlay
  scrolling.
- Restricts decorative featured-media scaling to fine pointers and removes
  transitions and transforms under reduced motion.

No JavaScript behavior, new public token, registry metadata, MDX content,
Studio metadata, target adapter, Shopify implementation, generated output, or
`site/dist` file is introduced by this decision.

## Open Product Boundaries

The following questions remain unresolved and block affected Global contracts
from promotion to `stable`.

### Global shell and navigation data

- Which shared schema supplies brand, primary navigation, footer groups, legal
  metadata, locale controls, social links, promos, featured destinations, and
  mobile navigation items across targets?
- Which layer decides the current destination, external-link handling, nested
  navigation depth, localization, permissions, and unavailable destinations?
- Which actions belong in Header and Bottom Navigation, and how are search,
  account, wishlist, cart, and menu actions prioritized at each breakpoint?

### Trigger and overlay coordination

- Which runtime connects Header actions to Search Overlay, Cart Drawer, Mobile
  Menu, Drawer, and Mega Menu?
- Which component owns mutual exclusion when multiple global overlays can open?
- Which layer owns focus entry, focus trap or containment, Escape and outside
  dismissal, focus restoration, scroll locking, inert background behavior,
  route-change dismissal, and stacking order?

### Mega Menu interaction model

- Does Mega Menu open on click, hover, keyboard focus, or a target-specific
  combination, and what delays or pointer-intent rules apply?
- What trigger roles, expanded relationships, keyboard model, focus movement,
  close boundaries, and mobile fallback are required?
- Are promo and featured regions always native links, and which records or
  analytics rules populate them?

### Search service and announcements

- Which provider or endpoint performs search, and which layer owns debouncing,
  cancellation, ranking, caching, result limits, loading, errors, and empty
  results?
- Which result types are supported, how are prices and media formatted, and
  which destinations do results use?
- How are changing result counts and statuses announced without excessive live
  region output?

### Cart state and checkout

- Which cart API or target store owns line records, quantity mutations,
  removal, inventory validation, pricing, discounts, taxes, shipping, totals,
  currency, and checkout routing?
- Which layer owns optimistic updates, pending and error states, retries, empty
  state, live announcements, and focus after a line is removed?
- How are Header and Bottom Navigation badges synchronized with Cart Drawer and
  other cart surfaces?

### Announcement, Footer, and Bottom Navigation policy

- Is Announcement Bar static, dismissible, scheduled, targeted, rotating, or a
  composition with Announcement Extended, and where is persistence stored?
- Which Footer content is required per target, and which systems own
  newsletter, localization, legal revisions, consent, and external services?
- Which destinations belong in Bottom Navigation, who owns its body-offset or
  overlap strategy, and when should dynamic badges be announced?

## Consequences

- Global adapters can consume explicit semantic regions and source-backed open
  presentation without inventing navigation, search, commerce, or overlay
  runtime behavior.
- Drawer remains the owner of Mobile Menu and Cart Drawer overlay composition.
- Fixture content, icon choices, menu records, cart records, and result records
  remain target data rather than component defaults.
- Keyboard, touch, narrow-layout, and reduced-motion presentation improve while
  every unresolved product boundary remains visible for later owner review.
