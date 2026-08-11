# G7 Countdown Refinement Dossier

Status: `human-review-ready`

Date: 2026-07-20

Target reviewed: Neutral Web, shared Exhibit/Studio renderer, Shopify and future
adapter boundaries

Contract: `components/contracts/countdown.contract.json`

## Recommendation And Accepted Direction

Implement Countdown as a real absolute-deadline counter, matching the owner's
accepted `G7-B` direction in `docs/refinement/owner-decision-responses.md`.
Require an unambiguous ISO date-time with `Z` or a numeric offset; compute every
projection from the current clock; retain selected units at zero; expose derived
`running | expired`; and emit one expiry transition event. Keep the component
visible by default and leave every commercial consequence to the consuming
target.

This replaces the pre-decision static fixture and supersedes ADR 0169's
controlled-projection recommendation through ADR 0225.

## Purpose, Uses And Limits

Countdown communicates the remaining duration until one truthful future point.
Appropriate uses include an announced launch, submission deadline, registration
close, reservation window or offer end when the target owns a real global date.

Countdown owns:

- absolute-deadline validation and remaining-time calculation;
- stable selected-unit projection and locale formatting;
- efficient scheduling, hidden-document suspension and recovery;
- the Running-to-Expired transition, retained zero and one expiry event; and
- visual Default, Inline and Cards presentations.

Countdown does not own:

- campaign eligibility, personalization, recurrence or per-visitor resets;
- price, inventory, purchase, launch, routing or content replacement effects;
- backend clock authority, server synchronization, persistence or analytics;
- surrounding time-limit controls or task policy; or
- React, Shopify, Figma, SwiftUI or Compose-specific types.

## Research Summary

### Web and accessibility standards

