# Component Dossier: Before / After Image Slider

Status: `human-review-ready`

Target reviewed: Neutral Web interactive comparison with canonical Slider
composition and cross-target translation

Contract: `components/contracts/before-after.contract.json`

Owner decision: `S17-A`, recorded in
`docs/refinement/owner-decision-responses.md` and ADR 0233

## Recommendation

Implement one horizontal interactive image comparison that composes canonical
Slider. A single native `input[type="range"]` owns value, focus, pointer, touch,
keyboard, form participation and reset. Its fixed percentage domain is `0..100`,
step `1`, with default `50`; the media clip and decorative divider derive only
from that native owner.

Neutral Web remains uncontrolled: the authored value is the native default and
the existing Slider enhancement synchronizes the private CSS percentage after
initialization, `input`, `change`, attribute mutation and form reset. Framework
targets may offer controlled `value` and uncontrolled `defaultValue` around the
same native owner, but cannot add a mirrored hidden value or second drag engine.

## Purpose, Use Cases, And Limits

- Compares two spatially aligned visual states by revealing one media layer
  over the other.
- Supports material/process, restoration, treatment, customization or another
  matched-state comparison.
- Use two independent figures when the media are not aligned or direct reveal
  adds no understanding.
- Use canonical Slider alone when numeric selection is the task and there is no
  media comparison.
- Media selection, crop, focal point, responsive source, loading, rights,
  consent, analytics and business data remain target-owned.
- Image editing, registration, zoom, pan, multiple stops and vertical
  orientation are outside v1.

## Current Gallery Baseline

- Registry `S17` describes a draggable slider but declares no dependency.
- Contract `0.2.0` documents a passive fixed midpoint and an opaque optional
  `control` slot.
- CSS fixes overlay clipping and divider at `50%`, draws a `40px` visual knob
  and font-dependent chevrons, but supplies no value or interaction owner.
- The divider strongly looks draggable while being unfocusable and inert.
- Exhibit/Studio render two unrelated editorial photographs and an
  `aria-hidden` handle, so the fixture cannot demonstrate aligned comparison.
- Studio exposes a Control slot rather than a semantic range value.
- The registered Figma nodes `943:7` and `1020:480` show Button artwork, not
  Before / After.

