# Component Dossier: Maker's Mark

Status: `human-review-ready`

Date: 2026-08-11

Registry: `R9` / `makers-mark`

Dependency order: 134, phase 6 (Composed components), dependency `link`

## Recommendation

Keep Maker's Mark as a maker-attribution group with one required visible maker
identity, optional stamp, optional studio context, optional target-formatted year
wording, and one optional canonical Link on the complete visible identity.

The root remains generic and non-landmark by default. A host may choose `aside`,
`article`, `section`, `address`, or another element only when surrounding
document semantics justify it. The optional profile destination never turns the
stamp or whole surface into an activation target; without a non-empty destination
the same identity remains ordinary text.

The stamp accepts target-owned native image, graphic, or text markup. Informative
marks require an equivalent alternative; marks that repeat the adjacent visible
identity are decorative. The component does not force Avatar or Badge and never
uses its visual treatment as evidence of authorship, manufacture, verification,
authenticity, certification, ownership, or provenance.

Expose only `artist`, `href`, `stamp`, `studio`, and `year`. Keep measure, stamp
geometry, shape, crop, orientation, alignment threshold, surface, density,
spacing, and type hierarchy private. The target owns records, rights,
relationships, localization, profile lifecycle, and any substantiated claims.

## Owner Decision

Decision 63 accepts the passive attribution boundary and adds one optional
canonical Link on the complete visible identity when a real target-owned maker
profile destination exists. Stamp, studio, year, and root remain passive.

ADR 0209 records the decision. No additional product or architecture assumption
is required for the neutral candidate.

## Purpose, Use Cases, And Limits

- Identify the maker associated with nearby work through complete visible text.
- Optionally support identity with a stamp, studio context, or formatted year.
- Optionally navigate the maker name to a real target-owned profile.
- Omit the complete component when the required identity is blank.
- Do not define a maker, studio, vendor, product, edition, certificate, rights,
  authenticity, or provenance record.
- Do not make the stamp or whole bordered surface clickable.
- Do not load, verify, mutate, announce, or persist profile data.
- Do not parse target-formatted studio/year strings or infer their meaning.

## Research

