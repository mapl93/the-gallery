# Scrolling Text Marquee — Web Refinement Audit

Status: `ready for human stability review`

Date: 2026-07-20

Component: Scrolling Text Marquee (`S18`, dependency order `178`)

Contract status: `pilot` — no automatic stable promotion

## Outcome

S18 now implements the owner-accepted `S18-A` direction recorded in ADR 0231.
The former incomplete one-track CSS animation and site-disabled Studio fixture
were replaced by one progressive canonical Marquee with:

- one authoritative native list;
- at most one runtime-created inert, `aria-hidden` visual copy;
- real default Auto motion and an explicit Static presentation;
- distance-normalized `slow | default | fast` pace;
- logical `forward | reverse` direction that resolves against RTL;
- one canonical Button with persistent Pause/Resume;
- durable focus/user pause, temporary hover/hidden-document suspension; and
- readable static reduced-motion, one-item, no-JavaScript and failed-enhancement
  derivations with no visible or focusable inert control.

Exhibit and Studio now render one `MarqueeArtwork` and one six-item fixture. The
site-only rule that previously disabled animation was removed. The generated Web
and Shopify adapter assets are synchronized from canonical source.

S18 is ready for owner visual and stability review, but it remains `pilot`.

## Certification Gate Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Fixed supporting content is separated from live tickers and critical information. |
| Anatomy | pass | Conditional named/generic root, label, viewport, track, native source list/items, generated copy and conditional canonical Button. |
| Variants/modes | pass | Auto default, Static, three pace presets and two logical directions. |
| State ownership | pass | One neutral uncontrolled state; Button/focus/hover/visibility/reduced-motion synchronize it; frameworks may wrap without mirroring. |
| Public API | pass | Seven semantic properties; raw motion/composition values remain private. |
| Canonical dependency | pass | Registry and contract depend on Button; no duplicate button CSS/behavior. |
| Tokens/literals | pass with human review | Semantic color/spacing/type inputs; private type and velocity recipes are documented. |
| Accessibility | pass | Native list, inert copy, persistent control, static reduced/no-runtime fallback, zero live/frame announcements. |
| Keyboard/focus | pass | One focusable Button in each surface; focus entry pauses durably and Enter resumes without losing focus. |
| Responsive/content | pass | Four natural viewports plus one/zero/long/unbroken/localized/RTL/zoom evidence, zero root/document overflow. |
| Reduced motion | pass | Static list, zero copies, control `display:none`, no animation or transform. |
| Runtime/assets | pass within component budget | CSS animation only; one shared ResizeObserver; no polling, per-frame JS, timers, network or component assets. |
| Exhibit/Studio parity | pass | Normalized enhanced outerHTML is exact at `1,544` characters; same renderer, fixture and behavior. |
| Web adapter | pass | 183 components, 19 CSS sources, no drift. |
| Shopify projection | pass at asset level | Canonical CSS/JS copied and validated; dedicated Liquid/schema/editor lifecycle remains planned. |
| Human stability | pending | Visual velocity, typography, density, separator, control prominence, fixture and target artwork require owner review. |

## Implementation Facts

### Contract and API

`marquee.contract.json` is version `0.3.0`, remains `pilot`, and declares Button
as its only canonical dependency. Public properties are:

- `presentation: auto | static` (`auto`);
- optional visible `label`;
- required ordered `items` slot;
- `direction: forward | reverse` (`forward`);
- `pace: slow | default | fast` (`default`);
- required localized `pauseLabel`; and
- required localized `resumeLabel`.

Zero items or blank action labels omit the root. Blank optional label derives a
generic `div`; one item derives Static with no copy/control.

### Runtime and DOM

Auto enhancement clones only `.marquee__group--source`. The copy becomes
`.marquee__group--copy`, loses duplicate ids, receives `aria-hidden` and `inert`,
forces any focusable descendants to `tabindex=-1`, and ignores pointer input.
The runtime measures `group width + inter-group gap` and writes one private
duration. CSS owns all animation frames.

Current private velocities are 24, 40 and 64 px/s. At the reviewed desktop
fixture the measured travel is `1,153.65625px`; default duration is `28.8414s`,
which resolves exactly to `40 px/s`. Slow/default/fast durations are
`48.069s`, `28.8414s`, and `18.0259s` for the same distance.

Pointer click and keyboard activation were verified separately. A pointer Pause
sets `data-user-paused=true` and visible copy “Resume scrolling.” Resume while
still hovered clears the durable state but remains temporarily paused until the
pointer leaves. Focus entry durably pauses; Enter explicitly resumes while focus
stays on the Button.

### Direction and fallback

Computed animation directions pass as:

| writing direction | Forward | Reverse |
| --- | --- | --- |
| LTR | normal | reverse |
| RTL | reverse | normal |

Reduced motion and simulated no-enhancement both produce zero copies, hidden
control with computed `display:none`, no animation, no transform and zero
overflow. One-item enhancement produces the same Static derivation. Simulated
document hidden/visible transitions pause and restore playback without losing
the user's durable state.

