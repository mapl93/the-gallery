# 0005. Target Priority, Registry, And Distribution Policy

Status: Accepted

Date: 2026-05-23

## Context

The Gallery intends to support many targets over time. Trying to build every adapter at once would slow down the system before the source model is stable.

The current repo also tracks generated docs output in `site/dist`, while the long-term product needs consumer-ready outputs that can be installed or copied into projects.

## Decision

Target priority should move from easiest to hardest:

1. Web foundation: vanilla CSS/HTML/JS.
2. Web frameworks: React, Angular, and later other frameworks.
3. Web platforms and e-commerce: Shopify, Webflow, Framer, and similar targets.
4. Design tools: Figma and future design-tool targets.
5. Native app targets: SwiftUI, Jetpack Compose, and later other native platforms.

The registry must be schema-validated and target-aware.

Generated docs output is not source. It should not be treated as canonical code. Consumer-ready outputs should be reproducible from source and published through the correct distribution channels for each target.

Canonical documentation should be English first. Additional languages can be added later as localization targets.

## Distribution Direction

- Web/core and CLI outputs should be publishable through npm.
- React, Angular, and other web framework adapters can ship as npm packages or registry items.
- Shopify outputs can ship as generated theme assets, GitHub release zips, npm package assets, and eventually Theme Store submissions where appropriate.
- Webflow and Framer outputs should ship in target-appropriate copy/import formats.
- Figma outputs should ship as DTCG import files and later through a plugin or generated Figma workflow.
- Native outputs can eventually ship as Swift Package Manager and Maven/Gradle artifacts.

## Consequences

- `site/dist` should eventually be removed from source control or treated as deployment output only.
- Release pipelines should generate packages/artifacts from source.
- The CLI should evolve toward target-aware installation.
- Versioning must distinguish package, registry, component, and adapter versions.

## Follow-Up Work

- Add `registry.schema.json`.
- Decide the exact `site/dist` policy and update `.gitignore` if needed.
- Design target-aware CLI commands.
- Define package names and registry paths.
- Add release artifact generation.
