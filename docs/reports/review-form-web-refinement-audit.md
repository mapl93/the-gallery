# Write-a-Review Form Web Refinement Audit

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

## Outcome

V7 Review Form is now a strict native composition of canonical Star Input,
Input, Textarea, File Upload, Select, and Button. Registry, contract `0.3.0`,
renderer and docs declare the same dependency graph. Review Form owns only the
native form, structural layout, submit-request boundary and optional target
response composition; every child keeps its own values, constraints, messages,
states and runtime.

The shared renderer now associates Input and Select guidance and uses the
canonical File Upload label-root, visible policy and selected-file status. The
Studio fixture explicitly describes its image-only policy and intercepted local
submit; it never claims an upload or persisted review. Unused legacy Review Form
field/photo hooks were removed instead of preserved as a hidden second API.

The result is prepared for explicit human review, not stable. Provider, required
fields, accepted files, moderation, validation summary, pending/errors/success,
reset/redirect and component-specific Figma artwork remain open target/product
boundaries.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Native review-entry composition; no provider, upload transport, moderation, persistence or success ownership. |
| Anatomy and composition | pass | One native form, six canonical component dependencies, structural wrappers/actions and optional target status. |
| Variants, states and modes | pass | Child Default/Error/Success/Warning, native required, file empty/selected, submit request, minimal composition, themes and special modes. |
| Public API | pass | Accessible name and eight semantic slots only; child state, file policy and layout internals stay private/target-owned. |
| Controlled/uncontrolled | pass | Static Web uses child-native form values; frameworks own one value per child and one submit request, never a duplicate form store. |
| Canonical dependencies | pass | Registry and contract declare Star Input, Input, Textarea, File Upload, Select and Button; no duplicated field markup or behavior. |
| Tokens and visual system | pass | Four layout/response tokens; 600px width stays private; child visuals remain in child contracts; legacy hooks removed. |
| Accessibility and motion | pass | Native form/radios/fields/file/submit, complete descriptions, visible required fixture label, native blocking/focus, forced colors and reduced motion. |
| Responsive/content resilience | pass | Four viewports plus 280px RTL/200% localized content without visible horizontal overflow. |
| Runtime and assets | pass | Zero neutral Review Form orchestration; child enhancers remain independently owned; Upload icon is Studio-only. |
| Cross-target translation | pass | Web implemented; Shopify/Webflow CSS regenerated and identical; provider target remains deliberately planned. |
| Exhibit/Studio parity | pass | One renderer and fixture; byte-identical root DOM at all four viewports. |
| Human readiness | pass | Dossier, ADR, contract, docs, targets, evidence, budgets, risks and gates complete; status remains `pilot`. |

## Contract And Browser Evidence

- The shared initial form exposes ten programmatically focusable elements but
  six sequential Tab stops: checked radio, title Input, Textarea, enhanced
  Select trigger, native file input and submit Button.
- ArrowRight changes the canonical radio value from four to five. The Select
  opens from its trigger, End targets the last option, Enter commits `service`,
  and the hidden native select retains the same submitted value.
- File selection keeps one native `FileList`, adds the canonical selected class,
  displays and announces `textured-vase.jpg`, and contributes the real
  `343,874 B` JPEG `File` to `FormData`.
- `FormData` also contains the native rating, title, body and classification
  name/value entries. No hidden Review Form copy exists.
- Inspector reset restores rating four, initial title/body/topic, zero native
  files, `No photo selected.`, and an empty response region.
- Removing the selected rating makes `checkValidity()` false. Native submission
  is blocked, response feedback remains empty and focus lands on the first
  rating radio.
- The initial Input, Textarea, enhanced Select and File Upload all expose their
  visible guidance through `aria-describedby`; the file input has a primary
  `aria-labelledby`, and selected status remains an independent polite region.
- Removing all optional slots leaves one Star Input, one Textarea and one submit
  Button with no title, file, select or response placeholder.
- At 280px, RTL and 200% type, long Arabic/German content produces
  `scrollWidth === clientWidth === 280` and no visible descendant overflow.
- Sampled light-mode contrast bottoms at `5.34:1`; dark-mode contrast bottoms at
  `12.03:1`. Forced colors exposes system border/focus colors. File Upload,
  Select, Button and Star Input transition durations are `0s` under reduced
  motion.
- Exhibit/Studio root `outerHTML` is identical at Mobile, Tablet, Desktop and XL
  with SHA-256
  `754ca255a850f5dd9699faf7697827454c96ff967603be6857f277f81733e9ad`.

