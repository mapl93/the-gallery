# Should Component Tokens Live in Their Own File?

## A Thorough Analysis for The Gallery Design System

> **TL;DR Recommendation:** **Remove the component token file.** Keep component colors in Theme, component layout in Breakpoints, and let CSS do the composition. For a 1–2 person team building a Shopify theme with Style Dictionary, the component file adds indirection and maintenance burden without meaningful benefit. The "component API" argument only holds at enterprise scale with separate component-library consumers.

---

## 0. What the Codebase Actually Shows

Before theorizing, here's what's happening right now:

| Token | Currently defined in | Aliases to | Actually in generated CSS? |
|---|---|---|---|
| `component/button/primary/bg/default` | **Light.tokens.json** (Theme) | Primitives `color/gray/700` | ✅ Yes → `--tg-component-button-primary-bg-default` |
| `button.primary.padding-vertical` | **components.tokens.json** (root) | Breakpoints `layout/space/3` | ❌ No — file not in `tokens/` dir |
| `components/input/padding-horizontal` | **Mobile.tokens.json** (Breakpoints) | Primitives `layout/space/3` | ✅ Yes → `--tg-input-padding-horizontal` |
| `input.default.label.color` | **components.tokens.json** (root) | Nothing (hardcoded `#404040`) | ❌ No |

**Key finding:** The component token file (`components.tokens.json`) at the repo root is not consumed by Style Dictionary (which reads `tokens/**/*.json`). The `tokens/Components_tokens.json` that **is** consumed only contains 5 input layout tokens. Button layout tokens (padding, gap, min-height, icon-size) exist only in the Figma export and are not reaching the CSS output at all.

This means the component file is currently **an orphan** — it documents intent in Figma but doesn't participate in the build pipeline. This is the first sign that the architecture may not need it.

---

## A. How Major Design Systems Handle This

### Systems WITH a Dedicated Component Token Layer

| System | Component tokens? | Approach |
|---|---|---|
| **Salesforce Lightning (SLDS)** | ✅ Yes — "component-level design tokens" | Has `SLDS_COMPONENT_*` tokens per component. But SLDS serves **thousands of internal teams** who consume components as a library. Component tokens are the API contract between the design system team and consumers. Each component (button, input, card, modal) has its own namespaced set. Colors still reference the global theme; sizing is per-component. |
| **Adobe Spectrum** | ✅ Yes — "component tokens" as a distinct layer | Spectrum explicitly documents 4 tiers: Global → Alias → Component → System. Component tokens merge color and sizing into per-component namespaces. This exists because Spectrum ships to **React Spectrum, Spectrum CSS, and Spectrum Web Components** — three separate implementations that need a stable component-level contract. |
| **Material Design 3** | ✅ Partially — "component customization tokens" | MD3 defines per-component tokens (e.g., `md.comp.filled-button.container.color`) but these exist as **documentation artifacts** for platform implementors (Android, Flutter, Web). They're not separate files — they're generated from the role-based (semantic) tokens at build time. The source of truth remains the role-based color tokens + typescale. |

### Systems WITHOUT a Dedicated Component Token Layer

| System | Component tokens? | Approach |
|---|---|---|
| **GitHub Primer** | ❌ No separate layer | Primer uses `functional` tokens (semantic) directly in components. `--color-btn-primary-bg` lives in the **functional color** layer, not a separate component file. Layout values (padding, sizing) are from the spacing scale — consumed directly in component CSS. No merging file. |
| **Shopify Polaris** | ❌ No separate layer | Polaris uses semantic tokens directly. `--p-color-bg-fill-brand` is applied to Button in CSS. Sizing uses spacing tokens directly. There is no intermediate component token file. Component specs live in documentation, not in token files. |
| **Atlassian Design System** | ❌ No separate layer | Atlassian uses "design tokens" that are semantic (e.g., `color.background.brand.bold`) and consumed directly by components. No per-component token merging layer. |
| **IBM Carbon** | ❌ No separate layer | Carbon defines semantic "theme tokens" (colors) and layout tokens (spacing, type scale) consumed directly in component SCSS. Component specs reference the semantic tokens inline. No component-level token file. |
| **Open Props** | ❌ No concept of it | Open Props is purely a set of design primitives (custom properties). Components consume them directly. No aliasing or layering at all. |

### Pattern Summary

**Systems that use component tokens share these traits:**
- Ship components as a **library consumed by external teams** or **multiple platform implementations**
- Have **dedicated design systems teams** (5+ people) maintaining the token layer
- Need component tokens as an **API stability contract**

