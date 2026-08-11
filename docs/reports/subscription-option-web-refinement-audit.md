# Subscription / Recurring Option Web Refinement Audit

Status: `human-review-ready`

Date: 2026-07-20

Component: `D10` / `subscription-option`

Contract: `0.3.0` / `pilot`

ADR: [0246 Subscription Purchase-Options Group And Explicit Allocation Choices](../decisions/0246-subscription-purchase-options-group-and-explicit-allocation-choices.md)

Dossier: [Subscription / Recurring Option](../refinement/dossiers/subscription-option.md)

## Outcome

The owner-approved D10-A direction is implemented. D10 is now one complete
native purchase-options Fieldset containing one optional one-time choice and one
peer canonical Radio per eligible recurring allocation. The former generic
Subscribe choice and nested plan Select are gone.

Every recurring choice visibly identifies its checkout charge, per-delivery
amount, and cadence. Canonical Price renders amounts, optional canonical passive
Badge renders only target-verified savings, and optional target-authored terms
appear inline for the selected record. Native Radio checkedness is the only
selection owner; D10 adds zero neutral runtime.

All D10 technical, semantic, interaction, responsive, parity, contrast, and
resource-lifecycle checks pass. The contract remains `pilot` and is not
`stable`; final visual and target-specific review is explicitly pending.

## Certification Summary

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One complete purchase decision; commerce data/calculation/coordinator stays target-owned. |
| Anatomy | pass | Native Fieldset/Legend, at least two canonical Radios, Price, optional Badge and selected terms. |
| Public API | pass | Group labels, name, option records, explicit amount/cadence labels, required, disabled. |
| Canonical composition | pass | Fieldset, Radio, Price, and Badge; no duplicate control markup or nested Select. |
| Controlled/uncontrolled | pass | One group value; static checked, optional adapter defaultValue, or controlled selectedValue. |
| Semantics/accessibility | pass | Three same-name native Radios, valid descriptions, required validity, no redundant roles. |
| Interaction | pass | Native arrows, focus, input/change, FormData, reset, disabled propagation, and no false card hit area. |
| Responsive/content | pass | Eight natural viewport/surface combinations plus direct 200 px localized RTL/text spacing. |
| Exhibit/Studio parity | pass | Exact normalized DOM and non-geometric style hashes from one renderer/fixture. |
| Tokens/presentation | pass | Existing semantic tokens/private composition; intrinsic container behavior. |
| Runtime/performance | pass for D10/Product | D10 runtime delta 0; Product passes with 22 B gzip headroom. |
| Neutral Web/Webflow | pass | Generated adapter validates; Product CSS copies are byte-identical. |
| Shopify | planned honestly | Allocation mapping documented; Liquid/editor/coordinator/live-store proof pending. |
| Human review | pending | Visual candidate, D10 Figma, and target-native integration need explicit review. |

## Accepted Direction Applied

ADR 0246 supersedes ADR 0216 and settles the former product-model questions:

- D10 owns the complete visibly labelled group.
- One-time and every eligible recurring allocation are peer choices.
- One-time is selected initially when available.
- Subscription-only groups need at least two recurring options or use a simpler
  presentation.
- Checkout charge, per-delivery amount, and cadence remain explicit.
- Savings and terms are target-authored/verified.
- One group value owns state; stale ids never silently select another plan.
- Target coordinators own allocation eligibility, ordering, commerce truth,
  payload conversion, CTA, cart, checkout, and asynchronous lifecycle.

## Baseline And Implementation Result

The historical candidate duplicated Radio and Select through a focusable
`div role="radio"`, a mirrored selected class, local keyboard/click handlers, a
generated indicator, and a private frequency selector. It lacked a complete
same-name group, native arrows, form data, constraint validation, and reset.
Exhibit/Studio also assembled the one-time peer outside D10.

The final `SubscriptionOptionArtwork` instead:

