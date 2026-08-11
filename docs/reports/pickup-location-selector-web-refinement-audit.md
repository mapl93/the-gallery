# Pickup Location Selector Web Refinement Audit

Date: 2026-07-20

Registry: `D9` / `pickup-location-selector`

Decision: owner `D9-C` / ADR 0244

Result: `human-review-ready; pilot`

## Outcome

Pickup Location Selector now implements the accepted product-context search and
selection job. It finds target-supplied locations eligible for the exact current
product, variant and market, then emits one stable location id as pickup intent.
It does not reserve inventory or confirm fulfilment.

The prior `store-pickup` Accordion snapshot is removed rather than aliased. The
new implementation composes canonical Input, Button and Radio markup, uses one
shared `LocationStudio`/fixture/renderer in Exhibit and Studio, and introduces no
neutral JavaScript, provider, map or geolocation request.

Automated structure, interaction, responsive, parity, contrast, special-mode,
adapter and resource-lifecycle gates pass. Human visual approval, D9-specific
Figma evidence and live target/provider proof remain mandatory. The contract is
not promoted to `stable`.

## Before And After

| Surface | Before | After |
| --- | --- | --- |
| Identity | `store-pickup`, passive availability snapshot | `pickup-location-selector`, transactional intent selector |
| Composition | one canonical Accordion with text records | canonical Input + two Buttons + native Fieldset of canonical Radios |
| State | expanded/collapsed | ready, selected/no-selection, loading, empty, error, optional map |
| Data | target-authored snapshot | exact product/variant/market eligible records and stable location id |
| Runtime | no service | still no neutral service; target coordinator owns requests and truth |
| Long list | unspecified | complete target-ordered list; optional map stays supplemental |

Historical visual baseline remains under
`output/playwright/refinement-batch-124/before/`. Refined mobile/tablet/desktop/XL
evidence for both surfaces is under
`output/playwright/refinement-batch-129/after/pickup-location-selector/`.

## Research Reconciliation

| Evidence | Applied direction |
| --- | --- |
| HTML Standard | Native search form, search input, Fieldset/Legend, Radio and list semantics. |
| WAI-ARIA APG Radio Group | One checked value, one visible group name, native Space and arrow behavior. |
| W3C Geolocation | Permission can begin only after the explicit localized action. |
| Open UI Combobox research | Typed search remains separate from rich described Radio records rather than forcing a custom listbox. |
| Radix Radio Group | Stateful adapters own one controlled value, not independent checked booleans. |
| Polaris choice patterns | Visible grouping and scannable choice descriptions. |
| Shopify pickup availability | Availability is variant-scoped; it is neither reservation nor a general branch directory. |

The Gallery retains its quiet bordered product language. External systems inform
behavior and composition; none is copied as visual identity.

## Anatomy And Composition Audit

| Part | Requirement | Evidence | Result |
| --- | --- | --- | --- |
| Root | named `section` | one `.pickup-location-selector[aria-labelledby]` | pass |
| Heading | visible required text | one `h2` associated to root | pass |
| Search | native search form | one `form[role=search]` | pass |
| Query | canonical labelled Input | one `input[type=search]`, visible label and optional hint | pass |
| Actions | canonical Button ownership | submit `type=submit`; geolocation `type=button` | pass |
| Status | one coherent channel | `role=status`; new error uses `role=alert` | pass |
| Group | native Fieldset/Legend | one visible `fieldset` and first `legend` | pass |
| Choices | canonical named Radios | two fixture Radios, one name, stable values, one checked | pass |
| Details | described text | every Radio resolves its `aria-describedby` target | pass |
| Map | optional progressive slot | when present, two complete list records remain | pass |
| Legacy | no parallel Accordion | zero `.accordion` and zero `.store-pickup` descendants | pass |

Required ready-state records need stable id, name, address and availability.
Invalid records are omitted. `ready` with zero valid records projects `empty`,
and an unknown selected id is not reflected as selected state.

## State, Variant, Size, And Mode Matrix

| Dimension | Supported behavior | Evidence |
| --- | --- | --- |
| Variant | one neutral product presentation | contract and CSS |
| Size | intrinsic, component-container based | 200 px direct container plus four natural viewports |
| Ready | current complete eligible list | default paired evidence |
| Selected | one checked Radio and selected boundary | default plus ArrowDown probe |
| No selection | empty id, zero checked Radios | search that removes prior choice |
| Loading | `aria-busy`, request controls disabled, stale list absent | executable probe |
| Empty | status retained, list absent, manual retry enabled | executable probe and screenshot |
| Error | new alert, list absent, manual retry enabled | executable probe and screenshot |
| Optional map | complete list remains primary | executable probe and screenshot |
| Light/dark | semantic tokens | contrast probe and screenshots |
| Forced colors | system boundary and 4 px canonical focus | computed-style probe and screenshot |
| RTL | logical layout with zero overflow | Arabic-query probe |
| Zoom/text spacing | zero root/document overflow | effective 200% and user-spacing probes |

Reduced motion requires no D9-specific exception: neutral D9 contains no
animation, transition, timer or moving map. Canonical Input/Button/Radio motion
policy remains authoritative.

## Interaction And State Ownership

- Native ArrowDown moved focus and checkedness from `palermo-gallery` to
  `recoleta-studio`; the controlled `data-selected-location-id` changed once to
  the same value.
- Selection feedback states pickup intent and explicitly avoids reservation.
- Searching `Palermo` reduced the list to one record and atomically cleared the
  now-stale Recoleta id before publishing the result.
- A no-match search projected `empty`, removed stale results, kept the search
  enabled and used the one status channel.
