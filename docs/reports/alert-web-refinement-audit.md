# Alert / Banner Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/alert.contract.json` (`0.3.0`)

## Result

Alert remains inline visible feedback with required message, optional title/icon/
canonical Close Button, four semantic variants, and explicit announcement timing.
Static content emits no live-region semantics, Polite maps to status, and
Assertive maps to alert; the visual Banner name never becomes an ARIA banner
landmark. The implementation now wraps extreme content, uses the existing
semantic body-small typography tokens, exposes an empty conditional dismiss name,
and strengthens decorative semantic accents with a private theme-aware derivation.

## Anatomy, Semantics, And Dismissal

- `announcement=none`: no `role` and no `aria-live`.
- Polite: `role="status" aria-live="polite"`.
- Assertive: `role="alert" aria-live="assertive"`.
- No tested state emitted `role="banner"`; urgency remains orthogonal to the
  Info/Success/Warning/Error visual variant.
- The dismiss slot renders `button type="button"` with
  `close-btn alert__dismiss` and an `aria-hidden="true"` X icon, consuming the
  canonical Close Button rather than duplicating its markup contract.
- Clearing the conditional `dismissLabel` renders `aria-label=""`; no invented
  fallback survives.
- Activating dismissal replaced the fixture with `role="status"` text and left
  focus on `body` after the button was removed. That replacement is a Studio
  demonstration, not Alert's public behavior: consumers own removal, persistence,
  motion, focus destination, and follow-up announcement.
- With empty optional title and empty required message, title is omitted while
  the required message node remains empty, making validation failure observable.

## Typography And Content Before/After

Rendered typography now resolves through semantic tokens:

| Part | Size | Line height | Weight |
| --- | ---: | ---: | ---: |
| Title | `16px` | `24px` | `600` private emphasis |
| Message | `14px` | `20px` | inherited |

At a `390px` viewport, an indivisible localized title and message produced:

| Measurement | Before | After |
| --- | ---: | ---: |
| Alert `scrollWidth` | `397px` | `324px` |
| Content `scrollWidth` | `287px` | `216px` |
| Document `scrollWidth` | `430px` | `390px` |

Title and message client/scroll widths now match at `216px`; text wraps without
clipping or changing the one-row icon/content/dismiss anatomy. Evidence:
`alert-extreme-mobile-before.png` and `alert-extreme-mobile-after.png`.

## Semantic Accent Contrast

The `8%` feedback-family tint remains the background. Border and decorative icon
now use the private theme-aware mix `75% feedback + 25% primary text`, preserving
the active semantic color family without inventing a public token.

| Variant | Light accent | Dark accent |
| --- | ---: | ---: |
| Info | `5.03:1` | `7.93:1` |
| Success | `3.71:1` | `9.32:1` |
| Warning | `3.26:1` | `10.33:1` |
| Error | `5.11:1` | `7.41:1` |

All accents now exceed `3:1` against the tinted surface. Title contrast ranges
from `16.17:1` to `16.84:1` in light and `14.76:1` to `15.50:1` in dark; message
contrast remains at least `7.05:1` light and `10.39:1` dark. Meaning continues to
come from visible text, not color or icon alone. Forced colors preserves the
canonical dismiss control's `2px solid` focus outline and `2px` offset.

## Exhibit And Studio Parity

Both modes render byte-identical root markup (`870` bytes in the tested fixture),
including the Check fixture, Info class, text, canonical Close Button, names, and
native attributes. Eight canonical screenshots cover Mobile, Tablet, Desktop,
and XL in both modes. Eight semantic variant/theme images plus extreme content
and forced-colors dismissal focus supplement the matrix under
`output/playwright/refinement-batch-04/`.

The Studio Check is a configurable icon fixture, not an automatic severity icon
or public default imposed on consumers.

## Tokens, Runtime, And Targets

- Public typography now explicitly includes body/body-small size and line-height.
- Public colors, radius, and semantic feedback families remain unchanged.
- `12px 16px` padding, `12px` gap, `20px` icon, `1px` alignment, `2px` text gap,
  `600` title weight, `8%` tint, and the private accent mix remain composition.
- Alert adds `0 B` component JS and no request, observer, timer, animation, or
  continuous work. Optional dismissal is consumer behavior; Close Button owns
  native activation presentation only.
- Web and Shopify map container/variant/live attributes and canonical Close
  composition. Framework targets control presence; Figma records visual variants
  and optional anatomy; native targets announce only when insertion timing needs it.

## Human Review Input

Approve the repository render or provide Alert-specific references for semantic
tints, strengthened icon/border mix, typography, padding, icon alignment, and
dismiss placement. Recommended: keep announcement timing separate from visual
severity and keep the stronger private accent. Alternatives are the original
decorative low-contrast accents or an owner-specified semantic color formula;
neither should become a new public token without a broader reusable decision.

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
