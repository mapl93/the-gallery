# Checkbox Neutral Web Refinement Audit

Status: Ready for human review; not promoted to `stable`

Date: 2026-07-13

## Scope

This audit reviews Checkbox as a native binary control with independent mixed
presentation, form semantics, external Field Wrapper feedback, and four
validation variants. It does not infer alternate sizes, indicator slots, group
selection logic, a third submitted value, or Switch behavior.

## Reconciliation

- Contract advanced to `0.3.0`: 5 anatomy parts, 4 variants, 1 size, 9 states,
  8 behaviors, 9 properties, and 23 public token references.
- Corrected validation-focus selectors to represent semantic root plus focused
  native control as one selector.
- Static/default checkedness, live checked/indeterminate properties, native
  events, and framework controlled/uncontrolled strategies are explicit.
- The wrapping label remains the accessible name and full pointer target; Field
  Wrapper still owns feedback outside that toggle area.
- Label uses stable `16/24px` body type. The `20px` control is centered `2px` on
  the first line, producing at least a `24px` one-line activation area.
- Semantic boundaries use the private `70%` mix and labels use `55%`.
- Semantic Check/Minus indicators use a documented private encoded `#171717`
  stroke; default primary selection retains the accepted inverse stroke.
- Root/label now contain unbroken content; reduced motion and forced-colors
  native appearance remain intact.

## Browser Evidence

- Native form probe began `checked=true`, `indeterminate=true`; FormData included
  `choice=yes`, confirming mixed state did not replace checked submission.
- User activation changed checked to false, cleared native indeterminate and the
  initialization marker, and removed the value from FormData. Form reset restored
  default checkedness but intentionally did not recreate the consumed marker.
- Real keyboard Space kept focus and toggled unchecked to checked.
- Geometry: one-line root `24px`, control `20x20px`, control top inset `2px`;
  two-line RTL root `48px` and full label activation area.
- `280px` long unbroken RTL label stayed inside root with document/host overflow
  `0px`.
- Default boundary contrast, remeasured in Batch 08: `3.07:1` light and `5.19:1`
  dark after the shared private neutral-boundary correction.
- Light semantic boundary contrast: Error `6.18:1`, Success `4.43:1`, Warning
  `3.83:1`; label contrast `8.05:1`, `6.05:1`, `5.34:1`.
- Dark boundary contrast: `8.63:1`–`12.26:1`; label contrast
  `10.03:1`–`13.15:1`.
- Semantic indicator contrast: light `4.76:1`–`8.35:1`; dark
  `6.48:1`–`10.74:1`. All computed images contained the dark semantic stroke.
- Reduced-motion transition duration `0s`; forced-colors appearance `auto`.
- 8 canonical screenshots cover Exhibit/Studio and all four viewports; before,
  RTL extreme, and special-media images supplement them.
- Exhibit/Studio stage markup is byte-identical at 261 characters.
- Browser console: 0 errors, 0 warnings.

## Token, CSS, Runtime, And Content Audit

- Existing Input/Button/text/body/radius/motion/opacity tokens supply the 23
  public references; body line-height is now explicitly declared.
- Private values: `1.5px` border, `20px` control via token, `14px` SVG geometry,
  first-line centering, default/semantic mixes, and encoded indicator stroke.
- Shared enhancer performs no layout read or polling. Each enhanced checkbox has
  one change listener that consumes the initial mixed marker; plain native
  behavior otherwise remains browser-owned.
- Current shared runtime is `5,263 B` gzip against `8 KiB`; primitives CSS is
  `10,378 B` against `10.3 KiB`; neutral component CSS is `57,952 B` against
  `64 KiB`.
- Empty-label behavior remains invalid authoring because label is required.
  Short, long, localized RTL, checked, unchecked, mixed, disabled, required,
  and all validation combinations are represented.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native checkbox, wrapping label, native form attrs/events, progressive mixed initialization. | Implemented and browser-evidenced. |
| Shopify | Native Liquid checkbox with same CSS/JS and external feedback reference. | Generated adapter validates; theme-specific review remains. |
| React / Angular | `defaultChecked`/initial mixed or controlled checked/indeterminate plus native events. | Strategy documented; adapter not implemented/certified. |
| Figma | Box, Check/Minus, label, one size, validation, hover/focus/disabled. | Metadata works; frame is not Checkbox-specific owner evidence. |
| SwiftUI / Compose | Native checkbox/toggle and mixed equivalent where available; groups provide context. | Conceptual mapping only. |

## Remaining Risks And Human Questions

1. Approve `20px` control, `24px` label leading, `8px` gap, corner radius,
   semantic fills/mixes, indicator weight, and focus ring.
2. Approve repository render or provide Checkbox-specific owner evidence.
3. The encoded semantic indicator stroke cannot follow arbitrary token overrides
   automatically. Replacing it with inline/slot anatomy requires a new decision.
4. Group labels, select-all behavior, and message content stay outside Checkbox;
   they must be certified with Fieldset/Field Wrapper and composed controls.

## Validation

- Contracts, Studio, docs, tokens, Neutral Web adapter, and Shopify adapter pass.
- Structural audit, parity, static previews, full temporary build, performance,
  and global matrix are rerun in Batch 07.

## Readiness Decision

Ready for human review. Contract remains `pilot`; only explicit owner approval
may promote it to `stable`.
