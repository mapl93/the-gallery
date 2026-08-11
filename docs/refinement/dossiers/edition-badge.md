# Component Dossier: Edition / Numbering

Status: `human-review-ready`

Date: 2026-08-11

Registry: `R10` / `edition-badge`

Dependency order: 135, phase 6 (Composed components), depth 0 before refinement

## Recommendation

Keep R10 as a passive, target-formatted edition statement. It may present an
optional designation, an optional impression/piece number and an optional
edition total, but it must not claim authenticity, provenance, availability,
inventory, uniqueness or scarcity. The visual `limited` treatment is emphasis,
not a warning or verification state.

Retain the current four semantic properties: `variant`, `label`, `number` and
`total`. Treat all three content values as opaque target-formatted strings,
trim them at the renderer boundary, omit empty parts, and omit the complete root
when all content is empty. Do not parse numbers, compare `number <= total`,
derive a label, translate connective wording or infer whether a designation is
an artist proof, printer proof, trial proof, open edition or numbered edition.

Use native visible paragraph content as the accessible representation. Remove
the generated English `aria-label`: WAI-ARIA prohibits naming the paragraph
role, and the hidden string currently replaces localized visible descendants.
Keep the slash exposed when both number and total are shown because it conveys
their relationship rather than decorating an otherwise complete phrase. Use
`bdi` for opaque label/number/total strings so mixed-direction records remain
isolated without changing source order.

Do not automatically compose canonical Badge. Gallery Badge is a short passive
status or classification label using feedback tones; R10 is a structured
edition statement with a label plus an impression/edition relationship. Forcing
Badge would either split one coherent statement or incorrectly make
limited-edition metadata a warning/status. R10 can remain dependency-free
without duplicating Badge behavior. If the owner later wants the designation as
a separately styled canonical Badge, that is an explicit composition and visual
decision rather than an inferred dependency.

Replace the warning tone with the accepted statement surface token. Preserve
the current compact, outlined, orange editorial identity as the visual
candidate while using ordinary border/text tokens and complete typography. Move
all R10 width, wrapping and spacing into canonical CSS; Studio may frame the
preview but must not own a second component width rule.

Extract one `EditionBadgeArtwork` and fixture for Exhibit and Studio, then align
the static MDX fallback. Owner decision 64 accepts this complete `R10-A`
direction: R10 remains separate from canonical Badge, keeps display values
opaque, and performs no parsing or scarcity/authenticity inference. Record
meaning, proof vocabulary, Shopify source, localization policy, final
visual/Figma approval and explicit human review remain target or human gates.

## Owner Decision

Decision 64 confirms one passive edition statement whose complete
target-formatted values remain opaque. R10 does not automatically compose
canonical Badge; any future Badge is explicit external target composition, not
an R10 mode. ADR 0210 records the accepted boundary.

## Current Gallery Result

- `EditionBadgeArtwork` and `buildEditionBadgeFixture` are the sole registered
  Exhibit/Studio implementation and fixture. Label, number and total are
  trimmed and omit independently; all-blank content omits the complete root.
- Neutral Web renders one native `P` with no role, ARIA name, tab stop or live
  region. Label, number and total use `BDI[dir="auto"]`; the slash is present
  only between number and total and remains exposed in the accessibility
  snapshot (`Limited edition 42 / 100`).
- Default and limited variants map deterministically. Limited uses the existing
  statement surface instead of feedback warning and makes no scarcity,
  availability, verification, authenticity or inventory claim.
- Label-only, number-only, total-only and number/total compositions omit unused
  wrappers and separators. Values remain opaque strings; no numeric/domain
  parsing or record inference was introduced.
- R10 remains dependency-free after explicit comparison with canonical Badge
  and owner decision 64:
  it is one structured edition statement rather than a short status label. A
  separate Badge designation remains an owner architecture/visual alternative.
- Canonical CSS owns logical padding, complete body/caption/heading typography,
  wrapping, tabular numerals, statement surface and forced-color treatment.
  Studio now supplies only a framing wrapper, not a competing component width.
