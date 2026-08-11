# Component Dossier: Pickup Location Selector

Status: `human-review-ready; pilot`

Target reviewed: Neutral Web, React docs target, Shopify translation

Contract: `components/contracts/pickup-location-selector.contract.json`

Registry: `D9` / `pickup-location-selector`

Decision: owner D9-C / ADR 0244

## Recommendation

Use a list-first product-context search surface composed from canonical Input,
Button and native Radio. The target supplies eligible records for the exact
current product, variant and market; selection emits one stable location id as
pickup intent. It must never be represented as reservation or fulfilment
confirmation. Manual search is complete, explicit geolocation is optional, and
an optional synchronized map never replaces the list.

This replaces the passive Accordion snapshot from ADR 0215. The implementation
can enter human visual review after interaction, parity, special-mode and target
boundary evidence is complete; it remains `pilot`.

## Purpose And Limits

- Find eligible pickup locations for the current merchandise context.
- Inspect text-complete name, address, availability, readiness, hours and
  optional distance before choosing.
- Emit exactly one stable location id to the shared product/fulfilment
  coordinator, or empty when no pickup intent is selected.
- Support manual address/city/region/postal-code search in every target.
- Optionally request device location only after an explicit localized action.
- Optionally compose a synchronized target-owned map as supplemental UI.
- Not a reservation engine, inventory provider, checkout confirmation,
  preferred-store setting, general branch directory, map provider or route
  planner. Store Locator owns discovery without product context.

## Current Gallery Baseline

The prior `store-pickup` identity composed one Accordion and a passive snapshot.
It had no search, selection, stable id, geolocation action or map boundary and
therefore contradicted the accepted D9-C owner decision.

The refined baseline now provides:

