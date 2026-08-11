# Component Dossier: Related Articles

Status: `human-review-ready`

Target under review: Neutral Web passive article-recommendation collection

Contract: `components/contracts/related-articles.contract.json`

## Recommendation

Define L10 as one passive, fail-closed, named thematic section containing a
native unordered list of one or more canonical Article Card compositions.
Require a non-empty visible `title` and non-empty `articles` composition; use
the visible contextual heading to name the section; preserve source order; and
let the grid respond intrinsically to the component's available inline size.

Apply owner decision 52 as the v1 data profile: the target supplies one
explicitly curated ordered set of at most three canonical Article Cards,
excludes the current article and duplicates, and preserves curator order. L10
does not infer a tag fallback, automatic ranking or personalization; nor does it
fetch, cache, paginate, rotate, track, announce or refresh content.

Continue ADR 0079's accepted boundary with the owner decision resolved:
`.article-nav` is not part of L10's public anatomy, properties, states, fixture,
evidence or adapter mapping. Do not register Previous/Next Article Navigation
in v1; the unchanged legacy CSS may later become a separate canonical component
or explicit target composition and is never interpreted as L10.

Keep the shared `RelatedArticlesArtwork` and one fixture used by Exhibit and
Studio. Map Shopify's ordered `article_list` setting with limit three into the
canonical Article Card snippet and apply the same exclusions. On article pages,
place L10 after primary content and before Comments; Author Card and Share
Actions may sit around that boundary. Keep the contract `pilot`; first real
placement, final card/grid visuals, L10-specific design evidence and explicit
human review remain open.

## Purpose And Limits

- Presents a small, clearly identified set of target-selected article summaries
  that readers may choose after or near an article.
- Groups complete canonical Article Cards without copying their media, Badge,
  metadata, heading, Link, author, focus or responsive implementation.
- Preserves one visible section heading, native collection semantics, authored
  order, intrinsic wrapping and target-provided destinations.
- Supports one explicitly curated v1 source stored by the target; algorithmic,
  tag-derived and personalized sources are outside the accepted v1 profile.
- Is not an article query, recommendation engine, taxonomy matcher, CMS object,
  personalization service, carousel, disclosure, pagination control, search
  result, recent-post list, Article Card variant, sequential previous/next
  navigation, analytics client, live region or loading/error surface.
- Does not claim that items are semantically related merely because they were
  supplied. The target and visible localized heading must truthfully describe
  the source and intent.
- Does not own the page's surrounding article layout, external margin, footer
  order, sidebar placement, maximum content width or breakpoint policy.
- Does not expose columns, minimum card width, gap, section padding, border,
  heading rank, card variant, item limit or media policy as public semantic
  properties. Those are internal composition or target context decisions.

## Current Gallery Baseline

- Registry `L10`, Blog, dependency depth two, review order `124`, direct
  dependency `article-card`, and description “Related/recommended article grid
  with next/prev navigation.” The description conflicts with ADR 0079 and the
  contract, which explicitly exclude `.article-nav`.
- Contract `0.1.0`, `pilot`, exposes optional `title` and required `articles`.
  Its root and grid are required but the optional title means the semantic
  section can be unlabelled. There is no fail-closed rule for blank title or
  empty content, native list anatomy, target source lifecycle, passive-runtime
  statement, ordering rule, intrinsic response requirement or empty-state
  boundary.
- Anatomy contains only root, title and grid. It does not record list items or
  distinguish L10-owned collection layout from canonical Article Card-owned
  content and interaction.
- Canonical CSS uses physical `padding: ... 0`, `border-top`, a raw `24px`
  title margin, no heading line height/weight token, and viewport media queries
  at `640px` and `1024px`. Therefore the same component can show three cramped
  columns in a narrow sidebar merely because the viewport is wide.
- The grid is a generic `div`; list semantics and list reset are absent. Direct
  children receive only `min-width: 0`.
- `BlogStudio` renders a native `section` with no accessible name, optional `h2`
  and a generic grid `div`. Clearing the title leaves an unlabelled section;
  removing the slot leaves an empty section and heading.
