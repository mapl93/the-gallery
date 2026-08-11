# Component Dossier: Process Timeline

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify section translation

Contract: `components/contracts/process-timeline.contract.json`

## Recommendation

Keep Process Timeline as a passive, ordered narrative rather than an ARIA
widget. Use a native section associated with its visible contextual heading and
an `ol`/`li` source order. Keep the numbered marker visible but hidden from the
accessibility tree because the native ordered list already exposes sequence.
Images and descriptions remain optional target-owned content.

Use one intrinsic horizontal lane whose equal tracks expand when the available
inline size can contain them and overflow natively when it cannot. Preserve
scroll snap, a visible focus ring, and a target-authored accessible name for the
focusable track. This avoids viewport coupling and prevents the current
connector from drawing across unrelated wrapped rows. The connector remains
decorative and uses logical positioning; removing it or changing its visual
treatment remains a human-review choice.

Do not add a Timeline widget role, current/completed status, progress semantics,
controlled selection, navigation events, heading-level enum, image-ratio
property, alignment, density, or custom scrollbar API. Those concepts either
belong to Timeline Primitive/Steps, the surrounding document, target-owned step
records, or owner-led visual review.

## Purpose And Limits

- Explains how an artwork, material, service, or collection moves through a
  meaningful sequence of stages.
- Primary contexts are maker stories, production transparency, collection
  narratives, and editorial commerce pages.
- Process Timeline owns ordered composition, visible numbering, stable source
  order, intrinsic lane sizing, native overflow, scroll snap, focus indication,
  optional-part resilience, and content containment.
- The target owns step records, localization, heading ranks, image assets,
  alternative text/decorative intent, focal points, rich data, analytics, and
  any navigation destinations composed inside step content.
- It is not Timeline Primitive, Steps, Progress, Carousel, a process engine, a
  status tracker, or a target data schema.
- No component JavaScript, controlled/uncontrolled state, events, live region,
  focus movement, timer, auto-advance, or reduced-motion branch is required.

## Pre-Refinement Gallery Baseline

- Registry `F2`, category `storytelling`, no dependencies; contract `0.1.0`,
  `pilot`; nine anatomy parts, one variant/size, two states, two behaviors, two
  properties, and sixteen public tokens.
- ADR 0080 already accepts the title, ordered target-owned step composition, and
  keyboard-scrollable narrow overflow. It leaves no Process Timeline product
  boundary open.
- The canonical track uses flex on narrow viewports and a wrapping grid behind a
  viewport `768px` query. It therefore reacts to the page rather than its actual
  component width.
- At a `1440px` browser viewport the Exhibit track is only `484px` wide, becomes
  a two-column grid, and wraps the third step. Its decorative connectors still
  draw as though all steps occupy one row; one connector also expands the
  measured scroll width beyond the client box.
- The shared Exhibit/Studio renderer already uses native `ol`/`li`, but the MDX
  fallback uses `div`/`article` plus manual list roles. The renderer hard-codes
  an English accessible label and keeps `tabindex="0"` even when the wide grid
  has no scroll operation.
- Native ordered-list styles are reset only by site CSS, while the title can
  inherit docs-site heading margins, border, padding and line height. Other
  target consumers therefore do not receive the same rendering.
- Number, title and description typography use literal weights, fractional
  `calc()` sizes and unitless line height instead of complete semantic token
  pairs. The connector uses physical `right`, and its vertical placement is a
  hard-coded `70px` that crosses the image rather than the numbered marker.
- Shopify has a dedicated section and JSON-template composition, but the
  contract says `planned`. Liquid uses `div` for track/items, lacks section
  labelling and keyboard overflow semantics, overrides image alt with the step
  title, always emits empty text wrappers, and has untranslated schema/defaults.
- Existing evidence covered the default fixture but not exact four-viewport
  Exhibit/Studio parity, maximum repeated items, optional images/descriptions,
  localized/extreme content, RTL, zoom, themes, forced colors, keyboard scroll,
  or source/generated identity.
