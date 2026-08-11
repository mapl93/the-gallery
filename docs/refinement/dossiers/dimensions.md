# Component Dossier: Dimensions Display

Status: `human-review-ready`

Date: 2026-08-11

Registry: `R5` / `dimensions`

Dependency order: 130, phase 6 (Composed components), depth 0 before refinement

## Recommendation

Keep Dimensions Display as a target-formatted measurement presentation with an
optional explanatory visual and optional exclusive unit choice. Use one native
`dl` containing explicit name/value groups for the required visible
measurements. A diagram may clarify where a quantity is taken, but it must not
be the only source of any label, number, unit, qualifier or tolerance.

Do not make R5 a converter. A target supplies one coherent active set of
already-formatted values and owns source quantities, unit system, conversion,
precision, rounding, locale, tolerance, freshness and replacement. A docs
fixture may hold two preformatted sets to demonstrate target control, but that
is fixture data rather than a public measurement schema or neutral conversion
algorithm.

When `unitControls` is present, compose canonical Segmented Control with native
same-name radios, a visible group label and one checked value. Unit choice is
mutually exclusive; two independent `aria-pressed` toggle buttons communicate
the wrong state model and duplicate an existing canonical component. The
target coordinates the selected control value and the active formatted
measurement/annotation set. R5 itself owns no second controlled store and no
live-region policy.

Keep the existing API to optional `visual`, required non-empty `measurements`
and optional `unitControls`. Owner decision 59 accepts this complete
target-formatted-set boundary and explicitly rejects neutral conversion or
mixing converted and supplied values. Do not add raw numbers, unit enums,
conversion factors, precision, locale, dimension keys, diagram coordinates,
aspect ratio, columns, breakpoint or target record fields to the public
contract. Segmented Control remains the canonical dependency for the optional
interactive composition. Keep R5 `pilot`; do not promote it to `stable`
without explicit human review.

## Purpose And Limits

- Presents physical dimensions or other product measurements as explicit,
  readable target-formatted name/value pairs.
- May include a visual that clarifies where height, diameter, depth or another
  quantity is measured.
- May allow a target-controlled choice between two or more complete formatted
  unit presentations.
- Keeps each value adjacent to a clear quantity name and includes the unit in
  visible text.
- Does not measure an object, infer scale from an image, convert units, choose a
  unit system, round values, localize numbers, calculate capacity or determine
  significant figures.
- Does not define a universal ceramics/product/packaging measurement schema,
  required dimension inventory, tolerance, uncertainty, handmade-variation
  policy or regulatory claim.
- Does not make the diagram geometrically to scale or authoritative unless the
  target explicitly owns and verifies that artifact.
- Does not persist unit preference, synchronize multiple components, update a
  URL, submit commerce data, announce changes or fetch values.
- Does not expose visual coordinates, marker style, image crop, ratio, local
  measure, column threshold, spacing or numeric alignment as semantic API.

## Accepted Source Facts

- The repository is the source of truth; Figma supplies evidence and remains a
  future target.
- ADR 0083 accepts optional diagram, required textual measurements and optional
  target-owned unit controls as slots. Targets own formatting, conversion and
  synchronization.
- Owner decision 59 resolves ADR 0083's source-model question for neutral R5:
  targets supply complete preformatted sets; precision, rounding, locale,
  tolerance, available units and preference persistence remain target-owned.
- The contract is `0.2.0`, `pilot`, exposes no raw number/unit schema and has no
  accepted neutral runtime.
- The component goal requires Exhibit and Studio to share one renderer,
  fixture, canonical CSS and implementation.
- Canonical Segmented Control already defines native fieldset/legend/radio
  composition, one selected value, controlled/uncontrolled projection, arrow
  and Space behavior, focus, form lifecycle and special-color treatment.
- No accepted decision defines R5 quantity inventory, unit systems, precision,
  locale, tolerance, diagram semantics, Shopify records or R5-specific Figma
  visuals.

## Current Gallery Baseline

