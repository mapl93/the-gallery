# Photo Reviews Gallery Refinement Dossier

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

Registry: `V6` / `photo-reviews`

Dependency order: 153, phase 6 (Composed components), depth 0

## Purpose

Photo Reviews presents a short ordered collection of target-supplied customer
review images. Its neutral value is visual evidence associated with reviews.
It does not collect uploads, select a review provider, moderate images, derive
alternative text, generate responsive sources, open enlarged media or own a
carousel/lightbox lifecycle.

Reasonable target projections are:

- a passive set of informative review photos;
- native links to full media or another destination;
- native buttons that invoke a separately selected Lightbox or Modal.

The component is not an image uploader, media picker, Product Gallery,
Carousel, Lightbox, Modal, provider integration or generic asset pipeline.

## Accepted Source Facts

- ADR 0085 establishes ordered target-owned items and a passive default.
- Link, download, button, Lightbox and Modal behavior remain target choices.
- Provider records, moderation, image delivery, loading, captions, navigation,
  focus restoration and dismissal are unresolved target/product boundaries.
- The repo is the source of truth. Figma is evidence and a future target.
- Exhibit and Studio must render one implementation and one fixture.
- No formal dependency is needed while Photo Reviews remains passive. A target
  that opens enlarged media composes the already canonical Lightbox or Modal.
- No component may move from `pilot` without explicit human approval.

## Baseline Audit

- Contract `0.2.0` captures the passive boundary, alternative text and target
  ownership, but combines collection-item semantics and optional native action
  semantics in `.photo-reviews__item`.
- The shared renderer uses `div[role=list]` and repeated
  `div[role=listitem]`. The accessibility tree is valid, but native `ul` / `li`
  provides the same relationship without authored roles.
- An interactive target would need to replace the list item with a link or
  button, losing native list-item anatomy. Collection membership and action
  need separate nodes.
- A direct descendant `img` compatibility selector duplicates the canonical
  `.photo-reviews__image` contract and weakens strict source alignment.
- Every passive image receives a transform transition and every passive item
  allocates an invisible generated overlay even though neither can activate.
- The hover rule targets any descendant `img`, broader than the canonical image
  class, and there is no explicit native disabled projection for a target
  button.
- The square `auto-fill` grid is intrinsically container-responsive and already
  contains narrow widths. Radius, crop, gap, item minimum, overlay strength and
  zoom remain private visual composition.
- The canonical fixture exposes four informative images, zero focusable nodes
  and zero live regions. It currently uses automatic loading/decoding and four
  large site-only editorial JPEGs totaling `1,311,728 B` on disk.
- Eight paired baseline screenshots cover Exhibit and Studio at Mobile,
  Tablet, Desktop and XL under
  `output/playwright/refinement-batch-52/before/`.
- Baseline Reviews CSS is `3,778 B` metadata-free gzip against the fixed
  `3.7 KiB` (`3,788 B`) family ceiling. The neutral component has no runtime.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| HTML list semantics | `ul` represents a list of items; `li` preserves ordered source relationships without an ARIA widget model. | Use native `ul` / `li`; retain `role=list` because visual list markers are reset. Do not use `role=grid` for a passive visual layout. |
| HTML `figure` / `figcaption` | Figure is appropriate for self-contained media with an optional caption, including gallery content. | Captions may be target-authored inside an item later, but are not invented as required anatomy while product copy is unresolved. |
| WAI Images Tutorial | Informative photos need concise essential alternatives; decorative duplicates use `alt=""`; a functional image's name describes action or destination. | Keep informative `alt` target-owned and require an explicit action name when a link/button projection changes the purpose. |
| WAI-ARIA APG Dialog | A modal viewer owns contained focus, Escape, initial focus, close control and return focus. | Photo Reviews does not implement part of a lightbox. A target composes the complete canonical overlay contract. |
| Open UI Popover | Popover is non-modal and light-dismiss behavior differs materially from modal dialog behavior. | Do not treat “enlarge image” as one generic overlay API; the target must select semantics and dismissal. |
| Radix Aspect Ratio | Ratio is an explicit wrapper concern and accepts arbitrary content. | Keep the accepted square review crop as private presentation, not an image semantic or target framework dependency. |
| Polaris Image / Thumbnail | Image APIs distinguish source, responsive sources, alt, fit, loading and load/error lifecycle; Thumbnail remains passive unless composed with an action. | The target owns source delivery and failure policy. Photo Reviews owns layout and action-state hooks only. |

References:

- <https://html.spec.whatwg.org/multipage/grouping-content.html>
- <https://www.w3.org/WAI/tutorials/images/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/>
- <https://open-ui.org/components/popover.research.explainer/>
- <https://www.radix-ui.com/primitives/docs/components/aspect-ratio>
- <https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components/media-and-visuals/image>
- <https://shopify.dev/docs/api/app-home/web-components/media-and-visuals/thumbnail>

