# Switch Neutral Web Refinement Audit

Status: Ready for human review; not promoted to `stable`

Date: 2026-07-13

## Scope And Reconciliation

Switch was reviewed as an immediate binary setting backed by one native
checkbox with switch semantics. Deferred Checkbox choice, mixed state, pressed
Toggle Button, pending/persistence, and track content remain outside the scope.

- Contract advanced to `0.3.0`: five parts, four variants, three sizes, nine
  states, six behaviors, nine properties, and twenty-five public tokens.
- Required `role="switch"`, stable label, submitted value, name, checked,
  disabled, required, native events/reset, and controlled/uncontrolled ownership
  are explicit. Static feedback no longer claims alert behavior.
- Default off boundary uses the private `60%` mix. Semantic off/on boundaries,
  checked fills, and labels retain their validation family using `70%`/`55%`.
- Disabled root now owns opacity/cursor and ignores hover. Thumb travel uses
  logical inset; root/label contain long content. Reduced motion and forced
  colors cover track, thumb, focus, checkedness, and disabled state.
- Shared Studio fixture now starts off, exposes all semantic properties/states,
  and keeps the On toggle synchronized with the state selector.

## Browser Evidence

- Space toggled on, retained the visible label, emitted one `input`/`change`,
  passed required validity, and submitted `available=yes`.
- Reset restored off/invalid/no value. Wrapping-label click toggled on; disabled
  activation did not change checkedness and FormData omitted the field.
- Checked RTL thumb resolved to physical `left:2px; right:22px`; disabled root
  resolved to opacity `0.5` and cursor `not-allowed`.
- Contrast, light: off `3.07:1`, default track/thumb `10.37:1`, semantic minimum
  `3.86:1`, semantic label minimum `5.36:1`. Dark: off `5.19:1`, default
  track/thumb `17.93:1`, semantic minimum `8.64:1`, labels `10.06:1`.
- Track sizes: `36×20`, `44×24`, `52×28px`. A `280px` unbroken RTL label had
  no component/host overflow and preserved logical checked travel.
- Forced colors used Highlight/Canvas for checked track/thumb and a `4px` system
  focus; reduced-motion durations for track/thumb were `0s`.
- Eight canonical screenshots plus states/sizes, RTL, forced colors, reduced
  motion, and before evidence cover all four viewports.
- Exhibit/Studio markup is normalized-identical at `319` characters.

Evidence is stored under `output/playwright/refinement-batch-08/`.

## Tokens, Runtime, Performance, And Content

- No new public tokens or component layer. Track/thumb dimensions, travel,
  inset, focus geometry, and mixes stay private.
- Switch runtime remains zero; native checkbox owns Space/click, events, form,
  validity, and reset. No persistence, polling, request, or mirror state exists.
- Forms CSS: `6,155 B` gzip / `6.4 KiB`; shared runtime: `5,263 B` / `8 KiB`;
  Neutral Web components CSS: `57,952 B` / `64 KiB`.
- Off/on, three sizes, four variants, hover/focus, disabled, required-invalid,
  long/localized/RTL, reset, and form-value paths are represented.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native checkbox + role switch, canonical track/thumb, native events/form. | Implemented and browser-evidenced. |
| Shopify | Native Liquid checkbox switch; consumer owns immediate persistence. | Embedded class adapter validates. |
| React / Angular | Checked/defaultChecked plus native change; no mirror input. | Strategy documented; adapter pending. |
| Figma | Three track/thumb sizes, off/on, validation, focus, disabled. | Metadata works; shared frame is not owner approval. |
| SwiftUI / Compose | Native Switch/Toggle and target-owned side effect. | Conceptual mapping documented. |

## Remaining Human Review

Approve all three proportions, gap, first-line alignment, neutral/semantic
treatments, thumb shadow, and focus hierarchy. Approve the repository visual or
provide Switch-specific evidence, and confirm no inner labels or pending state
are required for v1.

## Validation And Decision

Contracts, Studio, registry/docs, token compatibility, Web/Shopify adapters,
temporary site build, certification/parity/static-preview audits, budgets, and
global progress audit pass in Batch 08.

Ready for human review. Contract remains `pilot`; no stability promotion was
performed.
