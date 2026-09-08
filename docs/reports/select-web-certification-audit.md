# Select Neutral Web Certification Audit

Status: Approved stable by owner on 2026-08-12

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
  generated selected-check anatomy, and a decorative required indicator.
- The initial prompt is a hidden empty-value native option. It labels the closed
  trigger but is absent from the custom listbox and is not disabled.
- ChevronDown and Check use the accepted Lucide geometry without adding an icon
  library dependency to the neutral web or Shopify adapters.
- Default, Error, Success, and Warning variants reuse the accepted Input
  validation token hierarchy. Label, field border, message, indicator, and
  focused outer ring are symmetrical between validation variants.
- Default, hover, focus-visible, disabled, open, option hover, option
  highlighted, option selected, and option disabled states are represented.
  Focus combines independently with Default, Error, Success, or Warning under
  ADR 0274 instead of duplicating three variant-specific Focus states.
- Labeling, trigger/listbox relationships, native synchronization, keyboard
  navigation, typeahead, dismissal, form reset, and disabled synchronization are
  explicit behavior requirements.
- Select remains non-searchable. Combobox continues to own search, filtering,
  asynchronous results, and free-form input.
- Exhibit and Studio mount the same registered React renderer and fixture under
  ADR 0087. The distributed web enhancer is exercised separately against the
  same contract and canonical CSS.

## Final Evidence

- Automated gate: pass; no structural failures or web manifest drift.
- Contract: 12 anatomy parts, 4 variants, 1 size, 9 states, 14 behavior rules,
  6 semantic properties, and 52 public tokens.
- Studio: 4 groups, 27 controls, all 6 semantic properties bound, 21 token
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
- Toggling Required synchronizes native `required`, trigger `aria-required`, and
  the label marker. The asterisk is decorative, excluded from the accessible
  name, and optically centered with the label rather than superscripted. ADR
  0275 now makes this the global required-field treatment rather than a
  Select-only exception.
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
- The owner Light-theme refinement keeps the accepted source tokens while using
  private perceptual mixes: default boundary `3.07:1` light / `5.19:1` dark;
  semantic boundary/indicator minimum `3.24:1` light / `8.06:1` dark; semantic
  label/message minimum `5.11:1` / `9.93:1`. Error alone exposes
  `aria-invalid="true"`;
  Success and Warning remain associated non-invalid feedback.
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

## Expanded v1 Refinement Evidence — 2026-07-13

- The contract is now `0.8.0`. `name` and `required` map to the native form
  owner; the visible trigger exposes `role="combobox"` and mirrors
  `aria-required="true"`, while the label mirrors required visually without
  changing its accessible name.
- Multiple selection, `size` greater than one, and `<optgroup>` content now skip
  the flat single-choice enhancer and remain functional native controls. A
  browser probe confirmed no generated trigger and a visible native field for
  grouped and multiple cases.
- An empty flat select enhances without an exception and creates zero generated
  options. The author still owns providing a meaningful choice set.
- A direct enhancer probe generated 49 options from one hidden prompt plus 48
  localized choices. The open popup measured `360px x 240px`, scrolled
  vertically, kept the hidden prompt out of the visible choices, and produced no
  page overflow.
- The same probe preserved native `name="country"`, native `required`,
  `aria-describedby`, and `aria-required="true"` on the combobox.
- Reduced-motion testing initially found the field still transitioning at
  `0.1s`. Canonical CSS now resolves both field and indicator transition duration
  to `0s` and removes indicator rotation while expanded state remains semantic.
- Exhibit and Studio were captured at `390 x 844`, `768 x 1024`, `1280 x 800`,
  and `1600 x 1000`; all eight images are under
  `output/playwright/refinement-calibration/`.
- Forced-colors/reduced-motion extreme evidence is
  `select-extreme-enhancer-forced-colors-reduced-motion-desktop.png`.
- Current shared runtime measures `5,263 B` gzip against the `8 KiB` ceiling;
  primitives CSS measures `10,378 B` against the `10.3 KiB` family ceiling;
  Neutral Web components CSS measures `57,952 B` against `64 KiB`.

## Final Owner Review

The owner approved the complete Select in the live review on 2026-08-12 after
testing the custom popup in Studio, reviewing Light and Dark, accepting the
semantic-color correction, keeping Variant and State independent, and accepting
the centered Required marker. The contract is `stable`. No alternate size is
added in this cycle.

### Live owner review continuation — 2026-08-12

- The owner indicated that the current Select presentation looks good.
- The option panel's entrance and exit motion is deferred to a future
  cross-target review and is not a v1 approval blocker. No React-only motion
  dependency is introduced in this cycle.
- The newly exposed Light theme completed its first owner review; explicit
  `stable` approval remains pending a re-review after the semantic-color
  correction. The theme selector belongs to the docs site and does not change
  the Select contract or target adapters.
- The owner found Error, Success, and Warning clear in Dark but too dark and
  insufficiently differentiated in Light. Select now mixes the existing
  semantic tokens in OKLCH, with `80%` semantic color for the border/indicator
  and `60%` for label/message. Light resolves the three boundaries to
  `rgb(192, 62, 60)`, `rgb(35, 149, 106)`, and `rgb(195, 129, 32)` respectively;
  all remain above the `3:1` non-text threshold and their copy remains above
  `4.5:1`.
- Dark remains strong after the same source change: semantic boundary contrast
  ranges from `8.06:1` to `11.89:1`, and no runtime console error was observed.
- The refinement changes canonical Select CSS plus generated neutral-web and
  Shopify copies. No public property, variant, or token was added.
- The owner then established ADR 0274: Variant and State are separate axes for
  every component. Select contract `0.7.0` removes `errorFocusVisible`,
  `successFocusVisible`, and `warningFocusVisible`; Studio now renders the same
  visual intersections through Error/Success/Warning + generic Focus. Changing
  State no longer changes Variant.
- The owner accepted the Select marker as the library-wide standard in ADR
  0275. All 20 contracts exposing `required` now document one centered marker on
  the owned or composing label, group legend, or primary instruction. No pilot
  receives a stability promotion from this consistency change.
- The resulting matrix passed 40 of 40 Studio checks across the 20
  required-capable contracts in Light and Dark. Required on/off, native or ARIA
  semantic authority, current-color inheritance, optical translation, and clean
  accessible text all matched the convention.
- The owner then explicitly answered yes to the complete Select stability
  question and asked to continue with the next component. This is the human
  promotion gate required by Component Certification; no automated audit made
  the decision.

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
