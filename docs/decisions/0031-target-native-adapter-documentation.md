# 0031. Target-Native Adapter Documentation

Status: Accepted

Date: 2026-05-25

## Context

The Gallery adapters must become fully usable in their target platforms. A target adapter cannot stop at exporting style assets or class names when the target offers native authoring, editing, composition, data, and runtime capabilities.

Shopify exposed the first concrete gap: the Theme Editor panel for sections is driven by section/block/global schema, while CSS only controls the rendered result. A Shopify section can be visually available but still not target-ready if merchants cannot configure it through Shopify's native editor model.

## Decision

Create adapter documentation that defines target-ready as target-native.

General adapter guidance lives in:

```text
docs/adapters/README.md
```

Shopify-specific adapter guidance lives in:

```text
docs/adapters/shopify.md
```

The Shopify adapter guide defines:

- Shopify file roles.
- Embedded class, snippet, section, theme block, template, and global settings strategies.
- Contract-to-Shopify mapping.
- Theme Editor/schema expectations.
- A `Featured Collection` example.
- The next maturity-model direction: explicit CSS, Liquid, schema, data, behavior, template-composition, and editor-preview layers.

## Consequences

- Future target work must document target-native capabilities before implementation.
- Shopify target-ready now means Liquid plus schema/settings/data/behavior where required, not just CSS availability.
- `shopify-maturity-v0` was the initial computed layer; `shopify-maturity-v1` now adds schema, data, template-composition, and editor-preview validation.
- Adapter docs become required context for agents before creating or changing target adapters.

## Follow-Up Work

- Continue expanding Shopify validation from detected schema/data evidence into contract-specific target requirements.
- Create or restore missing Shopify section adapters such as `Featured Collection`.
- Add docs pages for future targets as they become active: React, Angular, Webflow, Framer, Figma, SwiftUI, and Compose.
