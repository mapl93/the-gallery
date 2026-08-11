# Refinement Batch 07: Input, Textarea, Checkbox

Date: 2026-07-13

Status: All three ready for human review; none promoted to `stable`

## Batch Result

| Component | Contract | Technical result | Human input |
| --- | --- | --- | --- |
| Input | `0.7.0` | Native form properties, explicit value ownership, logical icons, bounded content, semantic contrast, reduced motion, forced colors | Approve density, surface, rings, semantic mixes, icon/message hierarchy |
| Textarea | `0.5.0` | Input composition, native form/value ownership, resize modes, 3–8 line evidence, bounded RTL content, special-media inheritance | Approve default height, resize handle, spacing, shared field visuals |
| Checkbox | `0.3.0` | Native checked/mixed ownership, Space/form/reset evidence, 20px-on-24px alignment, readable semantic states, bounded labels | Approve size, gap, radius, fills, Check/Minus, focus treatment |

ADR 0092 records the native form surface, controlled/uncontrolled translation,
dynamic-feedback timing, semantic contrast strengthening, logical geometry, and
Checkbox alignment/indicator boundary. It narrowly amends Textarea ADR 0052
without changing Input composition or multi-line ownership.

## Shared Evidence

- 24 canonical screenshots: three components, Exhibit and Studio, Mobile
  `390x844`, Tablet `768x1024`, Desktop `1280x800`, and XL `1600x1000`.
- 5 supplemental images: three before cases, one `280px` RTL/extreme composition,
  and one forced-colors plus reduced-motion composition.
- Exhibit/Studio stage markup is normalized-identical: Input `474`, Textarea
  `492`, Checkbox `261` characters. Input/Textarea differ only in remount-generated
  React ids; Checkbox is byte-identical.
- Browser console contains 0 errors and 0 warnings; React development information
  is the only message.

Evidence directory: `output/playwright/refinement-batch-07/`.

## Source Changes

- Input/Textarea: direct native `name`, `required`, `readOnly`, `autocomplete`,
  `minLength`, and `maxLength`; explicit initial/live value ownership; Studio
  form controls; MDX/API/accessibility guidance.
- Shared field CSS: logical inline icon geometry, bounded/wrapping content,
  disabled-safe hover, private readable semantic boundaries/icons, reduced
  motion, and forced-colors system focus/icon colors.
- Textarea: explicit inline containment while preserving accepted Horizontal and
  Both native resize directions and existing line-bound enhancer.
- Checkbox: corrected semantic-focus selectors, body line-height, first-line
  centering, bounded label, strengthened semantic border/label, readable semantic
  indicators, and controlled/uncontrolled documentation.
- Contracts, registry, Studio metadata/renderers, MDX, dossiers, Neutral Web and
  Shopify adapters, ADR, reports, and global matrix are reconciled. `site/dist`
  was not rebuilt.

## Interaction And Accessibility Evidence

- Native value/reset: Input `seed -> changed -> seed`; Textarea
  `initial note -> changed note -> initial note` with correct FormData.
- Read-only fields remain focusable/submittable and are barred from constraint
  validation; an empty required Input fails native validity.
- Textarea 3–8 lines resolves to `94px`–`214px` from computed metrics.
- Checkbox begins checked+mixed, still submits checked value, clears mixed marker
  on user change, restores default checkedness on reset, and toggles via real
  Space while retaining focus.
- `280px` RTL extreme fixture: exact `280px` fields/root, logical icon insets
  `12px`, both icon paddings `40px`, two-line Checkbox target `48px`, and zero
  document/host overflow.
- Worst light semantic results: field/Checkbox boundary `3.83:1`, field text
  `5.34:1`, Checkbox indicator `4.76:1`. Dark minima are higher.
- Reduced-motion field/Checkbox transitions resolve to `0s`; forced colors uses
  a `4px` system input focus boundary and native Checkbox appearance.

## Performance

| Surface | Current gzip | v1 ceiling | Result |
| --- | ---: | ---: | --- |
| Neutral component CSS | `57,520 B` | `64 KiB` | pass |
| Shared enhancement JS | `5,180 B` | `8 KiB` | pass |
| Primitives CSS | `10,274 B` | `10.3 KiB` | pass (`273 B` headroom) |

Input adds `0 B` component JavaScript. Textarea reuses bounded shared metric
enhancement. Checkbox reuses one change listener per enhanced control and no
layout work. No component adds polling, timer, request, formatter, data model,
or network asset.

## Remaining Risks And Questions

1. All three require owner visual approval; automated evidence cannot promote
   them to `stable`.
2. Their registered Studio references reuse calibration metadata and are not
   component-specific owner visual evidence.
3. Required status is author-visible label/instruction content, not an automatic
   marker. Adding generated anatomy requires separate visual review.
4. Checkbox's encoded semantic indicator stroke is a documented private literal
   that cannot follow arbitrary token overrides; inline/slot replacement would
   need a new decision.
5. Textarea Horizontal/Both resize may grow beyond a tight layout by design;
   silently clamping inline size would defeat the selected mode.
6. Primitives CSS is close to its family ceiling. The next primitive/control
   batch must avoid duplication or revise the budget with evidence.

## Validation

- Registry, token source, 183 contracts, 183 Studio definitions, and 183 MDX
  pages validate; Studio covers 808 semantic properties and 1,348 token
  references.
- Web validates 183 components with 19 human-review-ready. Shopify validates 183
  components with 43 target-ready; its 26 existing maturity warnings are
  unchanged and non-blocking.
- Structural certification reports 183 passes, 0 coverage gaps, 1 human-approved
  stable component, and 182 manual-review gates. The refinement matrix reports
  21 dossiers and 19 human-review-ready components.
- Exhibit/Studio parity covers all 183 components with 0 renderer/fixture gaps.
  Static preview audit covers 250 previews with 0 errors, 1 existing warning,
  and 6 informational notes.
- A clean temporary docs build processes 2,423 modules. Its CSS is `796.35 kB`
  (`71.26 kB` gzip) and main JavaScript is `2,007.77 kB` (`404.78 kB` gzip);
  the existing Vite chunk-size warning remains the only build warning.

## Next Dependency-Ordered Batch

Continue phase 3 with Radio, Quantity Selector, then Switch. Apply the accepted
native choice/form ownership, validation contrast, focus, logical geometry, and
controlled/uncontrolled rules without reopening them.
