# Related Articles Web Refinement Audit

Date: 2026-08-11

Batch: 157

Component: L10 `related-articles`

Status: refined and ready for explicit human review; contract remains `pilot`

## Outcome

Related Articles is one passive, fail-closed, named thematic section containing
one to three explicitly curated canonical Article Cards. Owner decision 52 is
now executable across the neutral contract and Shopify adapter: the target
preserves curator order, excludes the current article and duplicates, and does
not infer a tag fallback, ranking or personalization.

Exhibit and Studio consume the same renderer and fixture. The canonical grid
responds to its own inline size, the component owns no runtime, and renewed
Mobile, Tablet, Desktop, XL and special-mode evidence passes. Previous/Next
Article Navigation is outside L10 and is not registered in v1. The component is
prepared for human visual and stability review, but no `stable` promotion has
been made.

## Certification Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive curated article-summary collection only; not a query, ranking engine, recent-post list, carousel, feed or sequential navigator. |
| Anatomy and composition | pass | Named native `section`, contextual heading, `ul > li`, exactly one complete canonical Article Card per item. |
| Required/optional content | pass | Blank title or absent cards emits no root; one to three cards are valid; renderer hard-caps three. |
| Source policy | pass | Explicit curator order, current/duplicate exclusion, no tag fallback, inferred relevance or personalization in v1. |
| States and modes | pass for neutral scope | Passive default plus canonical Article Card primary-Link hover/focus; no L10 value, loading/error state or event. |
| Tokens and CSS | pass | Semantic tokens, logical geometry, intrinsic grid, private card measure, no viewport component breakpoint or public layout knob. |
| Accessibility | pass | Heading relationship, native list/articles/Links, complete alternatives, visible keyboard focus, AA contrast, native navigation and no custom widget roles. |
| Responsive/content resilience | pass | `1/2/3` columns at `200/430/680px`; RTL, long/unbroken, one item, effective 200% type and user text spacing have zero overflow. |
| Runtime/performance | pass for L10/Blog | Zero L10 JavaScript/assets; Blog CSS is `5,148 B` gzip against `5,529 B`, leaving `381 B`. |
| Exhibit/Studio parity | pass | Exact DOM hash `2ba84726` and computed-style hash `8f35f9bc` at the same `620px` container. |
| Targets | pass for implemented scope | Neutral Web plus source-identical Webflow/Shopify CSS; Shopify article-template section maps native `article_list` into canonical Article Cards. |
| Human review | required | Final visual approval, first real article-template installation, live Theme Editor proof and L10-specific design evidence remain review gates. |

## Contract, Anatomy, And API

The target-agnostic contract is `0.3.0`, remains `pilot`, and exposes only two
semantic properties:

| Property | Type | Requirement | Behavior |
| --- | --- | --- | --- |
| `title` | string | required non-empty | Visible localized contextual heading; blank trimmed value omits the complete root. |
| `articles` | slot | required one-to-three | Complete canonical Article Cards in explicit curator order after current/duplicate exclusion. |

Verified runtime anatomy:

- one native `SECTION`, no explicit role, label or tabindex, named by its
  visible H2 fixture heading through matching `aria-labelledby` and `id`;
- one direct native `UL` with no widget role;
- three direct `LI` entries, each containing one direct native
  `ARTICLE.article-card`;
- three contextual H3 card headings and three canonical
  `a.article-card__primary-link` destinations;
- three informative image alternatives and three canonical Badge categories;
- zero duplicate IDs, root/list/item activation, Buttons, live regions or
  `.article-nav` descendants.

Fixture H2/H3 ranks, copy, images, categories, destinations and the three-item
count are evidence, not public defaults. Targets choose contextual ranks and
card content while preserving the same semantic boundary.

L10 owns no controlled/uncontrolled value, selection, current item, event,
loading, error, empty UI, query, refresh, focus manager or status region. Each
canonical Article Card retains its own single primary Link containing
contextual media and complete title; L10 adds no second destination or
JavaScript whole-card delegation.

