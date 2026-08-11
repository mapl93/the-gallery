# Component Dossier: Gallery Grid

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify section translation

Contract: `components/contracts/gallery-grid.contract.json`

## Recommendation

Keep Gallery Grid as a passive, finite, image-led section whose optional visible
title provides context for one required ordered target-owned media slot. Use a
native `ul`/`li` composition without an APG `grid` role. A titled composition is
a native `section` named by its heading; an untitled composition uses a generic
`div`. Missing required items omits the root.

Retain the registered `grid` and `masonry` variants because ADR 0082 recognizes
registry-backed Section variants as current source facts. Make their visual
meaning explicit without expanding the API: `grid` is a regular row-major grid
with one private uniform crop candidate; `masonry` preserves target media's
natural proportions in source-flow CSS columns. Column counts, thresholds,
crop, ratio, gap and item size remain private composition.

Treat every canonical fixture item as passive. Remove `tabIndex`, pointer-only
zoom and focus styling from passive items. A target may place a real native link
or button inside an item after choosing activation semantics; only that native
descendant receives focus. Gallery Grid does not choose navigation, Lightbox,
selection, commerce, whole-item activation, or interaction motion.

The existing Masonry Gallery contract overlaps S5's `masonry` presentation but
also owns artwork captions and storytelling-specific anatomy. Do not remove or
alias either accepted component in this batch. Record whether S5 should retain
its masonry variant as an owner/architecture review question. The safe neutral
implementation can make both current variants truthful without deciding their
long-term product identity.

Use one named component container and remove Studio-owned columns and heights.
Add a localized Shopify section whose reorderable image blocks project the
target-owned slot without leaking Shopify objects or editor settings into the
neutral contract. The candidate must add zero component runtime and stay within
the already binding Sections gzip ceiling.

## Purpose And Limits

- Presents a finite visual collection of related images beneath optional
  contextual copy in editorial, collection, exhibition, studio, or campaign
  contexts.
- `grid` provides a regular scan pattern and consistent row rhythm. `masonry`
  provides a source-flow image wall that preserves natural media proportions.
- Gallery Grid owns the optional section heading, ordered repeated layout,
  variant presentation, list reset, media containment, responsive composition,
  and target-interactive focus treatment.
- The target owns records, image source, intrinsic dimensions, responsive
  candidates, loading, alt/decorative intent, captions or other item content,
  activation, destination/result, analytics, localization, and editor data.
- It is not an APG grid widget, Product Grid, selectable collection, Lightbox,
  Carousel, Lookbook, Collage, Masonry Gallery caption model, image loader,
  virtualizer, infinite feed, data source, or CMS schema.
- It owns no current item, selection, roving tabindex, Arrow-key model, modal
  lifecycle, history, live announcement, request, observer, timer, or runtime.

## Current Gallery Baseline

- Registry identity `S5`, category `sections`, selector `.gallery-grid`, no
  dependencies, dependency depth `0`, and review order `165`.
- Contract `0.2.0`, `pilot`: five anatomy parts, two variants, one size, three
  states, one behavior, three properties, nine public tokens, Web implemented,
  and Shopify planned.
- ADR 0082 accepts the optional title, required ordered target-owned item slot,
  both registry variants, and unresolved passive/link/Lightbox activation. It
  does not authorize a structured item schema or component-owned runtime.
- Every shared-renderer root is an unnamed `section`. The optional title has no
  id, so it does not name the root; an empty title still leaves section
  semantics.
- The renderer uses generic `div` wrappers for the collection and items, then
  adds `tabIndex=0` to all four passive image items. The result is four focus
  stops with no role, name, activation, or event.
- Programmatic focus enters a passive item and eventually scales its image to
  `1.03`; the item has no reliable visible outline in that focus path. The
  canonical fixture therefore advertises interaction that does not exist.
- The MDX fallback is semantically stronger than the renderer: it names a
  section and uses passive `figure` items, but it still lacks a native list and
  therefore disagrees with the actual Exhibit/Studio DOM.
- Canonical CSS uses hardcoded `24px`, `280px`, `8px`, physical width/height and
  margins, incomplete H2 typography, `auto-fill`, a viewport masonry query, a
  generic container query, and passive hover/focus zoom.
