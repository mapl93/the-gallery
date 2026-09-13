# Brand Story / FAQ / Contact visual-value checkpoint

Date: 2026-09-13. Baseline: `c218ee2`. ADR 0401.

Twelve source roles expose current measures and focus values. Brand Story gains
an optional site-only illustrative SVG signature fixture to make its graphic
bounds verifiable. It defaults to the previous text and uses shared Checkbox.

`output/playwright/brand-faq-contact-values/` retains before CSS, harness/results
and screenshots. Neutral CSS fixtures clone actual Studio markup, strip docs
classes and retain loaded styles, rather than installing a fresh CLI consumer.
Three components, five widths and two themes yield 30 cases / 700 element
comparisons with unchanged geometry, type, spacing and borders. Narrow RTL
client/scroll widths match at 288px for all three.

Actual Studio edits cap the sample graphic at 128px wide/16px high, producing
66.59×15.98px while preserving its aspect ratio; Reset removes the graphic fixture.
FAQ measure/gap controls and Accordion close/reopen work. Contact maximum measure,
column threshold and native detail-link focus width respond. Reset and matching
Exhibit controls pass. Signature screenshot inspected; all test resources closed.

Catalogue: 1840 paths / 14720 comparisons. Web/Shopify, docs/contracts/Studio and
site TypeScript pass. No contact submission, remote service, real signature asset,
Shopify hosted editor, site/dist or maturity promotion is claimed.
