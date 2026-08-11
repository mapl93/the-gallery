# Component Dossier: Cart Note

Status: `human-review-ready`

Target under review: Neutral Web cart-note disclosure and Shopify cart form

Contract: `components/contracts/cart-note.contract.json`

## Recommendation

Define Cart Note as one native progressive disclosure containing one required
canonical Textarea. Use `details.cart-note` and
`summary.cart-note__toggle` so static Web receives disclosure semantics,
keyboard behavior, hidden-content handling, and an uncontrolled live open state
without neutral JavaScript.

Expose only required `toggleLabel`, optional initial `expanded`, and required
`field` composition. The complete Textarea owns its visible label, initial/live
value, name, placeholder, validation, line bounds, resize behavior, disabled or
read-only state, messages, and form association. Cart Note must not duplicate
those properties or unmount the field when collapsed.

The target owns persistence timing, cart requests, debounce, errors, success,
status announcements, focus after refresh, stale-response handling, and whether
the feature is offered or begins expanded. Shopify maps the Textarea to
`name="note"` inside the native cart form and initializes it from `cart.note`.
Neutral runtime remains zero.

This direction is ready for human visual review after implementation and
evidence. Contract maturity remains `pilot`; visual review is still required
before any `stable` promotion.

## Purpose And Limits

- Lets a buyer optionally reveal and edit unstructured instructions that belong
  to the cart/order as a whole.
- Preserves the note while the disclosure opens and closes and while other cart
  content changes through a target-controlled refresh.
- Composes the full Textarea contract instead of duplicating field markup,
  value ownership, validation, resize, line-bound, or message behavior.
- Is not a gift message workflow, structured delivery preference, product-line
  property, checkout field, cart store, request client, validator, autosave
  policy, toast, live region, character counter, or analytics owner.
- Does not require a note, define its maximum length, sanitize business content,
  decide when it is persisted, or infer success from blur/change.
- Does not decide merchant availability, initial expansion, placement relative
  to totals/checkout, or inclusion in a cart drawer.

## Repository Baseline Before Refinement

- Registry K10 depends on Textarea and describes an expandable cart textarea.
  Contract `0.1.0`, `pilot`, has three anatomy parts, three states, two
  behaviors, three properties, and four public token references.
- The neutral root is an unlabelled `div`/`section` profile that needs target
  JavaScript to synchronize a Button's `aria-expanded` and content visibility.
  Static Web therefore has no progressive disclosure behavior.
- `field` is optional even though revealing an absent Textarea creates an
  invalid no-op disclosure. The contract does not distinguish initial native
  open state from controlled adapter state.
- CSS uses physical margins, a calculated type size, mixed accent color,
  author-reset Button chrome, a `4px`/zero-offset focus ring, and a manual
  `display:none` rule. Those are duplicated disclosure behavior or private
  composition, not a stable public token API.
- CartStudio conditionally unmounts the field when collapsed. Its Textarea
  markup omits the canonical `.input__control`, hardcodes fixture line bounds,
  and sits inline beside the toggle at wide viewports because `.input` is
  `inline-flex`.
- The MDX fallback separately duplicates Textarea markup and labels `field` as
  optional. There is no reusable K10 artwork component or extracted canonical
  Textarea artwork shared with the Textarea Studio.
- Shopify has copied CSS only: no Cart Note Liquid, `cart.note` data mapping,
  native `name="note"` field, cart-form invocation, locale copy, or editor
  availability/initial-state setting.
- Existing Mobile/Desktop images prove broad renderer registration but not
  Tablet/XL, native disclosure, collapsed value preservation, target form data,
  long/localized content, narrow containers, zoom, contrast, forced colors, or
  reduced motion.
- Studio references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and
  inspector `1020:480`. Direct inspection resolves both to the generic Button
  Component Detail/Studio shell, not K10-specific artwork or owner approval.
- Deterministic level-9 baseline: K10 slice `547 B` raw / `326 B` gzip, Cart
  CSS `15,952 B` raw / `3,064 B` gzip against the permanent `3,072 B` ceiling,
  Web component CSS `506,631 B` raw / `67,996 B` gzip, and shared runtime
  `53,811 B` raw / `10,501 B` gzip. K10 adds no neutral runtime.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML `details` and `summary`](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element) | `details` represents a disclosure; its first `summary` is the legend, `open` controls visibility, and native activation emits `toggle`. | Static Web can own a complete disclosure without a Gallery controller or duplicated ARIA state. |
