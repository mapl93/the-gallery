# 0085. Review Semantic Source And Open Boundaries

Status: Accepted

Date: 2026-07-12

## Context

The nine Review contracts were valid structural pilots, but their anatomy and
behavior were still largely mechanical. They exposed no reviewed semantic
properties, treated responsive layouts as states, described supplied data as if
the neutral components calculated it, and assigned provider behavior such as
filtering, lightbox opening, pagination, and submission without an accepted
ownership decision.

Canonical Review CSS also had neutral-web maturity gaps:

- Star Input styled a non-focusable label instead of projecting focus from its
  native radio, and its checked sibling selectors did not match the documented
  nested-radio anatomy.
- Review Form and Review Toolbar recreated field and button visuals instead of
  composing the canonical Input, Textarea, File Upload, Select, and Button
  contracts.
- Several optional actions were mouse-oriented, smaller than the existing touch
  target, or missing visible focus and disabled states.
- Flexible metadata, controls, images, bars, and pagination could compress or
  overflow on narrow viewports.
- Review transitions and media transforms did not consistently honor reduced
  motion or forced colors.

The Review family can improve its semantic source and web presentation without
choosing a review provider or freezing unresolved product behavior into a
target-agnostic contract.

## Decision

### The Review family remains a pilot

Review Summary, Star Rating, Star Input, Review, Review Highlights, Photo
Reviews, Review Form, Review Toolbar, and Review Pagination advance to contract
version `0.2.0` and remain `pilot`.

Automated validation is structural evidence only. It does not replace the human
review required by the component certification process and does not promote any
Review contract to `stable`.

### Display rating and rating input remain distinct

- Star Rating is a read-only projection of a supplied half-step value from zero
  through five. It exposes an accessible rating label and decorative empty,
  filled, and half-filled star anatomy.
- Star Rating does not calculate an aggregate and does not own value entry.
- Star Input is a native radio group for one integer choice from one through
  five. It owns the group label, shared name, selected value, required state,
  disabled state, and supporting-description reference.
- Star Input preserves native arrow-key movement, validation, form reset, and
  submission. Focus remains on the native radio and is visibly projected onto
  its touch-sized label.
- Read-only contexts compose Star Rating. Review Form composes Star Input.

### Aggregate and repeated review data stay target-owned

- Review Summary exposes supplied numeric rating and review-count values plus
  visible target-formatted labels. Optional distribution rows remain a target
  composition with visible bucket labels and counts.
- Review Summary does not calculate averages, normalize rating scales, select
  buckets, synchronize counts, or infer distribution widths.
- Review exposes author, date, title, body, Star Rating, and optional
  avatar, verification, photo, helpfulness, and reply regions.
- Verification truth, dates, review records, photos, replies, and counts remain
  target data rather than component defaults.
- An optional helpfulness button may expose local `aria-pressed` and disabled
  state. Authentication, persistence, optimistic updates, deduplication, and
  count synchronization remain target-owned.

### Theme and photo effects are not assumed

- Review Highlights exposes an optional accessible region label and repeated
  target-owned theme items.
- A target may render passive text, native navigation, or in-place selection.
  The neutral contract does not decide filtering, navigation, single versus
  multiple selection, URL state, result updates, or announcements.
- Photo Reviews exposes an accessible gallery label and ordered target-owned
  items. Items are passive by default.
- A target may render a photo as a native link or button, but Photo Reviews and
  Review do not select or implement a Lightbox or Modal contract.

### Review Form composes canonical controls

- Review Form owns a native form boundary, field layout, action layout, and an
  optional target-owned response region.
- Star Input owns rating selection.
- Input, Textarea, File Upload, and Select retain their canonical labels,
  values, native controls, messages, Default, Error, Success, Warning, hover,
  focus-visible, disabled, and other component-specific obligations.
- Button retains native submit, disabled, busy, loading, and focus semantics.
- Review Form does not recreate field borders, validation colors, file policy,
  option inventory, submit-button visuals, or response states.
