# Component Dossier: Cart Line Item

Status: `human-review-ready`

Target reviewed: Neutral Web, Cart Drawer/Cart Page compositions, and Shopify cart surfaces

Contract: `components/contracts/cart-line-item.contract.json`

## Recommendation

Make Cart Line Item the one canonical, target-controlled line-record composition
used by Cart Page, Cart Drawer, Order Detail, and future commerce surfaces. A
populated collection uses `ul.cart-lines` with one `li.cart-line` per target line
identity. The line owns stable product-identity layout and dependency slots; it
does not own cart data, money formatting, inventory, mutation, persistence, or
announcement policy.

Require a non-empty product title and canonical Price composition. Keep media,
destination, selected variant/properties, Quantity Selector, remove, and the
accepted save-for-later action optional. Render at most one product destination;
an adjacent repeated image is decorative by default. Compose canonical Price
instead of duplicating current/compare markup, and canonical Quantity Selector
instead of maintaining a second numeric value or step algorithm.

Migrate Cart Drawer's parallel `.cart-item` anatomy to `.cart-line`, superseding
only the line-ownership portion of ADR 0109. Cart Drawer continues to own its
compact summary and compose Drawer; Cart Page continues to own page layout and
Cart Summary. Targets own line keys, formatted strings, constraints, pending and
error state, mutation results, status cadence, and post-removal focus.

## Purpose And Limits

- Represents one target line record in a cart, saved-cart, or read-only order
  collection.
- Presents product identity, optional media and selected attributes, one
  canonical formatted Price, and optional target-supplied line controls.
- Supports editable cart usage through optional Quantity Selector, removal, and
  the already accepted optional save-for-later action.
- Supports read-only usage such as Order Detail by omitting quantity and mutation
  actions while preserving identity and Price.
- Is not a cart collection, page, drawer, summary, product card, inventory model,
  money formatter, discount calculator, line-property schema, network client,
  persistence service, status region, or optimistic-state coordinator.
- Does not decide whether a product can be revisited, removed, saved, changed,
  discounted, backordered, subscribed, fulfilled, or returned. Targets render
  only truthful capabilities and content.
- Does not expose Shopify line keys, Storefront IDs, raw amounts, URLs to mutate,
  inventory quantities, discount allocations, or selling-plan records as neutral
  properties.

Use Product Card for a discoverable catalogue record, Order Detail for an order
surface, Cart Drawer for a modal cart collection, and Cart Page for the full-page
composition. Those parents consume Cart Line Item instead of reproducing it.

## Current Gallery Baseline

- Registry `K2`, Cart, depends on Quantity Selector and Price; contract `0.1.0`,
  `pilot`; generated Web adapter reports CSS implemented and Shopify planned.
- Canonical CSS uses a three-column viewport-responsive grid with fixed `80px`
  and `100px` media, `16px` gaps/padding, physical properties, incomplete type
  roles, calculated body sizes, a fixed non-wrapping price column, and duplicated
  current/compare styling instead of canonical Price.
- The root is styled without list context. Studio, MDX, and Cart Page render an
  `article`; the line is not independently distributable content and loses the
  native collection semantics expected for multiple cart records.
- The contract requires media, `imageAlt`, destination, raw `price`, and a
  dedicated `comparePrice`, although Cart Drawer and Order Detail need valid
  media-less, non-navigable, or read-only records. Its required price wrapper
  duplicates the Price dependency rather than declaring a slot.
- Studio and Exhibit share `CartStudio`, but the renderer maintains React
  quantity arithmetic in parallel with the canonical enhancer, uses ordinary
  `div` price parts, unmounts the line locally, hardcodes English result/undo/
  saved copy, and does not model target pending or error results.
- The primary Exhibit/Studio fixture is visually shared. Existing mobile and
  desktop captures show a compact mobile line and a desktop line with the price
  isolated at the far edge. Tablet, XL, long/localized/unbroken content, missing
  media, read-only, pending/error, dark, forced-colors, reduced-motion, zoom and
  focus evidence are absent.
