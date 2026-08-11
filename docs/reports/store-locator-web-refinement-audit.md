# Store Locator Web Refinement Audit

Date: 2026-07-20

Registry: `D9a` / `store-locator`

Decision: owner `D9-C` identity split / ADR 0244

Result: `human-review-ready; pilot`

## Outcome

Store Locator is now a separate discovery-only component. It searches and
presents target-supplied galleries, studios or stores without product context,
using native list/article/address content and canonical contact/directions
Links. It has no Radio group, selected location id, preferred-store mutation or
transaction semantics.

It shares the location-search presentation, docs target, fixture family and
service boundaries with Pickup Location Selector without sharing the wrong
state model. Automated structure, interaction, responsive, parity, contrast,
special-mode, adapter and resource-lifecycle gates pass. Human visual approval,
D9a-specific Figma evidence and a live target directory/provider remain
mandatory; status stays `pilot`.

## Identity And Inventory Reconciliation

Store Locator did not previously exist as a canonical registry identity. The
old passive `store-pickup` could not satisfy general branch discovery without
mixing product availability and transaction state. ADR 0244 therefore adds D9a,
while ADR 0245 removes duplicate Certificate Details in the same migration.
Registry, contracts, Studio, docs and generated adapter inventories remain at
exactly 183 components.

The old Store Pickup baseline is preserved as historical migration evidence in
`output/playwright/refinement-batch-124/before/`. New paired evidence is under
`output/playwright/refinement-batch-129/after/store-locator/`.

## Research Reconciliation

| Evidence | Applied direction |
| --- | --- |
| HTML Standard | Native search form, list, article, address and ordinary Link semantics. |
| W3C Geolocation | Explicit permission action with complete manual fallback. |
| Open UI typed-search research | Asynchronous filtering does not force rich cards into a custom popup/listbox. |
| Polaris listbox/location evidence | Rich records with nested actions remain document content rather than interactive listbox options. |
| Shopify `store_availability` | Variant-scoped pickup availability is not a general directory source. |

External references define behavior and limits. The visual direction remains
The Gallery's quiet, editorial, bordered product language.

## Anatomy And Composition Audit

| Part | Requirement | Evidence | Result |
| --- | --- | --- | --- |
| Root | named section | one `.store-locator[aria-labelledby]` | pass |
| Heading | visible required text | associated `h2` | pass |
| Search | native search form | one `form[role=search]` | pass |
| Query/actions | canonical Input and Buttons | search input, submit and explicit location action | pass |
| Status | one coherent channel | status; error alert only | pass |
| Results region | visible name | section points to `Nearby locations` heading | pass |
| List | native complete collection | one `ul`, two fixture `li` records | pass |
| Branch | named native article | two articles with valid labelled-by references | pass |
| Address | semantic location content | two `address` elements | pass |
| Contact/directions | canonical Links | two `tel:` and two target-owned directions hrefs | pass |
| Transaction state | forbidden | zero Radios and zero selected-state attributes | pass |
| Map | optional progressive slot | complete two-record list remains present | pass |

Required ready-state records need stable id, name and address. Invalid records
are omitted. `ready` with zero valid records projects `empty` rather than an
empty named results region.

## State, Variant, Size, And Mode Matrix

| Dimension | Supported behavior | Evidence |
| --- | --- | --- |
| Variant | one discovery presentation | contract/CSS |
| Size | intrinsic component container | 200 px direct container and four natural viewports |
| Ready | complete current branch list | default evidence |
| Loading | `aria-busy`, request controls disabled, stale list absent | executable probe |
| Empty | concise status, list absent, retry available | probe/screenshot |
| Error | alert, list absent, retry available | probe/screenshot |
| Directions | explicit ordinary Link with target navigation owner | intercepted docs probe |
| Optional map | supplemental, list complete | probe/screenshot |
| Invalid selected/preferred | not part of component | zero Radio/selected state |
| Light/dark/forced colors | semantic tokens and canonical focus | measured evidence |
| RTL/zoom/text spacing | logical layout, zero overflow | measured evidence |

The component contains no neutral animation or moving map. Reduced-motion policy
therefore inherits canonical dependency behavior without D9a-specific runtime.

## Interaction And State Ownership

- Searching `Recoleta` returned exactly one named branch article.
- The directions Link retained a real target-owned href. The docs target
  intercepted navigation only to demonstrate the event boundary and reported
  that navigation remains target-owned.
- A no-match search projected `empty`, removed stale branches and left the
  manual search enabled.
- Loading disabled the Input and both request Buttons, set `aria-busy=true`, and
  suppressed stale branches.
- Error used `role=alert`, suppressed stale branches and restored retry.
- The docs explicit-location action made zero browser geolocation calls and
  truthfully reported its local fixture.
