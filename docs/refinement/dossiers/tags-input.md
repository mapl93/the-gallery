# Component Dossier: Tags Input

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/tags-input.contract.json`

## Recommendation

Treat Tags Input v1 as a labelled free-form multi-value field composed from the
canonical Field Wrapper and Tag contracts. Keep the native text input as the
only editing focus, let Enter request one trimmed non-empty value, and let each
canonical Tag expose its explicit named remove button. The consuming target
owns the controlled value collection, duplicate and domain validation, data
mutation, localized result text, and form serialization.

Do not assign `role="combobox"`, `aria-autocomplete`, `aria-controls`, or popup
keyboard behavior unless a future suggestions adapter actually renders and
controls a conforming popup. Do not commit on blur, tokenize paste, treat comma
as a universal separator, or remove the last value immediately on Backspace in
the base contract. Those policies conflict with valid content, text editing,
localization, and target data rules and have no interoperable platform default.

## Purpose And Limits

- Captures zero or more short user-supplied text values through one native
  single-line draft field.
- Presents committed values in reading order as canonical Tags with optional
  named remove actions.
- Keeps the entry point visible and focused after successful add/remove requests
  so users can continue editing the collection.
- Supports Default, Error, Success, and Warning field feedback without changing
  collection ownership.
- Is not a TagGroup selection widget, multi-select Listbox, Combobox,
  autocomplete, tokenized rich-text editor, sortable collection, filter bar,
  or platform persistence service.
- Does not decide server IDs, case/accent normalization, maximum values,
  asynchronous validation, authorization, ordering, storage, or commerce data.

## Gallery Baseline Before This Batch

- Registry `H8`, Forms, depends only on `tag`; contract `0.3.0`, `pilot`.
- Canonical CSS makes `.tags-input` itself the input-like surface and duplicates
  Tag visuals and removal controls through `.tags-input__tag` and
  `.tags-input__remove` instead of consuming `.tag`.
- The surface uses physical dimensions, raw 4/8px composition, a derived 87.5%
  value size, 16px removal targets, and partial hover/focus treatment. It has no
  visible label, message anatomy, read-only/disabled surface treatment, forced-
  color rules, container response, or reduced-motion rule.
- The contract says paste, comma, blur, Backspace and Delete participate in
  creation/removal but leaves each policy undefined. It simultaneously exposes
  Combobox ARIA attributes although no suggestion popup exists.
- The shared React fixture commits on Enter, comma and blur; deletes the last
  value immediately on empty Backspace; rejects exact duplicates silently; uses
  duplicated local tag markup; and has no pre-mounted result announcement.
- Disabled only reaches the text field and local remove buttons. Read-only,
  required collection semantics, form serialization, composition events, and
  controlled/uncontrolled ownership are not defined.
- Exhibit and Studio already mount `AdvancedControlStudio` as one shared
  renderer, but their fixture is not yet the canonical Field Wrapper + Tag
  composition required by accepted ADRs 0058 and 0106.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) | A Combobox is an input with an associated popup. Its ARIA and arrow/Escape model apply when that popup exists; ordinary text editing keys remain native. | Free-form Tags Input without suggestions stays a labelled native text input. A future suggestion mode must compose the Combobox contract instead of adding dormant ARIA. |
| [WAI-ARIA APG keyboard interface guidance](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) | Custom composite widgets must implement their announced keyboard model and preserve predictable visible focus. | Do not claim a composite/listbox model. Use native Tab/Shift+Tab and native Tag buttons; keep field focus deliberate after collection changes. |
| [WCAG 2.2 status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) | Results and errors that do not move focus must be programmatically determinable, while unnecessary live output can become disruptive. | Pre-mount one polite status region and let the target update it only for meaningful add, remove, duplicate, capacity, or validation results. |
| [WCAG 2.2 target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) | Pointer targets should contain a 24 by 24 CSS-pixel area or satisfy a documented exception. | Composed Tag remove controls retain the reviewed 24px floor; Tags Input must not shrink them back to 16px. |
| [Open UI Tag research](https://open-ui.org/components/tag/) | Tag prior art spans closable, selectable, filter and link concepts but does not define a multi-value input platform primitive. | Preserve Gallery Tag's narrow removal-request contract and keep collection semantics in Tags Input. |
| [React Spectrum TagGroup](https://react-spectrum.adobe.com/TagGroup) | Dynamic items are keyed and controlled; removal is a collection callback. Selection, actions, empty state, and row limiting are separate capabilities. | Model committed values as target-controlled items and removal requests, without importing selection or truncation APIs into the field. |
| [Material UI Autocomplete](https://mui.com/material-ui/react-autocomplete/) | Multiple-value autocomplete separates selected `value` from `inputValue`, supports controlled/uncontrolled state, and treats free-solo, suggestions, fixed options and limiting as independent policies. | Keep draft text separate from committed values. Defer suggestion/free-solo hybrid and display limits rather than turning them into implicit v1 behavior. |
| [Shopify Polaris Text Field](https://shopify.dev/docs/api/app-home/web-components/forms/text-field) and [Chip migration](https://shopify.dev/docs/apps/build/customer-accounts/migrate-to-web-components/tag) | Polaris keeps native text-field concerns separate from passive and clickable/removable chip concerns. | Shopify should compose target-native text entry and controlled chip removal while preserving the same semantic boundary. |

## Matches, Differences, And Direction

- Gallery already has a native text field, four validation color families,
  wrapping layout, a Tag dependency, and a shared Exhibit/Studio renderer.
- Gallery differs from the accepted architecture because it copies Tag markup
  and visuals and shrinks its remove target below the canonical primitive.
- The existing ARIA references imply a popup that does not exist; removing those
  dormant claims is more accurate than shipping an incomplete Combobox.
- Existing comma, blur and empty-Backspace behavior is convenient but
  destructive/ambiguous and not backed by an accepted interaction decision.
- Direction: canonical Field Wrapper + Tag composition, one labelled native
  draft input, Enter add request, explicit removal, controlled collection,
  target-localized polite status, and zero neutral JavaScript.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Field root | yes | `.field.tags-input` | Field Wrapper + Tags Input | Owns label/control/message order and validation class. |
| Label | yes | native `label.field__label` | Field Wrapper | Explicit `for`/`id` association names the draft field. |
| Control surface | yes | `div.tags-input__control` | Tags Input | Visual group only; no Combobox/Listbox role. |
| Committed values | no | native list | target/Tags Input | Omitted or empty when no values exist; preserves reading order. |
| Value item | repeated | list item + canonical `.tag` | Tag | Uses `.tag__label` and a conditionally named `.tag__remove`. |
| Draft field | yes | `input type="text"` | Tags Input/target | Only text-editing owner and stable focus destination. |
| Description/feedback | no | canonical Field Wrapper text | Field Wrapper/target | Associated with `aria-describedby`; Error also sets `aria-invalid`. |
| Result status | yes | pre-mounted `role="status"` | target | Empty initially; receives localized collection-change results. |

The Tags Input CSS may arrange canonical parts but must not copy Tag label,
button, glyph, focus, disabled, or color rules.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Validation | Default, Error, Success, Warning across label, control, message, hover and focus family. |
| Collection | Empty, one value, multiple wrapping values, long/localized values, duplicate request, and target-defined invalid request. |
| Draft | Empty, text present, composing IME text, and explicit Enter request. |
| Availability | Editable, read-only, and native disabled. Read-only keeps values and text readable but hides/disables removal. |
| Focus | Field focus-visible, Tag remove focus-visible, add result back at field, remove result at field. |
| Pointer | Control click focuses the native field; fine-pointer hover does not override validation. |
| Environment | LTR, RTL, 200% zoom/narrow container, light, dark, forced colors, reduced motion. |
| Size | One default responsive density; no v1 compact/large API. |

Popup suggestions, selected Tag state, drag/reorder, batch paste tokenization,
comma/semicolon delimiters, immediate Backspace deletion, async pending state,
maximum rows, and value truncation are unsupported base modes.

## Public API And State Ownership

- `label` — required visible label for the draft field.
- `values` — optional committed-value slot/collection; each entry renders one
  canonical Tag with a stable target identity.
- `inputValue` — optional live draft text for framework-controlled adapters;
  static HTML may leave the native field uncontrolled.
- `placeholder` — optional draft hint, never the accessible name.
- `variant` — Default, Error, Success, or Warning presentation.
- `description` — optional persistent guidance.
- `feedback` — optional current validation/confirmation message.
- `required` — optional collection requirement communicated visually and with
  `aria-required`; target validation checks committed values rather than relying
  on the empty draft input's native `required` algorithm.
- `disabled` — native disabled field and Tag remove buttons; omits interaction
  and form participation according to the target adapter.
- `readOnly` — focusable readable field; committed values remain visible and no
  add/remove request is offered.
- `invalid` — Error-only `aria-invalid` override when target validity is known.
- `describedBy` — target IDs for description/feedback association.

The target owns the committed array and handles `addRequest(value)` and
`removeRequest(id)`. Static neutral markup is uncontrolled only for the native
draft string; there is no neutral uncontrolled collection store. React/Angular
may offer `defaultValues` locally, but their callbacks and resulting values must
retain the same contract meaning.

## Collection Policy

1. Enter during ordinary text editing requests one trimmed value when non-empty.
2. Enter while `isComposing` does not commit or clear the draft.
3. Successful target acceptance clears the draft, updates the controlled list,
   keeps/refocuses the field, and updates the polite status.
4. Duplicate, disallowed, capacity, or asynchronous failures leave the draft
   available for correction and update associated feedback/status as appropriate.
5. Each Tag remove button requests one identified removal. After reconciliation,
   focus returns to the draft field and the target updates the status.
6. Blur, comma, semicolon, paste, Backspace and Delete keep native text-editing
   behavior in v1. Targets may add explicit domain policies only in a documented
   adapter and must not misrepresent them as Gallery defaults.

Alternatives considered:

- Commit on comma/semicolon: compact for simple keywords, but conflicts with
  punctuation, locales and pasted names. Deferred.
- Commit on blur: convenient but creates values during navigation or correction.
  Rejected for the base contract.
- Empty-Backspace deletes/focuses the last value: common in libraries but lacks
  one platform convention and can be destructive. Deferred pending user tests.
- Combobox suggestions: useful for constrained taxonomies, but requires the
  complete Combobox popup, active-option and keyboard contract. Separate mode or
  composition, not dormant ARIA.
- Neutral JavaScript collection store: easy static demo, but creates a second
  data owner and cannot validate/persist target records. Rejected.

## Token And Value Audit

- Existing public input border/focus/validation tokens cover the control
  surface, but the current contract omits accepted label, value, placeholder,
  disabled, feedback, typography, padding, and opacity tokens used by mature
  fields.
- Compose Field Wrapper's label/description/feedback tokens and Tag's public
  tokens instead of redeclaring their styles as Tags Input API.
- Use accepted input value/line-height, padding, margin, body font, surface,
  placeholder, disabled, and focus tokens for the unique control surface.
- Keep flex gaps, minimum draft width, border width, focus thickness, list reset,
  and status visually-hidden geometry as private `--_` composition details.
- Do not expose per-Tag color, X glyph, internal gap, control min-height, focus
  thickness, list layout, or status politeness as Studio customization API.

## Visual And Content Audit

- Preserve a familiar single field boundary with tags and draft aligned on one
  flexible baseline; the visible label/message remain outside that boundary.
- Canonical Tags must retain their reviewed secondary surface, 24px removal
  target, focus ring, wrapping resilience, and system-color behavior.
- The draft expands into remaining inline space and wraps to a new row when
  necessary without forcing page overflow.
- Empty, one-value, many-value, exceptionally long, unbroken, Arabic/RTL and
  mixed-direction values must remain readable. The input must not collapse below
  a useful editing width.
- Visual density, label-to-control spacing, field height, Tag-to-field alignment,
  border strength, validation palette, and wrapping shape require human review.

## Accessibility And Interaction

- Use a native text input with a visible explicit label and associated helper/
  feedback IDs. Placeholder is supplementary only.
- Do not add ARIA widget roles without the corresponding popup or composite
  behavior. A normal list of Tags may contain native remove buttons; it is not a
  Listbox whose options contain nested controls.
- Error uses `aria-invalid="true"`; Success and Warning do not. Required is a
  collection-level target rule communicated through `aria-required` and text.
- Native Tag buttons provide Tab, Shift+Tab, Enter, Space, disabled and 24px
  pointer behavior. The field handles Enter only after IME composition ends.
- Pre-mount an empty polite status and update it with concise localized results;
  avoid announcing every keystroke or duplicating visible validation alerts.
- Read-only offers no removal action. Disabled suppresses all field/remove
  interaction while preserving legible values.
- CSS focus, validation, forced-colors, reduced-motion and zoom evidence must be
  taken from the rendered shared fixture, not inferred from contract metadata.

## Responsive And Performance

- Capture Exhibit/Studio at 390/768/1280/1600 plus empty, many/long values,
  duplicate/add/remove status, real field/Tag focus, disabled, read-only,
  Error/Success/Warning, IME guard, RTL, dark, forced colors, reduced motion and
  200% zoom/narrow containment.
- Neutral component runtime budget is `0 B`: no collection listener, observer,
  timer, network call, measurement loop, data store, or framework ships in
  `components/js`.
- Batch 22 starts at Forms `9,293 B`, neutral Web component CSS `64,070 B`, and
  shared runtime `10,321 B` deterministic gzip. Forms and runtime are existing
  documented exceptions; the complete Web CSS has `1,466 B` before 64 KiB.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Field Wrapper + native text input + normal value list + canonical Tags + target-controlled requests/status. | CSS/composition candidate; browser evidence pending. No popup ARIA or neutral collection runtime. |
| Shopify | Liquid/section-owned values, repeated form inputs or target serialization, native text entry, canonical copied Tag CSS, target JS only when collection editing exists. | Planned until one concrete Shopify data owner and serialization strategy exist. |
| React / Angular | Controlled `values` and `inputValue`, add/remove callbacks; optional adapter-local default values. | Planned; event types and item identity remain adapter work. |
| Figma | Empty/filled/wrapping, validation, disabled/read-only and focus presentations; no runtime collection policy. | Studio metadata/renderer candidate; visual approval pending. |
| SwiftUI / Compose | Native text field plus target collection/chip controls and localized announcements. | Conceptual; focus/accessibility and form serialization remain platform-native. |

## Exhibit And Studio Parity

`AdvancedControlStudio` already serves both modes. It must render one fixture
function composed from `.field`, `.tags-input__control`, and canonical `.tag`
parts; both modes must receive the same initial values, IDs, status region,
interaction policy and token overrides. The MDX Preview remains fallback audit
markup and must show the same canonical anatomy.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Local `.tags-input__tag`/`__remove` duplicate canonical Tag. | critical | Replace with `.tag`, `.tag__label`, `.tag__remove`; delete duplicate CSS. | implementation |
| Claimed Combobox ARIA has no popup implementation. | critical | Remove dormant popup semantics; compose Combobox only in a future suggestion mode. | implementation/architecture boundary |
| Destructive commit/delete policies are implicit and silent. | high | Adopt explicit Enter + named removal requests; target owns validation/status. | component contract |
| No visible label, message, required, read-only or status anatomy. | high | Compose Field Wrapper and add native/accessibility mappings. | implementation |
| Remove target regresses from canonical 24px to 16px. | high | Consume Tag without local size overrides. | implementation |
| CSS lacks disabled, forced-color, reduced-motion and container evidence. | high | Add bounded logical/color/motion treatment and browser probes. | implementation |
| Form serialization has no valid native owner. | high | Keep it explicit and target-owned; document repeated-input/FormData strategies per adapter. | target architecture |
| Density, spacing, alignment and wrapping shape lack approval. | human review | Preserve a restrained candidate and capture four viewports/special modes. | owner |

## Risks And Open Questions

1. Field density, label spacing, surface/border strength, Tag alignment, row gap,
   validation colors and wrapping shape require human visual approval.
2. A future suggestions mode must decide whether to compose Gallery Combobox or
   become a separate constrained multi-select; it cannot be inferred from v1.
3. Shopify needs a concrete product/metafield/filter owner before repeated hidden
   inputs, JSON, FormData, URL parameters, or navigation can be selected.
4. Case/accent duplicate equivalence, allowed characters, limits, asynchronous
   validation, server identity, ordering, paste tokenization, comma/semicolon
   separators and Backspace behavior remain target/product policies.
5. If owner research later requires immediate keyboard navigation among Tags,
   that richer composite needs assistive-technology testing and a separate ADR.

## Implementation And Verification

- Contract `0.4.0`, registry, MDX, Studio `0.2.0`, canonical Forms CSS and the
  shared renderer now describe Field Wrapper + Tag composition, native draft
  ownership, explicit controlled requests, target status and serialization
  boundaries consistently.
- Local `.tags-input__tag`, `.tags-input__remove`, 16px action geometry, inline
  Lucide React X, comma/blur commit, empty-Backspace deletion and dormant popup
  ARIA are removed. Canonical Tag retains its 24px action, focus, disabled, glyph
  and forced-color behavior.
- Enter/IME, duplicate, comma, Backspace, removal/focus, read-only, disabled,
  Error/Success/Warning, required/description relationships, dark, forced colors,
  reduced motion, long Arabic RTL, 200% zoom and zero-overflow probes pass.
- Draft/control contrast is `17.93:1` light and `11.06:1` dark; canonical Tag is
  `7.17:1` light and `10.21:1` dark. Exhibit and Studio markup is normalized-
  identical at 954 characters.
- Eight canonical after images cover Exhibit/Studio × 390/768/1280/1600; 14
  state/content/media images and two desktop before images complete the evidence.
- Neutral runtime delta is `0 B`. Final deterministic gzip is Forms `9,615 B`,
  complete Web component CSS `64,392 B`, and shared runtime `10,321 B`.
- Registry/docs, contracts, Studio, Neutral Web, Shopify, TypeScript, temporary
  Vite build, structural/parity/static/refinement audits, generated copies, diff
  checks and `site/dist` cleanliness pass in Batch 22.

## Readiness Decision

Research, canonical implementation, documentation, evidence, automated
validation, and target translation are complete for explicit human stability
review. Visual approval and target/product policies listed above remain pending.
The contract stays `pilot`.
