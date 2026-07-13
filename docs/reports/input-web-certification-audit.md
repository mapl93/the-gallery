# Input Web Certification Audit

Date: 2026-07-12

Target: Neutral web

Contract: `components/contracts/input.contract.json`

## Current Result

Input remains `pilot` pending the owner's final visual approval. Its automated
structural gate passes and the implementation, Studio, accessibility, responsive,
and adapter review is complete.

## Confirmed Facts

- Registry, contract, CSS source, docs source, and web adapter identity agree.
- The accepted anatomy is root, visible label, optional control wrapper, native
  field, optional message, and independent passive leading and trailing icons.
- The accepted variants are default, error, success, and warning.
- The accepted size model is default only.
- The CSS implements default, hover, focus-visible, disabled, Error, Success,
  Warning, and focused treatment for every validation variant.
- The contract declares 49 public tokens, and all are defined by the neutral-web
  target and consumed by canonical CSS.
- Input has no DTCG component-scoped token file. Its public compatibility aliases
  currently resolve from shared semantic typography, dimension, color, radius,
  opacity, and motion tokens. Component-scoped tokens are optional by policy.

## Reconciled Without Product Decisions

- Canonical and secondary MDX examples now associate labels and fields through
  matching `for` and `id` attributes.
- Error examples use `aria-invalid`, `aria-describedby`, and an identified error
  message.
- Preview-only inline width styles were replaced with the existing preview frame
  utility.
- The MDX Presentation section now records the four accepted variants and the
  default-only size model.
- The historical component guide records the accepted fourth Warning variant and
  no longer references the unimplemented `.input__wrapper` class.
- Contract behavior now records label association, message association, error
  semantics, and native disabled behavior.

## Resolved Product Decisions

### Field Density

The owner approved `10px` block padding. Input now renders at `46px` high from
`16px / 24px` value text, `10px` block padding, and two `1px` borders. Label and
message line heights now use explicit semantic typography aliases.

### Icon Composition

The owner approved independent passive leading and trailing slots. Canonical CSS
positions both inside `.input__control`, reserves symmetric field padding, and
allows both slots to coexist. Interactive actions remain owned by specialized
components.

### Semantic String Mappings

ADR 0041 adds the backward-compatible `"valueFrom": "property"` attribute mapping
for string properties. Input now owns `label`, `value`, `placeholder`, `message`,
`variant`, `disabled`, `leadingIcon`, and `trailingIcon` as semantic properties.

### Public Typography Naming

Input now exposes six `--typo-input-*` size and line-height aliases in its reviewed
public contract. The three old `--space-input-*-size` aliases remain generated for
compatibility but are no longer declared by the Input contract.

## Final Evidence

- Automated gate: pass; no structural failures or web manifest drift.
- Contract: 7 anatomy parts, 4 variants, 1 size, 7 states, 5 behavior rules,
  8 semantic properties, and 49 public tokens.
- Studio: 4 groups, 25 controls, all 8 properties bound, 18 token controls, and a
  renderer that consumes canonical Input CSS.
- Desktop: `46px` field height, `16px / 24px` value type, `10px 12px` padding,
  `8px` radius, and no document or workspace overflow.
- Icon composition: both slots render together with `40px` inline padding and
  decorative semantics.
- Validation symmetry: Error, Success, and Warning style label, inner border,
  message, icon, and focused outer ring from their corresponding feedback
  palettes.
- Hover preservation: every validation variant keeps its semantic inner border
  during pointer hover; only Default uses the neutral hover border.
- Focus hierarchy: Default, Error, Success, and Warning use a strong inner border
  with a subtler outer ring from the same color family; every field ring resolves
  to a `4px` outline with `0px` offset.
- Warning resolves to `#f59e0b` in light and `#fbbf24` in dark. Its light focused
  outer ring resolves to `#fef3c7`.
- Accessibility: label activation focuses the field; Error uses `aria-invalid`,
  `aria-describedby`, and alert semantics; Warning keeps `aria-describedby` but
  does not use invalid or alert semantics; disabled is native and removes focus.
- Token editing changes the rendered field and Reset restores canonical values.
- Mobile at `390 x 844`: no document or workspace overflow; stage width is
  `358px` and inspector width is `344px`.
- The only browser console error is the pre-existing missing `/favicon.ico`; no
  Input or React runtime error was observed.

## Validation

- `npm run build:tokens:web`
- `npm run build:tokens:shopify`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run audit:components`
- `npm run audit:previews:static`
- `npm --prefix site run build -- --outDir /tmp/the-gallery-input-certification`
