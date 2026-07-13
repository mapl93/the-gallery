# ADR 0025: Collection Contract Expansion

Date: 2026-05-24

## Status

Accepted

## Context

After product components, collection components are the next commerce layer. They organize product cards into browsable collection pages and introduce collection-specific behavior: hero content, responsive grids, filter query state, pagination, view-mode selection, inline promos, and empty results.

The collection set includes:

- Collection Hero
- Collection Grid
- Collection Filters
- Pagination
- Grid / List View Toggle
- Collection Promo Tile
- Empty Collection State

## Decision

Add target-agnostic contracts for every collection component and align registry metadata with current implementation facts.

The new contracts are:

```text
components/contracts/collection-hero.contract.json
components/contracts/collection-grid.contract.json
components/contracts/filters.contract.json
components/contracts/pagination.contract.json
components/contracts/view-toggle.contract.json
components/contracts/collection-promo.contract.json
components/contracts/empty-collection.contract.json
```

Registry correction:

- Collection Hero now declares the `with-image` variant because `.collection-hero--with-image` exists in CSS and is used by the docs page.

This brings the validated contract source to 77 components and completes the collection category.

## Consequences

- Cart and quick-view contracts can depend on product and collection behavior without redefining grid, filter, or pagination semantics.
- Shopify collection templates can be mapped against contracts for hero, product grid, filters, promo blocks, pagination, and empty states.
- The docs site can render contract metadata for all collection components.

## Follow-up

- Continue contract expansion into cart and commerce-flow components.
- Add Shopify adapter validation for collection templates once Liquid implementation consumes these contracts.
- Decide which collection behaviors should generate adapter code and which should remain validation/documentation metadata.
