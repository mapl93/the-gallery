import{j as e}from"./index-Dg0DyNZX.js";function d(n){const t={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:r,Do:i,DoDont:o,Dont:c,Preview:l,PropTable:a}=t;return r||s("Callout"),i||s("Do"),o||s("DoDont"),c||s("Dont"),l||s("Preview"),a||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Empty cart state with CTA to continue shopping."}),`
`,e.jsx(l,{html:`<div class="cart-empty" style="text-align:center;padding:48px 24px;"><div class="cart-empty__icon">🛒</div><h2 class="cart-empty__title">Your cart is empty</h2><p class="cart-empty__message">Looks like you haven't added anything yet.</p><a class="btn" href="#">Start Shopping</a></div>`,label:"Cart Empty"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(i,{children:"Show real-time updates (totals, quantities) when the user modifies the cart."}),e.jsx(c,{children:"Don't require a page reload for cart changes — use AJAX for a smooth experience."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(r,{type:"tip",children:e.jsx(t.p,{children:"Cart components are designed for Shopify's AJAX Cart API. Wire up the JS interactions in your theme."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"Dependencies"}),`
`,e.jsx(t.p,{children:"This component uses:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"/components/empty-state",children:"Empty State"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".cart-empty"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base cart empty styles"})]})})]})}function p(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(d,{...n})}):d(n)}function s(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
