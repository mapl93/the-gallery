# 0001. DTCG Token Source Spike

Date: 2026-05-23

Status: Passed

## Goal

Validate whether The Gallery can use DTCG-style tokens with `$value` and `$type` as an in-repo source format while still generating useful outputs for web, Figma, JavaScript, Swift, and Jetpack Compose.

## Scope

The spike lives in `spikes/dtcg/` and is intentionally isolated from the production token pipeline.

The token subset includes:

- Neutral color primitives.
- Semantic surface/text aliases.
- Public button component-scoped tokens.
- Spacing and radius dimensions.
- Button spacing aliases.

## Command

```sh
npm run spike:dtcg
```

## Outputs Tested

The spike generates ignored build outputs in `spikes/dtcg/build/`:

- `css/tokens.css`
- `js/tokens.js`
- `figma/tokens.source.dtcg.json`
- `figma/tokens.resolved.json`
- `swift/GalleryTokens.swift`
- `compose/GalleryTokens.kt`

## Result

The spike passed.

Confirmed:

- Style Dictionary 4.4.0 detects and builds DTCG-style source tokens.
- CSS output can preserve references, such as `--tg-color-surface-primary: var(--tg-color-gray-0)`.
- JavaScript output resolves values into ES module exports.
- Swift output converts DTCG colors and `rem` dimensions into `UIColor` and `CGFloat`.
- Compose output converts DTCG colors and `rem` dimensions into `Color` and `.dp`.
- A Figma-ready DTCG output must preserve `$value`, `$type`, and aliases.

Important finding:

- Style Dictionary's built-in `json/nested` format resolves values and strips `$value` / `$type`. It is useful as a resolved diagnostic output, but not as the Figma-import-ready DTCG output.
- The spike uses a custom `the-gallery/dtcg-source` format to preserve the DTCG source shape for Figma.

## Consequence

DTCG-style source tokens are viable for The Gallery.

Next work should focus on migration design:

- Choose the first production token collection to convert.
- Define token schema validation.
- Decide how to represent modes/themes and breakpoints in DTCG.
- Build production-safe Figma export logic instead of relying on `json/nested`.
- Keep the current `tokens/*_tokens.json` pipeline working until the migration path is proven collection by collection.
