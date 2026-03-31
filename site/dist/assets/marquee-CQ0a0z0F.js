import{j as e}from"./index-Dg0DyNZX.js";function a(i){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:o,Do:t,DoDont:r,Dont:c,Preview:l,PropTable:d}=n;return o||s("Callout"),t||s("Do"),r||s("DoDont"),c||s("Dont"),l||s("Preview"),d||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Infinite horizontal text scroll with hover pause and reduced-motion support."}),`
`,e.jsx(l,{html:'<div class="marquee" style="overflow:hidden;white-space:nowrap;padding:12px 0;"><span style="display:inline-block;padding:0 32px;">Free Shipping on Orders $150+ ✦</span><span style="display:inline-block;padding:0 32px;">Handcrafted in Buenos Aires ✦</span><span style="display:inline-block;padding:0 32px;">Each Piece is Unique ✦</span></div>',label:"Scrolling Text Marquee"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(t,{children:"Use section components for page builder blocks — they're designed to be reorderable in Shopify's theme editor."}),e.jsx(c,{children:"Don't hard-code section content — use Shopify schema settings for customizability."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(o,{type:"info",children:e.jsx(n.p,{children:"Sections map to Shopify's section architecture. Each one can have its own schema settings."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".marquee"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base scrolling text marquee styles"})]})})]})}function p(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}function s(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
