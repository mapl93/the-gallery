# 0046. Input Hover Surface Default

Status: Accepted

Date: 2026-07-12

## Context

The default Input hover state changed its background from the primary surface to
the secondary surface. In the base light theme, that introduced a gray fill even
though the hover border already communicated interactivity.

The owner selected a white hover surface for the shipped base theme while
retaining the background as a public customization point.

## Decision

- `--color-input-default-hover-bg` remains part of the public Input token API.
- Its shipped value references `--tg-color-surface-primary` instead of the
  secondary surface.
- The base light theme therefore keeps the field white on hover.
- Theme modes continue resolving through their own primary surface rather than a
  fixed color value.
- The hover border remains responsible for the visible state change.

## Consequences

- Hover no longer adds a gray fill to text-entry fields in the base light theme.
- Consumers can still customize the hover background independently through the
  existing public token.
- Disabled fields retain their secondary-surface treatment.
