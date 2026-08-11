# Button Web Certification

Date: 2026-07-12

Target: Neutral web

Contract: `components/contracts/button.contract.json`

## Result

Button remains marked `stable` for the neutral web target after the approved
typography-density correction.

The reviewed semantic property surface, Studio presentation metadata, icon
composition, loading placement, CSS, canonical MDX, historical component guide,
and generated web adapter now agree. The automated certification gate passes with
no structural gap or web-manifest drift. Owner visual review was completed on
2026-07-11.

The post-certification density audit isolated Button typography from body copy and
normalized the S/M/L scale to `14px / 16px / 18px`. The source-token connection
gate then found eight disconnected values across Link and Outline colors, radius,
font weight, transition duration, and transition curve. The owner approved
reconciling those sources toward the reviewed render on 2026-07-12 under ADR 0040.

Button now declares 33 source-component tokens and connects all 33 through public
aliases consumed by both its contract and canonical CSS. Its contract exposes 59
public tokens; the automated stable gate passes with no structural gap or review
flag.

## Reviewed Property Surface

Contract version `0.3.0` defines ten semantic properties with explicit neutral-web
mappings:

| Property | Type | Web mapping |
| --- | --- | --- |
| `label` | string | Root content |
| `variant` | enum | Canonical variant class options |
| `size` | enum | Canonical size class options |
| `disabled` | boolean | Native `disabled`; anchors keep `role="link"` and `aria-disabled` while omitting `href` |
| `busy` | boolean | `aria-busy` plus native `disabled`, or `role="link"` with omitted anchor `href` |
| `leadingIcon` | slot | `.btn__icon.btn__icon--leading` |
| `trailingIcon` | slot | `.btn__icon.btn__icon--trailing` |
| `iconOnly` | boolean | `.btn--icon-only` |
| `fullWidth` | boolean | `.btn--full` |
| `loadingPosition` | enum | `data-loading-position="leading|trailing"` |

`variant` and `size` reference the existing contract option lists instead of
duplicating their values or defaults. No default label was invented.

## Studio Presentation Metadata

`site/src/content/studio/button.studio.json` translates the approved Figma
inspector into site-owned presentation metadata. It preserves the four groups
`Content`, `Presentation`, `Layout`, and `Appearance`, covers all ten semantic
properties exactly once, and defines 18 controls, including 11 token controls
resolved from the contract's public token surface.

The definition does not copy property types, option values, semantic defaults,
target mappings, or token values. Size labels are presentation aliases over the
contract values, state options come from `contract.states`, and loading position is
conditional on `busy`. The icon-composition control references both icon slots and
`iconOnly`, then projects preview content from the independently accepted Lucide
catalogue under ADR 0037.

`npm run validate:studio` enforces this boundary, and `npm run audit:components`
now records Studio definition, property-binding, registered-renderer, and
interaction-evidence coverage.

## Studio Renderer

`/components/button?view=studio` now renders the first metadata-driven Studio.
`StudioInspector.tsx` handles grouping, conditional visibility, enum controls,
segmented controls, slot composition, switches, token fields, color swatches, and
reset. `ButtonStudio.tsx` maps those values onto the canonical `.btn` contract.

The inspector itself reuses the current public Input, Select, Switch, and Segmented
Control CSS. Lucide is installed only in `site/`; a validated 30-icon action
projection provides compact leading and trailing selectors. The selected SVGs map
to the existing `.btn__icon--leading` and `.btn__icon--trailing` slots and do not
become component defaults or target-adapter dependencies.

## Confirmed Loading Rules

When `aria-busy="true"`:

1. An explicit `loadingPosition` wins.
2. With one positioned icon and no explicit value, loading uses that icon's side.
3. With no icons, loading defaults to leading.
4. With both icons, loading defaults to leading.
5. Loading replaces only the icon on the selected side. The label and opposite icon
   remain visible.

Canonical CSS implements these rules without JavaScript. The spinner uses the same
public icon-size token as the icon it replaces.

## Resolved Gaps

- `.btn--icon-only` and `.btn--full` are public boolean properties rather than
  undocumented CSS capabilities.
- The single ambiguous icon part is replaced by independent leading and trailing
  slots that may coexist.
- Busy presentation no longer makes the label transparent or centers an absolute
  spinner over all content.
- Busy native buttons compose `aria-busy` with `disabled`; busy anchors preserve
  `role="link"` while omitting `href`, so no input method reactivates them.
- Disabled anchors preserve `role="link"` and `aria-disabled` while omitting
  `href`.
- The Button MDX page now renders one canonical instance rather than a wall of
  variants and documents the reviewed properties and loading rules.
- `docs/COMPONENTS.md` no longer references the nonexistent `.btn--primary`, stale
  Link hover/active tokens, or the previous loading implementation.
- The neutral web adapter was regenerated and validates against canonical CSS.
- Button now consumes `--typo-button-size` rather than the shared body-copy token;
  its font size remains `16px` in every viewport mode.
- Button now consumes component-specific public aliases for font weight, radius,
  transition duration, and easing. Outline and Link state colors also consume
  their public aliases, with no change to the approved render.
- The component-source gate confirms that all 33 Button source tokens are
  connected; the transient eight-token structural gap is closed.
- The contract validator now checks semantic property types, enum sources, defaults,
  target mappings, conditional attribute removal, selectors, and mapped web classes
  when properties are present.

