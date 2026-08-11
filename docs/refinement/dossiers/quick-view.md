# Component Dossier: Quick View

Status: `human-review-ready`

Target under review: Neutral Web product quick-view composition and Shopify
theme translation

Contract: `components/contracts/quick-view.contract.json`

## Recommendation

Keep Quick View as a focused product-decision profile of canonical Modal. Its
visible product title supplies the dialog name, its body composes one canonical
Product Gallery, one canonical target-formatted Price, an optional canonical
Product Form, and an optional coherent full-details Link. Modal owns the visible
dismiss action and structural dialog anatomy; the target owns invocation,
modality, focus containment/restoration, inertness, scroll locking, dismissal
policy, data loading, commerce coordination and result lifecycle.

Replace the current static card-like renderer with the real Modal tree and
extracted docs-target artwork shared with standalone Modal, Product Gallery and
Product Form. Keep the neutral source independent of React and Shopify: CSS and
the target-agnostic contract express composition, while each adapter chooses
native dialog/lifecycle and product-data mechanics.

Add direct Price and Link dependencies because K8 currently duplicates both
implementations. Keep `title`, optional `vendor`, concise optional `description`,
required `gallery`, required target-formatted `price`, optional `productForm`,
coherent optional `fullLinkLabel`/`href`, required `dismissLabel`, and semantic
`open` as the stable surface. Do not expose modal width, column breakpoint,
padding, gap, media ratio, description clamp, close placement, focus selector,
portal, product id, variant record, raw money, request state or analytics.

Owner-selected K8-A and ADR 0255 resolve the semantic boundary: the target opens
K8 only from a complete coordinated product snapshot; the Gallery uses the full
ADR 0238 image/video/external-video/model scope with `imageDetail="none"`; the
featured image is passive; and the full-details Link leads to the normal
Product Gallery lightbox experience. Product Form remains optional when a real
full-details Link supplies the valid continuation. The component can therefore
enter human review while remaining `pilot`; live target proof and final visual
approval are still pending.

## Purpose And Limits

- Lets a shopper inspect enough product identity, media, price and purchase
  controls to make a focused decision without navigating away from context.
- Supports either a reduced purchase path, a full-details navigation path, or
  both. At least one useful continuation must exist.
- Composes canonical Modal, Product Gallery, Price, Product Form and Link instead
  of restating their markup, tokens, states or behavior.
- Is not a product page, product database, variant resolver, cart client, media
  engine, recommendation surface, checkout, route, portal or global overlay
  coordinator.
- Does not own inventory, selling plans, accelerated checkout, media source
  records, add-to-cart result text, cart-drawer refresh, analytics or focus
  after a successful purchase.
- Does not use `alertdialog`; inspecting or purchasing a product is not an
  interruptive warning that requires an immediate response.

## Repository Baseline Before Refinement

- Registry K8 declares Modal, Product Gallery and Product Form dependencies;
  contract `0.1.0`, `pilot`, has eight anatomy parts, two states, three
  behaviors, seven properties and nine public token references.
- The neutral CSS renders `.quick-view` as a padded grid. It is not nested in
  `.modal-overlay`/`.modal`, has no close action, and switches columns through a
  `640px` page-viewport query rather than its own available width.
- The component restates gallery image sizing, title/vendor/description
  typography, Link focus and Product Form spacing. Its four-line CSS clamp may
  visually hide content that remains present semantically.
- The shared CartStudio renderer emits a `section.quick-view` with
  `aria-labelledby`, but not `role=dialog`, `aria-modal`, backdrop, visible
  dismiss action, focus entry/containment/restoration or Escape behavior.
- The gallery is one raw image wrapper rather than canonical Product Gallery.
  Price is duplicated raw markup and is absent from the public contract.
  Product Form is duplicated as a `div` plus Button instead of a native form.
- `fullLinkLabel` renders a Link even when `href` is blank by inventing
  `#product`; blank required title still leaves an empty heading.
- Studio exposes inherited text/focus/radius tokens as if K8 owned them. The
  generic Figma trace points to the shared Studio shell and is not component
  artwork or visual approval.
- Shopify has CSS only: no Liquid, data mapping, invocation, modal lifecycle or
  purchase coordinator. Adapter maturity is `css-ready`, not target-ready.
- Existing desktop/mobile parity captures show the same shared renderer, but the
  desktop candidate is visually a bordered card and the mobile candidate is a
  long static stack rather than an evidenced modal workflow.
