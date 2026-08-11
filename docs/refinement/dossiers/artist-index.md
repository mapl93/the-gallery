# Component Dossier: Artist Index Grid

Status: `human-review-ready`

Target reviewed: Neutral Web with documented Shopify translation

Contract: `components/contracts/artist-index.contract.json`

## Recommendation

Refine Artist Index as a named passive directory section with one native result
list, intrinsic one-to-three-column layout, optional introduction and an optional
target-owned filter slot. Keep target-authored result order authoritative and do
not require Artist Card until that dependency is explicitly accepted.

Do not activate filtering in the shared default fixture. The current fixture
chooses one exclusive `aria-pressed` model, but changing the selected control
does not filter, announce or empty the results. This is both incomplete and a
product decision that ADR 0080 intentionally leaves open. Retain the existing
selected-control selectors as styling hooks only; a target that supplies filters
must choose native single- or multiple-selection semantics, URL/state ownership,
result synchronization, empty/loading/error states and announcements as one
coherent implementation.

Move list reset, intrinsic track sizing, complete typography, optional-control
hover/focus/selected safeguards, forced colors and long-content containment into
canonical CSS. Remove docs-only grid-column overrides so Exhibit and Studio use
one responsive authority. Keep minimum track width, maximum track count, filter
shape, density and selected treatment private pending human visual review.

## Purpose And Limits

- Presents a discoverable directory of artists or makers in a stable,
  target-authored sequence.
- Primary contexts are artist directories, residency programmes, exhibition
  participants and collection storytelling.
- Artist Index owns the labelled section, heading/introduction rhythm, optional
  filter composition region, result-list grouping and intrinsic grid layout.
- The target owns artist records, result content, media/alternative text,
  destinations, filtering/sorting data, selected values, URLs, requests,
  announcements, empty/loading/error states, analytics and persistence.
- It is not a search engine, listbox, tabs widget, Card contract, Artist Card
  alias, CMS model or collection/product filter.
- The passive core has no component state, controlled/uncontrolled strategy,
  event API, listener, observer, timer, request or neutral runtime.

## Current Gallery Baseline

- Registry `F6`, category `storytelling`, no dependencies; contract `0.1.0`,
  `pilot`; seven anatomy parts, one variant/size, four states, one behavior, four
  semantic properties and twenty public tokens.
- Accepted ADR 0080 exposes `title`, `introduction`, target-owned `filters` and
  target-owned `results`. It intentionally leaves selection mode, selected-state
  semantics, filter/result/URL synchronization, empty results and announcements
  unresolved.
- The shared Exhibit/Studio renderer composes target results from the same
  `ArtistCardFixture`, but the result container is a generic `div` and does not
  expose native list semantics.
- The default fixture renders four toggle buttons, initializes `All` as pressed
  and mutates only local button state. All three artists remain visible and no
  result status is announced after activation.
- The MDX fallback contradicts the shared renderer: it shows unselected inert
  buttons and rebuilds result-list semantics with manual roles.
- Canonical CSS uses intrinsic `auto-fill`, but Studio overrides it to fixed
  three/two/one columns. Baseline Exhibit roots are `310/688/532/536px` and
  resolve `1/3/2/2` columns because docs CSS, not the component, controls the
  embedded layout.
- Filter padding contains `6px`/`16px` literals, typography lacks line-height and
  weight tokens, hover applies without input-modality qualification, and selected
  controls have no explicit forced-color treatment.
- Shopify only receives copied CSS and a generated `planned` manifest entry;
  there is no target-native artist directory source or accepted artist-data
  mapping.
- The registered Figma frame is the generic Button Studio pilot. It contains no
  Artist Index, result grid, artist record, filter policy, responsive state or
  target translation.
