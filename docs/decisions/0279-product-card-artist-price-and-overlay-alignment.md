# 0279. Product Card Artist, Price, And Overlay Alignment

Status: Accepted

Date: 2026-08-12

## Context

During continued live Product Card review, the owner identified three remaining
composition issues: artist/vendor content could be edited but not explicitly
hidden without deleting it; Price was controlled through the optional Footer
slot and could disappear; and the compact Quick Look overlay did not share the
content column's start alignment.

## Decision

- `showVendor` is an optional boolean property that defaults to `true`. It
  controls presentation of the optional artist/vendor line without erasing its
  target-owned text value.
- Studio exposes `Show artist` separately from `Artist name`; hiding the line
  preserves the entered fixture value for reversible inspection.
- Canonical Price moves to the required `.product-card__price` composition and
  is always rendered. It is independent from `.product-card__footer`.
- The optional footer may contain an explicitly composed secondary action only;
  it never owns, replaces, or hides Price.
- Quick Look uses the same logical inline-start spacing token as the Product
  Card text and Price columns. This alignment works in both left-to-right and
  right-to-left directions.
- Exhibit, Studio, canonical MDX examples, neutral Web, Shopify, and composed
  Product Card consumers use the same Price and optional-footer anatomy.

## Consequences

- The Product Card contract advances to `0.6.0` and remains `pilot` pending the
  owner's explicit final visual approval.
- Shopify's Product Card snippet accepts optional `show_vendor`; omission keeps
  artist/vendor content visible, preserving existing callers.
- Required Price remains a canonical Price dependency and does not introduce a
  raw numeric formatting API on Product Card.
