# Icon Button Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/icon-button.contract.json` (`0.3.0`)

## Result

Icon Button retains the accepted native icon-only action API: required
`accessibleLabel` and `icon`, Default/Filled, Small/Default/Large, independent
Round, and native disabled. Decorative transitions now stop under reduced motion,
and Studio no longer masks an empty required label. No toggle, menu, tooltip,
loading, navigation, or icon-catalogue API was added.

## Geometry And Composition

| Size | Target | Icon | WCAG 2.2 `24px` target |
| --- | ---: | ---: | --- |
| Small | `32 x 32px` | `16 x 16px` | pass |
| Default | `40 x 40px` | `20 x 20px` | pass |
| Large | `48 x 48px` | `24 x 24px` | pass |

Default/Filled, three sizes, and Round remain orthogonal. The icon is a required
decorative slot; Lucide Settings appears only in the Studio fixture and is not a
contract value or runtime dependency for consumers.

## Semantics, Interaction, And Motion

- The renderer emits a native `button type="button"` with the supplied action
  name and an `aria-hidden="true"` SVG.
- Enter and Space produced two native click events. After native `disabled`, the
  count remained two and focus left the unavailable control.
- Clearing the required label now renders `aria-label=""`; the former
  `Icon action` fallback is gone.
- With `prefers-reduced-motion: reduce`, computed transition duration is `0s`
  and transition property is `none`.
- Forced colors plus keyboard focus retains a `2px solid` outline with `2px`
  offset.

## Contrast

Measured icon color against the effective target surface:

| Theme | Default rest | Default hover | Filled rest | Filled hover |
| --- | ---: | ---: | ---: | ---: |
| Light | `7.81:1` | `16.44:1` | `16.44:1` | `14.23:1` |
| Dark | `12.09:1` | `14.50:1` | `14.50:1` | `9.93:1` |

All measured states exceed the `3:1` non-text contrast threshold. Disabled is an
intentionally unavailable native state and remains tokenized through
`--opacity-disabled`.

## Exhibit And Studio Parity

Both modes render byte-identical root markup, including the same Settings fixture,
classes, accessible name, and decorative SVG. Eight canonical screenshots cover
the four required viewports in both modes. Supplemental evidence covers
Filled + Round + Large in dark hover, Small disabled, and forced-colors keyboard
focus with reduced motion under `output/playwright/refinement-batch-03/`.

## Tokens, Runtime, And Targets

- Public tokens remain the accepted text/surface/border colors, medium/full
  radii, fast transition, default easing, and disabled opacity.
- `32/40/48px` targets and `16/20/24px` icons remain private geometry rather
  than arbitrary public number controls.
- Component JS, requests, observers, timers, and owned assets: zero.
- Primitives CSS: `9,414 B` gzip; neutral component CSS: `56,615 B` gzip. Both
  pass the v1 ceilings.
- Web and Shopify use native buttons and copied CSS. Framework and native-app
  adapters must retain the semantic name and consumer-owned icon slot; Figma
  remains a planned target, not a source.

## Human Review Input

Approve the repository render or provide an Icon Button-specific reference for
stroke weight, default/filled surfaces, radii, state colors, and size ratios.
The component has native active behavior but no separate active visual treatment.
Recommended: review the current response first; alternatively accept one shared
compact-action active treatment in a future aesthetic decision.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify:components`
- `npm run audit:components`
- `npm run audit:refinement`
- `git diff --check`

`site/dist` was not rebuilt.
