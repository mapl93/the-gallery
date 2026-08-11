# 0216. Canonical Subscription Choice Composition And Target Selling-Plan Ownership

Status: Superseded by ADR 0246

Date: 2026-07-18

ADR 0246 replaces the provisional one-recurring-choice plus optional nested
Select model after the owner accepted D10-A. This file remains historical
evidence for the removal of the custom `role="radio"` and private Select clone.

## Context

D10 Subscription / Recurring Option independently implemented a focusable
`div role="radio"` with local `aria-checked`, `.is-selected`, click, Enter and
Space handling, a generated radio dot, and a complete private Select clone. It
did not participate in a same-name native Radio group, did not expose native
name/value/required/form/reset behavior, and duplicated canonical Radio and
Select focus, disabled, validation, indicator and transition CSS. Its price and
savings were uncomposed text spans rather than canonical Price and Badge.

The old contract made D10's Error, Success and Warning variants represent only
the nested frequency field. It exposed that child's label, value, message,
indicator and disabled state, but did not establish whether the human frequency
value was a target selling-plan identifier or who produced the final purchase
payload. The rendered D10 could therefore look selected while remaining an
isolated binary widget with no native group semantics.

ADR 0057 already chooses named native Radio groups and a single group value
owner. Canonical Select already owns one native form value/fallback and its
progressive combobox/listbox enhancement. Canonical Price and Badge own readable
price and passive label presentation. HTML requires Radio to participate in a
same-name group with peers, and a Radio label cannot contain a second labelable
Select control.

Shopify selling plans are target commerce data. An allocation links a product
variant and plan and determines price effects; theme integration keeps the
selected `selling_plan` identifier empty for one-time purchase and coordinates
variant, plan, price and CTA changes. The repository has no accepted universal
selling-plan schema, default-selection policy, terms policy, Shopify block or
coordinator architecture.

## Decision

- D10 is one recurring-purchase choice inside a target-owned, visibly labelled
  purchase-option group; it is not the group and is never a standalone binary
  Radio.
- The group supplies a Fieldset/Legend or target-native equivalent plus at least
  one same-name peer choice. A common Web fixture is one-time purchase and D10.
- D10 composes canonical Radio, Price, optional passive Badge, optional
  canonical Select, and optional target-authored terms.
- The canonical native Radio input is the sole checkedness, name, value,
  required, disabled, keyboard, validity, event, FormData and reset owner.
- D10's root is non-interactive layout. It has no `role="radio"`, tabindex,
  `aria-checked`, selected class/data mirror, click handler, keyboard handler or
  separate selection store.
- The selected boundary and details visibility derive from native `:checked`.
  Unchecked details are `display:none` and unavailable to rendering/focus.
- The canonical Radio label contains only its input and visible label. Price,
  Badge, Select and terms remain siblings; no nested labelable control is placed
  inside the Radio label.
- The public semantic API is `label`, `name`, `value`, optional `checked`,
  `required`, `disabled`, required target-formatted `price`, optional readable
  `savings`, optional `sellingPlanControl`, and optional `terms`.
- `sellingPlanControl` is a complete canonical Select or target-native
  equivalent. D10 does not re-export its label, options, value, validation,
  message, disabled state, indicator, keyboard model, fallback or events.
- D10 has one visual variant and one intrinsic size. Error, Success and Warning
  remain canonical Select variants when the child plan control needs them.
- Missing label, name, value or truthful price omits D10. Missing optional
  composition omits its node; no empty details wrapper renders.
- Native/static adapters use checked/defaultChecked. Controlled framework
  adapters may project one group value and change callback. They must not mirror
  a second D10 state.
- Product/variant identity, purchase-mode default and requirement, eligible
  groups/plans, allocation price and savings, plan IDs, option ordering,
  required terms, hidden form payload, stale-value clearing, CTA text,
  loading/error state, announcements, cart and checkout belong to the target
  product coordinator.
- D10 adds zero neutral listener, observer, timer, request, formatter, storage,
  cart service, layout read or component-specific runtime.
- Shopify remains planned until a target-native Liquid/block composition,
  `selling_plan` value owner, variant/plan/price/CTA coordinator, localization,
  editor behavior and live-store proof exist.
- D10 remains `pilot`; automated evidence cannot promote it to `stable`.

## Consequences

- Native group behavior supplies Tab, arrows, Space, mutual exclusion, required
  validity, FormData, input/change and reset without a D10 keyboard runtime.
- Radio, Select, Price and Badge changes propagate through canonical contracts
  instead of four parallel D10 implementations.
- The D10 public surface becomes smaller while retaining the semantic decisions
  that are stable across targets.
- The card remains visually recognizable, but only the Radio label and nested
  controls are actions; the complete body no longer advertises a false hit area.
- Exhibit and Studio can mount one `SubscriptionOptionArtwork` and one group
  fixture through the shared Product renderer; fallback MDX uses the same class
  and native composition contract.
- Product CSS and neutral runtime become smaller and more auditable.
- Default selection, subscription-only behavior, one-radio-per-allocation versus
  purchase-mode-plus-selector, pricing labels, terms, Shopify target structure,
  final visual values, D10-specific Figma evidence and explicit human review
  remain open.
