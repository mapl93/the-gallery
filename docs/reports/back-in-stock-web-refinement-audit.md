# Back In Stock Web Refinement Audit

Status: Human-review-ready; contract remains `pilot`

Date: 2026-07-20

Decision: D8-A / [ADR 0243](../decisions/0243-exact-variant-market-back-in-stock-provider-boundary.md)

Dossier: [Back In Stock Alert](../refinement/dossiers/back-in-stock.md)

## Outcome

Back In Stock is ready for human stability review as an exact
selected-variant/current-market notification-request profile over canonical
Input and Button. It now presents one coherent `requestState` instead of an
independently combinable pending boolean and feedback state.

The owner-approved lifecycle keeps field validation, provider registration and
availability delivery separate. Submitting locks editing through canonical
Input `readOnly` and canonical Button busy/disabled. Confirmed retains the form,
preserves the submitted email as focusable/readable and disables resubmission
with truthful adjacent status. Retryable error restores editing/submission and
uses adjacent alert semantics.

Shopify now has an implemented provider-app host boundary: Main Product accepts
`@app`, publishes selected variant and current market, re-renders the installed
app block and emits both identities after selection changes. No provider,
database or fake endpoint is fabricated by the theme.

Automated, browser, adapter and resource gates pass. Human visuals,
D8-specific Figma evidence and live installed-provider certification remain
pending. No `stable` promotion is made.

## Certification Summary

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose/limits | pass | Service-notification request only; no universal inventory/provider/delivery engine. |
| Anatomy/slots | pass | One root, heading, optional description, named native form, canonical Input/Button and conditional feedback. |
| State model | pass | Idle, submitting, confirmed and retryable error are mutually coherent. |
| Public API | pass | Five semantic properties; child and provider internals stay out of D8. |
| Canonical composition | pass | Input owns email/read-only/validation; Button owns submit/busy/disabled. |
| Controlled/uncontrolled | pass | Input is sole value owner; target drives one request-state projection. |
| Accessibility | pass | Native named form, label/message, constraints, preserved focus/context, status/alert timing and non-color state boundaries. |
| Responsive/content | pass | Eight viewports plus direct widths, RTL, effective 200 percent, text spacing and extreme content. |
| Exhibit/Studio parity | pass | Exact normalized DOM/style hashes from one renderer/fixture. |
| Shopify | app-host pass | `@app`, exact variant/market context, bounded replacement/event; installed provider proof still pending. |
| Performance | pass for D8/Product | D8 zero runtime; Product CSS `4,954 B` gzip under `5,324 B`. |
| Human review | pending | Final visuals, Figma artwork and live provider/store proof. |

## Accepted Implementation

- Contract `0.3.0` replaces `pending` with enum `requestState`:
  `idle | submitting | confirmed | retryableError`.
- Required form composition includes exact selected-variant/current-market
  target data without standardizing provider field names.
- Confirmed/retryable error require non-empty feedback; incomplete state
  requests resolve to idle.
- `BackInStockArtwork` is the only Exhibit/Studio renderer. It composes
  `InputArtwork`, canonical `.btn`, one native form and no provider runtime.
- The docs valid-submit fixture truthfully enters retryable error because no
  provider exists; it never says the customer joined a waitlist.
- Confirmed and retryable-error feedback use semantic token surfaces plus an
  inline border so color is not the sole cue.
- Main Product adds `data-current-market-id` beside its existing selected
  variant and continues to render installed `@app` blocks.
- Product coordinator copies market context from the Section Rendering response
  and adds `marketId` to `tg:product-variant-change` after bounded replacement.
- `docs/adapters/shopify-back-in-stock-app-block.md` defines the provider output,
  state, consent, replacement and live-certification boundary.

## State And Interaction Evidence

Final manifest:
`output/playwright/refinement-product/back-in-stock-0243/manifest.json`.

- Empty required email and type mismatch each block native submit and produce no
  provider status.
- Valid native FormData contains email, product fixture, exact variant and
  current market; one preview submit emits one truthful retryable error, retains
  the form and contains no fake success.
- Native reset restores the email and clears response state.
- D8 composes one canonical Input and introduces zero D8-owned field validation
  modifiers; Error, Success and Warning remain owned by Input certification.
- Submitting sets form/Button busy, makes email read-only, disables submit,
  preserves “Notify me” and produces zero repeat submit events.
- Confirmed retains one form, uses `role=status`, keeps email read-only but not
  disabled, and disables submit.
- Retryable error uses `role=alert`, restores email editing and enables submit.
- Tab reaches Button with a measured `2px solid` focus outline.
- Missing description omits cleanly; missing required heading fails closed.

## Shopify Host Evidence

