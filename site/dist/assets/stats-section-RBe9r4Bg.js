import{j as e}from"./index-Dg0DyNZX.js";function d(t){const s={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:i,Do:o,DoDont:a,Dont:c,Preview:l,PropTable:r}=s;return i||n("Callout"),o||n("Do"),a||n("DoDont"),c||n("Dont"),l||n("Preview"),r||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Animated stats/metrics section with numbers and labels."}),`
`,e.jsx(l,{html:'<div class="stats-section" style="display:flex;gap:32px;justify-content:center;padding:24px;"><div class="stat"><span class="stat__value">500+</span><span class="stat__label">Artisans</span></div><div class="stat"><span class="stat__value">10K+</span><span class="stat__label">Pieces Made</span></div><div class="stat"><span class="stat__value">25</span><span class="stat__label">Countries</span></div></div>',label:"Stats Counter"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(a,{children:[e.jsx(o,{children:"Use section components for page builder blocks — they're designed to be reorderable in Shopify's theme editor."}),e.jsx(c,{children:"Don't hard-code section content — use Shopify schema settings for customizability."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"info",children:e.jsx(s.p,{children:"Sections map to Shopify's section architecture. Each one can have its own schema settings."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsx(r,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".stats-section"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base stats counter styles"})]})})]})}function p(t={}){const{wrapper:s}=t.components||{};return s?e.jsx(s,{...t,children:e.jsx(d,{...t})}):d(t)}function n(t,s){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