- Baseline deterministic gzip is `3,847 B` for Storytelling CSS against a
  `4.2 KiB` ceiling, `65,621 B` for all neutral component CSS against `64 KiB`,
  and `10,492 B` for shared neutral runtime against the existing `8 KiB`
  exception. Process Timeline itself adds no runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI content structure tutorial](https://www.w3.org/WAI/tutorials/page-structure/content/) and [HTML ordered-list standard](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element) | Ordered lists represent sequential information, use direct list items, and can contain headings, paragraphs and other rich content. | Keep native `ol`/`li` in every target and preserve authored source order through every layout. |
| [WAI ACT scrollable-content rule](https://www.w3.org/WAI/standards-guidelines/act/rules/0ssw9k/) and [WCAG focus-order understanding](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) | An overflowing region or a descendant must be reachable through sequential focus so native arrow-key scrolling can work; unnecessary focus stops make navigation tedious. | Keep the lane natively scrollable and visibly focusable. Targets may conditionally manage the stop when their platform can detect overflow without compromising cross-browser access. |
| [Chrome keyboard-focusable scrollers](https://developer.chrome.com/blog/keyboard-focusable-scrollers) | Chromium makes scroll containers without focusable children keyboard-focusable by default only when they actually scroll. | The neutral markup must not add custom key handlers; explicit `tabindex="0"` remains a cross-browser target fallback, not a widget model. |
| [Open UI List research](https://open-ui.org/components/list.research/) and [component matrix](https://open-ui.org/research/component-matrix/) | Lists commonly support ordered compound items with media/text, while Timeline implementations have no interoperable anatomy or interaction consensus. | Treat Process Timeline as Gallery presentation over native list semantics, not a new platform role. |
| [Radix Scroll Area](https://www.radix-ui.com/primitives/docs/components/scroll-area) | Mature scroll-area composition retains native scrolling and leaves keyboard keys to the browser instead of translating content with custom handlers. | Preserve native overflow/snap and avoid a custom scrollbar or component runtime. |
| [Polaris Ordered List](https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/ordered-list) | Ordered content is for procedures and sequences; direct list items may contain compound content, and parallel concise item structure improves scanning. | Keep each process step a direct item with a parallel title/description pattern. |
| [WAI Images tutorial](https://www.w3.org/WAI/tutorials/images/) | Image alternatives depend on purpose and context; informative and decorative cases differ. | Keep image meaning target-authored and allow Shopify merchants to mark a contextual image decorative. |
| [Shopify sections](https://shopify.dev/docs/storefronts/themes/architecture/sections), [section schema](https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema), and [input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings) | Section blocks are merchant-reorderable records, require `block.shopify_attributes`, and `image_picker` preserves image/focal-point data. | Map each ordered step to one section block, preserve editor attributes, image data and omission, and localize all schema/default strings. |

### Mature-system comparison

- Open UI and Polaris converge on ordered compound list items but do not define a
  target-neutral maker-process Timeline widget.
- Radix offers Scroll Area, not Timeline; its useful evidence is native scrolling
  and absence of synthetic key handling. The Gallery does not need Radix's
  custom scrollbar anatomy for this passive editorial lane.
- Polaris keeps sequence in ordered-list semantics rather than status/progress.
  Process status belongs to Steps or Timeline Primitive when a use case requires
  current/completed/error meaning.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. Direct inspection shows the generic Studio shell and
Button pilot: `Button`, `Customize`, content/presentation/layout/appearance
groups, and Button tokens. It contains no Process Timeline artwork, marker,
connector, media, responsive, or overflow evidence. It validates inspector
organization only. The repository candidate remains the visual proposal for
human review; no Process Timeline aesthetic is inferred from the unrelated
frame.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | named `section.process-timeline` | Process Timeline / target | Associated with the visible title through a target-unique id. |
| Title | yes | contextual heading | target | Visible section name; class does not mandate a fixed rank. |
| Track | yes | focusable native `ol` | Process Timeline / target | One ordered lane, natively scrollable only when its content exceeds available inline size; labelled by the visible title. |
| Step | repeated, at least one | direct native `li.process-step` | target | Source order is canonical and merchant-reorderable in Shopify. |
| Step number | yes | visual text, `aria-hidden="true"` | Process Timeline | Mirrors native list order without duplicate speech. |
| Step media | no | `.process-step__image` | target | Omitted completely when absent. |
| Step image | conditional | native `img` | target | Informative alt or empty alt according to context; target owns loading/focal point. |
| Step title | yes | contextual heading | target | Parallel, concise phrase; class owns appearance only. |
| Step description | no | paragraph/rich text | target | Omitted completely when absent. |
| Connector | generated/decorative | pseudo-element | Process Timeline | Never conveys sequence alone; logical geometry and hidden in forced colors if needed. |

## Variant, Size, State, And Mode Matrix

- Variant/size: one default editorial lane. Vertical orientation, compact
  density, alternate surfaces, image ratio and alignment are not accepted public
  options.
- Required content: non-empty timeline title plus at least one step title. The
  ordered step slot is required; empty optional media/description wrappers are
  omitted.
- Step media: informative image; decorative image; missing image; or failed
  image. The content remains understandable through number and title.
- Lane: steps share available inline size above their private readable minimum;
  otherwise equal tracks overflow horizontally in one row with native snap.
- Content extremes: one, three, eight and target-platform maximum steps; short
  and long titles/descriptions; localized scripts; long unbroken strings; and
  mixed media presence must remain contained.
- Themes: semantic colors inherit light/dark modes. Forced colors must preserve
  focus and visible numbering without depending on connector color.
- Reduced motion: no authored animation or smooth scrolling; native user-agent
  scrolling remains authoritative.
- RTL: item source order remains logical, the scroll lane follows document
  direction, and connector placement uses logical inline properties.

## Public API And State Ownership

Keep the two accepted semantic properties:

- `title` — required visible process heading and section/track label.
- `steps` — required ordered target-owned composition; each record supplies a
  required title and optional media/description using target-native data.

Do not add `items`, `currentStep`, `status`, `orientation`, `headingLevel`,
`showConnectors`, `imageRatio`, `density`, `alignment`, `autoPlay`, `loop`,
`selectedIndex`, `onStepChange`, or `onScroll`. Process Timeline is passive and
has no controlled/uncontrolled strategy. Targets render their source array or
CMS blocks directly; native scrolling is not component state.

## Token And Value Audit

- Public color: primary/secondary text, statement surface, decorative border and
  focus border. Primary text keeps the numbered marker readable in both source
  themes; inverse text fails against the pale light statement surface. The
  source no longer needs a public subtle-border
  token solely for a custom scrollbar.
- Public typography: heading family/size/line-height/weight, body heading
  family/size/line-height/semibold weight, and small body family/size/line-
  height/regular weight.
- Public spacing: section inset, container inset, grid gap and element gap.
- Public radius: full marker and medium media radius.
- Marker `36px`, connector `2px`, media `4/3`, private card minimum, and snap
  behavior remain internal composition. They are not independently useful
  cross-target controls.
- Replace fractional font calculations and literal weights/line height with
  complete existing semantic pairs. Remove site-only list reset and padding so
  canonical source owns its full rendering.
- Cap the responsive container inset with a private percentage of the actual
  host so desktop-mode page margins cannot consume most of a narrow embedded
  component. The public container token remains the maximum accepted inset.

## Accessibility And Interaction

- Associate the section and ordered lane with the same visible contextual
  heading using a target-unique `id`/`aria-labelledby` pair.
- Use `ol`/`li`; add a redundant `role="list"` only where list-marker removal is
  needed for Safari/VoiceOver resilience.
- Hide the visual number from assistive technology to avoid duplicate order;
  native list position remains authoritative.
- Keep native arrow/Space scrolling. Do not add Carousel, listbox, tab, progress
  or application roles and do not intercept scroll keys.
- Ensure the scroll lane is sequentially focusable on targets/browsers that do
  not automatically focus overflowing containers, with a visible focus ring.
- Keep step headings in source order and use document-appropriate ranks.
- Informative step images need useful target-authored alt; decorative images use
  empty alt. Sequence and meaning must survive without images/connectors.
- Long localized content and 200% zoom must not cause page-level horizontal
  overflow; horizontal movement remains confined to the named lane.

## Responsive And Performance

- Replace viewport switches and wrapping rows with one intrinsic inline lane.
  Equal implicit grid tracks use a private readable minimum and distribute free
  space when all supplied steps fit.
- Section block spacing keeps the accepted public section token; inline inset is
  the smaller of the public container token and a private host-relative cap.
- When steps do not fit, only the track scrolls; the page/root does not. Logical
  snap padding and overscroll containment remain native CSS.
- DOM/work is constant in the shell and linear in target-supplied steps. There
  are no listeners, observers, layout reads, requests, timers, transforms,
  custom scrollbar controls, or component assets.
- Neutral runtime contribution remains `0 B`. Consumer media requests and
  target image processing are data concerns.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Named section, contextual heading, native ordered one-row lane, direct items, visible number, optional native media/description and native overflow. | Implemented, generated, validated and browser-verified; no component runtime. |
| Shopify | Merchant-configurable section blocks in authored order, localized schema/defaults, editor attributes, optional image/description and target-owned alt/decorative intent. | `implemented`, `section-adapter`, maturity `ready: true`; Liquid and locales validated. |
| React / Angular | Passive component accepting title and ordered step records/slots; adapter supplies contextual headings and media. | Planned; no collection state or lifecycle service required. |
| Figma | One/three/eight steps, with/without media/description, narrow overflow cue, wide equal lane, light/dark and focus examples. | Planned; registered reference is generic Button artwork. |
| SwiftUI / Compose | Native ordered accessible groups inside target-native horizontal scroll containers when required. | Conceptual; data, images and heading semantics remain target-owned. |

## Exhibit And Studio Parity

- Exhibit and Studio keep one `StorytellingStudio` renderer, one fixture and
  exact initial outerHTML at all four required viewports.
- The fixture keeps three parallel process steps with informative images and
  descriptions. Special evidence removes alternating optional media/text and
  expands to repeated/localized/extreme content without changing public API.
- Studio exposes only title and ordered step composition plus validated source
  token references. Step records remain fixture/target data rather than copied
  semantic defaults in Studio metadata.
- Remove Process Timeline-specific padding/title/list reset from site CSS so both
  modes consume canonical CSS directly.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Viewport query creates a wrapped grid inside a narrow component host. | high | Use one intrinsic equal-track lane with native overflow based on actual inline space. | implementable now |
| Connector crosses media and becomes incoherent across wrapped rows. | high | Keep one row, move connector to logical marker-level geometry, and keep it decorative. | implementable now; visual approval pending |
| MDX and Shopify replace native ordered semantics with simulated lists/divs. | high | Use `ol`/`li` consistently and hide only the duplicate visual number. | implementable now |
| Track label is hard-coded English and section association is inconsistent. | high | Reference the visible target-authored title with unique ids. | implementable now |
| Docs CSS supplies required reset/padding source behavior. | high | Move full list/title reset into canonical CSS and remove site overrides. | implementable now |
| Typography uses incomplete token pairs and host styles leak into headings. | medium | Apply complete source typography and reset margins/padding/borders. | implementable now |
| Shopify adapter exists but is marked planned and omits editor/accessibility details. | high | Reconcile Liquid, locales and contract to an implemented section adapter. | implementable now |
| No component-specific Figma artwork exists. | human review | Present the repository proposal; request approval of marker, connector, media ratio, type and rhythm. | owner |

## Refinement Result

- Contract `0.2.0` remains `pilot`: nine anatomy parts, one variant, one size,
  two states, eight behaviors, two semantic properties, twenty-three public
  tokens and no dependencies.
- Canonical CSS now uses the intrinsic one-row lane, marker-level logical
  connectors, complete semantic typography, host-relative inset cap, source-
  owned resets, native overflow/focus and forced-color support. Site-specific
  Process Timeline presentation was removed.
- MDX, shared Exhibit/Studio renderer and Shopify render one named native
  section, contextual heading, labelled `ol`, direct `li` steps, hidden duplicate
  visual numbers and independently omitted optional media/description.
- Exact Exhibit/Studio initial `outerHTML` parity holds at Mobile, Tablet,
  Desktop and XL. One/three/eight items, optional content, native keyboard
  scroll, long localized RTL content, 200% zoom, light/dark, forced colors and
  reduced motion were verified in a real browser.
- Light contrast measures `17.93:1` title, `7.81:1` description and `16.89:1`
  marker; dark contrast measures `17.18:1`, `12.09:1` and `7.00:1`.
- Storytelling CSS is `3,912 B / 4.2 KiB` deterministic gzip, leaving `388 B`.
  Complete neutral component CSS is `65,689 B / 64 KiB`, an explicit `153 B`
  program gap. Shared runtime remains `10,492 B / 8 KiB`; Process Timeline adds
  `0 B` component runtime.
- Four baseline images, eight final viewport images and seven special-state
  images are stored under `output/playwright/refinement-batch-39/`. The full
  audit is `docs/reports/process-timeline-web-refinement-audit.md`.

## Remaining Human Review

- Approve or revise the one-row narrative lane and private minimum step width.
- Approve or revise `4:3` media crop, `36px` numbered marker, statement color,
  full radius and connector retention/treatment.
- Approve or revise centered alignment, heading/body hierarchy, section insets,
  item gaps and snap preview of the following step.
- Confirm that vertical orientation, compact density, alternate surfaces,
  alignment, connector visibility and image ratio remain absent from the v1
  public API.
