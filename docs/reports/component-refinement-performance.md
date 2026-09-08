# Component Refinement Performance Audit

Generated from `docs/refinement/performance-budgets.json` using
`gzip-level-9`. A gap is not an implicit budget increase; the fixed
v1.0.0 release gates apply to dependency-closed install slices and modular
runtime outputs. Complete aggregate bundles remain visible as diagnostic
compatibility measurements and do not redefine what a consumer installs.

## Summary

| Metric | Count |
| --- | ---: |
| Surfaces | 21 |
| Passing | 18 |
| Gaps | 1 |
| Documented gaps | 1 |
| Undocumented gaps | 0 |
| Global gaps | 0 |
| Family gaps | 0 |
| Install-family gaps | 1 |
| Diagnostic overages | 2 |

## Current Measurements

| Surface | Kind | Enforcement | Worst component/module | Gzip bytes | Ceiling | Headroom / overage | Result | Gap evidence |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
| Complete neutral component CSS compatibility bundle | global | diagnostic | — | 73144 | 65536 | -7608 | diagnostic-overage | `docs/decisions/0273-modular-copy-and-own-performance-architecture.md` |
| Complete progressive-enhancement compatibility runtime | global | diagnostic | — | 22822 | 8192 | -14630 | diagnostic-overage | `docs/decisions/0273-modular-copy-and-own-performance-architecture.md` |
| Neutral web token target | global | required | — | 53118 | 65536 | 12418 | pass | — |
| Selective runtime loader | runtime | required | — | 765 | 2048 | 1283 | pass | — |
| Shared modular runtime core | runtime | required | — | 715 | 2048 | 1333 | pass | — |
| Largest individual progressive-enhancement module | runtime-module-set | required | date-picker | 3396 | 5120 | 1724 | pass | — |
| Largest dependency-closed Primitives install slice | install-family | required | select | 18343 | 20480 | 2137 | pass | — |
| Largest dependency-closed Layout install slice | install-family | required | modal | 21069 | 23552 | 2483 | pass | — |
| Largest dependency-closed Forms install slice | install-family | required | date-picker | 28117 | 30720 | 2603 | pass | — |
| Largest dependency-closed Global install slice | install-family | required | announcement-bar | 34915 | 38912 | 3997 | pass | — |
| Largest dependency-closed Product install slice | install-family | required | size-chart | 35012 | 38912 | 3900 | pass | — |
| Largest dependency-closed Collection install slice | install-family | required | collection-grid | 27452 | 30720 | 3268 | pass | — |
| Largest dependency-closed Storytelling install slice | install-family | required | artist-card | 25072 | 21504 | -3568 | gap | `docs/reports/artist-card-web-refinement-audit.md` |
| Largest dependency-closed Marketing install slice | install-family | required | announcement-extended | 34915 | 38912 | 3997 | pass | — |
| Largest dependency-closed Cart install slice | install-family | required | quick-view | 32281 | 35840 | 3559 | pass | — |
| Largest dependency-closed Account install slice | install-family | required | address-form | 29781 | 32768 | 2987 | pass | — |
| Largest dependency-closed Blog install slice | install-family | required | article-body | 30335 | 33792 | 3457 | pass | — |
| Largest dependency-closed Sections install slice | install-family | required | featured-collection | 33180 | 36864 | 3684 | pass | — |
| Largest dependency-closed Ceramics install slice | install-family | required | commission-form | 30988 | 33792 | 2804 | pass | — |
| Largest dependency-closed Reviews install slice | install-family | required | review-form | 31185 | 34816 | 3631 | pass | — |
| Largest dependency-closed Pages install slice | install-family | required | page-404 | 17340 | 19456 | 2116 | pass | — |

Positive headroom is available budget. A negative value is the exact current
overage. Component-owned assets and passive-component runtime remain separate
zero-tolerance policy gates in `docs/COMPONENT-REFINEMENT.md`.
