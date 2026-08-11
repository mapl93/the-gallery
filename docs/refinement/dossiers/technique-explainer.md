# Component Dossier: Technique Explainer

Status: `human-review-ready`

Date: 2026-08-11

Registry: `R3` / `technique-explainer`

Dependency order: 128, phase 6 (Composed components), depth 0

## Recommendation

Keep Technique Explainer as a passive editorial sequence, not a progress bar,
stepper, timeline, carousel, disclosure, tab set, or task-status widget. Exhibit
and Studio should render one shared target-authored ordered list whose direct
items each contain required step text and optional contextual media. The neutral
component owns document semantics and layout only; it does not own completion,
current-step state, navigation, workflow control, persistence, or analytics.

Use `ol.technique-explainer__steps > li.technique-step` so order remains
programmatically meaningful even when the visible decorative number is hidden.
Each valid step requires a non-empty name and description. The visible number is
a derived presentation of the native ordinal, marked `aria-hidden`, not a target
record field or source of truth. Use a named native `section` only when the
optional title exists; otherwise use a generic `div`. Omit the complete root
when no valid steps remain.

Preserve text-before-supporting-media source order inside every step. On wide
component containers, alternate the media side for scanning rhythm; on narrow
containers, stack text then media. This visual reordering is permitted by ADR
0083 only because the text is a complete meaningful step and the media is
supporting context. It must never alter step order or produce a second reading
sequence. Container queries, not the global viewport or Studio-only CSS, own the
responsive boundary.

Owner decision 57 confirms contract version `0.3.0`: keep optional `title` and
required non-empty `steps` as the root API; require `name` and `description` as
the stable per-step core; and allow optional target-composed `details` and
`media` inside each record. Details may express reviewed materials, duration,
temperature, tools, links or other native content without converting those
possibilities into neutral fields. Safety warnings and precautions use
separately reviewed rich content or canonical Alert composition, never an
arbitrary untyped detail.

Keep status `pilot`. Do not expose records, numbering format, media placement,
alternating side, breakpoint, grid tracks, padding, radius, heading rank or
target-specific detail fields as root properties. Do not promote R3 to
`stable` without explicit human review.

## Purpose And Limits

- Explains a process, technique, or craft sequence whose order affects meaning.
- Keeps every step understandable from visible text and native list order.
- May add target-composed reviewed details and contextual media per step when
  they improve understanding.
- May show a derived visual ordinal without duplicating the ordinal in target
  data.
- Does not represent live task completion, loading progress, account onboarding,
  checkout progress, selected/current state, elapsed time, or workflow status.
- Does not provide next/previous controls, deep links, disclosure, selection,
  tracking, editing, persistence, announcements, or keyboard interaction.
- Does not define a ceramics process schema, canonical vocabulary, instruction
  depth, safety guidance, firing facts, duration, tools, materials, or claims;
  those remain target content inside bounded native composition.
- Does not expose purely compositional choices such as alternating side, local
  measure, image ratio, gaps, divider placement, number scale, or breakpoint.

## Accepted Source Facts

- The repository is the source of truth; Figma supplies evidence and remains a
  future target.
- ADR 0083 accepts ordered steps, text, optional media, and visual alternation
  that never changes source reading order.
- Owner decision 57 accepts the stable name/description core, optional
  target-composed details and media, and the separate reviewed-rich-content or
  canonical-Alert boundary for safety warnings and precautions.
- The contract exposes optional `title` and required target-owned `steps`, has
  no dependencies, and remains `pilot`.
- The current MDX says step name and explanation are required, while title,
  visible number, and media are optional.
- The component goal requires Exhibit and Studio to share one renderer, fixture,
  canonical CSS, and implementation.
- No accepted decision makes R3 interactive, assigns progress state, authorizes
  a ceramics record schema, creates a Shopify section, or approves R3-specific
  Figma visuals.

## Current Gallery Baseline

- The shared Ceramics renderer keeps a local fixture inside
  `CeramicsStudio.tsx`; R3 has no independently reusable artwork/fixture boundary.
