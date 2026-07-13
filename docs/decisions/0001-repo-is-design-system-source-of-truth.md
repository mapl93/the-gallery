# 0001. Repo Is The Design System Source Of Truth

Status: Accepted

Date: 2026-05-23

## Context

The Gallery began with design work in Figma and includes root-level `*.tokens.json` files exported from Figma. The long-term product direction is a platform-agnostic design system whose tokens, components, docs, and target adapters can evolve over time.

The owner clarified that Figma is a target, not the source of truth.

## Decision

The repo is the source of truth for The Gallery.

Figma should be treated as a generated/synchronized target of the repo's token and component model. Root-level `*.tokens.json` files are historical import/reference snapshots from Figma and must not be treated as canonical token source files.

The current token build input is `tokens/*_tokens.json`, but the long-term in-repo source format is still open.

## Consequences

- Future agents should not choose root-level Figma exports over repo-native token sources.
- Any Figma sync should flow from repo source into Figma unless the owner explicitly asks for a one-time import/migration.
- Root-level Figma exports may be archived, deleted, or converted later, but that is a separate cleanup decision.
- The next token architecture decision is about source format inside the repo, not about whether Figma owns the source.

## Still Open

The repo still needs a decision on whether the canonical in-repo token format should remain the current Style Dictionary-ready JSON, move to DTCG-style tokens with `$value`/`$type`, or use another target-agnostic source format.
