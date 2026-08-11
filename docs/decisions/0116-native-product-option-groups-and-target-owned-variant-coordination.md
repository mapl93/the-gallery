# 0116. Native Product Option Groups And Target-Owned Variant Coordination

Status: Accepted

Partially superseded by ADR 0240 for the owner-accepted D4-A sold-out/disabled
policy and the implemented Shopify high-variant/Combined Listing coordinator.

Date: 2026-07-14

## Context

Variant Selector mixed a visual swatch/pill pattern with incomplete form and
commerce ownership. Studio rendered `div` groups, exposed an independently
editable selected-value string, and only partially bound several public
properties. The MDX fallback represented an unavailable value with a non-control
`span`. Canonical swatches were below the accepted touch target and depended on
site-only color rules. Shopify added redundant radio-group roles, fabricated CSS
colors from handles, and omitted the modern option-value data needed by a target
coordinator.

HTML radios already own mutual exclusion, Arrow/Space behavior, `input` and
`change`, required validity, FormData, and reset. WAI recommends native
`fieldset`/`legend` grouping for related controls. Open UI, Radix Radio Group, and
Polaris ChoiceList likewise model selection at group level rather than through
unrelated option booleans. Shopify separately exposes selected option values,
contextual availability, option-value ids, related variants/product URLs, and
native color/image swatches, while its high-variant guidance discourages loading
every variant into a client-side matrix.

Product-option selection is valid commerce input, not a generic value-entry
validation field. A product selector normally begins with a selected option;
sold-out or impossible combinations are commercial availability states rather
than Input-style error, warning, success, or default field variants.

## Decision

- Variant Selector is a product-specific composition of one or more product
  option groups. Every group is a native `fieldset` with a first `legend` and
  same-name native radio inputs.
- Swatch and pill are visual presentations of the same native group contract.
  Neutral Web does not add `radiogroup`/`radio` roles or recreate roving focus.
- Static Web uses `checked` only as authored initial checkedness. Framework
  adapters expose one controlled `value` or uncontrolled `defaultValue` per
  group, plus native change semantics; they do not control each option with an
  independent boolean.
- The visible selected-value fragment derives from the checked option. It is not
  public editable state and is hidden from the accessible group name when it
  would only repeat the radio's checked value.
- Every option keeps a localized text label independent from swatch color/image,
  selected state, tooltip, or availability mark. Swatch color/image is authored
  target data, not a public design token.
- Commercial `unavailable` and native `disabled` are distinct. Unavailable
  options receive localized associated text and a non-color mark but are not
  automatically disabled. Each target explicitly chooses whether its product
  policy keeps those options selectable.
- Groups may be natively required or disabled and individual options may be
  disabled. The base preserves native validity, event ordering, FormData, and
  form reset.
- Option targets are at least 44 by 44 CSS pixels. Selected and keyboard-focus
  indicators remain distinct in light, dark, forced colors, reduced motion,
  RTL, narrow containers, and zoom.
- Layout is intrinsic: groups and values wrap from the component's available
  inline size without viewport-specific markup or source-order changes.
- The parent product page, quick view, or commerce adapter owns complete
  selected-option combination resolution, variant id, contextual availability,
  URL, Price, media, SKU/inventory, selling plan, submit state, analytics, and at
  most one localized product-update announcement.
- Neutral Variant Selector includes no variant database, request, observer,
  formatter, URL mutation, or live region. Its neutral runtime contribution is
  zero.
- Shopify's initial renderer uses `product_option_value.selected`, contextual
  `available`, ids, product URL/variant hints, and native swatch color/image. It
  remains `planned` until one target controller proves high-variant and combined-
  listing re-rendering plus coordinated Product Form and product-detail updates.
- Exhibit and Studio use the same ProductStudio renderer and fixture. Studio
  exposes stable cross-target group/option content, native state, commercial
  state, and selected/focus appearance tokens; it no longer exposes derived
  selected text.
- The generic value-entry requirement for default/error/success/warning variants
  does not apply to Variant Selector. This component starts selected and exposes
  commerce availability plus native required validity instead.
- The contract remains `pilot`. Automated and visual evidence prepare the
  candidate for human review but do not promote it to `stable`.

## Performance

Variant Selector adds no neutral JavaScript, listener, observer, asset, or
network request. Deterministic level-9 gzip after the refinement measures:

- Product CSS: `5,306 B / 5.2 KiB`, leaving `18 B`. Removing redundant stale
  file/section prose while retaining compact component labels offsets the new
  semantics; the net delta from Batch 30 is `-13 B`.
- Neutral Web component CSS: `65,441 B / 64 KiB`, leaving `95 B`; the net delta
  from Batch 30 is `+103 B`.
- Shared neutral runtime: `10,501 B / 8 KiB`, the existing explicit cumulative
  `2,309 B` exception. Variant Selector adds `0 B`.

No ceiling is reset. The remaining CSS headroom is a program risk for Product
Form and later product-family batches.

## Consequences

- Neutral Web, Shopify, future framework adapters, native targets, and Figma can
  preserve the same group-level semantics without making DOM or Liquid the source
  language.
- Swatches and pills now submit, validate, reset, focus, and announce like native
  radios while retaining Gallery styling.
- Consumers cannot create multiple checked values in one controlled group through
  the public API, and selected-value text cannot drift from checkedness.
- Availability policy remains a deliberate commerce decision. A target may allow
  selection of sold-out values for explanation or alternate resolution, or may
  disable them, but must not infer the two states are identical.
- Product Form is the next dependency-order review and must choose or defer the
  actual target coordination service; this ADR does not smuggle that service into
  Variant Selector.
- Human review still must approve swatch geometry, hidden-versus-visible swatch
  names, pill treatment, selected/focus boundaries, unavailable marks, spacing,
  type hierarchy, and whether Shopify high-variant/combined-listing parity is a
  v1 review gate.
