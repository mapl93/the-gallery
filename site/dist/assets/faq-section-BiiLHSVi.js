import{j as e}from"./index-Dg0DyNZX.js";function l(i){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:s,Do:t,DoDont:c,Dont:r,Preview:d,PropTable:a}=n;return s||o("Callout"),t||o("Do"),c||o("DoDont"),r||o("Dont"),d||o("Preview"),a||o("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"FAQ section wrapper with centered header. Uses accordion for items."}),`
`,e.jsx(d,{html:'<div class="faq-section" style="max-width:600px;"><div class="faq-section__header"><h2>Frequently Asked Questions</h2></div><div class="accordion"><div class="accordion__item"><button class="accordion__trigger" aria-expanded="true"><span>How do I care for ceramics?</span></button><div class="accordion__panel"><div class="accordion__content"><p>Hand wash with mild soap. Avoid extreme temperatures.</p></div></div></div><div class="accordion__item"><button class="accordion__trigger" aria-expanded="false"><span>Do you ship internationally?</span></button></div></div></div>',label:"FAQ Section"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(c,{children:[e.jsx(t,{children:"Use section components for page builder blocks — they're designed to be reorderable in Shopify's theme editor."}),e.jsx(r,{children:"Don't hard-code section content — use Shopify schema settings for customizability."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(n.p,{children:"Sections map to Shopify's section architecture. Each one can have its own schema settings."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/accordion",children:"Accordion"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".faq-section"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base faq section styles"})]})})]})}function p(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}function o(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
