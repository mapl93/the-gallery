# Component Dossier: Payment Icons

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation and future-target boundary

Contract: `components/contracts/payment-icons.contract.json`

## Recommendation

Keep G6 as a passive native unordered list of target-supplied recognized
payment-method marks. Every valid item requires one informative mark with a
brief accessible payment-method name. Omit invalid items and omit the complete
root when no valid mark remains. Expose an optional localized list label and a
semantic `size` choice (`default` / `sm`); keep exact geometry and wrapping
private.

Remove the current hover-only reveal, grayscale filter, reduced opacity and
transition. A passive mark is not a control and should not change as if it were
actionable. Target/provider brand assets must retain their approved treatment
instead of being recolored or suppressed by canonical CSS.

Keep the target-agnostic contract asset-library-neutral. The first-party site
fixture should use clearly identified illustrative placeholders rather than
fake or bundled brand artwork. Production Web/React/Webflow targets supply
approved assets and names. Shopify should consume
`shop.enabled_payment_types` and `payment_type_svg_tag` in a dedicated snippet,
so current region/currency/provider data and official SVG output stay native to
that target.

## Purpose And Limits

- Presents a compact wrapping list of payment-method brands that the current
  target is prepared to advertise in the surrounding context.
- Owns native collection/item anatomy, mark placement, Default/Small size and
  intrinsic wrapping.
- Requires each mark to expose the payment-method name through native `alt`,
  SVG image naming, a target component `accessibilityLabel`, or an equivalent
  target-native mechanism.
- May receive an optional localized accessible label for the complete list when
  surrounding visible context does not already name it.
- Does not own provider configuration, eligibility, region, currency, checkout
  state, saved instruments, authorization, availability guarantees, ordering,
  brand-asset licensing, localization or publication.
- Does not bundle or synthesize payment logos, infer acceptance from a static
  catalogue, or claim that every displayed method is available to every buyer.
- Does not own links, selection, focus, hover behavior, tooltips, disclosure,
  live status, events, controlled state, analytics, network requests or runtime.
- Is not generic Icon, Badge, Trust Badges, a payment selector, a saved-card
  record, a checkout payment-method listbox or a provider SDK surface.

## Current Repository Baseline

- Registry identity `G6`, category `marketing`, dependency depth `0` and review
  order `89`; no dependencies.
- Contract `0.2.0`, `pilot`: root/raster/vector anatomy, one Default variant and
  size, passive/default plus pointer-only hover states, `icons` slot and a
  boolean `small` workaround.
- The renderer and MDX use `div role=list` with anonymous `span role=listitem`
  children. Native `ul`/`li`, item anatomy and strict empty omission are absent.
- The required Studio icons control can produce an empty named list because the
  renderer does not guard `icons !== true`.
- `aria-label="Accepted payment methods"` is hardcoded in English while the
  contract exposes no root accessible-label property.
- The site fixture draws generic rectangles with text but labels them Visa,
  Mastercard and American Express. They are not official brand assets, are not
  marked as illustrative, and visually imply a brand treatment the repository
  does not own.
- Canonical CSS applies `opacity:.5`, `grayscale(1)`, hover restoration and a
  timed transition to every image/SVG. This makes a passive collection look
  interactive, weakens default legibility and overwrites target brand artwork.
- Default `24px`, Small `18px` and `8px` gap are hardcoded. The sizes are stable
  private outcomes of a useful semantic size choice; the gap can map to an
  existing spacing token/private ratio.
- The public `small` boolean represents a size dimension that other Gallery
  components model as the `size` enum. Registry and contract currently omit the
  existing `.payment-icons--sm` size from their shared size list.
- The reduced-motion media block disables the transition, but a passive
  component should author no transition in any mode.
- No G6 selector or behavior exists in `components/js/theme.js`; the component
  correctly has no neutral runtime, component asset or request.
- Shopify has copied Marketing CSS only. It has no dedicated Liquid mapping to
  `shop.enabled_payment_types` or `payment_type_svg_tag`; contract status is
  `planned`.
- Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame
  `943:7` and inspector `1020:480`. These are the generic Button/Studio shell,
  not G6 mark, spacing, size or brand evidence.
