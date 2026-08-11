# Component Dossier: Lightbox

Status: `human-review-ready`

Target reviewed: Neutral Web documentation target, shared React renderer and Shopify Product Gallery composition

Contract: `components/contracts/lightbox.contract.json`

Accepted direction: ADR 0238, partially superseding the finite-only boundary in ADR 0104

## Recommendation

Lightbox is the canonical modal image-detail viewer. It composes Modal, Close
Button and Icon Button rather than reproducing their markup or lifecycle. It
owns a stable dialog title, current figure/image/optional caption, counter,
polite status, finite or optional loop navigation, logical arrow keys, direct
swipe, bounded 1x-3x zoom/pan, missing-media fallback, focus containment,
dismissal and logical focus restoration.

Keep zoom level, pan coordinates, transform, gesture threshold, current index
and focus-return node private. Public semantics remain `open`, `loop`, current
image `alt` and optional `caption`; image collections, ids, sources, localized
labels and change requests are target data/lifecycle mappings.

The shared renderer is ready for human review and remains `pilot`. Human review
must approve the media canvas, control placement, caption/counter hierarchy and
zoom presentation before stability promotion.

## Purpose And Limits

- Presents one informative image at a time in a finite modal collection.
- Provides visible Close, previous/next and zoom controls plus logical keyboard
  shortcuts and direct horizontal swipe.
- Preserves a stable dialog name independently of an optional/changing caption.
- Keeps image source, alt, caption, counter, bounds and status synchronized.
- Supports finite bounds by default and explicit collection wrapping with
  `loop=true`.
- Supports bounded pointer pan only while zoomed and resets zoom/pan whenever
  the image or open state changes.
- Is not a Product Gallery, slideshow, editor, image CDN, download/share surface,
  custom player, analytics system or routed full-screen workflow.
- Does not own global portal, inertness, scroll lock, overlay stacking or mutual
  exclusion services; those remain target Modal responsibilities.

## Baseline And Implemented Direction

The earlier Lightbox refinement repaired modal naming, focus, bounds, fallback,
RTL and theme contrast but intentionally excluded loop, swipe and zoom/pan. Its
renderer still contained a Lightbox-specific modal implementation while Product
Gallery required the same behavior.

ADR 0238 accepts the richer shared boundary:

- `LightboxArtwork` composes the canonical `ModalArtwork`; standalone Lightbox
  and Product Gallery use the same renderer.
- `loop` defaults to false and wraps the actual image collection only when
  enabled.
- Previous/next Buttons and direction-aware Arrow keys stay synchronized with
  direct horizontal swipe.
- Zoom controls and `+`, `-`, `0` shortcuts operate between 1x and 3x. Pan is
  bounded and available only above 1x.
- Navigation or reopening resets zoom, pan, fallback and gesture state.
- Modal owns initial focus, Tab trap, Escape/backdrop/Close dismissal and return
  focus. Product Gallery supplies the current visible image-detail trigger when
  internal navigation replaced the original invoker.
- Shopify Product Gallery uses the same class/data contract and localized
  controls rather than a separate image-detail implementation.

## External Evidence

