# Component Dossier: Glaze Guide

Status: `human-review-ready`

Date: 2026-07-17

Registry: `R2` / `glaze-guide`

Dependency order: 127, phase 6 (Composed components), depth 0

## Accepted Direction

Owner decisions 54 and 56 confirm R2-A as a passive glaze reference. Exhibit
and Studio render one shared native
collection of named glaze samples plus an optional, explicitly featured detail
record. They must not simulate selection, synchronize content, or expose
interactive state when the contract says that those behaviors are target-owned.

Represent the passive collection as `ul > li > figure`, with a required visible
name and an optional code. A visual sample may be a truthful informative image
or a decorative/color surface, but the visible name remains the durable record
identity. Use a named native `section` only when the optional title exists;
otherwise use a generic `div`. The optional detail is a separately named passive
`article`, not an implicit selected panel or live region.

When a target uses a glaze as a purchasable product choice, it composes
canonical Radio or Variant Selector outside R2. That product control owns its
group/value, state, eligibility, availability, validation and selected-variant
synchronization; featured R2 detail never becomes selected option state.

Retain contract version `0.2.0`, status `pilot`, and the existing target-owned
`title`, `swatches`, and `detail` boundary. Remove the invented Studio interaction
and passive hover cue, but preserve the current selected CSS hook only for a
future coherent target adapter until the open architecture decision is resolved.
Do not promote R2 to `stable` without explicit human review.

## Purpose And Limits

- Presents a scannable guide to named glaze samples and optional supporting
  details.
- Keeps each glaze identifiable through text rather than hue, finish, texture,
  or image alone.
- May show a target-formatted code and target-authored term/value facts.
- May show one explicitly featured reference record without claiming that it is
  selected by the user.
- Does not define a glaze formula, chemistry, firing schedule, safety status,
  food-contact claim, color standard, compatibility matrix, stock status, price,
  product variant, or CMS schema.
- Does not select, compare, filter, navigate, purchase, fetch, persist, announce,
  or synchronize records in the neutral implementation.
- Does not expose grid columns, circle size, crop, radius, padding, or visual
  effects as semantic public properties.

## Accepted Source Facts

- The repository is the source of truth; Figma is evidence and a future target.
- ADR 0083 records swatches and optional detail, keeps the selected selector as
  a visual hook, and assigns any selection model to targets.
- The current MDX explicitly says that the Gallery artwork keeps samples passive.
- The contract exposes optional `title`, required `swatches`, and optional
  `detail`; it remains `pilot` and defines no record schema.
- No accepted decision says that the neutral renderer is a form control, that a
  selected detail exists, or that Button is the correct dependency.
- No accepted decision authorizes a Shopify section/schema, target runtime, new
  component-token layer, or R2-specific visual direction.

## Current Gallery Baseline

- Studio always renders three native `button.glaze-swatch` elements, updates
  local `selectedGlaze`, switches contract state to `selected`, and synchronizes
  a detail panel. Exhibit receives the same family renderer, so both modes share
  the same implementation but that implementation contradicts the documented
  passive artwork boundary.
- The container has `role="list"`; buttons have `role="listitem"` and
  `aria-selected`. This supplies neither radio-group semantics nor listbox/option
  semantics, and every button remains a separate Tab stop without arrow-key
  choice navigation.
- Detail is always present in the fixture when its slot toggle is enabled, even
  in the default contract state where all sample buttons expose
  `aria-selected="false"`. Its image/name still comes from `selectedGlaze = 0`,
  creating an unannounced implicit selection.
- The optional title is the root's unconditional `aria-labelledby` target. When
  title is blank, Studio leaves a dangling label reference on an unnamed
  `section`.
- The grid is a generic `div` and passive MDX markup uses ARIA list/listitem
  rather than native collection elements. Samples have no explicit figure or
  article identity.
- CSS assigns `cursor:pointer`, hover border/scale, transition, focus, and
  selected styles to the generic `.glaze-swatch` root. A passive sample therefore
  looks interactive even when it has no target behavior.
- CSS contains hardcoded `140/32/24/16/8/2px`, physical geometry, numeric font
  weights, calculated type sizes, a viewport breakpoint, and transition/easing
  ownership. Studio additionally fixes three columns and resets detail layout
  with site-only container rules.
- Sample circles are Studio-only gradients. They carry no accessible description,
  while the visible name/code provide only identity, not the visual appearance.
  The detail image is generic editorial pottery rather than evidence of the named
  glaze on a test tile.