**Systems that don't use component tokens share these traits:**
- The same team owns both the tokens and the component implementations
- There's a single platform target (or a small number)
- Component specs live in documentation, not in the token pipeline

**The Gallery matches the second group perfectly.**

---

## B. The DTCG Spec Perspective

The W3C Design Tokens Community Group specification (the emerging standard) addresses token structure but does **not prescribe** a specific layering model. Key points:

1. **Groups and token names** — The spec defines tokens and groups (folders). It says nothing about whether groups should be organized by concern (color, spacing) or by component (button, input). Both are valid.

2. **Aliases ($value references)** — The spec supports aliases (`{other.token}` syntax), enabling any layering depth. But it includes cautionary language about **alias chains** — longer chains are harder to debug and maintain.

3. **No "component token" concept in the spec** — The DTCG spec treats all tokens equally. There's no built-in concept of "component-level" vs "semantic-level" tokens. The 3-tier model (primitive → semantic → component) is a **community convention**, not a spec requirement.

4. **The spec recommendation for types** — The DTCG spec encourages grouping by `$type` (color, dimension, etc.), which naturally aligns with the **per-concern** model (theme for colors, breakpoints for dimensions) rather than the **per-component** model.

**Verdict:** The spec is neutral, but its design leans toward per-type organization, which aligns with NOT having a separate component file.

---

## C. Style Dictionary Best Practices

### File Organization in SD v4

Style Dictionary v4's documentation and community patterns recommend:

1. **Organize by concern, not by component** — The canonical example is `color/`, `size/`, `font/` directories, not `button/`, `input/` directories.

2. **`source` array flattening** — Style Dictionary merges all files in `source: ['tokens/**/*.json']` into a single flat dictionary. File organization is for **human readability**, not for the build tool. Having `Light_tokens.json` and `Components_tokens.json` doesn't create layering — SD merges them into one namespace and resolves references.

3. **There is no built-in SD pattern for "merge theme-variant + breakpoint-variant at component level"** — SD doesn't natively understand that button colors come from Theme and button padding comes from Breakpoints. It just sees a flat dictionary. The merging you'd do in a component file is invisible to SD.

4. **Reference resolution** — When SD encounters `{layout.space.3}`, it resolves it to the final value. If `button.primary.padding-vertical → {layout.space.3}` and `layout.space.3 → 12`, the output is `--tg-button-primary-padding-vertical: 12`. The intermediate alias adds zero value to the CSS output — it's resolved away.

5. **Multi-file sets and theming** — SD v4 has better support for multiple output files (e.g., separate `light.css` and `dark.css`). The recommended approach is to have **theme files override semantic tokens**, not to merge themes into component tokens.

### The `outputReferences: true` Consideration

Your config uses `outputReferences: true`, which preserves alias chains in CSS:
```css
--tg-component-button-primary-bg-default: var(--tg-color-gray-700);
```

If you added a component file that aliases this, you'd get:
```css
--tg-button-primary-bg: var(--tg-component-button-primary-bg-default);
```

That's **three levels of `var()`** in the browser: `--tg-button-primary-bg` → `--tg-component-button-primary-bg-default` → `--tg-color-gray-700`. This has debugging and performance costs for zero functional benefit.

**Verdict:** Style Dictionary's architecture provides no benefit for component-level token files. The merging is invisible to the build tool.

---

## D. The "Single Source of Truth" Argument

### What value does the alias add?

If `button.primary.text` in components.tokens.json is just an alias to `component/button/primary/text` in Light.tokens.json:

| Claim | Reality |
|---|---|
| "It renames the token for developers" | The CSS output name is determined by Style Dictionary transforms, not by the file path. You can configure the output name without an alias file. |
| "It's a single place to see all button tokens" | It's a **copy** of what's already documented in context.md and visible in Figma. A Markdown spec file or Storybook docs serve this purpose better without creating a maintenance burden. |
| "It decouples component API from theme internals" | For a 1–2 person team where you own both the theme and the components, there's no "internal" vs "external" — you're the only consumer. Decoupling adds cost without benefit. |

### Maintenance cost

Every time a color changes in Figma and gets exported to Light.tokens.json:
- **Without component file:** You export, run build, done.
- **With component file:** You export, then must ensure components.tokens.json aliases still match the Theme tokens. If Figma changes a variable name or ID, the alias breaks silently.

### Figma → Token Export Workflow

