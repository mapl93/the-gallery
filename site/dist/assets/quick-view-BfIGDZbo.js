import{j as e}from"./index-Dg0DyNZX.js";function a(n){const i={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:s,Do:t,DoDont:o,Dont:l,Preview:c,PropTable:d}=i;return s||r("Callout"),t||r("Do"),o||r("DoDont"),l||r("Dont"),c||r("Preview"),d||r("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(i.h2,{children:"Overview"}),`
`,e.jsx(i.p,{children:"Product quick-view modal with gallery and add-to-cart."}),`
`,e.jsx(c,{html:'<div class="quick-view" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:600px;padding:24px;border:1px solid var(--color-border-default);border-radius:12px;"><div class="quick-view__gallery"><img src="https://placehold.co/280x280/f5f0eb/1a1a1a?text=Product" alt="" style="width:100%;border-radius:8px;" /></div><div class="quick-view__info"><h3 class="quick-view__title">Ceramic Vase</h3><span class="quick-view__vendor">The Gallery</span><p class="quick-view__description">Hand-thrown stoneware vase.</p><a class="quick-view__full-link" href="#">View Full Details</a></div></div>',label:"Quick View"}),`
`,e.jsx(i.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(t,{children:"Show real-time updates (totals, quantities) when the user modifies the cart."}),e.jsx(l,{children:"Don't require a page reload for cart changes — use AJAX for a smooth experience."})]}),`
`,e.jsx(i.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"tip",children:e.jsx(i.p,{children:"Cart components are designed for Shopify's AJAX Cart API. Wire up the JS interactions in your theme."})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Trap focus inside the overlay while open. Return focus to the trigger on close."}),`
`]}),`
`,e.jsx(i.h2,{children:"Dependencies"}),`
`,e.jsx(i.p,{children:"This component uses:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/components/modal",children:"Modal"})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/components/product-gallery",children:"Product Gallery"})}),`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/components/product-form",children:"Product Form"})}),`
`]}),`
`,e.jsx(i.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(i.code,{children:".quick-view"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base quick view styles"})]})})]})}function u(n={}){const{wrapper:i}=n.components||{};return i?e.jsx(i,{...n,children:e.jsx(a,{...n})}):a(n)}function r(n,i){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
