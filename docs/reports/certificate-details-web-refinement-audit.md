# Certificate Details Web Refinement Audit

> Historical migration evidence only. ADR 0245 removes this duplicate profile;
> current implementation and certification ownership belongs to Certificate.

Status: `refined-decision-needed`

Date: 2026-07-18

Component: `R11` / `certificate-details`

Contract: `0.3.0` / `pilot`

ADR: [0211 Certificate Details As A Canonical Certificate Profile](../decisions/0211-certificate-details-as-canonical-certificate-profile.md)

Dossier: [Certificate Details](../refinement/dossiers/certificate-details.md)

## Outcome

Certificate Details is technically refined as a Ceramics-context profile of
canonical `Certificate`, not as a second certificate implementation. Registry,
contract and documentation now declare `certificate` as the direct dependency.
F3 and R11 consume the same extracted `CertificateArtwork`; R11 supplies only
its contextual fixture and `.certificate-details` hook.

The duplicate card, decorative check seal, QR-only region, R11 child classes,
component-specific CSS and Studio layout overrides are removed. R11 now exposes
only required `title`, required non-empty `details` and optional complete
`verification`. Verification is an ordinary descriptive link with a real
target-owned destination; optional media is redundant and does not become
proof, status or an authenticity guarantee.

Automated structure, browser behavior, accessibility, responsive containment,
cross-target projections and performance pass. R11 is not `stable` and is not
ready for stability review: the owner must first decide whether this separate
Ceramics registry identity remains useful or should be consolidated into F3,
and must define target record/verification boundaries before target-native
integration.

## Certification Summary

| Gate | Result | Evidence |
| --- | --- | --- |
| Identity and ownership | pass with architecture decision pending | R11 remains a registry profile; canonical Certificate owns all visible implementation. |
| Anatomy and omission | pass | Named article, visible title, native details, optional divider and complete verification composition; invalid required content omits the root. |
| Public API | pass | Three semantic properties; no icon, QR-only, proof, status, visual or runtime API. |
| Semantics and accessibility | pass | Native `ARTICLE`, `H2`, `DL`/`DIV`/`DT`/`DD` and optional `A`; no custom roles, live regions or synthetic controls. |
| State and behavior | pass | Required-content omission, optional verification omission, text-only media failure and native keyboard focus verified. |
| Responsive/content resilience | pass | Eight natural captures, four direct component widths, RTL, long/unbroken content, effective 200% text and user spacing. |
| Exhibit/Studio parity | pass | Shared renderer/fixture and identical normalized DOM/internal-style hashes. |
| Tokens and presentation | pass | Zero R11 public tokens and zero component-specific visible declarations; canonical Certificate owns presentation. |
| Runtime/performance | pass | Zero R11 JavaScript; duplicate CSS removed; Ceramics remains below its permanent ceiling. |
| Targets | Web implemented; others bounded | Web, Webflow and Shopify CSS copies align; target records and native integrations remain explicit gaps. |
| Human review | required after owner decision | Registry identity, contextual fit, record authority, verification service, Shopify, Figma and final visual approval remain open. |

## Baseline Findings

The baseline represented the same job twice:

- F3 `Certificate` already rendered a heading-labelled archival article, native
  description-list details and an optional target-owned descriptive
  verification link under ADR 0125.
- R11 rendered a separate `section.certificate-details` with another border,
  heading, field grid, decorative check seal and QR-only region.
- `aria-labelledby` remained on the section when the optional title was
  disabled, producing a dangling relationship and unnamed region.
- Studio could disable contract-required details. With every optional part off,
  the renderer could emit an empty bordered surface.
- The QR fixture was a standalone named `role="img"` without a destination or
  useful action. Its appearance and the check seal visually suggested trust
  that the component did not establish.
- Viewport CSS and Studio container CSS independently controlled the same
  response, while physical geometry and hardcoded values duplicated canonical
  Certificate composition.
