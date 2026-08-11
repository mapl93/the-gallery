# Component Dossier: Cart Drawer

Status: `human-review-ready`

Target reviewed: Neutral Web documentation target and Shopify Liquid adapter

Contract: `components/contracts/cart-drawer.contract.json`

## Recommendation

Keep Cart Drawer as a target-controlled commerce composition inside canonical
Drawer. Its owned source is only the compact-summary anatomy. Populated records
compose canonical Cart Line Item, which in turn composes Price, Quantity Selector,
and optional Button actions; Drawer owns the modal surface/lifecycle contract.

Represent populated line items as a native list, each product through one title
destination plus an adjacent decorative image, and summary label/value pairs as
a description list. Keep `lineItems` and `summary` as the only Cart Drawer
properties accepted by ADR 0086. Do not duplicate Drawer `open`, title, dismissal,
focus, or placement properties, and do not promote fixture product/cart records
into the neutral API.

The cart target owns line identity, quantity constraints, mutations, optimistic
or pessimistic policy, pending/error recovery, formatted prices/totals,
discounts, taxes, shipping, empty content, checkout routing, persistence, and
status text. The docs target may demonstrate those responsibilities with local
React state, but canonical CSS/HTML must add no cart store, network client, or
overlay coordinator.

## Purpose And Limits

- Presents an interruptible cart review/edit task while preserving page context.
- Composes zero or more target-owned canonical Cart Line Item records plus an
  optional compact summary.
- Supports product navigation, quantity edits, explicit removal, and checkout
  composition only when the target supplies those truthful actions.
- Is not Cart Page, Product Card, Quick View, checkout, inventory policy, price
  calculation, discount logic, tax/shipping estimator, recommendations, gift
  options, authentication, persistence, analytics, or an Ajax/API client.
- Does not choose modal versus non-modal presentation independently; v1 composes
  the accepted modal Drawer contract.
- Does not define the empty-state visual, confirmation policy, mutation latency,
  undo, retry, focus-after-removal destination, live-announcement cadence, or
  global overlay mutual exclusion. Those remain explicit target/product choices.

## Gallery Baseline Before This Batch

- Registry `C6`, Global, originally depended directly on Drawer, Price, and Quantity Selector;
  contract `0.2.0`, `pilot`, with only `lineItems` and `summary` properties.
- Canonical Global CSS styles a flex row, fixed `80px` image, title, variant,
  wrapping actions, text removal action, and generic summary rows. It uses
  calculated type sizes, several unclassified pixel literals, no semantic line
  heights, no line-item list root, no description-list reset, and no explicit
  cart-item container query.
- Cart Drawer currently declares `.cart-item` as required even though its
  `lineItems` slot is optional for an empty cart. Required-within-present versus
  optional-whole-slot anatomy is not explicit.
- Studio and Exhibit share `GlobalStudio`, but the Cart Drawer branch duplicates
  Drawer Close Button markup, lacks `role="dialog"`/`aria-modal`, does not enter
  the shared focus/Escape/return lifecycle, uses a generic labelled `div` rather
  than a list, renders only one Quantity Selector, and removes a line without a
  contextual accessible name.
- Studio's local Quantity buttons maintain separate React arithmetic while the
  page also ships the canonical Quantity enhancer, creating a risk of duplicate
  stepping instead of one native input owner.
- `components/js/theme.js` contains dead Cart Drawer logic for `.cart-drawer` and
  `.cart-drawer__overlay`, but canonical and Shopify markup use `.drawer`,
  `.drawer-overlay`, and `data-cart-*`. The listeners cannot open the current
  adapter and still do not provide the accepted Drawer focus lifecycle.
- Shopify has dedicated Liquid, but the panel is named only with `aria-label`,
  lacks dialog/modal/hidden state and canonical Close Button markup, repeats
  product navigation through image and title links, uses generic summary spans,
  has unlocalized Remove/Total/shipping copy, and relies on the dead shared
  runtime. Its target status correctly remains planned.
