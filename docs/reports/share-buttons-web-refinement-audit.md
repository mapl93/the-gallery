# Share Actions Web Refinement Audit

Status: refined implementation candidate; real Web/Shopify consumers, provider
verification, final visual, Figma and explicit human review required; remains
`pilot`

Date: 2026-07-20

Component: Share Actions (`L9`, registry slug `share-buttons`, dependency order
`123`)

Dossier: [Share Actions](../refinement/dossiers/share-buttons.md)

## Outcome

L9 is now one fail-closed, named, finite group of target-selected share actions.
It keeps the registry-backed `.share-buttons` identity, composes canonical
Button roots as native buttons or anchors, supports intrinsic `inline | stacked`
layout and adds zero neutral runtime.

The duplicate `.share` implementation, duplicated control surface/focus/icon
rules, physical fixed positioning, viewport query, public `sticky` modifier and
child SVG override are removed. A fixed rail remains a host or future separately
reviewed component responsibility.

## Refinement Rubric

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One ordinary action group for sharing one target-supplied resource; not a Toolbar, menu, provider registry, chooser, status system or fixed rail. |
| Anatomy and composition | pass | Generic named `role=group` plus one or more `.share-buttons__action.btn` canonical Button roots. |
| Variants, states and content | pass | Inline, stacked, one/many, capability omission, blank-label/empty-action fail-close, long/localized/unbroken, RTL, dark, forced colors and reduced motion covered. |
| Public API | pass | `variant`, required `label`, required ordered `actions`; curated semantic ids and arbitrary custom actions live inside the target-owned composition. |
| Controlled/uncontrolled | not applicable / explicit | No persistent neutral value. Targets own ephemeral async request/result state and canonical Button busy/disabled projection. |
| Dependencies | pass | Canonical Button owns surface, icon geometry, target size, hover/active/focus/disabled/busy and motion; anchors are an accepted Button root. |
| Tokens and values | pass | Root uses only `--tg-space-stack-sm`; no new public layer, hardcoded component geometry or private provider style. |
| Accessibility | pass for neutral base | Required group name, visible action names, truthful native button/link semantics, ordinary Tab order, Enter/Space, retained focus, no composite-widget role. |
| Responsive/content | pass | Eight natural surface/viewport captures plus localized RTL, unbroken and effective-200% stress report zero root/document overflow. |
| Runtime/performance | pass for L9 boundary | Neutral runtime remains zero; L9 CSS shrinks from `626 B` to `249 B` gzip. Existing aggregate/family gaps remain documented debt. |
| Cross-target translation | pass for boundary | Web CSS/metadata implemented; target consumers own capabilities, URLs, APIs, security and truthful results. Shopify remains planned. |
| Exhibit/Studio parity | exact | Same `ShareActionsArtwork` and fixture; exact root `outerHTML` and equal-container computed style. |
| Human review | required | First consumers, current provider flows, final visual/action profile, L9-specific Figma evidence and explicit stability approval remain open. |

## Certified Neutral Boundary

- `label` is a required non-empty localized accessible name. `actions` must
  resolve to at least one valid target-capable action. Either failure omits the
  whole root.
- `inline` wraps from actual container space. `stacked` is an intrinsic column.
  Neither owns sticky/fixed placement, safe areas, collisions, z-index, mobile
  relocation or print behavior.
- Native Share and Copy use `button type="button"`; Email, verified provider
  flows and custom destinations use anchors with real target href values.
- The accepted semantic id catalogue is `native`, `copy`, `email`, `whatsapp`,
  `facebook`, `x`, `pinterest`, `linkedin`, `telegram`, `reddit`, `instagram`,
  `threads`, and `tiktok`; arbitrary custom actions may be mixed in target order.
- The component renders no catalogue by default. An id requests adapter
  resolution and does not freeze a URL, icon, label, support claim or fallback.
- An unavailable action is omitted. It is not exposed as a dead focusable
  control and is not silently substituted by Native Share or Copy.
- The target owns canonical URL/title/text/media, encoding, capability and
  permissions, provider API/SDK, popup/new-context security, async
  success/cancel/error, fallback, feedback/announcement, analytics and cleanup.
- Instagram and TikTok are target-capability actions, not generic Web URL
  promises. Native Share remains a separate explicit action.

## Accessibility And Interaction Evidence

- Runtime root is one `DIV role="group"` named “Share this studio note”, with no
  root tabindex, Toolbar/menu/selection roles, `aria-current`, `aria-pressed` or
  component live region.
- The capable-browser fixture rendered two `button type="button"` operations
  and two anchors: a real encoded `mailto:` destination and custom fragment
  destination. Every icon is decorative beside a complete visible label.
- Sequential Tab focus was exactly System share, Copy link, Email, Send to
  studio. There is no roving focus or arrow-key override.
- Enter on Copy link executed the target Clipboard Promise, announced success
  only after resolution through the adjacent target `role=status`, and retained
  focus on Copy link.
- Enter on the custom anchor emitted the docs inspection request without
  changing the URL or focus; its native href remains present in component DOM.
- Removing Web Share/Clipboard capabilities before navigation omitted both
  operations and retained the two valid destination anchors. No disabled dead
  provider controls appeared.
