# Cart Empty Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-17

ADR 0236 update (2026-07-20): the host-owned heading decision is accepted and
Shopify main cart now supplies H1 through the canonical snippet. Historical
fixed-H3/open-heading wording below is superseded; live Ajax/drawer transition
evidence and human visual review remain pending.

## Outcome

Cart Empty is now the cart-specific profile of canonical Empty State instead of
a second empty-state implementation. Its semantic API remains optional
decorative icon, required non-empty title, optional message, and one optional
coherent `actionLabel`/`href` navigation pair. The action is a native Link with
canonical Button presentation and renders only when both values exist.

K7 owns no visual token, child-class API, widget/live semantics, cart state,
focus policy, announcement surface, fallback URL or runtime. The target owns
authoritative cart truth, atomic replacement of stale lines/totals/checkout UI,
copy, destination, dynamic Status output, focus, history and analytics. No
visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Resolved empty-cart replacement only; not a cart store, mutation, loader/error, recommendation, notification, focus manager or analytics owner. |
| Anatomy and composition | pass | `div.empty-state.cart-empty`, canonical icon/title/message and one native `a.btn[href]`; all parallel `.cart-empty__*` parts removed. |
| Variants, sizes and states | pass | One canonical profile and target-controlled resolved-empty state; no K7 visual variant, size, loading, error or non-empty state. |
| Public API and ownership | pass | `icon`, required `title`, optional `message`, and coherent optional `actionLabel`/`href`; one-sided pairs and blank title omit invalid output. |
| Tokens and hardcoded values | pass | Zero K7 public visual tokens; duplicated raw spacing/sizing/type declarations deleted; Empty State and Button own every visible decision. |
| Accessibility and motion | pass | Passive root, contextual H2 fixture, decorative hidden icon, native Link, visible focus, no local live region/focus trap/custom keyboard/motion. |
| Responsive/content resilience | pass | Exact parity at four viewports plus 200px RTL/unbroken, title-only, dark, forced colors, reduced motion, focus and effective 200% layout. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no listener, observer, request, timer, state machine, animation or K7 asset. Lucide remains docs-only fixture input. |
| Cross-target translation | pass | Neutral Web implemented; Shopify dedicated snippet implemented through canonical Empty State; framework/native/Figma ownership documented. |
| Documentation and verification | pass | Dossier, ADR 0179, contract, registry, renderers, CSS, Studio, MDX, Liquid, adapters, evidence and reports agree. |

## Contract And Browser Evidence

- Contract `0.2.0` declares Empty State and Button dependencies, six anatomy
  parts, one resolved state, six behavior boundaries, five semantic properties
  and zero K7 visual tokens.
- Both modes serialize an exact `1,009`-character subtree at every viewport. It
  is a passive `DIV.empty-state.cart-empty` with no `role`, `aria-live` or
  `tabindex`, one contextual H2, a canonical decorative icon wrapper with
  `aria-hidden=true`, one paragraph and one native `a.btn[href]`. No
  `.cart-empty__*` class remains.
- Blank title yields zero root and no empty heading. Title-only yields one H2,
  one child, zero optional parts and zero focusables. Label without href and
  href without label each yield zero action Links.
- Keyboard focus exposes a solid `2px` outline with `2px` offset. Enter reaches
  the docs target handler, leaves focus on the Link and does not mutate K7.
- Client/scroll widths are `326/326px` in both Mobile modes, `520/520px` at
  Tablet, `516/516px` Exhibit and `520/520px` Studio at Desktop, and `520/520px`
  at XL. Every document client/scroll pair is equal.
- A real 200px parent yields a `200/200px` root, `40px` canonical inline
  padding and `120/120px` title/message plus `118/118px` action in both long RTL
  and unbroken probes. Extreme wrapping is contained without a viewport rule.
- Light contrast measures `17.93:1` title, `7.81:1` message and `10.37:1`
  Button. Dark measures `17.18:1`, `12.09:1` and `16.96:1`.
