# 0313. Slider Visual Customization And Runtime Parity

Status: Accepted

Date: 2026-09-09

## Decision

Continue the authorized component batches under ADR 0293 with horizontal Slider.
Expose six decisions in the existing source component layer: track height 4px,
thumb size 20px, control height 44px, label/feedback gap 8px, label/value gap 16px,
and thumb border width 2px. Preserve current defaults and reuse Body weight and
Input focus-ring width. The control height accommodates its configured thumb.
This is a geometry relationship, not a new universal minimum target policy.

All 31 public roles have metadata-driven Studio controls and Exhibit reference.
Replace the unused secondary-surface entry in Slider's inventory with its actual
default Input border mix input; do not delete the shared alias. Shared text, fill,
surface, validation, radius, shadow and motion roles retain their meaning. Track
and validation contrast mixes remain private derivations with named editable
inputs. Progress, centering, native pseudo-element mechanics, RTL direction and
forced-color system colors are implementation or data, not public tokens.

Apply ADR 0274 to Slider's state list: retain default, focusVisible and disabled.
Single/range is already the independent mode, validation has its own property,
and rangeFill is anatomy. Preserve all CSS selectors and semantic properties;
include both engines and both modes in focus/disabled coverage. No orientation,
marks, tooltip, scale or additional mode is introduced. Contract remains pilot.

Studio uses the canonical Slider enhancer for track activation and native value
synchronization. It no longer pre-marks uninitialized roots as enhanced. Key the
root by mode so native owners get their listeners when the structure changes;
changing a value preserves the current owner and focus. Consume native input
events, including events dispatched by the enhancer, into the controlled fixture.
Also honor native min/max defaults when attributes are absent or empty: Number(null)
must not turn the missing maximum into zero and erase the progress.
Track activation cancels its default pointer action after confirming usable bounds,
so the browser does not immediately blur the native owner selected by the enhancer.
Keep WebKit and Mozilla pseudo-elements in separate selector lists for disabled
cursor, reduced motion and forced colors. An unsupported selector invalidates
the ordinary list, as documented by [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Selector_list).
Chromium had therefore discarded these authored rules, including the standard
range-track border grouped with vendor pseudo-elements. Splitting them restores
the existing intended treatments without changing normal-theme defaults.

## Acceptance and adoption

Check default geometry/colors, overrides and reset, native keyboard and track
activation in Studio and an installed HTML consumer, ordered values, FormData,
reset, disabled behavior, bounds, RTL, themes and narrow containers. Exercise
Before / After composition and forced colors/reduced motion. Record actual
engines and limitations in the checkpoint, without claiming human approval.

Generate matching Web and Shopify CSS, tokens and runtime. Copy-and-own consumers
adopt that set explicitly; no hosted theme or existing copy updates automatically.
The old secondary-surface alias remains available to other consumers. Contract
state inventory changes affect metadata consumers, not CSS selector availability.
Strict DTCG export, package policy and optional advanced Slider features remain
separate decisions. Figma stays outside delivery under ADR 0303.
