# 0155. Passive Comparison Table And Canonical Data Table Composition

Status: Accepted

Date: 2026-07-15

Superseded in part by ADR 0272: the passive-only interaction boundary and the
bounded two-alternative Shopify recommendation no longer apply. Canonical Data
Table composition, root/overflow semantics, finite target ownership, and zero
neutral runtime remain accepted.

## Context

S13 Comparison Table is intended to frame a finite target-owned matrix beneath
an optional contextual title. Its initial contract correctly preserved a native
table slot, but registry and source CSS declared no canonical dependency. S13
duplicated Data Table width, collapse, padding, header/body typography,
separators, colors, and responsive overflow.

The complete Comparison Table section was itself the horizontal scroll owner.
That placed its ordinary visible heading inside the two-dimensional scroll area,
contrary to the desired reflow boundary. Studio always emitted a focusable
unnamed `section`, had no table caption, and placed labelled site-only icons in
otherwise empty data cells. The MDX sample documented a caption and labelled
region, but the shared live renderer did not emit them.

ADR 0082 already establishes that Comparison Table exposes a target-owned native
table composition rather than flattened row and column properties. ADR 0027 and
the refined Data Table contract establish canonical table and overflow
ownership. HTML table semantics, WAI table guidance, WCAG reflow, Open UI's
static-table versus grid distinction, Polaris table guidance, and the layered
source/contract/adapter architecture establish the neutral boundary without a
new widget state model.

Shopify does not supply an implicit arbitrary matrix editor. Section settings
and repeated blocks are one-dimensional; a merchant-editable two-dimensional
model requires an explicit bounded schema, custom-data architecture, or
developer-composed table. The repo contains no accepted decision selecting one.

The registered Figma nodes render the Button pilot and cannot approve S13
aesthetics.

## Decision

- Comparison Table is a passive contextual comparison composition. It is not a
  data grid, spreadsheet, product selector, pricing calculator, recommendation
  engine, sortable result set, chart, or card transformer.
- A non-empty title creates a native `section` named through
  `aria-labelledby`; an untitled composition uses a generic `div` rather than
  an unnamed section landmark.
- One complete target-owned table composition is required. Missing table
  content omits the entire S13 root rather than rendering an empty section,
  heading, or scroll shell.
- S13 formally depends on canonical Data Table. It composes
  `.table-wrapper` and `.table`; Data Table owns native table presentation,
  cell type, separators, overflow, focus, and responsive scrolling.
- S13 owns only its conditional root, bounded inner measure, title rhythm,
  optional comparison-cell highlight, and optional status-shape placement.
- The title remains outside the horizontal scroll owner. Only the canonical
  table wrapper may receive `tabindex="0"`, a contextual accessible name, and
  focus treatment.
- The target-owned slot supplies a native caption, headers, body, rows, values,
  and relationships. Simple matrices use `scope`; complex matrices must supply
  explicit `id`/`headers` associations.
- Static cells remain passive. S13 adds no `grid` role, cell focus, selection,
  roving tabindex, sorting, disclosure, sticky behavior, live region, or
  controlled/uncontrolled store.
- Inclusion and exclusion shapes are decorative. Every cell keeps meaningful
  visible or visually hidden text, and optional highlighting never constitutes
  an implicit “recommended” commercial claim.
- The two-property parent API remains optional `title` plus required `table`
  slot. Caption, rows, columns, values, highlighted cells, status meaning,
  localization, commercial data, actions, updates, and complex header graphs
  remain target composition rather than flattened S13 properties.
- Responsive behavior is container-based. Ordinary section content remains
  within the component; only the matrix scrolls horizontally when its private
  readable minimum exceeds available space. Native source order does not change.
- S13 adds no listener, observer, request, timer, layout read, hydration,
  custom element, asset, authored motion, or neutral runtime.
- Exhibit and Studio use the same Sections renderer, fixture, canonical child
  composition, omission rule, ids after normalization, and source CSS.
- Webflow and Shopify receive regenerated canonical CSS projections. Shopify
  remains CSS-ready and `planned`: no Liquid, schema, locale, template, or
  maturity claim is created until the owner selects a matrix architecture.