- The root is always a native `section` with `aria-labelledby`, but its title is
  optional. Clearing the title leaves a dangling label reference and an unnamed
  section.
- Repeated steps are standalone `article` elements with no native collection or
  ordered-list relation. Their large `01`/`02`/`03` text is `aria-hidden`, so
  assistive technology receives no programmatic ordinal sequence.
- The fixture stores formatted numbers as content records. That duplicates list
  position, makes reordering error-prone, and silently defines zero-padding as
  target data.
- CSS declares two equal columns and claims alternation, but
  `.technique-step:nth-child(even) .technique-step__media { order: 2; }` leaves
  media after content, its existing position. Wide steps therefore do not
  actually alternate.
- A viewport `max-width: 767px` query controls stacking. Studio adds a separate
  `ceramics-stage` query at `680px` and a fixture-only media minimum height, so
  Exhibit/Studio layout can depend on consumer CSS rather than the canonical
  component alone.
- CSS uses hardcoded `32/12/8/1px`, physical padding/margin/width, a raw `1.65`
  line height, a `1.5x` heading calculation, and a 50% transparent text mix for
  visible numbers. It has no scoped private composition variables, list reset,
  named container, or explicit long-text containment for every part.
- The current default photos do not truthfully illustrate their labels. The
  “Prepare” image shows surface painting, “Form” shows finished tableware, and
  “Finish” shows wheel forming. Generic alternatives such as “Prepare stage of
  the ceramics process” assert a relationship the image does not show.
- Current Desktop references show the first step as text-left/media-right with
  an oversized portrait image and generous empty space. Mobile references stack
  text then portrait media and preserve strong number/name hierarchy. They do
  not establish a real alternating wide layout or approved Tablet/XL behavior.
- Existing before evidence contains only paired Exhibit/Studio Desktop and
  Mobile captures under `output/playwright/parity/ceramics/`. It does not cover
  optional title/media, missing/invalid steps, one step, intrinsic hosts,
  long/localized/unbroken text, RTL, text zoom/user spacing, dark, forced
  colors, reduced motion, native sequence semantics, or exact same-host parity.
- Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
  and inspector `1020:480`. Direct inspection in the current program found a
  generic Button detail and Studio shell, not R3-specific anatomy or visual
  approval.
- Baseline R3 CSS slice is `1,414 B` raw / `574 B` gzip, SHA-256
  `a5714689f3fd15b21fe5563cd23d1416e13e9230675c6977377f72df1bbda1b9`.
  Ceramics CSS is `27,027 B` raw / `4,479 B` gzip against the permanent
  `5,427 B` family ceiling. Neutral Web component CSS is `516,859 B` raw /
  `69,945 B` gzip. Shared runtime is `53,811 B` raw / `10,565 B` gzip. R3 owns
  no neutral listener, state, observer, timer, request, or script.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| [HTML `ol`/`li`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element) | `ol` represents intentionally ordered items whose changed order changes document meaning; its items are direct `li` children in tree order. | Use a native ordered list and direct list items; do not infer sequence only from decorative numbers. |
