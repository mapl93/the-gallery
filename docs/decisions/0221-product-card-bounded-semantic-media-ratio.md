# ADR 0221: Product Card Bounded Semantic Media Ratio

- Status: Accepted
- Date: 2026-07-20
- Related: ADR 0090, ADR 0220,
  `docs/refinement/owner-decision-responses.md`

## Context

ADR 0090 reconciled Product Card composition and navigation but deliberately
left its media proportion for owner review. A single hardcoded crop cannot serve
both artwork-led square catalogs and portrait product photography, while an
arbitrary numeric ratio would fragment rows across grids, sliders,
recommendations and saved-product surfaces.

The owner selected the bounded `D1-A` direction: square and portrait, with
square as the default.

## Decision

- Product Card exposes `mediaRatio: square | portrait`; the property defaults to
  `square`.
- `square` maps to 1:1. `portrait` maps to the existing Gallery portrait
  proportion of 3:4, consistent with the canonical `.aspect-portrait` utility.
- The Web mapping is `data-media-ratio` on the Product Card root. CSS owns the
  numeric composition through a private custom property.
- A composed product list uses one ratio consistently for all of its canonical
  Product Cards. Shopify collection, featured-collection and recommendation
  sections expose the same bounded choice and pass it to the shared snippet.
- Image sources, focal point, missing-media fallback, responsive delivery and
  loading priority remain target-owned. This decision adds no Web URL, Shopify
  image object or arbitrary ratio to neutral source.

## Consequences

- Contract and Studio expose a small semantic choice instead of an internal
  crop value.
- Exhibit and Studio continue to render the same Product Card artwork; Studio
  changes the real root attribute rather than applying a preview-only style.
- Existing consumers remain square when the property is omitted.
- This is implementation authorization, not final visual approval or promotion
  to `stable`.
