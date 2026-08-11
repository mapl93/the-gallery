# Order Detail Web Refinement Audit

Status: Human-review-ready; live protected-data/provider integration and human
visual review remain required; remains `pilot`

Date: 2026-07-17

## Outcome

Order Detail is now a passive title-labelled single-order section composed from
canonical Steps and read-only canonical Cart Line Item records. U5 owns only the
section relationship, title/metadata arrangement, optional dependency regions,
content containment, and intrinsic container response. Targets retain
authentication, authorization/redaction, order queries, financial and
fulfillment truth, tracking stages and updates, dates/prices/tax/refund
formatting, destinations, routing, lifecycle, announcements, privacy, telemetry,
and analytics.

The neutral implementation adds no U5 runtime. Exhibit and Studio render the
same `OrderDetailArtwork`, fixture, semantic date, four-property API, and
canonical dependency classes. Owner decision U5-A and ADR 0262 restrict Steps
to provider-trusted ordered milestones and Cart Line Item to read-only purchase
display. ADR 0260 resolves Shopify v1 as hosted Order status handoff while
controlled extension/headless views remain distinct projections and classic
Liquid remains separately versioned compatibility. No speculative current-
account Liquid page was created, and no visual approval or `stable` promotion
is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive detail composition; not an account/order query, auth gate, disclosure policy, state machine, carrier tracker, formatter, router, refund controller, telemetry client, or lifecycle coordinator. |
| Anatomy and composition | pass | Required labelled section/header/title, optional semantic metadata, optional canonical Steps, and optional native canonical Cart Line Item collection. |
| Variants, sizes, and states | pass | One neutral profile; required-title omission, three independently optional regions, private stacked/two-column header, target tracking projection, and external lifecycle are defined. |
| Public API and ownership | pass | Four accepted properties remain: required `title`, optional `meta`, `tracking`, and `lineItems`; domain records, stage inventory, current index, lifecycle, actions, and layout internals were not flattened into API. |
| Tokens and hardcoded values | pass | Thirteen stable U5 color/spacing/type tokens; private gaps and `28rem` threshold remain internal. Steps and Cart Line Item own status, connector, focus, overflow, motion, and item visuals. |
| Accessibility and motion | pass | Visible title labels the section, semantic `time`, native `ol/li` and `ul/li`, one current step, readable completion, native product Link, no mutation controls/custom widget roles/internal live region, visible forced-color focus, and zero reduced-motion activity. |
| Responsive/content resilience | pass | Mobile/Tablet/Desktop/XL, equal 480px containers, direct 320px, localized RTL/unbroken 200px, and 640px effective-200-percent checks stay contained. |
| Runtime and assets | pass | `0 B` U5 runtime delta; no listener, observer, timer, fetch, account SDK, progress mapper, formatter, router, or target asset. |
| Cross-target translation | pass with target gaps | Canonical projection versus hosted/native handoff is accepted; Shopify remains `planned` until a real target profile and protected-data lifecycle are evidenced. |
| Documentation and verification | pass | Dossier, ADR 0188, contract, registry, CSS, shared renderer, Studio, MDX, adapter notes, before/after evidence, automated validators, and matrices agree. |

## Standards And Reference Direction

- WCAG Info and Relationships and heading technique G141 support a section
  named by its visible descriptive heading:
  <https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html> and
  <https://www.w3.org/WAI/WCAG22/Techniques/general/G141>.
- HTML ordered lists represent sequences where order is meaningful, while
  `time[datetime]` connects localized visible dates to machine-readable values:
  <https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element>
  and
  <https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element>.
- WAI-ARIA `aria-current="step"` identifies one current item in a process:
  <https://www.w3.org/TR/wai-aria-1.3/#aria-current>.
- APG defines no Order Detail or Stepper widget requiring a custom keyboard
  model, and Open UI defines no interoperable order-detail commerce element:
  <https://www.w3.org/WAI/ARIA/apg/patterns/> and
  <https://open-ui.org/components/>.
