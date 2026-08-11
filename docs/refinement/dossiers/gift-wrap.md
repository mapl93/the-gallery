# Component Dossier: Gift Wrap Option

Status: `human-review-ready`

Target under review: Neutral Web gift-wrap choice and Shopify dedicated
sellable-line translation

Contract: `components/contracts/gift-wrap.contract.json`

## Recommendation

Define Gift Wrap Option as one native Checkbox label with required positive
option text and an optional complete canonical Price. Keep initial static Web
selection native/uncontrolled and allow stateful adapters to control the live
checked property through the native event. Keep the base runtime at zero.

Owner-selected K11-A and ADR 0257 choose one order-level sellable gift-wrap line
backed by a dedicated target product or variant at quantity one. The target
owns eligibility, merchandise configuration, mutation, price/tax/inventory/
fulfillment policy, totals, feedback, and focus, and reconciles Checkbox state
from the authoritative cart snapshot after every request. A truthful zero price
remains visible through canonical Price.

The neutral composition remains independent of that Shopify data model and at
zero runtime. The accepted commercial boundary allows K11 to enter human review
while contract maturity remains `pilot`; live target proof and explicit visual
review are still required before target readiness or `stable` promotion.

## Purpose And Limits

- Lets a buyer request an optional gift-wrapping service associated with a cart
  or order under a target-defined commercial model.
- Presents one binary choice and, when supplied, one target-formatted surcharge.
- Composes complete Checkbox and Price contracts rather than copying their
  state, indicator, keyboard, formatting, or accessibility behavior.
- Is not a gift message, wrapping-style selector, recipient form, product
  configurator, quantity control, cart store, inventory service, price engine,
  request client, Status, or analytics owner.
- Does not calculate whether wrapping is free, taxable, shippable, or
  inventory-backed. The accepted target model is one explicit order-level
  sellable line; its configured merchandise supplies those facts.
- Does not decide merchant availability, cart placement, default selection,
  optimistic behavior, error policy, or Cart Drawer parity.

## Repository Baseline Before Refinement

- Registry K11 depended only on Checkbox, claimed an optional message field
  that did not exist, and omitted the already-rendered Price dependency.
- Contract `0.1.0`, `pilot`, had five anatomy parts, one state, two behaviors,
  four properties, and five public visual token references. It represented
  price as an arbitrary formatted string and omitted name/value from its public
  properties while listing them as behavior attributes.
- Exhibit used a `div.gift-wrap` containing a nested Checkbox label and a
  separate price. Studio instead made the root itself a Checkbox label, wrapped
  the input in another span, and nested label/price under a different anatomy.
- Neither surface consumed canonical Price markup. Studio had no native name or
  value, so it could not demonstrate successful FormData behavior.
- CSS duplicated canonical Checkbox flex/gap/control shrinking, used physical
  `12px`/`16px` spacing and margin, and used a calculated font size for price.
- The disabled state was only projected to the input in Studio; contract state
  and responsive/content matrices were absent.
- Shopify had copied CSS only. There was no Liquid, data mapping, mutation,
  total synchronization, editor configuration, or invocation; its manifest
  correctly remained planned.
- Existing Mobile/Desktop screenshots showed broad registration only. They did
  not cover Tablet/XL, long/localized/empty content, narrow containers, native
  FormData/reset, selected/disabled/focus, dark, forced colors, reduced motion,
  effective 200 percent, or mutation failure ownership.
- Studio references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and
  inspector `1020:480`. Direct inspection resolves both to the generic Button
  Component Detail/Studio shell, not K11 artwork or owner approval.
- Deterministic level-9 baseline: K11 slice `587 B` raw / `323 B` gzip, Cart CSS
  `15,976 B` raw / `3,057 B` gzip against the permanent `3,072 B` ceiling, Web
  component CSS `506,655 B` raw / `67,991 B` gzip, and shared runtime `53,811 B`
  raw / `10,501 B` gzip. K11 adds no neutral runtime.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML Checkbox state](https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)) | Native checkbox checkedness is the two-state value owner; the checked content attribute initializes default checkedness and the live IDL property changes through user interaction. | Static Web should preserve native uncontrolled checkedness after initialization instead of synchronizing a parallel data class. |
