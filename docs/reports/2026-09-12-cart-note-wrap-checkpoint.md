# Cart Note / Gift Wrap checkpoint

Date: 2026-09-12. ADR 0368. Parent: `7f4f6c2`.

Ten roles expand profiles to 9/13 public values.

## Evidence

- Fresh CLI dependency-closed consumer. 120 element comparisons preserve
  geometry/font/color/spacing/border across two fixtures, 320/600/900/1200px
  and Light/Dark.
- Note margin/field gap 15/12px and focus thickness 4px apply. Native Space
  closes/reopens details and retains the Textarea value.
- Wrapping padding 12/16px, border 3px, label/price gap 6px and weights 700/500
  apply independently. Narrow RTL fits; screenshot inspected.
- Native Checkbox Space changes checkedness, FormData includes the authored
  name/value only when selected, and form reset restores initial uncheckedness.
- Studio note/price-wrapper spacing edits, note retention, native Checkbox,
  customization reset and shared Exhibit inventory pass.
- Generated source/adapters/docs validations pass. One browser/tab and managed
  server per phase; cleanup, resource gate and process scan pass. Owned public
  fixture removed.

Ignored evidence: `output/playwright/note-wrap/` includes CLI provenance,
comparison CSS, fixtures, harness/results and screenshot.

## Limits

No persisted note, gift-wrap sellable product, real cart/totals, Shopify editor
or screen-reader certification was tested. Price's existing compact current-price
treatment remains; this is not a re-review of every possible Price composition.
No component promotion or deployment. Cart visual coverage does not certify the
complete commerce lifecycle or automatically update consumers' copies.
