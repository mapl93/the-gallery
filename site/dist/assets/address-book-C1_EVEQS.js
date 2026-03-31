import{j as e}from"./index-Dg0DyNZX.js";function l(n){const s={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:d,Do:t,DoDont:i,Dont:o,Preview:a,PropTable:c}=s;return d||r("Callout"),t||r("Do"),i||r("DoDont"),o||r("Dont"),a||r("Preview"),c||r("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Address card grid with default tag and add-new card."}),`
`,e.jsx(a,{html:'<div class="address-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:500px;"><div class="address-card address-card--default" style="padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><span class="address-card__default-tag">Default</span><p class="address-card__name">María García</p><p class="address-card__text">123 Studio Street<br/>Buenos Aires, Argentina</p><div class="address-card__actions"><button class="btn btn--outline btn--sm">Edit</button></div></div><div class="address-card address-card--new" style="padding:16px;border:1px dashed var(--color-border-default);border-radius:8px;text-align:center;display:flex;align-items:center;justify-content:center;"><span>+ Add Address</span></div></div>',label:"Address Book"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(i,{children:[e.jsx(t,{children:"Pre-fill fields when possible (e.g., address from previous orders) to reduce friction."}),e.jsx(o,{children:"Don't expose sensitive account data without authentication."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(d,{type:"warning",children:e.jsx(s.p,{children:"Account components require Shopify customer authentication. They render only for logged-in customers."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(s.h2,{children:"Dependencies"}),`
`,e.jsx(s.p,{children:"This component uses:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".address-grid"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base address book styles"})]})})]})}function p(n={}){const{wrapper:s}=n.components||{};return s?e.jsx(s,{...n,children:e.jsx(l,{...n})}):l(n)}function r(n,s){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
