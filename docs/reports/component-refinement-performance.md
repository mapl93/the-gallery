# Component Refinement Performance Audit

Policy v3.0.0; generated from `docs/refinement/performance-budgets.json`. See ADR 0310.

Sizes are observations unless a sourced target rule is attached. Advisory overages do not block component batches.
Only applicable platform requirements may be required byte gates. A successful inventory is not performance certification.

Summary: 22 observations, 0 required passes, 0 required gaps, 0 within guidelines, 2 advisory overages, 0 errors.

Compression: `gzip-level-9-no-name` (local gzip -9 -n -c, no filename or timestamp). Raw bytes sum file contents.
Install slices are dependency-closed CSS/runtime concatenations separated by newlines, with tokens measured separately.
Neither concatenated gzip nor the complete asset inventory represents actual page transfer, CDN minification, request count or execution cost.

## web

Neutral Web copy-and-own outputs

| Surface | Largest component/asset | Raw bytes | Gzip bytes | Target rule | Result |
| --- | --- | ---: | ---: | --- | --- |
| Complete neutral component CSS compatibility bundle | — | 574094 | 77279 | None | observed |
| Complete progressive-enhancement compatibility runtime | — | 118114 | 22912 | None | observed |
| Neutral web token target | — | 362683 | 44453 | None | observed |
| Selective runtime loader | — | 2399 | 747 | None | observed |
| Shared modular runtime core | — | 1678 | 707 | None | observed |
| Largest individual progressive-enhancement module | date-picker | 14351 | 3381 | None | observed |
| Largest dependency-closed Primitives install slice | select | 122855 | 19940 | None | observed |
| Largest dependency-closed Layout install slice | modal | 164866 | 23606 | None | observed |
| Largest dependency-closed Forms install slice | date-picker | 218000 | 30854 | None | observed |
| Largest dependency-closed Global install slice | announcement-bar | 240741 | 37571 | None | observed |
| Largest dependency-closed Product install slice | size-chart | 293406 | 38930 | None | observed |
| Largest dependency-closed Collection install slice | collection-grid | 213923 | 30474 | None | observed |
| Largest dependency-closed Storytelling install slice | artist-card | 196725 | 27691 | None | observed |
| Largest dependency-closed Marketing install slice | announcement-extended | 240741 | 37571 | None | observed |
| Largest dependency-closed Cart install slice | quick-view | 237755 | 35093 | None | observed |
| Largest dependency-closed Account install slice | address-form | 230616 | 32488 | None | observed |
| Largest dependency-closed Blog install slice | article-body | 232776 | 33349 | None | observed |
| Largest dependency-closed Sections install slice | featured-collection | 255068 | 36173 | None | observed |
| Largest dependency-closed Ceramics install slice | commission-form | 245376 | 33680 | None | observed |
| Largest dependency-closed Reviews install slice | review-form | 238457 | 33883 | None | observed |
| Largest dependency-closed Pages install slice | page-404 | 127436 | 19018 | None | observed |

Unverified by this report:

- Real consumer page load, network transfer and interaction performance are not measured by this asset inventory.

## shopify

Shopify Online Store theme; not a theme app extension or Theme Store submission

| Surface | Largest component/asset | Raw bytes | Gzip bytes | Target rule | Result |
| --- | --- | ---: | ---: | --- | --- |
| Shopify theme token asset | — | 362843 | 44497 | None | observed |
| Largest Shopify local CSS asset (inventory, including compatibility files) | tokens.css | 362843 | 44497 | 100000 rawBytes; advisory | advisory-overage |
| Largest Shopify local JS asset (inventory, including compatibility files) | theme.js | 118114 | 22912 | 10000 rawBytes; advisory | advisory-overage |

Unverified by this report:

- Hosted page performance, CDN transformations and the assets actually loaded by a page require target browser evidence.
- Theme upload/package limits and Theme Check execution remain separate target checks; this report does not certify them.

### shopify-css-asset-maximum

AssetSizeCSS default for local theme assets. Inventory comparison only: includes unreferenced assets; does not reproduce Liquid-reference traversal, remote checks or page loading.

[Shopify official documentation and Theme Check source](https://shopify.dev/docs/storefronts/themes/best-practices/performance/finding-worst-offenders), checked 2026-09-09.

Upstream main inspected on checkedOn; configurable and disabled by default for themes. The individual check page says compressed size, but the performance guide and local-file implementation use raw stat size. No threshold is copied into .theme-check.yml.

- [Implementation evidence](https://github.com/Shopify/theme-tools/blob/main/packages/theme-check-common/src/checks/asset-size-css/index.ts)
- [Implementation evidence](https://github.com/Shopify/theme-tools/blob/main/packages/theme-check-common/src/utils/file-utils.ts)
- [Implementation evidence](https://github.com/Shopify/theme-tools/blob/main/packages/theme-check-node/src/NodeFileSystem.ts)

Assets above this reference:

- `platforms/shopify/assets/tokens.css`: 362843 raw bytes, 44497 gzip bytes.

### shopify-js-asset-maximum

AssetSizeJavaScript default for local theme assets. Inventory comparison only: includes unreferenced assets; does not reproduce Liquid-reference traversal, remote checks or page loading.

[Shopify official documentation and Theme Check source](https://shopify.dev/docs/storefronts/themes/best-practices/performance/finding-worst-offenders), checked 2026-09-09.

Upstream main inspected on checkedOn; configurable and disabled by default for themes. The individual check page says compressed size, but the performance guide and local-file implementation use raw stat size. No threshold is copied into .theme-check.yml.

- [Implementation evidence](https://github.com/Shopify/theme-tools/blob/main/packages/theme-check-common/src/checks/asset-size-javascript/index.ts)
- [Implementation evidence](https://github.com/Shopify/theme-tools/blob/main/packages/theme-check-common/src/utils/file-utils.ts)
- [Implementation evidence](https://github.com/Shopify/theme-tools/blob/main/packages/theme-check-node/src/NodeFileSystem.ts)

Assets above this reference:

- `platforms/shopify/assets/theme.js`: 118114 raw bytes, 22912 gzip bytes.
- `platforms/shopify/assets/tg-runtime-date-picker.js`: 14362 raw bytes, 3389 gzip bytes.
- `platforms/shopify/assets/tg-runtime-product-gallery.js`: 13332 raw bytes, 3028 gzip bytes.
- `platforms/shopify/assets/tg-runtime-carousel-rotation.js`: 12679 raw bytes, 3308 gzip bytes.
- `platforms/shopify/assets/tg-runtime-marquee.js`: 10669 raw bytes, 2745 gzip bytes.
- `platforms/shopify/assets/tg-runtime-select.js`: 10543 raw bytes, 2836 gzip bytes.
- `platforms/shopify/assets/tg-runtime-countdown.js`: 10166 raw bytes, 2909 gzip bytes.

## Historical references and limits of evidence

The former 64 KiB token ceiling, family ceilings and runtime ceilings remain in JSON as historicalReference only.
They are retired internal policy, not external standards. Historical reports retain their original measurements and outcomes.
The old single-file gzip method included a filename header; current measurements omit it. This method change is not an asset optimization.
Passive-component behavior and component-asset ownership remain architectural contracts under docs/COMPONENT-REFINEMENT.md.
