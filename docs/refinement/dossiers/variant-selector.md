# Variant Selector Refinement Dossier

Status: Human-review-ready; remains `pilot`

Date: 2026-07-20

Registry: `D4` / Product / review order `70`

Accepted direction: D4-A / ADR 0240

## Purpose And Limits

Variant Selector presents one or more named product-option groups as native
single-choice controls. A group may use visual swatches or text pills, but the
browser remains the owner of checkedness, mutual exclusion, keyboard behavior,
events, validity, FormData and reset.

The neutral component does not resolve a combination, fetch product data, mutate
the URL, choose a variant, update Price/media/inventory/Product Form, manage a
selling plan, announce product changes, or serialize a variant catalogue. One
owning product-page or Quick View coordinator performs those dependent updates.

## Research Dossier

### Web And Accessibility Standards

Native `input[type=radio]` already supplies the expected one-value and Arrow/
Space behavior. WAI recommends `fieldset` and a first `legend` for related radio
controls. APG's custom `radiogroup` pattern is useful only when native inputs are
not used; duplicating it here would recreate browser behavior and risk divergence.
Open UI's radio research likewise treats selection as group state.

- [WAI grouped controls](https://www.w3.org/WAI/tutorials/forms/grouping/)
- [WAI technique H71](https://www.w3.org/WAI/WCAG22/Techniques/html/H71.html)
- [APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- [HTML radio](https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio))
- [Open UI radio research](https://open-ui.org/components/radio-button.research/)

### Mature-System Comparison

Radix Radio Group and Polaris ChoiceList expose one controlled or uncontrolled
group value, not independent booleans for each option. Shopify's
`product_option_value` supplies stable ids, selection, native swatches, sibling
`product_url`, contextual availability and the exact associated `variant` for
the current combination. Its high-variant guidance explicitly favors granular
`option_values` plus Section Rendering over loading all variants.

- [Radix Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group)
- [Polaris ChoiceList](https://shopify.dev/docs/api/checkout-ui-extensions/latest/components/forms/choicelist)
- [Shopify product option value](https://shopify.dev/docs/api/liquid/objects/product_option_value)
- [Shopify high-variant guidance](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants/support-high-variant-products)
- [Shopify combined listings](https://shopify.dev/docs/apps/build/product-merchandising/combined-listings/index)

### Repository And Owner Evidence

The existing native fieldset/legend/radio composition, 44px targets, intrinsic
wrap, selected/focus distinction and shared Exhibit/Studio renderer remain the
correct base. The owner accepted D4-A: sold-out options remain selectable for
inspection, while nonexistent combinations and genuinely unusable options are
natively disabled. Every swatch retains a complete text label and the legend
visibly derives the selected value.

The registered Figma frame is generic Studio/Button evidence, not component-
specific Variant Selector artwork. Final visual approval remains required for
swatch/pill geometry, label treatment, marks, spacing and typography.

## Recommended And Accepted Direction

- Use one native `fieldset`/first `legend` per product option and same-name radios.
- Treat swatch and pill as presentations of the same semantic group contract.
- Keep sold-out options selectable with localized associated text and a non-color
  cue; selection does not make them purchasable.
- Disable nonexistent combinations and genuinely unusable values.
- Derive the visible selected value from checkedness; never expose a second
  editable selected-text owner.
- Preserve a complete localized option label independent from color, image,
  tooltip, selected state or status mark.
- Emit native `input`/`change` requests; let one target coordinator resolve and
  atomically project all dependent product state.
- Use Shopify `option_value.variant` for exact existence/stock and
  `option_value.product_url` for Combined Listing navigation.

## Anatomy

| Part | Required | Semantics | Ownership |
| --- | --- | --- | --- |
| Root | yes | Collection of product-option groups | Variant Selector |
| Group | one or more | Native `fieldset` | Variant Selector |
| Legend | yes per group | First child; group name | Target content |
| Selected value | optional visible fragment | Derived; `aria-hidden` when redundant | Renderer |
| Swatches or pills | one per group | Intrinsic option collection | Presentation |
| Option label | yes per radio | Native label/accessibility name | Target localization |
| Radio | yes per option | Native name/value/checked/required/disabled | Browser |
| Swatch surface | swatch mode | Target color/image data | Target |
| Option status | when sold out/invalid | Associated localized text | Target localization |

## State, Variant, Size, And Mode Matrix

| Dimension | Values | Rule |
| --- | --- | --- |
| Presentation | Swatch / Pill | Same native group contract |
| Selection | Unchecked / Checked | One checked value per group |
| Focus | Resting / Focus-visible | Distinct from checked state |
| Pointer | Resting / Hover | Only hover-capable enabled values |
| Commercial | Available / Sold out | Sold out remains selectable under D4-A |
| Structural | Existing / Nonexistent | Nonexistent uses native disabled |
| Group | Enabled / Disabled | Native disabled `fieldset` |
| Requirement | Optional / Required | Native group constraint validation |
| Size | Default | Every option target at least 44×44 CSS px |
| Environment | Light / Dark / Forced colors / Reduced motion | Same semantics and DOM |

There are no Input-style error/success/warning variants. Product selection is
commerce state, not a generic value-entry validation surface.

## Public API And State Ownership

| Property | Type | Meaning |
| --- | --- | --- |
| `label` | string | Stable group name |
| `optionLabel` | string | Complete localized option name |
| `name` | string | Shared native radio name |
| `value` | string | Stable target option value |
| `checked` | boolean | Initial static-Web checkedness |
| `required` | boolean | Native group requirement |
| `groupDisabled` | boolean | Native fieldset disabled state |
| `disabled` | boolean | Nonexistent/genuinely unusable option |
| `unavailable` | boolean | Inspectable sold-out state |
| `unavailableText` | string | Localized associated sold-out text |

Static HTML becomes natively uncontrolled after authored `checked`. Frameworks
bind one controlled `value` or uncontrolled `defaultValue` per group. Variant id,
option-value id, product URL, request state, stock, Price, form availability,
selling plans, analytics and target event payloads are not neutral properties.

## Tokens And Visual Audit

The contract references 26 existing public semantic tokens for borders, surfaces,
text, opacity, motion, body typography, radii, spacing and the 44px touch target.
Canonical CSS derives only private group/option gaps and swatch size. Swatch
color/image is target data through private `--_variant-swatch-*` composition,
not a public design token. No component-scoped token or new hardcoded visual value
was added for D4-A.

Selected and focus-visible boundaries are separate. Sold-out swatches use a
diagonal mark and sold-out pills use a line mark; disabled options use native
disabled interaction and distinct reduced emphasis. Layout wraps intrinsically
without viewport-specific DOM or keyboard-order changes.

## Accessibility And Interaction Audit

- Two native fieldsets, two first legends, nine same-name radios, and zero
  redundant ARIA roles in the evidence fixture.
- Arrow keys change selection and emit native `input` then `change`; disabled
  values are skipped, while sold-out values remain selectable.
- Every option preserves a complete localized text label; swatch visuals are not
  the accessible name.
- Derived legend values stay synchronized and are hidden only when redundant to
  the accessible group name.
- Minimum measured target is exactly `44×44px`.
- No per-group live region; the owning target uses one product-update status.
- Forced colors preserves selected/focus/status boundaries; reduced motion
  resolves every transition to `0s`.

## Cross-Target Translation

| Target | Translation | Result |
| --- | --- | --- |
| Neutral Web | Native fieldsets/legends/radios plus canonical CSS; no runtime | Implemented and validated |
| React/docs | One controlled value per group; native events and shared renderer | Implemented; exact Exhibit/Studio parity |
| Shopify | Exact variant existence/availability, native swatches, granular ids, Section Rendering and Combined Listing path | Implemented and scoped Theme Check clean |
| Angular | One group value/default and native change contract | Planned adapter |
| Figma | Group/option anatomy plus checked/focus/sold-out/disabled visuals | Planned; artwork approval pending |
| SwiftUI/Compose | Native single-choice groups with target swatch/pill presentation | Planned; parent commerce model resolves variant |

The Shopify target coordinator allows one in-flight same-origin request, replaces
one bounded product region, restores option focus, updates the visible product
path/query and structured data from the same response, dispatches one target
event, and owns one status. It does not enter neutral Web runtime.

## Evidence

- Exhibit and Studio outer HTML is exactly equal (`2,811` characters).
- All Mobile/Tablet/Desktop/XL roots have equal client and scroll widths.
- Native sequence proves Ink, sold-out Porcelain, disabled Ash skip/wrap, sold-
  out XL and disabled XXL skip/wrap with exact `input`/`change` order.
- Two sold-out inputs are selectable; two invalid inputs are disabled; root has
  zero explicit roles and zero live regions.
- Long Arabic group/selection text computes RTL with `520 / 520` component and
  `1440 / 1440` document client/scroll widths.
- Dark, forced colors, reduced motion and 200% zoom remain contained. At 200%
  the effective root is `131 / 131` and document is `390 / 390`.
- Deterministic Combined Listing harness requests the sibling path with granular
  option ids, updates to `variant=333`, synchronizes Product Info/form/structured
  data/status, restores focus, emits the sibling `productUrl`, clears busy state,
  and rejects an external-origin product URL without another request.
- Final docs console: zero errors and zero warnings.

Evidence manifest:
`output/playwright/refinement-product/variant-selector-0240/manifest.json`.

## Performance

| Surface | Final gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `4,803 B` | `5,324 B` | pass; `521 B` headroom |
| Neutral component CSS | `70,985 B` | `65,536 B` | existing documented `5,449 B` gap |
| Shared neutral runtime | `21,633 B` | `8,192 B` | existing documented `13,441 B` gap |
| Shopify product coordinator | `2,133 B` | target evidence | target-only; no neutral delta |

The full performance audit has zero undocumented gaps and no ceiling was raised.

## Risks And Open Questions

- Human review must approve swatch/pill geometry, visible/hidden swatch label
  treatment, selected/focus/sold-out/disabled marks, spacing and typography.
- Live Shopify high-variant, sold-out, nonexistent, Combined Listing, app-block
  and theme-editor data remains target release evidence.
- Other targets must map sold-out versus nonexistent using authoritative commerce
  data rather than inferring from color or client-only option matrices.
- Existing neutral CSS/runtime distribution gaps remain program-level risks.

## Readiness Recommendation

Variant Selector is ready for explicit human stability review. Its native group
semantics, D4-A availability policy, state API, keyboard behavior, responsive
layout, accessibility, target coordination, high-variant/Combined Listing mapping
and Exhibit/Studio parity are reconciled. It remains `pilot`; no `stable`
promotion is authorized without owner approval.
