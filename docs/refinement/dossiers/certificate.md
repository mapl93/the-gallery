# Component Dossier: Certificate of Authenticity

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify snippet translation

Contract: `components/contracts/certificate.contract.json`

## Recommendation

Keep Certificate of Authenticity as a passive, self-contained record rendered
as a named `article`. Require only its visible record title. Preserve optional
label, attribution, target-owned name-value details, signature composition, and
verification composition. Details use a native `dl`; verification uses a
descriptive native link only when the target supplies a real destination.

Do not generate a QR code from a product URL, imply cryptographic provenance,
invent a verification status, or treat a maker/vendor string as a signature.
A QR or other verification mark is optional media inside the same descriptive
link and is decorative to assistive technology when adjacent text already
communicates the link purpose. The target owns certificate records, identifiers,
issuer/proof data, revocation, destinations, assets, and all authenticity claims.

Use one contained editorial surface whose metadata grid responds to the
component's own inline size. Expose the stable semantic content slots, not its
border width, decorative rule, letter spacing, QR dimensions, column threshold,
or alignment as public options. The existing archival-card visual remains the
candidate for human review; no component-specific owner reference exists.

## Purpose And Limits

- Presents a human-readable record associated with an artwork, edition,
  collectible, or other object for which the target has certificate data.
- Primary contexts are artwork detail pages, post-purchase records, printable
  records, account/order views, and editorial commerce pages.
- Certificate owns reading order, semantic grouping, resilient visual
  composition, optional-part omission, focus indication for a supplied link,
  and target-neutral styling.
- The target owns the actual record, identifiers, claims, issuer, subject,
  evidence/proof, revocation, destination, QR/barcode generation, localization,
  analytics, download/print actions, and legal or commercial guarantees.
- It is not a credential protocol, signing service, provenance ledger, status
  widget, product metafield schema, downloadable document generator, or scanner.
- No component JavaScript, controlled/uncontrolled state, events, live region,
  focus movement, timer, observer, or reduced-motion branch is required.

## Pre-Refinement Gallery Baseline

- Registry `F3`, category `storytelling`, no dependencies; contract `0.1.0`,
  `pilot`; thirteen anatomy parts, one variant/size/state, one behavior, six
  properties, and twelve public tokens.
- ADR 0080 already accepts visible identity fields plus target-owned detail,
  signature, and verification slots. `docs/OPEN-QUESTIONS.md` intentionally
  leaves the meaning of verification, QR destination, and target authority open.
- Canonical CSS is visually coherent but uses a viewport `479px` query for its
  details grid, so a narrow embedded Certificate can retain two columns when the
  page itself is wide.
- Padding, border thickness, letter spacing, line heights, weights, detail gap,
  divider geometry, QR dimensions, and vertical rhythm are literal values.
  Several text styles use incomplete typography tokens and can inherit host
  styles.
- Canonical CSS does not own a verification-link focus treatment. The docs site
  supplies Certificate-specific link layout, underline, color and focus styles,
  so other target consumers do not receive the same rendering.
- The shared Exhibit/Studio renderer already uses one fixture and native
  `article`, heading, `dl`/`dt`/`dd`, signature and link markup. Its verification
  example contains text but no optional verification media.
- The MDX fallback uses equivalent native semantics and an empty-alt placeholder
  image inside the link, but the shared renderer and MDX do not yet share exact
  verification anatomy.
- Shopify renders generic `div`/`p` metadata, hard-coded English, an `h3`, a
  vendor string as signature, and an externally generated QR that points to the
  product URL while claiming to verify authenticity. It is marked `planned`
  despite existing Liquid and product-template composition.
- Existing evidence covers the default fixture at four viewport widths but not
  exact Exhibit/Studio markup parity, component-width switching, optional-part
  omission, long/empty/localized content, RTL, zoom, themes, forced colors,
  link focus, offline rendering, or source/generated identity.
- Baseline deterministic gzip is `3,912 B` for Storytelling CSS against a
  `4.2 KiB` family ceiling, `65,689 B` for all neutral component CSS against
  `64 KiB`, and `10,492 B` for shared neutral runtime against the existing
  `8 KiB` exception. Certificate itself adds no runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML description lists](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element) | `dl` represents one or more name-value groups, and each group may be wrapped in a `div`. | Use direct semantic detail groups with explicit classes; do not simulate metadata with paragraphs. |