- Forced colors resolves content to system foreground and the action to system
  Link color with a visible `2px` outline. Reduced motion reports no K7/icon/
  Button animation and a `0s` Button transition.
- An 800 CSS-pixel layout, equivalent to 200 percent on a 1600px viewport, keeps
  the document `800/800px`, root `520/520px`, and all text/action parts locally
  contained.
- Sixteen final images are stored in
  `output/playwright/refinement-batch-88/`. The only console error is the
  existing docs-shell `/favicon.ico` 404; no K7 runtime/component error appears.
- Both browser phases used one headless `gallery-refinement` session, one tab
  and one managed 4173 server at a time. Cleanup confirms all are closed.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Canonical Empty State tree plus `.cart-empty` and one native Button-styled recovery Link. | Implemented and evidenced; transition/status/focus remain target-owned. |
| Shopify | Dedicated `cart-empty` snippet delegates to `empty-state`; main cart selects contextual H1 with `cart.empty?`, locale strings and `routes.all_products_collection_url`. | Implemented/ready in adapter inventory; live Ajax/drawer proof remains an explicit target gap. |
| Webflow / Framer | Copied canonical classes/profile with target content and destination. | Generated Cart CSS is byte-identical; behavior remains target content/navigation. |
| React / Angular / Hydrogen | Parent-controlled cart store selects canonical Empty State and owns transition effects. | Contract-ready; no neutral framework/store dependency or duplicate local state. |
| Figma | Cart-context instance/profile of canonical Empty State with slot presence and sample copy. | Planned; generic registered nodes are traceability only, not K7 visual approval. |
| SwiftUI / Compose | Native content-unavailable composition with one navigation action and parent cart coordinator. | Conceptual; announcements/focus remain native target responsibilities. |

Shopify's current Liquid cart, routes and translation APIs provide target facts
without changing The Gallery's neutral contract. The dedicated K7 snippet adds
translation only and consumes canonical Empty State markup.

## Performance And Risks

- K7 CSS falls from `596 B` raw / `321 B` gzip to `75 B` raw / `89 B` gzip,
  recovering `232 B` gzip from the duplicated component slice.
- Complete Cart CSS falls from `16,114 B` raw / `3,072 B` gzip to `15,593 B`
  raw / `3,007 B` gzip. It now has `65 B` headroom beneath its permanent
  `3,072 B` family ceiling.
- Complete Web component CSS falls from `506,793 B` raw / `67,914 B` gzip to
  `506,272 B` raw / `67,861 B` gzip, a `-53 B` batch delta against the existing
  program gap.
- Shared runtime remains `53,811 B` raw / `10,501 B` gzip, so K7 adds `0 B`.
- Canonical, Webflow and Shopify Cart CSS are byte-identical. Cart SHA-256 is
  `ec6fe1f7732aa4c939a3a669f06ec8fa0669652ccbec901cce06a47a69a43f6a`;
  K7 slice SHA-256 is
  `d18a2d170156e78a5795a6a701dc279f20bb86d462985909f9d0ef8c985d4773`.
- Shopify raises the target-ready count from 77 to 78 with no K7 script.
- Human review must approve the subdued 64px package icon, centered hierarchy,
  vertical rhythm, 40ch message measure, primary Button emphasis, title-only
  whitespace and 200px localized wrapping.
- A13's contextual heading-rank choice remains inherited. Shopify's current H3
  cannot be certified across page/drawer contexts until that architecture choice
  is accepted.
- Live Ajax/drawer final-removal replacement, localized Status text and exact
  focus recovery require target integration evidence. Product owners choose
  final copy/destination and whether recommendations accompany the state.

## Validation

Contract, Studio, registry/docs, TypeScript, static previews, Web/component
token compatibility, Neutral Web adapter, Shopify adapter, Shopify Liquid skill
search/validation, generated CSS identity, four-viewport/special-mode browser
inspection, exact shared-renderer parity, invalid composition, keyboard/focus,
deterministic performance, structural/certification/refinement audits, diff
checks, `site/dist` cleanliness and owned-resource cleanup are included in
Batch 88.
