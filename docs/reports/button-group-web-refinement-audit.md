# Button Group Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/button-group.contract.json` (`0.3.0`)

## Result

Button Group remains a named structural `role="group"` around complete canonical
Button children. Default stays intrinsic and Full keeps equal distribution. The
implementation now joins borders and outer radii on logical inline edges, lets
extreme Full labels wrap without page overflow, and exposes an empty required
group label instead of substituting a Studio value.

## Source Reconciliation

- `groupLabel` and `variant` remain the complete public API.
- Full is represented only on the layout Variant axis. The root state inventory
  contains Default only, in accordance with the global variant/state
  orthogonality rule in ADR 0274.
- Button continues to own labels, visual variants, sizes, disabled/busy state,
  focus, activation, and events for every child.
- The group adds no selected value, roving tabindex, arrow-key navigation,
  controlled state, listener, observer, timer, or asset.
- Physical `margin-left` and corner shorthands were replaced with logical inline
  overlap and logical start/end radii.
- Full uses equal `flex` shares, `min-width: 0`, normal whitespace, and
  `overflow-wrap: anywhere`; Default remains intentionally content-width.
- The Studio-only `white-space: nowrap` override was removed so both docs modes
  exercise the canonical Full behavior.
- Studio now exposes site-owned fixture controls for one to eight Button
  children and each visible child label. They update the same registered
  renderer used by Exhibit and Studio without adding child arrays, counts, or
  labels to the Button Group contract.

## Semantics And Keyboard

- Root: `role="group"`, default name `Display options`.
- Clearing the required Studio value now renders `aria-label=""`; no hidden
  `Display options` fallback survives invalid input.
- Starting on Option 1, Tab moves to Option 2. ArrowRight leaves focus on Option
  2, confirming this is a normal group rather than an APG Toolbar.
- In forced colors, the focused child retains a `2px solid` outline with `2px`
  offset and rises above joined borders. Its inherited Button transition resolves
  to `0s` under reduced motion.

## Responsive And Content Before/After

At a `390px` viewport, the available group width was `326px`:

| Measurement | Before | After |
| --- | ---: | ---: |
| Group `scrollWidth` | `440px` | `326px` |
| Document `scrollWidth` | `472px` | `390px` |
| Child height | `44px` | `102px` for the extreme fixture |

The post-change height is deliberate wrapping of three indivisible German,
Japanese, and Spanish labels, not clipping or truncation. Automatic stacking is
still outside the accepted contract.

In RTL, the first DOM child appears on the right with right-side `8px` corners;
the last appears on the left with left-side `8px` corners. Following children use
`margin-right: -1px`, producing a `1px` overlap at both joined seams.

Evidence: `button-group-extreme-full-mobile-before.png`,
`button-group-extreme-full-mobile-after.png`,
`button-group-rtl-mobile-before.png`, and
`button-group-rtl-mobile-after.png`.

## Exhibit And Studio Parity

Both modes render byte-identical initial root markup and fixtures:

```html
<div class="btn-group docs-studio__preview-button-group" role="group" aria-label="Display options"><button class="btn btn--outline" type="button">Option 1</button><button class="btn btn--outline" type="button">Option 2</button><button class="btn btn--outline" type="button">Option 3</button></div>
```

Eight canonical screenshots cover Mobile `390 x 844`, Tablet `768 x 1024`,
Desktop `1280 x 800`, and XL `1600 x 1000` in Exhibit and Studio. Full/dark,
disabled-child, keyboard focus, forced colors, reduced motion, RTL, and extreme
content supplement the matrix under `output/playwright/refinement-batch-03/`.

Studio may then vary the site-owned child fixture interactively. Reset restores
the same three-button initial fixture consumed by Exhibit.

A focused live pass on 2026-08-26 changed the fixture from three to five
children, edited Button 1 to `View collection` and Button 5 to a longer
localized-style destination label, and observed all five values in the
canonical preview. Reset then restored count `3` and `Option 1`, `Option 2`,
and `Option 3` exactly.

## Tokens, Performance, And Targets

- Public token: `--radius-md` only.
- Private geometry: zeroed inner radii, `-1px` border overlap, and equal flex
  distribution. Button owns all other tokens.
- Component JS, requests, observers, timers, and owned assets: zero.
- Primitives CSS: `9,414 B` gzip, below the `10.3 KiB` family ceiling.
- Neutral component CSS: `56,615 B` gzip, below the `64 KiB` ceiling.
- Web and Shopify compose the same Button classes. React/Angular should wrap
  consumer Button children; Figma and native-app mappings remain planned.

## Human Review Input

On 2026-08-26, the owner observed that Studio did not allow changing the number
of buttons or their labels. ADR 0291 records the accepted fixture controls while
preserving Button ownership of child content and behavior.

Approve the repository render or provide a Button Group-specific reference for
joined border weight, outer radius, equal-width distribution, and the accepted
extreme-label wrapping. If product requirements call for responsive stacking,
introduce a separately specified layout behavior rather than changing Full by
inference. Mixed child visual variants also require visual review but remain
owned by Button composition.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify:components`
- `npm run audit:components`
- `npm run audit:refinement`
- `git diff --check`

`site/dist` was not rebuilt.
