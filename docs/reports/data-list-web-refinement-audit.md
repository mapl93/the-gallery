# Data List / Description List Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/data-list.contract.json` (`0.3.0`)

## Result

Data List preserves native description-list semantics and its vertical/horizontal
layout choice. Both modes now use semantic body type, logical alignment, bounded
flex parts, extreme-content wrapping, system forced-color borders, and a
component-container response for narrow vertical pairs.

## Semantics, API, And Content

- `dl`, adjacent `dt`/`dd`, and source order remain unchanged in every layout.
- Only `variant=vertical|horizontal` is public. Repeated data, formatting,
  localization, empty policy, and refresh remain target-owned.
- No selection, navigation, editing, controlled state, formatter, or live-region
  behavior is implied.
- The `20rem` threshold affects only the vertical variant. Horizontal retains its
  explicit wrapping metadata-group presentation.

## Responsive And Extreme Evidence

At `390px`, the comparable unbroken term/value case changed from:

| Measurement | Before | After |
| --- | ---: | ---: |
| Document scroll width | `1177px` | `390px` |
| Root client / scroll | `326 / 1145px` | `326 / 326px` |
| First item client / scroll | `326 / 1145px` | `326 / 326px` |

At a `280px` component container, vertical pairs stack with `2px` gap and logical
start alignment. Horizontal + RTL + unbroken content keeps root/item client and
scroll widths at `280/280px`. Type resolves to `16/24px`. Forced colors retain
the term/value row boundary without adding component colors.

## Evidence, Runtime, And Targets

- Exhibit/Studio initial root HTML is byte-identical: `412` tested characters.
- Eight canonical screenshots cover four viewports in both modes.
- Supplemental evidence covers baseline overflow, contained extreme content,
  `280px` container stacking, and horizontal RTL extreme content.
- Adds `0 B` component JS, listener, observer, timer, request, asset, or formatter.
- Web/Shopify use native description lists; framework, Figma, and native targets
  translate pair grouping and logical alignment without adopting a record schema.

## Human Review Input

Approve the `20rem` stack threshold, row padding/rule, pair gaps, value weight,
and horizontal group density. No `stable` promotion is authorized.

Evidence lives under `output/playwright/refinement-batch-06/`; `site/dist` was not
rebuilt.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run validate:tokens:web-components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run audit:refinement`
- `git diff --check`
