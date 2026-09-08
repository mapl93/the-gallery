# 0137. Native Review Photo List And Target-Owned Media Activation

Status: Accepted

Date: 2026-07-15

## Context

ADR 0085 established Photo Reviews as a passive ordered collection whose data
and any activation remain target-owned. Contract `0.2.0` preserved that intent,
but its Web anatomy used `div[role=list]` / `div[role=listitem]` and allowed the
same `.photo-reviews__item` node to become a native link or button. An
interactive target would therefore replace collection membership with action
semantics instead of composing them.

Canonical CSS also retained a direct-image compatibility selector, allocated a
generated overlay for passive items, and assigned a transform transition to
every image even when no activation existed. The shared renderer remained
passive, so those costs and duplicate contracts did not express real state.

The repo has no accepted decision for passive versus link, download, Lightbox
or Modal behavior; provider, moderation, captions, responsive image delivery,
failure handling and enlarged-media lifecycle are also open. Figma references
are generic Button Studio shell/inspector frames, not Photo Reviews artwork.

## Decision

### Collection and action are separate anatomy

- Neutral Web uses `ul.photo-reviews[role=list]` and repeated native
  `li.photo-reviews__item`.
- `.photo-reviews__image` is the one strict required image selector. The former
  direct descendant compatibility selector is removed.
- The shared Exhibit/Studio renderer remains passive.
- A target with a real destination or action places an optional native
  `a.photo-reviews__action` or `button.photo-reviews__action` inside the list
  item. The list item itself never becomes the control.
- Links require real destinations. Buttons require `type=button` and a truthful
  accessible action name. Fake disabled links are not supported.

### Informative and functional names remain contextual

- Targets supply concise contextual alternatives for informative review
  photos. Empty alternatives are used only for genuinely decorative or
  redundant images in that exact context.
- If the image is actionable, the native action has an explicit name describing
  its purpose or destination rather than relying only on the visual
  description.
- Crop, hover, zoom and generated overlay never carry the only meaning.

### Interaction styling is action-only

- Passive items allocate no action overlay and their images have no transition.
- Optional native actions receive fine-pointer zoom/overlay, a two-tone
  surface/focus perimeter, native button disabled, reduced-motion and
  forced-color hooks.
- The square auto-fill grid, 120px private minimum, 8px gap, crop, radius,
  overlay mix and zoom remain internal presentation rather than public API.

### Image and overlay lifecycles stay target-owned

- `src`, `srcset`, `sizes`, formats, CDN transforms, loading, decoding,
  fallback, failure status, moderation and sensitive-content policy belong to
  the target/provider pipeline.
- Empty Photo Reviews is a valid list; surrounding content owns any Empty State.
- Photo Reviews does not select or partially implement link, download,
  Lightbox, Modal or Popover behavior.
- A target that composes enlarged media owns open/active state, captions,
  navigation, preloading, focus placement/containment/restoration, close,
  Escape, history and analytics through the separately selected component.

### Target translation remains explicit

- Neutral Web implements the passive list and optional native action hooks with
  zero component runtime.
- Shopify remains provider theme-app-block territory: the provider supplies
  moderated review media and Shopify CDN transformations while consuming the
  generated Reviews CSS. No placeholder provider Liquid is added.
- Webflow, framework and native targets preserve collection/action separation
  and own media/state services.
- Figma receives visual representation only after browser artwork is approved.

## Alternatives Considered

### Keep the authored-role `div` collection

Rejected. It works in the accessibility tree but adds roles while still failing
to separate collection membership from an optional action.

### Make every tile a Lightbox button

Rejected. It resolves an open product and architecture decision by assumption
and would require a complete overlay lifecycle absent from Photo Reviews.

### Make every tile a full-media link

Deferred. This is a valid target projection once URLs, destination behavior and
download/history policy are known; it is not the neutral default.

### Add required figure captions

Deferred. HTML figure/caption is appropriate when captions exist, but caption,
reviewer attribution and duplicate-content policy remain unresolved.

### Expose grid and image-delivery controls as semantic properties

Rejected for the neutral contract. Private crop/layout values are not stable
cross-target decisions, while responsive sources and loading/failure policy
belong to each target pipeline.

## Consequences

- Contract `0.3.0`, registry, MDX, Studio and the shared renderer describe one
  native passive collection and a separate optional action projection.
- Passive media has no pseudo-element, motion or runtime cost.
- Target actions can be tested for native link/button, focus, disabled, hover,
  Enter and Space behavior without adding those controls to the canonical
  fixture.
- Complete semantics are available without selecting an overlay or provider.
- Reviews CSS stays within its fixed family ceiling by removing compatibility
  and passive interaction work.
- Human review must still approve crop, density, gap, radius, hover strength,
  focus treatment and the four-photo editorial composition.
- Photo Reviews remains `pilot`; no stability promotion is made.

## Deferred Questions

- passive, link, download, Lightbox, Modal or target-specific action;
- provider, moderation, consent, sensitive imagery, deletion and reporting;
- source formats, responsive transformations, loading and failure policy;
- captions, reviewer attribution and Review duplication;
- count, ordering, gestures, navigation, preloading, history and analytics;
- component-specific Figma artwork and explicit human stability approval.
