import{j as e}from"./index-Dg0DyNZX.js";function d(s){const t={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:i,Do:l,DoDont:r,Dont:o,Preview:c,PropTable:a}=t;return i||n("Callout"),l||n("Do"),r||n("DoDont"),o||n("Dont"),c||n("Preview"),a||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Frequently bought together / you might also like section."}),`
`,e.jsx(c,{html:'<div class="cart-upsell" style="max-width:400px;"><h4 class="cart-upsell__title">You might also like</h4><div class="cart-upsell__items" style="display:flex;gap:12px;"><div class="cart-upsell__item"><img class="cart-upsell__item-image" src="https://placehold.co/64x64/f5f0eb/1a1a1a?text=U" alt="" style="border-radius:4px;" /><span class="cart-upsell__item-title">Vase Stand</span><span class="cart-upsell__item-price">$25</span></div></div></div>',label:"Cart Upsell"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(l,{children:"Show real-time updates (totals, quantities) when the user modifies the cart."}),e.jsx(o,{children:"Don't require a page reload for cart changes — use AJAX for a smooth experience."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"tip",children:e.jsx(t.p,{children:"Cart components are designed for Shopify's AJAX Cart API. Wire up the JS interactions in your theme."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"Dependencies"}),`
`,e.jsx(t.p,{children:"This component uses:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".cart-upsell"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base cart upsell styles"})]})})]})}function p(s={}){const{wrapper:t}=s.components||{};return t?e.jsx(t,{...s,children:e.jsx(d,{...s})}):d(s)}function n(s,t){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
