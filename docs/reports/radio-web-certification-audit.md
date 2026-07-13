# Radio Neutral Web Certification Audit

Status: Pending owner review

Date: 2026-07-12

## Scope

This audit reviews Radio against the neutral-web gates in
`docs/COMPONENT-CERTIFICATION.md`. It reconciles native named-group behavior,
validation presentation, Studio controls, canonical Exhibit composition, and
adapter output. It does not infer alternate sizes or a non-native radio widget.

## Reconciliation

- Radio remains a native `input[type="radio"]` inside a wrapping label.
- The semantic API covers label, name, value, variant, checked, disabled,
  required, and describedBy.
- Default, Error, Success, and Warning are independent from checked state.
- Validation color covers border, selected dot, label, hover, and the matching
  lighter focused outer ring.
- Focus uses a `4px` ring with a `0px` offset.
- Fieldset and Legend own group naming. Radio owns native input ARIA and Field
  Wrapper owns feedback content.
- Control size and gap reuse the existing Input icon spacing tokens.
- Reduced-motion removes transitions and forced-colors restores native radio
  appearance.

## Final Evidence

- Automated gate: pass; no structural failures or web-manifest drift.
- Contract: 4 anatomy parts, 4 variants, 1 size, 8 states, 6 behavior rules,
  8 semantic properties, and 22 public tokens.
- Studio: 5 groups, 19 controls, all 8 semantic properties represented,
  11 token controls, and all 22 public tokens referenced.
- The Studio control measures `20px x 20px` and submits `name="options"` with
  `value="option-1"`.
- Exhibit presents three generic options with a `16px` vertical gap and no
  visible group container. Its visually hidden Legend preserves the accessible
  group name.
- Selecting Option 2 or Option 3 in Exhibit clears Option 1 through native
  same-name mutual exclusion.
- Warning focus resolves border and selected dot to `rgb(245, 158, 11)`, label
  to the same family, and outer ring to `rgb(254, 243, 199) solid 4px` with a
  `0px` offset. Warning does not set `aria-invalid`.
- At the reviewed mobile viewport, Studio has no horizontal document overflow;
  the stage is `343px` wide and the Radio preview is constrained to `311px`.
- Exhibit renders one canonical grouped artwork and keeps secondary validation
  previews in MDX.

## Owner Review Required

Radio remains `pilot` pending visual approval and confirmation that one default
size and the native selected indicator are sufficient for this cycle.

## Validation

- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run audit:components`
- `npm run audit:previews:static`
- `npm --prefix site run build -- --outDir /tmp/the-gallery-radio-badge-tag`
- `git diff --check`
