# Video Section Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-15

Component: Video Section (`S7`, review order `167`)

## Outcome

Video Section is now a truthful passive native media figure with required
target-owned media, optional visible `figcaption`, contained/full-width
presentation and no neutral playback claim. The no-op play control and its
public action/label API are removed.

Exhibit and Studio use the same fixture, strict omission, DOM and canonical CSS.
ADR 0151 records the target-owned player boundary. Shopify remains deliberately
`css-ready` until an owner/architecture decision selects supported media modes
and the complete accessibility, consent, loading and fallback policy.

## Before / After Findings

| Finding | Baseline | Final | Result |
| --- | --- | --- | --- |
| Playback promise | Named focusable play button with no handler or result | No neutral control; target player owns complete interaction | pass |
| Public API | `playAction` and `playLabel` exposed independently of media behavior | Three semantic properties: `variant`, required `media`, optional `caption` | pass |
| Required composition | Missing media could leave a caption shell | Renderer omits complete root; Studio keeps required Media non-removable | pass |
| Anatomy | Poster-specific class plus partial control anatomy | Native figure/wrapper/generic target-media/figcaption | pass |
| Canonical styling | Physical hardcodes and site repair CSS | Logical properties, complete caption type and source-owned media styles | pass |
| Narrow embedding | Desktop token padding collapsed direct `200–260px` media | Existing grid-gap token caps padding; exact-width containment | pass |
| Motion | Hover scale/transition on dead control | No S7-authored transition or animation | pass |
| Parity | Shared renderer repeated the same flawed action | Exact passive subtree and canonical layout in both modes | pass |
| Shopify | Copied CSS without target player | Same truthful `css-ready` state plus explicit decision blocker | pass as boundary; target work open |

## Contract And API

Contract `0.3.0` remains `pilot` with three properties:

- `variant` — optional `contained | fullwidth`, default `contained`.
- `media` — required target-owned passive media or complete accessible player.
- `caption` — optional visible editorial `figcaption`; not synchronized captions.

S7 exposes no source/provider, poster, ratio, fit, radius, preload, autoplay,
loop, muted, controls, tracks, transcript, consent, loading/error, current time,
volume, fullscreen, editor object or analytics. It has no controlled/
uncontrolled state. A future shared Player requires a separate contract and ADR.

## Rubric

| Gate | Result | Evidence / remaining review |
| --- | --- | --- |
| Purpose and limits | `pass` | Passive editorial media shell; target/player lifecycle explicitly external. |
| Anatomy and composition | `pass` | Native figure, required wrapper/media and optional native figcaption. |
| Variants and modes | `pass` | Contained/fullwidth plus complete/invalid, captioned/uncaptioned and passive/player profiles. |
| Public API | `pass` | Three semantic properties; obsolete action/label removed without aliases. |
| State ownership | `pass` | No local store or media state; selected target player owns complete lifecycle. |
| Tokens and values | `pass` | Eleven existing semantic references; ratio and structural zeros remain private. |
| Visual system | `pass` for candidate | Four paired viewports, direct roots, themes and extremes; aesthetics await owner approval. |
| Accessibility | `pass` for shell | Native figure/caption, contextual alt, zero passive focus; target player obligations documented. |
| Interaction | `pass` | No false neutral interaction; synthetic native controls contain as target-owned content. |
| Motion | `pass` | Dead hover scale/transition removed; S7 authors no motion. |
| Responsive behavior | `pass` | Intrinsic fill and private ratio; bounded padding at direct `200–1120px`. |
| Content resilience | `pass` | Short/empty/long/unbroken/RTL captions, required media and both variants. |
| Runtime and assets | `pass` locally / global gap | Zero S7 JS/assets/player/network work; Sections budget passes. |
| Cross-target translation | `pass` as documented boundary | Web/Webflow implemented; Shopify profile decision remains visible and unimplemented. |
| Documentation parity | `pass` | Exact Exhibit/Studio subtree; MDX shows the same passive composition. |
| Verification | `pass` | Validators, browser matrix, budgets, copies, Shopify asset, console, diff and clean `site/dist`. |

## Browser Evidence

- Evidence directory: `output/playwright/refinement-batch-66/` with nine
  baseline and 21 final captures.
