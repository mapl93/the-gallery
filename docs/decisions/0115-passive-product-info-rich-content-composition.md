# 0115. Passive Product Info Rich-Content Composition

Status: Accepted

Partially superseded by ADR 0239 for the accepted product-level versus selected-
variant projection, Shopify Main Product block composition and single target
coordinator. The passive Product Info anatomy and rich-content boundary remain
in force.

Date: 2026-07-14

## Context

Product Info's accepted dependency graph listed Price, but its contract omitted a
Price anatomy part/property while every renderer hardcoded Price markup. The
contract reduced description to a string even though Shopify product descriptions
are target-owned rich HTML. Its canonical metadata CSS was incomplete: the docs
site supplied the visible `dt`/`dd` grid through a Studio-only override, so Exhibit
and Studio did not honestly dogfood the neutral adapter.

The Shopify snippet also absorbed Breadcrumb, Rating, and Product Form despite
the accepted contract declaring only Price. It rendered empty optional wrappers,
used hardcoded English metadata labels, and emitted plaintext product data without
an explicit escaping boundary. Product-wide versus selected-variant Price and
dynamic update announcements remain intentionally open under ADR 0108.

There is no WAI-ARIA APG or Open UI Product Info widget. HTML already supplies
native headings, thematic sections, rich-flow elements, text-direction markup,
and `dl`/`dt`/`dd` association lists. Shopify's theme guidance favors a prominent
title/price, discoverable secondary information, meaningful editor granularity,
and separate target-native product-section blocks.

## Decision

- Product Info is a passive semantic composition. It owns product identity, one
  required canonical Price, an optional semantic rich-description slot, and an
  optional native metadata description list.
- The required identity wrapper groups optional vendor, required title, and
  optional subtitle. The target renders the title at the native heading rank
  required by its page/overlay context; heading rank is not a visual property.
- The required `price` slot maps to Product Info's stable
  `.product-info__price` wrapper and contains one canonical Price dependency.
  Product Info does not duplicate Price formatting or monetary semantics.
- `description` changes from `string` to an optional rich-content `slot`. Targets
  preserve headings, paragraphs, lists, links, emphasis, language, and direction.
  They also own sanitization and allowed-content policy.
- `metadata` remains an optional slot and must use one native `dl` with one or
  more complete, localized `dt`/`dd` groups. Optional wrappers are omitted when
  blank; an empty metadata list is invalid output.
- Product Info has one passive state, one intrinsic size, and no variant. It adds
  no focus, keyboard model, listener, observer, formatter, request, timer,
  animation, controlled state, or live region.
- Intrinsic grid/wrapping responds to available component width. Metadata source
  and reading order do not change across viewport or container sizes.
- Public API is `title`, `vendor`, `subtitle`, required `price`, optional
  `description`, and optional `metadata`. Internal sub-gaps, rich-content flow,
  metadata columns, uppercase vendor tracking, and subtitle italics remain
  private visual composition.
- Breadcrumb, Rating, Variant Selector, Product Form, inventory, fulfillment,
  apps, legal copy, structured data, and purchasing actions remain siblings owned
  by a product-page or quick-view compositor.
- The target owns product-wide versus selected-variant Price, synchronized Price/
  SKU/inventory/availability/URL updates, and at most one deliberate localized
  update-announcement region. Passive Product Info and Price do not announce
  independently.
- Shopify escapes plaintext identity and scalar metafield values, preserves the
  platform's trusted rich `product.description`, localizes metadata labels,
  composes the canonical Price snippet, and moves adjacent components to the Main
  Product section.
- Exhibit and Studio continue to use the same ProductStudio renderer and fixture.
  ProductStudio now consumes one shared `PriceArtwork` implementation also used by
  PriceStudio. Site-only Product Info visual overrides are removed.
- The contract remains `pilot`. Automated/browser evidence does not approve the
  visual candidate or promote it to `stable`.

## Performance

Product Info adds `0 B` of neutral runtime and no asset/network work. Deterministic
level-9 gzip after the refinement measures:

- Product CSS: `5,319 B` against the provisional `5.2 KiB` ceiling, leaving `5 B`.
- Neutral Web component CSS: `65,338 B` against the `64 KiB` ceiling, leaving
  `198 B`.
- Shared neutral runtime: `10,501 B`; Product Info adds no runtime code, and the
  cumulative bundle remains covered by the existing explicit `2,309 B` exception
  over its `8 KiB` ceiling.

Relative to the recorded Batch 29 baseline, Product CSS adds `269 B` and complete
Web component CSS adds `408 B`. The Product Info CSS delta pays for
honest identity grouping, rich-flow semantics, intrinsic metadata layout,
overflow resilience, and removal of site-only implementation styling. These
ceilings now have very little remaining headroom and must not be silently reset.

## Consequences

- Neutral Web, Shopify, future framework adapters, and native targets share a
  portable content boundary without making React, Liquid, CMS HTML, or commerce
  state the source language.
- Product Info's declared dependency, actual renderer, and Shopify composition
  now agree. Adjacent components can evolve independently.
- CMS targets may render semantically rich descriptions, but each target must
  define trust/sanitization and supported content.
- Product pages and quick views must choose one variant data/update coordinator
  and one announcement policy. This ADR deliberately does not make that product
  or architecture decision.
- The repository candidate still requires explicit owner review for identity
  hierarchy, type, spacing, vendor treatment, subtitle treatment, metadata
  density, and rich-description styling. The registered Figma reference is a
  generic Studio/Button frame, not Product Info artwork.
