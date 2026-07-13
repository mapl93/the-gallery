# DTCG Spike

This spike validates The Gallery's accepted token-source direction: DTCG-style tokens using `$value` and `$type`.

It is intentionally isolated from the current production token pipeline. The existing build still reads `tokens/*_tokens.json`.

## What This Tests

- DTCG source syntax with `$value`, `$type`, `$description`, and aliases.
- CSS custom property output with references preserved.
- JavaScript token output.
- Figma-import-ready DTCG JSON output.
- Resolved nested JSON output, to document how Style Dictionary's built-in `json/nested` format behaves.
- Swift token output through Style Dictionary's iOS Swift formatter.
- Jetpack Compose token output through Style Dictionary's Compose formatter.

## Commands

```sh
npm run spike:dtcg
```

Generated files are written to `spikes/dtcg/build/`, which is ignored by git.

Important finding: Style Dictionary's built-in `json/nested` output resolves values and strips `$value` / `$type`. For Figma import, this spike uses a custom `the-gallery/dtcg-source` format that preserves the DTCG source shape.

## Scope

The subset is deliberately small:

- Neutral color primitives.
- Semantic surface/text colors.
- Button color semantics.
- Spacing/radius dimensions.
- Button spacing semantics.

This is enough to prove aliases, semantic layering, component-scoped public tokens, and native target transforms without migrating the whole token system.