- The contract dependency array remains aligned with the current registry and
  therefore still lists only `star-input`. Input, Textarea, File Upload, Select,
  and Button composition is explicit in anatomy, properties, and behavior.
  Formal dependency-list reconciliation requires a separate registry-owned
  change.

### Toolbar and pagination remain structural

- Review Toolbar owns responsive layout for target-owned controls. It may
  compose Select and Button, but it does not define ordering options, filtering,
  write-review entry behavior, URL synchronization, or result announcements.
- Review Pagination owns a labelled, horizontally contained control sequence
  with current, focus-visible, hover, and unavailable presentation.
- Targets choose native links or buttons and own page-window size, URL state,
  cursor versus offset strategy, loading, focus movement, and result updates.
- The neutral pagination contract supplies no paging algorithm.

### Neutral-web CSS receives bounded hardening

Canonical Review CSS now:

- Uses border-box sizing, minimum-width containment, wrapping, responsive
  stacking, bounded grids, and horizontal containment where needed.
- Uses the existing layout spacing, touch-target, focus, opacity, typography,
  color, radius, and motion tokens without introducing new public tokens.
- Gives optional native actions visible focus, disabled presentation, and
  touch-sized targets.
- Restricts hover-only media effects to fine pointers and leaves passive media
  without a pointer cursor.
- Preserves checked Star Input values independently of pointer preview.
- Removes Review Form and Review Toolbar field/button visual duplication.
- Disables review transitions and transforms for reduced motion and keeps
  selected states legible in forced colors.

No JavaScript behavior, adapter output, Shopify implementation, Studio metadata,
MDX content, registry metadata, or generated docs output changes in this
decision.

## Open Product Boundaries

The following questions are intentionally unresolved:

### Review data, backend, and moderation

- Which provider, API, metafield, or target data model supplies reviews?
- Which layer owns authentication, author identity, verified-purchase truth,
  moderation, abuse handling, edits, deletion, replies, and localization?
- Which data is trusted for counts, dates, rating values, and helpfulness state?

### Rating aggregation and distribution

- Which layer computes aggregate values, rounding, rating scale, bucket counts,
  missing values, and synchronization after filtering or moderation?
- Are half-star display increments always valid, and how are non-five-point
  provider scales normalized?

### Sorting, filtering, and highlights

- Which sort and filter options exist, and are they navigation or in-place
  updates?
- Are Review Highlights passive summaries, navigation, single-select filters,
  multi-select filters, or target-specific combinations?
- Which layer owns URL state, result counts, focus retention, empty results, and
  announcements?

### Pagination strategy

- Does a target use numbered pages, cursor pagination, offset pagination, load
  more, infinite loading, or provider-managed navigation?
- Which layer owns URL state, page windows, disabled controls, loading, scroll,
  focus, and result announcements?

### Photo activation and lightbox ownership

- Are review photos passive, direct links, download links, Lightbox triggers, or
  Modal triggers?
- Which component owns enlarged-media navigation, focus management, dismissal,
  captions, and image loading?

### Review submission workflow

- Which fields are required, which option inventories exist, and what file
  types, counts, sizes, and upload policies are permitted?
- Which layer owns endpoint selection, authentication, consent, client/server
  validation, pending state, retries, duplicate prevention, success, error,
  reset, moderation notice, and post-submit focus?

## Consequences

- Review adapters can consume explicit semantic content and composition regions
  without inventing provider records or workflow behavior.
- Read-only ratings and rating input no longer share ambiguous ownership.
- Canonical field and button contracts remain the single source for validation,
  focus, disabled, and busy presentation inside Review Form and Review Toolbar.
- Responsive and input-modality behavior no longer depends on mouse hover or
  unconstrained page width.
- Provider selection, registry dependency reconciliation, target behaviors, and
  every open product boundary require explicit later decisions before affected
  components can be promoted to `stable`.
