# 0281. Divider Parent-Owned Spacing And Purpose

Status: Accepted

Date: 2026-08-25

## Context

During live Divider review, the owner could see the color and thickness change
of `decorative`, but could not distinguish `default` from `section`. The source
confirmed that `section` rendered the same `1px` rule and changed only external
margin from the element gap to the section gap. Studio's isolated stage made
that layout difference especially unclear.

The `Meaning: Decorative | Structural` control was also unclear because it
correctly produced no visual change. That axis controls accessibility-tree
exposure rather than presentation.

## Decision

- Divider keeps only `default | decorative` as visual variants.
- The `.divider--section` class and `section` contract/registry variant are
  removed.
- Divider sets zero external margin in both orientations. The composing parent
  stack, grid, section, or target layout owns all surrounding spacing.
- Divider no longer declares the element-gap or section-gap tokens as public
  customization API because canonical CSS no longer consumes them.
- The public `semantics: decorative | structural` property remains unchanged for
  compatibility and continues to control assistive-technology exposure.
- Studio presents that property as `Purpose` with the plain-language options
  `Visual only` and `Semantic`.
- Purpose intentionally has no visual effect. Visual-only dividers use
  `aria-hidden="true"`; structural dividers remain exposed, with
  `aria-orientation="vertical"` when applicable.

## Consequences

- Variant now describes one concept: the visual style of the rule.
- Layout spacing is composable and no longer hidden inside a primitive variant.
- Purpose is understandable in Studio without renaming or breaking the public
  `semantics` property.
- Divider's contract advanced to `0.4.0` and remained `pilot` until the owner
  approved the complete visual and semantic result on 2026-08-25. It is now
  `stable` under owner decision 80.
