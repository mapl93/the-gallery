# Component Dossier: Sticky Add-to-Cart Bar

Status: `human-review-ready`

Target under review: Neutral Web viewport-edge purchase composition and Shopify
theme translation

Contract: `components/contracts/sticky-atc.contract.json`

## Recommendation

Keep Sticky Add-to-Cart Bar as a passive viewport-edge composition of canonical
Price, Button, and Product Form semantics. It summarizes the current product and
provides a second native submitter for the same target-owned product form; it
does not create a second form, variant state, cart request, success state, or
status announcement.

On Web, associate the canonical Button with the existing Product Form through
native `type="submit"` and `form="<product-form-id>"`. The target product
coordinator owns the stable form identifier, selected merchandise, quantity,
selling plan, availability, formatted Price, pending/result state, and semantic
visibility. Per owner-selected K9-A, the target exposes the bar only after the
main Product Form action is no longer usefully visible and the product state is
coherently eligible. Hidden content must be removed from interaction and the
accessibility tree, not merely translated below the viewport.

Use intrinsic, container-driven wrapping and keep geometry private. Every fixed
target mapping must account for safe-area insets, reserve enough block-end
content or scroll space that the surface cannot obscure focused or
checkout-critical content, and coordinate competing viewport-edge surfaces. Do
not add neutral JavaScript: observation, submission, cart mutation, feedback,
focus, and collision management are target lifecycle responsibilities.

ADR 0256 records the accepted target-controlled eligibility, one-coordinator,
and safe fixed-surface boundary. The neutral candidate can therefore enter
human stability review while remaining `pilot`. Final narrow/visual treatment
and each real target's purchase, focus, safe-area, and collision proof remain
review work; they are not unresolved neutral architecture.

## Purpose And Limits

- Keeps current product identity, target-formatted Price, and the primary
  purchase action available after the main Product Form is no longer the useful
  action surface.
- Supports unavailable and asynchronous pending projections from the same
  product coordinator as the main Product Form.
- Composes canonical Price and Button markup and submits the canonical Product
  Form rather than duplicating either dependency.
- Is not a product form, variant resolver, quantity owner, cart client, toast,
  live region, bottom navigation, toolbar, dialog, checkout, or global overlay
  manager.
- Does not standardize whether a target detects main-action usefulness through
  intersection, geometry, scroll direction, dwell time, or another platform
  signal; those mechanics and hysteresis remain target policy.
- Does not own collision mechanics for Cookie Consent, Bottom Nav, Cart Drawer,
  chat, browser safe areas, virtual keyboards, or other fixed surfaces; every
  target that enables K9 must prove safe coexistence.
- Does not infer a local success state from button activation; only the target
  purchase result can update cart feedback.

## Repository Baseline Before Refinement

- Registry K9 declares Button and Price dependencies. Contract `0.1.0`,
  `pilot`, has seven anatomy parts, two states, three behaviors, seven
  properties and ten public token references.
- Neutral CSS fixes the root to the physical viewport bottom and hides it only
  with `translateY(100%)`. The hidden subtree can remain discoverable or
  focusable in consumer markup.
- The layout contains hardcoded `12px`, `16px`, `48px`, `640px`, `1280px`, and
  weight `600`; it responds to the page viewport, hides the image below `640px`,
  and truncates the title to one line.
- CartStudio renders an `aside` landmark, raw Price text, and a local
  `type="button"`. It sets only that button's `tabIndex` while hidden and changes
  its label to a locally inferred “Added” state after click.
- K9 has no real Product Form association, successful-entry semantics,
  constraint validation, selected merchandise/quantity synchronization,
  pending state, or target-confirmed result boundary.
- The MDX fallback repeats raw image and Price markup, closes the bar when the
  action is clicked, and demonstrates no native form submission.
- Studio exposes inherited surface, shadow, and image-radius tokens as if K9
  owned them. Its Figma frame and inspector nodes resolve to generic Button
  component-detail and inspector shells, not K9-specific owner artwork.
- Shopify has copied CSS only: no Liquid composition, form association,
  visibility controller, product synchronization, purchase lifecycle, editor
  use, or collision policy.
- Existing desktop/mobile captures prove shared renderer wiring only. They
  preserve a one-row candidate whose mobile price is hidden and title is
  ellipsized; they are not owner visual approval.