- Radix Data List demonstrates mature composition from semantic leaves rather
  than flattening every record into a parent API:
  <https://www.radix-ui.com/themes/docs/components/data-list>.
- Shopify documents a hosted Order status page with multiple authentication
  and redaction levels plus target-native extension points, while current
  customer accounts operate independently of deprecated theme customer
  templates:
  <https://shopify.dev/docs/apps/build/customer-accounts/order-status-page>,
  <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets/order-status>,
  and <https://shopify.dev/docs/storefronts/themes/architecture/templates>.
- Shopify Liquid still exposes order fields for an explicitly selected legacy
  compatibility profile: <https://shopify.dev/docs/api/liquid/objects/order>.

## Contract And Browser Evidence

- Contract `0.3.0` declares Steps and Cart Line Item dependencies, seven U5
  anatomy parts, four observed/composed states, thirteen behavior rules, four
  semantic properties, one intrinsic profile, thirteen U5 public tokens, and
  explicit target ownership.
- Browser inspection finds one `SECTION` labelled by its visible `H2`, metadata
  with one `time[datetime="2026-07-08"]`, one native four-item ordered Steps
  list, two completed stages with readable hidden `Completed` text, one
  `aria-current="step"`, one named purchased-items region, one native Cart Line
  Item list/row, one product Link, zero mutation controls, and zero live regions
  inside U5.
- The canonical stage labels are `Confirmed`, `Prepared`, `Shipped`, and
  `Delivered`; the fixture makes `Shipped` current. These are sample target
  records, not U5 defaults or a universal commerce taxonomy.
- Activating `Celadon Study No. 4` produces explicit site-only Status text
  outside U5: `Demo navigation to Celadon Study No. 4 selected. No route
  changed.` The fixture URL remains unchanged intentionally while the Link keeps
  a real `href`.
- From a temporary preceding sentinel, Chromium first Tabs to canonical Steps
  because its `overflow:auto` scroll container is natively keyboard-focusable,
  with no author `tabindex` or custom widget model; the next Tab reaches the
  product Link. Enter activates it. Normal and forced-color Link focus are solid
  `2px` outlines with `3px` offset.
- Keyboard-operable Studio controls independently remove metadata, tracking,
  and line items. Title-only remains a valid labelled section. A blank required
  title omits the complete renderer. Reset restores all four regions.
- Exhibit and Studio serialize exact identical normalized U5 DOM. Their page
  chrome gives different available widths at some viewports; when both roots
  are forced to the same `480px` component width, the complete computed-style
  signature is identical.
- Stacked and two-column headers were observed. Mobile, Tablet, Desktop, and XL
  have no U5 or document overflow. A direct `320px` root and localized RTL plus
  unbroken content at exactly `200px` remain contained. Canonical Steps provides
  its own intentional horizontal scroll region at narrow widths, without page
  overflow. A 640px viewport equivalent to 200-percent reflow from 1280px also
  remains contained.
- Light contrast measures `17.93:1` for primary title/current/product/price and
  `7.81:1` for metadata/completed/upcoming/item details. Dark measures
  `17.18:1` and `12.09:1` respectively.
- Forced colors preserves native Link focus and canonical completed/current
  indicator boundaries. Reduced motion reports zero non-zero transitions or
  animations and zero running animations in the tested subtree.
- Eighteen final images, four retained baseline images, and machine-readable
  measurements/interactions/parity live in
  `output/playwright/refinement-batch-97/`.
- Evidence used one named headless Playwright session, one tab, and one managed
  docs server. Final console reports zero errors and zero warnings; cleanup
  closed all owned resources and left port 4173 free.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Labelled passive section, semantic metadata, canonical Steps, and read-only canonical Cart Line Item collection. | Implemented and evidenced with zero U5 runtime. |
