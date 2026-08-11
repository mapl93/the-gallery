# 0092. Native Field Semantics And Validation Contrast

Status: Accepted

Date: 2026-07-13

## Context

The Input, Textarea, and Checkbox contracts already preserve native form
elements, but their reviewed surfaces did not yet describe a complete
controlled/uncontrolled boundary. Input and Textarea also omitted stable native
form attributes used consistently by HTML and mature target systems. Checkbox
used raw Success and Warning colors for light-theme labels and boundaries; the
result measured below the required text and non-text contrast thresholds.

The v1 refinement program requires the maximum useful semantic configuration,
logical/container-resilient geometry, explicit runtime ownership, and no new
public token for a private compositional correction.

## Decision

- Input and Textarea expose `name`, `required`, `readOnly`, `autocomplete`,
  `minLength`, and `maxLength` in addition to their accepted property surfaces.
  These map directly to their sole native form control.
- Input remains a single-line `type="text"` primitive. Email, URL, telephone,
  password, number, search, and other specialized semantics require their own
  reviewed component boundary rather than a broad type switch in this cycle.
- In static HTML, Input `value`, Textarea text content, and Checkbox `checked`
  establish initial values. Native controls then own editing, selection, form
  submission, constraint validation, and reset.
- Framework adapters may bind the live `value`, `checked`, and `indeterminate`
  IDL properties and listen to native `input` and `change` events. They must not
  introduce a second hidden value or selection owner.
- Checkbox `indeterminate` remains independent from `checked`: it takes visual
  priority while form submission continues to follow checkedness. The shared
  `data-indeterminate` hook remains initialization-only for static HTML.
- Native `required` supplies constraint-validation semantics but does not create
  a visible instruction. Consumer label or associated instruction content must
  communicate the requirement.
- Static validation messages do not use `role="alert"`. Alert or live-region
  semantics are reserved for feedback inserted dynamically.
- Error, Success, and Warning field boundaries and passive status icons mix the
  public semantic source token at `70%` with `--color-text-primary`. Labels and
  messages keep the accepted `55%` semantic/text mix. These are private
  contrast-strengthening formulas, not new public tokens.
- The default unfocused field boundary mixes its public boundary token at `60%`
  with `--color-text-primary`. This keeps the neutral family while meeting the
  non-text contrast floor in both themes; hover and focus retain their stronger
  accepted source tokens.
- Checkbox uses the same `70%` boundary mix and `55%` label mix. Its `20px`
  visual control is centered on the first `24px` body line so the wrapping label
  supplies a larger activation area.
- Selected semantic Checkbox indicators use a private encoded `#171717` stroke.
  This hardcoded value is limited to the embedded SVG asset because data URLs
  cannot resolve CSS custom properties; it is not public customization API.
- Input icon placement and padding use logical inline properties. Input,
  Textarea, and Checkbox bound long content to their container and allow
  anywhere wrapping for authored labels and messages.
- Input and inherited Textarea transitions stop under reduced motion. Forced
  colors uses the system `Highlight` focus boundary and `CanvasText` passive
  icon color; Checkbox continues to restore native appearance.

## Consequences

- Input and Textarea cover the stable native form semantics needed by neutral
  Web, Shopify, and future framework adapters without becoming framework APIs.
- The controlled/uncontrolled strategy is explicit while the repository's
  target-agnostic source remains native and copy-owned.
- Validation remains within the accepted semantic families but now has a
  measurable contrast floor in both themes.
- No new public token or component-token layer is introduced.
- The encoded Checkbox indicator stroke is an explicit private hardcoded asset
  risk. A future indicator slot or inline SVG anatomy should replace it only
  through a separate reviewed decision.
- ADR 0052's Textarea property list is amended only by the stable native form
  semantics above. Its Input composition, value-content mapping, no-icon rule,
  and multi-line ownership boundary remain unchanged.
