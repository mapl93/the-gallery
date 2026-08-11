# 0091. Tabular, Metadata, and Timeline Resilience

Status: Accepted

Date: 2026-07-13

## Context

ADRs 0065 and 0066 established native Table, description-list, ordered Timeline,
sorting, and per-entry status ownership. Refinement evidence found four remaining
cross-target gaps: Table had no dataset-name property or visible focus for its
overflow and sort owners; Data List expanded the page under long unbroken copy;
Timeline used physical left-side geometry; and readable Timeline metadata used a
disabled-control color while semantic status text could miss text contrast.

## Decision

- Table gains an optional native `caption` string. Targets may visually hide the
  caption only when equivalent visible context already identifies the dataset.
- The optional Table overflow wrapper is a named keyboard focus owner with a
  visible focus indicator. It preserves a readable intrinsic table width and
  horizontal scrolling; it does not convert the dataset into cards or an ARIA
  grid.
- Sort controls remain native buttons. `aria-sort` remains on one owning `th` and
  represents `none`, `ascending`, or `descending`; targets still own comparison,
  locale rules, ordering, pagination, and requests.
- Data List retains `dl`/`dt`/`dd` in every layout. Its vertical variant stacks a
  pair below a `20rem` component container, while the explicit horizontal variant
  remains a wrapping set of metadata groups.
- Data List terms and values wrap extreme localized content and use logical
  alignment without adding content properties for target-owned pairs.
- Timeline uses logical inline geometry so its rail mirrors in RTL. Entry text
  wraps within the component container.
- Timeline dates use readable secondary text. Semantic status text strengthens
  existing global feedback colors by mixing them with primary text; markers keep
  the feedback colors and visible localized words remain the authoritative cue.
- No new component token layer, runtime observer, formatter, table data model, or
  target-specific responsive representation is introduced.

## Consequences

- Table's public contract adds one stable semantic content property and explicit
  wrapper focus behavior.
- Data List and Timeline gain container/content resilience without new public
  presentation properties.
- Neutral Web remains CSS/HTML-only for all three components; Shopify and future
  adapters translate semantics rather than copy web DOM.
- The `20rem` Data List threshold, Table density, and Timeline visual hierarchy
  remain subject to human visual review. None of the components is promoted to
  `stable` by this decision.