- Blank group label yielded zero roots. A controlled zero-action projection also
  yielded zero roots. Duplicate ids, blank action labels and link records without
  href are rejected by the shared renderer.
- Forced colors preserves visible system boundaries/focus; reduced motion gives
  canonical Button transition duration `0s`. Arabic RTL, a long unbroken label
  and effective 200% type report zero root and document overflow.
- Console errors and warnings are empty.

## Responsive And Visual Evidence

Eight final natural viewport captures:

- `output/playwright/refinement-blog/share-actions-0230/share-actions-exhibit-mobile.png`
- `output/playwright/refinement-blog/share-actions-0230/share-actions-exhibit-tablet.png`
- `output/playwright/refinement-blog/share-actions-0230/share-actions-exhibit-desktop.png`
- `output/playwright/refinement-blog/share-actions-0230/share-actions-exhibit-xl.png`
- `output/playwright/refinement-blog/share-actions-0230/share-actions-studio-mobile.png`
- `output/playwright/refinement-blog/share-actions-0230/share-actions-studio-tablet.png`
- `output/playwright/refinement-blog/share-actions-0230/share-actions-studio-desktop.png`
- `output/playwright/refinement-blog/share-actions-0230/share-actions-studio-xl.png`

Special-state captures:

- `share-actions-stacked-desktop.png`
- `share-actions-dark.png`
- `share-actions-forced-colors.png`
- `share-actions-localized-rtl-reduced-motion.png`
- `share-actions-extreme-unbroken-mobile.png`
- `share-actions-200-percent-mobile.png`
- `share-actions-capability-omission.png`

All natural viewports contain four focusables and report zero root/document
inline overflow. The current outline/small Button treatment, action order, icons
and labels are a coherent implementation candidate, not final art direction.

## Provider Revalidation

The neutral catalogue was rechecked against current official interfaces on
2026-07-20. Web Share remains a secure-context, user-activated, Promise-based
user-agent chooser. Clipboard remains a permission/security-controlled Promise.
Telegram documents a Web share URL; Pinterest documents its Save add-on;
LinkedIn documents plugin/API paths; TikTok Share Kit is mobile-app oriented and
its former Web Share Video API is deprecated. The former X Web Intent document
redirects to the general developer overview, while Meta documentation
rate-limited automated inspection.

This confirms the accepted boundary: each real adapter revalidates its chosen
official provider path. Neutral source records semantic ids only and does not
copy or fossilize current URLs/SDK assumptions.

## Automated Verification

- `npm run validate:contracts`: 183 contracts pass.
- `npm run validate:studio`: 183 definitions and 972 semantic properties pass.
- `npm run validate:docs`: passes with documented external-reference warnings.
- `npx --prefix site tsc --noEmit -p site/tsconfig.json`: passes.
- `npm run validate:adapter:web`: 183 components / 19 CSS sources pass.
- `npm run validate:adapter:shopify`: 183 components, 84 target-ready, 57
  dedicated Liquid templates and 34/34 schema-ready surfaces pass with existing
  maturity warnings.
- `git diff --check`: passes.
- `site/dist` was not rebuilt.
- Browser evidence used one managed server, one headless
  `gallery-refinement` session and one tab, then cleanup confirmed URL down,
  port 4173 free, server stopped and browser closed.

## Performance

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| L9 CSS slice | `626 B` gzip | `249 B` gzip | component observation | pass; `-377 B` |
| Blog family CSS | `5,787 B` gzip after L7 | `5,593 B` gzip | `5,529 B` | improved `-194 B`; documented `64 B` gap remains |
| Neutral Web component CSS | `69,883 B` gzip after L7 | `69,688 B` gzip | `65,536 B` | improved `-195 B`; documented `4,152 B` gap remains |
| Shared neutral runtime | `17,569 B` gzip | `17,569 B` gzip | `8,192 B` | existing documented gap; L9 delta `0 B` |
| L9 listeners/observers/timers/requests/assets | `0` | `0` | zero-runtime boundary | pass |

The global audit records 18 surfaces, 10 passes and eight documented gaps, with
zero undocumented gaps. L9 materially reduces CSS debt and adds no runtime.

## Risks And Open Decisions

1. Approve the first real Web and Shopify consumers, canonical resource source,
   selected action subset, localization, capability and result/fallback policy.
2. Revalidate and approve each commercial provider mapping, brand/icon rules,
   popup/new-context security, privacy and analytics at adapter implementation.
3. Decide whether target feedback remains action-local or a shared adjacent
   status composition; no neutral status slot is assumed yet.
4. Approve final Button variant/size, visible labels, icon treatment, action
   order/count, gap, inline/stacked response and page placement.
5. Register a separate Share Rail only if a real host requires fixed placement
   and can supply collision, safe-area, focus-obscuration, mobile and print
   evidence.
6. Supply L9-specific Figma/page-context references and explicit human review.
7. Aggregate Web CSS/runtime and several family ceilings remain program debt.

## Readiness Decision

`ready-for-human-review`. The neutral semantic, canonical composition,
accessibility, responsive, capability-omission, target boundary, adapter,
performance and exact Exhibit/Studio evidence gates are complete. Real target
consumers, current provider integrations, final visuals, Figma evidence and
explicit human approval remain open. The contract stays `pilot`; no `stable`
promotion was made.
