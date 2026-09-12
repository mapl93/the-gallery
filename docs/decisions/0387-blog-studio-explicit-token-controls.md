# ADR 0387: Blog Studio Explicit Token Controls

Status: Accepted

Date: 2026-09-12

BlogStudio uses the same static first-token mapping as MarketingStudio. Split
multi-role swatches into independent controls in Article Card, Article Hero,
Article Body, Table of Contents, Author Card, Filter Bar, Blog Sidebar and
Comments. Preserve every underlying token and default.

Article Body and Table of Contents spacing groups, and Author Card spacing and
typography groups, incorrectly used color swatches. They now use individual
numeric/text token editors with labels naming the affected role or shared scale.
These are shared design-system bases, not new component-specific token values.

Extend the renderer-capability guard from ADR 0386 to BlogStudio and reject
non-color swatches for these two reviewed static renderers. Preserve genuinely
state-aware multi-token controls and paired editors. No source CSS, contract,
behavior, generated target, or package API changes.