| Source | Evidence | Gallery direction |
| --- | --- | --- |
| [WHATWG `aside`](https://html.spec.whatwg.org/dev/sections.html#the-aside-element) | `aside` is tangential content separable from its surroundings. | Do not force a complementary region for every compact attribution. |
| [WAI landmark practices](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) | Landmarks should represent real page structure and lose value when overused. | Use a generic neutral root and let the host choose contextual semantics. |
| [WHATWG `cite`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-cite-element) | `cite` represents a work title, not a person's name. | Render the maker name as ordinary visible text or native Link. |
| [WHATWG `address`](https://html.spec.whatwg.org/#the-address-element) | `address` is contact information for the nearest article or body. | Studio/year wording does not justify `address`. |
| [WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/) | Informative images need equivalents; decorative duplicates need null alternatives. | The target owns stamp alternatives; the MG fixture is hidden beside the full name. |
| [Radix Avatar](https://www.radix-ui.com/primitives/docs/components/avatar) | Avatar is a profile image/fallback primitive. | A stamp may be an emboss, monogram, logo, signature, or irregular mark and is not forced into Avatar. |
| [Polaris Avatar](https://polaris-react.shopify.com/components/images-and-icons/avatar) | Polaris Avatar represents an individual or business thumbnail. | Shopify Admin may compose Avatar for an approved record, but R9 remains stamp-agnostic. |
| [Shopify product vendor](https://shopify.dev/docs/api/liquid/objects/product#product-vendor) | Product exposes one vendor string. | Do not equate vendor with a reviewed maker profile or provenance record. |
| [Shopify metaobjects](https://shopify.dev/docs/apps/build/metaobjects) | Metaobjects can model reusable structured content. | A future approved maker record can map through a target adapter without entering neutral presentation. |
| [Open UI matrix](https://open-ui.org/research/component-matrix/) | No interoperable maker-mark widget pattern exists. | Prefer native text, image, and Link semantics over invented ARIA behavior. |

WAI-ARIA APG has no Maker's Mark widget. Native document and Link semantics are
sufficient; no custom keyboard model applies.

## Coincidences, Differences, And Direction

### Coincidences

- Repository policy, HTML, and WAI guidance agree that attribution is document
  content and presentation alone cannot prove authenticity.
- Mature Avatar/Badge APIs reinforce that stamp identity and status are separate
  concepts.
- Shopify evidence confirms that record ownership and product relationships are
  target concerns, not neutral visual API.

### Resolved differences

- The former unconditional `aside[aria-label]` is now a generic root.
- The duplicate MG fixture image role is removed and the mark is assistive-hidden.
- Required identity now fails closed; optional parts omit without empty wrappers.
- Opaque strings use automatic direction and complete wrapping.
- One shared renderer/fixture replaces Exhibit/Studio duplication.
- Canonical CSS owns logical geometry and component-width response.
- Decision 63 adds the canonical Link dependency without making the component a
  whole-surface link.

## Anatomy

| Part | Required | Semantic form | Owner |
| --- | --- | --- | --- |
| Root | yes when artist exists | generic `.makers-mark` container | R9/host |
| Stamp | no | `.makers-mark__stamp` target slot | target content; R9 containment |
| Info | yes | `.makers-mark__info` group | R9 |
| Artist | yes, non-empty | visible `p.makers-mark__artist` | target content |
| Artist Link | no | native canonical `a.link.makers-mark__artist-link` | Link + target destination |
| Studio | no | visible `p.makers-mark__studio` | target content |
| Year | no | visible `p.makers-mark__year` | target content |

## Public API

| Property | Type | Requirement | Behavior |
| --- | --- | --- | --- |
| `artist` | string | required, non-empty | Complete visible identity; blank omits the root. |
| `href` | string | optional | Wraps the complete artist identity in canonical Link; blank leaves text. |
| `stamp` | slot | optional | Target-owned passive mark with contextual alternative. |
| `studio` | string | optional | Complete opaque target-formatted context. |
| `year` | string | optional | Complete opaque target-formatted wording. |

R9 owns no custom events. Link activation and navigation are native/canonical.
Controlled/uncontrolled state is not applicable: the target supplies immutable
render inputs and owns navigation/profile lifecycle.

## State, Variant, Size, And Mode Matrix

| Dimension | Verified result |
| --- | --- |
| Default | Passive visible attribution. |
| Linked | One canonical Link on the complete maker identity. |
| Missing href | Same complete identity remains ordinary text and leaves tab order. |
| Missing artist | Complete root omitted. |
| Missing stamp/studio/year | Each optional part omits independently. |
| Informative stamp | Target uses native image/graphic semantics with an equivalent alternative. |
| Decorative stamp | Target uses null alternative or assistive hiding. |
| Narrow/wide | Component width changes private stamp alignment; no public mode. |
| Light/dark | Existing semantic tokens preserve AA text/link contrast. |
| Forced colors | Surface, stamp boundary, Link color, and focus outline remain visible. |
| Reduced motion | No active R9 animation or transition. |
| LTR/RTL/localized | Logical geometry and `dir="auto"` preserve complete content. |
| Selected/verified/loading/error | Not R9 states. |

## Tokens And CSS Audit

Public semantic tokens cover subtle border, primary/secondary/link text,
heading/body typography, semantic weights, layout spacing, and medium radius.
The `26.25rem` measure, `3rem` stamp wrapper, compact gaps, and alignment
threshold remain private `--_` composition values.

Source CSS uses logical dimensions, logical margins, `min-inline-size: 0`,
complete font shorthands, deterministic paragraph resets,
`overflow-wrap: anywhere`, and an inline-size container. The only Link-specific
rule is `font: inherit`; canonical Link owns decoration, color, focus, and native
activation.

R9 CSS is `2,025 B` raw / `647 B` gzip level 9 with SHA-256
`9fdc6a4d7d8069a8b547fb8f44254de42193b2d3935f516fb37db3c64efcc9b6`.
Ceramics CSS is `5,349 B` gzip against its fixed `5,427 B` ceiling, leaving
`78 B`. R9 owns zero neutral runtime; shared runtime remains a separately
documented global overage rather than an R9 cost.

## Responsive And Extreme Content

Eight natural captures cover Exhibit and Studio at Mobile, Tablet, Desktop, and
XL with zero root/document overflow. Direct roots at `160`, `240`, `320`, and
`420px` also retain zero overflow. Localized RTL content, effective 200% text,
and user text spacing remain complete without clipping or runtime measurement.

The component responds to its own container, not the viewport. Stamp alignment
changes privately at the existing component threshold; source order is stable.

## Accessibility And Interaction Evidence

- Root is a generic `DIV` without role, accessible name, `tabindex`, or landmark.
- Visible artist, studio, and year remain the identity source with `dir="auto"`.
- The fixture stamp is `aria-hidden="true"` because it repeats Maria Garcia.
- Exactly one focusable exists when `href` is present; zero exist when it is blank.
- Enter activates the native Link exactly once and focus remains visible.
- There are no live regions, component scripts, custom key handlers, or hidden
  verification semantics.
- Measured Link contrast is `5.88:1` light and `9.95:1` dark; secondary text is
  `7.81:1` light and `12.09:1` dark.
- Forced colors exposes a system focus outline and visible boundaries.
- Reduced motion finds zero active component parts.

## Exhibit And Studio Parity

`MakersMarkArtwork`, `buildMakersMarkFixture`, and
`MakersMarkFixtureStamp` are the sole registered path. Both modes use the same
fixture, renderer, canonical CSS, and optional Link behavior.

At normalized `420px`:

- DOM hash: `b46b7e17` in both modes;
- internal style hash: `a7ca058e` in both modes;
- focusables: one canonical Link in both modes;
- root overflow: zero in both modes.

## Cross-Target Translation

| Target | Translation / boundary |
| --- | --- |
| Neutral Web | Generic group, strict omission, native optional Link, contextual stamp semantics, zero R9 JavaScript. |
| Shopify Storefront | Map an approved maker source only after product relationships, rights, localization, and destination rules exist. |
| Shopify Admin | May compose Polaris Avatar for an approved profile thumbnail; that does not redefine the stamp slot. |
| Webflow | Map CMS strings/media and native Link; preserve generic root and target-owned alternatives. |
| React/Angular | Thin string/slot projection; host chooses contextual root and owns routing destination. |
| Figma | Model optional stamp/link/studio/year and narrow/wide/long/RTL states; Figma remains a target. |
| SwiftUI/Compose/future | Native passive image/text grouping with one optional platform link on the complete identity. |

No Liquid schema, vendor inference, maker metaobject, authenticity record, or
profile service is invented by the neutral contract.

## Evidence And Validation

Batch 167 records:

- eight paired natural screenshots;
- native Link semantics and Enter activation;
- required-artist and optional-href omission;
- direct intrinsic widths and extreme-content modes;
- light/dark contrast, forced colors, and reduced motion;
- exact normalized Exhibit/Studio parity;
- one tab, no console/page errors, and clean resource shutdown.

Artifacts live in `output/playwright/refinement-batch-167/`. The prior passive
state remains in Batch 118 as before evidence. Contract, Studio, docs, adapter,
component/refinement, JSON, diff, and performance gates are rerun in the batch
report. No command rebuilds `site/dist`.

## Risks And Questions For Human Review

1. Approve final maker/studio/year meanings, record ownership, localization,
   rights, moderation, and product relationships.
2. Decide whether one attribution may represent an individual, collective,
   business, manufacturer, vendor, or multiple makers.
3. Approve stamp types, crop/shape/fallback, rights, dark-mode treatment, and
   informative/decorative policy for real assets.
4. Define the separately substantiated record/protocol for any authenticity,
   authorship, manufacture, certification, or provenance claim.
5. Select the first Shopify consumer and approved data/destination mapping.
6. Approve the quiet bordered surface, stamp scale, alignment threshold,
   hierarchy, density, and R9-specific Figma evidence.
7. Perform explicit human stability review. Automated readiness does not
   authorize promotion from `pilot` to `stable`.

The neutral implementation is complete and prepared for human review without
resolving those target-owned product decisions.