- Baseline deterministic gzip is `4,376 B` for Storytelling CSS against a
  `4.2 KiB` ceiling, `66,291 B` for neutral component CSS against `64 KiB`, and
  `10,492 B` for shared runtime against the existing `8 KiB` exception. Artist
  Index should add no neutral runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML lists](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element) and [sections](https://html.spec.whatwg.org/multipage/sections.html#the-section-element) | Native lists group repeated records; a section is appropriate when it has its own heading. | Use a heading-labelled section and native `ul`/`li` results instead of manual list roles. |
| [WAI-ARIA APG Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) and [Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | `aria-pressed` makes each button a two-state toggle; an exclusive choice has radio semantics and a different keyboard model. | A visual pill cannot choose semantics. The neutral contract must not imply that exclusive filters are a group of toggles. |
| [WAI-ARIA 1.2 `aria-pressed`](https://www.w3.org/TR/wai-aria/#aria-pressed) | Without `aria-pressed`, a button is not a toggle; with it, the state must reflect real two-state behavior. | Do not emit pressed state merely to obtain selected styling. Targets must keep semantics and behavior synchronized. |
| [Open UI List research](https://open-ui.org/components/list.research/) and [Card research](https://open-ui.org/components/card.research/) | Lists consistently group sequential compound records, while mature systems do not converge on one Card anatomy. | Own list grouping but keep record/card anatomy target-owned; do not add an Artist Card dependency by analogy. |
| [Radix Toggle Group](https://www.radix-ui.com/primitives/docs/components/toggle-group) | Radix requires an explicit single/multiple type and separates controlled/uncontrolled values and keyboard behavior. | The Gallery cannot infer selection cardinality or value ownership from the visual hook. |
| [Polaris Filters](https://polaris-react.shopify.com/components/selection-and-input/filters) and [Index Filters](https://polaris-react.shopify.com/components/selection-and-input/index-filters) | Mature filtering is a composite lifecycle with values, callbacks, applied filters, query/sort, state-change notices, keyboard access and narrow-screen policy. | Keep filtering outside the neutral passive core until a target defines the complete lifecycle; a row of pills is insufficient. |
| [Shopify storefront filtering](https://shopify.dev/docs/storefronts/themes/navigation-search/filtering/storefront-filtering/support-storefront-filtering) | Shopify collection/search filtering derives from platform filter objects and URL parameters. | Do not reuse product storefront filtering for arbitrary artists. An artist data source and URL policy must be accepted first. |
| [CSS Grid `repeat()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/repeat) | `auto-fit`/`auto-fill` can create as many intrinsic tracks as the container can contain. | Use one canonical component-width algorithm and remove docs-only column counts. |

### Mature-system comparison

- HTML and Open UI support a durable labelled-section plus repeated-list core.
- APG and ARIA show that pressed toggles and exclusive radio choices are not
  interchangeable visual treatments.
- Radix makes selection cardinality and controlled/uncontrolled ownership
  mandatory API choices rather than styling inference.
- Polaris demonstrates that real filter components coordinate controls, values,
  applied state, results, notices and responsive presentation.
- Shopify supplies URL-backed filtering for product collections/search, not an
  automatic artist-directory data model.
- No source supports inert filter buttons, selected styling without matching
  semantics, automatic Artist Card dependency, viewport-owned columns or neutral
  component JavaScript.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. Direct read-only inspection finds `Exhibit`, `Studio`,
`Button`, `Customize`, Button label/icon/type/size/state controls and Button
spacing/color tokens. The only reusable instance is `Button instance / Primary /
Default`. There is no Artist Index artwork or evidence. The repository candidate
therefore remains a proposal for owner-led visual review.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `section.artist-index` labelled by heading | index / target | Directory boundary; target chooses heading level. |
| Header | yes | native `header` | index | Groups heading and optional introduction. |
| Heading | yes | contextual `h2`-`h6` | target | Provides section name; level follows page outline. |
| Introduction | no | paragraph or target rich text | target | Omit when empty. |
| Filters | no | target-owned form/control composition | target | Must implement one complete selection/result lifecycle before activation. |
| Filter visual hook | no | native target control only | target | Class and selected selectors do not determine role or cardinality. |
| Result list | yes | `ul.artist-index__grid` | index / target | Stable target-authored source order. |
| Result item | repeated | `li.artist-index__item` | index / target | Wraps one target-owned artist record; no automatic Artist Card dependency. |

## Variant, Size, State, And Mode Matrix

- Variant and size: one default passive directory. One/two/three columns are
  intrinsic layout outcomes, not public variants.
- Required content: title and at least one result item. Introduction and filters
  are optional and omitted when empty.
- Result cases: one, many, short, long, empty/unknown at target lifecycle,
  localized, RTL and unbroken content.
- Filter cases when supplied by a target: unselected, selected, hover on fine
  pointer, focus-visible, disabled/unavailable, loading, empty results and clear
  all. Their exact roles and state attributes follow the chosen model.
- Themes/preferences: light, dark, forced colors and reduced motion.
- Responsive: isolated narrow/medium/wide hosts, Mobile/Tablet/Desktop/XL docs
  shells and 200% reflow.
- Unsupported in the neutral core: selected value, default value, multi/single,
  controlled/uncontrolled, query, sort, pagination, async loading and events.

## Public API And State Ownership

Keep the accepted semantic properties:

- `title` — required directory heading.
- `introduction` — optional introductory content.
- `filters` — optional target-owned composition slot.
- `results` — required ordered target-owned artist composition.

Do not add `filterMode`, `selected`, `defaultSelected`, `allValue`, `query`,
`sort`, `columns`, `minColumnWidth`, `cardVariant`, `href`, `emptyMessage`,
`loading`, `onFilterChange` or `onArtistClick`. The passive core has no
controlled/uncontrolled strategy. A target that activates filters owns the
complete value/event/result model.

## Token And Value Audit

- Complete heading, introduction and filter typography with existing family,
  size, line-height and semantic weight tokens.
- Retain semantic primary selected-control, border/focus, text, radius, motion
  and layout-spacing tokens accepted by ADR 0080.
- Replace literal filter padding with existing layout spacing. Keep the touch
  minimum from `--space-layout-touch-target`.
- Private candidate values: minimum result track width, maximum three tracks,
  focus outline geometry and CSS reset zeroes. Do not add a component-token
  layer before human review.
- Do not expose docs media, artist fixture values or filter labels as defaults.

## Visual And Content Audit

- Heading and introduction require complete type rhythm, margin resets and
  robust wrapping.
- Result list must not inherit bullets/margins/padding and must preserve source
  order without dense placement or CSS order.
- Tracks should respond to the root content box, keep a readable minimum and
  avoid orphaned narrow cards at wide page sizes.
- Optional filter controls wrap without overflow, preserve 44px targets and do
  not depend on color alone for focus or selected state.
- Test empty optional introduction/filters, single result, many results, long
  names/medium/location/count, unbroken strings, localized text and RTL.

## Accessibility And Interaction

- Use native section/list semantics and a page-appropriate heading level.
- Passive results do not receive listbox/grid roles, roving tabindex or custom
  arrow-key behavior.
- Do not emit `aria-pressed`, `aria-checked` or `aria-selected` until the target
  chooses the matching interaction pattern and keeps it synchronized.
- Target controls use native keyboard behavior, visible focus and accessible
  labels. Result changes need target-owned status/empty feedback without moving
  focus arbitrarily.
- Preserve meaningful source order and do not encode filter status only through
  selected color.
- Reduced motion removes filter transitions; forced colors preserves control
  boundaries, selected state and focus.

## Responsive And Performance

- Use CSS Grid intrinsic tracks from the component width. Remove site-specific
  fixed column corrections.
- One private minimum track width and maximum three columns are sufficient for
  the candidate; verify isolated hosts independently from page viewport.
- DOM grows linearly with target results. The neutral component adds `0 B`
  runtime and performs no layout reads, requests, observers or listeners.
- Family budget remains Storytelling CSS `4.2 KiB` gzip; the existing exception
  must be measured, not silently raised. Global component CSS remains `64 KiB`
  and shared runtime remains `8 KiB` with existing recorded exceptions.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Labelled section, optional target filters and native result list with intrinsic grid. | Implemented, generated and validated; zero runtime. |
| Shopify | Merchant section or target template with heading/introduction and ordered artist records. Filters require an accepted artist data/URL/result model. | Exact CSS copy is validated; dedicated Liquid/data remains honestly `planned` and maturity is `css-ready`. |
| React / Angular | Passive slots/children; any active target defines one controlled/uncontrolled filter API and result lifecycle. | Planned; do not place state in neutral source. |
| Figma | One/two/three tracks, optional filter region, long/localized/RTL content, themes and empty/single/many records. | Planned; registered frame is unrelated generic Button artwork. |
| SwiftUI / Compose | Native labelled section/list/lazy grid with target-owned records and optional platform-native filtering. | Conceptual; selection and navigation remain target-owned. |

## Exhibit And Studio Parity

- Keep one `StorytellingStudio` renderer, one artist fixture and exact initial
  `outerHTML` for Exhibit and Studio.
- Default the optional filter slot off so the shared specimen does not invent a
  filter policy. Studio may expose the slot boundary without presenting a
  working filter as canonical API.
- Render results as one native list with repeated list items around the existing
  target-owned artist fixture composition.
- Remove site-only grid-column and component padding overrides; site CSS may own
  fixture media assets and stage containment only.
- Synthetic browser evidence may exercise valid target control hooks, but it
  must be labelled as target-owned and must not change the default fixture/API.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Default pressed buttons change only appearance and never results. | high | Disable filters in the shared default and remove incomplete local state. | implementable now |
| Exclusive pressed buttons conflate toggle and radio semantics. | high | Keep selection semantics target-owned; no default selected state. | owner/target |
| Result grouping lacks native list semantics. | medium | Use `ul`/`li` without manual roles. | implementable now |
| Canonical and docs CSS compete on column count. | high | Use one intrinsic canonical grid and remove docs column overrides. | implementable now |
| MDX fallback duplicates inert controls and manual roles. | medium | Reconcile documentation with shared passive candidate. | implementable now |
| Filter typography/padding/hover/forced colors are incomplete. | medium | Reconcile with existing tokens and special-mode safeguards. | implementable now |
| Artist result content has no accepted canonical dependency. | product boundary | Keep results target-owned; do not add Artist Card dependency. | owner/architecture |
| Shopify has no artist data/filter model. | target boundary | Document passive mapping; do not invent storefront filtering. | owner/target |
| Figma has no component-specific artwork. | human review | Use repository before/after evidence for visual approval. | owner |

## Refinement Result

- Contract `0.2.0` remains `pilot`: eight anatomy parts, one variant/size,
  five states, one target-owned behavior, four semantic properties, twenty-six
  public tokens and no dependency.
- The shared default is a heading-labelled native section containing one native
  `ul` and three `li` artist results. It exposes no focusable control, selected
  state, live region or neutral runtime.
- Optional filters default off. Removing the previous local React selection
  state eliminates the false exclusive pressed model and the unsynchronized
  control/result state.
- Results preserve target-authored source order. The shared docs fixture reuses
  its existing artist record renderer, but the contract does not add Artist Card
  as a dependency.
- Fictional fixture images now use empty alternatives rather than attributing
  unrelated repository media to named artists. Real targets own meaningful
  portrait sources and alternative text.
- Canonical CSS owns root/header/list containment, margin/list resets, complete
  heading/body/filter typography, logical spacing, touch target, fine-pointer
  hover, focus, selected/disabled hooks, forced colors and reduced motion.
- One private container algorithm resolves one track below `27rem`, two from
  `27rem`, and three from `44rem`. Docs-only padding and column rules are gone.
- MDX uses native list anatomy and omits the unresolved filter controls. Studio
  names the optional slot `Target filters` and uses an explanatory site-only
  placeholder only when the inspector enables it.
- Neutral Web contains the exact canonical Storytelling source once; Shopify's
  copied `storytelling.css` is byte-identical and passes official theme
  validation. Dedicated artist Liquid/data is not fabricated.

## Evidence And Validation

Before evidence lives under `output/playwright/refinement-batch-43/before/`.
Mobile, Tablet, Desktop and XL roots were `310/688/532/536px`; docs CSS forced
`1/3/2/2` columns. Every mode rendered `All` pressed, three unchanged results,
44px minimum controls and zero page overflow.

Final evidence lives under `output/playwright/refinement-batch-43/final/`:

- Mobile, Tablet, Desktop and XL produce exact initial Exhibit/Studio
  `outerHTML` parity. Clean component HTML is `1,771` characters in every mode.
- Exhibit roots are `310/688/532/536px` and Studio roots are
  `310/688/644/704px`. The actual candidates resolve `1/2/2/2` tracks; all have
  three list items, zero filter controls and zero root/page overflow.
- Isolated `260/580/900px` hosts resolve `1/2/3` tracks with content widths
  `218.4/487.2/756px` and no overflow, proving component rather than viewport
  ownership.
- The default accessibility structure is one labelled `section`, native `ul`,
  three native `li`, three target-owned `article` records, preserved source
  order, zero focusable descendants and decorative fixture images.
- A synthetic target hook specimen proves selected/default/disabled/long
  controls, native Enter dispatch, visible focus, `54px` default controls,
  wrapping and zero overflow without making those controls the shared default.
- A `368px` Arabic RTL specimen plus a repeated unbroken Latin name has zero
  root, host, item and page overflow. The `310px` Mobile candidate is narrower
  than the standard `320px` reflow viewport and also has zero overflow.
- Light contrast is `17.93:1` for headings/names and `7.81:1` for secondary
  text. Dark contrast is `17.18:1` and `12.09:1` respectively.
- Forced colors exposes distinct Highlight/HighlightText selected treatment and
  CanvasText boundaries. Reduced motion makes filter transition duration `0s`.
- Storytelling CSS is `4,571 B / 4.2 KiB`, a `271 B` exception and `+195 B`
  from Batch 42. Neutral component CSS is `66,419 B / 64 KiB`, an `883 B` gap
  and `+128 B`. Shared runtime is `10,492 B / 8 KiB`; Artist Index adds
  `0 B` runtime.

Registry/docs, source tokens, 183 contracts, 183 Studio definitions, neutral
Web, Shopify and Webflow adapters, official Shopify CSS validation, structural
certification, static Preview audit, exact parity, source/generated identity,
responsive hosts, semantic inspection, synthetic target hooks, localized RTL,
narrow reflow, contrast, forced colors, reduced motion, deterministic gzip,
global refinement audit, temporary site build outside `site/dist`, diff checks,
final console inspection and `site/dist` cleanliness form the final gate.

## Risks And Open Questions

- Owner/product: single-select, multi-select or another filter model; whether
  `All` is exclusive; and which layer owns controls, URL, results and notices.
- Owner/architecture: whether Artist Index formally depends on Artist Card or
  continues accepting arbitrary target-owned result records.
- Target: artist data source, result destinations, filter facets, localization,
  empty/loading/error states, analytics and persistence.
- Human visual review: track width/count/gap, section inset, heading rhythm,
  filter density/shape/selected treatment and result-card visual direction.
- Performance: Storytelling/global CSS are already over their binding ceilings;
  additions must remain minimal and explicitly measured.

## Readiness Decision

`human-review-ready`. The passive semantic candidate, optional filter hooks,
responsive authority, renderer parity, content resilience, special modes,
adapter boundaries and zero-runtime policy are reconciled. Filtering, formal
Artist Card composition, Shopify artist data and visual approval remain explicit
owner/target work. The contract remains `pilot` until explicit human approval.