| Shopify v1 theme/current accounts | Shopify-owned hosted Order status page. | Accepted native handoff; `planned`, `ready:false`, intentional U5 omission and no parity claim. |
| Shopify customer-account extension | Target-native supported Order status extension or controlled full-page surface. | May project U5 semantics when it owns the view; packaging, placement, disclosure, APIs and lifecycle remain target work. |
| Headless Shopify | Canonical U5 view fed by authenticated Customer Account API/order state. | Valid target-controlled projection; auth, disclosure, data, progress truth, formatting, routes, feedback and lifecycle remain integration-owned. |
| Deprecated-account compatibility | Explicit separately versioned Liquid profile using order fields, localized labels, line items and money filters. | Not the v1 default and never an automatic fallback. |
| Webflow / Framer | Canonical CSS projection plus target membership/account provider and real routes. | Visual composition available; secure data/navigation integration remains target-owned. |
| React / Angular / Hydrogen | Shared dependency composition over external authoritative order/router/account state. | Contract-ready; no framework dependency or second state store in base source. |
| Figma | Canonical Steps and Cart Line Item instances in auto layout. | Planned; registered generic Button nodes are not U5 visual approval. |
| SwiftUI / Compose | Native titled detail group, ordered progress, and read-only purchased-item list. | Conceptual; preserve native navigation/list/accessibility and data-security conventions. |

Source-identical Account CSS passed official Shopify validation as artifact
`u5-order-detail-shopify-20260717`, revision 1. U5 remains `css-ready`,
`ready:false`; the current global Shopify target-ready count is 90.

## Performance And Risks

- U5 CSS changes from `2,045 B` raw / `709 B` gzip to `1,414 B` raw /
  `535 B` gzip. It removes the complete parallel progress visual system while
  adding the labelled shell, named container, and header composition.
- Current Account CSS is `2,853 / 3,072 B` gzip with `219 B` headroom.
- Current neutral component CSS is `71,884 / 65,536 B`; its existing program
  gap remains documented and U5 contributes no new CSS in this reconciliation.
- Shared runtime is `22,807 / 8,192 B`; U5 adds `0 B` and Shopify U5 adds no
  target JavaScript.
- Canonical, Webflow, and Shopify Account CSS are byte-identical. Account CSS
  SHA-256 is
  `9a2372c282043fa0fb9f80e7a1286cc16247aabde9e7b4fb14cb6748b8e45922`;
  the U5 slice SHA-256 is
  `8beca73ee03aad41f43f0f9056c59a5c51c0fa8b62aed14854f152f59876a16b`.
- Targets must prove provider milestone credibility and omit Steps for
  non-linear or uncertain processing, fulfillment, shipping, pickup, return,
  cancellation, refund, partial and split facts.
- The Shopify profile policy is resolved; live hosted, extension, headless or
  compatibility proof remains target-specific integration work.
- Human review must approve title/meta hierarchy, spacing, progress and item
  density, narrow horizontal behavior, threshold, fixture copy, final visuals,
  and corrected U5-specific artwork.

## Validation

Registry/docs, all 183 contracts and Studio definitions, TypeScript, 254 static
previews, Neutral Web adapter, Shopify adapter, official Shopify validation,
native semantics/activation/focus, exact normalized Exhibit/Studio DOM and
same-container styles, four viewports, direct narrow container, localized
RTL/200px, effective 200 percent, light/dark contrast, forced colors, reduced
motion, deterministic performance, generated-copy identity, temporary
production build, visual inspection, diff checks, `site/dist` cleanliness, and
owned-resource cleanup are included.

## Readiness Decision

`human-review-ready`. Safe neutral semantic, canonical, responsive,
performance, provider-trusted tracking, read-only purchase composition,
adapter-boundary and evidence work is complete. Live protected-data/provider
integration, final visuals and corrected U5-specific artwork remain pending.
U5 remains `pilot`; no automatic `stable` promotion was made.
