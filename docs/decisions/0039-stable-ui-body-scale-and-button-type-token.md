# 0039. Stable UI Body Scale And Button Type Token

Status: Accepted

Date: 2026-07-11

## Context

The root browser unit remains `1rem = 16px`, but the source token matrix raised
`typography.body.default.size` and `typography.component.button.size` to `18px`
for desktop and XL. Canonical Button CSS also read the shared body alias instead
of the existing public Button font-size token.

This made UI controls visually larger on wide viewports and produced fractional
derived sizes. Button resolved to `15.75px`, `18px`, and `20.25px` for small,
default, and large on desktop, while mobile and tablet resolved to the intended
`14px`, `16px`, and `18px` scale.

## Decision

- `typography.body.default` resolves to `16px / 24px` in every viewport mode.
- Editorial roles remain independent: `body.large`, article typography, and
  headings may continue to scale by viewport.
- `typography.component.button.size` resolves to `16px` in every viewport mode.
- Canonical Button CSS consumes the public `--typo-button-size` compatibility
  alias, which maps to `--tg-component-button-font-size` in the neutral web
  target.
- Button size modifiers derive `14px`, `16px`, and `18px` from that component
  token.
- Legacy Desktop and XL input values stay in parity with the canonical source,
  but legacy Webflow and Framer outputs are not regenerated as authoritative
  artifacts. Their target migration remains a separate adapter decision.

Other Button source-token connections were outside this decision. They were
subsequently reconciled, with owner approval, under ADR 0040.

## Consequences

- Shared UI copy no longer becomes larger merely because the viewport crosses
  the desktop breakpoint.
- Components using `--typo-body-size` or its fractional derivatives become denser
  and resolve to predictable integer pixel sizes.
- Button typography is isolated from future body-copy scale changes.
- Web and Shopify consume the corrected source through validated generated
  targets.
- Webflow and Framer must migrate to source-token outputs or wrappers before their
  legacy generated token files can be treated as production-ready.
