# Component Dossier: Article Hero

Status: `human-review-ready`

Target under review: Neutral Web article-introduction composition and Shopify
Online Store / Storefront Article projection

Contract: `components/contracts/article-hero.contract.json` (`0.3.0`)

Accepted decisions: owner response L2-A and ADR 0268

## Recommendation And Accepted Direction

Article Hero is one passive native `header` introducing its surrounding
article/page with a required contextual heading and optional target media,
category, and metadata. Retain exactly three semantic variants:

- `full`: background media with one private visual contrast scrim;
- `split`: media/content composition that splits only when the component's own
  container is wide enough;
- `text-only`: bounded centered introduction that never requires media.

`full` and `split` derive one private safe no-media state. Required title and
supplied metadata stay in readable normal flow with normal text colors, no
overlay assumption, no media-dependent height, no empty track, and no invented
substitute image. Unsupported variant input normalizes to `full` before the
fallback is calculated. The root remains unframed.

The host owns heading rank, crop/focal point, responsive image policy, loading
priority, contextual alt, category/author Links, metadata inventory/order,
locale, and duration policy. This accepted implementation is a candidate for
human review, not an automatic `stable` promotion.

## Purpose, Uses, And Limits

- Introduces one article, story, journal entry, or editorial page.
- Provides native header/heading semantics, optional contextual media, optional
  category context, and target-formatted metadata.
- Supports full-image, split, and text-only editorial placements.
- Is not the surrounding `article`, page shell, Card, action surface, CTA,
  breadcrumb, CMS query, date/duration formatter, SEO/structured-data emitter,
  analytics client, router, image CDN, focal-point service, or loading manager.
- Does not infer duration, taxonomy, author destinations, date format, heading
  rank, image meaning, loading priority, or crop.
- Adds no neutral listener, observer, timer, request, storage, state mirror,
  focus behavior, delegated interaction, or animation loop.

## Repository Baseline And Refinement Delta

The earlier implementation mixed viewport response with Studio-specific
geometry, could retain inverse colors and empty split structure when selected
media was absent, and treated fallback/surface/media policy as open. Registered
Figma nodes were generic Button shells rather than L2-specific evidence.

The accepted refinement now:

- uses one shared `ArticleHeroArtwork` and fixture for Exhibit and Studio;
- keeps a passive native `header`, private layout, contextual heading, and
  target-owned semantic media/metadata;
- responds through one named inline-size container with logical dimensions;
- derives safe no-media behavior for full/split and normalizes malformed
  variant input before deriving that state;
- preserves complete category/title/metadata without source clamps or runtime
  measurement;
- keeps the private full-image overlay visual-only and hidden from assistive
  technology;
- maps Shopify Article fields into the same anatomy without inferred duration,
  taxonomy, JavaScript, or structured data;
- retains an unframed neutral root and zero L2 runtime.

## Standards And Mature-System Evidence

