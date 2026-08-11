# Component Dossier: Article Card

Status: `human-review-ready`

Target under review: Neutral Web article-summary composition and Shopify
Online Store / Storefront article projection

Contract: `components/contracts/article-card.contract.json` (`0.3.0`)

Accepted decisions: owner response L1-A and ADR 0267

## Recommendation And Accepted Direction

Article Card is one passive native `article` composed from canonical Card and
Badge. One native Link contains the contextual media, passive summary content,
and complete visible title as one article destination. Category, author, and
any future independent action remain outside that Link so nested interactivity
cannot occur. The root never forwards clicks or keyboard events.

Keep two independent semantic presentation axes:

- `variant`: `standard | featured | minimal | horizontal | editorial` controls
  Article Card's layout/profile;
- `surface`: `default | flat | elevated` delegates the outer visual treatment
  to canonical Card.

Expose `excerptLines: none | 2 | 3 | 4`, defaulting to `none`. Numeric values
visually fit supplied text with CSS line clamp while retaining the complete
source string in DOM. Loading is an external canonical Skeleton composition,
not an Article Card state, busy lifecycle, or internal placeholder.

This direction was explicitly accepted by the owner. The implementation is a
candidate for human stability review, not an automatic `stable` promotion.

## Purpose, Uses, And Limits

- Represents one independently reusable article or blog-post summary and its
  primary destination.
- Supports lists, related-content groups, editorial features, and target-native
  blog/storefront projections.
- Supplies native article/heading/Link semantics, optional contextual media,
  passive category, target-formatted metadata, excerpt, and author composition.
- Is not a feed, collection grid, paginator, CMS query, route loader, rich-text
  renderer, analytics client, reading-time calculator, date formatter,
  taxonomy service, author directory, image CDN, or loading controller.
- Does not own heading rank, canonical URL policy, crop/focal point, media
  loading priority, locale, metadata inventory/order, author/category routes,
  or supplementary actions.
- Adds no neutral listener, observer, timer, request, storage, state mirror,
  delegated navigation, or animation loop.

## Repository Baseline And Refinement Delta

The earlier L1 contract emitted duplicate media/title Links, copied Badge
visuals, owned a private skeleton variant, used viewport response plus
Studio-only overrides, and treated Card surface as an unresolved local visual
decision. Title/excerpt fitting and the combined destination were also open.

The accepted refinement now:

- uses one media-and-title Link with no nested interactive descendant;
- composes `.card`, `.card__media`, `.card__body`, `.card__footer`, and canonical
  `card--flat` / `card--elevated` classes;
- composes passive canonical Badge outside the Link;
- removes Article Card-owned Skeleton markup, busy state, and CSS;
- keeps five intrinsic layout profiles independent from three Card surfaces;
- adds explicit non-destructive excerpt fitting;
- uses one shared `ArticleCardArtwork` and fixture in Exhibit and Studio;
- lets Related Articles consume that renderer instead of duplicating behavior;
- maps Shopify's native Article resource into the same one-Link composition;
- fixes focus clearance so the 4px Link outline never covers the adjacent
  author footer.

## Standards And Mature-System Evidence

