# Component Dossier: Certificate Details

> Historical migration evidence only. ADR 0245 removes this duplicate registry
> identity; canonical Certificate is the surviving component.

Status: `refined-decision-needed`

Date: 2026-07-18

Registry: `R11` / `certificate-details`

Dependency order: 136, phase 6 (Composed components), depth 0 before refinement

## Recommendation

Keep R11 as a Ceramics-context profile of canonical `Certificate`, not as a
second certificate surface. Layer `.certificate-details` on the canonical
`.coa` root, consume canonical title, divider, detail-list and optional
verification anatomy, and add `certificate` as the direct dependency. R11
should add no visual tokens, keyboard model, state store, QR generator,
authenticity status or neutral runtime.

Replace the baseline `icon`, optional `title`, required `details` and `qr`
properties with three coherent semantic decisions: required `title`, required
non-empty `details`, and optional `verification`. The title names the native
article. Details are target-owned name-value pairs rendered through canonical
`dl` anatomy. Verification is a complete target-owned canonical descriptive
link with a real destination; optional QR or other media may appear inside it
only as redundant media. Remove the decorative check-seal and isolated QR
slots rather than retaining compatibility shims that imply proof or preserve a
parallel anatomy.

Extract the already reviewed `CertificateArtwork` and fixture from the
Storytelling family without changing canonical F3 DOM. Both F3 and R11 then
consume the same renderer; Exhibit and Studio for each slug continue to use one
registered renderer and fixture. The R11 profile supplies Ceramics-specific
fixture content only, not component defaults or a record schema.

This direction applies the explicit program rule that composed components
consume canonical implementations. It does not decide whether R11 merits a
separate registry identity in v1. Keeping it as a profile is the least
assumptive migration: consumers retain the Ceramics-context slug while the repo
has one certificate DOM, CSS, accessibility and verification boundary. Full
consolidation/removal, a genuinely smaller metadata component, or a distinct
commercial certificate product remain explicit owner architecture decisions.

R11 remains `pilot`. Final archival styling, contextual identity, record
schema, verification service, Shopify data mapping, Figma artwork and stability
promotion all require later review.

## Current Gallery Result

- R11 now depends on `certificate` and renders through the extracted canonical
  `CertificateArtwork`; F3 and R11 share the same Certificate DOM, CSS,
  accessibility, intrinsic response and verification boundary.
- The final R11 contract is `0.3.0` / `pilot`: required `title`, required
  non-empty `details`, optional complete `verification`, ten anatomy parts,
  four documented states, eight behavior requirements, zero public R11 tokens
  and zero R11 runtime.
- `CertificateArtwork` trims required strings, filters incomplete detail pairs
  and omits the complete renderer when title or details are invalid. The
  optional verification region is emitted only for a real destination plus
  descriptive text; its fixture media is redundant and hidden from the link
  name.
- The parallel check seal, QR-only region, obsolete child classes, dedicated
  R11 CSS, Studio layout overrides and duplicated Storytelling renderer are
  removed. `.certificate-details` remains only as a contextual profile hook in
  the Ceramics family reset/containment selectors; all visible declarations
  come from canonical `.coa`.
- One bounded browser session produced eight paired natural captures at mobile,
  tablet, desktop and XL plus dark, forced-colors, RTL, extreme, missing-media,
  effective-200%-text and user-spacing evidence. Every natural and direct
  `180/240/360/480px` root has zero component/part overflow; the detail list
  switches from one to two tracks from the canonical component container.
- Native semantics are one heading-labelled `ARTICLE`, one `DL` with four
  complete `DT`/`DD` groups and one optional descriptive `A`. Blank title omits
  the root; verification omission leaves required details intact; keyboard
  focus exposes a `2px` outline. There are no custom roles, hidden labels, live
  regions, scripts or obsolete R11 parts.
- Minimum measured text contrast is `7.02:1` in light mode and `6.99:1` in dark
  mode. Forced colors preserves the card border and focused link outline;
  reduced motion finds zero active component motion.
- With a normalized `360px` containing block, Exhibit and Studio produce the
  same DOM hash `25088848` and internal-style hash `4fc1bacc`. The evidence used
  one page, recorded zero console/page errors and ended with the repository
  resource gate clean.
- Ceramics CSS is now `33,749 B` raw / `4,837 B` deterministic gzip, `590 B`
  below the `5,427 B` family ceiling. Neutral Web component CSS is `523,581 B`
  raw / `69,847 B` gzip. Shared runtime remains byte-identical at `53,811 B`
  raw / `10,501 B` gzip and R11 contributes no neutral JavaScript.
