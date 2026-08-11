# Textarea Neutral Web Refinement Audit

Status: Ready for human review; not promoted to `stable`

Date: 2026-07-13

## Scope

This audit reviews Textarea as a native multi-line field composed from canonical
Input. It retains ADRs 0052–0055, amended by ADR 0092 for stable native form
semantics. It does not infer fixed/no-resize, auto-grow, counters, rich text,
alternate sizes, icon slots, or persistence behavior.

## Reconciliation

- Contract advanced to `0.5.0`: 5 anatomy parts, 4 variants, 1 size, 8 states,
  8 behaviors, 15 semantic properties, and 43 public token references.
- Added direct `name`, `required`, `readOnly`, `autocomplete`, `minLength`, and
  `maxLength` mappings to the native textarea.
- Static HTML child text and framework-controlled live value/event ownership are
  explicit; no hidden value owner is introduced.
- Character constraints are distinct from `minLines`/`maxLines` resize bounds.
- Native Vertical, Horizontal, and Both resize modes remain; no `none` mode is
  inferred against the accepted resize decision.
- Logical width/minimum containment is explicit. Input supplies long-content,
  semantic contrast, reduced-motion, and forced-colors behavior.
- Persistent error examples no longer use alert semantics at page load.

## Browser Evidence

- Default fixture remains `326px` wide at the mobile stage, `120px` minimum
  height, native vertical resize, and zero document overflow.
- A 3–8 line direct probe resolved to `94px` minimum and `214px` maximum from
  computed `24px` leading, `10px` vertical padding, and `1px` borders.
- Invalid maximum below the effective minimum is clamped by the enhancer/Studio
  policy; no-JS fallback remains four lines and unbounded maximum.
- Static value `initial note` became live `changed note`; form reset restored
  initial content and FormData without a mirror control.
- `280px` RTL extreme fixture stayed exactly `280px` wide with long multi-line
  content and zero host/page overflow.
- Inherited semantic contrast: light boundary minimum `3.83:1`, text minimum
  `5.34:1`; dark boundary minimum `8.63:1`, text minimum `10.03:1`.
- Reduced-motion field transition resolves to `0s`; forced-colors focus resolves
  to a `4px` system outline.
- 8 canonical Exhibit/Studio screenshots cover all four rubric viewports;
  before, RTL extreme, and forced-colors/reduced-motion images supplement them.
- Exhibit/Studio stage markup is normalized-identical at 492 characters; only
  React's generated label/message id changes across remounts.
- Browser console: 0 errors, 0 warnings.

## Token, CSS, Runtime, And Content Audit

- Textarea introduces no public presentation token; its 43 references reuse the
  canonical Input field hierarchy.
- Private values are the `120px` fallback and calculated min/max height variables.
  Resize direction is semantic API, not a token.
- Enhancer performs bounded reads/writes on initial scan, relevant mutations,
  font readiness, and coalesced viewport resize. It adds no per-field listener,
  polling, request, formatter, or continuous animation.
- Shared runtime is `5,180 B` gzip against `8 KiB`; primitives CSS is `10,274 B`
  against `10.3 KiB`; neutral component CSS is `57,520 B` against `64 KiB`.
- Empty, short, long, localized RTL, read-only, disabled, required, constrained,
  horizontal/both resize, and all validation paths are documented or probed.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native textarea, Input classes, direct attributes, resize data, progressive line-bound variables. | Implemented and browser-evidenced. |
| Shopify | Native Liquid textarea plus shared classes/enhancer. | Generated adapter validates; editor/theme visual review remains. |
| React / Angular | Initial/default content or controlled live value/events; native element remains owner. | Strategy documented; adapter not implemented/certified. |
| Figma | Label, textarea, message, shared variants, resize modes, and line-bound presentation. | Metadata works; registered frame is not Textarea-specific owner evidence. |
| SwiftUI / Compose | Native multi-line editor with platform constraints and nearest supported sizing/resize policy. | Conceptual mapping only. |

## Remaining Risks And Human Questions

1. Approve `120px`/four-line default, resize handle, padding, typography,
   semantic mixes, and feedback hierarchy.
2. Approve repository render or provide a Textarea-specific owner reference.
3. Horizontal/Both resizing intentionally requires a layout that can absorb
   inline growth; silently clamping it would contradict the selected mode.
4. Auto-grow, fixed resize, counters, alternate sizes/heights, and rich text
   remain separate product/architecture decisions.

## Validation

- Contracts, Studio, docs, public token compatibility, Neutral Web adapter, and
  Shopify adapter pass.
- Structural audit, parity, static previews, full temporary build, performance,
  and the global matrix are rerun in Batch 07.

## Readiness Decision

Ready for human review. Contract remains `pilot`; only explicit owner approval
may promote it to `stable`.
