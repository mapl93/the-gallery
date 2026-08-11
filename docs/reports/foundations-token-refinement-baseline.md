# Foundations and Token Refinement Baseline

Status: Validated prerequisite baseline; open migration decisions retained

Date: 2026-07-13

## Purpose

This gate establishes the source layer that every component refinement batch
consumes. It does not introduce a new token format, component-token layer, mode,
or target. The repository remains the source of truth; root Figma exports remain
reference snapshots.

## Canonical Source

- Canonical direction: DTCG-style `$value` / `$type` tokens under
  `tokens/source/`.
- Layers: primitives, semantics, reviewed component tokens, and selected mode
  overrides under ADR 0007.
- Source inventory: 534 tokens across 16 files with 197 mode overrides.
- Resolved matrices: light/dark across Mobile, Tablet, Desktop, and XL.
- Migration map: 201 mapped legacy tokens; validation performed 1,608 parity
  comparisons with 5 documented format changes and 0 pending mappings.
- The ignored `tokens/source/build/` directory remains a comparison sandbox, not
  a target output or canonical source.

## Target Flow

| Target | Source flow | Validation result |
| --- | --- | --- |
| Neutral Web | `tokens/source/` -> `platforms/web/tokens.css` | pass |
| Neutral component CSS | Public `--tg-*` plus compatibility aliases | 186 public component refs defined |
| Shopify | Neutral Web token target -> `platforms/shopify/assets/tokens.css` | pass; layout load order preserved |
| Webflow / Framer legacy | Legacy `tokens/*_tokens.json` through Style Dictionary | retained until an accepted migration step |
| Figma | Target/reference, not source | no source promotion inferred |

The neutral Web adapter and Shopify wrapper were regenerated only because source
component CSS/JS changed in the calibration batch. `site/dist` was not rebuilt.

## Mode and Consumption Checks

- Eight light/dark viewport matrices build and resolve.
- Motion primitives, semantic durations/easing, and public Web aliases validate.
- Button continues to consume its reviewed component typography, spacing,
  radius, color, opacity, duration, and easing tokens.
- Select reuses the accepted field hierarchy; the reduced-motion correction
  removes transitions without introducing a new token.
- Product Card now consumes Card-owned surface tokens through canonical
  composition rather than duplicating them.
- Component-private `--_` variables remain composition details. No private value
  became a public token merely because the refinement audit observed it.

## Performance Baseline

| Surface | Measurement | v1 ceiling | Result |
| --- | ---: | ---: | --- |
| Neutral component CSS | `56,481 B` gzip | `64 KiB` | pass |
| Shared progressive JS | `5,180 B` gzip | `8 KiB` | pass |
| Primitives CSS | `9,343 B` gzip | `10.3 KiB` | pass |
| Product CSS | `4,894 B` gzip | `5.2 KiB` | pass |

Family budgets and runtime rules are permanent in
`docs/COMPONENT-REFINEMENT.md`; each dossier records only its relevant delta and
family measurement.

## Validation

- `npm run validate:tokens:source`
- `npm run build:tokens:source`
- `npm run validate:tokens:source-build`
- `npm run build:tokens:web`
- `npm run validate:tokens:web`
- `npm run validate:tokens:motion`
- `npm run validate:tokens:web-components`
- `npm run build:tokens:shopify`
- `npm run validate:tokens:shopify`

All passed during the calibration batch.

## Open Decisions

These remain in `docs/OPEN-QUESTIONS.md` and are not resolved by this baseline:

- Required output-parity threshold before deleting each legacy token file.
- Timing for archiving historical root Figma snapshots.
- Whether Webflow or framework-oriented JS/TS output is the next wrapper target.

## Readiness

Foundations and tokens are validated as the prerequisite for dependency-ordered
component refinement. This is not a declaration that legacy migration is
finished or that every future target has a certified adapter.
