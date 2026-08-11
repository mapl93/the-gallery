# Tags Input Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Tags Input is now a labelled free-form multi-value field composed from canonical
Field Wrapper and Tag. One native text input owns draft editing; Enter requests
one value after IME composition; named Tag buttons request explicit removal; and
the consuming target owns the controlled collection, validation, persistence,
localized status, focus result, and form serialization.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Free-form multi-value entry; not TagGroup selection, Listbox, Combobox, autocomplete, rich text, sortable list, or persistence service. |
| Anatomy and composition | pass | Field Wrapper label/guidance/feedback + control + native list + canonical Tags + native draft + pre-mounted status; duplicated Tag DOM/CSS removed. |
| Variants, sizes, states | pass | Default/Error/Success/Warning, one responsive density, empty/filled/hover/focus/remove-focus/read-only/disabled and three semantic focus states. |
| Public API and ownership | pass | Eleven semantic properties; target-controlled committed values, native/framework-controlled draft, explicit add/remove requests, target serialization. |
| Tokens and visual system | pass | 31 unique public input/type/spacing/radius/motion references; Field Wrapper and Tag retain their own APIs; private layout/status details stay private. |
| Accessibility and motion | pass | Visible label, associated guidance/feedback, Error-only invalidity, collection required semantics, IME guard, named 24px removal, polite status, reduced motion and forced colors. |
| Responsive/content resilience | pass | Four viewports plus empty, long Arabic RTL, many values and 200% CSS-zoom probe with equal client/scroll widths. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no listener, observer, timer, request, data store, measurement loop, icon asset, or framework added. |
| Cross-target translation | pass | Web controlled composition and Shopify/framework/Figma/native data/focus/serialization boundaries documented. |
| Documentation and verification | pass | Dossier, ADR 0107, contract/Studio/registry/MDX, shared renderer/fixture, before/after evidence and this report agree. |

## Contract And Browser Evidence

- Contract `0.4.0`: 10 anatomy parts, four variants, one size, 10 states, 10
  behaviors, 11 properties, 31 unique public token references, and canonical
  `field-wrapper`/`tag` dependencies.
- Rendered root is `field tags-input`; there are two `.tag` instances and zero
  `.tags-input__tag` copies. The visible label's `for` matches the field `id`.
- The draft has no widget role, `aria-autocomplete`, or `aria-controls`. The
  pre-mounted status is `role="status"`/atomic, and canonical remove Buttons are
  contextually named and measure exactly `24×24px`.
- Enter adds `Porcelain`, clears the draft, announces
  `Porcelain added. 3 materials selected.`, and keeps field focus. A duplicate
  keeps the draft and count, announcing `Porcelain is already added.`
- Comma remains draft text (`Clay,`), and empty Backspace leaves all three
  committed values intact. Explicit removal announces the new count and returns
  focus to the draft field.
- A synthetic composing Enter leaves `Glaze` uncommitted with two values; the
  following ordinary Enter commits it and clears the draft.
- Read-only keeps a focusable native field and renders zero remove Buttons.
  Disabled sets the native field and both canonical remove Buttons disabled.
- Error sets `aria-invalid="true"`; Success and Warning leave it unset. All
  three focused variants resolve to distinct semantic border and outer-ring
  colors without falling back to Default.
- Field text/control contrast is `17.93:1` light and `11.06:1` dark; canonical
  Tag contrast is `7.17:1` light and `10.21:1` dark.
- Forced colors resolves both control and Tag boundaries to system CanvasText.
  Reduced motion resolves the control transition duration to `0s`.
- At 390px, three Arabic/mixed-direction values keep root `326/326px`, control
  `324/324px`, and document `390/390px` client/scroll widths. At the 200% CSS-
  zoom probe the component is `256/256px`, control `254/254px`, and document
  `640/640px` with no horizontal overflow.
- Exhibit and Studio outer markup are normalized-identical at 954 characters;
  both use the same renderer, fixture, IDs, canonical classes, and interactions.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL.
  Fourteen additional images cover initial visual QA, empty, field/Tag focus,
  Error/Success/Warning focus, disabled, read-only, duplicate status, Arabic RTL,
  dark, forced colors, and 200% zoom. Two contemporaneous desktop before images
  preserve the duplicated 16px-removal baseline.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Field Wrapper + native list/input + canonical Tags + target-controlled requests/status. | CSS/composition, semantic behavior, special media and content resilience evidenced; no neutral collection runtime. |
| Shopify | Liquid/target values + canonical copied CSS + repeated inputs/FormData/URL/navigation chosen by the data owner. | Planned until a concrete product/metafield/filter/form owner defines state and serialization. |
| React / Angular | Distinct controlled `values`/`inputValue`, add/remove callbacks, optional adapter-local defaults. | Strategy documented; Studio React state is fixture evidence, not base runtime. |
| Figma | Empty/filled/wrapping, validation, focus, read-only and disabled presentations. | Studio validates presentation; algorithms, IDs, persistence and ARIA remain outside Figma. |
| SwiftUI / Compose | Native text entry plus target collection/value controls and platform announcements. | Conceptual mapping; state, focus and serialization stay platform-native. |

## Performance And Risks

- Final Forms CSS is `9,615 B / 6.4 KiB`, an existing documented exception now
  `3,062 B` over. Complete Web component CSS is `64,392 B / 64 KiB`, leaving
  `1,144 B`. Neutral runtime is unchanged at `10,321 B / 8 KiB`.
- Batch 22 adds `322 B` gzip to Forms and complete Web CSS and `0 B` to neutral
  runtime. The delta is not a budget reset.
- Human review must approve label/control spacing, field density/height, surface
  and border strength, Tag alignment, row gap/wrapping, focus thickness, draft
  baseline, and all three semantic validation palettes.
- Suggestions, selection, delimiter/paste tokenization, Backspace navigation or
  deletion, normalization, limits, async validation, server identity, ordering,
  drag, truncation, persistence, and production serialization remain explicit
  target/product proposals.

## Validation

Contracts, Studio, registry/docs, DTCG source, Neutral Web, Shopify, native
field/Button/disabled/focus behavior, controlled request policy, IME guard,
contrast, long/localized/RTL content, empty/read-only/disabled and validation
states, dark/forced-colors/reduced-motion/zoom, four-viewport evidence,
TypeScript, structural/parity/static-preview/refinement audits, temporary docs
build, deterministic performance, diff checks, generated-copy identity, and
`site/dist` verification are included in Batch 22.
