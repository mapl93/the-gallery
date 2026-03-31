import{j as e}from"./index-Dg0DyNZX.js";function d(r){const s={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...r.components},{Callout:t,Do:a,DoDont:i,Dont:o,Preview:c,PropTable:l}=s;return t||n("Callout"),a||n("Do"),i||n("DoDont"),o||n("Dont"),c||n("Preview"),l||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Sticky sidebar with subtotal, shipping, tax, total, and checkout CTA."}),`
`,e.jsx(c,{html:'<div class="cart-summary" style="max-width:360px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><h3 class="cart-summary__title">Order Summary</h3><div class="cart-summary__row"><span>Subtotal</span><span class="cart-summary__value">$240.00</span></div><div class="cart-summary__row"><span>Shipping</span><span class="cart-summary__value">Free</span></div><div class="cart-summary__divider"></div><div class="cart-summary__row cart-summary__row--total"><span>Total</span><span class="cart-summary__value">$240.00</span></div><button class="btn" style="width:100%;margin-top:16px;">Checkout</button></div>',label:"Cart Summary"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(i,{children:[e.jsx(a,{children:"Show real-time updates (totals, quantities) when the user modifies the cart."}),e.jsx(o,{children:"Don't require a page reload for cart changes — use AJAX for a smooth experience."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"tip",children:e.jsx(s.p,{children:"Cart components are designed for Shopify's AJAX Cart API. Wire up the JS interactions in your theme."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(s.h2,{children:"Dependencies"}),`
`,e.jsx(s.p,{children:"This component uses:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsx(l,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".cart-summary"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base cart summary styles"})]})})]})}function u(r={}){const{wrapper:s}=r.components||{};return s?e.jsx(s,{...r,children:e.jsx(d,{...r})}):d(r)}function n(r,s){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
