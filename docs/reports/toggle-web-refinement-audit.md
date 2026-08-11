# Toggle / Toggle Group Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/toggle.contract.json` (`0.3.0`)

## Result

Toggle retains the accepted ADR 0062 exclusive pressed-button model: a named
`role="group"`, target-owned native buttons, exactly one boolean
`aria-pressed="true"`, normal Tab order, and no captured arrow keys. The neutral
web enhancement remains uncontrolled after authored initialization. The source
now removes decorative transitions for reduced motion, lets extreme item labels
wrap inside the container, and exposes an empty required group name instead of
inventing one in Studio.

## State, Ownership, And Keyboard

- Space on Option 2 and pointer activation on Option 3 each left one
  `aria-pressed="true"` item and one matching `.toggle--active` item.
- The native click still bubbled exactly once through the group.
- Native disabled suppressed further activation.
- Starting on Option 1, ArrowRight left focus on Option 1; Tab advanced to
  Option 2. This is intentionally not a Toolbar, radio group, or roving-focus
  Radix Toggle Group.
- Clearing `groupLabel` rendered `aria-label=""`; the previous `View mode`
  fallback no longer masks invalid composition.
- The public group API remains only `groupLabel` and whole-group `disabled`.
  Item labels, values, initial selection, effects, persistence, and analytics
  stay target-owned.

The progressive enhancer also passed adversarial initialization:

| Authored state | Normalized result |
| --- | --- |
| Two items pressed | First authored pressed item retained; one pressed total |
| No item pressed, first disabled | First enabled item selected; one pressed total |
| Enhancement called twice | One dataset marker; later click emitted once and selected one item |

Framework adapters may instead control the selected value, but must update every
item atomically and retain the same exclusive state invariant.

## Responsive Content Before/After

At a `390px` viewport, the Studio stage supplied a `326px` group width:

| Measurement | Before | After |
| --- | ---: | ---: |
| Group `scrollWidth` | `436px` | `326px` |
| Document `scrollWidth` | `468px` | `390px` |
| Extreme child width | intrinsic overflow | `104px` client / `104px` scroll |
| Extreme child height | single overflowing line | `168px` wrapped content |

The height is a deliberate last-resort representation of three indivisible
labels, not a recommended copy length. No stacking, truncation, item-count, or
responsive-layout API was inferred.

Evidence: `toggle-extreme-mobile-before.png` and
`toggle-extreme-mobile-after.png`.

## Motion, Focus, And Contrast

With `prefers-reduced-motion: reduce`, transition property resolves to `none`
and duration to `0s`. Forced colors retains the existing visible outer focus
outline and, after the E5 dependency pass on 2026-07-18, gives the pressed item
a separate inset `ButtonText` boundary so selection does not depend on a forced
background fill.

Rendered text contrast against each item surface:

| Theme | Selected | Unselected |
| --- | ---: | ---: |
| Light | `10.37:1` | `7.81:1` |
| Dark | `5.50:1` | `8.84:1` |

The subtle unselected border measures `1.26:1` against the light surface and
`3.12:1` in dark. Text, spacing, and the selected fill still distinguish the
controls, so no stronger aesthetic border was inferred; its light-theme weight
is retained as a human visual-review item.

## Exhibit And Studio Parity

Exhibit and Studio render byte-identical root markup (`375` bytes in the tested
fixture), including the same three options, classes, pressed attributes, group
name, and enhancement marker. Eight canonical screenshots cover Mobile
`390 x 844`, Tablet `768 x 1024`, Desktop `1280 x 800`, and XL
`1600 x 1000` in both modes. Extreme content and forced-colors keyboard focus
supplement the matrix under `output/playwright/refinement-batch-04/`.

## Tokens, Runtime, And Targets

- Public tokens remain selected/default/hover/focus colors, medium radius,
  fast/default motion, body size/family, and disabled opacity.
- `6px 12px` padding, `6px` internal gap, `36px` minimum height, and `4px`
  group gap remain private composition.
- The shared enhancer uses one delegated group listener and O(item count) work
  only on selection. It adds no observer, timer, asset, request, or continuous
  work of its own; the existing shared document observer discovers inserted
  Gallery controls.
- Web and Shopify share native buttons and progressive enhancement. React and
  Angular may expose controlled/uncontrolled value ownership; Figma and native
  mappings preserve exclusive selection without copying DOM mechanics.

## Human Review Input

Approve the repository render or provide a Toggle-specific reference for border
weight, selected fill, radius, gaps, and the accepted extreme-label wrapping.
Recommended: keep the normal-button keyboard model fixed by ADR 0062 and reserve
radio/roving-focus or multi-selection for separately specified components. A
stronger light unselected border is an available visual alternative, not an
automatic accessibility correction.

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
