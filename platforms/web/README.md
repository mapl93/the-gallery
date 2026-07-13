# The Gallery Web Target

This directory is the first neutral web target for The Gallery tokens and component adapter output.

Current outputs:

```text
platforms/web/tokens.css
platforms/web/components.css
platforms/web/index.css
platforms/web/theme.js
platforms/web/adapter.manifest.json
platforms/web/adapter.summary.json
```

## Tokens

`tokens.css` is generated from the DTCG-style source token matrices:

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

Each output block contains:

- Canonical The Gallery variables in the `--tg-*` namespace.
- Public compatibility aliases used by current component CSS, such as `--color-*`, `--typo-*`, `--space-*`, `--radius-*`, and `--shadow-*`.

The aliases are target compatibility, not canonical source. New token authoring should still happen in `tokens/source/`.

## Usage

Use the CSS file in any web target as the token foundation:

```html
<link rel="stylesheet" href="./tokens.css">
```

Default behavior:

- Light theme is the default `:root` output.
- Dark theme follows `prefers-color-scheme: dark` when no manual theme is set.
- `[data-theme="light"]` forces light tokens.
- `[data-theme="dark"]` forces dark tokens.

Responsive token overrides are emitted at:

```text
768px
1024px
1440px
```

## Commands

```sh
npm run build:tokens:web
npm run validate:tokens:web
npm run validate:tokens:web-components
```

`validate:tokens:web-components` checks that every public CSS custom property used by `components/css/` is defined by this web target. Component-private variables prefixed with `--_` are intentionally ignored.

This target is the first real consumer of `tokens/source/`. Shopify, Webflow, and Framer still use the legacy token build until this neutral web target proves stable enough to adapt.

## Component Adapter

The neutral web component adapter is generated from current source facts:

```text
registry.json
components/contracts/*.contract.json
components/css/*.css
components/js/theme.js
platforms/web/tokens.css
  -> scripts/build-web-adapter.js
  -> platforms/web/*
```

`components.css` concatenates the current hand-authored CSS adapter source from `components/css/index.css` import order.

`index.css` is the complete stylesheet entry:

```html
<link rel="stylesheet" href="./index.css">
```

`theme.js` is optional progressive enhancement:

```html
<script src="./theme.js" defer></script>
```

`adapter.manifest.json` maps every registry component to its contract, CSS source, docs page, selector, options, states, behavior, public tokens, and web adapter status.

`adapter.summary.json` is a lightweight manifest summary used by the docs site.

The current policy is:

- `components/css/` remains the hand-authored neutral web implementation.
- Component contracts validate and describe the adapter.
- Contracts do not generate component CSS yet.
- Consumer projects copy and own the generated web output locally.

## Adapter Commands

```sh
npm run build:adapter:web
npm run validate:adapter:web
```
