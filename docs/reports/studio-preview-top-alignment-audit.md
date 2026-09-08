# Studio Preview Top Alignment Audit

Status: Implemented and browser-verified

Date: 2026-08-25

Decision: `docs/decisions/0283-studio-preview-top-alignment.md`

## Result

The desktop Studio preview stage now places component content at the same top
coordinate as the Customize inspector instead of vertically centering it in a
fixed-height canvas. Horizontal centering and lateral/lower breathing room are
preserved.

## Scope

- Site-owned Studio layout only.
- Shared component renderers and fixtures are unchanged.
- Exhibit remains on the same registered renderer path.
- Contracts and target adapters are unchanged.
- Responsive single-column spacing and explicit overlay/viewport fixture
  positioning remain independent.

## Browser Evidence

- Before the change, Divider's Customize inspector began at `152px` while the
  vertically centered rule began at `351px`, a `199px` disconnect.
- After the change, the inspector, horizontal Divider, and vertical Divider all
  begin at exactly `152px`.
- Light and Dark preserve the same `152px` top coordinate. The vertical
  Semantic composition remains `192px` high, exposes
  `aria-orientation="vertical"`, and does not acquire `aria-hidden`.
- Button, Product Card, Image with Text, Review, and 404 Page were checked
  as representatives of primitive, product, storytelling, reviews, and page
  fixture families. Each inspector and stage inner began at `152px`, with
  `align-items: flex-start` and `0px` top padding.
- Divider Studio presents `Purpose: Visual only | Semantic`; the underlying
  public `structural` value and separator behavior are unchanged.

## Validation

- `npm run validate:studio`
- `npm run validate:docs`
- `npm run validate:refinement-decisions`
- `npm run audit:refinement`
- temporary production docs build outside `site/dist`
- `git diff --check`
- `npm run evidence:cleanup`
- `npm run evidence:assert-clean`

`site/dist` was not rebuilt. No component status changed.
