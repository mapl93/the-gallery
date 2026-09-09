# 0346. Collection Grid Density Tokens

Status: Accepted

Date: 2026-09-09

## Decision

The owner selected tokens for every Collection Grid density. Four component
number roles initially hold 1/2/3/4 columns below 20rem and from 20rem/48rem/64rem.
These are scoped layout decisions, not new global scales or source modes.
Container queries only select the active private value; one shared track formula
handles all four bands. Seven public values include the existing gap and paddings.

Retain the public Web name `--grid-columns` for the wide role, but correct its
alias from general `grid.columns` (12) to `component.collection-grid.wideColumns`
(4). The canonical general twelve-column grid is unchanged. Previously Studio
and Shopify's explicit `data-columns="4"` hid the incorrect no-override default.
That default now changes intentionally from twelve to the documented four,
including compositions that relied on the inherited default.

Keep legacy `data-columns="2"` through `"6"` as wide-only compatibility overrides
with their previous priority above the token. Existing inherited/local
`--grid-columns` customizations continue to work. Consumers adopting token
ownership remove the legacy attribute. Remove `columns` from the primary
semantic property API and Studio; bump the pilot contract to 0.3.0. Copy-and-own
consumers choose when to adopt the contract/CSS/token update.

Counts are positive integers. The track formula protects the technical minimum
with `max(1, ...)`; CSS math applies native integer rounding for fractional
consumer overrides. There is no arbitrary neutral upper ceiling. The CSS basis is
[Grid repeat notation](https://www.w3.org/TR/css-grid-2/#repeat-notation) and
[CSS Values integer resolution](https://www.w3.org/TR/css-values-4/#calc-range).
An accepted track count alone does not establish useful card width or legibility.

Shopify retains the existing `columns` range setting, ID, 2–6 choices and default
4 for saved-editor compatibility. Its numeric value now writes `--grid-columns`
instead of `data-columns`. This target setting is not a global CSS limit.
[Shopify range settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings)
return numbers. No additional merchant controls or remote theme changes are made
in this Web checkpoint.

Remove Studio's padding-zero override so the public padding controls affect the
canonical list. The parent's intentional Featured Collection inset override is
unchanged. Restore required Price composition in the older MDX fallback example.
Product Card still owns all child visuals and behavior; Grid remains passive,
native ul/li, without new JS, interaction state, ordering model or stable promotion.

## Acceptance

Compare legacy defaults across widths/themes; separately prove the corrected
no-override wide default. Check all density tokens, attribute priority, inherited
and local token compatibility, native rounding/minimum, spacing, RTL, DOM focus
order and empty lists. Verify Studio controls/reset, required slot ownership,
Exhibit, canonical validators, actual CLI installation and generated adapters.
Browser closure must be followed by both the lifecycle gate and a system-process
check; reuse one session/tab per phase and preserve personal Chrome.
