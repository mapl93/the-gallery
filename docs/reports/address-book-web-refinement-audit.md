# Address Book Web Refinement Audit

Status: Human-review-ready; live protected-mutation/focus integration and human
visual review remain required; remains `pilot`

Date: 2026-07-17

## Outcome

Address Book is now one passive native collection of target-owned saved-address
records. U6 owns list/record relationships, a static neutral record surface,
postal-content containment, optional dependency placement, and intrinsic
container response. Canonical Badge owns the readable default marker; canonical
Buttons or Links own record and add actions. Targets retain authentication,
authorization, protected-data minimization, queries, locale formatting,
permissions, default truth, mutations, confirmation/recovery, routing, focus
restoration, lifecycle, announcements, privacy, telemetry, and analytics.

The neutral implementation adds no U6 runtime. Exhibit and Studio render the
same `AddressBookArtwork`, fixture, native list, two-property API, omission
rules, and canonical dependency classes. Owner decision U6-A and ADR 0263
accept canonical Add/Edit, protected Delete, conditional Set Default,
authoritative reconciliation and target-owned focus recovery. ADR 0260 resolves
Shopify v1 as hosted Profile/Addresses handoff while controlled extension/
headless views remain distinct projections and classic Liquid remains separately
versioned compatibility. No speculative account Liquid or `stable` promotion
was created.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive saved-address collection; not an auth gate, query, formatter, validator, geocoder, state store, mutation coordinator, confirmation dialog, router, live region, or telemetry client. |
| Anatomy and composition | pass | Required native list and saved-record items; required body/recipient/postal lines; optional canonical default Badge, record actions, and add action. |
| Variants, sizes, and states | pass | One neutral intrinsic profile; complete required collection, zero/one default, optional actions/add, external lifecycle, and private one/two-column response are defined. |
| Public API and ownership | pass | Accepted required `addresses` and optional `newAddressLabel` remain; records, fields, count/order, default index, actions, routes, lifecycle, columns, and breakpoints were not flattened into API. |
| Tokens and hardcoded values | pass | Fifteen stable U6 surface/text/spacing/type tokens; track minimum and add minimum block size are private. Badge/Button own their status/action visuals and states. |
| Accessibility and motion | pass | Native `ul/li`, paragraph postal content, `dir=auto`, visible default Badge text, contextual action names, logical Tab order, native Enter/Space, external feedback, no custom widget role/live region, forced-color focus, and zero reduced-motion activity. |
| Responsive/content resilience | pass | Mobile/Tablet/Desktop/XL, equal 480px containers, direct 320px, localized RTL/unbroken 200px, and 640px effective-200-percent checks stay contained. |
| Runtime and assets | pass | `0 B` U6 runtime delta; no listener, observer, timer, fetch, auth SDK, formatter, geocoder, mutation client, state store, or new target asset. |
| Cross-target translation | pass with target gaps | Canonical projection versus hosted/native handoff is accepted; Shopify remains `planned` until protected mutations, B2B policy and focus lifecycle are evidenced. |
| Documentation and verification | pass | Dossier, ADR 0189, contract, registry, CSS, shared renderer, Studio, MDX, adapter notes, before/after evidence, automated validators, and matrices agree. |

## Standards And Reference Direction

- HTML `ul`/`li` represent the unordered record collection, while HTML reserves
  `address` for contact information belonging to its nearest article/document
  and recommends ordinary paragraphs for arbitrary postal data:
  <https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element>
  and
  <https://html.spec.whatwg.org/multipage/sections.html#the-address-element>.
- APG defines no Address Book widget requiring grid/listbox roles or a custom
  keyboard model. Native Buttons already provide Enter/Space activation:
  <https://www.w3.org/WAI/ARIA/apg/patterns/> and
  <https://www.w3.org/WAI/ARIA/apg/patterns/button/>.
- APG naming guidance and WCAG Label in Name support repeated action names that
  include their visible label plus record context:
  <https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/> and
  <https://www.w3.org/WAI/WCAG22/Understanding/label-in-name>.
- Open UI list research treats compound list-item content and selection as
  separate concerns: <https://open-ui.org/components/list.research/>.
- Radix demonstrates composing passive Badge, Button, and metadata leaves
  instead of flattening all record details into the parent API:
  <https://www.radix-ui.com/themes/docs/components/badge> and
  <https://www.radix-ui.com/themes/docs/components/data-list>.
- Shopify latest accounts already own Profile Addresses. The current render-
  after extension is supplementary and unavailable for B2B customers; headless
  Customer Account API address mutations are a separate authenticated profile:
  <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets/customer-account-profile-addresses-render-after>,
  <https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/customer-accounts>,
  and <https://shopify.dev/docs/api/customer/latest/objects/mutation>.

## Contract And Browser Evidence

- Contract `0.3.0` declares Badge/Button dependencies, eight anatomy parts, four
  observed/composed states, eight behavior rules, two semantic properties, one
  intrinsic profile, fifteen U6 public tokens, and explicit target ownership.
- Browser inspection finds one `UL`, three direct `LI` items, two saved records,
  one passive canonical Badge, four paragraphs, six `dir=auto` nodes, three
  canonical Buttons, zero HTML `address`, zero grid/listbox/option roles, zero
  author `tabindex`, and zero live regions inside U6.
- Default action names are `Edit address for Alex Morgan`, `Edit address for
  Studio`, and `Add address`. From a preceding sentinel, Tab reaches them in
  that order. Enter and Space activate the native fixture Buttons.
- Activation produces explicit site-only Status text outside U6 without
  changing record count or default truth. U6 stays passive.
