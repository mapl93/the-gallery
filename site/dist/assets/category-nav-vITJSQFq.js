import{j as e}from"./index-Dg0DyNZX.js";function c(r){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...r.components},{Callout:t,Do:i,DoDont:l,Dont:s,Preview:a,PropTable:d}=n;return t||o("Callout"),i||o("Do"),l||o("DoDont"),s||o("Dont"),a||o("Preview"),d||o("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Horizontal scrollable pill-style blog category filter."}),`
`,e.jsx(a,{html:'<nav class="category-nav" style="display:flex;gap:12px;"><a href="#" style="padding:6px 12px;border:1px solid var(--color-border-default);border-radius:20px;font-size:14px;">All</a><a href="#" style="padding:6px 12px;background:var(--color-surface-inverse);color:var(--color-text-on-dark);border-radius:20px;font-size:14px;">Studio Life</a><a href="#" style="padding:6px 12px;border:1px solid var(--color-border-default);border-radius:20px;font-size:14px;">Techniques</a></nav>',label:"Category Nav"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(i,{children:"Use the article body/prose component for rich text — it handles typography, images, and spacing."}),e.jsx(s,{children:"Don't manually style article content with inline styles — let the prose class handle it."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"info",children:e.jsx(n.p,{children:"Blog components support Shopify's article template system. Use metafields for custom article data."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"<nav>"})," with ",e.jsx(n.code,{children:"aria-label"})," to identify the navigation region."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".category-nav"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base category nav styles"})]})})]})}function p(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(c,{...r})}):c(r)}function o(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