- R11 had no state store, network request or neutral script, so the duplication
  did not justify a separate interaction model.

The four preserved baseline captures show the large outlined R11 card, orange
check seal and oversized QR-like fixture in Exhibit and Studio at mobile and
desktop widths. They did not prove omitted/invalid states, native verification,
localized content, direct containers, special colors, reduced motion or exact
parity.

## Research And Direction

The research dossier found no interoperable Certificate Details widget or ARIA
interaction pattern:

- [WHATWG description lists](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element)
  support native name-value groups and direct `div` grouping.
- [WCAG link purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)
  requires a determinable purpose; QR appearance alone does not supply one.
- [WAI functional-image guidance](https://www.w3.org/WAI/tutorials/images/functional/)
  supports hiding redundant media when adjacent link text already states the
  complete function.
- [W3C Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model/)
  separates credential claims, issuer, proof and verifier policy from visual
  presentation.
- [Open UI](https://open-ui.org/research/component-matrix/),
  [Radix](https://www.radix-ui.com/primitives/docs/overview/introduction) and
  [Polaris web components](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components)
  provide no basis for a second certificate widget, custom role or controlled
  keyboard abstraction.
- [Shopify metafield/metaobject modelling](https://shopify.dev/docs/apps/build/metaobjects/data-modeling-with-metafields-and-metaobjects)
  requires an explicit merchant data definition rather than inference from a
  presentational component.

The convergent direction is therefore native document semantics plus an
ordinary link, using Gallery's already accepted canonical Certificate. The
research does not decide whether R11 deserves a separate catalog identity;
ADR 0211 preserves it as a migration-safe profile while leaving consolidation
open.

## Canonical Composition

`site/src/components/studio/CertificateArtwork.tsx` now owns the shared docs
renderer and fixture types. It is consumed by both Storytelling F3 and Ceramics
R11:

- `buildCertificateFixture()` preserves the F3 certificate example.
- `buildCertificateDetailsFixture()` supplies R11's Ceramics-context record.
- the renderer trims strings and removes incomplete detail pairs;
- a blank title, blank title id or zero complete details returns no root;
- the article is named by its visible contextual `H2`;
- the divider is decorative and hidden from assistive technology;
- signature remains an F3-owned optional canonical part and is not added to the
  R11 API;
- verification renders only when both destination and descriptive text exist;
- optional fixture media remains inside the link and is `aria-hidden` because
  the visible text carries the complete purpose.

Ceramics Studio renders the same canonical artwork with
`className="certificate-details"`. The required details switch is visible but
disabled, preventing Studio presentation metadata from creating an invalid
component state. The optional verification switch omits both link and media
cleanly.

## Anatomy And API

| Part | Requirement | Semantic owner |
| --- | --- | --- |
| `.coa.certificate-details` | required | R11 context plus canonical Certificate article |
| `.coa__title` | required | target content and canonical heading semantics |
| `.coa__divider` | optional/decorative | canonical Certificate |
| `.coa__details` | required/non-empty | target record and canonical native `dl` |
| `.coa__detail` | one or more | canonical direct detail group |
| `.coa__detail-label` | paired | target label in native `dt` |
| `.coa__detail-value` | paired | target value in native `dd` |
| `.coa__verification` | optional/complete | target destination and canonical native link |
| `.coa__qr` | optional/redundant | target media inside the link |
| `.coa__verify` | required with verification | target descriptive visible text |

Public properties:

- `title`: required non-empty contextual title and article-name source.
- `details`: required non-empty ordered collection of complete target-owned
  name-value pairs.
- `verification`: optional complete canonical link composition with a real
  destination, descriptive text and optional redundant media.

R11 intentionally does not expose `icon`, `qr`, `verified`, `authentic`,
`status`, `issuer`, `certificateId`, `verificationUrl`, `proof`, `signature`,
`columns`, `align`, border toggles, density, print/download actions or scan/
verify events. Record fields remain target-owned details until a record model is
approved. The component is passive; controlled/uncontrolled strategy is not
applicable.

## State And Mode Verification

| State or mode | Result |
| --- | --- |
| Default | Required named article, four complete detail pairs and one descriptive verification link. |
| Blank title | Complete R11 root omitted. |
| Required details | Studio control remains checked and disabled; renderer rejects an empty normalized collection. |
| Verification omitted | Link and media omitted; root and four required details remain. |
| Verification media missing | Descriptive link text and destination remain complete. |
| Keyboard focus | Native link receives focus and exposes a solid `2px` outline with `3px` offset. |
| Narrow `180/240/360px` | One intrinsic detail track; zero root or descendant overflow. |
| Wide `480px` | Two intrinsic detail tracks; zero root or descendant overflow. |
| RTL/localized | Arabic source content resolves RTL and remains contained. |
| Extreme/unbroken | `180px` root grows vertically without horizontal component overflow. |
| Effective 200% text | Component and descendants remain internally bounded. |
| User text spacing | Component and descendants remain bounded. |
| Dark | All tested text remains above `4.5:1`. |
| Forced colors | System border and focused-link outline remain visible. |
| Reduced motion | Zero active animation or transition parts. |

## Accessibility Results

The final accessibility tree exposes one article named “Altered Rim Bowl”, the
four term/definition pairs and the link “View certificate record MG-2026-014”.
There is no custom root role, `aria-label`, root tab stop, live region, script or
obsolete `certificate-details__*` descendant.

The visible heading id exists and matches `aria-labelledby`. Every direct detail
group is a `DIV` containing a complete native `DT` and `DD`. The verification
destination is `#certificate-record-mg-2026-014`; its media is hidden from the
link name and has no synthetic image role.

Measured contrast ratios:

| Part | Light | Dark |
| --- | ---: | ---: |
| Title | `16.12:1` | `9.92:1` |
| Detail label | `7.02:1` | `6.99:1` |
| Detail value | `16.12:1` | `9.92:1` |
| Verification text | `7.02:1` | `6.99:1` |

## Exhibit And Studio Parity

The evidence session used one headless Chromium session named
`gallery-refinement`, one page and the fixed Gallery server at
`127.0.0.1:4173`. Exhibit and Studio each produced natural mobile, tablet,
desktop and XL captures.

For exact parity, both surrounding containing blocks and roots were normalized
to `360px`; this is necessary because canonical Certificate intentionally uses
percentage padding relative to its available containing block. Under the same
component context:

- normalized DOM hash: Exhibit `25088848`, Studio `25088848`;
- internal computed-style hash: Exhibit `4fc1bacc`, Studio `4fc1bacc`.

Natural frame widths differ because Studio reserves inspector space, but every
capture uses the same renderer, fixture and canonical implementation and has
zero component, descendant and document overflow. Console and page-error lists
are empty.

Evidence lives under `output/playwright/refinement-batch-120/`:

- four preserved before captures;
- eight natural after captures;
- dark, forced-colors, RTL, extreme, text-only verification, effective-200%
  and user-spacing captures;
- executable `final-evidence.js`;
- `evidence-summary.json` with zero failures.

The browser and managed server were closed immediately after capture;
`npm run evidence:assert-clean` passed with port `4173` free.

## CSS, Tokens And Performance

R11 exposes no visual token. Consumers customize canonical Certificate through
that dependency. `.certificate-details` remains only in shared Ceramics
box-sizing, minimum-width and media-containment selectors; it has no dedicated
declaration block, breakpoint, public variable or Studio style override.

| Asset | Before R11 | After R11 | Delta / budget |
| --- | ---: | ---: | --- |
| Dedicated R11 CSS | `1,326 B` raw / `555 B` gzip | `0 B` | duplicate implementation removed |
| Ceramics CSS | `35,099 B` raw / `5,085 B` gzip | `33,749 B` raw / `4,837 B` gzip | `-1,350 B` raw / `-248 B` gzip; `590 B` headroom under `5,427 B` |
| Neutral Web component CSS | `524,931 B` raw / `70,078 B` gzip | `523,581 B` raw / `69,847 B` gzip | `-1,350 B` raw / `-231 B` gzip |
| Shared runtime | `53,811 B` raw / `10,501 B` gzip | unchanged | zero R11 JavaScript |

Final hashes:

- Ceramics source/Webflow/Shopify CSS:
  `9046e586102576288acc6facf7f591522c924fb537a2ff2f8f98d4f4bc5a4300`;
- neutral Web component CSS:
  `545d7a3906ca13c9d3f3acbb476815dd18dd512adfda5bdb7df83a5018c53c26`;
- shared runtime:
  `1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a`.

R11 adds no listener, observer, timer, request, formatter, state store, QR
generator, layout read, animation or asset.

## Cross-Target Boundary

| Target | Mapping | Current status |
| --- | --- | --- |
| Neutral Web | `.certificate-details` profile on canonical `.coa` article/details/link. | Implemented and validated. |
| Shopify | Approved certificate metafield/metaobject or app record may map into canonical Certificate composition. | Planned; record schema, authority and verification integration are open. |
| React / Angular | Thin target profile around canonical Certificate with target-owned details and optional native link. | Planned; no local state required. |
| Figma | Instance/profile of canonical Certificate with Ceramics fixture content and omitted/text/media verification states. | Planned; current Studio node is not component-specific evidence. |
| SwiftUI / Compose | Target-native record presentation reusing the platform Certificate composition. | Conceptual; no proof protocol implied. |

No Shopify Liquid record, metafield namespace, metaobject definition, issuer,
verification endpoint or QR service was invented. Generated Web, Webflow and
Shopify Ceramics CSS is source-identical.

## Automated Validation

The final source passes:

- `npm run validate:contracts` (`183` contracts);
- `npm run validate:studio` (`183` definitions, `900` semantic properties,
  `1,606` public token references and `30` icon choices);
- `npm run validate:docs` (`183` registry entries and `183` MDX pages; only the
  existing unrelated external-asset warnings);
- token source, source-build, neutral Web, motion, component-compatibility and
  Shopify-token validation;
- Web adapter validation (`183` components, `19` CSS sources);
- Shopify adapter validation (`183` components, `83` target-ready, `55`
  dedicated Liquid templates and `32/32` schema-ready; known maturity warnings
  only);
- docs TypeScript and a production Vite build outside `site/dist`;
- JSON parsing, source/copy byte comparison and `git diff --check`;
- browser evidence with zero failures and the clean-resource gate.

`site/dist` was not rebuilt or modified.

## Risks And Required Owner Decisions

1. Decide whether R11 remains a useful Ceramics-context registry profile for
   v1 or is consolidated into canonical F3 `Certificate`.
2. If retained, define the distinct consumer use case so the profile does not
   become a second certificate implementation later.
3. Approve the authoritative certificate record owner, field inventory,
   localization/formatting policy and product/artwork/maker relationships.
4. Define issuer, holder, proof, status/revocation, privacy and trust policy if
   The Gallery ever claims verifiable credentials or authenticity.
5. Approve the verification destination/service, failure behavior and whether
   redundant QR media is ever generated by a target.
6. Define Shopify metafield/metaobject/app ownership, editor mapping and theme
   behavior before adding target-native markup.
7. Supply R11-specific Figma evidence or explicitly approve reuse of canonical
   Certificate artwork in the Ceramics context.
8. Human-review the archival surface, hierarchy, density, detail breakpoint,
   link emphasis and contextual fit at all four viewports.

Until these are resolved and explicit human review occurs, the contract remains
`pilot`; no automated process may promote it to `stable`.
