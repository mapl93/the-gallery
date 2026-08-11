# Component Dossier: Price

Status: `human-review-ready`

Target reviewed: Neutral Web and Shopify price snippet

Contract: `components/contracts/price.contract.json`

## Recommendation

Keep Price as a passive, target-formatted commerce primitive. The target owns
amounts, currencies, locale, rounding, ranges, tax display, selling plans, live
updates, and structured commerce data; Price owns only stable display anatomy,
typographic treatment, bidirectional isolation, and the semantic distinction
between current, compare-at, and unit-price text.

Replace the optional named ARIA group with localized part labels in DOM content.
Render the no-longer-current compare-at value with native `s`, isolate each
formatted value with `bdi`, and leave live-region ownership to the changing
product or cart surface. Preserve ADR 0061's five independent OpenType switches.
The `on-sale` variant is coherent only when both a current value and a higher
target-validated compare-at value are supplied; Price does not calculate or
verify the discount.

## Purpose And Limits

- Presents one already-formatted payable price.
- Optionally presents one already-formatted compare-at price and one complete
  already-formatted unit-price string.
- Makes sale meaning available as localized text rather than color or strike-
  through alone.
- Remains legible for long currencies, ranges, compact locales, RTL content,
  narrow containers, zoom, dark mode, and forced colors.
- Is not a money formatter, arithmetic service, discount calculator, tax or
  duty disclosure, inventory status, selling-plan selector, price table,
  structured-data generator, or live-region controller.
- Does not decide whether a price is free, unavailable, estimated, starting-at,
  per-period, inclusive/exclusive of tax, or legally sufficient for a market.
  Targets author those complete localized strings and adjacent disclosures.

## Gallery Baseline Before This Batch

- Registry `A9`, Primitives, no dependencies; contract `0.3.0`, `pilot`.
- Canonical anatomy is root, required current, optional compare, and optional
  unit. Default and `on-sale` are the only variants; one default size and one
  passive state are declared.
- CSS uses an inline flex row, an un-tokenized `8px` gap, H4/body size aliases,
  inherited line height, primary/disabled/secondary colors, and private
  OpenType variables. It does not bound or wrap extreme localized content,
  isolate mixed-direction values, or define forced-color behavior.
- The compare-at element is a generic `span` with visual line-through. Sale
  meaning depends on an optional `role="group"` plus aggregate `aria-label`, even
  though `group` normally describes related UI objects and generic spans cannot
  be named consistently without changing role.
- Studio and Exhibit already share `PriceStudio` and one initial fixture. The
  fixture emits every OpenType attribute, but optional empty content, ranges,
  RTL, semantic `s`, localized part labels, and container overflow are untested.
- Shopify has a dedicated snippet, but its unit string manually concatenates
  only `reference_unit`; it omits reference values such as `100 g` and bypasses
  Shopify's localized `unit_price_with_measurement` filter. Price labels are not
  present in the current English or Spanish locale files.
- Deterministic level-9 gzip baseline is Primitives `10,356 B`, complete Web
  component CSS `64,392 B`, and shared runtime `10,321 B`. Primitives has only
  `191 B` before its provisional `10.3 KiB` ceiling; neutral runtime delta must
  remain `0 B`.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `s` element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-s-element) | `s` represents content that is no longer accurate or relevant; the standard's example is an old retail price replaced by a sale price. | Use native `s` for compare-at content instead of expressing the meaning through CSS on a generic span. |
