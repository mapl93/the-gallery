# Lookbook / Video Section visual-value checkpoint

Date: 2026-09-13. Baseline: `5a55920`. ADR 0400.

Sixteen roles expose existing values. Lookbook caption foreground and background
remain paired across themes; Video Section remains passive media containment.

`output/playwright/lookbook-video-values/` contains before CSS, harness/results
and screenshots. CSS comparison fixtures clone real Studio markup, remove docs
classes and keep loaded styles; they are not fresh CLI installations. Lookbook
and both Video variants, five widths and two themes give 30 cases / 390 element
comparisons with unchanged geometry, spacing, type and borders. All narrow RTL
roots have client/scroll widths of 288px.

Actual Studio records white caption text on a dark 0.6 surface in Light and dark
text on a light 0.6 surface in Dark. Grid gap, caption padding and tall span edits
work. A requested wide span of five inside a one-column layout resolves to one
without implicit columns. Video ratio/full-width radius, Reset and shared Exhibit
controls pass. Lookbook screenshot inspected; test resources fully closed.

Catalogue: 1828 paths / 14624 matrix comparisons. Web/Shopify and docs/contracts/
Studio validate. No arbitrary-media contrast certification, hosted editor,
interactive target hotspot, player verification, site/dist or maturity promotion.
