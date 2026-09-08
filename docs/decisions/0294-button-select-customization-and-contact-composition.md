# 0294. Button and Select Customization in a Contact Composition

Status: Owner reviewed the overall result; required-marker color follow-up in ADR 0295

Date: 2026-09-08

## Context

The owner authorized resuming ADR 0293 with Button and Select, followed by a real
form composition. The previous work was validated, committed and pushed as
`0ce4881` before this batch. Rollback baseline `431fd1b` remains in branch history.

## Decision

- Preserve defaults, variants, semantic properties and public aliases. Extend
  the existing component source layer without new layers, formats or modes.
- Button exposes border width, unitless line height, focus width/offset, loading
  stroke/duration and Link underline offset through seven new source tokens.
  Studio also exposes existing icon size, font family, disabled opacity and focus
  color. Small/large sizes still derive from the base dimensions.
- Select reuses Input label/message spacing, border/focus dimensions and label
  weight. Eleven new source tokens own indicator size/gap, panel
  gap/padding/border/max-width/max-height, option padding/min-height and selected
  weight. Existing radius, surface, text, shadow and motion roles remain shared.
- The native popup remains browser-owned. Panel tokens apply to enhanced Select.
  This supersedes ADR 0047's statement that the then-existing shared tokens
  suffice for popup customization; no new token layer is introduced.
- Studio and Exhibit share the token resolver. State-specific controls select
  the alias used by Link text, Select disabled option/indicator text and open
  borders. Focus color is part of the editor's active-token mapping.
- Studio preserves the resolved token's unit, including unitless numbers.
  Infer units from names only when a value is missing.
- `/compositions/contact` is a site-owned example using canonical Input and
  Textarea artwork, native Select with the web enhancer, Button and Form CSS.
  Native fields own data and validity. The composition owns feedback, first-invalid
  focus and simulated submission. It sends no data.

## Boundaries

The coverage inventory in the batch report documents remaining CSS decisions:
contrast mixes, Button size ratios, intrinsic Link layout, circular constant-speed
loading, continuous borders, icon paths and viewport collision safety. No new
aesthetic treatment, such as Button elevation, is introduced.

Select check placement is bounded at zero so independent panel/option padding
cannot push it outside its row. Default placement is unchanged. Popup maximum
width is bounded by the viewport, and its minimum remains the trigger width.

The contact composition does not replace the Input/Button state matrix. Keep
the temporary Foundations pilot until equivalent adjacent, icon, loading,
read-only and long-content coverage exists elsewhere. No maturity promotion or
claim of complete Form customization coverage follows from this batch.

## Acceptance

1. Source resolves in all eight matrices and retains legacy parity.
2. Public aliases, contracts, registry, Studio and Exhibit agree.
3. Edited values affect rendered geometry; reset restores the baseline.
4. The contact composition retains 46 px single-line controls and 4 px
   label/message gaps in Light/Dark across four viewport ranges.
5. Keyboard selection, disabled options, native form data, validation focus,
   loading and reset work in the local composition.
6. Review the result before Shopify editor and Figma pilots. Those integrations
   and migration of existing consumer copies remain separate checkpoints.
