# Review Form / Toolbar visual-value checkpoint

Date: 2026-09-13. Baseline: `1830ce6`. ADR 0407.

Six public roles expose the remaining composition measures. Cloned Studio fixtures
with retained styles and removed docs classes test two components, five widths and
two themes: 20 cases / 1080 element comparisons. Initial token-only comparison
preserved all geometry/type/borders. The final Toolbar intentionally changes vertical
placement and overall height to align controls and remove duplicate Select margin;
final parity checks exclude Toolbar Y/height and preserve other measured properties.
Narrow RTL roots remain 288px client/scroll. Fixtures are not fresh CLI installs.

Actual Studio verifies Form width and local-only submission feedback; Toolbar gap,
padding, rule and enhanced Select synchronization, local write action, Reset and
Exhibit controls. Final Select/Button both measure y=192px, height=46px, bottom=238px.
Toolbar screenshot inspected. The harness was updated to use Select's enhanced
button/listbox interface, and the first alignment pass exposed inherited trailing
margin, corrected before final verification. Evidence resides in
`output/playwright/review-controls-values/`. All test resources closed.

Catalogue: 1983 paths / 15864 comparisons. Web/Shopify, docs/contracts/Studio and
certification inventories pass. No provider submission, authentication, hosted
Shopify certification, stable promotion or site/dist rebuild. Reviews' active
source visual-value pass is covered; deprecated Star Rating and compositional
Review Pagination reuse existing canonical families. Studio-specific presentation
rules still require a final fidelity sweep, particularly narrow Review Form/
Toolbar overrides; source coverage does not imply that sweep is complete.