- R5 markup, fixture records, preformatted unit sets and local `unit` state all
  live inside `CeramicsStudio.tsx`; there is no independently reusable
  Dimensions artwork/fixture boundary.
- The renderer always emits a `section[aria-label="Object dimensions"]`, but the
  label is fixture markup rather than a contract property. A self-contained
  native `dl` needs no invented landmark, and a parent product section may
  already supply context.
- Required measurements can be disabled in Studio, leaving visual and unit
  controls without a useful active measurement result. The renderer does not
  fail closed for a missing required slot.
- Studio hardcodes metric and imperial-like strings and swaps them in response
  to local state. That fixture behavior visually resolves the open conversion
  question even though ADR 0083 deliberately does not.
- The optional unit choice is two buttons with independent
  `aria-pressed` states. The Studio wrapper has an `aria-label` but no group
  role; MDX adds `role="group"`, so static and runtime semantics already drift.
  The model has no native exclusivity or radio arrow-key behavior and duplicates
  canonical Segmented Control.
- The `dl` uses valid `dt`/`dd` content, but Studio-only wrappers provide
  `display: contents`; canonical CSS and MDX use a different child shape.
- The visual is an editorial product photo with one detached `24 cm` badge,
  not a clear measurement diagram. The runtime alternative calls it a bowl
  silhouette although the asset is a studio photograph.
- Canonical image opacity is `0.2`; Studio overrides it to `1`, adds the 4:3
  crop, padding, max width, label surface and absolute label position. R5's
  actual composition therefore belongs partly to site CSS instead of canonical
  CSS.
- Canonical CSS uses hardcoded `16/4/12/320px`, raw `500`, calculated 75%/87.5%
  type and physical width/height/margin/gap properties. It has no named
  container, two-region response, long-value strategy or forced-color visual
  boundary.
- Current historical evidence contains paired Exhibit/Studio Desktop and
  Mobile captures under `output/playwright/parity/ceramics/`. The natural
  baseline looks visually consistent because both modes now route through the
  category renderer, but the component still has local markup and site-owned
  composition.
- Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
  and inspector `1020:480`. Those same registered nodes were inspected in the
  current Ceramics program and show generic Button/Studio surfaces rather than
  R5 measurement anatomy, unit states or visual approval.
