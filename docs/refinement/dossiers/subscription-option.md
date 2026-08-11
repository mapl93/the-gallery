# Component Dossier: Subscription / Recurring Option

Status: `human-review-ready`

Date: 2026-07-20

Registry: `D10` / `subscription-option`

Dependency order: 140, phase 6 (Composed components); direct dependencies
`fieldset`, `radio`, `price`, and `badge`

Decision: owner-approved D10-A, recorded in
[ADR 0246](../../decisions/0246-subscription-purchase-options-group-and-explicit-allocation-choices.md)

## Direction

D10 is the complete purchase-options group for one current product and variant.
It contains one optional one-time purchase and one peer Radio for every eligible
recurring allocation. It does not present a generic Subscribe choice followed by
a second Select.

The group is one native Fieldset with a first visible Legend. Canonical Radio is
the sole selection, keyboard, validity, event, FormData, disabled, and reset
owner. Canonical Price renders every target-formatted amount, and canonical
passive Badge may render a verified localized savings statement. The bordered
cards are layout only: they have no widget role, tabindex, checked-state mirror,
or card-wide activation handler.

When a one-time option exists it is initially selected. Subscription-only
merchandise omits it and needs at least two meaningful recurring choices;
otherwise the target uses a simpler non-Radio presentation. Every recurring
choice visibly distinguishes checkout charge, per-delivery amount, and cadence.
Optional target-authored terms are shown inline only for the selected record.

D10 remains `pilot`. Automated and visual technical certification makes it
ready for human review, but only explicit owner review can promote it to
`stable`.

## Purpose, Use Cases, And Limits

### Purpose

Let a buyer compare and select exactly one concrete purchase option while
understanding when and how much they will pay and, for recurring choices, how
often delivery occurs.

### In scope

- one visibly named native purchase-options Fieldset;
- at least two same-name canonical Radios with unique stable values;
- zero or one one-time record and one Radio per eligible recurring allocation;
- explicit visible labels for one-time price, recurring checkout charge,
  per-delivery price, and cadence;
- optional verified localized savings and target-authored terms;
- native required validation, disabled propagation, form data, events, and reset;
- one static/uncontrolled initial selection or one controlled group value;
- selected detail derived from native checkedness;
- intrinsic container-responsive wrapping, RTL, zoom, text spacing, dark mode,
  reduced motion, and forced colors; and
- documented neutral Web, Shopify, framework, native, and Figma translations.

### Out of scope

- querying, grouping, sorting, or deciding selling-plan eligibility;
- formatting money, calculating savings, or authoring legal terms;
- product/variant selection, inventory, CTA, cart, or checkout ownership;
- loading, retry, cancellation, stale-request, or announcement policy;
- deciding the initial option for subscription-only merchandise;
- a universal selling-plan identifier or Shopify-shaped neutral API;
- Shopify Liquid/editor/runtime behavior without target-native proof; and
- stability promotion without human review.

## Accepted Product And Architecture Decisions

- D10 owns one complete labelled group rather than one partial recurring card.
- One-time and every concrete recurring allocation are peer Radios.
- The one-time choice is the default when available.
- Subscription-only groups need at least two recurring choices; otherwise D10
  is not the correct presentation.
- Each recurring choice always states checkout charge, per-delivery amount, and
  cadence, even when the two monetary amounts happen to match.
- Savings is a verified localized target calculation, never inferred by D10.
- Terms are target-authored and appear inline for the selected choice.
- One selected value is the only state owner. Unknown/stale controlled values
  check no Radio until the target coordinator repairs them.
- The target owns plan groups, eligibility, ordering, prices, savings, terms,
  stale clearing, target payload, CTA synchronization, cart, and checkout.
- Shopify maps native selling-plan allocations to neutral records and maps the
  selected record back to `selling_plan`; Shopify data shapes stay target-side.

## Baseline Audit

The historical implementation behaved like one custom recurring card:

- a focusable `div role="radio"` mirrored `aria-checked` and `.is-selected`;
- local click, Enter, and Space handlers managed an isolated boolean;
- it had no same-name peers, native arrow behavior, required validity, FormData,
  or reset;
- a generated radio dot duplicated canonical Radio;
- a private frequency field duplicated canonical Select;
- price and savings were local text rather than Price and Badge; and
- Exhibit/Studio assembled the one-time peer outside D10.

The baseline D10 CSS slice measured `6,865 B` raw / `1,288 B` gzip. Historical
screenshots remain under `output/playwright/parity/product/` and the first
post-baseline candidate under `output/playwright/refinement-batch-125/`.

## Research And Comparison

| Source | Relevant evidence | Direction for The Gallery |
| --- | --- | --- |
| [WHATWG radio state](https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio)) | Same-name native Radios define mutual exclusion, validity, events, form data, and reset. | Use the browser's native group rather than a custom Radio role/runtime. |
| [WAI-ARIA APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | A labelled group has one selected item; Tab, arrows, and Space define interaction. | Preserve native keyboard behavior and visible group naming. |
| [Open UI Radio Button research](https://open-ui.org/components/radio-button.research/) | Research centers the group because a standalone Radio has no strong use case. | Require at least two meaningful choices. |
| [Radix Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group) | Root owns one value/name and items own stable values/disabled state; controlled and uncontrolled modes are explicit. | Document adapter conveniences while keeping neutral HTML native. |
| [Shopify Polaris Choice List](https://shopify.dev/docs/api/checkout-ui-extensions/latest/components/forms/choicelist) | A labelled single-choice collection supports composable details. | Keep concise Radio names and associate richer explanatory content. |
| [Shopify selling plans](https://shopify.dev/docs/apps/build/purchase-options/subscriptions/selling-plans) | Selling plans represent concrete purchase options and their policies. | Present each eligible allocation directly instead of hiding plans behind a second field. |
| [Shopify SellingPlanAllocation](https://shopify.dev/docs/api/storefront/latest/objects/SellingPlanAllocation) | Allocation data supplies the variant-specific price effects of a plan. | Let target data determine checkout price, delivery price, and savings truth. |

### Convergence

The sources converge on one labelled exclusive group, one value owner, stable
item values, native keyboard/form behavior, and target ownership of commerce
truth. Rich details may accompany a concise option label but must not create a
second competing selection model.

### Remaining target-specific variation

Standards do not define plan ordering, subscription-only defaults, price and
savings calculation, legal terms, or target payload mapping. Those remain
explicit target coordinator responsibilities rather than neutral component API.

## Certified Anatomy

| Part | Required | Owner | Notes |
| --- | --- | --- | --- |
| Root | yes | Fieldset + D10 | Native `fieldset.subscription-option`; no redundant group role. |
| Legend | yes | Fieldset + target | First visible localized group name. |
| Description | no | target | Omit atomically with `aria-describedby`. |
| Choices | yes | D10 | Ordered composition with at least two valid records. |
| Item | yes | D10 | Non-interactive bordered layout for one option. |
| Choice | yes | Radio | One same-name native Radio and concise visible label. |
| Summary | yes | D10 + Price | Explicit checkout/one-time label and amount. |
| Savings | no | Badge + target | Passive, readable, verified localized claim. |
| Recurring facts | recurring only | D10 + Price | Explicit per-delivery amount and cadence. |
| Details | no | D10 | Selected-only inline region; contains no Select. |
| Terms | no | target | Renewal/billing/delivery/commitment/cancellation content. |

Invalid or duplicate records are omitted. The complete component fails closed
when Legend/name/semantic labels are empty, fewer than two records remain, more
than one one-time record exists, or a recurring record lacks its per-delivery
price or cadence.

## Public API

| Property | Type | Requirement | Meaning |
| --- | --- | --- | --- |
| `legend` | string | required | Visible purchase-decision group label. |
| `description` | string | optional | Associated group guidance. |
| `name` | string | required | Native form name repeated across every Radio. |
| `options` | slot/records | required | Ordered valid option records and their canonical compositions. |
| `oneTimePriceLabel` | string | required | Visible semantic label for a one-time amount. |
| `checkoutChargeLabel` | string | required | Visible semantic label for each recurring checkout charge. |
| `perDeliveryLabel` | string | required | Visible semantic label for each delivery amount. |
| `cadenceLabel` | string | required | Visible semantic label for cadence. |
| `required` | boolean | default `true` | Native same-name Radio constraint. |
| `disabled` | boolean | default `false` | Native Fieldset disablement. |

Each record has `id`, `kind`, `label`, and `checkoutPrice`. A recurring record
also requires `perDeliveryPrice` and `cadence`; `savings`, `terms`, and
`disabled` are optional. Prices are already formatted target strings.

The current contract schema expresses records through the `options` slot. It
does not falsely declare `selectedValue` as a plain string property because the
schema's current collection mapping cannot describe that controlled record
relationship. Behavior and adapter notes nevertheless require exactly one group
value.

### Controlled and uncontrolled translation

- Static/native markup sets exactly one initial `checked` Radio.
- Uncontrolled framework adapters may expose `defaultValue`.
- Controlled framework adapters expose one `selectedValue` and one value-change
  callback, deriving every Radio's checked state from that value.
- Empty or unknown values intentionally produce no checked Radio; D10 never
  selects a different plan silently.
- Native `input`, `change`, validation, disabled propagation, and form reset
  remain available in every strategy.

## State Matrix

| State | Projection | Expected behavior |
| --- | --- | --- |
| Unselected | no checked Radio | Valid temporary state for stale repair or subscription-only explicit choice; required group is invalid. |
| Selected | one native checked Radio | Stronger item boundary; selected terms shown inline. |
| Hover | available item contains hovered Radio label | Stronger boundary without making the card body an action. |
| Focus visible | canonical Radio input | Canonical focus ring only. |
| Disabled option | Radio `disabled` | Unavailable record cannot be chosen or submitted. |
| Disabled group | Fieldset `disabled` | All Radios disabled and omitted from FormData. |
| With savings | passive Badge | Readable verified statement, no live region. |
| With terms | selected option has terms | Inline detail visible only for current option. |
| Stale value | controlled value matches no record | No selection; target repairs atomically. |

There is one visual variant and one intrinsic size. Error/success/warning field
variants from the old nested selector no longer belong to D10.

## Tokens, CSS, And Responsive Behavior

D10 owns only the group/card boundary, summary/recurring layout, intrinsic
wrapping, selected detail visibility, and forced-color boundary. Fieldset,
Radio, Price, and Badge retain their semantic, typography, focus, and bidi
responsibilities.

Public token references are existing semantic color, radius, typography, and
spacing variables. Private `--_` values compose those decisions. No component
token layer, viewport breakpoint, arbitrary public knob, layout read, or runtime
measurement was introduced. A named inline-size container stacks metadata in
narrow contexts; logical properties preserve RTL.

Final metrics:

| Artifact | Actual | Budget/result |
| --- | ---: | --- |
| D10 CSS slice | `2,988 B` raw / `770 B` gzip | component evidence; `518 B` gzip below baseline |
| Product family | `5,302 B` gzip | `5,324 B` ceiling; `22 B` headroom |
| Neutral component CSS | `71,528 B` gzip | pre-existing documented global gap; no D10 budget increase |
| Shared runtime | `21,633 B` gzip | pre-existing documented gap; D10 delta `0 B` |

Product CSS is byte-identical in canonical source, Shopify, and Webflow copies.

## Accessibility And Interaction Certification

- The final root is a native Fieldset with one visible Legend and associated
  optional description.
- The fixture has three same-name required Radios: one-time, monthly, and
  bimonthly; one-time is the initial checked value.
- There is no root role/tabindex/`aria-checked`, item role, nested Select, or
  component-specific JavaScript.
- ArrowDown moves focus and selection from one-time to the monthly allocation;
  native `input` and `change` fire and FormData contains only
  `purchase-option=plan-monthly`.
- Clicking the non-label card body does not toggle selection.
- Native reset restores one-time, required validation rejects no selection, and
  disabled Fieldset propagation disables all choices and removes form data.
- Every recurring option exposes visible checkout, per-delivery, cadence,
  savings, and terms content with valid descriptive relationships.
- Light contrast ranges from `7.81:1` to `17.93:1`; dark contrast ranges from
  `12.09:1` to `17.18:1` for the audited text.
- Forced colors preserves native appearance, visible focus (`4px`), and a
  selected boundary (`1px`). Reduced motion reports zero D10 animations.
- Localized Arabic RTL content with user text spacing at a direct 200 px host
  has zero horizontal overflow.

## Exhibit, Studio, And Visual Evidence

Exhibit and Studio mount the same `SubscriptionOptionArtwork` and
`subscriptionPurchaseOptionFixture` through `ProductStudio`.

- normalized DOM hashes: Exhibit/Studio `5413cb9a` exact;
- non-geometric style hashes: Exhibit/Studio `774d889d` exact;
- desktop root widths: Exhibit `516px`, Studio `520px`;
- desktop item widths: Exhibit `474px`, Studio `478px`; and
- console errors, page errors, and test failures: none.

Eight final component captures cover Exhibit and Studio at mobile, tablet,
desktop, and XL. Special captures cover localized RTL at 200 px, dark/reduced
motion, and forced-color keyboard focus:

- `output/playwright/refinement-batch-130/after/subscription-option/`;
- `output/playwright/refinement-batch-130/special/`; and
- `output/playwright/refinement-batch-130/evidence-summary.json`.

Visual inspection confirmed that explicit amount labels are actually visible;
an earlier evidence pass caught and corrected their accidental use of Price's
visually hidden accessible-label slot. The final screenshots show the quiet
card hierarchy, comparable plan records, native focus, selected detail, and
contained narrow/RTL presentation.

## Cross-Target Translation

| Target | Translation | Certification result |
| --- | --- | --- |
| Neutral Web | Native Fieldset/Radios with canonical Price/Badge and target-supplied records. | Implemented and evidenced; zero D10 runtime. |
| Static Web/Webflow | Server/CMS emits complete valid records and one initial checked value. | CSS ready; data/coordinator target-owned. |
| Shopify | Variant selling-plan allocations map to recurring records; selected recurring id maps to `selling_plan`, one-time maps to no plan. | Planned honestly; no Liquid/block/editor/live-store claim. |
| React/Angular/Hydrogen | One controlled or uncontrolled group value over native controls. | React docs implementation evidenced; distributable adapters remain target work. |
| Figma | Group, option, selected/unselected, disabled, savings, terms, and narrow compositions. | Planned; no D10-specific approval artifact. |
| SwiftUI/Compose/future | Native single-selection group plus target-formatted commerce facts. | Conceptual mapping documented. |

## Remaining Risks And Human Review

- Human review must approve final density, card boundary, spacing, amount
  hierarchy, savings treatment, terms density, narrow stacking, and selection
  emphasis.
- D10-specific Figma evidence is still absent.
- Shopify still needs target-native Liquid/block composition, localization,
  product/variant/allocation coordinator, stale repair, editor behavior, and
  live-store proof.
- Each deployment must define authoritative plan ordering/eligibility, prices,
  verified savings, terms, and subscription-only initial-selection policy.

These are visual or target integration gates. The neutral product model and
one-time-versus-explicit-allocation decision are accepted and should not be
reopened for subsequent components.