- The recommended Shopify v1 architecture is a bounded two-offering Section
  Adapter with repeated row blocks. Alternatives are a metaobject-backed
  arbitrary matrix or a developer-composed Liquid table slot. The
  recommendation is documented but not implemented by assumption.
- Contract version advances to `0.3.0` and remains `pilot`. Automated evidence
  cannot resolve Shopify architecture, approve visual candidates, replace the
  invalid Figma trace, or promote the component to `stable`.

## External Evidence

- HTML defines the native table, caption, header, row, and data-cell model.
- WAI guidance uses `scope` for simple row/column relationships and explicit
  `id`/`headers` associations for complex tables.
- WCAG reflow permits two-dimensional data tables to scroll horizontally while
  requiring surrounding headings and content to reflow outside that scroll
  area.
- Open UI distinguishes passive tables from interactive grids; ordinary table
  cells do not become focusable or selectable by default.
- Polaris distinguishes structured data/comparison tables from interactive
  index-management patterns and recommends restrained scanning treatment.
- GOV.UK keeps table caption, head, rows, and first-cell header semantics in the
  component's data model rather than replacing native table structure.
- Shopify blocks expose repeated settings and editor attributes, but do not
  define an arbitrary two-dimensional matrix schema.

These sources support native semantics, canonical composition, isolated table
overflow, and target-owned data. They do not approve The Gallery's final
measure, cell density, highlight, iconography, commercial claims, Shopify data
model, or visual identity.

## Performance

Comparison Table has a `0 B` neutral runtime budget. Native table semantics,
keyboard scrolling, and focus require no S13 JavaScript. The docs renderer may
use React only to project Studio properties and fixture content; that code is
not neutral component runtime.

The permanent Sections ceiling remains `6,861 B` deterministic gzip. S13 must
recover or preserve headroom by deleting duplicated Data Table CSS rather than
raising the ceiling. The one adjacent canonical Data Table correction removes
the final separator from both `th` and `td` cells in the last body row; it does
not create S13-owned table styling.

## Target Translation

- Neutral Web uses a conditional section/div, bounded inner wrapper, title
  outside canonical Data Table overflow, native caption/header/cell structure,
  passive text-complete statuses, and zero runtime.
- Webflow consumes the same canonical Primitives and Sections CSS and supplies
  native table markup/data through its target authoring layer.
- Shopify remains CSS-ready until the owner chooses bounded two-offering blocks,
  metaobject-backed arbitrary records, or developer-composed Liquid.
- React and Angular use thin contextual wrappers around canonical Data Table;
  applications retain record, formatting, and any child-interaction ownership.
- Figma should present an optional title, target-owned comparison matrix,
  text-equivalent statuses, and narrow overflow annotation after a corrected S13
  owner frame exists.
- SwiftUI and Compose require target-native accessibility review and must
  preserve equivalent labels and relationships rather than imitating DOM.

## Open Human And Architecture Boundary

This decision intentionally does not approve:

- the final `72rem` maximum measure, private `36rem` table minimum, `12rem`
  first-column minimum, section inset/rhythm, inherited cell density, title
  hierarchy, 6% highlight mix, status shapes, or forced-color boundary;
- any “recommended”, “best value”, price, availability, product selection,
  action, sticky, sorting, disclosure, or live-update behavior;
- a neutral row/column/cell schema or duplicated Data Table presentation API;
- bounded two-offering, metaobject, or developer-composed Shopify architecture;
- component-specific Figma evidence, because the current nodes show Button;
- framework/native implementations; or
- promotion from `pilot` to `stable`.

## Consequences

- Consumers receive one canonical table owner instead of parallel S13 table CSS.
- Assistive technology receives a named matrix, correct header relationships,
  meaningful statuses, and one contextual keyboard scroll region.
- Section headings reflow normally and do not move inside the table's horizontal
  viewport.
- Exhibit and Studio can be evaluated as exact projections of one renderer and
  fixture.
- Target data models stay flexible without turning every row, column, and cell
  into unstable cross-target parent properties.
- Shopify maturity remains honest until a real merchant/editor architecture is
  approved and validated.
- Human review remains responsible for visual identity, architecture selection,
  corrected owner evidence, and stability.
