import{j as e}from"./index-Dg0DyNZX.js";function d(i){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:s,Do:t,DoDont:l,Dont:o,Preview:c,PropTable:a}=n;return s||r("Callout"),t||r("Do"),l||r("DoDont"),o||r("Dont"),c||r("Preview"),a||r("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Cart line items and summary inside a drawer."}),`
`,e.jsx(c,{html:'<div style="max-width:360px;border:1px solid var(--color-border-default);border-radius:8px;padding:16px;"><h3 style="margin-bottom:16px;">Your Cart</h3><div class="cart-item" style="display:flex;gap:12px;margin-bottom:16px;"><img class="cart-item__image" src="https://placehold.co/64x64/f5f0eb/1a1a1a?text=V" alt="" style="border-radius:4px;" /><div><h4 class="cart-item__title">Ceramic Vase</h4><span class="cart-item__variant">Large / White</span></div></div></div>',label:"Cart Drawer"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(t,{children:"Keep global chrome consistent across all pages — header and footer should be in the layout template."}),e.jsx(o,{children:"Don't duplicate global elements inside individual sections or pages."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(n.p,{children:"Global components are typically included in your theme layout, not in individual pages."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Trap focus inside the overlay while open. Return focus to the trigger on close."}),`
`,e.jsxs(n.li,{children:["Close on ",e.jsx(n.code,{children:"Escape"})," key press."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/drawer",children:"Drawer"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/price",children:"Price"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/quantity-selector",children:"Quantity Selector"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".cart-item"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base cart drawer styles"})]})})]})}function x(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}function r(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
