# The Gallery — Design System & Multi-Platform Context

> **Purpose of this document:** Complete context for GitHub Copilot and any AI assistant working on The Gallery design system. This document consolidates all design decisions, token architecture, branding guidelines, and technical requirements defined across multiple working sessions. The system is platform-agnostic — the Shopify theme is the first implementation, but the design tokens and architecture are built to support Framer, Webflow, and other platforms from the same repository.

---

## 1. Project Overview

**The Gallery** is a multi-platform design system and e-commerce theme for an art ceramics store. The aesthetic is editorial, clean, and minimalist — inspired by the way physical art galleries present work.

The project is structured as a **monorepo**: the design token system is the platform-agnostic core, and platform implementations (Shopify, Framer, Webflow, etc.) are built on top of it. The Shopify theme is the first implementation and primary development focus. The system may be sold/licensed to other merchants once mature.

### Core Principles
- **Swiss Design** influence: strong typographic hierarchy, generous whitespace, disciplined grid
- **Black & white first**: the palette is almost entirely neutral grays; color is used sparingly and only for semantic feedback states
- **Art-gallery feeling**: pieces deserve space, context, and storytelling — not aggressive e-commerce patterns
- **Content-first**: editorial sections (process, artist story, blog) are as important as product pages
- **Performance over decoration**: minimal JavaScript, fast load, accessible markup

### Reference Theme
The closest existing theme to the intended aesthetic is **Minimalista / Portfolio preset** by Segment ($380 on Shopify Theme Store). Key features to reference:
- Editorial/immersive layouts with flexible media sections
- Dark mode native
- 6 product gallery types (horizontal slider, grid, stacked, etc.)
- Lookbooks, before/after sliders, mega menu with images
- Slide-out cart, quick view

The Gallery should be **architecturally different** (built on Horizon Framework instead of OS 2.0) and add ceramics/artisan-specific features.

---

## 2. Business Context

- **Store type:** Art ceramics — handmade pieces, small-batch production
- **Content pillars:** Products, Artist story/process, Blog/editorial, Collections/lookbooks
- **Audience:** Design-conscious buyers who appreciate craft and provenance
- **Differentiation vs. competitors:** Storytelling depth, process transparency, gallery-quality product presentation

---

## 3. Technology Stack

| Layer | Choice |
|---|---|
| Shopify base | **Horizon Framework** (released May 2025, replacing Dawn/OS 2.0) |
| Template language | **Liquid** (Shopify) |
| CSS | Custom properties generated from design tokens |
| JS | Minimal, progressive enhancement |
| Design tool | **Figma** with Variable Collections |
| Token build pipeline | **Style Dictionary** (Amazon, open source) |
| Dev environment | Shopify CLI (`shopify theme dev`) |
| Version control | Git / GitHub (monorepo) |
| AI pair programmer | GitHub Copilot |
| Token export format | JSON (Figma Tokens Studio export) |

### Why Horizon over Dawn
- Horizon is Shopify's new default (May 2025), replacing Dawn which stopped active development in Sept 2024
- Introduces **Theme Blocks** — nested, modular, and **global** (reusable across all page types)
- AI Block Generator (Shopify Magic)
- More flexible layout system with page-wide sections
- Built for the future of Shopify's theme ecosystem

---

## 4. Multi-Platform Architecture

### Philosophy: Separate System from Implementation

The design tokens are **platform-agnostic**. The 8 JSON files exported from Figma are the single source of truth for every visual value. A build pipeline transforms them into the format each platform needs.

```
Figma Variables (design source)
        ↓  (Tokens Studio export)
  tokens/*.json  ←── single source of truth
        ↓
┌─────────────────────────────────────────────┐
│         Style Dictionary (build tool)        │
│         npm run build:tokens                 │
└─────────────────────────────────────────────┘
        ↓               ↓               ↓
  CSS custom        JS/ES6          iOS Swift
  properties        tokens          UIColors
  (Shopify)         (Framer)        (.xcassets)
                    (Webflow)
```

This means:
- **Changing a color in Figma** → export JSON → `npm run build:tokens` → all platforms updated
- Adding a new platform = adding a new config entry in Style Dictionary
- No manual copy-paste of values between platforms

### Monorepo Structure

The repository is `the-gallery` (not `the-gallery-theme`) — it represents the whole system.

```
the-gallery/
│
├── tokens/                        ← CORE: platform-agnostic source of truth
│   ├── Primitives_tokens.json
│   ├── Light_tokens.json
│   ├── Dark_tokens.json
│   ├── Mobile_tokens.json
│   ├── Tablet_tokens.json
│   ├── Desktop_tokens.json
│   ├── XL_tokens.json
│   └── Components_tokens.json
│
├── style-dictionary.config.js     ← build pipeline config
├── package.json                   ← root: build scripts
│
├── platforms/
│   ├── shopify/                   ← Shopify Horizon theme (active)
│   │   ├── assets/
│   │   │   ├── tokens.css         ← generated by Style Dictionary
│   │   │   ├── theme.css          ← handwritten theme styles
│   │   │   └── theme.js
│   │   ├── sections/
│   │   ├── snippets/
│   │   ├── templates/
│   │   ├── layout/
│   │   ├── config/
│   │   └── locales/
│   │
│   ├── framer/                    ← future
│   │   └── tokens.js              ← generated by Style Dictionary
│   │
│   └── webflow/                   ← future
│       └── tokens.css             ← generated by Style Dictionary
│
└── docs/
    ├── the-gallery-context.md     ← this file
    └── decisions.md
```

