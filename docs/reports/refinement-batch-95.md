# Refinement Batch 95 — Account Dashboard

Status: Refined; Shopify account architecture and human visual review required;
remains `pilot`

Date: 2026-07-17

Component: Account Dashboard (`U3`, dependency order `108`)

## Outcome

Batch 95 replaces U3's unlabelled div grid and duplicated account-card visuals
with one labelled passive navigation shell composed from native list semantics
and canonical Card, Link, and optional Button. The fixture exposes working demo
feedback outside U3 without turning account data, navigation, or sign-out into
neutral runtime or public state.

Exhibit and Studio use the same `AccountDashboardArtwork`, fixture, canonical
markup, and three-property API. Shopify stays intentionally planned until the
owner chooses a managed account-sheet/hosted-page, customer-account extension,
headless Customer Account API, deprecated-account compatibility, or omitted
profile.

## Delivered

- Permanent U3 dossier, detailed audit, ADR 0186, Shopify adapter boundary, and
  explicit account-architecture question.
- Contract `0.2.0`, corrected Card/Link/Button dependency graph, Studio metadata,
  MDX, Account CSS, registry, and generated adapter reconciliation.
- Required labelled section, native destination list, complete canonical
  Card body/footer and explicit Link per item, optional semantic actions,
  decorative icons, strict required-content omission, and no grid widget roles.
- Three stable semantic properties, sixteen U3 tokens, named container response,
  private one/two/three tracks, and zero U3 runtime.
- Mobile/Tablet/Desktop/XL per mode plus three-track, optional-action omission,
  blank-title omission, activation feedback, keyboard focus, localized
  RTL/200px, effective 200 percent, light/dark, forced colors, and reduced motion
  evidence.
- Regenerated Neutral Web, Webflow, and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate; the static audit covers 250 previews with zero errors.
- Exhibit and Studio serialize exact identical U3 DOM. At an equal `520px`
  component width, their computed-style signatures are identical; their default
  page widths intentionally select different container tracks where applicable.
- Section/list/list-item/headings/Links, four focus stops, Button and Link demo
  activation, external Status ownership, optional-action omission, disabled
  required Cards control, blank-greeting omission, and zero grid roles pass.
- Four viewports, direct `720px` three-track mode, localized RTL/unbroken content
  at `200px`, effective 200 percent, contrast, forced colors, reduced motion,
  and zero U3/document overflow pass.
- Shopify official validation passes. U3 remains `css-ready`, `ready:false`, and
  the global target-ready count remains 79 because account architecture is
  deliberately unresolved.
- Browser evidence used one headless session, one tab, and one managed server;
  final cleanup closed both and left port 4173 free.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| U3 CSS slice | `626 B` | `754 B` | component observation | `+128 B`; semantic/list/container layout with dependency visual duplication removed |
| Account CSS | `2,883 B` | `2,999 B` | `3,072 B` | pass; `73 B` headroom |
| Neutral Web component CSS | `68,187 B` | `68,372 B` | `65,536 B` | existing program gap `2,836 B`; batch delta `+185 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; U3 delta `0 B` |
| Shopify U3 runtime | `0 B` added | `0 B` added | target observation | no architecture-dependent no-op behavior added |

Account CSS SHA-256 is
`a6fd057c9cd82e2746e0221328adea3b97315b753585485204cbcb2550dd9897`;
the U3 slice SHA-256 is
`a821d5ea347a08a00c73cc4ae3abc1b7887ab464a0ac736bee54d009e5f6b34b`.

## Risks And Open Questions

- Owner input is required on Shopify managed accounts versus an extension,
  headless Customer Account API, explicit deprecated-account compatibility, or
  target omission.
- Human review must approve page inset, greeting hierarchy, alignment, Card
  density/elevation, track thresholds, icon treatment, content rhythm, fixture
  copy, explicit versus whole-card Link policy, and corrected U3-specific Figma
  artwork.
- Targets must own authentication/authorization, destination records and
  availability, routes, loading/error/expired/no-destination states, sign-out,
  focus/feedback, privacy, telemetry, analytics, support, and deletion paths.
- Account CSS now has `73 B` gzip headroom; later account components need active
  duplicate-rule reclamation or an explicit family-budget decision.

## Readiness Decision

`refined-decision-needed`. Safe neutral semantic, canonical, responsive, and
evidence work is complete, but the selected Shopify account architecture and
human visual/product decisions determine cross-target completion. U3 is not
human-review-ready across targets or Shopify target-ready until those decisions
are made and the selected target is implemented and evidenced. It remains
`pilot`; no automatic `stable` promotion was made.
