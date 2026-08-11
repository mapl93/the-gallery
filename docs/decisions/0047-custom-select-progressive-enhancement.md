# 0047. Custom Select Progressive Enhancement

Status: Accepted

Date: 2026-07-12

Amended by: ADR 0048 for popup sizing, placeholder semantics, and fixed icons.

## Context

Select initially preserved the operating system popup. Human review found that the
native option panel covered the field and rendered as browser or platform UI
rather than as part of The Gallery.

The owner rejected that presentation and selected a custom option panel that does
not obscure the current field.

## Decision

- Select uses a custom trigger and single-select listbox when the shared web
  JavaScript is available.
- The listbox is anchored below the field with an `8px` gap and uses Gallery
  surfaces, borders, radius, shadow, typography, and option states.
- The original native select remains the form value owner and no-JavaScript
  fallback. It is hidden only after enhancement succeeds.
- Custom selection synchronizes the native value and dispatches native `input`
  and `change` events.
- Focus remains on the trigger while `aria-activedescendant` identifies the
  highlighted option.
- Arrow keys, Home, End, Enter, Space, Escape, Tab, typeahead, outside dismissal,
  disabled fields, disabled options, and form reset synchronization are required.
- Select remains non-searchable. Search, filtering, asynchronous results, and
  free-form input remain owned by Combobox.

## Consequences

- Select now has a target-owned progressive-enhancement behavior layer in
  `components/js/theme.js` in addition to its canonical CSS.
- Web and Shopify consumers load the generated selective runtime to receive the
  custom presentation. The complete `theme.js` remains a compatibility path
  under ADR 0273 and must not be loaded together with the selective loader;
  without either path consumers retain a functional native select.
- Studio renders the same trigger/listbox anatomy directly in React while the
  Exhibit preview invokes the shared web enhancer inside its shadow root.
- The custom panel can be themed through existing public Gallery tokens without
  introducing a new Select-specific token layer.