| [W3C link purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | A link's purpose must be determinable from its text or programmatic context. | Verification guidance must name the destination/action rather than depend on QR appearance alone. |
| [W3C H30](https://www.w3.org/WAI/WCAG21/Techniques/html/H30) and [functional images](https://www.w3.org/WAI/tutorials/images/functional/) | When text and an image share one link and the text fully identifies its purpose, empty image alt avoids duplicate naming. | Keep optional QR/verification media inside the descriptive link and hide redundant media from the accessible name. |
| [W3C Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model/) | Verifiable data involves issuer, subject, claims, proofs and verifier policy; verifiability does not by itself establish truth. | A presentational card cannot claim authenticity from a URL or image. Record/proof policy stays target-owned. |
| [W3C Data Integrity](https://www.w3.org/TR/vc-data-integrity/) | Authenticity and integrity claims require a defined cryptographic proof model and verification process. | Do not introduce `verified`, `authentic`, issuer trust, signature validation, or proof state without an accepted target architecture. |
| [GS1 Digital Link](https://www.gs1.org/standards/gs1-digital-link) and [GS1 Digital Signatures](https://www.gs1.org/standards/gs1-digital-signatures/current-standard) | QR-resolvable identifiers and digital signatures are distinct, explicitly modelled standards. | QR is one possible target transport, not a neutral Certificate requirement or authenticity guarantee. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) and [Card research](https://open-ui.org/components/card.research/) | No interoperable Certificate primitive or settled Card anatomy exists. | Keep Gallery-specific passive composition over native HTML instead of inventing a platform role. |
| [Radix primitives overview](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix concentrates on behavior-rich WAI patterns; it does not define a certificate/card primitive. | No headless widget runtime or ARIA interaction model is needed. |
| [Polaris web components](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components) | Polaris provides generic layout/content structures but no Certificate semantic primitive. | Shopify translation should preserve native article/list/link semantics and target data, not emulate a Polaris widget. |
| [Shopify custom-data modelling](https://shopify.dev/docs/apps/build/metaobjects/data-modeling-with-metafields-and-metaobjects) | Metafields/metaobjects model structured target data and can be read through Liquid. | Shopify may map certificate records, but the neutral contract must not freeze one merchant schema or namespace. |

### Mature-system comparison

- Open UI, Radix and Polaris do not establish a Certificate widget API or ARIA
  role. Their useful convergence is native document semantics and composition.
- Mature credential and identification standards separate a human-readable
  presentation, resolvable identifier, issuer claims and proof verification.
  The Gallery component owns only presentation.
- Shopify can source data from product metafields or a future metaobject, but
  those schemas and authenticity guarantees are target architecture decisions.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. Direct inspection shows the generic Studio shell and
Button pilot: `Button`, `Customize`, inspector groups and Button token controls.
It contains no Certificate artwork, archival surface, metadata layout,
signature, verification mark, responsive state or visual evidence. It validates
inspector organization only. The repository candidate remains the visual
proposal for human review; no Certificate aesthetic is inferred from that frame.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | named `article.coa` | Certificate / target | Associated with its visible title through a target-unique id. |
| Header label | no | paragraph/text | target | Record-kind label; omitted when absent. |
| Title | yes | contextual heading | target | Human-readable record title; class does not mandate heading rank. |
| Attribution | no | paragraph/text | target | Artist, maker or other target-authored attribution; no hard-coded “by”. |
| Divider | no/decorative | hidden element or pseudo-element | Certificate | Never conveys grouping alone. |
| Details | no | native `dl` | target | Omitted when no valid pairs exist. |
| Detail | repeated | direct `div.coa__detail` in `dl` | target | One name-value group; omitted when its value is absent. |
| Detail label | conditional | native `dt` | target | Localized target-owned name. |
| Detail value | conditional | native `dd` | target | Long values wrap and remain selectable. |
| Signature | no | target-owned slot | target | A real mark/composition only; maker text is not silently relabelled as a signature. |
| Verification | no | native descriptive link | target | Rendered only with a real target destination. |
| Verification media | no | target-supplied image/SVG | target | Decorative to assistive technology when adjacent text fully names the link. |
| Verification text | conditional | visible text in link | target | Describes record destination/action; QR is never the sole path. |

## Variant, Size, State, And Mode Matrix

- Variant/size: one default contained archival card. Printable mode, compact
  density, landscape orientation, border style, alignment and alternate surfaces
  are not accepted public options.
- Required content: non-empty title. Every other visible region is independently
  optional and omitted rather than left empty.
- Details: zero, one, four, odd and long pairs; labels/values in localized scripts;
  long unbroken identifiers; missing individual target values.
- Verification: omitted; descriptive text link; text plus target media; failed
  media with link text preserved; offline rendering with no external QR request.
- Width: card is contained by its host; metadata changes from two columns to one
  based on the Certificate's own inline size, not the viewport.
- Themes: semantic colors inherit source light/dark modes. Forced colors preserve
  borders, text and focus without relying on the decorative rule.
- Reduced motion: no authored animation or transition.
- RTL: source/read order stays logical and all layout uses logical properties.

## Public API And State Ownership

Keep the six accepted semantic properties:

- `label` — optional visible record-kind label.
- `title` — required visible record title and root accessible-name source.
- `artist` — optional target-authored attribution; keep the existing property
  name for compatibility but do not prepend localized content in neutral source.
- `details` — optional target-owned repeated name-value composition.
- `signature` — optional target-owned signature/mark composition.
- `verification` — optional target-owned descriptive link composition, including
  its real destination and optional media.

Do not add `verified`, `authentic`, `revoked`, `issuer`, `certificateId`,
`issueDate`, `proof`, `verificationUrl`, `qrCode`, `layout`, `columns`, `align`,
`showBorder`, `download`, `print`, `onVerify`, or scan events to the neutral API.
Targets may express record fields inside `details` until a separate credential
architecture is accepted. Certificate is passive and has no controlled/
uncontrolled strategy.

## Token And Value Audit

- Public color: archival surface, decorative border, primary/secondary/accent
  text, and focus border for a supplied verification link.
- Public typography: body family, heading family/size/line-height/weight, accent
  family with h4 size/line-height, and body/body-small size, line-height and
  accepted weights.
- Public spacing: element gap only. Card inset and metadata rhythm are private
  compositions derived from existing semantic spacing.
- Public radius: large card radius.
- `30rem` maximum measure, `2px` decorative border/rule, letter spacing, media
  size, metadata columns and container threshold remain private; consumers do
  not configure them independently.
- Replace incomplete typography, literal margins and viewport switching with
  complete semantic pairs, private composition variables and a container query.
- Remove site-only verification presentation so canonical source owns layout,
  underline and focus.

## Accessibility And Interaction

- Use `article` only for a self-contained record and associate it with the visible
  contextual heading through a target-unique `aria-labelledby` value.
- Use `dl` with direct detail-group wrappers, `dt` and `dd`; do not add list roles.
- Keep the decorative divider hidden from assistive technology.
- Render verification only as an ordinary link with a valid destination and
  visible purpose. Do not use button, status, dialog, scanner or custom key
  behavior.
- If media and text share the link, give redundant media empty alt or
  `aria-hidden`; link text remains the accessible name and fallback.
- Apply a visible `:focus-visible` ring with sufficient offset. Preserve native
  Enter activation, context menus, copy-link behavior and browser status.
- Meaning must survive missing media, CSS, JavaScript, external services and
  decorative rule. Long localized content and 200% zoom must remain contained.

## Responsive And Performance

- Make `.coa` a named inline-size container. Switch the metadata grid inside a
  private component threshold, not a page viewport breakpoint.
- Card width remains `min(100%, 30rem)` and uses logical padding/margins. Long
  labels, values, signatures and verification text wrap without page overflow.
- DOM/work is constant in the shell and linear in target detail pairs. There are
  no listeners, observers, requests, timers, layout reads, generated QR services
  or component assets.
- Neutral runtime contribution remains `0 B`. Target-supplied media and record
  services are adapter/data concerns.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Named article, contextual heading, native description list, optional signature slot and optional descriptive verification link/media. | Implemented, generated, validated and browser-verified; no component runtime. |
| Shopify | Snippet reads existing product/metafield facts, localizes labels, conditionally emits semantic details, and accepts explicit target-owned signature/verification parameters. | `implemented`, `snippet-adapter`, maturity `ready: true`; synthetic QR/product URL claims removed and Liquid/locales officially validated. |
| React / Angular | Passive component accepting content/slots; adapter supplies unique heading id and a real anchor for verification. | Planned; no state service or lifecycle required. |
| Figma | Default, details-only, with signature, with real-verification slot, omitted optionals, long/localized and narrow/wide examples. | Planned; registered reference is generic Button artwork. |
| SwiftUI / Compose | Native grouped record semantics, target details and optional native link; verification service remains external. | Conceptual; no credential protocol is implied. |

## Exhibit And Studio Parity

- Keep one `StorytellingStudio` renderer, one fixture and exact initial outerHTML
  in Exhibit and Studio at Mobile, Tablet, Desktop and XL.
- The fixture may include one explicitly labelled example verification record
  and site-owned decorative mark, but must not describe it as a component
  default, proof, or guarantee.
- Special evidence removes every optional region independently and exercises
  one/five details, extreme/localized strings and a failed/missing media case.
- Studio exposes only the accepted semantic fields/slots and validated source
  tokens. It must not expose private border, QR size, columns or alignment.
- Remove Certificate-specific link/detail presentation from site CSS so both
  modes consume the canonical component implementation directly.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Shopify generates a third-party QR to a product URL and claims authenticity. | critical | Remove the request and claim; render verification only from an explicit real target destination. | implementable now under ADR 0080 |
| Shopify treats `product.vendor` as a signature. | high | Omit signature unless a target supplies an actual signature composition/value. | implementable now |
| Shopify metadata uses generic paragraphs and hard-coded English. | high | Use conditional `dl`/`dt`/`dd` and localized target labels. | implementable now |
| Verification focus/layout exists only in docs-site CSS. | high | Move complete link layout/focus into canonical source and remove site override. | implementable now |
| Metadata responsiveness depends on viewport width. | high | Use an inline-size container query on Certificate. | implementable now |
| Typography and spacing are partially literal/inherited. | medium | Apply complete semantic tokens and private composition variables. | implementable now |
| Verification/proof architecture remains open. | architecture | Preserve the target-owned slot and make no claim; later service/schema work needs explicit owner input. | owner/target architecture |
| No component-specific Figma artwork exists. | human review | Present the repository proposal and request approval of archival surface, type, alignment, rule and rhythm. | owner |

## Refinement Result

- Contract `0.2.0` remains `pilot`: thirteen anatomy parts, one variant, one
  size, two states, eight behaviors, six semantic properties, twenty-four
  public tokens and no dependencies.
- Canonical CSS now owns complete semantic typography, native description-list
  resets, source-strength host isolation, inline-size container behavior,
  logical layout, content containment, native link presentation/focus, fluid
  verification media and forced-color support. Site-only Certificate rules were
  removed.
- MDX and the shared Exhibit/Studio renderer use one named native article,
  contextual heading, direct `dl` groups, optional real signature composition,
  and one descriptive verification link with redundant decorative fixture media.
- R11 refinement subsequently extracted that implementation into the shared
  `CertificateArtwork` module. F3 retains its reviewed fixture and DOM while
  Certificate Details consumes the same canonical renderer as a contextual
  profile under ADR 0211.
- Shopify maps current product/metafield facts to localized native details,
  keeps vendor as attribution, accepts explicit optional signature/verification
  inputs, emits no synthetic third-party QR or authenticity claim, and reports
  `implemented`, `snippet-adapter`, `ready: true`.
- Exact Exhibit/Studio initial `outerHTML` parity holds at Mobile, Tablet,
  Desktop and XL; clean component HTML is `1,419` characters. The component
  switches from one to two metadata columns by its own width, with no page
  overflow at any standard viewport.
- Public optional content omission, target text-only/media verification, native
  keyboard focus, a constrained `320px` host, five localized RTL details, long
  unbroken values, isolated 200% zoom, an effective `195px` reflow probe,
  light/dark contrast, forced colors and reduced motion were verified in a real
  browser. The extreme reflow probe found and drove the fluid-media fix.
- Light contrast measures `16.12:1` title/detail value, `7.02:1` label/detail
  label/link and `5.29:1` artist. Dark measures `9.92:1`, `6.99:1` and `5.75:1`
  respectively.
- Storytelling CSS is `4,220 B / 4.2 KiB` deterministic gzip, leaving `80 B`.
  Complete neutral component CSS is `66,025 B / 64 KiB`, an explicit `489 B`
  program gap. Shared runtime remains `10,492 B / 8 KiB`; Certificate adds
  `0 B` component runtime and no asset/network request.
- Four baseline images, eight final viewport images and five special-state
  images are stored under `output/playwright/refinement-batch-40/`. The full
  audit is `docs/reports/certificate-web-refinement-audit.md`.

## Remaining Human Review

- Approve or revise the archival surface, decorative border/rule, centered
  hierarchy, heading/accent pairing, detail density and vertical rhythm.
- Approve or revise the private `30rem` measure, intrinsic one/two-column
  threshold, fluid verification-media maximum and full-width verification-link
  focus/click target.
- Confirm that layout, alignment, columns, border treatment, QR size, printable
  mode, issuer/proof fields and authenticity status remain outside the v1 public
  component API.
- Resolve separately which target/service owns authoritative certificate
  records, proof, revocation, destinations and guarantees before implementing a
  production verification flow.
- Do not promote the contract to `stable` without explicit human approval.