- Direct `120/160/240/360px` roots retain zero root/part overflow. Eight paired
  natural viewports, Arabic RTL/mixed-direction values, extreme unbroken
  content, label-only composition, effective 200% zoom and user text spacing
  remain bounded at the component level.
- Minimum measured contrast is `7.36:1` in light mode and `4.93:1` in dark mode.
  Forced colors preserves a one-pixel system boundary and system text colors;
  reduced-motion inspection finds zero active R10 motion.
- At normalized `280px`, Exhibit and Studio produce identical DOM hash
  `333b2896` and internal style hash `de566840`; the evidence session used one
  page and ended with zero console/page errors.
- R10 CSS is `2,133 B` raw / `671 B` gzip. Ceramics CSS is `35,099 B` raw /
  `5,110 B` gzip, leaving `317 B` beneath its `5,427 B` family ceiling. R10 adds
  zero neutral JavaScript and shared runtime remains byte-identical.
- Web, Webflow and Shopify CSS projections are source-aligned. No Liquid
  edition schema, inventory mapping, metafield/metaobject definition or editor
  integration was invented.
- ADR 0210 records the accepted passive statement and record boundary. Data
  meaning, proof taxonomy, localization, Shopify source, final visuals,
  R10-specific Figma evidence and explicit stability review remain open; R10
  stays `pilot` but is ready for explicit human review.

## Purpose And Limits

- Presents compact passive edition metadata beside a work or product.
- May communicate a target-authored designation such as a limited-edition label.
- May communicate an impression/piece identifier and an edition total as
  complete, already formatted strings.
- Supports label-only, number-only, total-only and number/total compositions
  without inventing missing content.
- Does not define an edition, impression, artwork, product, inventory,
  certificate, provenance, rights or authenticity record.
- Does not decide whether `number` means impression sequence, catalog number,
  piece number, state, proof identifier or another target-specific notation.
- Does not decide whether `total` means planned edition size, produced edition
  size, saleable inventory or another quantity.
- Does not parse, validate, sort, increment, reserve, sell or synchronize
  edition values.
- Does not turn limited treatment into urgency, warning, error, verification,
  availability or inventory semantics.
- Does not navigate, disclose, copy, announce changes or own keyboard/focus
  behavior.
- Does not expose padding, gap, measure, typography, border or wrapping as
  semantic public API.

## Accepted Source Facts

- The repository is the source of truth; Figma remains a target and evidence
  source.
- The baseline `0.2.0` pilot contract exposed `variant`, `number`, `total` and
  `label`, declared no dependencies and had no events or controlled state.
- Registry R10 exposes `default` and `limited`; its current description calls it
  a limited-edition badge.
- Exhibit and Studio resolve the same Ceramics family renderer, but R10 is still
  inline in that file and the MDX fallback duplicates its markup.
- All Studio metadata currently points to shared generic Figma nodes
  (`943:7`, `1020:480`), not R10-specific approval evidence.
- Gallery Badge is a separate A7 primitive for short passive status or metadata
  labels and uses feedback variants. R10 has a different structured anatomy.
- The token source already defines semantic statement surface, text and border
  values. The Web compatibility layer exposes `--color-surface-statement` and
  `--color-text-accent`; the canonical border token remains
  `--tg-color-border-statement` rather than a compatibility alias.

## Baseline Implementation Audit

### Contract, DOM And Runtime

- Runtime renders `p.edition-badge[aria-label]`. WAI-ARIA defines paragraph as
  name-prohibited, so `aria-label` is invalid on this root.
- The hidden accessible string is hardcoded English (`piece N of T`) while the
  visible values and label are target-authored. It can mistranslate, change the
  content exposed to assistive technology and obscure visible descendants.
- The slash is `aria-hidden="true"` even though it is the only visible signal
  that the first value is related to the second as numerator/edition size.
- Runtime and MDX duplicate the same invalid naming and hidden-separator
  pattern; there is no isolated shared R10 renderer or fixture.
- Empty strings render no children, but the root remains as an empty bordered
  paragraph with an empty `aria-label`.
- Values are not trimmed and opaque mixed-direction strings receive no
  direction isolation.
- R10 is passive and adds no neutral listener, focus target, event, request,
  timer, observer or script. Controlled/uncontrolled strategy is not applicable.

