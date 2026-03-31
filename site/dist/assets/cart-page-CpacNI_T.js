import{j as e}from"./index-Dg0DyNZX.js";function d(t){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:s,Do:i,DoDont:o,Dont:a,Preview:c,PropTable:l}=n;return s||r("Callout"),i||r("Do"),o||r("DoDont"),a||r("Dont"),c||r("Preview"),l||r("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Full cart page layout with items and sidebar summary."}),`
`,e.jsx(c,{html:'<div class="cart-page" style="max-width:600px;"><div class="cart-page__header"><h1 class="cart-page__title">Your Cart</h1><span class="cart-page__count">2 items</span></div><a class="cart-page__continue" href="#">Continue Shopping</a></div>',label:"Cart Page"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(i,{children:"Show real-time updates (totals, quantities) when the user modifies the cart."}),e.jsx(a,{children:"Don't require a page reload for cart changes — use AJAX for a smooth experience."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"tip",children:e.jsx(n.p,{children:"Cart components are designed for Shopify's AJAX Cart API. Wire up the JS interactions in your theme."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/cart-line-item",children:"Cart Line Item"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/cart-summary",children:"Cart Summary"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(l,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".cart-page"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base cart page styles"})]})})]})}function p(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(d,{...t})}):d(t)}function r(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
