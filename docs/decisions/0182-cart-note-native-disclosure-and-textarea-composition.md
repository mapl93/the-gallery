# 0182. Cart Note Native Disclosure And Textarea Composition

Status: Accepted

Date: 2026-07-17

## Context

Cart Note currently uses a custom Button, duplicated expanded attributes, and a
manual hidden selector. Static Web therefore needs external JavaScript to
operate the disclosure. Studio conditionally unmounts an incomplete Textarea
copy and the contract permits an empty disclosure with no field.

ADR 0077 defines Cart Note as a synchronized disclosure. ADR 0176 already
accepts native `details/summary` for the sibling Discount Field, and ADRs
0052–0055 establish Textarea as the sole owner of multi-line value, field,
validation, resize, and line-bound semantics. HTML provides native disclosure
behavior, while Shopify captures one cart note from
`textarea[name="note"]` inside the native cart form.

## Decision

- K10 is one native progressive disclosure containing one required canonical
  Textarea. Web root is `details.cart-note`; its first child is
  `summary.cart-note__toggle`.
- Stable properties are required non-empty `toggleLabel`, optional
  `expanded=false`, and required `field` composition. Remove K10 public visual
  tokens; visible Textarea properties remain owned by Textarea.
- In static Web, `expanded` maps only to the initial `open` attribute. Native
  details becomes uncontrolled after parsing and emits `toggle`. Stateful
  adapters may bind live open state and change events.
- The Textarea remains mounted when details closes. Its native live value,
  selection, resize, validation, and form state are not recreated or reset by
  disclosure interaction.
- A blank toggle label or absent Textarea is invalid and omits the shared docs
  renderer. K10 renders no empty disclosure, fallback label, duplicate field,
  or second value owner.
- K10 owns no note requirement, maximum length, autosave timing, request,
  debounce, normalization, success/error, status, focus recovery, cart refresh,
  retry, analytics, or cart-drawer behavior. These remain target policy.
- Neutral runtime remains zero. Native disclosure and native form semantics do
  not add a K10 listener, observer, timer, request, or service.
- Exhibit and Studio extract one shared Cart Note artwork and one shared
  canonical Textarea artwork. MDX fallback markup follows the same anatomy.
- Shopify adds an optional editor-enabled Cart Note inside the native cart
  form. It uses localized copy, initializes from `cart.note`, and submits one
  `textarea[name="note"]`. The feature defaults disabled so the adapter does not
  silently change merchant storefront behavior; the editor owns availability
  and initial expansion.
- Figma nodes `943:7` and `1020:480` remain traceability only because they are
  generic Button/Studio shells, not K10-specific artwork.
- K10 remains `pilot`. Passing automated and visual evidence may make it ready
  for explicit human review but never promotes it to `stable` automatically.

## Consequences

- Static consumers receive complete disclosure keyboard and state behavior
  with no Gallery JavaScript.
- Cart Note and Discount Field use one accepted native disclosure strategy,
  while their domain contents and target lifecycles remain separate.
- Textarea retains one label, value, validation, resize, and message owner.
- Collapse preserves user input and control state because content is hidden by
  native details rather than unmounted.
- Shopify cart-page submission can persist the note through its native cart
  contract; Ajax/cart-drawer persistence still requires target-specific proof.
- Marker treatment, toggle prominence, spacing, placement, merchant defaults,
  and persistence policy remain reviewable product/visual decisions.
