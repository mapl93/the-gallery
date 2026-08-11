# Component Dossier: Product Gallery

Status: `human-review-ready`

Target reviewed: Neutral Web documentation target, shared React renderer and Shopify Liquid adapter

Contract: `components/contracts/product-gallery.contract.json`

Accepted direction: D2-C in ADR 0238

## Recommendation

Product Gallery is a finite, manually controlled rich-media composition over a
stable media id. It supports image, hosted video, external video and model
records; AR is a model capability supplied by a target rather than a fabricated
media type. Selection never activates rich media implicitly. Play, View in 3D
and AR remain explicit actions, and leaving an active item pauses or releases
its runtime content.

Keep only two stable semantic properties public: `imageDetail` and `loop`.
Media records, current id, change requests, optional initial id, localized
labels, variant synchronization and native active content are adapter data and
lifecycle mappings. Framework renderers use one controlled state owner; an
uncontrolled adapter may accept an initial id but must not also run the neutral
DOM enhancer.

Image detail composes canonical Lightbox. `imageDetail="none"` keeps images
passive inside already-modal compositions such as Quick View. Product Gallery
must not duplicate Modal, zoom, pan or Lightbox navigation behavior.

The implementation is technically ready for human review and remains `pilot`.
The only unresolved Product Gallery direction is aesthetic: compact layouts
currently retain synchronized thumbnails and dots. Human review must choose
whether both groups are useful or visually redundant.

## Purpose And Limits

- Lets a shopper inspect a finite product-media collection while one stable id
  remains current.
- Supports images, hosted video, external video and interactive models with
  explicit type affordances.
- Offers named previous/next controls, named direct-selection controls and
  horizontal swipe; no single interaction is the only way to navigate.
- Optionally wraps at collection bounds when `loop=true`; finite mode is the
  default and exposes disabled bounds.
- Optionally opens image records in canonical Lightbox with the same current
  media id.
- Does not fetch product data, own variants, choose CDN sources, autoplay,
  rotate on a timer, implement a custom player/model engine, launch AR without
  an explicit action, or perform analytics.
- Does not own portal, inertness, scroll lock or global overlay coordination;
  those remain Modal/target services inherited through Lightbox.

## Baseline And Implemented Direction

The prior refined pilot was an image-only source swap. Shopify read
`product.images`, hover applied a private two-times magnification, and rich
media, Lightbox, swipe, loop and state ownership remained open. The neutral DOM
enhancer and React renderer used different state mechanisms, and the original
Lightbox implementation duplicated modal behavior.

ADR 0238 replaces that boundary:

- The contract is `0.3.0` with image/video/external-video/model anatomy,
  explicit activation, lifecycle release, swipe, finite/loop navigation and
  canonical Lightbox composition.
- The shared renderer consumes discriminated media records and controlled
  `currentId`; Exhibit and Studio use the same rich fixture and serialize exact
  identical initial markup.
- Hosted video, external video and model runtime content remains absent until
  its explicit action is activated. Changing selection removes the former
  runtime node.
- Product Gallery no longer owns hover magnification. Image detail is either
  canonical Lightbox or passive image content.
- Lightbox owns the image-only subset, modal focus/dismissal, logical keys,
  swipe, finite/loop bounds and bounded 1x-3x zoom/pan.
- Shopify now reads `product.media`, renders native image/video/external-video/
  model filters, defers interactive markup in templates and keeps an explicit
  eligible Shopify XR action.
- Quick View consumes the same Product Gallery renderer with
  `imageDetail="none"`.

## External Evidence

