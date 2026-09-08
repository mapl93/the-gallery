# 0276. Product Card Hierarchy, Description, And Quick Look

Status: Accepted

Date: 2026-08-12

## Context

The human review of Product Card found that artist, piece name, descriptor,
price, and Quick Add were presented with insufficient hierarchy. The title used
the editorial heading family, the short subtitle did not demonstrate realistic
catalog copy, Quick Add implied a direct cart mutation, and the inherited Card
hover lifted the whole surface and increased its shadow.

## Decision

- Artist/vendor and piece title form the closest text pair. Description, Price,
  and action use larger, separate spacing tiers.
- `subtitle` becomes `description`. The complete target-authored string remains
  in DOM content while canonical CSS visually clamps it to two lines with an
  automatic ellipsis.
- Product Card uses the UI body family. Serif remains outside this catalog UI
  surface and is reserved for explicitly editorial/article composition under
  ADR 0277.
- `quickAddAction` becomes `quickLookAction`. Its visible label is Quick Look,
  it is persistently available instead of hover-revealed, and its accessible
  name includes the product context when cards repeat.
- Quick Look requests a coherent target-owned Quick View. Product Card performs
  no cart mutation; Quick View may compose Product Form and offer add-to-cart.
- Product Card keeps the canonical Card resting surface but suppresses Card's
  hover translation and shadow growth. Optional image replacement and subtle
  image scale remain media behavior, not whole-card elevation.
- Exhibit and Studio continue to share `ProductCardArtwork`, fixture data, and
  canonical CSS. Shopify maps the same description and Quick Look hook.

## Consequences

- The Product Card contract advances to `0.4.0` but remains `pilot` until the
  owner explicitly approves the revised live result.
- Quick View coordination remains target-owned and introduces no neutral
  Product Card runtime or dependency-order inversion.
- Existing Product Card compositions migrate from `.product-card__subtitle` to
  `.product-card__description` and from `.product-card__quick-add` to
  `.product-card__quick-look`.

