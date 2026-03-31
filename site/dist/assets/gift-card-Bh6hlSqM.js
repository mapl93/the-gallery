import{j as e}from"./index-Dg0DyNZX.js";function c(n){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:s,Do:a,DoDont:r,Dont:d,Preview:l,PropTable:o}=i;return s||t("Callout"),a||t("Do"),r||t("DoDont"),d||t("Dont"),l||t("Preview"),o||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(i.h2,{children:"Overview"}),`
`,e.jsx(i.p,{children:"Gift card display with visual, code, copy button, balance, and QR."}),`
`,e.jsx(l,{html:'<div class="gift-card" style="max-width:400px;text-align:center;"><div class="gift-card__visual" style="background:#f5f0eb;padding:32px;border-radius:12px;"><span class="gift-card__brand" style="font-weight:600;">The Gallery</span><span class="gift-card__amount" style="display:block;font-size:2rem;margin:8px 0;">$100</span></div><h2 class="gift-card__heading" style="margin-top:16px;">Your Gift Card</h2><div class="gift-card__code-wrapper" style="margin-top:8px;"><code class="gift-card__code" style="font-size:18px;letter-spacing:2px;">GIFT-ABCD-1234</code></div></div>',label:"Gift Card Page"}),`
`,e.jsx(i.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(a,{children:"Keep page templates simple and focused on their primary purpose."}),e.jsx(d,{children:"Don't add navigation-heavy sidebars to simple pages like 404 or policy pages."})]}),`
`,e.jsx(i.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(i.p,{children:"Page components map to Shopify template types. Each has a corresponding .json template file."})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["All images must have descriptive ",e.jsx(i.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(i.h2,{children:"API Reference"}),`
`,e.jsx(o,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(i.code,{children:".gift-card"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base gift card page styles"})]})})]})}function h(n={}){const{wrapper:i}=n.components||{};return i?e.jsx(i,{...n,children:e.jsx(c,{...n})}):c(n)}function t(n,i){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
