# 0003. DTCG-Style Token Source Format

Status: Accepted Direction; Initial Spike Passed; Source Structure Added

Date: 2026-05-23

## Context

The Gallery needs a target-agnostic token source that can translate into web, Shopify, Webflow, Framer, Figma, React, Angular, SwiftUI, Jetpack Compose, and future targets.

The current implementation uses Style Dictionary-ready JSON with `value` and `type`. Root-level `*.tokens.json` files are Figma export snapshots and are not canonical.

DTCG-style tokens use `$value`, `$type`, `$description`, aliases, groups, and extensions. This aligns with the broader direction of design token interoperability and with Figma as a target.

## Decision

The Gallery's long-term canonical token source should be DTCG-style JSON using `$value` and `$type`.

This is an accepted direction, not an immediate whole-repo migration. The current Style Dictionary build must keep working until the new `tokens/source/` compiler can prove output parity target by target.

## Consequences

- New token architecture work should be designed with DTCG compatibility in mind.
- The repo should add token validation before or during migration.
- Style Dictionary can remain the compiler/translation layer if it supports the required DTCG subset.
- Root-level Figma exports remain snapshots, not the source.
- The migration should start with a small token subset and verify target outputs before expanding.
- The initial isolated spike passed for CSS, JavaScript, Figma-source JSON, Swift, and Compose outputs.
- Style Dictionary's built-in `json/nested` output should not be used as the Figma DTCG import artifact because it strips `$value` and `$type`.
- The first DTCG-style source structure now lives in `tokens/source/` and is documented in ADR 0007.

## Follow-Up Work

- Add a source-token compiler that selects one theme mode and one viewport mode per output.
- Compare source-token outputs against the legacy `tokens/*_tokens.json` build.
- Migrate legacy token collections gradually.
- Test Figma import from generated DTCG source files.
- Expand SwiftUI and Compose from spike output into first-class target artifacts.

## Spike

- DTCG spike notes: `docs/spikes/0001-dtcg-token-source-spike.md`
- Spike source: `spikes/dtcg/`
- Token source architecture: `docs/decisions/0007-token-source-architecture.md`
- Token source structure: `tokens/source/`

## References

- DTCG Design Tokens Format Module: https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/
- Style Dictionary DTCG support: https://styledictionary.com/info/dtcg/
- Figma token import requirements: https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables
