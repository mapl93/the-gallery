# Component Dossier: Scrolling Text Marquee

Status: `human-review-ready`

Target reviewed: Neutral Web, Shopify projection, and future-target translation

Contract: `components/contracts/marquee.contract.json` (`0.3.0`, `pilot`)

Decision: `S18-A`, recorded by ADR 0231

## Direction

Marquee is one progressively enhanced component with `auto | static`
presentations. `auto` is the default when enhancement is valid. The authored
native list is always authoritative; runtime may create exactly one inert,
assistive-hidden visual copy for continuity. One canonical Button owns
persistent Pause/Resume. Hover pauses temporarily, focus entry creates a durable
pause, and reduced motion, one item, invalid markup, missing JavaScript, or
failed enhancement preserve the readable static list without a visible control.

Public motion configuration stops at logical `forward | reverse` and semantic
`slow | default | fast`. Raw duration, pixels-per-second values, gap, clone
count, travel, easing, and iteration remain private. Logo Bar may compose this
implementation but must not duplicate its lifecycle.

This is an implementation candidate ready for human stability review. It does
not approve final visual velocity, typography, density, separator treatment,
control placement, fixture artwork, or promotion to `stable`.

## Purpose, Uses, And Limits

- Present a finite, ordered rhythm of concise supporting phrases, qualities,
  themes, marks, or similar non-essential content.
- Preserve the same complete meaning when the content is static.
- Do not use it as the sole location for price, policy, availability, errors,
  deadlines, status, instructions, or task-critical information.
- Do not use the obsolete HTML `<marquee>` element or the ARIA `marquee` live-
  region role for a fixed list that merely translates.
- Data changes, live tickers, campaign scheduling, analytics, persistence,
  provider content, and target navigation remain outside S18.

## Research Reconciliation

