# Component Dossier: 404 Page

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify 404-template mapping and
future-target translation

Contract: `components/contracts/page-404.contract.json`

ADR 0236 update (2026-07-20): the inherited Empty State heading boundary is
resolved. A standalone 404 host supplies H1, and Shopify `main-404` now passes
that rank explicitly. Historical fixed-H3/open-heading wording below is
superseded; recovery policy, target behavior, visuals, and Figma remain pending.

## Recommendation

Certify 404 Page as a target-agnostic missing-resource composition, not as an
HTTP response, router error boundary, service-error screen, search engine or
product-recommendation service. Require a non-empty visible heading and
explanatory message, allow an optional decorative illustration and visible
error code, and require the consuming target to provide at least one useful
recovery path through a primary destination, optional search, additional
recovery Links or suggested-content Links.

Compose the explanatory core from canonical Empty State, the optional search
from canonical Input and Button, and every destination from canonical Button
or Link. 404 Page owns arrangement, reading order, intrinsic response and the
relationship between its regions. Its dependencies retain accessible names,
field/action/link states, validation, focus and interaction semantics.

Use a labelled contextual `section` in Exhibit and Studio so the docs site's
existing `main` remains the only visible main landmark. A standalone Web,
Shopify or future target places the composition inside its one document-level
`main`; the component contract does not choose the host document's heading
rank or emit a second landmark. Keep the visible code redundant and
`aria-hidden`, because the required heading communicates the state in words.

Keep search endpoint, query handling, routes, suggested records, analytics,
actual HTTP status and caching target-owned. The neutral component owns no
request, router, listener, observer or state store. Studio may demonstrate a
truthful local submission result, but must not imply a network search or
invented destination.

## Purpose And Limits

- Communicates that a requested resource is unavailable and explains how to
  continue.
- Supports a required textual explanation plus optional decorative media,
  visible code, native search and target-owned recovery destinations.
- Owns centered editorial composition, source order, wrapping, intrinsic
  responsive behavior and placement of canonical dependencies.
- Canonical Empty State owns the passive absence anatomy. Canonical Input owns
  label, native field, value, messages, validation and field states. Canonical
  Button owns submit/action semantics and states. Canonical Link owns native
  navigation and focus.
- The target owns whether the page is a real 404, its HTTP status/cache policy,
  router integration, search endpoint, query schema, routes, suggestion data,
  analytics, localization and content trust.
- It is not a temporary loading state, offline/service-error screen, generic
  error boundary, redirect service, search implementation, product recommender
  or CMS page builder.

## Pre-Refinement Gallery Baseline

- Registry `P1`, category `pages`, no dependencies; contract `0.2.0`, `pilot`;
  twelve anatomy parts, five states, three behaviors, seven properties and 18
  public tokens.
- The registry promises search, suggested links and product suggestions as if
  they were always present, while the contract correctly describes those
  regions as optional and target-owned.
- Canonical CSS duplicates Input, Button and Link padding, border, radius,
  focus, hover, touch-target, typography and transition behavior instead of
  consuming their canonical owners.
- CSS uses literal physical spacing, a viewport breakpoint and a fluid error
  code tied to viewport width. Studio adds a second, site-only illustration,
  search-action, Link and suggestion-card implementation with its own
  container breakpoints.
- The shared renderer emits `<main class="page-404">` inside the docs site's
  existing `<main>`, producing nested visible main landmarks.
- Search has only a visually hidden label and an icon-only action. Its field
  does not use canonical Input anatomy or a query `name`, and feedback is a
  site-only paragraph outside the field composition.
- Recovery and suggestion anchors point at absent fragments and cancel native
  navigation. Suggestions use generic `div` markup rather than a native list.
- Required empty heading/message values still render an invalid shell; the
  visible code is announced redundantly with the textual heading.
- Exhibit and Studio already share one `PagesStudio` renderer and fixture, but
  their common output preserves those defects.
