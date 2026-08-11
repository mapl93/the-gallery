# Logo Bar / Trust Bar — Web Refinement Audit

Status: `ready for human stability review`

Date: 2026-07-20

Component: Logo Bar / Trust Bar (`S12`, dependency order `172`)

Contract status: `pilot` — no automatic stable promotion

## Outcome

S12 now implements the owner-accepted `S12-B` direction recorded in ADR 0232.
The former generic flex row and second incomplete `logo-marquee` animation were
replaced by one native ordered mark collection that:

- defaults to a zero-runtime Static presentation;
- supports informative, decorative and functional target-owned marks;
- uses a real native link only when a destination exists;
- omits the complete root when the required collection is empty;
- derives a labelled `section` or unlabelled generic `div` from visible content;
- explicitly composes canonical S18 Marquee when `marquee` is selected; and
- inherits its bounded inert copy, logical direction, semantic pace,
  Pause/Resume, focus/hover/visibility suspension and static fallbacks without a
  second motion owner.

Exhibit and Studio now render one `LogoBarArtwork` and one representative
six-mark fixture through the same canonical component. Site-only placeholder
and animation-disabling rules were removed. Web and Shopify adapter assets are
generated from canonical source.

S12 is ready for owner visual and stability review, but remains `pilot`.

## Certification Gate Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Finite trust/identity collection; claims, assets, destinations and brand rights remain target-owned. |
| Anatomy | pass | Conditional root/label plus canonical viewport, track, authoritative native list/items, marks, optional link, generated copy and playback Button. |
| Variants/modes | pass | Static default and explicit Marquee; informative/decorative/functional records; two directions and three pace presets. |
| State ownership | pass | Static has no owner; Marquee delegates to one canonical uncontrolled state and event surface. |
| Public API | pass | Seven semantic properties; record details stay inside the marks composition; geometry and raw timing remain private. |
| Canonical dependency | pass | Registry/contract depend on Marquee and inherit Button transitively; no duplicate animation or control behavior. |
| Tokens/literals | pass with human review | Semantic color/spacing/type/focus inputs; mark geometry and vector-fixture recipe are private and documented. |
| Accessibility | pass | Native list, explicit mark intent, real link, inert copy, persistent control and static reduced/no-runtime fallback. |
| Keyboard/focus | pass | One authoritative link in Static; Marquee adds one Button and zero copy focus stops; focus entry durably pauses. |
| Responsive/content | pass | Four natural viewports plus empty/one/long/unbroken/localized/RTL/zoom evidence, zero root/document overflow. |
| Reduced motion | pass | Static source list, zero copies, hidden control, no animation or transform. |
| Runtime/assets | pass within component budget | Static has zero component runtime; Marquee reuses S18's bounded runtime; no component network or asset request. |
| Exhibit/Studio parity | pass | Normalized Static outerHTML is exact at `2,500` characters; same renderer, fixture and defaults. |
| Web adapter | pass | 183 components, 19 CSS sources, no drift. |
| Shopify projection | pass at asset level | Canonical CSS/JS copied and validated; dedicated section/blocks/schema/editor lifecycle remains planned. |
| Human stability | pending | Mark box, gap, wrapping, label/borders/color policy, artwork and target implementation require owner review. |

## Implementation Facts

### Contract and API

`logo-bar.contract.json` is version `0.3.0`, remains `pilot`, and declares
Marquee as its canonical dependency. Public properties are:

- `presentation: static | marquee` (`static`);
- optional visible `label`;
- required ordered `marks` composition;
- Marquee-only `direction: forward | reverse` (`forward`);
- Marquee-only `pace: slow | default | fast` (`default`);
- required localized `pauseLabel`; and
- required localized `resumeLabel`.

Record assets, alternative-text intent and optional destinations stay inside
the `marks` composition rather than becoming parallel arrays. Empty marks render
no root. Blank label derives a generic `div` with no false landmark. Static
renders no hidden control. A one-mark Marquee request derives Static with no
copy or visible control.

### Native mark semantics

The authoritative group is one `ul` of `li` records. The shared fixture proves:

- four informative vector marks with explicit entity names;
- one fully decorative mark hidden from accessibility APIs; and
- one functional native link named “Visit Use Objects.”

Generated Marquee content contains the same linked artwork visually, but the
complete copy is `aria-hidden` and inert, its link is `tabindex=-1`, and it
receives no pointer input. The reviewed Marquee state therefore has one source
link, one copied link, one canonical Button and only two usable tab stops.

The component no longer applies default grayscale, opacity or pointer hover to
passive consumer assets. Only a native linked mark receives link hover/focus
treatment. Arbitrary raster brand colors remain untouched.

### Canonical motion composition

Marquee mode produces one `.logo-bar.marquee` root, six source items, one inert
six-item copy and one Button. At the reviewed desktop canvas the source group is
`1,156.46875px`; the measured travel including group gap is `1,188.46875px`.
Slow/default/fast durations are `49.5195s`, `29.7117s` and `18.5698s`, resolving
to the canonical private 24/40/64 px/s velocities.

Computed direction passes as:

| writing direction | Forward | Reverse |
| --- | --- | --- |
| LTR | normal | reverse |
| RTL | reverse | normal |

Pointer Pause sets the durable user state and changes the next action to
“Resume logos.” Resume while still hovered clears the durable state but remains
temporarily paused until pointer leave. Focus entering through the source link
durably pauses; explicit Resume clears it. Simulated hidden/visible document
transitions produce paused/playing states and two
`marqueeplaybackchange` events.

## Visual And Browser Evidence

Evidence directory:
`output/playwright/refinement-sections/logo-bar-0232/`

Natural paired captures:

