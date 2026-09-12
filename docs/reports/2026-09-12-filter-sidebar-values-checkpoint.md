# Filter Bar / Blog Sidebar visual values checkpoint

Date: 2026-09-12. Baseline: `0f8272c`. Decision: ADR 0378.

13 roles, public inventories 17/26. Five viewports, two themes and Filter
Single/Multiple plus Sidebar give 30 cases, 510 element comparisons.
Geometry, typography, color, padding, borders and radii match before except the
explicit Multiple legend correction: 0px to 4px; Single stays 4px. Both modes
respond to the same public Input label gap, also measured at 10/12px overrides.

Independent option padding/gap/border, canonical multiple/disabled controls,
200px RTL containment, topic padding, separate heading/list rules and terminal
row omission pass. Topic Enter preserves native fragments. Studio verifies
selection-to-query and Back restoration, token edits/reset; both Exhibit
catalogues pass. Final 300px Sidebar RTL screenshot inspected.

Ignored `output/playwright/filter-sidebar-values/` holds a fresh CLI consumer,
before CSS, fixture, harness, results and screenshot. One headless browser/tab/
server, final cleanup/process scan clean and temporary public fixture removed.
Docs/source/catalogue and generated Web/Shopify adapter validation pass. No live
Shopify publication, provider request, message, certification or stable promotion.
