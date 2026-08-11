# Component Dossier: Masonry Gallery

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify section translation

Contract: `components/contracts/masonry-gallery.contract.json`

## Recommendation

Keep Masonry Gallery as a passive ordered gallery whose target-owned artwork
items retain their natural media proportions. Use native list and figure
semantics for the passive Web and Shopify candidates, a maximum of three
intrinsically sized CSS multi-columns, and a persistent caption overlay whenever
an item remains passive. Only a target that supplies native interaction may hide
and disclose that metadata on fine-pointer hover and keyboard focus.

Do not decide whether a piece is passive, a destination link, a Lightbox trigger
or target-selectable mode. ADR 0080 leaves that product boundary open. This
refinement must not add Lightbox, Link, Price or Card dependencies, an activation
property, a destination, component JavaScript or whole-piece pointer affordance.

Move semantic list resets, figure resets, intrinsic column behavior, media
containment, caption contrast, typography, focus, reduced motion and forced
colors into canonical CSS. Remove docs-only column counts and artificial item
ratios; fixture assets already provide meaningful portrait and landscape
dimensions. Keep column width, maximum columns, caption geometry, crop, density,
section inset and transition treatment private until human visual review.

## Purpose And Limits

- Presents a browsable visual sequence of artwork, editorial media or collection
  pieces while preserving target-authored order and image proportions.
- Primary contexts are artist portfolios, exhibition pages, collection stories
  and commerce/editorial galleries.
- Masonry Gallery owns ordered grouping, repeated item anatomy, intrinsic
  multi-column composition, robust fragmentation, passive caption visibility,
  focus styling for target-owned interaction and target-neutral presentation.
- The target owns the records, group context/name, image source, dimensions,
  responsive candidates, loading, alt/decorative intent, title, formatted price,
  localization and any later activation semantics.
- It is not a product grid, selectable collection, carousel, Lightbox, Card,
  image loader, price formatter, navigation landmark or CMS data model.
- No component state, controlled/uncontrolled strategy, event contract, live
  region, focus movement, observer, timer or neutral runtime is required.

## Pre-Refinement Gallery Baseline

- Registry `F5`, category `storytelling`, no dependencies; contract `0.1.0`,
  `pilot`; seven anatomy parts, one variant/size, three states, two behaviors,
  one required slot and fifteen public tokens.
- ADR 0080 accepts an ordered artwork slot and intentionally leaves passive,
  link and Lightbox activation unresolved. ADR 0082 reinforces that passive
  gallery items must not advertise pointer interaction and that captions must
  be available without hover.
- Canonical CSS selects one, two or three columns from page viewport media
  queries. Docs CSS then overrides those counts from the Studio container. The
  same root therefore resolves from two different responsive authorities.
- Baseline Exhibit roots are `310/688/532/536px` at Mobile, Tablet, Desktop and
  XL. The resulting columns are `1/3/2/2`, proving that docs-only corrections,
  not the canonical component, determine actual embedded behavior.
- Every baseline caption computes `opacity: 0` in a fine-pointer browser,
  including passive `figure` items that cannot receive focus. Title and price
  are therefore mouse-hover-only visually at all four tested viewport widths.
- Baseline item positions preserve source flow down each multi-column track, but
  the root clips overflow and uses no canonical list reset. Site CSS supplies
  list/figure margins, padding corrections and three artificial aspect ratios.
- The overlay uses Button background/text tokens despite having no Button
  dependency, the price uses a literal calculated scale, the title uses a
  literal font weight, and both omit complete line-height/weight token pairs.
- The shared Exhibit/Studio renderer already uses one native `ul`/`li`/`figure`
  implementation and one fixture. The MDX fallback instead uses `div` elements
  with manual list roles, duplicating native semantics unnecessarily.
- Five fixture captions describe artwork that does not match the current image
  assets. This makes alternative text inaccurate even though the assets already
  have useful portrait/landscape dimensions.
- Shopify has no dedicated Liquid implementation. The generated manifest reports
  `planned`, missing Liquid/data/editor readiness and `ready: false`.
- Existing evidence does not cover exact Exhibit/Studio markup parity, persistent
  passive captions, natural ratios, empty/partial metadata, long/localized/RTL
  content, zoom/reflow, themes, forced colors, reduced motion, target-interactive
  focus or source/generated identity.
