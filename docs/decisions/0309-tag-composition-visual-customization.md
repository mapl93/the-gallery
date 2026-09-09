# 0309. Tag Composition Visual Customization

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with Tag and its Tags Input consumer. Add 10 Tag decisions and
5 Tags Input decisions to the existing component token layer; shared typography,
state colors, radius and field roles remain shared. This extends visual controls
beyond the earlier narrow Studio scope in ADRs 0106/0107 without changing their
native action and controlled-collection semantics.

Tag exposes padding, action gap, border, optional action end padding, action/icon
sizes, resting opacity and focus geometry. The 24px action floor remains a private
accessibility guard. Default target size remains 24px; Input icon size no longer
controls Tag. Start/end padding becomes logical to preserve the intended spacing
in RTL. Resting remove opacity increases from 0.6 to 0.7: the rendered Light
colors (82 text over 245 surface in each RGB channel) improve from 2.81:1 to
3.48:1 after opacity compositing. The X is the visual identifier of the enabled
remove action. This follows [WCAG 2.2 SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html);
custom colors/opacity still need contextual verification. A site-simulated focus
state reads the same public geometry as native focus.

Tags Input exposes its own value gap, control padding, draft padding and preferred
width. Former Input-padding controls were inert, while Input bottom margin and
icon gap had unrelated duties in its CSS. The replacement decisions preserve
4px gaps, 4px vertical padding, 8px horizontal padding and 8rem draft width.
Its minimum height follows the existing 46px Button/Input role, replacing 44px;
wrapping and large child Tags may increase the actual height.

Studio composes the full shared TagArtwork renderer and exposes the same Tag
tokens through its declared dependency. Public-token validation and the readiness audit share the same
transitive declared CSS composition already used for class/behavior validation.
The validation still rejects tokens absent from that source/dependency set and from Web output.
This remains file-level reference evidence, not selector-level usage certification.

The authored Tags Input feedback is authoritative, including an empty value.
No neutral collection controller, duplicate policy, serialization, suggestion
popup, automatic submission or removal lifecycle is added. Web and Shopify
artifacts are generated; contracts remain pilot.

## Compatibility and verification

Copy-and-own consumers migrate local Tag Input-icon overrides to Tag's target
size, and old Tags Input margin/icon-gap overrides to its own spacing tokens.
Existing global aliases remain defined for other components. Adopt matching tokens
and CSS together, then verify composed Tag sizes and row wrapping. The change does
not establish a package publishing policy or update existing consumer copies.

Verify overrides both standalone and composed, the 24px floor, logical padding,
focus after removal/restore, native draft/IME editing, controlled acceptance,
readonly/disabled, theme/mobile containment, and Exhibit inventory.
