# Component Dossier: Account Dashboard

Status: `human-review-ready`

Target under review: Neutral Web canonical account-navigation overview and
documented canonical-or-native target handoff

Contract: `components/contracts/account-dashboard.contract.json`

## Recommendation

Define U3 as a passive, labelled account-navigation overview with a required
visible greeting/title, optional account-level actions, and a required native
list of target-owned destinations. Compose the repeated items from canonical
Card and Link, and compose fixture account actions from canonical Button. Keep
authentication, customer data, destinations, authorization, navigation,
sign-out, loading, errors, personalization, and privacy in the target.

Preserve the three accepted semantic properties: `greeting`, `headerActions`,
and `cards`. Repeated destination records remain inside the `cards` composition
slot, consistent with the accepted Account boundary in
`docs/OPEN-QUESTIONS.md`; do not flatten target routes, customer fields, counts,
or every card detail into U3 properties. U3 has no controlled state or neutral
runtime.

Use one labelled native `section`, a visible heading whose level follows page
context, and a native `ul`/`li` destination list. Do not apply `role=grid`: the
visual tracks do not require composite grid keyboard behavior. Keep one normal
Tab stop per Link plus any target-provided header action. The root becomes a
named inline-size container; the list changes from one to two and three tracks
from component width rather than viewport width.

Owner decision U3-A and ADR 0260 accept the cross-target boundary: targets that
control the view project authorized data through canonical U3; platform-owned
non-replaceable screens use a documented native handoff without a parity claim.
Contract maturity remains `pilot`; final visual and live target review are still
required before `stable` or target readiness.

## Purpose And Limits

- Gives an authenticated customer a concise overview and clear destinations to
  account areas such as orders, addresses, profile, saved works, subscriptions,
  rewards, or target-specific pages.
- Supports a required customer-facing heading/greeting, optional complete
  account actions, and a required complete destination-card composition.
- Allows targets to choose the available destinations, order, route, icon,
  description, and privacy-safe summary content.
- Is not an authentication gate, customer/session store, order query, profile
  editor, authorization layer, account router, telemetry client, or Shopify
  account replacement.
- Does not prescribe whether sign out is a POST action, navigation URL, hosted
  flow, SDK command, or omitted action.
- Does not expose sensitive profile, order, payment, address, membership, or
  preference data merely to fill the overview.

## Repository Baseline Before Refinement

- Registry U3 has no dependencies even though its fixture renders canonical
  Button classes and duplicates Card/Link surface, hover, focus, color, radius,
  transition, and typography rules inside Account CSS.
- Contract `0.1.0`, `pilot`, declares ten anatomy parts, four states, two
  behaviors, three properties, and sixteen U3 public tokens. It does not require
  a programmatic section name, native list semantics, canonical dependencies,
  target data/lifecycle ownership, content resilience, forced colors, reduced
  motion, or container response.
- Account Studio owns U3 markup locally. The root is an unlabelled section, the
  repeated collection is a generic `div`, cards are bespoke `article` elements,
  Links are bespoke anchors, and the Sign out Button is a working-looking no-op.
- MDX uses a separate hand-authored tree, a different heading level, viewport
  breakpoint language, and the same duplicated account-card contract. Exhibit
  and Studio route through the registered renderer at runtime, but U3 has no
  reusable artwork boundary for exact implementation ownership.
- Existing Mobile/Desktop images show the default fixture and apparent visual
  alignment. They do not certify Tablet/XL, exact DOM/style identity, native
  list relationships, required-content omission, optional-action omission,
  action/navigation activation, meaningful link names, long/localized/unbroken
  content, RTL, 200px containers, effective 200 percent, dark, forced colors,
  reduced motion, or canonical dependency composition.
- The registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and
  inspector `1020:480` resolve to the generic Button Component Detail/Studio
  shell. They are not U3-specific artwork or owner approval.
- Shopify has source-identical Account CSS but no U3 Liquid, account component,
  hosted-page extension, customer data mapping, routes, authentication gate, or
  editor invocation. CSS readiness must not be reported as target readiness.
- Deterministic baseline: U3 CSS slice `1,765 B` raw / `626 B` gzip; Account CSS
  `15,266 B` raw / `2,883 B` gzip against the permanent `3,072 B` family
  ceiling; generated Web component CSS `507,501 B` raw / `68,187 B` gzip
  against the existing `65,536 B` program ceiling; shared runtime `53,811 B`
  raw / `10,501 B` gzip. U3 adds no neutral runtime.
