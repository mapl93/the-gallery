# Component Dossier: Blog Sidebar

Status: `human-review-ready`

Target under review: Neutral Web complementary editorial layout with
target-owned semantic modules

Contract: `components/contracts/blog-sidebar.contract.json`

## Recommendation

Define L8 as one passive, fail-closed, named complementary container for one or
more target-authored editorial modules. Require a non-empty accessible label
and non-empty `sections` composition; render a native `aside`; keep the stacked
layout intrinsic; and let each module retain its own heading, list, form,
navigation, content, state, and target integration.

Continue ADR 0079's accepted repeated-section boundary. Do not add separate
root properties for search, categories, recent posts, archives, newsletter,
tags, or every future sidebar module. Those are content/module decisions, not
stable L8 configuration. The useful neutral API is the complementary-region
label plus semantic section composition.

Correct the dependency boundary using already accepted component contracts:

- recent-post, category, archive, and topic destinations compose canonical
  Link anchors and semantic lists;
- a topic destination is not canonical Tag: Tag is a passive value label with
  an optional remove Button and explicitly routes navigation to Link;
- a search module, when supplied by a target, composes canonical Form, field
  semantics, Input and Button inside a native search landmark and owns query,
  submission, results, validation, loading, focus, history, and announcements;
- a removable active-filter collection may compose Tag in that separate filter
  module, but L8 itself does not own Tag or removal state;
- L8 adds no listener, observer, timer, request, storage, disclosure, sticky
  behavior, search behavior, selection state, or framework runtime.

Add canonical Link as the direct dependency and remove Tag. Owner decision 51
accepts **Blog Sidebar** as the public name and
`.blog-sidebar__topics`/`__topic`/`__topic-link` as canonical anatomy. Keep
`.tag-cloud*` only as temporary migration aliases and remove them before the
public v1 contract freezes. The initial v1 profile is Recent Articles + Topics;
order, limits, headings and records stay target page data. Search and Newsletter
remain separate compositions. Keep `pilot`; alias removal, real placement,
final visuals and explicit human stability review remain pending.

## Purpose And Limits

- Groups tangential but useful material alongside a blog index or article,
  such as recent articles, topic/category destinations, archives, author notes,
  a newsletter module, or a target-native search module.
- Remains meaningful when separated from the main content and therefore may be
  exposed as one complementary landmark.
- Provides stacked spacing, title/list/topic-link presentation, intrinsic
  containment, and a shared preview composition.
- Is not the main blog layout/grid, global navigation, Table of Contents,
  Filter Bar, search engine, faceted Filter Panel, Tag collection, newsletter form,
  related-article algorithm, CMS query, recommendation service, disclosure,
  sticky rail, or responsive visibility controller.
- Does not choose which modules appear, their order, heading level, content,
  routes, article/tag data, count truth, query lifecycle, authentication,
  analytics, caching, pagination, SEO, localization, or editorial policy.
- Does not make every sidebar a landmark by visual placement alone. Targets use
  L8 only when content is genuinely complementary to the surrounding main
  content; unrelated content needs another container.
- Does not expose section gap, title styling, list row rhythm, topic-pill
  padding/radius, width, page column, sticky offset, breakpoint, collapse, or
  hide/show behavior as public semantic properties.

## Current Gallery Baseline

- Registry `L8`, Blog, dependency depth one, review order `122`, dependency
  `tag`, and name “Blog Sidebar / Tag Cloud.” Its description promises tag
  cloud, search, categories, and recent posts even though the contract exposes
  only one opaque `sections` slot.
- ADR 0079 already accepts target-owned repeated sections rather than separate
  search/category/recent/tag root APIs, but leaves Input/Tag composition open.
  The established Tag contract now resolves the navigational half: whole-tag
  navigation must use Link, not Tag.
- Contract `0.1.0`, `pilot`, marks the root and section required but title
  optional. It has no `label` property even though accessibility guidance says
  repeated complementary landmarks need useful names.
- Anatomy includes list links and “tag destination” classes, but direct
  dependency is Tag rather than Link. State metadata duplicates Link hover and
  focus ownership for both link families.
