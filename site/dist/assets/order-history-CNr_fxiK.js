import{j as e}from"./index-Dg0DyNZX.js";function c(s){const r={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:o,Do:t,DoDont:i,Dont:d,Preview:l,PropTable:a}=r;return o||n("Callout"),t||n("Do"),i||n("DoDont"),d||n("Dont"),l||n("Preview"),a||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(r.h2,{children:"Overview"}),`
`,e.jsx(r.p,{children:"Order list with status badges, dates, and totals."}),`
`,e.jsx(l,{html:'<div class="order-list" style="max-width:600px;"><div class="order-row" style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid var(--color-border-default);"><span class="order-row__number">#1042</span><span class="order-row__date">Mar 15, 2026</span><span class="order-row__status order-row__status--delivered">Delivered</span><span class="order-row__total">$120.00</span></div><div class="order-row" style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid var(--color-border-default);"><span class="order-row__number">#1038</span><span class="order-row__date">Feb 28, 2026</span><span class="order-row__status order-row__status--shipped">Shipped</span><span class="order-row__total">$85.00</span></div></div>',label:"Order History"}),`
`,e.jsx(r.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(i,{children:[e.jsx(t,{children:"Pre-fill fields when possible (e.g., address from previous orders) to reduce friction."}),e.jsx(d,{children:"Don't expose sensitive account data without authentication."})]}),`
`,e.jsx(r.h2,{children:"Accessibility"}),`
`,e.jsx(o,{type:"warning",children:e.jsx(r.p,{children:"Account components require Shopify customer authentication. They render only for logged-in customers."})}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(r.h2,{children:"Dependencies"}),`
`,e.jsx(r.p,{children:"This component uses:"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsx(r.li,{children:e.jsx(r.a,{href:"/components/badge",children:"Badge"})}),`
`]}),`
`,e.jsx(r.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(r.code,{children:".order-list"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base order history styles"})]})})]})}function h(s={}){const{wrapper:r}=s.components||{};return r?e.jsx(r,{...s,children:e.jsx(c,{...s})}):c(s)}function n(s,r){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
