# 0293. Public Visual Customization Coverage

Status: Accepted

Date: 2026-09-08

## Context

Owner review of the Input spacing pilot identified a product-level gap: changing
component appearance must not require editing its implementation CSS. A value
being consistent or a private CSS property does not establish an adequate public
customization surface. The Gallery must expose broad visual control through
tokens and make that control discoverable in its documentation and editor.

## Decision

- Review meaningful visual choices for each component: surfaces, text and border
  colors, border geometry, radius, internal spacing, typography, size, effects,
  opacity and motion where those choices apply. Expose them through appropriate
  public tokens and documented controls, not unexplained implementation literals.
- Reuse a shared primitive or semantic token when it already represents the
  customization decision. Component-specific controls use the existing component
  source layer. Public customization does not require duplicating every shared
  role or every state into an independent constant.
- Contracts declare the public customization API. Studio metadata references that
  API to provide controls; it must not own duplicate defaults. Exhibit derives
  its visual-control reference from the same metadata. Both render canonical CSS.
- Structural mechanics such as flex/grid display, 100% field width, icon
  positioning, wrapping and zeroing the old shared gap are implementation rules.
  Native behavior, validation meaning, content, slots and state are contract
  properties. These are not indiscriminately converted into value tokens.
- A private visual derivation, such as the existing validation contrast mix, must
  be documented with its inputs and consequences. It is not silently presented
  as an exact final color when the public input is transformed.

## Input and Textarea implementation

The first expanded surface adds six source decisions and public aliases:

| Source decision | Public web alias | Default |
| --- | --- | --- |
| `component.input.labelGap` | `--space-input-label-gap` | `{dimension.4}` |
| `component.input.messageGap` | `--space-input-message-gap` | `{dimension.4}` |
| `component.input.borderWidth` | `--border-input-width` | `{dimension.1}` |
| `component.input.focusRingWidth` | `--border-input-focus-ring-width` | `{dimension.4}` |
| `component.input.focusRingOffset` | `--border-input-focus-ring-offset` | `{dimension.0}` |
| `component.input.labelFontWeight` | `--typo-input-label-weight` | `{font.weight.medium}` |

The two gaps are independent despite initially sharing 4 px. The label owns its
following margin, and the message owns its preceding margin. This works with
both a direct native field and an icon wrapper, and survives the pilot grid's
`display: contents` without duplicating a numeric gap in the fixture. The native field is a block
inside its wrapper so Textarea contributes no extra inline baseline space.

Studio also exposes existing Bottom margin, Font family and Disabled opacity
controls. Radius remains the existing public `--radius-md` token, applied within
the preview scope; color controls preserve their state-aware existing aliases.
No compatibility names are removed. The token registry adds the `border`
category for border/focus dimensions, without changing the canonical source format.

Defaults preserve the approved 46 px field and 4 px gaps. Increasing border width
or padding can increase field height; equal Input/Button height is the default
baseline, not an invariant under unrelated consumer overrides. Focus width and
offset retain the defaults of ADR 0045; consumers changing them must verify focus
visibility. Native semantics are unchanged. Textarea and other components that
compose canonical Input inherit its visual implementation; specialized controls
retain their own additional decisions.

## Acceptance and rollout

For each reviewed component:

1. Inventory user-facing visual choices and map them to source/shared tokens,
   public aliases, contracts, editor controls and actual rendered properties.
2. Record any remaining literal or derived visual choice and why it remains
   private; unexplained omissions are incomplete customization coverage.
3. Verify a non-default value through the editor and direct public-token override,
   including reset, state changes and component composition where relevant.
4. Check default parity, theme/viewport behavior and generated output consistency.
5. Preserve behavioral properties and accessibility requirements, and review the
   visual result before treating the expanded surface as stable.

This turn expands Input/Textarea and adds the shared Exhibit control reference.
It does not claim full visual-token coverage for all 182 components. Continue
with Button and related fields, then compound forms and commercial compositions,
using the same inventory before changes. No automatic Figma synchronization,
Shopify editor integration or consumer-copy migration is introduced here.