- Studio does compose the shared canonical `ArticleCardArtwork` introduced in
  L1, so card markup is no longer duplicated. However L10 itself has no shared
  renderer or fixture boundary, and the related fixture data remains local to
  the broad Blog renderer.
- Site-only Studio CSS forces one/two/three columns at different container
  widths and adds preview padding. This masks the source's viewport-dependent
  behavior and means the docs consumer, not canonical L10, currently owns the
  useful response.
- Static MDX separately serializes two older Article Card examples inside a
  generic grid, while the runtime Exhibit actually uses `BlogStudio` and three
  richer Article Cards. Documentation source and rendered implementation do
  not share one fixture.
- Existing baseline images are
  `output/playwright/parity/blog/related-articles-{exhibit,studio}-{desktop,mobile}.png`.
  Desktop Studio shows three equal cards and Exhibit shows two columns inside a
  narrower documentation region. Mobile shows one complete column. These are
  useful visual candidates but only Mobile/Desktop baseline evidence.
- The baseline visual has a strong quiet heading/divider and legible cards, but
  the row count changes because of docs overrides, not canonical container
  behavior. Cards retain complete titles and one primary destination from L1.
- Shopify, Webflow and Web receive copied CSS. Shopify has the canonical
  `article-card` snippet but no L10 snippet/section, approved article source,
  current-article exclusion, limit, editor schema, heading, consumer template
  or live theme evidence.
- Shopify Liquid distinguishes `blog.articles` from `blog.next_article` and
  `blog.previous_article`. The repository currently combines neither source
  with L10, which is correct while the collection versus sequential-navigation
  boundary remains open.
- Registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and inspector
  `1020:480` are the generic Button Component Detail/Studio shell already
  inspected in this program. They provide no L10 heading, Article Card grid,
  density, responsive, article-page, dark, long-content or special-mode design.
- Deterministic baseline L10 CSS is `682 B` raw / `336 B` gzip, SHA-256
  `1b2bc73acf1bad412d87f21cf23665f1855f61d235b49c480d5ecdcafa18714d`.
  Blog CSS is `31,977 B` raw / `5,486 B` gzip against the fixed `5,529 B`
  family ceiling, leaving `43 B`. Neutral Web component CSS is `514,386 B` raw
  / `69,082 B` gzip and shared runtime is `53,811 B` raw / `10,501 B` gzip.
  L10 owns zero neutral runtime, listeners, requests or assets.

## Current Gallery Result

- Contract and Studio metadata are `0.3.0`, remain `pilot`, and expose only
  required `title` plus required `articles`. Blank title or absent article
  composition omits the complete root.
- `RelatedArticlesArtwork` is the single L10 renderer. `BlogStudio` supplies one
  shared fixture builder, so Exhibit and Studio consume the same renderer,
  article data, images, alternatives, classes, contextual heading ranks and
  canonical Article Card implementation.
- Runtime markup is one `section[aria-labelledby]`, visible H2 fixture heading,
  native `ul`, three direct `li` children, three native Article Card summaries,
  three H3 card headings and three primary native Links. Root/list/items expose
  no role, tabindex, activation, Button, live region or `.article-nav` content.
- Canonical CSS uses logical dimensions/border/padding, complete wrapping,
  accepted H3 typography tokens, a reset native list and one intrinsic
  `repeat(auto-fit, minmax(min(100%, 12rem), 1fr))` grid. Viewport media queries
  and all site-only L10 column/padding overrides are removed.
- At `200/430/680px` component widths the same source produces `1/2/3` columns
  with zero root, part or document overflow. Localized RTL plus long/unbroken
  content at `200px`, effective 200% text at `320px`, user text spacing at
  `320px`, and a one-item composition also remain complete.
- Exhibit and Studio at the same `620px` container emit identical normalized DOM
  hash `2ba84726`, computed-style hash `8f35f9bc`, `2,612`-character subtrees
  and a two-column/two-row shape with zero overflow.