### CSS And Tokens

- Root hardcodes physical `gap: 8px` and `padding: 8px 14px`; it uses physical
  `max-width` instead of logical geometry and has no explicit margin reset,
  text color, line height or font family.
- Number uses hardcoded weight `600` and incomplete typography. Total and label
  inherit host family/line-height; label derives size with a `0.75` multiplier
  despite existing caption tokens.
- The label's uppercase and letter spacing form a useful editorial hierarchy,
  but the hardcoded tracking should remain private composition and its complete
  font contract should be explicit.
- `limited` uses `--color-feedback-warning-default` for the border and a
  runtime `color-mix`. Polaris reserves warning tones for issues requiring
  attention; a truthful limited-edition designation is not inherently a
  problem.
- Studio applies `width: min(100%, 520px)` and margin, then overrides the same
  selector with `width: fit-content`. This duplicate host rule owns R10 width
  instead of merely framing it.
- The baseline R10 slice is `1,030 B` raw / `474 B` gzip, SHA-256
  `0d124a0bc605fa0549963473881873bd15cf49e1d0546f4f269099172275d908`.
- After R9, Ceramics CSS is `33,996 B` raw / `5,026 B` gzip, leaving `401 B`
  beneath its `5,427 B` family ceiling. Neutral Web component CSS is
  `523,828 B` raw / `70,605 B` gzip. Shared runtime is `53,811 B` raw /
  `10,565 B` gzip.

### Documentation And Fixtures

- Documentation correctly says the component is passive and does not verify
  provenance, scarcity or inventory.
- It incorrectly calls a meaningful slash visual/decorative and recommends
  excluding it from the accessible name created on a name-prohibited role.
- “Piece number” narrows an unresolved domain meaning; museum/cataloguing
  references distinguish impression number, edition number/name and edition
  size.
- The limited `42 / 100` fixture is coherent and useful, but the English label
  and assumed number meaning are fixture content, not component defaults.
- Studio exposes only the four semantic properties, which is appropriately
  bounded, but its appearance group labels the statement tone as warning.

### Baseline Visual Evidence

Four captures under `output/playwright/parity/ceramics/` show:

- `edition-badge-exhibit-mobile.png`
- `edition-badge-exhibit-desktop.png`
- `edition-badge-studio-mobile.png`
- `edition-badge-studio-desktop.png`

The useful identity is a quiet outlined orange statement: small tracked
uppercase designation, emphasized serif number, subordinate slash and total,
compact padding and a medium radius. It reads as editorial artwork metadata
rather than an action, and the fixture is visually coherent in both modes.

The baseline does not prove empty/partial compositions, long or unbroken
content, localized RTL/mixed strings, direct narrow containers, effective 200%
text, user text spacing, dark mode, forced colors, reduced motion or exact
same-width DOM/style parity. It also exposes the warning token as a public
Studio choice even though no warning semantics exist.