- Enabling the optional map preserved both complete branch articles and every
  contact/directions action.

The target owns controlled query/status/results plus provider requests,
geocoding, ordering, cancellation, retries, privacy, navigation, analytics and
map synchronization. No selected or preferred location value exists.

## Public API Audit

| API | Exposure decision |
| --- | --- |
| `heading`, optional `description` | stable discovery content |
| `queryLabel`, `query`, optional `queryPlaceholder` | complete manual search |
| `searchLabel`, optional `useLocationLabel` | required search and optional permission action |
| `resultsLabel` | visible named result region |
| `locations` | target-ordered branch articles with stable identity/address |
| `status`, optional `statusMessage` | coherent ready/loading/empty/error lifecycle |
| optional `map` | synchronized supplemental target slot |

Product id, variant, inventory, selected/preferred location, coordinates,
provider brand, route algorithm and analytics are intentionally excluded.

## Token, CSS, And Hardcoded-Value Audit

- Shared semantic sources cover surface/border/text, spacing, radius,
  h4/body typography and canonical Input/Button/Link tokens.
- Private gap/border/surface aliases and the 31.99rem stacking threshold remain
  compositional implementation details.
- Fixture branches, addresses, schedules, services, phone numbers and directions
  hrefs are docs-target evidence, not defaults or public tokens.
- No map-provider, coordinate, distance, preferred-store or product token exists.

## Visual And Responsive Evidence

The final harness captured Exhibit and Studio at 390×844, 768×1024,
1440×1000 and 1920×1200. All 8 D9a combinations had zero root and document
overflow. At 200 px the search, status, branch details and action Links stack and
wrap without clipping.

Exhibit and Studio have exact normalized DOM hash `5f0c125d` and exact selected
non-geometric computed-style hash `75f07c4f`. Host widths are 516 px and 520 px,
a 4 px shell-only difference.

| Mode | Minimum audited text contrast | Result |
| --- | ---: | --- |
| Light | 7.81:1 | AA pass |
| Dark | 12.09:1 | AA pass |

Forced colors retained a 4 px focus outline and 1 px result boundaries. RTL,
effective 200% zoom, text spacing and the 200 px container produced zero root or
document overflow.

## DOM, Runtime, And Performance Audit

- Neutral output uses native content and CSS only.
- D9a adds no listener, observer, timer, request, geolocation call, storage,
  cache, map asset, layout read or shared-runtime branch.
- React local filtering and navigation interception belong only to the docs
  target.
- Shared D9/D9a CSS: 5,395 raw / 1,203 B gzip,
  SHA-256 `cf97736e296202886dfecf543b7582759134d5d4249f0fc5320ae3e7e5afd750`.
- Product CSS passes its fixed ceiling at 5,318/5,324 B with 6 B headroom.
- Neutral component CSS is 71,560/65,536 B with an existing documented 6,024 B
  global gap; no budget was raised.
- Shared runtime is 21,633/8,192 B under existing documented global gaps; D9a
  delta is zero.

## Cross-Target Audit

| Target | Certification status | Boundary |
| --- | --- | --- |
| Neutral Web | presentation implemented | directory/provider target-owned |
| React docs | renderer/fixture/interactions implemented | docs evidence only |
| Shopify | planned | variant pickup availability is insufficient; needs app/metaobject/directory source, editor mapping and live proof |
| Figma | planned | D9a-specific artwork and states need owner review |
| Future targets | contract documented | native searchable informational list and ordinary actions |

Shopify adapter validation stays at 183 components and 89 target-ready. D9a is
not falsely counted as ready without a general branch source and live evidence.

## Automated Validation And Evidence

- Harness: `output/playwright/refinement-batch-129/final-evidence.js`.
- Machine summary: `output/playwright/refinement-batch-129/evidence-summary.json`.
- Screenshots: `after/store-locator/` and `special/store-locator/` inside the
  batch directory.
- Browser result: zero failures, console errors and page errors.
- Resource lifecycle: one managed server, one named headless Chromium session,
  one page; cleanup closed both processes and freed port 4173.
- Registry, contracts, Studio, docs and both generated adapters are reconciled
  in batch report 129.

## Risks And Human Review Gate

- Accept one target directory provider and stable branch identity schema.
- Define search/geocoding cancellation, privacy, retention and retry policy.
- Accept map attribution/failure and external-directions behavior.
- Choose and prove Shopify source/editor/runtime integration; variant availability
  alone is not sufficient.
- Review hierarchy, density, action treatment, narrow stacking and optional map
  against owner artwork.
- Provide D9a-specific Figma evidence.

Verdict: ready for explicit human review, still `pilot`, not `stable`.
