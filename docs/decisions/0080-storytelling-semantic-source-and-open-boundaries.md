# 0080. Storytelling Semantic Source And Open Boundaries

Status: Accepted

Date: 2026-07-12

## Context

The nine Storytelling components had canonical CSS and pilot contracts, but the
generated contract pass left incomplete anatomy, generic target-data behavior,
and mechanical modeling errors. Collection Story treated its reversed layout as
a state, Artist Index contained an unnamed state, and Exhibition Page described
only its root despite exposing a full page composition in canonical CSS.

The CSS also assumed hover and pointer interaction in places where the product
boundary is not decided, used the editorial statement surface for selected
filter controls, and lacked consistent containment, focus, touch, responsive,
and reduced-motion safeguards.

## Decision

- Artist Profile exposes portrait, label, name, location, biography,
  philosophy, and action composition while preserving narrative source order.
- Process Timeline exposes its title and ordered step composition. Step records
  remain target-owned, and narrow-viewport horizontal overflow must remain
  keyboard-scrollable when it overflows.
- Certificate exposes its visible identity fields and target-owned detail,
  signature, and verification slots. Targets retain ownership of certificate
  records, verification destinations, and authenticity guarantees.
- Collection Story models reversal as a boolean layout property, not a state.
  Reversal changes wide-viewport placement without changing source reading
  order or inventing a registry variant.
- Masonry Gallery exposes ordered artwork items as a slot. The contract does not
  decide whether a piece is passive, a link, or a Lightbox trigger. Overlay
  metadata remains visible on non-hover inputs and supports focus disclosure
  when target-owned interaction is present.
- Artist Index exposes title, introduction, filters, and result composition.
  Filter selection mode, selected-state semantics, result synchronization,
  empty results, and announcements remain target-owned. The existing
  `aria-pressed` and `.is-active` selectors are visual hooks, not a decision that
  every target uses toggle-button semantics.
- Artist Card exposes its visible artist content but does not expose an `href`
  or activation property. A target may keep the card passive or use native link
  or button markup after that product boundary is decided.
- Exhibition Page exposes semantic hero and information content plus works and
  participating-artist slots. The slots do not decide whether Product Card,
  Artist Card, links, or another dependency owns those records.
- Artist Statement exposes portrait, editorial label, artist name, quotation,
  body, and signature while keeping rich content and media target-owned.
- Selected Artist Index controls consume the existing primary button token
  family. The statement surface remains an editorial color role.
- Canonical Storytelling CSS uses existing public tokens only and adds scoped
  border-box sizing, min-width containment, responsive grid bounds, visible
  focus, touch-sized filter controls, non-hover disclosure, and reduced-motion
  fallbacks.
- All nine contracts remain `pilot`. Automated validation does not substitute
  for owner-led human review or resolve the open product boundaries below.

## Open Product Boundaries

The following questions are intentionally documented without resolution:

- Should Masonry Gallery pieces be passive, links, Lightbox triggers, or support
  more than one target-specific mode?
- Is Artist Index filtering single-select or multi-select, and which layer owns
  filter-to-result synchronization and result announcements?
- Is Artist Card always navigational, optionally interactive, or passive in
  some compositions?
- Which components, if any, own Exhibition Page featured-work and
  participating-artist records and interactions?

## Consequences

- Storytelling adapters can consume explicit semantic content and composition
  regions without inventing a broad target-data object.
- Responsive and input-modality behavior no longer depends on mouse hover or
  unconstrained page width.
- Targets can implement the four open boundaries independently while the
  source contracts remain truthful and portable.
- Promotion to `stable`, dependency additions, and broader activation or
  filtering properties require explicit product decisions and human review.