## External Research

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA paragraph role](https://www.w3.org/TR/wai-aria/#paragraph) | Paragraph has name from author prohibited. | Remove `aria-label`/`aria-labelledby` from the R10 paragraph and rely on native visible content. |
| [WAI accessible names](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) | Visible text is the preferred name source; `aria-label` is primarily useful when visible text cannot provide a name and can hide descendant content for some roles. | Do not replace localized visible edition content with synthesized English hidden copy. |
| [WHATWG `p`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element) | `p` represents a paragraph of phrasing content. | A passive edition statement is valid native paragraph content without a custom role. |
| [WHATWG `bdi`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-bdi-element) | `bdi` isolates unknown-direction text from its surroundings and defaults to automatic direction. | Isolate opaque label/number/total strings without imposing one root direction. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | Badge converges as a generic component name; no edition/numbering widget consensus appears. | Keep R10's Gallery-specific domain boundary rather than inventing a standardized widget API. |
| [Radix Themes Badge](https://www.radix-ui.com/themes/docs/components/badge) | Badge is a `span` with visual size, color, radius and variant controls used for short labels/status. | Do not copy presentation controls into R10; its structured statement is not automatically canonical Badge. |
| [Polaris Badge](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components/feedback-and-status-indicators/badge) | Badge communicates short status/system classification; warning indicates issues that need attention. | Limited-edition emphasis must not consume the warning feedback family. |
| [Getty CDWA Edition](https://www.getty.edu/publications/categories-description-works-art/categories/object-architecture-group/10/) | Cataloguing separates edition description, edition number/name, impression number and edition size; the full announced edition may not be produced. | Keep display strings opaque and do not equate `total` with inventory or produced count. |
| [MoMA Edition](https://www.moma.org/collection/terms/edition) | Editions may be limited or unlimited and numbered forms are commonly expressed as an impression over a total; proofs are distinct. | Current `42 / 100` is one valid fixture, not a universal data model or proof vocabulary. |
| [Schema.org `artEdition`](https://schema.org/artEdition) | `artEdition` describes the number of copies in the edition. | A future structured-data target may map edition size, but it still needs a separate impression identifier; R10 must not collapse both. |
| [Shopify metafields](https://shopify.dev/docs/apps/build/metafields) | Definitions own custom data type, validation and admin integration. | Edition/proof data needs an approved Shopify definition or other record; presentation must not infer it from inventory/variants. |

WAI-ARIA APG has no edition badge widget pattern. Native text semantics are
sufficient, and no keyboard interaction model applies.

## Coincidences, Differences And Direction

### Coincidences

- Repository intent, HTML and WAI agree that R10 is passive readable content.
- Existing visual anatomy and cataloguing references agree that a designation,
  impression identifier and edition size can form one compact statement.
- Current contract and mature Badge systems agree that visual variants should
  remain bounded; neither supports turning every composition detail into API.
- Repository target boundaries and Shopify custom-data guidance agree that the
  record/schema must be explicit rather than inferred from the surface.

### Differences Or Gaps

- Current native paragraph is named despite name prohibition and hides a
  meaningful separator.
- Hidden English copy diverges from visible target-formatted content.
- Empty/blank content leaves a shell and mixed-direction strings are not
  isolated.
- Runtime and fallback duplicate markup; no R10-specific renderer/fixture exists.
- Warning tokens imply a feedback meaning that the component explicitly denies.
- Canonical CSS and Studio split width/geometry ownership.
- Contract terminology and docs imply “piece number” without resolving the
  target record.

### Recommended Direction

- Extract `EditionBadgeArtwork` and one fixture; use one registered
  Exhibit/Studio path and align the static fallback.
- Trim all content; omit blank parts and fail closed when label, number and
  total are all absent.
- Use `p.edition-badge` with no role, ARIA naming, live semantics or focus.
- Render target strings in `bdi` elements. Add the slash only when both number
  and total exist, and keep it exposed as meaningful text.
- Preserve opaque string properties and document target ownership instead of
  adding parsing, range validation, localization or proof enums.
- Use statement surface plus ordinary border/text tokens for `limited`; remove
  warning feedback semantics and `color-mix`.
- Move logical geometry, full typography, wrapping and partial-content rhythm
  into canonical R10 CSS. Remove R10-specific Studio width duplication.
- Keep no Badge dependency unless the owner explicitly chooses a separately
  composed designation label after human visual/architecture review.

## Proposed Anatomy

| Part | Required | Semantic form | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes when any content exists | `p.edition-badge` | R10 | Passive paragraph; omitted when all content is blank. |
| Label | optional | `bdi.edition-badge__label` | target/R10 | Complete target-authored designation; no generated translation. |
| Count group | optional when number or total exists | `span.edition-badge__count` | R10 | Private structural grouping for coherent wrapping; not public API. |
| Number | optional | `bdi.edition-badge__number` | target | Opaque impression/piece identifier; no numeric parsing. |
| Separator | conditional | `span.edition-badge__separator` | R10 | Rendered and exposed only when both number and total exist. |
| Total | optional | `bdi.edition-badge__total` | target | Opaque edition-size text; not inventory. |

The count wrapper is implementation anatomy, not a new semantic property. The
contract continues to expose the four consumer decisions only.

## State, Variant, Size And Mode Matrix

| Dimension | Safe scope |
| --- | --- |
| Default | Passive neutral edition statement. |
| Limited | Statement-surface emphasis; visible content must communicate the designation. |
| Label + number + total | Complete compact statement with exposed slash. |
| Label only | Valid designation statement; no empty count wrapper. |
| Number only | Valid opaque identifier; no separator/total placeholder. |
| Total only | Valid target-formatted value; no inferred number or separator. |
| Number + total | Count relationship remains exposed without requiring a label. |
| All content blank | Omit complete root. |
| Narrow/wide | Intrinsic flex/grid wrapping based on component width; no viewport mode. |
| LTR/RTL/mixed strings | Logical geometry and `bdi` isolation; source order unchanged. |
| Light/dark/forced colors | Semantic surface, border and text remain visible. |
| Reduced motion | R10 owns no motion. |
| Hover/focus/selected/live | Unsupported; R10 is passive. |
| Controlled/uncontrolled | Not applicable; target supplies immutable render values. |

## Public API Direction

Retain only:

| Property | Type | Requirement | Meaning |
| --- | --- | --- | --- |
| `variant` | `default | limited` | optional, default `default` | Selects neutral or statement emphasis; not feedback status. |
| `label` | string | optional | Complete target-authored edition/proof designation. |
| `number` | string | optional | Opaque target-formatted impression/piece identifier. |
| `total` | string | optional | Opaque target-formatted edition-size value. |

Do not add proof type enums, edition record, inventory, authenticity, verified,
availability, urgency, locale, formatter, parser, numbering algorithm, numeric
min/max, surface color, border, radius, padding, gap, measure, alignment,
wrapping, typography, root role, accessible label or live status as R10
properties.

R10 owns no events, controlled value, focus movement, keyboard model, request,
timer, observer, persistence or neutral JavaScript.

## Token And CSS Direction

- Use existing default border, primary/secondary text, statement surface,
  heading/body/caption typography and medium-radius tokens.
- Use complete font shorthands including family, weight, size and line-height.
- Keep compact inline/block padding, gap, letter spacing and private measure as
  `--_edition-*` composition variables rather than public properties/tokens.
- Reset paragraph margin; use logical dimensions, padding and alignment.
- Group count parts so the slash does not strand on a separate line from both
  values. Allow the label and count group to wrap as complete units while each
  opaque value can break safely under extreme content.
- Use `min-inline-size: 0`, `max-inline-size: 100%` and `overflow-wrap: anywhere`.
- Remove runtime `color-mix`, warning border and Studio-owned R10 width rules.
- Add no transition, transform, cursor, hover, focus, selected, verification or
  loading style.

## Target Translation

| Target | Direction |
| --- | --- |
| Neutral Web | Native passive paragraph with visible isolated strings, conditional slash, strict empty omission, logical CSS and zero R10 JavaScript. |
| Shopify Storefront | Planned. Use approved product metafields/metaobjects or another explicit record; do not infer edition from variant or inventory counts. |
| Shopify Admin | If presented as system classification, Polaris Badge may be used by that target, but a warning tone remains inappropriate absent an issue. |
| Webflow | CMS supplies complete designation/number/total strings; canonical CSS projection remains source-identical. |
| React/Angular | Thin string/variant projection with no hidden formatter or state machine. |
| Figma | Future component models default/limited, partial anatomy, long/localized/mixed-direction content and narrow/wide wrapping; generic current nodes are not approval. |
| Schema.org | A target may map separately trustworthy edition size to `artEdition`; impression identity remains a distinct target field. |
| SwiftUI/Compose/future | Passive native text grouping; isolate mixed-direction target content and expose the same visible statement to accessibility. |

## Exhibit And Studio Parity Direction

- `EditionBadgeArtwork` will own the registered R10 markup and omission rules.
- `buildEditionBadgeFixture` will supply the single shared `Limited edition`,
  `42`, `100` example without defining component defaults.
- Ceramics Studio will pass inspector values into that renderer and will not
  synthesize accessible English copy.
- Exhibit will resolve the same registered renderer and fixture.
- Static MDX fallback will mirror the same native structure for audit/fallback
  only.
- Site CSS may position the preview stage, but it will not set a second R10
  component width, typography, border, color or wrapping contract.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| `aria-label` on name-prohibited paragraph | high | Remove; use visible native content. | implementation |
| Meaningful slash hidden from accessibility | high | Keep exposed when both values exist. | implementation |
| Warning token misrepresents limited edition | high | Use statement surface without feedback semantics. | implementation |
| Empty content leaves bordered paragraph | medium | Trim and fail closed when all parts are blank. | implementation |
| Exhibit/Studio markup not isolated | medium | Extract one renderer and fixture. | implementation |
| Physical/hardcoded/incomplete CSS | medium | Logical private composition plus complete tokens. | implementation |
| Number/total domain meanings unresolved | high | Keep opaque; approve source schema separately. | owner/target architecture |
| Canonical Badge composition unresolved | medium | Remain dependency-free; offer explicit separate-label alternative. | owner/architecture/visual |
| Shopify data source absent | high | Keep adapter planned until schema/integration is approved. | owner/commerce architecture |
| Final identity lacks R10-specific Figma evidence | high | Prepare evidence; require explicit human visual review. | owner |

## Evidence And Validation Result

- Four Desktop/Mobile baseline captures are preserved under
  `output/playwright/refinement-batch-119/before/`.
- Eight paired Exhibit/Studio Mobile, Tablet, Desktop and XL captures plus six
  special-mode captures are preserved under the batch `after/` directory.
- The native paragraph, prohibited-name removal, visible slash, direction
  isolation, zero focus/live/script behavior and strict all-blank omission pass.
- Default/limited plus label-only, number-only, total-only, number/total and full
  compositions pass without inferred text or empty anatomy.
- Direct `120/160/240/360px` roots, unbroken content, localized Arabic, mixed
  direction, effective 200% component zoom and user spacing have zero root/part
  overflow. Natural viewports also have zero document overflow.
- Light/dark contrast, forced-color boundary/text and reduced-motion assertions
  pass. Exact `280px` Exhibit/Studio DOM and internal computed-style hashes
  match.
- Contract, registry, Studio, docs, static previews, generated Web/Shopify
  adapters, source-identical target CSS and production Vite build outside
  `site/dist` pass. Parity reports `183/183` shared paths, the component audit
  reports `183/183` automated passes, and refinement reports `174` dossiers,
  `116` human-review-ready candidates and `165` dependency edges.
- Browser lifecycle used fixed port `4173`, named session
  `gallery-refinement`, one browser and one page. Cleanup leaves the URL
  unresponsive, the port free, the managed server stopped and the session
  closed.

## Risks And Open Questions

1. Which record owns edition designation, edition number/name, impression/piece
   identifier, edition size, state/proof type, localization and revisions?
2. What exactly does `number` mean for R10: impression sequence, piece number,
   catalog identifier, proof notation or another target-formatted value?
3. What exactly does `total` mean: announced edition size, produced size,
   available quantity or another value? It must not silently become inventory.
4. Must v1 support artist's proofs, printer's proofs, hors commerce, trial
   proofs, open/unlimited editions, Roman numerals, ranges or unnumbered works?
5. Are any numeric constraints universal enough to become contract validation,
   or must values remain opaque because proof/catalog notation is not numeric?
6. Which layer localizes complete designation wording and abbreviations while
   preserving truthful record meaning?
7. Keep the designation integrated in R10. If a target later composes a separate
   canonical Badge, document it as external target composition without adding
   an R10 mode or feedback meaning.
8. Which Shopify consumer comes first, and which approved metafield/metaobject
   definitions, validations, editor states and product relationships supply it?
9. Is the compact orange statement surface, radius, uppercase tracking, serif
   number hierarchy, spacing and wrap behavior visually approved, and where is
   R10-specific Figma evidence for partial/extreme content and modes?
10. Perform explicit human stability review; automated completion cannot
    promote R10 from `pilot` to `stable`.

The safe implementation is complete without choosing a record schema, proof
taxonomy or Shopify mapping: invalid ARIA, hidden meaning, warning semantics,
empty shells, duplicated renderer markup and split layout ownership are
corrected while target-owned questions remain explicit. Owner decision 64 makes
R10 `human-review-ready`; automated readiness does not promote it to `stable`.
