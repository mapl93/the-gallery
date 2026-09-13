# Mega Menu and Bottom Nav visual-value checkpoint

Date: 2026-09-12. Baseline: `58fa8f0`. ADR 0396.

The two components expose 59 visual roles and retain current defaults. Their
private composition variables still connect public tokens to canonical CSS.
No new source units, platforms, responsive thresholds or primitive entries.

## Evidence

`output/playwright/mega-bottom-values/` contains baseline CSS, harness/results and
inspected screenshots. Neutral fixtures clone real Studio markup and remove
fixture classes while retaining loaded styles. Mega Menu is placed at the same
inline top inset for both CSS captures. The initial harness let old CSS override
its probe position; the corrected harness preserves identical positioning. This
is not a fresh CLI consumer installation.

Five widths (320/600/900/1200/1800), two themes and two components yield 20 cases
and 780 element comparisons for geometry, padding, gaps, type and borders. Bottom
Nav retains its wide viewport hiding rule in this fixture. Both 320px RTL roots
report clientWidth and scrollWidth of 320px.

Actual Studio controls change promo padding/aspect ratio, heading weight and grid
gap. A 368px-wide Mega Menu uses two columns after editing its compact-count
token. Escape closes the menu and returns focus to its trigger. Bottom Nav edits
change icon size, item gap and badge geometry, including matching line height.
Reset and shared Exhibit controls work. Both screenshots were inspected.

Catalogue validation: 1765 paths / 14120 comparisons across eight matrices.
Generated Web/Shopify and docs/contracts/Studio validate. All test browser/server
resources closed after failure and success. No production navigation, hosted
Shopify editor, site/dist, consumer-copy upgrade or maturity promotion.