## Visual And Browser Evidence

Evidence directory:
`output/playwright/refinement-sections/marquee-0231/`

Natural paired captures:

- `marquee-{exhibit,studio}-mobile.png` — `390x844`;
- `marquee-{exhibit,studio}-tablet.png` — `768x1024`;
- `marquee-{exhibit,studio}-desktop.png` — `1280x800`; and
- `marquee-{exhibit,studio}-xl.png` — `1600x1000`.

Special captures:

- `marquee-paused-desktop.png`;
- `marquee-static-desktop.png`;
- `marquee-dark-desktop.png`;
- `marquee-forced-colors-mobile.png` with visible focused Button outline;
- `marquee-localized-rtl-reduced-motion-mobile.png`;
- `marquee-extreme-unbroken-mobile.png`;
- `marquee-200-percent-mobile.png`; and
- `marquee-no-enhancement-mobile.png`.

All eight natural runs report playing Auto state, one source list, one inert
copy, one visible Button, and zero root/document horizontal overflow. Special
modes also report zero overflow. The browser console reports zero errors and
zero warnings.

Historical before evidence remains under
`output/playwright/batch77-marquee/before/` and documents the former static-only
docs fixture, missing list/control, trailing separator and disabled animation.

## Performance

| Surface | Actual gzip-9 | Ceiling | Result |
| --- | ---: | ---: | --- |
| Sections family | `6,436 B` | `6,861 B` | pass, `425 B` headroom |
| Neutral component CSS | `70,215 B` | `65,536 B` | documented program gap `4,679 B` |
| Shared runtime | `19,495 B` | `8,192 B` | documented program gap `11,303 B` |

S18's isolated CSS slice is `4,927 B` raw / `1,135 B` gzip-9. Its isolated
runtime slice is `10,713 B` raw / `2,582 B` gzip-9. ADR 0231 is attached to both
global gap surfaces; ceilings were not raised. Runtime remains bounded to one
copy, one entry, shared resize observation and event-driven state with zero
polling, intervals, per-frame JavaScript, network requests or component assets.

## Cross-Target Position

- Neutral Web is implemented and adapter-valid.
- Shopify receives the exact canonical CSS/runtime assets, but remains `planned`
  at the dedicated Liquid/schema/editor lifecycle layer. Theme editor preview
  must stay static until that target is separately certified.
- React/Angular may expose controlled pause state around the same DOM/event
  owner; they cannot replace neutral ownership.
- Webflow/Framer should expose only presentation, logical direction and semantic
  pace—not raw duration or clone count.
- Figma may document Static/Auto/Paused visuals and motion intent but is not
  runtime evidence or source truth.
- SwiftUI/Compose require equivalent ordered accessibility content, target
  reduced-motion handling and explicit Pause/Resume without duplicate accessible
  records.

## Validation

- `node --check components/js/theme.js` — pass.
- Site TypeScript `--noEmit` — pass.
- `npm run validate:contracts` — 183 contracts.
- `npm run validate:studio` — 183 definitions, 978 semantic properties, 1,630
  public token references, 30 icon choices.
- `npm run validate:docs` — pass; existing external-reference warnings only.
- `npm run build:adapter:web` / `validate:adapter:web` — pass, 183 components,
  19 CSS source files.
- `npm run build:adapter:shopify` / `validate:adapter:shopify` — pass, 183
  components, 84 target-ready, 57 Liquid templates, 34/34 schema-ready; existing
  planned-status warnings only.
- `npm run audit:components` — 183/183 automated pass, zero structural gaps.
- `npm run audit:exhibit-studio` — 183/183 structurally shared and visually
  reviewed; targeted S18 interaction evidence upgrades Marquee to one focusable
  pass surface and adds the Pause/Resume functional case.
- `npm run audit:refinement` — 183 dossiers, 204 dependency edges, 128 ready for
  human review.
- `npm run audit:refinement:performance` — 18 surfaces, 10 pass, eight documented
  gaps, zero undocumented gaps.
- `npm run evidence:assert-clean` — pass; port `4173`, managed server and
  `gallery-refinement` browser are closed.
- `git diff --check` — pending final batch gate.
- `site/dist` — untouched.

## Risks And Required Human Review

1. Approve or revise private `24/40/64 px/s` velocities.
2. Approve type, density, separators, border, control prominence/copy and the
   representative six-item fixture.
3. Supply valid S18-specific Figma/reference evidence; registered nodes are
   Button.
4. Confirm whether linked/content-rich items remain an accepted v1 editorial
   use despite inert copy hardening.
5. Build and certify Shopify Liquid/schema/editor lifecycle before target-ready
   promotion.
6. Continue global CSS/runtime consolidation; do not normalize current bundle
   overruns by silently raising ceilings.

## Readiness Decision

`ready for human stability review`. All implementation, semantic, interaction,
responsive, accessibility, adapter, evidence, performance-accounting and
resource-cleanup gates required for the candidate are complete. Human review is
explicitly pending, contract status remains `pilot`, and no `stable` promotion
was made.