| [WCAG Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html) | When presentation order affects meaning, one correct reading sequence must be programmatically determinable; ordered lists are meaningful sequences. | Preserve authored step order in DOM and ensure visual composition never implies a conflicting step order. |
| [WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/) | Informative media needs a concise contextual alternative; decorative media uses `alt=""`; the content author decides from purpose and context. | Target media carries truthful context-specific alt or empty alt. Fixture photos must match their adjacent step rather than receive invented generic claims. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines interactive widgets and has no passive “technique explainer” or editorial stepper pattern. Progress values are a separate range-widget concern. | Prefer native document/list semantics and zero keyboard model, ARIA widget role, focus management, or live state. |
| [Open UI List research](https://open-ui.org/components/list.research/) | Surveyed lists may be ordered and may contain compound text/image surfaces; selection is a separate optional concept. | R3 is an ordered compound-content list without selection. Its layout can be rich without becoming a widget. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | Systems use divergent names around progress/steps, while native `ol` remains the web semantic for ordered content. | Do not import a vendor “stepper” contract when the accepted use is passive explanation. |
| [Radix Progress](https://www.radix-ui.com/primitives/docs/components/progress) | `Progress.Root`/`Indicator` represent measurable task completion with value/max, complete/loading/indeterminate state, and `progressbar` semantics. | R3 has no value, max, completion, loading, or current state; composing Progress would communicate false behavior. |
| [Radix accessibility guidance](https://www.radix-ui.com/primitives/docs/overview/accessibility) | Radix adds ARIA and focus behavior where a custom interactive control needs it; native elements already provide expected semantics. | Use native `ol`/`li`; add no ARIA role or JavaScript merely to mimic an interactive component family. |
| [Polaris Ordered list](https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/ordered-list) | Polaris uses ordered lists for sequential steps, procedures, and content whose order matters, with list items as required direct children. | A future Shopify adapter can project R3 through target-native ordered-list/section/media primitives without inventing workflow state. |

Consensus exists on native ordered semantics, meaningful source order, complete
text, context-dependent media alternatives, and separating passive instructions
from measurable progress. There is no consensus that a visual “step” component
must be interactive, that a step is independently reusable enough for `article`,
that formatted numbering belongs in data, or that alternating media is semantic
public configuration.

## Matches, Differences, And Direction

- ADR 0083 and the two-property contract already define the correct passive
  boundary; implementation should make that boundary executable.
- The current DOM preserves repeated source order but lacks the native ordered
  relation. Replace generic repeated articles with one `ol` and direct `li`.
- The large visible number is visually useful but semantically redundant once
  the native list exists. Derive it from index, hide it from assistive
  technology, and keep it readable in normal/forced color modes.
- Keep every step's text before its optional media in DOM. Wide visual
  alternation may move even media to the inline-start only; the step sequence
  and text explanation remain invariant.
- Replace viewport and Studio-only responsive corrections with one named
  component container and canonical query.
- Replace generic/mismatched imagery with a fixture whose visible step and actual
  photo agree, without elevating those records into the public API.

## Candidate Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes when steps valid | named `section.technique-explainer` with title; otherwise `div.technique-explainer` | R3 | Omit when no complete steps remain. No widget role. |
| Header/title | no | `header` plus contextual heading | R3/target | Visible title names section; target owns rank. |
| Sequence | yes | `ol.technique-explainer__steps` | R3/target | Direct list items preserve meaningful source order. |
| Step | repeated | `li.technique-step` | R3 | Complete item; not independently named `article` by default. |
| Content | per step | `div.technique-step__content` | R3 | Always precedes optional media in DOM. |
| Visual ordinal | no | `span.technique-step__number[aria-hidden=true]` | R3 | Derived from item index; native list owns semantic ordinal. |
| Name | per step | contextual heading | target | Non-empty visible action/phase name. |
| Description | per step | paragraph/content slot | target | Non-empty complete explanation; no clamp. |
| Details | no | `div.technique-step__details` containing target-native semantics | target | Reviewed supporting content after description; no universal detail fields. Safety warnings use reviewed rich content or canonical Alert. |
| Media | no | `figure.technique-step__media` or target media wrapper | target | Informative contextual alt or decorative empty alt; no blank reservation. |

## Variant, Size, State, And Mode Matrix

| Dimension | Candidate direction |
| --- | --- |
| Default | Passive ordered explanation; no current/completed/disabled state. |
| Titled/untitled | Named native section versus generic root; no dangling label. |
| Missing/invalid steps | Omit root when no complete records; omit incomplete peers. |
| One/many | One or more direct native list items; source order retained. |
| Number shown/hidden | Visual-only derived ordinal; native list semantics always remain. |
| Media absent/present | Text remains complete; no empty media column. |
| Details absent/present | Stable name/description remains complete; optional target-native details stay inside the owning item. |
| Wide host | Two columns; even media may move to inline-start without changing DOM order. |
| Narrow host | One column, content then media, controlled by component container. |
| Hover/focus/keyboard | None owned by passive R3; child target links/actions own their complete states. |
| Long/localized/RTL | Logical geometry and complete wrapping; alternation follows logical inline direction. |
| 200% text/user spacing | Steps grow without clipping, overlap, or truncated explanation. |
| Dark/forced colors | Text and dividers remain perceivable; media and faint ordinals are not the only sequence cue. |
| Reduced motion | R3 owns no motion or transition. |

## Public API And Runtime Direction

| Property | Type | Requirement | Direction |
| --- | --- | --- | --- |
| `title` | string | optional | Visible contextual heading; controls section versus generic root semantics. |
| `steps` | slot | required non-empty | Target-owned ordered records with required name/description and optional reviewed details/media. |

No controlled/uncontrolled strategy applies. R3 owns no value, default value,
current index, completion state, event, focus, navigation, request, timer,
announcement, or persistence. If a product later needs an interactive workflow,
it should use a separate composed contract (for example canonical Steps,
Progress, Tabs, Accordion, or navigation controls according to actual behavior)
and requires an accepted product/architecture decision.

Do not expose process records, numeric labels, numbering format, current step,
completion, media side, alternating toggle, columns, breakpoint, image ratio,
loading priority, gap, padding, divider, radius, heading rank, or schema as R3
root properties.

## Token And CSS Direction

- Keep public semantic text, border, heading/body typography, media radius, and
  section/grid/element spacing tokens that canonical R3 actually consumes.
- Keep the accepted H1 size/weight/line-height tokens for the current large
  visual ordinal; do not create a separate public number token.
- Use private composition variables for step minimum measure, local padding,
  number scale, and breakpoint threshold only where CSS needs them; create no
  public R3 token layer.
- Reset native ordered-list markers visually while preserving list semantics.
- Use logical properties, `min-inline-size: 0`, `overflow-wrap: anywhere`, and
  bounded media dimensions.
- Establish a named inline-size container at the root and let the canonical CSS
  own stacking/alternation. Remove R3 layout and size overrides from Studio.
- Use no hover, focus, animation, transition, or cursor styling on passive steps.

## Target Translation

| Target | Direction |
| --- | --- |
| Neutral Web | Conditional section/div, native `ol/li`, complete text, optional target-composed details/media, named-container CSS, zero R3 JavaScript. |
| Shopify | Planned. Compose target-native section, ordered-list/list-item, heading, paragraph, and image primitives only after content source/editor schema and first template consumer are approved. |
| Webflow | Preserve CMS-authored order in native ordered-list markup and contextual media; no workflow state implied. |
| React/Angular | Thin passive renderer receives semantic children/records; target data layer owns content and media lifecycle. |
| Figma | Future component models optional title, repeated ordered item, optional media, wide alternation, and narrow stacking; current generic nodes are not R3 approval. |
| SwiftUI/Compose/future | Use native ordered content/list equivalents with visible ordinals and accessible sequence; separate any real progress/workflow control. |

## Evidence And Validation Plan

- Preserve the four current Desktop/Mobile parity captures as before evidence.
- Capture paired Exhibit/Studio Mobile, Tablet, Desktop, and XL with one managed
  Gallery server, one explicit headless Chromium Playwright session, and one
  tab, sequentially.
- Verify exact normalized DOM and computed-style parity at one forced host width.
- Verify conditional section/div, native direct `ol/li`, derived visual numbers,
  heading relationships, complete text, contextual image alternatives, zero
  widget roles/focusables/listeners, and invalid-record filtering.
- Verify missing title, missing steps, one step, media absent, and mixed media.
- Exercise `200/320/430/680px` hosts, long/localized/unbroken content, RTL,
  effective 200% text, and user text spacing.
- Measure overflow, text/border contrast, light/dark, forced-color boundaries,
  reduced motion, visual/source sequence, console/page errors, scripts/listeners,
  and runtime work.
- Validate contracts, Studio, docs, static previews, generated Web/Shopify
  adapters, Exhibit/Studio parity, component/refinement audits, JSON, diff
  hygiene, target copy parity, and a production build outside `site/dist`.

## Risks And Remaining Human Gates

1. The first production target must prove record provenance, localization,
   revision, factual/editorial review, rights and applicability under R0.
2. The first rich-details consumer must show which native/canonical parts it
   composes and prove that safety warnings or precautions do not enter an
   arbitrary untyped detail.
3. Production media still needs approved purpose, crop, aspect ratio, loading,
   fallback, alternative text, credit, rights and disclosure evidence.
4. Shopify remains planned until a first template, data source, section/block
   schema, limits/order, localization, media picker and migration are approved.
5. Final title, ordinal, type, spacing, media treatment, wide alternation and
   `30rem` private threshold need explicit human visual review or R3-specific
   design evidence.

These are production-target and human stability gates, not unresolved neutral
API decisions. Decision 57 resolves R3's semantic composition sufficiently for
human review; the component remains `pilot` until that review occurs.

## Current Gallery Result

- R3 now emits a named native `section` only with a non-empty visible title;
  untitled compositions use a generic `div` without `aria-labelledby`. Missing
  required steps omit the complete root.
- One direct native `ol.technique-explainer__steps` contains three direct
  `li.technique-step` records in meaningful source order. Every complete step
  has a text wrapper, derived `aria-hidden` visual ordinal, H3 name, complete
  paragraph, optional target-composed details and optional native media figure.
- The default fixture proves one details slot containing a native paragraph
  after its complete description and before media; the other two steps omit it
  without empty wrappers. `dir="auto"` and canonical wrapping preserve mixed
  bidirectional unbroken content at a `200px` host.
- `TechniqueExplainerArtwork` and `buildTechniqueExplainerFixture` are the only
  R3 renderer/fixture consumed by Exhibit and Studio. The prior local array,
  duplicate formatted-number data and generic stage alternatives are removed.
- Fixture media now agrees with its adjacent content: wheel forming, surface
  painting and review of finished shelf work. All three local `1800x2700`
  images load at natural dimensions with truthful non-empty alternatives.
- Canonical CSS uses logical properties, existing semantic tokens, two private
  rhythm variables and a named component container. `200/320/430px` hosts stack
  content then media; `680px` uses two columns and actually moves only even media
  to logical inline-start. The DOM remains text-before-media for every item.
- The R3 viewport rule and Studio-only R3 media/layout corrections are removed.
  Passive steps own no hover change, pointer cursor, focus, state or motion.
- Natural Exhibit/Studio Mobile and Tablet geometry is exact. Desktop/XL reflect
  their intentionally different workspace widths. At a normalized `620px` host
  with identical public spacing tokens, both modes produce DOM hash `6d3dfcf6`,
  style hash `6c53267e`, `588px` sequence width and zero overflow.
- Mobile, Tablet, Desktop and XL pass in both modes. `200/320/430/680px` hosts,
  untitled/empty/one-text-only compositions, localized RTL/unbroken content,
  effective 200% type and user spacing all have zero root, part and document
  overflow.
- Default R3 contains zero widget roles, current/selected/completed attributes,
  focusable descendants, live regions or scripts. Passive hover/click leaves
  its border and DOM unchanged.
- Light contrast is `17.93:1` for title/name and `7.81:1` for
  number/description/details; dark is `17.18:1` and `12.09:1`. Reduced motion
  has zero active parts. Forced colors preserves a `1px solid CanvasText` step
  divider and readable ordinals.
- Final R3 CSS is `2,889 B` raw / `771 B` gzip at level 9. Ceramics CSS is
  `34,028 B` raw / `4,858 B` gzip, leaving `569 B` under its permanent `5,427 B` ceiling. Shared
  neutral runtime has no R3 delta and R3 remains zero-runtime.
- Neutral Web is implemented; Webflow and Shopify Ceramics CSS projections are
  source-identical. Shopify R3 stays planned because records, editorial/safety
  review, schema, localization, media policy and first consumer remain open.