- Deterministic level-9 baseline: K9 slice `1,201 B` raw / `511 B` gzip, Cart
  CSS `15,408 B` raw / `3,030 B` gzip against the permanent `3,072 B` ceiling,
  complete Web component CSS `506,087 B` raw / `67,930 B` gzip, and shared
  neutral runtime `53,811 B` raw / `10,501 B` gzip. K9 adds no neutral runtime.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML `button` and form association](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element) | A button's `form` attribute explicitly associates it with a form elsewhere in the document; `type=submit` invokes that form's native submission and activated-submitter semantics. | The sticky action can submit the one canonical Product Form without duplicating its controls or cart path. |
| [WCAG 2.2 Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | Author-created sticky content must not entirely hide a keyboard-focused component. Scroll padding is one documented way to keep focused content visible. | Every target must reserve or dynamically expose sufficient block-end space; fixed positioning alone is not certifiable. |
| [WCAG Reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html) | Fixed content can make reading and operation difficult when content is magnified or reflowed. | K9 must wrap intrinsically and be tested at effective 200% zoom; unfixing at constrained sizes remains a valid target policy. |
| [WCAG CSS techniques](https://www.w3.org/WAI/WCAG22/Techniques/css/) | C34 covers unfixing sticky content, C43 covers scroll padding, C39 covers reduced motion, and C44 covers 44 CSS-pixel targets. | K9 needs reduced-motion behavior and a full-size canonical Button; targets need an explicit overlap strategy. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | “Action bar” appears as a system naming pattern, but Open UI defines no standardized Sticky Add-to-Cart widget. | K9 is a commerce composition, not a new platform role or generic action-bar standard. |
| [Radix Primitives](https://www.radix-ui.com/primitives) | Radix provides Button and overlay/navigation primitives but no storefront Sticky Add-to-Cart primitive. | Reuse the Button primitive contract and keep commerce coordination target-owned. |
| [Shopify product template](https://shopify.dev/storefronts/themes/architecture/templates/product) | Shopify's product form is the main add-to-cart boundary and carries variant, quantity, and optional purchase data. | Shopify K9 must submit the existing product form with synchronized data, not render an independent form. |
| [Shopify Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements) | Buying functions must update price and sold-out state for selected variants and disable or replace unavailable add actions. | Static first-variant Price and availability cannot make the target ready; one live coordinator is required. |
| [Polaris Save Bar](https://shopify.dev/docs/api/app-home/app-bridge-web-components/save-bar) | A mature fixed action surface uses either form binding or programmatic save and avoids mixing both lifecycles. | K9 should use native form binding on Web and must not also run a local click/cart path. Polaris Admin remains comparative evidence only. |
| [Polaris Button](https://shopify.dev/docs/api/app-home/web-components/actions/button) | Current Button supports submit semantics and a loading projection for asynchronous work. | K9 composes canonical Button submit, unavailable, and pending semantics instead of inventing action states. |

WAI-ARIA APG, Open UI, Radix, and Polaris define no commerce-specific Sticky
Add-to-Cart widget. Native HTML form ownership and WCAG fixed-content guidance
are therefore the primary semantic constraints. External systems provide
evidence but do not replace The Gallery's visual identity.

## Matches, Differences, And Direction

- ADRs 0026 and 0077 already assign visibility, pricing, product identity, and
  add semantics to K9 while containing fixed positioning in Studio.
- ADR 0117 makes Product Form the native purchase boundary and assigns selected
  merchandise, quantity rules, availability, Price/media/URL, pending/result,
  and status to one parent target coordinator. K9 must consume that boundary.
- Price is a slot, not a string: the target supplies one canonical Price instance
  with formatted content and its own numeric/accessibility semantics.
- `productFormId` is a required semantic reference on Web. Non-DOM targets map
  it to their stable purchase-form/action reference rather than copying the
  literal HTML attribute.
- A neutral root has no special landmark or ARIA role. Product context and the
  native Button name already describe the surface; adding `aside`, `toolbar`,
  or a live region would add misleading or duplicate semantics.
- Hidden uses both target state and Web exclusion (`inert` plus
  `aria-hidden="true"`) while the modifier preserves the exit animation. The
  target controls mount/unmount or transition completion.
- Pending preserves the action label and maps to canonical Button busy plus
  disabled behavior. Result feedback remains in the target Product Form/cart
  boundary, never inside K9 by default.

## Candidate Anatomy And Composition

| Part | Required | Semantic element / canonical composition | Owner |
| --- | --- | --- | --- |
| Root | yes when valid | neutral `div.sticky-atc`; hidden Web state applies `inert` and `aria-hidden` | K9 state + target lifecycle |
| Inner | yes | centered `.sticky-atc__inner` | private K9 layout |
| Product information | yes | `.sticky-atc__info` | K9 composition |
| Image | no | native `img.sticky-atc__image` with authored alt policy | target media |
| Product title | yes | plaintext `.sticky-atc__title[dir=auto]` | target content |
| Price | no | `.sticky-atc__price` containing one canonical Price | Price/target formatter |
| Action | yes | canonical `button.btn.sticky-atc__action[type=submit][form]` | Button + Product Form association |
| Product Form | required reference, outside root | existing native `form.product-form[id]` | Product Form/target coordinator |
| Result status | outside K9 | target Product Form/cart feedback | target purchase lifecycle |

## State, Variant, Size, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One neutral purchase profile; no visual variants in v1. |
| Size | One intrinsic size. Maximum content width, image geometry, gaps, and narrow threshold are private. |
| Visibility | Hidden and visible through target-owned semantic state. Visible is eligible only after the primary action is no longer useful and coherent product state exists; hidden Web content is inert and accessibility-hidden. |
| Availability | Available or unavailable from the same resolved selection as Product Form. Unavailable disables the submitter. |
| Request | Idle or pending from the target purchase lifecycle. Pending preserves label, sets Button busy, and blocks repeat submit. |
| Content | Required non-empty title and action label; optional image and canonical Price independently omit cleanly. |
| Association | Required non-empty Product Form reference; missing reference omits invalid output. |
| Direction/content | Short, long, localized, mixed-direction, and unbroken titles/prices/actions without content loss. |
| Environment | Mobile/Tablet/Desktop/XL, constrained container, effective 200% zoom, light/dark, forced colors, reduced motion, keyboard-only, safe-area and fixed-surface collision scenarios. |

Invalid combinations include blank title/action label/form reference, a raw
duplicated Price string, a local cart click path, a sticky-owned Product Form,
unsynchronized selected data, enabled unavailable/pending submitters, local
success before target confirmation, hidden-but-focusable descendants, duplicate
status announcements, or fixed content that obscures focus.

## Public API And Ownership

- `visible` — optional target-controlled semantic visibility after the primary
  action is no longer useful and coherent product eligibility exists; defaults
  false.
- `image` — optional target media slot.
- `imageAlt` — optional target-authored alt text; empty means decorative only
  when the adjacent title communicates the same product identity.
- `title` — required non-empty product title.
- `price` — optional canonical target-formatted Price slot.
- `actionLabel` — required non-empty localized purchase label.
- `productFormId` — required stable Product Form reference; maps to native Web
  `form` association and an equivalent target purchase boundary elsewhere.
- `actionDisabled` — optional unavailable projection; defaults false.
- `pending` — optional target-owned asynchronous projection; defaults false.

The target owns controlled visibility and observation, trigger hysteresis,
selected product/options, merchandise id, quantity, selling plan, inventory,
Price formatting, availability reason, Product Form identity, native versus Ajax
submission, request/result state, cart mutation, cart count/drawer refresh,
feedback, announcement, focus, retry, analytics, safe-area insets, scroll
padding, stacking and collisions. K9 owns no uncontrolled business state.

## Token, Hardcoded Value, And Runtime Audit

- K9 should expose no independent public visual token. Its visible surface,
  Button, Price, typography, media radius, shadow, and focus remain canonical
  dependency or global semantic decisions.
- Replace hardcoded padding/gaps/image size/font weight/max width and the viewport
  media query with K9-private derivations from existing semantic spacing,
  touch-target, type, radius, surface, border, shadow, z-index, motion, and
  container tokens.
- Keep maximum content width, container threshold, narrow row composition,
  image geometry, surface chrome, and movement distance private until human
  visual review.
- Neutral runtime budget is `0 B`. Native form association and CSS state need no
  observer, listener, request, timer, service, or cart state in shared JS.
- Cart CSS must remain at or below `3,072 B` gzip. The current permanent audit
  measures Cart at `3,057 B`, leaving `15 B` headroom; K9 is `1,791 B` raw /
  `716 B` gzip and adds no runtime. Future changes must hold the ceiling rather
  than reset it.
- Shopify may require target JavaScript for intersection/collision behavior,
  option coordination, Ajax purchase, and feedback. That target runtime must be
  budgeted separately and cannot be hidden in neutral K9.

## Responsive And Evidence Requirements

- Use a named K9 container and one private intrinsic threshold. Do not use page
  viewport width to decide internal rows or hide semantic content.
- Keep product information before the action in source, reading, and visual
  order. Do not reverse the DOM in RTL.
- Let the title wrap and preserve the Price. At narrow capacity the action may
  occupy its own row; whether product image remains visible is a private
  candidate pending owner review.
- Test complete composition; no image; no Price; unavailable; pending; hidden;
  blank required values; missing form reference; long localized/unbroken title;
  long currency/action copy; RTL; native external form submission; target
  feedback; reduced motion; forced colors; safe-area; and focus near the fixed
  surface.
- Capture exact Exhibit/Studio shared artwork at Mobile, Tablet, Desktop, and XL,
  plus narrow/long content, effective 200% zoom, dark, forced colors, reduced
  motion, hidden exclusion, focus visibility, and native submit evidence.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Neutral Web | Fixed neutral `div`, canonical Price, and external canonical Button submitter associated to one native Product Form by ID. | CSS/contract candidate; visibility/coordinator/collision lifecycle stays target-owned. |
| Shopify | Product-context Liquid snippet uses canonical Price/Button classes and associates with the existing `{% form 'product' %}` id. | Static composition can be implemented; live visibility, option/quantity coordination, Ajax/native result policy, safe areas, invocation, and editor use remain target work. |
| Webflow / Framer | Copied CSS plus one target Product Form/action reference and target-authored visibility/collision behavior. | CSS translation only until target form semantics are proven. |
| React / Angular / Hydrogen | Controlled visibility and target product coordinator render one external submitter tied to the real form or call that target's form action. | Planned; no framework dependency in base source. |
| Figma | Fixed purchase profile composed from Price and Button instances, with optional image and state properties. | Planned; registered generic Button shell is not K9 artwork or visual approval. |
| SwiftUI / Compose | Safe-area-aware inset purchase surface using native product model and primary action. | Conceptual; form reference maps to the platform purchase boundary, not a DOM id. |

## Residual Risks, Target Proof, And Alternatives

1. ADR 0256 fixes semantic eligibility, not one universal observation
   algorithm. Each target must document and test its signal, thresholds, and
   hysteresis against the accepted primary-action/product-state rule.
2. One target product coordinator must prove selected options, merchandise id,
   quantity, selling plan, Price/media/inventory/URL, availability,
   pending/result, feedback, analytics, and focus across the main form and K9.
3. Each enabled fixed mapping must prove safe-area insets, sufficient block-end
   content or scroll space, virtual-keyboard behavior, effective zoom, and
   collision handling with other viewport-edge surfaces. There is no neutral
   global z-index or collision manager.
4. Shopify must still choose and prove one native or Ajax purchase lifecycle
   shared with the main Product Form, including errors, success, focus, cart
   count/Drawer refresh, retry, editor behavior, and live-store invocation.
5. Human review must approve surface height, shadow/border, product hierarchy,
   image presence/size, wrapping, action width, motion, stacking, and narrow
   layout. These remain visual review choices, not blockers to entering review.
6. The registered Figma references are generic Button Studio shells. No
   component-specific owner artwork or final visual reference is available.

Alternative A is a second synchronized Product Form inside K9. It duplicates
named controls, validity, quantity, selection, and submission state and creates
two potential sources of truth. Alternative B is a local click handler that
calls a cart API. It bypasses native activated-submitter/form data semantics and
splits result behavior. Alternative C is action-only fixed UI on every small
screen. It discards product context and decides a visual/commercial policy
without owner evidence. The recommended external native submitter preserves one
form and one coordinator while keeping the neutral component target-agnostic.

## Implementation Outcome

Implemented in Batch 90 as contract `0.2.0`, accepted ADR 0181, canonical CSS,
one shared Exhibit/Studio renderer and fixture, Studio metadata, MDX, target-
native Shopify Liquid, regenerated Web/Webflow/Shopify adapters, final evidence,
and detailed reports.

The final K9 subtree is exact between Exhibit and Studio and contains one
canonical Price and one external canonical Button associated with one existing
Product Form. Hidden, unavailable, pending, submission, optional omission,
invalid omission, four container widths, 200px, RTL, effective 200 percent,
focus, contrast, dark, forced colors, and reduced motion pass. Neutral runtime
delta is zero. The current Batch 140 audit measures Cart CSS at `3,057 B` gzip
against its `3,072 B` ceiling.

Batch 140 and ADR 0256 reconcile owner-selected K9-A without changing the
canonical renderer, CSS, nine-property API, zero-token surface, or zero-runtime
boundary. Contract `0.3.0` now records target-controlled eligibility, one target
product coordinator, and mandatory safe fixed presentation. Outcome is
`human-review-ready`: final visuals and live target lifecycle proof remain
pending. Do not promote this contract to `stable`.
