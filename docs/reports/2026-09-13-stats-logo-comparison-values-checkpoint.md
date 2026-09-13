# Stats / Logo Bar / Comparison visual-value checkpoint

Date: 2026-09-13. Baseline: `86de459`. ADR 0402.

Twenty-two source roles expose current section geometry and visual values.
Logo-box configuration remains separate from each brand asset's drawing.

`output/playwright/stats-logo-comparison-values/` includes before CSS, harness,
results and screenshots. Neutral fixtures clone actual Studio markup, strip docs
classes and retain styles; they are not fresh CLI installs. Stats, Static/Marquee
Logo Bar and Comparison, five widths and two themes give 40 cases / 1710 element
comparisons. Transitions/animations are disabled for static CSS geometry readings.
All defaults match; narrow RTL roots report matching 288px client/scroll widths.

Actual Studio tests measure/spacing controls, fixed logo height/width bounds and
independent comparison feature/alternative column minima. Real Marquee retains
one inert visual copy, pauses on command and Reset removes the copy by returning
to Static. Reset/shared Exhibit controls pass. Logo screenshot inspected.

Catalogue: 1862 paths / 14896 comparisons. Web/Shopify and docs/contracts/Studio
validate. Browser/server resources closed. No production metrics, comparison
claims, logos, hosted editor, full motion certification, site/dist or promotion.
