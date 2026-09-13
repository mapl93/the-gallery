# Navigation overlay visual-value checkpoint

Date: 2026-09-12. Baseline: `271c158`. ADR 0395.

Mobile Menu, Search Overlay and Cart Drawer gain 29 public visual roles while
retaining defaults. Search Studio's fixed padding and title line height were
preventing canonical token changes from appearing; their overrides are removed
or tied to the canonical token. Preview positioning/height containment remains.

## Evidence

`output/playwright/navigation-values/` contains baseline CSS, harness, result and
screenshots. The neutral CSS fixture clones real Studio markup, strips docs-only
classes and retains loaded styles; it is not a new CLI consumer installation.
Five widths (320/600/900/1200/1800), two themes and three components yield 30 cases
and 620 element comparisons for geometry, padding, gaps, borders and type. Narrow
RTL fixtures have matching client/scroll widths: 288/288, 320/320 and 288/288.

Actual Studio edits verify menu padding/separators, Search panel/field padding,
image size and viewport inset, and Cart summary gaps/weight. The narrow Search
panel follows half its shared 24px spacing basis (12px). The first harness wrongly
assumed that basis was 16px; the corrected test resolves the live basis instead.
Menu Escape returns focus to its trigger; Search query editing and Escape work.
Reset and shared Exhibit controls were exercised. Search screenshot inspected.

Catalogue validation covers 1706 paths / 13648 comparisons across eight matrices.
Web/Shopify adapters and docs/contracts/Studio validations pass. Browser and
server resources were closed after both evidence attempts. No production search,
cart service, Shopify editor, distribution upgrade, site/dist or maturity change.
