# Textarea Neutral Web Certification Audit

Status: Pending owner review

Date: 2026-07-12

## Scope

This audit reviews Textarea against the neutral-web gates in
`docs/COMPONENT-CERTIFICATION.md`. It reconciles the component with the accepted
field decisions in ADRs 0043 through 0046 and 0049 through 0055. It does not
promote the contract automatically and does not infer alternate heights,
auto-grow, disabled resizing, icon slots, or additional sizes.

## Reconciliation

- Textarea explicitly composes the canonical Input root, label, field, message,
  validation variants, and field-state hierarchy.
- The native field combines `.input__field` and `.textarea__field`.
- `.textarea__field` preserves the existing `120px` minimum height and exposes
  Vertical, Horizontal, and Both resize directions without introducing a new
  public token.
- Numeric `minLines` and `maxLines` properties progressively map line counts to
  private minimum and maximum heights using computed field typography.
- Default, Error, Success, and Warning are represented in the contract, docs,
  Studio, and browser evidence.
- Error alone uses `aria-invalid="true"` and alert semantics. Success and Warning
  keep their message association without exposing invalid state.
- Hover preserves the active validation family and keeps the shipped field
  surface white.
- Focus uses the accepted lighter semantic outer ring at `4px` with a `0px`
  offset.
- The native textarea owns value entry, keyboard selection, disabled behavior,
  and resizing. Its value maps to element content rather than a `value`
  attribute, and its resize direction maps through `data-resize`.
- Studio reuses Input renderer infrastructure while rendering a real textarea
  and omitting Input icon controls.
- Exhibit uses one canonical accessible artwork and retains secondary examples
  in MDX as curatorial source material.

## Final Evidence

- Automated gate: pass; no structural failures or adapter manifest drift.
- Contract: 5 anatomy parts, 4 variants, 1 size, 7 states, 6 behavior rules,
  9 semantic properties, and 43 public tokens.
- Studio: 4 groups, 24 controls, all 9 semantic properties represented,
  15 token controls, and 34 referenced public tokens.
- Studio renders a native `TEXTAREA` at a `420px` desktop width, `120px`
  minimum height, and `16px / 24px` value typography. Its segmented Layout
  control switches computed resize between `vertical`, `horizontal`, and `both`.
- Vertical computes to `resize: vertical` and omits `data-resize`. Horizontal
  computes to `resize: horizontal` with `data-resize="horizontal"`; Both computes
  to `resize: both` with `data-resize="both"`. All three preserve the `120px`
  minimum height.
- Default line bounds resolve to a `120px` minimum and no maximum without
  emitting line-bound attributes or private overrides.
- `minLines=3` produces `data-min-lines="3"` and a `94px` minimum at the default
  `24px` line height. Adding `maxLines=8` produces `data-max-lines="8"` and a
  `214px` maximum.
- Raising `minLines` to `10` while Max is `8` normalizes both inspector and
  output to `10`, with matching `262px` minimum and maximum heights. Clearing
  Max removes its attribute and restores `max-height: none`.
- Number controls clamp `0` to their declared minimum of `1` and align `2.5` to
  the declared whole-line step as `3`.
- Changing the Studio value line-height token from `24px` to `30px` recomputes
  the 3/8 line bounds from `94px / 214px` to `112px / 262px`.
- Invalid raw zero-valued line attributes fall back to the established `120px`
  minimum and unbounded maximum without leaving private CSS overrides.
- The label `for` value matches the textarea `id`; activating the label focuses
  the field.
- Multi-line editing preserves two entered lines as native textarea content.
- Error hover keeps `rgb(239, 68, 68)` on label, border, and message. Its focus
  ring resolves to `rgb(254, 226, 226) solid 4px` with a `0px` offset, and the
  field exposes `aria-invalid="true"` with an alert message.
- Success hover keeps `rgb(16, 185, 129)` on label, border, and message. Its
  focus ring resolves to `rgb(209, 250, 229) solid 4px` with a `0px` offset;
  neither invalid nor alert semantics are present.
- Warning hover keeps `rgb(245, 158, 11)` on label, border, and message. Its
  focus ring resolves to `rgb(254, 243, 199) solid 4px` with a `0px` offset;
  neither invalid nor alert semantics are present.
- All reviewed hover variants keep the field surface at `rgb(255, 255, 255)`.
- At `390 x 844`, Studio constrains the textarea to `326px` and produces no
  horizontal document overflow, including while Both is selected.
- Exhibit renders one artwork and one preview, preserves the native label
  association, and produces no horizontal overflow on mobile.
- Desktop Exhibit and Studio visually preserve the accepted gallery layout and
  keep the component within its preview region.
- The final browser pass reports no Textarea or React runtime errors. The only
  console error is the pre-existing missing `/favicon.ico` request.

## Owner Review Required

Textarea now exposes the required field validation variants, one default size,
the accepted Vertical, Horizontal, and Both resize directions, and configurable
minimum and maximum line bounds while preserving native multi-line behavior.
Promotion to `stable` requires final visual approval; auto-grow, disabled
resizing, and icon adornments remain outside this cycle.

## Validation

- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run audit:components`
- `npm run audit:previews:static`
- `npm --prefix site run build -- --outDir /tmp/the-gallery-textarea-certification`
- `git diff --check`
