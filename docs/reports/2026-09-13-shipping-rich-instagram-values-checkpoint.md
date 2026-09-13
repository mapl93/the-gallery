# Shipping / Rich Text / Instagram visual-value checkpoint

Date: 2026-09-13. Baseline: `73b0e79`. ADR 0403.

Twenty public roles expose existing visual values without changing the current
UI family used by the bounded Rich Text Section or its document semantics.

`output/playwright/shipping-rich-instagram-values/` contains before CSS, harness,
results and screenshots. Comparison fixtures clone actual Studio markup, strip
docs classes and retain styles; they are not fresh CLI installs. Three components,
five widths and two themes yield 30 cases / 770 element comparisons. Geometry,
spacing, type and borders retain defaults; all narrow RTL roots report matching
288px client/scroll widths.

Actual Studio verifies Shipping max width, gap and icon size; Rich Text em-based
body gap, independent quote/list insets and rule width; Instagram crop and
text-relative media/caption gap. Reset and matching Exhibit controls pass. Rich
Text screenshot inspected. Browser/server resources closed.

Catalogue: 1882 paths / 15056 comparisons. Web/Shopify and docs/contracts/Studio
validate. No provider authentication, shipping policy, external publishing,
hosted editor, arbitrary-brand contrast certification, site/dist or promotion.
