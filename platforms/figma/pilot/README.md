# Figma form pilot

Status: implemented, unpublished, owner visual review pending (ADR 0298).

[Open the form](https://www.figma.com/design/k3axoTaF87g17fBRgJ0PMY/The-Gallery--Design-System?node-id=1149-5).

This is a bounded projection into the existing file, not a general Figma adapter
or a published library. The repository remains canonical. Existing pages and
collections are preserved; all new assets use the Gallery Pilot namespace.

## Sources and ownership

- `tokens/source/`: canonical token values, aliases and existing theme/viewport modes.
- Four `components/contracts/*.contract.json`: public-token inventory and independent semantic axes.
- `components/css/primitives.css` and `platforms/web/tokens.css`: actual web calculations and aliases.
- This folder: Figma-specific transforms, editable artwork, identity map and recorded evidence.
- `manifest.json`: persistent IDs keyed by source path, component and role. Do not regenerate IDs on update.
- `evidence.json`: dated remote checks, including instance content and 4 → 8 → 4 px geometry.
- `output/figma/`: ignored generated payload, browser capture and executable Plugin API requests.

The component constructors preserve existing sets. They do not migrate arbitrary
structural edits. Variable updates are keyed by the manifest identities; changed
types, conflicting identities and duplicate names stop the update. Existing
instance text overrides survive token updates.

## Projection

| Source | Figma representation |
| --- | --- |
| 134 selected source tokens, including alias closure | COLOR, FLOAT and STRING variables |
| Primitive values | 47 variables, one Default mode |
| Semantic/component colors and 16 CSS color calculations | 53 variables, Light and Dark |
| Metrics/type and four arithmetic calculations | 54 variables, Mobile, Tablet, Desktop, XL |
| CSS dimensions | FLOAT in px; rem uses a 16 px root assumption |
| CSS opacity fraction | Percentage for Figma opacity bindings; 0.5 becomes 50, preserving the alias |
| Font family | First family (Inter); the fallback stack remains in code |
| Typography | Six text styles, including underlined Link, bound to family, size, weight and line height |
| Select shadow | One effect style composed from shadow.lg.* |
| color-mix(), unitless line height, optical slot width, focus outline geometry | Adapter transforms; rerun the update after changing upstream inputs |
| Duration, cubic Bézier and z-index | Outside this static pilot; retained in source |

The 20 adapter calculations are hidden from library publication and are not new
public source tokens. CSS mixes are measured through Chromium in 8-bit sRGB.
This does not establish wide-gamut or exact glyph-rasterization parity.

Figma modes do not switch automatically when a frame width changes. Select the
appropriate existing Metrics mode explicitly. Light/Dark are independent of
viewport modes.

## Reproduce an update

No dependency installation is needed in the existing checkout. Read AGENTS.md
and the Figma/Playwright skills first. Keep the evidence browser lifecycle bounded.

1. If canonical token files changed, generate and validate the neutral web token
   output through the existing repo pipeline.
2. Open one headless `gallery-refinement` Playwright CLI session on about:blank.
   Use the already installed CLI. No Gallery docs server is needed.
3. Set `TG_PLAYWRIGHT_CLI` to that executable and run
   `node scripts/capture-figma-pilot-css.js`. Close the session explicitly,
   run `npm run evidence:cleanup` and `npm run evidence:assert-clean`.
4. Run `npm run build:figma:pilot`. It refuses missing/stale CSS captures and
   prepares requests smaller than the Figma tool's 50,000-character limit.
5. Execute the generated requests through Figma Plugin API / `use_figma`, against
   the exact file key in `manifest.json`, in this order:
   `sync-primitives.js`, `sync-colors.js`, `sync-metrics.js`,
   `sync-styles.js`, `sync-geometry.js`. Each result returns affected IDs.
   Do not run writes in parallel.
6. Execute `validate-primitives.js`, `validate-colors.js` and
   `validate-metrics.js`. Inspect every error array, counts and IDs.
7. Inspect native screenshots, refresh the dated evidence/manifest source hashes
   only after successful checks, then run `npm run validate:figma:pilot`.

The local validator checks the projection and recorded evidence; it does not
query current Figma state. A changed source snapshot intentionally invalidates
the old evidence. The scripts do not publish a library or update consumer files.

## Editable component scope

Button has 5 variants × 6 states at the default labeled density; Input, Select and
Textarea each have 4 validation variants × 5 states. Text, required markers,
messages and applicable icon slots are component properties. Shared values use
variables; variant and state stay independent.

Select composes reusable option and panel components. Icons are editable SVG
instances extracted from the site's accepted Lucide catalogue, with license
preserved in this folder. Icon names are not added to target-agnostic contracts.

The form fixtures use component instances in Light/Desktop, Dark/Desktop and
Light/Mobile. Their content and layout are examples, not new contracts.

## Boundaries

- No reverse synchronization: Figma edits do not change repo tokens. An update
  reapplies official values. Retain desired local design explorations separately.
- Arithmetic and color mixes do not recalculate automatically inside Figma.
  Focus outline expansion and corner geometry also require the geometry pass.
- Small/large, icon-only Button, alternative loading placement, semantic native
  value/placeholder distinctions, interactive prototypes and keyboard behavior
  are outside this pilot.
- Textarea shows the 120 px CSS minimum, not all minLines/maxLines/resize behavior.
- Input's external margin token is exported for traceability; composition gaps
  are parent-owned here. Link underline offset has no separate binding in this
  artwork. Neither token is falsely classified as unused in the source system.
- The selected shadow and icon geometries are bounded to current source defaults.
  Arbitrary brand font substitution and extreme content need a fresh visual review.
- Native form validity, submission, focus management, accessibility and reduced
  motion still need browser evidence in their actual target.