## Curated Source And Page Boundary

The accepted v1 source is one explicitly curated ordered set of at most three
articles. Before rendering, the target removes:

- the current article;
- repeated article identities;
- incomplete records that cannot produce a truthful title and destination.

The remaining order is the curator's order. L10 does not derive candidates from
tags, infer relevance, rank automatically or personalize. Storage, freshness,
loading, error handling, analytics, tracking, SEO and editor workflow remain
target responsibilities, but they may not change the neutral output contract.

On an article page, the host places L10 after primary article content and before
Comments. Author Card and Share Actions may be positioned around that boundary.
Legacy `.article-nav` is never L10 anatomy, API, state, fixture, evidence or
adapter mapping. No Previous/Next Article Navigation component is registered in
v1.

## Accessibility And Interaction

- Blank title produces zero `.related-articles` roots. The test harness also
  removed the required article composition and observed zero roots.
- Exactly three focusable elements exist in the fixture: the canonical Article
  Card primary Links. Keyboard order follows curator/source order and every
  focus target shows a solid `4px` outline.
- A native unenhanced Link navigated to `#related-ash-glazes` and resolved a
  real fragment target. L10 needs no navigation runtime.
- Light contrast is `17.93:1` for heading and primary Link and `13.11:1` for
  Badge text. Dark contrast is `17.18:1` for heading and Link and `5.94:1` for
  Badge text. Hover preserves those ratios.
- Forced colors retains a visible solid `4px` primary-Link outline. Under
  reduced motion, the complete subtree has zero active transitions or
  animations.
- Browser diagnostics contain no console warnings/errors or page errors.

No listbox, grid widget, feed, carousel, toolbar, selection, `aria-current`,
roving tabindex, root click forwarding or live announcement was added.

## Responsive And Extreme Content

The canonical grid uses:

```css
repeat(auto-fit, minmax(min(100%, 12rem), 1fr))
```

The private `12rem` measure is a compositional implementation detail, not a
public property or token.

| Component width | Columns | Rows | Item width | Overflow |
| ---: | ---: | ---: | ---: | ---: |
| `200px` | 1 | 3 | `200px` | zero root/part/document |
| `430px` | 2 | 2 | `199px` | zero root/part/document |
| `680px` | 3 | 1 | `205.33px` | zero root/part/document |

Localized RTL plus long/unbroken content at `200px`, effective 200% root text
at `320px`, user text spacing at `320px`, and a one-item composition all remain
complete with zero root, part or document overflow.

Eight natural captures cover Exhibit and Studio at Mobile `390x844`, Tablet
`768x1024`, Desktop `1440x1000` and XL `1920x1080`. Seven additional captures
cover keyboard focus, RTL/extreme content, one item, effective 200% text, user
text spacing, dark/reduced-motion and forced-colors modes.

## Tokens And CSS

L10 directly consumes:

- color: `--color-border-subtle`, `--color-text-primary`;
- typography: `--font-family-heading`, `--tg-typography-h3-weight`,
  `--typo-h3-size`, `--typo-h3-line-height`;
- spacing: `--space-layout-section-gap`, `--space-layout-element-gap`,
  `--space-layout-grid-gap`.

The CSS uses logical inline size, block padding and block-start border. The
native list resets margin, padding and markers. Article Card continues to own
its typography, media, Badge, primary Link, focus and optional-content tokens;
L10 neither copies them nor creates a component-scoped public token layer.

No public property exposes columns, minimum card width, gap, section padding,
border, heading rank, card variant or media policy. Those are private
composition or target-context decisions.

## Exhibit And Studio Parity

`RelatedArticlesArtwork` and `buildRelatedArticlesFixture` are the one renderer
and fixture used in both modes. At a fixed `620px` root width:

- normalized DOM hash: `2ba84726` in Exhibit and Studio;
- computed-style hash: `8f35f9bc` in both;
- serialized subtree length: `2,612` characters in both;
- grid: two columns and two rows in both;
- root, part and document overflow: zero in both.