| [ECMA-402 `Intl.NumberFormat`](https://tc39.es/ecma402/#numberformat-objects) | Locale, currency display, numbering system, grouping, sign, precision, rounding, and unit formatting are formatter concerns. | Preserve complete target-formatted strings; do not add raw amount/currency parsing or a web formatter to the primitive. |
| [WAI-ARIA APG pattern index](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines interactive widgets and landmarks; it has no Price pattern. | Price needs ordinary readable HTML, no widget role, focus model, keyboard model, or component-owned live region. |
| [ARIA generic role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/generic_role) and [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label) | Generic spans are nameless; `aria-label` support is strongest on interactive/landmark/widget roles and should not replace useful DOM text. | Prefer localized hidden part labels in content over changing a passive price into a named ARIA group. |
| [WCAG 2.2 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) | Meaning conveyed visually needs a non-color cue and programmatic information is covered by structure/name/value criteria. | Retain visual strike-through but add localized Regular/Sale/Unit price text for assistive technology. |
| [Shopify unit pricing](https://shopify.dev/docs/storefronts/themes/pricing-payments/unit-pricing) and [`unit_price_with_measurement`](https://shopify.dev/docs/api/liquid/filters/unit_price_with_measurement) | Shopify provides product measurement data and a filter that localizes the complete unit-price expression. | The Shopify adapter should use the platform filter instead of manually joining money and `reference_unit`. |
| [Shopify Dawn Price](https://github.com/Shopify/dawn/blob/main/snippets/price.liquid) | Mature storefront markup uses localized hidden Regular/Sale labels, native `s`, target money filters, ranges, and a separate unit-price render. | Adopt the semantic parts, not Dawn's large product/variant/badge/volume-pricing API or visual identity. |
| [Shopify Hydrogen Money](https://shopify.dev/docs/api/hydrogen/components/money) | A framework adapter formats Storefront API money using provider locale. | React/Hydrogen may supply formatted content through target services while Gallery Price remains formatter-agnostic. |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix focuses on behavioral widgets documented by ARIA patterns and does not define a standalone commerce Price primitive. | Do not manufacture controlled state or headless-widget behavior for passive price text. |

Open UI, APG, Radix, and current Polaris component catalogues do not establish a
cross-platform Price widget. Shopify's storefront and Hydrogen implementations
are the more pertinent mature-system evidence, while the HTML and formatting
standards define the portable boundary.

## Matches, Differences, And Direction

- Gallery already separates formatted content from visual presentation and has
  a dedicated Shopify snippet plus target status in the contract.
- ADR 0061 explicitly accepts five OpenType switches; refinement must preserve
  them rather than recasting glyph features as tokens or private hardcoding.
- The current aggregate `accessibleLabel` can clarify sale meaning, but it
  requires an artificial group role and can replace rather than complement the
  visible child content in accessibility APIs.
- Native `s` plus localized part labels creates stable meaning in content order,
  works without ARIA, and translates to target accessibility text on native
  platforms.
- Current unit-price Liquid is incomplete for measurements whose reference value
  is not one. The official Shopify filter is both more correct and more localizable.
- Direction: passive native text, semantic compare-at markup, per-part labels,
  target formatting, value isolation, resilient wrapping, zero runtime.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | generic inline container | Price | No widget/group/live role by default. |
| Current label | no normally; required for sale explanation | visually hidden text | target | Localized `Price` or `Sale price`; ordinary content, not an accessible name override. |
| Current value | yes | generic text + `bdi` value | Price/target | Complete payable string; may include `From`, a range, or currency code. |
| Compare-at label | required when compare-at is rendered | visually hidden text | target | Localized `Regular price` or equivalent. |
| Compare-at value | optional | native `s` + `bdi` value | Price/target | Omitted outside coherent sale composition. |
| Unit label | recommended when unit is rendered | visually hidden text | target | Localized `Unit price`. |
| Unit value | optional | generic text + `bdi` value | Price/target | One complete target-formatted price/measurement string. |

The component does not depend on Badge for Sale/Sold out, Button, Product,
structured data, or a formatter. Those are parent compositions or target services.

## Variant, State, Size, And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | Default current price; On sale current + compare-at. No sale color-as-error. |
| Size | One responsive default. Parent components may establish surrounding hierarchy; no v1 compact/large API. |
| State | Passive only. Dynamic price changes and announcements belong to the owning product/cart region. |
| Optional anatomy | Current only; current + unit; sale current + compare; sale current + compare + unit. |
| Formatted content | Symbol, ISO code, prefix/suffix currency, no-decimal currency, range/from text, free/unavailable text, long localized qualifier. |
| Direction | LTR, RTL, Arabic digits, and mixed-direction currency/code strings isolated per value. |
| Environment | Light, dark, forced colors, reduced motion (no motion), 200% zoom, narrow container. |
| OpenType | Independent alternate digits, slashed zero, tabular numbers, contextual alternates, and opt-in fractions per ADR 0061. |

Invalid/incomplete combinations are `on-sale` without compare-at, compare-at in
Default, empty required current content, unlocalized labels, or a target claiming
a discount without validating its commerce data. Studio should expose empty
strings as stress evidence rather than silently repair them.

## Public API And Ownership

- `currentPrice` — required complete target-formatted current text.
- `currentPriceLabel` — optional localized part label; required by usage guidance
  when the meaning is not clear from adjacent context and for on-sale composition.
- `compareAtPrice` — optional complete target-formatted previous price; rendered
  only with `on-sale`.
- `compareAtPriceLabel` — localized label required when compare-at renders.
- `unitPrice` — optional complete localized unit-price expression.
- `unitPriceLabel` — optional localized Unit price label, recommended whenever
  unit content is rendered.
- `variant` — Default or On sale; target owns the truth of the relationship.
- `alternateDigits`, `slashedZero`, `tabularNumbers`,
  `contextualAlternates`, `fractions` — accepted ADR 0061 typography switches.

Remove aggregate `accessibleLabel` from the pilot API after replacing it with
part labels; it is less composable, requires a role solely to receive a name, and
cannot independently preserve current/compare/unit meaning. No raw amount,
currency, locale, discount percentage, range endpoints, tax flag, availability,
announcement, or controlled/uncontrolled value is added.

## Token And Value Audit

- The refined public set uses primary and secondary text colors, body family,
  and the existing H4/body/body-small size and line-height pairs. Disabled and
  feedback colors are no longer part of Price's public contract.
- No Price-specific token was introduced.
- Current/compare/unit weights, `8px` inline gap, wrapping row gap, strike
  thickness, and BDI/hidden-label mechanics remain private composition.
- The on-sale modifier explicitly reasserts the private current-color mapping so
  the target variant remains observable to validation without adding a new color
  or public token.
- Do not expose gap, font weight, strike style, line-height choice, wrapping,
  label hiding, BDI, part order, or forced-color mapping in Studio.

## Visual, Accessibility, Responsive, And Runtime Direction

- Preserve current price as the strongest item, compare-at as secondary struck
  text, and unit price as supporting text. Exact type weight, gap, strike weight,
  order, wrapping rhythm, and color strength require human visual approval.
- Give every textual part `min-inline-size: 0`, safe wrapping, and logical sizing;
  keep the root within its container without truncating legally meaningful text.
- Use `bdi` around target-formatted values while localized labels follow the
  surrounding language direction.
- Use native `s` and hidden text labels; do not add focus, keyboard, `group`,
  `status`, or `aria-live` semantics to the passive primitive.
- When a target updates a price after variant/cart interaction, the owning region
  decides status timing, deduplication, and focus. A static Product Card price
  must not announce itself.
- There is no animation, pointer target, asset, listener, observer, timer,
  formatter, request, measurement loop, or neutral component JavaScript.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Generic root, localized hidden labels, native `s`, isolated `bdi` strings, canonical CSS. | Implemented and browser-evidenced with zero neutral runtime. |
| Shopify | Product/variant money filters, locale keys, native `s`, official unit-price filter, optional snippet label overrides. | Implemented with English/Spanish labels and corrected unit measurement; update announcements remain parent-owned. |
| React / Angular | Receive already formatted strings or compose a target formatter/provider; render equivalent semantic parts. | Planned; formatter/provider API and structured data are adapter decisions. |
| Figma | Current/compare/unit content, Default/On sale and OpenType presentation controls. | Studio reference exists; visual approval pending. Figma does not own locale formatting. |
| SwiftUI / Compose | Target-formatted text runs with accessibility labels/combined reading order; compare styling is visual plus explicit localized wording. | Planned; platform currency formatters and announcements stay target-native. |

## Exhibit And Studio Parity

`PriceStudio` is the registered renderer for both modes. It must keep one fixture,
one canonical Price render function, identical part order, labels, OpenType
attributes, token overrides, and optional-element rules. MDX Preview remains
fallback evidence and must use the same semantic anatomy.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Compare-at meaning is CSS-only and uses a generic span. | high | Use native `s` plus localized Regular price text. | implementation/contract |
| Aggregate label requires an artificial named group. | high | Replace with localized part-label properties and ordinary DOM text. | component contract |
| Mixed-direction formatted strings are not isolated. | high | Wrap each value in `bdi`; test Arabic/ISO-code combinations. | implementation |
| Long/range/unit content can overflow and lacks explicit line height. | high | Add bounded wrapping and semantic type pairs without a new size API. | implementation |
| Shopify unit pricing drops reference values/localization. | high | Use `unit_price_with_measurement` and locale-backed labels. | Shopify adapter |
| Dynamic announcement ownership is undefined. | medium | Document parent/target ownership; Price stays passive. | architecture boundary |
| OpenType switches look detailed but are explicitly accepted. | preserved decision | Keep ADR 0061 exactly; do not expand to arbitrary feature tags. | accepted ADR |
| Type hierarchy, weights, order, spacing, strike and colors lack approval. | human review | Preserve a restrained candidate and capture complete evidence. | owner |

## Risks And Open Questions

1. The owner must visually approve current/compare/unit hierarchy, `8px` gap,
   weights, strike treatment, color strength, wrapping, and compare/current order.
2. Market-specific tax, duty, legal unit-pricing, currency-code, price-range,
   financing, subscription, deposit, and sale-claim requirements remain target
   content policy; they are not inferred as Price variants.
3. Dynamic Product Info and cart adapters must decide their announcement region
   and update cadence. A `role="status"` on every passive Price would be noisy.
4. Shopify product-wide versus selected-variant pricing and volume breaks require
   a separate adapter API review; this batch must not copy Dawn's full API by
   assumption.
5. If future design calls for selectable currencies or pricing tiers, those are
   controls/tables composed around Price, not additional passive states.

## Verification Result

- Contemporaneous before images preserve Exhibit and Studio desktop baseline;
  after images cover both modes at 390/768/1280/1600 plus current-only, Arabic
  RTL/range, dark, forced-colors, reduced-motion, and 200% zoom probes.
- The accessibility snapshot exposes localized part text, native `s`, and BDI
  values with no widget/group/live role or interactive descendant. Exhibit and
  Studio outer markup is exactly identical.
- At 390px the long RTL root is `326/326px` client/scroll width. At 200% CSS zoom
  Price is `258/258px` and the document `800/800px`; neither overflows.
- Light contrast is `17.93:1` current and `7.81:1` supporting; dark is
  `17.18:1` and `12.09:1`. Forced colors uses CanvasText and preserves the native
  line-through. No animation or transition remains under reduced motion.
- All five OpenType switches independently update their data attributes and
  computed feature settings. Default and current-only optional composition are
  verified; empty required current remains an explicit invalid authoring case.
- Shopify label/unit output, 183 contracts/Studio entries, docs, Neutral Web,
  Shopify, static previews, component/parity/refinement audits, TypeScript,
  temporary Vite build, deterministic gzip, copy identity, diff checks, console,
  and `site/dist` cleanliness pass in Batch 23.