- Existing before evidence covers Exhibit and Studio at Mobile and Desktop in
  `output/playwright/parity/marketing/payment-icons-*.png`.
- The baseline is extremely low-contrast: tiny gray placeholder text in muted
  rectangles. Its alignment, size, gaps and three-mark selection are
  implementation proposals rather than owner-approved brand presentation.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML grouping content](https://html.spec.whatwg.org/dev/grouping-content.html) | `ul` represents an unordered list and its items are direct `li` children. | Use native collection semantics without a custom list widget. |
| [WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/) | Informative images require a short text alternative; decorative images use null alternatives; images of essential logo text need equivalent wording. | Every standalone payment mark needs its method name; duplicate decoration is a different contextual composition. |
| [APG pattern inventory](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines interactive widgets, not a passive Payment Icons pattern. | Add no listbox/menu/toolbar role, focus, keyboard commands or live behavior. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | Mature-system inventories contain Icon/Image/List but no standardized payment-mark collection. | Keep G6 a narrow native composition rather than claiming a web-platform widget. |
| [Radix Accessible Icon](https://www.radix-ui.com/primitives/docs/utilities/accessible-icon) | Radix requires a `label` for an icon that conveys meaning. | Require a brief accessible method name per mark; do not import React runtime or its wrapper into the base. |
| [Shopify Payment Icon](https://shopify.dev/docs/api/checkout-ui-extensions/2025-10/web-components/media-and-visuals/payment-icon) | Shopify separates brand `type` and `accessibilityLabel`, and composes rows through Stack/layout. | Target items own brand identity/name while G6 owns the list/layout; a root brand catalogue is not public base API. |
| [Shopify `shop.enabled_payment_types`](https://shopify.dev/docs/api/liquid/objects/shop#shop-enabled_payment_types) | Accepted types reflect enabled providers plus the current customer's region and currency. | Shopify must derive current marks from target data rather than static theme settings. |
| [Shopify `payment_type_svg_tag`](https://shopify.dev/docs/api/liquid/filters/payment_type_svg_tag) | The filter generates official SVG output and accepts a CSS class. | A Shopify snippet can map official named marks directly to `.payment-icons__mark`. |

No APG interaction pattern applies. Payment Icons is passive informative
content, not a payment-selection widget.

## Mature-System Comparison

- HTML supplies the stable collection model: `ul`/`li` with no interactivity.
- WAI treats each method logo as informative when it is the only indication of
  method identity; a readable accessible name is therefore required.
- Radix offers a generic accessible-icon label utility, not a payment-brand
  catalogue or row. Its required label supports item-level naming but its React
  implementation is target-specific.
- Open UI has no Payment Icons component consensus. Generic Icon/Image/List
  concepts do not define provider data, brand assets or availability.
- Shopify Checkout has an individual Payment Icon (`type` plus optional/custom
  accessible label) and recommends layout composition outside the item. Liquid
  separately supplies contextual accepted types and official SVGs.
- These systems converge on target-owned brand identity/name plus a separate
  passive collection/layout, not on hover, grayscale or a shared static list.

## Owner Reference Analysis

The registered Figma frame/inspector belong to the generic Button Studio pilot.
They contain no G6 official marks, placeholder policy, item count, Default/Small
comparison, gap, alignment, brand-color treatment, footer/product placement or
dark/forced-color behavior. The four existing PNGs are implementation baseline,
not owner approval.

They show three tiny, low-contrast placeholder tiles. That baseline leaves
these human questions open:

1. final Default/Small geometry and density;
2. alignment, wrapping and maximum recommended mark count;
3. approved production asset sources and per-brand clear-space/color rules;
4. placement and surrounding visible copy; and
5. whether the docs fixture should remain neutral placeholders or receive an
   owner-provided licensed reference set.

## Anatomy And Canonical Composition

| Part | Required | Semantic element/role | Owner | Direction |
| --- | --- | --- | --- | --- |
| Root | yes | `ul.payment-icons[role=list]` | Payment Icons + target | One or more valid marks; optional localized accessible name; omit if empty. |
| Item | yes | `li.payment-icons__item` | Payment Icons + target | One independent payment method; passive and non-focusable. |
| Mark | yes | `.payment-icons__mark` as `img`, `svg[role=img]` or target-native payment icon | target | Approved recognizable brand artwork with a brief accessible method name. |

Explicit `role=list` preserves list exposure where marker removal weakens it. It
does not introduce a widget role or replace native elements.

## Variant, State, Size, Mode And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One Default visual treatment; brand artwork remains target-owned. |
| Size | `default` (`1.5rem` mark block size) and `sm` (`1.125rem`); semantic enum, exact geometry private. |
| Required content | At least one item with one recognized mark and non-empty accessible method name. |
| Optional content | Root accessible label when surrounding visible context is insufficient. |
| Empty/invalid | Omit invalid marks/items; omit the complete root when no valid item remains. |
| Interaction | None; links, selection, saved-card actions and checkout choices are different compositions. |
| Controlled/uncontrolled | Not applicable; target supplies the current set. |
| Status/live | None; presence is target-authored information, not a live announcement. |
| Hover/focus | No component visual state, focus target or pointer-only reveal. |
| Theme | Official asset treatment remains intact; canonical CSS does not recolor, grayscale or reduce opacity. |
| Forced colors | Accessible names remain; target/brand artwork may preserve essential presentation or adapt natively. |
| Reduced motion | No authored animation or transition. |
| RTL | Logical wrapping and target source order; brand artwork itself is not mirrored. |
| Responsive | Intrinsic flex wrapping from the component content box; no viewport query. |
| Extreme content | One/eight marks, mixed aspect ratios and localized accessible names do not clip the collection. |
| Text enlargement | No required visible text; browser zoom scales rem-based geometry while text-only enlargement does not create overflow. |

Invalid composition includes an empty native list, a mark with no accessible
method name, a generic non-payment icon, stale/unavailable target data, a
component-bundled unlicensed logo, focusable passive item, listbox/menu/toolbar
semantics or hover-only identification.

## Public API And Ownership

Expose three semantic decisions:

- `icons` — required target-owned repeated composition of recognized payment
  marks and accessible method names.
- `size` — Default or Small presentation density.
- `accessibleLabel` — optional localized list name when surrounding visible
  context does not already identify the methods.

Replace the boolean `small` property with the existing Gallery `size` enum
pattern before v1. Keep target brand `type`, asset URL/component, accessible
method name and current availability inside each target-owned item/slot rather
than promoting a universal brand catalogue to the root.

Do not expose count, columns, gap, alignment, wrap, grayscale, opacity, hover,
transition, brand color, SVG path, asset CDN, provider, region, currency,
eligibility, accepted/saved/used mode, active/selected state, loading, error,
event or analytics. These are private composition, target data/brand governance
or different components.

G6 has no controlled/uncontrolled strategy. React/Angular receive current
items; Shopify derives contextual types; Webflow/Figma/native targets use their
own current data/asset model. Dynamic eligibility changes are target-owned and
must not be announced merely because the passive list exists.

## Relationship To Existing Components

| Component | Selection rule |
| --- | --- |
| Payment Icons | Recognized payment-method brand marks, one accessible method name per item. |
| Trust Badges | Short text-complete commercial assurances; icons are optional and decorative. |
| Badge | One compact status/metadata label; not a brand mark collection. |
| Generic Icon | Symbolic UI cue; not a payment brand or availability statement. |
| Payment selector/provider UI | Interactive target-owned checkout choice with selection/focus/state; not G6. |

No canonical dependency is justified. Shared native list patterns do not make
Trust Badges the owner of payment-brand semantics or assets.

## Alternatives Considered

| Alternative | Assessment |
| --- | --- |
| Keep `div role=list` / `span role=listitem` | Works as ARIA fallback but adds roles where native list markup is available; reject for canonical Web. |
| Static root `type[]` brand enum | Cannot stay current across providers/regions/targets and would bundle catalogue governance into the base; reject. |
| Component-bundled official logos | Creates licensing, update, target-delivery and brand-guideline ownership the repo has not accepted; reject. |
| Visible text labels instead of marks | Robust fallback but changes the component identity; targets may choose it outside G6 when assets are unavailable. |
| Decorative-only marks | Loses method identity when no adjacent text exists; reject for canonical standalone G6. |
| Hover restoration of color/opacity | Makes passive content look actionable and hides brand treatment until pointer hover; remove. |
| Canonical Link/Button children | Changes semantics to navigation/action; compose a different target surface when needed. |
| Shopify configurable checkbox catalogue | Can become stale and ignores contextual region/currency data; prefer `shop.enabled_payment_types`. |

## Token And Hardcoded-Value Audit

| Current fact | Direction |
| --- | --- |
| `8px` root gap | Map to existing element-gap token through a private quarter-step; do not expose gap. |
| `24px` Default height | Keep as private `1.5rem` outcome of public `size=default`. |
| `18px` Small height | Keep as private `1.125rem` outcome of public `size=sm`. |
| `opacity:.5` / grayscale filter | Remove; canonical CSS must not suppress official brand treatment. |
| Hover opacity/filter restoration | Remove; passive marks have no pointer state. |
| Fast transition/easing tokens | Remove from G6; no authored motion remains. |
| Physical max width/height | Use logical block/inline sizing and stable `.payment-icons__mark` part. |

No new token or token layer is required.

## Responsive, Content And Accessibility Test Plan

- Paired Mobile `390x844`, Tablet `768x1024`, Desktop `1280x900` and XL
  `1536x960` Exhibit/Studio captures.
- Direct roots at `96`, `120`, `160`, `240`, `320`, `520` and `800px`, checking
  intrinsic wrapping, client/scroll equality, source order and item containment.
- Default and Small; one, three and eight marks; mixed aspect ratios; no root
  label; required icons locked/empty-root omission.
- Short and localized accessible names, Arabic list label, no visual text
  dependency and effective 200%/browser-zoom-compatible geometry.
- Native list/listitem plus named-image accessibility tree; zero unnamed marks,
  duplicate text, interactive roles, focusable descendants or live regions.
- Light/dark fixture legibility, forced colors and reduced motion.
- Exact normalized Exhibit/Studio DOM, computed-style and equal-width visual
  parity.
- Shopify contextual enabled-type loop, official SVG/title output, Default/Small
  class, optional localized list name, explicit empty input and zero runtime.

## Performance Budget

- Current G6 CSS slice is `477 B` raw / `284 B` gzip.
- Marketing is `4,181 B` gzip against its permanent `4.1 KiB` (`4,198 B`)
  ceiling, leaving `17 B` headroom.
- Generated Neutral Web component CSS is `68,439 B` gzip against `65,536 B`, a
  program-level `2,903 B` gap.
- Shared runtime is `10,565 B` gzip against `8,192 B`, a program-level `2,373 B`
  gap. G6 must add `0 B` runtime.
- Removing hover/filter/motion should recover family budget while adding native
  parts and logical containment. The ceiling is not raised.
- No listener, observer, timer, request, formatter, custom element, asset or
  layout read belongs to neutral G6.

## Target Translation

- Neutral Web: native optionally named list, valid passive items, informative
  target marks, semantic size, intrinsic wrapping and zero runtime.
- Shopify theme: dedicated snippet using supplied types or
  `shop.enabled_payment_types`, `payment_type_svg_tag`, localized list label,
  canonical classes and zero component script.
- Shopify Checkout UI Extension: compose target `PaymentIcon` items with
  `type`/`accessibilityLabel` inside target Stack; do not copy its web component
  into the base.
- Webflow: CMS/config-generated native list with approved assets and alt text;
  store/provider governance owns currency/region availability.
- React/Angular: thin native-list renderer receiving target items/components;
  no dependency on a payment-provider SDK in the contract.
- Figma: repeated mark slots plus Default/Small density after G6-specific owner
  references and licensed assets are available.
- SwiftUI/Compose: passive wrapping collection of target-native images with
  accessible method labels; provider data and asset delivery remain target-owned.

## Open Product And Human Boundary

This dossier intentionally does not approve:

- any payment method, provider, customer eligibility, region, currency,
  acceptance guarantee, ordering or maximum item count;
- a universal brand enum, bundled asset catalogue, CDN, licensing/update policy
  or per-brand clear-space/color rule;
- final mark height, aspect-ratio treatment, alignment, gap, wrapping,
  Default/Small distinction, placement or surrounding copy;
- official production marks in the site fixture without owner-provided/licensed
  assets and G6-specific visual evidence; or
- promotion from `pilot` to `stable`.

These are target commerce/brand facts or human visual choices. They do not
block the narrow passive structural refinement.

## Certification Plan

1. Record the native-list, informative-name, semantic-size, no-hover and
   target-brand/data boundary in an ADR.
2. Advance the contract, add item/mark anatomy, strict omission and optional
   accessible label, and replace `small` with `size`.
3. Keep Exhibit and Studio on one `MarketingStudio` renderer/fixture; use
   explicitly illustrative site-only placeholders rather than fake brand art.
4. Remove grayscale/opacity/hover/motion and add logical intrinsic containment
   while remaining under the Marketing ceiling.
5. Add a target-native Shopify snippet backed by contextual enabled payment
   types and official SVG generation.
6. Regenerate Web, Shopify and Webflow copied outputs required by source changes.
7. Capture four viewports, direct widths, sizes, item counts, semantics,
   localized labels, contrast and special modes in one managed evidence phase.
8. Validate contracts, Studio, docs, adapters, parity, budgets, cleanup and
   unchanged `site/dist`.
9. Mark `human-review-ready` only if gates pass; keep `pilot` until explicit
   human visual/brand approval.

## Implemented Result

Completed on 2026-07-16 without promoting the contract from `pilot`:

- Contract `0.3.0` now defines native root/item/mark anatomy, strict invalid-
  item/root omission, informative accessible names, optional localized list
  naming, semantic Default/Small sizing, intrinsic wrapping and target commerce/
  brand ownership.
- The shared `MarketingStudio` renderer returns no root without required marks,
  keeps the required slot checked/disabled, maps `accessibleLabel` and `size`
  directly, and uses clearly named Example card/wallet/bank placeholders rather
  than simulated production brands.
- Exhibit and Studio use the same native `ul`/`li` implementation and fixture.
  Their normalized DOM shares SHA-256
  `b8e2cbd920cb8c7f5d68522f32c5f2597415385d4f474250790611ac50e9729e`;
  isolated `520px` computed styles, part rectangles and opaque screenshots are
  exactly equal.
- Canonical CSS removes opacity, grayscale, hover and transition treatment,
  adds stable item/mark parts and logical containment, and maps spacing to the
  existing element-gap token. G6 remains passive and adds no runtime.
- Shopify now has a target-ready localized snippet backed by supplied types or
  `shop.enabled_payment_types` plus official `payment_type_svg_tag` output.
  `shopify-maturity-v1` reports the snippet ready with zero component script.
- Default/Small, Mobile/Tablet/Desktop/XL, direct `96–800px` roots, one/three/
  eight mixed-aspect marks, no label, Arabic naming, effective 200% scaling,
  native accessibility tree, light/dark, hover, forced colors and reduced
  motion passed in one managed headless session.
- Direct roots have equal client/scroll dimensions and contained descendants.
  Eight mixed-aspect marks remain contained at `96`, `160` and `320px`; the
  fixture exposes zero focusable or live descendants and every mark is named.
- Fixture current-color contrast is `17.93:1` in light and `17.18:1` in dark.
  Hover leaves color, opacity and filter unchanged; all relevant elements have
  zero transition and animation duration.
- G6 CSS is `499 B` raw / `271 B` gzip, down `13 B` gzip from baseline.
  Marketing is `4,134 B` gzip against the unchanged `4,198 B` ceiling, leaving
  `64 B`; G6 adds `0 B` runtime.
- Canonical, Webflow and Shopify Marketing CSS share SHA-256
  `18302e10dba0a92034205b38c2de4043c7d23e84587c3be9d59197741805a3e6`.
- ADR 0168 records the accepted semantic and target boundary. The certification
  report is `docs/reports/payment-icons-web-refinement-audit.md`; after evidence
  is under `output/playwright/batch86-payment-icons/after/`.
- Final mark height, density, gap, alignment, wrapping, placement, recommended
  count, official asset sources/licensing/brand rules, fixture replacement and
  corrected G6-specific owner reference remain explicitly pending human review.
