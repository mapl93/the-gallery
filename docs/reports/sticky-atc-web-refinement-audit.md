# Sticky Add-to-Cart Bar Web Refinement Audit

Status: Human-review-ready; contract remains `pilot`

Date: 2026-07-21

## Outcome

Sticky Add-to-Cart Bar is now a passive viewport-edge composition of canonical
Price, Button, and Product Form semantics. Its Button is a native external
submitter for one existing Product Form; K9 no longer duplicates Price text,
creates a second form/cart path, infers an Added state, or announces a result it
does not own.

The public surface is limited to semantic visibility, optional image and alt,
required title, optional canonical Price, required action label and Product Form
reference, unavailable, and pending. Blank required values omit the invalid
root. Visibility trigger, product selection, Price/availability, purchase
lifecycle, feedback, safe areas, scroll padding, stacking, and collisions remain
target responsibilities.

Owner-selected K9-A and ADR 0256 now fix the semantic boundary: the target may
expose K9 only after the primary Product Form action is no longer usefully
visible and coherent product eligibility exists; one target coordinator owns
observation, product and purchase state; and every fixed target mapping must
account for safe areas, reserve block-end content or scroll space, and avoid
covering focus. Exact target mechanics and final visuals remain implementation
proof or human review rather than unresolved neutral architecture.

The existing implementation and nine-property surface already satisfy that
decision without source markup, CSS, Studio, Shopify Liquid, public token, or
runtime changes. Contract `0.3.0` is therefore ready for explicit human review
while remaining `pilot`; no stability promotion was made.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Secondary purchase surface only; not a Product Form, variant resolver, cart client, status region, navigation landmark, or overlay manager. |
| Anatomy and composition | pass | Seven K9 parts plus an external canonical Product Form reference; one canonical Price slot and one canonical Button submitter. |
| Variants, sizes, and states | pass | Hidden/visible, available/unavailable, idle/pending, optional image/Price, and intrinsic narrow wrapping are defined; target observation mechanics and final visuals remain outside the neutral API. |
| Public API and ownership | pass | Nine semantic properties; strict required strings/form reference; target owns controlled lifecycle and all commerce coordination. |
| Tokens and hardcoded values | pass | Zero K9 public visual tokens; geometry and the `28rem` named-container threshold remain private. |
| Accessibility and motion | pass in docs target | Neutral root, native form ownership, hidden `inert` plus `aria-hidden`, visible focus, forced colors, reduced motion, and no internal live region passed. |
| Responsive/content resilience | pass | Exact shared renderer at four viewports, 200px container, long Arabic RTL, and effective 200 percent without horizontal overflow or content loss. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no K9 listener, observer, timer, request, or neutral asset. |
| Cross-target translation | partial by design | Neutral Web and target-native Liquid composition exist; Shopify honestly remains `needs-target-work`. |
| Documentation and verification | pass | Dossier, ADRs 0181/0256, contract, registry, shared renderer, CSS, Studio, MDX, Liquid, adapters, evidence, and reports agree. |

## Contract And Browser Evidence

- Contract `0.3.0` declares Button, Price, and Product Form dependencies, seven
  anatomy parts, four states, six behaviors, nine semantic properties, and zero
  K9 public visual tokens.
- Exhibit and Studio serialize the same `810`-character K9 subtree. It contains
  one root, one canonical Price, one canonical Button, and no form inside K9.
- The Button is `type=submit`, its `form` owner resolves to
  `sticky-product-form-preview`, and its activated `name=intent`/`value=add`
  entry reaches that form. The docs target prevents navigation and renders one
  external localized Status after submission; the Status is not inside K9.
- Unavailable produces `disabled` without busy. Pending preserves “Add to cart”
  and produces `disabled` plus `aria-busy=true`. Hidden produces
  `aria-hidden=true`, `inert`, `visibility:hidden`, and `pointer-events:none`.
- Blank title or Product Form reference yields zero K9 roots. Image and Price
  each omit independently without invalid wrappers.
- Studio root widths resolve to `326px` at Mobile, `672px` at Tablet, `628px` at
  Desktop, and `688px` at XL. Mobile uses one row group plus a full-width action
  and omits optional media; the other reviewed containers use one horizontal
  composition. No root or stage overflows.
- A `200px` preview leaves a `168px` K9 root with `120px` content: image omits,
  title and Price wrap into intact rows, the action remains full width, and root
  and stage report no horizontal overflow.
- Long Arabic RTL content remains in logical source order, wraps to two title
  lines, preserves Price and the full-width action, and has no overflow.
  Effective 200 percent also has no root or stage overflow.
- Light contrast measures `17.93:1` for title and `10.37:1` for Button. Dark
  measures `17.18:1` and `17.93:1`. Keyboard focus exposes a solid `2px` outline
  with `2px` offset. Forced colors preserves a solid outline. Reduced motion
  reports `0s` and `transition-property:none`.
- Nineteen final images are stored in
  `output/playwright/refinement-batch-90/`: Exhibit and Studio at Mobile,
  Tablet, Desktop, and XL plus submitted, unavailable, pending, hidden,
  focus-visible, dark, forced colors, reduced motion, RTL, 200px, and effective
  200 percent.
- Final console inspection reports zero errors. Evidence used one headless
  `gallery-refinement` browser, one tab, and one managed server on port 4173;
  all are closed and the resource gate passes.
- Batch 140 refreshes the accepted K9-A boundary with eight paired natural
  captures plus submitted, hidden, unavailable, pending, keyboard focus,
  forced-colors, reduced-motion and long-RTL states under
  `output/playwright/refinement-batch-140/`. All eight natural compositions
  contain one canonical Price and Button, no nested Form, and an external
  submitter whose owner resolves to `sticky-product-form-preview`.
