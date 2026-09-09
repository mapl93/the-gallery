# 0341. Variant Selector Values And Product Form Simplification

Status: Accepted

Date: 2026-09-09

## Decision

Expose 14 Variant Selector source roles and 40 public values under ADR 0293:
group/option gap factors, an independent swatch-diameter inset factor, typography
weights, border/ring/focus geometry and unavailable-mark thickness. Weight and
dimension roles alias existing primitives. Diameter remains target size minus
spacing base times its inset factor, preserving responsive defaults while allowing
option gap to change independently. Selected ring gap and thickness are separate;
the outer shadow spread derives from their sum.

Keep actual option colors/images as target data, not brand design tokens. Keep
native radios, inspectable sold-out options, disabled impossible options and the
single required group marker. Marker glyph alignment follows ADR 0275; visually
hidden input geometry and the clipped 140% diagonal at 45 degrees are structural
mechanics. The unavailable diagonal now centers correctly in resolved RTL.
Remove unused border-subtle from this component's inventory without removing
the global token. Studio labels disclose shared default/hover/focus effects.

Product Form retains one required submitter under ADR 0241. All repo consumers
(shared renderer, Shopify and documented Quick View/Sticky ATC compositions)
use one button in its action row. Remove the unused inter-action gap and numeric
flex basis/minimum instead of exposing controls that cannot change this valid
composition. The single Button fills available width and keeps its own visual
API. Expose the existing section gap in Studio; add no Product Form source
tokens. Optional feedback tone and purchase behavior remain target-owned.

Neither component gains a runtime, state axis, target or source type. Both remain
pilot. Consumer copies adopt the changes explicitly, including any unsupported
custom multi-action composition they own locally.

## Acceptance

Compare defaults in both themes and viewport sizes. Verify independent gap/ring/
focus controls, native radio selection/reset/FormData, unavailable versus disabled,
RTL slash paint, reduced motion, forced colors and Studio edits/reset. Check
Product Form's single-button geometry, section gap and composition inheritance
in Quick View/Sticky ATC. Validate source, docs, contracts, metadata and adapters.