### Style Dictionary Setup

```bash
npm install -D style-dictionary
```

```js
// style-dictionary.config.js
const StyleDictionary = require('style-dictionary');

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {

    // Shopify — CSS custom properties
    shopify: {
      transformGroup: 'css',
      prefix: 'tg',                // --tg-color-surface-primary
      buildPath: 'platforms/shopify/assets/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true }
        }
      ]
    },

    // Framer — ES6 JS module
    framer: {
      transformGroup: 'js',
      buildPath: 'platforms/framer/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        }
      ]
    },

    // Webflow — CSS custom properties (same format, different output path)
    webflow: {
      transformGroup: 'css',
      buildPath: 'platforms/webflow/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables'
        }
      ]
    }

  }
};
```

```json
// package.json (root)
{
  "scripts": {
    "build:tokens": "style-dictionary build",
    "dev:shopify": "cd platforms/shopify && shopify theme dev --store YOUR-STORE.myshopify.com",
    "build": "npm run build:tokens"
  }
}
```

Running `npm run build:tokens` regenerates all platform outputs from the JSON source files.

### Platform Status

| Platform | Status | Notes |
|---|---|---|
| **Shopify** | 🟡 Active development | Horizon Framework, V1 in progress |
| **Framer** | ⚪ Future | tokens.js ready when needed |
| **Webflow** | ⚪ Future | tokens.css ready when needed |
| **iOS** | ⚪ Future | Potential via Style Dictionary Swift transform |

### What Each Platform Shares

All platforms get the same:
- Color palette (grays, browns, feedback colors)
- Typography scale (sizes, weights, line-heights per breakpoint)
- Spacing scale and semantic aliases
- Border radius values
- Shadow definitions
- Transition timing and easing values
- Z-index scale

Each platform handles **layout/grid/breakpoints differently** using their native mechanisms (Shopify sections, Framer canvas, Webflow grid) but consuming the same spacing token values.

---

## 5. Design System Architecture

### Token Hierarchy (3 Levels)

```
Primitives → Semantics (Theme + Breakpoints) → Components
```

Every value in the system must trace back through this hierarchy. **Hard-coded values are prohibited.** All component properties must reference semantic variables.

```
LEVEL 1: Primitives
  Raw values — the source of truth for all colors, sizes, and units.
  Never used directly in components.

LEVEL 2a: Theme Collection (Light / Dark modes)
  Semantic meaning for values that don't change with screen size.
  Examples: surface colors, text colors, border colors, shadows, border-radius.
  Components reference these for all visual style properties.

LEVEL 2b: Breakpoints Collection (Mobile / Tablet / Desktop / XL)
  Semantic meaning for values that DO change with screen size.
  Examples: font sizes, spacing, grid columns, container widths.
  Components reference these for all layout/sizing properties.

LEVEL 3: Components Collection
  Component-specific variables that don't fit cleanly into Theme or Breakpoints.
  References both Theme and Breakpoints — never raw Primitive values directly.
  Not every component needs entries here; use only when necessary.
```

### Figma Collections Summary

| Collection | Modes | Purpose |
|---|---|---|
| **Primitives** | Mode 1 (single) | Raw values: color scales, spacing scale, type scale, border-radius, shadows, opacity, transitions, z-index |
| **Theme** | Light, Dark | Semantic color tokens, shadow tokens, button/input component colors |
| **Breakpoints** | Mobile, Tablet, Desktop, XL | Typography scale, layout spacing, grid config, container widths |
| **Components** | (varies) | Additional component-specific overrides |

---

## 6. Primitive Tokens (Complete Reference)

### 6.1 Color — Gray Scale

| Token | Hex | Notes |
|---|---|---|
| `color/gray/0` | `#FFFFFF` | Pure white |
| `color/gray/50` | `#FAFAFA` | Near white |
| `color/gray/100` | `#F5F5F5` | Light background |
| `color/gray/200` | `#E5E5E5` | Borders, dividers |
| `color/gray/300` | `#D4D4D4` | Disabled borders |
| `color/gray/400` | `#A3A3A3` | Placeholder text |
| `color/gray/500` | `#737373` | Muted text |
| `color/gray/600` | `#525252` | Secondary text |
| `color/gray/700` | `#404040` | Strong text |
| `color/gray/800` | `#262626` | Very dark |
| `color/gray/900` | `#171717` | Near black |
| `color/gray/950` | `#0A0A0A` | Deepest black |
| `color/transparent` | `#FFFFFF` at 0 alpha | |

### 6.2 Color — Brown / Archival Scale (Mocha Mousse)
The brand accent color — used sparingly for archival/warm moments, not primary UI.

| Token | Hex |
|---|---|
| `color/brown/50` | `#F6F2F0` |
| `color/brown/100` | `#E8DDD6` |
| `color/brown/200` | `#D4CFC7` |
| `color/brown/300` | `#BFA193` |
| `color/brown/400` | `#AD8674` |
| `color/brown/500` | `#A47864` |
| `color/brown/600` | `#8B6553` |
| `color/brown/700` | `#6F4F3F` |
| `color/brown/800` | `#553A2C` |
| `color/brown/900` | `#3D2318` |

