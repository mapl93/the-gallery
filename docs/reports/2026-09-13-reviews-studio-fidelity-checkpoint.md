# Reviews Studio fidelity checkpoint

Date: 2026-09-13. Baseline: `e056ad2`. ADR 0410.

Removed Studio overrides that masked Star Input and File Upload public sizes,
advanced Toolbar stacking, duplicated canonical resets or hid empty status only
in the sample. Native legend padding is reset in the canonical source.

Actual Studio checks at 320/390/800/1800px: Star Input keeps 44px labels and the
edited 36px stars, zero legend padding and no internal overflow. File Upload
receives edited compact 12/14px padding at 320px and standard 28/24px at the other
widths. A 500px Toolbar stays in the canonical row with Select/Button at y=192px,
height=46px. Screenshot inspected. Evidence is in
`output/playwright/reviews-studio-fidelity/`; owned browser/server closed.

This is a focused Reviews fidelity correction, not a claim that every possible
Studio composition or override across the entire site was browser-certified.
Web/Shopify and docs/contracts/Studio validate; no runtime, target lifecycle,
site/dist, deployment, release or stable promotion.
