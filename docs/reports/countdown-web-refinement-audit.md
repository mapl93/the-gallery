# Countdown Web Refinement Audit

Status: `human-review-ready`

Component: G7 Countdown (`countdown`, review order `90`)

Date: 2026-07-20

## Outcome

The owner-selected `G7-B` architecture is implemented in canonical source.
Countdown now accepts one absolute zoned deadline, calculates real localized
remaining time through one shared visibility-aware scheduler, retains configured
units at zero, exposes derived state, and emits one expiry transition event.
Commercial reactions remain target-owned.

The old fixed `role=timer` fixture and free-form segment API were removed.
Exhibit and Studio now consume the same `CountdownArtwork`, fixture and neutral
enhancer. Final browser evidence passes; the contract remains `pilot` because
human visual review is still pending.

## Rubric

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One truthful absolute deadline; no urgency, campaign or commercial effects. |
| Anatomy | pass | Native time, fallback, display, stable items, value/unit, separator and optional status. |
| States | pass | Derived Running, Expired and invalid fallback; no false Paused mode. |
| Variants/units | pass | Default, Inline, Cards and every non-empty canonical-order unit subset. |
| Public API | pass | Five semantic inputs; derived values/state/event are outputs. |
| State ownership | pass | Neutral deadline runtime is sole calculation owner; targets observe rather than duplicate. |
| Tokens/CSS | pass | Semantic tokens, private composition vars, logical intrinsic wrapping, no viewport branch. |
| Accessibility | pass | Genuine timer only, one localized name, quiet ticks, optional one-shot expiry announcement, invalid fallback and forced-colors evidence. |
| Runtime/cleanup | pass | One shared timeout, hidden suspension, visible deadline recomputation, expiry once, disconnected-root pruning, no layout reads. |
| Target translation | pass as documented | Web implemented; Shopify/future surfaces truthful and explicitly planned. |
| Exhibit/Studio parity | pass | Same `CountdownArtwork`, fixture and normalized countdown DOM (`1,417` characters each). |
| Responsive/content evidence | pass | Eight-view matrix, compact/expired/invalid states, dark/forced colors, RTL/reduced motion and effective 200% text. |
| Human review | pending | Candidate stays pilot. |

## Source Reconciliation

- `components/contracts/countdown.contract.json` -> `0.3.0`, five-property
  deadline API, derived lifecycle and implemented Web behavior.
- `registry.json` -> Countdown identity and real-runtime description.
- `components/css/marketing.css` -> intrinsic logical layout, localized labels,
  canonical tokens, stable item wrapping and forced-color Cards.
- `components/js/theme.js` -> absolute validation, locale formatters, one shared
  scheduler, visibility recovery, state and `countdownexpire`.
- `site/src/components/studio/CountdownArtwork.tsx` -> shared renderer/fixture.
- `site/src/components/studio/MarketingStudio.tsx` -> semantic Deadline, Units,
  Variant, Fallback and Expired Announcement values.
- `site/src/content/studio/countdown.studio.json` -> matching inspector controls.
- `site/src/content/components/countdown.mdx` -> truthful runtime, API,
  accessibility and target documentation.
- ADR 0225 supersedes ADR 0169's open source-model choice.

## Certified Runtime Assertions

1. Future zoned deadline renders Running and changes only at the smallest selected
   unit boundary.
2. Past deadline renders every selected unit as zero with Expired state.
3. Running-to-Expired emits exactly one `countdownexpire`; repeated renders do
   not re-emit.
4. Empty optional announcement stays quiet; supplied copy enters the polite node
   once.
5. Floating, date-only, malformed and impossible deadlines retain fallback and
   never receive `role=timer`.
6. Hours/Minutes and Minutes/Seconds presets hide only unselected items, keep
   order and preserve accumulated first-unit values.
7. Hidden document owns no timeout; recovery recomputes from current time.
8. Multiple roots share one scheduler and removal leaves no recurring work.

## Browser Evidence

Artifacts: `output/playwright/refinement-marketing/countdown-0225/`.

- Final matrix: `exhibit-{mobile,tablet,desktop,xl}.png` and
  `studio-{mobile,tablet,desktop,xl}.png`.
- State/content: `studio-hours-minutes.png`, `studio-expired.png` and
  `studio-invalid.png`.
- Special modes: `studio-dark.png`, `studio-forced-colors.png`,
  `studio-rtl-reduced-motion.png` and `studio-text-200.png`.
- Baseline/correction: `exhibit-desktop-artwork.png` retains the pre-fix Cards
  separator defect; the final matrix records the correction.

Automated browser assertions proved Running, Expired, invalid and past states;
one and only one expiry event; zero retention; compact-unit accumulation;
hidden suspension and current-clock recovery. Both surfaces fit their host and
the document at `390`, `768`, `1,440` and `1,920` CSS pixels. The final console
reported `0` errors and `0` warnings. The evidence lifecycle finished with port
`4173` free, the managed server stopped and `gallery-refinement` closed.

## Performance Snapshot

| Surface | Current | Fixed ceiling | Result |
| --- | ---: | ---: | --- |
| Shared runtime | `15,448 B` gzip | `8,192 B` | documented program gap; +2,370 B for accepted deadline runtime |
| Marketing CSS | `5,073 B` gzip | `4,198 B` | documented program gap; +143 B |
| Per-instance scheduler | none | one shared scheduler | pass |
| Hidden-document scheduler | none | none | pass |
| Per-tick layout reads/network/assets | none | none | pass |

Ceilings were not raised. ADR 0225 records the accepted runtime responsibility
and the remaining distribution/code-splitting risk.

## Remaining Human Review

- Approve or revise Default, Inline and Cards appearance.
- Review value/label typography, separators, density, surfaces and zero state.
- Review all-four and compact unit presets across Mobile, Tablet, Desktop and XL.
- Review long day counts, localized/RTL text, forced colors and narrow wrapping.
- Select a first truthful Shopify configuration/placement surface separately.

No `stable` promotion is authorized. `site/dist` must remain untouched.