### 6.3 Color — Feedback (Semantic)
Used only for system states (success, error, warning, info).

| Token | Hex |
|---|---|
| `color/feedback/info` | `#3B82F6` |
| `color/feedback/success` | `#10B981` |
| `color/feedback/warning` | `#F59E0B` |
| `color/feedback/error` | `#EF4444` |

### 6.4 Border Radius

| Token | Value |
|---|---|
| `border-radius/none` | `0px` |
| `border-radius/sm` | `4px` |
| `border-radius/md` | `8px` |
| `border-radius/lg` | `12px` |
| `border-radius/xl` | `16px` |
| `border-radius/2xl` | `24px` |
| `border-radius/full` | `999px` |

### 6.5 Opacity

| Token | Value |
|---|---|
| `opacity/0` | `0` |
| `opacity/10` | `0.10` |
| `opacity/20` | `0.20` |
| `opacity/40` | `0.40` |
| `opacity/50` | `0.50` |
| `opacity/60` | `0.60` |
| `opacity/80` | `0.80` |
| `opacity/100` | `1` |

### 6.6 Transitions

| Token | Value (ms) |
|---|---|
| `transitions/fast` | `100` |
| `transitions/base` | `200` |
| `transitions/slow` | `300` |
| `transitions/slower` | `500` |

### 6.7 Easing

| Token | Value |
|---|---|
| `easing/linear` | `linear` |
| `easing/in` | `ease-in` |
| `easing/out` | `ease-out` |
| `easing/in-out` | `ease-in-out` |
| `easing/spring` | `cubic-bezier(0.4, 0, 0.2, 1)` |

### 6.8 Z-Index

| Token | Value |
|---|---|
| `z-index/base` | `0` |
| `z-index/dropdown` | `1000` |
| `z-index/sticky` | `1050` |
| `z-index/overlay` | `1100` |
| `z-index/modal` | `1200` |
| `z-index/toast` | `1300` |

### 6.9 Typography Primitives

**Font Families:**
- `typography/font/family/main` → `Inter` (UI, body, labels)
- `typography/font/family/display` → `Lora` (editorial, article body, headings in blog context)

**Font Weights:**
| Token | Value |
|---|---|
| `typography/font/weight/regular` | `400` |
| `typography/font/weight/medium` | `500` |
| `typography/font/weight/semibold` | `600` |
| `typography/font/weight/bold` | `700` |

---

## 7. Semantic Tokens — Theme Collection

### 7.1 Surface Colors

| Token | Light | Dark |
|---|---|---|
| `surface/primary` | `#FFFFFF` | `#171717` |
| `surface/secondary` | `#F5F5F5` | `#262626` |
| `surface/archival` | `#F6F2F0` | `#553A2C` |
| `surface/statement` | `#FFF7ED` | `#9A3412` |

### 7.2 Text Colors

| Token | Light | Dark |
|---|---|---|
| `text/primary` | `#171717` | `#FAFAFA` |
| `text/secondary` | `#525252` | `#D4D4D4` |
| `text/archival` | `#8B6553` | `#AD8674` |
| `text/statement` | `#EA580C` | `#FB923C` |

### 7.3 Border Colors

| Token | Light | Dark |
|---|---|---|
| `border/default` | `#E5E5E5` | `#404040` |
| `border/archival` | `#BFA193` | `#8B6553` |
| `border/statement` | `#FDBA74` | `#EA580C` |

### 7.4 Feedback Colors

| Token | Light | Dark |
|---|---|---|
| `feedback/info/bg` | `#DBEAFE` | `#1D4ED8` |
| `feedback/info/default` | `#3B82F6` | `#60A5FA` |
| `feedback/info/hover` | `#2563EB` | `#93C5FD` |
| `feedback/success/bg` | `#D1FAE5` | `#047857` |
| `feedback/success/default` | `#10B981` | `#34D399` |
| `feedback/warning/bg` | `#FEF3C7` | `#B45309` |
| `feedback/warning/default` | `#F59E0B` | `#FBBF24` |
| `feedback/error/bg` | `#FEE2E2` | `#B91C1C` |
| `feedback/error/default` | `#EF4444` | `#F87171` |

### 7.5 Shadows

Shadows are defined as individual properties (not CSS shorthand) to comply with Figma's variable system.

**Light Mode:**

| Shadow | x | y | blur | spread | color |
|---|---|---|---|---|---|
| `shadow/sm` | 0 | 1 | 2 | 0 | `#171717` @ 5% |
| `shadow/md` | 0 | 4 | 6 | -1 | `#171717` @ 10% |
| `shadow/lg` | 0 | 10 | 15 | -3 | `#171717` @ 10% |
| `shadow/xl` | 0 | 20 | 25 | -5 | `#171717` @ 10% |
| `shadow/2xl` | 0 | 25 | 50 | -12 | `#171717` @ 25% |

**Dark Mode:**

| Shadow | color |
|---|---|
| `shadow/sm` | `#F5F5F5` @ 10% |
| `shadow/md` | `#F5F5F5` @ 15% |
| `shadow/lg` | `#F5F5F5` @ 20% |
| `shadow/xl` | `#F5F5F5` @ 25% |
| `shadow/2xl` | `#F5F5F5` @ 30% |

### 7.6 Component Button Colors (in Theme Collection)

These live in the Theme collection under `component/button/` because they vary by Light/Dark mode.