| Source | Relevant evidence | The Gallery direction |
| --- | --- | --- |
| [WAI-ARIA APG Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) | Previous/next and optional direct pickers need useful names; automatic rotation creates additional pause/focus duties. | Keep manual navigation, honest Button groups and no timed rotation. |
| [Open UI carousel research](https://open-ui.org/components/carousel.research/) | Mature systems differ on wrapping, touch, pickers and change APIs. | Expose the accepted portable decisions rather than copying one library API. |
| [HTML media](https://html.spec.whatwg.org/multipage/media.html) | Native media owns controls, poster, preload and playback lifecycle. | Preserve target-native players; Gallery coordinates selection and release only. |
| [Shopify product media support](https://shopify.dev/docs/storefronts/themes/product-merchandising/media/support-media) | Shopify product media includes images, video, external video and 3D models. | `product.media` is required for target parity; image-only Liquid is incomplete. |
| [Shopify media UX](https://shopify.dev/docs/storefronts/themes/product-merchandising/media/media-ux) | Video/model previews need recognizable affordances and models may expose AR. | Use canonical Badges and explicit Play, View in 3D and eligible AR actions. |
| [Shopify model object](https://shopify.dev/docs/api/liquid/objects/model) | Model records expose target-native preview and source information. | Keep model rendering and AR eligibility adapter-owned. |
| [Dawn product thumbnail](https://github.com/Shopify/dawn/blob/main/snippets/product-thumbnail.liquid) | Shopify's reference theme defers rich interactive content behind posters and media-specific controls. | Inert templates provide useful implementation evidence without replacing The Gallery markup or identity. |
| [Radix Tabs](https://www.radix-ui.com/primitives/docs/components/tabs) | A real Tabs API carries tab/tabpanel relationships and directional focus behavior. | Do not claim Tabs semantics for ordinary direct-selection Buttons. |
| [Polaris Thumbnail](https://polaris-react.shopify.com/components/images-and-icons/thumbnail) | Thumbnail imagery is passive; the containing control owns interaction and naming. | Thumbnail images use empty alt inside already named Buttons. |

APG and Open UI bound carousel behavior but do not define a product-media
element. Shopify supplies target evidence, not the neutral component identity.
No component-specific owner visual is stored in the repository; the local
editorial photographs remain fixtures rather than API defaults.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner |
| --- | --- | --- | --- |
| Root and layout | yes | ordinary composition container | Product Gallery |
| Media viewport | yes | bounded current-media region | Product Gallery |
| Media panel | one per record | hidden/current panel keyed by stable id | Product Gallery |
| Image | per image record | informative native `img` | adapter data |
| Image-detail action | conditional | named Button | Product Gallery + canonical Lightbox |
| Rich poster | per inactive rich record | preview image plus type Badge/action | Product Gallery |
| Active content | conditional | native video/provider/model content | target adapter |
| AR action | conditional | named Button/action | target adapter |
| Previous/next | optional | canonical Icon Buttons | Product Gallery |
| Thumbnail group | optional | named `role="group"` of Buttons | Product Gallery |
| Thumbnail | optional per item | Button with `aria-current` and decorative image | Product Gallery |
| Media-type Badge | conditional | canonical passive Badge | Product Gallery |
| Compact picker group | optional | named `role="group"` of Buttons | Product Gallery |
| Status | yes for multiple/current feedback | polite atomic status | Product Gallery |
| Lightbox | conditional for image detail | canonical Lightbox composition | Lightbox |

Product Gallery formally depends on Button, Badge, Icon Button and Lightbox.
Lightbox in turn consumes Modal, Close Button and Icon Button. Quick View
consumes Product Gallery without copying its markup or behavior.

## State, Variant, Size And Mode Matrix

| Dimension | Supported result |
| --- | --- |
| Media type | `image`, `video`, `external-video`, `model`; eligible AR is a model action. |
| Current state | Exactly one stable id when media exists; controlled source of truth. |
| Activation | Poster/inactive by default; explicit Play/View in 3D/AR creates target-native active content. |
| Release | Selection change pauses video and removes generated provider/model content. |
| Image detail | `lightbox` default or `none`. |
| Bounds | Finite default with disabled bounds; `loop=true` wraps without cloned semantic items. |
| Navigation | Previous/next, direct thumbnails, optional compact pickers, and direct horizontal swipe. |
| Media count | One item omits redundant collection controls; empty input is invalid target data. |
| Layout | Stacked compact layout; side thumbnail rail at the existing 48rem container threshold. |
| Direction | Logical control placement and direction-aware swipe/key mapping. |
| Theme | Semantic light/dark colors plus a private media-canvas treatment in Lightbox. |
| Forced colors | System current/focus boundaries and operable native controls. |
| Reduced motion | No autoplay; media/control transitions compute to zero. |
| 200% zoom | Gallery remains internally bounded without horizontal overflow. |

Unsupported combinations include implicit activation, autoplay, video rendered
as an image source swap, multiple current ids, unnamed controls, partial Tabs or
listbox semantics, nested Product Gallery Lightboxes inside Quick View, and two
simultaneous state enhancers.

## Public API And State Ownership

- `imageDetail: "lightbox" | "none"`, default `lightbox`.
- `loop: boolean`, default `false`.
- Target mapping: discriminated media array, controlled `currentId`,
  `onCurrentIdChange`, optional `initialCurrentId`, item labels/alt/captions,
  localized action names, active native content and AR capability.
- The React documentation renderer is controlled. The Web/Shopify enhancer is
  an opt-in uncontrolled adapter over authored stable ids. A consumer uses one
  strategy, never both.
- Selection/change events are stable-id requests. Targets may attach analytics
  outside the component; analytics is not a Gallery behavior.
- Provider URLs, preload policy, video volume, model camera controls, AR
  capability and variant synchronization stay target-owned.

## Token, Private Variable And Hardcoded-Value Audit

- Public references cover semantic stage surface, primary text, subtle/current/
  focus borders, md/sm/full radii, touch target, caption typography and accepted
  motion tokens.
- Canonical Badge, Button and Icon Button own their typography, icon geometry,
  control surfaces and focus treatment.
- Thumbnail square, rail width, gaps, poster inset, navigation offsets, compact
  bullet geometry and swipe threshold remain private compositional details.
- Lightbox keeps zoom scale, pan coordinates, transform, 1x/3x bounds and the
  48px swipe threshold private; none is a consumer property.
- The fixed dark Lightbox canvas/on-canvas values remain explicit private token
  debt pending visual/token review. No public token was invented to hide it.
- Product CSS is `4,803 B / 5,324 B` gzip and passes with `521 B` headroom.
  Program surfaces remain documented gaps under ADR 0238: neutral component CSS
  `70,985 B / 65,536 B`, Layout CSS `7,174 B / 4,915 B`, and shared runtime
  `21,633 B / 8,192 B`.

## Accessibility, Content And Runtime Review

- Every direct control is a native Button with a localized action name;
  `aria-current` represents the selected record without inventing composite
  widget semantics.
- Main image alt, caption, media type and status remain synchronized with the
  stable current id. Thumbnail imagery is decorative inside named controls.
- Swipe supplements, but never replaces, Buttons. Fine/coarse pointer behavior
  does not remove keyboard access.
- Explicit rich-media actions prevent unexpected playback, iframe/model load or
  AR launch. Lifecycle release avoids hidden playback and unnecessary runtime
  work.
- Lightbox enters Close, traps Tab, dismisses with Escape/backdrop/Close and
  restores focus to the current visible image-detail action even after internal
  image navigation.
- Finite and loop bounds, logical keys, zoom controls and the polite image status
  are synchronized. Reduced motion removes transitions; forced colors preserves
  current and focus boundaries.
- Short, long/localized, empty optional copy, missing media fallback, rich media,
  narrow/wide containers, dark, forced colors, 200% zoom and four viewport
  classes are represented by current or retained certification evidence.
- No player, iframe, model viewer, gesture library, observer, timer, request,
  analytics or framework dependency was added to the neutral source.

## Cross-Target Translation

| Target | Mapping | Status |
| --- | --- | --- |
| Neutral Web | Stable-id authored panels/templates plus one opt-in shared enhancer. | Implemented and validated. |
| Documentation React | Controlled discriminated fixture, native active content and canonical Lightbox renderer. | Implemented; exact Exhibit/Studio parity. |
| Shopify | `product.media`, native media filters, deferred templates, localized controls, model/AR action and shared enhancer. | Implemented; Theme Check clean for modified files. |
| React / Angular | Controlled media array/id with optional initial uncontrolled shell and target-native active content. | Contract mapping documented; distributable adapter future. |
| Figma | Current, media-type poster, direct controls, finite/loop and detail/no-detail examples. | Studio metadata implemented; no runtime ownership. |
| SwiftUI / Compose | Native paged/media presentation, explicit playback/model actions and native modal detail. | Conceptual future mapping. |

## Browser Evidence

Evidence lives in
`output/playwright/refinement-product/product-gallery-0238/manifest.json`.

- Exhibit and Studio initial Product Gallery markup are byte-identical
  (`7,105` characters, one root) across the shared renderer/fixture.
- Mobile, Tablet, Desktop and XL were captured for both views.
- Hosted video and model remain absent until explicit activation, then release
  when selection changes; external video follows the same template boundary.
- Swipe moved Front view to Turntable video. Finite and loop bounds, native
  status and control disabled states passed.
- Lightbox traversed only the two image records, computed a 2x matrix, trapped
  focus, synchronized Product Gallery state and restored focus after Escape.
- `imageDetail="none"` removed image-detail actions and Lightbox; Quick View
  contained one passive Product Gallery with no nested Lightbox.
- A 900px container used `row-reverse` side-rail layout and hid compact dots.
  At 200% the gallery's client and scroll widths remained equal.
- Reduced motion computed `0s`; forced colors and dark mode were visually
  inspected. Final console result: zero errors and zero warnings.
- One managed server, one headless Playwright session and one tab were used; the
  evidence cleanup gate reports port 4173 free and the session closed.

## Risks And Human Review Questions

1. Decide whether compact Product Gallery should visibly retain both
   synchronized thumbnails and dots or present only one group.
2. Approve the square stage, side-rail threshold, thumbnail scale/badges,
   navigation placement and fixture direction.
3. Approve Lightbox canvas, control, caption/counter and zoom presentation; the
   private on-canvas literals remain visible token debt.
4. Reduce or explicitly accept the existing neutral CSS, Layout CSS and shared
   runtime budget gaps recorded by ADR 0238.
5. No automated result authorizes `stable`; explicit human review is still
   required.