- Loading disabled the Input, submit and explicit geolocation Button, set
  `aria-busy=true`, and suppressed stale records.
- Error used `role=alert`, removed stale records and restored manual retry.
- The docs “Use my location” action made zero calls to browser geolocation and
  truthfully reported a local fixture. Real permission remains target-owned.
- The optional docs map added one labelled supplemental image while preserving
  both complete Radio records.

Stateful adapters expose controlled `query/onQueryChange`,
`selectedLocationId/onLocationSelect` and lifecycle status. Search requests,
cancellation, provider truth, ordering, persistence, reservation and final
confirmation do not enter neutral source.

## Public API Audit

| API | Exposure decision |
| --- | --- |
| `heading`, optional `description` | stable understandable content |
| `queryLabel`, `query`, optional `queryPlaceholder` | complete manual search contract |
| `searchLabel`, optional `useLocationLabel` | required search and optional permission action |
| `selectionLabel` | required native group name |
| `locations` | required ready-state target slot with stable records |
| `selectedLocationId` | one stable pickup-intent value or empty |
| `status`, optional `statusMessage` | coherent ready/loading/empty/error projection |
| optional `map` | synchronized target slot that never replaces the list |

Provider type, coordinates, distance algorithm, map brand, request cache,
analytics, reservation state and private layout thresholds are intentionally not
public component properties.

## Token, CSS, And Hardcoded-Value Audit

- Public semantic sources cover primary/secondary text, surfaces, borders,
  selected primary boundary, success/error feedback, heading/body typography,
  spacing, radius and canonical dependency tokens.
- Private `--_location-search-*` variables own only gap, border and surface
  composition.
- The 31.99rem container threshold, 0.25rem status boundary and proportional
  sub-gaps remain private compositional values.
- Fixture gallery names, addresses, availability, distance, phone and copy are
  site-target evidence, not contract defaults or tokens.
- No provider, map, coordinate, reservation or inventory token was invented.

## Visual And Responsive Evidence

The final harness captured Exhibit and Studio at 390×844, 768×1024,
1440×1000 and 1920×1200. All 8 D9 component/surface/viewport combinations had
zero root and document overflow. At 200 px the search stacks, the submit remains
full-width, the Radio label/details wrap, and no action or status is clipped.

Exhibit and Studio have exact normalized DOM hash `e973a78f` and exact selected
non-geometric computed-style hash `40aaed54`. Host widths are 516 px and 520 px,
a 4 px documentation-shell difference within the shared framing tolerance.

Measured text contrast:

| Mode | Minimum audited ratio | Result |
| --- | ---: | --- |
| Light | 7.81:1 | AA pass |
| Dark | 12.09:1 | AA pass |

Forced colors retained a 4 px focus outline and 1 px result boundaries. RTL,
effective 200% zoom, user text spacing and the 200 px direct container all
reported zero overflow.

## DOM, Runtime, And Performance Audit

- Neutral output is CSS and native markup only.
- D9 adds no listener, observer, timer, request, geolocation call, storage,
  cache, map asset, layout read or JavaScript branch to `components/js/theme.js`.
- React local filtering exists only in the docs target to demonstrate the
  controlled adapter contract.
- Shared D9/D9a CSS: 5,395 raw / 1,203 B gzip,
  SHA-256 `cf97736e296202886dfecf543b7582759134d5d4249f0fc5320ae3e7e5afd750`.
- Product CSS: 33,686 raw / 5,318 B gzip against 5,324 B, leaving 6 B.
- Neutral component CSS: 71,560/65,536 B, a 6,024 B existing documented global
  gap; this is not an implicit ceiling increase.
- Shared runtime: 21,633/8,192 B under existing documented global gaps; D9 delta
  is zero.

## Cross-Target Audit

| Target | Certification status | Boundary |
| --- | --- | --- |
| Neutral Web | presentation implemented | service, provider and transaction coordinator target-owned |
| React docs | renderer/fixture/interactions implemented | documentation target, not canonical source |
| Shopify | planned | native variant availability may inform results, but selection persistence and Cart/Checkout confirmation need accepted implementation and live proof |
| Figma | planned | D9-specific artwork and variants still need owner review |
| Future targets | contract documented | bind native search/list/single-selection primitives to target services |

Shopify adapter validation remains 183 components, 89 target-ready, 59 dedicated
Liquid templates and 34/34 schemas. D9 is not counted as target-ready because no
provider or intent-confirmation integration is bundled.

## Automated Validation And Evidence

- Harness: `output/playwright/refinement-batch-129/final-evidence.js`.
- Machine summary: `output/playwright/refinement-batch-129/evidence-summary.json`.
- Screenshots: `after/pickup-location-selector/` and
  `special/pickup-location-selector/` inside the batch directory.
- Browser result: zero failures, console errors and page errors.
- Resource lifecycle: one managed server, one named headless Chromium session,
  one page; final cleanup reports server stopped, session closed and port 4173
  free.
- Registry, contracts, Studio, docs, neutral adapter, Shopify adapter and global
  refinement validations are recorded in batch report 129.

## Risks And Human Review Gate

- Accept provider and stable location-id namespace per target.
- Define request cancellation, retry, stale suppression and privacy retention.
- Accept Shopify intent persistence and Cart/Checkout confirmation behavior,
  then prove it in a live editor/storefront with the actual provider.
- Accept optional map provider, attribution, failures and usage limits.
- Review hierarchy, density, selected border, wrapping, empty/error copy and map
  placement against owner artwork.
- Provide D9-specific Figma evidence.

Verdict: ready for explicit human review, still `pilot`, not `stable`.
