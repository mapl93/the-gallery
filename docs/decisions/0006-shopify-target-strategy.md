# 0006. Shopify Target Strategy

Status: Accepted

Date: 2026-05-23

## Context

Shopify is an important commercial target for The Gallery. The owner wants to build a Shopify site with The Gallery components and eventually launch templates for sale.

Shopify's current latest theme architecture includes theme blocks. The Horizon family is part of this latest architecture, and Horizon is Shopify's flagship first-party theme. Shopify's Horizon repository says themes based on, derived from, or incorporating Horizon are not eligible for Shopify Theme Store submission and recommends Skeleton Theme for Theme Store development.

## Decision

The Gallery's Shopify target should use Shopify's latest theme-block architecture and remain compatible with modern Shopify storefront expectations.

The Gallery should not derive its sellable Shopify theme/template code from Horizon if Theme Store eligibility or independent commercial distribution matters.

Use Horizon as a reference and compatibility benchmark. Use Shopify's Skeleton Theme and official theme-block architecture as the safer foundation for sellable Theme Store-oriented work.

## Consequences

- Shopify is a target adapter, not the system source.
- The Shopify adapter should be independent and generated/adapted from The Gallery contracts and tokens.
- Horizon can inform patterns, but code should not be copied or forked into The Gallery's sellable theme foundation.
- The Shopify adapter should support theme blocks, app blocks where relevant, dynamic sources, and merchant customization.

## Follow-Up Work

- Audit current `platforms/shopify/` files against latest theme-block architecture.
- Separate Horizon-inspired assumptions from Shopify platform requirements.
- Define Shopify adapter conventions for snippets, sections, blocks, settings, assets, locales, and templates.
- Decide which current Shopify files are canonical source, adapter source, copied output, or legacy.

## References

- Shopify Horizon source README: https://github.com/Shopify/horizon
- Shopify theme architecture versions: https://help.shopify.com/en/manual/online-store/themes/managing-themes/versions
- Shopify theme blocks docs: https://shopify.dev/docs/storefronts/themes/architecture/blocks
- Shopify AI-generated theme blocks docs: https://shopify.dev/docs/storefronts/themes/architecture/blocks/ai-generated-theme-blocks