- validates and orders target option records;
- fails closed without a visible Legend/name/semantic labels, with fewer than
  two valid options, or with more than one one-time record;
- requires checkout price for every record and per-delivery price/cadence for
  every recurring record;
- composes canonical Fieldset, Radio, Price, and optional Badge;
- checks only the record matching the one controlled value;
- associates concise Radio names with complete visible commerce facts;
- derives selected detail from native `:checked`; and
- contains no listener, observer, request, formatter, timer, storage, or layout
  measurement in neutral source.

## API And State Result

Contract properties are `legend`, optional `description`, `name`, repeated
`options`, `oneTimePriceLabel`, `checkoutChargeLabel`, `perDeliveryLabel`,
`cadenceLabel`, `required`, and `disabled`.

Option records contain `id`, `kind`, `label`, and target-formatted
`checkoutPrice`; recurring records additionally require
`perDeliveryPrice` and `cadence`. `savings`, `terms`, and per-option `disabled`
are optional. The contract keeps records in a composition slot because its
current schema cannot truthfully map a controlled record collection as a plain
string property. Behavior/adapter sections still require one selected group
value and one value-change path.

Verified states are unselected, selected, hover, focus-visible, disabled option,
disabled group, with savings, with terms, and unknown/stale controlled value.
There is one visual variant and one intrinsic size.

## Browser Evidence

Batch 130 used one managed server at `127.0.0.1:4173`, one named headless
Chromium session `gallery-refinement`, and one page navigated serially. Cleanup
then stopped the owned server/session and confirmed port 4173 free.

Eight component captures cover Exhibit and Studio at mobile `390x844`, tablet
`768x1024`, desktop `1440x1000`, and XL `1920x1200`, with zero component,
stage, or document horizontal overflow.

Parity at desktop:

| Measurement | Exhibit | Studio | Result |
| --- | --- | --- | --- |
| Normalized DOM hash | `5413cb9a` | `5413cb9a` | exact |
| Non-geometric style hash | `774d889d` | `774d889d` | exact |
| Root width | `516px` | `520px` | shell-only 4 px difference |
| Item width | `474px` | `478px` | shell-only 4 px difference |

Artifacts:

- `output/playwright/refinement-batch-130/final-evidence.js`;
- `output/playwright/refinement-batch-130/evidence-summary.json`;
- `output/playwright/refinement-batch-130/after/subscription-option/`; and
- `output/playwright/refinement-batch-130/special/`.

## Semantic And Interaction Result

- Root is native `FIELDSET`; Legend is `Purchase options` and its description is
  correctly associated.
- Three item layouts contain three same-name required Radios with values
  `one-time`, `plan-monthly`, and `plan-bimonthly`; one-time is checked initially.
- Root/items have no redundant widget role, tabindex, or checked-state mirror.
- The final DOM contains zero Select elements.
- Every recurring record exposes visible Due today, Per delivery, Cadence,
  savings, and terms content.
- ArrowDown selects/focuses `plan-monthly`, exposes exactly its terms, emits
  native input/change, and FormData contains only
  `purchase-option=plan-monthly`.
- Clicking the card body does not toggle; the canonical Radio label is the
  activation surface.
- Reset restores one-time. A required group with no checked option is invalid.
- Disabled Fieldset propagation disables all three Radios and removes the group
  from FormData.
- Empty required Legend fails closed; empty optional description removes both
  its node and `aria-describedby` reference.

## Accessibility And Special Modes

Audited light contrast is `17.93:1` for Legend, choice, and price and `7.81:1`
for description, cadence, and terms. Dark contrast ranges from `12.09:1` to
`17.18:1`. Reduced motion reports zero D10 animations.

Forced colors preserves native Radio appearance, a `4px` focus-visible outline,
and a `1px` selected boundary. Localized Arabic RTL content, user text spacing,
and a direct 200 px host report zero horizontal overflow.

