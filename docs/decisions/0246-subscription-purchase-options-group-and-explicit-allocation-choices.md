# 0246. Subscription Purchase-Options Group And Explicit Allocation Choices

Status: Accepted

Date: 2026-07-20

Supersedes: ADR 0216

## Context

ADR 0216 removed D10's custom `role="radio"`, private selection state, generated
indicator, and private Select clone, but retained D10 as only one recurring
choice inside a group owned elsewhere. Multiple eligible recurring plans were
then represented by a nested Select. The resulting registry component was not a
complete purchase decision, and Exhibit and Studio still assembled its one-time
peer outside the canonical implementation.

The owner accepted D10-A: D10 is the complete named purchase-options group. A
one-time purchase and every eligible recurring allocation are peer choices. The
one-time choice is the initial default when it exists. Subscription-only
merchandise omits it and must still expose at least two meaningful choices or use
a simpler non-Radio presentation.

Native Radio groups, WAI-ARIA APG, Open UI research, Radix Radio Group, and
Shopify Polaris Choice List converge on one labelled group with two or more
exclusive choices and one value. Shopify selling plans further establish that
each allocation is a concrete purchase alternative with its own checkout charge
and price effects. A generic recurring Radio followed by a Select obscures those
alternatives and creates two coordinated form values where the accepted product
model needs one purchase-option selection.

## Decision

- D10 is one canonical native Fieldset with a first visible Legend, optional
  associated description, and at least two same-name canonical Radios.
- The ordered `options` composition contains target records with a unique stable
  `id`, `oneTime` or `recurring` kind, visible localized `label`, and complete
  target-formatted `checkoutPrice`.
- Every recurring record additionally requires a complete target-formatted
  `perDeliveryPrice` and readable localized `cadence`. It may include one
  verified localized `savings` statement, target-authored `terms`, and a native
  disabled state.
- At most one one-time record may exist. When it exists, the target initializes
  it as the selected value. A subscription-only group requires at least two
  valid recurring records; otherwise D10 is omitted in favor of a simpler
  non-Radio presentation.
- One-time, checkout-charge, per-delivery, and cadence labels are explicit
  localized semantic properties. D10 never assumes that equal monetary values
  make one of those meanings redundant.
- Canonical Radio input checkedness is the sole selection owner. Static and
  uncontrolled targets use one checked/defaultChecked input; controlled targets
  project one `selectedValue` and one change callback.
- An empty or unknown `selectedValue` checks no Radio. D10 never silently maps a
  stale target id to another plan. Native required validation may remain active
  while the target coordinator clears or replaces stale selection.
- Optional terms render inline only for the selected record in v1. Visibility
  derives from native `:checked`; unchecked detail is `display:none` and cannot
  enter the focus order.
- D10 composes canonical Fieldset, Radio, Price, and passive Badge. It contains
  no nested Select, custom Radio role, duplicated indicator, root checked-state
  mirror, card-wide action, or component-specific neutral runtime.
- The target product coordinator owns product and variant identity, selling-plan
  groups, eligibility, record ordering, localized amounts, verified savings,
  required terms, initial subscription-only policy, selected value, stale-value
  repair, target payload conversion, CTA synchronization, loading/error policy,
  truthful announcements, cart, and checkout.
- Shopify maps variant `sellingPlanAllocations` into neutral records and converts
  the selected record back to its native `selling_plan` payload. Shopify ids and
  data shapes do not enter neutral source defaults.
- D10 remains `pilot`. Automated certification prepares it for human review but
  cannot promote it to `stable`.

## Consequences

- Exhibit and Studio mount the same complete renderer and fixture; the one-time
  peer is no longer site-only markup outside D10.
- Every eligible recurring plan is directly visible and comparable without a
  second focusable plan selector or two-value synchronization problem.
- Native Fieldset and Radio behavior supplies group naming, Tab, logical arrows,
  Space, mutual exclusion, required validity, FormData, input/change, disabled
  propagation, and reset without D10 JavaScript.
- Checkout charge, per-delivery amount, cadence, savings, and terms stay readable
  and localizable while commerce calculation remains target-owned.
- Invalid records can be omitted deterministically; fewer than two valid records
  omit the complete group instead of producing a meaningless single Radio.
- Shopify Liquid/block composition, variant/allocation coordinator, localization,
  editor behavior, live-store proof, D10-specific Figma evidence, final visual
  review, and explicit stability approval remain pending.