- registry id D9, Product category and canonical `.pickup-location-selector`;
- shared `.location-search` visual/runtime-free presentation with D9a;
- canonical Input, Button and Radio dependencies;
- native search form, Fieldset/Legend, named Radios and native result list;
- coherent ready/loading/empty/error projection and one status channel;
- controlled `query` and `selectedLocationId` in stateful targets;
- private component-container stacking at 31.99rem;
- optional progressive map slot and explicit provider boundary;
- one shared LocationStudio/fixture/renderer path for Exhibit and Studio;
- Shopify translation documented as planned rather than falsely target-ready.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard](https://html.spec.whatwg.org/) | Native search input, form, Fieldset/Legend, Radio, list and label semantics. | Prefer native form and choice ownership over a custom listbox or independent booleans. |
| [WAI-ARIA APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | One checked value, visible group/item names, Tab/Space/arrows, descriptions. | Canonical Radio supplies keyboard and checked state; D9 supplies group context/details. |
| [W3C Geolocation](https://www.w3.org/TR/geolocation/) | Device location is privacy-sensitive and requires express permission. | Never request on mount/open/focus; only the explicit localized Button may begin it. |
| [Open UI Combobox](https://open-ui.org/components/combobox.explainer/) | Typed filtering can associate an input with filtered options. | D9 keeps search and rich Radio results separate because cards contain multiple descriptions and target-owned async data. |
| [Radix Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group) | Controlled/uncontrolled one-value API and form-aware items. | Framework adapters own one `selectedLocationId`, not per-item checked stores. |
| [Polaris Choice List](https://polaris-react.shopify.com/components/selection-and-input/choice-list) | Clearly named mutually exclusive choices and scannable descriptions. | Use a visible Legend and concise location names/details. |
| [Shopify pickup availability](https://shopify.dev/docs/storefronts/themes/delivery-fulfillment/pickup-availability) | Availability is variant-scoped; transfer-backed values are already reflected; refresh follows variant selection. | Preserve native provider meaning and share the existing product coordinator; do not infer inventory or reservation. |

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | named `section` | D9 | Exact product/variant/market context is target data, not root copy. |
| Heading | yes | `h2` or contextual heading | D9/consumer | Names the surface. |
| Description | no | `p` | consumer | Explain scope/non-reservation when needed. |
| Search | yes | `form[role=search]` | D9 + target | Target chooses navigation/interception and service. |
| Query | yes | canonical Input, `type=search` | Input | Visible label required; placeholder optional. |
| Search action | yes | canonical Button submit | Button | Disabled only while current request is pending. |
| Use location | no | canonical Button | Button + target | Sole permission initiation route. |
| Status | conditional | `role=status` or new error `role=alert` | target truth / D9 placement | One concise channel. |
| Choice group | ready | `fieldset` + first `legend` | D9 | Names the selection question. |
| Results | ready | native `ul` | D9 + target | Target-ordered eligible records only. |
| Choice | repeated | canonical native Radio | Radio + target value | Shared name; stable location id value. |
| Details | repeated | described text | target | Address and availability required; other fields optional. |
| Map | no | target slot | target | Synchronized, attributed and never complete alone. |

No Accordion, custom listbox, map-only pin, duplicated Radio markup or second
product/variant listener remains.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported | Notes |
| --- | --- | --- |
| Variant | default | No provider, density or visual-brand variants in v1. |
| Size | intrinsic | Search form stacks from the component's own inline size. |
| Ready | yes | Complete current eligible list. |
| Selected | yes | One native checked Radio and non-color record boundary. |
| No selection | yes | Empty `selectedLocationId`; no implicit first reservation. |
| Loading | yes | `aria-busy`, controls disabled, stale results absent. |
| Empty | yes | Manual search remains available with concise status. |
| Error/retry | yes | New error is alert; search remains available. |
| Map absent/failed | yes | Complete list unchanged. |
| Geolocation denied/error | target | Manual search remains complete. |
| RTL, dark, forced colors, reduced motion | required | Logical layout and canonical dependency behavior. |

## Public API And State Ownership

- Content: `heading`, optional `description`, `queryLabel`, optional
  `queryPlaceholder`, `searchLabel`, optional `useLocationLabel`,
  `selectionLabel`, optional `statusMessage`.
- State/data: `query`, required ready-state `locations` slot,
  `selectedLocationId`, `status=ready|loading|empty|error`, optional `map` slot.
- Events: native input/change/submit/reset; optional explicit location request;
  `onLocationSelect(stableLocationId)`; target lifecycle changes.
- Stateful targets expose controlled `query/onQueryChange`,
  `selectedLocationId/onLocationSelect`, and status. Static Web may initialize
  native values and submit normally. There is one owner for each value.
- Missing required heading/query label/search label/selection label omits the
  component. Ready with zero valid records is incoherent and must become empty.
- A product/variant/market change clears a selection absent from the next
  eligible set before publishing new choices.

## Token And Value Audit

- Public component decisions: surface/border/text families, selected primary
  boundary, success/error feedback, shared spacing, result radius, heading/body
  type, canonical Input/Button/Radio tokens.
- Private values: one gap alias, border/surface aliases, 31.99rem container
  threshold, 0.25rem status boundary, proportional sub-gaps and 10rem docs map
  fixture. These are compositional and stay private.
- Hardcoded fixture names, addresses, distances, phone values and provider copy
  are site target content, not contract defaults or tokens.
- No public provider, map brand, coordinate, inventory or reservation token.

## Visual And Content Audit

- Quiet heading/description leads to one labelled search row and a subordinate
  explicit geolocation action.
- Result cards keep names and associated details scannable; selected state uses
  native checkedness plus border thickness/color rather than color alone.
- Short, long, localized, unbroken and optional content must wrap without
  overlap. Missing readiness/hours/distance omits cleanly.
- Empty/loading/error never leave an obsolete list visible.
- A map follows the list and cannot consume the only readable record content.

## Accessibility And Interaction

- Native visible names for section, search and Fieldset; stable id/description
  references for each Radio.
- Native Tab, Space, arrow, checkedness, focus, FormData and reset behavior.
- One status channel; only a newly presented error alerts. Ordinary typing and
  map motion are not redundantly announced.
- Explicit geolocation action satisfies the accepted permission boundary; the
  target owns disclosure, permission result and privacy retention.
- Eligibility/selection remain text and native state complete under forced
  colors; maps/icons/color are supplemental.
- Selection feedback says intent only and never announces reservation.

## Responsive And Performance

- Root is a named inline-size container; at 31.99rem the form becomes one column
  and the canonical submit fills the available inline size.
- All internal tracks use `minmax(0,1fr)`, `min-inline-size:0`, logical spacing
  and wrapping; no viewport media query or fixed result width.
- Neutral base adds CSS only. It introduces no request, listener, observer,
  timer, geolocation call, map asset, cache, storage or layout read.
- The React docs target owns local fixture filtering and interaction solely as
  adapter evidence. Real services remain target runtime.
- The shared D9/D9a CSS block is 1,203 B gzip. Product CSS is 5,318/5,324 B
  gzip with 6 B headroom; no ceiling was raised. Neutral component CSS is
  71,560/65,536 B with its existing documented global gap.
- D9 adds no neutral runtime; shared runtime remains 21,633/8,192 B under its
  existing documented global gap.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native search form + canonical Input/Button/Radio + target coordinator. | Base presentation implemented; service target-owned. |
| Shopify | Selected variant `store_availabilities` may inform results; one existing product coordinator; accepted persistence/confirmation still needed. | Planned; live proof required. |
| React / Angular | Controlled query/status/selected id and native choice composition. | React docs implemented; distributable adapters planned. |
| Figma | Search, statuses, Radio records and optional map variants. | Planned; no D9-specific artwork approval. |
| SwiftUI / Compose | Native searchable list plus one selection binding. | Conceptual; target adapter pending. |

## Exhibit And Studio Parity

Both routes mount `LocationStudio` and `PickupLocationSelectorArtwork` with one
fixture, initial selected id, local search target and canonical CSS. Studio
controls semantic content/status/composition and public tokens only. The optional
map is explicitly a docs fixture and not a contract default/provider.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Passive Accordion contradicted accepted selection scope. | blocking, resolved | Removed rather than aliased. | owner / ADR 0244 |
| Selection could be misread as reservation. | high | Stable intent event plus explicit transaction confirmation boundary. | target |
| Automatic geolocation would violate accepted privacy flow. | high | Explicit action only; manual search always available. | owner / target |
| Shopify availability is not persistence/confirmation. | high | Keep planned until mechanism and live proof are accepted. | Shopify integration owner |
| Optional map can hide complete results. | high | List-first required; synchronized progressive slot only. | target |
| Final density/surface/map placement lacks owner artwork. | human gate | Present evidence without stable promotion. | owner |

## Evidence And Validation

Final manifest, viewports, interaction cases, parity hashes, contrast, special
modes, bundle sizes, adapter validation and resource-cleanup results are recorded
in `docs/reports/pickup-location-selector-web-refinement-audit.md`.

## Risks And Open Questions

- Provider and stable location-id namespace per target.
- Search/geocoding request, cancellation, retry and stale suppression policy.
- Shopify intent persistence plus Cart/Checkout confirmation and live proof.
- Optional map provider, attribution, privacy, failures and usage limits.
- Human approval of hierarchy, density, selected boundary, stacking and map.
- D9-specific owner/Figma evidence.

## Readiness Decision

Automated, interaction, responsive, parity and visual evidence is complete with
zero harness failures, console errors or page errors. D9 is ready for explicit
human visual review. The contract remains `pilot`; D9-specific Figma evidence,
live target/provider proof and human approval are mandatory before stability.
