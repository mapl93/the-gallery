# 0122. Native Listed Pagination And Target-Owned Page Lifecycle

Status: Accepted

Date: 2026-07-14

## Context

Pagination rendered links and spans directly inside a navigation landmark. The
shared Studio fixture hard-coded four pages, always added an ellipsis without a
last destination, and retained previous or next anchors at boundaries with
`aria-disabled="true"`, `pointer-events: none`, and `tabIndex=0`. The row did not
wrap inside a narrow component root. Its background transition had no local
reduced-motion treatment. Shopify already mapped the Liquid `paginate` object,
but the contract still described that adapter as planned and the markup lacked
the same list/item anatomy.

WAI navigation guidance and the W3C design-system example use native navigation
and list semantics and identify one current page. APG strongly prefers native
anchors with `href` and recommends removing inferable unavailable controls from
sequential focus. Open UI has no standardized Pagination element or behavior,
and Radix has no Pagination primitive. Polaris and Shopify demonstrate that page
availability, URLs and result lifecycle belong to the consuming platform.

References disagree on whether the current page remains a link and whether a
directional boundary is disabled or omitted. The Gallery already represented
the current page as non-interactive text, and Shopify already omitted unavailable
directions. Preserving those source-backed choices avoids redundant activation
and dead focus stops without selecting a new product model.

## Decision

- Pagination renders a specifically named native `nav` containing one
  `.pagination__list` `ul` and repeated `.pagination__item` `li` elements.
- Every available page, previous destination, and next destination is a native
  `a[href]` that composes canonical Link plus `.pagination__link` geometry.
- Exactly one `.pagination__current` non-interactive span represents the current
  page with `aria-current="page"`. It is not a link, button, or disabled control.
- Previous is omitted on the first page and next is omitted on the last page.
  Pagination does not retain `aria-disabled` anchors or CSS-only activation
  suppression.
- Optional ellipses are passive `.pagination__ellipsis` spans inside list items
  hidden from assistive technology. They are never links or controls.
- `label`, `currentPage`, and `pageItems` remain the public semantic properties.
  `pageItems` is the target-supplied finite output of a page-window decision.
  Total pages, sibling/boundary counts and compact/mobile algorithms do not
  become neutral public API.
- Static Web and Shopify use the current URL/query and rendered results as the
  source of truth. Framework targets may project controlled page state, but the
  target owns navigation requests, cancellation, pending/error state, result
  replacement, URL/history, scrolling, focus restoration, announcements,
  analytics and prefetch.
- The shared Studio fixture demonstrates a target-owned ten-page window and
  controlled first/middle/last transitions. Its click interception is docs-only
  evidence and adds no neutral runtime.
- The list wraps intrinsically inside its actual container. CSS does not hide,
  reorder, or calculate page items and adds no viewport breakpoint.
- Pagination-owned background transition and public transition/easing tokens are
  removed. Canonical Link retains its own accepted reduced-motion behavior.
- Directional SVGs are target-provided, decorative, localized through their link
  names, and mirrored by the Pagination direction rule in RTL.
- Shopify maps `paginate.previous`, `paginate.parts`,
  `paginate.current_page`, and `paginate.next` to the same anatomy and adds
  localized numeric-page accessible names. Its contract status is implemented
  only after theme validation succeeds.
- The component remains `pilot` and may become human-review-ready after complete
  evidence and validation. Only explicit human review can promote it to
  `stable`.

## Performance

Pagination adds no neutral JavaScript, listener, observer, request, asset,
formatter, state store, focus manager, or scroll behavior. List reset and wrap
semantics are funded by removing the obsolete disabled-link and Pagination-owned
transition rules. The existing Collection `2.5 KiB` and total component CSS
`64 KiB` gzip ceilings remain binding and are not reset.

## Consequences

- Web, Shopify and future targets share one semantic structure without treating
  Liquid, React, a query schema, or one page-window algorithm as source.
- Keyboard users encounter only real destinations in ordinary Tab order; the
  current page and ellipses create no dead stops.
- Exact Exhibit/Studio parity can exercise first, middle, last, localized,
  extreme, RTL and narrow-wrap states through one renderer and fixture.
- Targets remain free to use server navigation, client interception, cursors,
  section rendering, or platform-native paging while retaining equivalent
  destination/current meaning.
- Human review still owns visual acceptance of density, wrapping, gap, radius,
  current emphasis, directional icons and the absence of a compact variant.