- The required `sections` slot has no trim/fail-closed rule, minimum section
  count, required module heading/content constraints, heading-level boundary,
  canonical composition rules, or runtime behavior statement.
- Canonical CSS stacks sections with a raw `32px` gap and uses physical
  min/max-width. An empty `.blog-sidebar__section { }` rule adds no behavior.
- Titles hardcode weight `600`, uppercase, tracking `.05em`, `12px` margin and
  `8px` padding. List rows hardcode `6px`; topic links hardcode `6/4/10px`,
  fractional body typography, and their own transition/focus behavior.
- `.blog-sidebar__link` duplicates Link color, hover, transition and a four-pixel
  focus outline. `.tag-cloud__item` duplicates a second link treatment instead
  of composing Link.
- Topic hover sets `--color-text-inverse` on
  `--color-surface-statement`. In the current light palette that pairing has not
  been certified and visually risks light text on a pale statement surface.
- `BlogStudio` renders an unlabelled native `aside`, two local `section`
  elements with fixed `h2` headings, a list of article anchors, and topic
  anchors carrying both `.tag` and `.tag-cloud__item`. Applying `.tag` to an
  anchor contradicts Tag's passive/removal contract and creates overlapping
  component CSS ownership.
- Setting Studio `sections=false` leaves an empty unlabelled `aside` rather than
  omitting the component.
- Exhibit MDX separately serializes a labelled fixture with different headings,
  labels, and topic markup. It claims the preview does not apply `.tag`, while
  the runtime Exhibit actually uses the shared `BlogStudio` renderer and does
  apply it. Documentation and runtime truth diverge.
- No dedicated `BlogSidebarArtwork` or shared fixture exists. Similar baseline
  visuals come from one broad Studio renderer, not one L8 renderer contract.
- Desktop baseline is restrained and scannable. Mobile baseline preserves
  content, but Studio's title wraps, heading/module rhythm is tight, no
  long/empty/search/RTL/dark/forced-color evidence exists, and topic pills have
  ambiguous Tag-versus-Link identity.
- Web, Webflow, and Shopify receive copied visual CSS. Shopify has no L8 Liquid,
  section settings, blog/search data mapping, target module inventory, or first
  template consumer, so maturity remains planned.
- Registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and inspector
  `1020:480` are generic Button Component Detail/Studio shells already verified
  in this program. They provide no L8-specific module, label, heading, link,
  topic, responsive, page-column, dark, or search direction.
- Existing baseline images are
  `output/playwright/parity/blog/blog-sidebar-{exhibit,studio}-{desktop,mobile}.png`.
  They are baseline-only, not certification evidence.
