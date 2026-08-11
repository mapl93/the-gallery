# Before / After Image Slider — Web Refinement Audit

Status: `ready for human stability review`

Date: 2026-07-20

Component: Before / After Image Slider (`S17`)

Decision: ADR 0233, owner-selected `S17-A`

## Outcome

S17 is now one interactive matched-media comparison composed from canonical
Slider / Range. One native `input[type="range"]` is the sole value, focus,
pointer, touch, keyboard, form and reset owner. Its fixed `0..100`, step `1`
percentage drives the shared private Slider progress variable; CSS consumes that
single value for the logical media clip and decorative divider.

The former fixed midpoint, unrelated media fixture, inert generated handle and
opaque `control` slot are removed. Exhibit and Studio render the same
`BeforeAfterArtwork` component and fixture. The contract remains `pilot`; no
automatic or human stability promotion was made.

## Gate Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Direct aligned-state comparison is separated from independent figures and numeric Slider use. |
| External research | pass | HTML range, WAI-ARIA APG, WAI image groups, Open UI, Radix and Polaris are reconciled in the dossier. |
| Owner architecture | pass | ADR 0233 records the accepted canonical native Slider direction. |
| Figma evidence | gap for human review | Registered nodes `943:7` and `1020:480` show Button, not S17 artwork. |
| Anatomy and composition | pass | Figure, stage/track, matched media frame, logical overlay, one native input, real label, decorative divider, optional state labels and caption. |
| Variants, states and modes | pass | Default horizontal profile; `0/50/100`, focus, disabled, no enhancement, reduced motion and LTR/RTL covered. |
| Public API | pass | Nine stable semantic properties; fixed bounds, step, ratio, crop, thumb and divider geometry remain private. |
| State ownership | pass | One native input, canonical Slider synchronization and native controlled/uncontrolled translation; no mirrored value or second drag engine. |
| Tokens and literals | pass | Existing semantic tokens plus component-private geometry; no new public component token or literal color. |
| Visual system | candidate | Matched fixture, semantic labels, intrinsic stage and canonical thumb/divider are coherent; final artwork requires owner review. |
| Accessibility | pass | Native named range, value/bounds, one focus owner, useful media alternatives, optional described caption, logical direction and forced-color focus. |
| Responsive/content resilience | pass | Mobile, tablet, desktop, XL, direct 320px extreme content, 200% text, Arabic RTL, endpoints and optional-content omission. |
| Runtime/assets | pass | Reuses `enhanceSliders`; zero S17-specific JS, polling, animation, pointer capture, layout loop, network or component asset. |
| Cross-target translation | pass at contract level | Web implemented; Shopify and future targets have explicit equivalent ownership rules without framework coupling. |
| Exhibit / Studio parity | pass | One renderer and fixture; normalized enhanced root DOM is exactly equal at `1,419` characters. |
| Automated validation | pass | Contracts, Studio, docs, TypeScript, adapters, certification and refinement audits pass; performance has only documented program gaps. |
| Human stability | ready, pending | Visual artwork and target-native Shopify/Figma work still require explicit human review. |

## Canonical Implementation

### Anatomy and required composition

The root is a native `figure.before-after.slider`. Its stage composes
`.slider__track`; the one range input composes `.slider__input`. Before media is
the base layer. After media and its visible state label live inside the clipped
overlay, while the Before label stays under that overlay. This makes endpoint
semantics truthful: at `0` only Before remains, and at `100` After covers the
Before label as well as its media.

A non-empty localized control label and both media are required. A real dynamic
React harness produced one enhanced root for valid composition and zero roots
for blank label, missing Before, or missing After. Description and both state
labels can be independently empty while the valid root remains.

### Public API

- required `label`, `beforeMedia`, and `afterMedia`;
- optional `description`, `beforeLabel`, and `afterLabel`;
- `value`, default `50`, constrained to `0..100` in step `1`;
- `disabled`, default `false`; and
- optional native form `name`.

`min`, `max`, `step`, orientation, ratio, crop, divider width, thumb size, label
inset and clip geometry are not public. Framework adapters may expose
controlled `value` and uncontrolled `defaultValue`, but both map to the same
native input and native bubbling events.

## Interaction And Accessibility Evidence

The default range has one accessible name, one focusable surface, `min=0`,
`max=100`, `step=1`, current value `50`, and its caption is referenced with
`aria-describedby`. The accessibility snapshot exposes a named Slider and a
figure describing the matched treatment.

Measured canonical behavior:

| Action | Value / result | Synchronized presentation |
| --- | ---: | --- |
| Initial | `50` | progress `50%`, clip `inset(0 50% 0 0)` |
| ArrowRight (LTR) | `51` | progress `51%`, clip `49%` remainder |
| ArrowLeft | `50` | returns to exact midpoint |
| Home | `0` | After clip empty; divider at logical start |
| End | `100` | After layer full; divider at logical end |
| Pointer at first quarter | `23` | native thumb correction reflected exactly |
| Form test | `75` then reset to `25` | progress resets from `75%` to authored `25%` |
| Disabled | no focus or value change | comparison remains perceivable |
| RTL ArrowRight | `50` to `49` | native physical-right motion and logical clip agree |