Seventeen final screenshots live under
`output/playwright/refinement-batch-53/final/`; eight before images remain under
`output/playwright/refinement-batch-53/before/`.

## External And Figma Evidence

The [HTML forms model](https://html.spec.whatwg.org/multipage/forms.html#the-form-element)
defines named successful controls and native constraints, while the
[submission algorithm](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-2)
separates a cancelable submit request from actual transport. The
[WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/),
[validation guidance](https://www.w3.org/WAI/tutorials/forms/validation/) and
[notification guidance](https://www.w3.org/WAI/tutorials/forms/notifications/)
support native labels, grouped controls, descriptions and truthful result
feedback. [Open UI File](https://open-ui.org/components/file/) keeps one native
selection owner and visible selection state. [Radix Form](https://www.radix-ui.com/primitives/docs/components/form)
and [Polaris form controls](https://shopify.dev/docs/api/app-home/web-components)
support composition and child-owned names, values, errors and events without
authorizing a framework or provider dependency in neutral source.

Figma nodes `943:7` and `1020:480` are generic Button component-detail and
Studio inspector frames, not approved Review Form artwork. No form visual value
was promoted from them. Full comparison and links are recorded in
`docs/refinement/dossiers/review-form.md`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native form plus canonical child markup and independently owned child enhancers. | Implemented and evidenced with zero Review Form orchestration runtime. |
| Shopify | Provider app block/proxy supplies review schema, auth, endpoint, files, moderation and response lifecycle. | Generated CSS ready/planned; no provider-free placeholder Liquid. |
| Webflow | Native form/integration using copied canonical classes. | Generated CSS available; provider and workflow remain external. |
| React / Angular | One controlled value or child default per control plus one submit request. | Contract-ready; no parallel form-value store. |
| Figma | Reviewed form layout composed from accepted child instances. | Planned; component artwork is absent. |
| SwiftUI / Compose | Target-native rating, fields, media picker and submit action. | Conceptual; asynchronous workflow remains target-owned. |

Canonical `components/css/reviews.css`, Shopify `assets/reviews.css` and Webflow
`reviews.css` are byte-identical. Shopify remains at 56 target-ready components;
official artifact `review-form-batch-53` revision 1 passes.

## Performance And Risks

| Surface | Deterministic gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,697 B` | `3.7 KiB` (`3,788 B`) | pass; `91 B` remaining and `90 B` recovered from baseline |
| Shared neutral runtime | `10,492 B` | `8 KiB` (`8,192 B`) | existing `2,300 B` program exception; `0 B` added |
| Neutral Web components CSS | `67,298 B` | `64 KiB` (`65,536 B`) | existing `1,762 B` program gap after regeneration |

- Human review must approve 600px width, hierarchy, required-rating copy,
  mixed child validation examples, upload surface/policy copy, action emphasis
  and spacing.
- Provider, record schema, auth, endpoint, verification, moderation, anti-abuse,
  retries, success, reset, redirect, focus and analytics remain target-owned.
- Required title/body/classification/photo policy is not selected by this batch.
- File type/count/size/dimensions, consent, scanning, removal and upload network
  budgets require explicit policy.
- Native browser validation is preserved, but a production target may need a
  deliberate localized error summary and server-error focus strategy.
- No component-specific Figma artwork exists.
- Global Web CSS/runtime overages remain program gaps, not budget increases.

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, canonical static preview,
native constraints, keyboard order, Star Input/Select/File Upload interaction,
FormData/reset, message associations, optional slots, four-viewport exact
parity, 280px localized RTL/200% containment, light/dark contrast, forced colors,
reduced motion, Neutral Web, Shopify, Webflow, official Shopify artifact,
source/generated identity, deterministic gzip, TypeScript, a temporary Vite
build outside `site/dist`, structural/static/parity/refinement audits and diff
checks comprise Batch 53.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Human Review Queue

1. Approve or revise width, hierarchy, gaps, required-rating wording, mixed child
   states, upload surface/copy and submit emphasis.
2. Decide required fields and visible instructions per real review workflow.
3. Select provider, schema, auth, endpoint, moderation, anti-abuse and
   submission/response/reset behavior before target integration.
4. Define file policy, consent, scanning, previews/removal and performance before
   production upload work.
5. Decide whether a localized aggregate error summary and focus strategy is
   required for the selected target.
6. Create component-specific Figma artwork only after browser approval.
7. Keep the contract `pilot` until explicit human stability approval.
