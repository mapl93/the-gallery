# 0140. Review Pagination As A Canonical Pagination Profile

Status: Accepted

Date: 2026-07-15

## Context

Review Pagination entered refinement as a second numbered-navigation
implementation. It defined review-specific buttons, current and disabled states,
thirteen public tokens, horizontal scrolling and a separate Studio renderer.
Its four-page fixture always displayed an ellipsis without a final destination,
used no real links, kept the current page activatable and overflowed its Mobile
artwork root.

Canonical Pagination had already completed technical refinement under ADR 0122.
It defines the same bounded page-navigation job through a named native `nav`, a
`ul`/`li` list, canonical Link destinations, one non-interactive current page,
passive ellipses, omitted boundaries, intrinsic wrapping and target-owned URLs
and result lifecycle.

Review context changes the result set and accessible name. It does not justify
a second semantic, visual or runtime implementation.

## Decision

- Review Pagination becomes a contextual profile of canonical Pagination.
- Registry and contract add `pagination` as the sole direct dependency. Link is
  consumed transitively through Pagination.
- The Web root layers `.review-pagination` on `.pagination`. Every visible child
  uses canonical `.pagination__list`, `.pagination__item`, `.pagination__link`,
  `.pagination__current` and `.pagination__ellipsis` anatomy.
- The obsolete `.review-pagination__btn`, list, item and ellipsis child API is
  removed rather than preserved as a compatibility alias.
- Review Pagination adds no visual token, variant, size, disabled state,
  keyboard model or neutral runtime of its own.
- Public semantic properties align with Pagination: required `label`, positive
  `currentPage` projection and required finite `pageItems` composition.
- Available destinations are native canonical Links with real target-owned
  URLs. Exactly one current item is non-interactive and uses
  `aria-current="page"`. Ellipses are passive and hidden from assistive
  technology.
- Previous is omitted on the first page and Next is omitted on the last page.
  Disabled review-page controls and dead focus stops are not retained.
- The target owns provider data, total pages, finite window calculation, URL or
  cursor translation, requests, cancellation, loading/errors, result
  replacement, history, scrolling, focus, announcements, analytics and prefetch.
- A shared docs-only `PaginationArtwork` renderer is consumed by canonical
  Pagination and Review Pagination. It projects one controlled ten-page fixture
  without adding a neutral algorithm or runtime.
- When `pageItems` is absent, the docs renderer omits the complete navigation
  rather than emitting an empty landmark. Production targets likewise omit the
  component for a one-page result set.
- The contract advances to `0.3.0` and remains `pilot`.

## External Evidence

- WAI navigation guidance supports named native navigation and list structure.
- WAI ARIA26 and ARIA define one `aria-current="page"` item in a related set.
- Native Link guidance preserves URL navigation, Enter, modified activation,
  context menus and browser history.
- The W3C Design System uses a named navigation list, page links, ellipses and
  one current page.
- Open UI lists Pagination as a cross-system name but defines no standardized
  browser primitive or behavior model.
- Radix publishes no Pagination primitive, reinforcing that native link/list
  composition is sufficient.
- Historical Polaris Pagination exposes URL/callback and availability choices
  at the consumer; its React package is now deprecated and is not a neutral
  implementation source.
- Shopify Liquid `paginate` supplies current page, total pages, previous, next
  and parts to the target adapter.

These sources support the already accepted canonical Pagination contract. They
do not select a review provider, strategy, page window or visual exception.

## Figma Evidence

The registered file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and inspector
`1020:480` remain the generic Button/Studio shell, not Review Pagination artwork.
No review-specific density, current state, icon, ellipsis or responsive decision
is inferred from those nodes.

## Performance

The profile adds no listener, observer, timer, request, state store, formatter,
focus manager, layout read, animation or asset. Removing the duplicate V9 CSS
reduces Reviews-family and complete Web CSS. Canonical Pagination and Link
retain their existing performance budgets; this decision creates no new ceiling.

## Target Boundary

- Neutral Web uses one canonical Pagination tree plus the context hook.
- Shopify requires a selected review provider or app block. Provider data may
  map into canonical Pagination, but this decision does not authorize generic
  review Liquid.
- React and Angular may use server links or a controlled canonical Pagination
  projection with one target-owned result coordinator; they must not retain a
  second Review Pagination value store.
- Figma should use an instance/profile of canonical Pagination with a review
  label and first/middle/last examples after human visual review.
- SwiftUI and Compose use equivalent target-native finite page navigation.
  Cursor-only, load-more and infinite loading are separate product modes.

## Open Human And Product Boundary

This decision intentionally does not approve:

- final density, current emphasis, wrap behavior, ellipsis rhythm or
  directional icon treatment in the review context;
- numbered versus cursor, load-more, infinite or provider-managed strategy;
- page size, window algorithm, labels or URL/query format;
- provider, authentication, moderation, loading, result status, focus, scroll,
  history, announcement, analytics or prefetch policy;
- dedicated Shopify, Figma, React, Angular, SwiftUI or Compose implementation;
  or
- promotion from `pilot` to `stable`.

## Consequences

- The repository has one semantic and visual source for finite page navigation.
- Review consumers receive canonical links, current-page meaning, boundary
  omission, wrapping, RTL, forced-colors and reduced-motion behavior without
  duplicate implementation.
- The formal dependency graph accurately records the composition.
- Reviews-family CSS and public configuration surface shrink.
- Provider and result behavior can vary by target without forking Pagination.
- Human review and explicit stability approval remain required.
