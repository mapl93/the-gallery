# Edition / Numbering Web Refinement Audit

Date: 2026-08-11

Batch: 119

Component: R10 `edition-badge`

Status: ready for explicit human stability review; remains `pilot`

## Outcome

Edition / Numbering is now a passive target-formatted edition statement with an
optional designation, impression or piece identifier, and edition-size value.
It does not define or validate an edition record and does not claim warning,
scarcity, availability, inventory, verification, authenticity or provenance.

Neutral Web uses visible native paragraph content without ARIA naming. Opaque
strings are direction-isolated, blank parts omit, all-blank content fails
closed, and the slash remains exposed only when it communicates a present
number/total relationship.

Owner decision 64 accepts this `R10-A` boundary and confirms that R10 remains
separate from canonical Badge. Exhibit and Studio consume one renderer and
fixture. Canonical CSS owns logical
geometry, complete typography, wrapping and statement emphasis; R10 has no
focus, interaction, event, live region or neutral runtime. Record ownership,
proof taxonomy, numeric rules, localization, Shopify, final visuals,
component-specific Figma evidence and explicit human review remain open target
or human gates. The contract stays `pilot`.

## Certification Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive target-formatted statement only; no record, inventory or authenticity protocol. |
| Anatomy and omission | pass | Optional label/number/total; private count group; conditional slash; all-blank root omission. |
| Semantics | pass | Native `P`, visible content, no role or prohibited ARIA name. |
| Accessibility | pass | Exposed meaningful slash, `BDI[dir="auto"]`, zero focus/live behavior, AA contrast and forced-color boundary. |
| Responsive/content resilience | pass | Eight natural captures, four direct widths, partial states, Arabic/mixed direction, unbroken content, effective 200% zoom and text spacing. |
| Runtime/performance | pass for R10/Ceramics | Zero R10 neutral runtime; current Ceramics CSS retains `78 B` gzip headroom. |
| Exhibit/Studio parity | pass | Shared renderer/fixture and exact normalized DOM/internal-style hashes. |
| Targets | Web implemented; others bounded | Web/Webflow/Shopify CSS projections validate; no target data model or Liquid markup invented. |
| Human review | pending | Decision 64 resolves the neutral boundary; record policy, Shopify, Figma, final visuals and explicit stability approval remain target/human gates. |

## Anatomy, API And Ownership

The `0.3.0` pilot contract retains four semantic properties:

| Property | Requirement | Meaning |
| --- | --- | --- |
| `variant` | optional; `default` | Neutral or limited statement-surface emphasis; not feedback status. |
| `label` | optional string | Complete target-authored edition or proof designation. |
| `number` | optional string | Opaque target-formatted impression or piece identifier. |
| `total` | optional string | Opaque target-formatted edition-size value; not inventory. |

The renderer trims all strings. When every content value is blank, it returns no
root. Label omits independently. A private count wrapper exists only when number
or total is present; the slash exists only when both values are present. No
placeholder, translated connective copy, proof classification, numeric parser,
comparison or formatter is synthesized.

R10 exposes no proof enum, edition record, inventory, authenticity, verified,
availability, urgency, locale, numbering algorithm, numeric min/max, surface,
measure, alignment, density, border, spacing, typography, semantic-root selector,
accessible label or live status property. Those choices are private composition
or target/domain ownership.

## Semantics And Accessible Content

The verified neutral root is `P.edition-badge` with no `role`, `aria-label`,
`aria-labelledby` or `tabindex`. It creates zero focusable, live-region or
script descendants. The accessibility snapshot exposes the visible fixture as
`Limited edition 42 / 100`.

Label, number and total are native `BDI` elements with `dir="auto"`. This
isolates opaque target strings without imposing one direction on the complete
statement. Arabic designation and impression text resolve RTL; the digits-only
total resolves according to its own weak/number content while source order and
slash placement remain stable.

The slash is ordinary visible text rather than `aria-hidden`. In this anatomy it
is the only relation signal between number and total, so hiding it would remove
meaning. It omits when either side is absent.

R10 does not use `role="status"`, warning semantics or hidden English copy. A
target that updates edition data dynamically must own the larger announcement
policy rather than making every static R10 instance live.

## State, Variant, Size And Mode Matrix

| Dimension | Verified result |
| --- | --- |
| Default | Transparent neutral passive statement. |
| Limited | Existing statement surface; no warning/verification semantics. |
| Full | Label plus number, exposed slash and total. |
| Label only | One valid designation; count and slash absent. |
| Number only | One opaque identifier; total and slash absent. |
| Total only | One opaque edition-size value; number and slash absent. |
| Number + total | One exposed slash; no inferred label. |
| All blank | Complete root omitted. |
| Narrow/wide | Intrinsic wrap from actual component width; no viewport mode API. |
| LTR/RTL/mixed strings | Per-string automatic direction; logical source order retained. |
| Light/dark/forced colors | Semantic statement surface/text plus visible system boundary. |
| Reduced motion | Zero active R10 motion. |
| Hover/focus/selected/live | Intentionally absent; R10 is passive. |
| Controlled/uncontrolled | Not applicable to passive target strings. |

