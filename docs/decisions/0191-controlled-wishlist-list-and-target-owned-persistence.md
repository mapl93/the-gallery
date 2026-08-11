# 0191. Controlled Wishlist List And Target-Owned Persistence

Status: Accepted

Date: 2026-07-17

## Context

Wishlist claimed a Product Card dependency but Account Studio copied Card,
Product Card, Price, media, and footer markup for every saved product. It also
defined `.wishlist-btn` as a second circular Button implementation with its own
surface, border, radius, touch size, focus, error color, transition, icon size,
and reduced-motion behavior. Studio forced a portrait Product Card and fixed
three/two/one columns independently of canonical Wishlist and Product Card CSS.

The local fixture treated saved state as an uncontrolled page concern. Its
accessible label changed between Save and Remove while `aria-pressed` changed,
mixing two different APG Button models. Toggling a saved product off left the
unsaved Card inside the Wishlist, while a count live region changed without any
persistence, pending, failure, focus, or empty-state policy.

HTML supplies section, heading, unordered-list, list-item, article, Link, and
Button semantics. APG distinguishes a command Button from a persistent toggle:
a toggle keeps a stable label while `aria-pressed` communicates state; a
changing Save/Remove command label does not also need pressed state. Radix
Toggle similarly exposes explicit controlled and uncontrolled pressed APIs.
There is no Open UI Wishlist element or portable browser persistence model.

Shopify's current documentation explicitly implements Wishlist as a full-page
customer-account UI extension with product queries, loading/empty branches,
navigation, and asynchronous Remove commands. It is not a universal Liquid
form or customer theme object. App/metafield, headless, guest local-storage, and
compatibility models have different authorization, protected-data, merge,
privacy, and lifecycle requirements.

## Decision

- U8 is a target-controlled saved-product composition. It owns no saved IDs,
  product query, formatter, persistence, account/guest identity, local storage,
  mutation cache, auth, router, live region, telemetry, or analytics.
- Stable semantic properties are required non-empty `title`, optional complete
  target-formatted `count`, optional `products` composition, and optional
  canonical `emptyState` composition. Once the target resolves loading and
  errors, it supplies either one or more products or the Empty State. Product
  records and mutation callbacks do not become Wishlist props.
- The root is a native `section.wishlist` labelled through the unique ID of its
  visible contextual heading. It has no application, grid, listbox, selection,
  or live-region role.
- Populated content is `ul.wishlist__grid`; every `li.wishlist__item` contains
  exactly one complete `article.card.product-card`. Product Card retains media,
  title Link, vendor, Price/footer, focus layering, optional actions, and its
  own responsive behavior.
- `.wishlist-btn` is removed from the U8 contract and CSS. In the saved-page
  fixture, each Product Card footer composes canonical Button as a contextual
  `Remove` command with a product-specific accessible name and no
  `aria-pressed`.
- A persistent Save toggle that remains visible in saved and unsaved states is
  not silently defined. If accepted later, it needs a canonical owner, stable
  label, pressed state, controlled/uncontrolled API, persistence reconciliation,
  Product Card integration, visual states, and target evidence.
- Products and count are controlled inputs from the same target source. Count
  is passive text. Pending, completion, failure, undo, resulting count, empty
  transition, and logical focus after removal belong to the target mutation
  owner outside U8.
- Resolved empty may compose canonical Empty State. Loading, error, offline,
  unauthorized, and stale-product conditions are not inferred as empty. Empty
  State's contextual heading and lifecycle boundaries remain inherited; U8
  does not duplicate them.
- Wishlist uses one named container, logical sizing, wrapping header, native
  list reset, intrinsic tracks, and a private Product Card minimum. Columns,
  minimum, thresholds, header orientation, gaps, media ratio, and action
  placement do not become semantic properties.
- Only Wishlist-owned title/count/layout tokens remain public. Button, Card,
  Product Card, Price, Empty State, focus, radius, touch target, error color,
  motion, and icon tokens remain with their canonical dependencies.
- Exhibit and Studio use one docs-only `WishlistArtwork`, one fixture, and one
  DOM. It consumes `ProductCardArtwork`, Price, Button, and Empty State rather
  than copying their trees. Studio may intercept Remove and announce honest
  demo feedback adjacent to U8 without claiming persistence.
- Neutral U8 runtime remains zero. Targets own requests, storage, state,
  mutations, focus, announcements, and services.
- Shopify remains `planned`. Customer-account full-page extension, headless/app
  service, theme-app/local storage, explicit compatibility, and omission are
  separate profiles requiring owner selection. Copied theme CSS is not target
  readiness.
- Registered Figma nodes remain traceability only because they resolve to the
  generic Button Studio shell, not U8 artwork or owner visual approval.
- Registry and contract add Empty State as an explicit optional composition
  dependency. Contract advances to `0.2.0`, remains `pilot`, and cannot become
  `stable` without explicit human review.

## Consequences

- Wishlist no longer duplicates Product Card, Price, or Button anatomy and can
  inherit their canonical fixes across Exhibit, Studio, Web, and targets.
- Native list and labelled-section semantics describe the collection without a
  custom keyboard model or author grid role.
- Command and toggle semantics are no longer conflated. The current fixture is
  truthful about being a removal request, while the broader reusable Save
  action stays visible as an owner decision.
- Removing duplicate heart CSS reclaims Account-family budget and removes
  U8-owned hardcoded error color, circle geometry, icon sizing, and motion.
- Targets can implement authenticated, guest, app-backed, or omitted profiles
  without coupling neutral source to Shopify, React, Figma, SwiftUI, Compose,
  or one storage API.
- Human review still decides persistence/account model, reusable toggle owner,
  mutation/undo/focus/announcement policy, saved ordering and stale products,
  lifecycle component portfolio, first Shopify profile, final grid/media/action
  visuals, and corrected U8-specific design evidence.

## References

- <https://html.spec.whatwg.org/dev/sections.html#the-section-element>
- <https://html.spec.whatwg.org/dev/grouping-content.html#the-ul-element>
- <https://www.w3.org/WAI/tutorials/page-structure/content/>
- <https://www.w3.org/WAI/tutorials/page-structure/labels/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/button/>
- <https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html>
- <https://www.radix-ui.com/primitives/docs/components/toggle>
- <https://shopify.dev/docs/apps/build/customer-accounts/full-page-extensions/build-new-pages>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets/full-page>
- <https://shopify.dev/docs/apps/build/customer-accounts/metafields>
