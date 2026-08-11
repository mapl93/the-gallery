# Component Dossier: Address Book

Status: `human-review-ready`

Target under review: Neutral Web passive saved-address collection and
documented canonical-or-native target handoff

Contract: `components/contracts/address-book.contract.json`

## Recommendation

Define U6 as a passive native list of one or more target-owned saved-address
records. Keep the two semantic properties accepted by ADR 0078: required
`addresses` composition and optional `newAddressLabel`. Recipient names, address
lines, identifiers, ordering, default truth, available actions, mutation state,
routes, confirmation, and target lifecycle remain record/target data inside the
composition instead of becoming root properties.

Render `ul.address-grid` only for a non-empty complete collection with unique
record identifiers, non-empty recipient names, one or more non-empty formatted
address lines, and at most one default address. Each saved record is a native
`li.address-card`. Use a paragraph for the recipient and a second paragraph
whose child spans preserve target-supplied postal lines; the HTML `address`
element is not appropriate for arbitrary postal addresses that are not contact
information for the nearest article or document.

Replace the bespoke default tag styling with a passive canonical Badge. Its
visible target-owned label communicates the default state without color. Add
and Edit use canonical actions; Delete requires confirmation or guaranteed undo;
Set Default renders only when supported. Records and the current default remain
unchanged until authoritative success. U6 does not own pending/error state,
confirmation/undo, feedback, focus restoration, routing, or mutation result.
The docs fixture demonstrates two Edit Buttons and one Add address Button; it
does not define a fixed target action inventory.

Do not compose canonical Card in this profile. The current Card default adds
fine-pointer hover lift to the complete container, which would imply that a
saved-address record containing nested actions is itself interactive. U6 owns a
neutral static record border/surface while Badge and Button remain canonical
interactive/status leaves.

The optional add action is a list item containing a canonical Button. A blank
`newAddressLabel` omits that item. Missing, empty, duplicate, or incomplete
required address records omit the complete renderer; loading, empty, error,
unauthorized, expired, and mutation feedback remain target composition outside
U6. U6 has no controlled/uncontrolled state and adds no neutral runtime.

Owner decision U6-A and ADR 0263 accept authoritative records, canonical Add/
Edit, protected Delete, conditional Set Default and target-owned reconciliation/
focus. ADR 0260 supplies the canonical-or-native account handoff. Contract
maturity remains `pilot`; final visuals and live protected-mutation evidence
remain required before cross-target readiness or `stable`.

## Purpose And Limits

- Presents an authenticated customer's saved delivery/contact address records.
- Identifies at most one target-authoritative default address with readable
  content and preserves locale-specific address-line formatting.
- Allows targets to compose record-specific edit, delete, set-default, or other
  valid actions and an optional add-address entry point.
- Is not an authentication/authorization gate, address query, form, formatter,
  validator, geocoder, deduplicator, default-state store, mutation coordinator,
  confirmation dialog, router, telemetry client, or live-update service.
- Does not prescribe which fields appear, how country-specific formatting works,
  whether billing/shipping address books are separate, or which mutations a
  target permits.
- Does not own loading, empty, error, unavailable, redacted, expired-session,
  offline, pending, success, or failure UI. Targets compose those lifecycle
  surfaces outside passive U6.

## Repository Baseline Before Refinement

- Registry and contract declare only Button even though U6 draws a bespoke
  default marker that duplicates canonical Badge typography, color, radius, and
  passive-status responsibility.
- Contract `0.1.0`, `pilot`, declares six anatomy parts, five states, three
  behaviors, and two properties. It does not require native list semantics,
  define collection validity/default uniqueness, distinguish record state from
  U6 state, clarify postal-address markup, define required-content omission,
  assign lifecycle/mutation ownership, or use a named container.
- Account Studio builds a local section/article tree with `h3`, raw new-card
  Button, generic address text, always-present live feedback, and only Edit
  actions. MDX separately serializes a different section/article tree with
  `h2`, Edit/Delete actions, different records, and a bespoke SVG. The registered
  Studio renderer currently supplies runtime Exhibit/Studio content, but U6 has
  no isolated shared artwork/fixture and its static fallback disagrees.