- Deterministic current L8 CSS slice is `1,995 B` raw / `669 B` gzip, SHA-256
  `48cc6b794fab0d5000db62e5a24c980ea5004bdde1f84b19fd03106689c2534c`.
  Blog CSS is `32,233 B` raw / `5,496 B` gzip against the fixed `5,529 B`
  ceiling, leaving `33 B`. Shared runtime is `53,811 B` raw / `10,501 B` gzip;
  L8 owns zero neutral runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `aside`](https://html.spec.whatwg.org/multipage/sections.html#the-aside-element) | `aside` represents content tangentially related to and separable from surrounding content; the standard explicitly shows blog side content grouping blogroll and archive navigation. | A genuine Blog Sidebar may be one native complementary region. Do not use it merely because content is visually in a side column. |
| [HTML `section`](https://html.spec.whatwg.org/multipage/sections.html#the-section-element) | `section` is a thematic grouping, typically with a heading, and is not a generic styling wrapper. | Each authored L8 section needs a coherent topic and heading; arbitrary visual wrappers should remain `div`. |
| [APG Landmark Regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#complementary) | Complementary landmarks support the main content, should remain meaningful separately, and repeated landmarks need unique labels; native `aside` supplies the role. | Require a useful label, omit empty roots, and do not add redundant `role=complementary`. |
| [WAI Page Regions](https://www.w3.org/WAI/tutorials/page-structure/regions/#complementary-content) | `aside` identifies content that supports main content while remaining separate; responsive layouts should retain coherent region ordering. | DOM/source order and semantic identity must not change when the sidebar stacks below main content. |
| [APG Search Landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/search.html) | Search is its own landmark with native search input/submit semantics; multiple search regions need distinct labels. | An optional sidebar search is a composed search module, not behavior owned by the outer complementary container. |
| [APG Link pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/) | Native `a[href]` supplies expected destination behavior and custom link roles require reimplementation. | Recent/category/topic destinations compose canonical Link and retain native browser behavior. |
| [Open UI components](https://open-ui.org/components/) | Open UI has no generic Sidebar control that standardizes module inventory, landmark use, content APIs, or behavior. | L8 should remain a semantic layout composition over native regions and canonical components, not invent a universal sidebar widget. |
| [Radix Themes Layout](https://www.radix-ui.com/themes/docs/overview/layout) | Radix explicitly separates layout responsibilities from content/interactivity; Box/Flex/Grid/Section organize spacing and constraints without owning child behavior. | Keep L8 responsible for complementary/stacked composition while each canonical child retains interaction and state. |
| [Radix composition guide](https://www.radix-ui.com/primitives/docs/guides/composition) | Mature composition preserves the semantics and behavior of leaf components rather than recreating them in parents. | Use Gallery Link/Input/Button/Form contracts directly; do not copy their focus, keyboard, validation, or event logic into L8. |
| [Shopify Polaris Page](https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/page) | Polaris Page exposes an `aside` slot for contextual content rather than defining every possible aside module as page properties. | Supports a semantic content slot plus target-owned modules instead of search/category/recent/tag root APIs. |
| [Shopify Polaris Section](https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/section) | Section groups cohesive content under meaningful headings and derives hierarchy from nesting; it does not add collapse by default. | Require coherent headed modules and keep disclosure/heading hierarchy target-owned. |
| [Shopify blog object](https://shopify.dev/docs/api/liquid/objects/blog) | Liquid exposes `all_tags`, paginated articles, and total article count, but those are target data facts rather than a universal sidebar schema. | Shopify can project recent/topic modules after product policy chooses source/order/limits; neutral L8 must not freeze this object model. |
| [Shopify search template](https://shopify.dev/docs/storefronts/themes/architecture/templates/search#the-search-form) | Native storefront search submits a form to `routes.search_url` with a named query input and target-owned results page. | A Shopify sidebar search should compose a native target search form; L8 does not fetch or synchronize results. |
| [WCAG Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | Ordinary content should reflow at a 320 CSS px equivalent without document-level two-dimensional scrolling. | Modules, headings, long links, and topic destinations must wrap intrinsically inside the containing column. |

There is consensus that sidebar layout, landmark semantics, and child-module
behavior are separate responsibilities. There is no consensus on a fixed blog
sidebar module inventory, and the repository already accepts target-owned
sections. Canonical Gallery Tag supplies decisive local evidence that
navigational topic pills are Links, not Tags.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | named native `aside` | L8 + target label | Fail closed without label or renderable sections; no redundant role/tabindex. |
| Sections | one or more | target-authored semantic content | target composition | Ordered modules; L8 supplies stack layout only. |
| Module | repeated | `section`, `nav`, `search`, `form`, `div`, or other truthful native structure | target module | Element follows purpose; not every visual group becomes a landmark. |
| Module title | required for the built-in visual section profile | contextual heading supplied by target | target hierarchy | L8 styles the class but does not expose a heading-level property or guess page outline. |
| Destination list | optional | native `ul`/`ol` with `li` | target module | Recent/category/archive items preserve list semantics. |
| Destination | optional | canonical Link `a[href]` | Link + target route | Complete label, native events, target href/current relationship. |
| Topic list | optional | native `ul` with `li` | target module | Legacy `.tag-cloud` classes mean wrapping topic destinations, not Tag values. |
| Topic destination | optional | canonical Link `a[href]` | Link + target route | Pill presentation may be L8-owned; navigation semantics stay Link-owned. |
| Search module | optional | named native `search`/form composition | Form/Input/Button + target | Query/results/lifecycle outside L8. |
| Active filters | optional only inside a target filter module | canonical Tag collection | Tag + filter owner | Removals/state/focus/announcements stay in that module; not an L8 root API. |

The direct L8 dependency becomes canonical `link`. Input, Form, Button, Tag,
Newsletter, Filter Bar, Article Card, and other modules remain optional
consumer compositions rather than unconditional L8 dependencies.

## Variant, Size, State, And Mode Matrix

| Dimension | Direction |
| --- | --- |
| Default | One named complementary region with one or more headed semantic modules. |
| Missing/blank label | Omit complete root; do not emit an ambiguous complementary landmark. |
| Missing/empty sections | Omit complete root; do not render an empty aside. |
| Empty module | Target omits it; no title-only section or divider. |
| One/many modules | Valid; target order is preserved; many require editorial limits rather than internal virtualization. |
| Link default/hover/focus | Canonical Link owns states; L8 owns row/pill layout and topic hover surface only. |
| Topic destination | Native Link with a complete label; never selectable/removable merely because it looks like a Tag. |
| Search | Optional separate native search module with its own complete states and contract. |
| Sticky/collapsed/hidden | Unsupported in L8. The page host owns column placement, responsive order, sticky offsets and visibility policy. |
| Long/localized/RTL | Complete headings/links/topic labels, logical flow, intrinsic wrapping, no clamp. |
| Light/dark/forced colors | Region text, separators, topic boundary, hover and focus remain perceivable. |
| Reduced motion | L8 has no motion; canonical children honor their own preferences. |

There is one fluid size and no behavior variant. Mobile, Tablet, Desktop and XL
are evidence contexts. A narrow page may stack the whole aside below the main
content without changing its DOM order or semantics.

## Public API And State Ownership

| Property | Type | Requirement | Ownership |
| --- | --- | --- | --- |
| `label` | string | required non-empty | Localized accessible name for the complementary region; omission removes root. |
| `sections` | semantic slot | required non-empty | Target-authored modules with truthful structure, headings, content and canonical child components. |

No controlled/uncontrolled L8 state exists. L8 emits no event. Native Links,
forms, inputs, buttons, Tags, newsletters, filters, and target data modules own
their state/events/lifecycle independently.

Do not expose module booleans, recent article arrays, tag arrays, category
arrays, search query, placeholder, submit label, results, loading, newsletter
fields, counts, heading level, width, column ratio, sticky, breakpoint, collapse,
order, section gap, title typography, topic radius, or child runtime as L8 root
properties. Targets may package common module recipes in their own adapter
without changing the neutral container contract.

## Token And Hardcoded-Value Audit

- Retain semantic primary text, subtle border, secondary/statement surfaces,
  heading/body/body-small typography, semibold weight, full radius,
  component/section spacing and touch-target tokens actually consumed by L8.
- Canonical Link owns secondary/accent text, focus color, transition and easing;
  remove those duplicated tokens from L8 metadata unless L8-specific CSS still
  consumes them.
- Remove `--color-text-inverse` from L8. Topic hover on the pale statement
  surface should keep a verified primary text color rather than assume inverse.
- Replace physical `min/max-width` with logical inline containment.
- Replace `600` and fractional body calculations with existing semantic
  semibold/body-small tokens. Add line-height tokens so element choice does not
  change vertical rhythm.
- Use accepted component spacing where it preserves coherent hierarchy.
  Remaining micro paddings, uppercase tracking, separator width and topic-pill
  insets are private visual constants; document them and do not promote them to
  public properties/tokens without cross-component evidence.
- Remove the empty section rule, duplicate link/tag transitions, duplicate
  four-pixel focus outlines, and reduced-motion selectors inherited from Link.
- Preserve no component-scoped public token layer. L8 has no consumer need to
  customize every internal section/list/pill variable.

## Visual And Content Audit

- Existing desktop composition has clear editorial hierarchy, generous module
  separation, readable link rows and compact topic destinations.
- Uppercase serif module titles are a strong editorial choice but no L8-specific
  owner reference approves family, case, tracking, size, border, or density.
- Current recent links use wide full-row separators; topic pills use a light
  neutral surface. The two modules are visually distinct without extra cards.
- Applying Tag CSS to topic anchors makes them look like removable/selected
  values even though they navigate. Shared Link composition must preserve a
  destination affordance and avoid an X/selected-state implication.
- Fixture module titles, article names, topic names, routes, number of rows and
  ordering are sample content only. They are not defaults or public API.
- Search, categories, archives, newsletter, author, ads, commerce/product
  promotions, disclosure and sticky placement are absent from the fixture and
  must not be implied as supported defaults.
- Final label strategy, module inventory, max modules/items, title style,
  separators, topic-link surface/hover, sidebar width/placement, alignment,
  mobile ordering, dark/forced colors and Mobile-through-XL art direction need
  human review.

## Accessibility And Interaction

- Render native `aside` only for complementary content. Required `label` names
  the region; a target with one clear visible overarching heading and stable id
  may use `aria-labelledby` in its native adapter.
- Do not add redundant `role=complementary`, tabindex, roledescription, live
  region, disclosure, arrow-key navigation, roving focus, or focus trap.
- Each module uses a truthful semantic structure and meaningful heading. The
  target owns heading rank based on the page/article outline; fixture `h2`
  elements are context-specific examples, not a neutral `headingLevel` API.
- Link lists use native list markup and canonical anchors with real href values.
  Only anchors enter Tab order and activate through native browser behavior.
- Topic destinations are Links. Use canonical Tag only for passive/removable
  values inside a real filter module, with its accepted named remove Button and
  target-owned focus/announcement lifecycle.
- A search module is its own named search landmark and composes a labelled field
  plus submit behavior. Avoid multiple indistinguishable search landmarks.
- Complete headings and link labels remain visible at text spacing, zoom,
  narrow containers and RTL. Do not truncate or hide essential modules solely
  by viewport without page-level content priority approval.
- Canonical child components own keyboard, focus, validation, disabled, current,
  reduced-motion and forced-color behavior. L8 must not override those contracts.

## Responsive And Container Behavior

- Root uses logical `inline-size`, `min-inline-size`, and `max-inline-size`
  containment with one intrinsic vertical stack; no viewport breakpoint.
- Section titles, list rows, Links and topic destinations wrap complete content
  without page-level horizontal overflow at 200px and effective
  320px/200-percent conditions.
- Topic destinations wrap across rows in source order. Individual links remain
  usable targets and do not force an internal horizontal rail.
- The page/article layout owns whether the aside sits beside or below main
  content, its column width, gap, source order, sticky behavior, safe area,
  max-height, overflow, and responsive visibility.
- Do not reorder the aside with CSS in a way that creates a reading/focus order
  different from DOM. A target may place it after main content and visually in a
  side column while preserving coherent sequence.

## Content And Edge-Case Matrix

Final evidence must cover:

- blank/nonblank region label; missing/empty/whitespace sections; complete root
  omission;
- one/two/many modules, empty module omission, module with/without visible
  heading, and target heading levels;
- list with one/many/long/duplicate article destinations and no list;
- topic list absent, one/many, short, long, localized, RTL and unbroken labels;
- native href/current/external target/rel behavior as supplied by target;
- a separately composed search module with label, empty/filled query, submit,
  preserved query, validation and target results lifecycle when that recipe is
  implemented;
- a separately composed removable Tag filter only when a real consumer needs
  it, including focus and announcement behavior owned outside L8;
- 200px container, effective 200-percent type, WCAG text spacing, narrow
  article/sidebar columns and no page overflow;
- light, dark, forced colors, reduced motion, hover, keyboard focus and native
  Link activation;
- Mobile, Tablet, Desktop and XL in Exhibit and Studio with identical renderer,
  fixture DOM, labels, headings, lists, Links and canonical computed styles.

## Performance And Runtime Budget

- Neutral L8 budget remains zero JavaScript, listeners, observers, timers,
  requests, storage, layout reads, generated assets, router/search dependencies,
  or framework state.
- DOM/runtime scale linearly with target modules/items. L8 does not virtualize,
  fetch, paginate, clone, lazy-hydrate, measure, collapse, or auto-scroll child
  content.
- Refined L8 CSS should be no larger than the current `669 B` gzip slice.
  Canonical Link composition and removal of duplicate Tag/focus/motion rules
  should reduce it enough to keep the Blog family within its fixed `5,529 B`
  gzip ceiling despite only `33 B` current headroom.
- Shared site renderer adds static composition only. Any search/filter/newsletter
  runtime belongs to the target module and must be budgeted/certified there.
- Recalculate deterministic L8 slice, full Blog CSS, Web components bundle and
  shared runtime after implementation; target adapters must remain
  source-identical where they copy canonical CSS.

## Cross-Target Translation

| Target | Translation | Open target decision |
| --- | --- | --- |
| Neutral Web | Fail-closed named native `aside`, semantic target sections, canonical Links, zero JS. | Final shared renderer and visuals. |
| Shopify Liquid | Reusable snippet maps explicit `blog.articles` and `blog.all_tags` to Recent Articles + Topics, excludes optional current article, and receives headings/order/limits from the host. | First page/template placement, editor exposure, localization and current-route policy; Search/Newsletter remain separate. |
| Storefront/headless | Target CMS/API/router projects modules and routes; L8 remains passive. | Query shape, cache/count truth, search endpoint and pagination. |
| React / Angular | `label` plus semantic child modules; framework composition passes canonical leaf components. | Router/search/filter integrations stay outside L8. |
| Figma | Named complementary stack with repeatable headed module slots and Link/topic examples. | L8-specific owner page/column/module art direction is absent. |
| SwiftUI / Compose | Native complementary/supporting content stack with semantic sections and navigation destinations. | Platform navigation/search/layout conventions and data source remain adapter-owned. |

Targets preserve complementary identity, label, module order, fail-closed root,
canonical child semantics, complete content, and zero L8 behavior. They do not
need the same module inventory, CMS, router, search engine, or visual column.

## Exhibit And Studio Parity Direction

Current parity is incomplete:

- runtime Exhibit and Studio share broad `BlogStudio`, but L8 markup/fixtures
  are serialized locally inside that renderer rather than a dedicated artwork;
- static MDX uses different content and claims different Tag composition;
- root naming and invalid empty-section behavior differ from desired contract;
- topic anchors incorrectly compose Tag; no exact shared L8 fixture contract
  exists;
- baseline desktop/mobile similarity does not prove empty, long, RTL, narrow,
  dark, forced-color, reduced-motion, semantic or state parity.

Create `BlogSidebarArtwork` with required label/sections and a separate explicit
`BlogSidebarFixture`. Both Exhibit and Studio resolve that renderer through
`BlogStudio`; MDX retains a matching static fallback. Studio's inspector may
intercept fixture navigation only at the host boundary. Site CSS may size the
preview but must not restyle the sidebar or its canonical Links.

## Implementation Outcome

Batch 107 implemented the neutral direction, and owner decision 51 is now
reconciled into the current source:

- `BlogSidebarArtwork` now fails closed for blank labels or empty sections, and
  `BlogSidebarFixture` supplies the shared Exhibit/Studio evidence content;
- registry, contract `0.3.0`, Studio metadata, MDX and dependency graph now agree
  on the public Blog Sidebar name and one passive named `aside` with required
  `label` plus `sections`;
- navigational items compose native lists and canonical Link; Tag is removed as
  an L8 dependency and no `.tag` class appears on an anchor;
- logical intrinsic CSS, complete wrapping, accepted typography/spacing tokens,
  44 px targets and canonical Link state ownership replace duplicate physical,
  color, focus and motion rules;
- ADR 0198 records the permanent module-composition boundary and owner
  confirmation; canonical `.blog-sidebar__topics*` classes now own the public
  Topic anatomy while `.tag-cloud*` remains a temporary migration alias;
- Webflow and Shopify Blog CSS projections are source-identical;
  `snippets/blog-sidebar.liquid` maps the accepted Recent Articles + Topics
  profile with host-owned headings, order and limits and no Search/Newsletter
  shortcut;
- neutral runtime remains zero, L8 stays below its observation ceiling at
  `644 B` gzip and Blog stays within its fixed budget at `5,148 B` audited
  gzip, leaving `381 B` headroom.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Tag dependency contradicts navigational topic anchors. | canonical composition blocker | Replace Tag with Link; reserve Tag for actual passive/removable values in a separate filter module. | accepted source decision / implementation |
| Search/content modules are promised but not stable root API. | API architecture | Keep ADR 0079 semantic sections slot; compose canonical target modules, no per-module root properties. | accepted source decision / implementation |
| Root has no required accessible label. | semantics blocker | Add required non-empty label and fail closed with empty sections. | implementation |
| Section heading is optional despite thematic section guidance. | semantics/content | Require coherent headed built-in section profiles; keep exact heading rank in target-authored section content. | implementation/target |
| Link/focus/motion behavior is duplicated. | composition/performance | Compose canonical Link and delete parent copies. | implementation |
| Topic hover uses unverified inverse-on-statement pairing. | contrast blocker | Use verified primary text on statement surface and certify hover. | implementation |
| Physical/raw/fractional CSS is inconsistent. | technical debt | Logical containment, accepted type/weight/spacing where appropriate; keep micro geometry private. | implementation |
| Exhibit/Studio lack dedicated shared renderer/fixture. | parity blocker | Add one fail-closed artwork/fixture and matching static fallback. | implementation |
| Shopify previously had CSS only. | target integration | Implement the accepted Recent Articles + Topics snippet from explicit Blog data; keep real placement/editor exposure target-owned. | implementation/Shopify target |
| Generic Figma refs provide no L8 direction. | visual blocker | Obtain/approve page-context module and responsive visuals. | owner |

## Evidence And Validation

Batch 156 renews contract/registry/Studio/MDX agreement, accepted Link
dependency, fail-closed required content, native semantic anatomy, zero Tag
composition/runtime, exact shared DOM/style parity, Mobile through XL, localized
RTL and unbroken 200px content, effective 200-percent text, text spacing, dark,
forced colors, reduced motion, hover, keyboard focus and native activation.
Every measured overflow is zero; every normal-text contrast state passes AA;
all seven links retain 44px targets and visible focus.

Source-identical target CSS, neutral/Shopify adapters, deterministic budgets and
the production build outside `site/dist` pass. Evidence and executable probes
live under `output/playwright/refinement-batch-156/`; the detailed report is
`docs/reports/blog-sidebar-web-refinement-audit.md`. The bounded lifecycle used
one pre-existing responsive server, one headless Chromium session and one tab,
then confirmed the managed server stopped, session closed and the user-owned
server preserved.

## Risks And Remaining Review Gates

Owner decision 51 resolves the public name, canonical selectors, initial module
profile, target-owned order/limits/headings, and Search/Newsletter boundary.
Remaining work is target integration or human review:

1. Remove `.tag-cloud*` migration aliases before the public v1 contract freezes
   and verify copied consumers have migrated to the canonical Topic selectors.
2. Select the first real Web/Shopify page placement, contextual heading rank,
   localized content, editor exposure and current-route policy.
3. Approve final title typography/case/tracking, separators, topic-link surface,
   sidebar width/placement, mobile order and special-mode visuals.
4. Supply L8-specific design evidence or review the repository render directly;
   the repo remains the current source of truth.

## Research Readiness Decision

`human-review-ready`. ADR 0198 plus owner decision 51 resolve and implement the
public identity, canonical Topic selectors, Recent Articles + Topics profile,
host-owned composition data, separate Search/Newsletter boundary, canonical
Link ownership and Shopify projection. Alias removal, real placement and final
visual judgment remain explicit later gates. Contract remains `pilot`; no
`stable` promotion is authorized.
