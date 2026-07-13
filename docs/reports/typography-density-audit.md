# Typography Density Audit

Date: 2026-07-12

## Result

The neutral web and Shopify targets now resolve default UI copy to `16px / 24px`
at Mobile, Tablet, Desktop, and XL. Button resolves to `14px`, `16px`, and `18px`
for its three sizes and consumes its component-specific font-size token.

## Propagation

- 18 canonical CSS modules consume `--typo-body-size` directly or through a
  derived expression.
- 131 component contracts still declare `--typo-body-size` as public API.
- Common `0.875` and `0.75` derivatives now resolve to `14px` and `12px` instead
  of `15.75px` and `13.5px` on desktop.
- Input value text follows `typography.body.default`, so Input, Select, Textarea,
  and related form controls inherit the corrected density without local edits.

## Resolved Button Connections

| Surface | Source fact | CSS fact | Current impact |
| --- | --- | --- | --- |
| Button font weight | Component source resolves to `600` | CSS consumes `--typo-button-weight` | Preserves the approved render |
| Button transition | Component source resolves to `100ms` and the standard curve | CSS consumes Button-specific duration and easing aliases | Preserves the approved motion |
| Button radius | Component source resolves to `8px` | CSS consumes `--radius-button` | Component customization is connected |
| Outline default fill | Component source resolves to transparent | CSS consumes the public Outline state alias | Component customization is connected |
| Link fill and border | Default, hover, and active resolve to transparent | CSS consumes the public Link state aliases | Preserves the approved underlined Link treatment |

The owner approved these source-versus-render decisions on 2026-07-12. The generic
component-source audit now finds 33 Button source tokens, all 33 connected through
public aliases consumed by the contract and canonical CSS. The stable automated
gate passes without structural gaps.

## Remaining Density Risks

| Surface | Source fact | CSS fact | Current impact |
| --- | --- | --- | --- |
| Button composed height | Desktop/XL minimum-height token resolves to `40px` | Text-only Button renders at `42px`; the canonical two-icon Button renders at `46px` | Padding and icon size overrule the intended minimum |
| Input composed height | Value type resolves to `16px / 24px` | Owner-approved `10px` vertical padding plus borders produces a `46px` field | Resolved during Input certification |
| Hardcoded type sizes | 13 declarations use literal `px`, `rem`, or `em` sizes | Equivalent semantic roles often exist | Potential drift; review component by component |
| Responsive Button spacing | Padding and icon size grow on desktop/XL while touch minimum height decreases | This behavior is documented | Intentional today, but it can still contribute to perceived scale |

## Legacy Target Finding

The legacy Style Dictionary Webflow and Framer build interprets unitless legacy
font-size values such as `16` as `16rem`. Webflow spacing values are also emitted
without CSS length units. These targets remain on the explicitly documented legacy
pipeline and are not used by the site or Shopify.

This should be fixed by the planned target migration to a source-token wrapper or
source-native output, not by treating the current legacy artifacts as canonical.

## Validation

- `npm run build:tokens:web`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:docs`

## Browser Evidence

At a `1474 x 1354` viewport:

- Exhibit Button resolved both `--typo-body-size` and `--typo-button-size` to
  `16px`. Its canonical two-icon example rendered with `16px` text and a `46px`
  height.
- Studio exposed the new Font size control at `16`. Editing it to `14` changed
  the computed component token and font size to `14px`; Reset restored `16px`.
- Studio also exposes the connected Button radius, font weight, transition, and
  easing aliases. Their defaults resolve to `8px`, `600`, `100ms`, and the
  standard curve.
- Input now resolves to `16px / 24px` with `10px` vertical padding and renders at
  `46px` high. Semantically named `--typo-input-*` aliases own its size and line
  height while the former `--space-input-*-size` names remain compatibility aliases.
- Table headers resolved to `14px`, body cells to `16px`, and rows to roughly
  `45px`, which is internally coherent for the content-density role.
- No runtime error was recorded by the local Vite page.
