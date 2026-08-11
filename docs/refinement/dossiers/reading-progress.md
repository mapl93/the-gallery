# Component Dossier: Reading Progress Bar

Status: `human-review-ready`

Target reviewed: Neutral Web with documented Shopify and future-target boundaries

Contract: `components/contracts/reading-progress.contract.json`

Decision: ADR 0228

## Recommendation

Use L4 as one supplemental decorative article-position cue. It supports two
exclusive sources: **Controlled**, for a target-supplied normalized value, and
**Automatic**, for a capable target that explicitly associates an article and
optionally an embedded scroll root. It never represents task completion.

The host owns fixed, sticky or in-flow placement, safe areas, Header offsets,
stacking and omission policy. L4 owns only the passive track/fill projection.
The contract remains `pilot` until explicit human visual review.

## Purpose And Limits

- Helps sighted readers estimate their viewport position within one long-form
  article.
- Does not measure reading, comprehension, engagement, time remaining or task
  completion.
- Is not canonical Progress, Meter, Scrollbar, Slider, Steps, page loading or a
  live status.
- Does not replace headings, landmarks, browser scrolling, native find, skip
  links or Table of Contents.
- Does not own article content, placement, Header collision, safe areas,
  analytics, persistence or restoration.
- Has no focus, pointer action, keyboard model, announcement or event.

## Repository Baseline And Correction

Before ADR 0228, L4 fixed itself to physical viewport `top/left`, exposed a
required opaque `indicator` slot, animated layout-affecting width and defined no
article/scroller formula or lifecycle. Exhibit and Studio reconstructed
different values and geometry.

The refined source now:

- removes fixed positioning, global stacking and width interpolation;
- exposes `mode`, conditional bounded `value`, explicit `targetId` and optional
  `scrollRootId`;
- projects through a private logical-start transform scale;
- hides invalid, disconnected and non-scrollable ranges;
- shares one `ReadingProgressArtwork` and fixture across Exhibit and Studio;
- adds one bounded neutral measurement service with complete cleanup; and
- retains article structure and navigation as the accessible model.

## Research Evidence

