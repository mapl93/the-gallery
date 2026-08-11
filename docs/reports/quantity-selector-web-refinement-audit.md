# Quantity Selector Neutral Web Refinement Audit

Status: Ready for human review; not promoted to `stable`

Date: 2026-07-13

## Scope And Reconciliation

Quantity Selector was reviewed as an editable native numeric field plus named
step actions. Inventory, cart mutation, pending/retry, formatted display, and a
generic Number Input remain outside this primitive.

- Contract advanced to `0.3.0`: four parts, four variants, one size, eleven
  states, six behaviors, thirteen properties, and twenty-seven public tokens.
- Added native `name`, `required`, and `readOnly`; clarified initial/default
  value, live controlled ownership, native events, form/reset, and step fallback.
- Shared enhancement replaced manual arithmetic with `stepUp()`/`stepDown()`,
  emits events only on change, treats read-only as unavailable to both actions,
  and observes live `readonly`/constraint mutations.
- Studio uses the same native algorithm and nullable input value. Logical
  separators, container bounds, disabled/read-only hover, contrast, special
  media, and fixed numeric viewport are documented and verified.

## Browser Evidence

- Baseline `min=1, step=2, value=2` manually advanced to `4` while remaining
  `stepMismatch=true`. Refined runtime advanced `2 → 3`, cleared mismatch, and
  emitted exactly one `input` and one `change`.
- Decrement reached `1` and disabled the lower action. Read-only disabled both
  actions but FormData included `quantity=1`; disabled omitted the value.
- Authored `step=0` used the standard fallback from `3 → 4` with no mismatch.
  Reset restored the initial value and resynchronized action availability.
- Contrast, light: default `3.07:1`; semantic boundaries `3.86:1`–`6.21:1`.
  Dark: default `5.19:1`; semantic `8.64:1`–`12.30:1`.
- Action/root geometry: Mobile and Tablet `44/46px`; Desktop and XL `40/42px`.
  Numeric viewport stays bounded for very large values.
- A `280px` RTL extreme fixture had `0px` overflow; the component remained
  within `238px`. Forced-colors border/separators became system `ButtonText`,
  focus retained a `4px` system outline, and reduced-motion duration was `0s`.
- Eight canonical screenshots cover Exhibit/Studio and four viewports; variant,
  RTL, forced-colors, reduced-motion, and before images supplement them.
- Exhibit/Studio markup is normalized-identical at `1001` characters.

Evidence is stored under `output/playwright/refinement-batch-08/`.

## Tokens, Runtime, Performance, And Content

- No new public token or component-token layer. Numeric width, icon size,
  separators, padding, alignment, and mixes remain private composition.
- Each enhanced root owns two click listeners, input/change listeners, an
  optional form-reset listener, and one attribute observer. There is no polling,
  layout loop, network work, inventory client, or hidden mirror value.
- Shared runtime: `5,263 B` gzip / `8 KiB`; Primitives: `10,378 B` / `10.3 KiB`;
  Neutral Web components CSS: `57,952 B` / `64 KiB`.
- Empty, decimal/step-mismatch, lower/upper boundary, very large, required,
  read-only, disabled, reset, localized RTL, and validation paths are covered.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native number input, native stepping, named buttons, form constraints/events. | Implemented and browser-evidenced. |
| Shopify | Same classes/input/enhancement; target owns inventory/cart mutation. | Generated adapter validates. |
| React / Angular | Controlled value or defaultValue on the native input plus native events. | Strategy documented; adapter pending. |
| Figma | Root, value viewport, step actions, validation, boundaries, one density. | Metadata works; no form behavior. |
| SwiftUI / Compose | Native numeric entry with platform step actions. | Conceptual mapping documented. |

## Remaining Human Review

Approve responsive action density, fixed numeric viewport, separators, icon
geometry, radius, semantic colors, and focus hierarchy. Decide separately
whether a visible label must become required anatomy rather than Field Wrapper
composition, and approve/provide Quantity-specific visual evidence.

## Validation And Decision

Contracts, Studio, docs, token compatibility, Web/Shopify adapters, temporary
site build, certification/parity/static-preview audits, budgets, and global
progress audit pass in Batch 08.

Ready for human review. Contract remains `pilot`; no stability promotion was
performed.