- U3 slice SHA-256 is
  `556f533dcaccd5c5dddbc326a27547c6fe4ba30b8286a867f493491aa31a8b19`.
  Baseline Exhibit/Studio Mobile SHA-256 values are
  `63fc6af2cf4326e746139b06965c758150b811dd92c0e35b12e8d34b1b2223e4`
  and `74f4e56d7fd31a5ee9c7216e56d4ea00fc94c61aabe758010ab50b487e13b724`;
  Desktop values are
  `942fb7d23abdc837458c96698453a374d01a0b529cf3b7e23a1e2d5e789116d7`
  and `1d25042dd8dbab42751a3633339cd6402a44163a72ff05cf7595a8c0a370958d`.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WAI page structure](https://www.w3.org/WAI/tutorials/page-structure/) | Regions should be labelled, headings should reflect relationships, and meaningful HTML should expose visual structure. | Use a section named by its visible greeting and a native destination list with logical headings. |
| [WCAG 2.4.4 Link Purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | Users must be able to determine what each Link does from its name or programmatically determined context. | Fixture and target Links use distinct destination names; avoid repeated ambiguous `View` labels. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) and [Grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) | APG defines no dashboard-card composite; ARIA grid introduces managed directional keyboard interaction. | Preserve native list and Link behavior. CSS grid presentation alone does not justify `role=grid`. |
| [Open UI components](https://open-ui.org/components/) | Open UI does not define a consensus account-dashboard shell. | Treat U3 as Gallery composition and keep target account lifecycle outside the neutral API. |
| [Radix Themes Card](https://www.radix-ui.com/themes/docs/components/card) | Card groups related content/actions and may become one interactive element only when that semantic model is intended. | Reuse canonical Card as the visual container while preserving one explicit canonical Link per destination. |
| [Polaris Page](https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/page) and [Link](https://shopify.dev/docs/api/app-home/web-components/actions/link) | Page owns a heading and page-level actions; sections organize content; Link is for navigation and Button for actions. | Keep U3 heading/actions structurally separate from the destination list and retain native action/navigation semantics. |
| [Shopify account component](https://shopify.dev/docs/storefronts/themes/customer-engagement/account-component) | `<shopify-account>` is Shopify-controlled, opens an account sheet, and exposes configurable menu links such as Orders/Profile. | Latest-account theme translation is not a theme-owned clone of U3; menu/account-sheet mapping is a target profile. |
| [Shopify customer-account apps](https://shopify.dev/docs/apps/build/customer-accounts) | Current accounts expose hosted Order index/Profile pages and extension targets; legacy accounts were deprecated in February 2026. | A hosted/extension profile, a headless dashboard, and legacy compatibility are distinct adapters, not interchangeable U3 markup. |
| [Shopify Liquid routes](https://shopify.dev/docs/api/liquid/objects/routes) | Account, address, profile, login, recovery, and logout URLs are target-owned route values. | If a theme compatibility profile exists, use Shopify route objects and translations rather than hard-coded `/account` paths. |

The sources agree on a named page/section, meaningful destination Links,
ordinary native keyboard behavior, composable Card-like groupings, explicit
page-level actions, and target-owned customer/account state. They do not define
one universal U3 record schema, full-card activation policy, or Shopify account
surface.

## Matches, Differences, And Direction

- Keep `greeting`, `headerActions`, and `cards`; do not add a public customer,
  route, status, loading, card-count, column-count, or sign-out property.
- Require trimmed `greeting` and a complete non-empty `cards` composition. Omit
  the complete shared artwork when required content is absent.
- Render `section.account-dashboard[aria-labelledby]`; the visible heading owns
  the region name. The heading level is context-driven and not a visual variant.
- Compose `.account-dashboard__grid` as a native list and each destination as a
  native list item with canonical `.card`, `.card__body`, `.card__footer`, and
  `.link` classes plus U3 context classes.
- Compose the fixture account action with canonical Button. The site may report
  a demo activation outside U3; targets own actual sign-out or account actions.
- Keep icons decorative and site-fixture-only. Lucide remains a Studio source,
  not a target-agnostic contract dependency or public icon-name API.
- Account CSS owns section/grid arrangement, contextual icon/text rhythm, and
  container thresholds only. Card owns surface/border/radius/shadow/hover/
  motion; Link owns navigation color/decoration/focus; Button owns action states.
- Keep the explicit destination Link rather than turning the complete Card into
  a Link. A full-card Link remains a possible future target composition when it
  contains no nested controls, but it is not inferred as a U3 public mode.

## Candidate Anatomy And Composition

| Part | Required | Semantic element/canonical composition | Owner |
| --- | --- | --- | --- |
| Root | yes when valid | `section.account-dashboard[aria-labelledby]` | U3 region/flow |
| Header | yes | `header.account-dashboard__header` | U3 arrangement |
| Greeting/title | yes | visible heading with stable id | localized target content |
| Header actions | no | `.account-dashboard__actions` with canonical Button/Link/Form composition | target/dependencies |
| Destination list | yes | `ul.account-dashboard__grid` | U3 native collection |
| Destination item | one or more | `li.card.account-card` | canonical Card plus U3 context |
| Card body | yes per item | `.card__body.account-card__body` | Card/U3 content flow |
| Icon | no | decorative `.account-card__icon[aria-hidden=true]` | site/target asset |
| Card title | yes | context-appropriate heading | target item content |
| Description | no | `.account-card__description` | target item content |
| Card footer | yes per item | `.card__footer.account-card__footer` | Card/U3 action placement |
| Destination | yes per item | `a.link.account-card__link[href]` | canonical Link/target route |

## State, Variant, Size, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One neutral account-navigation overview; branded/compact/statistical dashboards require separate product decisions. |
| Size | One intrinsic profile with one/two/three container-driven tracks; no public size or columns option. |
| Required content | Non-empty greeting and complete non-empty destination composition. |
| Header actions | Complete target-owned composition present/absent. |
| Destination count | One or more target-owned items; count and order are not U3 properties. |
| Item content | Required distinct title and destination; optional decorative icon and description. |
| Navigation | Native Link default/hover/focus/visited behavior; target owns routing and current state. |
| Action | Dependency/target default, hover, focus, pressed, busy, disabled, and result behavior. |
| Account lifecycle | Loading/authenticated/expired/error/empty/redirect/sign-out remain target states outside U3. |
| Environment | Mobile/Tablet/Desktop/XL, 200px container, effective 200 percent, LTR/RTL, light/dark, forced colors, reduced motion, keyboard-only. |

Invalid combinations include a blank heading, an unlabelled section, an empty
required list, a destination item without meaningful Link text or `href`, a
CSS grid with `role=grid` but no grid keyboard model, duplicate Card/Link/Button
visual behavior, sensitive fixture data, a working-looking no-op action, a
hard-coded Shopify account path, or a theme-owned U3 clone presented as the
current Shopify-managed account surface.

## Public API And State Ownership

- `greeting` — required non-empty visible customer-facing heading that labels
  the section. The target chooses generic or personalized content appropriate
  to its privacy model.
- `headerActions` — optional complete account-level action composition. Action
  semantics, pending/disabled state, result, and focus remain dependencies/
  target owned.
- `cards` — required complete non-empty composition of native destination-list
  items using canonical Card and Link. Record schema, route, order, availability,
  icons, descriptions, counts, and privacy remain target owned.

U3 has no independent controlled/uncontrolled state. Native Link owns
navigation/focus/history semantics; Button/Form/target APIs own actions. Targets
own authentication, customer data, loading/error/empty results, authorization,
route resolution, sign-out, redirects, personalization, privacy, telemetry, and
analytics.

## Token, Hardcoded Value, And Runtime Audit

- Remove U3 border, radius, focus, transition, and easing tokens because
  canonical Card, Link, and Button own them.
- Retain only U3-owned text/type/layout tokens used by the greeting and
  contextual item content/spacing.
- Use private `--_account-dashboard-*` variables for header/list gaps, icon
  size, and container thresholds. Do not expose columns or every internal gap.
- Use logical properties, stable heading/body line-height tokens, and native
  list resets. Do not use `calc(body * .875)` when a body-small token exists.
- Passive neutral runtime budget is `0 B`. U3 adds no listener, observer, timer,
  customer query, session check, route engine, sign-out handler, provider SDK,
  or analytics client.
- Account CSS must stay at or below `3,072 B` gzip. Canonical composition should
  remove duplicated visual state rules and preserve or increase headroom.

## Responsive And Evidence Requirements

- Use a named inline-size container and component thresholds for one, two, and
  three tracks. Header content wraps intrinsically; no viewport breakpoint is
  required inside U3.
- Test default, no-header-action, one destination, required greeting omission,
  required cards omission, long localized and unbroken content, long distinct
  Link names, RTL, 200px container, and effective 200 percent.
- Test native section/list/list-item/heading/link relationships, meaningful
  accessible names, href preservation, Tab/Shift+Tab order, Enter navigation
  fixture, header Button activation fixture, visible focus, and no unexpected
  live region inside U3.
- Capture Exhibit and Studio at Mobile, Tablet, Desktop, and XL plus focus,
  optional-action omission, single item, blank required omission, long/RTL/
  narrow, light, dark, forced colors, reduced motion, and effective 200 percent.

## Cross-Target Translation

| Target | Mapping | Status/gap |
| --- | --- | --- |
| Neutral Web | Labelled passive section plus native list, canonical Card/Link destinations, and optional action composition. | Implementable with zero U3 runtime; target owns data/routes/actions. |
| Shopify v1 theme/current accounts | Shopify-controlled `<shopify-account>` sheet plus hosted Order index/Profile pages and editor-managed menu. | Accepted intentional native handoff; omit a theme-owned U3 clone and make no visual/functional parity claim. |
| Shopify customer-account extension | Target-native full-page or supported extension surface using authenticated account APIs. | May project U3 semantics only when the extension owns the rendered view; requires app packaging and target evidence. |
| Shopify headless | Canonical U3 view backed by Customer Account API and supported routes/session model. | Valid target-controlled projection; requires data, authorization, navigation, privacy, and lifecycle integration. |
| Shopify legacy compatibility | Deprecated classic account template using Liquid customer/routes objects. | Separately versioned compatibility only; never the v1 default or automatic fallback. |
| Webflow / Framer | Canonical CSS projection with target membership/authentication provider and real routes. | Visual composition available; data/security/navigation remain integration. |
| React / Angular / Hydrogen | Passive dependency composition over external account query/router/session state. | Contract-ready; no framework dependency in base source. |
| Figma | Auto-layout frame with canonical Card, Link, and Button instances. | Planned; registered Button nodes are not U3 artwork or visual approval. |
| SwiftUI / Compose | Native heading, adaptive collection, navigation links, and target account actions. | Conceptual; preserve native navigation/accessibility semantics. |

## Risks, Alternatives, And Remaining Integration

1. Human review must approve page inset, greeting hierarchy, alignment, Card
   density/elevation, track thresholds, icon treatment, description/link rhythm,
   fixture content, and the neutral candidate without U3-specific owner artwork.
2. Shopify v1 theme translation is resolved as native handoff. A real theme,
   extension, or headless integration must still prove the chosen surface,
   routes, permissions, editor behavior and responsive accessibility before it
   can become target-ready; these profiles remain non-interchangeable.
3. Product/target owners must define destination availability/order, greeting
   personalization and privacy, sign-out semantics, loading/error/expired-
   session handling, authorization, redirects, current destination, telemetry,
   analytics, support, and account deletion/escalation paths.
4. Full-card navigation could reduce pointer effort, but it changes activation,
   focus, nested-control, and accessible-name behavior. Preserve explicit Link
   composition until product and human review prefer a whole-card target.
5. The fixture icons are Studio-only Lucide choices, not target assets,
   semantic defaults, or owner-approved brand treatment.

Alternative A is the recommended passive section/list/Card/Link composition.
Alternative B makes each Card one Link, valid only when no nested control or
secondary destination exists and requiring explicit product/human review.
Alternative C makes U3 a query/router/session controller, which would entangle
the neutral component with framework, security, account data, and target
architecture and is not recommended.

## Readiness Decision

Neutral implementation, contract/API reconciliation, canonical dependency
composition, generated adapters, four-viewports-plus-special-modes evidence,
performance measurement, the detailed audit, and the U3-A target boundary are
complete. U3 is `human-review-ready`; final visuals, live target integration,
and corrected U3-specific owner artwork remain pending. Current Account CSS is
`2,853 / 3,072 B` gzip with `219 B` headroom, while U3 itself remains
`2,772 B` raw / `754 B` gzip and adds `0 B` runtime. U3 stays `pilot`; no
automatic `stable` promotion is allowed.