| Source | Evidence | Gallery direction |
| --- | --- | --- |
| [WCAG 2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | Automatically moving parallel content lasting more than five seconds needs a user mechanism to pause, stop, or hide it unless essential. | Auto mode exposes a persistent Pause/Resume Button; hover/focus convenience is not the only mechanism. |
| [APG Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) | Auto-rotation precedent stops on focus/hover and does not surprise-resume after focus. | Focus entry creates a durable pause; explicit Resume is required. Marquee does not adopt carousel roles. |
| [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion) | Reduced motion can request that non-essential motion be removed or replaced. | Reduced motion renders the static list, creates no copy, and hides the control. |
| [HTML obsolete features](https://html.spec.whatwg.org/multipage/obsolete.html) | `<marquee>` is entirely obsolete. | Use ordinary list/button semantics plus bounded CSS/JS enhancement. |
| [WAI-ARIA `marquee` role](https://www.w3.org/TR/wai-aria/#marquee) | The role describes a frequently changing non-essential live region. | A fixed translating list is not live and receives no such role or frame announcements. |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | No Marquee primitive is standardized in the mature inventory. | Keep the API semantic and framework-independent; compose Gallery Button. |
| [Polaris components](https://polaris-react.shopify.com/components) | No equivalent moving-strip contract exists. | Shopify must translate the same semantics rather than import a React abstraction. |
| [Shopify theme accessibility](https://shopify.dev/docs/storefronts/themes/best-practices/accessibility) | Theme interactions must be keyboard-operable and automatic media/content needs user control. | Future Liquid/schema output needs the same Button, reduced-motion and editor-safe static behavior. |

Open UI and APG define no Marquee widget pattern. Native list and Button
semantics are therefore the portable baseline. External systems provide
evidence only; Gallery anatomy and styling remain repo-owned.

## Owner Reference Audit

Studio metadata still points to Figma file `k3axoTaF87g17fBRgJ0PMY`, nodes
`943:7` and `1020:480`. Direct inspection previously showed the Button pilot,
not Marquee. The reference cannot approve S18 type, spacing, separator, control,
pace, or motion. Correct component-specific visual/motion evidence remains an
explicit human-review input rather than an inferred decision.

The former docs artwork with four unexplained words, trailing separators, and
site-disabled animation was rejected. The shared fixture now visibly labels six
plain-language studio principles and demonstrates the real default Auto mode.

## Anatomy And Ownership

| Part | Required | Semantics / owner |
| --- | --- | --- |
| root | yes with valid items/labels | `section` only when a visible label names it; otherwise generic `div` |
| visible label | optional | real visible text; labels the section through `aria-labelledby` |
| viewport | yes | clips only the enhanced moving rail; static overflow remains readable |
| track | yes | presentation container; CSS owns transforms |
| source group | yes | the one authoritative native `ul` |
| item | one or more | native `li` in target-authored order; Auto requires two |
| visual copy | enhanced Auto only | one generated `ul`, `aria-hidden`, inert, pointer-inactive, duplicate ids removed, focus descendants forced out of Tab order |
| separator | generated visual only | CSS pseudo-content; absent after the last item in static mode and never announced |
| control | valid Auto only | canonical compact outline Button with the visible next Pause or Resume action |

Blank required Pause/Resume labels or zero valid items omit the complete root.
A blank optional visible label derives a generic root without an unnamed
landmark. One item renders statically with no meaningless loop or control.

## State, Variant, Mode, And Content Matrix

| Dimension | Values / behavior |
| --- | --- |
| presentation | `auto` default; explicit `static` |
| logical direction | `forward` default; `reverse`; physical animation reverses in RTL |
| pace | `slow`, `default`, `fast`; current private velocities 24, 40, and 64 px/s |
| playing | valid Auto enhancement, visible document, no user/hover pause |
| hover paused | temporary; leaving restores only when no durable pause exists |
| user paused | Pause activation or focus entering; requires explicit Resume |
| hidden document | temporary suspension preserving user pause state |
| reduced motion | static, zero copies, zero visible/focusable control |
| no/failing JavaScript | authored wrapping list, zero copies, hidden control, no animation |
| one item | static derivation, zero copies/control |
| zero items / blank action labels | omit complete root |
| long/localized/RTL | intrinsic static wrapping; enhanced viewport clips only visual motion, never the page |

Neutral Web owns uncontrolled pause state for the mounted component lifetime.
`marqueeplaybackchange` reports effective state, user/hover/hidden/reduced flags,
logical direction, and pace. React/Angular targets may wrap this same state and
event with controlled props; they must not introduce a mirrored hidden owner.

## Public API

| Property | Type / default | Meaning |
| --- | --- | --- |
| `presentation` | `auto | static`, `auto` | Allows or suppresses progressive motion. |
| `label` | optional string | Visible context; blank derives an unnamed generic root. |
| `items` | required ordered slot | One authoritative native list; Auto requires at least two. |
| `direction` | `forward | reverse`, `forward` | Logical travel independent of physical left/right. |
| `pace` | `slow | default | fast`, `default` | Stable semantic velocity preset. |
| `pauseLabel` | required string | Localized visible Pause action. |
| `resumeLabel` | required string | Localized visible Resume action. |

Private composition includes pixels-per-second mappings, computed duration,
group/item gaps, type clamp, separator, copy creation, ResizeObserver routing,
animation travel, easing, iteration, and stage fixture content.

## Token And Hardcoded-Value Audit

| Surface | Classification |
| --- | --- |
| text/border colors | public semantic tokens: `--color-text-primary`, `--color-text-secondary`, `--color-border-subtle` |
| root/list spacing | public family inputs: `--space-layout-container`, `--space-layout-element-gap` |
| label typography | public body-family/size/line-height inputs plus private composition |
| item typography | public heading family with private `clamp(1.125rem, 2.5cqi, 1.75rem)` and `1.2` line-height pending visual review |
| control | inherited entirely from canonical Button; no duplicated button token recipe |
| velocity | private 24/40/64 px/s mapping from semantic pace |
| duration | runtime-derived private `distance / velocity`, not public |
| copy/travel/gap/easing/iteration | private implementation; no token-per-variable expansion |

No component assets, network requests, polling, interval timers, or per-frame
JavaScript are introduced.

## Runtime And Performance

- CSS owns every animation frame through one transform animation.
- Runtime creates at most one copy and one state entry per valid Auto root.
- One shared ResizeObserver performs bounded source/viewport measurements;
  visibility, pointer, focus and Button listeners only synchronize state.
- Static/invalid/one-item states do no measurement or duplication work.
- Hidden documents suspend CSS playback; disconnected roots are cleaned from
  observers and state maps.
- S18 CSS slice: `4,927 B` raw / `1,135 B` gzip-9, SHA-256
  `4e22ac2551835e19f93f83795b2af14a6ff8d2a00ec8b7e0adc7bec2cb88ddce`.
- S18 runtime slice: `10,713 B` raw / `2,582 B` gzip-9, SHA-256
  `65faf6339e1bf17c3ed0a87f682ec7091274d412d7e9c483edcf13fc9458ce38`.
- Sections family: `6,436 / 6,861 B` gzip-9, pass with `425 B` headroom.
- Neutral component CSS: `70,215 / 65,536 B`; shared runtime:
  `19,495 / 8,192 B`. Both remain documented program gaps; ADR 0231 records
  S18's intentional bounded enhancement without silently raising ceilings.

## Responsive And Content Evidence

Final evidence covers Exhibit and Studio at Mobile `390x844`, Tablet
`768x1024`, Desktop `1280x800`, and XL `1600x1000`. Every natural run has zero
root/document horizontal overflow, one source list, one inert visual copy, one
visible Button, and active measured motion.

Special evidence covers:

- explicit Static and durable user-paused states;
- reduced motion, simulated no-enhancement, one item, zero items, blank label,
  and blank required action labels;
- forward/reverse in LTR and RTL;
- slow/default/fast duration mapping with a measured default `40 px/s`;
- hidden/visible document suspension and recovery;
- dark theme, forced colors with visible Button focus, Arabic RTL localization,
  an extreme unbroken item, and effective 200% zoom;
- zero browser console errors/warnings; and
- exact Exhibit/Studio outerHTML after normalizing generated ids and private
  measured duration styles (`1,544` characters on both surfaces).

The evidence directory is
`output/playwright/refinement-sections/marquee-0231/`. Historical before images
remain in `output/playwright/batch77-marquee/before/`.

## Cross-Target Translation

| Target | Translation and remaining maturity |
| --- | --- |
| Neutral Web | Implemented canonical HTML/CSS/JS, native list and Button, generated Web adapter. |
| Shopify | Canonical CSS and shared runtime are regenerated into adapter assets; dedicated Liquid blocks/schema, editor-static preview and section lifecycle reinitialization remain planned and must preserve the same semantics. |
| React / Angular | Thin renderer plus optional controlled `paused/onPauseChange` projection around the same native owner; no framework-only source contract. |
| Webflow / Framer | One collection/list source, semantic presentation/direction/pace controls, static editor fallback; no raw duration/clone controls. |
| Figma | Static component plus annotated Auto/Paused states and logical motion prototype; never runtime evidence or source truth. |
| SwiftUI / Compose | Native ordered accessibility collection, target motion preference and explicit Pause/Resume action; no duplicated accessible items. |

## Exhibit And Studio Parity

Both surfaces render `MarqueeArtwork` from `SectionsStudio` with the exact same
`marqueeFixtureItems`. Studio exposes only contract-owned semantic properties
and presentation tokens. The former `.docs-studio__sections-marquee` animation
override was removed, so documentation no longer falsifies the public behavior.

The secondary MDX preview uses the same canonical markup contract and calls the
same shared enhancer through `ComponentPreview`; it is not an alternate renderer
or semantic default source.

## Risks And Human Review Questions

1. Approve or revise the current label/item typography, borders, density,
   separator, Button prominence, pause/resume copy, and six-item fixture.
2. Approve or revise the private perceived velocities `24/40/64 px/s`; semantic
   pace names remain stable even if mappings change.
3. Supply a valid S18-specific Figma/reference frame; current nodes are Button.
4. Confirm whether linked/content-rich Marquee items remain acceptable for v1.
   The runtime makes copies inert, but editorial guidance should keep moving
   content concise and non-critical.
5. Build and separately certify the Shopify Liquid/schema/editor lifecycle
   before calling that target ready.
6. The global CSS/runtime bundles remain over budget; subsequent batches should
   consolidate shared helpers rather than raising ceilings silently.

## Readiness

`ready for human stability review`: research, owner decision, ADR, contract,
registry, canonical CSS/JS, renderer, fixture, Studio metadata, docs, generated
Web/Shopify assets, interaction/responsive/accessibility evidence, performance
accounting and cleanup gates are complete. Contract status remains `pilot` and
no `stable` promotion was made.
