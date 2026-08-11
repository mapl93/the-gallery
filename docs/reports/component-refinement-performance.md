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
| Passing | 19 |
| Gaps | 0 |
| Documented gaps | 0 |
| Undocumented gaps | 0 |
| Global gaps | 0 |
| Family gaps | 0 |
| Install-family gaps | 0 |
| Diagnostic overages | 2 |

## Current Measurements

| Surface | Kind | Enforcement | Worst component/module | Gzip bytes | Ceiling | Headroom / overage | Result | Gap evidence |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
| Complete neutral component CSS compatibility bundle | global | diagnostic | — | 72723 | 65536 | -7187 | diagnostic-overage | `docs/decisions/0273-modular-copy-and-own-performance-architecture.md` |
| Complete progressive-enhancement compatibility runtime | global | diagnostic | — | 22807 | 8192 | -14615 | diagnostic-overage | `docs/decisions/0273-modular-copy-and-own-performance-architecture.md` |
| Neutral web token target | global | required | — | 53118 | 65536 | 12418 | pass | — |
| Selective runtime loader | runtime | required | — | 765 | 2048 | 1283 | pass | — |
| Shared modular runtime core | runtime | required | — | 715 | 2048 | 1333 | pass | — |
| Largest individual progressive-enhancement module | runtime-module-set | required | date-picker | 3396 | 5120 | 1724 | pass | — |
| Largest dependency-closed Primitives install slice | install-family | required | select | 18147 | 20480 | 2333 | pass | — |
| Largest dependency-closed Layout install slice | install-family | required | modal | 21107 | 23552 | 2445 | pass | — |
| Largest dependency-closed Forms install slice | install-family | required | date-picker | 27777 | 30720 | 2943 | pass | — |
| Largest dependency-closed Global install slice | install-family | required | announcement-bar | 34960 | 38912 | 3952 | pass | — |
| Largest dependency-closed Product install slice | install-family | required | size-chart | 34645 | 38912 | 4267 | pass | — |
| Largest dependency-closed Collection install slice | install-family | required | collection-grid | 27286 | 30720 | 3434 | pass | — |
| Largest dependency-closed Storytelling install slice | install-family | required | artist-profile | 18839 | 21504 | 2665 | pass | — |
| Largest dependency-closed Marketing install slice | install-family | required | announcement-extended | 34960 | 38912 | 3952 | pass | — |
| Largest dependency-closed Cart install slice | install-family | required | quick-view | 32093 | 35840 | 3747 | pass | — |
| Largest dependency-closed Account install slice | install-family | required | address-form | 29418 | 32768 | 3350 | pass | — |
| Largest dependency-closed Blog install slice | install-family | required | article-body | 30190 | 33792 | 3602 | pass | — |
| Largest dependency-closed Sections install slice | install-family | required | featured-collection | 32974 | 36864 | 3890 | pass | — |
| Largest dependency-closed Ceramics install slice | install-family | required | commission-form | 30623 | 33792 | 3169 | pass | — |
| Largest dependency-closed Reviews install slice | install-family | required | review-form | 30805 | 34816 | 4011 | pass | — |
| Largest dependency-closed Pages install slice | install-family | required | page-404 | 17162 | 19456 | 2294 | pass | — |

Positive headroom is available budget. A negative value is the exact current
overage. Component-owned assets and passive-component runtime remain separate
zero-tolerance policy gates in `docs/COMPONENT-REFINEMENT.md`.
