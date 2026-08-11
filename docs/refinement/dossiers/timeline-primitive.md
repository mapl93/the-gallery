# Component Dossier: Timeline

Status: `human-review-ready`

Target reviewed: Neutral Web ordered timeline primitive

Contract: `components/contracts/timeline-primitive.contract.json`

## Recommendation

Retain ordered-list chronology and per-entry semantic status from ADRs 0065 and
0066. Use logical inline geometry, semantic body/caption type, readable metadata,
contrast-strengthened visible status words, and bounded content. Keep marker
color supplemental and let each target choose the appropriate title heading
level.

## Purpose And Limits

- Presents chronological or sequential entries whose order carries meaning.
- Supports default, current, completed, delayed, warning, and error on each entry.
- It is not a stepper for task completion, activity live region, process engine,
  date formatter, scheduler, state machine, or target data model.
- Only `current` maps to `aria-current="step"`, at most once when the sequence
  represents current progress.

## Current Gallery Result

- Registry `A27`, primitive, no dependencies; contract remains `0.3.0`, `pilot`.
- Ordered root/item, optional metadata/date/status/content, required title, and
  generated marker/connector anatomy remain intact.
- The selected Studio entry status is fixture state; consumers own every entry.
- Caption/body semantic type resolves date/status to `12/16px` and title/content
  to `16/24px`.
- At `390px`, RTL + an unbroken extreme description keeps root, item, and content
  at `326`, `302`, and `282px`; the document remains `390px` instead of the prior
  `816px` timeline scroll width.
- RTL moves marker and connector to logical end (`right: -24/-20px`) rather than
  retaining the physical left rail.
- Date contrast is `7.81:1` light and `12.09:1` dark. Status contrast ranges from
  `5.34:1` to `17.93:1` light and `10.03:1` to `17.18:1` dark.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML ordered-list standard](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element) | Ordered lists represent intentionally ordered items. | Preserve `ol`/`li` when chronology or sequence matters. |
| [WAI-ARIA `aria-current`](https://www.w3.org/TR/wai-aria-1.2/#aria-current) | `step` identifies the current item in a process; one element in a set should be current. | Map only the current entry and never use status color as the current-state API. |
| [WCAG technique ARIA26](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA26) | Programmatic current-item identification supplements visible context. | Keep `aria-current="step"` synchronized with the single visible Current label. |
| [Shopify Ordered List](https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/ordered-list) | Order/sequence is the deciding semantic boundary and list items are direct content. | Keep target data in ordered items rather than inventing timeline widget roles. |
| [Open UI List research](https://open-ui.org/components/list.research/) | List primitives cover ordered content but do not standardize timeline markers or operational statuses. | Treat rail and status visuals as Gallery presentation over native list semantics. |

Radix and Polaris do not provide a standalone cross-target Timeline primitive
with a stronger interaction consensus. Their absence supports a passive ordered
composition rather than a new widget role.

## Anatomy, States, API, And Ownership

- Required ordered root, repeated item, and title; optional metadata, date,
  visible status, and description; generated marker and connector.
- One per-entry `status` enum: default/current/completed/delayed/warning/error.
- Status is neither root state nor controlled collection state. Targets own entry
  arrays, time/date formatting, localization, current selection, live updates,
  and the document-appropriate title element.
- Visible words communicate semantic outcomes; marker color and delayed outline
  supplement them.

## Tokens, Runtime, And Content

- Public tokens: border/surface/primary, primary/secondary text, global semantic
  feedback colors, full radius, and body/caption type pairs.
- `24px` root inset, `20/24px` item geometry, `10px` marker, `2px` connector/ring,
  gaps, weights, and the `55%` feedback/text mix remain private composition.
- No Timeline-specific token or status formatter was added.
- CSS/HTML-only: `0 B` component JS and no listener, observer, timer, request,
  asset, or animation.

## Findings And Direction

| Finding | Severity | Direction |
| --- | --- | --- |
| Physical left rail failed RTL. | resolved | Logical inline padding and inset properties. |
| Extreme content expanded the component scroll width to `816px`. | resolved | Bounded parts and anywhere wrapping. |
| Date used a disabled-control text token. | resolved | Readable semantic secondary text. |
| Metadata type used fractional `calc()`. | resolved | Caption size/line-height pair. |
| Raw warning/success status text could miss normal-text contrast. | resolved | Private feedback/primary text mix; marker keeps semantic hue. |
| Forced colors could erase semantic hues. | resolved | Filled/outlined system-color markers plus authoritative visible words. |
| Fixed `h4` could conflict with consumer hierarchy. | ownership clarified | Class owns style; target chooses the semantic heading level. |

## Cross-Target Translation

Web and Shopify use ordered items, per-entry data status, visible localized text,
and at most one current-step attribute. React/Angular control entry data without
adding a second collection state. Figma maps rail, marker, metadata, title,
content, and six states. SwiftUI/Compose use ordered accessible groups, platform
current semantics, logical RTL placement, and visible state text.

## Readiness Decision

Ready for human review; remains `pilot`. Order, current-step semantics, all six
states, visible non-color cues, logical RTL, semantic type, contrast, forced
colors, extreme content, four viewports, byte-identical parity, and adapters
pass. Human review must approve rail geometry, marker/ring treatments, status
color mixes, vertical spacing, and title hierarchy before `stable` promotion.
