# 0306. Specialized Field Visual Customization

Status: Accepted

Date: 2026-09-09

## Context

Following ADRs 0293 and 0305, Inline Error, Password Input and Number Input still
contained author-facing visual constants. Their semantic behavior is already
accepted by ADRs 0096 and 0097 and does not require a new runtime architecture.
Studio also overrode icon dimensions and Password width, while combining its
fixture gap with Field Wrapper's own label and feedback margins.

## Decision

- Add 25 decisions in the existing component source layer: Inline Error (6),
  Password Input (9), Number Input (10). Reference existing dimension primitives
  where available. Keep 360px, 88px and 112px as component-specific measures;
  they do not justify adding one-off primitives to the global dimension scale.
- Inline Error exposes padding, icon size/gap/offset and background opacity.
  Typography, text-color inputs and radius reuse existing public roles. Its
  default background remains 8% feedback color against transparency; text remains
  a 55% feedback / primary-text mix. No default border, shadow or live region is
  added. The 1px forced-colors boundary remains a system accommodation.
- Password Input reuses public Input padding, border width, focus geometry, type,
  surfaces, opacity and motion. Its own tokens cover maximum preferred width,
  reveal clearance, reveal icon, inset reveal focus, and strength layout.
  The existing 46px reveal target remains the shared Button minimum-height role.
- Strength has four semantic segments. Bar count and active-segment mapping stay
  behavioral presentation, not value tokens. Separate column gap (4px) and text
  gap (6px) replace the old 4px grid gap plus 2px text margin without changing
  the result. The strength top gap remains 8px. Scoring is still target-owned.
- Number Input reuses public field border/focus, type, colors, motion and the
  existing 46px control-height role. Component tokens cover the value's preferred,
  minimum and maximum widths; padding, separator, action icon/text size and
  proportional line height. The action width is independently editable, initially
  46px. Native geometry
  showed a 48px outer control from 46px actions plus borders; the inner actions
  now subtract outer borders from the shared minimum control height. This gives
  46px outside with 44px-high actions at the default 1px border.
  The root remains intrinsically sized when composed as `.field__control`.
- Keep numeric native editing, null/empty values, bounds, step, disabled,
  readonly, form data and reset separate from visual tokens. Do not add units,
  prefix/suffix, commerce interpretation or another numeric parsing policy.
- Studio and Exhibit use shared metadata. Number's optional icon-action fixture
  is site-owned, defaults to the existing text signs and does not add a contract
  property or target icon dependency. Its UI composes canonical Checkbox.
- The shared site renderers for Number Input and Inline Error are also consumed
  by the contact composition. An optional piece count is local fixture content,
  not a default field schema or Shopify submission mapping. Auth Forms continues
  to compose the same Password Input renderer with current-password semantics.
- Field Wrapper now supplies the label and one current feedback message in both
  specialized Studios. Remove the conflicting fixture gap and icon/width rules
  so the public source values reach the actual rendered component.

## Preserved private mechanics

Containment, flex/grid, field width limits as relationships, centered actions,
LTR numeric glyph ordering in RTL interfaces, tabular numerals, decorative icon
paths, line-height 1 for centered text signs, native spinner suppression, empty
background/border resets and forced-colors system values remain implementation.

Password and Number default borders mix 60% input color with primary text; their
validation borders/icons use 70%. Password validation hover preserves its family.
Number's focus boundary covers its composed action buttons and field. The shared
colors are inputs to those derivations, not promises of exact final colors.

Changing action targets, field padding, icon dimensions or borders independently
requires checking their geometric relationship. Defaults use a 46px field and
reveal target, and 44px-high Number actions inside its 46px outer boundary.
Number's minimum value width must not exceed its maximum. The whole control must
fit both actions plus its minimum field and borders.
Password clearance reserves action size plus a separate text gap. Auth Forms may
own a full-width composition measure instead of the preferred standalone width.

## Acceptance and scope

Verify all new dimensions through Studio overrides, reset, native keyboard and
pointer actions, empty/decimal/bounded numeric editing, one password node across
visibility changes, read-only/disabled form behavior, native submission/reset,
strength text/association, actual contact and sign-in compositions, light/dark,
RTL, forced colors and reduced motion. Static announcement metadata alone does
not prove a screen reader announcement.

No source format, token layer, runtime behavior, contract maturity, release model,
remote Shopify theme or Figma surface changes. Web and Shopify outputs are
regenerated from canonical source. Existing copied consumers adopt changes through
the protected copy-and-own workflow; no automatic migration is introduced.
