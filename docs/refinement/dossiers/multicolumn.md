# Component Dossier: Multicolumn

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation

Contract: `components/contracts/multicolumn.contract.json`

## Recommendation

Keep Multicolumn as a passive, finite comparison of target-owned feature items.
Preserve ADR 0082's required `items` slot instead of inventing a neutral item
record, column-count property, card API, or interaction model. The target owns
each item's content and native semantics; the parent owns only section naming,
consistent item rhythm, intrinsic wrapping, and source-order preservation.

Use a native unordered list for the Gallery fixture because its benefits are a
parallel set whose order does not change meaning. Targets may use an ordered
list when sequence is meaningful, but process steps should normally use Process
Timeline rather than making Multicolumn imply chronology through position.
Items are not articles by default: short value propositions are not necessarily
independently distributable content.

Keep the visible section title optional as the accepted contract specifies. A
titled Gallery composition uses a native `section` named by that heading; an
untitled composition uses a generic `div` so it does not add an unnamed section
or landmark. At least one complete item is required; an absent required slot
omits the root. Optional visuals are decorative in the canonical fixture.

Use one named component container and an intrinsic layout with private minimum
item measure and icon size. Remove Studio-owned column behavior. These values
are visual candidates for human review, not public cross-target configuration.
No component JavaScript is warranted. Add a dedicated Shopify section whose
reorderable blocks map the accepted target-owned slot without promoting Shopify
settings into the neutral API.

## Purpose And Limits

- Presents a concise set of parallel benefits, principles, capabilities, or
  service facts beneath an optional contextual title.
- Supports one or more target-owned items with an optional visual, optional
  heading, and optional supporting text, while requiring that each rendered
  item contains meaningful text content.
- Use Process Timeline for chronological steps, Stats for quantitative facts,
  Logo Bar for brand marks, Comparison Table for row/column comparison, Card
  collections for independent linked records, and Rich Text for prose.
- The parent does not become a Card group, carousel, slider, disclosure,
  navigation model, selection surface, equal-height content contract, or form.
- It owns no query, ordering policy, merchant data source, editor persistence,
  link destination, analytics, media loading, focal point, icon catalogue,
  activation, focus model, live announcement, or empty-state message.
- `items` is a required target-owned slot under ADR 0082. Missing items is an
  invalid composition; individual empty records are omitted by the target.

## Current Gallery Baseline

- Registry identity `S4`, category `sections`, selector `.multicolumn`, no
  direct dependency, dependency depth `0`, and review order `164`.
- Contract `0.2.0`, `pilot`: eight anatomy parts, one variant, one size, one
  passive state, one behavior, two properties, ten public tokens, Web
  implemented, and Shopify planned.
- The registry description still claims process-step use even though the
  component has no ordered-step semantics, connector, progress, or position
  announcement and a canonical Process Timeline exists.
- The shared renderer emits an unlabelled `section`, generic `div` grid, and
  three `article` items. The MDX fallback instead adds ARIA `list`/`listitem`
  roles to the same generic/article structure, so source examples disagree.
- The renderer can emit an empty root when required `items` is absent. Its
  optional title neither names the root nor changes the root semantic when
  empty.
- CSS uses physical width/height/margins, `auto-fill`, and hardcoded `600px`,
  `32px`, `240px`, `48px`, `16px`, `8px`, font weight `600`, and line-height
  `1.6`. Heading and body line-height/weight semantics are incomplete.
- A generic `@container (max-width: 767px)` rule changes section inset and item
  minimums, while Studio separately forces exactly three columns and then one
  column at its own `720px` container threshold.
- The site overrides materially change source behavior: at Desktop Exhibit is
  `420px` wide with one column while Studio is `532px` wide with one column; at
  XL Exhibit is `584px`/one column while Studio is `752px`/three columns.
- Baseline roots are unlabelled, use `DIV`/`ARTICLE` rather than native list
  markup, and retain no page overflow. Mobile is `358x679.34px`; Tablet is
  `736x333.78px` with three tracks; Desktop and XL differ by view containment.