| Source | Evidence | The Gallery direction |
| --- | --- | --- |
| [HTML `header`](https://html.spec.whatwg.org/multipage/sections.html#the-header-element) | `header` is introductory/navigational content and does not create a section. | Keep native `header` inside the target article/page; add no Hero widget role or landmark. |
| [HTML `article`](https://html.spec.whatwg.org/multipage/sections.html#the-article-element) | Article examples compose headings, bylines, and publication time in a header. | Let the target own the article boundary while L2 supplies its introduction. |
| [HTML headings](https://html.spec.whatwg.org/multipage/sections.html#headings-and-outlines) | Heading rank follows the surrounding document hierarchy. | Require complete title content while the host chooses H1-H6. |
| [HTML `time`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element) | `datetime` supplies machine-readable dates and durations. | Preserve machine values while visible order/format stay target-localized. |
| [WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/) | Alt text depends on informative/decorative context. | Host supplies contextual alt or explicit `alt=""`; placement alone does not decide meaning. |
| [WCAG Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Text contrast must remain sufficient over its effective background. | Verify full-mode text over every real responsive crop; use split/text-only when safety cannot be proved. |
| [WCAG Technique G145](https://www.w3.org/WAI/WCAG22/Techniques/general/G145.html) | Shading/fogging can protect contrast over varied imagery. | Keep one private scrim; do not expose arbitrary overlay styling as semantic API. |
| [WCAG Reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html) | Content should reflow without two-dimensional scrolling. | Stack intrinsically and preserve complete title/metadata without empty tracks. |
| [APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines no Hero widget or keyboard model. | Use document semantics and normal reading order with no tabindex or custom keys. |
| [Open UI components](https://open-ui.org/components/) | Open UI defines no consensus Hero primitive. | Treat L2 as Gallery editorial composition with a small semantic API. |
| [Radix Themes layout](https://www.radix-ui.com/themes/docs/overview/layout) | Mature systems compose typography/media/layout primitives rather than a Hero widget. | Keep internal tracks, thresholds, measure, crop, and rhythm private. |
| [Shopify article template](https://shopify.dev/docs/storefronts/themes/architecture/templates/article) | Article templates delegate markup/settings to sections. | A target snippet can map Article data; the first real section/template remains integration work. |
| [Shopify Liquid `article`](https://shopify.dev/docs/api/liquid/objects/article) | Article exposes title, image, author, publication timestamp, tags, excerpt, content, and URL. | Map verified fields; do not infer missing data or platform policy. |

There is no cross-system Hero widget consensus. HTML/WAI/WCAG provide the
stable base: introductory header, contextual heading, semantic time,
contextual media alternatives, contrast, reflow, and no custom interaction.

## Anatomy And Ownership

| Part | Required | Web mapping | Owner |
| --- | --- | --- | --- |
| Root | yes | `header.article-hero` | L2 introductory boundary; target owns article/page |
| Layout | yes | `.article-hero__layout` | L2 private intrinsic composition |
| Background media | no | `.article-hero__bg` | target media/alt/crop/loading + L2 full placement |
| Overlay | only full with media | `.article-hero__overlay[aria-hidden=true]` | L2 private contrast treatment |
| Split media | no | `.article-hero__media` | target media/alt/crop/loading + L2 split placement |
| Content | yes | `.article-hero__content` | L2 title/context flow |
| Category | no | `p.article-hero__category` | target context/destination policy + L2 typography |
| Title | yes | contextual H1-H6 `.article-hero__title` | target rank/text + L2 typography |
| Metadata | no | `.article-hero__meta` | target fields/order/locale/Links + L2 flow |
| Separator | no | `.article-hero__meta-separator[aria-hidden=true]` | visual punctuation only |

Blank title causes the shared renderer and Shopify projection to fail closed.
Absent category/metadata/media wrappers are omitted.

## State, Variant, Size, And Content Matrix

| Dimension | Certified behavior |
| --- | --- |
| Full with media | Media fills background; visual scrim protects stable on-image category/title/metadata. |
| Full without media | No background/overlay; zero effective media height; normal text colors and readable padded flow. |
| Split with media | One column at 600px; equal media/content columns at 700px under current private threshold. |
| Split without media | One content column, no empty media track, normal colors, complete title/metadata. |
| Text-only | Centered bounded content, no media requirement, no missing-media class. |
| Unsupported variant | Normalizes to full, then derives full's safe media state from actual supplied media. |
| Without category/metadata | Omit absent parts without empty wrappers or residual gaps. |
| Missing/blank title | Fail closed; no unnamed header root. |
| Long/localized | Complete content wraps without clamps at 200px RTL and effective 200% text. |
| Light/dark | Normal tokens or stable on-image neutral; real crop contrast remains target evidence. |
| Forced colors | Overlay becomes system Canvas and content system CanvasText with no overflow. |
| Reduced motion | Zero L2 transition, animation, transform, observer, or runtime. |
| Keyboard/pointer | Passive L2 adds no focus target or activation; target-owned child Links remain native. |

There is one fluid intrinsic size. Container thresholds, tracks, content measure,
minimum height, padding interpolation, and aspect ratios are private CSS.

## Public API And State Ownership

| Property | Type/default | Ownership |
| --- | --- | --- |
| `variant` | enum / `full` | `full`, `split`, or `text-only`. |
| `backgroundMedia` | optional slot | Target media for full mode; omission derives safe fallback. |
| `splitMedia` | optional slot | Target media for split mode; omission derives safe fallback. |
| `category` | optional string | Compact context label; any destination remains target-owned. |
| `title` | required string | Complete visible contextual heading. |
| `metadata` | optional slot | Target publication/author/duration/taxonomy composition. |

L2 has no controlled/uncontrolled state. Inputs are render configuration, not
widget state. The host owns heading rank through composition/adapters and owns
routing, links, query/cache, locale, image source/crop/loading, analytics, SEO,
and structured data.

## Token, CSS, Runtime, And Asset Audit

- Public tokens cover normal/accent/secondary/on-image color, display/heading
  and body typography, semantic font weights, and layout/stack spacing.
- Private aliases own content measure, image minimum height, overlay color,
  responsive inline padding, aspect ratio, grid tracks, and container threshold.
- Logical inline/block dimensions and insets preserve writing modes.
- The fixed `45rem`, `22.5rem`, `40rem`, `4/3`, and `68%` values are private
  composition decisions, not consumer configuration. Human review can revise
  the aesthetic without widening the semantic API.
- Category tracking/case are L2 editorial treatment; no target data behavior is
  encoded in CSS.
- L2 adds `0 B` JavaScript, zero event listeners, and no component-owned asset
  request. Media is a target slot.

## Accessibility And Responsive Requirements

- Render a native `header` within the target article/page and one non-empty
  contextual heading whose rank follows the document hierarchy.
- Add no Hero role, region label, tabindex, key handler, live region, or
  synthetic click behavior.
- Preserve complete category/title/metadata and semantic DOM reading order
  independent of visual split/grid placement.
- Supply contextual informative alt or explicit decorative empty alt; preserve
  machine-readable `time[datetime]` values and hide visual separators.
- Prove full-image contrast against every real responsive crop and theme. Use
  split/text-only if the target cannot prove that evidence.
- Keep full/split missing-media states readable, normal-flow, and complete.
- Pass narrow containers, RTL/localization, effective 200% text, dark, forced
  colors, and reduced motion without horizontal overflow or motion dependency.

## Cross-Target Translation

| Target | Mapping | Status |
| --- | --- | --- |
| Neutral Web | Native header/contextual heading, target media/metadata slots, private fallback, named-container CSS, zero L2 JS. | implemented and evidenced |
| Shopify Liquid | `article-hero` maps Article title/image/author/date plus explicit variant, heading, label, visibility, alt policy, loading, and sizes. | implemented; live section/template consumer pending |
| Hydrogen / headless | Project Article data into the same slots; target owns query, router, image, locale, and cache. | contract-ready |
| React / Angular | Thin passive renderer preserving target heading/media composition. | planned |
| Webflow / Framer | CMS bindings use the same three variants and safe media state. | planned |
| Figma | Three variants, full/split no-media, long content, overlay and crop examples. | planned; current generic nodes are not approval |
| SwiftUI / Compose | Native introductory composition with equivalent safe media fallback. | translation documented |

Generated Web/Shopify/Webflow CSS remains source-derived. Shopify query,
section/template schema, editor lifecycle, focal point, image priority, locale,
empty/error handling, SEO, and analytics are integration work.

## Browser And Content Evidence

Batch 152 verifies:

- eight natural captures: Exhibit and Studio at Mobile, Tablet, Desktop, and XL;
- passive `HEADER`, one H2 in docs context, no role/tabindex/interactive/live
  descendants, contextual image alt, visual-only hidden overlay, two machine
  times, and hidden separators;
- full with media, split at 600/700px, split without media, full without media,
  text-only, optional omission, and blank-title fail-closed behavior;
- exact Exhibit/Studio normalized DOM and selected computed-style parity at
  640px (`c8a1c099` / `c148679a`);
- localized RTL at 200px, effective 200% text at 320px, dark mode, forced
  colors, and reduced motion with zero root/part/document overflow;
- conservative white-title contrast of `7.81:1` over an all-white image after
  the 68% black scrim composite, and `21:1` over black;
- zero console warnings/errors, page errors, active reduced-motion animation,
  or additional pages.

Evidence lives in `output/playwright/refinement-batch-152/`. The run used one
stable headless session and one page, closed the owned browser, preserved the
responsive user-owned server, and passed `evidence:assert-clean`.

## Remaining Risks And Human Review

- Human review must approve full/split/text-only art direction, crop, focal
  point, text-safe area, display scale, line breaks, rhythm, minimum height,
  overlay density, and missing-media presentation at four viewports.
- The 200px RTL stress case is complete and non-overflowing but intentionally
  exposes very dense display typography for human judgment.
- Every live full-image consumer must re-prove contrast against its real crops;
  the conservative fixture measurement is not universal image approval.
- A live Shopify consumer must prove query, section/template schema, editor
  behavior, focal point/sizes/loading, locale, SEO, analytics, and empty/error
  handling.
- Registered Figma nodes remain generic historical shells rather than L2 owner
  artwork or parity evidence.
- Blog-family and global CSS/runtime gaps remain documented; L2 adds no runtime.

## Readiness Decision

`human-review-ready`. Owner direction, safe media behavior, unframed boundary,
API, semantics, accessibility, responsive states, content extremes, contrast,
Web/Shopify translation, exact Exhibit/Studio parity, and evidence agree. L2
remains `pilot`; no `stable` or live-target promotion is implied.
