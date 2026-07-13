# 0030. Shopify Adapter Maturity Model

Status: Accepted

Date: 2026-05-25

Superseded in implementation by `shopify-maturity-v1` for schema, data, template-composition, and editor-preview layers. See `docs/decisions/0032-shopify-maturity-v1-schema-data-editor.md`.

## Context

The first Shopify adapter manifest treated every `implemented` component as if it needed an exact Liquid root selector. That created noisy warnings for primitives and form/layout helpers that are intentionally implemented as reusable CSS/anatomy class contracts.

Shopify needs a more precise model because not every component is delivered the same way:

- A primitive such as `Button`, `Input`, or `Badge` can be implemented as a class contract and used inside many Liquid contexts.
- A commerce or page component such as `Header`, `Product Card`, or `Cart Summary` needs dedicated Liquid markup that maps Shopify data into the component contract.
- Behavior can be target-owned even when the shared CSS and JS assets already exist.

## Decision

Shopify maturity was initially computed in the generated adapter manifest with `shopify-maturity-v0`.

Every component gets a `maturity` object with:

- `strategy`: `embedded-class-contract` or `dedicated-liquid-template`.
- `layers.css`: required for every component.
- `layers.liquid`: required only for dedicated Liquid template components.
- `layers.behavior`: required when the component contract has behavior entries.
- `level`: `css-ready`, `template-detected`, `implemented`, or `planned`.
- `ready`: whether the Shopify target is ready for copy-and-own consumption.

The current embedded class strategy covers reusable class/anatomy contracts in `primitives`, `layout`, and `forms`, plus contracts whose Shopify adapter kind is `liquid-css-class`.

Dedicated Liquid template components must expose an exact root selector in Shopify Liquid before they can be considered template-ready.

## Validation

`npm run validate:adapter:shopify` now validates maturity metadata in addition to the existing asset, load-order, and manifest checks.

Warnings are focused on target maturity signals:

- A dedicated Liquid template exists, but the contract still marks Shopify as `planned`.
- A contract marks Shopify as `implemented`, but a required dedicated Liquid template is missing.

Embedded class contracts without a dedicated Liquid root are expected and should not warn.

## Consequences

- Shopify warnings are smaller and more useful.
- Primitive/form/layout helpers can be target-ready without fake snippets.
- Components with real Shopify Liquid work are now visible as `template-detected` until their contract status is reconciled.
- Future stricter validation can fail only on genuinely missing required target layers.

## Follow-Up Work

- Reconcile the `template-detected` Shopify components that have Liquid but still say `planned`.
- Refine any component that needs a different Shopify strategy than the current category/default rule.
- Add target-aware CLI install behavior that reads `maturity.ready`.
- Add Shopify Theme Check as a separate validation gate.