#### Button Primary (Black in light, White in dark — gallery aesthetic)

| Token | Light | Dark |
|---|---|---|
| `component/button/primary/bg/default` | `#404040` | `#FFFFFF` |
| `component/button/primary/bg/hover` | `#262626` | `#FAFAFA` |
| `component/button/primary/bg/active` | `#0A0A0A` | `#F5F5F5` |
| `component/button/primary/text` | `#FFFFFF` | `#171717` |
| `component/button/primary/border` | transparent | transparent |

#### Button Secondary

| Token | Light | Dark |
|---|---|---|
| `component/button/secondary/bg/default` | `#F5F5F5` | `#262626` |
| `component/button/secondary/bg/hover` | `#E5E5E5` | `#404040` |
| `component/button/secondary/bg/active` | `#D4D4D4` | `#525252` |
| `component/button/secondary/text` | `#171717` | `#FAFAFA` |

#### Button Outline

| Token | Light | Dark |
|---|---|---|
| `component/button/outline/bg/default` | transparent | transparent |
| `component/button/outline/bg/hover` | `#FAFAFA` | `#262626` |
| `component/button/outline/bg/active` | `#F5F5F5` | `#404040` |
| `component/button/outline/text` | `#171717` | `#FFFFFF` |
| `component/button/outline/border` | `#171717` | `#FFFFFF` |

#### Button Link

| Token | Light | Dark |
|---|---|---|
| `component/button/link/bg/default` | transparent | transparent |
| `component/button/link/bg/hover` | `#F5F5F5` | `#262626` |
| `component/button/link/text` | `#171717` | `#FAFAFA` |
| `component/button/link/border` | `#171717` | `#FAFAFA` |

#### Button Danger

| Token | Light | Dark |
|---|---|---|
| `component/button/danger/bg/default` | `#EF4444` | — |
| `component/button/danger/bg/hover` | `#DC2626` | — |
| `component/button/danger/text` | `#FEE2E2` | — |

---

## 8. Semantic Tokens — Breakpoints Collection

### 8.1 Typography Scale (Responsive)

| Style | Mobile | Tablet | Desktop | XL |
|---|---|---|---|---|
| **Display size** | 36px | 44px | 56px | 64px |
| **Display weight** | 700 | 700 | 700 | 700 |
| **Display line-height** | 40px | 50px | 62px | 72px |
| **H1 size** | 28px | 36px | 44px | 52px |
| **H1 weight** | 600 | 600 | 600 | 600 |
| **H1 line-height** | 34px | 44px | 53px | 60px |
| **H2 size** | 24px | 28px | 32px | 38px |
| **H2 weight** | 600 | 600 | 600 | 600 |
| **H2 line-height** | 30px | 35px | 40px | 46px |
| **H3 size** | 20px | 22px | 24px | 28px |
| **H3 weight** | 500 | 500 | 500 | 500 |
| **Body large size** | 18px | 18px | 20px | 20px |
| **Body large line-height** | 29px | 29px | 32px | 32px |
| **Body default size** | 16px | 16px | 18px | 18px |
| **Body default line-height** | 24px | 24px | 27px | 27px |
| **Body small size** | 14px | 14px | 14px | 14px |
| **Body caption size** | 12px | 12px | 12px | 12px |
| **Article title size** | 24px | 28px | 32px | 36px |
| **Article body size** | 16px | 16px | 18px | 18px |
| **Button text size** | 16px | 16px | 18px | 18px |
| **Button weight** | 500 | 500 | 500 | 500 |

### 8.2 Spacing Scale

The spacing scale changes values between mobile and desktop (mobile uses a tighter scale).

**Mobile spacing scale (`layout/space/N`):**
| Token | Value |
|---|---|
| `layout/space/0` | 0px |
| `layout/space/1` | 4px |
| `layout/space/2` | 8px |
| `layout/space/3` | 12px |
| `layout/space/4` | 16px |
| `layout/space/5` | 20px |
| `layout/space/6` | 24px |
| `layout/space/7` | 32px |
| `layout/space/8` | 40px |
| `layout/space/9` | 56px |
| `layout/space/10` | 72px |
| `layout/space/11` | 96px |
| `layout/space/12` | 128px |

**Desktop spacing scale (`layout/space/N`):**
| Token | Value |
|---|---|
| `layout/space/0` | 0px |
| `layout/space/1` | 4px |
| `layout/space/2` | 8px |
| `layout/space/3` | 12px |
| `layout/space/4` | 16px |
| `layout/space/5` | 24px |
| `layout/space/6` | 32px |
| `layout/space/7` | 48px |
| `layout/space/8` | 64px |
| `layout/space/9` | 96px |
| `layout/space/10` | 128px |
| `layout/space/11` | 192px |
| `layout/space/12` | 256px |

### 8.3 Semantic Spacing Aliases

These aliases map to `layout/space/N` values and are what components should reference:

**Stack spacing** (vertical rhythm between elements):
```
stack/none  → space/0
stack/xs    → space/2
stack/sm    → space/3
stack/md    → space/4
stack/lg    → space/5 (mobile) / space/6 (desktop)
stack/xl    → space/7 (mobile) / space/8 (desktop)
stack/2xl   → space/9 (mobile) / space/10 (desktop)
stack/3xl   → space/10 (mobile) / space/12 (desktop)
```

