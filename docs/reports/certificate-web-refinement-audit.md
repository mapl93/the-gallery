# Certificate Of Authenticity Web Refinement Audit

Status: ready for human review; remains `pilot`

Date: 2026-07-14

Component: Certificate of Authenticity (`F3`)

## Outcome

Certificate is reconciled as a passive self-contained target record with a
visible title, semantic name-value details, optional real signature composition,
and optional descriptive verification link. It no longer synthesizes trust:
Shopify does not generate an external QR from a product URL, relabel the vendor
as a signature, or claim that the presentation verifies authenticity. Contract,
registry, canonical CSS, MDX, shared Exhibit/Studio renderer, Studio metadata,
Shopify Liquid/locales, generated Web/Shopify/Webflow adapters, dossier, ADR,
open questions and browser evidence agree.

The component is `human-review-ready` but remains `pilot`. Human review must
approve the visual proposal. The neutral component bundle is `489 B` over its
permanent `64 KiB` ceiling; this is an explicit program-level gap, not a silent
budget increase. Authoritative certificate/proof architecture remains an
explicit target-owned open question and is not inferred by the component.

## Research And Decision

- HTML description-list semantics support direct grouped `dt`/`dd` pairs for
  target-owned record metadata.
- WCAG link-purpose guidance and WAI functional-image techniques support one
  descriptive native link whose redundant adjacent verification media is hidden
  from the accessible name.
- W3C Verifiable Credentials and Data Integrity distinguish a human-readable
  record from issuer claims, proof, trust policy and cryptographic verification.
  A QR or product URL alone cannot establish authenticity.
- GS1 Digital Link and Digital Signatures reinforce that resolvable identifiers,
  machine-readable media and signing are distinct explicit target standards.
- Open UI, Radix and Polaris define no interoperable Certificate widget. Native
  document semantics are sufficient; no headless runtime or ARIA widget model is
  justified.
- Shopify custom data can map record facts through metafields/metaobjects, but
  the neutral contract must not freeze a merchant schema or verification service.
- Direct Figma inspection of file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, found
  generic Studio/Button artwork, not Certificate artwork. No archival surface,
  metadata, signature, verification, responsive or visual decision was inferred.

ADR 0125 records the safe boundary: one passive named article, native
description-list details, independently optional composition, a real native link
only when the target supplies a destination, no generated signature/QR/status/
proof/claim, an intrinsic metadata grid and zero component runtime.

## Contract And Implementation Result

- Contract `0.2.0` remains `pilot`: thirteen anatomy parts, one variant, one
  size, two states, eight behaviors, six semantic properties, twenty-four public
  tokens and no canonical dependencies.
- A target-unique heading `id` names the self-contained native `article`; heading
  rank stays contextual. Label, attribution, details, divider, signature and
  verification are omitted where the target has no corresponding composition.
- Details use a native `dl` with direct `.coa__detail` groups containing one
  `dt` and `dd`. Long and unbroken values use source-owned containment.
- `.coa` is an inline-size container. The two-column details grid becomes one
  column according to the card's own width rather than the page viewport.
- Complete source typography tokens replace fractional sizes, literal weights
  and inherited line heights. Private measure, border/rule geometry, tracking,
  media maximum and threshold remain internal composition.
- Source-strength scoped selectors prevent docs/editor host heading, paragraph
  and description-list rules from changing the component. Canonical CSS owns the
  full verification link, underline, hover, focus and forced-color treatment.
- Optional verification media is constrained by its real link/content width,
  scales below its private `80px` maximum, and cannot cause extreme reflow
  overflow. The visible text remains independently meaningful.
- Exhibit and Studio use the same Certificate renderer and fixture. During R11
  refinement that implementation was extracted to `CertificateArtwork` and is
  now consumed by both `StorytellingStudio` and the Ceramics-context profile;
  F3's fixture and canonical DOM remain unchanged. The site-only Certificate
  detail/link rules were removed.
- Shopify uses localized native article/heading/`dl`/link markup, current
  product/metafield facts, explicit optional signature/verification parameters,
  and no generated network work. It reports `implemented`, `snippet-adapter`,
  maturity `ready: true`.

## Browser Evidence

### Parity And Viewports

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1440x1000`) and XL
  (`1920x1200`) produce exact initial Exhibit/Studio `outerHTML` parity. Clean
  initial component HTML is `1,419` characters.
- Mobile Exhibit and Studio both render a `295px` card with one `243px` metadata
  column. Tablet, Desktop and XL render the capped `480px` card and two columns
  of approximately `189.60px` or `185.60px`, according to host spacing.
- No standard viewport produces page-level horizontal overflow in either mode.
  A separate `320px` card probe produces one `243.20px` column and exact root
  containment at a wide browser viewport, proving component-width behavior.
- The initial accessibility tree exposes one article named `Moon Jar No. 07`,
  one contextual H2, four native terms/definitions, one signature paragraph and
  one link named `View certificate record TG-MP-2026-007`. Decorative divider
  and fixture media do not duplicate meaning.

### Optional Content And Keyboard

- The public title-only Studio probe removes label, attribution, details,
  signature and verification with no empty public wrappers. The internal
  decorative rule remains a visual composition and carries no semantics.
- Verification remains an ordinary native anchor. Sequential keyboard focus
  produces a `2px` solid primary outline with `3px` offset; native link behavior
  is not intercepted by component JavaScript.
- A text-only target verification link remains valid. Optional media is an
  adjunct and never the sole accessible name or destination.
- The canonical source owns focus; removing the former docs-site override does
  not change Exhibit/Studio behavior.

### Content, Themes, Reflow, And Preferences

- Five mixed localized/long detail groups at a `295px` RTL card remain in one
  logical column. A long unbroken record/link identifier stays within the root;
  title and value resolve `overflow-wrap: anywhere`.
- An isolated 200% CSS-zoom probe keeps both page and component contained. A
  stricter `195px` effective viewport keeps a `100px` card, `48px` detail column
  and fluid `48px` verification mark with `scrollWidth === clientWidth`. This
  probe initially found a `4px` media overflow and passes after the fix.
- Light contrast is `16.12:1` for title/detail values, `7.02:1` for label/detail
  labels/link, and `5.29:1` for attribution. Dark contrast is `9.92:1`, `6.99:1`
  and `5.75:1` respectively.
- Forced colors preserves a `2px` system card border, visible divider and `2px`
  system focus outline. Reduced motion reports `0s` transition and no animation;
  Certificate authors no motion in either mode.
- Browser console inspection reports zero errors and zero warnings for the final
  Certificate page.

Four before images, eight final viewport images and five special-state images
live under `output/playwright/refinement-batch-40/`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Named article, contextual heading, native grouped description list, optional real signature and descriptive link/media. | Implemented, generated and validated; no component runtime. |
| Shopify | Product/metafield facts, localized native details and explicit optional signature/verification parameters. | `implemented`, `snippet-adapter`, maturity `ready: true`; Liquid/locales pass the Shopify validator. |
| Webflow | Canonical target-agnostic CSS copy. | Source/generated identity verified. |
| React / Angular | Passive content/slot adapter with target-unique heading id and real native anchor destination. | Direction documented; packages planned. |
| Figma | Default, option omission, long/localized, narrow/wide, light/dark, focus and real verification-slot examples. | Planned; registered reference is unrelated generic Button artwork. |
| SwiftUI / Compose | Native grouped record presentation plus target-owned link/service. | Conceptual; no credential or proof protocol is implied. |

## Performance And Risks

- Storytelling CSS is `4,220 B / 4.2 KiB`, leaving `80 B` and adding `308 B`
  from Batch 39.
- Complete neutral Web component CSS is `66,025 B / 64 KiB`, a `489 B` overage
  and `336 B` increase from Batch 39. The ceiling remains binding; no budget was
  rewritten. Shared-bundle optimization or an explicit owner decision is needed
  before program-level v1 certification.
- Shared neutral runtime is `10,492 B / 8 KiB`, the existing `2,300 B`
  exception. Certificate adds `0 B` component runtime, listener, observer,
  timer, asset or network request.
- Human review must approve the `30rem` measure, archival surface, border/rule,
  centered alignment, heading/accent hierarchy, detail density, vertical rhythm,
  one/two-column threshold, verification-media maximum and full-width link focus
  target.
- Production verification remains intentionally absent until the owner selects
  the authoritative record, destination, issuer/proof/revocation semantics and
  target allowed to make authenticity guarantees.

## Validation

Registry/docs, DTCG/Web component-token compatibility, 183 contracts, 183 Studio
definitions, Neutral Web, Shopify and Webflow output generation/validation,
mandatory Shopify documentation search and four-file official validation,
source/generated CSS identity, structural certification, static Preview audit,
exact Exhibit/Studio parity, four viewport modes, public optional omission,
native keyboard focus, constrained-host and extreme-reflow probes,
localized/extreme RTL content, isolated 200% zoom, light/dark contrast, forced
colors, reduced motion, deterministic gzip, global refinement audit, temporary
site build outside `site/dist`, diff checks, console cleanliness and explicit
`site/dist` cleanliness comprise Batch 40. `site/dist` is not rebuilt or
modified.
