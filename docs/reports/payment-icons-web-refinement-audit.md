# Payment Icons Web Refinement Audit

Status: `human-review-ready`; no stability promotion

Date: 2026-07-16

Component: Payment Icons (`G6`, dependency order `89`)

Contract: `components/contracts/payment-icons.contract.json` `0.3.0`, `pilot`

## Outcome

Payment Icons is now a passive native list of recognized payment methods whose
current data, official marks, accessible method names and brand governance come
from the target. Each valid native list item contains one informative mark;
invalid items and the empty root are omitted. The base exposes only required
`icons`, semantic `size` and an optional localized `accessibleLabel`.

Default and Small preserve target artwork and wrap intrinsically. The previous
grayscale, half opacity, pointer-only reveal and transition are removed. G6 owns
no catalogue, availability claim, interaction or neutral runtime and remains
`pilot` pending explicit human visual/brand review.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive accepted-method presentation is separated from checkout selection, saved instruments, generic Icon, Badge and Trust Badges. |
| Anatomy and omission | pass | Required native root/item/mark, informative name and strict invalid-item/empty-root omission. |
| Public API | pass | Required `icons`, `size=default/sm`, optional `accessibleLabel`; no brand enum, asset, provider, availability, geometry, event or analytics API. |
| Native semantics | pass | `ul[role=list]` + `li` + named informative image; no widget/control/live semantics. |
| Accessibility | pass | Three fixture marks and all eight stress marks are named; optional label omission, zero focusable/live descendants, no hover-only meaning. |
| Responsive containment | pass | Direct `96–800px` roots have equal client/scroll dimensions and contained descendants; mixed-aspect eight-mark stress wraps without overflow. |
| Content resilience | pass | One/no-label, three, eight mixed-aspect, Arabic naming and effective 200% scaling remain valid and contained. |
| Theme and modes | pass | Fixture current-color contrast passes in light/dark; hover is unchanged, forced colors retain current color, and G6 authors no motion. |
| Exhibit / Studio parity | pass | One `MarketingStudio` renderer/fixture; normalized DOM, equal-width computed styles/rectangles and opaque pixels are exactly equal. |
| DOM / CSS / runtime | pass | Native list only; no G6 listener, observer, timer, request, asset, layout read or neutral JavaScript selector. |
| Generated targets | pass | Canonical, Webflow and Shopify Marketing CSS are source-identical; Web and Shopify adapters validate. |
| Shopify target | pass | Target-ready localized snippet using current enabled types and official payment SVG generation; no schema or G6 script required. |
| Human stability | pending | Final density, alignment, gap, wrapping, placement, recommended count, licensed assets/brand rules and corrected G6-specific reference require explicit review. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Contract | Generic root plus optional raster/vector selectors; Default-only size list, `small` boolean and pointer hover state. | Native root/item/mark anatomy, Default/Small semantic size, informative-name/omission/target-data rules. |
| Root and items | `div role=list` with anonymous `span role=listitem`; disabling required marks left an empty named root. | Conditional `ul[role=list]` with native `li.payment-icons__item`; no root without required marks. |
| Accessible name | Hardcoded English list label outside the public contract. | Optional localized `accessibleLabel`, omitted when empty; every informative mark is explicitly named. |
| Fixture | Generic rectangles labelled as real Visa/Mastercard/Amex brands without official assets. | Clearly illustrative Example card/wallet/bank placeholders that are not component defaults or production logos. |
| Brand treatment | Every image/SVG forced to 50% opacity and grayscale until pointer hover. | Target artwork remains opaque and unfiltered; hover is visually identical to rest. |
| Motion | Fast opacity transition plus reduced-motion override. | No transition or animation in any motion mode. |
| Sizing/spacing | Hardcoded `24px`, `18px`, `8px`; undocumented `.payment-icons--sm`. | Semantic Default/Small API; private rem geometry and existing element-gap token/private ratio. |
| Studio parity | Studio-only class forced marks to `48×28px`. | Studio-only geometry removed; Exhibit/Studio consume the same canonical mark class. |
| Shopify | Copied CSS only; adapter planned. | Dedicated localized snippet using contextual enabled types and official target SVG output; adapter ready. |

