# 0250. Filter Panel Adaptive Surface And Commit Policy

Status: Accepted

Date: 2026-07-20

Supersedes: ADR 0121 adaptive-surface, commitment, identity and Shopify deferrals

## Context

ADR 0121 established a native filter-form core but retained the public identity
`Collection Filters`, hid the available groups on narrow layouts, responded to
the page viewport instead of the owning container and deferred the surface and
commit lifecycle. The owner subsequently clarified that E3 and L7 are both
domain-neutral filters distinguished by composition: E3 is a faceted adjacent
panel and L7 is a compact horizontal bar. The accepted public identities are
therefore Filter Panel and Filter Bar, without permanent Collection/Category
aliases.

The owner also selected one state and form model rendered beside results when
there is sufficient local width and inside canonical Drawer when constrained.
Consumers need both immediate and manual commitment because storefronts differ
in request cost and result lifecycle. These decisions affect public API,
responsive ownership, focus, URL behavior and target translation and are now
explicit rather than inferred.

## Decision

- E3 is `filter-panel` / Filter Panel. Registry, contract, docs, Studio, reports
  and target manifests migrate directly; `filters` and Collection Filters are
  not maintained as public aliases.
- Filter Panel owns one named native GET form and one canonical control tree.
  That exact tree is an adjacent non-modal panel when the component container is
  at least the private coherent-width threshold and a canonical modal Drawer
  when constrained. Adapters must not render parallel desktop/mobile forms or
  use viewport width as the sole switch.
- The default `immediate` commit mode treats every accepted choice change as a
  committed query request. Neutral Web emits the current FormData; a navigation
  target may submit the same GET form. Capable Web and Shopify targets own query
  parameter serialization, URL/history synchronization, request cancellation,
  pending/error/empty status, result replacement, pagination reset, analytics
  and surviving focus.
- The `manual` mode exposes canonical Apply and Cancel actions. One target-owned
  draft projection feeds the same controls. Apply commits the draft through the
  native form/request path. Cancel restores the last committed values without
  changing the URL. No hidden duplicate state owner is introduced.
- Native GET submission remains the no-JavaScript baseline. Without enhancement
  the form stays inline and usable. Enhancement activates only the adaptive
  surface and emits lifecycle requests; it does not invent filter keys, fetch
  results, write history or announce target result counts.
- V1 filter groups are always visible inside the active surface and use native
  fieldset/legend plus canonical Checkbox, Radio or bounded numeric Input
  composition. Filter Panel adds no disclosure/collapse property.
- Committed values may project as a named native list of canonical Tags. Tag
  removal is a target request; the target owns URL/result reconciliation, focus
  and useful status. Draft-only values are not presented as committed Tags.
- Sort and result count remain outside Filter Panel in the owning collection
  toolbar/composition. They do not make Select a Filter Panel dependency.
- In Drawer mode the adapter owns a named trigger and dismiss action, modal
  semantics, Escape/backdrop dismissal, focus containment, background
  exclusion, document scroll lock and trigger restoration. In panel mode it
  removes modal semantics and makes Drawer-only actions unavailable.
- The public API contains the semantic commit policy, form destination, complete
  localized surface labels and composition slots for active values, groups and
  associated results. The `40rem` threshold, `15rem` panel width and surface
  mechanics remain private compositional details.
- Shopify Main Collection maps real `collection.filters` types, names, values,
  counts, disabled/active state, price bounds and removal URLs into the same GET
  form. Native navigation provides linkable/reloadable filter state; richer
  section refresh remains a target enhancement, not neutral behavior.
- Exhibit and Studio use one `FilterPanelArtwork`, fixture and state path.
  Filter Panel remains `pilot`; automated evidence can move it to the human
  review queue but cannot promote it to `stable`.

## Performance

The adaptive lifecycle justifies one shared ResizeObserver per mounted Filter
Panel plus bounded trigger, dismissal, keyboard, form and cleanup listeners.
Observers are disconnected when roots leave the document and no request,
storage, formatter, timer or asset is added. ADR 0250 documents its contribution
to the already-open shared-runtime and neutral-bundle gaps without raising any
v1 ceiling. Collection-family source must remain within its fixed `2.5 KiB`
gzip ceiling.

## Consequences

- Narrow users can reach every group through a complete canonical Drawer, while
  wide users receive an adjacent faceted panel based on actual component space.
- Immediate and manual targets share anatomy and controls without pretending
  that every storefront has the same network or result-update policy.
- URL, data, result and status truth stay with the capable target; neutral source
  remains independent of React, Shopify and any router.
- Identity, adaptive behavior, group visibility, commit policy and target
  boundaries are no longer blocking product or architecture questions. Final
  surface, width, density, hierarchy, motion and localized visual quality remain
  explicit human-review gates.

## References

- <https://html.spec.whatwg.org/multipage/forms.html>
- <https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/>
- <https://www.w3.org/WAI/tutorials/forms/grouping/>
- <https://shopify.dev/docs/storefronts/themes/navigation-search/filtering/storefront-filtering>
- <https://shopify.dev/docs/api/liquid/objects/filter>
- <https://shopify.dev/docs/api/liquid/objects/filter_value>
