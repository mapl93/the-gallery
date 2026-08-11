# Component Dossier: Product Form

Status: `human-review-ready`

Target reviewed: Neutral Web product-purchase form and implemented Shopify native product form

Contract: `components/contracts/product-form.contract.json`

## Recommendation

Keep Product Form as a native purchase-submission boundary that composes the
canonical Variant Selector, Quantity Selector, and primary Button. On Web, the
`.product-form` root itself must be the real `form`; named child controls own
their values, validity, events, FormData, and reset. Product Form owns intrinsic
layout and the primary action's unavailable/pending projection, but does not own
a mirrored form-value object or a commerce request client.

The accepted shared product coordinator remains the only owner of selected-option
combination resolution. It maps the current option groups to one purchasable
merchandise identifier and atomically refreshes availability, quantity
constraints, Price, media, inventory, URL, structured data and one status. Native
submission is the complete required baseline. A capable target may intercept that
same valid form and FormData for Ajax, but cannot construct a parallel path.

Remove Price from Product Form. ADR 0115 already assigns one canonical Price to
Product Info and makes Product Form its sibling. Repeating Price in the form and
submit label creates two update surfaces and contradicts that accepted ownership.

Expose only stable composition and action semantics: optional Variant Selector,
optional Quantity Selector, required submit label, distinct unavailable and
pending action states, and optional target feedback content. Accelerated checkout,
and a generic supplementary-field slot are excluded from neutral v1. Selling
plans, personalization, uploads, gifts and preorder flows require separately
accepted canonical compositions. The target owns any optional Ajax result
lifecycle.

## Purpose And Limits

- Collects the currently resolved purchasable selection and quantity into one
  native submission boundary.
- Composes canonical option, quantity, and primary-action implementations without
  duplicating their markup, value owners, keyboard behavior, or state styling.
- Preserves native constraint validation, activated submitter, FormData,
  `submit`, `formdata`, and programmatic/native reset behavior.
- Supports an unavailable primary action separately from a pending primary action.
  Pending maps to canonical Button busy semantics and blocks reactivation while
  preserving the action label.
- May contain target-owned hidden purchase data and optional feedback, but does
  not make their commerce values editable Studio presentation properties.
- Does not resolve variants, calculate price, fetch inventory, enforce quantity
  rules, select selling plans, mutate a cart, open a drawer, navigate, announce
  results, retry, roll back, authenticate, analyze, or persist anything itself.
- Is not generic Form, Product Info, Cart Drawer, Quick Add, Sticky ATC, Checkout,
  Wishlist, or an express-payment implementation.

## Repository Baseline Before This Batch

- Registry `D5`, Product, with Button, Quantity Selector, and Variant Selector
  dependencies. Contract `0.1.0`, `pilot`: four anatomy parts, one variant/size/
  state, two behaviors, three properties, and zero public token references.
- Contract summary claims Quantity Selector composition but omits Quantity from
  anatomy and properties. `dependencyComposition` selects only Variant Selector.
  It does not define named controls, merchandise-id ownership, activated
  submitter, FormData/reset, pending, feedback, or target coordination.
- Canonical CSS is three layout rules with hardcoded `16px` and `12px`, no
  intrinsic overflow safeguards, no action wrapping, and no feedback part.
- ProductStudio renders a native form but duplicates Quantity Selector markup and
  uses a separate manual arithmetic state rather than the reviewed canonical
  artwork. The submit Button lacks the accepted large size and has no busy state.
- Exhibit and Studio share ProductStudio, but the current Product Form fixture
  cannot prove purchase-id synchronization, activated submitter, FormData,
  native validity/reset, unavailable explanation, or pending non-reactivation.
- MDX fallback omits Quantity, uses invalid pre-ADR Variant Selector markup, adds
  an undeclared Wishlist Button, and gives image/badge guidance unrelated to the
  component.
- Shopify renders an inner `.product-form` `div` instead of placing the class on
  the generated native form. It duplicates Price already owned by Product Info,
  uses the nonexistent `.btn--primary`, ignores variant quantity rules, and keeps
  one initial hidden variant id that becomes stale after any option change.