The renderer filters incomplete fixture items and applies `.slice(0, 3)`, which
enforces the public maximum without exposing a `limit` property. The static MDX
example and Studio renderer both compose the current canonical Article Card
primary-Link contract.

## Cross-Target Translation

| Target | Result / boundary |
| --- | --- |
| Neutral Web | Native named section, list and canonical Article Cards; intrinsic Blog CSS; zero L10 JavaScript. |
| Shopify | Article-template-only `related-articles.liquid` section uses native ordered `article_list` capped at three, excludes current/duplicate records, composes the canonical `article-card` snippet, exposes validated heading/card settings and omits empty output. First template placement remains host-owned. |
| Webflow | Blog CSS projection is byte-identical to canonical source; content modelling must preserve title/list/card semantics. |
| React/Angular | Thin renderer maps title plus semantic Article Card children; query/cache/router services remain application-owned. |
| Figma | Future component may model heading plus repeatable cards and intrinsic layout, but generic registered nodes are not L10 design approval. |
| SwiftUI/Compose/future | Use native titled section/list/grid and complete article destinations; curation storage and adaptive layout remain target-native. |

The neutral implementation imports no React, Shopify, Figma or target API.
React exists only in the documentation renderer.

## Performance

| Surface | Current | Ceiling | Result |
| --- | ---: | ---: | --- |
| L10 CSS slice | `749 B` raw / `407 B` gzip | `336 B` observation ceiling | `+71 B` gzip; explicitly funded within Blog family |
| Blog CSS | `28,804 B` raw / `5,148 B` gzip | `5,529 B` | pass; `381 B` headroom |
| Neutral Web component CSS | `534,910 B` raw / `71,944 B` gzip | `65,536 B` | documented repository-level gap; no L10 batch delta |
| Shared neutral runtime | `117,741 B` raw / `22,807 B` gzip | `8,192 B` | documented repository-level gap; `0 B` L10 delta |
| L10 listeners/observers/timers/requests/assets | `0` | zero-runtime boundary | pass |

SHA-256 values:

- L10 slice: `f9ae04ca0cbd403cc2ff5f8cbf4797d24c1875ec881532f317338d4e750872db`
- Blog CSS: `d4fcfd437644d0a0b770feabd440751d6a4771fa720611046d1e37f36a11522d`
- Neutral Web component CSS: `a4a353c4b47373fb2e4ffc0d53645fb9cc255265818f9f013fcc5c4056570a5d`
- shared runtime: `0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`

Webflow and Shopify Blog CSS copies are source-identical.

## Verification And Evidence

Passing gates:

- `npm run validate:docs`
- `npm run validate:refinement-decisions`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run audit:previews:static`
- `npm run audit:components`
- `npm run build:adapter:web:components`
- `npm run build:adapter:shopify:components` with only the repository's known,
  unrelated maturity warnings
- TypeScript validation for the docs site
- production Vite build to `/private/tmp/the-gallery-site-batch-157-final`
- `npm run evidence:cleanup`
- `npm run evidence:assert-clean`

The production build did not write `site/dist`. Browser evidence is retained at
`output/playwright/refinement-batch-157/`: eight natural images, seven special
images, the executable probe and `results.json`.

The evidence phase used one server lifecycle, one explicit headless Chromium
session named `gallery-refinement`, one tab and sequential navigation. Final
status is clean: Gallery URL unresponsive, port `4173` free, managed server
stopped and Playwright session closed.

## Remaining Review Gates

1. Install the section in the first real article template after primary content
   and before Comments, then verify live Theme Editor selection, localization,
   current-article exclusion and duplicate filtering in a development theme.
2. Approve the canonical Article Card presentation settings and final divider,
   padding, heading, minimum measure and viewport/special-mode visuals.
3. Supply L10-specific design evidence or approve the repository render as the
   visual source for v1.
4. Complete explicit human stability review. Automated evidence cannot promote
   this `pilot` contract to `stable`.