- Baseline deterministic gzip is `4,374 B` for Storytelling CSS against a
  `4.2 KiB` ceiling, `66,238 B` for neutral component CSS against `64 KiB`, and
  `10,501 B` for shared neutral runtime against the existing `8 KiB` exception.
  Masonry Gallery itself adds no runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML figure](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element) and [lists](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element) | `figure` groups self-contained content with an optional `figcaption`; `ul` represents an unordered list whose sequence remains meaningful without ordinal numbering. | Use `ul`/`li` for the gallery sequence and `figure`/`figcaption` for passive artwork and metadata; do not recreate list roles on `div`. |
| [WAI groups of images](https://www.w3.org/WAI/tutorials/images/groups/) and [alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) | Related images may be grouped while each image retains context-appropriate alt; decorative or redundant images use empty alt. | Keep every asset's meaning target-owned and test informative/decorative cases independently from visible title/price. |
| [APG accessible names and descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) | Visible text should provide names where possible; naming containers is contextual and must not replace descendant semantics. | Do not hard-code a universal English group name in the neutral API. Targets may provide surrounding visible context or a localized list name where needed. |
| [CSS Multi-column Layout](https://www.w3.org/TR/css-multicol-1/) | Multi-column layout flows content in source order and supports fragmentation controls such as `break-inside`; overflow can escape the column box and must not be clipped blindly. | Retain source-flow masonry with `break-inside: avoid-column`, remove root clipping and make column count intrinsic to available inline size. |
| [CSS Grid reordering and accessibility](https://www.w3.org/TR/css-grid-2/#order-accessibility) and [CSS Grid 3 masonry draft](https://www.w3.org/TR/css-grid-3/) | Visual reordering never repairs logical source order; native masonry remains a draft with explicit reading-order concerns. | Do not use dense placement, `order` or experimental masonry to repack items. The target-authored DOM order remains authoritative. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Mature systems vary widely on media, overlays, metadata and whole-card links; no common Card anatomy is established. | Do not inherit a generic Card API, selection state or whole-surface activation. Keep explicit gallery item/media/caption anatomy. |
| [Radix Themes Grid](https://www.radix-ui.com/themes/docs/components/grid) and [Aspect Ratio](https://www.radix-ui.com/themes/docs/components/aspect-ratio) | Radix exposes generic target-specific responsive layout and ratio primitives rather than a masonry artwork contract. | The Gallery keeps ratios in target media data and its responsive column algorithm private instead of copying React props into the neutral API. |
| [Polaris Image](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components/media-and-visuals/image) | Shopify's mature image primitive keeps alt, responsive sources, ratio, fit and loading explicit. | Shopify must preserve merchant image metadata/dimensions and avoid deriving alt from title or imposing one component-wide crop. |
| [Shopify sections](https://shopify.dev/docs/storefronts/themes/architecture/sections), [section schema](https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema), and [blocks guidance](https://shopify.dev/docs/storefronts/themes/best-practices/templates-sections-blocks) | Sections provide merchant-editable modules; blocks are addable, removable and reorderable; block settings should remain coherent and block wrappers need `shopify_attributes`. | Map each artwork to one reorderable section block with image and metadata settings, preserve editor identity and keep activation absent. |

### Mature-system comparison

- HTML, WAI and CSS define the durable semantic/layout core: native grouping,
  meaningful source order, contextual alternative text, natural media dimensions
  and no visual/source reordering.
- Open UI documents variation rather than consensus for overlay Cards. It does
  not justify Card semantics, selection, hover activation or a compound API.
- Radix separates generic Grid and Aspect Ratio primitives. Its responsive React
  props are target conveniences, not stable cross-target Masonry properties.
- Polaris makes media metadata and loading explicit, while Shopify theme blocks
  provide the appropriate merchant reorder model. The Gallery maps those target
  facts without making Shopify data canonical.
- No source establishes component runtime, controlled state, automatic Lightbox
  composition, hover-only content, dense packing or a mandatory group label.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. Direct read-only inspection shows the generic Studio
shell and Button pilot: `Exhibit`, `Studio`, `Customize`, Button label/icon/type/
size/state controls and Button spacing/color tokens. It contains no Masonry
Gallery artwork, item ratios, column behavior, caption treatment, image crop,
localized/extreme state or target translation. It validates inspector grouping
only. The repository candidate remains the visual proposal for human review.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | native `ul.masonry-gallery` | target / gallery | Ordered source sequence without manual list roles; target supplies visible context or localized name when necessary. |
| Item | repeated | native `li.masonry-gallery__item` | gallery / target | One coherent artwork record; must not be visually reordered. |
| Piece | yes | passive `figure.gallery-piece` in the candidate | target | Target may later substitute valid native interactive composition only after activation is decided. |
| Image | yes | native responsive `img` or target media | target | Natural dimensions, sources, loading, alt/decorative intent and crop are target-owned. |
| Caption | no | native `figcaption.gallery-piece__overlay` for passive figures | target | Omitted if no metadata; persistent for passive pieces. Interactive targets must choose semantically valid markup. |
| Title | no | text inside caption | target | Artwork name; does not replace image alt. |
| Price | no | target-formatted text inside caption | target | No parsing, currency logic or Price dependency. |

## Variant, Size, State, And Mode Matrix

- Variant and size: one passive default presentation and one default size. One,
  two and three columns are intrinsic layout outcomes, not public variants.
- Required content: at least one item and image. Caption, title and price are
  optional; empty optional anatomy is omitted rather than left as blank spans.
- Ratios: mixed portrait, landscape, square and extreme-tall/wide media keep
  target-provided dimensions; no nth-child ratio or global crop is imposed.
- Passive states: default only, with caption visible on coarse pointer, fine
  pointer, keyboard-only, touch and reduced-motion environments.
- Target-interactive states: native default, hover and focus-visible disclosure;
  disabled/selected/loading are not gallery states.
- Layout: narrow one column, medium two, wide maximum three, isolated narrow host
  inside wide page, long column sequence and single-item case.
- Content: title-only, price-only, no caption, short, long, empty optional,
  unbroken, localized and RTL metadata.
- Preferences: light/dark themes, forced colors, reduced motion and 200% reflow.

## Public API And State Ownership

Keep the one accepted semantic property:

- `items` — required ordered target-owned artwork composition containing media
  and optional metadata.

Do not add `columns`, `columnWidth`, `gap`, `ratio`, `crop`, `overlay`,
`overlayMode`, `activation`, `interactive`, `href`, `lightbox`, `selected`,
`loading`, `headingLevel`, `ariaLabel` or `onItemClick` to the neutral API.
Targets own records, image delivery, contextual naming, activation and event
lifecycles. Masonry Gallery remains passive and has no controlled/uncontrolled
strategy.

## Token And Value Audit

- Replace Button color tokens with neutral surface/text tokens for the persistent
  caption. Focus remains `--color-border-focus` only for native interactive
  target composition.
- Use complete heading/body and caption typography pairs plus existing semantic
  weights. Remove literal `500` and calculated `0.875` type sizing.
- Retain canonical section/container/grid/element spacing and medium radius.
  Root/list/figure resets and caption geometry are private composition.
- Use the established media transition for optional interactive image scale and
  standard reversible transition for optional disclosure; both resolve to zero
  under reduced motion.
- Private candidate values: minimum column width, maximum three columns, caption
  inset/placement and scale amount. No new token layer or public component token
  is introduced.
- Audit all remaining hardcoded values as CSS mechanics: zero/reset values,
  focus outline width/offset, column maximum, and subtle scale. No color, type
  size, spacing or radius literal should remain in F5.

## Accessibility And Interaction

- Preserve target-authored DOM order and use native list/figure semantics for
  passive pieces. Do not use dense layout or CSS order.
- Require contextual alt for informative images and empty alt for decorative or
  redundant images. Visible title/price does not substitute for image meaning.
- Keep passive captions visibly available without hover. Passive figures have
  no pointer cursor, tabindex, click handler or focus style.
- If a target later adds activation, use a semantically valid native link/button
  composition with a descriptive accessible name, visible focus and persistent
  focus disclosure. Lightbox focus trapping, dismissal and restoration remain
  owned by Lightbox.
- Do not announce prices or titles through live regions. No roving tabindex,
  arrow-key model or custom keyboard behavior is needed.
- Meaning and order must survive CSS/JS absence. Long localized text, RTL and
  200% zoom must remain contained without page-level horizontal overflow.

## Responsive And Performance

- Use CSS multi-column `columns` with a private minimum column width and maximum
  count so the root responds to its own content box without viewport queries or
  a second docs-only responsive authority.
- Use `break-inside: avoid-column`, an inline-block item wrapper and logical
  spacing. Remove root overflow clipping and preserve focus/fragment overflow.
- Keep images block-level, intrinsically sized and constrained to item width.
  Do not measure media or repack items in JavaScript.
- DOM grows linearly with target-authored items. Neutral runtime contribution is
  `0 B`; there are no listeners, observers, layout reads, requests or timers.
- Shopify uses native CDN dimensions/srcset generated by `image_tag` and lazy
  loading policy. Asset selection and above-fold loading remain target concerns.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native list of passive figures, intrinsic multi-columns, natural images and optional persistent captions. | Implemented, generated and validated; zero runtime. |
| Shopify | Merchant section with reorderable artwork blocks, image metadata, optional title/price and no assumed destination. | `implemented`, `section-adapter`, maturity `ready: true`; Liquid and locales pass the official validator. |
| Webflow | Canonical target-agnostic CSS copy plus target-authored list/figure markup. | Source/generated identity verified. |
| React / Angular | Passive ordered items/slots with native semantic output; adapters own responsive image data and later activation. | Planned; no state service or lifecycle. |
| Figma | One/two/three columns, mixed natural ratios, captions, themes, localized/extreme content and future interactive focus specimen. | Planned; registered frame is unrelated generic Button artwork. |
| SwiftUI / Compose | Native lazy visual collection preserving logical data order, asset aspect ratios and explicit target activation. | Conceptual; accessibility grouping and loading remain target-owned. |

## Exhibit And Studio Parity

- Keep one `StorytellingStudio` renderer, one fixture and exact initial
  `outerHTML` in Exhibit and Studio at Mobile, Tablet, Desktop and XL.
- Correct fixture titles/alts to match the actual editorial assets and omit empty
  optional metadata rather than emitting blank caption parts.
- Remove docs-only column, item-ratio, list-reset and figure-reset rules so both
  modes consume canonical CSS directly. Site CSS may retain fixture-only media
  assets, not component layout decisions.
- Special evidence covers no caption, title-only, price-only, natural portrait/
  landscape ratios, isolated host widths, long/localized RTL metadata, 200%
  reflow, themes, forced colors, reduced motion and a synthetic native
  interactive focus specimen without changing the default fixture/API.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Passive captions are visually hover-only and cannot disclose by keyboard. | high | Keep captions persistent for passive figures; restrict hover/focus disclosure to native interactive roots. | implementable now |
| Responsive behavior has viewport and docs-container authorities. | high | Replace both with one intrinsic multi-column algorithm in canonical CSS. | implementable now |
| MDX uses manual list roles while shared renderer uses native elements. | medium | Reconcile all Web examples on `ul`/`li`/`figure`/`figcaption`. | implementable now |
| Button tokens style non-Button metadata and typography contains literals. | medium | Use neutral semantic caption colors and complete existing type tokens. | implementable now |
| Fixture alt/title text does not match its media. | high | Reconcile fixture metadata with the real repository assets. | implementable now |
| Shopify lacks a target-native adapter. | high | Add localized reorderable artwork blocks with image metadata and editor attributes. | implementable now |
| Piece activation remains unresolved. | product boundary | Preserve passive default and document native target composition; add no property/dependency/destination. | owner/product |
| No component-specific Figma artwork exists. | human review | Present repository before/after evidence and request visual approval. | owner |

## Refinement Result

- Contract `0.2.0` remains `pilot`: seven anatomy parts, one variant, one size,
  three documented states, seven behaviors, one semantic property, twenty-one
  public tokens and no inferred dependency.
- Canonical CSS now owns native list/figure resets, private `13rem` minimum
  column width, maximum three intrinsic columns, logical inset/gap,
  fragmentation, natural images, persistent passive captions, neutral caption
  color/type, native-interaction focus/hover boundaries, forced colors and
  reduced motion.
- Page-viewport breakpoints, root clipping, Button caption tokens, literal type
  values, docs-only column counts and nth-child ratios are removed.
- Fixture titles and alternative text now match the repository media; empty
  price parts are omitted. Exhibit and Studio use the same renderer, fixture and
  exact initial markup.
- MDX uses native `ul`/`li`/`figure`/`figcaption` anatomy instead of manual list
  roles. Registry, contract, Studio metadata and ADR 0127 describe the same
  passive and unresolved-activation boundary.
- Shopify localizes its gallery name/schema, emits only image-backed records,
  preserves image alt/decorative intent, maps each artwork to one reorderable
  editor block, omits empty metadata and reports target-ready without a
  destination or Lightbox assumption.

## Browser Evidence

- Mobile, Tablet, Desktop and XL produce exact Exhibit/Studio initial
  `outerHTML` parity; clean gallery markup is `1,989` characters in every mode.
- Exhibit root widths are `310/688/532/536px`; Studio widths are
  `310/688/644/704px`. Mobile uses one visual track and every other tested docs
  root uses two, with all passive caption opacity at `1` and zero page overflow.
- Isolated `260/580/900px` roots resolve exactly `1/2/3` visual tracks while
  preserving source order. Portrait `1800x2700` and landscape
  `1800x1200–1202` assets retain natural proportions.
- Optional evidence removes one complete caption, one title and one price
  without empty replacement anatomy. Long Arabic/Latin RTL metadata stays
  contained at `368px`; the isolated 200% `320px` probe keeps
  `scrollWidth === clientWidth` and produces no page overflow.
- The passive figure computes `cursor: auto`, `tabIndex: -1` and no activation.
  A synthetic native-link target computes caption opacity `0 -> 1` on hover and
  `1` on focus, a `2px` solid focus outline with `2px` offset, one native Enter
  click and retained focus.
- Light caption contrast is `17.93:1` title and `7.81:1` price; dark is
  `17.18:1` and `12.09:1`. Forced colors produces an opaque Canvas caption with
  a solid `1px` boundary. Reduced motion resolves both transitions to `0s` and
  image transform to `none`.
- Accessibility inspection exposes one named native list, five list items, five
  named figures and five accurate images. No button, link, live region or
  interactive state leaks into the passive candidate.
- Four before images, eight final viewport images and eleven special-state
  images live under `output/playwright/refinement-batch-42/`.

## Performance Result

- Storytelling CSS is `4,376 B / 4.2 KiB` deterministic gzip, a `76 B` family
  exception and `2 B` increase from the Batch 41 baseline.
- Complete neutral Web component CSS is `66,291 B / 64 KiB`, a `755 B` program
  gap and `53 B` increase from Batch 41. The ceiling remains unchanged.
- Shared neutral runtime is `10,501 B / 8 KiB`, the existing `2,309 B`
  exception. Masonry Gallery adds `0 B` runtime, listener, observer, timer,
  request or component asset.

## Validation Result

- Registry/docs, tokens, 183 contracts, 183 Studio definitions, neutral Web,
  Shopify and Webflow adapter gates pass.
- Mandatory Shopify documentation search and official validation for the new
  section/locales pass; generated maturity is `ready: true`, and Shopify/
  Webflow CSS copies are source-identical.
- Static Preview, structural certification, refinement audit and exact Exhibit/
  Studio initial markup parity pass.
- Mobile, Tablet, Desktop and XL; isolated narrow/medium/wide hosts; natural
  ratios; optional omission; long/localized/RTL content; 200% reflow; light/dark
  contrast; forced colors; reduced motion; passive pointer/focus absence and
  target-interactive hover/focus disclosure pass.
- Deterministic family/global gzip, zero runtime delta, temporary site build
  outside `site/dist`, component-console inspection, diff checks and explicit
  `site/dist` cleanliness complete the Batch 42 gate. The fresh site console
  contains only the existing shell-level `/favicon.ico` 404.

## Remaining Human Review

- Approve or revise the private minimum column width, maximum three columns,
  item gap and source-flow reading model.
- Approve or revise natural ratios, medium radius, caption surface/placement,
  title/price hierarchy, padding and optional interactive image scale.
- Decide separately whether the product should later expose passive, link,
  Lightbox or target-selectable activation, and whether that adds dependencies.
- Confirm that columns, column width, ratio, crop, caption treatment, activation,
  density and group naming remain outside the v1 public API.
- Do not promote the contract to `stable` without explicit human approval.
