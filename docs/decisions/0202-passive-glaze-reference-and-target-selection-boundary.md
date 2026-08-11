# 0202. Passive Glaze Reference And Target Selection Boundary

Status: Accepted

Date: 2026-07-17

Owner confirmation: 2026-08-11, decision 56 (`R2-A`)

## Context

R2 Glaze Guide exposed optional title, required target-owned swatches and
optional detail while ADR 0083 assigned any selection model to targets. The MDX
also described the Gallery artwork as passive. The shared Ceramics renderer
nevertheless emitted three buttons with `aria-selected`, local React selection
state, click handlers and synchronized detail inside a `role=list`.

That fixture was not a complete radio group, listbox or other coherent widget
pattern. It also made the first detail record appear selected even in the
contract's default state, and left a dangling section label when optional title
content was removed.

The repository still has no approved answer for whether glaze samples are
references, product choices, filters or navigation; no glaze data/claim schema;
no target mapping; and no R2-specific approved visual source.

## Decision

- Owner decision 56 confirms `R2-A`: the neutral identity is always passive.
  When a glaze is a purchasable choice, the product composition places
  canonical Radio or Variant Selector outside R2 and owns eligibility,
  availability, validation and selected-variant synchronization.
- Neutral R2 is a passive reference collection. It owns no value, selection,
  click, focus, keyboard model, form state, announcement or detail
  synchronization.
- With a non-empty title, the root is a native section labelled by the visible
  contextual heading. Without a title it is a generic div and emits no
  `aria-labelledby`.
- The required non-empty collection uses `ul > li > figure`. Each complete
  sample requires a target visual plus non-empty visible name in its native
  figure caption. A target-formatted code is optional.
- Color, finish, texture and imagery never replace the textual name. Targets
  provide a useful appearance alternative when the visual contributes
  information and decorative/fully redundant images use `alt=""`.
- Optional detail is a separately named passive article, explicitly framed as
  featured/reference content. Optional facts use complete native description
  list term/value groups. Neutral R2 never treats detail as implicitly selected.
- The legacy `.glaze-swatch[aria-selected="true"]` CSS rule remains only as the
  target projection hook preserved by ADR 0083. It is not a neutral state or
  permission to reuse button-plus-`aria-selected` markup.
- Product choice is not an R2 mode. A target composes canonical Radio/native
  radio or Variant Selector as a separate control with labelled group, values,
  checked/default-checked state, events, disabled/required/validation,
  controlled/uncontrolled strategy and selected-variant synchronization.
- Listbox remains a distinct alternative only for an approved option-list
  product model that implements its complete focus, option and selection
  contract.
- Exhibit and Studio use one `GlazeGuideArtwork`, one fixture and the same
  canonical CSS. R2 layout is intrinsic and no longer depends on Studio-only
  sample/detail grid rules.
- The R2 root API remains optional `title`, required non-empty `swatches` and
  optional passive `detail`. Records and compositional dimensions do not become
  public properties.
- R2 remains `pilot`; automated evidence cannot promote it to `stable`.

## Consequences

- The neutral implementation now matches its documented architecture boundary
  and stops presenting incomplete widget semantics.
- Native collection/figure/article/description-list structure remains useful
  across targets without adding an ARIA grid, listbox or radio keyboard model.
- Title removal no longer creates an unnamed section or broken label reference.
- A selectable target cannot silently inherit the passive figure: it must
  compose a complete canonical choice control and own state synchronization.
- Neutral R2 runtime becomes zero; sample hover/motion no longer implies
  clickability, while explicitly interactive target roots can retain bounded
  focus/hover styling.
- Interaction identity is resolved as passive and featured detail is never a
  selected panel. R0 assigns record/claim ownership to targets. Real records,
  glaze/color media evidence, Shopify mapping, final visuals and human approval
  remain target evidence gates.