| [HTML Label](https://html.spec.whatwg.org/multipage/forms.html#the-label-element) | A wrapping label associates its first labelable descendant and gives the platform a complete activation relationship. | Make `.gift-wrap.checkbox` the one wrapping label and keep non-interactive visible content inside it. |
| [WAI-ARIA APG Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) | Space toggles a focused checkbox and every checkbox needs an accessible label; extra descriptive text can be referenced. | Reuse native Checkbox behavior and expose `describedBy` for target explanations rather than replacing native semantics. |
| [Open UI Checkbox](https://open-ui.org/components/checkbox/) | Checkbox research separates checked, indeterminate, disabled, label, indicator, form behavior, input/change, and custom label content. | K11 should compose the established Checkbox parts and own only the commerce arrangement. |
| [Radix Checkbox](https://www.radix-ui.com/primitives/docs/components/checkbox) | Mature API separates default/live checked, change, disabled, required, name, and value with controlled/uncontrolled support. | Keep initial versus live ownership explicit and re-expose only stable native form properties relevant to K11. |
| [Polaris Checkbox](https://polaris-react.shopify.com/components/selection-and-input/checkbox) | Label is required, disabled maps natively, help text is descriptive, and selection is controlled through a callback. | Keep a visible positive label, external explanation, and target reconciliation without creating K11-specific validation. |
| [Shopify cart template](https://shopify.dev/docs/storefronts/themes/architecture/templates/cart) | Cart attributes use `attributes[...]` in the cart form, while line-item properties originate with product addition and can split otherwise-identical lines. | Shopify has multiple valid data models; a generic checked input cannot safely select among them. |

The sources agree on native binary ownership, required labeling, and clear
controlled/uncontrolled translation. They do not establish one universal
commerce persistence or pricing model for gift wrapping.

## Matches, Differences, And Direction

- ADR 0077 already leaves cart mutation and totals to the target. K11 now makes
  that boundary executable rather than implying a generic form name is enough.
- Root combines `.gift-wrap` and canonical `.checkbox`; control is the canonical
  native input, and `.gift-wrap__info` is the canonical label part.
- `price` becomes an optional slot containing canonical Price. Absence omits the
  wrapper and carries no free-price claim.
- `name` and `value` are stable native pass-throughs but receive no K11 default
  business meaning. The target model supplies them only when appropriate.
- `selected` means initial native checkedness in static markup. React, Angular,
  Hydrogen, SwiftUI, or Compose may bind live state and change callbacks.
- A blank label is invalid and omits the renderer; disabled explanations remain
  external and may be referenced by `describedBy`.
- No K11 public visual tokens remain. Padding, border, label weight, and compact
  contextual Price treatment are private composition of existing semantics.

## Candidate Anatomy And Composition

| Part | Required | Semantic element/canonical composition | Owner |
| --- | --- | --- | --- |
| Root | yes when valid | `label.gift-wrap.checkbox` | K11 arrangement / Checkbox activation |
| Control | yes | `input.checkbox__input[type=checkbox]` | Checkbox/native form |
| Info | yes | `span.checkbox__label.gift-wrap__info` | Checkbox label/K11 flow |
| Label | yes | `span.gift-wrap__label` | K11 localized content |
| Price | no | `.gift-wrap__price` containing one complete `.price` | Price/target formatter |
| Result Status | outside K11 when needed | contextual target status | target cart lifecycle |

## State, Variant, Size, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One neutral optional gift-wrap choice; no validation variant is inferred. |
| Size | One intrinsic container-responsive profile; Checkbox retains its one accepted control size. |
| Selection | Unchecked or checked; static Web initializes then remains native/uncontrolled, stateful adapters may control. |
| Availability | Enabled or native disabled, including checked-disabled; omission is preferred when no explanation is useful. |
| Price | Canonical Price present or omitted; omitted does not imply free. |
| Target request | Idle, pending, confirmed, failed, retrying are target states outside K11. |
| Content | Required short/long/localized/mixed-direction label; optional long currency/locale Price; blank label omits root. |
| Environment | Mobile/Tablet/Desktop/XL, 200px container, effective 200% scale, light/dark, RTL, forced colors, reduced motion, keyboard-only. |

Invalid combinations include blank label, price-only naming, multiple native
inputs for one K11, interactive descendants inside the wrapping label, a
noncanonical price string, disabled without necessary explanation, optimistic
checkedness presented as confirmed after failure, duplicate live regions, or a
Shopify control that submits a value but performs no intended commercial work.

## Public API And Ownership

- `label` — required non-empty localized visible option label.
- `selected` — optional `false`; initial native checkedness in static Web or
  target-controlled live selection in stateful adapters.
- `price` — optional complete canonical Price slot.
- `name` — optional target-selected native form field name.
- `value` — optional native successful value, default `on`.
- `disabled` — optional `false`; native Checkbox unavailability.
- `describedBy` — optional ID reference to external target-owned explanation.

The target owns availability, placement, selected default policy, persistence
model, actual money, inventory/tax/fulfillment, request timing, optimistic versus
confirmed UI, cancellation, retry, error/status/focus, totals, stale responses,
cart refresh, analytics, checkout display, and Cart Drawer parity.

## Token, Hardcoded Value, And Runtime Audit

- K11 exposes zero independent public visual tokens. Checkbox and Price retain
  their own public token contracts.
- Replace physical margin/gap/padding and calculated type size with logical
  existing semantic spacing and stable Body Small composition.
- Keep one native `1px` border as ordinary component geometry; padding, label
  weight, price tone, and spacing remain private composition.
- Neutral runtime budget is `0 B`. K11 adds no listener, observer, timer,
  request, service, asset, icon, formatter, or live region.
- Cart CSS must remain at or below `3,072 B` gzip. The current permanent audit
  measures Cart at `3,057 B`, leaving `15 B` headroom; K11 remains `579 B` raw /
  `326 B` gzip and neutral runtime remains zero.
- Shopify's conditional target-only coordinator is `6,582 B` raw / `2,211 B`
  gzip. It does not enter the neutral shared runtime and loads only when the
  feature and dedicated product are configured.

## Responsive And Evidence Requirements

- Use intrinsic flow with control aligned to the first label line and label/Price
  content able to wrap; no viewport breakpoint is required.
- Test unchecked, checked, click/Space, focus, disabled, checked-disabled,
  FormData present/absent, reset, price present/absent, blank label omission,
  long/localized/unbroken content, RTL, 200px, effective 200%, dark, forced
  colors, reduced motion, and zero internal live regions.
- Capture exact Exhibit/Studio composition at Mobile, Tablet, Desktop, and XL,
  plus selected, focus, disabled, no-price, narrow RTL, dark, forced colors,
  reduced motion, and effective 200 percent.

## Cross-Target Translation

| Target | Mapping | Status/gap |
| --- | --- | --- |
| Neutral Web | Wrapping native Checkbox label plus optional canonical Price. | Implemented with zero K11 runtime; target owns commercial mutation and results. |
| Shopify | Global opt-in plus dedicated single-variant product, target-native Liquid, canonical Price, and Ajax Cart coordinator mapping selected state to one line at quantity one. | Implementation candidate exists; live configuration, eligibility, Cart Page/Drawer refresh, policy, errors, focus, and editor proof remain required. |
| Webflow / Framer | Copied CSS/native checkbox plus target form or event integration. | CSS/static semantics available; meaning and persistence require configuration. |
| React / Angular / Hydrogen | Controlled or uncontrolled Checkbox composition with optional canonical Price; target mutation outside K11. | Contract-ready; no framework dependency in base source. |
| Figma | Canonical Checkbox and Price instances with selected/disabled profiles. | Planned; registered generic Button shells are not K11 artwork or approval. |
| SwiftUI / Compose | Native toggle/checkbox row with target-formatted price content. | Conceptual; commercial state and results remain application-owned. |

## Residual Risks, Target Proof, And Alternatives

1. The merchant must configure and maintain a dedicated Shopify product with
   exactly one variant and the intended channel visibility, Price, inventory,
   tax, shipping, fulfillment, refund, discount, and localization rules.
2. Human review must approve border, padding, label/price hierarchy, checkbox
   alignment, disabled treatment, cart placement, and the neutral candidate
   without component-specific Figma artwork.
3. Product policy still owns eligibility for empty carts, digital-only or mixed
   carts, default selection, service deletion, whether wrapping can be free,
   and whether style/message choices become separate future components.
4. Shopify must prove live section/Cart Drawer refresh, pending,
   error/retry/status/focus, stale requests, total updates, line removal,
   analytics, and cross-surface reconciliation.
5. External cart mutations could create duplicate or quantity-above-one service
   lines. The target UI suppresses quantity editing and the coordinator
   normalizes on selected requests, but production policy must also guard
   external integrations.

The owner selected the dedicated sellable-line alternative because it makes
price, tax, discounts, refunds, fulfillment, and checkout explicit. A cart
attribute remains unsuitable for a priced service, and per-line properties
express item-level rather than order-level wrapping. Targets without an
equivalent accepted model should omit K11 rather than silently substitute one.

## Implementation Outcome

Implemented as contract `0.2.0`, canonical Checkbox root/control/label
composition, optional canonical Price slot, native name/value/describedBy,
strict blank-label omission, zero K11 public visual tokens, and zero neutral
runtime. Exhibit fallback and Studio render the same source-order anatomy and
fixture; standalone Checkbox Studio now also consumes the extracted canonical
Checkbox artwork.

Final neutral browser evidence, generated adapter identity, detailed
performance, and matrix reconciliation were recorded in Batch 92. Batch 141 and
ADR 0257 reconcile owner-selected K11-A, advance the contract to `0.3.0`, and
add the Shopify dedicated-product snippet, settings, line-quantity boundary,
localized feedback, and authoritative Ajax cart coordinator. K11 is now
`human-review-ready`, not `stable`; Shopify remains non-target-ready until live
commerce and cart-surface proof exists. Official Theme Check passes the seven
changed theme files, and the final isolated target runtime proof covers add,
idempotency, removal, duplicate/quantity normalization, pending, authoritative
rollback, visible failure, focus recovery, and two-surface reconciliation with
zero failures or browser leaks.
