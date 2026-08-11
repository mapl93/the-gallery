# Technique Explainer Web Refinement Audit

Date: 2026-08-11

Batch: 161

Component: R3 `technique-explainer`

Status: ready for explicit human review; remains `pilot`

## Outcome

Technique Explainer now implements owner decision 57 as one passive,
target-owned, meaningful ordered explanation. Every valid step has the stable
required `name` and `description` core and may compose optional reviewed
`details` and contextual `media`. The details slot does not create universal
materials, duration, temperature, tools or safety fields.

Exhibit and Studio consume one renderer, fixture and canonical implementation.
The root uses conditional native section semantics, the sequence is native
`ol > li`, canonical CSS responds to the actual container, neutral runtime is
zero, and final Mobile, Tablet, Desktop, XL and special-mode evidence passes.

R3 owns no current/completed state, progress, navigation, disclosure, workflow,
focus model, persistence, service or factual/editorial authority. Safety
warnings and precautions use separately reviewed rich content or canonical
Alert composition, never arbitrary untyped details. No `stable` promotion is
authorized without explicit human review.

## Certification Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive meaningful explanation only; not Progress, Steps workflow, Carousel, navigation, schema or service. |
| Anatomy and composition | pass | Conditional section/div, direct native `ol > li`, stable text core, optional target-composed details/media. |
| Required/optional content | pass | Empty required sequence omits R3; title, details and media omit independently; incomplete records are filtered. |
| States and modes | pass for neutral scope | Passive default only; no controlled/uncontrolled strategy, current/completed/selected/loading/disabled/focus state. |
| Tokens and CSS | pass | Existing public tokens, private rhythm variables, logical geometry, named container and no Studio-only R3 layout. |
| Accessibility | pass | Meaningful sequence, complete visible text, redundant hidden ordinal, contextual media alternatives, no false widget semantics. |
| Responsive/content resilience | pass | Four paired natural viewports plus `200/320/430/680px`, optional content, mixed RTL/unbroken details, 200% text and user spacing with zero overflow. |
| Runtime/performance | pass for R3/Ceramics | Zero neutral R3 runtime; no shared-runtime delta; Ceramics remains below its family ceiling. |
| Exhibit/Studio parity | pass | Same renderer/fixture; exact normalized DOM and computed-style hashes at `620px`. |
| Targets | Web implemented; others bounded | Web, Webflow and Shopify CSS projections validate; native Shopify R3 remains planned. |
| Human review | required | Production records/details/media, first target mapping and final visual treatment remain evidence gates. |

## Anatomy, API And Behavior

The `0.3.0` target-agnostic contract exposes only two root properties:

| Property | Type | Requirement | Behavior |
| --- | --- | --- | --- |
| `title` | string | optional | Visible contextual heading; a non-empty value selects a named native section. |
| `steps` | slot | required non-empty | Target-owned ordered records with required name/description and optional reviewed details/media. |

The verified fixture contains:

- one native `SECTION` named by its visible H2;
- one direct native `OL` with three direct `LI` children;
- three complete H3 name/paragraph description pairs;
- derived `01`, `02`, `03` visual ordinals marked `aria-hidden="true"`;
- one optional `.technique-step__details[dir="auto"]` wrapper containing a
  native paragraph after description and before media;
- two steps with no details wrapper, proving strict optional omission;
- three direct native media figures with loaded `1800x2700` local images and
  truthful context-specific alternatives;
- zero widget roles, state attributes, focusables, live regions or scripts.

Blank title produces a generic `DIV` without header, title or dangling
`aria-labelledby`. Removing required steps produces zero R3 roots. A single
complete text/details step without media collapses naturally at `320px`.

The visible ordinal derives from sequence position and is presentation, not
target record data. Text and optional details always precede supporting media
in DOM order. At wide container measures, only the even media side changes;
the list-item sequence never changes.

## Details And Safety Boundary

The details slot is bounded composition inside the owning list item. Targets
may use native or canonical content to express applicable reviewed facts such
as materials, duration, temperature, tools, links or other supporting notes.
R3 does not expose one property for every possible fact and does not interpret
or validate their domain meaning.

Safety warnings and precautions are not placed in arbitrary detail text. They
must use separately reviewed rich content or canonical Alert composition, with
target-owned factual review, applicability, localization and revision history.
The default fixture demonstrates an ordinary working note, not a safety claim.

## Accessibility

Native ordered-list semantics remain the programmatic source of sequence even
without CSS, media or decorative numbers. Every step stays understandable from
its visible name and description. `dir="auto"` on authored text/details and
logical CSS preserve mixed-direction content.

Measured contrast:

| Mode | Title/name | Number/description/details |
| --- | ---: | ---: |
| Light | `17.93:1` | `7.81:1` |
| Dark | `17.18:1` | `12.09:1` |

Forced colors preserves a `1px solid CanvasText` divider and readable ordinal.
Reduced motion finds zero active R3 motion parts. There are no focusable
descendants in the neutral fixture and therefore no invented keyboard model.

## Responsive And Extreme Content

Natural Exhibit and Studio captures pass at Mobile, Tablet, Desktop and XL.
Mobile uses one column and text/details before media. Tablet, Desktop and XL
use two columns with right/left/right media placement in LTR. All natural cases
have zero root, part and document overflow.

| Forced root | Sequence | Columns | Overflow |
| ---: | ---: | ---: | ---: |
| `200px` | `164.81px` | 1 | 0 |
| `320px` | `284.81px` | 1 | 0 |
| `430px` | `394.81px` | 1 | 0 |
| `680px` | `644.81px` | 2 | 0 |

