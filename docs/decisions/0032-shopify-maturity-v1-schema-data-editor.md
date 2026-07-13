# 0032. Shopify Maturity V1 Schema Data Editor

Status: Accepted

Date: 2026-05-25

## Context

The Shopify adapter maturity model started by distinguishing embedded class contracts from dedicated Liquid templates. That made the warnings useful, but it still did not answer whether a Shopify implementation was target-native.

For Shopify, target-native means the adapter understands the Theme Editor, section/block schema, Shopify data objects, snippet render APIs, and template composition. A component can have CSS and Liquid and still be incomplete if merchants cannot configure it through Shopify's own editor model.

## Decision

Promote the generated Shopify maturity model to `shopify-maturity-v1`.

Every component now receives these layers:

- `css`: generated or copied Shopify CSS output.
- `liquid`: detected Liquid usage for dedicated adapters.
- `schema`: section/block `{% schema %}` status and settings inventory.
- `data`: Shopify objects, settings references, render calls, section calls, and snippet render parameters.
- `behavior`: contract behavior accepted by the Shopify adapter.
- `templateComposition`: JSON template, layout section call, or preset reachability for section adapters.
- `editorPreview`: schema controls wired into rendered Liquid with no dead settings.

The strategy set is also expanded:

- `embedded-class-contract`
- `dedicated-liquid-template`
- `section-adapter`
- `theme-block-adapter`
- `snippet-adapter`
- `template-adapter`
- `layout-adapter`

## Validation

`npm run validate:adapter:shopify` now validates the v1 maturity model, the new layers, strategy-specific requirements, schema file references, Liquid entries, and summary parity.

Warnings remain non-blocking maturity signals. The main current warning is still contract reconciliation: Liquid exists, but the component contract marks Shopify as `planned`.

## Consequences

- Shopify sections can be measured against the same target surfaces that merchants use in the Theme Editor.
- Snippets and sections are no longer collapsed into one generic "dedicated Liquid" bucket.
- Missing dedicated components still show as incomplete, but they do not create noisy data warnings before Liquid exists.
- The docs site can display schema/data/editor readiness directly from `adapter.summary.json`.

## Follow-Up Work

- Reconcile planned contracts for Shopify components that already have Liquid.
- Add contract-specific setting/data expectations instead of only detecting evidence.
- Add `blocks/*.liquid` validation once theme blocks are introduced.
- Add Shopify Theme Check or Shopify CLI validation as a separate target gate.
