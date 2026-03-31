import{j as e}from"./index-Dg0DyNZX.js";function h(n){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:o,Do:s,DoDont:c,Dont:r,Preview:l,PropTable:d}=t;return o||i("Callout"),s||i("Do"),c||i("DoDont"),r||i("Dont"),l||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Generic rich text content section. For policies, about pages."}),`
`,e.jsx(l,{html:'<div class="rich-text-section" style="max-width:600px;"><div class="prose"><h2>About Our Studio</h2><p>We create unique ceramic pieces that blend traditional craftsmanship with contemporary design.</p></div></div>',label:"Rich Text Section"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(c,{children:[e.jsx(s,{children:"Use section components for page builder blocks — they're designed to be reorderable in Shopify's theme editor."}),e.jsx(r,{children:"Don't hard-code section content — use Shopify schema settings for customizability."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(o,{type:"info",children:e.jsx(t.p,{children:"Sections map to Shopify's section architecture. Each one can have its own schema settings."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".rich-text-section"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base rich text section styles"})]})})]})}function x(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(h,{...n})}):h(n)}function i(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
