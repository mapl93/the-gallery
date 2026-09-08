# 0061. Price OpenType Feature Switches

Status: Accepted

Superseded in part by ADR 0277: `slashedZero` is removed and `zero` is fixed off.

Date: 2026-07-12

## Context

Inter is the base typeface of The Gallery and supports alternate digits (`ss01`),
slashed zero (`zero`), tabular numbers (`tnum`), contextual alternates (`calt`),
and automatic fractions (`frac`). Price benefits from stable numeric widths and
the system's default numeric character, but copy-and-own consumers may replace
Inter with a font that supports a different subset of OpenType features.

Hardcoding every feature as permanently enabled would make fractions affect unit
notation and would prevent consumers from adapting Price to a replacement font.
Treating the switches as design tokens would also confuse semantic component
capability with theme values.

## Decision

- Price exposes five independent boolean semantic properties:
  `alternateDigits`, `slashedZero`, `tabularNumbers`,
  `contextualAlternates`, and `fractions`.
- Neutral web maps them to explicit `data-price-*="true|false"` attributes.
- Inter-oriented defaults are: alternate digits off, slashed zero on, tabular
  numbers on, contextual alternates on, and fractions off.
- Canonical CSS composes each switch through private `--_price-feature-*`
  variables and `font-feature-settings`. These private variables are not public
  customization tokens.
- Unsupported OpenType tags fail progressively: the active font ignores them
  while visible price content and accessibility remain unchanged.
- Automatic fractions remain opt-in because unit-price strings containing `/`
  must not be transformed accidentally.
- Studio exposes all five switches as toggles. Shopify accepts equivalent
  optional render parameters and emits the canonical data attributes.
- The docs site loads Inter from the official Inter distribution rather than
  the Google Fonts subset. Component previews must use a font file that retains
  the advertised OpenType tables so Studio controls produce visible results.

## Consequences

- The base Inter presentation is intentional without becoming an irreversible
  dependency for consumers who replace the font.
- Price can keep live or columnar values stable through tabular numbers.
- Stylistic-set semantics remain explicit: `alternateDigits` describes the Price
  capability while its exact glyph result belongs to the active font.
- A target that substitutes or subsets Inter is responsible for preserving any
  OpenType features it exposes to users.
- No new token layer or component-specific public token is introduced.