- `logo-bar-{exhibit,studio}-mobile.png` — `390x844`;
- `logo-bar-{exhibit,studio}-tablet.png` — `768x1024`;
- `logo-bar-{exhibit,studio}-desktop.png` — `1440x1000`; and
- `logo-bar-{exhibit,studio}-xl.png` — `1920x1080`.

Special captures:

- `logo-bar-marquee-playing-desktop.png`;
- `logo-bar-marquee-paused-desktop.png`;
- `logo-bar-link-focus-desktop.png`;
- `logo-bar-dark-desktop.png`;
- `logo-bar-forced-colors-desktop.png`;
- `logo-bar-forced-colors-focus-desktop.png`;
- `logo-bar-rtl-reduced-mobile.png`;
- `logo-bar-extreme-label-mobile.png`;
- `logo-bar-200-percent-mobile.png`;
- `logo-bar-no-enhancement-mobile.png`; and
- `logo-bar-one-item-mobile.png`.

All eight natural runs are Static with one authoritative list, six records, one
source link, zero copies, zero controls and zero root/document overflow. Exact
normalized Exhibit/Studio DOM parity is true. Special modes also report zero
overflow.

No-enhancement evidence intercepts the Web runtime module with an empty valid
module before reload: the application remains rendered, `window.TheGallery` is
absent, Marquee stays `pending`, and the source list is readable with zero copy,
hidden control, no animation and no transform. A one-item runtime harness stays
Static with the same guarantees. A direct shared-renderer empty-slot harness
returns zero children and zero Logo Bar roots. The browser console reports zero
errors and zero warnings.

Historical before evidence remains under
`output/playwright/batch71-logo-bar/before/` and documents the former generic
container, text placeholders, incomplete translated track and Studio-disabled
motion.

## Performance

| Surface | Actual gzip-9 | Ceiling | Result |
| --- | ---: | ---: | --- |
| Sections family | `6,492 B` | `6,861 B` | pass, `369 B` headroom |
| Neutral component CSS | `70,274 B` | `65,536 B` | documented program gap `4,738 B` |
| Shared runtime | `19,495 B` | `8,192 B` | documented program gap `11,303 B` |

S12's isolated CSS slice is `2,229 B` raw / `775 B` gzip-9, SHA-256
`94a8709b44cba2089cc48ffd93887385de4edf536322fbf3378f15d00b69ecfe`.
Logo Bar adds zero component JavaScript: Static returns before observer setup,
and Marquee reuses ADR 0231's existing runtime. ADR 0232 documents the CSS
change on the global CSS gap surface; ceilings were not raised. Runtime remains
bounded to one copy, one entry, shared resize observation and event-driven state
with no polling, interval, per-frame JavaScript, network request or
component-owned asset.

## Cross-Target Position

- Neutral Web is implemented and adapter-valid.
- Shopify receives exact canonical CSS/runtime assets, but its target-native
  ordered image/link blocks, alternative-text settings, schema, editor preview
  and storefront lifecycle remain `planned`. Editor preview should stay Static
  until separately certified.
- React/Angular should render the same ordered records and may project controlled
  playback around the canonical event/state owner; they cannot create a second
  semantic collection or state machine.
- Webflow/Framer should expose only presentation, logical direction, semantic
  pace and localized labels—not raw duration, clone count or mark geometry.
- Figma may show Static/Marquee/Paused visual variants but is neither runtime
  evidence nor source truth.
- SwiftUI/Compose require equivalent ordered accessibility content, explicit
  linked actions, target reduced-motion behavior and one playback owner.

## Validation

- `node --check components/js/theme.js` — pass.
- Site TypeScript `--noEmit` — pass.
- `npm run validate:contracts` — 183 contracts.
- `npm run validate:studio` — 183 definitions, 982 semantic properties, 1,636
  public token references, 30 icon choices.
- `npm run validate:docs` — pass; existing external-reference warnings only.
- `npm run build:adapter:web` / `validate:adapter:web` — pass, 183 components,
  19 CSS source files.
- `npm run build:adapter:shopify` / `validate:adapter:shopify` — pass, 183
  components, 84 target-ready, 57 Liquid templates, 34/34 schema-ready; existing
  planned-status warnings only.
- `npm run audit:components` — 183/183 automated pass, zero structural gaps.
- Exhibit/Studio evidence — exact renderer parity, one static focusable native
  link in both modes and targeted Marquee interaction coverage.
- `npm run audit:refinement` — 183 dossiers, 205 dependency edges, 129 ready for
  human review.
- `npm run audit:refinement:performance` — 18 surfaces, 10 pass, eight documented
  gaps, zero undocumented gaps.
- `npm run evidence:assert-clean` — pass; port `4173`, managed server and
  `gallery-refinement` browser are closed.
- `git diff --check` — pass.
- `site/dist` — untouched.

## Risks And Required Human Review

1. Approve or revise label hierarchy, border, padding, mark optical box, gap,
   wrap density, link treatment and Static/Marquee visual balance.
2. Decide the final brand-color/muted policy. The candidate intentionally does
   not recolor arbitrary consumer assets.
3. Replace or approve the representative vector fixture and provide valid
   S12-specific Figma/reference evidence; registered nodes belong to Button.
4. Product/content owners must verify every displayed entity, trust claim,
   destination, accessible name and brand-use permission.
5. Build and certify Shopify section/blocks/schema/editor behavior before
   target-ready promotion.
6. Continue global CSS/runtime consolidation; do not normalize current bundle
   overruns by silently raising ceilings.

## Readiness Decision

`ready for human stability review`. Implementation, semantics, interaction,
responsive/accessibility evidence, shared-renderer parity, adapter generation,
performance accounting and resource cleanup are complete. Human review is
explicitly pending, contract status remains `pilot`, and no `stable` promotion
was made.
