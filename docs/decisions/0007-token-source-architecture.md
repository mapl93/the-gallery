# 0007. Token Source Architecture

Status: Accepted Direction; Initial Structure And Compiler Added

Date: 2026-05-23

## Context

The current token build uses `tokens/*_tokens.json` as Style Dictionary input. Those files work, but they mix primitives, themes, viewport modes, and component decisions in a way that causes collisions when all files are loaded together.

The root-level `*.tokens.json` files are earlier Figma export snapshots. They are useful migration references, but Figma is a target and those files are not the source of truth.

The Gallery needs an in-repo source that can compile to CSS, JS/TS, Figma variables, Shopify, Webflow, Framer, SwiftUI, Jetpack Compose, and future targets without making any one target the architecture.

## Decision

The long-term canonical token source will live under `tokens/source/` and use DTCG-style JSON with `$value`, `$type`, and `$description`.

The current `tokens/*_tokens.json` files remain the legacy build input until migration is complete. They should not be deleted or rewritten as part of the first source-architecture step.

The source hierarchy is:

```text
tokens/source/
  primitives/      raw values with no product role
  semantics/       product roles that components and docs should use
  components/      public component customization tokens
  modes/           theme and viewport overrides selected at compile time
```

Token paths should be category-first:

```text
color.gray.900
color.surface.primary
space.scale.4
space.section.md
typography.body.default.size
component.button.primary.background.default
```

Modes are not global files to merge all at once. A compiler must select a mode matrix, for example:

```text
primitives + semantics + components + modes/theme.light + modes/viewport.desktop
primitives + semantics + components + modes/theme.dark + modes/viewport.mobile
```

This avoids the current collision pattern where all themes and all viewports are loaded into one build.

## Layer Rules

Primitives:

- May use literal values.
- Should avoid product meaning such as `primary`, `success background`, or `button`.
- Should not reference component or semantic tokens.

Semantics:

- Should express product roles such as surface, text, border, spacing, typography, feedback, and layout.
- Should reference primitives whenever practical.
- Are the default API that component contracts and adapters consume.

Components:

- Are allowed only when the token is part of a component's public customization API or a reusable component-level design decision.
- Should not mirror every private CSS custom property.
- Should reference semantic tokens when possible.

Modes:

- Override semantic or component paths for a selected theme, viewport, density, brand, or future mode.
- Are selected by a build target instead of being loaded all together.
- May duplicate token paths from `semantics/` or `components/` because they are overrides.

## Consequences

- New token source work should happen in `tokens/source/`.
- Existing builds should keep using `tokens/*_tokens.json` until a target compiler is added for the new source.
- Validation should enforce DTCG syntax and catch accidental legacy `value`/`type` tokens in `tokens/source/`.
- Migration should happen collection by collection, with output comparisons before deleting legacy files.
- Root Figma exports should eventually move to an archive or migration-reference path.

## Follow-Up Work

- Add a compiler config that builds from `tokens/source/` by selecting one theme and one viewport.
- Add target outputs for CSS, Shopify, Webflow, Framer, Figma, Swift, and Compose from the new source.
- Compare outputs from `tokens/source/` against the legacy `tokens/*_tokens.json` build.
- Migrate legacy token collections gradually.
- Delete legacy token files only after the new source and target outputs are verified.

## Related Decisions

- Token source compiler: `docs/decisions/0008-token-source-compiler.md`
