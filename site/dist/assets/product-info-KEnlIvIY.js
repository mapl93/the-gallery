import{j as e}from"./index-Dg0DyNZX.js";function a(o){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:i,Do:r,DoDont:s,Dont:c,Preview:d,PropTable:l}=n;return i||t("Callout"),r||t("Do"),s||t("DoDont"),c||t("Dont"),d||t("Preview"),l||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Product details: title, vendor, description, metadata."}),`
`,e.jsx(d,{html:`<div class="product-info" style="max-width:480px;"><span class="product-info__vendor">The Gallery Studio</span><h1 class="product-info__title">Handcrafted Ceramic Vase</h1><p class="product-info__subtitle">Limited Edition – No. 42 of 100</p><p class="product-info__description">Each piece is hand-thrown on the potter's wheel, making every vase truly unique.</p></div>`,label:"Product Info"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(s,{children:[e.jsx(r,{children:"Optimize product images for web — use WebP format and responsive srcset."}),e.jsx(c,{children:"Don't overload product components with too many badges or CTAs — keep it clean."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"tip",children:e.jsx(n.p,{children:"Product components are designed to work together. The product page combines gallery, info, form, and related products."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/price",children:"Price"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(l,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".product-info"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base product info styles"})]})})]})}function h(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(a,{...o})}):a(o)}function t(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
