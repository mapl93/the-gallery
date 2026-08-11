# Component Dossier: Wishlist

Status: `human-review-ready`

Target under review: Neutral Web exact-variant saved-item collection with an
accepted target-owned hybrid persistence profile

Contract: `components/contracts/wishlist.contract.json`

ADRs 0236 and 0265 resolve contextual Empty State heading ownership, hybrid
local/account persistence, exact-variant identity, confirmed sign-in union,
confirmed removal, and unavailable-record retention. Provider integration and
final human visual review remain target/review work rather than neutral API.

## Recommendation

Define U8 as a target-controlled, heading-labelled exact-variant saved-item
collection. Its
neutral responsibility is a required title, optional target-formatted count,
and an optional collection slot containing canonical Product Card
compositions. Render the repeated products as a native unordered list with one
Product Card per list item. Every record represents one exact target variant or
merchandise selection. Stable variant identity is the merge/deduplication key;
parent product identity remains available for navigation. Keep identity,
media, navigation, price, availability, order, saved IDs, mutation state, and
data freshness in Product Card or the target data source rather than flattening
them into Wishlist props.

Replace Account Studio's copied Product Card tree with the shared canonical
`ProductCardArtwork`. Do not preserve `.wishlist-btn` as a second circular
button implementation. In the saved-items page fixture, compose a canonical
small outline Button labelled `Remove` in each Product Card footer and give it a
product-and-saved-option-specific accessible name. It is a command, not a
two-state toggle: the real target changes list/count/empty truth only after
confirmed success. Studio intercepts the command and reports honestly outside
U8 without changing canonical state.

Keep a reusable Save toggle outside U8. If a future Product Card-level
action remains visible in both saved and unsaved states, it may use stable label
plus `aria-pressed` and controlled `pressed/onPressedChange` semantics comparable
to APG and Radix Toggle. That action would need an explicit canonical owner,
dependency, persistence contract, and visual review. Do not decide that broader
API from the Wishlist page fixture. Retain unavailable exact variants with
truthful visible status and explicit navigation/removal rather than deleting or
coercing them into product-level favorites.

Apply the accepted U8-C profile at target level: anonymous local-device records
and authenticated account records are united idempotently after sign-in by
exact variant identity. Neither source destructively replaces the other. Clear
local records only after the account service confirms and returns the
authoritative result; failure preserves them intact for retry. Neutral U8 stores
nothing and exposes no provider-specific persistence API.

Use one named `wishlist` container and an intrinsic grid. Preserve Product
Card's own square media, Card surface, Price, Button, focus, coarse-pointer, and
reduced-motion behavior; Wishlist must not override them in Studio. Keep card
minimum, column count, breakpoints, header wrapping, and internal gaps private.
Expose only consumed semantic title/count/layout tokens.

The contract remains `pilot`. The semantic direction is resolved. Human review
still owns final visuals; target evidence must prove secure local/account
persistence, reconciliation, removal, focus/status, privacy, retention, and the
selected Shopify service profile.

## Purpose And Limits

- Presents exact product variants or merchandise selections already saved by a
  person or local target context.
- Gives the collection a visible title and optional localized count.
- Arranges repeated canonical Product Card compositions responsively.
- Allows targets to compose a contextual per-product removal command inside the
  Product Card slot without making it a Wishlist-owned primitive.
- Is not a product query, customer store, local-storage adapter, merge engine,
  account gate, Storefront API client, metafield schema, mutation queue,
  optimistic cache, inventory/pricing refresher, analytics client, confirmation
  dialog, live region, or router.
- Does not implement local or authenticated storage, cross-device sync,
  collection limits, ordering, consent, retention, encryption, provider scopes,
  or post-sign-in requests. ADR 0265 defines their semantic reconciliation
  policy while targets implement and prove it.
- Does not own Product Card media ratio, image loading, navigation, Price
  formatting, availability, or quick-add behavior.