- Cart Drawer owns a second `.cart-item` implementation in Global CSS, Studio,
  MDX, and Shopify despite K2 becoming the canonical line dependency. Cart Page
  Shopify repeats the same parallel class with duplicate product links, generic
  containers, inline mutation JavaScript, English copy, and a viewport query.
- Shopify Cart Drawer has the stronger target baseline: a native line list,
  decorative adjacent media, one title destination, canonical Price and Quantity
  markup, contextual native removal, line keys, native update form, localized
  text, and target-controlled cart truth. It still uses the parallel class.
- Deterministic level-9 baseline is K2 CSS slice `2,318 B` raw / `740 B` gzip,
  complete Cart CSS `13,035 B` raw / `2,638 B` gzip against the `3.0 KiB`
  ceiling, complete neutral Web component CSS `67,810 B` gzip against the
  unchanged `64 KiB` program ceiling, and shared runtime `10,501 B` gzip against
  the existing `8 KiB` exception. K2 adds no neutral runtime or asset.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `ul`/`li`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element) | `ul` represents a list of items and its children are `li` records. | A populated cart/order collection uses one native list and one `li.cart-line` per target line identity. |
| [HTML `article`](https://html.spec.whatwg.org/multipage/sections.html#the-article-element) | `article` is independently distributable or reusable self-contained content. | A cart line is a record whose meaning depends on its collection; do not add `article` semantics by default. |
| [HTML `s`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-s-element) | The standard uses an old retail price as an example of content no longer accurate. | Consume canonical Price, which already owns native compare-at semantics, labels and value isolation. |
| [WCAG 2.2 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | Cart-update and action-result text shown without moving focus must be programmatically determinable. | The target owns one deliberate status channel for confirmed quantity/remove/save results and errors; the line itself is not a live region. |
| [WCAG 2.2 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) | Sequential focus order must preserve meaning and operability as content changes. | After target-confirmed removal, move focus only according to the surrounding list/page/dialog policy, usually to a surviving logical action or collection heading. |
| [WCAG Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | Controls need programmatically determinable names, roles, states and values. | Use native link/button/number input semantics, contextual action names, and truthful disabled/busy behavior rather than generic clickable containers. |
| [WAI-ARIA APG pattern index](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines widget interaction patterns but no Cart Line Item widget. | Keep ordinary list, link, button and form-control HTML; add no line widget role, roving focus or custom keyboard model. |
| [Open UI components](https://open-ui.org/components/) | Open UI does not establish a stable cart-line control contract. | Rely on native list/form semantics and commerce-target evidence instead of inventing an emerging web widget. |
| [Radix Primitives](https://www.radix-ui.com/primitives) | Radix supplies behavioral primitives but no commerce cart-line component. | Compose Gallery's canonical primitives; do not manufacture a controlled headless cart store API. |
| [Polaris React components](https://polaris-react.shopify.com/components) | Polaris has collection/resource patterns but no storefront editable cart-line primitive. | A navigable admin resource item is not a substitute for an editable storefront line record. |
| [Shopify Liquid `line_item`](https://shopify.dev/docs/api/liquid/objects/line_item) | A line item exposes quantity, options, properties, selling plan, original/final line prices, unit price, discounts, URL and removal URL. | Shopify maps complete target data into semantic slots; the neutral component does not mirror the platform record. |
| [Shopify cart template](https://shopify.dev/docs/storefronts/themes/architecture/templates/cart) | Themes expose native cart updating/removal through line quantities and cart forms and may show properties and discounts. | Preserve native form semantics and line keys in Liquid while keeping presentation target-agnostic. |
| [Shopify Ajax Cart API](https://shopify.dev/docs/api/ajax/reference/cart) | `cart/change.js` mutates one identified line and returns target cart state. | Mutation, pending/error/rollback and section refresh are Shopify-controller concerns, not shared component JavaScript. |
| [Hydrogen `CartForm`](https://shopify.dev/docs/api/hydrogen/latest/components/cartform) | Hydrogen separates line update and removal actions through a target fetcher boundary. | Framework adapters bind controlled line records and async results without changing canonical anatomy. |

The standards and mature systems converge on native collections, target-owned
commerce truth, and ordinary controls; they do not converge on one raw cross-
target cart-record object. Gallery therefore standardizes semantic composition,
not a universal cart service.

## Matches, Differences, And Direction

- Gallery already names Price and Quantity Selector as dependencies; the current
  markup does not actually delegate their full semantics and state ownership.
- ADR 0077 accepts visible product identity, target-formatted price content,
  Quantity Selector, and optional named remove/save actions. Refinement preserves
  those capabilities while replacing primitive raw strings with canonical slots.
- ADR 0109 correctly assigns cart truth and modal lifecycle to the target/Drawer,
  but its temporary `.cart-item` anatomy duplicates K2. The goal's canonical-
  composition rule now requires Cart Drawer to consume K2.
- Shopify's line-item object is richer than the neutral component. Options,
  properties, discounts, selling plans, unit prices and errors are target-authored
  semantic detail/Price/status content, not new raw neutral properties.
- One title destination plus decorative adjacent media avoids duplicate links.
  A target may supply informative alt text only when media adds information not
  repeated by product identity or selected attributes.
- Save for later remains an optional accepted semantic request. Targets without a
  persistence service omit it; no neutral storage behavior, success label, undo,
  or analytics is inferred.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Collection | when one or more lines render | `ul.cart-lines` | parent/Cart Line Item CSS | Native collection and container-query owner; omitted for a target-authored empty state. |
| Root | per record | `li.cart-line` | Cart Line Item/target | One stable target line identity; no `article`, widget role or aggregate label. |
| Media | optional | `img.cart-line__image` | target | Decorative `alt=""` by default beside repeated text; informative only for unique content. |
| Information | yes | generic wrapper | Cart Line Item | Bounds identity, details, Price, Quantity and actions without creating a named group. |
| Title | yes | text or one native link | target | Non-empty identity; link renders only with a valid truthful destination. |
| Details | optional | ordinary text or target-authored list | target | Variant, options, properties, selling plan, fulfilment or discount detail; no raw universal schema. |
| Price | yes for priced records | canonical Price slot | Price/target | Complete target-formatted current/compare/unit meaning; no duplicate price classes. |
| Quantity | optional | canonical Quantity Selector slot | Quantity Selector/target | Native number input remains sole local value/constraints/form owner. |
| Actions | optional | ordinary wrapper | Cart Line Item | Contains only target-supported line requests. |
| Remove | optional | native Button | target | Visible label may stay concise; accessible name includes product context. |
| Save for later | optional | native Button | target | Render only with a real target persistence capability; target owns result and future location. |
| Status/error | target composition | target status/error region | parent/target | Keep outside the line or in a stable target-owned location according to mutation/focus policy. |

Cart Page and Cart Drawer compose `.cart-lines > .cart-line`. Order Detail uses
the same list/line structure with mutation controls omitted. Cart Drawer retains
its isolated `.cart-drawer__summary*` anatomy; Cart Page retains Cart Summary.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One semantic line composition. Editable versus read-only is determined by optional composed controls, not a visual variant class. |
| Size | One intrinsic default with container-responsive reflow. Parent width, not viewport, determines compact layout. |
| Content | Required title + Price; optional media, destination, details, quantity, remove, save. Target-authored additional detail may wrap. |
| Navigation | Linked title when destination is truthful; plain title when unavailable. Never duplicate image and title destinations. |
| Quantity | Native typed input, increment/decrement, min/max/step, disabled/read-only and target pending/error through canonical Quantity Selector. |
| Mutation | Idle request controls; target pending suppression; success/error/rollback; post-removal focus. No neutral optimistic state. |
| Price | Default current; sale current/compare; optional unit expression through canonical Price. Target updates once cart truth changes. |
| Collection | One/many lines, all controls present, read-only order lines, target empty state with no list. |
| Media | Present, omitted, loading, failed target fallback, decorative or uniquely informative. |
| Content stress | Short, long localized, unbroken identifier, many properties, large quantity, long currency/range/unit strings. |
| Environment | Light, dark, forced colors, reduced motion, 200% zoom, LTR/RTL/mixed currency, narrow Drawer and wide page containers. |

Invalid or incomplete states include a blank title, raw or unlabelled price
markup, a destination without link semantics, two product destinations, an
unlabelled Quantity Selector, action controls without product context, target-
unsupported save/remove actions, stale price/totals, or removing DOM before the
target confirms its chosen mutation policy.

## Public API And State Ownership

Recommended semantic API:

- `title` — required non-empty visible product identity.
- `href` — optional truthful product destination; omission renders plain title.
- `media` — optional target media slot. Alternative-text policy belongs to the
  rendered media; `imageAlt` is not independently required when media is absent.
- `details` — optional semantic content slot for selected variant/properties or
  equivalent target detail. It replaces a single target-limiting `variant` string
  while allowing the existing simple fixture to map unchanged.
- `price` — required canonical Price slot for priced records.
- `quantitySelector` — optional canonical Quantity Selector slot.
- `removeAction` — optional target-controlled native Button request.
- `saveAction` — optional target-controlled native Button request, preserving
  ADR 0077 without implying persistence support in every target.

Slots carry target content and dependency markup; Studio booleans control slot
presence and keep representative content fixture-owned. Do not expose raw amount,
currency, locale, image URL, quantity, min/max, line key, item ID, discount,
selling plan, pending/error, success copy, undo, analytics or network properties
at this neutral layer.

The line is controlled by its parent target. Static HTML may submit a native cart
form; Shopify may use forms or Ajax/section rendering; React/Angular bind a cart
store/fetcher; native targets bind platform state. Cart Line Item owns no
uncontrolled line record, mirror input, arithmetic, cache, queue, request, retry,
formatter, live region, or persistence.

## Token And Value Audit

- Public CSS inputs should be only the existing subtle/focus borders, primary/
  secondary/accent/error text, small radius, element gap, touch target, body and
  body-small type pairs, body/heading families where visually retained, and
  accepted Price/Quantity dependency tokens actually referenced by the source.
- Remove duplicated price-specific public references from K2; canonical Price
  owns its internal current/compare/unit typography and semantics.
- Use private `--_cart-line-media-size`, detail/action gaps, grid geometry and
  the `36rem` reflow threshold. Those are compositional and fail the configurability test.
- Replace `calc(body * .875/.75)` with existing complete Body Small typography.
  Complete title/body line-height and family mappings without inventing tokens.
- Classify media size, gap, padding, separator, weights, underline offset and
  compact threshold as private visual decisions requiring human approval.
- Eliminate viewport literals and physical alignment where logical/container
  alternatives exist. No Cart Line Item component token is justified.

## Visual And Content Audit

- Preserve a restrained product-record hierarchy: media and identity first,
  formatted Price clearly readable, selected details secondary, quantity and
  mutation actions subordinate but operable.
- Wide layouts should not strand Price at an arbitrary far edge; cap the line to
  its parent's content geometry and allow the Price dependency to wrap safely.
- Narrow layouts should reflow Price beneath identity/details while preserving
  source and focus order. Do not visually reorder controls away from DOM meaning.
- Use logical spacing, safe wrapping, `min-inline-size: 0`, bounded media, and
  natural block growth. Long legal price/detail text must not truncate.
- Omitted media must collapse cleanly without leaving an empty grid column.
- Exact media scale, density, title family/weight, separator, action underline,
  error-hover strength and Price position remain owner visual-review items.

## Accessibility And Interaction

- Native `ul`/`li` exposes the collection. Add no `list` role, `group`, `article`,
  custom cart-line role, roving tabindex, or aggregate `aria-label`.
- Use one title link only when a destination exists. Keep media out of the focus
  order and decorative when it repeats adjacent identity.
- Compose canonical Quantity Selector. Its input owns value, constraints,
  disabled/read-only/form/reset semantics and step operations; the parent observes
  input/change and performs the target mutation.
- Use native Button for remove/save. Preserve visible focus, touch target,
  disabled/pending suppression, and a product-context accessible name.
- Quantity/remove/save results and errors are announced once by the parent target.
  Do not place `aria-live` on every line or Price. The target decides whether
  pending is communicated through Button state, adjacent text, a stable status,
  or a combination supported by its async model.
- After target-confirmed removal, surrounding collection/page/dialog logic places
  focus on the next/previous surviving action or a logical collection heading.
  K2 cannot choose this without parent context.
- Motion is unnecessary. Preserve reduced-motion compatibility by avoiding line
  removal animations in neutral source; targets may add bounded transition only
  with focus/order-safe behavior and a reduced-motion fallback.
- Forced colors must retain separators and focus; link/action affordance cannot
  depend only on subtle color change.

## Responsive And Performance

- `.cart-lines` is the named inline-size container; `.cart-line` responds to its
  actual Drawer/page/order width rather than viewport width.
- Test at container widths near `200px`, narrow Drawer, tablet content column,
  desktop page column, and XL layout plus the required 390/768/1280/1600 outer
  viewports in both Exhibit and Studio.
- DOM remains linear per record: one list item, optional media, one info wrapper,
  dependency roots and native actions. No duplicated hidden mobile/desktop DOM.
- Passive layout adds `0 B` neutral JavaScript, no asset, listener, observer,
  timer, network request, formatter, layout read or animation loop.
- Cart CSS ceiling remains `3.0 KiB` deterministic gzip. Consolidating the
  duplicate Global `.cart-item` implementation should reduce total source even
  if Cart CSS gains the native list/container rules. The complete `64 KiB` CSS
  and `8 KiB` runtime ceilings remain unchanged; current overages stay explicit.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native `ul.cart-lines > li.cart-line`, optional media/destination/details, canonical Price and Quantity Selector, native target action Buttons. | Implemented in canonical source, K2, Cart Page, Cart Drawer and Order Detail; four-viewport and special-mode evidence complete. |
| Shopify | `cart.items`/line records, stable `item.key`, target money filters, options/properties/selling plan/discount content, native update/remove form or Ajax, localized labels/status. | Shared target-native snippet is consumed by Main Cart and Cart Drawer; target runtime proof remains planned. |
| React / Angular | Controlled line record and async target actions; render canonical semantic slots and observe Quantity input without a second value owner. | Planned; no neutral cart store or formatter. |
| Figma | Media/no-media, linked/plain identity, editable/read-only, sale/unit Price, long/localized and pending/error visual compositions. | Generic Studio trace exists; component-specific visual approval and richer states are absent. |
| SwiftUI / Compose | Native list row, formatted money text, optional stepper/actions, target async store and accessibility announcements. | Planned; platform state/focus/list semantics remain native. |

## Exhibit And Studio Parity

`CartStudio` remains the registered shared K2 renderer for Exhibit and Studio,
with one fixture, one initial state and canonical CSS. The extracted
`CartLineItemArtwork` is also consumed by Cart Page, `GlobalStudio` Cart Drawer
and Account Order Detail, so those surfaces no longer copy line markup or
quantity behavior.

The shared initial fixture should remain visually recognizable but use decorative
adjacent media, one title destination, canonical Price markup, canonical Quantity
Selector data contract, and contextual actions. MDX Preview is fallback evidence
and must use the same native list/anatomy; it must not become a separate behavior
implementation.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Cart Drawer, Cart Page Studio, MDX and Shopify duplicate a parallel line anatomy. | critical | Consolidate on `.cart-lines > .cart-line` and one site-target renderer; amend ADR 0109's temporary line ownership. | goal principle + implementation/ADR |
| K2 declares Price dependency but duplicates its markup/API. | critical | Replace raw current/compare parts with one canonical Price slot and semantics. | implementation/contract |
| React quantity arithmetic competes with the canonical enhancer/value owner. | critical | Let native input/canonical Quantity Selector own stepping; parent observes changes and target results. | implementation |
| Root uses `article` without collection semantics. | high | Use native `ul`/`li`; standalone evidence wraps one line in a list. | implementation/contract |
| Media and destination are required even for valid no-media/read-only records. | high | Make media and destination optional; require title and Price composition. | contract refinement |
| Duplicate image/title links and informative repeated alt text occur in current surfaces. | high | Keep one title destination and decorative adjacent media by default. | implementation/target |
| Main Cart Liquid uses generic records, inline mutation JavaScript and English copy. | high | Use canonical line/list, native named form submission/localized copy; keep Ajax/pending/status target-owned. | Shopify adapter |
| Removal/save local demo invents immediate success/undo policy. | high | Demonstrate target-controlled request/result without claiming a neutral mutation policy. | site target |
| Viewport query and fixed non-wrapping price column fail container/long-content requirements. | high | Add intrinsic/container reflow, logical properties and canonical Price wrapping. | implementation |
| Save for later lacks a universal target service. | accepted optional boundary | Preserve optional semantic action from ADR 0077; targets without persistence omit it. | accepted ADR + target |
| Visual hierarchy/density lacks owner evidence. | human review | Preserve a coherent candidate, capture complete evidence, and request visual approval only after implementation gates pass. | owner |

## Evidence And Validation Result

- Existing parity Mobile/Desktop images preserve the pre-refinement three-column
  line baseline. Four after viewports for Exhibit and Studio cover 390x844,
  768x1024, 1280x800 and 1600x1000 using one managed server/session/tab.
- Additional captures cover a long localized read-only line without media,
  destination, details, Quantity or actions; save and remove result states; dark
  plus reduced motion; forced colors; and Mobile/Desktop Cart Drawer regression.
- The accessibility tree confirms one native list/listitem, one optional title
  link, contextual Quantity and action names, and Price labels. The read-only
  state removes every optional control and link while retaining title and Price.
- Quantity increment changes the native spinbutton from 1 to 2 once. Save exposes
  a disabled result label and target-owned status; remove replaces the local
  record with a status and restore action. The component itself remains passive.
- Console inspection reports zero component errors or warnings. Contract, Studio,
  docs, Web/Shopify adapter, official Liquid, Exhibit/Studio parity, static
  preview, TypeScript, refinement, deterministic gzip, generated-copy,
  `git diff --check`, `site/dist` and resource-cleanup gates pass.
- Final level-9 gzip is K2 slice `997 B`, Cart CSS `3,021 B`, complete Web CSS
  `67,755 B`, Global CSS `4,351 B`, and shared runtime `10,501 B`. Relative to
  the K2 baseline, Cart is `+383 B`, complete Web is `-55 B`, Global is reduced
  through Drawer consolidation, and neutral runtime is unchanged.

## Risks And Open Questions

1. Owner visual review must approve media scale, line density, title typography,
   separator, action treatment, price placement, compact reflow and wide-line
   balance. These are not inferred from generic Figma trace IDs.
2. Cart targets must choose native submit versus Ajax/store mutation, pending/
   error/rollback policy, status cadence, and focus after removal. K2 documents
   the boundary but cannot select a universal policy.
3. Save for later remains optional under ADR 0077. Each target needs a real
   persistence destination and result model before rendering it; Shopify v1 may
   omit it.
4. Product properties, selling plans, discounts, unit prices, subscription and
   fulfilment detail need complete target content. If repeated detail requires a
   stricter future sub-anatomy, review it as a separate semantic decision rather
   than exposing the Shopify record.
5. Cart Drawer remains human-review-ready after replacing temporary `.cart-item`
   ownership with K2. Its report and Mobile/Desktop regression evidence are
   refreshed, but it does not become `stable` without explicit human review.
6. Neutral Web CSS/runtime already exceed their binding program ceilings. K2 must
   add zero runtime and should recover CSS through consolidation rather than
   raising budgets.

## Readiness Decision

`human-review-ready`. Research, canonical dependency composition, shared
consumer migration, target-native Shopify mapping, responsive/special-mode
evidence and automated gates are complete. Contract stays `pilot`; explicit
owner visual review is still required and no `stable` promotion was made.
