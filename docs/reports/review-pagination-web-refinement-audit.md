# Review Pagination Web Refinement Audit

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

## Outcome

V9 Review Pagination is now a contextual profile of canonical Pagination, not a
second numbered-navigation implementation. Registry, contract `0.3.0`, docs and
renderer declare the same direct `pagination` dependency; Link remains a
canonical transitive dependency. The root adds only the review-specific class
and accessible name. All visible anatomy, state, focus, wrapping and RTL behavior
come from Pagination and Link.

The duplicate button tree, thirteen Review Pagination tokens, disabled-boundary
model and review-specific child CSS are gone. Available destinations are real
links, exactly one current page is non-interactive, ellipses are passive, and
Previous/Next are omitted at unavailable boundaries. Provider, URLs, windowing,
requests and result lifecycle remain target-owned.

The result is prepared for explicit human review, not stable. The canonical
Pagination visual candidate still needs approval in the review context, and no
component-specific Figma artwork or review provider has been selected.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Finite review-result page navigation only; no provider, query, loading or result ownership. |
| Anatomy and composition | pass | Named `nav.pagination.review-pagination`, canonical list/items/links/current/ellipses and no duplicated child API. |
| Variants, states and modes | pass | First, middle, last, one-page omission, destination/current/ellipsis, themes and special modes. |
| Public API | pass | Required localized `label`, positive `currentPage` projection and finite `pageItems` composition only. |
| Controlled/uncontrolled | pass | URLs/server output are static-target truth; frameworks may control one projection without a wrapper-owned copy. |
| Canonical dependencies | pass | Direct Pagination dependency and transitive Link; one shared docs renderer also serves canonical Pagination. |
| Tokens and visual system | pass | Zero Review Pagination visual tokens; canonical Pagination/Link own every visible decision. |
| Accessibility and motion | pass | Named landmark/list, real links, one non-focusable current page, hidden ellipses, ordinary Tab/Enter, forced colors and zero reduced-motion transitions. |
| Responsive/content resilience | pass | Intrinsic wrapping at four viewports, 320px localized/five-digit stress, RTL and 200% zoom without overflow. |
| Runtime and assets | pass | Zero neutral Review Pagination listener, state store, request, layout read, animation or asset. |
| Cross-target translation | pass | Web implemented; Shopify/Webflow CSS regenerated; provider mapping remains deliberately planned. |
| Exhibit/Studio parity | pass | One renderer and fixture; byte-identical root DOM at all four viewports. |
| Human readiness | pass | Dossier, ADR, contract, docs, targets, evidence, budgets, risks and gates complete; status remains `pilot`. |

## Contract And Browser Evidence

- The initial middle state renders six real links, zero buttons, one
  `span[aria-current="page"]` with `tabIndex === -1`, two hidden ellipses and
  nine list items. Every destination keeps its target-shaped `href` after
  docs-only interception.
- First page omits Previous and exposes Page 2, Page 10 and Next in native Tab
  order. Last page omits Next and exposes Previous, Page 1 and Page 9. The
  current item never enters the focus order.
- The focus sample resolves to a `2px` solid outline with `2px` offset. No
  roving focus, disabled page control or arrow-key override exists.
- Inspector projection clamps below/above-range values to the ten-page docs
  fixture. Reset restores page 5 and clears target-boundary feedback. Disabling
  `pageItems` is source-verified to omit the complete landmark.
- Mobile initial containment is corrected from `329px` content in a `326px`
  root to exact `326px` containment. A localized 320px candidate and a
  five-digit destination each report `scrollWidth === clientWidth === 256px`.
  At CSS zoom 200%, root and document also contain exactly.
- Light contrast is `7.81:1` for destinations and `10.37:1` for the current
  page. Dark contrast is `12.09:1` and `17.93:1`. Forced colors resolves links
  and current state to system colors; reduced-motion transition and animation
  durations are `0s`.
- RTL inherits canonical icon mirroring and logical list flow. Console review
  reports zero warnings and zero errors.
