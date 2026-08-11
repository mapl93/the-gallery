# Link Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/link.contract.json` (`0.3.0`)

## Result

Link retains the accepted native-anchor API: required `label` and `href`, three
visual variants, and optional `target`, `rel`, and `currentPage`. It now removes
decorative transitions under reduced motion and safely wraps localized or
unbroken labels. Link remains navigational and has no disabled state or router
dependency.

## Source Reconciliation

- Default, Subtle, and Nav remain the complete visual variant set.
- A real `a[href]` remains the root and visible text remains its accessible name.
- `target`, `rel`, and conditional `aria-current="page"` pass directly to native
  attributes; Button continues to own local commands.
- `overflow-wrap: anywhere` prevents narrow-container overflow without adding a
  truncation or max-lines API.
- Reduced motion sets Link transition duration to `0s` without changing focus or
  native navigation.
- Empty `label` or `href` remains invalid authored input; the renderer does not
  invent a fallback name or destination.

## Interaction And Native Mapping

- Keyboard focus resolves to a `2px solid` outline with `2px` offset.
- Enter followed the configured `#keyboard-destination` fragment.
- Studio values `_blank`, `noopener`, and Current page rendered as native
  `target`, `rel`, and `aria-current="page"`.
- Forced-colors plus keyboard modality retains `:focus-visible`, a `2px` system
  outline, and native system link color.
- Link owns no listener, timer, observer, synthetic click, or navigation client.

## Contrast

Measured rendered text against the Studio stage surface:

| Theme | Default | Subtle | Nav |
| --- | ---: | ---: | ---: |
| Light | `5.89:1` | `7.81:1` | `17.93:1` |
| Dark | `9.94:1` | `12.09:1` | `17.18:1` |

All six results exceed the `4.5:1` normal-text requirement. Default remains
underlined so inline affordance does not depend on color alone; Subtle and Nav
require their surrounding navigation or low-emphasis context.

Dependency follow-up on 2026-07-17: Author Card state auditing exposed that the
previous Nav hover declaration switched from the passing primary color to the
pure accent, which measures only `3.56:1` on the light surface. Canonical Link
now uses the already accepted accent/primary mix for Nav hover. The corrected
state measures `5.88:1` light and `9.95:1` dark, retains a visible hover change
from Nav's primary default, and introduces no API or runtime change. Dependent
components consume this source correction instead of duplicating a local rule.

## Content Before And After

- Before: the unbroken German fixture measured `555.66px` inside a `326px`
  stage, extended from `-82.83px` to `472.83px`, and expanded stage scroll width
  to `441px`.
- After: it wraps inside the `326px` stage and stage scroll width remains `326px`.
- An Arabic localized fixture with consumer-supplied/inherited `dir="rtl"`
  resolves `direction: rtl` and produces no overflow.

Evidence: `link-extreme-forced-colors-reduced-motion-mobile.png`,
`link-localized-forced-colors-reduced-motion-mobile-after.png`, and
`link-forced-colors-reduced-motion-keyboard-focus-mobile.png`.

## Exhibit And Studio Parity

Both modes render byte-identical default markup and fixture:

```html
<a class="link" href="#link-studio-destination">View the collection</a>
```

Eight canonical screenshots cover all four viewports. Subtle and Nav/current-page
desktop images supplement the matrix under
`output/playwright/refinement-batch-02/`.

## Performance And Targets

- Component JS, observers, timers, assets, and network requests: zero.
- Primitives CSS: `9,335 B` gzip, below the `10.3 KiB` ceiling.
- Neutral component CSS: `56,336 B` gzip, below the `64 KiB` ceiling.
- Web and Shopify preserve native anchors and canonical classes. Router adapters
  may compose the host but must retain native semantics and attributes. Figma and
  native-app mappings remain planned rather than certified.

Current cumulative program output after the 2026-07-17 dependency correction is
`10,506 B` gzip for Primitives and `69,092 B` gzip for complete Neutral Web
component CSS. Primitives remains below its `10.3 KiB` family ceiling; the Web
total has a separately tracked pre-existing global gap. The safer Nav hover
changes no runtime and reduces the immediate complete-Web gzip result by `1 B`.

## Human Review Input

Approve the repository render or provide a Link-specific reference for the
accent/primary color mix, underline offset and thickness, Nav weight, focus
radius, and hover treatments. `download`, language, and referrer policy remain
native/target attributes until a cross-target consumer need justifies new public
properties.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run audit:components`
- `npm run audit:refinement`
- `git diff --check`

`site/dist` was not rebuilt.
