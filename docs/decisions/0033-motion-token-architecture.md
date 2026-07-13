# 0033. Motion Token Architecture

Status: Accepted Initial Implementation

Date: 2026-05-25

## Context

Animation and transition values affect every adapter. Web can express them as CSS variables, Shopify consumes them through theme assets, Figma needs equivalent variable/export data, and native targets need duration and easing translated into platform-native APIs.

The repo already had primitive duration and easing values, plus compatibility aliases such as `--transition-base` and `--easing-out`. That was enough for current CSS, but not enough to make motion a stable source contract for adapters.

Official DTCG 2025.10 defines `transition` as a composite token with `duration`, `delay`, and `timingFunction`. Style Dictionary v4 supports DTCG-style token authoring and can transform `transition` composite values to CSS when duration values are authored as strings with units.

## Decision

Motion is now a first-class token family in `tokens/source/`.

Primitive motion values live in:

```text
tokens/source/primitives/motion.tokens.json
```

Semantic motion roles live in:

```text
tokens/source/semantics/motion.tokens.json
```

The semantic layer exposes:

```text
motion.duration.instant
motion.duration.micro
motion.duration.standard
motion.duration.moderate
motion.duration.emphasis

motion.curve.linear
motion.curve.standard
motion.curve.enter
motion.curve.exit
motion.curve.emphasis

motion.transition.instant
motion.transition.micro
motion.transition.standard
motion.transition.disclosure
motion.transition.overlay-enter
motion.transition.overlay-exit
motion.transition.feedback
motion.transition.media
motion.transition.emphasis
motion.transition.continuous

motion.opacity.hidden
motion.opacity.subtle
motion.opacity.disabled
motion.opacity.scrim
motion.opacity.visible
```

`motion.transition.*` tokens use `$type: "transition"` and a `$value` object containing `duration`, `delay`, and `timingFunction`.

The neutral web target emits canonical source-derived custom properties, such as:

```text
--tg-motion-transition-feedback
--tg-motion-duration-standard
--tg-motion-curve-enter
```

It also emits public web aliases:

```text
--motion-transition-feedback
--motion-duration-standard
--motion-curve-enter
```

Existing component CSS may continue using compatibility aliases:

```text
--transition-base
--transition-fast
--transition-slow
--easing-default
--easing-in
--easing-out
--opacity-overlay
```

New adapter work should prefer the semantic source paths or the `--motion-*` aliases. Compatibility aliases should remain until current CSS and contracts are migrated.

## Library Decision

Do not build the token translation engine from scratch.

The Gallery should continue using Style Dictionary for token transforms because it already exists in the repo, supports DTCG-style source input, supports composite `transition` output for CSS, and is designed to export design tokens to many platform targets.

The Gallery owns:

- Token taxonomy.
- Semantic naming.
- Adapter policy.
- Validation.
- Target-specific wrapper decisions.

Style Dictionary owns:

- Token parsing and merging.
- Reference resolution.
- Built-in transforms.
- CSS output.
- Future custom transforms for native, Figma, and non-CSS targets.

## Compatibility Note

The DTCG 2025.10 spec models duration values as structured objects. The current Style Dictionary pipeline in this repo transforms string duration values such as `200ms` correctly, but emits `[object Object]` for structured duration objects with the current config.

For now, The Gallery keeps duration tokens as strings with explicit units. Moving to stricter duration objects requires a dedicated transform update and output parity checks.

## Validation

Motion is validated by:

```sh
npm run validate:tokens:source
npm run validate:tokens:motion
```

`validate:tokens:source` validates DTCG-style syntax and transition object shape.

`validate:tokens:motion` verifies required primitive motion tokens, semantic motion tokens, transition composites, and web aliases.

`npm run build:tokens:web` now runs the motion validation after generating `platforms/web/tokens.css`.

## Consequences

- Motion can now be translated by adapters from explicit semantic source paths.
- Web and Shopify receive the same generated motion aliases through the existing neutral web and Shopify wrapper flow.
- Existing CSS keeps working through compatibility aliases.
- Future CSS work can migrate from `--transition-*` and `--easing-*` toward `--motion-*`.
- Native adapters can map `motion.duration.*`, `motion.curve.*`, and `motion.transition.*` into SwiftUI, UIKit, Jetpack Compose, or Android animation APIs.

## Related Decisions

- Token source architecture: `docs/decisions/0007-token-source-architecture.md`
- Token source compiler: `docs/decisions/0008-token-source-compiler.md`
- Neutral web token target: `docs/decisions/0010-neutral-web-token-target.md`
- Target adapter token wrappers: `docs/decisions/0012-target-adapter-token-wrappers.md`