- Web, Webflow and Shopify Ceramics CSS projections are byte-identical at
  SHA-256 `9046e586102576288acc6facf7f591522c924fb537a2ff2f8f98d4f4bc5a4300`.
  Shopify remains planned until an authoritative record/schema and verification
  integration are approved.
- Evidence is preserved under `output/playwright/refinement-batch-120/`; the
  compact machine result is `evidence-summary.json`. ADR 0211 records the
  canonical-profile decision. R11 remains not ready for stability review until
  the separate registry identity and target record boundaries receive owner
  input.

## Purpose And Limits

- Presents the human-readable details of one target-owned certificate record
  in a Ceramics context.
- May show a required contextual title and one or more target-supplied
  name-value pairs.
- May compose a complete target-owned verification link with a real
  destination and optional redundant QR or other media.
- Reuses canonical `Certificate` presentation, semantics, intrinsic response,
  focus treatment and target boundary.
- Does not define a certificate, artwork, maker, issuer, holder, product,
  provenance, ownership, rights or credential record.
- Does not claim authentic, verified, valid, signed, unique, scarce, original,
  registered or revocation status.
- Does not generate QR content, derive a destination, contact a verification
  service, scan media, validate a signature or announce record changes.
- Does not turn a seal/check icon or decorative surface into evidence.
- Does not expose columns, measure, border, padding, alignment, QR size,
  heading rank, print mode or visual density as R11 public API.

## Accepted Source Facts

- The repository is the source of truth; Figma is evidence and a future target.
- ADR 0083 accepts R11 as a pilot exposing certificate fields and optional QR
  media without assigning a verification protocol or guarantee.
- ADR 0125 later establishes canonical F3 `Certificate` as a named passive
  article with native `dl` details and an optional target-owned descriptive
  verification link. It prohibits generated QR services and authenticity
  claims.
- The component-refinement goal requires composed components to consume
  canonical components and forbids duplicate markup or behavior.
- F3 completed automated refinement before R11 and is therefore available in
  dependency order.
- R11 and F3 currently represent the same certificate-detail job with different
  classes and presentation. No accepted source decision gives R11 a distinct
  record type, user task or behavior.
- Exhibit and Studio currently resolve one Ceramics family renderer for R11,
  but that renderer duplicates F3 markup concepts and the static MDX fallback.
- Studio metadata for both components points to generic Button/Studio nodes
  (`943:7`, `1020:480`), not component-specific visual approval.

## Baseline Implementation Audit

### Identity, DOM And API

- Registry R11 describes a “full certificate of authenticity detail view with
  QR code” and declares no dependency, while canonical F3 already owns that
  exact bounded job.
- R11 renders a separate `section.certificate-details`; F3 renders a named
  `article.coa`. R11 therefore duplicates surface, heading, field-list and QR
  composition instead of consuming the canonical component.
- The R11 root always sets `aria-labelledby`, even when its optional `title`
  control is false. That leaves a dangling reference and an unnamed section.
- `details` is contract-required but Studio can disable it. With optional
  title/icon/QR also absent, the renderer can emit an empty bordered section.
- The check-seal icon is decorative but visually reads as a verification or
  approval mark that the component explicitly cannot substantiate.
- The QR fixture is an isolated `div[role=img]` named “Example QR media with no
  verification behavior.” It has no destination, textual equivalent or useful
  function and can be mistaken for proof while adding an unnecessary graphic
  to the accessibility tree.
- The `qr` slot exposes a transport/presentation detail instead of the stable
  semantic decision: a real verification destination and purpose.
- R11 is passive and currently adds no listener, timer, request, observer,
  state store or neutral script. Controlled/uncontrolled strategy is not
  applicable.

### CSS, Tokens And Responsive Behavior

- R11 duplicates a card surface already owned by `.coa`, with its own border,
  radius, maximum width, padding, centered hierarchy and details grid.
- Geometry uses physical properties and hardcoded `32px`, `48px`, `12px`,
  `16px`, `24px`, `120px`, `560px` and `639px` values instead of canonical
  private composition.
- Heading and body typography are incomplete; label size is calculated as a
  multiplier and weight is hardcoded. `dt`/`dd` margins depend partly on
  Studio-specific CSS.
- Responsiveness uses a viewport media query, while Studio separately applies a
  `680px` container query and a `440px` padding override. Exhibit and Studio
  therefore split ownership of the same component response.
- Studio owns an additional R11 width, margins, grid switch, QR grid and SVG
  sizing rather than only framing the canonical artwork.
- Baseline R11 CSS is `1,326 B` raw / `555 B` deterministic gzip, SHA-256
  `453a21f8744f140c2011bef7934ff7cd2cf85728e856607b3fe346b11bf68dc7`.
