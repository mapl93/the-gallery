# 0340. CLI Canonical CSS Cascade Order

Status: Accepted

Date: 2026-09-09

## Decision

The CLI must union component CSS slices in the canonical order already recorded
by the Web adapter's sources.cssFiles, derived from components/css/index.css.
Component dependency traversal order is not stylesheet cascade order. Unknown
required CSS outputs fail before file writes instead of receiving an arbitrary
position. Tokens remain first and runtime dependency order remains unchanged.

Installing Product Info followed by Product Slider previously encountered
product.css before layout.css. The resulting recommended imports let the later
generic .carousel__track display:flex override .product-slider__track display:grid.
The same issue affected an incremental install and other combined slices.

The correction preserves copied contents, provenance, conflict handling and
copy-and-own ownership. It changes the import recommendation; it cannot reorder
stylesheets already authored in consumer applications automatically.

## Acceptance

Integration tests cover both Product Info/Slider request orders, incremental
installation and add-all. Each emitted CSS list must match the canonical subset,
with layout before product and tokens first. Existing CLI protection tests pass.
Browser evidence must show the same copied Slider as flex under the old order
and grid under the corrected order, with finite scrolling preserved.
