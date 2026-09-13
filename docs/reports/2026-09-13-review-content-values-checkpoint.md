# Review content visual-value checkpoint

Date: 2026-09-13. Baseline: `ee93c2b`. ADR 0406.

38 public roles expose existing presentation values across Review, Review Highlights
and Photo Reviews. Cloned Studio fixtures (retained styles, removed docs classes;
not fresh CLI installs) preserve default geometry/type/borders in 30 cases / 640
element comparisons across five widths and two themes. Narrow RTL roots all report
288px client/scroll widths.

Actual Studio verifies avatar/photo sizes, independent reply/action gaps and reply
padding, local Helpful state, tag padding/count gap, photo crop/gap, Reset and
Exhibit controls. Passive photo/tag fixtures have no native actions. A temporary
browser-only native Photo Reviews button tests existing optional hover scale and
reduced-motion removal; it is not a new canonical fixture or provider implementation.
Review screenshot inspected. Evidence: `output/playwright/review-content-values/`.
Resources closed. The public-reference validator caught an initial actions/reply
binding error before browser work; it was corrected and the independence tested.

Web/Shopify generation, source catalogue, docs/contracts/Studio and audit inventories
pass. No authentication, review-provider writes, hosted Shopify certification,
arbitrary-brand contrast claim, site/dist rebuild or stable promotion.
