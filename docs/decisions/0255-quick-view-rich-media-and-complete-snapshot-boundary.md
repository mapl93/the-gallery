# ADR 0255: Quick View Rich Media And Complete Snapshot Boundary

- Status: Accepted
- Date: 2026-07-21
- Owners: The Gallery
- Scope: K8 Quick View composition, Product Gallery detail mode, target product
  coordination, docs evidence, Shopify projection, and future target translation
- Supersedes: the unresolved rich-media and coordinator boundary in ADR 0180

## Context

ADR 0180 correctly made Quick View a focused profile of canonical Modal and
assigned product state to a target coordinator, but it intentionally left the
Product Gallery scope and target loading boundary unresolved. The later Product
Gallery decision in ADR 0238 established one rich collection model for images,
hosted video, external video, and models, plus semantic
`imageDetail: "lightbox" | "none"`.

The owner selected K8-A and explicitly rejected the decision packet's stale
image-only wording. Quick View must use the same canonical Product Gallery and
rich-media behavior as the full product experience, while avoiding a second
modal overlay inside the already-modal Quick View.

## Decision

- Quick View remains one focused canonical Modal profile composing one required
  canonical Product Gallery, one required target-formatted Price, an optional
  canonical native Product Form, and an optional coherent full-details Link.
- Its Gallery receives the complete target-coordinated media collection defined
  by ADR 0238: images, hosted video, external video, and models when those media
  exist for the product.
- K8 configures that same Product Gallery with `imageDetail="none"`. Image
  selection, logical navigation, direct swipe, explicit video activation,
  explicit model activation, and eligible target-native AR remain available.
- `imageDetail="none"` makes featured images passive. Quick View does not open,
  transfer, portal, or emulate canonical Lightbox, and it never creates a
  nested modal dialog for image detail.
- The coherent full-details Link leads to the target's complete product
  experience, whose Product Gallery keeps its independent default
  `imageDetail="lightbox"` unless that target explicitly selects another valid
  Product Gallery mode.
- One target product coordinator owns the complete snapshot used to open K8:
  product identity, media collection and current id, selected variant,
  availability, target-formatted Price, purchasable merchandise, quantity
  rules, Product Form state, URL, pending/result/error state, cart refresh, and
  the deliberate localized status.
- A target may present Quick View only after that coherent snapshot is ready.
  While loading, incomplete, stale, or unable to coordinate the dependencies,
  it omits K8 rather than presenting partial product data or a local loading
  state owned by the component.
- Modal exclusively owns modality, initial focus, focus containment, outside
  inertness, dismissal, scroll locking, and logical trigger restoration. K8
  adds no second focus manager or overlay lifecycle.
- The docs target uses the same site-only rich Product Gallery fixture in the
  standalone Product Gallery and Quick View renderers. Quick View owns the
  controlled current media id in its target coordinator and passes `none`.
- Shopify's existing snippet maps complete `product.media` through canonical
  Product Gallery with `image_detail: 'none'`. Its static mapping is valid, but
  target readiness still requires real invocation, loading, coordinated variant
  updates, native/Ajax purchase outcomes, focus, status, and live-theme proof.
- K8 adds no new public property or public token. The gallery slot is the
  semantic composition boundary; media objects and `imageDetail` remain Product
  Gallery inputs supplied by the target composition.
- The contract advances to `0.3.0` and remains `pilot`. Automated evidence may
  make it ready for human review but cannot promote it to `stable`.

## Accessibility And Runtime Requirements

- Exactly one modal dialog exists while Quick View is open. Selecting or
  activating media must not create another dialog when image detail is `none`.
- Rich-media controls keep Product Gallery's localized names, explicit
  activation, native control/fallback boundary, release behavior, and current
  media announcement.
- Quick View itself is not a live region. The target coordinates at most one
  intentional product or purchase status without duplicating Gallery, Price,
  or Product Form announcements.
- Neutral K8 runtime remains `0 B`; Modal and commerce lifecycle belong to
  adapters, and Product Gallery retains its canonical behavior boundary.

## Consequences

- A shopper receives the same real product media breadth in Quick View without
  navigating into a second overlay for image detail.
- Exhibit and Studio demonstrate the accepted rich-media composition through
  one shared renderer and fixture rather than an image-only approximation.
- Targets cannot call a partial record, first-image card, or independently
  updated Price/Form/Gallery a valid Quick View.
- The remaining work for human review is visual and target proof: modal
  geometry, media density, mobile presentation, long-content scrolling, live
  data coordination, and final target-specific lifecycle evidence.

## Not Approved

This decision does not approve:

- a new K8 media API, duplicate gallery engine, nested Lightbox, or second
  modal coordinator;
- a component-owned loading spinner, product fetcher, variant resolver, cart
  client, result message, analytics store, or URL router;
- automatic media playback or eager provider/model loading;
- Shopify production readiness from Liquid validation alone;
- a universal mobile sheet/full-screen presentation or final visual treatment;
  or
- promotion from `pilot` to `stable`.
