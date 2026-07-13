# 0004. Component Contracts And Component-Scoped Tokens

Status: Accepted

Date: 2026-05-23

## Context

The Gallery needs target-agnostic components. CSS is only one target adapter, not the component source of truth.

Earlier docs discuss a formal component token layer, while the current CSS implementation uses semantic variables and private component properties such as `--_btn-bg`.

## Decision

The formal source layer for components is `Component Contracts`.

A component contract defines anatomy, slots, variants, states, dependencies, required tokens, behavior, accessibility, target support, docs, and examples.

Component-scoped tokens are allowed when they are part of a component's public customization API or needed to express a reusable design decision. They should not be created as a universal token for every internal CSS property by default.

Private adapter variables such as CSS `--_` properties remain implementation details unless the contract promotes them into public tokens.

## Consequences

- The next component architecture task is to define `components/contracts/`.
- Component contracts can reference primitive, semantic, and component-scoped tokens.
- CSS, Liquid, JSX, SwiftUI, Compose, and Figma implementations consume contracts as adapters or outputs.
- Token bloat should be avoided; component-scoped tokens must have a clear purpose.

## Follow-Up Work

- Define a v1 contract schema.
- Pilot the schema with Button.
- Validate registry, contract, CSS, and MDX alignment.
- Decide which Button values deserve public component-scoped tokens.
