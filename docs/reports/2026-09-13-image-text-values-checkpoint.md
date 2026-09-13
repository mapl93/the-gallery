# Image with Text visual-value checkpoint

Date: 2026-09-13. Baseline: `baab07d`. ADR 0398.

Owner A is implemented: white Overlay text over the existing black gradient in
Light and Dark. Fifteen public source roles expose the current palette/layout
values. Standalone content and Button remain independently styled.

`output/playwright/image-text-values/` retains baseline CSS, harness/results and
an inspected Dark screenshot. Five variants, five widths (320/600/900/1200/1800)
and two themes yield 50 cases and 500 element comparisons. Neutral fixtures clone
real Studio markup, remove docs classes and retain loaded styles; they are not
new CLI installations. Geometry, spacing, borders and typography are preserved.
All five narrow RTL roots have client/scroll widths of 288px.

Actual Studio verifies white titles in both themes, a yellow on-media override
that leaves the Button's final foreground unchanged, editable overlay minimum
height/content gap, Reset, and matching Exhibit controls. Forced colors replaces
the scrim with Canvas and text with CanvasText. An initial independence test
sampled Button mid-transition after a theme change; the final steady-color
comparison disables transitions and aligns the document/preview theme. No Button
or runtime patch was required. All browser/server resources closed after tests.

Catalogue: 1800 paths / 14400 comparisons. Generated Web/Shopify and
contracts/Studio/docs validate. No hosted Shopify, external data, new consumer
installation, arbitrary brand/media accessibility certification or maturity change.
