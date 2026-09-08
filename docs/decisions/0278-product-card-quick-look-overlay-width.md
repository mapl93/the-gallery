# 0278. Product Card Quick Look Overlay And Width

Status: Accepted

Date: 2026-08-12

## Context

After reviewing the first ADR 0276 implementation live, the owner preferred the
earlier placement of the Product Card action over the product image. The new
intrinsic-width Quick Look Button was preferred to the earlier fill-width
treatment.

## Decision

- Quick Look is an optional Button composition inside
  `.product-card__media`, positioned at the lower start edge of the image.
- The Button keeps its intrinsic content width and may shrink within the media;
  Product Card does not apply a fill-width Button modifier.
- On fine pointers, the overlay is revealed by card hover or focus-within. It
  remains visible by default for coarse pointers and no-hover input so the
  action is not hover-dependent.
- Visibility is a component state, not a variant. It does not change the
  `quickLookAction` property or add a new root variant.
- Quick Look still requests the target-owned Quick View and performs no cart
  mutation from Product Card.
- Exhibit, Studio, canonical MDX examples, neutral Web output, and Shopify use
  the same media-contained anatomy and canonical CSS.

## Consequences

- This decision supersedes only the persistent below-content placement implied
  by ADR 0276. ADR 0276 continues to own the Quick Look naming and target-owned
  Quick View boundary.
- The Product Card contract advances to `0.5.0` and remains `pilot` until the
  owner explicitly approves the live component as stable.
- Reduced motion removes the overlay transition while preserving its final
  visible or hidden state for the active input mode.
