# Exhibit–Studio v1 Readiness Report

Reviewed on 2026-07-13.

## Outcome

The documentation site now has canonical Exhibit–Studio parity for all 183 registry components. When a component has a registered Studio renderer, Exhibit and Studio render that same component renderer, Studio definition, initial fixture, markup, classes, state, and local behavior. The first MDX `Preview` remains documentation source and fallback rather than a second runtime artwork.

This result is a v1-readiness improvement, not an automatic maturity promotion. The audit left the existing contract statuses unchanged: 1 `stable` and 182 `pilot`. `site/dist` was not rebuilt.

## Coverage

| Evidence | Result |
| --- | ---: |
| Registry components | 183 |
| Registry families | 15 |
| Shared renderer path | 183 |
| Structural gaps | 0 |
| Desktop and mobile visual reviews | 183 |
| Exhibit/Studio screenshots | 732 |
| Family contact sheets | 15 |
| Interactive components passing keyboard review | 134 |
| Passive components marked not applicable | 49 |
| Visible focusable surfaces exercised | 463 |
| Representative functional-state cases | 30 |
| Functional mode executions | 60 |
| Functional-state failures | 0 |
| Rendered contrast regression samples | 11 |
| Worst-case media-overlay samples | 2 |
| Contrast failures | 0 |
| Local editorial assets with provenance | 7 |

## Canonical rendering pattern

ADR 0087 records the shared runtime contract. `ComponentDetail` supplies the registered renderer and definition to Exhibit; `ExhibitDocument` renders it as the single artwork; Studio uses the same registered renderer directly. Exhibit removes the inspector and renderer-owned documentation title through presentation CSS only.

This preserves the five curatorial Exhibit sections and the one-artwork rule while eliminating markup and fixture drift between modes. MDX previews continue to serve source inspection, static auditing, and fallback for a future component without a registered renderer.

## Family audit

| Family | Components | Review emphasis |
| --- | ---: | --- |
| primitives | 28 | Core values, field feedback, choice controls, loading, disabled and passive states |
| layout | 17 | Disclosure, tabs, navigation, containment, responsive stacking |
| global | 8 | Header/footer, overlays, drawers, dismissal, search and cart surfaces |
| product | 10 | Product media, variant and quantity controls, purchase-adjacent local states |
| collection | 7 | Filtering, sorting, pagination, view changes and empty/loading arrangements |
| storytelling | 9 | Editorial hierarchy, long-form composition, media and artist filtering |
| marketing | 11 | Calls to action, newsletter feedback, popup dismissal and promotional surfaces |
| pages | 5 | Full-page recovery, coming-soon, gift-card and checkout-oriented compositions |
| forms | 15 | Validation symmetry, warning preservation, focus hierarchy and advanced controls |
| cart | 11 | Line-item controls, disclosure, discount, notes, gift wrap and order summaries |
| account | 9 | Authentication, reset, address, wishlist and settings fixtures |
| blog | 11 | Article hierarchy, navigation, comments and share-action feedback |
| sections | 19 | Responsive marketing/editorial sections, media overlays and dense layouts |
| ceramics | 14 | Material storytelling, measurement, glossary, FAQ and commission workflows |
| reviews | 9 | Rating, filtering, pagination, themes, photos and local review composition |

All families were inspected in Exhibit desktop, Studio desktop, Exhibit mobile, and Studio mobile. The family sheets showed no blank renderer, broken editorial asset, horizontal overflow, or canonical artwork mismatch.

## Visual and state corrections

Recurring low-contrast semantic patterns were repaired at canonical CSS source rather than patched in generated targets. The corrections include:

- accent text mixed toward primary text for readable links and metadata;
- feedback text mixed toward primary text while retaining its error, success, or warning family;
- meaningful disabled-looking metadata promoted to secondary text;
- primary text on pale statement surfaces instead of inverse text;
- stronger media overlays whose contrast does not depend on the selected photograph;
- preserved validation-color families on field hover;
- explicit selected, current, expanded, dismissed, submitted, and local-feedback states in the shared fixtures.

The rendered regression set has a 5.40:1 minimum for normal text, 3.40:1 for the 66px decorative technique numeral, and 6.76:1 for the most conservative media-overlay text case. Exact samples and limitations are recorded in the contrast report.

## Editorial media

Seven optimized site-owned photographs replace embedded data images in the Studio family renderers. Their manifest records author, source page, original URL, license, and suggested alt text. These assets are presentation fixtures only; they are not target-agnostic component defaults or contract data.

## Validation

The final repository checks passed:

- neutral web adapter build and validation: 183 components, 19 CSS source files;
- docs validation: 183 registry components, 183 contracts, 183 Studio definitions, and 183 MDX pages;
- source-token validation: 534 tokens across 16 files with 197 mode overrides;
- Studio validation: 793 semantic properties, 1,323 public token references, and 30 icon choices;
- web/component token compatibility: 186 public references defined;
- component certification audit: 183 automated passes, 0 structural gaps, and 0 web-manifest drift;
- static preview audit: 250 previews, 0 errors, 1 reviewed warning, and 6 informational open-state notes;
- site TypeScript check with no emitted output;
- Exhibit–Studio audit: 183 shared, 0 gaps, 183 visual reviews, and complete interaction disposition;
- report JSON parsing, 732-capture inventory, and whitespace validation.

The static-audit warning is the intentional full-area native file input inside `.file-upload`; it captures pointer and drag/drop activation for the visible drop zone. The six informational notes are deliberate open-state Dropdown Menu and Toast documentation examples.

## Evidence index

- [Shared renderer decision](../decisions/0087-shared-exhibit-studio-renderer.md)
- [Full component parity matrix](exhibit-studio-parity.md)
- [Machine-readable parity report](exhibit-studio-parity.json)
- [Visual evidence manifest](exhibit-studio-evidence.json)
- [Per-component keyboard and DOM-signature report](exhibit-studio-interactions.json)
- [Representative functional-state suite](exhibit-studio-functional-states.json)
- [Contrast and state report](exhibit-studio-contrast-and-states.json)
- [Editorial media manifest](../../site/public/media/editorial/manifest.json)
- Local screenshot contact sheets: `output/playwright/parity/<family>-contact-sheet.jpg`

## Remaining gates

The work materially improves documentation parity and source quality, but it does not replace the remaining v1 gates:

- human certification is still required before any `pilot` contract becomes `stable`;
- browser coverage beyond the Chromium desktop/mobile sweep remains separate;
- target-native Shopify and future adapter behavior must be validated in their own environments;
- authentication, persistence, checkout, uploads, sharing, search, and other target-owned services remain local fixture boundaries;
- consumer-supplied images and content still require target-specific contrast and accessibility review.

No component was promoted automatically, and no docs distribution output was rebuilt.
