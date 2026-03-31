import{j as e}from"./index-Dg0DyNZX.js";function h(t){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:s,Do:o,DoDont:l,Dont:r,Preview:c,PropTable:d}=n;return s||i("Callout"),o||i("Do"),l||i("DoDont"),r||i("Dont"),c||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Expandable promo code input with applied state."}),`
`,e.jsx(c,{html:'<div class="discount-field" style="max-width:360px;"><button class="discount-field__toggle">Have a discount code?</button><div class="discount-field__form" style="display:flex;gap:8px;margin-top:8px;"><input class="input__field" type="text" placeholder="Enter code" style="flex:1;" /><button class="btn btn--outline">Apply</button></div></div>',label:"Discount / Promo Field"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(o,{children:"Show real-time updates (totals, quantities) when the user modifies the cart."}),e.jsx(r,{children:"Don't require a page reload for cart changes — use AJAX for a smooth experience."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"tip",children:e.jsx(n.p,{children:"Cart components are designed for Shopify's AJAX Cart API. Wire up the JS interactions in your theme."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/input",children:"Input"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".discount-field"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base discount / promo field styles"})]})})]})}function p(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(h,{...t})}):h(t)}function i(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