- The root `section.address-grid` is unnamed. Repeated address records are
  articles/headings even though they are one unordered collection, and the
  docs page outline changes heading rank between sources.
- Account CSS hardcodes `280px`, `16px`, `20px`, `12px`, `8px`, `4px`, `160px`,
  `24px`, numeric type ratios/weights, physical `top/right`, Button-primary
  color for default state, and a second add-card hover/focus/transition system.
  The root has no named container.
- Existing Mobile/Desktop evidence covers only the default fixture. It does not
  certify native list relationships, complete/invalid collection behavior,
  optional add omission, unique default state, record-specific action names,
  dependency composition, mutation feedback placement, Tablet/XL, equal-width
  parity, direct narrow containers, localized/RTL/unbroken content, effective
  200-percent reflow, dark mode, forced colors, or reduced motion.
- Registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and inspector
  `1020:480` resolve to the generic Button Component Detail/Studio shell. They
  contain Button label/type/size/state/layout controls, not U6 anatomy or owner
  visual approval.
- Shopify copies Account CSS but has no selected latest-account extension,
  headless Customer Account API view, authenticated saved-address mapping,
  explicit deprecated Liquid compatibility profile, or target evidence. CSS
  presence is not Address Book readiness.
- Deterministic baseline at gzip level 9: U6 CSS slice `1,663 B` raw / `676 B`
  gzip; Account CSS `15,325 B` raw / `2,873 B` gzip against the permanent
  `3,072 B` family ceiling; generated Web component CSS `507,560 B` raw /
  `68,342 B` gzip against the existing `65,536 B` program ceiling; shared
  runtime `53,811 B` raw / `10,501 B` gzip. U6 adds no neutral runtime.
- Baseline U6 CSS SHA-256 is
  `6fd8e63685584cfb2d752690e0e3a79acd26d40a6877c0a8f6822e09be913eca`.
  Baseline Exhibit/Studio Desktop SHA-256 values are
  `f2b5af1ab568e5e2d526eac0ab4c3c02390b3d8452b2696a433b137f7ce4ed7c`
  and `61b4ae458604cc7a91df961f7d330e4621406fda4d1085e8433ff777328a9102`;
  Mobile values are
  `999c1d5ae6862a393e45cae4b35c09cb5ced670e9bfab647db515f22c277ff33`
  and `bc8cad7069167fdc5ce4f2feb99333486f471d59e901ce9fe50c108ba6137204`.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML `ul`/`li`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element) | `ul` represents a list whose item order does not materially change the document; its items are `li` children. | Saved address records form a native unordered list rather than an unnamed section of articles. |
