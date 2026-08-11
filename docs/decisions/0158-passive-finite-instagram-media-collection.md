# 0158. Passive Finite Instagram Media Collection

Status: Accepted

Date: 2026-07-16

## Context

S16 Instagram Feed is intended to present a bounded collection of media records
already supplied by a target. Its initial renderer emitted six generic
focusable `div` items, invented a `#studio` account destination, exposed
artificial like/comment counts, hid those counts until hover or focus, and used
fixed viewport-driven column counts. The contract did not distinguish passive
items from real destinations, and Shopify had only copied CSS.

The WAI-ARIA APG `feed` pattern is for dynamically loaded article sequences and
couples DOM focus to loading, scrolling, insertion, and removal. HTML native
lists, figures, captions, images, and anchors provide the complete semantics for
S16's finite already-rendered records. WAI image guidance, WCAG focus and target
size guidance, Open UI list/card research, Radix native-element composition,
Polaris media/list boundaries, and Shopify sections/blocks establish a complete
technical direction. The registered Figma references show Button and cannot
approve S16 aesthetics.

## Decision

- Instagram Feed is a passive finite media collection. It is not a provider
  client, embed wrapper, OAuth flow, consent manager, cache, event stream,
  infinite scroller, carousel, lightbox, analytics surface, moderation queue,
  or metric calculator.
- A non-empty visible heading creates and names a native
  `section.instagram-feed` through `aria-labelledby` and a target-unique id.
  Without a heading, targets render a generic `div.instagram-feed`.
- One or more valid item records are required. Missing or empty required records
  omit the complete component rather than leaving an empty root.
- The collection uses native `ul` and `li` elements in source order. Each valid
  record uses a native `figure`, target-owned media, and an optional always-visible
  `figcaption`.
- A target may wrap one figure in `a.instagram-feed__link` only when a real item
  destination exists. Passive records receive no `tabindex`, click handler,
  pointer role, or focus-based disclosure.
- Optional `handle` and `handleDestination` form one pair. Both must be non-empty
  before the native account link renders; no target may synthesize `#`,
  `#studio`, or another preview-only fallback.
- Provider metrics are volatile target data, not stable S16 properties. The
  neutral component exposes no likes, comments, views, freshness, order, cursor,
  query, account id, access token, refresh, error, stale, consent, or provider
  property.
- The public API remains optional `heading`, optional paired `handle` and
  `handleDestination`, required `items`, and optional `action`. Fixed column
  counts, item record schema, aspect ratio, crop, gap, heading rank, alignment,
  breakpoint, caption mode, overlay mode, and target editor fields remain
  private or target-owned.
- Intrinsic auto-fit grid geometry responds to available component inline space
  without viewport-swapped DOM. Public tokens cover semantic typography,
  text/focus color, section/container rhythm, and grid/element gaps; crop,
  minimum tile width, caption rhythm, underline offset, focus geometry, and
  maximum measure remain private composition.
- S16 has a `0 B` neutral runtime budget: no state store, event, listener,
  observer, request, provider SDK, timer, layout read, authored motion, custom
  element, hydration, or bundled asset.
- Exhibit and Studio use the same `SectionsStudio` renderer, initial fixture,
  conditional root, omission and handle-pair rules, canonical CSS, and normalized
  DOM. Studio no longer owns fixed Instagram column counts.
- Shopify receives a target-native localized section with optional heading,
  paired account/action links, repeatable validated image blocks, visible
  captions, optional item destinations, strict invalid/empty omission, editor
  block attributes, responsive image output, and zero component JavaScript.
- Contract version advances to `0.3.0` and remains `pilot`. Automated evidence
  may prepare S16 for human review but cannot approve aesthetics, provider
  policy, product naming, corrected Figma evidence, or stability.

## External Evidence

- APG Feed defines a dynamic article-loading interoperability pattern, not a
  finite image gallery.
- HTML defines native list grouping plus `figure` and `figcaption` relationships.
- WAI image guidance requires meaningful alternatives and preserves grouped
  image context.
- WCAG requires visible focus for keyboard-operable destinations and adequate
  pointer target size or spacing.
- Open UI list/card research provides collection and compound-content evidence
  but no consensus social-feed anatomy; provider-iconic patterns are outside its
  standardization scope.
- Radix composition preserves appropriate native elements and transfers
  accessibility responsibility when consumers replace them.
- Polaris media/list patterns keep supplied records, written context, explicit
  actions, filtering, sorting, pagination, and network ownership separate.
- Shopify sections and blocks provide target-native merchant editing without
  requiring editor fields or provider integration to become cross-target API.

## Performance

Instagram Feed adds no neutral JavaScript or bundled asset. The permanent
Sections ceiling remains `6,861 B` deterministic gzip and is not raised. S16
funds its semantic CSS by deleting the hover overlay, fake-stat, transition, and
duplicate viewport/container-query rules. Shopify performs one bounded loop over
merchant blocks and adds no S16 script or provider request.

## Target Translation

- Neutral Web uses conditional `section`/`div`, optional heading/account link,
  native list items and figures, optional native item links/captions, intrinsic
  CSS, and zero runtime.
- Webflow consumes source-identical canonical Sections CSS and maps CMS records
  to the item slot without importing provider logic.
- Shopify maps localized optional heading and paired links plus validated image
  blocks to a target-native addable section with strict omission and zero
  runtime.
- React and Angular use thin conditional native wrappers around framework-owned
  record rendering; provider state remains outside S16.
- Figma should expose optional account context and finite item/action composition
  after the owner supplies S16-specific evidence.
- SwiftUI and Compose use native grid/list, image, text, and link semantics while
  provider authorization and data remain separate layers.

## Open Human Boundary

This decision intentionally does not approve:

- the final `9rem` tile minimum, `80rem` measure, grid density/gap, square crop,
  caption placement/type, underlines, title/account/action rhythm, alignment,
  focus geometry, or fixture;
- Instagram API/auth/embed/consent/cache/freshness/moderation/analytics policy;
- provider metrics, account claims, or the commercial right to display them;
- retaining or replacing the provider-specific public component name;
- component-specific Figma evidence, because the registered nodes show Button;
- framework/native implementations; or
- promotion from `pilot` to `stable`.

## Consequences

- Consumers receive a finite native media collection rather than a misleading
  interactive feed or provider client.
- Passive items leave the tab order; linked records and account/action links
  retain native semantics, full targets, history, activation, and focus.
- Captions and essential context remain available without hover, focus, touch,
  motion, artificial metrics, or provider availability.
- Required records and optional handle pairs cannot produce empty shells or fake
  anchors.
- The same semantic source translates to Web, Webflow, Shopify, Figma, and native
  targets without target dependencies in the neutral base.
- Human review remains responsible for visual identity, provider/product policy,
  corrected owner references, and stability.
