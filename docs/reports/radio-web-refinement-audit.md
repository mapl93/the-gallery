# Radio Neutral Web Refinement Audit

Status: Ready for human review; not promoted to `stable`

Date: 2026-07-13

## Scope And Reconciliation

Radio was reviewed as a native option item inside an externally named exclusive
group. The review does not create a Radio Group component, alternate sizes,
orientation API, custom keyboard runtime, or item-level controlled booleans.

- Contract advanced to `0.3.0`: four parts, four variants, one size, nine
  states, seven behaviors, eight properties, and twenty-three public tokens.
- Static/default checkedness, named-group live ownership, group-level framework
  control, events, FormData, required validity, and reset are explicit.
- The checked hollow-ring baseline became an unambiguous central dot using a
  filled boundary plus private surface inset.
- The `20px` control is centered in the first `24px` label line. Root and label
  now contain and wrap long or unbroken localized content.
- Default boundary uses the accepted private `60%` mix; semantic boundaries use
  `70%` and labels `55%`. Disabled hover is suppressed; reduced motion and
  forced-colors native appearance are explicit.

## Browser Evidence

- Native group: Arrow Right moved both focus and selection `pickup → courier`;
  Space selected `freight`. Each selection emitted one `input`/`change` pair.
- FormData tracked the selected value; reset restored default `pickup`; an empty
  required group failed validity and submitted no value.
- Checked style resolved to `rgb(64,64,64)` background/border plus a `4px` inset
  surface shadow, replacing the baseline donut.
- Contrast, light: default boundary `3.07:1`, selected dot `10.37:1`, semantic
  boundaries/dots `3.86:1`–`6.21:1`, labels `5.36:1`–`8.03:1`.
- Contrast, dark: default boundary `5.19:1`, selected dot `17.93:1`, semantic
  boundaries/dots `8.64:1`–`12.30:1`, labels `10.06:1`–`13.20:1`.
- A `280px` RTL unbroken label had zero component/host overflow. Forced colors
  restored native appearance and a `4px` system focus; reduced-motion duration
  was `0s`.
- Eight canonical Exhibit/Studio screenshots cover `390×844`, `768×1024`,
  `1280×800`, and `1600×1000`. Before and shared variant/state matrix images
  show the visual change.
- Exhibit/Studio stage markup is normalized-identical at `199` characters.

Evidence is stored under `output/playwright/refinement-batch-08/`.

## Tokens, Runtime, Performance, And Content

- No public token, token layer, adapter field, or icon dependency was added.
  Border width, inset/ring geometry, alignment offset, and mixes stay private.
- Radio runtime remains zero: no listener, observer, timer, network request,
  asset, or layout read.
- Primitives CSS: `10,378 B` gzip / `10.3 KiB`; Neutral Web components CSS:
  `57,952 B` / `64 KiB`; shared runtime: `5,263 B` / `8 KiB`.
- Short, long, unbroken, localized RTL, checked, unchecked, disabled, required,
  reset, and all validation variants are represented by docs, Studio, or probes.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native named radio and wrapping label; browser owns group behavior. | Implemented and browser-evidenced. |
| Shopify | Native Liquid radios inside Fieldset/Legend or target choice composition. | Embedded class adapter validates. |
| React / Angular | One group value/defaultValue plus native change. | Strategy documented; adapter pending. |
| Figma | Group question, option label, checked/unchecked, validation, focus, disabled. | Metadata works; shared frame is not owner approval. |
| SwiftUI / Compose | Native single-choice group/control. | Conceptual mapping documented. |

## Remaining Human Review

Approve dot/inset geometry, `20px` size, `24px` leading, gap, neutral boundary,
semantic mixes, and focus hierarchy; then approve the repository visual or
provide component-specific owner evidence. A first-class Radio Group remains a
separate architecture decision.

## Validation And Decision

Contracts, Studio, registry/docs, token compatibility, Web/Shopify adapters,
temporary docs build, structural certification, parity, static previews,
performance budgets, and global progress audit pass in Batch 08.

Ready for human review. Contract remains `pilot`; no stability promotion was
performed.