- Exhibit and Studio do share `SectionsStudio`, its fixture, contract, Studio
  definition, and canonical source CSS. The mismatch comes from site-owned
  layout rules rather than duplicate renderer branches.
- All 183 Studio definitions point to the same Figma frame and inspector nodes
  (`943:7` and `1020:480`). They are generic Studio-shell traceability, not
  S4-specific evidence for grid density, icon size, alignment, or hierarchy.
- Shopify has copied section CSS but no dedicated
  `sections/multicolumn.liquid`; the adapter reports planned contract support.
- Baseline deterministic gzip is Sections `6,790 B`, Neutral Web component CSS
  `67,789 B`, and shared runtime `10,589 B`. S4 must add `0 B` component runtime
  and keep the Sections family within its documented `6,861 B` ceiling.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `section`](https://html.spec.whatwg.org/dev/sections.html#the-section-element) | A `section` is a thematic grouping normally identified by a heading, not a generic styling wrapper. | Use a named `section` when the optional title exists; use a generic root when it does not. |
| [HTML grouping content](https://html.spec.whatwg.org/dev/grouping-content.html#the-ul-element) | `ul` represents items whose order is not materially meaningful; its direct items are `li`. | The parallel-benefit fixture should use native `ul`/`li`; sequence-specific targets may choose `ol`. |
| [WAI page structure](https://www.w3.org/WAI/tutorials/page-structure/) | Meaningful headings, regions, lists, and content structure make relationships and navigation programmatically available. | Connect the optional visible title to the thematic root and preserve real list structure. |
| [WAI clear page structure](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o2p03-page-structure/) | Whitespace, headings, grouping, and consistent visual cues help users recognize related content; excessive icons add cognitive load. | Keep parallel rhythm and restrained optional visuals; do not rely on icons or position alone. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Mature systems disagree widely on card media, header, action, grouping, and interaction concepts. | Do not turn every S4 item into canonical Card or infer link/action anatomy from a visual column. |
| [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition) | Radix focuses on composing behavior with consumer-owned elements and has no passive multicolumn primitive. | S4 needs native document semantics and CSS composition, not a framework runtime or duplicated leaf control. |
| [Polaris Inline Grid](https://polaris-react.shopify.com/components/layout-and-structure/inline-grid) | Polaris separates equal-gap responsive grid layout from the semantic content of each child. | Keep column geometry as parent composition and item meaning target-owned; do not import Polaris admin APIs. |
| [Shopify blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks) | Section blocks can be added, removed, and reordered, each with target-specific settings. | Reorderable Shopify column blocks are the native projection of the accepted `items` slot. |
| [Dawn Multicolumn](https://github.com/Shopify/dawn/blob/main/sections/multicolumn.liquid) | Dawn uses a list of section blocks with optional image/title/text/link plus many target-specific layout, slider, animation, and theme settings. | Reuse only block/list/editor data patterns. Keep Gallery CSS, passive scope, smaller setting surface, and no slider/runtime. |

No WAI-ARIA APG widget pattern applies. Multicolumn has no composite focus,
selection, expansion, dragging, activation, or controlled/uncontrolled state;
native section, heading, list, image, and text semantics are sufficient.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | titled `section` or untitled `div` | Multicolumn/target | Contains one finite repeated composition; title determines thematic section semantics. |
| Header | no | generic grouping | Multicolumn | Exists only with the optional visible title. |
| Title | no | contextual native heading | Target | Fixtures use `h2`; its id names the titled root. |
| Grid | yes | usually native `ul`; `ol` when sequence matters | Target | Preserves source order and owns only repeated layout. |
| Item | repeated | native `li` | Target | Must contain meaningful text; not an article or Card by default. |
| Visual/icon | no | target-owned media; decorative fixture is hidden | Target | No neutral icon name, source, alt shortcut, or Lucide dependency. |
| Item title | no | contextual heading or strong text | Target | Heading level follows document context; item may instead be text-only. |
| Item text | no | paragraph/rich text | Target | Must not rely on position or visual alone for meaning. |

The current neutral property model deliberately leaves item records inside one
slot. A future structured-item schema would be an architecture change and is
not required to make Web and Shopify semantically complete in this batch.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One default borderless centered presentation; no invented card, left-aligned, numbered, carousel, or compact variant. |
| Size | One intrinsic size. Item minimum, content measure, icon size, and wrapping threshold remain private composition. |
| Titled | Native `section` named from the visible contextual heading. |
| Untitled | Generic `div` root; no empty heading, unnamed section, or synthetic accessible label. |
| Complete | At least one meaningful target-owned item is present. |
| Missing items | Invalid composition; omit the root rather than render an empty section. |
| Item visual | Optional and decorative when it repeats adjacent text; informative target media supplies native alternative semantics. |
| Theme | Light/dark through semantic foreground tokens; no component-owned background. |
| Forced colors | Text and SVG use system-adapted semantic colors; no color-only state or meaning. |
| Reduced motion | No authored motion or runtime. |
| RTL | Logical inset/rhythm and unchanged source order. |
| Responsive | Intrinsic native wrapping layout based on component space; no viewport, Studio, or consumer column-count behavior. |

Unsupported combinations include an empty required slot, empty list records,
heading-only columns, decorative icons exposed as names, item position as the
only sequence cue, fake focusability, local Card/button markup, swipe behavior,
autoplay, visual reordering, and merchant-controlled raw CSS values.

## Public API And State Ownership

- `title` — optional string/visible contextual heading. The target chooses the
  native heading rank. Empty content omits the header and uses a generic root.
- `items` — required slot of one or more target-owned item compositions in
  source order. The target selects `ul` or `ol`, item content, native media,
  heading rank, and any legitimate child contracts.
- The parent exposes no `columns`, `columnsMobile`, `gap`, `alignment`,
  `iconSize`, `iconName`, `itemMinWidth`, item schema, item count, link,
  animation, swipe, theme color, background, padding, heading level, or
  breakpoint as neutral API.
- It emits no component event and has no controlled/uncontrolled store. Any
  child link, button, media, analytics, or editor lifecycle remains target- or
  canonical-child-owned.

## Token And Value Audit

- S4 legitimately consumes section/container inset, grid gap, heading and body
  type, and primary/secondary/accent text colors.
- Complete type references should include H2/H4 weights and line heights plus
  body family, weight, size, and line height.
- Use `--space-layout-element-gap` for internal rhythm and existing section,
  container, and grid-gap semantics. Do not create tokens for each margin.
- The implemented `12.5rem` item basis, `20rem` item maximum, `3rem` icon size,
  and copy measure are private composition candidates. They are intentionally
  not public customization API and may be adjusted through human review.
- Structural zeroes, grid fractions, list reset, centering, `minmax(0, 1fr)`,
  `ch` measures, and private `rem` dimensions are not automatically token gaps.

## Visual And Content Audit

- Baseline uses a strong centered editorial hierarchy but is overly tall at
  narrow widths and inconsistent at desktop because site rules decide whether
  the same root is one or three columns.
- The title separator visible in Studio belongs to the shared preview shell,
  not S4 CSS; the component itself owns no divider or background.
- Decorative Lucide fixtures are site-only evidence. Their `48px` size and
  orange accent are visual candidates, not component defaults or target API.
- Keep each item copy on a readable private measure while allowing long words,
  localized strings, URLs, mixed scripts, and extreme content to wrap without
  document overflow.
- One, two, three, and many items remain centered and finite. Intrinsic flex
  wrapping does not create empty auto-fill tracks or reorder records.
- Empty title is supported; empty required items or empty target records are
  invalid. Short, long, Spanish, Arabic/RTL, unbroken, and effective-zoom
  evidence are required before readiness.

## Accessibility And Interaction

- A titled thematic root is named through `aria-labelledby`; an untitled root
  is generic rather than an unnamed section/landmark.
- Use native lists. `ul` is correct for parallel benefits; `ol` is reserved for
  a sequence where order changes meaning. CSS must not suppress semantics with
  `role=presentation` or reorder the list visually.
- Decorative visuals use `aria-hidden=true` or empty image alternative.
  Informative target media supplies a meaningful native alternative; an icon
  never serves as the only item label.
- Preserve a logical page heading hierarchy. The adapter chooses item heading
  rank or strong text according to surrounding document context.
- S4 adds no focus stop, keyboard controller, pointer handler, touch gesture,
  live region, timeout, autoplay, drag behavior, or motion. Interactive child
  contracts remain in ordinary document and Tab order.
- Primary, secondary, and accent foregrounds require ordinary WCAG contrast
  checks in light/dark modes; no state depends on color.

## Responsive And Performance

- Name the root `multicolumn` container and use logical inline/block geometry.
- Use an intrinsic wrapping layout with a private item minimum so isolated
  roots respond to their own space. Remove the generic S4 breakpoint and both
  site-owned column overrides.
- Test Mobile `390x844`, Tablet `768x1024`, Desktop `1280x900`, and XL
  `1536x960` in Exhibit and Studio plus isolated `260/520/900px` roots,
  one/two/many item cases, localized content, and effective 200% layout.
- Passive runtime budget is `0 B`: no listener, observer, timer, formatter,
  request, layout read, custom element, or component controller.
- Optional media assets remain target-owned. Intrinsic dimensions and loading
  policy are the media owner's responsibility.
- Sections family ceiling is `6,861 B` gzip. The baseline is `6,790 B`, leaving
  only `71 B`; refinement should simplify duplicate rules rather than claim a
  higher ceiling. Existing global Web CSS/runtime gaps remain separately
  documented and S4 must add `0 B` runtime.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Optional named thematic root, native list/items, optional target visuals/headings/text, intrinsic CSS wrapping. | Refined, generated, validated, and browser-evidenced. |
| Shopify | Addable section with optional title and reorderable blocks; each block owns optional target media, heading, and text; empty blocks omitted. | Implemented and adapter-ready with localized schema, data mapping, editor preview, and no runtime. |
| React / Angular | Optional title plus required children/items slot rendered as native list content; no local state or runtime. | Planned thin composition. |
| Figma | Auto-layout section with optional title and repeatable target-owned item instances. | Generic shell traceability only; density/icon hierarchy needs human review. |
| SwiftUI / Compose | Adaptive grid/list of target-native item content with optional section heading and accessibility labels. | Conceptual; media and child actions remain target-native. |

## Exhibit And Studio Parity

- Exhibit and Studio already share `SectionsStudio`, one fixture, contract,
  Studio metadata, and render branch.
- The shared branch should enforce required `items`, derive one stable title id,
  choose titled/untitled root semantics, and emit native `ul`/`li` fixture
  markup with decorative visuals hidden.
- Use the exact same fixture and rendered subtree in both modes. Do not add an
  Exhibit-only example or a Studio-only column implementation.
- Remove both `.docs-studio__sections-multicolumn .multicolumn__grid` rules.
  Site CSS may contain the preview but must not choose S4 columns.
- MDX fallback should mirror the native named composition and preserve its
  secondary usage guidance.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Optional title does not name the current `section`; empty title still leaves section semantics. | high | Titled `section` with `aria-labelledby`; untitled generic root. | accepted contract / implementation |
| Required items can be omitted while root remains. | high | Omit invalid root; require at least one meaningful target-owned item. | accepted contract / implementation |
| Renderer and MDX disagree and neither uses native list elements. | high | Canonical `ul`/`li` fixture and matching MDX; target may choose `ol` for true sequence. | implementation |
| Generic `article` overstates independent item semantics. | medium | Use native list items without article by default. | implementation |
| Registry still suggests process steps. | medium | Bound S4 to parallel facts; route chronological content to Process Timeline. | existing canonical dependency / documentation |
| Canonical and Studio responsive rules compete. | high | One named intrinsic component grid; remove site and generic S4 breakpoint rules. | implementation |
| CSS hardcodes incomplete typography and rhythm values. | medium | Complete existing semantic tokens and isolate only visual geometry privately. | implementation |
| Shopify has no native section adapter. | high | Add minimal block-based Liquid/schema/locales with passive scope. | implementation |
| Item schema, icon source, visual density, and minimum track are not owner-approved. | visual / architecture | Keep slot/icon target-owned and private candidates; provide evidence and keep `pilot`. | owner / accepted ADR 0082 |

## Evidence And Validation

Baseline artifacts under `output/playwright/refinement-batch-63/before/` contain
eight paired viewport captures. Measurements prove:

- every root is an unlabelled `SECTION`;
- every grid is a generic `DIV` and every item an `ARTICLE`;
- Mobile and Tablet Exhibit/Studio geometry is exact (`358x679.34px` one-track
  and `736x333.78px` three-track respectively);
- Desktop/XL column behavior changes with the preview host and Studio override;
- all four viewport documents retain equal client/scroll width;
- Sections/Web/runtime gzip starts at `6,790/67,789/10,589 B`.

Final artifacts under `output/playwright/refinement-batch-63/after/` add eight
paired viewport captures plus direct roots, one/two/seven items,
untitled/invalid composition, long localized RTL, unbroken and effective-zoom
content, dark, and forced-color evidence. Measurements prove:

- Exhibit and Studio initial root DOM is exactly equal at every paired
  viewport: `2,353` characters, FNV-1a `d8d03790`;
- the titled root is a named `SECTION`, the repeated structure is native
  `UL`/`LI`, decorative icons are hidden, and S4 has zero interactive elements;
- direct `260/520/900px` roots produce `1`, `2 + 1`, and `3`-column wrapping
  without overflow; one, two, and seven-item cases remain centered;
- untitled output is a generic `DIV`; missing required items yields no root;
- localized RTL, unbroken, and effective `179px` content all contain;
- light/dark text contrast, forced colors, reduced motion, accessibility tree,
  and isolated component console checks pass;
- final gzip is Sections/Web/runtime `6,857/67,868/10,589 B`: S4 adds `67 B`
  to Sections, `79 B` to generated Web CSS, and `0 B` runtime;
- Shopify reports S4 `implemented` and `ready: true`; official Liquid revision
  1, generated-copy identity, diff, validators, and clean `site/dist` pass.

## Risks And Open Questions

- Human review must approve the private minimum track, icon size, copy measure,
  narrow rhythm, three-column balance, and centered hierarchy before stability.
- ADR 0082 intentionally defers a structured neutral item schema. Shopify
  blocks can map the target-owned slot without resolving that architecture
  question; future generators may revisit it explicitly.
- A target that needs linked cards, swipe, numbered steps, or interactive media
  must compose the relevant canonical child/parent contract rather than extend
  S4 implicitly.
- Heading rank depends on page context. Every adapter must select valid native
  hierarchy without exposing visual heading size as a semantic rank shortcut.
- The shared Figma nodes are not S4 visual approval. Component-specific Figma
  work follows browser review and cannot promote this contract automatically.
- S4 remains `pilot`; automated evidence can reach `human-review-ready` but
  never `stable` without explicit owner approval.

## Readiness Decision

`ready for human review`: research, semantic source, intrinsic responsive
ownership, exact Exhibit/Studio parity, Shopify translation, automated
validation, and final browser evidence are complete. Item basis/maximum, icon
scale, density, centered hierarchy, and component-specific Figma presentation
remain owner-review candidates. Contract remains `pilot`; no `stable`
promotion was made.