Before evidence: `output/playwright/parity/marketing/payment-icons-*.png`
(`4` Mobile/Desktop Exhibit/Studio PNGs).

After evidence: `output/playwright/batch86-payment-icons/after/` (`13` PNGs):
paired Mobile, Tablet, Desktop and XL, Default/Small roots, equal-width
Exhibit/Studio roots and dark mode.

## DOM, Composition And Responsive Evidence

Normalized Exhibit and Studio `.payment-icons` structure is exactly equal with
SHA-256
`b8e2cbd920cb8c7f5d68522f32c5f2597415385d4f474250790611ac50e9729e`.
In an isolated `520px` opaque canvas, every computed root/item/mark style and
relative rectangle is equal. The screenshots are byte-identical with SHA-256
`9cd1c43a97adeaecf433591bf22013866311c95bbb236c0b7ed739210b83e2fb`.

The common Default result is a `520×24px` native list. Marks resolve to
`41.14×24px`, with an `8px` computed gap, full opacity, no filter and no
motion. Different root width in normal full-page Exhibit/Studio screenshots is
correct container response: each documentation surface supplies a different
available content box.

| Direct root | Client/scroll | Height client/scroll | Rows | Result |
| ---: | ---: | ---: | ---: | --- |
| `96px` | `96/96` | `56/56` | 2 | contained |
| `120px` | `120/120` | `56/56` | 2 | contained |
| `160px` | `160/160` | `24/24` | 1 | contained |
| `240px` | `240/240` | `24/24` | 1 | contained |
| `320px` | `320/320` | `24/24` | 1 | contained |
| `520px` | `520/520` | `24/24` | 1 | contained |
| `800px` | `800/800` | `24/24` | 1 | contained |

| Eight mixed-aspect marks | Client/scroll | Height client/scroll | Rows | Result |
| ---: | ---: | ---: | ---: | --- |
| `96px` | `96/96` | `184/184` | 6 | contained |
| `160px` | `160/160` | `120/120` | 4 | contained |
| `320px` | `320/320` | `56/56` | 2 | contained |

A single item without a root label remains a valid `96×24px` native list.
At effective 200% root type scaling, the eight-mark `160px` stress fixture uses
`48px` marks, wraps to seven rows and remains contained at `384/384px` height.

## Accessibility, Content And Special Modes

- The browser accessibility snapshot exposes one list named “Example accepted
  payment methods”, three native list items and three images named Example card,
  wallet and bank method.
- The required Studio marks control remains checked and disabled. The renderer
  has an explicit `icons !== true` root-omission guard.
- Clearing the optional label removes `aria-label`; entering Arabic
  `طرق الدفع المقبولة` maps directly to the native root.
- The eight-mark stress fixture exposes eight named images, zero focusable
  descendants and zero status/alert/live regions.
- Resting and hovered marks are computed-identical: current color, opacity `1`,
  `filter:none`, `cursor:auto`, no transition and no animation.
- Fixture current-color contrast is `17.93:1` in light (`#171717` on white) and
  `17.18:1` in dark (`#fafafa` on `#171717`). Production asset conformance remains
  a target brand/accessibility responsibility rather than a claim about every
  possible logo.
- Forced colors maps root and mark current color to system black while retaining
  full opacity and no filter. Reduced-motion inspection reports `0s` transition,
  `0s` animation and `animation-name:none` on root, items and marks.
- One headless browser tab produced zero console errors/warnings during the
  final mode pass.