- Keyboard traversal reaches exactly the three Article Card primary Links in source
  order. All show a solid `4px` focus outline under keyboard modality; a cloned
  unenhanced Link navigates natively to `#related-ash-glazes`.
- Light contrast is `17.93:1` for heading/primary Links and `13.11:1` for Badge
  text. Dark contrast is `17.18:1` for heading/primary Links and `5.94:1` for
  Badge text.
  Forced colors retain visible focus, reduced motion exposes zero active
  transitions/animations, and browser evidence reports zero console or page
  errors.
- Eight natural Exhibit/Studio captures cover Mobile, Tablet, Desktop and XL;
  seven additional captures cover keyboard focus, localized RTL/unbroken 200px,
  one item, effective 200% text, user text spacing, dark/reduced motion and
  forced colors. Four retained baseline images support before/after review.
- L10 CSS is `749 B` raw / `407 B` gzip, SHA-256
  `f9ae04ca0cbd403cc2ff5f8cbf4797d24c1875ec881532f317338d4e750872db`.
  Current Blog CSS is `28,804 B` raw / `5,148 B` gzip, leaving `381 B` under
  its fixed `5,529 B` ceiling. Current generated Neutral Web component CSS is
  `534,910 B` raw / `71,944 B` gzip and shared runtime is `117,741 B` raw /
  `22,807 B` gzip; those two repository-level surfaces retain their documented
  global gaps, while this L10 reconciliation adds zero JavaScript or assets.
- Web and Shopify adapters validate; Webflow and Shopify Blog CSS copies are
  byte-identical to canonical source. Shopify now has an article-template-only
  section whose native ordered `article_list` is limited to three, excludes the
  current article and duplicate ids, composes canonical Article Card and omits
  an empty result. First real template placement remains host-owned.
- `.article-nav` source is untouched and absent from L10 runtime/evidence.
  Owner decision 52 confirms that no Previous/Next component is registered in
  v1 and the legacy family is never interpreted as L10.