- Existing visual references show three circular samples and a large two-column
  detail card on Desktop, then three compressed samples and a tall editorial
  image on Mobile. They do not establish an approved passive/interactive state,
  Tablet/XL behavior, intrinsic host sizing, missing title/detail, long/localized
  content, RTL, zoom/user spacing, dark, forced colors, or reduced motion.
- Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
  and inspector `1020:480`. Direct inspection in the current program found a
  generic Button detail and Studio shell, not R2-specific approved glaze anatomy
  or visual states.
- Baseline R2 CSS slice is `2,666 B` raw / `915 B` gzip, SHA-256
  `5019e3ba8f5418629fc09fc9cfca959fb796679c49c47a478d29dd1ba2efa1d3`.
  Ceramics CSS is `25,812 B` raw / `4,407 B` gzip against the permanent
  `5,427 B` family ceiling. Neutral Web component CSS is `515,644 B` raw /
  `69,807 B` gzip. Shared runtime is `53,811 B` raw / `10,565 B` gzip. The R2
  implementation currently adds React selection state and click handlers but no
  target-neutral adapter runtime.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| [HTML `ul`/`li`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element) | `ul` represents a list whose order is not materially meaningful; direct `li` children establish the item relation. | Use native passive collection semantics instead of ARIA list/listitem on generic elements. |