- Empty records, duplicate record IDs, missing postal lines, two defaults, and
  an action name that omits its visible label all return no renderer. A blank
  optional add label removes only the final add item; restoring the label
  restores three items and three Buttons.
- Exhibit and Studio serialize exact identical normalized U6 DOM. Their page
  chrome provides different widths at Desktop/XL; at an exact `480px` root,
  their full selected computed-style signatures are identical.
- Intrinsic one- and two-column states were observed. Mobile, Tablet, Desktop,
  and XL have zero U6/document overflow. A direct `320px` root and localized
  mixed-direction/unbroken content at exactly `200px` remain contained with
  zero overflowing descendants. A 640px viewport equivalent to 200-percent
  reflow from 1280px also remains contained.
- Light contrast measures `17.93:1` primary/action, `7.81:1` secondary, and
  `13.15:1` Badge. Dark measures `17.18:1`, `12.09:1`, `5.92:1`, `11.28:1`,
  and `11.74:1` across primary, secondary, Badge, edit, and add content.
- Normal and forced-color keyboard focus are solid `2px` outlines with `2px`
  offset. Forced colors retains readable `Default` text. Reduced motion reports
  zero non-zero transitions or animations in the U6 subtree.
- Nineteen final images, four retained baseline images, and machine-readable
  measurements/interactions/parity live in
  `output/playwright/refinement-batch-98/`.
- Evidence used one named headless Playwright session, one tab, and one managed
  docs server. Final console reports zero errors/warnings; cleanup closed all
  owned resources and left port 4173 free.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Native saved-address list/items, paragraph postal lines, passive canonical Badge, and canonical record/add actions. | Implemented and evidenced with zero U6 runtime. |
| Shopify v1 theme/current accounts | Shopify-owned hosted Profile/Addresses experience. | Accepted native handoff; `planned`, `ready:false`, intentional U6 omission and no parity claim. |
| Shopify customer-account extension | Supplementary or controlled target-native profile surface. | May project U6 semantics when it owns the record view; placement, B2B, APIs, packaging and lifecycle remain target work. |
| Headless Shopify | Canonical U6 view fed by authenticated Customer Account API records/mutations. | Valid target-controlled projection; protected data, auth, formatting, default truth, permissions, confirmation/undo, reconciliation, focus and lifecycle remain integration-owned. |
| Deprecated-account compatibility | Explicit separately versioned Liquid profile using customer addresses/forms/routes/locales. | Not the v1 default and never an automatic fallback. |
| Webflow / Framer | Canonical CSS projection plus secure project-owned membership/data/action provider. | Visual composition available; protected data and mutations remain target-owned. |
| React / Angular / Hydrogen | Shared semantic composition over external authoritative address/query/mutation state. | Contract-ready; no framework dependency or second state store in base source. |
| Figma | Auto-layout record list using canonical Badge and Button instances. | Planned; registered generic Button nodes are not U6 visual approval. |
| SwiftUI / Compose | Native saved-address list with passive default text and platform actions. | Conceptual; preserve native list/action/accessibility and protected-data conventions. |

Source-identical Account CSS passed official Shopify validation as artifact
`u6-address-book-shopify-20260717`, revision 1. U6 remains `css-ready`,
`ready:false`; the current global Shopify target-ready count is 90.

## Performance And Risks

- U6 CSS changes from `1,663 B` raw / `676 B` gzip to `1,726 B` raw /
  `661 B` gzip. Native/container structure adds `63 B` raw while removing `15 B`
  compressed from duplicate default/add interaction styling.
- Current Account CSS is `2,853 / 3,072 B` gzip with `219 B` headroom.
- Current neutral component CSS is `71,884 / 65,536 B`; its existing program
  gap remains documented and U6 contributes no new CSS in this reconciliation.
- Shared runtime is `22,807 / 8,192 B`; U6 adds `0 B` and Shopify U6 adds no
  target JavaScript.
- Canonical, Webflow, and Shopify Account CSS are byte-identical. Account CSS
  SHA-256 is
  `6e0f08c5cf61dc9268fab75278e4a95ff638a64e9a1a818aa4fa188195365e36`;
  the U6 slice SHA-256 is
  `5e79f1306a74485eed9d3d826bf016a37601badab493e532466346dd2c92ca56`.
- Targets must prove supported actions, protected Delete, conditional Set
  Default, authoritative reconciliation, concurrency, feedback and deliberate
  focus restoration against real protected data.
- The Shopify profile policy is resolved; live hosted, extension/B2B, headless
  or compatibility proof remains target-specific integration work.
- Human review must approve record surface/density, Badge placement, action
  hierarchy, add treatment, track minimum, fixture copy, final visuals, and
  corrected U6-specific artwork.

## Validation

Registry/docs, all 183 contracts and Studio definitions, TypeScript, 254 static
previews, Neutral Web adapter, Shopify adapter, official Shopify validation,
native semantics/activation/focus, exact normalized Exhibit/Studio DOM and
same-container styles, four viewports, direct narrow container, localized
RTL/200px, effective 200 percent, light/dark contrast, forced colors, reduced
motion, invalid/optional composition, deterministic performance, generated-copy
identity, temporary production build, visual inspection, diff checks,
`site/dist` cleanliness, and owned-resource cleanup are included.

## Readiness Decision

`human-review-ready`. Safe neutral semantic, canonical, responsive,
performance, protected-mutation policy, adapter-boundary and evidence work is
complete. Live protected-data mutation/focus integration, final visuals and
corrected U6-specific artwork remain pending. U6 remains `pilot`; no automatic
`stable` promotion was made.
