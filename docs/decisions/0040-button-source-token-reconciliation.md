# 0040. Button Source Token Reconciliation

Status: Accepted

Date: 2026-07-12

## Context

The source-component connection audit introduced after Button certification found
eight Button tokens that did not reach a public compatibility alias consumed by
both the contract and canonical CSS. Some disconnected values happened to match
the render, while font weight, transition duration, and Link styling disagreed
with the already reviewed component.

The owner confirmed that reconciliation must preserve the approved neutral-web
render rather than change Button to match stale or disconnected source values.

## Decision

- Button font weight is `600` through `--typo-button-weight`.
- Button radius is `8px` through `--radius-button`.
- Button transitions use `100ms` through `--transition-button-duration` and the
  standard `cubic-bezier(0.4, 0, 0.2, 1)` curve through `--easing-button`.
- Outline default fill remains transparent and consumes its public variant token.
- Link default, hover, and active fills and borders remain transparent; Link text
  remains underlined and consumes the public state aliases.
- The DTCG source, legacy parity inputs, neutral-web compatibility aliases,
  canonical CSS, registry, contract, Studio metadata, and target validators stay
  aligned with those values.
- The generic component-source gate remains part of certification. A source
  component token is connected only when it reaches a public alias declared by
  the contract and consumed by canonical CSS.

## Consequences

- All 33 Button source-component tokens are connected; the stable neutral-web
  certification gate passes with no structural gap.
- Studio exposes the reconciled radius, weight, duration, and easing controls
  without creating a second value source.
- Web and Shopify receive the same values through generated target outputs.
- This decision does not settle Button's composed height, Input's composed
  height, responsive Button spacing, or the remaining hardcoded typography
  declarations. Those density questions remain separate review work.
