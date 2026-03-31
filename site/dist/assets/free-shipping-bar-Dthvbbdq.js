import{j as e}from"./index-Dg0DyNZX.js";function d(n){const i={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:r,Do:t,DoDont:o,Dont:c,Preview:l,PropTable:h}=i;return r||s("Callout"),t||s("Do"),o||s("DoDont"),c||s("Dont"),l||s("Preview"),h||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(i.h2,{children:"Overview"}),`
`,e.jsx(i.p,{children:"Progress bar showing distance to free shipping threshold."}),`
`,e.jsx(l,{html:'<div class="shipping-bar" style="max-width:400px;"><p class="shipping-bar__text">$45 away from free shipping!</p><div class="shipping-bar__track"><div class="shipping-bar__fill" style="width:70%;"></div></div></div>',label:"Free Shipping Bar"}),`
`,e.jsx(i.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(t,{children:"Show real-time updates (totals, quantities) when the user modifies the cart."}),e.jsx(c,{children:"Don't require a page reload for cart changes — use AJAX for a smooth experience."})]}),`
`,e.jsx(i.h2,{children:"Accessibility"}),`
`,e.jsx(r,{type:"tip",children:e.jsx(i.p,{children:"Cart components are designed for Shopify's AJAX Cart API. Wire up the JS interactions in your theme."})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Associate every input with a ",e.jsx(i.code,{children:"<label>"})," using matching ",e.jsx(i.code,{children:"for"}),"/",e.jsx(i.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(i.h2,{children:"Dependencies"}),`
`,e.jsx(i.p,{children:"This component uses:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/components/progress",children:"Progress Bar / Circle"})}),`
`]}),`
`,e.jsx(i.h2,{children:"API Reference"}),`
`,e.jsx(h,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(i.code,{children:".shipping-bar"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base free shipping bar styles"})]})})]})}function p(n={}){const{wrapper:i}=n.components||{};return i?e.jsx(i,{...n,children:e.jsx(d,{...n})}):d(n)}function s(n,i){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
