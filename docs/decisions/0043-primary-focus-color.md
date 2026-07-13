# 0043. Primary Focus Color

Status: Accepted

Amended by: `0045-field-focus-ring-hierarchy.md`

Date: 2026-07-12

## Context

The neutral-web compatibility alias `--color-border-focus` and Input's focused
outer border both resolved from `color.text.statement`. The base statement color
is orange, so keyboard focus and simulated active control states introduced an
orange ring that did not match the approved neutral base system.

The owner confirmed that active focus treatment should use the theme's primary
color, which is black in the base light theme.

## Decision

- `--color-border-focus` resolves from `--tg-color-text-primary`.
- `--color-input-default-focused-outer-border` resolves from the global
  `--color-border-focus` alias.
- The relationship remains theme-aware: the light theme uses its black primary
  text color and the dark theme uses its light primary text color.
- Statement and accent tokens remain orange for their editorial roles.
- Error focus remains tied to the semantic error palette.

## Consequences

- Focus treatment is neutral and consistent across components that consume the
  global focus alias.
- Input no longer owns a competing default focus color.
- Changing a future theme's primary color automatically updates its focus color
  without changing component CSS.
