# ADR 0402: Stats, Logo Bar and Comparison Visual Values

Status: Accepted

Date: 2026-09-13

Stats exposes three section measure/inset values. Logo Bar exposes ten roles for
mark/slot bounds, container shares and label tracking. Slot defaults alias the
matching canonical mark-width roles, avoiding repeated literals while allowing
independent customization. Internal SVG fixture drawing (strokes, glyph size and
wordmark tracking) remains asset-owned, not public logo-box API. Supplied brand
assets need not contain those sample classes.

Comparison Table exposes nine roles for section/table/cell minimum measures,
insets, highlighted surface opacity, alternative-header spacing and success
color share. It still composes Data Table and existing native choices. Minimum
widths participate in native table sizing; they are not exact column widths.

All existing values and shared semantic inputs remain. Logo Bar's canonical
Marquee controls copy/pause/distance recalculation. Stats values, comparison
claims/selections, destinations and brands remain target data. Contracts/Studio
feed Exhibit, and Web/Shopify are regenerated without target certification or
implicit consumer updates.
