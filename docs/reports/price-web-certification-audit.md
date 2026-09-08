# Price Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Price is now a passive target-formatted commerce primitive with native
compare-at semantics, localized per-part text, bidirectionally isolated values,
container-safe wrapping, explicit typography, zero neutral runtime, and a
target-native Shopify mapping. The target still owns every monetary, commercial,
legal, structured-data, and dynamic-update decision.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Presents complete formatted current/compare/unit text; is not a money formatter, calculator, inventory state, legal disclosure, structured-data source, or live region. |
| Anatomy and composition | pass | Generic root, required current, optional native `s` compare-at, optional unit, localized hidden labels, and `bdi` values; no dependencies or duplicated behavior. |
| Variants, sizes, states | pass | Default/On sale, one container-responsive size, one passive state, and clean optional compare/unit omission. |
| Public API and ownership | pass | Seven semantic content/variant properties plus four retained OpenType switches; ordinary zero is fixed by ADR 0277 and the target owns complete strings and relationship truth. |
| Tokens and visual system | pass | Nine existing semantic type/color tokens; wrapping, gaps, weights, strike, labels, isolation, and forced-color mapping remain private. |
| Accessibility and motion | pass | Native `s`, DOM labels, BDI, no group/widget/live role, no focus/keyboard behavior, no animation, and forced-color preservation. |
| Responsive/content resilience | pass | Four viewports plus current-only, long Arabic/mixed-direction range, dark, forced colors, reduced motion, and 200% zoom evidence without overflow. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no listener, observer, timer, formatter, request, asset, state store, or measurement loop. |
| Cross-target translation | pass | Neutral Web and Shopify implemented; framework, Figma, and native ownership boundaries documented. |
| Documentation and verification | pass | Dossier, ADR 0108, contract/Studio/registry/MDX, canonical consumers, adapters, browser evidence, and this report agree. |

## Contract And Browser Evidence

- Contract `0.5.0`: six anatomy parts, two variants, one size, one passive state,
  five behaviors, 11 properties, nine unique public token references, and no
  component dependencies.
- Rendered root is a generic `span` with no `role`, `aria-label`, `aria-live`, or
  interactive descendant. Compare-at is native `S`; three `.price__label` nodes
  and three `bdi.price__value` nodes preserve part meaning and direction.
- Default computed presentation is current `20/32px` weight 600, compare
  `16/24px` weight 400, and unit `14/20px` weight 400. Current is primary text;
  compare and unit use supporting text rather than disabled or feedback colors.
- Default OpenType settings keep `calt` and `tnum` enabled with `frac` and
  `ss01` disabled. ADR 0277 fixes `zero 0` and removes its public attribute;
  the other four switches retain matching data attributes.
- Exhibit and Studio outer markup is exactly identical and comes from the same
  renderer and fixture.
- Current-only Default removes compare and unit parts and the on-sale class.
  Empty optional strings omit their parts. Empty required current remains an
  intentionally visible invalid authoring stress case rather than being repaired
  by neutral runtime; the contract and target validation require it.
- At 390px, a long Arabic/ARS range plus compare-at and unit text keeps root
  client/scroll width equal at `326/326px` and wraps to `110px` height. Values
  remain individually isolated inside an RTL root.
- Light contrast is `17.93:1` current and `7.81:1` supporting text. Dark contrast
  is `17.18:1` current and `12.09:1` supporting text.
- Forced colors resolves every part to CanvasText while native line-through
  remains. Reduced motion reports no animation and a `0s` transition duration.
- The 200% CSS-zoom probe keeps Price `258/258px` client/scroll width and the
  document `800/800px`, with no horizontal overflow.
- Eight canonical images cover Exhibit/Studio x Mobile/Tablet/Desktop/XL. Five
  additional after images cover current-only, long RTL, dark, forced colors,
  and 200% zoom; two desktop before images preserve the former generic
  compare-at/named-group baseline.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Generic root, localized labels, native `s`, `bdi` values, canonical CSS and direct formatted strings. | Implemented and evidenced without neutral JavaScript. |
| Shopify | Product/variant money filters, English/Spanish label keys, native `s`, `bdi`, official unit-measurement filter, optional label overrides. | Implemented; selected-variant/product-wide and dynamic announcement policy stay target-owned. |
| React / Angular / Hydrogen | Target formatter/provider supplies complete text; semantic parts render equivalently. | Boundary documented; no canonical framework or raw amount API added. |
| Figma | Default/On sale, current/compare/unit content, four OpenType choices, ordinary zero, and nine public presentation tokens. | Studio validates the source presentation; formatting algorithms stay outside Figma. |
| SwiftUI / Compose | Target-native formatted text and explicit localized sale/unit meaning with platform announcement ownership. | Conceptual mapping; data, accessibility combination, and updates stay platform-native. |

## Performance And Risks

- Final Primitives CSS is `10,454 B / 10.3 KiB`, leaving `93 B`. Complete Web
  component CSS is `64,484 B / 64 KiB`, leaving `1,052 B`. Shared neutral
  runtime is unchanged at `10,321 B / 8 KiB` under its existing exception.
- Batch 23 adds `98 B` gzip to Primitives, `92 B` to complete Web CSS, and `0 B`
  to neutral runtime. These are deltas from the contemporaneous baseline, not
  budget resets.
- Human review must approve current/compare/unit hierarchy, weight, order,
  `4px 8px` wrap gap, strike treatment, color strength, long-value wrapping, and
  whether the fixture's sale-first reading order is preferred.
- Market-specific tax, duty, legal unit-price, range, financing, subscription,
  deposit, volume-pricing, and sale-claim policy remains target-owned.
- Product/cart surfaces must choose one non-duplicative price-update announcement
  region. Currency selectors and pricing tiers compose separate controls/tables.
- No owner-provided Price visual reference is registered; review the repository
  candidate or provide replacement evidence.

## Validation

Contracts, Studio, registry/docs, DTCG source, Neutral Web, Shopify, locale JSON,
semantic DOM, OpenType controls, optional/required content stress, contrast,
long localized RTL content, dark/forced-colors/reduced-motion/zoom, four-viewport
evidence, TypeScript, structural/parity/static-preview/refinement audits,
temporary docs build, deterministic performance, diff checks, generated-copy
identity, component-console checks, and `site/dist` verification are included in
Batch 23.
