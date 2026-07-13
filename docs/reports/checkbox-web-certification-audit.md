# Checkbox Neutral Web Certification Audit

Status: Pending owner review

Date: 2026-07-12

## Scope

This audit reviews Checkbox against the neutral-web gates in
`docs/COMPONENT-CERTIFICATION.md`. It reconciles native form behavior, the
accepted field validation hierarchy, mixed state, Studio presentation, and
Field Wrapper feedback ownership. It does not promote the contract
automatically and does not infer alternate sizes, custom indicator slots, or a
tri-state submitted value.

## Reconciliation

- Checkbox remains a native `input[type="checkbox"]` inside a wrapping label.
- The semantic API now covers label, name, value, variant, checked,
  indeterminate, disabled, required, and describedBy.
- Default, Error, Success, and Warning are independent from unchecked, checked,
  and indeterminate selection states.
- Validation color covers the control border, selected fill, label, hover, and
  focused outer ring. Hover preserves the active validation family.
- Focus uses the accepted lighter `4px` ring with a `0px` offset.
- Checked uses embedded Lucide Check geometry. Indeterminate uses embedded
  Lucide Minus geometry and is initialized as the native mixed property by the
  shared progressive enhancer.
- Disabled and required preserve native activation, focus, form, and constraint
  validation behavior.
- Checkbox owns visual validation and ARIA on its native control. Field Wrapper
  owns associated message content and now exposes symmetrical Error, Success,
  and Warning feedback classes.
- Size and gap use the existing Input icon spacing tokens; no component-token
  layer or alternate size was introduced.
- Reduced-motion removes the transition and forced-colors restores native
  checkbox appearance.

## Final Evidence

- Automated gate: pass; no structural failures or web manifest drift.
- Contract: 5 anatomy parts, 4 variants, 1 size, 9 states, 7 behavior rules,
  9 semantic properties, and 22 public tokens.
- Studio: 5 groups, 20 controls, all 9 semantic properties represented,
  11 token controls, and all 22 public tokens referenced.
- Default control measures `20px x 20px`, with an `8px` label gap and
  `16px / 20px` label typography.
- Studio renders a real native checkbox with `name="terms"` and
  `value="accepted"`.
- Activating the visible label toggles the native control. Space toggles it when
  focused.
- Checked resolves its selected surface through
  `--color-button-primary-bg-default` (`rgb(64, 64, 64)` in the reviewed light
  mode) and displays the Check indicator.
- Indeterminate sets the native property, retains `data-indeterminate="true"`
  as its initialization marker, and displays the Minus indicator. The next user
  change clears both mixed state and marker.
- Error hover keeps control border, selected fill, and label at
  `rgb(239, 68, 68)`. Error alone exposes `aria-invalid="true"`; its focus ring
  is `rgb(254, 226, 226) solid 4px` with a `0px` offset.
- Success hover keeps border and label at `rgb(16, 185, 129)`, with no invalid
  semantics. Its focus ring is `rgb(209, 250, 229) solid 4px` with a `0px`
  offset.
- Warning hover keeps border and label at `rgb(245, 158, 11)`, with no invalid
  semantics. Its focus ring is `rgb(254, 243, 199) solid 4px` with a `0px`
  offset.
- Disabled sets the native property, `not-allowed` cursor, and tokenized `0.5`
  wrapper opacity.
- Required unchecked returns `checkValidity() === false` with
  `validity.valueMissing === true`.
- A checked form fixture submits `terms=accepted`; form reset restores the
  unchecked default.
- The exported enhancer converts `data-indeterminate="true"` into the native
  mixed property inside the isolated Exhibit preview.
- Dark mode resolves the default surface to `rgb(23, 23, 23)`, border to
  `rgb(64, 64, 64)`, and label to `rgb(250, 250, 250)`.
- At `390 x 844`, Studio constrains the root to `326px`, wraps label content
  without clipping, and produces no horizontal document overflow.
- Exhibit renders one artwork and one preview, retains one native label
  association, and preserves `name="terms"` and `value="accepted"`.
- The browser pass reports no Checkbox or React runtime errors. The initial page
  load issued the pre-existing missing `/favicon.ico` request; the final console
  read was clean.

## Owner Review Required

Checkbox now exposes the expected native and validation states with one default
size. Promotion to `stable` requires final visual approval and confirmation that
alternate sizes, custom indicator slots, and component-owned feedback remain
outside this cycle.

## Validation

- `node --check components/js/theme.js`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run audit:components`
- `npm run audit:previews:static`
- `npm --prefix site run build -- --outDir /tmp/the-gallery-checkbox-certification`
- `git diff --check`