The accepted owner decision resolves this contradiction in favor of one
canonical native Slider owner.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML range state](https://html.spec.whatwg.org/dev/input.html) | Native range supplies numeric min/max/step/value behavior, form ownership and reset. | Keep one real range input as the complete interaction owner. |
| [WAI-ARIA APG Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) | A slider needs a name, current/min/max values and Arrow/Home/End keyboard behavior; custom touch-AT gestures require device testing. | Prefer native range over a custom draggable divider and preserve browser keyboard/touch behavior. |
| [WAI image groups](https://www.w3.org/WAI/tutorials/images/groups/) | Related images require deliberate alternative-text and relationship handling. | Require one comparison label and target-authored useful alternatives without redundant announcements. |
| [Open UI Slider research](https://open-ui.org/components/slider.research/) | Common anatomy includes label, track, handle, active fill and value with controlled state common in frameworks. | Reuse Slider ownership while applying a media-comparison visual profile. |
| [Open UI enhanced range explainer](https://open-ui.org/components/enhanced-range-input.explainer/) | Native range is preferred for reliability while custom track interactions remain complex. | Avoid a parallel pointer-capture engine. |
| [Radix Slider](https://www.radix-ui.com/primitives/docs/components/slider) | Mature APIs support controlled/uncontrolled values, steps, disabled, keyboard, touch and RTL. | Translate the same semantic value boundary in framework adapters without adopting a React source dependency. |
| [Polaris Range Slider](https://polaris-react.shopify.com/components/selection-and-input/range-slider) | Range controls require a label and expose value, min, max, step, disabled and change. | Keep a required localized label and native events; dual-thumb behavior is not part of S17. |

No standard defines a special Before/After role. The interoperable semantics are
a grouped media comparison plus one native slider.

## Owner Reference Audit

Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, nodes `943:7`
and `1020:480`. They show Button controls and “Add to cart” artwork, not S17.
They cannot approve media ratio, crop, divider, thumb, labels or spacing.

The owner approved interaction architecture only. Final media and control
artwork remain explicit human-review questions.

## Anatomy And Composition

| Part | Requirement | Neutral Web semantics / owner |
| --- | --- | --- |
| root | required only with valid label and both media | `figure` plus canonical `.slider` root |
| stage | required | canonical `.slider__track` profile containing aligned media and range input |
| media frame | required | clips both aligned visual layers and owns private aspect ratio/radius |
| before media | required | target-owned native image/media |
| after overlay | required | clipped layer derived from native range percentage |
| after media | required | target-owned aligned native image/media |
| control label | required | real localized `label` associated to the native input; may be visually hidden in the media-first profile |
| range input | required | canonical `.slider__input`, horizontal `0..100`, step `1`, sole focus/value owner |
| divider | required visual part | decorative line synchronized from Slider's private progress variable |
| before/after labels | optional | visible state text, not the control's accessible name |
| description | optional | `figcaption` and input description association |

The complete root is omitted when the label is blank or either required medium
is absent. The old opaque `control` slot is removed.

## State, Variant, Size, And Mode Matrix

| Dimension | v1 scope | Behavior |
| --- | --- | --- |
| variant | default | One media-first horizontal profile. |
| size | default | Container-responsive; ratio, measure and thumb geometry remain private. |
| value | `0..100`, default `50`, step `1` | Native range value maps directly to reveal percentage. |
| endpoints | `0`, `50`, `100` | None, midpoint and full After reveal; divider/thumb remain synchronized. |
| enabled | default | Pointer, touch and native keyboard operation. |
| disabled | optional | Comparison remains visible; native input unavailable and control treatment muted. |
| focus-visible | native thumb | Canonical Slider focus hierarchy, no focus on decorative divider. |
| writing direction | LTR / RTL | Inline reveal origin and divider movement follow the computed direction. |
| no enhancement | static | Authored midpoint/value is visible; inactive range affordance is hidden to prevent desynchronization. |
| reduced motion | unchanged | No component animation or interpolation exists. |
| color modes | light, dark, forced colors | Thumb, divider, labels and focus remain perceivable independently of image contrast. |
| required content | valid / missing | Missing label or either media omits the complete root. |

## Public API And Ownership

Expose:

- `label`: required non-empty localized comparison-control label.
- `description`: optional visible comparison description.
- `beforeMedia` and `afterMedia`: required aligned target-owned media slots.
- `beforeLabel` and `afterLabel`: optional visible state labels.
- `value`: percentage with default `50`, minimum `0`, maximum `100`, step `1`.
- `disabled`: default `false`.
- `name`: optional native form name.

Do not expose min, max, step or orientation in v1; the accepted comparison model
fixes them. Do not expose crop, ratio, divider width, thumb size, label inset,
clip-path, control hit area or private CSS progress.

Static Neutral Web maps `value` to the native input's authored default and is
uncontrolled. It emits native bubbling `input` and `change`. Framework adapters
may expose distinct controlled `value` and uncontrolled `defaultValue` syntax,
but both map to the same native input. Native reset restores the authored
default; no hidden input or parallel React state owns the percentage.

## Token And Literal Audit

| Baseline value | Assessment | Direction |
| --- | --- | --- |
| fixed `50%` clip/divider | unresolved duplicate presentation | replace with canonical `--_slider-progress`, initialized from the native default and synchronized by Slider |
| `40px` knob and touch-target token | private visual plus public accessibility geometry | reuse canonical native thumb/focus behavior; keep profile geometry private |
| `800px` maximum width | private measure candidate | express with logical units and retain pending visual review |
| literal white/black labels/handle | non-semantic color | replace with semantic text/surface/current-color composition and forced-color overrides |
| `1.5px`, `12px`, `4px 12px`, weight `600`, tracking `.06em` | private visual recipe | reconcile with semantic spacing/type tokens; keep remaining artwork values private |
| Unicode chevrons | font-dependent iconography | remove; the native Slider thumb and divider are sufficient |
| radius/shadow/focus tokens | established public system values | retain only where the final CSS consumes them |

No new public component token is justified. The comparison percentage is
component state, not a design token.

## Responsive, Content, And Accessibility Tests

- Exact `0`, `1`, `50`, `99`, `100`; Arrow keys, Home, End, pointer and native
  programmatic input/change.
- Form reset to authored default, disabled input, optional name and bubbling
  events.
- Short, blank, long, localized and unbroken required label; optional
  before/after labels and description independently omitted.
- Required before or after media missing; both valid; aligned aspect/crop;
  failed target media remains target policy.
- Direct `200px`, mobile, tablet, desktop and XL containers, effective 200%
  text, LTR/RTL, dark, forced colors and reduced motion.
- No root/document horizontal overflow, clipped focus, duplicate focus owner,
  live-region spam or value/clip/divider desynchronization.
- Exact Exhibit/Studio DOM and behavior parity through one renderer and fixture.

Alternative text must describe each useful state or use a deliberate grouped
strategy. Visible state labels never replace useful media alternatives or the
range's accessible name. No live region announces every value change; native
range semantics are sufficient.

## Runtime And Performance Budget

- Reuse existing `enhanceSliders`; add zero S17-specific runtime module.
- One native input, one initialization sync and event-driven updates only.
- No custom pointer capture, polling, timer, animation frame, layout observer,
  network request or component-owned media.
- CSS owns clipping/divider presentation from the one synchronized private
  percentage.
- No-enhancement output remains a readable static comparison and hides the
  inactive control affordance.
- Sections family must remain below its fixed budget; global overruns stay
  documented rather than normalized by raising ceilings.

## Cross-Target Translation

| Target | Mapping |
| --- | --- |
| Neutral Web | figure/media composition plus canonical native Slider input and shared synchronization runtime |
| Shopify | future section with two `image_picker` settings, label/description/state labels, default percentage, disabled/name where useful and the same native markup/runtime; editor preview requires certification |
| React/Angular | controlled `value` or uncontrolled `defaultValue` around the same native range; equivalent input/change and media slots |
| Webflow/Framer | fixed 0–100 percentage control, semantic label/media/disabled/name only; no custom drag engine |
| Figma | visual 0/50/100, focus and disabled variants; prototype interaction is not runtime evidence or source truth |
| SwiftUI/Compose | one platform-native slider state drives the clipped layer with equivalent label/value/disabled accessibility |

## Risks And Human Questions

1. Supply valid S17-specific visual reference; current Figma nodes belong to
   Button.
2. Human review must approve media ratio/measure/crop, divider and thumb form,
   state-label surface/inset, caption placement and focus geometry.
3. Targets must supply truly aligned media, useful alternatives and rights.
4. Shopify section schema, editor preview and target asset behavior remain
   separate adapter implementation work.

## Readiness Direction

Source, contract, canonical Slider composition, shared renderer, responsive and
interaction evidence, adapters, performance accounting and automated gates are
complete. S17 is ready for human stability review. It remains `pilot` and
cannot become `stable` without explicit owner review.
