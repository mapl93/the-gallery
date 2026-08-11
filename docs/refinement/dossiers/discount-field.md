# Component Dossier: Discount / Promo Field

Status: `human-review-ready`

Target reviewed: Neutral Web, cart composition, and Shopify storefront cart

Contract: `components/contracts/discount-field.contract.json`

## Recommendation

Define Discount Field as a native progressive disclosure whose content composes
one required canonical Input, one required canonical Button submit action, and
an optional native list of zero or more target-confirmed applied codes with
canonical removal Buttons. The component presents entry and confirmed state;
the target owns code normalization, validation, applicability, stacking policy,
requests, totals, errors, announcements, analytics and persistence.

Use `details.discount-field` plus `summary.discount-field__toggle` so static Web
has native open/close, keyboard and form behavior with zero neutral JavaScript.
`expanded` maps the initial `open` attribute in static HTML; framework adapters
may control the live `open` property and `toggle` event. Do not add a second
disclosure controller or use an unnamed `section`.

Replace the single `applied` boolean, `appliedCode` string and global
`removeLabel` with one optional `appliedCodes` semantic slot. Shopify Ajax and
Storefront APIs both support multiple codes, and each returned code can be
inapplicable independently. A slot preserves complete target-confirmed records,
per-code labels and removal actions without imposing a universal raw commerce
schema.

Keep `toggleLabel`, `expanded`, `input` and `applyLabel`; make Input and the
apply label required. Add `applyDisabled` and `applyBusy` by composing canonical
Button. The Input slot owns its visible label, value, validation variant,
associated message and native form attributes. Do not duplicate those concepts
on K4.

## Purpose And Limits

- Lets a buyer reveal a compact code-entry form, submit a candidate code and
  review or remove target-confirmed applied codes.
- Supports no applied code, one code or multiple codes without changing the
  component variant.
- Keeps entered text available after recoverable validation failure through the
  composed Input owner.
- Can be placed near Cart Summary or another target-owned cart decision surface;
  the parent decides placement and whether it starts open.
- Is not a discount engine, promotion browser, automatic-discount display,
  formatter, calculator, cart store, eligibility checker, totals summary,
  checkout extension, coupon recommendation, analytics tracker or live region.
- Does not infer that a submitted code is applicable merely because a request
  completed. The target confirms returned applicability and refreshed totals.
- Does not decide whether multiple codes stack, replace one another or are
  allowed by a merchant/market/channel.
- Does not own error wording, status cadence, retry policy, request cancellation,
  offline recovery, focus after removal or cart-section refresh.

Automatic and line-item discounts remain Price/Cart Line Item/Cart Summary
display concerns. K4 is only the buyer-entered code control and confirmed-code
management surface.

## Baseline Before Refinement

- Registry `K4`, Cart, dependency depth `1`, review order `98`, depends on Input
  and Button. Contract `0.1.0`, `pilot`, exposes seven properties, seven anatomy
  parts, four states and three behaviors.
- The root is an unnamed `section`; the visible disclosure Button is not a
  heading or region name. The form is hidden through `data-expanded` and CSS,
  so static markup needs an external controller to become operable.
- Studio omits the toggle and form entirely in the applied state, assumes one
  uppercased code, and treats any non-empty submission as successful. It cannot
  show target rejection, inapplicability, request pending, disabled apply,
  multiple codes or per-code removal state.
- The Input classes are copied directly inside Cart Studio rather than consuming
  a shared canonical Input renderer. The wrapper omits the canonical control
  node and has no associated validation message. Button classes are reused, but
  the `28px` icon-only removal action is below the accepted touch target.
- `applied`, `appliedCode` and `removeLabel` model one code and one global remove
  name. The state can be set independently of code content, creating empty or
  false-confirmed UI.
- CSS owns an external `margin-bottom`, physical width/height/margin properties,
  raw `4/6/8/10/16/28px` literals, calculated `0.875` type and a success-colored
  pill. It relies on color for confirmation and publishes success/radius tokens
  that are purely compositional.
- Exhibit and Studio share the broad `CartStudio` switch and one fixture, but
  K4 has no reusable artwork component. MDX duplicates separate markup and does
  not demonstrate failure, pending, multiple codes or native progressive
  disclosure.
- Shopify has no K4 snippet or controller. The contract still states only a
  generic future integration and predates current Cart Ajax and standard
  storefront action support.