## Owner Visual References

Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. Live inspection confirms that both nodes are the
generic Button component-detail shell and Studio inspector rather than Photo
Reviews artwork. They support the editorial shell and metadata-driven inspector
direction only. No grid, crop, gap, radius, overlay, motion or action treatment
can be promoted from these nodes.

## Convergence And Differences

Consensus:

- repeated review photos form a collection rather than an ARIA grid widget;
- source order remains meaningful across wrapping;
- informative images need context-specific alternative text;
- passive media and actionable media are separate semantic layers;
- links/buttons retain native activation and require truthful accessible names;
- enlarged-media navigation and focus/dismissal belong to a complete overlay;
- crop/layout may be responsive without changing content semantics;
- source selection, loading and failure recovery belong to the target pipeline.

Differences that remain product or target decisions:

- passive versus full-media link versus download versus overlay trigger;
- Lightbox versus Modal versus non-modal presentation;
- individual or group captions and reviewer attribution;
- number/order of photos and duplicate-photo policy across Review;
- `srcset`, sizes, formats, CDN transforms, eager/lazy thresholds and fallback;
- moderation, sensitive imagery, deletion, reporting and consent;
- enlarged-media index, gestures, preloading, history and analytics.

## Recommended Direction

Use a native `ul.photo-reviews[role=list]` with repeated native
`li.photo-reviews__item`. Keep `.photo-reviews__image` strict and required.
When a target makes a photo actionable, place a native
`a.photo-reviews__action` or `button.photo-reviews__action` inside the list item.

This separates stable collection anatomy from unresolved action behavior. Only
the optional action receives transition, generated overlay, hover, focus and
disabled treatment. The passive shared renderer remains zero-runtime and uses
lazy asynchronous decoding as a docs-fixture delivery policy, not a public
component default.

Remove the direct-image compatibility selector instead of carrying two image
contracts. Keep the square crop and intrinsic `auto-fill` grid as private
presentation. Do not add captions, an overlay dependency or state API until a
target contract is accepted.

## Alternatives Requiring A Decision

1. **Full-media navigation.** Require destination URLs and native links; decide
   same/new context, download policy and current destination behavior.
2. **Canonical Lightbox composition.** Add action labels, active index,
   controlled/initial state, captions, navigation, close, focus restoration,
   preloading and history policy through the canonical Lightbox.
3. **Canonical Modal composition.** Use when the enlarged experience contains
   review metadata or actions rather than only media.
4. **Captioned figures.** Add optional `figure` / `figcaption` anatomy only after
   caption, reviewer attribution and duplication rules are accepted.

The current repo does not contain enough product evidence to select one.

## Candidate Anatomy

| Part | Required | Semantics | Ownership |
| --- | --- | --- | --- |
| Root | yes | Native unordered list, optionally named | Photo Reviews |
| Item | yes, repeated | Native list item | Photo Reviews |
| Action | no | Native link or button with truthful action/destination name | Target |
| Image | yes per item | Native informative or intentionally decorative image | Target content inside Photo Reviews layout |
| Caption | no, deferred | Potential figure caption | Target/product decision |
| Generated overlay | action only | Decorative fine-pointer feedback | Photo Reviews CSS |

## State And Mode Matrix

| Mode/state | Neutral expectation |
| --- | --- |
| Passive default | Native list and items; no cursor, transition, overlay allocation, focus or action state. |
| Native link | Real destination; target supplies action/destination name and any download behavior. |
| Native button | Real action; target supplies explicit accessible name and owns the invoked component. |
| Action hover | Fine-pointer-only zoom and subtle overlay; not the only action cue. |
| Action focus-visible | Two-tone surface/focus perimeter remains visible over light and dark photo edges. |
| Action disabled | Native button only; no hover and visually unavailable. |
| Loading | Square surface reserves layout; source/loading strategy is target-owned. |
| Failure | Target replaces or removes failed media and owns any status; no neutral live region. |
| Empty | Valid empty list; surrounding target owns Empty State or explanation. |
| Long/localized alt | No visible layout change while the image loads; fallback text remains contained if source fails. |
| RTL | Source/DOM order stays authoritative; grid placement follows writing direction. |
| Reduced motion | Optional action transitions and transforms resolve to none. |
| Forced colors | Decorative overlay disappears; native focus remains visible. |

## Public API And State Ownership

Keep the semantic API narrow:

- `label`: optional localized accessible collection name when surrounding
  content does not already identify it;
- `items`: required target-owned composition containing source, alternative,
  optional native action and future accepted caption data.

Do not expose private grid gap, item minimum, square ratio, crop position,
radius, overlay strength, zoom amount or transition timing as public
properties.

The passive component has no controlled/uncontrolled state. A target that
composes Lightbox or Modal owns controlled/initial open state, active media,
navigation, focus restoration, dismissal, loading and persistence/history.

## Token And Hardcoded Audit

Existing public tokens cover:

- primary focus backing and secondary loading/fallback surfaces;
- focus border and disabled opacity;
- small radius;
- media and micro transitions for optional actions.

