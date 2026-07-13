# Target Adapter Documentation

Adapters translate The Gallery source into files that are fully usable in a target platform.

An adapter is not just a bundle format. It must preserve the component contract while using the target's native authoring, editing, runtime, packaging, and distribution capabilities.

## Adapter Principle

Target-ready means target-native.

For every target, an adapter must answer:

- Which files are generated, copied, or hand-authored for the target?
- Which target-native capabilities must the component support?
- How do design tokens map into the target?
- How do component contracts map into target primitives?
- How does a consumer customize the component locally after copying it?
- How does the adapter expose target-specific editing and configuration?
- Which validation gates prove the output is usable?

## Adapter Layers

Every target adapter should document these layers.

| Layer | Purpose | Examples |
| --- | --- | --- |
| Token output | Target-readable values and aliases | CSS variables, JS tokens, Figma variables, Swift/Kotlin values |
| Component markup/rendering | Target-native component structure | HTML, Liquid, JSX, Angular templates, SwiftUI views |
| Styling | Target styling implementation | CSS, CSS modules, theme files, native style objects |
| Configuration/editor integration | Target-native customization UI | Shopify section schema, Figma properties, Webflow controls |
| Data mapping | Target data objects mapped into contracts | Shopify `product`, React props, CMS collections |
| Behavior | Target runtime interaction model | JS custom elements, hooks, native gestures |
| Composition | How components are placed together | Shopify JSON templates, routes, app pages |
| Distribution | How consumers receive and own files | CLI copy, package artifact, theme zip, generated file export |
| Validation | How correctness is checked | Schema validation, target CLI, visual tests, manifest checks |

## Component Strategy Types

Not every component has the same adapter shape.

| Strategy | Meaning | Example |
| --- | --- | --- |
| Embedded class contract | Reusable styling/anatomy applied inside another target file. It has no standalone editor surface. | Shopify `.btn` used inside a section |
| Snippet/partial adapter | Reusable target template that receives data from a parent. It has target rendering but no direct editor panel. | Shopify `snippets/product-card.liquid` |
| Section/view adapter | Standalone target component that appears in the target editor or composition system. | Shopify `sections/featured-collection.liquid` |
| Block/subcomponent adapter | Reusable child component with target-native controls. | Shopify theme block or section block |
| Page/template adapter | Target page composition that wires sections/views into a route or template. | Shopify `templates/product.json` |
| Global settings adapter | Target-wide settings and theme-level choices. | Shopify `config/settings_schema.json` |

## Target-Ready Checklist

A component is target-ready only when the required target layers are present.

- The component contract is mapped to target-native files.
- The target implementation uses the correct target primitive instead of only exposing CSS.
- Required target editor controls exist.
- Required data objects are mapped into contract anatomy and states.
- Required behavior is implemented in the target runtime.
- Public tokens/customization hooks are preserved.
- Accessibility requirements from the contract are represented in the target.
- The component is included in a target manifest or registry output.
- The adapter validator can prove that required files and relationships exist.

## Current Adapter Docs

- `docs/adapters/shopify.md`

## References

- Shopify section schema: https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema
- Shopify settings schema: https://shopify.dev/docs/storefronts/themes/architecture/config/settings-schema-json
- Shopify theme editor: https://shopify.dev/docs/storefronts/themes/tools/online-editor
- Shopify blocks: https://shopify.dev/docs/storefronts/themes/architecture/blocks