- Exhibit and Studio normalize to `368` characters and FNV-1a `0a0adb12`
  across Mobile `390x844`, Tablet `768x1024`, Desktop `1280x900` and XL
  `1536x960`; baseline was `803` / `7835173b`.
- Every default root is a native `figure` with required media and optional
  native caption, zero buttons and zero passive focus stops.
- Final root/media geometry is Mobile `358/326px`, Tablet `736/691.84px`,
  Desktop Exhibit `420/388px`, Desktop Studio `532/500px`, XL Exhibit
  `584/548.97px`, and XL Studio `752/706.91px`; no checked case overflows.
- Direct `200/260/520/900/1120px` roots stay exact-width and preserve
  `136/196/456/836/1056px` useful media width under desktop tokens.
- Fullwidth has zero padding/radius. Empty caption omits only `figcaption`; a
  localized long caption wraps to `64px` at Mobile.
- A target-owned native-video specimen fills `472x265.5px` at a `520px` root
  and exposes one native control surface. It does not certify a player profile.
- Arabic unbroken content at `200px` uses logical RTL flow,
  `overflow-wrap:anywhere`, and equal client/scroll width.
- Caption contrast is `7.81:1` light and `12.09:1` dark. Forced colors preserves
  shell/caption; reduced motion confirms no S7-authored motion.
- A clean isolated browser reports zero errors and zero warnings.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,814 B` | `6,758 B` | `6,861 B` | pass; `56 B` reduction, `103 B` remaining |
| Neutral Web component CSS | `66,941 B` | `66,920 B` | `65,536 B` | existing gap `1,384 B`; synchronized delta `-21 B` |
| Shared neutral runtime | `10,492 B` | `10,501 B` | `8,192 B` | existing gap; synchronized delta `+9 B`; S7 adds no behavior |

S7 adds no listener, observer, timer, promise, request, media API call, layout
measurement, formatter, custom element, player bundle or asset. Canonical,
Webflow and Shopify Sections CSS are SHA-256-identical
(`dcb948a4151d2a108ae047af1513f6c4aa6253e7c1e87debc9857c0ba24972d6`).

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Refined, generated, validated and browser-evidenced passive media composition. |
| Shopify | `css-ready`, `ready: false`; dedicated hosted/external/player section intentionally blocked on explicit product/architecture policy. |
| Webflow | Canonical Sections CSS copy regenerated and source-identical. |
| React / Angular | Planned thin figure wrapper; player state remains in required child media. |
| Figma | Generic Studio shell traceability only; component identity needs owner review. |
| SwiftUI / Compose | Documented native media/player embedding with target lifecycle ownership. |

Shopify official validation passes revision 1 for artifact
`video-section-s7-batch66` on `assets/sections.css`. Platform guidance confirms
that hosted `video` and external `video_url` are distinct target modes;
`video_tag` alone cannot choose The Gallery's captions/transcript, consent,
autoplay or fallback policy.

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run build:components`
- `npm run build:adapter:web:components`
- `npm run build:adapter:shopify:components`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- `npm run audit:previews:static`
- `npm run audit:components`
- official Shopify validation, artifact `video-section-s7-batch66`, revision 1
- Chromium semantics, paired viewports, direct roots, variants, caption
  extremes, native-player slot, themes, contrast, forced colors, reduced motion,
  RTL and console matrix
- source/generated identity, `git diff --check` and clean `site/dist` status

## Human Review Queue

1. Approve the private `16 / 9` ratio, crop and contained radius.
2. Approve caption type, alignment, rhythm and full-width edge treatment.
3. Confirm the three-property neutral API and removal of the independent play
   action/label.
4. Select Shopify supported modes and precedence: hosted, YouTube/Vimeo,
   decorative muted motion, meaningful narrated media, live, or combinations.
5. Define captions, descriptions, transcript, privacy/consent, loading,
   autoplay, errors, analytics and fallback policy for each selected profile.
6. Decide whether a shared cross-target Player merits its own component.
7. Add component-specific Figma examples after browser visual approval.

## Readiness

`ready for human review`: the neutral shell is semantically, visually,
responsively, technically and documentarily complete for review. Human product/
architecture review must choose target player profiles before cross-target
stability. Contract remains `pilot`; no `stable` promotion was made.
