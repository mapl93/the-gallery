# Close Button Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/close-button.contract.json` (`0.3.0`)

## Result

Close Button remains a compact native request to dismiss an owned surface. Its
accepted API is still only required `accessibleLabel`, required decorative
`icon`, and native `disabled`. The implementation now participates as an inline
flex atom, removes decorative transitions for reduced motion, and exposes empty
required names instead of inventing `Close` in Studio.

## Ownership And Native Behavior

- Target and icon measure `32 x 32px` and `20 x 20px`, passing the WCAG 2.2
  `24px` target minimum.
- `button type="button"` prevents implicit form submission.
- Enter and Space produced two native click events; native disabled suppressed
  further activation and removed the control from focus.
- Clearing the required label now renders `aria-label=""`; no fallback hides the
  invalid configuration.
- Escape, open state, exit animation, DOM removal, announcement, and return focus
  remain owned by the containing dialog, drawer, toast, alert, or other surface.
- Optional HTML `command="close"` / `command="request-close"` wiring remains a
  web-target capability, not a new cross-target property.

## Inline Composition Before/After

The historical block-level `display: flex` forced surrounding inline text onto
three lines: proof container height `98px`, with `Before action`, the button, and
`after action` on different vertical positions. With `inline-flex`, all three
participate on one line and the proof container measures `51px` high.

Evidence: `close-button-inline-composition-mobile-before.png` and
`close-button-inline-composition-mobile-after.png`.

## Motion, Focus, And Contrast

With reduced motion, transition duration resolves to `0s` and property to `none`.
Forced colors plus keyboard focus retains a `2px solid` outline with `2px`
offset.

| Theme | Rest icon | Hover icon/surface |
| --- | ---: | ---: |
| Light | `7.81:1` | `16.44:1` |
| Dark | `12.09:1` | `14.50:1` |

Every available state measured above exceeds the `3:1` non-text contrast
threshold. Disabled remains a tokenized unavailable state.

## Exhibit And Studio Parity

Both modes render byte-identical root markup with the same `Close dialog` name,
X fixture, native attributes, and classes. Eight canonical screenshots cover
Mobile, Tablet, Desktop, and XL in both modes. Dark hover, disabled,
forced-colors/reduced-motion focus, and inline before/after evidence supplement
the matrix under `output/playwright/refinement-batch-03/`.

## Tokens, Runtime, And Targets

- Public tokens remain the accepted text/surface/focus colors, small radius,
  fast transition, default easing, and disabled opacity.
- `32px` target and `20px` icon remain private geometry.
- Component JS, requests, observers, timers, and owned assets: zero.
- Primitives CSS is `9,414 B` gzip and neutral component CSS is `56,615 B` gzip,
  both under their v1 ceilings.
- Web and Shopify render a native button. Containing target adapters own the
  actual dismiss mutation and focus contract; Figma and native-app mappings are
  planned rather than certified.

## Human Review Input

Approve the repository render or provide a Close Button-specific reference for
X stroke, `32/20px` proportions, radius, hover surface, and focus treatment. As
with Icon Button, native active works but has no separate visual treatment;
adding one is an aesthetic family decision, not inferred here.

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
