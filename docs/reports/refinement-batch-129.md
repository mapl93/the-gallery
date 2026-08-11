# Refinement Batch 129: Location Identity Split

Date: 2026-07-20

Components: D9 Pickup Location Selector and D9a Store Locator

Inventory migration: remove duplicate R11 Certificate Details

Result: both location components are `human-review-ready; pilot`; canonical
inventory remains 183; no component was promoted to `stable`.

## Accepted Direction Applied

Owner decision D9-C and ADR 0244 replace the passive Store Pickup availability
Accordion with two explicit identities:

- Pickup Location Selector finds eligible locations for the exact current
  product, variant and market and emits one stable pickup-intent id. It does not
  reserve inventory or promise fulfilment.
- Store Locator discovers branches without product context and has no selected,
  preferred or transaction state.

Both use complete manual search, optional explicit geolocation and an optional
synchronized map that never replaces the list. Provider, request, privacy, map,
navigation and target integration policy remains target-owned.

ADR 0245 removes R11 Certificate Details because it was only a duplicate profile
of canonical Certificate. The new D9a identity and R11 removal offset exactly:
183 registry entries, 183 contracts, 183 Studio definitions and 183 docs pages.

## Canonical Source Changes

- Replaced `.store-pickup`/Accordion CSS with shared `.location-search`,
  `.pickup-location-selector` and `.store-locator` presentation in
  `components/css/product.css`.
- Added target-agnostic contracts for both new identities and removed the two
  superseded contract files.
- Added one shared `LocationStudio`, `LocationSearchArtwork`, fixture and local
  adapter behavior; Exhibit and Studio route through the same renderer.
- Removed Store Pickup and Certificate Details renderer paths and the old
  Store Pickup artwork.
- Added one MDX page and one Studio metadata definition per location identity;
  removed the superseded pages/metadata.
- Updated registry, architecture, owner-decision packets, open questions,
  Shopify translation guidance and accepted ADRs.
- Removed every Certificate Details CSS ownership alias; no compatibility
  selector or parallel implementation remains.

## Browser Evidence

The bounded evidence lifecycle used one server at `127.0.0.1:4173`, one named
headless Chromium session `gallery-refinement` and one page navigated serially.
It captured both components in Exhibit and Studio at mobile, tablet, desktop and
XL: 16 combinations with zero root/document overflow.

| Component | DOM parity | Style parity | Host width difference | Browser failures |
| --- | --- | --- | ---: | ---: |
| Pickup Location Selector | `e973a78f` exact | `40aaed54` exact | 4 px | 0 |
| Store Locator | `5f0c125d` exact | `75f07c4f` exact | 4 px | 0 |

Both passed light/dark contrast, forced-color focus and boundaries, RTL,
effective 200% zoom, user text spacing and a direct 200 px container. Minimum
audited text contrast was 7.81:1 in light and 12.09:1 in dark.

Pickup interaction evidence covers native arrow selection, stable id projection,
stale-id clearing, manual search, ready/loading/empty/error, retry availability,
explicit location action without browser permission and optional map/list
coherence. Store Locator covers manual discovery search, native records and
Links, target-owned directions, lifecycle states, explicit location action and
optional map/list coherence.

Artifacts:

- `output/playwright/refinement-batch-129/final-evidence.js`
- `output/playwright/refinement-batch-129/evidence-summary.json`
- `output/playwright/refinement-batch-129/after/`
- `output/playwright/refinement-batch-129/special/`
- historical passive baseline: `output/playwright/refinement-batch-124/before/`

Visual inspection confirmed the final hierarchy at mobile/desktop, optional map,
forced colors, RTL and 200 px. The evidence harness hides only the mobile
documentation index during Exhibit screenshots so site chrome does not obscure
the component; component DOM and computed styles are unchanged.

## Accessibility And Semantic Result

- Pickup uses one named section, native search form, visible Input label,
  Fieldset/Legend, native list and canonical same-name Radios with stable values
  and valid descriptions.
- Native arrow movement updates one checked Radio, focus and one controlled
  selected id.
- Store Locator uses a named results region, native list, labelled articles,
  semantic addresses and ordinary canonical phone/directions Links.
- Store Locator contains zero Radio and selected-state semantics.
- Both use one status channel; only a newly presented error alerts.
- Loading sets `aria-busy`, disables request controls and suppresses stale data;
  empty/error preserve manual retry.
- Neither requests geolocation on mount, focus or ordinary search.
- Neither claims reservation, fulfilment, provider success or map availability.

## Responsive And Content Result

- One named inline-size container controls stacking below 31.99rem.
- Search tracks use `minmax(0,1fr)` and canonical controls remain reachable.
- Logical properties support RTL; text/details/actions wrap rather than clip.
- Optional content omits independently and the complete list remains primary.
- No viewport-dependent component runtime or measurement exists.

## Performance Result

The first measurement exceeded Product's fixed family budget by 36 B gzip.
Redundant `min-inline-size`, `visibility` and inherited wrapping rules were
removed instead of increasing the ceiling.

| Surface | Actual | Ceiling | Result |
| --- | ---: | ---: | --- |
| Shared D9/D9a CSS block | 1,203 B gzip | component evidence | recorded |
| Product CSS | 5,318 B | 5,324 B | pass, 6 B headroom |
| Neutral component CSS | 71,560 B | 65,536 B | existing documented global gap, 6,024 B |
| Shared runtime | 21,633 B | 8,192 B | existing documented global gap; D9/D9a delta 0 |

Global performance audit: 18 surfaces, 10 pass, 8 documented gaps and zero
undocumented gaps. No budget was raised.

## Cross-Target Result

- Neutral Web adapter validates 183 components and 19 CSS source files.
- Shopify adapter validates 183 components, 89 target-ready, 59 dedicated
  Liquid templates, 34/34 schema-ready and 17 CSS assets.
- D9 and D9a remain Shopify `planned`: variant `store_availabilities` can inform
  pickup eligibility but does not persist/confirm intent, and it is not a
  general branch directory.
- The Shopify translation is documented without adding fake provider, editor or
  live-store claims.
- React docs is implemented as target evidence; Figma and distributable future
  adapters remain planned.

## Validation Ledger

Passed in this batch:

- source token build and Web/Shopify token validation;
- neutral Web adapter build/validation;
- Shopify adapter build/validation;
- 183-entry registry/contract/Studio/docs reconciliation;
- TypeScript no-emit and JavaScript/JSON syntax checks;
- component certification audit;
- refinement decision coverage and global progress audit;
- `git diff --check`;
- evidence cleanup and clean-resource assertion.

Expected non-passing policy gate:

- `audit:refinement:performance` exits non-zero because eight pre-existing
  documented global/family budget gaps remain. It reports zero undocumented
  gaps, while Product itself passes.

`site/dist` was not rebuilt or modified.

## Human Review And Remaining Risks

Human review should decide only the still-open target and visual questions:

- final hierarchy, density, selected boundary, status copy, action treatment,
  narrow stacking and optional map placement;
- D9/D9a-specific Figma evidence;
- provider/stable-id schemas, search cancellation/retry/privacy policy;
- Shopify intent persistence/confirmation and general directory source;
- live editor/storefront/provider proof and map attribution/failure behavior.

The accepted identity split and Certificate Details removal are settled and do
not need to be re-opened for subsequent batches.