- Baseline R5 CSS is `1,731 B` raw / `674 B` gzip, SHA-256
  `20c145955e127ec116439ab0355c822eb90477636e9cd5fa5e279777221d56db`.
  Ceramics CSS is `29,320 B` raw / `4,664 B` gzip against the permanent
  `5,427 B` ceiling. Neutral Web components CSS is `519,152 B` raw /
  `70,129 B` gzip. Shared runtime is `53,811 B` raw / `10,565 B` gzip; R5
  owns no neutral script outside the docs fixture.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| [HTML `dl`](https://html.spec.whatwg.org/dev/grouping-content.html#the-dl-element) | `dl` represents association-list name/value groups; a group may be wrapped in `div` without changing semantics. | Render required measurements as one native `dl` with direct grouped `dt`/`dd` pairs. Do not use an ARIA grid for passive content. |
| [WAI-ARIA APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | One group owns mutually exclusive checked state, name and Arrow/Space navigation. | An active unit choice is a single-choice control; compose canonical native radio-backed Segmented Control. |
| [WAI-ARIA APG Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | `aria-pressed` describes each two-state toggle button. | Separate pressed buttons are the wrong primitive when exactly one unit presentation must remain active. |
| [Open UI proposal model](https://open-ui.org/proposal-guide/) | Composite components contain controls whose own model, parts, slots, states and behavior stay distinct. Open UI has no standardized measurement-display control. | Keep R5's passive measurement anatomy separate from the canonical single-choice control and from target conversion/data logic. |
| [BIPM SI Brochure 9th ed., v4.01](https://www.bipm.org/documents/d/guest/si-brochure-9-en-pdf) | A quantity value is a number multiplied by a unit; the quantity must be clearly described; the number precedes the unit with a separating space (apart from plane-angle exceptions). | Targets provide complete formatted strings such as `12 cm`; R5 keeps the quantity label visible and does not concatenate or reinterpret units. |
| [Radix Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group) | One controlled/uncontrolled value represents exclusive choice with consistent keyboard semantics. | Framework targets may map canonical Segmented Control to a radio-group primitive, not duplicate button booleans in R5. |
| [Radix Toggle Group](https://www.radix-ui.com/primitives/docs/components/toggle-group) | Single toggle groups can still become empty unless consumers explicitly control and reject an empty value. | A display unit should always have one active option; native radios provide a stronger default than independent toggles. |
| [Polaris Choice List](https://shopify.dev/docs/api/app-home/web-components/forms/choice-list) | Single selection is represented by labelled radio choices with selected/default-selected controlled or uncontrolled values. | Shopify can compose a native/Polaris single-choice surface if unit switching is approved; R5 remains responsible only for the surrounding measurement presentation. |

Consensus exists on native name/value semantics, complete visible quantity and
unit text, one exclusive value for a unit choice and separating data conversion
from presentation. There is no consensus or accepted project decision on a
universal product-dimension schema, canonical quantity storage, allowed unit
systems, rounding, tolerance, diagram requirements or whether every R5 consumer
needs a unit control.

## Matches, Differences And Direction

- ADR 0083's three-slot boundary is appropriately conservative and should be
  retained while the source model remains open.
- Preserve the current visual plus text-list concept, but make the textual
  `dl` authoritative and the visual genuinely explanatory rather than a faded
  photo with a detached badge.
- Keep one complete active target-formatted set. A docs target may select among
  separately authored sets without claiming that R5 performed conversion.
- Replace the duplicate pressed-button group with canonical Segmented Control.
  Its visible legend should name the choice; concise option text identifies the
  unit or system.
- Remove R5's selected-unit state from its contract. The canonical control owns
  its input state; the target coordinates content replacement.
- Do not add an automatic live region. The selected native radio is announced;
  targets that have a user-research-backed need to announce replaced results
  must own concise, non-duplicative status policy.
- Replace raw type scales and physical layout with existing semantic tokens,
  logical properties, intrinsic containment and named component response.
- Remove Studio-only visual/layout overrides after canonical CSS and one shared
  renderer own the complete specimen.

## Candidate Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes when measurements valid | generic `.dimensions` container | R5 | No invented section landmark or widget role. Contextual headings remain parent/target content. |
| Visual | no | target-owned `.dimensions__visual`, usually native `figure`/image/SVG | target | Must have truthful text alternative when informative; exact values remain in text. |
| Visual annotations | no | redundant visible text/lines, assistive-hidden when fully duplicated | target | Coordinates and marker style are private visual composition. |
| Content | yes | `.dimensions__content` | R5 | Groups optional control and required list without adding semantics. |
| Measurements | yes | `dl.dimensions__table` | R5/target | One active coherent formatted set. |
| Measurement group | repeated | `div.dimensions__measurement > dt + dd` | R5 | Stable visual grouping; valid native association-list structure. |
| Formatted value | per group | `dd > bdi.dimensions__value` | target | Complete formatted string including unit/qualifier; no parsing or conversion. |
| Unit choice | no | canonical Segmented Control fieldset/legend/native radios | target + canonical dependency | One checked value; target coordinates active set. |

## State, Variant, Size And Mode Matrix

| Dimension | Candidate direction |
| --- | --- |
| Default | Required passive textual measurement set, no unit interaction required. |
| Visual absent/present | Content expands naturally; no blank visual track. |
| Unit control absent/present | One formatted set only, or canonical single-choice control with target-owned replacement. |
| Selected unit | Canonical radio checked state only; not duplicated as R5 state or button `aria-pressed`. |
| Missing/invalid measurements | Omit the complete R5 root; omit incomplete peers. |
| One/many measurements | One or more complete `dt/dd` groups; no prescribed quantity inventory. |
| Wide host | Visual and content may form two intrinsic regions when visual exists. |
| Narrow host | One logical column; complete visual and list without viewport assumptions. |
| Keyboard | Passive R5 adds none; canonical radios own Tab, Arrow and Space. |
| Controlled/uncontrolled | R5 receives active content; canonical Segmented Control/target owns selected value and synchronization. |
| Long/localized/RTL | Logical geometry, `bdi` isolation and full wrapping; no truncation. |
| 200% text/user spacing | Visual, terms, values and control grow without clipping or overlap. |
| Dark/forced colors | Text, visual boundary, measurement divisions and radio state remain perceivable. |
| Reduced motion | R5 owns no motion; canonical control transitions become zero-duration. |

## Public API And Runtime Direction

| Property | Type | Requirement | Direction |
| --- | --- | --- | --- |
| `visual` | slot | optional | Target-owned informative visual/diagram and any redundant annotations. |
| `measurements` | slot | required non-empty | One active target-formatted native name/value composition. |
| `unitControls` | slot | optional | Canonical Segmented Control composition; target owns value and replacement. |

Do not add `value`, `defaultValue`, `selectedUnit`, raw quantities, unit enum,
conversion factor, precision, locale, formatter, tolerance, dimension keys,
coordinates, title, image source, aspect ratio, columns, breakpoint or live
message as R5 root properties. The target may maintain controlled or
uncontrolled Segmented Control state, but R5 has no independent state owner.

R5 owns no listener, observer, timer, request, persistence, announcement,
measurement algorithm or neutral script. The docs target may attach one native
radio `change` handler to choose a preformatted fixture set; that is target
evidence, not base behavior.

## Token And CSS Direction

- Keep reviewed public surface/text/border, body/body-small typography, radius,
  shadow and layout-spacing tokens actually consumed by canonical R5.
- Reuse Segmented Control's tokens rather than retaining R5 button colors,
  radius, focus and touch-target styling as a duplicate public surface.
- Keep visual ratio, annotation line thickness/position and two-region threshold
  private compositional values.
- Use logical properties, named inline-size container, `min-inline-size: 0`,
  `overflow-wrap: anywhere`, `bdi`, bounded media and intrinsic tracks.
- Give native `dl/dt/dd/figure` deterministic margins; let terms and values wrap
  without text clipping or a horizontal scrollbar.
- Move valid 4:3 visual containment, full-opacity target media and annotation
  treatment from Studio into canonical R5 CSS; remove site-owned R5 layout.
- Add forced-color visual/divider fallbacks and no R5 animation or transition.

## Target Translation

| Target | Direction |
| --- | --- |
| Neutral Web | Generic container, native `dl/div/dt/dd/bdi`, optional truthful visual and optional canonical native radio Segmented Control; zero R5 JavaScript. |
| Shopify | Planned. Product/variant metafields or metaobjects, unit system, precision, locale, merchant validation and first consumer require approval before Liquid/schema. Use platform formatting only when it matches the approved data model. |
| Webflow | CMS supplies complete formatted strings and truthful diagram content; optional unit switching needs target code and two verified complete sets. |
| React/Angular | Thin passive renderer receives active formatted records and slots; host state selects a set and canonical radio control emits the new semantic value. |
| Figma | Future component models visual absent/present, one/many measurements, control absent/present, selected unit and narrow/wide modes; current generic nodes are not R5 approval. |
| SwiftUI/Compose/future | Use native labelled value groups and a platform single-choice control; conversion and formatting remain data/domain services. |

## Evidence And Validation Plan

- Preserve the four current Desktop/Mobile parity captures as before evidence.
- Capture paired Exhibit/Studio Mobile, Tablet, Desktop and XL with one managed
  Gallery server, one explicit headless Chromium session and one tab,
  sequentially.
- Verify one shared renderer/fixture, valid required `dl` groups, generic root,
  optional visual, truthful alternative, redundant annotations and `bdi` values.
- Verify canonical Segmented Control composition, visible legend, same-name
  radios, exactly one checked value, native Arrow/Space behavior, focus,
  change-event count and target-provided complete set replacement.
- Verify controls absent, visual absent, measurements absent, one measurement,
  long values, qualifiers/tolerance, localized decimal/comma text and RTL.
- Exercise `200/320/430/680px`, effective 200% text, user spacing, dark,
  forced colors and reduced motion with zero root/part/document overflow.
- Verify values do not use an R5 live region, no computed conversion function is
  bundled, and shared runtime is unchanged.
- Validate contracts, registry dependency, Studio, docs, static previews,
  generated Web/Shopify adapters, Exhibit/Studio parity, component/refinement
  audits, JSON, diff hygiene, target copy parity and production build outside
  `site/dist`.

## Risks And Open Questions

1. Which production target first proves complete separately authored formatted
   sets, their atomic mapping and stale/error fallback without neutral
   conversion or mixing sources?
2. Which quantities belong in v1: external height/width/depth/diameter, base or
   opening diameter, capacity, weight, packed dimensions or target-defined
   arbitrary facts? Are any required?
3. How are handmade variation, approximation, tolerance, uncertainty,
   measurement method, orientation and significant figures communicated?
4. Is unit choice centimetres/inches, Metric/US customary, locale-derived,
   product-specific or target-configurable? Can it be absent, and is preference
   persisted or synchronized across R5 and future Size Chart?
5. When values change, is native selected-radio feedback plus ordinary reading
   sufficient, or does a verified target need a concise result announcement?
6. Which diagrams are informative, redundant or decorative, and who guarantees
   alt text, annotation accuracy, scale, crop, rights and correspondence with
   the active value set?
7. Which Shopify surface first consumes R5, and what product/variant data,
   dynamic source, section/block schema, editor validation and migration are
   approved?
8. Is the proposed two-region wide composition, 4:3 visual and measurement-row
   treatment approved, and where is R5-specific Figma evidence across anatomy,
   units, responsive/extreme content, RTL, themes, forced colors and print?

The safe implementation treats every active value as target-formatted content,
composes the already canonical exclusive control and removes duplicate or
site-only semantics. Owner decision 59 accepts that direction and closes the
neutral conversion question. R5 is ready for explicit human review while
remaining `pilot`.

## Current Gallery Result

The safe direction is implemented and evidenced. `DimensionsArtwork` is the
single Exhibit/Studio renderer, `buildDimensionsFixture` supplies one active
preformatted set, and `DimensionsFixtureVisual` supplies truthful media with
redundant assistive-hidden annotations. The optional unit choice composes the
canonical native-radio `SegmentedControlArtwork`; Arrow navigation changes one
checked value and the docs target replaces the complete active formatted set.
R5 itself owns no converter, duplicated selected-unit state, live region or
neutral runtime.

The canonical root now fails closed without valid measurements and supports a
visual-free or control-free form. Native `dl > div > dt + dd > bdi` structure,
logical geometry, intrinsic one/two-region response, narrow measurement-row
stacking, full text wrapping, forced colors and target-owned formatted content
are reconciled. Studio no longer owns R5 anatomy, crop or responsive rules.

Paired Exhibit/Studio Mobile, Tablet, Desktop and XL captures, direct
`200/320/430/680px` roots, one measurement, localized qualifiers/tolerance,
RTL/unbroken text, effective 200% text, user spacing, light/dark contrast,
forced colors and reduced motion pass with zero overflow. At `680px` the direct
root forms two intrinsic regions; at `200–430px` it remains one region. Exact
same-host normalized parity records DOM hash `344a7c27` and style hash
`1629a46f` in both modes.

The R5 CSS slice is `3,671 B` raw / `999 B` gzip. Ceramics CSS is `31,260 B`
raw / `4,892 B` gzip, leaving `535 B` beneath its `5,427 B` family ceiling.
Shared runtime remains byte-identical at `53,811 B` raw / `10,565 B` gzip.

Production mapping of complete formatted sets, measurement inventory,
qualification and stale/error policy, announcement need, diagram policy,
Shopify consumer/data/editor mapping, final visual values, R5-specific design
evidence and explicit human review remain open. Precision, rounding,
localization, tolerance, available unit sets and persistence are accepted as
target-owned rather than neutral R5 API. R5 stays `pilot` and is not promoted
to `stable`.
