# Product Form Web Refinement Audit

Status: Human-review-ready; contract remains `pilot`

Date: 2026-07-20

Accepted direction: D5-A / ADR 0241

## Outcome

Product Form is one complete native purchase form that composes canonical
Variant Selector, optional Quantity Selector and Button. Named child controls,
constraint validation, activated submitter, FormData and reset remain functional
without JavaScript. The shared product coordinator supplies the resolved
merchandise projection; Product Form does not mirror values or maintain a
variant catalogue.

D5-A closes the architecture blockers. Native submission is required, while a
capable target may optionally intercept that same valid form/FormData for Ajax.
The target then owns its entire asynchronous lifecycle and cannot create a
parallel purchase path. Accelerated checkout and generic supplementary slots are
excluded from neutral v1. Selling plans, personalization, uploads, gifts and
preorders require separately accepted compositions. Shopify merchants may show
or omit Quantity.

The component is prepared for human stability review but was not promoted to
`stable`.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Native purchase-submission boundary; no Price, variant database, mirrored form object, cart client, analytics or neutral live region. |
| Anatomy and composition | pass | Real form root, optional canonical Variant/Quantity, optional target feedback, action row and one canonical submit Button. |
| Variants, sizes and states | pass | One intrinsic presentation/size; submit-only, Variant, Quantity, combined, unavailable, pending and feedback coverage. |
| Public API and ownership | pass | Six semantic properties; target data and asynchronous policy stay outside Studio appearance controls. |
| Tokens and visual system | pass | One public spacing token plus private composition variables; children retain their own tokens and geometry. |
| Accessibility and interaction | pass | Native validity/FormData/reset, explicit submitter, `52px` action, `2px` focus-visible outline, stable pending label and no component live region. |
| Responsive/content resilience | pass | Four viewports, localized long RTL content, dark, forced colors, reduced motion and effective 200% zoom without component overflow. |
| Runtime and assets | pass | `0 B` neutral Product Form runtime; no listener, request, observer, timer, service or asset. |
| Cross-target translation | pass with release evidence pending | Web/React presentation and Shopify native/coordinator mapping are implemented; live store remains a target release gate. |
| Exhibit/Studio parity | pass | Exact identical `4,404`-character form outerHTML from the shared ProductStudio renderer and fixture. |
| Architecture/readiness | pass | D5-A, ADRs 0239–0241 and implemented coordinator resolve purchase, scope and Quantity ownership. |

## Research And Decision Evidence

