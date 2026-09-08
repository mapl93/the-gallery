# Component Dossier: Stat / Statistic

Status: `human-review-ready`

Target reviewed: Neutral Web passive metric presentation

Contract: `components/contracts/stat.contract.json`

## Recommendation

Retain ADR 0063's target-formatted value/label/change strings, explicit neutral/
up/down visual direction, and independent Price-aligned OpenType switches.
Contract language now separates mathematical direction from business sentiment;
semantic heading/body/caption tokens drive type; every part and Stat Group is
container-resilient; and the Studio-only root minimum width is removed.

## Purpose And Limits

- Presents one prominent, target-formatted metric with required label and
  optional directional comparison.
- Up/down describes mathematical movement only; target copy explains whether it
  is favorable, unfavorable, or neutral.
- It is passive content, not a live region, chart, Meter, table cell, KPI target,
  number formatter, trend calculator, or link.

## Current Gallery Result

- Registry `A24`, primitive, no dependencies; contract already `0.3.0`, `pilot`.
- DOM reading order is value, label, optional change. Required empty values render
  empty rather than receiving fixture fallbacks.
- Studio emits the four remaining OpenType attributes with Price-aligned
  defaults; canonical CSS fixes `zero` off under ADR 0277.
- Contract states now describe upward/downward movement, include class and
  `[data-direction]` selectors, and leave favorability to target content.
- Semantic type resolves to `32/40px` value, `16/24px` label, and `12/16px`
  change without fractional or hardcoded leading.
- At `390px`, extreme value/label/change all stay at `326px`; the document stays
  at `390px`.
- A `100px` Stat Group now resolves one `100px` track without overflow.
- Studio no longer forces a canonical root minimum width.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [ECMA-402 `Intl.NumberFormat`](https://tc39.es/ecma402/#numberformat-objects) | Locale, currency, unit, percent, notation, grouping, sign, rounding, and numbering-system formatting are target services. | Keep formatted strings as inputs; do not embed a web formatter in the primitive. |
| [WAI-ARIA Meter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/) | Meter is for a value inside a meaningful range; progress uses Progressbar. | A passive Stat must not receive range-widget semantics merely because it contains a number. |
| [HTML `dl`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element) | Description lists represent name/value groups. | Targets may map repeated semantic metrics to `dl/dt/dd`; Gallery's generic root preserves content order without mandating one DOM target. |
| ADR 0061 / OpenType feature registry | Feature switches are font capabilities and safely ignored when unsupported. | Retain independent attributes; do not make glyph appearance semantic. |

APG, Open UI, Radix, and current Polaris do not define a standalone Stat widget;
this remains passive content composition rather than an interaction pattern.

## Anatomy, API, And Ownership

- Required root, value, label; optional change; optional layout-only Stat Group.
- Properties: required formatted `value`/`label`, optional formatted `change`,
  explicit direction, and four independent typography switches.
- No controlled/uncontrolled state. Targets own calculation, formatting,
  comparison period, business meaning, refresh cadence, and announcements.

## Tokens, Runtime, And Content

- Public: primary/secondary and feedback colors, grid gap, body family, H2/body
  size. Existing H2/body/caption line heights and caption size can replace
  hardcoded/fractional values.
- `4px` internal gap, centered alignment, weight 700/600, `120px` group target,
  and `55%` direction mix remain private composition.
- CSS/HTML-only: zero component JS, observers, timers, assets, or requests.

## Findings And Direction

| Finding | Severity | Direction |
| --- | --- | --- |
| Extreme strings overflowed root/page. | resolved | Every textual part wraps within the root. |
| `120px` grid minimum overflowed smaller containers. | resolved | Minimum is capped by available inline size. |
| Contract equated up/down with good/bad. | resolved | States describe mathematical direction only. |
| Typography used hardcoded/fractional values. | resolved | H2/body/caption semantic pairs drive type. |
| Studio forced a root minimum width. | resolved | Override removed; stage owns available space. |
| Direction color must not be the only cue. | content requirement | Preserve explicit sign/word guidance and measure contrast. |

## Cross-Target Translation

Web/Shopify render target-formatted strings and optional direction metadata.
Framework targets may use generic containers or semantic description-list markup.
Figma maps content and direction visuals; native targets use formatted text and
platform accessibility grouping. No target derives business sentiment from sign.

## Readiness Decision

Ready for human review; remains `pilot`. Semantic wording, target formatting,
OpenType switches, content/grid resilience, contrast, forced colors, four
viewports, byte-identical parity, and adapters pass. Human review must approve
the centered hierarchy, weights, spacing, direction colors, and preferred group
minimum before any `stable` promotion.
