# ADR 0386: Marketing Studio Explicit Token Controls

Status: Accepted

Date: 2026-09-12

MarketingStudio builds a static active-token map by choosing the first resolved
token. Nine older swatch groups listed multiple color roles, making eleven
non-first references uneditable despite appearing in the public inventory.

Split those groups into independent one-token controls with role-specific names.
Eight pages change bindings: Hero, its deprecated forwarding page, Newsletter,
Testimonials, Countdown, Urgency, Consent Manager and Social Proof. Social
Proof's timestamp size/leading become explicitly named controls rather than a
mislabelled X/Y pair. Relevant typography labels, including Trust Badges' labels,
now identify the actual part affected instead of exposing raw token identifiers
or calling an author-name weight a heading weight.

No token value, component CSS, behavior, contract or generated target changes.
Studio and Exhibit consume the same updated presentation metadata. Dynamic
state-aware mappings such as Button retain their existing multi-role swatches.

The metadata validator derives component/renderer ownership from the existing
Studio registry and rejects multi-role swatches for this static renderer. This
is a renderer capability constraint, not an arbitrary global control limit.
Four regression tests cover the hidden-role case, independent and empty bindings,
registration parsing, and preservation of state-aware/paired controls.

Other static renderers need the same source-and-metadata audit before extending
this guard. See the checkpoint report for the current bounded scope.