**Inline spacing** (horizontal rhythm):
```
inline/xs   → space/1
inline/sm   → space/2
inline/md   → space/3
inline/lg   → space/4
inline/xl   → space/5 (mobile) / space/6 (desktop)
inline/2xl  → space/7 (mobile) / space/8 (desktop)
inline/3xl  → space/9 (mobile)
```

**Component spacing** (internal padding within components):
```
component/xs → space/4
component/sm → space/5
component/md → space/6
component/lg → space/7
component/xl → space/9
```

**Section spacing** (between major page sections):
```
section/xs → space/7
section/sm → space/8
section/md → space/9
section/lg → space/10
section/xl → space/11
```

### 8.4 Grid & Container

| Property | Mobile | Tablet | Desktop | XL |
|---|---|---|---|---|
| `layout/container/max-width` | 327px | 768px | 1200px | 1440px |
| `layout/container/margin` | 24px | 48px | 120px | 160px |
| `layout/grid/columns` | 4 | 8 | 12 | 12 |
| `layout/grid/gutter` | 16px | 24px | 32px | 32px |
| `layout/grid/margin` | 24px | 48px | 120px | 160px |

**Container Padding Aliases:**
```
container/padding/none → space/0
container/padding/xs   → space/3
container/padding/sm   → space/4
container/padding/md   → space/5 (mobile) / space/6 (desktop)
container/padding/lg   → space/7 (mobile) / space/8 (desktop)
container/padding/xl   → space/9 (mobile) / space/10 (desktop)
```

### 8.5 Touch Targets
```
layout/touch/min-height → 44px
layout/touch/min-width  → 44px
```

---

## 9. Components Collection — Component Specs

### 9.1 Design Rules for All Components
1. **All spacing** → reference `layout/space/*` or semantic aliases from Breakpoints collection
2. **All colors** → reference semantic tokens from Theme collection (`surface/*`, `text/*`, `border/*`, `component/*`)
3. **Font sizes** → reference `typography/*` from Breakpoints collection
4. **Minimum touch targets** → 44×44px minimum for interactive elements
5. **Variants must be functional/conceptual** — never size-based (responsive sizing is automatic via Breakpoints)
6. **No hardcoded values** in any component

### 9.2 Button

**Variants:** `primary` | `secondary` | `outline` | `link` | `danger`
**States:** `default` | `hover` | `active/pressed` | `disabled` | `loading`
**Icon position:** `none` | `left` | `right`

```
Button structure:
├── Auto Layout: Horizontal
├── Padding: component/xs (vertical) + component/md (horizontal)
├── Gap: inline/md between icon and label
├── Min-height: layout/touch/min-height (44px)
├── Border-radius: border-radius/sm (4px) for primary/secondary
│   border-radius/none for outline (gallery aesthetic)
├── Typography: typography/component/button (size + weight + line-height)
│
└── Colors reference Theme collection:
    Primary:   component/button/primary/*
    Secondary: component/button/secondary/*
    Outline:   component/button/outline/*
    Link:      component/button/link/*
    Danger:    component/button/danger/*
```

**Disabled state (all variants):**
- Opacity: `opacity/40`
- Pointer events: none
- No color change needed (opacity handles it)

### 9.3 Input / Form Fields

**States:** `unfocused` | `focused` | `error` | `success` | `disabled`

```
Input structure:
├── Padding H: components/input/padding-horizontal → layout/space/3
├── Padding V: components/input/padding-vertical → layout/space/3
├── Margin top: components/input/margin-top → layout/space/4
├── Margin bottom: components/input/margin-bottom → layout/space/1
├── Icon size: components/input/icon-size → layout/space/5
│
├── Font/label: typography/body/small (size from Breakpoints)
├── Font/placeholder: typography/body/default
├── Font/value: typography/body/default
├── Font/message: typography/body/caption
│
└── Colors reference Theme collection:
    Label color: text/secondary
    Placeholder: color/gray/400 (#A3A3A3)
    Border unfocused: border/default
    Border focused: text/primary
    Border error: feedback/error/default
    Border success: feedback/success/default
    Background: surface/primary
```

### 9.4 Card — Product Card

```
Product Card:
├── Container:
│   ├── Background: surface/primary
│   ├── Border: 1px solid border/default (optional — minimal aesthetic)
│   ├── Border-radius: border-radius/none (sharp, gallery feel)
│   └── Shadow: none default / shadow/sm on hover
│
├── Image container:
│   ├── Aspect ratio: 3:4 (portrait — best for ceramics)
│   ├── Overflow: hidden
│   └── Background: surface/secondary (placeholder)
│
├── Content block:
│   ├── Padding: component/sm
│   ├── Stack gap: stack/xs between elements
│   │
│   ├── Product name: typography/heading/h3, text/primary
│   ├── Collection/category: typography/body/caption, text/secondary
│   ├── Price: typography/body/default weight/medium, text/primary
│   └── Secondary price (compare): typography/body/small, text/secondary, strikethrough
│
└── Hover state:
    ├── Image: second variant image shown (rollover)
    └── Quick add button: appears overlay or below
```

### 9.5 Navigation / Header

