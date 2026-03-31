import{j as e}from"./index-Dg0DyNZX.js";function c(t){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:i,Do:o,DoDont:r,Dont:l,Preview:d,PropTable:a}=n;return i||s("Callout"),o||s("Do"),r||s("DoDont"),l||s("Dont"),d||s("Preview"),a||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Sidebar with tag cloud, search, categories, and recent posts."}),`
`,e.jsx(d,{html:'<aside class="blog-sidebar" style="max-width:280px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><h3 style="margin-bottom:12px;">Popular Posts</h3><ul style="list-style:none;padding:0;"><li style="padding:8px 0;border-bottom:1px solid var(--color-border-default);"><a href="#">Behind the Kiln</a></li><li style="padding:8px 0;"><a href="#">Glaze Chemistry</a></li></ul></aside>',label:"Blog Sidebar / Tag Cloud"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(o,{children:"Use the article body/prose component for rich text — it handles typography, images, and spacing."}),e.jsx(l,{children:"Don't manually style article content with inline styles — let the prose class handle it."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"info",children:e.jsx(n.p,{children:"Blog components support Shopify's article template system. Use metafields for custom article data."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/tag",children:"Tag"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".blog-sidebar"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base blog sidebar / tag cloud styles"})]})})]})}function p(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(c,{...t})}):c(t)}function s(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