Localized RTL with repeated unbroken name, description and details content at
`200px` has zero overflow. Effective 200% type and WCAG user-spacing stress at
`320px` also grow without clipping, overlap or truncation.

## Tokens, CSS And Composition

R3 consumes the existing semantic text, divider, heading/body typography,
radius and layout-spacing tokens already documented by its contract. Private
`--_technique-step-padding` and `--_technique-small-gap` coordinate local
rhythm. The `30rem` query threshold and `1px` divider remain private geometry,
not public API.

The details wrapper uses the same body typography and secondary text family as
the complete explanation, resets only first/last child margins, sets
`min-inline-size: 0`, and permits unbroken wrapping. It does not style or expose
target-specific subfields. `TechniqueExplainerArtwork` and
`buildTechniqueExplainerFixture` remain the only Exhibit/Studio runtime path.

## Exhibit And Studio Parity

With identical public host spacing tokens at the same `620px` root, Exhibit and
Studio produce:

- DOM hash `6d3dfcf6`;
- computed-style hash `6c53267e`;
- markup length `2523`;
- sequence width `588px`;
- one details wrapper in the same DOM position;
- two equal wide tracks and real even-step media alternation;
- zero overflow.

Natural Mobile and Tablet geometry is exact across both modes. Desktop/XL use
different workspace widths by design; this does not create renderer or fixture
divergence.

## Cross-Target Translation

| Target | Result / boundary |
| --- | --- |
| Neutral Web | Implemented conditional section/div, native ordered sequence, stable text core, optional target-composed details/media, container CSS and zero R3 JavaScript. |
| Shopify | CSS projection validates. Native Liquid/schema remains planned until a first record source, editorial/safety workflow, blocks, order/limits, localization and media mapping are approved. |
| Webflow | Ceramics CSS is source-identical; CMS order and authored details must map to native ordered items and truthful content semantics. |
| React/Angular | Thin passive renderer accepts semantic content; target data/media layers own records, facts and lifecycle. |
| Figma/native targets | Model optional title, repeated ordered item, details/media and wide/narrow composition; generic registered nodes are not R3 visual approval. |

No target adapter API, Shopify schema, domain record fields or workflow state
was introduced into canonical R3.

## Automated And Browser Verification

Passing checks include:

- `npm run validate:contracts` — 183 contracts;
- `npm run validate:studio` — 183 definitions, 1024 semantic properties;
- local TypeScript `--noEmit`;
- `npm run validate:docs` — 183 registry components and MDX pages;
- `npm run audit:previews:static` — 255 previews, zero errors;
- `npm run build:components`;
- `npm run build:adapter:web:components`;
- `npm run build:adapter:shopify:components` — only the repository's 12 known
  maturity warnings;
- production Vite build to `/private/tmp/the-gallery-site-batch-161`;
- one headless Chromium session, one tab, four paired natural viewports and
  seven final special-mode captures;
- explicit browser close, `npm run evidence:cleanup` and
  `npm run evidence:assert-clean`.

Evidence lives in `output/playwright/refinement-batch-161/`. The first browser
pass exposed that the generated Web projection had not yet incorporated the new
details CSS. After rebuilding canonical projections, a focused regression probe
proved mixed RTL/unbroken overflow `0`; the final full pass supersedes the
preliminary result.

The pre-existing responsive server on `127.0.0.1:4173` was reused and
preserved. No managed Gallery server or Playwright session remained. Normal
Chrome was not used. `site/dist` is unchanged.

## Performance

| Surface | Current | Ceiling | Result |
| --- | ---: | ---: | --- |
| R3 CSS slice | `2,889 B` raw / `771 B` gzip | observation baseline | bounded; no component runtime or asset payload |
| Ceramics CSS | `34,028 B` raw / `4,858 B` gzip | `5,427 B` | pass; `569 B` headroom |
| Neutral Web component CSS | `537,270 B` raw / `72,254 B` gzip | `65,536 B` | existing documented global gap; not caused solely by R3 |
| Shared neutral runtime | `117,741 B` raw / `22,807 B` gzip | `8,192 B` | existing documented global gap; R3 delta `0 B` |
| R3 listeners/observers/timers/requests | `0` | zero-runtime boundary | pass |

SHA-256 values:

- R3 slice: `2ad232ff24f6e100601265b2c4cfd6a03472c56f98a46d148c92df7be4b2cb2b`;
- Ceramics CSS: `6000262b493b7e08354914ec85ad4481999303f2cf6183e2a668c6a4018ab789`;
- Neutral Web component CSS: `60f96d00ec417e28130743564fde1d4fdffc983e1f84012520f47ad306062a3f`;
- shared runtime: `0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`.

Webflow and Shopify Ceramics CSS copies are source-identical.

## Remaining Human And Target Gates

1. The first production target must prove R0-owned record provenance,
   localization, revision, applicability, factual/editorial review and rights.
2. The first rich-details consumer must prove its native/canonical composition
   and the reviewed safety-warning boundary.
3. Production media needs approved purpose, crop, alt, loading, fallback,
   credit, rights and disclosure evidence.
4. Shopify needs a first consumer and target-native data/editor mapping.
5. Final ordinal, typography, spacing, media treatment, alternation threshold
   and responsive visuals require explicit human review or R3-specific design
   evidence.

Technique Explainer is prepared for that human stability review. It remains
`pilot`; no `stable` promotion is authorized.