```
Header:
├── Height: layout/space/9 (56px mobile → 96px desktop)
├── Background: surface/primary
├── Border-bottom: 1px solid border/default
├── Position: sticky, top 0
├── Z-index: z-index/sticky (1050)
│
├── Logo: left-aligned
├── Nav links: center (desktop) / hidden (mobile)
│   ├── Typography: typography/body/default, weight/medium
│   └── Color: text/primary, text/secondary on hover
├── Actions (right):
│   ├── Search icon
│   ├── Cart icon + count badge
│   └── Account icon
│
└── Mobile: Hamburger → full-screen overlay nav
    ├── Background: surface/primary
    └── Z-index: z-index/overlay (1100)
```

---

## 10. Shopify Theme Structure

### 10.1 Base: Horizon Framework

The theme is based on Shopify's **Horizon** theme (released May 2025). Key architectural differences from Dawn/OS 2.0:

- **Global Theme Blocks**: Blocks are now reusable across all page templates, not locked to a single section
- **Nested blocks**: Blocks can contain child blocks for complex layouts
- **AI Block Generator**: Built-in via Shopify Magic
- **Better performance architecture**: Designed for faster LCP/CLS metrics

### 10.2 Repository Setup

```bash
# Clone Horizon into the platforms/shopify subfolder of the monorepo
mkdir the-gallery && cd the-gallery
git init
git remote add origin https://github.com/YOUR_USERNAME/the-gallery.git

# Pull Horizon into the shopify platform folder
git subtree add --prefix=platforms/shopify \
  https://github.com/Shopify/horizon.git main --squash

# Keep Horizon as upstream for future Shopify theme updates
git remote add horizon https://github.com/Shopify/horizon.git

# Initialize root package.json for the monorepo
npm init -y
npm install -D style-dictionary

git push -u origin main
```

### 10.3 Folder Structure

```
the-gallery/                       ← monorepo root
│
├── tokens/                        ← design token JSON files (source of truth)
├── style-dictionary.config.js     ← token build pipeline
├── package.json                   ← root scripts
│
└── platforms/
    └── shopify/                   ← the Shopify theme
        ├── assets/
        │   ├── tokens.css         ← AUTO-GENERATED by Style Dictionary
        │   ├── theme.css          ← handwritten theme styles
        │   └── theme.js
        ├── blocks/                ← Global reusable blocks (Horizon-specific)
        ├── config/
        │   ├── settings_schema.json
        │   └── settings_data.json
        ├── layout/
        │   └── theme.liquid
        ├── sections/
        │   ├── header.liquid
        │   ├── footer.liquid
        │   ├── hero.liquid
        │   ├── collection-grid.liquid
        │   ├── product-gallery.liquid
        │   ├── artist-story.liquid
        │   ├── process-timeline.liquid
        │   └── editorial-media.liquid
        ├── snippets/
        │   ├── product-card.liquid
        │   ├── button.liquid
        │   ├── icon.liquid
        │   └── price.liquid
        ├── templates/
        │   ├── index.json
        │   ├── product.json
        │   ├── collection.json
        │   ├── cart.json
        │   ├── page.json
        │   ├── blog.json
        │   ├── article.json
        │   └── 404.json
        └── locales/
            └── en.default.json
```

### 10.4 settings_schema.json Theme Info

```json
{
  "name": "theme_info",
  "theme_name": "The Gallery",
  "theme_version": "0.1.0",
  "theme_author": "Your Name",
  "theme_documentation_url": "",
  "theme_support_url": ""
}
```

### 10.5 Development Workflow

```bash
# From monorepo root — regenerate all platform token files
npm run build:tokens

# Start Shopify local dev server
npm run dev:shopify
# or directly:
cd platforms/shopify && shopify theme dev --store YOUR-STORE.myshopify.com

# This creates a private "development" theme — does NOT affect live theme
# Preview URL generated automatically, hot reload on file save
```

### 10.6 CSS Architecture — Token Mapping

Design tokens must be expressed as **CSS custom properties** in `assets/theme.css`. The Liquid variables in `settings_schema.json` feed into these.

```css
/* assets/theme.css */
:root {
  /* ---- COLORS ---- */
  --color-surface-primary: {{ settings.color_surface_primary | default: '#FFFFFF' }};
  --color-surface-secondary: #F5F5F5;
  --color-text-primary: #171717;
  --color-text-secondary: #525252;
  --color-border-default: #E5E5E5;

  /* ---- TYPOGRAPHY ---- */
  --font-family-main: 'Inter', -apple-system, sans-serif;
  --font-family-display: 'Lora', Georgia, serif;

  /* ---- SPACING (Desktop) ---- */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;
  --space-11: 192px;
  --space-12: 256px;

  /* ---- BORDERS ---- */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-none: 0px;

  /* ---- SHADOWS ---- */
  --shadow-sm: 0 1px 2px rgba(23, 23, 23, 0.05);
  --shadow-md: 0 4px 6px rgba(23, 23, 23, 0.10);
  --shadow-lg: 0 10px 15px rgba(23, 23, 23, 0.10);

  /* ---- TRANSITIONS ---- */
  --transition-fast: 100ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
  --ease-out: ease-out;
  --ease-spring: cubic-bezier(0.4, 0, 0.2, 1);

  /* ---- Z-INDEX ---- */
  --z-dropdown: 1000;
  --z-sticky: 1050;
  --z-overlay: 1100;
  --z-modal: 1200;

  /* ---- LAYOUT ---- */
  --container-max-width: 1200px;
  --container-margin: 120px;
  --grid-columns: 12;
}

/* Dark mode */
[data-theme="dark"] {
  --color-surface-primary: #171717;
  --color-surface-secondary: #262626;
  --color-text-primary: #FAFAFA;
  --color-text-secondary: #D4D4D4;
  --color-border-default: #404040;
}

/* Mobile overrides */
@media (max-width: 767px) {
  :root {
    --space-5: 20px;
    --space-6: 24px;
    --space-7: 32px;
    --space-8: 40px;
    --space-9: 56px;
    --space-10: 72px;
    --space-11: 96px;
    --space-12: 128px;
    --container-max-width: 327px;
    --container-margin: 24px;
    --grid-columns: 4;
  }
}
```

