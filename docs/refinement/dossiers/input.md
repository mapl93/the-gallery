# Component Dossier: Input

Status: `human-review-ready`

Target reviewed: Neutral Web native single-line text input

Contract: `components/contracts/input.contract.json`

## Recommendation

Keep one native `input[type="text"]` as the sole value, focus, validation, and
form owner. Expose stable form semantics, visible labeling, associated feedback,
four validation variants, and passive icon slots. Keep specialized field types,
interactive adornments, alternate densities, counters, masking, and formatting
in their own components rather than turning Input into a universal field.

## Purpose And Limits

- Collects short, single-line plain text with a visible label and optional help
  or validation feedback.
- Supports Default, Error, Success, and Warning plus independent passive leading
  and trailing icons.
- It is not Password Input, Number Input, Select, Combobox, Tags Input, search
  behavior, masked formatting, prefix/suffix editing, or a rich-text editor.
- Consumer content owns meaningful labels, required instructions, messages,
  validation timing, and locale-specific constraints.

## Current Gallery Result

- Registry `A2`, primitive, no dependencies; contract `0.7.0`, still `pilot`.
- Seven anatomy parts, four variants, one size, eight states, seven behavior
  rules, fourteen properties, and fifty public token references.
- Native `name`, `required`, `readOnly`, `autocomplete`, `minLength`, and
  `maxLength` now map to the sole input owner.
- Static HTML value is initial/default state; the browser owns subsequent edits
  and reset. Framework adapters may bind the live property and native events.
- Field height remains `46px` with `16/24px` value type and accepted spacing.
- Icon insets and padding are logical: an RTL probe placed leading/trailing icons
  `12px` from logical start/end and kept both field paddings at `40px`.
- Long unbroken RTL label/message content stayed inside a `280px` container with
  no page or host overflow.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML Input standard](https://html.spec.whatwg.org/multipage/input.html) | Native input owns live/default value, dirty state, reset, autofill, readonly, required, length constraints, and native events. | Keep one native owner and distinguish initial static markup from controlled adapter binding. |
| [WAI form labels](https://www.w3.org/WAI/tutorials/forms/labels/) | Visible `label` association improves naming and activation; placeholder is not a label. | Keep label required and explicitly associated. |
| [WAI form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | Associated text and live regions serve different timing needs. | Use `aria-describedby` for persistent text and alert/live semantics only for dynamically introduced feedback. |
| [Open UI text-input research](https://open-ui.org/components/inputtext.research/) | Mature systems converge on label, hint, validation, required, readonly, disabled, autocomplete, and size concepts. | Expose stable native semantics while retaining one reviewed Gallery size. |
| [Radix Themes Text Field](https://www.radix-ui.com/themes/docs/components/text-field) | Radix offers sizes and slots that may include buttons. | Keep Radix as composition evidence; Gallery icon slots stay passive and interactive actions use specialized components. |
| [Shopify Text Field](https://shopify.dev/docs/api/app-home/web-components/forms/text-field) | Polaris separates specialized field types and exposes value/default value, autofill, readonly, required, length constraints, and feedback. | Keep type text narrow, expose stable form attributes, and document controlled/uncontrolled translation. |

## Anatomy, States, API, And Ownership

- Required root, label, and native field; optional control wrapper, message,
  leading icon, and trailing icon.
- Default, hover, focus-visible, disabled, read-only, and three validation-focus
  states; variant hover remains inside the active semantic color family.
- Public properties: `label`, `value`, `name`, `required`, `readOnly`,
  `autocomplete`, `minLength`, `maxLength`, `placeholder`, `message`, `variant`,
  `disabled`, `leadingIcon`, and `trailingIcon`.
- `required` is semantic, not a generated visible marker. The author must include
  required status in the label or associated instructions.
- Static Web is uncontrolled after initial value. React/Angular-style adapters
  may control live value with native `input`/`change`; no hidden mirror is used.

## Tokens, Runtime, And Content

- Public tokens cover the accepted field color hierarchy, body family,
  label/value/message type pairs, padding, icon geometry, radius, transition,
  easing, and disabled opacity.
- Four-pixel focus, four-pixel label/message gap, font weight, logical icon
  positioning, `60%` default and `70%` semantic boundary/icon mixes, and
  wrapping rules stay private.
- No Input-specific JavaScript, listener, observer, timer, request, or asset.
  Base behavior is native; Studio state exists only as fixture/inspector state.
- Reduced motion resolves field transitions to `0s`; forced colors uses system
  focus and icon colors.

## Findings And Direction

| Finding | Severity | Direction |
| --- | --- | --- |
| Stable native form attributes were absent from the contract. | resolved | Added direct mappings without framework-specific API. |
| Controlled versus uncontrolled ownership was ambiguous. | resolved | Initial HTML value and live adapter property/event strategies are explicit. |
| Physical icon inset/padding failed RTL. | resolved | Logical inline positioning and padding. |
| Long labels/messages could expand intrinsic width. | resolved | Bounded root/parts and anywhere wrapping. |
| Default unfocused boundary was only `1.26:1` light and `1.73:1` dark. | resolved | Private `60%` neutral-boundary/text mix; result is `3.07:1` and `5.19:1`. |
| Raw Success/Warning border and icon colors were below `3:1` in light theme. | resolved | Private `70%` semantic/primary-text mix; worst result is `3.83:1`. |
| Field transition ignored reduced motion. | resolved | Transition becomes `none`; forced-colors focus uses system color. |
| Registered Studio reference reuses the calibration frame rather than Input-specific owner evidence. | human input | Approve repository render or provide a component-specific reference. |
| Alternate density and broader native input types are unreviewed. | explicit boundary | Keep one size and `type=text`; certify specialized components independently. |

## Cross-Target Translation

Web and Shopify render the same native input/form attributes and canonical
classes. React/Angular bind either initial/default value or live value plus native
events. Figma maps label, field, feedback, icons, one size, and visual states but
does not model form submission. SwiftUI/Compose map to their native single-line
text-field controls, content type/autofill hints, read-only/disabled policies,
constraints, and validation feedback.

## Readiness Decision

Ready for human review; remains `pilot`. Native form ownership, controlled and
uncontrolled translation, labeling, feedback timing, four variants, contrast,
logical RTL, extreme content, reduced motion, forced colors, four viewports,
shared Exhibit/Studio rendering, and Web/Shopify adapters pass. Human review
must approve density, semantic color mixes, icon placement, field surface,
feedback hierarchy, and whether the repository render is the visual reference
before any `stable` promotion.