- Existing Mobile/Desktop parity images show an underlined text toggle, visible
  label/Input and outline Apply action. Mobile stacks the action; Desktop keeps
  it inline. Tablet, XL, collapsed, invalid, busy/disabled, multiple/removed,
  localized/RTL, narrow container, dark, forced colors, reduced motion and zoom
  evidence are absent.
- Studio references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and
  inspector `1020:480`. Prior direct repository-recorded inspection establishes
  that these are generic Button/Studio nodes, not K4-specific visual approval.
- Deterministic level-9 baseline is K4 CSS slice `1,483 B` raw / `573 B` gzip,
  complete Cart CSS `3,063 B / 3,072 B`, complete Web component CSS `67,821 B /
  65,536 B`, and shared runtime `10,501 B / 8,192 B`. K4 adds no neutral runtime
  or asset. Only `9 B` remains in the Cart family ceiling, so refinement must
  recover or preserve family budget.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `details` and `summary`](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element) | Native details owns open state, summary activation and a `toggle` event without an author widget runtime. | Use progressive native disclosure and distinguish initial static `open` from controlled adapter state. |
| [HTML form controls](https://html.spec.whatwg.org/multipage/forms.html) | Native form, input and submit controls own value, constraint validation, submit and reset behavior. | Compose canonical Input and Button; do not create a second value or submit owner in K4. |
| [WAI-ARIA APG Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) | Button disclosures use Enter/Space and synchronize expanded state with controlled content. | Native details already supplies equivalent disclosure interaction; framework/button alternatives must preserve the same relationship. |
| [WCAG 2.2 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | Dynamically presented results that do not move focus need programmatic status semantics when they meet the criterion. | Target announces one contextual apply/remove result; K4 root and code list are not live regions. |
| [WCAG 2.2 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) | Detected errors identify the affected item and describe the error in text. | Target projects rejection/inapplicability to the composed Input message and `aria-invalid`, preserving the value. |
| [Open UI Accordion research](https://open-ui.org/components/accordion.research/) | Accordions are sequences of disclosure widgets and mature systems vary in group exclusivity. | K4 is one independent disclosure, not an Accordion and not part of an exclusive group. |
| [Radix Collapsible](https://www.radix-ui.com/primitives/docs/components/collapsible) | Radix separates Root, Trigger and Content and supports controlled/uncontrolled open state. | Preserve root/trigger/panel anatomy and both state strategies without adding React concepts to the neutral contract. |
| [Polaris Text Field](https://polaris-react.shopify.com/components/selection-and-input/text-field) | A visible label, native field state and associated help/error remain the field component's responsibility. | Keep label, value, message and validation inside the Input slot rather than duplicating K4 properties. |
| [Polaris Inline Error](https://polaris-react.shopify.com/components/selection-and-input/inline-error) | Brief corrective text is associated to the invalid field through `aria-describedby`. | Target rejection belongs next to and associated with Input; do not rely on a red pill or global toast. |
| [Shopify Cart Ajax API](https://shopify.dev/docs/api/ajax/reference/cart#post-locale-cart-update-js) | `cart/update.js` accepts one or comma-separated discount codes and removes all with an empty string. | Shopify mapping cannot assume one code; target controller owns request and replacement policy. |
| [Shopify standard storefront actions](https://shopify.dev/docs/storefronts/themes/best-practices/standard-actions) | `Shopify.actions.updateCart` accepts `discountCodes`, returns cart/errors/warnings and emits discount-update/error events. | Prefer target-native standard actions and event/status integration; neutral source exposes only semantic composition. |
| [Shopify Storefront `cartDiscountCodesUpdate`](https://shopify.dev/docs/api/storefront/latest/mutations/cartdiscountcodesupdate) | The mutation replaces the full code list and returns per-code applicability. | Applied codes are a controlled list; removal must preserve other codes and applicability must be checked. |
| [Shopify theme discount display](https://shopify.dev/docs/storefronts/themes/pricing-payments/discounts) | Liquid cart discount applications cover display allocation, while manual code visibility has historically differed from checkout/cart API state. | Liquid alone is not the universal code truth; target result/store owns confirmed manual-code records and Cart Summary owns monetary display. |

Standards and mature systems converge on native field/form semantics plus a
separate disclosure state. Commerce platforms do not converge on a universal
raw discount record or stacking policy.

## Matches, Differences, And Direction

- ADR 0026 already keeps discount application/removal target-owned. Refinement
  preserves this boundary while replacing a single-code presentation model with
  controlled semantic composition.
- Native `details`/`summary` provides progressive zero-runtime behavior. A custom
  Button disclosure remains a valid adapter choice only where the target cannot
  use details and then must own synchronization and keyboard behavior.
- Input remains the sole value, label, validation and message owner. K4's
  `input` property is a required composition slot, not a second string API.
- Apply and remove controls compose Button. `applyBusy` and `applyDisabled` are
  the only Button states promoted because they are stable target decisions that
  prevent duplicate requests.
- `appliedCodes` is a slot rather than a raw array because Web, Shopify,
  Storefront API and native targets expose different identifiers,
  applicability, descriptions and removal payloads. The slot still requires a
  native list and contextual removal names.
- Success is conveyed by the presence of target-confirmed code text and a
  contextual target status, not a standalone green color or check icon.
- The field stays open after failure and may remain open after success when the
  target supports another code. No universal auto-collapse policy is added.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `details.discount-field` | Discount Field/native Web | One independent disclosure; no unnamed section or live region. |
| Toggle | yes | `summary.discount-field__toggle` | target/native Web | Required localized visible label; native marker and keyboard behavior. |
| Panel | yes | `.discount-field__panel` | Discount Field | Contains entry and optional confirmed-code list. |
| Form | yes | `form.discount-field__form` | target/native form | Submit target; no nested cart form in Shopify. |
| Input | yes | canonical Input | Input/target | Visible label, live value, name, required/validation/message and focus owner. |
| Apply | yes | canonical Button | Button/target | Required visible label; target-owned disabled/busy/request behavior. |
| Applied codes | optional | `ul.discount-field__codes` | target | Controlled confirmed records; omitted when empty. |
| Applied item | per code | `li.discount-field__code-item` | target | One complete confirmed code; may include contextual description. |
| Code text | per code | `.discount-field__code > bdi` | target | Complete localized/display-safe code string; no forced uppercase. |
| Remove | per removable code | canonical Button | Button/target | Visible or accessible name includes the code; target owns payload/pending. |
| Feedback/status | target composition | Input message and parent status | Input/target | Field error is associated; apply/remove/totals result announced once outside K4 truth. |

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One neutral discount-code disclosure. Validity/applicability is Input/target state, not a K4 visual variant. |
| Size | One intrinsic container-responsive composition. Parent controls width and placement. |
| Disclosure | Closed or open. Static Web is natively uncontrolled after initial `open`; adapters may control live state. |
| Entry | Required Input plus Apply Button; candidate value can be empty, entered, invalid or preserved after failure. |
| Apply | Available, disabled or busy through canonical Button. Busy prevents duplicate submission and preserves label. |
| Applied codes | Absent, one or multiple target-confirmed entries; each can be removable or target-disabled independently. |
| Validation | Default/error/success/warning belong to composed Input. K4 adds no validation color or parser. |
| Content | Short/long code, localized label/error, mixed direction, symbols, spaces and extreme unbroken value. Target decides allowed characters/normalization. |
| Environment | Light/dark, forced colors, reduced motion, 200% zoom, LTR/RTL and 200px to wide containers. |

Invalid/incoherent states include blank toggle/apply labels, missing Input,
empty applied items, a code shown as confirmed before target response, busy apply
that remains activatable, removal without a contextual name, stale totals,
making the whole component live, forced uppercase mutation, nested forms or one
boolean controlling an unrelated list.

## Public API And State Ownership

- `toggleLabel` — required non-empty localized disclosure label.
- `expanded` — optional `false`; initial native open state in static Web, or
  controlled live state plus `toggle` event in stateful adapters.
- `input` — required canonical Input composition slot. It owns label, value,
  name, autocomplete, required, validation, message and native field events.
- `applyLabel` — required non-empty visible canonical Button label.
- `applyDisabled` — optional `false`; target-owned unavailable state with a
  visible reason when relevant.
- `applyBusy` — optional `false`; target-owned request state that disables
  duplicate activation while preserving the label.
- `appliedCodes` — optional semantic slot containing zero or more confirmed list
  items with complete code text and contextual removal actions.

Remove `applied`, `appliedCode` and `removeLabel`. They cannot represent
multiple records, per-code applicability/pending, or code-specific removal and
allow incoherent empty-confirmed state.

Do not expose raw discount IDs, eligibility rules, amount/percentage, currency,
normalization, case conversion, allowed characters, stackability, maximum code
count, API endpoint, cart ID, section IDs, retry, error codes, status copy,
analytics, auto-collapse or focus policy at the neutral layer.

Static Web details is uncontrolled after its initial `open` attribute and native
toggle. Input owns its native live value. React/Angular/Hydrogen may bind open,
value and target request state. Applied codes are always controlled target truth;
K4 has no optimistic/uncontrolled commerce record.

## Token And Value Audit

- Reconcile K4 to existing primary/accent text, subtle border, secondary surface,
  focus, Body/Body Small typography, element gap, touch target and medium radius.
  Input and Button retain their own public tokens.
- Remove K4's public success color and full-radius dependency; confirmation is
  semantic content/status, not a pill color contract.
- Root external margin, panel rhythm, inline/stack threshold, item padding,
  list gap and code emphasis stay private composition values derived from
  existing semantic tokens.
- Replace physical `width`, `height`, `margin-top`, `margin-bottom` and calculated
  font sizes with logical properties and complete type roles.
- Preserve the native disclosure marker rather than introducing a target-neutral
  icon asset or icon-name property.
- Cart CSS must remain at or below `3,072 B` gzip. Prefer deletion and canonical
  dependency reuse; do not add neutral runtime to compensate for layout.

## Visual And Content Audit

- Baseline hierarchy is useful: low-emphasis underlined disclosure, visible
  Input label, adjacent outline Apply action and compact applied records.
- Refined candidate should align Input and Button at wide containers and stack
  them below a named container threshold, without a viewport query.
- Applied codes need visible text and a full touch target; no 28px icon-only
  action or success-color-only meaning.
- Labels, errors and codes wrap safely with `overflow-wrap:anywhere`; code text
  uses `bdi` and logical alignment for mixed direction.
- Empty optional list leaves no gap. Long target errors stay associated with
  Input; status/error copy does not push the toggle out of reach.
- Human review must approve disclosure prominence, native marker, vertical
  rhythm, Input/Button balance, applied-record surface/border, removal emphasis
  and compact threshold.

## Accessibility And Interaction

- Native details/summary supplies focus, Enter/Space activation, expanded
  semantics and hidden-content removal from sequential focus when closed.
- Input requires a visible associated label. Target error uses Input
  `aria-invalid` plus associated message; preserve the candidate value.
- Submit is a native form action. Apply busy/disabled prevents duplicate
  activation and retains the visible label. Enter in Input submits once.
- Applied codes use a native list. Each removal action names the corresponding
  code; repeated generic icon-only names are not accepted.
- Target announces one contextual outcome such as “STUDIO10 applied; estimated
  total updated to …” or “STUDIO10 was not applicable.” K4 list and root are not
  live regions and do not move focus automatically.
- If removal deletes the focused Button, target moves focus predictably to the
  next removal action, the Input or disclosure summary according to remaining
  content; K4 does not hardcode a cross-target policy.
- Component-specific CSS owns no motion. Reduced motion affects only composed
  Input/Button/target transitions. Forced colors preserves native marker,
  applied-item boundary and canonical focus indicators.

## Responsive And Performance

- Use a named inline-size container on K4. Wide panels use `minmax(0, 1fr) auto`;
  narrow panels stack Apply below Input without DOM reordering.
- Test direct containers near 200/320/420/760px and outer 390/768/1280/1600
  viewports, RTL/localized labels, long unbroken code/error, multiple records,
  dark, forced colors, reduced motion and effective 200% zoom.
- Neutral runtime budget is `0 B`: native details and form behavior only. No
  listener, observer, custom element, request, parser, formatter, timer, layout
  read or asset belongs in source.
- Shopify-specific standard action/controller cost is target runtime and must be
  measured separately; it must clean up listeners and avoid duplicate cart UI
  updates.
- K4 begins at `573 B` gzip while Cart has `9 B` headroom. Refinement should
  reduce the K4 slice by removing duplicated chip/control styling or recover
  equal family bytes before adding structure.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native details/summary, canonical Input/Button, native form/list and target callbacks or submission. | Implemented and evidenced with zero neutral runtime. |
| Shopify | Localized details/form/list plus `Shopify.actions.getCart()` and `updateCart({ discountCodes })`, returned applicability/warnings and target status. | Dedicated snippet/controller and Main Cart composition pass official validation; contract remains planned until editor/live-store proof. |
| React / Angular / Hydrogen | Controlled open/value/codes/request state; native form event or Storefront `cartDiscountCodesUpdate`; preserve all existing codes on removal. | Planned; no framework/store dependency in neutral source. |
| Figma | Closed/open, default/error/busy, zero/one/many codes, narrow/wide and long localized content. | Registered nodes are generic Button evidence; component-specific visual review absent. |
| SwiftUI / Compose | Native DisclosureGroup/expandable section, text field, progress-capable apply action and controlled applied-code list. | Planned; commerce client, announcements and focus remain platform-owned. |

## Exhibit And Studio Parity

Extract `DiscountFieldArtwork` as the actual docs-target K4 implementation used
by both Exhibit and Studio. Extract or consume a canonical Input artwork so K4
does not copy Input anatomy/validation. The broad Cart Studio may own fixture
state and target simulation, but renderer markup, labels, codes and CSS remain
one shared implementation.

Studio metadata exposes only K4 semantic controls: toggle label, initial open,
Input composition, apply label/disabled/busy and applied-code composition.
Fixture code strings, validation responses and status text are not defaults or
public API. MDX remains a static fallback with the same native anatomy.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Single `applied`/`appliedCode` model contradicts multi-code target APIs and permits empty confirmed state. | critical | Replace with controlled semantic applied-code list slot. | contract/implementation |
| Unnamed section plus CSS-only hidden form needs external runtime and duplicates disclosure semantics. | high | Use native details/summary with initial/controlled translation documented. | implementation/contract |
| K4 copies Input markup and has no field rejection state. | high | Consume shared canonical Input artwork; target projects error/message and preserves value. | implementation/dependency |
| Apply lacks disabled/busy and any non-empty code is treated as success. | high | Compose canonical Button states and target-confirmed result simulation. | implementation/contract |
| `28px` icon-only remove is below touch target and one global label cannot name multiple codes. | high | Use per-code canonical removal Buttons with contextual names. | accessibility/implementation |
| Shopify mapping predates current standard storefront actions and Ajax multi-code support. | high | Add target-native snippet/controller boundary using current APIs and events. | target adapter |
| Success-colored pill relies on color and publishes private visual choices. | medium | Use neutral applied-record semantics plus visible text/status; keep geometry private. | visual/implementation |
| K4 has no component-specific owner visual reference. | human review | Preserve a coherent repository candidate and request explicit visual approval. | owner |

## Evidence And Validation Result

- Existing Mobile/Desktop images remain before evidence. Fifteen final images
  cover Exhibit and Studio at 390x844, 768x1024, 1440x1000 and 1920x1080 plus
  rejection, multiple applied codes, dark, forced colors, reduced motion, a
  localized RTL 200px container and effective 200% zoom.
- Exhibit and Studio emit an exact 605-character K4 subtree. The accessibility
  inspection finds native `DETAILS`, `SUMMARY`, one form and no K4 live region.
- Native close/reopen works. Enter with `INVALID` preserves the value, keeps
  focus, sets `aria-invalid="true"` and exposes an associated alert message.
  Enter with `summer-25` preserves case and produces three controlled records.
- Removing `summer-25` leaves the other two codes, announces the target result,
  returns focus to Input and uses a 44px-tall canonical Button. Apply disabled
  and busy both disable activation; busy also exposes `aria-busy="true"` while
  preserving the visible label.
- At 200px, component client/scroll widths are both 200px and the form stacks to
  one column. At effective 200% zoom, component and document client/scroll
  widths remain equal. One tab was used throughout.
- Contracts, Studio, registry/docs, Neutral Web/Shopify adapters, official
  Liquid validation, shared-renderer parity, static previews and TypeScript
  pass. Final generated copies and resource cleanup are verified in Batch 85.

## Risks And Open Questions

1. Owner visual review must approve native marker, disclosure prominence,
   Input/Button alignment, applied-record treatment, removal emphasis, rhythm
   and compact threshold.
2. Targets must define allowed characters, case/whitespace normalization,
   stack/replace policy, maximum count, applicability/error wording, retry,
   stale-cart handling, totals refresh and contextual announcement cadence.
3. Focus after removing the active code depends on remaining codes and target
   rerender behavior; adapters must choose and test a deterministic destination.
4. Shopify standard storefront actions, Ajax and Liquid discount displays have
   different truth surfaces. The adapter must use returned cart/action records,
   preserve other codes, surface warnings and avoid duplicate section updates.
5. Shopify needs real cart/editor/live-store proof before target-ready promotion.
6. Cart CSS has only `10 B` headroom and total Web CSS/runtime already exceed
   program ceilings. K4 remains zero-runtime; the Shopify-only controller costs
   `1,668 B` gzip and still needs live-store profiling.

## Readiness Decision

`human-review-ready`. Native disclosure, canonical dependency composition,
controlled multi-code presentation, target-confirmed simulation, Shopify
translation, final evidence and component-scoped automated gates are complete.
The contract remains `pilot`; human visual approval is still pending and no
stability promotion was made.
