# Variant Selector Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-07-20

Accepted decision: D4-A / ADR 0240

## Outcome

Variant Selector is a native product-option composition with swatch or pill
presentation, one group value owner, inspectable sold-out values, natively
disabled nonexistent combinations and zero neutral runtime. One target
coordinator owns every dependent product update.

The prior architecture blockers are settled. Shopify now distinguishes exact
variant existence from sold-out state, supports granular high-variant Section
Rendering, follows Combined Listing `product_url`, updates the product path and
reconciles Price/media/form/structured data under the same response. Explicit
visual review and live-store integration evidence remain pending. No component
was promoted to `stable`.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Product-specific native selection; no neutral variant engine, request, URL mutation or live status. |
| Anatomy and composition | pass | Native fieldset/first legend/same-name radios, complete labels, swatch/pill collections and associated status. |
| States, variants and sizes | pass | Checked/focus/hover, selectable sold-out, disabled invalid/group, required; one 44px density. |
| Public API and ownership | pass | Ten stable semantic properties; target ids, URLs, stock, request and dependent product state remain private. |
| Controlled/uncontrolled | pass | Static checked is initial native state; frameworks own one value/default per group. |
| Tokens and visual system | pass | 26 existing public tokens plus private derived composition; target swatch data is not a token. |
| Accessibility and keyboard | pass | Native radios, no redundant roles, Arrow/Space behavior, exact input/change ordering, full labels and one external status owner. |
| Responsive/content resilience | pass | Four viewports, long Arabic RTL, dark, forced colors, reduced motion and 200% zoom without overflow. |
| Runtime and assets | pass | Zero neutral runtime; target coordinator remains bounded at `2,133 B` gzip. |
| Cross-target translation | pass with release risk | Neutral Web/React/docs/Shopify implemented; live Shopify catalogue/editor evidence remains release work. |
| Exhibit/Studio parity | pass | Exact identical `2,811`-character outer HTML and shared renderer/fixture. |
| Performance | pass with documented program gaps | Product CSS passes; global CSS/runtime overages documented; zero undocumented gaps. |
| Architecture/readiness | **ready for human review** | D4-A and ADR 0240 settle availability and target coordination. |

## Implemented Result

- Contract `0.3.0` records D4-A sold-out/disabled semantics, native request events
  and implemented Shopify/React mappings.
- Shared renderer/MDX fixture visibly distinguishes selectable sold-out Porcelain
  and XL from disabled nonexistent Ash and XXL.
- Shopify Liquid uses `option_value.variant` to separate an exact sold-out
  variant from a nonexistent combination, while keeping sibling `product_url`
  values enabled.
- Shopify target coordinator follows same-origin Combined Listing product paths,
  updates the root product URL for later requests and includes product URL in its
  target event detail.
- Locales distinguish Sold out/Agotado from Unavailable combination/Combinación
  no disponible.
- Neutral Web and Shopify adapters were regenerated. Shopify target-ready count
  advances from `85` to `86`; `site/dist` was not rebuilt.

## Browser And Target Evidence

- Exhibit/Studio exact parity: `2,811` characters.
- Fixture: two fieldsets, nine radios, two selectable sold-out states, two native
  disabled invalid states, zero explicit roles and zero component live regions.
- Arrow sequence selects Ink then sold-out Porcelain; the disabled Ash option is
  skipped and a direct click leaves Celadon selected. Size selects sold-out XL,
  skips disabled XXL and wraps to S.
- Every successful native selection emits `input` followed by `change`; derived
  legend values remain synchronized.
- Minimum measured swatch/pill target is exactly `44×44px`.
- Mobile, Tablet, Desktop and XL roots have equal client/scroll widths in Exhibit
  and Studio.
- Long Arabic group and option names compute RTL and remain within `520 / 520`.
- Dark colors resolve correctly; forced colors preserves status/focus marks;
  reduced motion resolves all nine option transition durations to `0s`.
- At 200% zoom the effective `131 / 131` root and `390 / 390` document remain
  contained.
- Deterministic Shopify Combined Listing harness:
  - requests `/products/celadon-sibling?option_values=22&section_id=main`;
  - changes the visible path to `/products/celadon-sibling?variant=333`;
  - synchronizes Product Info, merchandise id `333`, structured SKU
    `SIBLING-333`, one status and target event;
  - restores focus, clears `aria-busy`, updates the next product URL base and
    rejects an external-origin product URL without issuing another request.
- Final docs console: zero errors and zero warnings.

Manifest:
`output/playwright/refinement-product/variant-selector-0240/manifest.json`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native fieldsets/legends/radios and canonical CSS; consumer owns data/coordination. | Implemented, generated and browser-tested. |
| Shopify | Exact variant existence/stock, granular ids, swatches, sibling product paths and bounded coordinator. | Implemented, adapter-validated and modified files Theme Check clean. |
| React/docs | One controlled value per group with native events and D4-A state fixture. | Implemented in Exhibit and Studio. |
| Angular | Same one-value/default group contract. | Planned adapter. |
| Figma | Repeated group/option anatomy and checked/focus/sold-out/disabled visuals. | Planned; artwork approval pending. |
| SwiftUI/Compose | Native single-choice groups with target swatch/pill presentation. | Planned; parent commerce model resolves combinations. |

## Performance

| Surface | Final gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `4,803 B` | `5,324 B` | pass; `521 B` headroom |
| Neutral component CSS | `70,985 B` | `65,536 B` | documented `5,449 B` gap |
| Shared neutral runtime | `21,633 B` | `8,192 B` | documented `13,441 B` gap |
| Shopify product coordinator | `2,133 B` | target evidence | bounded target-only asset |

The full audit reports 18 surfaces, 10 pass and 8 documented gaps, with zero
undocumented gaps. D4 adds no neutral runtime and no ceiling changed.

## Risks And Required Human Review

- Approve swatch/pill geometry, hidden swatch label treatment, selected/focus/
  sold-out/disabled visuals, spacing, wrapping and typography.
- Run live Shopify high-variant, sold-out, nonexistent, Combined Listing,
  selling-plan, app-block and theme-editor integration before target release.
- Ensure every future adapter has authoritative exact-combination existence and
  stock data; do not collapse both states into one `available` boolean.
- Reduce or explicitly accept existing neutral CSS/runtime gaps before v1.

## Validation

Contract, Studio, docs, registry, decision coverage, JavaScript syntax, locale
JSON, Neutral Web adapter, Shopify adapter, scoped Theme Check, exact DOM parity,
native keyboard/event sequence, disabled skip/direct-click behavior, 44px targets,
four viewports, localized RTL, dark, forced colors, reduced motion, 200% zoom,
Combined Listing coordinator behavior, same-origin guard, console, structural
audit, refinement audit, performance audit, resource cleanup, diff checks and
`site/dist` cleanliness are included in Batch 110.
