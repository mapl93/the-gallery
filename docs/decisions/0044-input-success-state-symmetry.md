# 0044. Input Success State Symmetry

Status: Accepted

Date: 2026-07-12

Generalized by: ADR 0049 for every value-entry field.

## Context

Input Error styled its label, inner border, message, icon, and focused outer
border from the error palette. Input Success styled only its unfocused inner
border, message, and icon. As a result, Success kept a neutral label and fell
back to the default black focus treatment.

The owner confirmed that Success should communicate validation across the same
visual anatomy as Error.

## Decision

- Success styles the label, inner border, message, and icon with the semantic
  success color.
- Focused Success keeps a success-colored inner border and uses the semantic
  success background for its outer focus ring.
- The contract explicitly records `successFocusVisible` alongside the existing
  focused Error state.
- Value text and field fill remain neutral, matching Error's existing behavior.

## Consequences

- Error and Success now have symmetrical validation coverage without relying on
  color alone; both continue to require associated validation text.
- Studio can review focused Success directly as a named state.
- Web, Shopify, and isolated documentation previews consume the same public
  success aliases.
