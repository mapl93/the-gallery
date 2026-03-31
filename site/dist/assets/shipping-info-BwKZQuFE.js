import{j as e}from"./index-Dg0DyNZX.js";function d(i){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:s,Do:o,DoDont:r,Dont:c,Preview:l,PropTable:p}=n;return s||t("Callout"),o||t("Do"),r||t("DoDont"),c||t("Dont"),l||t("Preview"),p||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Shipping, returns, guarantees info blocks with icons."}),`
`,e.jsx(l,{html:'<div class="shipping-info" style="max-width:500px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center;"><div><span style="font-size:24px;">🚚</span><p style="font-weight:600;font-size:14px;">Free Shipping</p><p style="font-size:13px;">Orders over $150</p></div><div><span style="font-size:24px;">↩️</span><p style="font-weight:600;font-size:14px;">Easy Returns</p><p style="font-size:13px;">30-day policy</p></div><div><span style="font-size:24px;">🔒</span><p style="font-weight:600;font-size:14px;">Secure Payment</p><p style="font-size:13px;">SSL encrypted</p></div></div>',label:"Shipping Info"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(o,{children:"Use section components for page builder blocks — they're designed to be reorderable in Shopify's theme editor."}),e.jsx(c,{children:"Don't hard-code section content — use Shopify schema settings for customizability."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(n.p,{children:"Sections map to Shopify's section architecture. Each one can have its own schema settings."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(p,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".shipping-info"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base shipping info styles"})]})})]})}function a(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}function t(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default};
