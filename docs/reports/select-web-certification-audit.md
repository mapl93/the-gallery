# Select Neutral Web Certification Audit

Status: Pending owner review

Date: 2026-07-12

## Scope

This audit reviews Select against the neutral-web gates in
`docs/COMPONENT-CERTIFICATION.md` after the owner rejected the operating-system
popup. It does not promote the contract automatically and does not infer
alternate sizes, search, filtering, or free-form input. Error, Success, and
Warning are included following the field-wide validation requirement in ADRs
0049 and 0050.

## Reconciliation

- Select is now progressively enhanced from native select markup into a custom
  trigger and single-select listbox.
- The native select remains the form value owner and visible no-JavaScript
  fallback. It receives `.select__native` only after enhancement succeeds.
- The listbox is anchored `8px` below the trigger, is at least as wide as the
  trigger, and may grow independently for legible option labels within a
  viewport-safe maximum.
- The contract records root, label, generated control wrapper, native fallback,
  trigger, current value, optional message, listbox, option, generated indicator,
  and generated selected-check anatomy.
- The initial prompt is a hidden empty-value native option. It labels the closed
  trigger but is absent from the custom listbox and is not disabled.
- ChevronDown and Check use the accepted Lucide geometry without adding an icon
  library dependency to the neutral web or Shopify adapters.
- Default, Error, Success, and Warning variants reuse the accepted Input
  validation token hierarchy. Label, field border, message, indicator, and
  focused outer ring are symmetrical between validation variants.
- Default, hover, focus-visible, disabled, Error focus-visible, Success
  focus-visible, Warning focus-visible, open, option hover, option highlighted,
  option selected, and option disabled states are represented.
- Labeling, trigger/listbox relationships, native synchronization, keyboard
  navigation, typeahead, dismissal, form reset, and disabled synchronization are
  explicit behavior requirements.
- Select remains non-searchable. Combobox continues to own search, filtering,
  asynchronous results, and free-form input.
- Studio renders the accepted anatomy directly in React and marks it as already
  enhanced. Exhibit invokes the distributed web enhancer inside its shadow root.

## Final Evidence

- Automated gate: pass; no structural failures or web manifest drift.
- Contract: 11 anatomy parts, 4 variants, 1 size, 12 states, 11 behavior rules,
  4 semantic properties, and 52 public tokens.
- Studio: 4 groups, 25 controls, all 4 semantic properties bound, 21 token
  controls, 43 referenced public tokens, and a renderer that uses the canonical
  Select classes.
- Closed field: `46px` high with `16px / 24px` value typography and the shared
  Input field token hierarchy.
- Open geometry: the listbox begins exactly `8px` below the trigger and never
  becomes narrower than it. The Exhibit fixture measures `208.25px` for both
  surfaces because its prompt is the longest label.
- Independent-width fixture: an intrinsic `85.05px` trigger opens a `360px`
  panel for a longer option. An explicitly sized `280px` trigger keeps that
  width while the same panel remains `360px`; option labels do not wrap.
- Right-edge fixture at a `390px` viewport switches to end alignment and places
  the panel from `28px` to `386px`, entirely inside the viewport.
- The popup does not cover the current field value.
- The generated `.select__control` keeps popup positioning independent from the
  optional feedback message.
- Exhibit progressive enhancement creates one trigger and one listbox, hides the
  native field, and leaves the source markup as a functional fallback.
- The native placeholder is `hidden` and not `disabled`; its generated option
  resolves to `display: none` and is absent from the accessible listbox.
- The generated trigger and option checks contain the canonical Lucide path
  geometry (`ChevronDown` and `Check`). Studio renders the named Lucide React
  components directly.
- ChevronDown and Check both measure `16px × 16px`, resolve to a `13px` inset
  from their surface's outer right edge, and have `0px` vertical-center drift.
  Equal-width trigger and panel surfaces place both icons on the exact same
  horizontal coordinate; independently wider panels preserve the same inset.
- Keyboard: Arrow Down and Arrow Up skip the hidden prompt, Enter selects,
  prefix typeahead highlights matching options, and selection returns focus to
  the trigger.
- Selection updates the native value and visible label and dispatches one native
  `input` and `change` event per selection.
- Escape, Tab, outside pointer interaction, trigger activation, and option
  selection close the listbox.
- Label activation opens the enhanced trigger.
- A form reset restores both native value and visible trigger label; native
  disabled changes synchronize to the trigger.
- Studio Error resolves label, inner border, message, and indicator to
  `rgb(239, 68, 68)`. The focused outer ring resolves to
  `rgb(254, 226, 226)` at `4px`, while both the native value owner and trigger
  expose the associated message and `aria-invalid="true"`.
- Studio Success resolves the same anatomy to `rgb(16, 185, 129)`. Its focused
  outer ring resolves to `rgb(209, 250, 229)` at `4px`; the message remains
  associated and neither control exposes `aria-invalid`.
- Studio Warning resolves label, inner border, message, and indicator to
  `rgb(245, 158, 11)` in light mode. Its focused outer ring resolves to
  `rgb(254, 243, 199)` at `4px`; the message remains associated and neither
  control exposes `aria-invalid` or alert semantics.
- Real pointer hover preserves the active Error, Success, or Warning trigger
  border instead of applying the neutral Default hover border.
- Dark theme resolves the listbox to the dark primary surface, subtle border,
  light option text, and tokenized indicator.
- Desktop Studio keeps its explicit `360px` trigger and listbox width. Mobile at
  `390 x 844` constrains both to `326px`, produces no horizontal page overflow,
  and leaves `120px` between the open panel and inspector.
- Dark theme resolves the right-edge fixture to `rgb(23, 23, 23)` for the panel
  and `rgb(250, 250, 250)` for option text.
- The final browser pass reports no Select or React runtime errors. The only
  console error is the pre-existing missing `/favicon.ico` request.

## Owner Review Required

The custom popup direction is implemented from the latest human review. Select
now exposes the required Default, Error, Success, and Warning variants and one
default size. Promotion to `stable` requires final visual approval and
confirmation that no alternate sizes are added in this cycle.

## Validation

- `node --check components/js/theme.js`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run audit:components`
- `npm run audit:previews:static`
- `npm --prefix site run build -- --outDir /tmp/the-gallery-select-validation`