| [HTML `address`](https://html.spec.whatwg.org/multipage/sections.html#the-address-element) | `address` is contact information for the nearest article/body and must not mark arbitrary postal addresses; the specification recommends `p` for general postal addresses. | Use paragraphs and line spans for saved postal data; do not overstate document contact semantics. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) and [Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | APG has no Address Book widget. Native Buttons trigger actions including delete and already provide Enter/Space behavior. | Preserve native list/Button behavior; add no grid/listbox roles, roving tabindex, or custom keyboard model. |
| [APG Names and Descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) and [WCAG Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name) | Focusable controls need distinguishable accessible names, and visible Button labels should be contained in those names. | Keep visible Edit/Add labels and add record context without replacing the visible-label words. |
| [Open UI List research](https://open-ui.org/components/list.research/) | List items may be compound content surfaces with multiple text sections and controls; selection is a separate capability. | Treat cards as compound records, not selectable options or whole-card controls. |
| [Radix Themes components](https://www.radix-ui.com/themes/docs/components), [Badge](https://www.radix-ui.com/themes/docs/components/badge), and [Data List](https://www.radix-ui.com/themes/docs/components/data-list) | Mature systems compose passive Badge, Button, metadata, and layout primitives rather than teaching the collection every leaf visual. | Reuse canonical Badge/Button; keep record formatting/actions in composition and avoid flattening fields into U6 props. |
| [Shopify Profile addresses target](https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets/customer-account-profile-addresses-render-after) | Latest customer accounts already include an Addresses section; the static target renders supplementary content after it and excludes B2B customers. | A current extension is not a neutral address-list replacement and needs a separate B2B/profile strategy. |
| [Shopify Customer Account API guide](https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/customer-accounts) and [2026-07 mutations](https://shopify.dev/docs/api/customer/latest/objects/mutation) | Authenticated headless clients can create, update, delete, and set a default customer address through explicit mutations and user errors. | Target adapters own authoritative records, optimistic/pending/error behavior, default updates, and authentication. |

The references agree on native collection/actions, visible and distinguishable
control names, readable default state, compound record composition, and target-
owned secure data/mutations. They do not define one universal action inventory,
delete confirmation/recovery policy, postal formatting schema, Card visual,
empty state, or Shopify implementation profile.

## Matches, Differences, And Direction

- Keep required `addresses` and optional `newAddressLabel`; do not add recipient,
  lines, count, default index, action labels, routes, loading, error, empty,
  pending, success, failure, column, or breakpoint properties.
- Require a non-empty complete unique collection and at most one default record.
  Invalid required content omits U6 instead of rendering deceptive partial data.
- Use `ul.address-grid` and `li.address-card`. Do not add `role=list`,
  `role=grid`, `role=listbox`, selection state, or directional keyboard handling.
- Use ordinary paragraphs for recipient/postal content. Target-provided line
  arrays render as block spans with direction isolation and resilient wrapping.
- Compose `span.badge.address-card__default-tag` for the readable static default
  marker. U6 has no default Badge variant API and no live status semantics.
- Compose `.btn` actions. The docs fixture uses small Link-style Edit Buttons
  and an Outline Add Button; targets select valid canonical variants according
  to navigation/action/destructive meaning.
- Keep action feedback outside U6. The docs site may intercept fixture actions
  and announce local Status text; neutral U6 owns no live region.
- Use `container: address-book / inline-size` and auto-fit grid tracks. Card
  minimum, grid logic, add-action height, and internal placement remain private.
- Remove bespoke default-marker color/type, add-card hover/focus/transition, and
  physical-position rules. Badge/Button own their visuals and interaction.

## Anatomy And Ownership

| Part | Required | Web mapping | Owner |
| --- | --- | --- | --- |
| Root/list | yes when valid | `ul.address-grid` | U6 native collection/container |
| Saved record | one or more | `li.address-card` | U6 static record surface |
| Record body | yes | `.address-card__body` | U6 record layout |
| Default marker | no; at most one | `span.badge.address-card__default-tag` | canonical Badge + target truth/label |
| Recipient name | yes per record | `p.address-card__name[dir=auto]` | target content + U6 placement |
| Postal lines | one or more per record | `p.address-card__text > span[dir=auto]` | target formatting + U6 containment |
| Actions | optional | `.address-card__actions > .btn` | canonical Button/Link + target policy |
| Add item/action | optional | `li.address-card--new > button.btn.address-card__new-action` | U6 list placement + canonical Button |

## State, Variant, Size, And Content Matrix

| Dimension | Direction |
| --- | --- |
| Visual variant | One neutral U6 profile; no public collection/card variant. |
| Size | One intrinsic profile; grid track count is private container composition. |
| Required collection | One or more complete unique records; absent/empty/incomplete/duplicate content omits U6. |
| Default truth | Zero or one record may be default; readable canonical Badge content comes from target truth. |
| Add action | Non-empty optional label adds one final native action item; blank/omitted label removes it. |
| Record actions | Zero or more record-specific canonical controls; action inventory is target composition. |
| Mutation lifecycle | Idle/pending/success/error/confirmation/recovery remain external target state. |
| Empty/auth lifecycle | Loading, empty, unauthorized, redacted, offline, and expired remain external composition. |
| Content stress | Short, long, localized, RTL, mixed direction, unbroken, 200px container, effective 200 percent, and many records must remain contained. |

## Public API And Controlled State

| Property | Type | Requirement | Ownership |
| --- | --- | --- | --- |
| `addresses` | slot | required | Complete target-owned native saved-address record collection and allowed per-record actions. |
| `newAddressLabel` | string | optional non-empty | Visible accessible label for the optional add-address Button/Link. |

U6 has no controlled/uncontrolled state. The target owns the authoritative
collection, authentication, permissions, default identity, formatting,
mutations, optimistic/pending state, user errors, confirmation/recovery,
routing, focus, feedback, analytics, and refresh. Canonical Buttons own native
activation and their disabled/busy states when targets compose them.

## Tokens, Runtime, And Performance Direction

- Retain only U6-owned record surface, text, spacing, type, and grid tokens.
  Remove Button-primary/focus/transition/easing and default-tag type tokens that
  canonical Badge/Button already own.
- Use semantic stack/inline spacing, body/body-small type, neutral border/text,
  and radius tokens. Keep card minimum, track formula, and add-action minimum
  height as private custom properties.
- Do not consume Card's private variables or reproduce Badge/Button state
  visuals. U6 may own a static neutral record border because Card's current
  whole-card hover lift is intentionally not composed.
- Passive neutral runtime budget is `0 B`: no listener, observer, timer, fetch,
  auth SDK, formatter, geocoder, state store, mutation client, or live region.
- Account family ceiling remains `3,072 B` gzip. U6 should reclaim duplicated
  marker/action state rules rather than spend the recovered U5 headroom.

## Accessibility And Responsive Requirements

- Preserve native `ul/li` semantics and stable DOM order for records and the
  optional add item.
- Keep each action a native Button or Link. Its accessible name must include its
  visible label and enough recipient/address context to distinguish repeated
  Edit/Delete actions.
- Expose the default state as visible Badge text and allow no more than one
  default record. Do not use border/color alone or make the static Badge live.
- Do not make the whole record clickable when it contains nested actions.
- Use paragraphs for arbitrary postal addresses; preserve target formatting and
  mixed-direction content without turning line breaks into the public API.
- Keep every visible action reachable in logical Tab order with canonical focus,
  Enter, and Space behavior. Add no custom arrows or roving focus.
- Keep records and controls contained at every component width. Grid columns
  respond to the named container, not viewport or Studio-only media rules.
- Preserve Button/Badge forced-colors behavior and reduced-motion policy; U6
  adds no local motion.
- Targets must authenticate, authorize, redact, and minimize protected address
  data before providing any U6 content.

## Cross-Target Translation

| Target | Translation | Readiness boundary |
| --- | --- | --- |
| Neutral Web | Native saved-address list/items, passive default Badge, canonical record/add Buttons, target-formatted postal paragraphs. | Implementable and browser-certifiable with zero U6 runtime. |
| Shopify v1 theme/current accounts | Shopify-hosted Profile/Addresses experience. | Accepted intentional native handoff; neutral U6 does not replace hosted address management or claim parity. |
| Shopify customer-account extension | Supplementary or controlled target-native surface with an explicit B2B strategy. | May project U6 semantics only when it owns the record view; placement, APIs, packaging and evidence remain required. |
| Shopify headless | Canonical U6 view over authenticated Customer Account API records and explicit create/update/delete/default mutations. | Valid target-controlled projection; auth, protected data, formatting, user errors, confirmation/undo, reconciliation, focus and routes remain integration-owned. |
| Shopify legacy compatibility | Explicit deprecated `customers/addresses` profile using `customer.addresses`, address forms, route objects, locales and complete mutation evidence. | Separately versioned compatibility only; never the v1 default or automatic fallback. |
| Webflow / Framer | Canonical CSS projection plus project-owned secure membership/data/action provider. | Visual composition available; protected data and mutations remain target-owned. |
| React / Angular / Hydrogen | Repeated semantic composition over external authoritative address/query/mutation state. | Contract-ready; no framework dependency or second state store in base source. |
| Figma | Auto-layout record list composed with canonical Badge and Button instances. | Planned; registered Button nodes are not U6 artwork or visual approval. |
| SwiftUI / Compose | Native saved-address list/cards with text status and platform Buttons/navigation. | Conceptual; preserve native list/action/accessibility and protected-data conventions. |

## Risks, Alternatives, And Remaining Integration

1. Targets must declare supported actions. Navigation uses Link; commands and
   mutations use Button. Set Default is omitted when unsupported.
2. Targets must implement confirmation or guaranteed undo for Delete, retain
   records until success, and define errors, concurrency, authoritative refresh,
   announcements and deliberate focus restoration.
3. Shopify v1 theme translation is resolved as hosted Profile/Addresses handoff.
   Extension, B2B, headless and compatibility profiles still require
   independent protected-data, packaging, mutation and evidence work.
4. Human review must approve card surface, density, Badge placement, action
   hierarchy, add-action treatment, responsive track minimum, fixture language,
   and corrected U6-specific Figma artwork.
5. Targets must define protected-data access, address formatting/validation,
   billing versus shipping scope, ordering/limits, loading/empty/error/expired/
   offline behavior, mutation feedback, privacy, telemetry, and analytics.

Alternative A is the recommended passive native list with canonical Badge and
Button leaves. Alternative B composes canonical Card; it is not recommended
while Card's complete-container hover lift falsely suggests whole-card
interactivity around nested actions. Alternative C makes every address a
selectable card/listbox option; it introduces selection semantics absent from
the accepted product contract. Alternative D flattens address records and
mutations into U6 properties; it couples the neutral component to unstable
target schemas and is rejected without architecture approval.

## Certification Evidence

- Exhibit and Studio use exact normalized U6 DOM and complete computed-style
  signatures at an equal `480px` component width.
- Empty, duplicate, incomplete, conflicting-default, and invalid action-name
  inputs omit the required collection. A blank optional add label removes only
  its final list item; Reset restores the complete fixture.
- Chromium exposes one native `UL`, three `LI` records/items, one canonical
  Badge, three canonical Buttons, four paragraphs, six `dir=auto` nodes, zero
  HTML `address` elements, zero custom widget roles, zero author `tabindex`, and
  zero internal live regions.
- Tab order is Edit Alex, Edit Studio, Add address. Enter and Space produce
  site-only feedback outside U6 without mutating the two records or default
  truth. Normal and forced-color focus are solid `2px` with `2px` offset.
- Mobile, Tablet, Desktop, XL, direct `320px`, localized RTL/mixed/unbroken
  `200px`, and effective 200-percent evidence has zero U6 or document overflow.
  One- and two-column intrinsic states were observed.
- Light minimum measured contrast is `7.81:1`; dark minimum is `5.92:1`.
  Forced colors retains readable default text and focus; reduced motion has zero
  non-zero transitions or animations in U6.
- Nineteen final images, four retained baseline images, and machine-readable
  measurements/interactions/parity live in
  `output/playwright/refinement-batch-98/`.
- All 183 contracts, Studio definitions, registry components, and MDX pages;
  254 static previews; Neutral Web; Shopify; official Shopify theme validation;
  TypeScript; a temporary production build; deterministic hashes; generated
  copy identity; `site/dist` cleanliness; and owned-resource cleanup pass.

Final U6 CSS is `1,726 B` raw / `661 B` gzip with SHA-256
`5e79f1306a74485eed9d3d826bf016a37601badab493e532466346dd2c92ca56`.
Current Account CSS is `2,853 / 3,072 B` gzip with SHA-256
`6e0f08c5cf61dc9268fab75278e4a95ff638a64e9a1a818aa4fa188195365e36`;
canonical, Shopify, and Webflow copies are byte-identical. U6 adds `0 B` neutral
runtime. The complete Web component CSS remains above its program ceiling, as
does shared runtime; U6 does not conceal those existing program gaps.

U6 is `human-review-ready` and remains `pilot`. Live protected-mutation/focus
integration, final visual review and corrected component-specific owner artwork
remain pending; no automatic `stable` promotion is allowed.