The direction follows the HTML Standard's native
[`ul`/`li` semantics](https://html.spec.whatwg.org/dev/grouping-content.html)
and [WAI image guidance](https://www.w3.org/WAI/tutorials/images/), which requires
short text alternatives for informative images and equivalent wording for
logos that convey text. The [APG pattern inventory](https://www.w3.org/WAI/ARIA/apg/patterns/)
and [Open UI component matrix](https://open-ui.org/research/component-matrix/)
define no passive Payment Icons widget, so G6 adds no custom keyboard model.

[Radix Accessible Icon](https://www.radix-ui.com/primitives/docs/utilities/accessible-icon)
also requires a label for meaningful icon content without establishing a brand
catalogue. Shopify separates an individual named
[Payment Icon](https://shopify.dev/docs/api/checkout-ui-extensions/2025-10/web-components/media-and-visuals/payment-icon)
from layout; Liquid exposes contextual
[`shop.enabled_payment_types`](https://shopify.dev/docs/api/liquid/objects/shop#shop-enabled_payment_types)
and official [`payment_type_svg_tag`](https://shopify.dev/docs/api/liquid/filters/payment_type_svg_tag)
output. That supports target-owned current data/assets plus a narrow passive list.

## Tokens, CSS And Performance

The contract exposes one existing public semantic token,
`--space-layout-element-gap`. The quarter-step collection gap and exact Default/
Small rem dimensions remain private. No token or token layer was created.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| G6 CSS slice | `477 B` raw / `284 B` gzip | `499 B` raw / `271 B` gzip | family-owned | `+22 B` raw / `-13 B` gzip; complete named anatomy, no hover/motion |
| Marketing family CSS | `4,181 B` gzip | `4,134 B` gzip | `4,198 B` | pass; `64 B` remaining |
| Neutral Web component CSS | recorded `68,439 B` | `67,741 B` | `65,536 B` | existing program gap now `2,205 B`; G6 remains inside family budget |
| Shared neutral runtime | G6 delta `0 B` | `10,501 B` | `8,192 B` | existing program gap `2,309 B`; no G6 selector or behavior |

Canonical, Webflow and Shopify Marketing CSS share SHA-256
`18302e10dba0a92034205b38c2de4043c7d23e84587c3be9d59197741805a3e6`.
The permanent Marketing ceiling was not raised.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced and zero G6 runtime. |
| Webflow | Source-identical CSS; CMS/current provider records, accessible names and licensed assets remain target-owned. |
| Shopify theme | `shopify-maturity-v1` implemented/ready snippet using supplied/current enabled types, localized label and official SVG output; zero G6 script. |
| Shopify Checkout UI Extension | Documented composition of target `PaymentIcon` items with `type`/`accessibilityLabel` inside target layout; not copied into the base. |
| React / Angular | Documented thin native-list wrapper receiving current target items/components; no provider SDK in the neutral contract. |
| Figma | Planned; registered nodes `943:7` and `1020:480` are generic Button/Studio evidence, not G6 visual or brand approval. |
| SwiftUI / Compose | Documented passive wrapping collection with target-native images/accessibility labels and target-owned provider data/assets; planned. |

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npx tsc --noEmit` from `site/`
- `npm run build:components`
- `npm run build:adapter:web:components`
- `npm run build:adapter:shopify:components`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- `npm run audit:previews:static`
- Chromium paired viewports, native semantics/accessibility snapshot, direct
  roots, Default/Small, one/three/eight mixed-aspect marks, optional/localized
  label, effective-200% scaling, light/dark contrast, hover, forced colors,
  reduced motion, exact DOM/computed/relative-rectangle/opaque-pixel parity and
  console audit
- source/generated identity, deterministic gzip, `git diff --check`, evidence
  cleanup and tracked `site/dist` verification

## Human Review Queue

1. Approve or revise Default/Small mark height, density, root/item alignment,
   gap, wrapping, maximum recommended count and placement in footer/product/cart/
   checkout compositions.
2. Choose and approve production asset sources, licensing/update ownership,
   accessible method wording and per-brand color/clear-space rules for each
   target; the neutral contract intentionally carries no universal brand enum.
3. Approve or replace the clearly illustrative Example card/wallet/bank fixture;
   it is not a claim of payment availability or production brand artwork.
4. Supply corrected G6-specific Figma/reference evidence; current registered
   nodes show the generic Button detail/Studio shell.
5. Review the existing total Web CSS/runtime program gaps separately; G6 stays
   inside its Marketing ceiling and adds no neutral runtime.

## Readiness

`human-review-ready`: semantic implementation, cross-target translation,
responsive/content/accessibility evidence, documentation and automated gates
are complete. Explicit human visual/reference/brand approval remains pending.
The contract remains `pilot`; no `stable` promotion was made.
