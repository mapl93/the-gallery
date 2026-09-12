# 0359. Firing Schedule Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

ADR 0293 exposes eighteen additional visual roles for Firing Schedule: chart and
table minimum widths; outer/header/chart/legend spacing factors; legend length;
series, grid, chart and header thickness; focus width/offset; planned dash length
and gap; and single observed-point radius. The public profile contains 39 values.
Thicknesses and point radius alias existing system dimensions; spacing factors
retain the shared element gap. Contract, registry and Studio expose these values;
Exhibit derives its reference from the same metadata.

SVG projection insets and data-derived coordinates remain renderer geometry.
The new radius property preserves the native circle's existing SVG coordinate
scaling and its radius attribute fallback. Grid/series retain non-scaling strokes.
This distinction follows SVG's [circle geometry](https://www.w3.org/TR/SVG2/shapes.html#CircleElement)
and [vector effects](https://www.w3.org/TR/SVG2/coords.html#VectorEffects).
Forced-color boundaries and series distinctions remain accessibility overrides.

The normalized program, observations, native chart and canonical Data Table
composition from ADR 0271 remain unchanged. No runtime or semantic property is
added. The internal `firing-info` migration slug is retained; ADR 0271's removal
before public contract freeze remains pending. Both target CSS outputs are
regenerated, with explicit copy-and-own adoption and pilot maturity retained.

Axis text currently scales with the SVG. Whether it should instead retain the
token's on-screen size is a separate pending owner choice; this checkpoint
preserves the baseline and does not claim to resolve that typography decision.

## Evidence

See `docs/reports/2026-09-12-firing-schedule-checkpoint.md` for 536 default
comparisons, independent controls, native series/unit behavior and cleanup.
