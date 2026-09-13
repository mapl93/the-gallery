# Multicolumn / Gallery Grid visual-value checkpoint

Date: 2026-09-13. Baseline: `72f1567`. ADR 0399.

Twelve public roles preserve existing layout defaults. Native Grid/Masonry and
passive image semantics remain; no new runtime or service. Gallery's focus-color
reference was not consumed by its canonical CSS and is removed from its own
inventory/control, while the global token and target focus obligation remain.

`output/playwright/multicolumn-gallery-values/` holds baseline CSS, harness,
results and screenshots. Cloned Studio markup with docs classes removed, loaded
styles retained, is a CSS comparison fixture rather than a fresh CLI install.
Multicolumn plus both Gallery variants, five widths and two themes give 30 cases
and 530 element comparisons. Defaults preserve geometry, type, spacing and
borders. All three narrow RTL probes report client/scroll widths of 288px.

Actual Studio controls change icon size, item maximum, copy gap, regular crop,
compact columns and Masonry count/width. Masonry keeps natural image proportions;
the gallery fixture has no interactive descendants. Reset and matching Exhibit
controls pass; Multicolumn screenshot inspected. Browser/server resources closed.

Catalogue: 1812 paths / 14496 matrix comparisons. Web/Shopify and
contracts/Studio/docs validate. No hosted data/editor, service behavior, consumer
upgrade, site/dist or maturity promotion is claimed.
