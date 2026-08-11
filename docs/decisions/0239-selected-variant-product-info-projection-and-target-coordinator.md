# 0239. Selected-Variant Product Info Projection And Target Coordinator

Status: Accepted

Date: 2026-07-20

## Context

ADR 0115 established Product Info as a passive composition of product identity,
canonical Price, rich description and native metadata. It deliberately left
product-wide versus selected-variant pricing and update coordination open. The
owner selected D3-A: one product-page or Quick View coordinator owns the
selected-variant projection while Product Info remains state-free.

The platform evidence supports this boundary:

- Shopify's [variant guidance](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants)
  requires selected variant media and Price to update together, supports direct
  `variant` and granular `option_values` URLs, and documents an unresolved
  combination as a null selected variant.
- The Shopify [product object](https://shopify.dev/docs/api/liquid/objects/product)
  exposes `selected_variant`, `selected_or_first_available_variant`,
  `price_min`, `price_max`, and `price_varies` as distinct product/selection
  facts.
- Shopify [sections](https://shopify.dev/docs/storefronts/themes/architecture/sections)
  and [blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks)
  support merchant-reorderable section blocks, app blocks and targeted section
  re-rendering.
- Shopify's [high-variant guidance](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants/support-high-variant-products)
  warns themes not to depend on serializing the full variant catalogue and
  favors contextual option-value selection.

There is still no APG or Open UI Product Info widget. Native headings, rich-flow
content and `dl`/`dt`/`dd` remain the correct semantic base.

## Decision

- Product Info remains passive. It does not resolve product/variant state,
  listen for option changes, fetch a section, update the URL, produce structured
  data or own a live region.
- Before a variant resolves, Product Info may receive a target-formatted product
  Price range and truthful product-level metadata only. Variant-only SKU,
  inventory and availability are omitted.
- After resolution, Product Info receives the exact selected variant Price, SKU,
  inventory and availability. `data-product-info-projection="product|variant"`
  records the target mapping for diagnostics and tests; it is not a configurable
  neutral property.
- One page or Quick View coordinator atomically synchronizes Product Gallery,
  Product Info, Variant Selector, Product Form, URL, structured data and at most
  one localized update status.
- Canonical Price accepts already formatted range content in neutral targets.
  Shopify's Price snippet renders `price_min` through `price_max` when no exact
  variant is supplied and exact variant Price/compare-at/unit values when it is.
- Shopify Main Product uses merchant-reorderable section blocks for Breadcrumb,
  Product Info, Rating, Product Form and Certificate, and accepts app blocks.
  These editor blocks remain target composition and do not become Product Info
  properties.
- The Shopify coordinator uses granular `option_values` plus the Section
  Rendering API. It replaces one bounded product-render region, updates the
  visible URL to an exact `variant` when resolved or retains `option_values` for
  an unavailable combination, restores option focus and writes one stable status.
  It does not serialize every variant to client JavaScript.
- Rich description remains target-sanitized platform content. Sanitizer and
  allowed embeds are adapter security policy, not neutral properties.
- Product Info stays `pilot`; automated and target validation do not authorize
  `stable` without human review.

## Public API Boundary

The neutral properties remain `title`, optional `vendor`, optional `subtitle`,
required canonical `price`, optional rich `description`, and optional native
`metadata`. Selected variant id, product range, option-value ids, update status,
URL, structured data, fetch/pending/error state and editor block order are target
data or composition.

## Performance

Product Info CSS and React presentation add no runtime. The accepted Shopify
coordinator extends the existing shared target runtime with one delegated change
listener per mounted product surface, at most one in-flight section request,
AbortController cancellation, bounded DOM replacement and complete disconnect
cleanup. It adds no polling, timer, observer, variant catalogue, player, asset,
cookie, storage or analytics work. Exact gzip belongs in the batch audit and any
shared-runtime overage remains explicit evidence rather than a raised ceiling.

## Consequences

- Product range and exact selected-variant content cannot be mixed into a false
  presentation.
- Product Info and Price do not create duplicate announcements; the target owns
  one stable status for the atomic product update.
- Shopify deep links, granular unavailable combinations, media, form values and
  structured data share the same server-rendered source facts.
- Merchant/editor flexibility exists at the Shopify target without making block
  order, app blocks or Liquid the source language.
- Final identity hierarchy, typography, spacing, metadata density and rich-
  content visuals still require explicit human approval.
