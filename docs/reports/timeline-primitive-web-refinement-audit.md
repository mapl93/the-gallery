# Timeline Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/timeline-primitive.contract.json` (`0.3.0`)

## Result

Timeline remains an ordered passive composition with per-entry state. It now
mirrors its rail through logical properties, contains extreme localized content,
uses semantic body/caption type, replaces disabled metadata color, strengthens
status-text contrast, and preserves visible status meaning in forced colors.

## Semantics, API, And States

- Native `ol`/`li` order is retained. Only one current entry receives
  `aria-current="step"` when the sequence represents progress.
- `status=default|current|completed|delayed|warning|error` belongs to one entry.
- Completed/delayed/warning/error require localized visible status text when the
  meaning matters; marker color is supplemental.
- Targets own entry arrays, dates, localization, live updates, current selection,
  and the title element appropriate to the surrounding heading hierarchy.

## Responsive, RTL, Type, And Contrast

At `390px`, RTL + unbroken content changed timeline scroll width from `816px` to
the `326px` root. Item/content stay `302/302px` and `282/282px`; the document stays
`390px`. Marker/connector move to logical end at `right: -24px/-20px`.

Type resolves to `12/16px` metadata and `16/24px` title/content. Measured contrast
against the rendered surface is:

| Theme | Date | Current | Completed | Delayed/Warning | Error |
| --- | ---: | ---: | ---: | ---: | ---: |
| Light | `7.81:1` | `17.93:1` | `6.05:1` | `5.34:1` | `8.05:1` |
| Dark | `12.09:1` | `17.18:1` | `12.03:1` | `13.15:1` | `10.03:1` |

Forced colors use system filled markers for current/completed/warning/error,
outlined markers for default/delayed, CanvasText connectors, and CanvasText
status words. The visible word remains authoritative when hues collapse.

## Evidence, Runtime, And Targets

- Exhibit/Studio initial root HTML is byte-identical: `840` tested characters.
- Eight canonical screenshots cover four viewports in both modes.
- Supplemental evidence covers baseline and repaired RTL/extreme content plus
  delayed forced-colors structure.
- Adds `0 B` component JS, animation, listener, observer, timer, request, asset,
  or formatter.
- Web/Shopify preserve ordered/current/status semantics; framework, Figma, and
  native targets translate rail and status presentation without copying web DOM.

## Human Review Input

Approve marker/ring/connector geometry, semantic status mixes, vertical spacing,
metadata hierarchy, and the current visual treatment. No `stable` promotion is
authorized.

Evidence lives under `output/playwright/refinement-batch-06/`; `site/dist` was not
rebuilt.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run validate:tokens:web-components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run audit:refinement`
- `git diff --check`
