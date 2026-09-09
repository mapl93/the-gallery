# The Gallery Token Source

This directory is the canonical token source for neutral web and Shopify. The retained Webflow/Framer pipeline uses `tokens/*_tokens.json`.

Current status:

- `tokens/source/` is the active DTCG-style source for web and Shopify.
- `tokens/*_tokens.json` is the legacy Style Dictionary input for Webflow/Framer and the migration-parity baseline.
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

These sandbox files support migration comparison and the web generator. The tracked target is `platforms/web/tokens.css`; Shopify wraps that target. Never edit sandbox outputs as source.

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

## Catalogue and control pilot

The docs catalogue reads these source files directly, selecting the same file
precedence as the compiler. It shows aliases, resolved source values and mode
provenance. It is not a strict DTCG conformance claim: this repository retains
Style Dictionary-compatible string dimensions/durations and its own mode layout.

`components/input.tokens.json` gives the five existing public Input layout
controls explicit source paths. It adds no new public CSS aliases. Typography
continues to use shared body roles; private `--_` variables stay private.
See ADR 0292 for the bounded density and contrast pilot.

After building source matrices, run `npm run validate:tokens:catalogue` to compare
the actual site resolver with every compiled matrix (including equivalent color
serialization). This requires the existing site TypeScript dependency.

## Public visual coverage

ADR 0293 expands Input's source API with independent `labelGap` and `messageGap`,
`borderWidth`, `focusRingWidth`, `focusRingOffset`, and `labelFontWeight`.
Existing radius, colors, typography, opacity and motion aliases remain public.
Input and Textarea Studio expose these decisions; Exhibit derives its control
inventory from the same contract and presentation metadata. A source token alone
is not evidence that a consumer can discover and edit the corresponding control.

## Fixed and adaptive spacing

ADR 0302 preserves fixed utility steps (`.p-8` = 32px everywhere) independently
from semantic indexes (`space.scale.8` = 40/40/64/64px across the viewport matrix).
Utilities consume existing dimension primitives; choose a named semantic role
for an adaptive layout decision. Neither vocabulary is a conversion of the other.

## Interoperability checkpoint

Audit finding 6 remains partially open. The current validators prove this
repository's supported source shape, references, selected modes and output
relationships; they do not prove strict DTCG conformance or round-trip support
in arbitrary tools. The source keeps string dimensions/durations/colors, CSS
font fallback stacks and repository-owned mode composition. A future export
must define its target profile, transform unsupported values, preserve identity
and aliases where possible, and pass that target's import/update checks before
claiming interoperability. The owner deferred that export work with Figma; the
canonical source format remains unchanged in this audit follow-up.
