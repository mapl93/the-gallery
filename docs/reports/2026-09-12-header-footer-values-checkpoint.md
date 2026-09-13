# Header and Footer visual-value checkpoint

Date: 2026-09-12. Baseline: `183959b`. ADR 0394.

Thirty public component roles replace existing authored literals or expose
independent composition values. Shared spacing stays live; component values
retain their prior appearance. Footer's responsive column arrangement is now
editable without adding a source-unit extension or renderer-only grid formula.

## Evidence

`output/playwright/header-footer-values/` retains before CSS, harness/results
and inspected Header/Footer screenshots. The CSS fixture clones actual Studio
markup, removes fixture-only classes and retains loaded styles. It is not a
fresh CLI consumer installation.

Five widths (320/600/900/1200/1800) and both themes preserve geometry, padding,
gaps, borders and typography. The comparison allows 0.03125px geometric rounding
between equivalent fractional-grid formulas; strings and element counts match.
The first harness compared SVG class objects by identity; its corrected capture
uses class attributes. No source fix was needed for that test error.

Footer's configured two secondary tracks plus a 0.5 first-track share produce
three tracks with the expected width. Its compact count independently changes to
two. Actual Studio edits verify heading gap, bottom margin, compact columns,
Header badge size/type/outward offset and action gap, followed by Reset. Exhibit
exposes the same controls. Both screenshots were inspected.

A narrow RTL probe records the fixture's available versus overflowing widths.
The full Header action fixture is target data, and this check does not resolve
which actions a consumer keeps on mobile. Header action priority, navigation
services and production footer records remain the documented target boundary.

Generated Web/Shopify, source catalogue and docs/contracts/Studio validate. No
hosted navigation, store service, publication, site/dist or maturity promotion.
All browser/server resources were cleaned after failures and final success.
