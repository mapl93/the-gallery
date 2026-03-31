import{j as e}from"./index-Dg0DyNZX.js";function o(r){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...r.components},{Callout:n,Do:a,DoDont:l,Dont:d,Preview:i,PropTable:c}=t;return n||s("Callout"),a||s("Do"),l||s("DoDont"),d||s("Dont"),i||s("Preview"),c||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Author bio card with avatar and social links. Full and compact variants."}),`
`,e.jsx(i,{html:'<div class="author-card" style="max-width:400px;display:flex;gap:16px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><img src="https://i.pravatar.cc/64?img=5" alt="" style="border-radius:50%;width:64px;height:64px;" /><div><span class="author-card__name" style="font-weight:600;">María García</span><p class="author-card__bio" style="font-size:14px;">Ceramic artist and studio founder based in Buenos Aires.</p></div></div>',label:"Author Card"}),`
`,e.jsx(t.h2,{children:"Variants"}),`
`,e.jsx(t.h3,{children:"Full"}),`
`,e.jsx(i,{html:'<div class="author-card" style="max-width:400px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><span style="font-weight:600;">Full Author Card</span><p style="font-size:14px;">With complete bio and links.</p></div>',label:"Full"}),`
`,e.jsx(t.h3,{children:"Compact"}),`
`,e.jsx(i,{html:'<div class="author-card author-card--compact" style="display:flex;gap:8px;align-items:center;"><img src="https://i.pravatar.cc/32?img=5" alt="" style="border-radius:50%;width:32px;height:32px;" /><span style="font-weight:600;font-size:14px;">María G.</span></div>',label:"Compact"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(a,{children:"Use the article body/prose component for rich text — it handles typography, images, and spacing."}),e.jsx(d,{children:"Don't manually style article content with inline styles — let the prose class handle it."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(n,{type:"info",children:e.jsx(t.p,{children:"Blog components support Shopify's article template system. Use metafields for custom article data."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["All images must have descriptive ",e.jsx(t.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(t.h2,{children:"Dependencies"}),`
`,e.jsx(t.p,{children:"This component uses:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"/components/avatar",children:"Avatar"})}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsxs(c,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".author-card"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base author card styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".author-card--full"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Full variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".author-card--compact"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Compact variant"})]})]})]})}function p(r={}){const{wrapper:t}=r.components||{};return t?e.jsx(t,{...r,children:e.jsx(o,{...r})}):o(r)}function s(r,t){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
