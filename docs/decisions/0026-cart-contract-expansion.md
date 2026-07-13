# ADR 0026: Cart Contract Expansion

Date: 2026-05-24

## Status

Accepted

## Context

Product and collection components already had target-agnostic contracts. The next missing commerce layer was cart, where components depend on live cart state, monetary formatting, item quantities, discounts, shipping thresholds, checkout handoff, modal composition, and add-to-cart behavior.

The cart set includes:

- Cart Page
- Cart Line Item
- Cart Summary
- Discount Field
- Free Shipping Bar
- Cart Upsell
- Cart Empty
- Quick View
- Sticky ATC
- Cart Note
- Gift Wrap

## Decision

Add target-agnostic contracts for every cart component and align MDX documentation with contract anatomy, behavior, accessibility, and dependency metadata.

The new contract files are:

```text
components/contracts/cart-page.contract.json
components/contracts/cart-line-item.contract.json
components/contracts/cart-summary.contract.json
components/contracts/discount-field.contract.json
components/contracts/free-shipping-bar.contract.json
components/contracts/cart-upsell.contract.json
components/contracts/cart-empty.contract.json
components/contracts/quick-view.contract.json
components/contracts/sticky-atc.contract.json
components/contracts/cart-note.contract.json
components/contracts/gift-wrap.contract.json
```

Cart behavior is described in target-agnostic terms: cart composition, line quantity updates, line removal, totals recalculation, discount application/removal, threshold progress, recommendation actions, empty-state recovery, quick-view modal composition, sticky add-to-cart visibility, note persistence, and gift-wrap selection.

This brings the validated contract source to 88 components and completes the cart category.

## Consequences

- Shopify, React, and other commerce adapters can map cart behavior to their own APIs without redefining component anatomy.
- Quick View explicitly composes Modal, Product Gallery, and Product Form behavior rather than becoming a separate target-specific pattern.
- Discount, shipping, checkout, and price formatting remain adapter responsibilities, but the required behavior is now visible in source contracts.
- The docs site can render contract metadata for all cart components.

## Follow-Up

- Continue contract expansion into global, marketing, section, account, blog, review, page, storytelling, and ceramics components.
- Add Shopify adapter validation that checks cart snippets/sections against cart contracts once Liquid implementation consumes these contracts.
- Decide which cart behaviors should generate adapter code and which should remain validation/documentation metadata.
