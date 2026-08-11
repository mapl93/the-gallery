# Component Dossier: Steps / Stepper

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/steps.contract.json`

## Recommendation

Define Steps v1 as a passive ordered progress indicator for a known linear
process. Render a labelled `<ol>` with one `<li>` per step, use exactly one
`aria-current="step"` when a current step exists, expose completed state in text
as well as color/checkmark, and keep source order identical in horizontal and
vertical modes. Remove `aria-orientation` from the ordinary list: it is not a
supported property for `<ol>` and visual orientation does not change list
semantics.

Keep `orientation` as the only scalar property. Labels, descriptions, count and
per-item current/completed/upcoming state are consumer-owned ordered content.
Interactive workflow navigation is a composition of canonical Link/Button plus
application validation/routing, not an implicit capability of every Step.

## Purpose And Limits

- Communicates position and progress through a finite, ordered, linear process.
- Helps users understand completed, current and upcoming work in checkout,
  onboarding or multi-step forms.
- Passive by default and complements, rather than replaces, Back/Next controls,
  headings, validation and page titles.
- Not a percentage Progress bar, Timeline, Tabs, Breadcrumb, checklist or workflow
  state machine.
- Use only when the sequence and count are stable enough to help; conditional or
  freely ordered tasks need a different pattern.

## Gallery Baseline Before This Batch

- Registry `B14`, Layout, no dependencies; contract `0.2.0`, `pilot`.
- Canonical CSS supports horizontal/vertical presentation, generated connectors,
  current and two synonymous completion modifiers (`completed`/`done`).
- Physical left/right/top geometry, hardcoded dimensions/spacing and calculated
  type sizes do not handle RTL, localized wrapping or forced colors robustly.
- `SequenceViewportStudio` correctly renders an ordered list and current step,
  but adds invalid/unnecessary `aria-orientation` to `<ol>` and hides the only
  completed-state text/checkmark from assistive technology.
- MDX examples use generic `div` markup rather than the semantic ordered-list
  implementation, breaking documentation parity.
- The Studio design reference is shared rather than component-specific.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA 1.2 `aria-current`](https://www.w3.org/TR/wai-aria-1.2/#aria-current) | `aria-current="step"` identifies the current item in a step-based process; only one item in a related set should be current. | Use one current list item and no custom step role. |
| [W3C Multi-page Forms tutorial](https://www.w3.org/WAI/tutorials/forms/multi-page/) | Multi-step processes expose progress, logical page titles and validation while preserving usable previous/next navigation. | Steps supplements the workflow; it does not own form routing or validation. |
| [WCAG 2.2 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | Dynamic progress/status changes may need programmatic status semantics when they communicate results without moving focus. | Do not add an unconditional live region; the owning workflow announces meaningful dynamic changes when required. |
| [Carbon Progress Indicator](https://carbondesignsystem.com/components/progress-indicator/usage/) | Separates completed/current/not-started states, horizontal/vertical layouts and optional interactive navigation; recommends linear stable processes and clear labels. | Adopt clear passive states and orientations; defer interactive navigation and error breadth beyond accepted v1 scope. |
| [Carbon Progress Indicator accessibility](https://preview.carbondesignsystem.com/building-blocks/core/components/progress-indicator/accessibility) | Visible labels should be concise and include each step's state; meaningful sequence and focus order matter. | Completion/current meaning must not rely on color or a hidden icon alone. |
| [Shopify Setup Guide](https://shopify.dev/docs/api/app-home/patterns/compositions/setup-guide) | Polaris composes progress tracking with expandable onboarding tasks and explicit completion data rather than treating one indicator as the whole workflow. | Shopify should compose Steps with canonical task controls/data; Steps remains the passive progress surface. |

## Matches, Differences, And Direction

- Gallery already has the right primitive boundary, ordered sequence and two
  visual orientations.
- It differs by exposing completion only visually, duplicating completion naming,
  and using physical geometry that does not survive RTL or long content.
- The contract overreaches by recommending `aria-orientation` on an ordinary list.
- Direction: semantic ordered-list refinement and robust logical layout, without
  turning Steps into a router, validator or interactive tablist.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | labelled `<ol>` | Steps/consumer | Preserves logical order in every visual mode. |
| Item | yes | `<li>` | Consumer | Owns one ordered step and its state. |
| Connector | no | generated decorative line | Steps | Hidden from accessibility tree; not the sole state cue. |
| Indicator | yes | decorative number/check plus hidden state text as needed | Consumer/Steps | Number may remain visible; completion is announced textually. |
| Title | yes | concise step label | Consumer | Primary accessible content. |
| Description | no | supplemental text | Consumer | Replaces the ambiguous duplicate `label` alias as canonical secondary copy. |
| State text | no | visually hidden or visible text | Consumer/target | Adds completed/current/upcoming meaning where label/context alone is insufficient. |

Keep `.steps__label` as a compatibility alias during migration, but make
`.steps__title` and optional `.steps__description` the canonical content parts.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Orientation | `horizontal` default and `vertical`; visual only, same ordered semantics. |
| Size | One readable density; no public size enum. |
| Upcoming | Neutral indicator/connector and primary readable label. |
| Current | Exactly one `aria-current="step"` and primary color/weight cue. |
| Completed | Canonical `completed` modifier, checkmark plus textual state; `done` remains compatibility alias only. |
| No current | Allowed for a wholly upcoming or wholly completed static summary when labelled clearly. |
| Interactive composition | Consumer may place canonical links/buttons inside items only with explicit workflow rules; not default behavior. |
| Horizontal narrow | Wrap/scroll or target switch to vertical without reordering or page overflow. |
| Vertical | Logical connector and text alignment in LTR/RTL. |
| Localized/extreme | Labels/descriptions wrap; long words break safely; many steps remain ordered. |
| Forced colors | Current/completed/upcoming and connector boundaries remain distinguishable without color alone. |
| Reduced motion | No required motion or runtime. |

## Public API And State Ownership

- `orientation`: `horizontal | vertical`, direct class mapping accepted by ADR
  0019. It changes layout only.
- Ordered step collection, visible labels/descriptions, number/count and each
  item's upcoming/current/completed state remain consumer data/content.
- Targets may expose a typed Step collection and controlled current index, but
  these adapter conveniences must serialize to the same semantic list.
- Workflow routing, validation, step skipping, branching, async completion,
  navigation events and dynamic announcements belong to the owning application.
- Interactive steps require native Links/Buttons and their normal focus behavior;
  do not add roving arrow-key semantics to a passive list.

## Token And Value Audit

- Existing source tokens cover primary/subtle/secondary text, subtle/primary
  borders, primary surface, full radius, body/caption typography and spacing.
- Registry/contract currently declare only body size despite consuming multiple
  colors and geometry tokens; reconcile exact actual references.
- Current `28px`, `12px`, `24px`, `2px` and calculated `.75/.875` type sizes are
  hardcoded/private. Use semantic type/spacing tokens and private indicator/
  connector geometry; do not create a public component token for each dimension.

## Accessibility And Interaction

- Use a labelled ordered list; do not add a custom `step`, `listbox`, `tablist` or
  `aria-orientation` role/property to the passive root.
- Exactly one current item uses `aria-current="step"` when applicable.
- Completed/current/upcoming meaning appears through shape/text in addition to
  color. A decorative check can stay `aria-hidden` only when equivalent state text
  is available to assistive technology.
- Source/DOM order remains the process order in both orientations and RTL.
- Passive Steps has no keyboard interaction or focus stops. If items become links
  or buttons, their native semantics, names, focus rings and workflow constraints
  must be certified by the owning target.
- Dynamic changes that qualify as status messages are announced by a stable
  workflow-owned live region; the static component should not speak on every
  render.

## Responsive And Performance

- Capture Exhibit/Studio at 390/768/1280/1600 for horizontal and vertical modes,
  plus long localized RTL, many steps, dark and forced colors.
- Horizontal layout must remain inside its container; allow readable wrapping or
  target-local overflow while preserving order. Vertical layout uses logical
  connector geometry and text alignment.
- Batch 18 begins at Layout `5,845 B`, Web component CSS `62,398 B` and shared
  runtime `10,321 B` deterministic gzip. Steps adds no runtime and requires no
  motion listener.
- CSS growth should be offset by removing aliases/duplicated physical rules where
  possible; Layout is already `930 B` over its provisional family ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Labelled `<ol>/<li>`, `aria-current="step"`, state text and logical CSS. | CSS, semantics, logical layout and overflow are evidenced. |
| Shopify | Liquid ordered step data inside checkout/onboarding compositions; workflow owns routing and validation. | Planned; no dedicated Liquid primitive. |
| React / Angular | Typed ordered collection and current/completed data adapter, rendering the same semantic list. | Planned. |
| Figma | Horizontal/vertical variants and upcoming/current/completed component states with long-copy examples. | Planned. |
| SwiftUI / Compose | Ordered progress content with equivalent current/completed semantics; native navigation only when explicitly composed. | Planned. |

## Exhibit And Studio Parity

`SequenceViewportStudio` is the single renderer and fixture. Exhibit and Studio
now share the same ordered list, current/completed state text, labels and
orientation. MDX examples use that canonical semantic anatomy; site CSS sets
preview width only and does not redefine the component.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| `aria-orientation` is applied to an ordinary ordered list. | resolved | Removed; orientation remains visual class/state. | implementation |
| Completion is hidden from assistive technology and relies on visual styling. | resolved | Equivalent completed state text accompanies the decorative check. | implementation |
| MDX uses non-semantic `div` examples. | resolved | Examples use the shared ordered-list anatomy. | implementation |
| Physical geometry fails RTL/localized containment. | resolved | Logical properties, wrapping and container-safe overflow are present and evidenced. | implementation |
| `completed` and `done` duplicate the same state. | resolved | `completed` is canonical; `done` remains a documented compatibility alias only. | implementation |
| Interactive workflow/error breadth lacks accepted scope. | non-blocking | Keep passive v1; compose target controls later. | owner/product later |

## Evidence And Validation

- Fourteen after images include eight canonical Exhibit/Studio × four-viewport
  captures plus vertical, RTL/long, two eight-item overflow positions, dark, and
  forced-colors cases; two live desktop before images remain.
- The root is an `OL`, exactly one item has `aria-current=step`, completion has
  text equivalence, and `aria-orientation` is absent. Vertical width is
  `280/280px`; its last connector terminates correctly.
- Arabic RTL measures `326/336px` client/scroll width. Eight steps measure
  `326/896px`, use `overflow-x:auto`, and reach the exact `570px` scroll maximum
  without page overflow or process reordering.
- Current/upcoming/description contrast is `17.93:1`/`7.81:1`/`7.81:1` light
  and `17.18:1`/`12.09:1`/`12.09:1` dark. Current/completed indicator text is
  `10.37:1` light and `17.93:1` dark. Root/item motion is `0s` and no listener
  is installed; browser errors/warnings are 0.
- Contract `0.3.0`, registry, Studio metadata, semantic MDX, canonical/copied
  CSS, Neutral Web, Shopify, TypeScript, program audits and temporary docs build
  pass in Batch 18. Deterministic gzip ends at Layout `6,357 B`, Web components
  `62,893 B`, runtime `10,321 B` with a `0 B` runtime delta.

## Risks And Open Questions

1. Exact indicator size, connector weight, spacing, label scale, completed icon and
   horizontal overflow policy lack a component-specific owner visual and need
   human approval.
2. Whether interactive backward navigation or error/disabled states belong in a
   future Steps scope is a product decision, not inferred from Carbon.
3. Automatic horizontal-to-vertical switching would be target/container policy;
   exposing it as neutral API requires an accepted responsive decision.

## Readiness Decision

Implementation, cross-target documentation, browser evidence and automated
validation are complete for explicit human review. Visual approval, future
interactive/error-scope decisions and any `stable` promotion remain pending. The
contract stays `pilot`.
