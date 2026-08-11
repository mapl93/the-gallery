# 0132. Passive Review Summary Figure And Target-Owned Distribution

Status: Accepted

Date: 2026-07-15

## Context

Review Summary entered component refinement with a valid `0.2.0` pilot contract
and an accepted target-owned data boundary from ADR 0085. Its web candidate still
used a labelled `section` around a nested Star Rating with the same accessible
label, so the aggregate was announced twice. Distribution rows had complete
visible labels and counts but no native list structure. Canonical CSS used a page
viewport breakpoint while the docs site supplied a second container-specific
repair, used a Button background token for data, and animated passive bar width.

The review provider, aggregation and normalization rules remain open. ADR 0110
also leaves the long-term identity of A11 Rating versus V2 Star Rating unresolved.
Those questions do not need to be answered to correct Review Summary's current
passive semantics and responsive ownership.

## Decision

- Review Summary is a self-contained native `figure`.
- Its required average group is the `figcaption` and contains the visible
  target-formatted score, one required canonical Star Rating composition, and
  the visible review-count text.
- The composed Star Rating is the single accessible owner of rating value and
  scale. The repeated numeric score remains visible but is hidden from the
  accessibility tree. The figure creates no region, heading, image, group,
  status, live-region or widget role.
- Optional distribution is a labelled native list. Each list item contains a
  visible target-supplied bucket label and count plus a passive track and bounded
  fill hidden from assistive technology.
- `distributionLabel` becomes a required localized semantic property. It is
  emitted only when the optional distribution list exists. The current contract
  schema does not express conditional requirement.
- Rating value, formatted labels, review count, distribution rows and fill sizes
  remain supplied independently by the target. The component performs no
  calculation, formatting, aggregation, normalization, synchronization or
  announcement.
- The average and distribution use intrinsic flexible bases and wrapping. Layout
  responds to the component's available inline size without a viewport query,
  docs-site correction or source-order change.
- Review Summary uses the semantic accent text token for data fill. Score,
  supporting text and row text receive complete existing typography token
  mappings. Gaps, bases and track thickness remain private composition values.
- Passive bar animation and the Review Summary motion control are removed. The
  component owns no listener, observer, timer, request, animation, asset or
  component JavaScript.
- Exhibit and Studio continue to mount one `ReviewsStudio` renderer, definition
  and initial fixture. MDX mirrors the figure, caption, Star Rating and list
  anatomy.
- Shopify remains planned/CSS-ready until an accepted review provider or data
  model can supply truthful values, scale, labels and distribution. A neutral
  JavaScript runtime is not required.
- Contract version advances to `0.3.0` and remains `pilot`.

## Architecture Boundary

This decision does not add a formal registry dependency. ADR 0085 already
requires read-only review contexts to compose Star Rating while separately
deferring review-family dependency reconciliation. ADR 0110 leaves the A11
Rating/V2 Star Rating identity to owner architecture input. The reviewed anatomy
therefore records required composition while the registry's empty dependency
array remains an explicit temporary source fact, not a claim of independence.

## Performance

Review Summary remains within the passive `0 B` component-runtime budget. The
permanent Reviews family ceiling remains `3.7 KiB` gzip, the total component CSS
ceiling remains `64 KiB`, and the shared runtime ceiling remains `8 KiB`.
Measured post-refinement size and deltas are recorded in the batch report; this
decision does not increase any ceiling or hide previous program-wide overages.

## Open Human Boundary

This decision intentionally does not approve:

- score hierarchy, Star Rating appearance, accent fill, track contrast or
  thickness, row density, alignment, flexible bases or wrap threshold;
- the presence of a distribution, bucket inventory, sort order, percentage
  policy or truthful relationship between counts and visual sizes;
- retention versus consolidation of A11 Rating and V2 Star Rating;
- a formal Review Summary dependency edge;
- provider, aggregation, scale, normalization, moderation, structured-data,
  destination, update-announcement or Shopify integration policy; or
- Figma, React, Angular, SwiftUI or Compose adapter implementation.

## Consequences

- Assistive technology receives one rating label followed by ordinary count and
  optional list text instead of a duplicated section/image label.
- Distribution meaning survives unavailable color, bars or CSS because visible
  labels and counts remain authoritative.
- Embedded candidates wrap from their own available measure with no docs-only
  layout authority.
- Review Summary has no passive transition or data calculation to disable in
  reduced motion.
- Targets can translate the same supplied-data boundary without copying React or
  Shopify assumptions into neutral source.
- Human visual review and the explicit open architecture choices continue to
  block `stable`.
