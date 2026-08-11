# Component Dossier: Tabs

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/tabs.contract.json`

## Recommendation

Keep v1 Tabs horizontal and preloaded, add a required accessible group label,
required repeated item composition, explicit automatic/manual activation mode,
and per-tab disabled state. Preserve per-item `selected` as the cross-target
semantic state while targets translate it to controlled `value`/default value
APIs and one change event. The shared renderer must distinguish focused from
selected state in manual mode, implement roving tabindex, skip disabled tabs,
and make text-only panels reachable from the tab sequence.

Vertical orientation, closable/reorderable tabs, routing, lazy loading, and
responsive conversion to Accordion are meaningful but product/architecture
extensions; they are not inferred for v1.

## Purpose And Limits

- Switches among related peer panels in the same local context while showing
  exactly one panel at a time.
- Useful for compact detail categories, settings groups, or instant local views.
- Not primary site navigation, sequential steps, mutually exclusive form input,
  or unrelated destinations; use navigation, Stepper, Radio, or Segmented Control.
- Panel content must be available with negligible latency for automatic
  activation. Async/lazy content requires manual activation or a loading design.
- Item creation/deletion, closable tabs, routing/history, and tab persistence are
  target/application responsibilities.

## Current Gallery Baseline

- Registry `B7`, Layout, no dependencies; contract `0.2.0`, `pilot`.
- Four anatomy parts, one horizontal default variant, one size, five states,
  three behaviors, one per-tab `selected` property, and ten public tokens.
- MDX has correct roles/relationships, one selected tab, roving tabindex, and
  hidden inactive panels, but no runnable behavior in the raw Preview.
- Shared `DisclosureNavigationStudio` implements click, automatic arrow/Home/End
  selection, roving tabindex, and panels. It lacks a public group label, manual
  activation mode, disabled state, direction-aware horizontal keys, and panel
  `tabindex=0` for text-only content.
- CSS has physical padding, selected color via a hardcoded 70% color mix, no
  disabled treatment, and horizontal overflow. It does not declare container
  containment but already follows available width.
- Studio reference metadata points to a shared generic frame, so the existing
  Gallery underline treatment is the owner baseline rather than evidence for new
  orientations or variants.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) | Requires labelled tablist, linked tab/panel roles, exactly one selected tab, roving focus, arrow navigation, hidden inactive panels, and panel focusability when content is not initially focusable. Automatic activation is recommended only without latency. | Add label and activation mode; separate focus/selection for manual mode; make fixture panels tabbable. |
| [APG automatic example](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/) | Preloaded panels activate on focus and the tabpanel enters the Tab sequence when its content is not otherwise focusable. | Keep automatic default for the preloaded Gallery fixture and add `tabindex=0` to its panels. |
| [Open UI Tabs research](https://open-ui.org/components/tabs.research.markup/) | Implementations must coordinate focus, ARIA, showing/hiding, and natural reading order; attribute-only labels reduce composition flexibility. | Keep explicit list/tab/panel anatomy and target behavior rather than reducing tabs to a styling class. |
| [Radix Tabs](https://www.radix-ui.com/primitives/docs/components/tabs) | Supports controlled/uncontrolled value, horizontal/vertical orientation, automatic/manual activation, disabled triggers and full keyboard behavior. | Adopt label, activation and disabled semantics; defer orientation until Gallery accepts the visual/API mode. |
| [Shopify POS Tabs](https://shopify.dev/docs/api/pos-ui-extensions/latest/web-components/layout-and-structure/tabs) | Exposes `value`, `defaultValue`, change event, tab `controls`, panel id, disabled state and accessible label. | Translate the neutral selected-state contract to host value/change APIs; preserve id relationships. |

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | neutral set wrapper | Tabs | Coordinates one selected value. |
| List | yes | `role="tablist"` | Tabs/target | Requires accessible label. |
| Tab | yes | native Button + `role="tab"` | Tabs/target | Repeatable; one selected and tabbable. |
| Panel | yes | `role="tabpanel"` | Tabs/consumer | Paired by ids; inactive panels hidden. |

No canonical component dependency is registered. Native Buttons implement the
tab widget role and are not visually composed Gallery Button components.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant/size | One horizontal underline treatment and one default density. |
| Selection | Exactly one selected tab and visible panel. |
| Focus | Independent visible focus state; roving tabindex leaves one tab tabbable. |
| Hover | Text emphasis without implying selection. |
| Disabled | Skipped by pointer/keyboard selection and roving navigation. |
| Automatic | Focus movement immediately selects preloaded panel; v1 default. |
| Manual | Arrow/Home/End move focus; Enter/Space/click selects. |
| Overflow | Horizontal list scrolls without shrinking labels. |
| RTL | Visual/source direction inherited; key order must follow rendered direction. |
| Reduced motion | Color/border transitions removed. |
| Forced colors | Selection and focus remain separate system-color signals. |

Vertical, closable, reorderable, lazy/async, and responsive Accordion modes are
unsupported in v1 rather than silently approximated.

## Public API And State Ownership

- `label` — required accessible name for the tablist.
- `items` — required slot containing paired tab/panel compositions.
- `selected` — per-tab boolean semantic state; exactly one must be true.
- `activationMode` — `automatic | manual`, default `automatic`.
- `disabled` — optional per-tab boolean, default false.
- Required target facts: stable tab/panel ids, `aria-controls`,
  `aria-labelledby`, `aria-selected`, roving `tabindex`, and `hidden`.
- Selection emits one target change event. Framework/host adapters translate the
  item states to `value/defaultValue/onValueChange` without making a particular
  string model mandatory in the neutral contract.
- When no selected value is supplied in an uncontrolled target, select the first
  enabled item. Zero items or all-disabled items are invalid for this v1 contract.
- Adding/removing/reordering/routing tabs is outside the base public API.

## Token And Value Audit

- Public: subtle border, secondary/primary/accent/disabled text, focus border,
  fast transition, easing, body type/line height, and element spacing.
- Private: tab block/inline padding, negative underline alignment, selected color
  composition, scrollbar behavior, and focus inset are layout details.
- Current `12px 20px`, `2px`, weights, and 70% color mix are hardcoded. Derive
  spacing from existing element tokens and keep any contrast-preserving mix in a
  named private variable rather than public API.
- No assets, image, observer, measurement, or neutral runtime is required.

## Visual And Content Audit

- Preserve the horizontal track, restrained underline, neutral text hierarchy,
  and visible inward focus ring.
- Long/localized labels remain single-line and scroll horizontally; the active
  tab should be scrolled into view by capable targets without continuous reads.
- Panels accept arbitrary flow content. Text-only fixture panels need stable
  typography and no inherited paragraph margins from site presentation.
- Empty labels/panels and duplicate ids are invalid. Extreme panel content must
  wrap and remain within its container.

## Accessibility And Interaction

- Label the tablist; link every tab/panel pair in both directions; expose exactly
  one selected tab; hide every inactive panel.
- `Tab` enters the selected tab, then leaves the composite for the active panel
  or its first focusable descendant. ArrowLeft/Right wrap among enabled tabs;
  Home/End jump to first/last enabled.
- Automatic mode selects on focus. Manual mode moves focus only until Enter,
  Space, or click. Disabled tabs are skipped and never selected.
- Text-only panels receive `tabindex=0`. Do not add it when an appropriate first
  focus target already exists unless target consistency requires it.
- Test focus vs selection contrast, forced colors, reduced motion, RTL keys,
  overflow, and screen-reader role/name/state relationships.

## Responsive And Performance

- Test 320/768/1440/1920, many and long labels, localized/RTL labels, text-only
  and interactive panels, and active-tab overflow.
- Neutral runtime budget is `0 B`; target adapters own event coordination. Local
  Studio behavior remains docs-only.
- Final Batch 14 measurement is Layout `5,144 B`, shared runtime `10,321 B`,
  and Web components `60,996 B` deterministic gzip. ADR 0099 records the Layout
  family's `229 B` provisional-ceiling exception; neutral runtime delta is `0 B`.
- No continuous observer/layout reads. Optional `scrollIntoView` occurs only when
  selection/focus changes and only in target adapters that need it.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | APG roles, ids, roving tabindex, hidden panels, target selection handler. | Canonical CSS and docs behavior evidenced; production handler target-owned. |
| Shopify | Map to host Tabs value/defaultValue/change/controls/id where supported; theme targets use neutral contract and JS. | Host-capability dependent. |
| React / Angular | Controlled/uncontrolled value, activation mode, disabled items and change event. | Planned. |
| Figma | Root/list/tab/panel anatomy with selected/focus/hover/disabled states and horizontal overflow note. | Planned. |
| SwiftUI / Compose | Platform tab selection/value with accessibility labels; avoid using app-level tab bars for local content. | Planned. |

## Exhibit And Studio Parity

The single `DisclosureNavigationStudio` renderer and three-item fixture now
serve Exhibit and Studio. Label, activation, selected and disabled controls map
to the contract; manual mode keeps focus and selection separate. Site-only rules
size the fixture and normalize fixture paragraphs without recreating Tabs CSS.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Tablist label is fixture-only, not contract API. | high | Add required `label`. | implementation |
| Selected boolean alone does not describe group interaction. | high | Add activation mode and repeated items; document value translation. | implementation |
| Manual activation and disabled items are absent. | medium | Add semantics, controls, renderer behavior and tests. | implementation |
| Text-only panel is skipped in Tab sequence. | medium | Add panel `tabindex=0` in fixture/markup guidance. | implementation |
| Vertical/routing/closable modes lack owner direction. | non-blocking | Keep explicitly unsupported for v1. | owner/architecture later |

## Evidence And Validation

- Before reconstruction: desktop Exhibit/Studio files under
  `output/playwright/refinement-batch-14/before-reconstructed/`, explicitly not
  claimed as contemporaneous live captures.
- After: eight canonical viewport captures plus automatic/manual selection,
  disabled skipping, arrows/Home/End/Enter, RTL, panel focus, localized 320px
  overflow, dark, forced-colors/reduced-motion, contrast, and parity evidence.
- Validation covers docs/contracts/Studio, structural/preview/parity/refinement
  audits, synchronized Web/Shopify/Webflow outputs, TypeScript, temporary build,
  deterministic performance, and whitespace.

## Risks And Open Questions

1. Vertical orientation would require a new visual mode and target mappings; it
   remains an owner/architecture decision rather than an inferred variant.
2. Routing, lazy loading, persistence, close/reorder, and responsive conversion
   each need distinct application semantics and are not v1 promises.
3. The existing generic owner frame does not settle selected underline thickness,
   padding, or scroll affordance; these remain human visual-review points.

## Readiness Decision

Ready for explicit human review; remains `pilot`. Vertical/routed/closable/lazy
modes, production target testing, scroll affordance, and visual approval remain.