| [HTML `figure`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element) | Figure is self-contained flow content with an optional caption. | A visual sample plus visible name/code is a coherent passive figure inside each list item. |
| [HTML radio input](https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio)) | Same-named native radios form a group where only one control is checked and expose native input/change behavior. | Prefer native/canonical Radio if a target makes glaze a mutually exclusive form choice. |
| [WAI Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/) | Related radio controls should be grouped and labelled, normally with `fieldset`/`legend`. | A future selection mode needs an explicit group label and form semantics, not a list of buttons. |
| [WAI-ARIA APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | Radio groups use `radiogroup`/`radio`, `aria-checked`, one Tab entry, Space, and arrow-key movement/selection. | A custom target adapter must implement the full pattern; `button[aria-selected]` is insufficient. |
| [WAI-ARIA APG Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) | Listbox requires named `listbox`, owned `option` elements, coherent selection state, and managed focus/keyboard behavior. | Treat listbox as a distinct alternative, never as styling roles added to the passive grid. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Surveyed systems do not converge on one card anatomy; concepts include selected/focusable variants without a shared semantic contract. | Keep glaze-specific passive structure in R2 and do not infer interaction from a card-like visual. |
| [Radix Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group) | Root/Item/Indicator composition supports orientation, name, required, disabled, controlled/uncontrolled value, change events, and APG keyboard behavior. | These are the minimum API/state concerns if R2 becomes a reusable selector; they do not belong to the current passive pilot. |
| [Polaris Choice list](https://shopify.dev/docs/api/app-home/web-components/forms/choice-list) | Single choices are radios; choice records expose value, selection/default selection, disabled, labels/details, and controlled/uncontrolled use. | A Shopify selectable adapter should compose target-native choice controls after variant/data ownership is approved. |

Consensus exists on textual identity, labelled native collection/document
semantics for passive content, and radio semantics for mutually exclusive form
choices. There is no consensus that a glaze guide must be interactive, that its
detail is selection-driven, that listbox is preferable, or that a ceramics
record schema belongs in a design-system component.

## Matches, Differences, And Direction

- Contract and ADR correctly preserve target ownership, but the current Studio
  implementation silently selects one model. Remove that invented behavior.
- Current visible name/code satisfy the color-not-alone requirement. Recast the
  sample as a passive figure and add a truthful appearance description only when
  the target has one.
- The optional detail anatomy can remain, but label it as featured/reference
  content and keep it independent from user state until synchronization rules
  are accepted.
- Keep the selected CSS hook because ADR 0083 explicitly preserves it, but scope
  hover/cursor/focus affordances to actually interactive roots so passive
  figures remain honest.
- Replace Studio-only layout corrections with intrinsic canonical CSS. The same
  renderer/fixture must project identically in Exhibit and Studio at the same
  host width.

## Candidate Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes when samples valid | named `section.glaze-guide` with title; otherwise `div.glaze-guide` | R2 | Omit when no complete samples remain. |
| Header/title | no | `header` plus contextual heading | R2/target | Visible title names section; target owns rank. |
| Collection | yes | `ul.glaze-guide__grid` | R2/target | Target source order preserved; no widget role. |
| Item | repeated | `li.glaze-guide__item` | R2 | One complete passive sample. |
| Sample | per item | `figure.glaze-swatch` | R2/target | Requires stable key/name; no click or selection state. |
| Visual | yes | decorative surface or target image | target | Essential identity remains textual; truthful alt/description is contextual. |
| Caption/name | yes | `figcaption` with visible name | target | Required, non-empty. |
| Code | no | visible text | target | Target-formatted identifier, not a universal glaze code schema. |
| Detail | no | named `article.glaze-detail` | R2/target | Explicitly featured/reference content; never implicitly selected. |
| Detail media | no | target image/media | target | Informative alt or decorative empty alt according to context. |
| Detail facts | no | native `dl` term/value groups | target | No canonical vocabulary, units, or claims. |

## Variant, Size, State, And Mode Matrix

| Dimension | Candidate direction |
| --- | --- |
| Default | Passive sample collection with no selection state. |
| Titled/untitled | Named section versus generic root; no dangling label. |
| Missing samples | Omit the component; required slot remains required in Studio. |
| Invalid sample | Omit blank-key/name record; retain valid peers. |
| Code/appearance description absent | Omit optional content; name remains. |
| Detail absent/present | No blank reservation; present detail is explicitly featured. |
| Hover/focus/selected | None for passive figures. Interactive targets own complete coherent states. |
| Narrow host | Intrinsic grid collapses from host width, not global viewport. |
| Long/localized/RTL | Logical flow and complete wrapping without truncation. |
| 200% text/user spacing | Samples/details grow without clipping or overlap. |
| Dark/forced colors | Text/borders remain perceivable; color is not the only identifier. |
| Reduced motion | Passive R2 owns no motion; target interaction must suppress decorative motion. |

## Public API And Runtime Direction

| Property | Type | Requirement | Direction |
| --- | --- | --- | --- |
| `title` | string | optional | Visible contextual heading; determines section versus generic root. |
| `swatches` | slot | required non-empty | Target-owned passive sample collection; no record schema or widget role implied. |
| `detail` | slot | optional | Explicit passive featured/reference content; no synchronization implied. |

No controlled/uncontrolled strategy applies to the passive candidate. It owns no
value, default value, event, focus, selection, request, announcement, or
persistence. If the owner approves single selection, the recommended new
semantic API is canonical Radio composition with target-owned `name`, `value`,
`checked`/`defaultChecked`, `onChange`, `disabled`, `required`, detail mapping,
and controlled/uncontrolled rules. That expansion requires a new accepted ADR.

Do not expose sample records, formulas, codes, firing facts, availability,
columns, count, visual size, image ratio, selected index, detail placement,
hover scale, padding, gaps, radius, heading rank, or target synchronization as
neutral root properties.

## Token And CSS Direction

- Keep semantic text, subtle/focus/selected border, heading/body type, radius,
  section/grid/element spacing, and touch-target tokens only where the current
  passive or explicitly interactive selector actually consumes them.
- Use private composition variables for sample minimum measure, visual size,
  local gaps, detail padding, and current type relationships; add no public R2
  token layer.
- Replace physical geometry and hardcoded pixel values with logical properties
  and existing tokens/proportional private values.
- Reset native lists/figures/descriptions visually while preserving semantics.
- Scope pointer, hover, focus, and transitions to interactive target roots. The
  passive artwork must not move or imply clickability.
- Remove R2 layout rules from Studio once canonical intrinsic CSS owns them.

## Target Translation

| Target | Direction |
| --- | --- |
| Neutral Web | Conditional section/div, native passive list/figures, optional featured article/dl, intrinsic CSS, zero R2 JavaScript. |
| Shopify | Planned. Passive content may use target-native section/blocks; selectable product options should compose Shopify/native radios only after source/schema/variant mapping is approved. |
| Webflow | Preserve passive collection and CMS-authored records; any interaction uses explicit target controls/state. |
| React/Angular | Thin passive renderer today. Future selector composes canonical Radio and makes controlled/uncontrolled ownership explicit. |
| Figma | Future variants should separate passive guide from selectable option states; current generic nodes are not R2 visual approval. |
| SwiftUI/Compose/future | Use native collection/figure equivalents for reference content or native single-choice controls for an approved selector; never port button-plus-selected ARIA literally. |

## Evidence And Validation Plan

- Preserve current Desktop/Mobile parity captures as before evidence.
- Capture paired Exhibit/Studio Mobile, Tablet, Desktop, and XL with one managed
  server, one explicit headless Chromium session, and one tab, sequentially.
- Verify normalized DOM and computed-style parity at one forced host width.
- Verify conditional section/div output, native list/items/figures, visible names,
  absent widget roles/focusables/listeners, optional detail article, and native
  term/value groups.
- Verify missing samples, missing title, missing detail, one sample, blank code,
  and invalid-record filtering.
- Exercise `200/320/430/680px` hosts, long/localized/unbroken content, RTL,
  effective 200% text, user spacing, light/dark, forced colors, and reduced motion.
- Measure overflow, contrast, borders, passive hover stability, console/page
  errors, scripts/listeners/runtime work, and image alternatives.
- Validate contracts, Studio, docs, static previews, generated Web/Shopify
  adapters, Exhibit/Studio parity, audits, JSON, diff hygiene, and a production
  build outside `site/dist`.

## Risks And Remaining Gates

1. A production target must prove actual glaze records, provenance,
   localization, revisions, compatibility, formula/firing facts and reviewed
   safety/food-contact claims under R0.
2. Production sample media needs certified color-management, raw/fired/
   photographic/editorial identity, crop, alt, fallback and disclosure policy.
3. Shopify remains planned until a passive template/source/editor mapping is
   approved; purchasable selection stays outside R2 in product controls.
4. Final title alignment, sample geometry, tracks, spacing, featured detail,
   borders, image ratio and responsive visuals require owner review.
5. R2-specific design evidence or explicit repository-render approval remains.

These are target and human-review gates, not unresolved R2 architecture. R2-A
is ready for review but cannot become `stable` without explicit approval.

## Current Gallery Result

- R2 now emits a named native `section` only with its optional visible title;
  title-absent compositions use a generic `div` without a broken label. Missing
  required samples omit the complete component.
- The collection is a native `ul` with direct `li` items. Each complete sample
  is a passive `figure` with a native `figcaption`, required visible name,
  optional code and a fixture appearance description independent of color.
- Optional detail is a separately named passive `article` with a truthful
  editorial image and complete native `dl > div > dt + dd` facts. It is
  explicitly reference content, not an implicit selected panel or live region.
- `GlazeGuideArtwork` and `buildGlazeGuideFixture` are the only R2 renderer and
  fixture consumed by Exhibit and Studio. Local `selectedGlaze`, click handlers,
  `button[aria-selected]`, ARIA list roles and selected Studio state are removed.
- Passive samples have no cursor, hover change, motion, focusability or click
  result. The ADR-0083 selected CSS rule remains scoped as a target hook; a
  future selector must compose canonical Radio/native radios under a new
  accepted contract.
- Canonical CSS uses logical geometry, token-derived rhythm, private intrinsic
  sample/detail measures, native-list/figure/dl resets and host-width auto-fit
  grids. R2 viewport and Studio-only layout overrides are removed.
- The first candidate evidence exposed `3px` natural and `16px` RTL overflow in
  a two-column term/value group at `200px`. Terms/values now stack inside each
  semantic group; final natural and extreme evidence has zero part overflow.
- Final visual inspection retained two-column detail at Desktop/XL by reducing
  only the private detail track minimum to `13rem`; narrow hosts stack detail.
- At a forced `620px`, Exhibit and Studio produce DOM hash `99c2136c`, computed
  style hash `8576dafe`, subtree length `2,467`, three sample columns, identical
  `588px` detail geometry and zero root, part or document overflow.
- Mobile, Tablet, Desktop and XL pass in both modes. `200/320/430/680px` hosts,
  title/detail/sample omission, one minimal sample, localized RTL/unbroken
  content, effective 200% type, user spacing, light/dark, forced colors and
  reduced motion also pass without clipping, console/page errors or focusables.
- Light text contrast is `7.81:1` to `17.93:1`; dark is `12.09:1` to `17.18:1`.
  Forced colors preserves `1px solid` sample/detail boundaries and reduced
  motion inspection finds zero active parts.
- Final R2 CSS is `4,066 B` raw / `1,009 B` gzip and retains the exact Batch 111
  SHA. Current Ceramics CSS is `33,605 B` raw / `4,847 B` gzip, leaving `580 B`
  below its permanent `5,427 B` ceiling after later R-family work.
  Shared neutral runtime is byte-identical and neutral R2 is zero-runtime.
- Web is implemented; Webflow and Shopify Ceramics CSS copies are source
  identical. Shopify passive R2 remains planned until records, editor schema,
  claims, localization and a first consumer are approved; product selection is
  outside R2.

R2-A is refined and prepared for explicit human visual/stability review. It
remains `pilot` and was not promoted to `stable`.