- The refreshed native submission carries merchandise, quantity and the
  activated `intent=add` submitter through one FormData set. Target-owned
  feedback remains outside K9. Hidden output is inert, `aria-hidden`, and
  unfocusable; unavailable is disabled without busy; pending preserves the
  label and carries disabled plus `aria-busy=true`.
- The refreshed Exhibit/Studio default trees normalize to the same `593`
  characters and `121e6e78` hash. Long RTL wraps to two lines without root,
  part, stage or document overflow. Keyboard and forced-colors focus expose a
  solid `2px` outline, and reduced motion resolves to `0s` / `none`.
- The successful refresh used one isolated headless context and one page and
  reports zero assertion, console or page failures. One sandboxed launch exited
  before browser creation; two inspector diagnostics closed Chromium in
  `finally`. Final repository cleanup confirms the server stopped, URL
  unresponsive, port `4173` free and stable session closed.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Fixed neutral root, canonical Price, and external canonical Button associated to one native Product Form. | CSS/contract implemented; visibility/coordinator/collision lifecycle stays target-owned. |
| Shopify | Product-context Liquid snippet composes canonical Price/Button and binds the action to the existing product form id. | Officially validated, but overall `template-detected`, `ready:false`; live coordination and lifecycle remain target work. |
| Webflow / Framer | Copied canonical CSS plus target form/action reference and visibility/collision controller. | CSS projection is byte-identical for Webflow; behavior is not certified by this batch. |
| React / Angular / Hydrogen | Controlled surface projected from one parent product coordinator; external native submitter or framework form action. | Contract-ready; no framework dependency in base source. |
| Figma | Fixed purchase profile composed from canonical Price and Button instances. | Planned; registered generic Button shells are traceability, not K9 artwork or visual approval. |
| SwiftUI / Compose | Safe-area-aware inset purchase surface tied to the platform purchase boundary. | Conceptual; form id maps to native action ownership, not literal DOM. |

The Shopify Liquid workflow searched current product-form guidance before
implementation and validated `sticky-atc.liquid` as artifact
`k9-sticky-atc-shopify-4e7c2a91`, revision 1. Batch 140 reran the official
workflow as artifact `k9-sticky-atc-batch140`, revision 1; the file passed using
the cached official schema after the live schema host failed DNS lookup. The
current adapter inventory detects 59 dedicated Liquid templates and 90
target-ready components. K9 honestly remains non-ready pending live Main
Product integration.

## Performance And Risks

Current Batch 140 measurement keeps the K9 slice unchanged at `1,791 B` raw /
`716 B` gzip with SHA-256
`5c7bb7fa9fb6bfd54e7536978b2a89718637c89d56cad86b28b5558c5fa61c58`.
Current Cart CSS is `17,085 B` raw and `3,057 / 3,072 B` under the permanent
audit, leaving `15 B` headroom; canonical, Webflow and Shopify copies are
byte-identical with SHA-256
`c2a93f2603708a33d43d16da7168f6fa6215b0f9ba95c0b7b60c518c7fcaff51`.
The current neutral component CSS and shared runtime program gaps remain
`71,891 / 65,536 B` and `22,807 / 8,192 B`; K9 adds no neutral runtime and this
decision-only reconciliation changes neither surface. The audit reports 18
surfaces, 10 passing, 8 documented gaps and zero undocumented gaps.

- K9 CSS changes from `1,201 B` raw / `511 B` gzip to `1,791 B` raw /
  `716 B` gzip, a `+205 B` gzip component delta for hidden exclusion, intrinsic
  composition, full semantic content, and container response.
- Complete Cart CSS changes from `15,408 B` raw / `3,030 B` gzip to
  `15,952 B` raw / `3,064 B` gzip. It passes the permanent `3,072 B` ceiling
  with `8 B` headroom.
- Complete Web component CSS changes from `506,087 B` raw / `67,930 B` gzip to
  `506,631 B` raw / `67,996 B` gzip. The existing program gap is `2,460 B`
  above the `65,536 B` ceiling; K9's deterministic compression delta is `+66 B`
  and does not create a new exception.
- Shared neutral runtime remains `53,811 B` raw / `10,501 B` gzip, so K9 adds
  `0 B`. The existing runtime program gap remains separate.
- Canonical, Webflow, and Shopify Cart CSS are byte-identical. Cart SHA-256 is
  `0101698f61e1d2485cbb0c325fbfb9e66e12706aae7009d5f24ead1781860aef`;
  K9 slice SHA-256 is
  `5c7bb7fa9fb6bfd54e7536978b2a89718637c89d56cad86b28b5558c5fa61c58`.
- ADR 0256 fixes one target product coordinator, semantic eligibility and the
  safe fixed-surface obligation without standardizing target observation,
  purchase, virtual-keyboard, or collision mechanics. Final visual treatment
  remains explicit human review.
- Shopify must still prove selected option/variant and quantity synchronization,
  formatted Price/availability, pending/error/success, cart count/drawer
  refresh, localized Status, focus, editor preview, safe areas, and live-store
  invocation.

## Validation

Registry/docs, all 183 contracts and Studio definitions, TypeScript, static
previews, Web/component token compatibility, Neutral Web adapter, Shopify
adapter, official Shopify Liquid validation, generated CSS identity,
four-viewport/special-mode browser inspection, exact shared-renderer parity,
native external submission, invalid/optional composition, focus, contrast,
deterministic performance, structural/certification/refinement audits, diff
checks, `site/dist` cleanliness, and owned-resource cleanup are included in
Batch 90. Batch 140 reconciles the accepted owner decision, refreshes the
relevant source and browser checks, and records current program budgets without
claiming target production readiness. The external Vite build transforms 2,508
modules into `/tmp`; `site/dist` remains unchanged.
