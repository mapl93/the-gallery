# ADR 0024: Product Contract Expansion

Date: 2026-05-24

## Status

Accepted

## Context

The primitives, layout, and forms categories now have validated component contracts. Product components are the next layer because Shopify and other commerce targets will depend on them directly.

The product set includes:

- Product Card
- Product Gallery
- Product Info
- Variant Selector
- Product Form
- Product Slider
- Size Chart
- Back in Stock Alert
- Store Pickup Availability
- Subscription / Recurring Option

These components introduce commerce-specific contract needs: product media selection, variant mapping, add-to-cart submission, price formatting, product recommendations, size measurement tables, back-in-stock signup, pickup availability, and selling-plan selection.

## Decision

Add target-agnostic contracts for every product component and align registry dependencies with current implementation facts.

The new contracts are:

```text
components/contracts/product-card.contract.json
components/contracts/product-gallery.contract.json
components/contracts/product-info.contract.json
components/contracts/variant-selector.contract.json
components/contracts/product-form.contract.json
components/contracts/product-slider.contract.json
components/contracts/size-chart.contract.json
components/contracts/back-in-stock.contract.json
components/contracts/store-pickup.contract.json
components/contracts/subscription-option.contract.json
```

Registry dependency corrections:

- Product Card now depends on Price because the docs and intended anatomy include pricing.
- Product Form now depends on Variant Selector because the purchase form composes variant selection.
- Product Slider now depends on Icon Button because its navigation controls use icon-only buttons.

This brings the validated contract source to 70 components and completes the product category.

## Consequences

- Shopify product-page work can consume product contracts instead of inferring behavior from CSS and MDX examples alone.
- Collection, cart, quick-view, sticky add-to-cart, and checkout-adjacent components can now depend on product-level contracts.
- Product contracts document ecommerce behavior separately from target-specific implementation details such as Shopify variant ids, selling plans, pickup APIs, and notification providers.
- The docs site can render contract metadata for all product components.

## Follow-up

- Continue contract expansion into collection and cart components.
- Add Shopify adapter validation once Liquid snippets and sections start consuming these contracts directly.
- Decide which product contract behaviors should later generate target code and which should remain validation/documentation metadata.
