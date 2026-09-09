# 0324. Table And Data List Visual Tokens

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with eighteen source roles and existing shared typography.
Table exposes 24 public roles; Data List exposes twelve. Preserve current defaults,
native semantics, independent capabilities and copy-and-own adoption boundaries.
This expands ADR 0065's original semantic-only token inventory using the existing
component layer; it does not create another layer or target.

Table owns cell padding, separate wrapper/row borders, shared focus dimensions,
sort-trigger minimum height/padding/gap, icon size and unsorted icon opacity.
Negative trigger margins derive from its padding to keep the text aligned with
ordinary cells. Header and trigger share the existing semibold role. Fully opaque
sorted/forced-color icons are state mechanics, not additional opacity decisions.
The borderless trigger, intrinsic table width, scroll ownership, dataset and
comparison policy keep their existing responsibilities.

Data List owns row padding/separator, inline pair gap, horizontal group row/column
gaps and the stacked pair gap. Both horizontal metadata pairs and narrow vertical
rows reuse the same stacked gap because they share the same term/value anatomy.
The existing 20rem container query chooses the responsive layout without repeating
token catalogues. Horizontal removes row separators/padding; the last vertical
row remains unruled. These structural zeroes are not new customization tokens.
The shared medium role controls value weight; text wrapping and source order persist.

Studio exposes meaningful token controls and hides those inapplicable to a chosen
capability/layout. Inline versus stacked gaps describe their actual CSS context;
a token is not claimed to affect both arrangements. The unsorted icon control is
explicitly named for that condition, even while the preview can be sorted.

ADR 0274 also removes striped/horizontal from the Table/Data List state lists;
they remain available as independent capability/layout configuration. Row hover,
sort order and keyboard focus remain Table states. No CSS hook is removed.

## Acceptance

Verify default geometry and presentation across eight width/theme matrices;
independent custom dimensions, native sorting/focus/scrolling, contextual Table
composition, responsive Data List gaps, narrow/RTL text, Studio controls/reset and
Exhibit references. Validate source, adapters, contracts, Studio and catalogue.

Consumers must choose coherent cell and trigger padding so focus fits inside the
scroll viewport. Numeric editors add no arbitrary global cap. Browser evidence
is local and does not certify every target dataset, color or human maturity gate.
