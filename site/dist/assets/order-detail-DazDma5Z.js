import{j as e}from"./index-Dg0DyNZX.js";function a(r){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...r.components},{Callout:s,Do:t,DoDont:d,Dont:o,Preview:l,PropTable:c}=n;return s||i("Callout"),t||i("Do"),d||i("DoDont"),o||i("Dont"),l||i("Preview"),c||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Single order view with tracking timeline and line items."}),`
`,e.jsx(l,{html:'<div class="order-detail" style="max-width:500px;"><div class="order-detail__header"><h2 class="order-detail__title">Order #1042</h2></div><div class="order-tracking" style="display:flex;gap:24px;margin:16px 0;"><div class="order-tracking__step order-tracking__step--done"><span class="order-tracking__dot"></span><span class="order-tracking__label">Placed</span></div><div class="order-tracking__step order-tracking__step--done"><span class="order-tracking__dot"></span><span class="order-tracking__label">Shipped</span></div><div class="order-tracking__step order-tracking__step--active"><span class="order-tracking__dot"></span><span class="order-tracking__label">Delivered</span></div></div></div>',label:"Order Detail"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(d,{children:[e.jsx(t,{children:"Pre-fill fields when possible (e.g., address from previous orders) to reduce friction."}),e.jsx(o,{children:"Don't expose sensitive account data without authentication."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"warning",children:e.jsx(n.p,{children:"Account components require Shopify customer authentication. They render only for logged-in customers."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/badge",children:"Badge"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/cart-line-item",children:"Cart Line Item"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".order-detail"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base order detail styles"})]})})]})}function p(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(a,{...r})}):a(r)}function i(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
