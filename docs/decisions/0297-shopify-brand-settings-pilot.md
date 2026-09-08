# 0297. Shopify Brand Settings Pilot

Status: Implemented and tested in an unpublished Shopify theme; owner review pending

Date: 2026-09-08

## Context

The owner approved the form customization and Button optical-spacing checkpoint,
then authorized the next planned step: merchant-editable Shopify brand controls.
Checkpoint `8162b62` was committed and pushed before changing this adapter.
The six existing color settings had no Liquid consumers. Font loading and
mapping were duplicated in the main layout, password layout and gift-card page;
the gift-card page also diverged from ADR 0277's interface/editorial boundary.

## Decision

- Preserve existing setting IDs and connect the six colors directly to their
  existing `--tg-color-*` semantic variables. Their downstream public aliases
  carry the values into fields, surfaces, text, borders and focus.
- Expose four existing primary Button decisions: resting, hover and active
  backgrounds, plus text. Each schema default matches its canonical source
  value; no tokens, token layers or modes are added.
- Scope these ten color controls to the existing Light appearance. Identify that
  scope in English and Spanish in the editor. Dark retains its canonical palette
  until its own brand choices are reviewed.
- Use one `theme-brand-settings` snippet after CSS loading in all three page
  shells. It owns font loading and bindings. Interface headings, controls and
  general text use `font_body`; article/editorial text uses `font_heading`.
- Output Shopify's CSS-ready `font.family` directly. Shopify already quotes
  multiword names; applying `json` adds literal quote characters and selects a
  nonexistent family. This was reproduced with Alegreya Sans in the hosted
  pilot and corrected in source and in that unpublished theme.
- Keep color-setting outputs direct inside a Liquid `style` tag so Shopify can
  provide its color preview variables. Do not apply color filters or construct
  alternate editor-only color logic. Blank settings omit their override.
- Saved merchant selections remain in Shopify's `settings_data.json`, which is
  not modified. Repo defaults remain official. Consumer copies adopt this
  adapter change explicitly; repository updates do not update installed themes.

## Validation boundary

`npm run validate:shopify:brand` checks all ten color bindings against compiled
source defaults at four viewport sizes, the three load orders, font ownership,
blank fallback guards and both schema locales. Run `build:tokens:source` first
when source tokens have changed.

Browser checks use CSS projected from the actual snippet bindings on the local
contact composition, including a simulated editor CSS-variable update. They do
not substitute for Shopify's Liquid renderer, font CDN or hosted Theme Editor.
The owner subsequently authorized uploading the pilot. Theme `188631449907`
(`gallery-brand-pilot-2026-09-08`) was created as UNPUBLISHED in manú studio.
The live theme `184841142579` remains MAIN. The dated pilot report records the
hosted checks, source fix, package provenance and limits.

## Next gate

The ten color controls and both font pickers were changed, saved and reloaded in
the real editor, then restored to canonical defaults. Home, password and sample
gift-card previews render in Shopify; mobile contact and newsletter controls
were inspected. Emptying the color-picker text field retains the last valid
value, so it does not test the snippet's blank-setting fallback.

The next gate is the owner's visual review of the unpublished pilot. Review the
chosen brand's contrast before adoption. This narrow pilot is not certification
of the complete Shopify theme, transactional flows or every font/appearance.

## Official references

- [Theme Editor live preview](https://shopify.dev/docs/storefronts/themes/tools/online-editor#live-preview)
- [Theme settings schema](https://shopify.dev/docs/storefronts/themes/architecture/config/settings-schema-json)
- [Color and font input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings)
- [Shopify font.family quoting](https://shopify.dev/docs/api/liquid/objects/font#font-family)
