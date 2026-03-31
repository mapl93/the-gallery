import{j as e}from"./index-Dg0DyNZX.js";function d(n){const t={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:s,Do:r,DoDont:o,Dont:c,Preview:a,PropTable:l}=t;return s||i("Callout"),r||i("Do"),o||i("DoDont"),c||i("Dont"),a||i("Preview"),l||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Fixed bottom bar with product info and add-to-cart button."}),`
`,e.jsx(a,{html:'<div class="sticky-atc" style="position:relative;"><div class="sticky-atc__inner" style="display:flex;align-items:center;gap:16px;padding:12px;border:1px solid var(--color-border-default);border-radius:8px;"><img class="sticky-atc__image" src="https://placehold.co/48x48/f5f0eb/1a1a1a?text=P" alt="" style="border-radius:4px;" /><div class="sticky-atc__info"><span class="sticky-atc__title">Ceramic Vase</span><span class="sticky-atc__price">$120</span></div><button class="btn">Add to Cart</button></div></div>',label:"Sticky Add-to-Cart Bar"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(r,{children:"Show real-time updates (totals, quantities) when the user modifies the cart."}),e.jsx(c,{children:"Don't require a page reload for cart changes — use AJAX for a smooth experience."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"tip",children:e.jsx(t.p,{children:"Cart components are designed for Shopify's AJAX Cart API. Wire up the JS interactions in your theme."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"Dependencies"}),`
`,e.jsx(t.p,{children:"This component uses:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"/components/button",children:"Button"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"/components/price",children:"Price"})}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(l,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".sticky-atc"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base sticky add-to-cart bar styles"})]})})]})}function x(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(d,{...n})}):d(n)}function i(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