- Deterministic level-9 gzip baseline is Global CSS `4,470 B`, complete Web
  component CSS `64,484 B`, and shared runtime `10,321 B`. Global already exceeds
  its provisional `3.7 KiB` ceiling by `682 B`; Web retains `1,052 B` headroom;
  shared runtime retains its existing budget exception.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Modal content keeps focus inside, closes on Escape, returns focus logically, has a visible close Button, and is named by a visible title. Structured content should not be collapsed into one `aria-describedby` string. | Compose canonical Drawer exactly; keep list/summary structures navigable and demonstrate, but do not duplicate, its target lifecycle. |
| [HTML Standard grouping content](https://html.spec.whatwg.org/multipage/grouping-content.html) | `ul`/`li` represent lists; `dl` groups terms with descriptions/values. | Use a native line-item list and `dl`/`dt`/`dd` for compact summary label/value pairs instead of generic labelled groups and spans. |
| [WCAG Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html) | Mutation completion/status text that does not receive focus must be programmatically determinable. | The target owns one deliberate status channel for confirmed cart changes and errors; Cart Drawer does not announce every Price or raw input event independently. |
| [Open UI Dialog research](https://open-ui.org/components/dialog.research/) and [popover distinction](https://open-ui.org/components/popover.research.explainer/) | Modal dialog is the established cross-system concept and differs from light-dismiss non-modal popover behavior. | Keep v1 on accepted modal Drawer; do not infer popover, non-modal mini-cart, or light-dismiss policy. |
| [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) | Mature headless APIs separate Root/Trigger/Portal/Overlay/Content/Title/Description/Close, controlled/open state, focus hooks, Escape, outside interaction, and focus return. | Cart Drawer supplies commerce content to the Drawer target rather than recreating another overlay API. |
| [Shopify cart template guidance](https://shopify.dev/docs/storefronts/themes/architecture/templates/cart) | Cart lines own variant/quantity records; themes should expose removal and quantity updates, discounts, properties, and checkout from truthful cart data. | Map line keys, native quantities, product metadata, prices, totals, and actions in the Shopify target; keep them out of neutral fixture API. |
| [Shopify Ajax Cart API](https://shopify.dev/docs/api/ajax/reference/cart) and [Ajax API overview](https://shopify.dev/docs/api/ajax) | Hosted themes can change one line, remove with quantity zero, and request rendered sections; custom storefronts use different APIs. | Do not ship one cross-target network client. Shopify chooses form/Ajax and section re-rendering; frameworks/native choose their own cart stores. |
| [Shopify Dawn Cart Drawer](https://github.com/Shopify/dawn/blob/main/snippets/cart-drawer.liquid) | A mature target handles empty/populated layouts, dialog semantics, focus, line errors, quantities, discounts, totals, checkout, and section updates through a large target-specific surface. | Adopt semantic composition and data completeness, not Dawn's custom element, settings breadth, visual identity, or JavaScript architecture. |
| [Shopify Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements) | Themes must allow line quantity changes and display an empty-cart message. | The adapter must preserve Quantity Selector/form semantics and an authored empty fallback before claiming target-ready behavior. |

No component-specific owner image is stored in the repository or attached to
this batch. Studio retains Figma trace IDs, but they are presentation traceability,
not accessible visual evidence. Human review must approve the repository render
or replace it with owner-provided references.

## Matches, Differences, And Direction

- Accepted ADRs already separate Drawer lifecycle, Price formatting, Quantity
  native ownership, and target cart state. Refinement should consume those
  boundaries rather than create a second Cart Drawer state model.
- The current two-slot API matches ADR 0086 and maps across Web, Shopify,
  frameworks, Figma, and native targets. Expanding it with raw products, money,
  totals, discounts, empty copy, or checkout URLs would be target-specific.
- A native list and description list improve structural navigation without
  changing commercial policy or visual identity.
- Product media adjacent to a truthful title link is redundant navigation. Use
  decorative image alt text in the canonical fixture and one product destination.
  Targets may provide informative alt text only when the image conveys content
  not repeated by title/variant text.
- The existing shared Cart Drawer runtime is both selector-dead and architecturally
  incomplete. Remove it rather than silently choosing the still-open global
  overlay/cart provider; docs keep a bounded target-local lifecycle demonstration.
- Shopify Liquid can reach semantic/data completeness while remaining `planned`
  until a target runtime owns open/close/focus, Ajax/form mutation, section
  refresh, pending/error handling, and status messages.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Drawer overlay/panel/header/title/close/body/footer | composed | Canonical Drawer modal composition | Drawer/target | Cart Drawer does not duplicate `open`, placement, naming, or lifecycle API. |
| Items | only when populated | `ul.cart-lines` | Cart Line Item/target | Canonical collection omitted for empty target content. |
| Item identity/media/details/Price/Quantity/actions | per target capability | `li.cart-line` canonical composition | Cart Line Item and dependencies | Cart Drawer does not duplicate the line's anatomy, styles, or behavior. |
| Summary | optional with populated lines | `dl.cart-drawer__summary` | Cart Drawer/target | Isolated compact summary; complete target-formatted rows only. |
| Summary row | per entry | `div` containing `dt` and `dd` | target | Preserves label/value association. |
| Total | optional emphasized row | `.cart-drawer__summary-total` | target | Does not calculate or validate the value. |
| Status/error/empty content | target composition | target-native message/content | target | Announce confirmed results once; empty/error visuals remain open product decisions. |

## Variant, State, Size, And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One Cart Drawer content composition inside Drawer. Drawer retains physical right/left variants independently. |
| Size | One container-responsive compact line layout. Drawer width and viewport bounds remain Drawer-owned. |
| Drawer state | Open/closed, focus entry/containment/Escape/return and reduced motion inherited from Drawer target. |
| Cart content | Populated list + optional summary; empty target content with no summary; one/many lines; optional media/variant/remove/quantity. |
| Mutation | Native quantity edit/request, explicit removal request, target pending/success/error/rollback; no neutral optimistic state. |
| Quantity | Target min/max/step, lower/upper availability, typed edit, disabled/read-only/error through canonical Quantity Selector. |
| Content | Short/long/localized product, many properties, long formatted price/total, zero/large quantity limits, discounts/taxes/shipping rows. |
| Direction | LTR/RTL/mixed currency; Drawer physical placement does not auto-flip. Text and row geometry use logical CSS. |
| Environment | Light, dark, forced colors, reduced motion, 200% zoom, narrow and tall containers, independently scrolling body. |

Invalid or target-incomplete states include summary without populated lines,
blank required product destination/title, duplicate product links, unlabeled
remove/quantity controls, stale totals after mutation, mutation controls left
active while duplicate requests are unsafe, an empty blank Drawer, and modal
semantics without actual focus/inert lifecycle.

## Public API And Ownership

- `lineItems` — optional ordered canonical Cart Line Item composition. Absence
  means the target supplies an empty-cart composition; the base does not invent it.
- `summary` — optional target-formatted summary composition, rendered only with
  populated lines.

Drawer `title`, `dismissAction`, `dismissLabel`, `footer`, `placement`, and
`open` belong to the Drawer dependency. Price strings/features belong to Price.
Quantity value/constraints/form state belong to Quantity Selector. Product
records, line keys, image URLs, variants/properties, remove labels, money,
discounts, taxes, shipping, checkout destinations, pending/errors, status text,
empty content, cart count, and controlled cart state remain target data or
fixture content, not Cart Drawer properties.

The cart collection is controlled by the target. Static HTML may submit a native
cart form; hosted Shopify may use forms or Ajax/section rendering; framework and
native adapters bind a cart store. Canonical Cart Drawer owns no uncontrolled
collection, raw amount math, hidden mirror, cache, queue, request, retry, or
persistence.

## Token And Value Audit

- The reconciled public contract and registry expose the existing primary,
  secondary and error text; subtle and focus border; small radius; body,
  body-small and H4 type pairs; body family; element gap; and touch-target
  tokens used by the composition. No Cart Drawer token was created.
- Calculated variant/remove typography is replaced with existing body-small size
  and line-height aliases; body and H4 also use complete semantic type pairs.
- Keep image geometry, grid columns, row gaps, padding rhythm, weight, underline,
  list resets, summary emphasis, wrapping, and container-query threshold private.
- The error token remains a destructive-hover cue for removal, not a cart error
  variant. Error content/state belongs to the target.
- `80px` media, `16px` gaps/padding, `8px` action/summary gaps, `2px` variant
  offset, weights, and underline offset require classification and human visual
  approval; prefer semantic tokens/private variables without exposing controls.

## Visual, Accessibility, Responsive, And Runtime Direction

- Preserve a restrained media/details line, strongest title/Price/total hierarchy,
  supporting variant/summary text, and underlined text removal action. Exact
  media size, density, separator strength, footer balance, and order need human
  approval.
- Use logical grid/flex geometry, intrinsic containment, `overflow-wrap`, image
  bounds, and one item-list container query so content responds to its actual
  Drawer body rather than the viewport.
- The docs target must show a truly named modal dialog, canonical Close Button,
  initial focus, Tab/Shift+Tab containment, Escape, close, and logical restoration.
- Each line has one native title link. Quantity and removal names include product
  context; status reports confirmed mutations without moving focus. Focus after
  removal stays a target decision and must land on a surviving logical control.
- Do not add a Cart Drawer widget role, nested group/listbox semantics,
  `aria-live` to Price/totals, or aggregate `aria-label` on generic containers.
- Remove selector-dead Cart Drawer listeners from shared runtime. Cart network,
  overlay coordination, and mutation services remain target-owned; no background
  work occurs while closed.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Canonical Drawer + Cart Line Item collection + isolated description-list summary; target controller owns lifecycle/cart/status. | Canonical source and docs target are migrated; updated evidence is required before restoring human-review-ready status. |
| Shopify | Liquid cart records/line keys, image/product/variant data, money filters, native quantity/update/removal form, summary, checkout and localized copy. | Semantic, localization and data mapping are reconciled. Still planned until target runtime, mutation/section-refresh, error/status and editor/store proof exist. |
| React / Angular | Controlled cart lines/store plus Drawer `open` lifecycle, mutation callbacks/promises, pending/error/status and adapter-native Price/Quantity composition. | Planned; no duplicate neutral cart store. |
| Figma | Empty/populated/many-line, optional media/variant/quantity/remove/summary, mutation visual states, scroll and Drawer placement. | Studio traces exist; visuals and richer commerce states await review. |
| SwiftUI / Compose | Native modal sheet/drawer, list rows, formatted money, steppers/buttons, summary, async target cart store and announcements. | Planned; platform focus/modal/state behavior remains native. |

## Exhibit And Studio Parity

`GlobalStudio` is registered for both modes. Cart Drawer uses the shared
`CartLineItemArtwork` implementation also consumed by K2 and Cart Page, while
retaining its own two-line target fixture, local controlled state, Drawer
lifecycle, mutation messages, optional rules, IDs and token overrides. MDX
Preview remains fallback evidence and must reflect the same semantic anatomy
without becoming a second behavior implementation.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Shared runtime selectors do not match canonical/Shopify Drawer markup. | critical | Remove dead Cart Drawer block; do not infer the open global overlay/cart provider. | implementation + accepted boundary |
| Studio Cart Drawer does not compose Drawer semantics/lifecycle or Close Button. | critical | Reuse canonical Drawer markup and the target-local focus/Escape/return proof already used by global overlays. | implementation |
| Quantity has competing React and canonical step owners. | critical | Keep native input/canonical enhancer as sole step owner; React observes target changes only. | implementation |
| Lines and summary use generic containers. | high | Add `ul`/`li` and `dl`/`dt`/`dd` semantics without extra ARIA. | implementation/contract |
| Remove name lacks product context in Studio; image/title duplicate destination in Shopify. | high | Contextually name native removal and keep one title destination with decorative adjacent media. | implementation/adapter |
| Shopify panel/dialog/hidden/Close markup and copy are incomplete. | high | Reconcile semantic structure/locales while keeping target behavior planned. | Shopify adapter |
| Empty and summary controls can produce a blank/incoherent drawer. | high | Show target-owned empty fixture when lines are absent and omit summary unless populated. | docs target/contract guidance |
| Calculated type and literal rhythm are under-specified. | medium | Use existing semantic type pairs/private geometry; record visual approval risk. | implementation/human review |
| Global CSS and shared runtime already exceed provisional budgets. | existing exception | Measure delta honestly; prefer runtime deletion and bounded CSS. | program/implementation |
| Empty visual, mutation policy, focus after removal, global overlay service and cart API remain open. | decision-needed | Document alternatives and keep target-owned; do not resolve by assumption. | owner/target architecture |

## Risks And Open Questions

1. The owner must approve media size/crop, line density, title/variant/Price order,
   separator, removal treatment, summary/footer hierarchy, Drawer balance, and
   narrow-container layout.
2. Choose the product/target policy for optimistic versus confirmed mutations,
   pending suppression, errors/retry/rollback, undo/confirmation, and focus after
   removal before a production adapter is certified.
3. Choose the global overlay coordinator/provider that connects Header to Cart
   Drawer and owns mutual exclusion, inertness, scroll lock, route dismissal,
   stacking, and focus restoration.
4. Shopify must choose native cart form versus Ajax `change.js` plus Section
   Rendering, and define line error, discount/property, cart note, inventory,
   empty, and editor-preview completeness.
5. The exact empty state may be simple authored text or canonical Empty State;
   adding that dependency/API requires product and visual review.
6. Cross-sell, free-shipping progress, promo/discount entry, notes, gift options,
   tax/shipping estimation, and checkout acceleration are separate compositions.
7. No owner visual asset is available beyond Studio trace IDs.

## Verification Evidence

- Two desktop before images preserve the generic containers, duplicate Drawer
  close composition, single Quantity control, uncontextual removal and the
  accidental later `.cart-summary` override. Thirteen after images cover
  Exhibit and Studio at 390/768/1280/1600 plus 320px container response, long
  Arabic/RTL content, dark, forced colors/reduced motion and 200% zoom.
- The shared docs renderer enters a named modal dialog, initially focuses the
  canonical Close Button, traps Tab/Shift+Tab, closes on Escape and restores the
  trigger. The Exhibit fallback synchronizes `aria-hidden` and `inert` and uses
  the same entry/exit behavior inside its shadow root.
- One canonical Quantity enhancer owns native stepping: one increment changes
  Celadon `1` to `2` exactly once and synchronizes the target-owned total/status.
  Removal announces the result, moves focus to a surviving logical control and
  reaches a target-authored empty state with summary omitted after the last line.
- The rendered dialog contains one native list, two list items, one description
  list with paired terms/definitions, one title destination and one decorative
  image per line, and contextual quantity/removal names. Default item media is
  `80px`; the 320px Drawer body invokes its container query at `64px` and stacks
  line actions without document or component overflow.
- At 390px, long Arabic/mixed-money content keeps document, panel and list
  client/scroll widths equal (`390/390`, `358/358`, `295/295px`). The 200% CSS
  zoom probe also keeps the document, panel and list free of horizontal
  overflow. The independently scrolling Drawer body preserves header/footer.
- Light primary/supporting contrast is `17.93:1`/`7.81:1`; dark is
  `17.18:1`/`12.09:1`. Forced colors retains panel/separator boundaries and
  actionable text; reduced motion resolves Drawer and Close transitions to
  `0s`.
- Dead `.cart-drawer`/`.cart-drawer__overlay` listeners remain removed. After
  the K2 migration, final level-9 gzip is Global CSS `4,351 B`, complete Web
  component CSS `67,755 B`, and shared runtime `10,501 B`. Global CSS removes
  the parallel `.cart-item` implementation, and generated Webflow/Shopify Global
  CSS remains byte-identical to canonical source.
- Shopify now renders the shared `cart-line-item` snippet from both Cart Drawer
  and Main Cart, with named modal composition, native cart-update semantics,
  localized content, canonical Price/Quantity and compact summary. It retains
  its honest `planned` maturity until target lifecycle/cart-service proof exists.
- Contracts, Studio, docs, token and Web/Shopify adapter validation, structural,
  parity, static-preview and refinement audits, TypeScript, temporary Vite
  build, locale JSON, diff checks and `site/dist` cleanliness are recorded in
  Batch 24, with the canonical K2 migration regression recorded in Batch 83.
