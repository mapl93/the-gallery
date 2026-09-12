# ADR 0380: Comment Section Visual Values

Status: Accepted

Date: 2026-09-12

Apply ADR 0293 to Comment Section with 21 source roles and 41 public values,
refining ADR 0200's earlier private visual-value boundary. Expose section,
thread, author/date, action/reaction, pagination, empty and composer spacing;
order width; row border; icon relative size; and reply inset share/min/max.
The inset remains container-relative and bounded by shared system spacing.

Repeated regular 400 literals now consume the existing Body weight role.
Other typographic roles and canonical Avatar, Button, Select, Textarea,
Pagination, Empty State and Toggle contracts remain. Finite depth, flattening,
content, ordering, permissions, reactions, counts, moderation and posting remain
semantic/target data; no neutral mutation or state service is added.

Studio/Exhibit share the public inventory. Both generated targets follow source;
copy adoption, live target behavior and explicit stable review stay separate.
Evidence: `docs/reports/2026-09-12-comments-values-checkpoint.md`.
