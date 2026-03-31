import{j as e}from"./index-Dg0DyNZX.js";function l(s){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:o,Do:r,DoDont:t,Dont:i,Preview:a,PropTable:d}=n;return o||c("Callout"),r||c("Do"),t||c("DoDont"),i||c("Dont"),a||c("Preview"),d||c("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Account overview with navigation cards grid."}),`
`,e.jsx(a,{html:'<div class="account-dashboard" style="max-width:600px;"><div class="account-dashboard__header"><h1 class="account-dashboard__greeting">Hello, María</h1></div><div class="account-dashboard__grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:16px;"><div class="account-card"><span class="account-card__icon">📦</span><h3 class="account-card__title">Orders</h3><p class="account-card__description">View order history</p></div><div class="account-card"><span class="account-card__icon">📍</span><h3 class="account-card__title">Addresses</h3><p class="account-card__description">Manage addresses</p></div></div></div>',label:"Account Dashboard"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(t,{children:[e.jsx(r,{children:"Pre-fill fields when possible (e.g., address from previous orders) to reduce friction."}),e.jsx(i,{children:"Don't expose sensitive account data without authentication."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(o,{type:"warning",children:e.jsx(n.p,{children:"Account components require Shopify customer authentication. They render only for logged-in customers."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".account-dashboard"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base account dashboard styles"})]})})]})}function u(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(l,{...s})}):l(s)}function c(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
