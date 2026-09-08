# Star Rating Display Deprecation Audit

Status: Migration record ready; contract is `deprecated`

Date: 2026-07-20

Decision: ADR 0235

## Outcome

V2 Star Rating has been consolidated into canonical A11 Rating. The former
identity remains temporarily discoverable for migration, but it owns no
implementation and cannot become a permanent alias. Its useful numeric
half-step and large-size capabilities now belong to Rating together with the
optional localized count.

## Migration Gate

| Gate | Result | Evidence |
| --- | --- | --- |
| Owner decision | pass | ADR 0235 records accepted A11/V2 consolidation. |
| Canonical replacement | pass | A11 Rating exposes `ratingValue`, `accessibleLabel`, optional `reviewCount`, and `default | lg`. |
| Selector removal | pass | No `.star-rating*` selector remains in canonical CSS, site renderer/styles, or Shopify source. |
| Renderer removal | pass | `ReviewsStudio` has no V2 display branch; deprecated route maps to `RatingStudio`. |
| Fixture removal | pass | Deprecated route uses canonical Rating fixture; no independent V2 fixture exists. |
| Consumer migration | pass | Review Summary and Review declare and render canonical Rating. |
| Adapter removal | pass | V2 Shopify status is unsupported/deprecated; canonical Rating owns the Liquid adapter. |
| Runtime/assets | pass | `0 B` V2 CSS/JS/assets and no listener, observer, timer, formatter, or request. |
| Evidence | pass | Deprecated Exhibit/Studio roots exactly match canonical roots and contain zero legacy selectors. |
| Stability | not applicable | Deprecated V2 is removed at the version boundary and must never become `stable`. |

## Property Migration

| V2 | Rating |
| --- | --- |
| `ratingValue` | `ratingValue` |
| `label` | `accessibleLabel` |
| `size` | `size` |
| no count | optional `reviewCount` |
| `.star-rating` | `.rating` |
| `.star-rating--lg` | `.rating--lg` |

Targets must continue to supply valid half-step data and matching localized
copy. Exact provider values and half-step display values are distinct when
necessary; Review Summary now exposes that distinction explicitly.

## Browser Evidence

- `/components/star-rating` and `?view=studio` render the same canonical root as
  `/components/rating` in the corresponding mode.
- The final fixture exposes `.rating[data-rating="3.5"]`, one named image, five
  decorative states, optional localized count, and zero focusables.
- Deprecated routes match zero legacy selectors.
- Review Summary and Review each render canonical
  `.rating[data-rating="4.5"]` and match zero legacy selectors.
- The evidence run used one managed server, one headless Playwright session,
  one tab, and finished with zero console errors/warnings plus a clean resource
  assertion.

## Remaining Lifecycle Work

- Human visual review applies to canonical Rating, not deprecated V2.
- Consumer/package release notes must call out direct markup/property migration.
- Remove the V2 inventory record at the accepted v1 boundary.
- Do not reintroduce selector aliases, framework wrappers, Shopify snippets, or
  Figma duplicates for backward compatibility.

`site/dist` was not rebuilt or modified.