| Source | Relevant evidence | Gallery direction |
| --- | --- | --- |
| [HTML `progress`](https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element) | Native progress represents completion of a task. | Article scroll position does not receive task-progress semantics. |
| [WAI-ARIA `progressbar`](https://www.w3.org/TR/wai-aria-1.2/#progressbar) | A progressbar communicates progress toward completion of a long-running task. | No `progressbar`, accessible value or live updates for decorative L4. |
| [CSS Scroll-driven Animations](https://www.w3.org/TR/scroll-animations-1/) | Scroll progress depends on a selected scroll source and usable range. | Automatic requires explicit source association and hides unusable ranges; a draft CSS mechanism is not frozen into the cross-target contract. |
| [Radix Progress](https://www.radix-ui.com/primitives/docs/components/progress) | Root/indicator plus value/max model task progress. | Mature API precedent supports canonical Progress, not reading-position semantics. |
| [Shopify Progress](https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components/feedback-and-status-indicators/progress) | Shopify's progress surface is also completion-oriented. | Copied CSS does not justify claiming a Shopify article integration. |
| [Open UI component inventory](https://open-ui.org/components/) | No standalone Reading Progress contract resolves this identity. | Gallery records its explicit decorative decision rather than inventing consensus. |

The standards agree about what L4 is not: it is not an interactive Scrollbar
and it is not inherently task Progress. External references inform the boundary
without replacing Gallery's visual identity.

## Owner Reference Analysis

No component-specific approved artwork exists. The generic Gallery references
support restrained editorial presentation, thin dividers and warm accent use,
but do not approve final thickness, color, placement or page composition. The
current three-pixel accent line is therefore a review candidate, not a stable
visual decision.

## Anatomy And Composition

| Part | Required | Semantic owner | Notes |
| --- | --- | --- | --- |
| Root/track | yes while available | Reading Progress | Passive `div`, `aria-hidden=true`, transparent surface, full host width. |
| Fill | yes | Reading Progress | Decorative child projected from logical inline start through private scale. |
| Article source | Automatic only | target/host | Explicit element identity; never arbitrary implicit page discovery. |
| Scroll source | optional Automatic | target/host | Explicit containing element or document viewport. |
| Placement wrapper | optional | page/layout host | Owns fixed/sticky/in-flow behavior, safe areas, offsets and stacking. |

Dependencies remain none. Table of Contents may later reuse the same target
measurement service, but neither component becomes the other's public state
owner.

## Mode And State Matrix

| Dimension | Supported behavior |
| --- | --- |
| Controlled `0` | Visible empty fill and `data-reading-state=controlled`. |
| Controlled `0..100` | Finite input is clamped and projected directly. |
| Controlled invalid | Hidden with `data-reading-state=invalid`; stale value removed. |
| Automatic valid | Article-relative value recalculates from explicit geometry. |
| Automatic missing/foreign source | Hidden as `invalid`. |
| Automatic short/disconnected source | Hidden as `unavailable`. |
| Dynamic content/resize | Relevant geometry observation schedules a new measurement. |
| Root scrollport | Document viewport source. |
| Nested scrollport | Explicit containing scroll root; target must be contained by it. |
| Placement | Host-owned, not a component variant. |
| RTL | Fill originates at logical inline end of physical canvas, the RTL start edge. |
| Reduced motion | No interpolation; direct transform update. |
| Forced colors | Fill maps to system `Highlight`. |
| Empty/localized/extreme content | L4 contains no text; source content wraps/scrolls independently. |

There is one visual size. Viewport breakpoints, duration, percentage labels and
vertical variants are not justified public configuration.

## Public API And State Ownership

| Property | Type/default | Applies | Ownership |
| --- | --- | --- | --- |
| `mode` | `controlled | automatic`, Controlled | always | Selects exactly one source. |
| `value` | number `0..100`, `44` fixture only | Controlled | Target-owned normalized position; component clamps projection. |
| `targetId` | string | Automatic | Explicit associated article identity. |
| `scrollRootId` | optional string | Automatic | Explicit embedded scroll container; omission uses document viewport. |

Runtime outputs are `data-reading-state="controlled|automatic|unavailable|invalid"`
and bounded `data-value` only while available. The component emits no event.
There is no uncontrolled store.

Article query selectors, thresholds, cadence, z-index, placement, animation,
accessible labels, analytics and persistence stay private or target-owned.

## Tokens, CSS And Hardcoded Values

- Public token: `--color-text-accent` only.
- Private variable: `--_reading-progress-scale` projects normalized state.
- Internal `3px` thickness is the current visual candidate, not public API.
- Root is intrinsic `100%` inline size with hidden overflow and no positioning,
  inset, z-index or transition.
- Fill uses `transform: scaleX()` and logical transform origin; forced colors use
  system `Highlight`.
- No component token or public variable is created for internal geometry.

The former public `--z-sticky`, physical offsets and `50ms` width transition are
removed. No unexplained color, spacing, typography, icon or asset value remains.

## Runtime And Performance

Controlled mode performs one bounded projection and attaches no ongoing work.
Automatic mode:

- groups passive scroll listeners by source;
- uses one shared window resize listener only while instances exist;
- coalesces reads/writes through one animation frame;
- observes only associated article/embedded scroll geometry;
- reconfigures on the four reading attributes; and
- detaches listeners, unobserves geometry, cancels the last frame, disconnects
  the last observer and clears retained roots after removal.

It performs no timer polling, network request, asset load, cookie, storage,
analytics or framework-specific work.

| Surface | Current gzip | Fixed ceiling | Result |
| --- | ---: | ---: | --- |
| Blog CSS | `5,610 B` | `5,529 B` | documented `81 B` gap |
| Shared runtime | `17,569 B` | `8,192 B` | documented `9,377 B` program gap |
| Neutral component CSS | `69,690 B` | `65,536 B` | documented `4,154 B` program gap |

Ceilings were not raised. ADR 0228 records all three gaps and requires later
article-position consumers to reuse the service or justify another runtime.

## Accessibility And Interaction

- Root is always `aria-hidden=true`, non-focusable, non-live and pointer
  transparent; no role or accessible name is emitted.
- No Arrow, Page, Home, End or scroll command is intercepted.
- The fixture's scroll container—not L4—has the native focus/scroll model.
- Continuous position changes are not announced.
- Logical origin, forced colors and no-transition reduced-motion behavior are
  evidenced.
- Source headings, landmarks and optional Table of Contents remain available
  when the decorative cue is omitted.

## Cross-Target Translation

| Target | Translation | Current status |
| --- | --- | --- |
| Neutral Web | Controlled and explicit Automatic source measurement through canonical CSS/runtime. | Implemented and evidenced. |
| Shopify storefront | Canonical CSS/runtime is copied, but no article/template source or placement is claimed. | Planned; Controlled is safe fallback. |
| React / Angular | Thin controlled value or explicit ref-to-ID adapter over the same contract. | Planned; no second store. |
| Figma | Static Controlled values and unavailable omission only. | Planned; no simulated scrolling. |
| SwiftUI / Compose | Native geometry or supplied value with decorative semantics and host placement. | Planned. |

## Evidence And Validation

Final artifacts are under
`output/playwright/refinement-blog/reading-progress-0228/`:

- Exhibit and Studio at Mobile, Tablet, Desktop and XL;
- Controlled zero/full, Automatic middle and invalid-source captures;
- dark, forced colors, component-scoped RTL/reduced-motion and mobile 200% text
  captures.

Browser assertions proved Controlled clamp/invalid behavior; embedded and
document Automatic 0/50/100 projection; dynamic-content recomputation; invalid,
short and disconnected omission; one tab; zero errors/warnings; and zero
document/component overflow across all eight view/viewport pairs. Exhibit and
Studio normalized DOM are exactly equal (`303` characters).

## Risks And Human Questions

1. Approve or revise the three-pixel thickness, warm accent, track visibility
   and placement within a real article/Header composition.
2. Select the first Shopify article/template owner, source association and
   Theme Editor lifecycle before calling that adapter target-ready.
3. Decide whether Table of Contents should reuse the shared measurement service
   when automatic current-location tracking is approved.
4. Resolve the documented Blog/runtime/total performance gaps program-wide.

## Readiness Decision

Ready for explicit human review as a `pilot`. Purpose, anatomy, modes, source
ownership, failure states, runtime/cleanup, accessibility, responsive behavior,
target translation and Exhibit/Studio parity are reconciled. No `stable`
promotion is authorized.
