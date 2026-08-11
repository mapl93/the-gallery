# Consent Manager Web Refinement Audit

Status: `human-review-ready`

Component: G9 Consent Manager (`cookie-consent`, review order `92`)

Date: 2026-07-20

## Outcome

The owner's G9-A direction is implemented in canonical source. The ambiguous
fixed Cookie Consent banner is replaced by one controlled, in-flow Consent
Manager composition with a visible title, real Link, explicit Accept/Reject/
Customize requests, canonical Modal preferences and canonical Checkbox example
controls. Policy, categories, provider, persistence, processing and results
remain target-owned.

The public slug remains only for migration. Browser evidence passes; contract
status stays `pilot` because human visual review is still pending.

## Rubric

| Area | Result | Evidence |
| --- | --- | --- |
| Identity and limits | pass | One controlled Consent Manager; no notice/provider/compliance ambiguity. |
| Anatomy | pass | Named first layer, content, real policy, three decisions, feedback, Modal preferences and save. |
| Canonical composition | pass | Button, Link, Modal and Checkbox dependencies; complete Modal keyboard evidence; no duplicate overlay/control system. |
| Controlled state | pass | Closed/Open/Busy/Preferences Open; distinct target callbacks, zero closed focus targets and no uncontrolled consent store. |
| Public API | pass | Localizable content/labels, target slots and three controlled booleans only. |
| CSS/tokens | pass | In-flow logical intrinsic layout, canonical tokens, no viewport placement or animation. |
| Accessibility | pass | Named section, native requests, real Link, native omission, canonical Modal focus entry/containment/Escape/restoration. |
| Runtime/provider | pass | Zero neutral G9 runtime, storage, network, cookie and provider work. |
| Target translation | pass as documented | Web implemented; Shopify Customer Privacy projection intentionally planned. |
| Exhibit/Studio parity | pass | Shared artwork/dependencies/fixture and exact normalized G9 DOM (`1,028` characters each). |
| Responsive/content evidence | pass | Eight viewport captures plus Busy/Closed/Preferences, dark, forced colors, Arabic RTL/reduced motion and 200% text. |
| Human review | pending | No legal, visual or stable approval inferred. |

## Source Reconciliation

- Registry name/description/selector/dependencies now describe Consent Manager.
- Contract `0.3.0` replaces generic message/actions/preference slots with
  explicit semantic content, requests, controlled state and target boundaries.
- Marketing CSS replaces fixed/translated physical banner rules with logical,
  intrinsic, in-flow composition around canonical dependencies.
- `ConsentManagerArtwork` supplies the shared implementation; Marketing Studio
  supplies one clearly target-simulated fixture and controlled callbacks.
- Studio metadata exposes every semantic contract property without exposing
  private geometry or provider internals.
- MDX documents the migration, controlled lifecycle, target ownership and
  target translations.
- ADR 0226 resolves and supersedes ADR 0171's deferred identity choices.

## Assertions To Certify

1. Invalid required copy, placeholder policy destination, or missing preference
   composition omits the manager.
2. Closed state contains zero policy/action/preference focus targets.
3. Accept and Reject each invoke their distinct target callback and never mutate
   cookies/storage/network state.
4. Customize opens canonical Modal; initial focus, Tab/Shift+Tab containment,
   Escape, Close and restoration behave canonically.
5. Current target checkbox values remain controlled; Save requests target
   reconciliation and does not persist in neutral source.
6. Busy state exposes `aria-busy`, disables mutation actions and can project
   target feedback without inventing a result.
7. Real policy navigation remains an anchor; only the docs target prevents its
   fixture route from navigating.
8. Long/localized/RTL/200% content and category rows wrap without viewport or
   host overflow across all four evidence viewports.

## Browser Evidence

Artifacts: `output/playwright/refinement-marketing/consent-manager-0226/`.

- Matrix: `exhibit-{mobile,tablet,desktop,xl}.png` and
  `studio-{mobile,tablet,desktop,xl}.png`.
- Controlled states: `studio-busy.png`, `studio-closed.png`,
  `studio-preferences.png` and `studio-preferences-open.png`.
- Special modes: `studio-dark.png`, `studio-forced-colors.png`,
  `studio-rtl-reduced-motion.png` and `studio-text-200.png`.
- `studio-desktop-baseline.png` is the full-page implementation inspection;
  historical old-banner before captures remain under
  `output/playwright/parity/marketing/`.

Browser assertions proved distinct Accept/Reject target reconciliation, zero
closed descendants, real policy `href`, controlled Save feedback, Busy
`aria-busy` plus three disabled first-layer actions and disabled Save, title
initial focus, contained Modal tab sequence, Escape and focus restoration.
Clicks changed no cookies or Web Storage and initiated zero requests. Invalid
title or placeholder policy link omitted G9. All eight viewport surfaces fit
their host and document; Arabic RTL and 200% text had equal scroll/client width.
The final console reported zero errors/warnings, one tab remained open during
evidence, and cleanup finished with port `4173` free and the managed browser and
server stopped.

## Performance Snapshot

| Surface | Current | Fixed ceiling / comparison | Result |
| --- | ---: | ---: | --- |
| G9 CSS slice | `903 B` gzip (`3,412 B` raw) | family-owned | measured candidate |
| Marketing CSS | `5,162 B` gzip | `4,198 B` | documented program gap; +89 B from prior snapshot |
| Neutral component CSS | `69,401 B` gzip | `65,536 B` | documented program gap; +159 B |
| Shared runtime | `15,448 B` gzip | `8,192 B` | unchanged documented program gap |
| G9 provider/storage/network runtime | `0 B` | `0 B` | pass |

Fixed ceilings are not raised. Only canonical CSS composition and docs-target
React code change.

## Remaining Human Review

- First-layer surface, border, typography, spacing and reading measure.
- Equal treatment, order, width and wrap of Accept, Reject and Customize.
- Preferences Modal density, example categories and Save hierarchy.
- Closed/Busy feedback presentation and narrow/localized behavior.
- First Shopify/provider surface and target-specific placement policy.

No `stable` promotion is authorized. `site/dist` must remain untouched.
