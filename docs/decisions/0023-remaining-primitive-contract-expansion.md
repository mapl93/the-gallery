# ADR 0023: Remaining Primitive Contract Expansion

Date: 2026-05-24

## Status

Accepted

## Context

The component contract source layer already covered the first core controls, overlays, layout interactions, form controls, form infrastructure, and commerce-oriented primitives. The remaining primitive components in `registry.json` still needed target-agnostic contracts before The Gallery could move confidently into product and commerce-flow components.

The remaining primitive set was:

- Button Group
- Icon Button
- Close Button
- Toggle
- FAB
- Alert
- Progress
- Spinner
- Stat
- Data Table
- Data List
- Timeline Primitive
- Link

These primitives are small, but they are heavily reused by higher-level targets. They also expose useful contract patterns: composed dependencies, icon-only accessible names, pressed state, visibility state, live-region feedback, determinate and indeterminate progress, loading semantics, tabular data, description-list semantics, ordered timeline semantics, and navigation state.

## Decision

Add contracts for all remaining primitive components and align their registry metadata, MDX documentation, CSS selectors, and public token references with the existing web implementation.

The new contracts are:

```text
components/contracts/button-group.contract.json
components/contracts/icon-button.contract.json
components/contracts/close-button.contract.json
components/contracts/toggle.contract.json
components/contracts/fab.contract.json
components/contracts/alert.contract.json
components/contracts/progress.contract.json
components/contracts/spinner.contract.json
components/contracts/stat.contract.json
components/contracts/data-table.contract.json
components/contracts/data-list.contract.json
components/contracts/timeline-primitive.contract.json
components/contracts/link.contract.json
```

This brings the validated contract source to 60 components and completes the primitives, layout, and forms categories.

## Consequences

- Higher-level product, commerce, account, review, section, and Shopify-facing contracts can now depend on primitive contracts instead of redefining low-level behavior.
- The docs site can surface contract metadata for every primitive, layout, and form component.
- The contract validator now protects more CSS/MDX/registry relationships before adapter work begins.
- Some MDX pages were corrected to avoid documenting nonexistent classes. For example, Progress uses `.progress` for the default bar and `.progress-circle` for the circular presentation; Data List uses vertical layout as the default; Data Table sortable behavior uses `.table__sort-btn` rather than a table-level sortable class.

## Follow-up

- Continue contract expansion into product and commerce components.
- Decide where contracts should remain descriptive metadata and where they should start generating adapter code.
- Add adapter validation once target-specific component outputs consume contracts directly.
