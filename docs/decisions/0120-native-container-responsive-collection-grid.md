# 0120. Native Container-Responsive Collection Grid

Status: Accepted

Date: 2026-07-14

## Context

Collection Grid was a CSS grid directly on a neutral root. It used viewport
media queries, had no native list/item anatomy, and duplicated a reduced Product
Card in Studio. Its `columns` property was described as a desktop CSS hook but
could not be reviewed coherently across embedded containers. Shopify already
looped through collection products and rendered the canonical Product Card
snippet, yet it lacked native list wrappers, did not map the column request, and
was still classified as planned.

The HTML list model fits a finite storefront product collection. WAI-ARIA's
`grid` pattern instead creates a composite widget with one tab stop and an
author-managed two-dimensional keyboard model; adding that role to ordinary
product links would remove expected document navigation without adding useful
selection or editing behavior. CSS container queries allow density to follow
the component's available width rather than the viewport.

ADR 0076 already accepts a bounded two-through-six column request and canonical
Product Card dependency. ADR 0090 owns Product Card navigation, media, Price,
Badge, Button, focus, and quick-add composition. This decision reconciles the
missing semantic and responsive boundary without choosing a new visual style.

## Decision

- Collection Grid is a passive, finite projection of ordered Product Cards. It
  is not an APG grid, data table, masonry layout, infinite feed, result provider,
  selection model, or alternate-view controller.
- The neutral root is `.collection-grid`. It owns page spacing, the wide-column
  request, and named inline-size containment but adds no landmark, accessible
  name, focus stop, live region, busy state, or keyboard handler.
- `.collection-grid__items` is a native `ul` and the responsive CSS grid. Every
  direct `.collection-grid__item` is an `li` containing exactly one canonical
  Product Card. DOM and visual order remain aligned; dense packing, CSS order,
  `grid`, `row`, and `gridcell` roles are excluded.
- Responsive density follows the root container: one column below `20rem`, two
  from `20rem`, three from `48rem`, and the requested count from `64rem`.
  `minmax(0, 1fr)` tracks and zero-min items protect reflow.
- The public API remains `columns` and `items`. `columns` is an integer `2..6`,
  defaults to `4`, maps through `data-columns`, and affects only the wide mode.
  Intermediate counts, thresholds, track geometry, wrappers, and item sizing
  remain private composition. The legacy `--grid-columns` hook remains a
  compatibility input but is not expanded into new public token surface.
- `items` is a required slot that may contain zero or more Product Cards. Empty
  recovery belongs to Empty Collection; filtering, sorting, pagination,
  loading/error presentation, result announcements, focus restoration, data,
  analytics, responsive image policy, and virtualization remain parent or
  target owned.
- Collection Grid adds no neutral JavaScript, listener, observer, timer, fetch,
  layout read, animation, or asset. Child interaction, forced-color focus, and
  reduced motion remain Product Card duties.
- Exhibit and Studio render the same CollectionStudio branch, six-item fixture,
  native wrappers, and extracted `ProductCardArtwork`. Site-only presentation
  may provide a wider review canvas and remove page padding but may not implement
  Grid behavior or duplicate Product Card.
- Shopify paginates `collection.products`, maps one localized editor column
  setting, and renders one canonical `product-card` snippet per native list
  item. Pagination, filtering, sorting, target refresh, and announcements do not
  become neutral Grid behavior.
- The contract remains `pilot`. Automated evidence prepares the candidate for
  human review but never promotes it to `stable`.

## Performance

Deterministic level-9 gzip after refinement measures:

- Collection CSS: `2,258 B / 2.5 KiB`, leaving `302 B`; Batch 35 adds `70 B`.
- Neutral Web component CSS: `65,517 B / 64 KiB`, leaving `19 B`; Batch 35 adds
  `42 B`.
- Shared neutral runtime: `10,492 B / 8 KiB`, the existing explicit cumulative
  `2,300 B` exception; Collection Grid adds `0 B`.

No ceiling is reset. The total component-CSS ceiling is effectively exhausted;
later work must simplify existing CSS before adding presentation.

## Consequences

- Product collections retain ordinary list and link navigation while adapting
  correctly inside narrow embeds and wide page regions.
- A single semantic API maps to Web, Shopify, framework, native, and Figma
  targets without leaking viewport assumptions or a React state model.
- Studio can demonstrate all bounded wide counts without owning a second render,
  and Shopify becomes a target-ready section adapter.
- Human review still must approve gap, page padding, density, six-column
  readability, collection rhythm, and the inherited Product Card crop/visual
  candidate. Alternate view, live result lifecycle, infinite loading,
  virtualization, and masonry remain explicit future decisions.