---

## 11. Page Templates — Priority Order

Build in this order. V1 must have the first 5.

| Priority | Template | Notes |
|---|---|---|
| 🔴 1 | **Home** (`index`) | Hero, product grid, artist intro, editorial section |
| 🔴 2 | **Product** (`product`) | Gallery (stacked/grid), add to cart, process notes, artist info |
| 🔴 3 | **Collection** (`collection`) | Product grid, filters (minimal), section intro |
| 🔴 4 | **Cart** (`cart`) | Line items, slide-out drawer version |
| 🔴 5 | **Page** (`page`) | About, Contact, process/studio pages |
| 🟡 6 | **Blog** (`blog`) | Article list, editorial feel |
| 🟡 7 | **Article** (`article`) | Full article, Lora font, generous spacing |
| 🟢 8 | **Search** (`search`) | Results grid |
| 🟢 9 | **404** (`404`) | On-brand error page |

---

## 12. Sections — Custom to The Gallery

Beyond Horizon's built-in sections, The Gallery needs:

### `artist-story.liquid`
A dedicated section for the maker/artist narrative. Inputs:
- Portrait image (large, editorial)
- Headline (H2)
- Story body text (multi-paragraph, Lora font)
- Optional pull-quote

### `process-timeline.liquid`
Step-by-step visual of the ceramics process. Inputs:
- Number of steps (2–6)
- Per step: image, step number, title, description
- Layout: horizontal scroll on mobile, multi-column on desktop

### `editorial-media.liquid`
Flexible full/split/grid media section. Layouts:
- Full-width single image/video
- 50/50 split (image + text)
- 3-column image grid
- Asymmetric (60/40 split, gallery style)

### `product-gallery-hero.liquid`
Dedicated product presentation with multiple gallery types:
- Stacked (scroll through full images vertically)
- Grid (masonry-style thumbnail grid)
- Horizontal slider with thumbnails

---

## 13. Design Language — Rules for Copilot

When generating any UI code for this project, follow these rules:

### Typography
- **Display/H1 headings:** Inter or Lora depending on context. Headings on product pages = Inter. Blog/editorial = Lora.
- **Body text:** Inter always
- **Letter spacing:** Tight (-0.02em) for display, 0 for body, slight positive (+0.01em) for captions
- **Line heights:** Generous — approx 1.5–1.6× for body, 1.1–1.2× for display

### Spacing
- **Whitespace is intentional and generous.** When in doubt, add more space.
- Sections on desktop: minimum 96px vertical gap between major sections
- Product cards: tight spacing within card, generous grid gap between cards

