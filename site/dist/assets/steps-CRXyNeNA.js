import{j as s}from"./index-Dg0DyNZX.js";function o(n){const e={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...n.components},{Callout:a,Do:l,DoDont:c,Dont:r,Preview:i,PropTable:d}=e;return a||t("Callout"),l||t("Do"),c||t("DoDont"),r||t("Dont"),i||t("Preview"),d||t("PropTable"),s.jsxs(s.Fragment,{children:[s.jsx(e.h2,{children:"Overview"}),`
`,s.jsx(e.p,{children:"Horizontal and vertical step indicator. Active, done, upcoming states."}),`
`,s.jsx(i,{html:'<div class="steps"><div class="steps__item steps__item--done"><span class="steps__indicator">✓</span><span class="steps__label">Step 1</span></div><div class="steps__item steps__item--active"><span class="steps__indicator">2</span><span class="steps__label">Step 2</span></div><div class="steps__item"><span class="steps__indicator">3</span><span class="steps__label">Step 3</span></div></div>',label:"Steps / Stepper"}),`
`,s.jsx(e.h2,{children:"Variants"}),`
`,s.jsx(e.h3,{children:"Horizontal"}),`
`,s.jsx(i,{html:'<div class="steps"><div class="steps__item steps__item--done"><span class="steps__indicator">✓</span><span class="steps__label">Done</span></div><div class="steps__item steps__item--active"><span class="steps__indicator">2</span><span class="steps__label">Current</span></div></div>',label:"Horizontal"}),`
`,s.jsx(e.h3,{children:"Vertical"}),`
`,s.jsx(i,{html:'<div class="steps steps--vertical"><div class="steps__item steps__item--done"><span class="steps__indicator">✓</span><span class="steps__label">Done</span></div><div class="steps__item steps__item--active"><span class="steps__indicator">2</span><span class="steps__label">Current</span></div></div>',label:"Vertical"}),`
`,s.jsx(e.h2,{children:"Usage Guidelines"}),`
`,s.jsxs(c,{children:[s.jsx(l,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),s.jsx(r,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,s.jsx(e.h2,{children:"Accessibility"}),`
`,s.jsx(a,{type:"warning",children:s.jsx(e.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsx(e.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,s.jsx(e.h2,{children:"API Reference"}),`
`,s.jsxs(d,{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx(e.code,{children:".steps"})}),s.jsx("td",{children:"class"}),s.jsx("td",{children:"—"}),s.jsx("td",{children:"Base steps / stepper styles"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx(e.code,{children:".steps--horizontal"})}),s.jsx("td",{children:"modifier"}),s.jsx("td",{children:"—"}),s.jsx("td",{children:"Horizontal variant"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx(e.code,{children:".steps--vertical"})}),s.jsx("td",{children:"modifier"}),s.jsx("td",{children:"—"}),s.jsx("td",{children:"Vertical variant"})]})]})]})}function _(n={}){const{wrapper:e}=n.components||{};return e?s.jsx(e,{...n,children:s.jsx(o,{...n})}):o(n)}function t(n,e){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};
