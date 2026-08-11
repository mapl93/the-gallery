# Progress Bar / Circle Neutral Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-07-20

Contract: `components/contracts/progress.contract.json` (`0.4.0`)

Decision: `docs/decisions/0234-progress-visible-and-accessible-value-separation.md`

## Result

ADR 0234 closes A22's remaining semantic/geometry conflict. Determinate Bar and
Circle now accept independent optional `displayValue` and `valueText` inputs:
the first is compact visible content; the second maps only to
`aria-valuetext`. There is no fallback, copying, truncation, scaling or derived
content between them.

The shared renderer also fails closed for an empty required name, missing
determinate value, invalid range and Circle+Indeterminate. The component is now
ready for human visual/stability review, but no `stable` promotion is
authorized.

## Semantic Matrix

| Case | Browser result |
| --- | --- |
| Default Bar | Named `progressbar`; `0..100`; now `65`; visible `65%`; accessible `65 percent complete`; fill `65%` |
| Accessible-only | Long `aria-valuetext` present; no `.progress__value` visible content |
| Display-only | Visible `65%`; no `aria-valuetext` |
| Neither optional value | Range/current and visual fill remain; no visible or accessible override text |
| Circle with localized description | `48 x 48px`; visible `72%`; full localized `aria-valuetext`; root/document overflow `0px` |
| Indeterminate | Bar selected; busy true; no now/value text/visible value/determinate inline width |
| Blank label | Zero rendered Progress roots |
| Missing determinate value | Zero rendered Progress roots |
| Equal range | Zero rendered Progress roots |
| Circle + Indeterminate | Zero rendered Progress roots |
| Value `-10` / `150` in `0..100` | Clamps to now/fill `0` / `100` |

Targets own range calculation, localized content, update cadence, busy-region
lifecycle, cancellation, errors and announcements. A22 is controlled and
read-only; user-controlled/uncontrolled state does not apply.

## Visual, Responsive And Accessibility Evidence

- Eight paired captures cover Exhibit and Studio at Mobile `390 x 844`, Tablet
  `768 x 1024`, Desktop `1280 x 800` and XL `1600 x 1000`.
- Additional captures cover Circle with long accessible text,
  Indeterminate/reduced motion, dark, forced colors, localized RTL at `320px`
  and 200% zoom.
- Initial Exhibit/Studio root markup is exactly equal at `414` characters.
- All tested Bar/Circle roots and documents report `0px` horizontal overflow.
- RTL resolves on the component and long operation labels wrap without
  truncation. At 200% zoom the component and document remain overflow-free.
- Forced colors preserves distinct system track/fill output. Existing canonical
  light/dark fill-to-track evidence remains `9.51:1` / `15.13:1`; this batch
  changed no CSS color formula.
- Reduced motion changes the Indeterminate fill animation name from
  `progress-indeterminate` to `none`.
- Progress exposes no focusable surface, interaction handler or live region.
  Passive keyboard interaction is correctly not applicable.
- The browser reported zero console errors and zero warnings.

Evidence directory:
`output/playwright/refinement-primitives/progress-0234/`.

## Before / After Evidence

The earlier visual correction remains preserved in
`output/playwright/refinement-batch-05/`. Its paired Mobile artifacts are:

- `progress-extreme-bar-mobile-before.png` and
  `progress-extreme-bar-mobile-after.png`;
- `progress-extreme-circle-mobile-before.png` and
  `progress-extreme-circle-mobile-after.png`.

Those pairs record the repaired long-content containment and Circle value
placement. The later ADR 0234 evidence directory records the final semantic
candidate: visible `displayValue` and accessible `valueText` are independent,
invalid compositions fail closed, and the already-corrected layout remains
contained. ADR 0234 added no CSS, so the relevant semantic before/after is the
contract/DOM split documented in the Result and Semantic Matrix above rather
than a fabricated visual delta.

## Runtime, DOM And Performance

- Canonical A22 CSS: `2,397 B` raw / `816 B` gzip; SHA-256
  `4adb4e5efe5b941b3dd48e3e865ee5b3986fb6e452a18ae6f416b0f4301430ef`.
- Primitives family: `10,538 B` gzip against `10,547 B`; `9 B` headroom.
- Semantic split CSS delta: `0 B`.
- Component-owned neutral JavaScript, assets, listeners, timers, observers,
  requests, storage and analytics: `0`.
- The docs renderer validates the target-independent contract but is not shipped
  as neutral component runtime.

## Cross-Target Result

- Neutral Web and Shopify adapters regenerate and validate across all `183`
  components.
- Free Shipping Bar consumes canonical Progress with localized `valueText` and
  no site-only `valueTextVisible` behavior.
- React/Angular targets should expose a controlled finite value or explicit
  Bar-only unknown state. Figma/native targets preserve the two shapes,
  known/unknown distinction and independent visible/accessibility content.
- `site/dist` was not rebuilt.

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run audit:previews:static`
- `./site/node_modules/.bin/tsc -p site/tsconfig.json --noEmit`
- `npm run build:adapter:web:components`
- `npm run build:adapter:shopify:components`
- Live Playwright semantic harness, paired viewport evidence and special modes
- `npm run evidence:cleanup`
- `npm run evidence:assert-clean`

## Human Review Remaining

Approve or revise Bar/Circle proportions, label hierarchy, track/fill treatment,
Circle stroke/cap, compact-value typography and real target-context appearance.
Automated readiness is not human stability approval; contract status remains
`pilot`.