## Accessibility

The former `p[aria-label]` and generated `piece N of T` string are removed.
Visible target-authored text is now the only content source, preventing an
invalid paragraph name and hidden English/localization drift.

Measured text contrast on the limited surface:

| Content | Light | Dark |
| --- | ---: | ---: |
| Designation | `7.36:1` | `4.93:1` |
| Number | `16.89:1` | `7.00:1` |
| Total | `7.36:1` | `4.93:1` |

Forced colors maps the surface to system Canvas, keeps a one-pixel CanvasText
boundary and maps all four visible text parts to CanvasText. Reduced-motion
inspection finds zero component parts with an active animation or transition.

No keyboard model applies. The R10 root and descendants create no tab stop,
button, link, input, selection, press state, tooltip, disclosure or pointer-only
affordance.

## Responsive And Extreme Content

Natural Mobile, Tablet, Desktop and XL captures pass in Exhibit and Studio. The
same responsive token modes produce identical dimensions between hosts:

| Natural mode | Root size | Root/part/document overflow |
| --- | --- | ---: |
| Mobile / Tablet | `225.84 × 42.97px` | `0 / 0 / 0` |
| Desktop / XL | `243.20 × 48.31px` | `0 / 0 / 0` |

Direct constrained roots prove intrinsic wrapping:

| Direct root | Height | Root/part overflow |
| ---: | ---: | ---: |
| `120px` | `90.97px` | `0 / 0` |
| `160px` | `74.97px` | `0 / 0` |
| `240px` | `74.97px` | `0 / 0` |
| `360px` | `48.31px` | `0 / 0` |

Arabic designation/impression/total content at `180px`, deliberately unbroken
designation and identifiers at `140px`, label-only composition, effective 200%
component zoom and user text spacing all retain zero root and visible-part
overflow. The 200% probe scales the complete component to `451.75 × 83.97px`;
the host docs shell is outside the R10 containment assertion.

No content is clipped or truncated. The extreme unbroken fixture grows in block
size rather than escaping its requested inline size.

## Tokens, CSS And Canonical Composition

R10 consumes existing default border, statement surface, primary/secondary
text, heading/body families, semantic weights, body/caption sizes and line
heights, layout spacing and medium-radius tokens.

Compact gap, block/inline padding and label tracking are private `--_edition-*`
composition variables. The source uses logical dimensions/padding,
`min-inline-size: 0`, `max-inline-size: 100%`, margin reset, complete font
shorthands, tabular numeral presentation and `overflow-wrap: anywhere`.

The limited variant no longer consumes `--color-feedback-warning-default` or a
runtime `color-mix`; it uses `--color-surface-statement`. The default border
remains semantically neutral because the visible label/record, not border color,
communicates the edition designation.

R10 does not compose canonical Badge. Badge is a short status/classification
primitive using feedback variants, while R10 is one structured designation and
number/total statement. This avoids splitting accessible content or assigning a
false feedback tone. A future separately rendered Badge designation remains an
explicit owner architecture/visual alternative.

React types and fixture data remain inside the docs consumer. Target-agnostic
CSS and contract do not depend on React, Shopify, Figma, Lucide or another
target.

## Exhibit And Studio Parity

`EditionBadgeArtwork` and `buildEditionBadgeFixture` are the sole registered
interactive Exhibit/Studio path. Eight paired natural captures contain the same
fixture, optional anatomy and zero overflow.

At normalized `280px` with the same public tokens, both modes produce:

- DOM hash `333b2896`;
- internal style hash `de566840`;
- zero root and descendant overflow.

The hashes cover root/label/count/number/separator/total tags, classes, roles,
ARIA visibility, directions, text and computed display, dimensions, wrapping,
alignment, gaps, margins, padding, borders, colors, surfaces, typography,
tracking and numeric variants. No host-value exclusion was needed.

Studio's site-only frame centers the artwork and supplies preview whitespace;
it does not set R10 width, type, color, border, radius or behavior. The MDX
fallback mirrors the same native structure for static audit only.

## Cross-Target Translation

| Target | Result / boundary |
| --- | --- |
| Neutral Web | Implemented native passive paragraph, strict omission, visible slash, direction isolation, logical CSS and no R10 JavaScript. |
| Shopify Storefront | CSS projection validates. Choose approved metafield/metaobject definitions or another record before mapping; inventory/variant count is not inferred. |
| Shopify Admin | A target may use Polaris Badge for an actual system classification, but limited-edition metadata is not a warning by default. |
| Webflow | Source-identical Ceramics CSS; CMS owns complete designation/identifier/size strings. |
| React/Angular | Thin variant/string projection with no formatter or state machine. |
| Schema.org | Target may map independently trustworthy edition size to `artEdition`; impression identity remains separate. |
| Figma | Future component models variants, all partial states, narrow/wide, long/localized/mixed-direction content and semantic annotations; generic nodes are not approval. |
| SwiftUI/Compose/future | Native passive text grouping with independently isolated opaque values and the same visible accessibility content. |