### Color
- **Default palette: near-black text on white.** Not true black (#000) on white — use `#171717` on `#FFFFFF`
- **Brown/warm tones:** Used only for "archival" or accent moments — artist bio section, editorial callouts, process section backgrounds
- **No gratuitous color.** Feedback states only use color when necessary for clarity

### Borders & Radius
- **Product images and cards:** `border-radius/none` — sharp corners, gallery feel
- **Form inputs:** `border-radius/sm` (4px) — functional, not playful
- **Buttons:** `border-radius/none` for primary/outline (editorial), `border-radius/full` only for icon-only circular buttons if needed

### Imagery
- **Aspect ratios:** 3:4 (portrait) for product cards, 16:9 or custom for editorial/hero
- **Object-fit:** always `cover` with thoughtful focal point
- **Lazy loading:** always on images below fold

### Animations
- **Subtle only:** `transition-base` (200ms) for hovers, `transition-slow` (300ms) for reveals
- **Easing:** `ease-out` for most, `ease-spring` for element entrances
- **No bounce, no overshoot** — restrained gallery sensibility

---

## 14. Shopify-Specific Technical Notes

### Liquid Basics
```liquid
{{ product.title }}              — output variable
{% if product.available %}       — conditional
{% for variant in product.variants %} — loop
{{ product.price | money }}      — filter (money formatting)
{{ 'theme.css' | asset_url | stylesheet_tag }} — asset URL helper
```

### Section Schema Pattern
Every `.liquid` file in `/sections/` should have a `{% schema %}` block at the bottom:

```liquid
{% schema %}
{
  "name": "Artist Story",
  "tag": "section",
  "class": "section-artist-story",
  "settings": [
    {
      "type": "image_picker",
      "id": "artist_image",
      "label": "Artist portrait"
    },
    {
      "type": "text",
      "id": "headline",
      "label": "Headline",
      "default": "The maker behind the work"
    },
    {
      "type": "richtext",
      "id": "story_text",
      "label": "Story"
    }
  ],
  "presets": [
    {
      "name": "Artist Story"
    }
  ]
}
{% endschema %}
```

### Key Shopify Objects
| Object | Use |
|---|---|
| `product` | Product page — title, price, variants, images, description, metafields |
| `collection` | Collection page — products, title, image, description |
| `cart` | Cart — items, total, count |
| `customer` | Logged-in customer data |
| `shop` | Store-level info (name, currency, etc.) |
| `settings` | Theme settings from `settings_data.json` |
| `section` | Current section settings and blocks |
| `block` | Individual block within a section |

### Metafields — Ceramics-Specific
Custom data for products (set up in Shopify Admin → Settings → Custom data):

Recommended custom metafields:
```
product.metafields.ceramics.technique   — "Wheel-thrown", "Hand-built", "Slip-cast"
product.metafields.ceramics.clay_body   — "Stoneware", "Porcelain", "Earthenware"
product.metafields.ceramics.glaze       — Glaze description
product.metafields.ceramics.dimensions  — "H: 12cm × Ø: 8cm"
product.metafields.ceramics.edition     — "One of a kind" | "Limited edition of N"
product.metafields.ceramics.fired_at    — "1280°C (cone 10)"
product.metafields.ceramics.care        — Care instructions
```

---

## 15. Git Branching Strategy

> **Note:** The repository should be named `the-gallery` (not `the-gallery-theme`) to reflect the multi-platform scope.

```
main          → production
develop       → integration branch
feature/*     → individual features
fix/*         → bug fixes
platform/*    → new platform bootstrapping (e.g. platform/framer)
tokens/*      → design token updates (e.g. tokens/add-spacing-2xl)
```

Example branches:
```
feature/header-navigation
feature/hero-section
feature/product-gallery
feature/product-card
feature/collection-grid
feature/artist-story-section
feature/process-section
feature/cart-drawer
feature/dark-mode
tokens/update-typography-scale
platform/framer-setup
```

---

## 16. V1 Scope — What to Build First

The minimum to launch on the ceramics store:

### Must Have (V1)
- [ ] `theme.liquid` root layout with CSS variable system
- [ ] `header.liquid` — sticky header, logo, nav, cart icon
- [ ] `footer.liquid` — simple: links, newsletter, social
- [ ] `index.json` home template with:
  - [ ] Hero section (full-width image + headline + CTA)
  - [ ] Featured collection grid (3–4 products)
  - [ ] Artist intro section
- [ ] `product.json` template with:
  - [ ] Product image gallery (stacked layout)
  - [ ] Product info (title, price, variants, add to cart)
  - [ ] Ceramics metafields display (technique, dimensions, edition)
  - [ ] Related products
- [ ] `collection.json` template — product grid with filters
- [ ] `cart.json` — drawer cart + page fallback
- [ ] `page.json` — generic page (About, Contact)

### V2 (After Launch)
- [ ] Dark mode toggle
- [ ] Blog / Article templates
- [ ] Lookbook section
- [ ] Process timeline section
- [ ] Mega menu with images
- [ ] Quick view modal
- [ ] Advanced product filtering
- [ ] Search with predictive results

---

## 17. Files in This Project (Design Tokens JSON)

The following JSON files are the exported Figma design tokens. They are the single source of truth for all visual values:

| File | Contents |
|---|---|
| `Primitives_tokens.json` | All raw primitive values |
| `Light_tokens.json` | Theme collection — Light mode |
| `Dark_tokens.json` | Theme collection — Dark mode |
| `Mobile_tokens.json` | Breakpoints collection — Mobile |
| `Tablet_tokens.json` | Breakpoints collection — Tablet |
| `Desktop_tokens.json` | Breakpoints collection — Desktop |
| `XL_tokens.json` | Breakpoints collection — XL |
| `Components_tokens.json` | Component-level variables |

These files should be used to generate the CSS custom properties in `assets/theme.css` during the build process, or referenced manually when writing component styles.

---

## 18. Key Decisions Log

| Decision | Rationale |
|---|---|
| Monorepo (`the-gallery`, not `the-gallery-theme`) | System is platform-agnostic; Shopify is the first implementation, not the only one |
| Style Dictionary as token build pipeline | Industry standard, open source, generates any format from same JSON source |
| Tokens as source of truth, never platform files | Change once in Figma → export JSON → `npm run build:tokens` → all platforms updated |
| Horizon over Dawn | Horizon is Shopify's active investment; Dawn is in maintenance mode |
| Inter + Lora | Inter for UI clarity, Lora for editorial warmth in article/blog contexts |
| Black/white primary palette | Gallery aesthetic — ceramics speak through photography, not color UI |
| Brown as accent (not primary) | Mocha Mousse warmth used contextually, not as brand color |
| border-radius/none for core components | Sharp edges = gallery, not e-commerce |
| Component variants = functional, not size-based | Responsive sizing is handled by Breakpoints collection automatically |
| Semantic tokens never reference primitives directly in components | Ensures theme-switching works correctly |
| Shadows defined as individual properties in Figma | Figma's variable system requires x/y/blur/spread/color as separate tokens |
| 44px minimum touch targets | WCAG 2.5.5 compliance |
| Article body in Lora | Differentiated reading experience for craft/editorial content |
| CSS custom properties for token output | Native browser feature, zero runtime cost, supports dark mode via `[data-theme]` attribute |

---

*Last updated from multi-session context consolidation. Source chats: "E-commerce website design system", "E-commerce design system refinement", and The Gallery Shopify theme / multi-platform architecture sessions.*
