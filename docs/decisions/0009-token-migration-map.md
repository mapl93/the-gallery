# 0009. Token Migration Map

Status: Accepted Initial Implementation

Date: 2026-05-23

## Context

The new DTCG-style source in `tokens/source/` must eventually replace the legacy `tokens/*_tokens.json` files. Before switching any target, The Gallery needs a concrete map from legacy token paths to source token paths.

Without this map, migration would rely on naming intuition and manual spot checks.

## Decision

The token migration inventory lives at:

```text
tokens/source/migration-map.json
```

It maps every unique legacy token path from `tokens/*_tokens.json` into one of these states:

- `mapped`: the source token should match the resolved legacy value across every theme/viewport matrix.
- `format-change`: the source token exists, but DTCG represents the value differently and adapter serialization will handle the final target shape.
- `pending`: the legacy token is known but not yet migrated.

The first implementation has:

```text
201 mapped legacy tokens
5 format changes
0 pending tokens
1608 parity comparisons
```

The five format changes are legacy easing tokens. Legacy uses CSS easing strings such as `ease-in`; source uses DTCG `cubicBezier` arrays.

## Validation

`npm run validate:tokens:source-build` now:

1. Checks that every source-token matrix output exists.
2. Ensures `tokens/source/migration-map.json` covers every unique legacy token path.
3. Fails on unknown or duplicate legacy mappings.
4. Compares every `mapped` token across all eight theme/viewport matrices.
5. Verifies `format-change` source paths exist without requiring raw value equality.

## Consequences

- Token migration has an executable inventory instead of informal naming notes.
- Adding, deleting, or renaming a legacy token now requires updating the migration map.
- The source-token build can prove value parity before a target switches away from legacy tokens.
- Format changes are explicit and reviewable.

## Follow-Up Work

- Add target-specific output comparison for generated CSS variable names.
- Use the neutral web target as the first consumer of `tokens/source/`. Done; see `docs/decisions/0010-neutral-web-token-target.md`.
- Add adapter serialization for DTCG `cubicBezier` arrays where CSS output needs keyword or `cubic-bezier(...)` strings.
- Keep `pending` at zero unless a deliberately deferred migration is documented.
