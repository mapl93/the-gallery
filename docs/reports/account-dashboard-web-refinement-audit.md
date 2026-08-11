# Account Dashboard Web Refinement Audit

Status: Human-review-ready; live target integration and human visual review
remain required; remains `pilot`

Date: 2026-07-17

## Outcome

Account Dashboard is now a passive, labelled account-navigation overview built
from a native destination list and canonical Card, Link, and optional Button
implementations. U3 owns only the section/list composition, contextual copy
layout, and intrinsic track response. Targets retain customer records,
authentication, authorization, route availability, navigation, sign-out,
loading/error/expired/no-destination states, privacy, feedback, focus,
telemetry, analytics, and support flows.

The neutral implementation adds no U3 runtime. Exhibit and Studio render the
same `AccountDashboardArtwork`, fixture, canonical classes, and semantic API.
Owner decision U3-A and ADR 0260 resolve Shopify's translation policy. Current
theme accounts use the controlled `shopify-account` sheet and hosted pages as
an intentional native handoff with no parity claim. Target-controlled full-page
extensions or headless Customer Account API views may project U3 semantics;
classic Liquid remains separately versioned compatibility. No speculative
universal Liquid dashboard was created, and no visual approval or `stable`
promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive account-navigation overview; not a customer query, authentication/session controller, router, sign-out service, privacy policy, or lifecycle state machine. |
| Anatomy and composition | pass | Required labelled section/header/greeting/list plus one or more native list-item Card compositions; optional actions, icons, and descriptions. |
| Variants, sizes, and states | pass | One visual profile; optional actions, required-content omission, one/two/three private tracks, dependency interaction, narrow/localized, and target lifecycle boundaries are defined. |
| Public API and ownership | pass | Three stable properties remain: `greeting`, `headerActions`, and `cards`; repeated records, routes, account state, columns, and visual internals were not flattened into public API. |
| Tokens and hardcoded values | pass | Sixteen stable U3 color/type/spacing tokens; private gaps, `2rem` icon geometry, and `38rem`/`45rem` container thresholds remain internal. Card/Link/Button own surfaces and interaction tokens. |
| Accessibility and motion | pass | Named native section, contextual headings, `ul/li`, explicit native Links, four logical focus stops, no grid roles, no internal live region, visible forced-color focus, and canonical reduced motion. |
| Responsive/content resilience | pass | Mobile/Tablet/Desktop/XL, direct three-track `720px`, localized RTL/unbroken `200px`, and 640px effective-200-percent checks stay contained. |
| Runtime and assets | pass | `0 B` U3 runtime delta; no listener, observer, timer, customer fetch, auth/session SDK, route engine, sign-out implementation, or target asset. |
| Cross-target translation | pass with target gaps | Canonical projection versus native handoff is accepted and documented; Shopify remains `planned` until a real target surface is implemented and evidenced. |
| Documentation and verification | pass | Dossier, ADR 0186, contract, registry, CSS, shared renderer, Studio, MDX, adapter notes, browser evidence, and matrices agree. |

## Standards And Reference Direction

- WAI page-structure guidance supports a visible heading naming a native
  section: <https://www.w3.org/WAI/tutorials/page-structure/>.
- WCAG Link Purpose requires destination text to be meaningful alone or from
  its programmatic context, supporting explicit per-card Links:
  <https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html>.
- APG defines no account-dashboard widget. Its Grid pattern would introduce a
  composite keyboard model inappropriate for a visual navigation list:
  <https://www.w3.org/WAI/ARIA/apg/patterns/> and
  <https://www.w3.org/WAI/ARIA/apg/patterns/grid/>.
- Open UI publishes no consensus account-dashboard shell, so target account
  lifecycle does not become neutral U3 API:
  <https://open-ui.org/components/>.
- Radix Card, Polaris Page, and Polaris Link separate grouping, page actions,
  and navigation rather than defining one universal customer model:
  <https://www.radix-ui.com/themes/docs/components/card>,
  <https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/page>,
  and <https://shopify.dev/docs/api/app-home/web-components/actions/link>.
- Shopify documents a managed `<shopify-account>` sheet and hosted/extension
  customer-account surfaces, confirming that current and compatibility account
  profiles are not interchangeable theme markup:
  <https://shopify.dev/docs/storefronts/themes/customer-engagement/account-component>
  and <https://shopify.dev/docs/apps/build/customer-accounts>.

## Contract And Browser Evidence

- Contract `0.3.0` declares Card, Link, and Button dependencies, twelve anatomy
  parts, five observed/composed states, eight behavior rules, three semantic
  properties, one intrinsic profile, sixteen public tokens, and explicit target
  ownership.
- Browser inspection finds one labelled `SECTION`, one native `UL`, three native
  `LI.card.account-card` items, three native `a.link[href]` destinations, one
  optional Button, zero grid roles, and zero live regions inside U3.
- The visible greeting resolves the section's `aria-labelledby`; H3 destination
  headings preserve the tested document hierarchy and decorative Lucide fixture
  icons are hidden.
- Sign-out and destination activation produce explicit site-only Status text
  outside U3. The demo destination leaves the URL unchanged intentionally; the
  neutral Link keeps a real fixture `href` and U3 adds no callback/state API.
- Tab from the header Button reaches `View orders`; normal and forced-color
  focus are both solid `2px` outlines with `2px` offset.
- Disabling the optional header-action composition removes its wrapper and
  leaves three destination focus stops. The required `cards` control is disabled
  in Studio, and a blank required greeting omits the complete renderer and any
  stale site feedback.
- Exhibit and Studio serialize identical normalized U3 DOM. Their page chrome
  gives different available widths at some viewports; when both roots are fixed
  to the same `520px` container, the complete computed-style signature is
  identical. This is expected container response, not renderer drift.
- One, two, and three tracks were observed. The direct `720px` container has
  three `229.328px` tracks and no root or document overflow.
- Mobile, Tablet, Desktop, and XL have no U3 or document overflow. Long localized
  RTL and unbroken content at exactly `200px` stays contained. A 640px viewport
  equivalent to 200-percent reflow from 1280px also stays contained.
- Light contrast measures `17.93:1` for greeting/title, `7.81:1` for supporting
  copy, and `5.88:1` for Links. Dark measures `17.18:1`, `12.09:1`, and
  `9.95:1` respectively.
- Forced colors preserves Card boundaries and native Link focus. Reduced motion
  reports zero non-zero transitions/animations and zero running animations in
  the tested subtree.
- Sixteen final images and machine-readable measurements, interactions, and
  parity results live in `output/playwright/refinement-batch-95/`.
- Evidence used one named headless Playwright session, one tab, and one managed
  docs server at a time. Cleanup closed all owned resources and left port 4173
  free; the final console has zero errors and zero warnings.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Labelled passive section, native destination list, canonical Card/Link, and optional semantic actions. | Implemented and evidenced with zero U3 runtime. |
| Shopify v1 theme/current accounts | Shopify-controlled account sheet plus hosted account pages and editor-managed menu. | Accepted native handoff; `planned`, `ready:false`, intentional U3 omission, and no parity claim. |
| Shopify customer-account extension | Authenticated target-native full-page or supported extension surface. | May project U3 semantics when it owns the view; requires app packaging and target evidence. |
| Headless Shopify | Canonical U3 view fed by Customer Account API state and supported navigation. | Valid target-controlled projection; data, authorization, routes, feedback, and lifecycle remain integration work. |
| Deprecated-account compatibility | Explicit separately versioned Liquid profile using customer/routes objects and localized copy. | Not the v1 default and never an automatic fallback. |
| Webflow / Framer | Canonical CSS projection plus target membership/account provider and real routes. | Visual composition available; account integration remains target-owned. |
| React / Angular / Hydrogen | Shared dependency composition over external query/router/session state. | Contract-ready; no framework dependency in base source. |
| Figma | Canonical Card, Link, and Button instances in auto layout. | Planned; registered generic Button nodes are not U3 visual approval. |
| SwiftUI / Compose | Native heading, adaptive collection, navigation links, and target account commands. | Conceptual; preserve native navigation and accessibility conventions. |

The source-identical Account CSS passed official Shopify validation as artifact
`u3-account-dashboard-shopify-20260717`, revision 2. U3 remains `css-ready`,
`ready:false`; the current global Shopify target-ready count is 90.

## Performance And Risks

- U3 CSS changes from `1,765 B` raw / `626 B` gzip to `2,772 B` raw /
  `754 B` gzip. The increase supplies complete intrinsic/list/content layout
  while deleting U3-owned Card surface, hover, Link focus, and motion rules.
- Current Account CSS is `2,853 / 3,072 B` gzip with `219 B` headroom.
- Current neutral component CSS is `71,884 / 65,536 B`; the existing program
  gap remains documented and U3 contributes no new CSS in this reconciliation.
- Shared runtime is `22,807 / 8,192 B`, so U3 adds `0 B`.
  Shopify U3 adds no target JavaScript.
- Canonical, Webflow, and Shopify Account CSS are byte-identical. Account CSS
  SHA-256 is
  `a6fd057c9cd82e2746e0221328adea3b97315b753585485204cbcb2550dd9897`;
  the U3 slice SHA-256 is
  `a821d5ea347a08a00c73cc4ae3abc1b7887ab464a0ac736bee54d009e5f6b34b`.
- Account CSS has `219 B` compressed headroom. Later U4–U9 account work must
  reclaim duplicate family CSS or revise the family budget explicitly rather
  than silently exceeding it.
- The Shopify profile policy is resolved; live target implementation remains
  required because native handoff, extensions, headless views, and compatibility
  have different packaging, data, routes, editor ownership and security proof.
- Human review must approve page inset, greeting hierarchy, header alignment,
  Card density/elevation, track thresholds, icon treatment, description/Link
  rhythm, fixture content, full-card versus explicit-Link interaction, and the
  neutral candidate after corrected U3-specific artwork exists.
- Targets must define destination availability/order, personalization/privacy,
  authentication expiry, error/no-destination policy, sign-out semantics,
  redirects, current destination, telemetry, analytics, support, and account
  deletion/escalation paths.

## Validation

Registry/docs, all 183 contracts and Studio definitions, TypeScript, 254 static
previews, Neutral Web adapter, Shopify adapter, official Shopify validation,
native semantics/activation/focus, exact normalized Exhibit/Studio DOM and
same-container styles, four viewports, three-track container, localized
RTL/200px, effective 200 percent, light/dark contrast, forced colors, reduced
motion, deterministic performance, generated-copy identity, temporary
production build, diff checks, `site/dist` cleanliness, and owned-resource
cleanup are included.
