import{j as t}from"./index-Dg0DyNZX.js";function a(n){const e={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:i,Do:r,DoDont:s,Dont:d,Preview:c,PropTable:l}=e;return i||o("Callout"),r||o("Do"),s||o("DoDont"),d||o("Dont"),c||o("Preview"),l||o("PropTable"),t.jsxs(t.Fragment,{children:[t.jsx(e.h2,{children:"Overview"}),`
`,t.jsx(e.p,{children:"Product or plan comparison table with highlight column."}),`
`,t.jsx(c,{html:'<div class="comparison-table" style="max-width:600px;"><div class="table-wrapper"><table class="table"><thead><tr><th>Feature</th><th>Basic</th><th>Premium</th></tr></thead><tbody><tr><td>Handmade</td><td>✓</td><td>✓</td></tr><tr><td>Certificate</td><td>—</td><td>✓</td></tr><tr><td>Gift Box</td><td>—</td><td>✓</td></tr></tbody></table></div></div>',label:"Comparison Table"}),`
`,t.jsx(e.h2,{children:"Usage Guidelines"}),`
`,t.jsxs(s,{children:[t.jsx(r,{children:"Use section components for page builder blocks — they're designed to be reorderable in Shopify's theme editor."}),t.jsx(d,{children:"Don't hard-code section content — use Shopify schema settings for customizability."})]}),`
`,t.jsx(e.h2,{children:"Accessibility"}),`
`,t.jsx(i,{type:"info",children:t.jsx(e.p,{children:"Sections map to Shopify's section architecture. Each one can have its own schema settings."})}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,t.jsx(e.h2,{children:"API Reference"}),`
`,t.jsx(l,{children:t.jsxs("tr",{children:[t.jsx("td",{children:t.jsx(e.code,{children:".comparison-table"})}),t.jsx("td",{children:"class"}),t.jsx("td",{children:"—"}),t.jsx("td",{children:"Base comparison table styles"})]})})]})}function x(n={}){const{wrapper:e}=n.components||{};return e?t.jsx(e,{...n,children:t.jsx(a,{...n})}):a(n)}function o(n,e){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
