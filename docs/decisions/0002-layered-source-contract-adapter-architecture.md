# 0002. Layered Source, Contract, And Adapter Architecture

Status: Accepted

Date: 2026-05-23

## Context

The Gallery needs to support a long-term vision broader than the current CSS component library and Shopify implementation. The project should eventually support multiple targets such as Shopify, Webflow, Framer, React, Angular, Figma, SwiftUI, Jetpack Compose, and future platforms.

The owner clarified that the desired architecture is a repo-centered source of truth that can translate into targets while preserving a copy-and-own distribution model.

## Decision

The Gallery will be organized conceptually as layered architecture:

1. Governance.
2. Token source.
3. Semantic model.
4. Component contracts.
5. Target adapters.
6. Generated outputs.
7. Registry and CLI.
8. Consumer projects.

The Gallery has two internal source languages:

- Tokens: the language of design values.
- Component contracts: the language of target-agnostic component definition.

Targets are translations. CSS, Liquid, JSX, SwiftUI, Compose, Figma variables, and Webflow files are target outputs or adapters, not the whole source of truth.

## Consequences

- The current CSS implementation remains valuable, but it should not permanently be the only component source model.
- A formal component contract schema should be introduced before adding many new target adapters.
- Registry and CLI work should evolve toward target-aware installation.
- Token source format and component contract format can be decided separately.
- Native app support is in scope at the token and adapter layers, but native components require target-specific styles/components beyond DTCG tokens alone.

## Follow-Up Work

- Add `registry.schema.json`.
- Decide canonical token source format.
- Define `components/contracts/` schema.
- Pilot a Button contract.
- Define target adapter conventions.
- Add validation across registry, contracts, docs, and implementation files.