Private composition may retain `120px` grid minimum, `8px` gap, square ratio,
`20%` overlay mix, `1.05` zoom and 2px focus geometry. These are not stable
cross-target customization decisions.

The fixed Reviews CSS ceiling remains `3,788 B`. The stricter image selector and
action-only pseudo-element/transition must fund the native-list reset and
separate action anatomy; raising the ceiling is not authorized.

## Responsive And Content Evidence Plan

- paired Exhibit/Studio images at 390, 768, 1440 and 1728px;
- intrinsic hosts at 96px, 220px and 640px to exercise one/five-column wrapping;
- one item, four items and empty collection;
- informative, decorative and long localized alternatives;
- broken source containment and target-owned fallback boundary;
- native link/button, disabled, pointer, Enter, Space and focus-visible probes;
- light/dark, forced colors and reduced motion;
- RTL source order and 200% type;
- exact Exhibit/Studio root DOM parity;
- source/generated CSS identity, asset inventory and deterministic gzip.

## Cross-Target Translation

| Target | Translation |
| --- | --- |
| Neutral Web | Native list/items, strict image class and optional native action wrapper; zero component runtime. |
| Shopify | Review-provider theme app block supplies moderated images, CDN transforms, alt text and any URLs/actions while consuming generated CSS. No placeholder review Liquid. |
| Webflow | CMS/provider collection list and truthful links/buttons using copied CSS. |
| React / Angular | Passive list now; a composed overlay target owns open/index state and callbacks. |
| Figma | Passive grid and reviewed action visual states after component-specific artwork exists. |
| SwiftUI / Compose | Lazy/native grid with images and optional Link/Button; overlay navigation remains separate. |

## Performance Budget

- Reviews CSS: `3,788 B` metadata-free gzip ceiling.
- Neutral Photo Reviews runtime: `0 B` listeners, observers, timers, requests,
  formatters and layout reads.
- Neutral asset bytes: target-owned; require responsive source/format/loading
  policy before production integration.
- Docs fixture: keep loading/decoding explicit and record the current four-image
  `1,311,728 B` source inventory rather than presenting it as a target default.
- Global Neutral Web CSS/runtime exceptions remain visible program gaps and are
  not budget increases.

## Risks And Open Questions

| Risk/question | Boundary | Required action |
| --- | --- | --- |
| Photo action remains unresolved. | product/target | Choose passive, link, download or complete overlay composition per target. |
| Provider and moderation are unknown. | target/data | Select provider, consent, moderation, sensitive-content and deletion policies. |
| Delivery/failure policy is unknown. | target/performance | Define responsive formats, CDN, loading, fallback and status ownership. |
| Captions and attribution are unknown. | product/content | Decide whether figures/captions are required before adding anatomy. |
| Review may repeat the same photos. | content/accessibility | Decide whether duplicates stay informative or become decorative in context. |
| No component-specific Figma artwork exists. | human visual | Approve browser candidate before creating the Figma target. |
| Reviews CSS has only 1 B final headroom. | performance | Reconcile within the family rather than raising the ceiling silently. |

## Readiness Boundary

Technical readiness requires native collection/action separation, strict image
anatomy, informative/functional alternative guidance, action-only motion,
content and special-mode evidence, generated adapters, asset/budget evidence and
a durable report. It does not select a provider, action model, overlay,
captioning scheme, production image pipeline, Figma artwork or `stable` status.

## Implemented Result And Evidence

- Contract `0.3.0`, registry, canonical renderer, Studio metadata and MDX now
  share native list/item anatomy and the separate optional action projection.
- Passive items allocate no action pseudo-element or transition. Native action
  probes cover link, button, disabled, hover, Enter, Space, reduced motion and
  a two-tone keyboard focus perimeter.
- The canonical fixture exposes four list items, four informative images, zero
  focusable controls and zero live regions. Exhibit and Studio root DOM is
  byte-identical at 390, 768, 1440 and 1728px with SHA-256
  `482b73ec0a6e9e9998962975eec838ce48f30f9f1b00eceed266f8b14faef36e`.
- Intrinsic 96px, 220px and 640px RTL hosts at 200% type produce one, one and
  five columns with no root or item overflow, including broken localized media.
- Empty, dark, forced-colors and reduced-motion states are captured. Forced
  colors removes the decorative overlay; reduced motion resolves transition to
  `0s` and transform to `none`.
- Fifteen final images and eight baseline images live under
  `output/playwright/refinement-batch-52/`.
- Final Reviews CSS is `3,787 B` deterministic gzip against the `3,788 B`
  ceiling. The neutral component still adds `0 B` runtime; the four docs-only
  source JPEGs remain `1,311,728 B` and are explicitly not a production budget.
- Neutral Web, Shopify and Webflow consume byte-identical regenerated Reviews
  CSS. No provider Liquid or placeholder behavior was invented.

Human review must still approve grid density, crop, radius, gap, hover/overlay
strength, two-tone focus treatment and the editorial four-image composition.
Provider, moderation, action/overlay, caption, production delivery and Figma
artwork remain target, product or human decisions.