- Shopify's current form has no controller for high-variant/combined-listing
  selection, URL/section re-rendering, Ajax/native success/error lifecycle,
  pending Button state, Cart Drawer coordination, accelerated checkout, selling
  plans, or line-item properties.
- Product CSS is `5,306 B / 5.2 KiB` with only `18 B` headroom. Complete Web CSS
  is `65,441 B / 64 KiB` with `95 B`; shared runtime is the existing
  `10,501 B / 8 KiB` exception. This batch cannot silently reset those ceilings.

## Standards And External Evidence

### Native HTML And WAI Guidance

HTML forms already own form-associated controls, successful entry construction,
constraint validation, activated submitter semantics, `submit`, `formdata`, and
reset. Explicit `button[type=submit]` has a native default action; Open UI's
Invoker explainer reinforces that ordinary non-submit commands use
`type="button"` instead of replacing form submission semantics.

WAI's validation and notification guidance requires errors to be understandable,
associated with the affected controls, and confirmed server-side. It does not
justify putting request, inventory, or announcement timing into a visual form
component. The target decides whether failed submission focuses a field, a
summary, or an inserted result.

Sources:

- [HTML forms](https://html.spec.whatwg.org/multipage/forms.html)
- [HTML form submission](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-algorithm)
- [WAI form validation](https://www.w3.org/WAI/tutorials/forms/validation/)
- [WAI user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [Open UI Invoker Commands explainer](https://open-ui.org/components/invokers.explainer/)

### Mature-System And Commerce Comparison

| System | Evidence | Gallery implication |
| --- | --- | --- |
| [Radix Form](https://www.radix-ui.com/primitives/docs/components/form) | Builds on native constraint validation and supports client/server messages and first-invalid focus, but its framework state layer cannot compose every Radix form primitive. | Preserve native data/validity and canonical children; do not import framework-specific validation ownership. |
| [Shopify product template](https://shopify.dev/storefronts/themes/architecture/templates/product) | Product forms include variant selection, quantity, optional accelerated checkout, and line-item property controls. | Keep Variant/Quantity canonical; treat accelerated/custom fields as explicit target/product scope rather than silently adding them. |
| [Shopify Liquid product form](https://shopify.dev/docs/api/liquid/tags/form#form-product) | `{% form 'product', product %}` generates the native add-to-cart form boundary. | Put `.product-form` on the real generated form and preserve the platform action/data. |
| [Shopify Cart Ajax API](https://shopify.dev/docs/api/ajax/reference/cart#post-locale-cart-add-js) | `cart/add.js` accepts either target JSON or FormData from the add-to-cart form and requires locale-aware URLs. | The same semantic form can progressively navigate or be intercepted; network and result lifecycle are target-owned. |
| [Shopify high-variant guidance](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants/support-high-variant-products) | Current option-value context may have no variant; themes must defer data and avoid all-variants JSON. | The hidden merchandise id is derived target state and must be synchronized or disabled before submit. |
| [Shopify Dawn buy buttons](https://github.com/Shopify/dawn/blob/main/snippets/buy-buttons.liquid) | Uses a hidden `name="id"`, explicit `name="add"` submitter, unavailable disabling, busy/error UI, and a target controller. | Reuse the platform concepts without copying Dawn structure or making its custom element canonical Gallery source. |

Open UI has no finalized Product Form component that supersedes native HTML.
Polaris administrative form APIs are not storefront purchase-form ownership and
therefore are supporting target evidence only, not the Gallery source model.

## Owner Visual Reference

Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. As already verified for the adjacent Product components,
that frame is the generic Studio/Button shell rather than Product Form artwork.

The repository render is therefore a candidate, not visual approval. Human review
must approve form density, distance between options/quantity/action, action size,
whether Quantity is visible for one-of-one work, feedback placement, disabled/
pending treatment, and narrow stacking.

## Recommended Anatomy And State Matrix

Required anatomy:

1. Native `form.product-form` root on Web.
2. Action row `.product-form__actions`.
3. One canonical primary Button `.product-form__submit` with
   `type="submit"` and a stable visible label.

Optional composition:

- Canonical Variant Selector, omitted for products with no meaningful options.
- Canonical Quantity Selector, omitted only when target/product policy fixes one.
- Target-owned named/hidden merchandise data; no mirrored public value object.
- Target-owned `.product-form__message` feedback slot. Static presence has no
  automatic live role; insertion/role/focus timing belongs to the target.

| Dimension | Required coverage |
| --- | --- |
| Composition | submit only; with Variant; with Quantity; with both; optional target feedback |
| Action | default; unavailable/disabled; pending/busy; restored; target success/error result |
| Native lifecycle | valid submit; invalid child blocks submit; activated submitter; FormData; reset |
| Coordination | complete purchasable id; no matching id; selection/quantity change; stale-id prevention |
| Environment | light; dark; forced colors; reduced motion; RTL; 200% zoom |
| Content | short/long/localized label and feedback; empty required label rejected; extreme quantity/options |

## Recommended Public API And Ownership

- `variantSelector`: optional canonical slot.
- `quantitySelector`: optional canonical slot.
- `submitLabel`: required localized text passed to canonical Button.
- `submitDisabled`: explicit unavailable state; targets also provide a visible
  explanation when the reason is not otherwise clear.
- `pending`: asynchronous state passed to Button `busy`; composes `aria-busy` and
  native disabled without changing the label or accepting a second activation.
- `feedback`: optional target content slot. Product Form provides placement only;
  target chooses text, tone, role, announcement, focus, and lifecycle.
- Do not expose action URL, method, variant id, quantity constraints, selling plan,
  properties, cart response, errors, or analytics as Studio appearance controls.
  Those are target data/services or properties of canonical child controls.
- Static Web leaves child controls uncontrolled after their authored defaults.
  Framework adapters may control each child through its own contract. Product
  Form never owns one mirrored object containing all values.
- The target coordinator controls the resolved purchasable id and pending/result
  lifecycle. Native submit/formdata/reset remain platform events.

## Token, Layout, Runtime, And Responsive Direction

- Replace hardcoded gaps with `--space-layout-element-gap` and private derived
  composition values; do not expose raw gap controls.
- Use grid/flex wrapping, `min-inline-size: 0`, and intrinsic action growth. Avoid
  viewport breakpoints or reordered DOM.
- Product Form should consume Button/Quantity/Variant CSS and tokens rather than
  restating them. Its own feedback flow may inherit body typography unless a
  stable independent visual need is approved.
- Neutral runtime budget is `0 B`. Native form behavior and child owners are
  sufficient. Ajax, option re-rendering, inventory, cart updates, and live status
  belong to the target controller and must be measured there.
- Recover CSS headroom through source simplification; do not raise Product or Web
  ceilings for a few layout declarations.

## Cross-Target Translation

| Target | Translation |
| --- | --- |
| Neutral Web | Real native form, canonical child markup, target-provided action/data, no base JavaScript. |
| Shopify | Implemented product form tag, synchronized hidden variant id, variant quantity rules, merchant-configurable Quantity, canonical snippets and Button classes; native navigation baseline with optional later same-form Ajax. |
| React/Angular | Implemented shared native form renderer with controlled/uncontrolled canonical children; optional pending/result state owned by the product feature. |
| Figma | Visible child composition plus default/unavailable/pending/feedback presentation only; no submission engine. |
| SwiftUI/Compose | Native purchase form/view with target model, single submit action and platform progress/result handling. |

## Findings And Proposed Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| `.product-form` is not the Shopify form root. | high | Put the class on the generated native form. | implementation |
| Quantity markup is duplicated in ProductStudio. | high | Extract and consume one canonical Quantity artwork. | implementation |
| Hidden variant id becomes stale after option changes. | resolved | The accepted target coordinator replaces the bounded server-rendered product region and synchronizes it atomically. | ADR 0239 / implementation |
| Price is duplicated inside the form. | high | Remove it under accepted ADR 0115 ownership. | accepted architecture/implementation |
| Submit Button lacks pending and uses stale Shopify class. | high | Compose canonical Button disabled/busy/large presentation. | implementation |
| Contract omits Quantity, feedback and native lifecycle. | high | Add anatomy/properties/behaviors without a mirrored value object. | implementation/contract |
| MDX guidance and fallback are unrelated/stale. | high | Replace with canonical form composition and target boundary. | implementation |
| No component-specific owner artwork. | human review | Treat repository candidate as unapproved. | owner |

## Implemented Result And Evidence

- Contract `0.3.0` has six anatomy parts, seven states, eight behaviors, six
  semantic properties and one public spacing token. Registry, CSS, contract,
  Studio metadata and MDX use the same composition and terminology.
- ProductStudio renders the real form root with explicit `action`, `method`,
  named canonical option and quantity controls, target fixture merchandise data,
  and a named Button submitter. Default FormData is `glaze=celadon`, `size=M`,
  `quantity=1`, `merchandise=celadon-m`, and `intent=add`.
- Changing to Ink/L produces `merchandise=ink-l`; native reset restores Celadon,
  M, quantity one, and `celadon-m`. The input's native Arrow Up reaches two, max
  eight disables increment, and required invalid groups block a second submit.
- Product Form and standalone Quantity Selector use the same extracted artwork;
  their tag/class/type/icon-path signatures are identical. Product Form contains
  one Variant Selector, one Quantity Selector, one Button, and zero Price nodes.
- Selecting Porcelain projects an unavailable combination: hidden merchandise
  data is disabled and absent from FormData, the submitter is disabled, and
  optional visible feedback has no accidental live role. Pending sets
  `aria-busy="true"`, keeps `Add to cart`, disables reactivation, and emits no
  second submit.
- Renewed Exhibit and Studio form outerHTML is exactly identical at `4,404`
  characters. Six Studio controls bind the two compositions, feedback, label,
  unavailable and pending semantics; inspector reset restores the fixture.
- Mobile `390`, Tablet `768`, Desktop `1440`, and XL `1920` evidence passes. A
  localized 44-character Spanish action at `320px` wraps to an `81px` Button
  without component overflow. RTL places Quantity at logical inline start;
  dark, forced colors, reduced motion and component-level 200% zoom pass.
- Keyboard focus reaches the submitter in source order with a `2px` visible
  outline. Default Button text contrast is `10.37:1` and height is `52px`.
  Reduced-motion pending resolves the generated spinner animation to `none`.
- Shopify places `.product-form` on the generated form, renders canonical
  option/quantity snippets, offers one merchant Quantity setting and uses a named
  canonical submit Button. The shared coordinator proof updates merchandise id,
  quantity rules, submit availability and omission atomically. Shopify adapter
  status is implemented and the target-ready inventory advances to `87`.
- Product CSS is `4,803 B / 5,324 B`; complete Web component CSS is
  `70,985 B / 65,536 B`; shared runtime is `21,633 B / 8,192 B`. The latter two
  are documented cumulative gaps; Product Form adds `0 B` neutral runtime.
- Renewed evidence lives under
  `output/playwright/refinement-product/product-form-0241/`. `site/dist` was not
  rebuilt or modified.

## Readiness Decision

Product Form is ready for human stability review. Native data and validation,
canonical dependencies, intrinsic layout, unavailable/pending/feedback states,
special media, exact Exhibit/Studio parity, one complete native purchase path,
Shopify coordination, merchant Quantity policy, adapters, docs and performance
evidence are reconciled under D5-A and ADR 0241. The contract remains `pilot` and
no `stable` promotion is authorized.

## Risks And Open Questions

1. Live Shopify native submission, high-variant replacement, Quantity omission,
   theme-editor and app-block behavior remain target release evidence.
2. Any future Ajax cart adapter needs complete pending, result, retry, focus,
   announcement, cart-surface and rollback evidence in its own target batch.
3. Selling plans, personalization, uploads, gifts, preorder and accelerated
   checkout require separate accepted compositions if they enter v1.
4. The owner must approve form spacing, hierarchy, action geometry, feedback
   placement, disabled/pending appearance and narrow responsive behavior.
