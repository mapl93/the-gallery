# 0128. Passive Native Artist Index And Target-Owned Filter Lifecycle

Status: Accepted

Date: 2026-07-14

## Context

ADR 0080 established Artist Index as a title, optional introduction, optional
target-owned filter composition and target-owned results. It intentionally left
filter cardinality, selected-state semantics, result synchronization, empty
results and announcements open.

The initial shared Exhibit/Studio fixture crossed that boundary incompletely. It
rendered four `aria-pressed` buttons, initialized `All` as selected and changed
only the visible pressed control. The three artist records never changed, no
result status existed and the implementation implicitly chose exclusive toggle
buttons even though APG distinguishes independent pressed buttons from
single-choice radio groups. The MDX fallback contradicted the shared renderer by
showing unselected inert buttons.

The result composition was a generic `div` without native list semantics.
Canonical CSS used intrinsic Grid, but Studio overrode it with fixed three/two/
one columns. Typography, spacing, pointer hover and forced-color handling also
remained incomplete. The registered Figma reference contains only the generic
Button Studio pilot and supplies no Artist Index evidence.

HTML and Open UI support a labelled section and native repeated list for the
stable passive core. APG, ARIA, Radix and Polaris show that filter selection
mode, value ownership, keyboard behavior, applied state, results and notices
form one coherent product/target lifecycle. Shopify storefront filtering is
defined for product collection/search data and URL parameters; it does not
provide an automatic artist-directory model.

## Decision

- The canonical candidate is a heading-labelled `section.artist-index` with a
  native `header`, optional introduction, optional target-owned filter slot and
  required native `ul.artist-index__grid`.
- Each result is wrapped by one `li.artist-index__item` and contains one
  target-owned artist record. Source order is authoritative.
- The neutral contract does not add `grid`, `listbox`, selection or roving-focus
  roles. Passive results do not acquire component keyboard behavior.
- The accepted public API remains `title`, optional `introduction`, optional
  `filters` and required ordered `results`.
- The default Exhibit/Studio fixture omits filters. It does not expose inert
  controls or choose a selection policy to obtain selected styling.
- Studio can expose the optional slot boundary with a site-only explanatory
  placeholder. That placeholder is not a filter implementation, public default
  or target API.
- Existing `.artist-index__filter-btn`, `[aria-pressed="true"]` and `.is-active`
  selectors remain optional visual hooks. They do not determine whether a real
  target uses buttons, checkboxes, radios, navigation or another accepted
  pattern.
- A target that activates filtering owns selection cardinality, values,
  controlled/uncontrolled state, keyboard behavior, `All` policy, URLs,
  requests, result synchronization, status, empty/loading/error presentation,
  focus, analytics and persistence.
- Canonical CSS owns list reset, containment, complete typography, touch-sized
  optional-control hooks, fine-pointer hover, focus, disabled/selected states,
  forced colors, reduced motion and component-width layout.
- The result grid uses one column by default, two from a private `27rem`
  container threshold and three from a private `44rem` threshold. These are
  intrinsic outcomes, not public variants or column properties.
- Docs-only padding and column overrides are removed. Exhibit and Studio consume
  the same renderer, fixture, markup and canonical responsive authority.
- Fixture images are decorative because the repository media does not provide
  authoritative portraits for each fictional artist. Targets own meaningful
  portrait sources and alternative text.
- No Artist Card dependency is added. The shared site fixture may reuse its
  existing artist-record renderer, but the neutral result slot remains
  target-owned until dependency ownership is accepted explicitly.
- Shopify receives the exact generated CSS. Dedicated Liquid, schema and data
  remain planned until an artist source/model and any filter/URL lifecycle are
  accepted; product collection filtering is not repurposed by assumption.
- The neutral component adds no JavaScript, listener, observer, request, timer,
  live region or focus-management model.
- The contract advances to `0.2.0` but remains `pilot`. Automated evidence can
  make it ready for human review; only explicit human approval may promote it
  to `stable`.

## Open Human And Target Boundaries

This decision intentionally does not approve:

- single-select versus multi-select filtering, `All` exclusivity or another
  selection/navigation model;
- selected-state roles/attributes, controlled/uncontrolled values or events;
- result/URL/request/status/empty/loading/error/focus/analytics lifecycle;
- a formal Artist Card dependency or universal result-record anatomy;
- Shopify artist records, metafields/metaobjects, section blocks, routes or
  storefront filter mapping;
- the private `27rem`/`44rem` thresholds, maximum three tracks, gap, section
  inset, filter pill treatment or result-card visual direction.

Those choices require explicit owner, product, architecture or target review.
Their absence does not block a truthful passive list candidate.

## Consequences

- Neutral Web, Exhibit and Studio now share one passive, labelled, ordered and
  container-responsive core without fake filter behavior.
- Screen-reader and keyboard users encounter a native result list rather than a
  visually gridded generic container or an invented composite widget.
- Optional filter hooks can be validated for touch, hover, focus, selected,
  disabled, forced-color and reduced-motion presentation without declaring one
  universal semantic model.
- Embedded directories no longer derive columns from page viewport or require
  site corrections; isolated `260/580/900px` hosts resolve `1/2/3` tracks.
- A future target must implement filtering as a complete lifecycle, not attach a
  click handler to the current pills.
- Shopify remains honestly `css-ready` and not target-ready; no merchant data
  schema or URL behavior is invented to increase maturity metrics.
- Existing consumers that relied on the docs-only three-column override or the
  non-functional pressed-button fixture receive the corrected passive candidate
  when they regenerate artifacts.
- Owner review is still required before `stable`, before any filter behavior
  becomes public API and before a formal dependency or Shopify data model is
  added.
