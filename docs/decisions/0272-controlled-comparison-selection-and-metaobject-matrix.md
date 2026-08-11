# 0272. Controlled Comparison Selection And Metaobject Matrix

Status: Accepted

Date: 2026-08-11

Owner confirmation: refinement decision 66

Supersedes ADR 0155 only where that decision made Comparison Table passive-only
and recommended a bounded two-alternative Shopify section. ADR 0155 remains in
force for conditional root semantics, canonical Data Table ownership, native
table structure, table-only overflow, text-complete status meaning, finite
target data, zero neutral runtime, and the human-review boundary.

## Context

ADR 0155 reconciled S13 as a native contextual composition of canonical Data
Table. It intentionally left Shopify data architecture and any alternative
selection behavior open. The owner subsequently selected a variable but finite
metaobject-backed Shopify matrix and clarified that comparison may be either
passive or explicitly selectable.

The accepted capability does not turn the table into an ARIA grid. Alternatives
are whole columns with stable target-owned ids. When selection is useful, the
column header contains a canonical native choice control; ordinary header and
data cells remain passive. Actions and commercial claims remain explicit child
content with lifecycles independent from checked state.

WAI native Radio and Checkbox guidance supports the two selection
cardinalities. Open UI's Table research continues to distinguish static table
cells from grid widgets. Shopify supports `metaobject` and `metaobject_list`
settings, but custom and app-owned metaobject definitions are not allowed in
Theme Store-listed themes, and the platform maximum is not an appropriate
editorial or performance budget by itself.

## Decision

- Comparison Table exposes `interaction: passive | selectable`, defaulting to
  `passive`. Both modes render the same finite target-owned native matrix.
- Selectable mode exposes `selectionMode: single | multiple`, defaulting to
  `single`.
- Single selection composes one canonical native Radio per alternative, all
  sharing one non-empty group name. The controlled public state is
  `selectedId`; an empty id is a valid no-selection state.
- Multiple selection composes one canonical native Checkbox per alternative.
  The controlled public state is the ordered `selectedIds` list; an empty list
  is valid.
- Selection updates emit the complete next id or ordered id list. Neutral source
  does not persist, submit, synchronize, announce, or act on the choice; the
  consuming target owns those lifecycles.
- Ordinary `th` and `td` cells remain passive and unfocusable. S13 adds no
  `role="grid"`, cell selection, roving tabindex, or directional cell
  navigation.
- Each alternative may compose one complete canonical Link or Button CTA.
  Activating it performs only the explicit target-owned action; it does not
  silently select or submit the alternative.
- Highlight is visual emphasis only. “Recommended”, “best value”, savings,
  availability, or any other commercial meaning requires explicit visible
  target-authored text and its own qualification policy.
- Canonical Data Table remains the sole table surface, caption/header
  association, cell density, separator, overflow, focus, and responsive-scroll
  owner. S13 continues to own only contextual root/title, measure, comparison
  emphasis, and choice/action placement.
- Neutral Web hardcodes no two-alternative limit. Every target adapter must
  declare and enforce a finite editorial and performance profile and preserve
  complete horizontal scrolling rather than hiding essential columns.
- Shopify's selected direction is a metaobject-backed finite matrix with stable
  alternative, criterion, and cell identities. A target adapter must validate a
  complete rectangular relationship, ordering, localization, action data,
  selection state ownership, and missing/stale references before claiming
  target readiness.
- Shopify exact `maxAlternatives`, `maxCriteria`, and derived `maxCells` remain
  explicit adapter-profile decisions. Platform ceilings are upper technical
  constraints, not The Gallery's product limits. No numeric values are invented
  in the neutral contract.
- A custom-storefront/app profile may use custom or app-owned metaobject
  definitions. A Theme Store-safe profile may reference only Shopify standard
  definitions; until a compatible standard definition or a different bounded
  editor model is accepted, it must not claim the custom comparison matrix is
  Theme Store-ready.
- Exhibit and Studio must use the same Comparison Table renderer, fixture,
  canonical controls, controlled-state projection, and CSS.
- Contract version advances to `0.4.0` and remains `pilot`. This decision does
  not approve final aesthetics or promote S13 to `stable`.

## Public API

- `title?: string` — optional visible contextual heading and section name.
- `table` — required finite target-owned canonical Data Table composition.
- `interaction?: "passive" | "selectable"` — defaults to `passive`.
- `selectionMode?: "single" | "multiple"` — defaults to `single` and is read
  only while selectable.
- `selectedId?: string` — controlled single-selection id.
- `selectedIds?: string[]` — controlled ordered multiple-selection ids.
- Selection-change event — returns the complete next id or ordered id list.

The public API does not expose column widths, cell padding, minimum table width,
highlight mix, control gap, status-shape size, breakpoints, metaobject handles,
Shopify limits, persistence, analytics, pending/error state, or action routing.

## Shopify Profile Gate

The selected adapter shape is documented in
`docs/adapters/shopify-comparison-table-metaobjects.md`. It cannot be marked
target-ready until one delivery profile supplies:

1. exact alternative, criterion, and cell bounds;
2. concrete definitions and reference fields;
3. stable-id, ordering, rectangularity, localization, and stale-reference
   validation;
4. editor preview and omission/error behavior;
5. controlled selection persistence and CTA lifecycle;
6. Liquid, schema/data, accessibility, responsive, and performance evidence;
7. an honest custom/app versus Theme Store compatibility declaration.

## Consequences

- Consumers can use S13 as information-only comparison or as a controlled
  alternative selector without creating a second component identity.
- Native controls preserve familiar keyboard behavior while the table remains a
  table, not a composite grid widget.
- Selection, visual emphasis, explicit claims, and CTA activation remain four
  independent meanings.
- Three or more alternatives are valid on Neutral Web; a target-specific finite
  budget is still mandatory.
- Shopify architecture is selected without pretending that an unresolved
  numeric/editor profile is implemented.
- Final visual approval and stability remain human decisions.
