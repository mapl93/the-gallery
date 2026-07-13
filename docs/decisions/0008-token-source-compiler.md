# 0008. Token Source Compiler

Status: Accepted Initial Implementation

Date: 2026-05-23

## Context

ADR 0007 defines `tokens/source/` as the DTCG-style token source architecture. The repo still needs the legacy `tokens/*_tokens.json` build to remain stable while the new source proves target output parity.

The first compiler should therefore generate comparable artifacts without writing into production target directories such as `platforms/shopify/`, `platforms/webflow/`, or `platforms/framer/`.

## Decision

The first source-token compiler is `scripts/build-token-source.js`.

It builds this mode matrix:

```text
theme: light, dark
viewport: mobile, tablet, desktop, xl
```

Each matrix is composed in this order:

```text
primitives + semantics + components + selected theme mode + selected viewport mode
```

Generated files live under `tokens/source/build/`, which is ignored by git:

```text
tokens/source/build/css/light.desktop.css
tokens/source/build/css/dark.mobile.css
tokens/source/build/json/light.desktop.resolved.json
tokens/source/build/manifest.json
```

This output directory is a migration/comparison sandbox, not a release artifact and not a target adapter.

## Commands

```sh
npm run build:tokens:source
npm run validate:tokens:source-build
```

The build command validates `tokens/source/` first, then generates CSS variables and resolved JSON for every matrix.

The validation command checks that all eight CSS files and all eight resolved JSON files exist, then uses `tokens/source/migration-map.json` to compare every mapped legacy token across the generated matrices.

## Consequences

- The new source compiler can evolve without changing `npm run build:tokens`.
- Legacy platform outputs remain untouched until output parity is good enough to switch a target.
- Mode overrides are merged before Style Dictionary runs, so expected mode overrides do not create duplicate-token collisions.
- The comparison now covers every mapped legacy token path through `tokens/source/migration-map.json`.

## Follow-Up Work

- Add first-class target outputs from `tokens/source/` after parity is acceptable.
- Decide which target should switch from legacy tokens first.
- Add Figma-source DTCG output for the full `tokens/source/` matrix or selected collections.

## Related Decisions

- Token migration map: `docs/decisions/0009-token-migration-map.md`
- Neutral web token target: `docs/decisions/0010-neutral-web-token-target.md`