- After R10, Ceramics CSS is `35,099 B` raw / `5,085 B` deterministic gzip;
  complete Web component CSS is `524,931 B` raw / `70,078 B`; shared runtime is
  `53,811 B` raw / `10,501 B`. R11 adds no neutral JavaScript.

### Documentation And Visual Baseline

- Documentation correctly keeps record fields target-owned and denies an
  authenticity guarantee, but it still presents icon and QR as public slots
  and incorrectly declares no canonical dependency.
- Four existing captures under `output/playwright/parity/ceramics/` show a
  large outlined card, centered orange check seal, serif heading, metadata and
  oversized QR-like fixture at Mobile and Desktop in Exhibit and Studio.
- The baseline is internally coherent but visually asserts certificate trust
  through a seal-plus-code composition without a destination or verification
  model. It also duplicates F3's accepted archival certificate surface.
- The existing captures do not prove omitted title/details, empty content,
  meaningful verification, failed media, long/localized/RTL content, direct
  narrow containers, 200% zoom, user text spacing, dark mode, forced colors,
  reduced motion or normalized Exhibit/Studio DOM/style parity.

## External Research

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WHATWG description lists](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element) | `dl` represents one or more name-value groups and permits direct `div` grouping. | Reuse canonical Certificate's native detail anatomy rather than parallel field paragraphs or a custom role. |
| [WAI link purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | A link purpose must be determinable from its text or programmatic context. | A verification region needs descriptive visible link text and a real target destination; QR appearance alone is insufficient. |
| [WAI functional images](https://www.w3.org/WAI/tutorials/images/functional/) | Images inside links need an alternative matching function; redundant media can be omitted from the accessible name when adjacent text is complete. | Keep optional QR media inside the descriptive canonical link and hide it when the text already names the destination. |
| [W3C Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model/) | Verifiable credentials require explicit issuer, subject, claims, securing mechanisms and verifier policy. | A presentational card, check seal or QR cannot independently assert authenticity or validity. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | No interoperable Certificate or Certificate Details browser primitive is defined. | Use Gallery's already accepted native Certificate composition; do not invent a second role or widget model. |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix focuses on behavior-rich WAI patterns and publishes no certificate primitive. | No headless runtime, controlled state or keyboard abstraction is justified for R11. |
| [Polaris web components](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components) | Polaris offers generic section, grid, link, image and content building blocks, not a certificate widget. | Preserve native article/list/link semantics and target data rather than copying a Shopify-specific component API. |
| [Shopify custom-data modelling](https://shopify.dev/docs/apps/build/metaobjects/data-modeling-with-metafields-and-metaobjects) | Metafields and metaobjects model structured merchant data through explicit definitions. | A Shopify adapter may map an approved certificate record, but R11 must not invent a namespace, schema or verification URL. |

WAI-ARIA APG defines no Certificate or Certificate Details interaction pattern.
The component is document content plus an optional ordinary native link, so no
composite role, arrow-key behavior, roving tabindex or live-region protocol
applies.

## Mature-System Comparison And Convergence

Convergence:

- HTML and WAI support native name-value content and ordinary link semantics.
- Open UI, Radix and Polaris provide no evidence for two certificate component
  identities or a certificate-specific widget role.
- Credential standards distinguish presentation from issuer, proof and trust.
- Shopify structured data requires an explicit target model rather than a
  presentational inference.
- The repository already has a more complete canonical Certificate boundary
  that matches all of the above.

Differences and gaps:

- Baseline R11 exposes isolated icon and QR slots while the stable semantic
  decision is a target-owned record and optional verification destination.
- Its optional title conflicts with an always-labelled section, and its
  required details can be disabled by Studio.
- Its viewport response and visual tokens duplicate canonical F3 and split
  component ownership with Studio CSS.
- The registered Figma nodes do not justify the separate orange-seal visual or
  the oversized QR fixture.
- The repository has not decided whether R11 should remain a distinct catalog
  entry once it becomes a profile.

## Candidate Anatomy

| Part | Required | Semantic form | Owner |
| --- | --- | --- | --- |
| Root profile | yes | `article.coa.certificate-details[aria-labelledby]` | R11 + Certificate |
| Title | yes | canonical contextual heading `.coa__title` | target / Certificate |
| Divider | optional/decorative | canonical hidden `.coa__divider` | Certificate |
| Details | yes | canonical native `dl.coa__details` | target / Certificate |
| Detail group | one or more | canonical direct `div.coa__detail` | target / Certificate |
| Detail label | conditional | canonical `dt.coa__detail-label` | target |
| Detail value | conditional | canonical `dd.coa__detail-value` | target |
| Verification | optional | canonical native `a.coa__verification[href]` | target / Certificate |
| Verification media | optional | canonical `.coa__qr`, redundant when text is complete | target |
| Verification text | conditional | canonical visible `.coa__verify` | target |

R11 adds only the contextual root class. It does not add an icon, QR-only
region, signature, artist, separate detail classes or local surface anatomy.

## State, Variant, Size And Mode Matrix

| Dimension | Safe scope |
| --- | --- |
| Default | Named passive canonical certificate article with non-empty title and details. |
| Minimum valid | Required title plus one complete name-value pair. |
| Multiple details | Target-supplied ordered pairs; blank/incomplete pairs omitted. |
| Verification omitted | No link, QR wrapper, status or empty region. |
| Text-only verification | Real descriptive native link; no media required. |
| Verification with media | Same link purpose and destination; redundant media hidden from its name. |
| Invalid title/details | Omit complete R11 renderer rather than emit an unnamed/empty certificate shell. |
| Narrow/wide | Canonical Certificate responds to its own inline size. |
| LTR/RTL/localized | Logical layout and target-authored source order; opaque values remain readable. |
| Long/unbroken/zoom/text spacing | Canonical wrapping and intrinsic containment prevent root/page overflow. |
| Light/dark/forced colors | Inherited canonical semantic colors, border and focus treatment. |
| Reduced motion | No R11-authored animation or transition. |

## Public API And State Ownership

- `title`: required non-empty visible contextual title and article-name source.
- `details`: required non-empty target-owned collection of complete native
  name-value pairs composed through Certificate.
- `verification`: optional complete canonical verification link composition,
  including real target-owned destination, descriptive visible text and
  optional redundant media.

Do not expose `icon`, `qr`, `verified`, `authentic`, `status`, `issuer`,
`certificateId`, `verificationUrl`, `proof`, `signature`, `columns`, `align`,
`showBorder`, `qrSize`, `print`, `download`, `onScan` or `onVerify` in R11.
Record fields stay inside `details` until a target record architecture is
accepted. R11 has no controlled/uncontrolled state strategy.

## Token, Runtime And Performance Direction

- R11 exposes no visual token of its own. Consumers customize the canonical
  Certificate tokens through that dependency.
- Remove the R11-specific CSS block and every R11-specific Studio presentation
  override. A zero-rule `.certificate-details` context class remains valid as
  a contract/profile hook.
- Canonical Certificate owns surface, border, typography, spacing, intrinsic
  details grid, verification layout/focus, forced colors and reduced motion.
- R11 adds no listener, observer, request, timer, state store, formatter,
  generated QR, layout read, animation or asset.
- Expected R11 neutral runtime contribution is `0 B`; removing duplicate CSS
  should reduce the Ceramics family and total Web bundle.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | `.certificate-details` profile layered on canonical `.coa` article, details and optional verification link. | Safe to implement now. |
| Shopify | An approved certificate metafield/metaobject or app record may map into the existing canonical Certificate snippet/profile. | Planned; schema, authority and verification service are open. |
| React / Angular | Thin profile around the canonical Certificate adapter with target-owned details and optional native link. | Planned; no local state. |
| Figma | Instance/profile of canonical Certificate with Ceramics fixture content and omitted/text/media verification states. | Planned; current reference is unrelated. |
| SwiftUI / Compose | Target-native record-details presentation reusing the platform Certificate composition. | Conceptual; no proof protocol implied. |

## Alternatives Requiring Owner Architecture Input

1. **Remove R11 and use F3 everywhere.** This is the cleanest catalog but changes
   the registry count, navigation, docs, IDs and consumer migration; do not infer
   it during refinement.
2. **Redefine R11 as generic record details.** This needs a new purpose/name and
   evidence that it serves non-certificate contexts. It must not keep certificate
   styling or QR semantics under a generic label.
3. **Keep a separate compact certificate visual.** This requires an accepted
   use-case boundary, distinct anatomy, visual reference and proof that it is a
   canonical Certificate variant rather than duplicate implementation.
4. **Model a verifiable digital credential.** This requires issuer, claims,
   proof, trust, status/revocation, privacy, service and target architecture.
   It is not a presentational refinement.

## Human Review Boundary

Human review must decide whether R11 remains a useful Ceramics profile or should
be consolidated out of the v1 catalog. If retained, review must approve reuse of
canonical Certificate's archival surface, centered hierarchy, typography,
detail density, intrinsic breakpoint and verification-link treatment in this
context. Record schema, authority, proof, QR destination, Shopify mapping and
R11-specific Figma examples remain open. No `stable` promotion is permitted
without explicit approval.