| Source | Relevant evidence | The Gallery direction |
| --- | --- | --- |
| [WAI-ARIA APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Modal background is inert; focus enters and remains inside; Escape closes; focus returns logically; a visible close control and stable name are expected. | Compose canonical Modal and keep title, focus and dismissal independent of the image caption. |
| [WAI images tutorial](https://www.w3.org/WAI/tutorials/images/) | Informative imagery requires context-appropriate text alternatives. | Current `alt` stays required; caption is optional visible context, not a replacement. |
| [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) | Mature dialog composition separates trigger, overlay, content, title, description, close and controlled state. | Preserve Modal composition and target-owned portal/inert/scroll-lock services. |
| [Open UI carousel research](https://open-ui.org/components/carousel.research/) | Viewer/carousel systems vary on wrapping, touch and direct controls. | Keep loop explicit and swipe supplementary instead of inferring one universal behavior. |
| [Shopify product media UX](https://shopify.dev/docs/storefronts/themes/product-merchandising/media/media-ux) | Image detail and rich media need type-appropriate controls and mobile-aware presentation. | Lightbox remains image-only detail; Product Gallery owns rich media selection and delegates only images. |

No owner-specific Lightbox visual is stored in the repository. The accepted
behavior comes from owner decision D2-C; visual values remain The Gallery's
current private composition pending human review.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner |
| --- | --- | --- | --- |
| Overlay/dialog | yes | canonical modal overlay and named `role="dialog"` | Modal |
| Stable title | yes | visible or visually hidden heading | Lightbox/consumer label |
| Close | yes | canonical Close Button | Modal/Close Button |
| Figure | yes | `<figure>` | Lightbox |
| Viewport | yes | bounded image/pan canvas | Lightbox |
| Image | yes or fallback | informative native `img` | target data |
| Fallback | conditional | named `role="img"` equivalent | Lightbox/target |
| Caption | optional | `<figcaption>` | target data |
| Counter | optional visible | passive LTR position text | Lightbox |
| Zoom group | yes in current viewer | named group of canonical Icon Buttons | Lightbox/Icon Button |
| Previous/next | conditional | canonical Icon Buttons | Lightbox/Icon Button |
| Status | yes | polite atomic status | Lightbox |

## State, Variant, Size And Mode Matrix

| Dimension | Supported result |
| --- | --- |
| Open | Closed/unmounted or open canonical modal. |
| Collection position | First/middle/last with real disabled bounds in finite mode. |
| Loop | `false` default; `true` wraps without cloned items. |
| Image | Loaded or named fallback while preserving navigation/context. |
| Caption | Present/long/localized or omitted; title remains stable. |
| Zoom | 1x, 1.5x, 2x, 2.5x, 3x; reset on navigation/open change. |
| Pan | Disabled at 1x; pointer pan clamped to private bounds when zoomed. |
| Swipe | Horizontal direct swipe at 1x; ignored while panning a zoomed image. |
| Keyboard | Escape, Tab trap, logical Arrow keys, `+`/`=` zoom in, `-` zoom out and `0` reset. |
| RTL | Direction-aware keys and logical control placement; semantic previous/next labels remain stable. |
| Viewport | Dynamic safe bounds on narrow/tall/wide screens. |
| Theme | Private dark media canvas with high-contrast controls/text. |
| Forced colors | System canvas, text, control and focus colors. |
| Reduced motion | Overlay/image transition removed. |

Unsupported behavior includes autoplay, timed advance, infinite semantic clones,
zoom beyond bounds, pan at 1x, swipe as the only navigation, caption-as-dialog-
name, hidden playback, downloads, sharing or commerce actions.

## Public API And State Ownership

- `open: boolean`: controlled modal state; a target may expose an initial
  uncontrolled shell over the same lifecycle.
- `loop: boolean`, default `false`.
- `alt: string`: current informative image alternative.
- `caption?: string`: optional visible current-image context.
- Target mapping: image collection/id/source, controlled current id/change
  request, localized title/control labels and optional initial id.
- Zoom, pan, current index, disabled bounds, transform, gesture pointer,
  fallback state and focus-return node are private runtime state.
- Modal services such as portal, inert background, scroll lock and global
  stacking remain target responsibilities.

## Token, Private Variable And Hardcoded-Value Audit

- Canonical Modal/Close/Icon Button dependencies provide z-layer, focus,
  disabled treatment, touch size and generic control tokens.
- Public Lightbox references cover existing spacing, radius, body/caption
  typography and transition tokens; no zoom/pan consumer token is justified.
- The media transform uses one private custom property. Zoom step, 1x/3x bounds,
  pan clamp, 48px swipe threshold, control insets and viewport reserves remain
  private implementation values.
- The black canvas, white on-canvas text and translucent control surfaces remain
  documented private token debt. A semantic public token requires owner/token
  approval and was not invented in this refinement.
- Lightbox adds no asset, framework, gesture package, request, observer, timer,
  preload queue or player dependency. Its CSS belongs to the documented Layout
  budget gap under ADR 0238.

## Accessibility And Interaction

- The dialog has a stable title and optional caption description; image alt
  updates atomically with source/current id.
- Initial focus enters Close. Tab/Shift+Tab remain within enabled dialog actions.
  Escape, backdrop and Close dismiss. Focus returns to a connected invoker; when
  Product Gallery navigation changes the original node, it returns to the
  current visible image-detail Button.
- Finite disabled controls are skipped by the focus sequence. Loop keeps both
  directional controls enabled when a collection has multiple images.
- Arrow navigation, Buttons and swipe synchronize image, caption, counter,
  status and parent Product Gallery state.
- Zoom has named Buttons and keyboard alternatives. Reset controls expose their
  disabled state at 1x; pan never replaces keyboard-accessible image navigation.
- Forced colors retains boundaries and focus; reduced motion computes zero
  transition; current position is announced in one stable polite region.

## Cross-Target Translation

| Target | Mapping | Status |
| --- | --- | --- |
| Neutral Web | Canonical Modal/class/data contract with target controller. | Implemented through shared runtime/Product Gallery composition. |
| Documentation React | Shared controlled `LightboxArtwork` used standalone and by Product Gallery. | Implemented; exact Exhibit/Studio parity. |
| Shopify | Localized Lightbox markup/controller embedded in Product Gallery's image-detail mode. | Implemented composition; no duplicate standalone snippet required. |
| React / Angular | Controlled open/current id and collection with optional initial shell; canonical Dialog service. | Contract mapping documented. |
| Figma | Open, finite/loop, first/middle/last, zoom/reset, caption/fallback and responsive examples. | Studio metadata implemented; no runtime ownership. |
| SwiftUI / Compose | Native full-screen/dialog image viewer with equivalent labels, bounds, gestures and dismissal. | Conceptual future mapping. |

## Browser Evidence

- Standalone Exhibit and Studio Lightbox outer HTML are byte-identical (`3,855`
  characters, one root) after fresh navigation.
- Desktop and 390x844 mobile standalone captures supplement the Product Gallery
  Mobile/Tablet/Desktop/XL evidence set.
- Initial focus entered Close; Tab stayed inside the dialog; Escape dismissed.
- Product Gallery Lightbox used the two-image subset, updated the parent current
  id, disabled finite bounds, and restored focus to the visible image-detail
  trigger after navigating away from the original opener.
- Two Zoom In activations computed `matrix(2, 0, 0, 2, 0, 0)`. Navigation reset
  the transform to 1x. Standalone loop wrapped first to third with both controls
  enabled.
- Forced colors, reduced motion, dark canvas and 200% page zoom were captured;
  final browser console contained zero errors and zero warnings.
- Evidence manifest:
  `output/playwright/refinement-product/product-gallery-0238/manifest.json`.

## Risks And Human Review Questions

1. Approve canvas/scrim opacity, image bounds, close/nav/zoom placement,
   caption/counter hierarchy and mobile spacing.
2. Decide whether the private on-canvas color literals should become accepted
   semantic tokens or remain component-private.
3. Confirm that 1x-3x, 0.5 increments and the present pan bounds feel appropriate
   for The Gallery's typical product imagery.
4. Portal/inertness/scroll lock and global overlay coordination remain target
   architecture services, not Lightbox internals.
5. Explicit human approval is still required before `stable`.