Your current files show Figma Variable IDs and `com.figma.aliasData` metadata. This means the component file was exported from a Figma "Components" Variable Collection that aliases other collections.

The problem: **Figma exports each collection as a flat snapshot.** When you export Theme, Breakpoints, and Components collections, each file includes resolved values (not live references). The aliases in `com.figma.aliasData` are metadata — they're not functional `{reference}` syntax that Style Dictionary understands.

This means your components.tokens.json is:
1. A snapshot of resolved values (not real aliases)
2. Not consumable by Style Dictionary as references (it needs `{path.to.token}` syntax)
3. The `tokens/Components_tokens.json` version IS written in SD format — but only covers 5 input tokens

**This is already causing a sync issue.** The root `components.tokens.json` (Figma export) and `tokens/Components_tokens.json` (SD-formatted) are two different representations that must be kept manually aligned.

---

## E. Arguments FOR a Component Token File

| Argument | Validity for The Gallery |
|---|---|
| **Component API contract** | ❌ Not applicable. No external consumers. You own both the tokens and the sole Shopify implementation. An API contract matters when Team A publishes tokens and Team B consumes them. |
| **Developer discoverability** | ⚠️ Partially valid, but better solved by documentation. A quick-reference Markdown table or Storybook component page is more discoverable than a JSON file. |
| **Documentation value** | ⚠️ Partially valid, but the component file is a poor documentation format. Your `context.md` already documents component specs more clearly than the JSON ever could. |
| **Tree-shaking / selective generation** | ❌ Not applicable. Your Shopify theme loads all tokens as one CSS file. There's no per-component code-splitting for CSS custom properties. |
| **Figma ↔ code alignment** | ⚠️ The Figma Components Collection provides value IN FIGMA (as a way to apply variables to component instances). It doesn't need to be represented as a separate token file in code. |

### The one valid use case

If you were shipping the token system to **other Shopify merchants** who'd customize component appearance, a component token layer could serve as the customization API surface:

```css
/* Merchant override file */
--tg-button-primary-bg: var(--tg-color-brand);
--tg-button-primary-text: white;
```

But even for this use case, the current Theme tokens (`--tg-component-button-primary-bg-default`) already serve this purpose. A second alias layer doesn't help.

---

## F. Arguments AGAINST a Component Token File

| Argument | Severity for The Gallery |
|---|---|
| **Double/triple indirection** | 🔴 High. Button bg: `button.primary.bg` → `component/button/primary/bg/default` → `color/gray/700` → `#404040`. Three hops vs. two. Every hop is a debugging step. |
| **Sync issues between layers** | 🔴 High. **Already happening.** The root Figma export and the `tokens/` SD-formatted file have diverged. |
| **Figma export complexity** | 🟡 Medium. You must maintain a Components collection in Figma AND keep the token file manually synced. With 5 button variants × 10 properties = 50+ button tokens, plus inputs, this is real labor for one person. |
| **Maintenance overhead** | 🔴 High. Every token change requires updating 3 files (Primitive → Theme/Breakpoint → Component) instead of 2. For a solo/duo team, this triples the changelog surface. |
| **Build pipeline confusion** | 🟡 Medium. Having `components.tokens.json` at root (not consumed by SD) AND `tokens/Components_tokens.json` (consumed by SD) creates ambiguity about which is the source of truth. |
| **No functional difference in output** | 🔴 High. With `outputReferences: true`, the component alias adds a `var()` wrapper. Without it, the value is identical. Either way, the visual result is the same. |

---

## G. The E-Commerce / Shopify Consideration

### Shopify Theme Token Precedent

- **No major Shopify theme uses design tokens in a formal pipeline.** Dawn, Horizon, Prestige, Impact, Minimalista — all use CSS custom properties, but they're written manually (not generated from a token system).
- Shopify's own `settings_schema.json` system is the "token" mechanism for merchants. Colors exposed via `{{ settings.color_primary }}` in Liquid are the closest thing to theme tokens.
- **You're pioneering this approach for Shopify.** That means simpler is better — there's no community convention to follow, so you're better off with the leanest viable architecture you can explain to yourself in 6 months.

### Practical Impact for a Shopify Theme

1. **One CSS file, one scope.** Shopify loads `tokens.css` once. There's no route-based code splitting, no component lazy loading. All tokens are available everywhere. A component token layer doesn't enable any optimization.