- Studio separately forces two grid columns, `220px` item minimum heights, two
  masonry columns, an even-item `310px` media height, and a one-column threshold.
  Site code materially owns S5 layout, crop, height, and variant behavior.
- Baseline exact Exhibit/Studio DOM is `1,006` characters, FNV-1a `15f4628d` at
  every paired viewport. Equality exists because both views share one renderer;
  its semantics and focus model remain wrong in both places.
- Baseline Mobile is `358x1,808px` with one `310px` track and item heights
  `465/465/465/220px`. Tablet is `736x1,197px` with two `340px` tracks and four
  `510px` items.
- Desktop Exhibit is `420x2,115.41px` with one `372px` track; Studio is
  `532x891px` with two `238px` tracks. XL Exhibit is `584x969px` with two
  `264px` tracks; Studio is `752x1,221px` with two `348px` tracks.
- Three fixture images are natural `1800x2700` portraits and one is
  `1800x1202` landscape. Row stretching/cropping and Studio minimums create the
  large layout divergence rather than a documented variant rule.
- At Desktop Studio, baseline masonry is two CSS columns. Items 1/2 flow down
  the first column and items 3/4 down the second; heights are
  `357/357/357/310px`. Source flow is column-major visually.
- Empty title yields an unnamed `SECTION` with no header. Missing required items
  still leaves a `169px` empty section instead of omitting invalid composition.
- All 183 Studio definitions reference the same Figma file/frame/inspector
  (`k3axoTaF87g17fBRgJ0PMY`, `943:7`, `1020:480`). Those generic shell nodes do
  not approve S5 crop, ratios, columns, density, motion, or hierarchy.
- Shopify has copied Section CSS but no dedicated Liquid/schema/data mapping.
  The adapter reports `css-ready`, missing Liquid/data, and `ready: false`.
- Eight paired baseline captures live under
  `output/playwright/refinement-batch-64/before/`; every document retains equal
  client/scroll width.
