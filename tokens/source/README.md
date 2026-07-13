# The Gallery Token Source

This directory is the new canonical token-source structure for The Gallery. It is intentionally parallel to the current legacy build input in `tokens/*_tokens.json`.

Current status:

- `tokens/source/` is the DTCG-style source direction.
- `tokens/*_tokens.json` is still the active legacy Style Dictionary build input.
- Root-level `*.tokens.json` files are Figma export snapshots, not source of truth.

## Layers

```text
tokens/source/
  primitives/      raw values with no product role
  semantics/       product roles consumed by components and adapters
  components/      public component customization tokens
  modes/           theme and viewport overrides selected at compile time
```

## Compile Model

Do not load every mode file into one build. A target compiler should select one mode matrix:

```text
primitives + semantics + components + modes/theme.light + modes/viewport.desktop
primitives + semantics + components + modes/theme.dark + modes/viewport.mobile
```

This is the main difference from the current legacy token build, where loading all theme and viewport files together creates duplicate token paths.

The first compiler builds all theme/viewport matrices into an ignored sandbox:

```sh
npm run build:tokens:source
npm run validate:tokens:source-build
```

Generated files are written to `tokens/source/build/`:

```text
tokens/source/build/css/light.desktop.css
tokens/source/build/css/dark.mobile.css
tokens/source/build/json/light.desktop.resolved.json
tokens/source/build/manifest.json
```

These files are for migration comparison only. They are not production target outputs yet.

## Migration Map

`migration-map.json` maps legacy token paths from `tokens/*_tokens.json` to source-token paths.

The source-build validator uses this map to compare parity across every generated matrix:

```text
light/mobile
light/tablet
light/desktop
light/xl
dark/mobile
dark/tablet
dark/desktop
dark/xl
```

Current coverage:

```text
201 mapped legacy tokens
5 format changes
0 pending tokens
1608 parity comparisons
```

The format changes are easing tokens, because legacy stores CSS strings and source stores DTCG `cubicBezier` arrays.

## Naming Rules

- Use DTCG-style `$value`, `$type`, and `$description`.
- Use category-first paths such as `color.surface.primary`, `space.scale.4`, and `component.button.primary.background.default`.
- Use aliases with DTCG reference syntax: `{color.gray.900}`.
- Use explicit units for dimensions, such as `16px`, rather than unitless numeric strings.
- Keep component tokens public and intentional. Do not create component tokens for every private CSS implementation variable.

## Motion

Motion is a first-class token family because adapters need to translate timing and easing across CSS, Liquid/theme assets, React, native apps, and design tools.

The current source uses Style Dictionary-compatible DTCG-style values:

```text
duration.fast                  primitive duration
curve.out                      primitive cubic Bezier
motion.duration.standard       semantic duration role
motion.curve.enter             semantic easing role
motion.transition.feedback     semantic transition composite
motion.opacity.scrim           semantic opacity role
```

`motion.transition.*` tokens use `$type: "transition"` with `duration`, `delay`, and `timingFunction`. Duration values are currently authored as strings with units, such as `200ms`, because the current Style Dictionary pipeline transforms that shape correctly for CSS. A stricter object value such as `{ value: 200, unit: "ms" }` can be adopted later when the transform layer supports it without emitting `[object Object]`.

Neutral web exposes both canonical source-derived variables and public aliases:

```text
--tg-motion-transition-feedback
--motion-transition-feedback
--transition-base
--easing-out
```

The `--transition-*` and `--easing-*` names are compatibility aliases for current component CSS. New adapter work should prefer the semantic `motion.*` source paths or the public `--motion-*` aliases.

## Migration Rule

Migrate gradually. Add a token to `tokens/source/`, validate it, compile it for one target, compare it to the legacy output, then expand.
