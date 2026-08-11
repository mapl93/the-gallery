# Input Neutral Web Refinement Audit

Status: Ready for human review; not promoted to `stable`

Date: 2026-07-13

## Scope

This audit reviews Input against the permanent refinement rubric, accepted field
ADRs, native HTML semantics, Neutral Web, Shopify translation, and shared
Exhibit/Studio rendering. It does not infer alternate sizes, interactive icon
slots, broader native input types, masking, counters, or formatting behavior.

## Reconciliation

- Contract advanced to `0.7.0`: 7 anatomy parts, 4 variants, 1 size, 8 states,
  7 behavior rules, 14 semantic properties, and 50 public token references.
- Added direct native mappings for `name`, `required`, `readOnly`,
  `autocomplete`, `minLength`, and `maxLength`.
- Static HTML value/default behavior and framework-controlled live
  property/event behavior are explicit; the native field remains the only owner.
- Input remains `type="text"`; specialized field types stay separate.
- Physical icon offsets/padding became logical inline geometry.
- Root, label, message, control, and field now resist unbroken localized content.
- Error, Success, and Warning boundaries/passive icons use a private `70%`
  semantic-token/primary-text mix; accepted label/message `55%` mixes remain.
- Disabled fields no longer receive hover treatment. Field transitions stop
  under reduced motion; forced colors uses system focus/icon colors.
- Persistent error examples no longer declare alert semantics at page load.

## Browser Evidence

- Default field: `46px` high, `16/24px` value type, `12px` inline icon inset,
  `40px` padding with both icons, and zero horizontal page overflow.
- Default boundary contrast, remeasured in Batch 08: `3.07:1` light and `5.19:1`
  dark after the shared private `60%` neutral-boundary/text correction.
- Semantic contrast, light: Error `6.18:1`, Success `4.43:1`, Warning `3.83:1`
  for boundaries/icons; label/message `8.05:1`, `6.05:1`, `5.34:1`.
- Semantic contrast, dark: boundaries/icons `8.63:1`–`12.26:1`; label/message
  `10.03:1`–`13.15:1`.
- Static form probe: `value="seed"` became live `changed`, then form reset
  restored `seed`; required empty value failed native validity; read-only was
  focusable/submittable and barred from constraint validation.
- `280px` RTL extreme fixture kept field, unbroken label/message, and both icons
  inside the container with document/host overflow `0px`.
- Reduced-motion transition duration resolved to `0s`; forced-colors focus was a
  `4px` system outline and passive icon resolved to `CanvasText`.
- 8 canonical screenshots cover Exhibit/Studio at `390x844`, `768x1024`,
  `1280x800`, and `1600x1000`; before, RTL extreme, and special-media evidence
  are stored with the batch.
- Exhibit/Studio stage markup is normalized-identical at 474 characters; only
  React's generated association id changes across remounts.
- Browser console: 0 errors, 0 warnings; React development information only.

## Token, CSS, Runtime, And Content Audit

- No new public token or component-token layer. All 50 references are existing
  field/text/spacing/type/radius/motion/opacity semantics.
- Private literals/formulas: `4px` root gap, weight `500`, `4px` focus outline,
  logical positioning, wrapping, and documented default/semantic contrast mixes.
- No Input-specific JS, listener, observer, timer, request, formatter, asset, or
  layout loop. Native HTML owns behavior.
- Current full primitives family: `10,378 B` gzip against `10.3 KiB`; shared
  runtime: `5,263 B` against `8 KiB`; neutral components CSS: `57,952 B`
  against `64 KiB`.
- Short, empty, long, unbroken, localized RTL, read-only, disabled, required,
  constrained, and validation content paths are represented by docs, Studio, or
  direct probes.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native text input, direct form attributes, canonical classes, native events/reset. | Implemented and browser-evidenced. |
| Shopify | Native Liquid input can use the same form attributes/classes. | Generated adapter validates; theme-specific human review remains. |
| React / Angular | Initial/default value for uncontrolled use or live value plus native events for controlled use. | Strategy documented; adapter not yet implemented/certified. |
| Figma | Label, field, message, icons, one size, four variants, interaction visuals. | Metadata is functional; registered frame is not Input-specific owner evidence. |
| SwiftUI / Compose | Native one-line text field, content/autofill hints, constraints, validation, read-only/disabled policies. | Conceptual mapping only. |

## Remaining Risks And Human Questions

1. Approve the `46px` density, surface, border/ring hierarchy, semantic mixes,
   icon inset/gap, and label/message typography.
2. Approve the repository render as visual reference or provide Input-specific
   owner evidence; the registered calibration frame cannot count as approval.
3. Required status is author-visible content, not an automatic marker. A future
   generated indicator would change anatomy and needs explicit visual review.
4. Alternate sizes, interactive adornments, counters, and broader input types
   remain intentionally outside this primitive.

## Validation

- Contracts, Studio, registry/docs, public tokens, Neutral Web adapter, and
  Shopify adapter pass.
- Structural certification, Exhibit/Studio parity, static preview audit, full
  temporary docs build, performance measurement, and the global refinement
  matrix are rerun in Batch 07.

## Readiness Decision

Ready for human review. Contract remains `pilot`; only explicit owner approval
may promote it to `stable`.