| Source | Evidence | The Gallery direction |
| --- | --- | --- |
| [HTML `article`](https://html.spec.whatwg.org/multipage/sections.html#the-article-element) | `article` represents a self-contained reusable composition normally identified by a heading. | Keep a native `article` and contextual heading; add no generic Card widget role. |
| [HTML `a`](https://html.spec.whatwg.org/dev/text-level-semantics.html#the-a-element) | Anchor may contain flow content but cannot contain interactive descendants. | One Link may contain media/body/title only while category, author destinations, and actions remain siblings. |
| [HTML `time`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element) | `datetime` provides machine-readable dates and durations. | Targets format visible metadata and retain machine values where applicable. |
| [WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/) | Alternative text depends on informative, decorative, and functional context. | Target supplies contextual alt text or explicit `alt=""`; media adds no duplicate Link. |
| [WCAG Technique H2](https://www.w3.org/WAI/WCAG22/Techniques/html/H2) | Combining adjacent image and text destinations avoids redundant links. | Use one combined media/title destination rather than duplicate keyboard stops. |
| [WCAG Link Purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | Link purpose must be discernible from text or context. | The complete contextual title remains visible and names the destination. |
| [APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines no generic Card widget or card keyboard model. | Preserve document semantics and native Link activation; no root role or roving focus. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Systems share a Card concept but not one universal anatomy or interaction model. | Keep Gallery's accepted semantic axes and canonical composition without copying another system. |
| [Radix Themes Card](https://www.radix-ui.com/themes/docs/components/card) | Generic Card separates container presentation from composed content. | Delegate surface to canonical Card and keep Article Card layout independent. |
| [CSS Overflow `line-clamp`](https://drafts.csswg.org/css-overflow-4/#line-clamp) | Line clamp is a visual overflow operation. | Clamp only on explicit request and never mutate target source content. |
| [Shopify Liquid `article`](https://shopify.dev/docs/api/liquid/objects/article) | Article exposes title, URL, image, author, publication time, excerpt, tags, and content. | Map verified fields in target Liquid; leave query, locale, reading time, and policy target-owned. |

The references converge on native article/heading/Link semantics, contextual
media alternatives, machine-readable time, and target-owned data. They do not
establish a Card widget role, root keyboard model, universal metadata schema,
or portable loading lifecycle.

## Anatomy And Ownership

| Part | Required | Web mapping | Owner |
| --- | --- | --- | --- |
| Root | yes | `article.card.article-card` | L1 semantic boundary + canonical Card surface |
| Category slot | no | `.article-card__category-slot` | L1 placement outside Link |
| Category | no | `.badge.article-card__category` | target label + canonical Badge visuals |
| Primary Link | yes | `a.article-card__primary-link[href]` | target article destination + native Link behavior |
| Layout | yes | `.article-card__layout` | L1 private media/body response |
| Media | no | `.card__media.article-card__media` | target media data + Card/L1 containment |
| Body | yes | `.card__body.article-card__body` | canonical Card padding + L1 content rhythm |
| Metadata | no | `.article-card__meta` | target values/locale + L1 passive flow |
| Separator | no | `.article-card__meta-separator[aria-hidden=true]` | visual punctuation only |
| Title | yes | contextual `.article-card__title` inside Link | target rank/content + L1 typography |
| Excerpt | no | `p.article-card__excerpt` | target text + explicit L1 fitting |
| Author footer | no | `.card__footer.article-card__author` | target identity/destination + Card footer |

Required `title` or `href` that is blank causes the shared renderer to fail
closed. Optional wrappers are omitted rather than rendered empty.

## State, Variant, Size, And Content Matrix

| Dimension | Certified behavior |
| --- | --- |
| Standard | Vertical media/body layout; selected surface remains independent. |
| Featured | Stacks intrinsically, then splits media/body when its own container is wide enough. |
| Minimal | Text-led profile; supplied media is omitted without changing semantics or surface. |
| Horizontal | Compact media/body split at sufficient container width; otherwise stacks. |
| Editorial | Accent title treatment only; destination, content, and surface remain unchanged. |
| Surface | `default`, `flat`, or `elevated` map to canonical Card without multiplying Article Card variants. |
| No media | Link still contains complete body/title; category remains outside it. |
| No category/metadata/excerpt/author | Optional parts and empty wrappers are omitted. |
| Missing title or destination | Fail closed; no incomplete article root is emitted. |
| Excerpt complete | `none` presents every supplied line. |
| Excerpt fitted | `2`, `3`, or `4` clips only visual line boxes; source text stays complete in DOM. |
| Loading | External Skeleton is replaced by Article Card after authoritative data; L1 itself is absent while loading. |
| Pointer/keyboard | Only the native primary Link activates; root/category/media/footer add no delegated behavior. |
| Long/localized/extreme | Complete content wraps at 200px RTL and effective 200% text with zero measured overflow. |
| Light/dark/forced colors | Semantic tokens and canonical Card/Badge/focus presentation remain perceivable. |
| Reduced motion | Canonical Card disables transition/transform; L1 adds no motion. |

## Public API And State Ownership

| Property | Type/default | Ownership |
| --- | --- | --- |
| `variant` | enum / `standard` | Five Article Card layout profiles. |
| `surface` | enum / `default` | Canonical Card `default | flat | elevated`. |
| `title` | required string | Complete visible contextual heading and Link name. |
| `href` | required string | One native article destination. |
| `media` | optional slot | Non-interactive target media inside primary Link. |
| `imageAlt` | optional string | Target contextual alternative; empty string is explicit decorative choice. |
| `category` | optional string | Passive canonical Badge outside Link. |
| `metadata` | optional slot | Target-formatted passive values; interactive values must remain outside Link. |
| `excerpt` | optional string | Target-owned source summary. |
| `excerptLines` | enum / `none` | Complete or explicit 2/3/4-line visual fitting. |
| `author` | optional slot | Target identity and optional independent destination outside Link. |

L1 has no controlled/uncontrolled application state. Link navigation is native.
Targets own routing interception, prefetch, queries/cache, localization,
analytics, image loading, independent destinations, and supplementary actions.
Skeleton owns its own external loading presentation and no state is mirrored
inside Article Card.

## Token And CSS Audit

- Public L1 tokens cover focus/text color, heading/body/accent typography, font
  weights, and semantic stack/layout spacing.
- Card owns surface color, border, radius, shadow, padding, hover treatment,
  media zoom, descendant-focus overflow, and reduced-motion behavior.
- Badge owns category padding, radius, typography, case, and colors.
- Private L1 values are limited to named-container thresholds, layout tracks,
  media aspect ratios, and composition aliases; they are not consumer API.
- Logical inline/block properties replace physical placement and sizing.
- The 4px focus width is the accepted shared field/link visibility convention;
  footer spacing uses an existing semantic token so the outline clears content.
- `line-clamp` plus `-webkit-line-clamp` is a progressive visual fitting rule;
  it is active only for the explicit numeric property values.
- L1 adds `0 B` runtime and requests no component-owned asset.

## Accessibility And Responsive Requirements

- Use native `article`, a contextual heading rank, and exactly one native Link
  containing media/body/title without interactive descendants.
- Keep passive Badge and any author/category/action destination outside Link.
- Preserve native pointer, Enter, context menu, new-tab, visited, and assistive
  technology behavior; do not synthesize a clickable root.
- Keep a visible 4px focus outline with sufficient clearance from the author
  footer and a visible Card boundary in forced colors.
- Use contextual image alt or explicit decorative empty alt. Retain semantic
  `time[datetime]` values and hide visual-only separators.
- Treat excerpt fitting as optional presentation. Essential meaning must not be
  available only after a selected clamp point.
- Respond to the Article Card's named inline-size container rather than the
  viewport or Studio. Preserve logical directions, wrapping, narrow containers,
  RTL, dark mode, forced colors, effective 200% text, and reduced motion.

## Cross-Target Translation

| Target | Mapping | Status |
| --- | --- | --- |
| Neutral Web | Native article/heading/one-Link HTML, canonical Card/Badge classes, intrinsic CSS, zero L1 JS. | implemented and evidenced |
| Shopify Liquid | `article-card` snippet maps Article fields, explicit optional flags, heading rank, layout, surface, excerpt fitting, image priority, and passed blog label. | implemented; first real consumer still needed |
| Hydrogen / headless | Project Article data into the same slots and let target router/image/date services own behavior. | contract-ready |
| React / Angular | Thin renderer preserving native Link and target routing interception. | planned |
| Webflow / Framer | Bind CMS data to the same semantic slots and explicit presentation axes. | planned |
| Figma | Compose canonical Card/Badge with layout, surface, fitting, optional, long-content, and state examples. | planned; registered generic nodes are not approval |
| SwiftUI / Compose | Native article-summary composition with one destination and independent appearance/layout equivalents. | translation documented |

Shopify CSS and generated Web output remain source-derived. Shopify query,
section/block schema, editor behavior, locale policy, empty/error state,
tracking, and live consumer evidence are integration work, not neutral L1 API.

## Browser And Content Evidence

Batch 151 verifies:

- eight natural captures: Exhibit and Studio at Mobile, Tablet, Desktop, and XL;
- one passive `ARTICLE`, one Link, no nested interactive descendants, canonical
  Card media/body/footer, passive category Badge, contextual image alt, and two
  valid machine-readable `time` values;
- pointer and Enter activation on the Link only, honest adjacent Studio
  feedback, 4px focus, and focus clearance from the author;
- all five layouts, all three surfaces, and independence between those axes;
- complete excerpt plus 2/3/4-line fitting with all 302 source characters
  preserved in DOM;
- strict optional omission and fail-closed blank title/destination behavior;
- exact Exhibit/Studio normalized DOM and selected computed-style parity at
  512px (`8680eb46` / `7bf1e286`);
- localized RTL at 200px, effective 200% text at 320px, dark mode, forced
  colors, and reduced motion;
- zero root/part/document overflow, console errors, page errors, active
  reduced-motion animation, and additional browser pages.

Evidence lives in `output/playwright/refinement-batch-151/`. The run reused one
responsive external server, used one stable headless session and one page, then
closed the owned browser and passed `evidence:assert-clean`.

## Remaining Risks And Human Review

- Human review must approve the final standard/featured/minimal/horizontal/
  editorial appearance, surface treatments, typography, rhythm, crop, category
  overlay, author spacing, and explicit excerpt fitting.
- A live Shopify consumer must still prove real article query, section/block
  schema, locale/date policy, image loading priority, analytics, editor
  behavior, and empty/error handling.
- Target teams must ensure interactive metadata never enters the primary Link
  and essential information is not placed only beyond a configured clamp.
- Figma nodes remain generic historical shells and do not prove L1 visual
  parity or approval.
- Program-level CSS/runtime and Blog-family budget gaps remain documented
  performance work; L1 itself adds no runtime.

## Readiness Decision

`human-review-ready`. Owner decisions, canonical composition, API, optional
states, accessibility, responsive behavior, content extremes, Web/Shopify
translation, exact Exhibit/Studio parity, performance accounting, and evidence
now agree. L1 remains `pilot`; no `stable` or live-target promotion is implied.
