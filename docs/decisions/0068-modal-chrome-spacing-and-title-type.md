# 0068. Modal Chrome Spacing And Title Type

Status: Accepted

Date: 2026-07-12

## Context

Modal header and footer used the same 32px spacing role as the content body.
This made the surrounding chrome feel oversized, and the serif heading family
made the dialog title visually inconsistent with the system's operational UI.

## Decision

- Modal body padding remains the existing layout element gap.
- Header and footer use 75% of that semantic spacing role, producing 24px with
  the current token values.
- Header and footer use one uniform padding value for all four sides.
- Modal title uses the public body font-family token, which resolves to Inter
  in the base system.
- Title size continues to use the existing H3 semantic size token.
- No new component-scoped token is introduced; spacing remains derived from
  the established public layout role.

## Consequences

- Modal chrome is more compact while body copy retains comfortable spacing.
- Horizontal and vertical chrome padding remain visually balanced.
- Consumers that replace the base body family also update Modal title type
  consistently.