- [WAI-ARIA `timer`](https://www.w3.org/TR/wai-aria-1.2/#timer) describes a
  changing elapsed/remaining counter and has implicit `aria-live=off`. The old
  fixed `role=timer` preview was therefore false semantics.
- [HTML `time`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element)
  preserves a machine-readable global date-time but does not calculate or tick.
- [WCAG Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
  constrains auto-updating information. Quiet timer updates and a bounded
  scheduler avoid continuous announcements; contexts imposing task limits still
  need target policy.
- [WCAG Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html)
  applies when content imposes a user time limit. Countdown cannot infer an
  exception or add task controls without knowing the product context.

### Mature systems and references

Open UI, Radix and Polaris do not provide one generic Countdown primitive that
settles deadline authority, expiry reactions and cross-target scheduling. Their
absence supports a small standards-based contract rather than copying a vendor
API. Shopify's [Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements)
reject fake countdown/urgency patterns; the adapter must receive truthful target
data.

### Owner direction and visual source

No new Countdown-specific owner image was supplied. Existing repository Default,
Inline and Cards treatments remain the visual candidates, with corrections for
localization, intrinsic wrapping, passive sizing and canonical tokens. Human
review must still approve them.

## Baseline Contradictions

- Static `02 / 14 / 38` content claimed `role=timer` without updating.
- Exhibit and Studio hardcoded parallel English timer labels and omitted seconds
  despite registry copy promising all four units.
- Contract exposed a free-form segment slot rather than a deadline.
- Time zone, cadence, drift recovery, visibility lifecycle and expiry were absent.
- Expiry state and consumer notification did not exist.
- All visual segments were hidden while one hardcoded English `aria-label` was
  the only accessible value.
- Physical pixels, uppercase derived typography, viewport media query and a
  passive touch-target minimum limited localization and container response.
- Shopify copied CSS without any truthful data/runtime surface.

## Anatomy

| Part | Required | Responsibility |
| --- | --- | --- |
| `time.countdown` | yes | Absolute `datetime`, enhancement marker, derived role/name/state |
| `.countdown__fallback` | yes | Localized static useful deadline statement |
| `.countdown__display` | yes | Visual collection hidden until valid enhancement |
| `.countdown__item` | one per canonical unit | Stable wrapping boundary and optional separator |
| `.countdown__segment` | yes per item | Visual value/unit grouping |
| `.countdown__number` | yes per item | Runtime-formatted tabular value |
| `.countdown__label` | yes per item | Runtime-formatted localized unit |
| `.countdown__separator` | optional | Decorative separator hidden for first selected unit |
| `.countdown__announcement` | optional | One-shot polite expiry phrase when supplied |

The authored DOM contains all four unit items. Runtime selection hides
unselected items without deleting/reordering selected anatomy, so a running
counter does not jump when values reach zero.

## State, Variants, Units And Modes

### Derived states

| State | Meaning | Rendering |
| --- | --- | --- |
| Running | Valid deadline is in the future | Current localized values; `role=timer` |
| Expired | Deadline reached or passed | Selected units retained at zero; one transition event |
| Invalid | Missing, malformed, floating or impossible deadline | Ordinary fallback; no timer role |

Expired is an output, not a consumer-set mode. There is no paused state: the
document may suspend work while hidden, but on return it recomputes the real
current value rather than presenting a paused deadline.

### Presentations

- Default: open vertical value/unit pairs.
- Inline: compact value/unit pairs for Announcement Bar and constrained hosts.
- Cards: padded unit surfaces.

### Unit selection

`units` is a validated non-empty canonical-order preset over Days, Hours,
Minutes and Seconds. All four are default. Every non-empty ordered subset is
representable without arbitrary booleans or an invalid all-off state. When a
higher unit is omitted, the first selected unit carries the accumulated amount
(for example Hours may exceed 23).

## Public API And Output

| Input | Requirement | Boundary |
| --- | --- | --- |
| `variant` | optional, default Default | Presentation only |
| `deadline` | required | Absolute ISO date-time with `Z` or numeric offset |
| `units` | optional, all four default | Validated non-empty ordered selection |
| `fallbackText` | required | Localized no-script/invalid text |
| `expiredAnnouncement` | optional | Neutral one-shot localized phrase; empty means silent |

Outputs:

- `data-countdown-state="running|expired|invalid"`;
- current localized unit values and complete accessible phrase; and
- one bubbling `countdownexpire` event for each genuine Running-to-Expired
  transition, with normalized deadline and `state: "expired"`.

The event does not imply that a target must hide, replace or navigate. React and
other controlled adapters may observe the output, but they must not run a second
countdown store beside the neutral deadline owner.

## Runtime Architecture And Cleanup

`components/js/theme.js` owns one Map of connected instances and one shared
timeout. For each render:

1. parse and validate the absolute deadline;
2. calculate `max(0, deadline - Date.now())`;
3. round to the smallest selected unit boundary;
4. derive every selected unit from that value;
5. update text, labels, name and derived state without layout reads; and
6. schedule one global timeout at the nearest next boundary across all roots.

`visibilitychange` removes the timeout while hidden. Visible recovery,
`pageshow`, and window focus recompute from the deadline. Mutation enhancement
handles new/updated roots and prunes disconnected entries. There is no
per-instance interval, observer or event-listener set.

## Token And CSS Audit

Public decisions remain limited to established color, type, radius and spacing
tokens. Component-private `--_countdown-gap` and `--_countdown-item-gap` own
composition. No component token layer was added.

Corrections:

- physical gaps/padding moved to semantic spacing calculations;
- weight, caption size/line-height and H2 line-height use tokens;
- `min-inline-size` uses private `ch` alignment rather than a touch-target token;
- uppercase/letter-spacing assumptions were removed for localization;
- logical properties and intrinsic wrapping replace the viewport media query;
- forced-colors Cards receive a visible system border; and
- no animation or reduced-motion branch is required.

Private values such as `4ch`, `6ch`, numeric formatting width and the one-pixel
status clipping technique are internal composition/accessibility mechanics, not
public API candidates.

## Accessibility

- Valid enhancement applies `role=timer`; static fallback does not.
- The runtime generates one complete locale-formatted name through
  `Intl.NumberFormat` and `Intl.ListFormat`.
- Visual segments remain `aria-hidden` to avoid duplicate verbose output.
- Normal updates use timer's implicit `aria-live=off` and never announce each
  second.
- Optional supplied completion copy is announced once; absent copy is silent.
- Root is passive and never focusable. No keyboard model, focus move, redirect
  or unexpected context change is added.
- Values never become negative and selected zeroes remain visible.

## Responsive And Content Evidence

Final browser evidence is stored under
`output/playwright/refinement-marketing/countdown-0225/` and covers:

- Mobile, Tablet, Desktop and XL in Exhibit and Studio with the same
  `CountdownArtwork` renderer and fixture;
- all four units plus Hours/Minutes, Expired and invalid-fallback states;
- Cards in the shared fixture plus Default/Inline source assertions;
- a genuine Running-to-Expired transition, retained zero and exactly one
  `countdownexpire` event;
- past, floating and invalid deadlines, optional completion announcement and
  accumulated Hours when Days is omitted;
- hidden-document suspension and visible recomputation from the current clock;
- RTL with reduced motion, effective 200% text, dark mode and forced colors;
- exact normalized Exhibit/Studio countdown DOM parity (`1,417` characters per
  surface) and one browser tab; and
- zero document/host overflow at `390`, `768`, `1,440` and `1,920` CSS pixels
  for both views, with zero browser-console errors.

The baseline artifact records the narrow Cards separator defect found during
evidence. Final captures show the corrected separator-free Cards treatment.
Typography, density and visual direction remain for human judgment.

## Performance

The accepted deadline runtime adds `2,370 B` deterministic gzip to shared
`theme.js` (`13,078 B` to `15,448 B`) and the final CSS correction adds `143 B`
to Marketing (`4,930 B` to `5,073 B`) after generated adapter reconciliation.
Fixed program ceilings remain unchanged and both gaps stay documented. CPU work
is bounded to one shared boundary timer, zero hidden-document timers and no
layout reads.

## Target Translation

| Target | Translation | Current status |
| --- | --- | --- |
| Neutral Web | Native `time`, canonical CSS and shared progressive enhancer | Human-review-ready candidate |
| Shopify storefront | Copy canonical CSS/runtime; later map a truthful merchant/global deadline through an explicitly selected theme surface | Planned; surface intentionally open |
| React / Angular | Thin prop/event adapter over the same deadline DOM contract | Planned |
| Webflow / Framer | Valid authored deadline plus copied enhancer where supported; otherwise static fallback | Planned |
| Figma | Static Running/Expired/Invalid and three visual presentations | Planned; no functional claim |
| SwiftUI / Compose | Native lifecycle timer preserving deadline, units, zero and expiry event boundary | Planned |

## Risks And Human Questions

- Final typography, density, separator, Cards surface and wrapping aesthetics
  require owner review.
- Shopify's first truthful configuration/placement surface is still an explicit
  target decision; no speculative section/block was added.
- Shared runtime and Marketing bundles remain over fixed budgets; distribution
  may need code splitting or further source reduction before v1 publication.
- A consumer imposing an actionable time limit must separately satisfy WCAG
  timing controls/exceptions; Countdown alone cannot certify that context.

## Certification Exit Criteria

- Contract, registry, CSS, runtime, Studio metadata, MDX and generated adapters
  validate around one deadline source.
- Exhibit and Studio use `CountdownArtwork` with the same fixture and runtime.
- Deterministic tests prove valid, invalid, rollover, expiry-once, zero, unit,
  visibility recovery and cleanup behavior.
- Four-viewport and special-mode evidence passes with zero console errors.
- Performance gaps remain measured and documented; resource cleanup passes.
- Owner reviews the candidate explicitly before any `stable` promotion.