Five native user actions produced five bubbling `input` and five `change`
events. Studio values `-10`, `150`, and `51.6` render as `0`, `100`, and `52`.
No live region mirrors range changes.

With the Web runtime module replaced by an empty valid module before reload,
the application still renders: the root has no enhancement attribute, retains
the authored `50%` reveal, exposes zero component animations and hides the
unsynchronized input. In settled reduced-motion mode the component has zero
animations. Forced-colors focus, dark mode and disabled presentation remain
perceivable.

## Visual And Browser Evidence

Final evidence lives in
`output/playwright/refinement-sections/before-after-0233/` with 19 PNGs:

- paired Exhibit/Studio at `390x844`, `768x1024`, `1440x900`, and
  `1920x1080`;
- exact `0` and `100` endpoints;
- focus-visible, disabled, dark, forced-colors focus and reduced motion;
- Arabic RTL, direct `320px` extreme unbroken content and effective 200% text;
  and
- no-runtime static fallback.

The same source photograph receives two fixture-only treatments, keeping
subject, crop and focal point aligned. At the default value the warm treatment
is revealed from logical inline start and labels remain on their matching media
layers. Arabic RTL correctly moves that reveal origin to the right.

Root and document overflow are both zero in the direct 320px unbroken-content
case and at effective 200% text. One Playwright session, one browser and one tab
were used. The console reports zero errors and zero warnings. Browser and server
resource cleanup passes after evidence capture.

Historical baseline evidence remains in
`output/playwright/batch76-before-after/before/` and documents unrelated media,
the fixed midpoint and inert visual handle.

## Performance

| Surface | Actual gzip-9 | Ceiling | Result |
| --- | ---: | ---: | --- |
| Sections family | `6,776 B` | `6,861 B` | pass, `85 B` headroom |
| Neutral component CSS | `70,556 B` | `65,536 B` | documented program gap `5,020 B` |
| Shared runtime | `19,495 B` | `8,192 B` | documented program gap `11,303 B` |

S17's isolated CSS slice is `4,223 B` raw / `1,170 B` gzip-9, SHA-256
`ddb2110035a127400053d8540ba132c1d42bf46c7ef72348e947fdbf45afab4f`.
S17 adds zero JavaScript bytes and reuses canonical Slider synchronization from
ADR 0094. ADR 0233 documents the CSS change on the global bundle gap; ceilings
were not raised.

Runtime work is bounded to initial and event/attribute/reset synchronization.
There is no S17 timer, observer beyond inherited Slider attribute observation,
animation frame, layout read, pointer-capture engine, network request or owned
media asset.

## Cross-Target Position

- Neutral Web is implemented through semantic HTML, CSS and shared Slider JS.
- Shopify receives canonical CSS/runtime assets, but a target-native section
  still needs two image pickers, localized label/caption/state-label settings,
  value/disabled/name mapping, editor preview and certification.
- React/Angular expose controlled or uncontrolled percentage around the same
  native range and consume native input/change; no second hidden input.
- Webflow/Framer expose the nine semantic decisions, not geometry or a custom
  drag engine.
- Figma may show `0/50/100`, focus and disabled artwork, but remains a target
  rather than behavior evidence or source truth.
- SwiftUI/Compose use one platform-native Slider state to drive equivalent
  logical clipping and accessibility value.

## Validation

- `node --check components/js/theme.js` — pass.
- Site TypeScript `--noEmit` — pass.
- `npm run validate:contracts` — 183 contracts.
- `npm run validate:studio` — 183 definitions, 986 semantic properties, 1,639
  public token references and 30 icon choices.
- `npm run validate:docs` — pass; documented reference/style warnings only.
- Web and Shopify adapter build/validation — pass.
- `npm run audit:components` — 183/183 automated pass.
- Exhibit/Studio keyboard and functional-state reports — S17 pass in both modes.
- `npm run audit:refinement` — 183 dossiers, 206 dependency edges, 130 ready for
  human review.
- `npm run audit:refinement:performance` — 18 surfaces, 10 pass, eight
  documented gaps and zero undocumented gaps.
- `npm run evidence:assert-clean` and `git diff --check` — pass.
- `site/dist` — untouched.

## Risks And Required Human Review

1. Approve or revise stage ratio/maximum measure, crop, divider width, canonical
   thumb size, state-label surface/inset and caption placement.
2. Approve or replace the matched treatment fixture and provide valid
   S17-specific Figma/reference evidence; the registered nodes belong to
   Button.
3. Target owners must supply truly aligned media, useful alternatives, loading,
   rights and focal-point policy.
4. Build and certify the Shopify section/schema/editor lifecycle before
   target-ready promotion.
5. Continue global CSS/runtime consolidation; do not normalize current bundle
   overruns by raising ceilings without a separate decision.

## Readiness Decision

`ready for human stability review`. Architecture, implementation, semantics,
interaction, responsive/accessibility evidence, shared-renderer parity,
adapter generation, performance accounting and resource cleanup are complete.
Human review is explicitly pending, contract status remains `pilot`, and no
`stable` promotion was made.
