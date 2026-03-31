import{j as e}from"./index-Dg0DyNZX.js";function d(t){const s={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:i,Do:a,DoDont:o,Dont:l,Preview:r,PropTable:c}=s;return i||n("Callout"),a||n("Do"),o||n("DoDont"),l||n("Dont"),r||n("Preview"),c||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Key metric display with label, value, and optional change indicator."}),`
`,e.jsx(r,{html:'<div class="stat-group" style="display:flex;gap:24px;"><div class="stat"><span class="stat__value">1,234</span><span class="stat__label">Orders</span><span class="stat__change stat__change--up">+12%</span></div><div class="stat"><span class="stat__value">$45.2K</span><span class="stat__label">Revenue</span><span class="stat__change stat__change--down">-3%</span></div></div>',label:"Stat / Statistic"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(a,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(l,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"info",children:e.jsx(s.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".stat"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base stat / statistic styles"})]})})]})}function p(t={}){const{wrapper:s}=t.components||{};return s?e.jsx(s,{...t,children:e.jsx(d,{...t})}):d(t)}function n(t,s){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