- [HTML forms](https://html.spec.whatwg.org/multipage/forms.html) provide a real
  form boundary, named controls, native validation and submission without client
  scripting; scripts may augment that behavior rather than replace it.
- [WAI validation](https://www.w3.org/WAI/tutorials/forms/validation/) and
  [notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) require
  understandable errors and appropriately timed feedback, leaving result focus
  and announcement policy with the owning target workflow.
- [Radix Form](https://www.radix-ui.com/primitives/docs/components/form) preserves
  native constraint validation but its React state layer is not a cross-target
  source model.
- Shopify's [product form tag](https://shopify.dev/docs/api/liquid/tags/form#form-product)
  supplies the target-native add-to-cart form. The
  [Cart Ajax API](https://shopify.dev/docs/api/ajax/reference/cart#post-locale-cart-add-js)
  can accept the same form data when a target chooses an in-page cart experience.
- ADR 0117 established native form/canonical composition; ADRs 0239 and 0240
  establish the bounded product coordinator and exact selection policy. ADR 0241
  records D5-A and supersedes the previously open lifecycle/scope questions.
- WAI-ARIA APG and Open UI do not define a specialized Product Form widget; native
  form semantics and canonical child contracts remain the correct baseline.

## Contract And Browser Evidence

- Contract `0.3.0` validates with six anatomy parts, one variant/size, seven
  states, eight behaviors, six properties and one public token.
- Default FormData is `glaze=celadon`, `size=M`, `quantity=1`,
  `merchandise=celadon-m`, `intent=add`. A valid activation emits exactly one
  submit containing the activated submitter.
- Ink/L plus Arrow Up produces `quantity=2`, `merchandise=ink-l`; native reset
  restores the complete default dataset.
- Clearing both required groups makes `checkValidity()` false. `requestSubmit()`
  does not emit a second submit.
- Selecting sold-out Porcelain disables and removes merchandise from FormData,
  disables the submitter and can expose the optional visible feedback placement
  without an automatic `role` or live region.
- Pending sets `aria-busy="true"`, disables repeat activation, preserves “Add to
  cart”, and animates only when reduced motion is not requested. Under reduced
  motion, the generated spinner animation is `none`.
- Omitting Quantity leaves one synchronized merchandise field, one submitter and
  a valid form. The form has no Price node.
- Exhibit and Studio are exactly equal at `4,404` outerHTML characters. The six
  Studio controls bind only canonical composition/action semantics.
- Mobile `390`, Tablet `768`, Desktop `1440` and XL `1920` have equal component
  client/scroll widths. The long Spanish action in RTL remains within `326px`.
  At effective 200% zoom the component remains within `131px`.
- Dark and forced-color modes remain legible. Keyboard focus matches
  `:focus-visible` and resolves to a `2px` solid outline; action height is `52px`.
- Browser evidence reports no page errors or warnings. One unrelated docs
  `favicon.ico` 404 is recorded as baseline.

Evidence manifest:
`output/playwright/refinement-product/product-form-0241/manifest.json`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Real form, named canonical children, target-provided action/data, intrinsic CSS and no base runtime. | Implemented, generated, validated and browser-tested. |
| Shopify | Product form tag, synchronized hidden id, quantity rules, canonical snippets/Button and merchant Quantity setting. | Implemented. Native submission is complete; one target coordinator refreshes the bounded product surface. |
| React / Angular | Native form host; each child owns controlled/uncontrolled state; product feature owns resolved merchandise and optional request/result state. | Shared React Exhibit/Studio renderer implemented; Angular translation documented. |
| Figma | Visible composition plus unavailable, pending and feedback presentations. | Planned; no commerce engine or data model. |
| SwiftUI / Compose | Native purchase view/form with target product model and platform progress/result handling. | Conceptual; DOM/Liquid details do not leak. |

The deterministic Shopify harness proves one Section Rendering response updates
native form `id=222`, Quantity `value=2`, `min=2`, `max=6`, `step=2`, submit
availability and one status. The unresolved response disables/omits merchandise,
omits Quantity and disables the submitter. The resulting native FormData is
`id=222`, `quantity=2`, `add=add`. This is adapter behavior evidence, not a
substitute for a live merchant catalogue.

## Performance And Risks

- Product CSS is `4,803 B / 5,324 B`, leaving `521 B`.
- Neutral component CSS is `70,985 B / 65,536 B`, a documented cumulative
  `5,449 B` gap.
- Shared neutral runtime is `21,633 B / 8,192 B`, a documented cumulative
  `13,441 B` gap.
- Shopify product coordinator is `2,133 B` gzip target evidence and adds no
  neutral byte. Product Form itself adds `0 B` runtime.
- The performance audit reports 18 surfaces, 10 passing and 8 documented gaps,
  with zero undocumented gaps. No ceiling was raised.
- Live Shopify native submission, high-variant replacement, Quantity omission,
  app-block and theme-editor behavior remain target release evidence.
- Any future Ajax cart adapter needs its own pending/error/retry/focus/
  announcement/cart-surface/rollback evidence and budget.
- Selling plans, personalization, uploads, gifts, preorder and accelerated
  checkout need separate canonical decisions if introduced.
- Human review must approve form rhythm, action width, feedback placement,
  unavailable/pending treatment and narrow layout.

## Validation

Registry/docs, DTCG source, 183 contracts, 183 Studio definitions, decision
coverage, Neutral Web and Shopify adapters, native FormData/validity/reset,
optional composition, four viewports, localized RTL, dark, forced colors,
reduced motion, effective 200% zoom, focus, exact Exhibit/Studio parity,
deterministic Shopify coordinator behavior, performance audit, diff checks and
resource cleanup pass. Shopify Theme Check reports no finding in the modified
Product Form snippet or Main Product section; its nonzero full-theme result comes
from pre-existing `_legacy` and `artist-profile` errors plus logo warnings.

`site/dist` was not rebuilt or modified.