2. **Dark mode via `[data-theme]` attribute.** Theme switching overrides semantic tokens. Component tokens in a separate file would need to be overridden per-theme OR continue to alias (in which case they add nothing).

3. **Breakpoint responsiveness via `@media`.** Responsive tokens already change via CSS media queries overriding `--tg-layout-space-*` values. Component padding that aliases these automatically responds. A component file doesn't improve this.

4. **Merchant customization** via settings_schema.json already provides the override layer that a component token file claims to provide.

---

## H. Recommendation

### Remove the Component Token File

**Recommended token architecture (3 layers, not 4):**

```
Primitives          →  Theme (Light/Dark)     →  CSS components
(raw values)           Breakpoints (M/T/D/XL)     consume directly
                       (includes component colors
                        and component layout)
```

### Specifically:

1. **Keep `component/button/*` color tokens in Theme (Light/Dark).** They already live there and work correctly. They vary by light/dark mode, which is the Theme collection's job.

2. **Move button layout tokens into Breakpoints** (where they belong): 
   - `components/button/padding-vertical` → aliases `layout/space/3`
   - `components/button/min-height` → aliases `layout/touch/min-height`
   - These are sizing values that *could* vary by breakpoint (e.g., denser buttons on desktop). They belong in the same collection as your input layout tokens.

3. **Keep `components/input/*` layout tokens in Breakpoints.** They're already there and working.

4. **Move input color tokens into Theme** (where they belong):
   - `component/input/label/color` → alias to `text/secondary`
   - `component/input/placeholder/color` → alias to color primitive
   - These should be theme-aware (light/dark), not hardcoded in a single-mode Components file.

5. **Delete `components.tokens.json` (root) and `tokens/Components_tokens.json`.** Their contents get absorbed into Theme and Breakpoints files.

6. **In CSS, compose directly:**
   ```css
   .button--primary {
     padding: var(--tg-components-button-padding-vertical) var(--tg-components-button-padding-horizontal);
     background: var(--tg-component-button-primary-bg-default);
     color: var(--tg-component-button-primary-text);
     border-color: var(--tg-component-button-primary-border);
     border-radius: var(--tg-border-radius-sm);
     min-height: var(--tg-layout-touch-min-height);
   }
   ```
   The CSS file IS the component composition layer. It's the right place to merge color + layout per component.

### What the Figma Components Collection Should Become

In Figma, you can keep the Components collection for **design workflow** — it's useful for applying variables to component instances. But **don't export it as a token file.** It's a Figma convenience, not a code artifact.

If you need component documentation, maintain it in `context.md` (which you already do excellently) or a Storybook setup.

### Decision Matrix

| Factor | Component File | No Component File |
|---|---|---|
| Maintenance effort | Higher (3-file sync) | Lower (2-file sync) |
| Build pipeline clarity | Confusing (2 formats) | Clean |
| Debug depth | 3 hops | 2 hops |
| Figma export workflow | More complex | Simpler |
| CSS output | Identical | Identical |
| Developer discoverability | JSON file | context.md + CSS |
| Future scalability | Needed if selling token library | Not needed for theme |
| Team size fit (1-2 people) | Over-engineered | Right-sized |

---

## I. Migration Checklist

If you adopt this recommendation:

- [ ] Move button layout tokens (`padding-vertical`, `padding-horizontal`, `gap`, `min-height`, `icon-size`) into Breakpoints collection in Figma (under `components/button/`)
- [ ] Move input color tokens (`label/color`, `placeholder/color`, `value/color`, `message/color`, `icon/color`) into Theme collection in Figma (under `component/input/`)
- [ ] Re-export Breakpoints and Theme from Figma
- [ ] Update `tokens/` directory — remove `Components_tokens.json`, update other files
- [ ] Verify `npm run build:tokens` produces correct `tokens.css`
- [ ] Delete root `components.tokens.json`
- [ ] Update `context.md` section 5 to reflect 3-tier hierarchy (remove "LEVEL 3: Components Collection")

### When to Revisit This Decision

Add a component token layer IF:
- You begin selling/licensing the token system to other Shopify merchants as a customizable package
- You add 3+ platform implementations (Shopify + Framer + iOS) that need a stable intermediate API
- The team grows to 4+ people with separate "design systems" and "implementation" roles

---

*Analysis prepared for The Gallery design system. Based on examination of the actual codebase, published documentation from SLDS, Spectrum, Primer, Polaris, Carbon, Material Design 3, Atlassian, Open Props, the DTCG spec, and Style Dictionary v4 patterns.*