- Deterministic gzip baseline is Sections `6,857 B`, Neutral Web component CSS
  `67,868 B`, and shared runtime `10,589 B`. The Sections ceiling is `6,861 B`,
  leaving only `4 B`; S5 must simplify existing CSS and add `0 B` runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML lists, figure and section](https://html.spec.whatwg.org/multipage/) | `ul`/`li` provide ordinary collection semantics; `figure` may group self-contained media and optional caption; a section normally has identifying heading content. | Use a native list, allow target-owned figure content, name titled roots, and avoid an unnamed section for titleless output. |
| [WAI groups of images](https://www.w3.org/WAI/tutorials/images/groups/) | A related image collection still needs context-appropriate alternatives for each informative image; decorative/redundant images use empty alternatives. | Keep image meaning and decorative intent target-owned; no shared title or position substitutes for per-image semantics. |
| [WAI image curricula](https://www.w3.org/WAI/curricula/developer-modules/images/) | The same image can require different alternative treatment depending on context. | Do not derive alt from filename, index, section title, or merchant caption automatically. |
| [CSS Grid 2](https://www.w3.org/TR/css-grid/) | Ordinary CSS Grid is layout, not the ARIA composite widget; visual reordering cannot repair source order. | Use row-major CSS Grid with native document navigation and no `grid`/`gridcell` roles or roving tabindex. |
| [CSS Grid 3 masonry draft](https://www.w3.org/TR/css-grid-3/) and [CSSWG 2025 update](https://www.w3.org/blog/CSS/2025/09/18/masonry-update-issues/) | Native masonry remains a Working Draft with open syntax and explicit reading-order/backtracking concerns. | Do not adopt experimental dense masonry or runtime packing; retain source-flow multi-columns and document their column-major visual order. |
| [CSS Fragmentation](https://www.w3.org/TR/css-break-3/) | Multi-column layout is a fragmentation context and `break-inside` controls whether an item is split. | Keep each masonry item intact with logical fragmentation rules and no visual reorder. |
| [Open UI Card research](https://open-ui.org/components/card.research/) and [Image research](https://open-ui.org/components/image.research) | Mature systems diverge on card activation, metadata, ratio, fit, and overlays; no unified gallery item API exists. | Do not turn each image into Card, infer whole-item activation, or expose target image delivery as parent properties. |
| [Radix Aspect Ratio](https://www.radix-ui.com/primitives/docs/components/aspect-ratio) | Radix exposes ratio as a generic React composition primitive, not as gallery semantics. | Keep the regular-grid crop as private CSS candidate rather than importing React props into the neutral API. |
| [Polaris Inline Grid](https://polaris-react.shopify.com/components/layout-and-structure/inline-grid) | Polaris separates responsive equal-gap layout from child meaning and exposes framework-specific column props. | Let S5 own private responsive geometry while every child retains target semantics; do not copy Polaris props. |
| [Shopify blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks) and [section/block guidance](https://shopify.dev/docs/storefronts/themes/best-practices/templates-sections-blocks) | Section blocks are addable/removable/reorderable; responsive grids must keep logical flow and settings should be grouped at useful granularity. | Map one complete image record to one block, preserve editor order/attributes, and keep settings minimal. |

No WAI-ARIA APG widget pattern applies. S5 does not offer two-dimensional
selection, editing, cell navigation, current-item state, drag reordering, or a
single composite tab stop. Adding APG `grid` semantics would create keyboard
obligations and disrupt ordinary link/button navigation inside target items.

## Mature-System And Owner-Reference Comparison

- HTML/WAI/CSS provide the stable core: native grouping, meaningful source
  order, contextual alternatives, ordinary document focus, and no visual-only
  semantics.
- Open UI records variation rather than consensus for Image/Card anatomy,
  activation, fit, metadata, and overlay behavior.
- Radix and Polaris expose target/framework layout conveniences; neither
  establishes a cross-target gallery record, activation lifecycle, or crop API.
- Shopify blocks are the correct merchant-editor projection of the accepted
  target-owned repeated slot. Their resource objects and schema settings remain
  target facts.
- The registered Figma nodes are the generic Studio/Button shell. No S5-specific
  owner reference currently establishes crop, natural ratio, item count,
  columns, radius, zoom, spacing, or caption treatment.
- The repository candidate can therefore be made technically truthful and
  visually reviewable, but it cannot claim owner-approved aesthetics.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | titled `section` or untitled `div` | Gallery Grid / target | Contains one finite image-led collection; title determines thematic section semantics. |
| Header | no | generic grouping | Gallery Grid | Exists only with the optional non-empty title. |
| Title | no | contextual native heading | Target | Fixture uses `h2`; id names the titled root. |
| Items | yes | native `ul` | Gallery Grid / target | Preserves target-authored order and owns Grid/Masonry layout only. |
| Item | repeated | native `li` | Gallery Grid / target | Passive wrapper by default; never focusable merely because it is an item. |
| Media/content | yes per complete item | native target media, optionally `figure`/caption | Target | Source, ratio, alt/decorative intent, loading, caption, and activation remain target-owned. |
| Interactive descendant | no | native `a` or `button` only after target decision | Target / child | Owns name, focus, activation, destination/result, disabled/busy and analytics. |

ADR 0082 intentionally keeps repeated item records inside one slot. Adding a
neutral media record, caption field, destination, focal point, loading policy or
activation enum would be a separate architecture decision.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant: Grid | Default regular row-major CSS grid with private uniform `4 / 5` crop candidate and one-to-four container-responsive tracks. |
| Variant: Masonry | Source-flow CSS columns, natural target media proportions and private maximum of three columns. |
| Size | One intrinsic size; track counts, thresholds, ratio, gap and media geometry are private. |
| Titled | Native `section` named from its visible contextual heading. |
| Untitled | Generic `div`; no empty heading, unnamed section, or synthetic label. |
| Complete | At least one meaningful target-owned media item. |
| Missing items | Invalid composition; omit the root. |
| Passive item | No tabindex, pointer cursor, hover zoom, focus ring, event, or implied activation. |
| Target interactive | Native descendant owns Tab/activation and receives the shared visible focus treatment; S5 adds no motion. |
| Theme | Light/dark through semantic text/focus/radius/spacing tokens; media owns its pixels. |
| Forced colors | Native text/focus remain system-visible; media is not hidden or recolored by S5. |
| Reduced motion | No S5-authored animation or transition; the global safety clamp still applies to inherited durations. |
| RTL | Logical inset/gap; grid and column flow follow writing direction without CSS `order`. |
| Responsive | Named component container; no viewport or Studio column/height behavior. |

The `4 / 5` crop, `22rem`/`40rem`/`60rem` Grid thresholds, maximum-three
`13rem` Masonry columns, semantic element gap, and radius are human-review
candidates, not approved identity decisions or public API.

## Public API And State Ownership

- `variant` — optional enum `grid | masonry`, default `grid`; maps only the
  established modifier class.
- `title` — optional non-empty visible contextual heading; target owns native
  heading rank. Empty content omits the header and uses a generic root.
- `items` — required ordered target-owned media composition slot containing one
  or more complete native list items.
- S5 exposes no columns, mobile columns, threshold, gap, crop, ratio, fit, focal
  point, radius, image source, alt shortcut, caption, item record, href,
  activation, Lightbox, selection, current item, loading, pagination, heading
  level, animation, editor object, or event.
- It has no controlled/uncontrolled store. Targets and native descendants own
  media delivery, optional content, activation, result, focus and data lifecycle.

## Token And Value Audit

- S5 legitimately consumes section/container inset, grid/element rhythm, H2
  family/size/weight/line-height, primary text, small radius, and focus color.
- Hardcoded `24px` header rhythm and `8px` gaps are replaced by existing
  semantic spacing. The H2 type quartet is complete.
- Replace physical width/height/margins with logical properties. List reset,
  fragmentation, grid fractions and structural zeroes are CSS mechanics.
- Private candidates: Grid `4 / 5` ratio and `22rem`/`40rem`/`60rem`
  thresholds, Masonry `3 13rem` columns, and track counts. Do not promote them
  to public tokens or properties before owner review.
- The Sections family is already within `4 B` of its `6,861 B` ceiling. Remove
  duplicate viewport/container/Studio rules and simplify selectors so the
  refined family holds or shrinks rather than resetting the budget.

## Visual And Content Audit

- Baseline natural portraits make one-column Desktop Exhibit exceed `2,100px`;
  the landscape item is cropped differently depending on row companions and
  Studio overrides. This is not a stable `grid` presentation.
- A uniform private Grid ratio creates a predictable scan rhythm and a clear
  distinction from Masonry's natural proportions. `4 / 5` is an editorial
  candidate only; human review may choose another ratio.
- Masonry retains natural portrait/landscape height and source-flow order. Its
  column-major visual reading must be visible in evidence and reviewed against
  S5/Masonry Gallery product overlap.
- One, two, three, four, and many items must remain finite, centered only through
  track composition, and free from empty auto-fill tracks or CSS reordering.
- Short, long, empty optional title, informative/decorative images, localized
  context, RTL, unbroken values, extreme portrait/landscape, missing media, and
  effective 200% cases require evidence.
- Captions or essential metadata supplied by a target must remain persistently
  available. S5 does not create a hover-only caption convention.

## Accessibility And Interaction

- Titled thematic roots use `aria-labelledby`; untitled roots are generic.
- Use native `ul`/`li`; do not add ARIA `grid`, `row`, or `gridcell` roles.
- Informative images require context-appropriate alternatives. Decorative or
  redundant images use empty alternatives and no title-derived fallback.
- Passive items are not focusable, clickable, hover-zoomed, selected, or
  announced. They expose no keyboard model or focus ring.
- A target-provided native link/button owns accessible name, visible focus,
  Enter/Space behavior, destination/result, disabled/busy lifecycle and any
  Lightbox relationship. S5 only supplies the shared two-pixel focus geometry.
- Preserve source order across both variants. Do not use dense placement, CSS
  order, runtime packing, or position as the only semantic cue.
- No live region, roving tabindex, Arrow keys, drag, touch gesture, focus trap,
  restoration, observer, timer or announcement is warranted.

## Responsive And Performance

- Name the root `gallery-grid` and use component inline size as the sole
  responsive authority.
- Grid candidate: regular one track, then private two/three/four-track steps at
  component thresholds. Tracks use `minmax(0, 1fr)` and items use zero minimum.
- Masonry candidate: one/two/three source-flow columns with intact items and
  natural media. No experimental masonry, dense packing, measured heights, or
  JavaScript repacking.
- Test paired Mobile `390x844`, Tablet `768x1024`, Desktop `1280x900`, and XL
  `1536x960`, plus direct `260/520/900/1120px` roots, one/two/many items,
  natural/extreme ratios, titleless/invalid content, localized RTL/unbroken
  content, and effective 200% layout.
- Neutral runtime budget is `0 B`: no listener, observer, timer, formatter,
  request, custom element, layout read, or asset.
- Shopify CDN candidates/loading remain target-owned. DOM and CSS cost grow
  linearly with merchant items; practical block limit belongs to target schema.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Conditional named root, native list/items, target-owned images/content, regular Grid crop or natural source-flow Masonry. | Implemented, generated, validated and browser-evidenced with zero S5 runtime. |
| Shopify | Addable section with optional title/variant and reorderable image blocks carrying explicit decorative/alt semantics. | Implemented and adapter-ready; Liquid, schema, data, editor preview and locales validate. |
| Webflow | Canonical target-agnostic CSS copy plus target-authored semantic markup/media. | Regenerated and SHA-256-identical to canonical Sections CSS. |
| React / Angular | Optional title plus required children/items slot rendered as ordinary list content; no local store. | Planned thin composition. |
| Figma | Grid/Masonry variants, mixed ratios, item counts, themes, localized/extreme and target-interactive focus specimens. | Generic shell traceability only; no S5-specific visual approval. |
| SwiftUI / Compose | Native adaptive/lazy visual collection retaining logical data order, media metadata and explicit target activation. | Conceptual; target owns loading and accessibility grouping. |

## Exhibit And Studio Parity

- Exhibit and Studio already share `SectionsStudio`, one fixture, contract,
  Studio definition, and render branch.
- The branch must enforce required items, derive one stable title id, choose
  titled/untitled root semantics, emit native `ul`/`li`, and remove passive
  tabindex.
- Use the exact same fixture, variant and rendered subtree in both modes. Variant
  controls may update shared state but must not select a Studio-only layout.
- Remove all `.docs-studio__sections-gallery` grid columns, item heights,
  masonry columns, nth-child heights, and narrow override rules. Site CSS may
  supply fixture assets only.
- MDX fallback should mirror the named native list composition and explain the
  unresolved activation and Masonry Gallery boundary.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Four passive image wrappers are focusable without role/name/action. | high | Remove tabindex; native interactive descendants only after target decision. | implementation |
| Optional title never names root; untitled output remains `section`. | high | Named titled `section`; untitled generic `div`. | accepted contract / implementation |
| Missing required items leaves an empty section. | high | Omit invalid root; require one or more complete target items. | accepted contract / implementation |
| Generic renderer and figure-based MDX disagree; neither is a native list. | high | Canonical `ul`/`li` renderer and matching fallback. | implementation |
| Passive hover/focus zoom implies activation. | high | Remove motion; only real native descendants receive visible focus. | accepted ADR 0082 / implementation |
| Natural portrait rows create unstable regular-grid height/crop. | medium | Private uniform Grid crop; natural Masonry proportions. | visual candidate / owner review |
| Canonical, viewport, generic container, and Studio rules compete. | high | One named component container; remove site/viewport authorities. | implementation |
| CSS has hardcoded rhythm and incomplete H2 type. | medium | Existing semantic tokens and logical geometry. | implementation |
| S5 Masonry overlaps accepted Masonry Gallery. | architecture | Keep current registered variant; ask human whether long-term identity should merge or narrow. | owner / architecture |
| Shopify has no target-native adapter. | high | Add minimal localized image-block section with passive scope. | implementation |
| Figma reference is generic, not S5 evidence. | human review | Use browser before/after candidate and defer component-specific Figma work. | owner |

## Evidence And Validation

Baseline evidence under `output/playwright/refinement-batch-64/before/` includes
eight paired captures and current-state measurements covering:

- exact Exhibit/Studio DOM equality (`1,006`, `15f4628d`);
- unnamed `SECTION`, generic `DIV` collection/items and four passive tab stops;
- focus-within `scale(1.03)` without real activation;
- Mobile/Tablet/Desktop/XL geometry and zero document overflow;
- Grid natural-ratio row stretching and Desktop two-thousand-pixel height;
- Masonry two-column source flow at Desktop Studio;
- untitled unnamed section and required-items empty-root failure;
- source image dimensions, Shopify missing layers, generic Figma references;
- Sections/Web/runtime gzip `6,857/67,868/10,589 B`.

Final evidence under `output/playwright/refinement-batch-64/after/` adds 33
captures: eight paired viewport images, both variants, direct roots, one/two/
seven items, titleless/invalid composition, native target focus, light/dark,
forced colors, reduced motion, localized RTL, and unbroken effective-zoom
content.

- Exhibit and Studio normalize to the same `1,073`-character subtree and
  FNV-1a `1d528e87` at every paired viewport. The only raw difference is
  React's per-mount title id; the `aria-labelledby` relation remains valid.
- Every final fixture root is a named `SECTION` with native `UL`/`LI`, four
  contextual image alternatives and zero focusable descendants.
- Mobile uses one Grid track; Tablet uses three; Desktop uses two in both the
  `420px` Exhibit and `532px` Studio stages; XL uses two at `584px` and three at
  `752px`. Every root reports no horizontal overflow.
- Direct Grid roots use one/two/three/four tracks at
  `200/520/900/1120px`; one, two and seven item fixtures render without empty
  auto-fill tracks or overflow. The direct `200px` case contains a `124.81px`
  track.
- Masonry preserves natural media: direct `200/260/520px` roots use one visual
  column and `900px` uses three; source DOM order remains unchanged and items
  are never split.
- Empty title yields a generic `DIV` with no header or labelling attribute.
  The required-items omission harness yields root count `0`, matching the
  renderer's explicit null branch.
- A synthetic target-native link is the only focus stop, matches
  `:focus-visible`, resolves a `2px` solid focus outline with `2px` offset, and
  activates by Enter to `#gallery-evidence`. Passive media has no transform.
- Title contrast is `17.93:1` in light and `17.18:1` in dark. Forced colors
  resolves the title to system black. S5 has no animation name or authored
  duration; the global reduced-motion clamp computes to `0.00001s`.
- Arabic RTL at `320px` and an unbroken title at effective `200px` have equal
  client/scroll width. The unbroken title uses `overflow-wrap: anywhere`.
- An isolated browser session reports zero component errors and zero warnings;
  the ordinary dev shell only reports its unrelated favicon request.
- Deterministic final gzip is Sections `6,855 B`, Neutral Web component CSS
  `67,874 B`, and shared runtime `10,589 B`. S5 adds no runtime and reduces the
  binding Sections family by `2 B` from baseline.
- Shopify reports `implemented`, `ready: true`, section-adapter with two section
  settings, three block settings, a preset, no dead/undeclared settings, and no
  section JavaScript. Official Liquid/schema locale validation passes at
  revision 1 for artifact `gallery-grid-s5-batch64`.

## Risks And Open Questions

- Human review must approve the private Grid ratio, track thresholds/counts,
  Masonry column width/count, gap, radius, crop, and image hierarchy before
  stability.
- Owner/architecture review must decide whether S5 retains a Masonry variant,
  narrows to regular Grid, or ultimately composes/defers to Masonry Gallery.
  This batch intentionally does not remove a registered accepted variant.
- Passive versus link versus Lightbox versus target-selectable activation remains
  open under ADR 0082. The candidate proves only the passive default and native
  target-composition path.
- A future structured neutral media record, caption API, focal point, loading
  policy, item destination or editor model requires an explicit architecture
  decision; Shopify blocks do not create that API automatically.
- Heading rank and image alternative depend on document/content context. Targets
  must not infer either from visual style or position.
- Source-flow CSS columns are visually column-major. If human review requires
  row-major natural-ratio masonry, a different stable layout technology or
  identity decision is necessary.
- Sections is `6,855 B` gzip against its `6,861 B` ceiling, leaving `6 B`
  headroom. The ceiling was not raised.
- Contract remains `pilot`; automated evidence may reach
  `human-review-ready`, never `stable`, without explicit owner approval.

## Readiness Decision

`ready for human review`: semantic source, passive interaction boundary,
responsive ownership, Web/Shopify translation, parity, browser evidence,
performance and documentation are reconciled. Human review must approve the
visual candidates, public contract, and long-term S5/Masonry Gallery identity
before stability. Contract remains `pilot`; no `stable` promotion was made.