## Repository Baseline Before Refinement

- Registry `U8`, account, depends only on Product Card and describes a page with
  a product grid and heart toggle button. Contract `0.1.0`, `pilot`, duplicates
  the heart button as Wishlist anatomy and owns hover/focus/pressed states.
- The contract exposes required `title`, optional target-formatted `count`, and
  required `products`. Its behavior says the parent toggles add/remove state and
  updates count, but it does not distinguish a command that removes a visible
  row from a persistent toggle that remains in both states.
- Account Studio manually reproduces Card, Product Card, Price, image, title,
  vendor, footer, and heart markup rather than consuming
  `ProductCardArtwork`. All three fixtures use the same artist image and add a
  site-only portrait ratio.
- Studio keeps local `savedProducts` and `wishlistTouched` state. The accessible
  heart label changes between `Remove` and `Save` while `aria-pressed` also
  changes, contradicting APG toggle guidance. Toggling off leaves the allegedly
  unsaved product in a Wishlist grid and changes an internal live count.
- `.wishlist-btn` reimplements Button surface, border, radius, touch target,
  hover, focus, color, transition, icon sizing, and reduced motion. It uses a
  hardcoded red `color-mix` and physical dimensions. The contract lists those
  dependency tokens as if Wishlist owned them.
- Canonical Wishlist CSS hardcodes `24px` and a `240px` track minimum. Studio
  then overrides the grid to fixed three/two/one columns at independent
  `680px` and `540px` container thresholds, overrides Product Card to portrait,
  and positions the copied heart at physical top/right coordinates.
- The root is an unlabelled `section`; the repeated cards are children of a
  generic `div` rather than native list items. The count is a live region even
  before a target mutation policy exists.
- MDX serializes another two-card tree with the same duplicated heart control.
  Runtime Exhibit and Studio share `AccountStudio`, but U8 has no isolated
  shared artwork component and the fallback differs from the runtime fixture.
- Empty products currently leaves only the header. Docs request an intentional
  empty state, but neither the contract nor renderer defines one. ADR 0236 now
  requires host-owned contextual heading markup, so U8 must compose canonical
  Empty State and must not invent competing empty-state anatomy or rank API.
- Shopify copies `account.css` but has no selected customer-account extension,
  app/metafield persistence, headless service, theme/local-storage profile, or
  target evidence. CSS presence is not Wishlist readiness.
- Registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and inspector
  `1020:480` resolve to the generic Button Component Detail/Studio shell. They
  contain Button label/type/size/state controls, not U8 anatomy or visual
  approval.
- Deterministic gzip level-9 baseline: U8 CSS slice `1,715 B` raw / `671 B`
  gzip; Account CSS `15,842 B` raw / `2,920 B` gzip against the `3,072 B`
  family ceiling; generated Web component CSS `508,077 B` raw / `68,452 B`
  gzip against the existing `65,536 B` program ceiling; shared runtime
  `53,811 B` raw / `10,501 B` gzip. U8 neutral runtime is currently zero; the
  local Studio demo state is site-only.
