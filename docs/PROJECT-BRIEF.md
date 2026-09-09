# The Gallery Project Brief

This brief captures the owner-stated intent for The Gallery. It is context for agents, not a substitute for checking the source files.

## Vision

The Gallery is a design-system source of truth that should be maintained over time. It should define design tokens, target-agnostic components, target adapters, and a documentation/gallery site where components can be discovered, copied, customized, and eventually used to launch sellable templates.

The north star is:

```text
The Gallery = tokens + component contracts + adapters + registry + docs
```

Tokens define values. Component contracts define what components are independently of target. Adapters translate tokens and contracts into Shopify, Webflow, Framer, React, Angular, Figma, SwiftUI, Jetpack Compose, and future targets.

The desired distribution model is similar to shadcn/ui:

- Users copy the components they need.
- Components live locally in the user's project.
- Users can customize the copied code freely.
- The Gallery provides current versions, older versions, tokens, implementation guidance, and target-specific output.
- The system should not feel like a closed third-party dependency that consumers cannot own.

## Design Tokens

The system should define primitive and semantic variables used by all components. Tokens should support long-term evolution across targets such as Figma, Framer, Webflow, Shopify, React, Angular, and future platforms.

Accepted direction: the repo is the source of truth for design tokens. Figma is a target, not the source. Root-level `*.tokens.json` files are larger Figma-style exports that were used to bring earlier Figma work into the repo; they are reference/migration snapshots and are not canonical.

Known current implementation fact: the legacy Style Dictionary pipeline still reads `tokens/*_tokens.json` for targets that have not switched. The repo now also has a DTCG-style source structure in `tokens/source/`, a source-token compiler, migration parity checks, a first neutral web token target at `platforms/web/tokens.css`, a neutral web component adapter in `platforms/web/`, and a Shopify token/asset adapter generated from source facts.

## Components

Components should be target-agnostic at the source layer. A component's canonical structure should be independent from where it will be used, then compiled or adapted into target-specific output.

The target component source model is a component contract: anatomy, slots, variants, states, dependencies, required tokens, accessibility requirements, behavior, supported adapters, and documentation.

Component-scoped tokens are allowed when they are part of a public component customization API or reusable component-level design decision. They are not required for every internal implementation detail.

Current component source layers:

- Component contracts: `components/contracts/`.
- CSS source: `components/css/`.
- Shared JS source: `components/js/theme.js`.
- Runtime module boundaries: `components/js/runtime-modules.json`.
- Manifest: `registry.json`.
- Documentation: `site/src/content/components/*.mdx`.

Target-specific implementations belong under `platforms/<target>/`.

The first explicit component adapter is the neutral web output in `platforms/web/`. It packages hand-authored CSS from `components/css/`, dependency-selective progressive-enhancement modules, compatibility aggregates, and a generated adapter manifest that maps every registry component to its contract, source files, and copy-and-own install slice.

## Documentation Site

The Gallery should have its own documentation and component gallery. It should expose foundations, tokens, component pages, previews, usage guidance, and install/copy flows.

Current docs implementation:

- React/Vite app in `site/`.
- Routes in `site/src/App.tsx`.
- Component data from `registry.json`.
- Component MDX auto-discovery in `site/src/content/index.ts`.
- Preview rendering through `site/src/components/ComponentPreview.tsx`.

## First Commercial Path

The first concrete commercial target is Shopify. Once the system is mature, the owner wants to build a Shopify website with these components and launch templates for sale.

Current Shopify implementation lives in `platforms/shopify/`. Shopify tokens now come from the neutral web token target through a thin wrapper, and Shopify assets/manifests are generated through the Shopify adapter scripts. Shopify component maturity is computed with `shopify-maturity-v1` across CSS, Liquid, schema/settings, data mapping, behavior, template composition, and editor-preview readiness so class-level contracts, snippets, sections, and missing dedicated adapters can mature at different speeds. The Shopify adapter should target Shopify's latest theme-block architecture, but sellable Theme Store-oriented work should remain independent from Horizon-derived code.

## Working Agreement For Agents

The owner explicitly asked agents not to assume. When the repository does not make a decision 100% clear, ask a concrete question before changing architecture or product direction.

## Owner clarifications — 2026-09-08

- Adjacent Input and Button must align and share visual density, including icons
  and loading. ADR 0292 records the bounded implementation pilot.
- Shopify should expose intentional brand controls through the theme editor.
- The Figma pilot may use the existing “The Gallery Design System” file; a new
  file is also acceptable. The repository remains the official source.
- These preferences do not imply additional platforms, modes, shadows or a
  wholesale token reconstruction. Review the small pilot before expansion.

## Delivery priority after pilot review — 2026-09-08

The owner liked the Shopify and Figma pilots but prioritized completing the
base Web system first, then Shopify, then Figma. Preserve both pilots. Further
Figma feedback/expansion is deferred and does not block base-system audit fixes.
Fixed utility spacing and adaptive semantic spacing may coexist with explicit
names and guidance; do not change current utility measures to match semantic
scale indexes.