## Browser Evidence

Playwright verification covered desktop and a `375 x 812` mobile viewport.

The following loading combinations produced the expected generated side and icon
visibility:

- No icons, automatic position.
- Both icons, automatic position.
- Leading icon only, automatic position.
- Trailing icon only, automatic position.
- Both icons, explicit leading.
- Both icons, explicit trailing.
- No icons, explicit trailing.

In every case the label remained in the accessibility tree and its visual color was
not transparent. On mobile, the canonical two-icon button measured `174.28px` in
resting, automatic-loading, and explicit-trailing states inside a `341px` canvas, so
loading caused no width shift or overflow. The generated spinner measured `18px`,
matching the resolved icon size.

Activation testing used real pointer clicks, Enter, and Space with click counters.
The active button registered three expected activations and the active anchor
registered two. Busy buttons, disabled buttons, busy anchors, and disabled anchors
each registered zero. Busy controls retained opacity `1`; disabled controls retained
the separate disabled opacity `0.5`. Busy and disabled anchors had no `href` and kept
`role="link"`.

The only browser console error was the existing missing `/favicon.ico`; it is not
caused by Button.

Studio browser verification additionally covered:

- Desktop at `1280 x 720`: a `344px` inspector and `532 x 590px` stage with no
  horizontal overflow.
- Mobile at `375 x 812`: a `328px` stage above a `328px` inspector with no
  horizontal overflow.
- Label editing, all five icon compositions, five variants, three sizes, persistent
  hover/active/focus presentation, disabled, loading, and conditional loading
  position.
- Explicit trailing loading with both icons: the leading icon and label remained,
  the trailing icon was replaced, and the generated `::after` indicator rendered.
- Full width matched the `520px` desktop stage width. On mobile it matched the
  `296px` inner stage width.
- A long unbroken label with both icons wrapped without component or page overflow;
  loading preserved the same `296px` width and `82px` height.
- Icon-only rendered at `40 x 40px` with one leading fixture and retained
  `aria-label="Add to cart"`.
- Layout token editing updated the computed gap from `8px` to `20px`; color editing
  updated the active public fill token and rendered color; reset restored all
  semantic properties and token overrides.
- Disabled remained at opacity `0.5`; loading remained at opacity `1` and exposed
  `aria-busy="true"` plus native `disabled`.
- Exhibit and Studio switch through a shareable `view=studio` query parameter and
  expose tab and tabpanel semantics.

Final adapter-entry verification additionally confirmed:

- The docs site loads `platforms/web/index.css` instead of importing canonical CSS
  source files and preview-only token defaults directly.
- Shadow-root Exhibit previews load generated `platforms/web/components.css` and
  inherit the document token matrix. The canonical Button preview remains styled
  in both light and dark themes through that boundary.
- Real keyboard navigation produces `:focus-visible` in Exhibit and Studio with a
  `2px` outline and `2px` offset. Entering disabled or busy while focused moves
  focus to `body`, removes the focus-visible match, and prevents reactivation;
  returning to default restores the Button to the tab sequence and its keyboard
  focus indicator.
- In `prefers-reduced-motion: reduce`, Button transition duration resolves to
  `0s` and the generated busy indicator remains visible with `animation-name:
  none`. With normal motion, the indicator retains `btn-spin` at `0.6s`.
- Light mode primary Button contrast measured `10.37:1`; dark mode measured
  `17.93:1`. The dark Studio inspector measured `17.18:1` for its primary text and
  surface. Theme changes also refresh the token values displayed by the inspector.
- Studio remained free of horizontal overflow at `375 x 812` in light and dark
  themes after the adapter-entry migration.
- The Lucide catalogue version matches the installed `lucide-react` lockfile
  version, exposes 30 validated choices, and restores Shopping bag / Arrow right
  as presentation-only reset defaults.
- Leading and trailing Lucide choices update independently. With Heart leading,
  Send trailing, busy state, and explicit trailing loading, the Heart SVG remained
  visible, the Send SVG was replaced by `::after`, and the label remained visible.
- Lucide selectors remained within the `343px` mobile inspector with no horizontal
  overflow in light or dark mode. The production bundle added only the projected
  named imports rather than an all-icons runtime catalogue.

## Certification Decision

The owner approved the final Exhibit and Studio behavior, including the Lucide
catalogue integration, on 2026-07-11. Button is the first contract promoted to
`stable`; certification remains specific to the neutral web target.

## Expanded v1 Refinement Evidence — 2026-07-13

The v1 refinement program preserved the accepted implementation and added the
evidence that was not part of the original pilot package.

- Exhibit and Studio were captured at `390 x 844`, `768 x 1024`, `1280 x 800`,
  and `1600 x 1000`; all eight images are under
  `output/playwright/refinement-calibration/`.
- The XL Studio viewport has no horizontal page overflow (`scrollWidth` equals
  `1600px`).
- In combined forced-colors and reduced-motion mode, keyboard focus retains a
  `2px` solid outline with `2px` offset.
- The busy indicator remains visible; Button transition duration resolves to
  `0s`, spinner animation name to `none`, and animation duration to `0s`.
- The neutral component bundle measures `56,481 B` gzip and shared runtime
  `5,180 B` gzip, both inside the v1 budgets.

This is an evidence refresh, not a new promotion or a reopening of the approved
Button visual direction.