A deterministic Section Rendering harness begins at variant `111`, market
`market-a` and an initial app-block marker. The returned section carries variant
`222`, market `market-b` and a replacement marker.

The existing product coordinator:

- replaces the one `data-product-render` region including the app block;
- updates root variant and market to the returned identities;
- emits `tg:product-variant-change` with variant `222`, market `market-b`,
  selected option IDs and product URL;
- updates the visible URL to `variant=222`; and
- writes one localized product update status.

This proves the theme's provider-host/context boundary. It does not certify an
uninstalled app's persistence, inventory observation or delivery.

## Responsive, Accessibility And Visual Evidence

Paired final captures cover Mobile `390x844`, Tablet `768x1024`, Desktop
`1440x1000` and XL `1920x1200` for Exhibit and Studio. Every root, stage and
document overflow measurement is zero.

Direct host widths prove:

- 200, 320 and 480px: one column and full-width action;
- 720px: `496.734px 125.266px` two-column form; and
- zero root/form overflow at every width.

Special evidence covers confirmed, retryable error, dark, forced colors, RTL,
effective 200 percent, user text spacing and extreme 200px content. Forced
colors preserves root, field/action focus and status boundaries. Reduced motion
reports `0s` transitions and no Button busy pseudo-element animation.

Measured light/dark text contrast remains at least `7.17:1` for supporting
content and `10.37:1` for the action. Confirmed/error status text uses primary
text on semantic surface tokens; visual inspection confirms distinct inline
boundaries and readable wrapping.

## Exhibit And Studio Parity

- Normalized DOM: Exhibit `31348d8a`, Studio `31348d8a`.
- Non-geometric style: Exhibit `1f3cd214`, Studio `1f3cd214`.
- Normalized markup length: `1,425` characters on both surfaces.
- Root geometry differs only `4px` (`516px` vs `520px`) from documentation shell
  framing; both select the same one-column container mode.

Both surfaces use the same renderer, fixture and canonical dependencies.

## CSS, Runtime And Budgets

Deterministic level-9 gzip measurements:

| Artifact | Raw | Gzip | Result |
| --- | ---: | ---: | --- |
| D8 CSS slice | `3,291 B` | `887 B` | Profile/state layout only. |
| Product family CSS | `30,194 B` | `4,954 B` | Pass; `370 B` under `5,324 B`. |
| Neutral component CSS | audit surface | `71,147 B` | Existing documented `5,611 B` program gap. |
| Shared neutral runtime | audit surface | `21,633 B` | Existing documented `13,441 B` program gap; D8 delta zero. |
| Shopify product coordinator | `7,357 B` | `2,129 B` | Existing target coordinator plus variant/market event context. |

D8 introduces no neutral listener, observer, request, timer, storage, formatter,
layout read, custom element or asset. No ceiling is raised.

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Implemented native form/CSS/state projection; provider transitions remain target-owned. |
| React docs target | Implemented shared renderer/fixture with exact Exhibit/Studio parity. |
| Shopify | Canonical class/state and Main Product app host are target-ready; installed provider/live proof pending. |
| Webflow / Framer | CSS projection ready; provider/context/runtime not certified. |
| React / Angular / Hydrogen | Translation documented; distributable provider integration not certified. |
| Figma | Planned; generic nodes are not D8 visual approval. |
| SwiftUI / Compose | Conceptual native translation only. |

Shopify adapter validation advances to `89` target-ready components and `59`
dedicated Liquid templates. D8 is an embedded class/app-host contract, so it
does not add a fake dedicated Liquid root.

## Validation

Passing gates include JSON parsing, TypeScript, JavaScript syntax, 183
contracts, 183 Studio definitions, docs/registry, refinement decisions,
Neutral Web adapter, Shopify adapter, Liquid section validation, browser
evidence and clean resource lifecycle. Theme Check has no Main Product finding.

The performance audit retains only documented program gaps; D8 and Product pass
their local budgets. `site/dist` was not rebuilt or modified.

## Remaining Risks

- Human approval of surface, measure, hierarchy, density, stacking and semantic
  feedback treatment.
- D8-specific owner/Figma artwork.
- Concrete provider selection and operational certification per target/market.
- Live Shopify provider installation, add/remove/reorder/localization, exact
  payload, repeated Section Rendering and storefront proof.
- Existing neutral CSS/runtime distribution gaps before v1 packaging.

## Readiness Decision

Back In Stock is `human-review-ready`. D8-A identity, availability, consent,
coherent request presentation, canonical composition, accessibility,
responsive behavior, parity and Shopify app-host translation are reconciled.
Human visual and live-provider review remain pending; the contract stays
`pilot` and no `stable` promotion is authorized.
