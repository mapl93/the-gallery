# Stat / Statistic Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/stat.contract.json` (`0.4.0`)

## Result

Stat remains passive, target-formatted metric content with value, label,
optional directional change, and independent Price-aligned OpenType switches.
The implementation now separates direction from sentiment, uses semantic type
pairs, wraps extreme content, and keeps Stat Group within its container.

## Semantics, API, And Content

- DOM reading order is value, label, optional change. No widget, live-region,
  Meter, or Progress semantics are added.
- Required empty value/label render empty instead of receiving fixture fallbacks,
  exposing invalid composition.
- `changeDirection=up|down` is mathematical direction only. Targets must keep the
  visible sign/word aligned with that direction and separately explain business
  meaning; Studio does not rewrite authored content.
- `ss01`, `tnum`, `calt`, and `frac` remain independent attributes with
  Price-aligned defaults. ADR 0277 fixes `zero` off and removes its public
  attribute. Unsupported enabled font features fail harmlessly.
- Targets own calculation, locale/currency/unit/percent formatting, comparison
  period, refresh cadence, and announcements. There is no controlled state.

## Typography And Responsive Content

Semantic tokens now resolve value to H2 `32/40px`, label to body `16/24px`, and
change to caption `12/16px`. The `4px` internal gap, centered alignment,
`700/600` weights, preferred `120px` group minimum, and private `55%` direction
mix remain composition.

At `390px`, the comparable before/after fixture produced:

| Measurement | Before | After |
| --- | ---: | ---: |
| Stat root client / scroll | `326 / 621px` | `326 / 326px` |
| Document scroll width | `653px` | `390px` |
| Value, label, change scroll | overflow | each equals `326px` client |

A `100px` host previously produced a `120px` grid track; it now resolves one
`100px` track with host/group client and scroll widths all equal to `100px`.

## Color, Forced Colors, And Evidence

Change text contrast against the rendered surface is:

| Theme | Up | Down |
| --- | ---: | ---: |
| Light | `6.05:1` | `8.05:1` |
| Dark | `12.03:1` | `10.03:1` |

Forced colors may collapse semantic hues to CanvasText, but the required visible
sign/word and retained `data-direction` prevent color-only meaning. Exhibit and
Studio initial markup is byte-identical (`350` tested bytes). Eight canonical
screenshots cover four viewports in both modes, with before/after and forced-
colors supplements.

## Runtime And Targets

Stat adds `0 B` JavaScript, listener, observer, timer, request, or asset.
Web/Shopify render already formatted strings and optional direction metadata.
React/Angular may choose generic or description-list markup; Figma and native
targets preserve hierarchy, direction wording, and target formatting without
copying web DOM.

## Human Review Input

Approve the centered hierarchy, type weights, `4px` gap, direction color mixes,
and `120px` preferred group minimum, or provide a Stat-specific visual reference.
No `stable` promotion is authorized.

Evidence lives under `output/playwright/refinement-batch-05/`; `site/dist` was
not rebuilt.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run validate:tokens:web-components`
- `npm run build:adapter:web:components`
- `npm run build:adapter:shopify:components`
- `npm run audit:refinement`
- `git diff --check`
