import{j as e}from"./index-Dg0DyNZX.js";function d(i){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:s,Do:r,DoDont:l,Dont:c,Preview:a,PropTable:o}=n;return s||t("Callout"),r||t("Do"),l||t("DoDont"),c||t("Dont"),a||t("Preview"),o||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Individual cart item with image, info, quantity, and price."}),`
`,e.jsx(a,{html:'<div class="cart-line" style="max-width:500px;display:flex;gap:16px;padding:16px 0;border-bottom:1px solid var(--color-border-default);"><img class="cart-line__image" src="https://placehold.co/80x80/f5f0eb/1a1a1a?text=Item" alt="" style="border-radius:8px;" /><div style="flex:1;"><h4 class="cart-line__title">Artisan Ceramic Vase</h4><span class="cart-line__variant">Large / White</span><div class="cart-line__actions"><button class="cart-line__remove">Remove</button></div></div><span class="cart-line__price">$120.00</span></div>',label:"Cart Line Item"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(r,{children:"Show real-time updates (totals, quantities) when the user modifies the cart."}),e.jsx(c,{children:"Don't require a page reload for cart changes — use AJAX for a smooth experience."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"tip",children:e.jsx(n.p,{children:"Cart components are designed for Shopify's AJAX Cart API. Wire up the JS interactions in your theme."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["All images must have descriptive ",e.jsx(n.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/quantity-selector",children:"Quantity Selector"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/price",children:"Price"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(o,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".cart-line"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base cart line item styles"})]})})]})}function x(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}function t(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