- Exhibit and Studio root `outerHTML` is identical at Mobile, Tablet, Desktop
  and XL with SHA-256
  `2b6fc0374f33485fa87ec9e680aec461e78da000b890b14f747706b45eb4ca17`.

Eighteen final screenshots live under
`output/playwright/refinement-batch-55/final/`; eight before images remain under
`output/playwright/refinement-batch-55/before/`.

## External And Figma Evidence

[WAI navigation structure](https://www.w3.org/WAI/tutorials/menus/structure/)
supports a native list inside a specifically named navigation landmark, while
[ARIA26](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA26) identifies exactly
one current page in a related set. The
[W3C Design System Pagination](https://design-system.w3.org/components/pagination.html)
uses the same native navigation/list/link/ellipsis/current anatomy. Open UI
defines no browser Pagination primitive, and Radix publishes no Pagination
primitive, so a review-specific composite widget is unwarranted.

Historical Polaris Pagination leaves URL/callback and availability with the
consumer; the React package is now archived. Shopify Liquid
[`paginate`](https://shopify.dev/docs/api/liquid/objects/paginate) supplies the
page model at the target. Neither source authorizes generic provider-free review
Liquid or a second neutral state store.

Figma nodes `943:7` and `1020:480` are generic Button component-detail and
Studio frames, not approved Review Pagination artwork. No layout or visual fact
was promoted from them. Full comparison is recorded in the dossier.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Canonical Pagination tree plus `.review-pagination` and target URLs/results. | Implemented and evidenced with zero profile runtime. |
| Shopify | Provider/app block maps its finite page model into canonical Pagination or owns its native view. | CSS ready; provider mapping planned, with no placeholder Liquid. |
| Webflow | Canonical copied Pagination classes and real target links. | Generated CSS available; result behavior remains external. |
| React / Angular | Controlled canonical Pagination projection with one target result coordinator. | Contract-ready; no parallel profile state. |
| Figma | Review-context instance/profile of accepted canonical Pagination. | Planned; component artwork is absent. |
| SwiftUI / Compose | Equivalent target-native finite page navigation. | Conceptual; cursor/load-more/infinite are separate modes. |

Canonical `components/css/reviews.css`, Shopify `assets/reviews.css` and Webflow
`reviews.css` are byte-identical. Shopify remains at 56 target-ready components;
official artifact `review-pagination-batch-55` revision 1 passes.

## Performance And Risks

| Surface | Deterministic gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,502 B` | `3.7 KiB` (`3,788 B`) | pass; `286 B` remaining and `215 B` removed |
| Shared neutral runtime | `10,492 B` | `8 KiB` (`8,192 B`) | existing `2,300 B` program exception; `0 B` added |
| Neutral Web components CSS | `67,132 B` | `64 KiB` (`65,536 B`) | existing `1,596 B` program gap after `203 B` removed |

- Human review must approve canonical density, current emphasis, wrap behavior,
  ellipsis rhythm and directional icons in review context.
- Provider, numbered/cursor/load-more/infinite strategy, page size, windowing,
  URLs, loading/error/results, history, focus, scroll and announcements remain
  product or target decisions.
- Dedicated Shopify/provider, Figma and framework adapters remain absent.
- Global Web CSS/runtime overages remain program gaps, not budget increases.

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, canonical static preview,
native landmark/list/link/current/ellipsis semantics, first/middle/last states,
real destinations, focus order, one-page source omission, four-viewport exact
parity, narrow/localized/five-digit/RTL/200% containment, light/dark contrast,
forced colors, reduced motion, Neutral Web, Shopify, Webflow, official Shopify
artifact, source/generated identity, deterministic gzip, TypeScript, a temporary
Vite build outside `site/dist`, structural/static/parity/refinement audits and
diff checks comprise Batch 55.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Human Review Queue

1. Approve or revise the canonical Pagination visual candidate in review
   context: density, current emphasis, wrapping, ellipses and directional icons.
2. Decide numbered, cursor, load-more, infinite or provider-managed strategy.
3. Select provider, page size/window/URL model and result lifecycle before a
   target integration is built.
4. Create Review Pagination-specific Figma examples only after browser approval.
5. Keep the contract `pilot` until explicit human stability approval.