- Production docs build passed to
  `/private/tmp/the-gallery-site-batch-157-final`; `site/dist` was not rebuilt.
  Batch 157 evidence lives at `output/playwright/refinement-batch-157/`. Final
  cleanup verifies URL unresponsive, port
  `4173` free, managed server stopped and Playwright session closed.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `section`](https://html.spec.whatwg.org/multipage/sections.html#the-section-element) | A section is a thematic grouping, typically identified by a heading; it is not a generic styling wrapper. | Render L10 as a section only with a non-empty visible contextual heading and content. |
| [HTML `ul`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element) | `ul` represents an unordered list of items and uses `li` children. | Related summaries are one native list; the visual grid does not need a custom list role. |
| [HTML `article`](https://html.spec.whatwg.org/multipage/sections.html#the-article-element) | `article` represents self-contained distributable content and may be nested in a section. | Each canonical Article Card may remain its native article summary inside one list item. |
| [APG Landmark Regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) | A named section becomes a region; a visible heading can supply its name through `aria-labelledby`, while excessive landmarks reduce usefulness. | Use one named region for the complete non-empty related collection, not one landmark per card. |
| [APG accessible names](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) | Names should convey purpose, be concise, and not repeat the role name. | The visible target heading supplies truthful localized context such as “More from the journal”; do not hardcode “Related articles” as an accessible default. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Mature systems disagree on Card anatomy and expose visual/content concepts rather than a related-content widget standard. | L10 composes Gallery's accepted Article Card instead of inventing a new card API or recommendation role. |
| [Radix Themes Card](https://www.radix-ui.com/themes/docs/components/card) | Card groups related content/actions and can be composed as another element, but is a presentation primitive rather than a recommendation engine. | Preserve each canonical Article Card's semantics and do not transfer interaction to the L10 root. |
| [Radix Themes Grid](https://www.radix-ui.com/themes/docs/components/grid) | Grid exposes responsive layout concerns separately from item content. | L10 owns only intrinsic collection layout; child Article Cards keep content and interaction ownership. |
| [Polaris Resource List](https://polaris-react.shopify.com/components/lists/resource-list) | A resource list receives target items and a per-item renderer while sorting, filtering, loading and pagination are consumer capabilities. | A semantic `articles` slot is more stable than mirroring an article record or exposing query state. |
| [Polaris Card guidance](https://polaris-react.shopify.com/patterns/card-layout) | Lists belong in one coherent section rather than wrapping each item as a separate section; headings should clarify the collection purpose. | Use one L10 section, one list and repeated canonical article summaries. |
| [Shopify Liquid `blog`](https://shopify.dev/docs/api/liquid/objects/blog) | `blog.articles` is an article collection, while `next_article` and `previous_article` are distinct sequential relationships. | Shopify collection sourcing and sequential Article Nav are separate target facts; L10 must not merge them. |
| [Shopify `article_list` setting](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#article_list) | The Theme Editor supplies an ordered array of published Article objects and allows the schema to cap how many the merchant selects. | This is the native target mapping for the accepted explicit curator order and maximum three; L10 still enforces current/duplicate exclusion. |
| [Shopify Storefront Article](https://shopify.dev/docs/api/storefront/latest/objects/Article) | Storefront articles expose blog, tags, image, author, excerpt and URL data, and article queries can filter by fields. | A target can build candidates, but relevance/ranking/current exclusion and query policy remain outside the neutral component. |
| [CSS Containment Level 3](https://www.w3.org/TR/css-contain-3/) | Container response is based on an element's containing box rather than viewport/device dimensions. | L10 must respond to available inline size. An intrinsic grid can satisfy this without exposing public breakpoints. |
| [WCAG Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | Ordinary content must preserve information and functionality at a 320 CSS-pixel equivalent without two-dimensional scrolling. | Cards, headings and long/localized titles must collapse to one column and wrap completely. |

There is strong consensus on ordinary section, heading, list, article and Link
semantics. There is no standard Related Articles widget, recommendation API,
provider-neutral ranking contract or required interaction model. Shopify's own
data model reinforces that a collection and previous/next navigation are
different concepts.

## Matches, Differences, And Direction

- ADR 0079, the current contract and mature-system evidence already agree that
  L10 exposes a heading plus target-owned Article Card collection. Refinement
  makes that boundary executable rather than expanding it.
- L1 already settles the child card: one passive native article summary, one
  complete primary Link containing contextual media and title, canonical Badge,
  contextual heading rank, complete text and intrinsic variants. L10 must reuse
  it and must not add a second media Link, whole-card activation or card state.
- Cart Upsell establishes the repository precedent for target recommendation
  collections: named section, native list, fail-closed content and target-owned
  source/ranking. L10 applies the same semantic discipline to Article Cards.
- Polaris Resource List supports target item rendering, but its admin selection,
  filtering, loading and pagination features are not L10 requirements.
- Radix Grid demonstrates a separate layout API, but L10 does not need to expose
  React-style responsive column props. The intrinsic source grid is internal.
- Shopify's native ordered `article_list` maps the accepted explicit curator
  source without treating tags or common blog identity as relevance. The
  section caps selection at three and defensively removes the current article
  and duplicates.
- `.article-nav` remains legacy source evidence for a possible future separate
  Previous/Next composition. Owner decision 52 confirms it is never L10 and no
  such component is registered in v1.

## Recommended Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes when valid | `section.related-articles[aria-labelledby]` | L10 | Omitted with blank title or no renderable articles; no explicit `role`. |
| Title | yes | contextual heading with target-unique `id` | target/L10 | Complete visible localized name; target chooses heading rank from page context. |
| Articles | yes | `ul.related-articles__grid` | L10 | Non-empty native unordered list; visual grid only, no widget semantics. |
| Item | per valid card | `li.related-articles__item` | L10 | Layout wrapper for exactly one canonical Article Card composition. |
| Article summary | one per item | canonical `article.article-card` | Article Card + target | Complete target title/href; optional media/category/metadata/excerpt/author follow L1. |
| Primary destination | per Article Card | canonical native primary Link around media/title | Article Card + target | The card's required single destination; L10 adds no link or activation. |
| Result/loading/error | no | target page composition | target | Outside L10; the passive collection is omitted when no recommendations are ready. |
| Previous/next navigation | no | legacy `.article-nav` family | future component/target | Explicitly outside L10 and not registered in v1. |

No carousel controls, pagination, tabs, disclosure, refresh, “show more”,
selection, current item, skeleton, empty state, status, separator article,
tracking element or hidden duplicate headings belong to required anatomy.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Default | One named passive article-recommendation section. |
| Missing/blank title | Omit the complete root; do not emit an unlabelled section or dangling `aria-labelledby`. |
| Missing/empty articles | Omit the complete root; do not render an empty recommendation heading or empty-state UI. |
| One to three articles | Valid after current/duplicate exclusion; preserve explicit curator order and cap v1 at three. |
| Layout | Intrinsic one/two/three-or-more-column auto-fit grid according to available inline size and a private minimum card measure. |
| Card variant/content | Target composes complete canonical Article Cards; the fixture uses standard cards with contextual H3 headings. |
| Navigation | Canonical native primary Links only; no root/list/item activation or custom keyboard model. |
| Loading/error/refresh | No neutral state. Parent target owns lifecycle and renders L10 only when valid data exists. |
| Personalized content | Unsupported in v1. No tag fallback, inferred ranking or personalization is performed. |
| Long/localized/RTL | Complete heading/card text, logical flow, bidirectional target data, unbroken wrapping and no clamp. |
| Light/dark/forced colors | Divider, heading, canonical cards, Badges and Links remain perceivable through existing tokens/contracts. |
| Reduced motion | L10 has no motion; Article Card and dependencies retain their accepted behavior. |
| Print | Ordinary reading flow; target may omit recommendations in print policy without changing neutral source. |

Mobile, Tablet, Desktop and XL are evidence contexts, not L10 sizes. Columns
must derive from the component's own inline space, so the same viewport may
show one column in a sidebar and three in a wide article footer.

## Public API And Ownership

Recommended semantic API:

- `title`: required non-empty localized string that renders as the visible
  contextual heading and names the section.
- `articles`: required one-to-three semantic slot containing complete canonical
  Article Card compositions in explicit curator order after current/duplicate
  exclusion.

No controlled/uncontrolled state applies. L10 emits no event and owns no value.
Canonical Article Card primary Links emit native navigation; optional child Links
or future actions keep their own contracts. The parent target owns article
records, curation storage, loading, error, refresh, current-article exclusion,
duplicate removal, visibility, scheduling, URL/tracking, analytics and SEO. The
accepted v1 contract forbids inferred tag fallback, ranking and personalization.

Do not expose article IDs/objects, source algorithm, tag matching, relevance
score, limit, current article, loading/error, retry, personalization flag,
heading level, card variant, columns, minimum card width, gap, breakpoint,
section spacing, border, external margin or previous/next records as L10 root
properties. A target adapter may offer validated data/editor settings while
mapping back to the same two neutral semantic decisions.

## Token And Hardcoded-Value Audit

- Retain semantic subtle border, primary text, heading family/H3 size, layout
  section gap and grid gap where directly consumed.
- Add the accepted H3 weight and line-height tokens so changing the contextual
  heading element does not inherit browser-specific rhythm.
- Replace physical padding/border/margin with logical properties and replace
  raw `24px` title spacing with the existing component element-gap token.
- Reset `ul` margin, padding and list style locally. Use a private minimum card
  measure inside an intrinsic `auto-fit/minmax` expression; it is a layout
  implementation detail, not public API or a new token.
- Remove viewport media queries. The grid's available inline size, not viewport
  size, determines column count without JavaScript or site overrides.
- Keep child Article Card, Badge and Link tokens out of L10 metadata. L10 uses
  those components but does not duplicate their visual state ownership.
- Preserve zero neutral runtime/assets. The Blog family must remain at or below
  `5,529 B` gzip; fund any structural CSS from simplification within L10 and
  removal of redundant Studio-only responsive overrides.

## Visual Reference Analysis

The owner-linked Figma nodes are generic documentation/Button shells, not L10
visual evidence. The repository baseline is therefore the only L10 candidate:

- strengths: quiet top divider, clear serif heading, generous grid gap,
  recognizable canonical cards, complete title wrapping, prominent media and a
  clean one-column mobile flow;
- weaknesses: column count is produced by viewport rules plus site overrides,
  card widths vary unpredictably by host, heading rhythm partly inherits native
  defaults, and no wide/XL/dark/RTL/zoom/forced-color state is documented;
- the three Studio fixture articles, categories, images, order and “Continue
  reading” copy are evidence content only, not defaults or public API;
- no visual reference approves the final minimum card measure, maximum count,
  row balance, media crop, section padding/divider, heading copy/rank, Article
  Card variant, article-page placement or transition to adjacent content.

Preserve the baseline identity during semantic/responsive correction. Human
review must judge the final density and page composition before stability.

## Accessibility And Content Requirements

- Require a non-empty visible heading and at least one complete Article Card;
  omit invalid composition rather than render empty landmarks or headings.
- Associate the section with its target-unique heading ID through
  `aria-labelledby`. Do not add redundant `role=region`, `aria-label` or
  `tabindex`.
- Use one `ul` with direct `li` children. Do not use `listbox`, `grid`,
  `feed`, `carousel`, `toolbar`, selection or roving tabindex semantics.
- Keep each Article Card a native article summary and preserve its contextual
  heading rank, single required primary Link around contextual media and title,
  canonical Badge and optional target metadata.
- Preserve native Link Tab/Enter behavior, browser context menus, destination
  preview and modifier-key navigation. L10 adds no keyboard handling.
- Heading rank follows the surrounding page; the docs fixture uses H2 for the
  section and H3 for its cards without promoting rank to neutral API.
- Target headings and card titles must be complete/localized. Long and unbroken
  text wraps; no clamp, title attribute substitute or CSS-generated content.
- Informative card media uses contextual alternative text; redundant/decorative
  media uses `alt=""` according to L1. L10 does not rewrite alternatives.
- Verify 320 CSS-pixel reflow, effective 200% text, user text spacing, RTL/mixed
  direction, dark mode, forced colors, reduced motion, focus visibility and
  contrast inherited from the canonical child components.

## Responsive And Extreme-Content Test Matrix

- Natural viewports: Mobile `390x844`, Tablet `768x1024`, Desktop `1440x1000`,
  XL `1920x1200`, in both Exhibit and Studio.
- Same-container parity: fixed shared stage width with normalized DOM and
  computed-style hashes.
- Container widths: `200px`, below one-card threshold, two-card threshold,
  three-card threshold and wide host; no viewport-derived mismatch.
- Content: one card, three cards, more than one row, very long heading, long
  localized titles, unbroken identifiers, empty title, absent articles,
  optional card media/category/metadata/excerpt/author omitted.
- Interaction: sequential keyboard focus through each canonical card Link,
  native hash/destination behavior, visible focus and no focus on root/list/item.
- Modes: RTL/localized, mixed-direction title, light/dark, forced colors,
  reduced motion, effective 200% text, user text spacing and print inspection.
- Runtime: zero L10 listeners, observers, timers, requests, storage, live
  regions, hydration requirements or component-owned assets.
- Diagnostics: root/part/document overflow, heading relationship, list/LI/card
  counts, duplicate IDs, console/page errors, target CSS parity and bundle size.

## Cross-Target Translation

| Target | Translation boundary |
| --- | --- |
| Neutral Web | Native named section, contextual heading, native list and canonical Article Card compositions; intrinsic CSS; zero L10 JavaScript. |
| Shopify | Implemented article-template-only section uses native ordered `article_list` with limit three, removes current/duplicate records, composes canonical `article-card`, exposes contextual heading plus child-card settings, and omits empty output. First real template placement remains host-owned. |
| React/Angular | Thin renderer maps `title` plus semantic Article Card children; query/cache/router/personalization remain application services. No framework requirement enters base source. |
| Figma | Component may expose heading plus repeatable Article Card instances and intrinsic layout frames, but current nodes are not L10 evidence and the repo remains source of truth. |
| SwiftUI/Compose | Native titled section/list/grid composition with complete article destinations; data/recommendation services and adaptive layout remain target-native. |
| Webflow/Framer/future | Map the same required title/content boundary and canonical card composition; do not turn visual column settings into neutral semantic API. |

No target may copy `.article-nav` into L10. Previous/Next Article Navigation is
not registered in v1 and may only return later as a separately accepted
canonical component or explicit target composition.

## Performance Budget

- L10 CSS observation ceiling: current `336 B` gzip. Structural improvement may
  exceed that only if the complete Blog family remains at or below `5,529 B`
  gzip through local simplification.
- Neutral runtime delta: `0 B`; no listener, observer, timer, request, storage,
  custom element or hydration requirement.
- Component-owned assets/requests: `0`; media belongs to target Article Cards.
- DOM: one section, one heading, one list, one list item per valid Article Card;
  no duplicated hidden copy, breakpoint clone or empty wrapper.
- Layout: one intrinsic grid; no JavaScript measurement, resize observer,
  virtualization or per-card layout listener.

## Implementation And Verification Plan

1. Create this dossier before source modification.
2. Add accepted ADR documenting named native collection semantics, target
   recommendation ownership and explicit `.article-nav` deferral.
3. Refine contract/Studio/registry/docs to required title, required semantic
   articles, native list anatomy, canonical composition and zero runtime.
4. Create one shared Related Articles renderer/fixture and consume it from the
   existing shared Exhibit/Studio path.
5. Convert source CSS to logical intrinsic list/grid layout and remove site-only
   L10 responsive overrides.
6. Rebuild only required Web/Webflow/Shopify copied/generated component outputs;
   do not rebuild `site/dist`.
7. Run contract, Studio, docs, static-preview, shared-renderer, adapters,
   component readiness and refinement gates sequentially.
8. Use one short managed server, one explicit headless Chromium
   `gallery-refinement` session and one tab for final evidence, then close the
   browser/server and pass cleanup/assert-clean.
9. Publish the audit and progress override; keep `pilot` and human review
   pending.

## Alternatives

### A. Named passive Article Card collection — recommended

Use one required heading, native list and canonical Article Cards. Target owns
recommendations. This matches standards, accepted source boundaries and the
existing dependency without inventing behavior.

### B. Generic unnamed card grid

Allow optional title and use `div` wrappers. This avoids a landmark but loses
collection semantics and purpose when the heading is absent. It is rejected for
L10 because a component explicitly named Related Articles needs truthful visible
context; generic card layout belongs to another collection/grid primitive.

### C. Combine recommendation grid and previous/next navigation

Expose Article Cards plus `.article-nav` in one component. This matches the old
registry sentence but conflicts with ADR 0079, combines unordered suggestions
with an ordered sequence and requires an unresolved architecture decision.

### D. Make Related Articles a carousel/feed

Add controls, dynamic loading, rotation or feed semantics. No current contract,
source, design evidence or target requirement justifies those behaviors. A
canonical Carousel composition or dynamic feed would be a separate accepted
product decision.

## Risks And Remaining Review Gates

Owner decision 52 resolves the v1 source, maximum count, exclusions, curator
order, page boundary, personalization/tag fallback policy and Article
Navigation boundary. Remaining gates are target installation and human review:

1. Install the section in the first real article template after primary content
   and before Comments, with Author Card/Share Actions positioned by that host.
2. Verify the real curated records, localization, missing selections, current
   article exclusion and Theme Editor live preview in a development theme.
3. Approve the canonical Article Card presentation settings and final section
   divider/padding, heading, minimum measure, column behavior and all viewport/
   special-mode visuals.
4. Supply L10-specific design evidence or approve the repository render as the
   current visual source.
5. Complete explicit human stability review; automated evidence cannot promote
   the `pilot` contract.
