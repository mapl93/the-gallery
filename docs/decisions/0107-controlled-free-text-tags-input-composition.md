# 0107. Controlled Free-Text Tags Input Composition

Status: Accepted

Date: 2026-07-14

## Context

Tags Input was the first consumer of the reviewed Tag primitive. Its existing
contract declared the dependency but duplicated Tag markup, a 16px remove
button, surface/type rules, and an inline X in the Forms implementation. The
shared fixture committed on Enter, comma and blur, removed the last value on an
empty Backspace, rejected duplicates silently, and exposed dormant Combobox
ARIA relationships despite rendering no suggestion popup.

Accepted ADRs 0058 and 0106 reserve value-label and named removal-request
semantics for canonical Tag, with collection mutation, focus, and announcements
owned by its consumer. Field Wrapper already owns the visible label, guidance,
feedback, and required indicator composition. APG defines Combobox as an input
with an associated popup; it does not define a free-form multi-value field.
Mature systems also separate committed collection state from live draft text.

## Decision

- Tags Input v1 is a labelled free-form multi-value field composed from
  canonical Field Wrapper and Tag. Registry and contract dependencies are
  `field-wrapper` and `tag`.
- `.field.tags-input` contains a visible associated label, one
  `.tags-input__control`, an optional native value list, canonical Tags, one
  native `input type="text"`, optional Field Wrapper guidance/feedback, and one
  pre-mounted visually hidden `role="status"` with `aria-atomic="true"`.
- The native input exclusively owns draft editing and focus. Static HTML may
  leave its string uncontrolled; framework adapters may control `inputValue`.
- The committed collection is controlled by the target. Neutral HTML/CSS and
  `components/js/theme.js` do not create a collection store, item identity,
  duplicate normalizer, persistence layer, network client, or form serializer.
- Enter after IME composition requests one trimmed non-empty value. Successful
  acceptance clears the draft, updates the controlled values, returns focus to
  the field, and updates localized status text. Rejection keeps the draft
  available for correction.
- Each committed value uses canonical `.tag`, `.tag__label`, and an optional
  conditionally named `.tag__remove`. Removal requests one identified value;
  after reconciliation Tags Input returns focus to the draft field and lets the
  target update the status.
- Blur, comma, semicolon, paste, Backspace, and Delete retain native text-editing
  behavior in the base contract. Immediate deletion, delimiter tokenization,
  paste splitting, and commit-on-blur require an explicit target/product policy.
- The v1 free-text field has no popup and therefore no `role="combobox"`,
  `aria-autocomplete`, `aria-expanded`, `aria-controls`, active-option, Listbox,
  or option semantics. A future suggestion mode must compose the complete
  Combobox contract or become a separate constrained multi-select.
- Error, Success, and Warning cover the label, control boundary, current
  feedback, hover family, and focus family. Only Error sets `aria-invalid`.
  Required is a target-validated collection rule communicated with a visible
  marker and `aria-required`; native `required` is not applied to an empty draft
  when committed values may already satisfy the rule.
- Read-only keeps the field focusable/readable and omits all Tag remove actions.
  Disabled uses the native input attribute and disables every rendered remove
  button. Canonical Tag retains its 24px action floor and own focus/forced-color
  behavior.
- `label`, `selectedValues`, `inputValue`, `placeholder`, `description`,
  `feedback`, `variant`, `required`, `disabled`, `readOnly`, and `invalid` are the
  v1 semantic property set. Delimiters, duplicate policy, limits, normalization,
  ordering, colors, spacing, Tag appearance, list layout, status politeness, and
  serialization are not Studio customization API.
- Exhibit and Studio continue to mount the same `AdvancedControlStudio`
  renderer, initial fixture, IDs, component implementation, request policy, and
  status. Its React collection state is site evidence of a target controller,
  not neutral component runtime.
- The contract remains `pilot`; automated evidence and this accepted boundary do
  not promote it to `stable` without explicit human review.

## Performance

No neutral listener, observer, timer, request, measurement loop, framework, or
collection store is added. Deterministic level-9 gzip without file metadata
measures:

- Forms CSS: `9,615 B` against the provisional `6.4 KiB` ceiling, an existing
  documented exception now `3,062 B` over.
- Shared neutral runtime: `10,321 B` against the `8 KiB` ceiling, unchanged and
  covered by the existing documented exception.
- Neutral Web component CSS: `64,392 B` against the `64 KiB` ceiling, leaving
  `1,144 B` headroom.

Relative to the Batch 22 baseline, Forms and the complete Web component bundle
each add `322 B` gzip and neutral runtime adds `0 B`. The CSS delta pays for
canonical composition layout, logical containment, disabled/read-only states,
four validation/focus families, reduced motion, forced colors, and the private
status region; it does not reset either existing exception.

## Consequences

- Neutral Web ships the shared CSS and semantic composition, while consumers
  provide controlled values and request handling. The generated adapter can
  describe Tags Input as implemented without implying an autonomous widget.
- Shopify retains canonical copied CSS but stays planned until a concrete
  product, metafield, filter, or form data owner determines Liquid/target-JS
  state and repeated-input, FormData, JSON, URL, or navigation serialization.
- React and Angular adapters expose distinct `values` and `inputValue` with
  add/remove callbacks. An adapter-local `defaultValues` convenience must not
  change the controlled semantic boundary.
- Figma maps empty/filled/wrapping, validation, read-only, disabled, and focus
  presentations. It does not model collection algorithms, persistence, or ARIA.
- SwiftUI and Compose use platform-native text entry, value controls, focus, and
  announcements while preserving target-owned state and validation.
- Visual density, label spacing, surface/border strength, Tag alignment, row
  wrapping, validation palettes, and the draft/Tag baseline remain explicit
  human-review risks.
- Suggestions, selection, immediate Backspace deletion, comma/semicolon and
  paste tokenization, limits, async validation, server IDs, ordering, drag,
  truncation, and production serialization remain future target/product work.
