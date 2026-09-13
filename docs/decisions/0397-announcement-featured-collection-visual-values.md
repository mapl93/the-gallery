# ADR 0397: Announcement and Featured Collection Visual Values

Status: Accepted

Date: 2026-09-12

Announcement Bar exposes eleven visual roles for existing padding, relative gaps,
rotation measure/counter, underlines, focus and control hover tint. Shared text
and spacing still drive the composition. Remove its unused public focus-color
reference: link focus intentionally follows currentColor. The global token is
retained for other components. The deprecated Announcement Extended alias still
uses canonical Announcement CSS; it is not a second implementation or token file.

Featured Collection exposes nine roles for header hierarchy, title measure,
carousel card width and Spotlight columns/first-item span. Grid keeps composing
Collection Grid; Carousel keeps composing Carousel. The three Spotlight densities
retain one/three/four columns at the existing 48rem/64rem boundaries. The first
item still spans two columns in medium/wide layouts. Its configurable span is
bounded by the active column count to prevent implicit columns; repeat counts
have CSS's minimum of one and no invented neutral upper ceiling.

Tokens expose existing values without choosing records, ordering, commerce data,
autoplay or target services. Shared Product Card, Link and Countdown/Carousel
ownership remains. Contracts and Studio feed Exhibit; Web/Shopify outputs follow
source. Consumer copies need explicit adoption; no maturity promotion.
