# Component Dossier: Store Locator

Status: `human-review-ready; pilot`

Target reviewed: Neutral Web, React docs target, Shopify translation

Contract: `components/contracts/store-locator.contract.json`

Registry: `D9a` / `store-locator`

Decision: owner D9-C / ADR 0244

## Recommendation

Keep Store Locator as the discovery-only half of the accepted identity split.
It uses the shared list-first location-search presentation and target service,
but results are native branch articles with optional canonical contact and
directions Links—not transaction Radios. It never chooses checkout pickup or
persists a preferred store.

## Purpose And Limits

- Discover galleries, studios or stores without product context.
- Inspect branch name, address, hours, services and contact details.
- Offer explicit target-owned phone or directions Links.
- Support complete manual search, optional explicit geolocation and optional
  synchronized map.
- Not pickup selection, cart/customer mutation, preferred-store storage,
  inventory availability, reservation, booking, geocoder or map provider.

## Current Gallery Baseline

Store Locator is the new D9a canonical identity introduced by the accepted
split. It shares `.location-search`, `LocationStudio`, fixture and target-owned
service boundaries with D9 while using `.store-locator` and informational list
semantics. ADR 0245 removes duplicate Certificate Details in the same inventory
migration, preserving the 183-component v1 total.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard](https://html.spec.whatwg.org/) | Native form/search, list, article, address and Link semantics. | Rich result cards stay ordinary document content with normal links. |
| [W3C Geolocation](https://www.w3.org/TR/geolocation/) | Express user permission and privacy sensitivity. | Only the explicit action may begin a request; manual search remains complete. |
| [Open UI Combobox](https://open-ui.org/components/combobox.explainer/) | Typed filtering models and emerging platform work. | Target can filter asynchronously without forcing rich interactive cards into a listbox. |
| [Polaris Listbox](https://polaris-react.shopify.com/components/lists/listbox) | Location-picker evidence, loading and concise options; warns against nested interactive content. | Store Locator avoids listbox because branch cards contain multiple details and Links. |
| [Shopify store availability](https://shopify.dev/docs/api/liquid/objects/store_availability) | Variant availability exists only for pickup-enabled locations tied to a variant. | It is not a complete general branch directory; D9a needs a separate source. |

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root/heading | yes | named `section` + heading | D9a | No product context. |
| Description | no | `p` | consumer | Search scope/help. |
| Search form | yes | `form[role=search]` | D9a + target | Canonical Input/Button. |
| Use location | no | canonical Button | Button + target | Explicit permission action only. |
| Status | conditional | status/new-error alert | target truth / D9a placement | One channel. |
| Results region | ready | named `section` | D9a | Visible results heading. |
| Results | ready | native `ul` | D9a + target | Complete branch list. |
| Branch | repeated | named `article` | target content | Identity/address required. |
| Contact/directions | no | canonical Link | Link + target | Real descriptive destinations. |
| Map | no | target slot | target | Supplemental and synchronized. |

## Variant, Size, State, And Mode Matrix

Default/intrinsic are the only v1 variant/size. Ready, loading, empty, error and
optional-map states are supported. Product selection, preferred, reserved and
checkout states are invalid. Dark, RTL, forced colors, reduced motion, zoom,
text spacing and narrow containers are required modes.

## Public API And State Ownership

- `heading`, optional `description`, `queryLabel`, controlled/uncontrolled
  `query`, optional `queryPlaceholder`, `searchLabel`, optional
  `useLocationLabel`, `resultsLabel`, target `locations` slot,
  `status=ready|loading|empty|error`, optional `statusMessage`, optional `map`.
- Native input/change/submit/reset and ordinary Link navigation remain exposed.
- The target owns one query/status/result set. No selected/preferred id exists.
- Ready with zero valid branches becomes empty. Missing required heading/search
  label/action/results label omits the component.

## Token And Value Audit

Store Locator uses the shared surface, border, text, spacing, radius and h4/body
tokens plus canonical Input/Button/Link tokens. The private 31.99rem stack,
sub-gaps, status boundary and docs-only map height remain compositional. Fixture
addresses, services, phone numbers and destinations are not defaults or tokens.

## Visual And Content Audit

The search hierarchy matches D9 so the family feels related; the absence of
Radio controls makes discovery semantically and visually distinct. Each bordered
article keeps branch identity, address, hours, services and actions scannable.
Optional fields omit cleanly; long/localized/unbroken content wraps. Actions
stack in narrow containers and never hide behind the optional map.

## Accessibility And Interaction

- Visible section, search and results names.
- Native branch list and named articles; semantic `address` content.
- Real descriptive Links with target navigation/error ownership.
- One coherent status channel and alert only for a new error.
- Explicit geolocation action; manual fallback after support/permission failure.
- No Radio/listbox/preferred-store semantics or hidden transaction mutation.
- Complete keyboard/zoom/RTL/text-spacing/forced-color operation without map.

## Responsive And Performance

The shared root is a named inline-size container. Search and branch actions
stack below 31.99rem; content uses logical properties and intrinsic tracks.
Neutral D9a adds CSS only—no provider request, listener, observer, timer,
geolocation call, map asset, storage or layout read. The docs target uses local
fixture filtering only for adapter evidence. The shared D9/D9a block is 1,203 B
gzip; Product CSS is 5,318/5,324 B with 6 B headroom and no raised ceiling.
Neutral component CSS and shared runtime retain their existing documented global
gaps; D9a contributes no neutral JavaScript.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native search form, branch list/articles, canonical Input/Button/Link. | Presentation implemented; service target-owned. |
| Shopify | App/metaobject/Storefront or accepted directory provider; native variant availability is insufficient. | Planned; source/editor/live proof required. |
| React / Angular | Controlled query/status/results, normal Links. | React docs implemented; package adapters planned. |
| Figma | Search, lifecycle states, result cards and optional map. | Planned; no D9a-specific owner artwork. |
| SwiftUI / Compose | Native searchable informational list and external directions action. | Conceptual. |

## Exhibit And Studio Parity

Exhibit and Studio mount the same `LocationStudio`, `StoreLocatorArtwork`, shared
fixture and local target behavior. Inspector controls semantic copy/status/slots
and public tokens. No target provider or map brand enters the base contract.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| General discovery was conflated with product pickup. | blocking, resolved | Separate D9a identity. | owner / ADR 0244 |
| Variant availability cannot be a general directory. | high | Require separate target source. | target |
| Rich branch cards conflict with interactive listbox constraints. | high | Native list/articles plus ordinary Links. | base contract |
| Geolocation/map can create privacy/provider coupling. | high | Explicit action, target ownership, manual fallback. | target |
| Final appearance lacks dedicated artwork. | human gate | Evidence-ready pilot only. | owner |

## Evidence And Validation

Final manifest, viewports, search/actions, parity, contrast, special modes,
budgets, adapter validation and cleanup are recorded in
`docs/reports/store-locator-web-refinement-audit.md`.

## Risks And Open Questions

- General branch provider and stable identity schema per target.
- Search/geocoding, privacy, map attribution/failure and directions policy.
- Shopify app/metaobject/directory choice, editor integration and live proof.
- Human approval of hierarchy, density, action treatment, stacking and map.
- D9a-specific owner/Figma evidence.

## Readiness Decision

Automated, interaction, responsive, parity and visual evidence is complete with
zero harness failures, console errors or page errors. D9a is ready for explicit
human visual review. The contract remains `pilot`; D9a-specific Figma evidence,
live directory/provider proof and human approval are mandatory before stability.
