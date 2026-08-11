# Component Refinement Batch 38

Status: Artist Profile refined and ready for human review

Date: 2026-07-14

Components: Artist Profile

## Outcome

Artist Profile's dossier, standards research, section/container decision,
contract, canonical CSS, shared Exhibit/Studio renderer, Studio metadata, MDX,
Shopify Liquid/locales, generated adapters, browser evidence, open questions and
individual audit are reconciled. The contract remains `pilot`; no component was
promoted to `stable`.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Safe Refinement

- One native section is named by its visible contextual artist heading.
- An isolated component container drives the internal grid; portrait presence is
  an explicit target-rendered modifier rather than viewport or `:has()` policy.
- Omitting portrait leaves one full-width column and no empty media wrapper.
- Label, location, rich biography and native quotation remain optional/semantic;
  the minimum render has only required name and biography.
- The ordinary action group composes canonical Button anchors without adding a
  navigation landmark or Artist Profile interaction runtime.
- Site-only presentation drift is removed; Exhibit and Studio share one renderer
  and exact initial markup.
- Shopify maps its native image/rich-text/settings model to the same anatomy,
  localizes schema/fallbacks and now reports implemented/ready.

## Browser Evidence Summary

- Exact Exhibit/Studio initial outerHTML parity holds in Mobile, Tablet, Desktop
  and XL; the clean component markup is `1,209` characters.
- The container query produces one column in constrained hosts, two columns at
  the wide content threshold, and returns to one column when portrait/modifier
  are absent.
- The minimum state emits no empty optional wrappers. Section name, image alt,
  heading reference, native link order and Enter activation pass.
- Long Arabic/CJK/Latin and unbroken content, wrapped actions, RTL logical rule
  and 200% zoom have no component or viewport overflow.
- Light/dark text/action contrast passes; forced-color focus/boundary,
  reduced-motion `0s`, clean heading typography and console cleanliness pass.
- Four before, eight viewport-after and seven special-state images live under
  `output/playwright/refinement-batch-38/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Storytelling CSS | `3,847 B` | `4.2 KiB` | pass (`453 B` headroom; `+105 B` from baseline) |
| Shared neutral runtime | `10,492 B` | `8 KiB` | existing exception (`2,300 B` over; no Artist Profile runtime) |
| Neutral Web components CSS | `65,621 B` | `64 KiB` | gap (`85 B` over; `+94 B` from Batch 37) |

The global CSS ceiling remains unchanged. The overage is an explicit program gap
for later shared-bundle optimization or owner decision; semantic typography and
public anatomy were not removed to manufacture a pass.

## Human Review Queue

Review the `3:4` crop, equal wide split, `36rem` content threshold, archival
surface, radius, section insets, label/heading/article hierarchy, italic quote
rule, primary/outline action emphasis and whether v1 needs portrait position,
compact density, alignment or alternate surfaces.

## Validation

Registry/docs, tokens, 183 contracts, 183 Studios, Neutral Web and Shopify
adapters, mandatory Shopify Liquid/locales validation, structural/static/parity
audits, browser states/preferences, source/generated identity, deterministic
gzip, global refinement audit, temporary site build, diff checks, console
cleanliness and `site/dist` cleanliness form the final gate.

## Program Progress

After regeneration the program should contain 183 components, 108 dependency
edges, 79 dossiers and 68 components ready for human review. Artist Profile is
`human-review-ready`; it remains `pilot` and human review is still pending.
