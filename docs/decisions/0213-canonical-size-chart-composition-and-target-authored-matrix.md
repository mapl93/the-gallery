# 0213. Canonical Size Chart Composition And Target-Authored Matrix

Status: Accepted

Date: 2026-07-18

Decision update: ADR 0242 accepts the centered Web modality, large-matrix
boundary and bounded Shopify custom-data mapping that were intentionally left
open here. ADR 0213 remains authoritative for canonical composition and the
neutral target-authored-table boundary.

## Context

D7 Size Chart duplicated overlay, panel, title, close action, exclusive unit
buttons and table markup even though the repository already has refined
canonical Modal, Segmented Control and Data Table components. The local unit
selection used independent `aria-pressed` buttons and a React state that did
not correspond to its public `activeUnit` boolean. The table had no caption,
row-header semantics or target-authored data boundary.

Canonical CSS repeated fixed viewport geometry, raw stacking, focus, motion,
button and table presentation. Studio then overrode D7 overlay geometry and
title typography. The resulting Product family had only eight gzip bytes of
headroom under its accepted ceiling.

ADR 0205 already established that Dimensions receives complete target-formatted
measurement sets and optionally composes canonical Segmented Control. There is
still no approved universal Size Chart schema, raw quantity source, unit-system
inventory, conversion, precision, rounding, locale, fit/tolerance model,
preference service, Shopify metaobject definition, mobile sheet policy or
D7-specific visual reference.

## Decision

- D7 is a thin product-domain profile that composes canonical Modal, required
  Data Table and optional Segmented Control.
- D7 owns one generic root, localized trigger/title/dismiss copy, a required
  chart slot, optional unit-control slot, optional notes slot and semantic open
  projection. It owns no parallel overlay, close action, table or choice model.
- The trigger uses canonical link-style Button presentation. Modal and its
  Close Button own dialog anatomy and visual behavior.
- The target supplies one complete canonical static Data Table, including
  caption, column and row headers, values, units and qualifiers. D7 defines no
  universal row/column or raw-number schema and adds no grid semantics.
- Optional unit choice composes canonical Segmented Control with visible legend,
  same-name native radios and exactly one checked value. The target replaces
  the complete authored table for the selected value.
- D7 does not parse, calculate, convert, round, localize, persist, synchronize
  or announce measurements. The docs fixture uses two independently authored
  tables solely to demonstrate target coordination.
- The target owns controlled/uncontrolled open lifecycle, outside inertness,
  scroll locking, mutual exclusion, dismissal and focus restoration. The docs
  target uses canonical Modal behavior.
- Because the dialog contains a table and may contain multiple paragraphs,
  initial focus goes to the static visible title and `aria-describedby` is
  omitted by default.
- Canonical D7 CSS retains only intrinsic composition and supporting-note
  presentation. Modal, Button, Close Button, Segmented Control and Data Table
  own their tokens, responsive behavior, focus, forced colors and reduced
  motion.
- Neutral D7 adds zero runtime. React and authored fixture state remain docs
  target concerns.
- The centered Modal is the Neutral Web presentation at every viewport. Sheet,
  full-screen or inline alternatives are different target compositions and do
  not become D7 public variants.
- Shopify uses the bounded merchant-owned record and native-dialog lifecycle
  accepted in ADR 0242.
- D7 remains `pilot`; automated evidence cannot promote it to `stable`.

## Consequences

- Size Chart reuses already reviewed dialog, choice and table semantics instead
  of forking accessibility behavior.
- The API becomes cross-target and product-schema neutral: target content can
  represent apparel, footwear, framed work, ceramics or another valid matrix
  without unstable D7 column properties.
- Unit selection has one native semantic value and keyboard model rather than
  independent pressed booleans.
- Product CSS recovers substantial budget by deleting duplicate overlay,
  control and table presentation.
- Exhibit and Studio can share `SizeChartArtwork`, one target fixture and the
  extracted `DataTableArtwork` path.
- Final visual values, live Shopify integration, D7-specific Figma evidence and
  explicit human approval remain open; the accepted source, modality and target
  mapping no longer do.