| [WAI-ARIA APG Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) | A Button disclosure supports Enter/Space and exposes expanded state; `aria-controls` is optional. | Native details supplies equivalent disclosure behavior; non-Web adapters must preserve the same relationship. |
| [Open UI accordion explainer](https://open-ui.org/components/accordion.explainer/) | A disclosure is one summary/content pair; an Accordion is a sequence and may add exclusivity. | K10 is one independent disclosure, not Accordion, Tabs, or an exclusive group. |
| [Radix Collapsible](https://www.radix-ui.com/primitives/docs/components/collapsible) | Root, Trigger, and Content support controlled and uncontrolled open state with keyboard behavior. | Keep the three-part composition and document initial native versus controlled adapter state without importing React into base source. |
| [Polaris Text area](https://shopify.dev/docs/api/admin-extensions/2025-10/web-components/forms/text-area) | Multi-line content uses a dedicated Text Area whose label, value, name, constraints, and feedback remain field properties. | Cart Note composes Textarea rather than exposing a second field API. |
| [Shopify Liquid cart object](https://shopify.dev/docs/api/liquid/objects/cart) | Shopify captures a cart note from one `textarea[name="note"]` inside the cart form; `cart.note` is the stored value. | The Shopify adapter must use the native cart form/data contract and avoid multiple note owners. |

Standards and mature systems converge on a separate disclosure state and one
native multi-line value owner. There is no consensus for autosave timing,
character limits, merchant default visibility, or cart-drawer placement, so
those remain target/product choices.

## Matches, Differences, And Direction

- ADR 0077 already defines Cart Note as a synchronized disclosure. ADR 0176
  establishes native `details/summary` for the sibling Discount Field. K10 can
  apply the accepted native-disclosure direction without inventing another
  controller.
- `expanded` means initial `open` in static HTML. Native Web becomes
  uncontrolled after parsing; React/Angular/Hydrogen may bind the live `open`
  property and `toggle` event.
- `field` becomes required. A Cart Note without its one complete Textarea is
  invalid and is omitted by the shared renderer.
- Collapsing hides but does not unmount the Textarea. Its live value and native
  control state survive the disclosure interaction.
- No Cart Note status region is added. The target announces a persistence
  result only when an asynchronous outcome meets the status-message criterion.
- No independent public visual token remains. Toggle presentation, spacing,
  width, and focus geometry are private uses of existing global semantics;
  Textarea retains its own contract.

## Candidate Anatomy And Composition

| Part | Required | Semantic element/canonical composition | Owner |
| --- | --- | --- | --- |
| Root | yes when valid | `details.cart-note` | native Web disclosure/K10 |
| Toggle | yes | `summary.cart-note__toggle` with non-empty localized text | native Web/K10 content |
| Field | yes | `.cart-note__field` containing one complete canonical Textarea | Textarea/target |
| Native value | inside field | sole `textarea.input__field.textarea__field` | Textarea/target form |
| Persistence status | outside K10 when needed | contextual target Status | target cart lifecycle |

## State, Variant, Size, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One neutral order-note disclosure; Textarea validation variants remain dependency state. |
| Size | One intrinsic width owned by the parent; field fills available inline space. |
| Disclosure | Closed or open. Static Web is native/uncontrolled after initial `open`; adapters may control live state. |
| Field | Empty, populated, focused, resized, disabled, read-only, or Textarea validation state. |
| Persistence | Unsaved, saving, saved, or failed are target states outside K10 unless projected through Textarea feedback. |
| Content | Required non-empty toggle and Textarea label; empty/short/long/localized/mixed-direction/extreme note value. |
| Environment | Mobile/Tablet/Desktop/XL, 200px container, effective 200% zoom, light/dark, RTL, forced colors, reduced motion, keyboard-only. |

Invalid combinations include blank toggle text, absent Textarea, multiple note
fields for one cart form, erased value after collapse, duplicate value owners,
required note without visible communication, success inferred from blur, whole-
component live regions, or target refresh that replaces the focused field
without a focus/status policy.

## Public API And Ownership

- `toggleLabel` — required non-empty localized disclosure label.
- `expanded` — optional `false`; initial native `open` in static Web or
  controlled live state plus `toggle` in stateful adapters.
- `field` — required canonical Textarea slot. It owns visible label, initial and
  live value, name, form ownership, placeholder, required/read-only/disabled,
  autocomplete, length constraints, validation/message, resize, line bounds,
  input/change/reset, and native submission.

The target owns merchant availability, placement, persistence trigger, debounce,
request cancellation, optimistic versus confirmed state, server normalization,
errors, retry, cart refresh, status, focus, analytics, offline behavior, and
cart-drawer parity. K10 has no uncontrolled business state.

## Token, Hardcoded Value, And Runtime Audit

- K10 exposes zero independent public visual tokens. Summary text/focus use
  existing semantic tokens privately; Textarea keeps its own public surface.
- Replace physical margins and calculated font size with logical spacing and
  stable Body Small semantics. Preserve the native disclosure marker.
- Field inline size, vertical rhythm, toggle underline, and focus geometry stay
  private until human review.
- Remove the manual collapsed selector; native details owns hidden content.
- Neutral runtime budget is `0 B`. Native disclosure and native form submission
  need no observer, listener, timer, request, or Cart Note service.
- Cart CSS must remain at or below `3,072 B` gzip. K10 begins with only `8 B`
  family headroom, so native behavior and deletion must finance refinement.

## Responsive And Evidence Requirements

- Use intrinsic flow; no viewport or container breakpoint is needed for one
  vertical disclosure/field composition.
- Ensure the Textarea fills the available parent width and does not remain an
  inline sibling of the summary.
- Test closed/open, input/edit/collapse/reopen preservation, empty/populated,
  optional validation projection, blank toggle/absent field omission, long
  toggle/label/value, localized RTL, 200px, effective 200% zoom, keyboard,
  light/dark, forced colors, reduced motion, and native FormData.
- Capture exact Exhibit/Studio shared artwork at Mobile, Tablet, Desktop, and
  XL plus collapsed, focus, populated/reopened, narrow, RTL, dark, forced
  colors, reduced motion, and effective 200 percent.

## Cross-Target Translation

| Target | Mapping | Status/gap |
| --- | --- | --- |
| Neutral Web | Native `details/summary` plus one complete canonical Textarea. | Implementable with zero K10 runtime; target owns persistence/status. |
| Shopify | Optional editor-enabled snippet inside the native cart form, `textarea[name="note"]`, initial `cart.note`, localized labels. | Implementable for the cart page; Ajax cart drawer remains separate target work. |
| Webflow / Framer | Copied CSS/native disclosure and target form/event integration. | CSS/static behavior available; persistence requires target configuration. |
| React / Angular / Hydrogen | Controlled or uncontrolled disclosure wrapping one controlled/uncontrolled Textarea; target cart mutation outside K10. | Contract-ready; no framework dependency in base source. |
| Figma | Disclosure profile composed from a Textarea instance with open/closed state. | Planned; generic Button Studio references are not K10 artwork or approval. |
| SwiftUI / Compose | Native DisclosureGroup/expandable section with native multi-line text editor. | Conceptual; persistence remains application-owned. |

## Risks, Alternatives, And Open Questions

1. Human review must approve marker, toggle prominence, underline, spacing,
   field width, initial state, and relationship to Cart Summary/checkout.
2. Each target must decide save-on-submit, blur, debounced input, or explicit
   action and define stale request, retry, error, status, and focus behavior.
3. Merchant/product policy decides whether notes are offered, default expanded,
   maximum length, accepted content, and cart-drawer parity.
4. Shopify's native cart page can submit `name="note"`; an Ajax cart drawer
   needs its own update and section-refresh lifecycle before certification.
5. The registered Figma references are generic Button Studio shells. No
   component-specific owner artwork or final visual reference is available.

Alternative A keeps a custom Button plus `aria-expanded` and manual hiding. It
requires a target controller and duplicates a native disclosure already
accepted for Discount Field. Alternative B leaves the field mounted outside a
disclosure; it removes progressive choice and changes the product surface.
Alternative C adds autosave runtime to neutral source; it couples K10 to one
cart API and result policy. Native details plus a canonical Textarea preserves
progressive semantics and target independence.

## Implementation Outcome

Implemented as contract `0.2.0`, native `details/summary`, one required
canonical Textarea, zero K10 public visual tokens, and zero neutral runtime.
Exhibit and Studio use the same renderer and normalize to the same
`468`-character subtree. The Textarea remains the same mounted node through
collapse/reopen, preserves its live value, participates as `name="note"` in
FormData, and correctly leaves/re-enters the focus order with native disclosure
visibility.

The first evidence pass found the previous accent text at only `3.56:1` on the
light surface. K10 now uses the existing link-action text semantic, measuring
`17.93:1` in light mode while preserving its underline, native marker, and
`2px`/`2px` keyboard focus. Dark, forced-colors, reduced-motion, RTL at `200px`,
effective `200%` zoom, and all four viewports pass without horizontal overflow.

The localized Shopify snippet, Main Cart editor settings, `cart.note` initial
value, and sole `textarea[name="note"]` inside the cart form pass the official
Liquid validator and generated adapter gate. Shopify reports K10 `ready:true`;
Ajax Cart Drawer persistence remains separate target work.

K10 is ready for explicit human visual/stability review. The review must still
approve marker/toggle prominence, underline, rhythm, width, cart placement,
merchant availability/default expansion, and persistence policy. Figma nodes
remain generic Button shells rather than K10 artwork. Contract status remains
`pilot`; do not promote it to `stable` without that review.
