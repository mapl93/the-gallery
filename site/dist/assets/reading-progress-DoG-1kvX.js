import{j as e}from"./index-Dg0DyNZX.js";function a(r){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...r.components},{Callout:t,Do:i,DoDont:o,Dont:l,Preview:c,PropTable:d}=n;return t||s("Callout"),i||s("Do"),o||s("DoDont"),l||s("Dont"),c||s("Preview"),d||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Fixed top bar showing scroll progress through article."}),`
`,e.jsx(c,{html:'<div class="reading-progress" style="position:relative;height:4px;background:var(--color-surface-secondary);border-radius:2px;"><div style="width:35%;height:100%;background:var(--color-text-accent);border-radius:2px;"></div></div>',label:"Reading Progress Bar"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(i,{children:"Use the article body/prose component for rich text — it handles typography, images, and spacing."}),e.jsx(l,{children:"Don't manually style article content with inline styles — let the prose class handle it."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"info",children:e.jsx(n.p,{children:"Blog components support Shopify's article template system. Use metafields for custom article data."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:'aria-live="polite"'})," or ",e.jsx(n.code,{children:'role="status"'})," so screen readers announce loading state."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".reading-progress"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base reading progress bar styles"})]})})]})}function x(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(a,{...r})}):a(r)}function s(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
