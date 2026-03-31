import{j as e}from"./index-Dg0DyNZX.js";function a(t){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:s,Do:i,DoDont:r,Dont:l,Preview:c,PropTable:d}=n;return s||o("Callout"),i||o("Do"),r||o("DoDont"),l||o("Dont"),c||o("Preview"),d||o("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Threaded comment list with reply form and sort."}),`
`,e.jsx(c,{html:'<div class="comments" style="max-width:500px;"><h3>Comments (3)</h3><div style="margin-top:16px;padding:12px 0;border-bottom:1px solid var(--color-border-default);"><p style="font-weight:600;font-size:14px;">Ana R.</p><p style="font-size:14px;">Beautiful article! Love learning about the process.</p></div></div>',label:"Comment Section"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(i,{children:"Use the article body/prose component for rich text — it handles typography, images, and spacing."}),e.jsx(l,{children:"Don't manually style article content with inline styles — let the prose class handle it."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(n.p,{children:"Blog components support Shopify's article template system. Use metafields for custom article data."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/avatar",children:"Avatar"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/button",children:"Button"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/textarea",children:"Textarea"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".comments"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base comment section styles"})]})})]})}function x(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}function o(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
