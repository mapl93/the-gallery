# 0035. Button Semantic Properties, Loading, And Activation

Status: Accepted

Date: 2026-07-11

## Context

ADR 0034 assigns semantic component properties and target mappings to component
contracts while leaving Studio grouping, ordering, and control presentation to the
documentation product. Button is the first schema pilot.

The canonical Button CSS already established variants, sizes, disabled and busy
states, `.btn--icon-only`, and `.btn--full`. Owner review additionally established
that Button supports independent icons on both sides of its label and that loading
must preserve the label instead of replacing all visible content.

## Decision

### Semantic property schema

Component contracts may define an optional `properties` array. A semantic property
records:

- A camel-case name and semantic data type.
- Whether a consumer must provide it.
- A static default only when one is established.
- Enum values directly or by reference to the contract's variants or sizes.
- Target mappings expressed as content, option-class, class, attribute, or slot
  mappings.
- Attribute mappings may declare `removeWhen` so an adapter removes a
  consumer-provided attribute only for the listed property values and preserves it
  otherwise.
- An explicit textual rule when omitted input has contextual behavior.

The property array is optional while existing pilot contracts are reviewed. Its
absence does not authorize Studio or an adapter to infer properties.

### Button property surface

Button exposes these reviewed properties for neutral web:

- `label`
- `variant`
- `size`
- `disabled`
- `busy`
- `leadingIcon`
- `trailingIcon`
- `iconOnly`
- `fullWidth`
- `loadingPosition`

`leadingIcon` and `trailingIcon` are independent slots and may coexist.
`iconOnly` and `fullWidth` are boolean properties mapped to `.btn--icon-only` and
`.btn--full`; they are not variants.

For web, positioned icons compose `.btn__icon` with either
`.btn__icon--leading` or `.btn__icon--trailing`. `loadingPosition` accepts
`leading` or `trailing` and maps to `data-loading-position`.

### Loading resolution

When `aria-busy="true"`:

1. An explicit `loadingPosition` wins.
2. Without an explicit value, exactly one positioned icon selects its own side.
3. Without icons, loading resolves to leading.
4. With both icons, loading resolves to leading.
5. Loading replaces only the icon on the resolved side. The label and the icon on
   the opposite side remain visible.

Neutral web implements this behavior in canonical CSS with generated `::before`
and `::after` indicators. No JavaScript is required for placement.

### Activation suppression

Disabled and busy states suppress native mouse, touch, and keyboard activation:

- A disabled native button uses `disabled`.
- A disabled anchor keeps `role="link"` and `aria-disabled="true"` and omits
  `href`.
- A busy native button composes `aria-busy="true"` with `disabled`.
- A busy anchor keeps `role="link"` and `aria-busy="true"` and omits `href`.

When `disabled` and `busy` overlap, adapters keep the disabling attribute while
either property remains true. Busy presentation takes visual precedence over
disabled opacity, so entering the loading state does not introduce a second visual
treatment.

## Consequences

- Button advances from a structural contract to the first reviewed semantic
  property pilot but remains `pilot` until all web certification evidence receives
  human review.
- The property model is available to future Studio work without embedding inspector
  layout decisions in the component contract.
- Other component contracts remain unchanged until their own evidence is reviewed.
- Target adapters other than neutral web require independent mapping and maturity
  review.

## Implementation Status

The neutral web evidence and final owner review were completed on 2026-07-11.
Button is now the first `stable` component contract. This promotion changes
contract maturity only; the semantic property surface remains version `0.3.0`
because repository-wide component versioning policy is still unresolved.