- Shopify's `templates/404.json` correctly maps to `main-404`, but that section
  uses generic section/container styles, an inline max-width and an Empty State
  snippet with a fixed `h3`; it does not map canonical P1 anatomy.
- Deterministic baseline is `2,502 B` gzip for the complete Pages stylesheet.
  The refined Coming Soon stylesheet is independent; together they remain
  within the permanent Pages + Coming Soon `5.3 KiB` (`5,427 B`) ceiling.
  P1 adds no neutral component runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [RFC 9110: 404 Not Found](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.5) | 404 communicates that the origin has no current representation or will not disclose one, without declaring whether that condition is temporary or permanent. | Page content may explain absence, but the target/server owns the actual response and cache policy. |
| [HTML Standard: `main`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element) | `main` represents the document's dominant content and a document must not expose multiple visible main elements. | Exhibit/Studio use a labelled `section`; a standalone target supplies the single document-level `main`. |
| [HTML Standard: `search`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-search-element) | Search controls are a distinct semantic region and the standard example uses a labelled form, input and submit button. | Use a named native form/field/action composition; the established `role="search"` fallback remains portable across current targets. |
| [WAI Page Structure: Headings](https://www.w3.org/WAI/tutorials/page-structure/headings/) | Headings communicate organization and should follow the host page hierarchy. | Require a visible textual heading but leave its native rank to the target document. |
| [WAI-ARIA APG: Landmarks](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) and [Search landmark example](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/search.html) | Landmarks need purposeful structure and repeated landmark types need distinguishable names. | Avoid nested main landmarks and give the optional search region a concise accessible name. |
| [WCAG 2.2: Link Purpose in Context](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | A link's purpose must be determinable from its text or programmatically associated context. | Use descriptive, real recovery destinations; do not cancel placeholder fragments. |
| [Shopify: 404 template](https://shopify.dev/docs/storefronts/themes/architecture/templates/404) | A 404 template must make the missing page clear and provide obvious recovery options; JSON-template content belongs in sections. | Keep `templates/404.json` and implement canonical P1 anatomy in its section, with target-owned routes/search. |
| [Polaris Empty State](https://polaris-react.shopify.com/components/layout-and-structure/empty-state) | Full-page empty states use simple guidance, thoughtful decorative illustration and one clear primary action. | Compose canonical Empty State for the explanation and make one recovery destination visually primary. |
| [Radix composition guide](https://www.radix-ui.com/primitives/docs/guides/composition) | Accessible primitives remain leaf owners and are composed rather than restyled by higher-level features. | P1 arranges Empty State, Input, Button and Link and does not duplicate their behavior or public states. |

Open UI's [component matrix](https://open-ui.org/research/component-matrix/)
records Empty State occurrences across systems but no interoperable 404-page
primitive. That supports native document semantics plus canonical leaf
composition; it does not justify a custom role or universal router API.

### Mature-system comparison

- HTML, WAI and WCAG converge on one document main, a meaningful heading,
  named native search controls and real destinations. The current nested main,
  hidden-only label and cancelled fragments diverge from that model.
- Polaris treats the experience as a clear Empty State with restrained copy,
  decorative media and a primary recovery action. The Gallery can consume its
  own canonical Empty State without adopting Polaris styling or API names.
- Radix provides accessible primitives and composition guidance rather than a
  404 page. That matches The Gallery's target-independent contract boundary.
- Shopify defines target placement and recovery expectations but leaves copy,
  search and destinations to the theme section. It does not move HTTP or route
  ownership into the neutral component.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. Prior direct inspection in this same component
program established that these nodes are the generic `02 / Component Detail -
Studio` frame and Button inspector. They contain no 404 composition, empty
state, recovery search, suggestions, responsive state or P1-specific token.
They validate the shared Exhibit/Studio methodology only. The repository
candidate remains the visual proposal for human review; no P1 visual decision
is inferred from those generic nodes.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | contextual labelled `section`; hosted by standalone target `main` | P1 / target | Omitted when required heading or message is empty. |
| Empty-state core | yes | canonical `.empty-state` composition | Empty State | Contains decorative illustration, heading, message and optional primary recovery action. |
| Illustration | no | decorative media, `aria-hidden` or empty alt | Empty State / target | Essential information remains textual. |
| Code | no | presentational text, `aria-hidden="true"` | P1 | Visible metadata only; does not replace the heading. |
| Heading | yes | contextual heading | target | Non-empty render precondition; rank follows host hierarchy. |
| Message | yes | paragraph | target | Explains absence without claiming temporary/permanent cause. |
| Primary recovery | conditional | canonical navigation Button or Link | Button / Link / target | At least one recovery path is required across all optional regions. |
| Search | no | named native form | target / P1 | P1 owns placement; target owns action, method and results. |
| Search field | conditional | canonical Input | Input / target | Visible label, `name="q"`, native `type="search"`, optional associated message. |
| Search action | conditional | canonical Button | Button / target | Native submit action with visible text. |
| Recovery navigation | no | labelled `nav` | target | Contains real canonical Links. |
| Suggestions | no | labelled contextual `section` with native list | target / P1 | Suggested items are canonical Links and target-owned records. |

## Variant, Size, State, And Mode Matrix

- Variant/size: one centered missing-resource profile. Measure, rhythm,
  illustration size and responsive thresholds remain private composition.
- Required content: non-empty heading and message. Invalid required content
  omits the renderer rather than leaving an unlabelled page shell.
- Recovery: primary destination only; search only; recovery navigation only;
  suggestions only; or coherent combinations. At least one useful path must be
  present.
- Illustration/code: absent or present independently; illustration remains
  decorative and code remains redundant presentation.
- Search dependency states: Input default/hover/focus/error/success/warning/
  disabled/read-only and Button default/hover/active/focus/disabled/loading are
  dependency-owned, not P1 variants.
- Responsive: centered bounded core, inline search above the named container
  threshold and stacked search below it; suggestions move from intrinsic
  multi-column to one column without a viewport query or Studio override.
- Content extremes: short, long, empty optional, localized, RTL, unbroken,
  many recovery/suggestion Links and 200% zoom.
- User modes: light, dark, forced colors, reduced motion, keyboard, touch,
  screen reader and no-hover input. P1 itself adds no motion.

## Public API And State Ownership

Keep seven semantic properties:

- `illustration` - optional decorative media slot.
- `code` - optional visible, assistive-technology-hidden status code.
- `heading` - required non-empty visible heading.
- `message` - required non-empty explanatory message.
- `search` - optional target-owned native form composed from Input and Button.
- `recoveryLinks` - optional primary and additional canonical destinations.
- `suggestions` - optional target-owned heading and list of canonical Links.

Do not expose `status`, `httpStatus`, `cacheControl`, `route`, `query`,
`results`, `products`, `loading`, `error`, `retry`, `onSearch`, analytics,
layout alignment, measures, gaps, breakpoints, illustration size, dependency
variants or internal link counts. Add a relational validity rule: a rendered
composition must supply at least one recovery path across `search`,
`recoveryLinks` and `suggestions`.

P1 has no controlled/uncontrolled store. The native search field can use the
canonical Input controlled/uncontrolled strategy in framework targets; route,
request and result state remain target-owned.

## Token And Value Audit

- Keep only page-owned surface/text/display typography and semantic section/
  element spacing tokens directly used by P1 composition.
- Remove border, focus, Button color/text, Link accent, touch-target, radius,
  transition and easing tokens from P1. Their canonical dependencies own them.
- Keep error-code clamp, content measures, search/suggestion widths, gaps and
  container threshold as `--_` private variables because they are visual
  composition details, not stable cross-target consumer choices.
- Replace physical margins/padding with logical properties and semantic
  spacing tokens. Replace viewport media queries and Studio-only responsive
  rules with a named inline-size container.
- Remove component-owned hover/focus/motion selectors for Input, Button and
  Link. P1 adds no animation or transition of its own.

## Accessibility And Interaction

- Require one non-empty visible heading and message; omit invalid required
  composition.
- Use one document-level `main` only. Exhibit/Studio render a labelled section;
  standalone targets place that section content in their existing main.
- Keep the optional visible error code redundant and hidden from assistive
  technology. Keep all illustration media decorative because the full state is
  required in text.
- Require at least one useful recovery path. Use real `href` destinations and
  descriptive labels; never prevent native navigation on placeholders.
- Give the optional search form and field accessible names, use a visible
  Input label, preserve `name="q"`, native `type="search"` and submit semantics,
  and associate truthful feedback through Input message anatomy.
- Render suggestions as a labelled native list and preserve sensible heading
  hierarchy. Empty optional groups are omitted with their labels.
- The target owns truthful pending, success, error and result behavior. Studio
  may report that a query was captured locally but cannot claim a request ran.
- Forced colors preserve Canvas/CanvasText and canonical dependency focus.
  Reduced motion needs no P1 override after duplicate transitions are removed.

## Responsive And Performance

- Establish a named inline-size container on the root. Keep the core bounded
  with logical padding and intrinsic measures.
- Search uses canonical Input/Button and switches inline/stacked by component
  width. Suggestions use an intrinsic list layout and collapse without a
  Studio-only fork.
- Long, localized, RTL and unbroken content wraps without horizontal overflow;
  source order stays explanation, primary recovery, search, additional links,
  suggestions at every size.
- DOM and work are constant apart from target-owned slot content. P1 owns no
  listener, observer, timer, request, router, formatter, image, icon or neutral
  runtime.
- Permanent Pages + Coming Soon ceiling remains `5.3 KiB` (`5,427 B`) gzip.
  Removing duplicate field/action/link CSS must not increase the family bundle;
  neutral runtime contribution remains `0 B`.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Contextual labelled section inside the host main; canonical Empty State, Input, Button and Links; target search/routes/data. | Baseline exists but duplicates dependency CSS, nests main in docs and uses inert destinations; refinement planned. |
| Shopify | Existing `templates/404.json` selects `main-404`; theme layout owns one main and Shopify owns the real 404 response. | Target exists but P1 classes/search/settings are absent and Empty State heading rank is fixed; reconciliation planned without changing the neutral contract. |
| Webflow | Target-agnostic Pages CSS copy. | Baseline copied; synchronize after canonical CSS refinement. |
| React / Angular | Thin document composition over native heading/form/list and canonical dependency adapters. | Planned; no page, router or request store. |
| Figma | Approved 404 frame composed from approved Empty State/Input/Button/Link instances. | Planned; registered reference is unrelated generic artwork. |
| SwiftUI / Compose | Target-native unavailable-content screen with platform search and navigation controls. | Conceptual; networking/router/status stay target-owned. |

## Open Decisions And Human Review

- Human review must approve the centered composition, hierarchy, error-code
  scale, illustration treatment, measures, spacing, primary recovery emphasis,
  search layout and suggestion presentation.
- The seven-property API and the rule requiring at least one recovery path need
  explicit owner approval before stability.
- Copy, localization, primary destination, search endpoint/query behavior,
  suggestion source/ranking, analytics and actual HTTP/cache behavior remain
  target product decisions.
- Dedicated P1 Figma artwork and framework/native adapters remain absent.
- No open architecture decision blocks safe technical refinement: accepted
  ADRs keep lifecycle ownership with the target, and ADR 0236 fixes contextual
  native heading markup outside the component API. Shopify now supplies H1 for
  the standalone 404. This pass does not select aesthetic copy, routes or
  recommendation data.
- Keep the contract `pilot` until the owner explicitly approves stability.