- Baseline U8 CSS SHA-256 is
  `d14ea219bb9ae2feb9ff50eae119b791aad67eaeebec0abe34625d18daea9037`.
  Baseline Exhibit Desktop/Mobile SHA-256 values are
  `7bdca7bd4698fdeb7095819480466e1854474c6f3fde2d117943d19018ae4f75`
  and
  `68f277e445120d8e39237144f45bb5ddc06dfb5536d87379567e86cd2ee59cae`;
  Studio Desktop/Mobile values are
  `63fc26916b90c32a84f94b93a1b0ddd8b4cf7e76ed15b6799a353d4f785ce5c0`
  and
  `b45b30e31685da92febbb344bd83ceb46f9289299deb8e3d683d1670c27c2e30`.
  They are before evidence, not owner approval.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML `section`](https://html.spec.whatwg.org/dev/sections.html#the-section-element) and [WAI region labels](https://www.w3.org/WAI/tutorials/page-structure/labels/) | A thematic section is typically headed; `aria-labelledby` can associate the visible heading with its region. | Use a real section, required visible heading, unique ID, and `aria-labelledby`; add no application/widget role. |
| [HTML unordered list](https://html.spec.whatwg.org/dev/grouping-content.html#the-ul-element) and [WAI content structure](https://www.w3.org/WAI/tutorials/page-structure/content/) | `ul` groups items whose order is not semantically sequential; list items may contain complete articles. | Render repeated saved products as `ul > li > article.card.product-card`, while target order remains data. |
| [APG Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Native Button supports command and toggle semantics. A toggle keeps its label stable with `aria-pressed`; changing Save/Remove labels is an ordinary command model without `aria-pressed`. | Wishlist-page `Remove` is a named command. Defer reusable Save toggle ownership instead of mixing both models. |
| [WCAG Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | Results, pending, success, and error messages inserted without focus can require programmatic status exposure. | Count is passive text. The target mutation owner provides complete pending/success/failure announcements and focus recovery; U8 is not a live region. |
| [Radix Toggle](https://www.radix-ui.com/primitives/docs/components/toggle) | Mature toggle API separates `defaultPressed`, controlled `pressed`, and `onPressedChange`, with native Enter/Space activation. | If The Gallery later accepts a reusable wishlist toggle, it needs explicit controlled/uncontrolled ownership; U8 should not hide local toggle state inside a page shell. |
| [Product Card dossier](./product-card.md) | Product Card already owns Card, image, title link, vendor, Price/footer composition, focus layering, and responsive media behavior. | Wishlist supplies data and contextual footer action through the canonical renderer; no copied card subtree or media-ratio override. |
| [Shopify customer-account wishlist tutorial](https://shopify.dev/docs/apps/build/customer-accounts/full-page-extensions/build-new-pages) and [full-page target](https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets/full-page) | Current Shopify documentation explicitly uses Wishlist as a `customer-account.page.render` full-page extension with Storefront API query, loading, empty branch, product sections, view links, and Remove buttons. | Current account Wishlist is an app/extension target, not universal theme Liquid. Storage, API scopes, loading, removal, empty state, navigation, and merchant installation remain target-native. |
| [Shopify customer metafield writes](https://shopify.dev/docs/apps/build/customer-accounts/metafields) | Customer Account API metafield writes require explicit definitions, access scopes, protected-customer-data handling, and extension configuration. | Do not claim a customer metafield as the default storage model; it is one explicit app architecture requiring owner selection. |

Open UI exposes no Wishlist or saved-items element/pattern. Polaris/Radix offer
lower-level layout, Button, Toggle, and product primitives rather than a
portable persistence model. That absence supports a passive composition with
target-owned data and mutation rather than a framework-shaped neutral store.

## Matches, Differences, And Direction

- Preserve the narrow semantic surface: required `title`, optional formatted
  `count`, optional `products`, and optional `emptyState`. Once loading/errors
  resolve, the target supplies products or Empty State. Do not add product
  records, IDs, amounts, image URLs, storage mode, account state, loading,
  error, optimistic, or mutation callback props to U8.
- Add semantic list-item anatomy and require canonical Product Card roots inside
  the collection. Do not add grid roles, row/column counts, roving tabindex, or
  arrow-key behavior.
- Remove `.wishlist-btn` from U8 anatomy, state matrix, CSS, and MDX. A real
  target may compose Button inside each Product Card slot. The canonical owner
  for a reusable Save toggle remains open.
- Replace the dynamic internal count/live region with passive target-formatted
  count text. Target status feedback announces completed or failed mutations
  with product context.
- Keep U8 controlled: products/count are inputs from one target source; no
  neutral or component-owned saved state exists.
- Use one shared `WishlistArtwork`, `ProductCardArtwork`, Price, and Button
  composition for Exhibit and Studio. MDX remains a matching static fallback.
- Use named-container intrinsic tracks and logical properties. Remove all
  Wishlist-specific Studio grid, portrait, toggle-position, and text-wrapping
  overrides.

## Anatomy And Ownership

| Part | Required | Web mapping | Owner |
| --- | --- | --- | --- |
| Root | yes | `section.wishlist[aria-labelledby]` | U8 thematic collection boundary |
| Header | yes | `.wishlist__header` | U8 title/count layout |
| Title | yes | contextual heading `.wishlist__title` with unique ID | target heading rank + U8 required content |
| Count | no | `.wishlist__count` passive text | target formatter/source |
| Product list | yes when populated | `ul.wishlist__grid` | U8 list/grid semantics |
| Product item | repeated | `li.wishlist__item` | U8 repetition wrapper |
| Product Card | repeated | `article.card.product-card` | canonical Product Card plus target product data |
| Per-product command | optional inside products slot | canonical Button in Product Card footer | target workflow; canonical ownership unresolved for reusable toggle |
| Empty/loading/error | outside current anatomy | target composition | target lifecycle; prefer canonical components after their semantic contracts apply |
| Mutation feedback | never internal anatomy | adjacent target Status/Alert | target mutation owner |

## State, Variant, Size, And Content Matrix

| Dimension | Direction |
| --- | --- |
| Variant | One neutral exact-variant collection. Hybrid local/account persistence is target policy, not a visual variant. |
| Size | One fluid intrinsic grid controlled by available container space. |
| Populated | One or more list items, each containing one complete Product Card with visible exact option selection. Multiple variants of one parent product may coexist. |
| Empty | Target omits `products` and supplies optional canonical `emptyState` only after absence is resolved; loading/error are not empty. |
| Count | Optional complete localized text; no U8 pluralization or live behavior. |
| Removal | Target-controlled Button command with exact option context; list/count/empty truth changes after confirmed success, with undo when feasible and focus/status outside U8. |
| Sign-in merge | Target performs idempotent union by exact variant identity and clears anonymous records only after confirmed account success. |
| Unavailable saved item | Retained with truthful localized availability, parent-product navigation, alternative selection path when available, and explicit Remove. |
| Reusable save toggle | Unsupported until canonical ownership and controlled semantics are accepted. |
| Loading/error/offline/auth | Target-owned and not inferred by U8. |
| Direction/content | Short, long, localized, RTL/mixed, unbroken, extreme price, missing media, stale product, and zero-item cases must remain contained. |
| Theme/modes | Light, dark, forced colors, reduced motion, coarse pointer, keyboard, 200 percent, and direct narrow container. |

## Public API And Controlled State

| Property | Type | Requirement | Ownership |
| --- | --- | --- | --- |
| `title` | string | required non-empty visible section title | target content; U8 labels root |
| `count` | string | optional complete localized count | target formatter/source |
| `products` | slot | optional; required when populated | repeated exact-variant canonical Product Cards with visible option/availability truth and contextual actions; omit only for resolved Empty State |
| `emptyState` | slot | optional; required when resolved empty | canonical Empty State; target owns lifecycle, copy, action, focus, and announcement |

U8 has no controlled/uncontrolled internal state because its collection is fully
controlled by the target. A future reusable Save toggle may offer controlled and
uncontrolled modes at its own canonical owner; Wishlist would consume the
controlled state. Targets own exact variant/product IDs, local and account
persistence, query, ordering, idempotent union, pending/error state, confirmed
removal, count refresh, focus, announcements, routing, analytics, privacy, and
consent. ADR 0265 constrains their observable behavior without adding U8 state.

## Tokens, Runtime, And Performance Direction

- Retain only Wishlist-owned semantic tokens for section padding, header/grid
  gaps, title typography/color, and count typography/color.
- Remove Button/touch/radius/focus/error/motion tokens from U8; Product Card and
  Button already own those values.
- Replace hardcoded header spacing and track width with existing tokens plus a
  private card minimum. Do not expose columns, minimum card width, breakpoints,
  media ratio, header orientation, or action position.
- Remove Studio-only Wishlist CSS so both modes use canonical response.
- Neutral runtime budget remains exactly `0 B`: no listener, state store,
  request, observer, timer, storage access, or live region in U8.
- Account family ceiling is `3,072 B` gzip with only `152 B` baseline headroom.
  Removing the duplicated `.wishlist-btn` should reclaim space rather than
  creating a budget exception. Complete Web CSS and shared runtime already
  exceed program ceilings; this batch must add no runtime and should reduce CSS.

## Accessibility And Responsive Requirements

- Require a non-empty visible title, unique ID, and labelled section. Heading
  rank remains target/context owned.
- Use a native unordered list and list items around complete Product Card
  articles. Do not apply ARIA grid/list roles or custom keyboard navigation.
- Preserve each Product Card's single title link, image alternative, Price
  semantics, Card-sized focus indicator, and canonical Button focus/activation.
- A removal Button uses visible `Remove` text and a product-and-option-specific
  accessible name. It has no `aria-pressed` because it performs a command.
- If a future persistent Save toggle is accepted, its label remains stable while
  `aria-pressed` communicates state; target persistence still controls truth.
- Keep count passive. Targets announce pending, completion, failure, resulting
  count, empty transition, and focus destination when those are dynamic status
  changes.
- Keep exact saved option selection visible in text. Retain unavailable records
  truthfully; do not rely on images, color or swatches alone.
- Use logical sizing, `minmax(0, 1fr)`, list reset, emergency wrapping, and one
  named container. Verify no local/document overflow at Mobile, Tablet,
  Desktop, XL, 320px, 200px, RTL, long/unbroken content, and effective 200%.

## Cross-Target Translation

| Target | Mapping | Current boundary |
| --- | --- | --- |
| Neutral Web | Labelled section, passive count, native list, exact-variant Product Cards, optional target Button commands. | Implemented with CSS/HTML and zero U8 runtime; service/storage remains target-owned. |
| Shopify latest accounts | Full-page extension using Shopify UI, authenticated service/account records, loading/empty branches, and confirmed removal. | Official Wishlist surface; requires app/service implementation and protected-data review. |
| Shopify theme/storefront | Local-device records plus app proxy/service bridge for the accepted sign-in union. | No universal Liquid customer wishlist; CSS projection is not behavior readiness. |
| Headless/Hydrogen | Local persistence plus authenticated service, product query, exact-variant union, canonical projection, and confirmed removal. | Contract-ready; live security/sync/focus evidence required. |
| React / Angular | Controlled collection/slot composition; target state manager supplies Product Cards and mutations. | Planned; no framework store in neutral source. |
| Figma | Title/count/product-card composition and populated/empty presentation; no persistence or API controls. | Registered nodes are the generic Button pilot, not Wishlist artwork. |
| SwiftUI / Compose | Native section/list/grid with product cards and target-owned async removal/state. | Conceptual only; focus and announcement behavior need target evidence. |

## Exhibit And Studio Parity Plan

- Create one `WishlistArtwork` that owns only section/header/list wrappers,
  validates the required title, and switches between target-supplied products
  and resolved Empty State.
- Render the same fixture and `ProductCardArtwork` instances in Exhibit and
  Studio. Do not keep Account-only Card markup.
- Keep demo removal feedback adjacent to, but outside, the canonical root.
- Delete Wishlist-specific Studio columns, portrait media, toggle position, and
  wrapping overrides. Direct equal-width containers must produce equal DOM and
  computed style.
- MDX preserves a static fallback with the same labelled section and list/card
  anatomy; secondary guidance remains documentation, not runtime defaults.

## Implemented And Evidenced Result

- Contract `0.4.0`, registry, Studio metadata, MDX, ADRs 0191/0236/0265,
  adapter guidance, and Account CSS agree on four semantic properties, native
  section/list anatomy, exact-variant records, canonical Product Card/Empty
  State dependencies, target-owned hybrid persistence, and zero U8 runtime.
- `WishlistArtwork` supplies one shared Exhibit/Studio root. Account Studio
  consumes `ProductCardArtwork`, Price, canonical Button, and
  `EmptyStateArtwork`; the copied card tree, `.wishlist-btn`, local saved-item
  state, portrait media override, fixed columns, and U8-specific breakpoints are
  removed.
- Populated evidence finds one labelled `SECTION`, one native `UL`, three `LI`,
  three `article.card.product-card`, three unique variant IDs, two variants of
  the same parent product, three visible saved-option labels, one retained `No
  longer available` record, three contextual canonical Remove Buttons, zero
  `aria-pressed`, and zero internal live regions. Remove leaves the exact record,
  item count, and passive count unchanged until a target confirms mutation.
- Resolved empty omits the list, composes canonical Empty State with H3 beneath
  the U8 H2 and a real Link action, synchronizes the fixture count to `0 items`,
  and has zero local/document overflow. Optional count omission removes its
  node; an empty required title fails closed.
- Mobile, Tablet, Desktop, XL, direct 320px, localized RTL/unbroken 200px,
  effective 200 percent, light/dark, forced colors, and reduced motion pass.
  At an exact 480px root, Exhibit and Studio share normalized DOM hash
  `5ed91685` and computed-style hash `1fdb4ad2`.
- U8 CSS is `1,448 B` raw / `557 B` gzip with SHA-256
  `d940e994e496d1647260693fbdd9b0aacee301bde21704588dd19ac3d6633d62`.
  Current Account CSS is `2,826 / 3,072 B` gzip with `246 B` headroom. U8
  adds `0 B` runtime.
- Nineteen refreshed final images and machine-readable results live in
  `output/playwright/refinement-batch-149/`. The result contains zero failures,
  console errors, or page errors; the one-page/session cleanup gate is clean.
  Shopify remains `planned` and `ready:false` pending live hybrid service proof.

## Resolved Decisions And Remaining Risks

1. **Resolved by U8-C / ADR 0265:** the v1 semantic profile is hybrid: local-
   device anonymous records plus authenticated account records.
2. **Resolved by ADR 0265:** stable exact variant identity is the union and
   deduplication key; parent product identity remains presentation/navigation
   data and multiple variants may coexist.
3. **Resolved by ADR 0265:** sign-in performs an idempotent union. Local records
   are cleared only after confirmed account success; failure preserves them for
   retry.
4. **Resolved by ADRs 0191/0265:** saved-page Remove is a canonical command, not
   a pressed Save toggle. Authoritative list/count/empty truth changes after
   confirmed success; target lifecycle owns pending, failure, undo, focus and
   announcements.
5. **Resolved by ADR 0265:** sold-out or unavailable exact records remain visible
   with truthful status and explicit navigation/removal; they are not silently
   deleted or converted.
6. **Target integration risk:** local security/retention, authenticated service,
   idempotency, privacy/consent, scopes, protected customer data, conflicts,
   offline retry, mutation/focus/status, and Shopify extension/service evidence
   remain provider-specific work.
7. **Human review:** section padding, header hierarchy, title/count alignment,
   intrinsic card minimum, density, media ratio, exact-selection treatment,
   unavailable state, Remove placement, empty presentation, fixture copy, and
   U8-specific Figma reference remain pending. Contract stays `pilot`.

## Readiness Boundary

The semantic and architecture decisions required for neutral certification are
accepted, and refreshed exact-variant, unavailable-record, interaction, parity,
responsive, adapter, performance, and resource-lifecycle evidence passes. U8 is
`human-review-ready`. Live storage/synchronization remains target integration
proof and does not move into neutral source. No automatic `stable` or Shopify
target-ready promotion is allowed.
