# 0360. Firing Schedule Constant Axis Type

Status: Accepted

Date: 2026-09-12

Owner decision: option A, keep axis typography at its token-defined size.

## Decision

The shared Web enhancer compensates the SVG viewport scale through private
`--_firing-axis-scale`; CSS continues to own typography through the existing
caption token. The factor is measured geometry, not another public design token.
It does not cancel browser zoom. Native chart coordinates, paths, observed-point
radius and the normalized Celsius/seconds model remain unchanged.

Fixed-size labels can collide inside the former fixed SVG insets, especially
with larger type or Fahrenheit labels. The enhancer measures actual glyph bounds
at their existing anchors and derives the minimum uniform viewport scale that
keeps labels inside the SVG and separated in at least one axis. The new public
`--space-firing-axis-label-gap` aliases system dimension.4 and defaults to 4px.
Its CSS `column-gap` value supplies the resolved length to the enhancer; native
SVG does not itself position these labels using CSS gap. Contract, registry,
Studio and Exhibit expose it, expanding the profile from 39 to 40 values.

The measured minimum participates alongside the existing author chart minimum
and available width. A narrow host therefore keeps the existing named horizontal
scroll area instead of shrinking its typography. One CSS pixel of numerical
reserve/hysteresis prevents quantized glyph bounds from alternating the viewport
between adjacent widths; this is internal rounding, not a design-system scale.

One ResizeObserver per plot tracks its viewport and axis glyph group. A scoped
attribute observer tracks host style/theme changes and SVG projection attributes;
both are disconnected on removal or explicit disposal. No polling is added.
The selective module is included by the Web CLI for `firing-info`; the shared
compatibility runtime and generated Shopify runtime also include the behavior.
Studio and shadow-root previews use the same enhance/destroy API.

Copy-and-own consumers adopt CSS, tokens and the runtime together. Targets that
change styles through CSSOM can explicitly call `enhanceFiringSchedules(root)`
to refresh measurements. Without the enhancer/ResizeObserver, the informative
native SVG and equivalent table remain; axis text uses native SVG scaling.
This resolves the pending choice in ADR 0359. The component remains pilot and
Shopify record/schema/editor delivery remains pending under ADR 0271.

## Evidence and references

See `docs/reports/2026-09-12-firing-axis-type-checkpoint.md` for resizing, token
changes, label separation, lifecycle, CLI and adapter checks.

The implementation uses the browser's [SVG viewport transformation matrix](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getCTM)
and [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
This is scoped to the existing uniformly scaled native Firing Schedule SVG;
it is not a general chart-layout or arbitrary-transform engine.
