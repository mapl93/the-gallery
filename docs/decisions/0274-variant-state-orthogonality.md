# 0274. Variant And State Orthogonality

Status: Accepted

Date: 2026-08-12

Owner confirmation: variants and states are separate dimensions for every
Gallery component

## Context

During the human review of Select, Studio exposed `variant: Warning` next to
`state: Warning focus`. The second choice repeated the selected variant inside
the state inventory. It also allowed a state selection to mutate the variant,
so the two controls were not independent even though both were visible.

The same modeling pattern exists in other pilot contracts. Names such as
`errorFocusVisible`, `filledHover`, or `leftOpen` encode a variant and a state in
one option when the same result can be expressed by choosing each axis
independently.

## Decision

- A variant is a persistent presentation or configuration profile. Examples
  include Default, Error, Success, Warning, Filled, Outline, Left, and Right.
- A state is a current interaction, availability, visibility, or value
  condition. Examples include Default, Hover, Focus, Active, Disabled, Busy,
  Open, Selected, and Highlighted.
- Component contracts and Studio expose variants and states as orthogonal axes.
  A state name must not repeat a variant merely to demonstrate a combination.
- Studio renderers combine the independently selected values. Choosing Focus
  does not change Warning to another variant, and choosing Warning does not
  change the current state.
- CSS may use a combined selector such as
  `.select--warning .select__field:focus-visible` to implement the visual
  intersection. That selector is implementation evidence, not a separate
  `warningFocusVisible` contract state.
- Reports and test matrices may record combined coverage such as Warning +
  Focus. They must not promote the combination into a public variant or state.
- This rule applies to every Gallery component. Existing pilot components are
  reconciled during their individual human-review cycle so the program remains
  one component at a time. No component may become `stable` while its contract
  or Studio definition conflates these axes.

## Select Application

- Select keeps the variants Default, Error, Success, and Warning.
- Select keeps the states Default, Hover, Focus, Disabled, Open, Option Hover,
  Option Highlighted, Option Selected, and Option Disabled.
- Error + Focus, Success + Focus, and Warning + Focus remain fully renderable by
  combining the Variant and State controls.
- The generic Focus state resolves its tokens and focus ring from the currently
  selected variant without mutating that variant.

## Consequences

- Studio controls describe one concept each and avoid contradictory pairs such
  as `variant: Warning` with `state: Error focus`.
- Contract state counts may decrease even though visual and interaction coverage
  remains complete.
- Existing variant-aware CSS does not need to be flattened or duplicated.
- Pilot contracts with mixed axes remain review debt and are corrected in
  dependency order; automated structural coverage does not waive this human
  certification rule.
