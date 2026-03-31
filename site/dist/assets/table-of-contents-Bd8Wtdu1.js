import{j as e}from"./index-Dg0DyNZX.js";function c(n){const t={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...n.components},{Callout:r,Do:l,DoDont:o,Dont:d,Preview:s,PropTable:a}=t;return r||i("Callout"),l||i("Do"),o||i("DoDont"),d||i("Dont"),s||i("Preview"),a||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Article navigation with heading links. Optional sticky variant."}),`
`,e.jsx(s,{html:'<nav class="toc" style="max-width:280px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><h4>Contents</h4><ul style="list-style:none;padding:0;margin-top:8px;font-size:14px;"><li style="padding:4px 0;"><a href="#">Introduction</a></li><li style="padding:4px 0;"><a href="#">The Process</a></li><li style="padding:4px 0;"><a href="#">Materials</a></li></ul></nav>',label:"Table of Contents"}),`
`,e.jsx(t.h2,{children:"Variants"}),`
`,e.jsx(t.h3,{children:"Default"}),`
`,e.jsx(s,{html:'<nav class="toc" style="max-width:250px;padding:12px;border:1px solid var(--color-border-default);border-radius:8px;"><h4>TOC</h4></nav>',label:"Default"}),`
`,e.jsx(t.h3,{children:"Sticky"}),`
`,e.jsx(s,{html:'<nav class="toc toc--sticky" style="max-width:250px;padding:12px;border:1px solid var(--color-border-default);border-radius:8px;"><h4>Sticky TOC</h4></nav>',label:"Sticky"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(l,{children:"Use the article body/prose component for rich text — it handles typography, images, and spacing."}),e.jsx(d,{children:"Don't manually style article content with inline styles — let the prose class handle it."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(r,{type:"info",children:e.jsx(t.p,{children:"Blog components support Shopify's article template system. Use metafields for custom article data."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsxs(a,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".toc"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base table of contents styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".toc--sticky"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Sticky variant"})]})]})]})}function x(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(c,{...n})}):c(n)}function i(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