No Liquid snippet, metafield definition, metaobject schema, inventory mapping,
editor validation, proof taxonomy or product/work relationship was invented.

## Automated And Browser Verification

Final browser evidence covers default/limited mapping, all partial and blank
states, native semantics, prohibited-name removal, visible slash, direction
isolation, zero focus/live/runtime descendants, four paired natural viewports,
direct intrinsic widths, localized Arabic/mixed direction, unbroken content,
effective 200% zoom, user spacing, light/dark contrast, forced colors, reduced
motion and exact normalized parity. Console issues and page errors are empty.

The evidence lives under `output/playwright/refinement-batch-119/`: four
preserved before captures, eight natural after captures, six special captures,
the executable CLI runner, raw results and `evidence-summary.json`. Visual
inspection confirmed the compact light/dark statement, narrow wrapping, Arabic
source order, 200% scaling and label-only composition.

The final successful phase used one fixed-port managed server, named Playwright
session `gallery-refinement`, one headless browser and one page. The session
closed before reporting; cleanup confirms the URL is unresponsive, port `4173`
is free, the managed server is stopped and the evidence resource gate is clean.

No command wrote `site/dist`.

Final structural/build gates include:

- `npm run validate:contracts` (`183` contracts)
- `npm run validate:studio` (`183` definitions, `901` semantic properties,
  `1,614` public-token references and `30` icon choices)
- `npm run validate:docs` (`183` registry components and MDX pages)
- `npm run audit:previews:static` (`251` previews, zero errors)
- `npm run build:components`
- `npm run build:adapter:web:components` and validation (`183` components,
  `19` CSS sources)
- `npm run build:adapter:shopify:components` and validation (`183` components,
  `83` target-ready; known maturity warnings only)
- production Vite build outside `site/dist` (`2,482` modules)
- `npm run audit:exhibit-studio` (`183/183` shared paths; `132` interaction
  reviewed plus `51` not applicable)
- `npm run audit:components` (`183/183` automated passes)
- `npm run audit:refinement` (`174/183` dossiers, `116/183` ready for human
  stability review after R10, `165` dependency edges)
- source-identical Webflow and Shopify Ceramics CSS projections
- JSON parse, `git diff --check`, evidence cleanup and clean-resource gate

## Performance Budget

The R10 slice moved from `1,030 B` raw / `474 B` gzip to `2,133 B` raw /
`671 B` gzip while moving semantic omission, accessible visible content,
direction isolation, complete typography, logical geometry, partial-state
resilience and forced-color treatment into canonical source.

The current family includes later reviewed siblings but preserves this exact R10
slice. Ceramics CSS is `36,926 B` raw / `5,349 B` gzip, leaving `78 B` under its
`5,427 B` ceiling. Neutral Web component CSS is `540,168 B` raw / `72,664 B`
gzip; its global overage remains documented by the performance audit.

Shared runtime is currently `117,741 B` raw / `22,807 B` gzip, a separately
documented global overage. R10 itself adds zero neutral JavaScript, requests,
assets, listeners, observers, measurements or timers.

Source hashes:

- R10 slice: `244e468e41bb7038be0fb1956428dbdb912e98729ebf33a741604abfeb2b4ea5`
- current Ceramics CSS: `6b3873a612539f5c51637cbe01d39623cfba3b6f78981d15bde20e2dff4b7a3c`
- current Neutral Web components: `b10030e3339521a4966a7d8312052ede3d5c9cef2bd4f7908b39eeffb79df697`

## Risks And Required Human Decisions

1. Approve the record owner for edition designation, edition number/name,
   impression or piece identifier, edition size, state/proof type, localization,
   revisions and product/work relationships.
2. Define what `number` and `total` mean and how announced edition size,
   produced count, saleable inventory and proof/catalog notation stay distinct.
3. Decide whether v1 supports artist's proofs, printer's proofs, hors commerce,
   trial proofs, open/unlimited editions, Roman numerals, ranges or unnumbered
   works.
4. Approve any universal numeric invariants; otherwise retain opaque strings for
   valid non-numeric proof/catalog notation.
5. Choose the layer that owns complete localized designations and abbreviations.
6. Preserve the accepted integrated statement; treat any future separately
   composed canonical Badge as external target composition.
7. Select the first Shopify consumer and approved custom-data definitions,
   validation, editor behavior and product/work relationships.
8. Approve the statement surface, dark orange intensity, neutral border, radius,
   uppercase tracking, serif number hierarchy, density and wrapping.
9. Supply or approve R10-specific Figma/reference evidence across partial,
   localized, narrow/wide and color modes.
10. Perform explicit human stability review. Automated completion does not
    promote R10 from `pilot` to `stable`.

## Readiness Decision

`human-review-ready`.

Owner decision 64 resolves the neutral component direction. Domain records,
proof/localization policy, Shopify mapping, final visual identity and explicit
human approval remain pending, so no `stable` promotion is authorized.
