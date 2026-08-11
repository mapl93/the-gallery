# 0238. Rich Product Gallery And Canonical Lightbox Detail

Status: Accepted

Date: 2026-07-20

## Context

ADR 0114 repaired the original image selector but deliberately left rich media,
Lightbox, looping, gestures and public state ownership open. The owner selected
direction D2-C: Product Gallery v1 must support images, hosted video, external
video and models across targets instead of treating Shopify's image-only adapter
as complete. The same decision requires explicit activation, swipe, optional
looping and image detail through the canonical Lightbox.

The external evidence converges on boundaries rather than one universal API:

- [WAI-ARIA APG Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
  requires named previous/next and direct-selection controls and treats automatic
  rotation as a separately controlled behavior.
- [Open UI carousel research](https://open-ui.org/components/carousel.research/)
  documents substantial variation in touch, wrap, picker and event APIs, so The
  Gallery keeps the neutral surface semantic and target-portable.
- The [HTML media model](https://html.spec.whatwg.org/multipage/media.html)
  already owns native video controls, poster, preload and playback lifecycle.
- Shopify documents `product.media` coverage for image, video, external video
  and model, explicit media-type affordances, inactive video/model previews and
  native model/AR capabilities in its
  [product media support](https://shopify.dev/docs/storefronts/themes/product-merchandising/media/support-media)
  and [media UX guidance](https://shopify.dev/docs/storefronts/themes/product-merchandising/media/media-ux).

## Decision

- Product Gallery consumes a neutral discriminated collection with `image`,
  `video`, `external-video` and `model` records. AR is an eligible model action
  reported by an adapter, never a fabricated fifth media type.
- Exactly one stable media id is current. The product coordinator owns the
  collection, controlled current-id updates and variant synchronization. A
  target may expose an initial uncontrolled id over the same state, but it must
  not run a second DOM enhancer.
- Named thumbnail Buttons expose media-type Badges and optional compact direct
  controls. Previous/next Icon Buttons and direct horizontal swipe are
  synchronized alternatives; swipe is never the only navigation mechanism.
- `loop` is the only collection-boundary property. It defaults to `false`.
  Finite mode disables real bounds; loop mode wraps logical state without
  cloning semantic records or focusable controls.
- The collection never autoplays or advances by time. Selecting rich media only
  changes the current id and retains its poster.
- Hosted and external video require explicit Play. Models require explicit View
  in 3D. Eligible AR requires its own action. Changing current media pauses and
  releases previous video/provider/model content.
- Native video/provider controls, fullscreen, model viewer and AR remain target
  capabilities. The neutral component coordinates their lifecycle but does not
  replace them with a Gallery-specific player or 3D engine.
- `imageDetail` is `lightbox | none` and defaults to `lightbox`. `lightbox`
  composes canonical Lightbox over image records and keeps the same current id.
  `none` makes images passive for already-modal compositions such as Quick View.
- Product Gallery removes its private inline hover-zoom engine. Lightbox is the
  only image-detail renderer and owns Modal composition, focus containment,
  dismissal/restoration, logical previous/next, direct swipe and bounded 1x-3x
  zoom/pan.
- Standalone Lightbox exposes `loop`, default `false`, because Product Gallery
  must delegate rather than fork the behavior. Its image collection/current id,
  URLs, text and localization remain target data rather than scalar Studio
  properties.
- Shopify maps `product.media` with the native `video_tag`,
  `external_video_tag`, and `model_viewer_tag` filters. Interactive markup stays
  inside inert templates until explicit activation; eligible model records keep
  Shopify XR as an explicit target action.
- Exhibit and Studio continue to use the same Product Studio renderer and rich
  fixture. Quick View consumes the same renderer with `imageDetail="none"`.
- Product Gallery and Lightbox remain `pilot`; automated certification does not
  imply `stable` without explicit human review.

## Public API Boundary

Product Gallery exposes only `imageDetail` and `loop`. A target adapter also
translates the discriminated media collection, controlled `currentId`,
`onCurrentIdChange`, optional `initialCurrentId`, item-specific accessible text,
localized action names and native active content. Those data/lifecycle
contracts are documented adapter mappings, not independent visual properties.

Lightbox keeps `open`, `loop`, current image `alt` and optional `caption` in its
existing semantic contract. Zoom scale, pan coordinates, pointer threshold,
media transform, focus-return node and active collection index remain private
runtime state.

## Performance

This accepted capability intentionally expands Product CSS, Layout CSS and the
shared progressive-enhancement runtime beyond their existing family ceilings.
ADR 0238 is the explicit gap evidence for those surfaces. The implementation
adds no framework, player, gesture, model-viewer or provider dependency; it uses
native controls, inert templates, pointer events and the existing shared
runtime. Exact deterministic gzip measurements belong in the component audit
after adapter generation.

## Consequences

- Neutral Web, React documentation and Shopify now share the same stable-id and
  explicit-activation model while retaining target-native media rendering.
- Rich media selection cannot accidentally start playback, download an iframe
  or model, or launch AR.
- Image detail is consistent and reusable instead of being split between hover
  magnification and a separate modal renderer.
- Product Gallery now depends on canonical Button, Badge, Icon Button and
  Lightbox; Lightbox continues to depend on Modal, Close Button and Icon Button.
- Mobile thumbnail-versus-dot visual density remains a separate owner aesthetic
  decision. Both synchronized groups remain functional until that direction is
  reviewed; it does not change the accepted media/state architecture.