Visual inspection caught one defect before completion: Price's accessible-label
slot was visually hidden, so the first candidate did not visibly distinguish
the amount meanings. The final renderer adds separate visible semantic labels,
and the refreshed screenshots prove One-time price, Due today, Per delivery,
and Cadence are visible.

## CSS, Tokens, And Performance

D10 owns only group/card layout, intrinsic wrapping, native-checked boundary,
selected detail visibility, and forced-color boundary. Canonical dependencies
retain typography, focus, control appearance, bidi, and passive metadata.

No new public token layer, viewport breakpoint, runtime measurement, or neutral
JavaScript was introduced.

| Artifact | Baseline | Final | Result |
| --- | ---: | ---: | --- |
| D10 CSS slice | `6,865 B / 1,288 B gzip` | `2,988 B / 770 B gzip` | `518 B` gzip reclaimed |
| Product family | `4,857 B gzip` historical | `5,302 B gzip` | `5,324 B` ceiling; `22 B` headroom |
| Neutral component CSS | `69,355 B gzip` historical | `71,528 B gzip` | existing documented global gap; no ceiling increase |
| Shared runtime | historical `10,501 B gzip` | `21,633 B gzip` current | existing documented gap; D10 delta `0 B` |

Final SHA-256:

- D10 slice: `7eface58741fe30a09b0e51a535993f3e794036f114988fed87a8ba2849dd47e`;
- Product CSS: `1fa7474fc2aec05cc9f9736cb5d12558f9d572cfa05151a702aadc5f600bc09b`;
- neutral Web components:
  `40daffd3405ec1ffaa77de6f5662a8b40e88a171196b133dcf41f065b0a41af4`;
- shared runtime:
  `e2380b1cc981da9e1a1c0ffbe503e10313c96ee653fa990203a45f6b0ef74fce`.

Product source CSS is byte-identical to Shopify and Webflow copies. The global
performance audit reports 18 surfaces, 10 pass, 8 documented gaps, and zero
undocumented gaps. No budget was raised.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Native Fieldset/Radios plus Price/Badge and target records. | Implemented/evidenced. |
| Static Web/Webflow | Server/CMS emits valid records and initial checked state. | CSS ready; data lifecycle target-owned. |
| Shopify | Variant allocations map to recurring records and selected id maps to `selling_plan`. | Planned; Liquid/block/editor/coordinator/live-store proof pending. |
| React/Angular/Hydrogen | One controlled/uncontrolled group value. | React docs target evidenced; distributable adapters pending. |
| Figma | Group/option variants and optional details through composed instances. | Planned; D10-specific evidence absent. |
| SwiftUI/Compose/future | Native single-selection group plus formatted commerce content. | Conceptual translation documented. |

## Validation Ledger

Passing gates include:

- site TypeScript `tsc --noEmit`;
- `npm run validate:contracts` — 183 contracts;
- `npm run validate:studio` — 183 definitions, 1,011 semantic properties,
  1,653 public token references, and 30 icon choices;
- `npm run validate:docs` — 183 registry entries/pages/source CSS;
- neutral Web adapter build/validation — 183 components, 19 CSS sources;
- Shopify adapter build/validation — 183 components, 89 target-ready, 59
  dedicated Liquid templates, 34/34 schema-ready, and 17 CSS assets; and
- bounded browser evidence with empty failures/console/page errors and clean
  final resource gate.

The performance command exits non-zero by policy because eight pre-existing
documented gaps remain; D10/Product passes and undocumented gaps are zero.
`site/dist` was not rebuilt or modified.

## Human Review And Remaining Risks

Human review should evaluate final hierarchy, card density/boundary, spacing,
amount labels, savings treatment, selected emphasis, terms density, and narrow
stacking. D10-specific Figma evidence and Shopify Liquid/block/editor/runtime/
live-store evidence remain pending. Each deployment still owns authoritative
plan eligibility/order, calculation, copy, and subscription-only default policy.

The complete-group versus nested-Select product model is accepted and no longer
an open decision.
