# Component Dossier: Textarea

Status: `human-review-ready`

Target reviewed: Neutral Web native multi-line textarea

Contract: `components/contracts/textarea.contract.json`

## Recommendation

Continue composing canonical Input anatomy and field-state behavior around a
real `textarea`. Expose native form semantics, three useful resize directions,
and semantic minimum/maximum visible-line bounds. Preserve native text editing
and resize behavior; keep icons, fixed/no-resize, auto-grow, counters, rich text,
and target-specific persistence outside this component.

## Purpose And Limits

- Collects longer plain-text content that may span multiple lines.
- Supports the shared field variants, feedback, focus, hover, disabled, and
  read-only behavior plus Vertical, Horizontal, and Both resize modes.
- It is not rich text, code editing, tokenized content, auto-grow, markdown
  preview, character counter, or a fixed-height editor.
- Targets own validation timing, persistence, server limits, draft saving, and
  whether the surrounding layout safely accommodates horizontal resizing.

## Current Gallery Result

- Registry `A4`, depends on Input; contract `0.5.0`, still `pilot`.
- Five anatomy parts, four variants, one size, eight states, eight behaviors,
  fifteen properties, and forty-three public token references.
- `name`, `required`, `readOnly`, `autocomplete`, `minLength`, and `maxLength`
  map directly to the native textarea. Value remains element content in static
  HTML and the live property in controlled adapters.
- The shared enhancer converted 3–8 lines into `94px`–`214px` from computed
  `24px` leading, padding, and borders; values below the minimum clamp safely.
- Without enhancement, four lines remain the `120px` progressive fallback.
- A `280px` RTL/long-content probe stayed exactly `280px` wide with zero page
  overflow; logical field behavior comes from canonical Input composition.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML Textarea standard](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element) | Textarea owns raw/API/submitted value, native input events, rows, length constraints, required, readonly, wrapping, and reset. | Preserve one native textarea and distinguish initial child text from live value. |
| [WAI form labels](https://www.w3.org/WAI/tutorials/forms/labels/) | Persistent visible labels and native association are the robust naming technique. | Reuse canonical Input label association; placeholder remains only a hint. |
| [WAI form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | Persistent descriptions and dynamic announcements have different semantics. | Keep associated feedback; reserve alert/live behavior for dynamic updates. |
| [Open UI text-input research](https://open-ui.org/components/inputtext.research/) | Multi-line, hint, validation, required, readonly, disabled, and autocomplete recur across systems. | Treat Textarea as the multi-line native member of the same field family. |
| [Radix Themes Text Area](https://www.radix-ui.com/themes/docs/components/text-area) | Radix exposes size, surface, color, radius, and four resize choices including none. | Retain resize-direction evidence but do not infer extra sizes/surfaces or remove native resizing against accepted Gallery decisions. |
| [Shopify Text Area](https://shopify.dev/docs/api/admin-extensions/latest/web-components/forms/text-area) | Polaris exposes value/default value, rows, length constraints, autofill, readonly, required, label, details, and error. | Map stable native semantics while keeping Gallery line-bound and validation composition distinct. |

## Anatomy, States, API, And Ownership

- Required Input root/label/field-base plus required textarea field; message is
  optional. Textarea intentionally has no icon slots.
- Default, hover, focus-visible, disabled, read-only, and three semantic-focus
  states are inherited from Input.
- Public properties: `label`, `value`, `name`, `required`, `readOnly`,
  `autocomplete`, `minLength`, `maxLength`, `placeholder`, `message`, `variant`,
  `resize`, `minLines`, `maxLines`, and `disabled`.
- Character limits constrain content; line bounds constrain resize geometry.
- Static Web is uncontrolled after initial text content. Framework adapters may
  bind the live value and native events without a second value owner.

## Tokens, Runtime, And Content

- All public presentation tokens come from Input: field color hierarchy,
  spacing, body family, label/value/message type pairs, radius, transition,
  easing, and disabled opacity.
- `120px` fallback, derived pixel line bounds, private CSS variables, and native
  resize handle remain internal. No Textarea-specific public token was added.
- Runtime reuses shared `theme.js`: per field it reads computed vertical metrics
  and writes at most two private variables on initialization, relevant mutation,
  font readiness, or coalesced viewport resize. No polling or continuous loop.
- Reduced motion and forced colors are inherited from Input.

## Findings And Direction

| Finding | Severity | Direction |
| --- | --- | --- |
| Stable native form semantics were absent from the accepted surface. | resolved | ADR 0092 narrowly amends it with direct native mappings. |
| Controlled versus uncontrolled value ownership was ambiguous. | resolved | Initial child text and live property/event strategies are explicit. |
| Shared field semantic boundaries could miss `3:1`. | resolved | Inherited `70%` semantic/primary-text boundary mix. |
| Long content and logical direction lacked direct evidence. | resolved | `280px` RTL probe with zero overflow. |
| Reduced motion and forced-colors behavior was implicit. | resolved | Inherited zero-duration transition and system focus/icon colors. |
| Horizontal/Both resize can exceed a tightly constrained consumer layout. | accepted responsibility | Docs require a surrounding layout that safely accommodates inline resizing. |
| No component-specific owner reference is registered. | human input | Approve repository render or provide Textarea-specific visual evidence. |
| Fixed resize, auto-grow, counters, and alternate heights/sizes are unreviewed. | explicit boundary | Keep them out until separately accepted. |

## Cross-Target Translation

Web and Shopify render a native textarea with Input/textarea classes, direct form
attributes, data resize/line bounds, and shared enhancement. React/Angular bind
either initial/default content or live value/events. Figma maps label, field,
feedback, shared variants, resize modes, and line-bound visuals without runtime
claims. SwiftUI/Compose use native multi-line editors, platform focus/validation,
content constraints, and the nearest supported resize/height policy.

## Readiness Decision

Ready for human review; remains `pilot`. Native multi-line ownership, Input
composition, stable form semantics, three resize directions, line bounds,
contrast, RTL/extreme content, reduced motion, forced colors, four viewports,
shared Exhibit/Studio rendering, and adapters pass. Human review must approve
the default height, resize affordance, semantic color mixes, label/message
spacing, and visual reference before any `stable` promotion.