- Deterministic level-9 baseline: K8 slice `1,314 B` raw / `566 B` gzip; Cart
  CSS `15,593 B` raw / `3,007 B` gzip against the permanent `3,072 B` ceiling;
  complete Web component CSS `506,272 B` raw / `67,861 B` gzip; shared neutral
  runtime `53,811 B` raw / `10,501 B` gzip. K8 adds no neutral runtime. These are
  preserved historical baselines; current measurements are recorded below.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML `dialog`](https://html.spec.whatwg.org/multipage/interactive-elements.html?elementdef-dialog=) | `showModal()` presents a top-layer modal, runs dialog focusing, blocks the document and supports close/request-close lifecycle. The standard advises using the methods rather than manually toggling `open`. | Native dialog is the preferred Web mapping where target architecture permits it; the neutral K8 contract must not hard-code a React portal or custom global service. |
| [WAI-ARIA APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Modal content makes outside content inert, contains Tab/Shift+Tab, closes on Escape, receives appropriate initial focus, returns focus logically and includes a visible close action. | K8 must compose the complete Modal lifecycle rather than applying `aria-modal` to a static card. Its structured product content favors initial focus at the title or another content-aware target. |
| [Open UI Dialog research](https://open-ui.org/components/dialog.research/) | Mature systems converge on dialog/modal naming, label, width and variants while differing in implementation. Open UI defines no separate Quick View widget. | Quick View is a domain composition of Dialog, not a new accessibility role or generic overlay primitive. |
| [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) | Root, Trigger, Portal, Overlay, Content, Title, Description and Close are separate composable parts; controlled/uncontrolled open state and lifecycle callbacks belong to the framework target. | Preserve semantic composition and state ownership without copying `asChild`, portal containers or callback names into the neutral contract. |
| [Shopify Polaris Modal](https://shopify.dev/docs/api/app-home/web-components/overlays/modal) | Current Polaris Modal requires an accessibility label, supports scrollable content and dedicated primary/secondary action slots, and includes detail previews as a use case. | Confirms Modal composition and named content; the Admin component is comparative evidence, not storefront code or Gallery source. |
| [Shopify product variants](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants) | Variant selection must synchronize product media and price; Shopify explicitly permits selectors in collection-grid or product quick-view snippets. | K8 cannot own independent gallery, price and form state. One target coordinator must synchronize them before purchase. |
| [Shopify Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements) | Quick-view product forms are expected to support rich product media; product buying functions require separate option selection, quantity, add-to-cart availability and synchronized price/sold-out updates. | A static image/first-variant snippet cannot be called target-ready. Rich media, high variants and purchase lifecycle remain explicit Shopify maturity work. |
| [Shopify product form](https://shopify.dev/storefronts/themes/architecture/templates/product) | The native product form owns variant, quantity and add-to-cart submission, with optional accelerated checkout and line-item properties. | Compose canonical Product Form and let product/target policy decide which supplementary fields belong in Quick View. |

WAI-ARIA APG, Open UI and Radix define no Quick View-specific widget. Polaris
provides modal composition evidence in an admin surface; Shopify theme guidance
provides the relevant storefront data and purchasing obligations. None replaces
The Gallery's existing visual identity or accepted source architecture.

## Matches, Differences, And Direction

- ADRs 0026 and 0077 already define K8 as Modal + Product Gallery + Product Form
  composition with target-owned focus, gallery state and purchase behavior.
- ADR 0238 makes Product Gallery a finite/manual rich-media collection with
  images, hosted video, external video and models plus `imageDetail`. ADR 0255
  requires K8 to consume that exact contract with `imageDetail="none"` and no
  nested Lightbox.
- ADR 0117 makes Product Form the real native form and assigns variant id,
  availability, Price/media/inventory/URL and purchase state to a parent product
  coordinator. K8 must not restore the duplicate `div.product-form` baseline.
- A canonical Price dependency is required because Product Form deliberately
  does not render Price. A canonical Link dependency is required for the
  optional complete-product destination.
- The existing product title remains the dialog's visible name. This avoids a
  generic duplicate “Quick view” heading and keeps the accessible name specific.
- A concise target-authored description remains plain semantic content; remove
  the visual clamp rather than exposing a line-count API or hiding different
  content from sighted and assistive-technology users.

## Candidate Anatomy And Composition

| Part | Required | Semantic element / canonical composition | Owner |
| --- | --- | --- | --- |
| Overlay | yes when open | `.modal-overlay.quick-view-overlay` | Modal/target lifecycle |
| Dialog root | yes when open | `.modal.quick-view[role=dialog][aria-modal=true]` | Modal + K8 profile |
| Header | yes | canonical `.modal__header` | Modal |
| Product title | yes | native heading `.modal__title`, referenced by `aria-labelledby` | K8 product content + Modal name |
| Close | yes | canonical `.close-btn.modal__close` with contextual label | Modal/Close Button |
| Body/layout | yes | canonical `.modal__body` containing `.quick-view__layout` | Modal scroll + private K8 layout |
| Gallery | yes | `.quick-view__gallery` containing one canonical Product Gallery | Product Gallery/target media |
| Information | yes | `.quick-view__info` | K8 composition |
| Vendor | no | ordinary text `.quick-view__vendor[dir=auto]` | target content |
| Price | yes | `.quick-view__price` containing one canonical Price | Price/target formatter |
| Description | no | paragraph or concise semantic content `.quick-view__description` | target excerpt |
| Product form | no | real `form.product-form.quick-view__form` | Product Form/target commerce |
| Full details | no | native `a.link.quick-view__full-link[href]` | Link/target navigation |
| Result status | outside K8 ownership | target-inserted Product Form/cart feedback | product coordinator |
| Trigger | target/docs sibling | native Button with dialog relationship | target invocation |

## State, Variant, Size, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One focused product quick-view profile; no visual variants in v1. |
| Size | One intrinsic modal profile; max width, column threshold and chrome are private. Mobile full-screen/sheet is an open visual/product choice. |
| Visibility | Closed and open through semantic target state; animation and exit completion remain Modal/target behavior. |
| Continuation | Product Form only, full-details Link only, or both; neither is invalid for a component advertised as actionable. |
| Product content | Required non-empty title, Gallery and Price; vendor/description independently optional. |
| Form state | Default, unavailable, pending, result/error inherited from Product Form and the target coordinator. |
| Gallery state | Complete image/video/external-video/model collection when present, one controlled current id, direct swipe and explicit activation inherited from Product Gallery/target; image detail is always `none` inside K8. |
| Link | Label and destination render together or both are omitted; native navigation only. |
| Direction/content | Localized short/long title, vendor, description, currency and action copy; mixed direction and unbroken content. |
| Environment | Mobile/Tablet/Desktop/XL, 200px container stress, effective 200% zoom, light/dark, forced colors, reduced motion and keyboard-only operation. |

Invalid combinations include blank title, missing Gallery or Price, label-only or
destination-only Link, empty dialog name, missing visible dismiss action, a
claimed modal without inert/focus behavior, duplicate Price, non-form Product
Form markup, unsynchronized variant/media/price/form state, local success before
target confirmation, or no purchase/navigation continuation.

## Public API And Ownership

- `title` — required non-empty visible product title and dialog name.
- `dismissLabel` — required localized accessible name for the visible close
  action.
- `open` — optional semantic visibility state; adapter APIs may offer controlled
  `open`/change and uncontrolled initial state without changing neutral source.
- `gallery` — required canonical Product Gallery slot.
- `vendor` — optional vendor/maker plaintext with target direction handling.
- `price` — required canonical Price slot supplied with target-formatted content.
- `description` — optional concise target-authored product excerpt.
- `productForm` — optional canonical Product Form slot.
- `fullLinkLabel` and `href` — optional coherent canonical Link pair.

The target owns trigger identity, native/custom dialog choice, controlled versus
uncontrolled adapter state, portal/top-layer, focus, inertness, dismissal,
product record, media collection, selected options, purchasable merchandise id,
price formatting, availability, quantity rules, selling plan, request, result,
cart refresh, status, analytics and navigation history.

## Token, Hardcoded Value, And Runtime Audit

- K8 should expose no independent public visual token. Modal, Product Gallery,
  Price, Product Form, Link and Close Button retain their canonical public APIs.
- Replace the hardcoded `24px`, `12px`, `4px`, `640px`, four-line clamp, custom
  Link focus and duplicated image geometry with canonical dependency CSS and
  K8-private derivations from semantic spacing.
- Keep maximum modal width, container threshold, information gap, gallery/info
  ratio and vendor treatment private until human visual review.
- Neutral runtime budget is `0 B`. Native form/link behavior and target adapter
  lifecycle are sufficient; no second overlay or commerce controller belongs in
  shared neutral JavaScript.
- Cart CSS must remain at or below `3,072 B` gzip. K8 begins at `566 B` gzip and
  the family has `65 B` headroom, so canonical composition should recover bytes
  rather than reset the ceiling.
- Shopify may require target JavaScript for product loading, high-variant
  coordination, dialog lifecycle and Ajax purchase, but that target bundle must
  be separately budgeted and cannot be hidden inside neutral K8.

## Responsive And Evidence Requirements

- Use a named Quick View container and one private content threshold; never use
  page viewport width to decide the internal columns.
- Keep title/close first, then gallery and information in stable source order.
  Do not visually reorder content in RTL.
- Test required composition; form-only continuation; Link-only continuation;
  both; no optional vendor/description; blank title; invalid Link pairs; long
  localized and unbroken content; long price; unavailable/pending form; one and
  multiple media; and closed/reopen lifecycle.
- Prove initial focus, Tab/Shift+Tab containment, Escape and visible close,
  backdrop policy, focus restoration, Link activation, native form submit,
  reduced motion and forced-color boundaries.
- Capture Exhibit and Studio at Mobile, Tablet, Desktop and XL with exact shared
  inner renderer/fixture parity, plus 200px stress and effective 200% zoom.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Neutral Web | Canonical classes and slots inside a native `<dialog>` or equivalent proven modal target. | CSS/contract candidate; no neutral lifecycle runtime. |
| Shopify | Dedicated product-context snippet composing `product-gallery`, `price`, `product-form`, Modal/Close and Link classes. | Static/data composition can be implemented; invocation, product loading, high-variant/rich-media synchronization and purchase lifecycle remain target work. |
| Webflow / Framer | Copied CSS with target-authored modal behavior and product data. | CSS translation only; behavior must be certified by target. |
| React / Angular / Hydrogen | Controlled/uncontrolled Dialog adapter plus canonical child components and one parent product coordinator. | Contract direction; no React dependency in base source. |
| Figma | Modal profile with Product Gallery/Price/Form instances and optional content visibility. | Planned; generic trace is not visual approval. |
| SwiftUI / Compose | Native modal/sheet or full-screen presentation with native media/purchase children and target model. | Conceptual; platform navigation/focus/state remains target-owned. |

## Risks, Alternatives, And Open Questions

1. Each target must identify and prove its one product-page/Quick View
   coordinator for selected options, resolved merchandise id,
   Price/media/inventory/URL, quantity rules, selling plans, pending/result
   state and the single localized update status; K8 itself never owns it.
2. Does Shopify render hidden product-specific dialogs with each card, request a
   product section on demand, or use a storefront data layer? The choice affects
   performance, deep links, editor preview, cache behavior and accessibility.
3. Shopify target review must prove the accepted full product-media collection,
   explicit activation/release, current-id and high-variant coordination; an
   image-only/static target is not a valid K8 implementation.
4. Product Form is optional when a complete real full-details Link supplies the
   continuation; targets may provide Form, Link, or both without changing K8.
5. Should mobile use the same centered modal, a full-screen dialog, or a bottom
   sheet? This is an aesthetic/product decision; the neutral candidate keeps one
   bounded intrinsic profile.
6. Human review must approve maximum width, header treatment, close placement,
   media/info ratio, spacing, vendor hierarchy, description length, action
   hierarchy, scroll behavior and narrow presentation.
7. No component-specific owner artwork is registered. Existing parity captures
   preserve a candidate only and cannot certify the visual identity.

Alternative A is to keep K8 as a static content card and let consumers wrap it
in any overlay. That contradicts its registry identity, accepted Modal
dependency and accessibility requirements. Alternative B is to mandate native
`<dialog>` and one global Web coordinator in canonical source. That would decide
an open target architecture question. The recommended middle path keeps honest
Modal composition and target-owned lifecycle.

## Readiness Direction

The safe structural, semantic, responsive and canonical composition corrections
are implemented. Exhibit and Studio now share one exact normalized
`8,446`-character Modal/rich-Gallery/Price/Form/Link subtree with matching
`fac7c618` hashes. Title focus, full
keyboard loop, Escape/backdrop dismissal, focus restoration, closed, Link-only,
invalid omission and one target-local form result pass. Four viewports, dark,
forced colors, reduced motion, long Arabic RTL and effective 200 percent are
captured in `output/playwright/refinement-batch-89/` without horizontal
overflow.

Batch 139 adds eight paired rich-media captures and an active-model capture. It
proves all four media types over five records, explicit hosted/external-video
and model activation, controlled selection/status, passive images, zero nested
Lightboxes, exactly one dialog, current-id persistence across close/reopen,
exact parity and zero browser failures. Direct swipe remains inherited from the
same Product Gallery renderer and its ADR 0238 evidence manifest.

Neutral Web contract/CSS is implemented with zero K8 runtime delta. Shopify has
a validated canonical Liquid composition, but remains `ready:false` because its
invocation, product loading, rich/high-variant synchronization and purchase
lifecycle are unresolved. Cart CSS passes its fixed audit at
`3,057 / 3,072 B` with `15 B` headroom; K8 remains `494 B` gzip and adds zero
neutral runtime. Current documented global gaps are `71,891 / 65,536 B` neutral
component CSS and `22,807 / 8,192 B` shared runtime.

Record K8 as `human-review-ready`: Batch 139 verifies the shared rich-media
fixture, controlled current id, `imageDetail="none"`, one-dialog invariant and
updated Exhibit/Studio parity. Contract remains `pilot`; live target evidence,
visual approval and explicit stability review remain required and are never
promoted automatically.
