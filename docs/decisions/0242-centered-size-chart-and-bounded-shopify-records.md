# 0242. Centered Size Chart And Bounded Shopify Records

Status: Accepted

Date: 2026-07-20

## Context

ADR 0213 removed D7's duplicate overlay, exclusive-choice and table systems by
composing canonical Modal, Segmented Control and Data Table. It intentionally
left data ownership, Web modality, maximum matrix policy and Shopify custom
data unresolved. The owner selected D7-A: independently authored complete
tables inside one centered Modal at every Web viewport.

Size Charts can represent different subjects, units and qualifiers. A neutral
numeric schema or converter would have to decide precision, rounding, locale,
equivalence and fit meaning. Those decisions are not stable across targets.
Shopify supports Product metafields that reference reusable metaobjects and
Liquid resolves reference lists through `.value`, so its adapter can offer a
bounded merchant-authored profile without expanding the neutral contract.

## Decision

- D7 presents one complete target-authored static table at a time. The target
  supplies localized caption, row and column headers, display values, units,
  qualifiers and notes.
- D7 never parses, calculates, converts, rounds, localizes or recommends from
  raw measurements. Optional Segmented Control selection replaces the complete
  table with another independently authored complete table.
- Web preserves the canonical centered Modal at every viewport. It does not
  silently become a Sheet on narrow containers. Inline, Sheet, full-screen and
  dedicated-page charts are other target compositions, not D7 variants.
- A very large or structurally different matrix requires another target
  presentation. D7 does not virtualize, transpose, split or replace native
  table relationships at a breakpoint.
- Shopify uses the merchant-owned
  `product.metafields.custom.size_chart` reference. Its
  `gallery_size_chart` record supports one required primary and one optional
  secondary presentation, each with one row-header column, two value columns
  and at most twenty complete `gallery_size_chart_row` records.
- Every Shopify value is a final localized display string. The custom-data
  definitions are translatable and the Liquid target escapes text, isolates
  independently formatted cells with `bdi`, and omits incomplete content.
- Shopify Main Product exposes one optional Size Chart block with no duplicate
  content settings. Products without a valid reference render no empty trigger
  or modal.
- Shopify maps modality to native `<dialog>` while retaining canonical Modal
  visual parts. Its target-only controller opens at most one chart, focuses the
  static title, preserves native Tab containment/outside inertness/Escape,
  supports visible and backdrop dismissal, restores the invoker, locks root
  scrolling and switches only among authored panels.
- Neutral D7 retains zero runtime. Shopify's target controller does not become
  base React, Liquid, Figma or platform-independent behavior.
- D7 remains `pilot`; implementation and automated evidence do not authorize
  `stable` without explicit human review.

## Public Boundary

The neutral API remains `triggerLabel`, `title`, `dismissLabel`, required
`chart`, optional `unitControls`, optional `notes` and semantic `open`.
Shopify's three-column/twenty-row record shape is adapter data, not a neutral
property schema or Studio appearance control.

Modal width, overlay, padding, density, column count, row limits, data types,
units, conversion, precision, fit logic, preference persistence and Dimensions
synchronization remain outside D7's public API.

## Accessibility

The visible title names the modal and receives initial focus because the body
contains table structure and may contain rich prose; `aria-describedby` stays
absent by default. Every table has a caption, scoped column/row headers and a
named keyboard-focusable overflow owner. Native same-name radios expose one
selected presentation. Replacing a complete table adds no automatic live
announcement.

## Performance

The neutral runtime delta stays zero. The Shopify adapter adds one target-only
custom element definition, one native dialog instance per valid block and no
request, observer, timer, storage, conversion table or catalogue payload. Row
iteration is capped at twenty per presentation.

## Consequences

- Web modality and Shopify authoring no longer block D7's human-review-ready
  implementation candidate.
- Merchant content can represent units other than centimetres/inches because
  labels and values are authored, while the adapter remains predictably
  bounded.
- The Shopify schema is intentionally unsuitable for arbitrary matrices; that
  prevents Theme Editor and runtime complexity from leaking into neutral D7.
- Live-store definition provisioning, translation workflow, Theme Editor use
  and final visual values still require target integration evidence.
- Final trigger, modal chrome/width, table density, notes hierarchy and narrow
  treatment remain human visual review work.
