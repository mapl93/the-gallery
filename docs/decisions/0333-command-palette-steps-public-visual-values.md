# 0333. Command Palette And Steps Public Visual Values

Status: Accepted

Date: 2026-09-09

## Decision

Continue owner-authorized ADR 0293 with 29 Command Palette and ten Steps source
values. Preserve ADR 0103 semantics and ADR 0163's passive checkout composition.
Command Palette exposes 57 public roles, Steps 25. Both remain pilot. There is
no new target, mode, provider, framework dependency or checkout behavior.

Command Palette exposes its existing 20vh/4rem top-inset bounds, 35rem panel
maximum, independent 1px panel/search/footer borders, search row gap and padding,
search icon, result area bounds/padding, group padding/tracking, result geometry,
shared focus width and result inset, icons, shortcut separation, empty padding
and footer spacing. Responsive factors retain their existing spacing base and
values. Semibold group weight is shared. Its actual inherited Modal tint, inset,
viewport bound, motion and easing inputs become discoverable in Studio. It does
not copy Modal's overridden maximum width or unused header/body/action tokens.
Close Button retains its own component API.

Command Palette keeps a token-sized inset search shadow in normal colors and
uses an inset Highlight outline in forced colors, where box shadows are suppressed.
The previous forced-color shadow could not provide visible focus. The outline
has no layout cost and uses the same focus-width token. Result focus CSS does
not add options to Tab order or move DOM focus from the combobox. Coarse minimum
uses the greater of custom result minimum and the shared touch target.

Studio ignores command navigation, activation, dismissal and toggle shortcuts
while IME composition is active, using the composing ref, native isComposing and
keyCode 229 guard already accepted by Combobox. Previously Enter could execute
and close during composition. Close/reset clear the flag; reopening synchronizes
filtering with the retained query. This is local target behavior, not neutral JS.

Steps exposes independent indicator size/border, connector width, check size,
horizontal item basis, horizontal content gap, description gap, vertical item
gap, vertical bottom padding and vertical content inset. Defaults preserve the
existing geometry, while connector centering derives from size/line thickness.
Semibold indicator and medium title weights are shared. The orientation variant
is removed from states; done compatibility selectors join completed rather than
creating a distinct semantic state. Compatibility CSS is preserved.

Steps stays passive. Its horizontal scroll, terminal connector geometry and
source order do not become tokens or an automatic responsive mode. Checkout
Progress inherits the canonical indicator/type API while retaining its existing
parent-owned narrow layout and connector omission. No Shopify native checkout
mapping is introduced or implied by regenerated theme CSS.

## Acceptance

Verify default computed geometry across theme/viewport matrices. Exercise source
tokens in a CLI consumer, Studio controls/reset, overlay and search/result bounds,
active-descendant filtering/keyboard/IME, local focus/dismissal, forced search
focus, coarse minimum and reduced motion. Verify Steps in both orientations,
RTL, long content, independent indicator/connector values and existing checkout
composition. Validate source, catalogue, docs, contracts, Studio and adapters.

## Technical Reference

[CSS Color Adjustment Level 1](https://www.w3.org/TR/css-color-adjust-1/#forced-colors-properties)
defines forced-color suppression of box-shadow; the search outline respects the
user's system-color preference without opting out of forced color adjustment.
