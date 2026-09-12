# ADR 0388: Storytelling Studio Explicit Color Controls

Status: Accepted

Date: 2026-09-12

StorytellingStudio statically selects the first resolved swatch token. Separate
its older multi-role groups in Artist Profile, Process Timeline, Certificate,
Collection Story, Artist Index, Artist Card and Artist Statement. Labels name
primary/secondary/accent text, decorative/focus borders, and selected-filter
background/border/text individually. Values and public token identities stay.

Extend the reviewed-renderer validation from ADR 0387 to this renderer. The
regression covers the three-role selected-filter group and independent bindings.

Artist Index's default fixture continues to omit target-owned filters (ADR
0080). Its optional filter CSS roles remain editable reserved API; exposing
these controls does not define filtering semantics or result synchronization.
No new component behavior, source token, CSS or generated target is introduced.
