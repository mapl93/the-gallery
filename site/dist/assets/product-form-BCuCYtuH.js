import{j as e}from"./index-Dg0DyNZX.js";function a(t){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:o,Do:i,DoDont:r,Dont:l,Preview:c,PropTable:d}=n;return o||s("Callout"),i||s("Do"),r||s("DoDont"),l||s("Dont"),c||s("Preview"),d||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Add-to-cart form layout."}),`
`,e.jsx(c,{html:'<div class="product-form" style="max-width:400px;"><div class="variant-selector"><span class="variant-selector__label">Size</span><div style="display:flex;gap:8px;margin:8px 0;"><button class="variant-pill">S</button><button class="variant-pill variant-pill--selected">M</button><button class="variant-pill">L</button></div></div><div class="product-form__actions" style="margin-top:16px;display:flex;gap:8px;"><button class="btn" style="flex:1;">Add to Cart</button></div></div>',label:"Product Form"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(i,{children:"Optimize product images for web — use WebP format and responsive srcset."}),e.jsx(l,{children:"Don't overload product components with too many badges or CTAs — keep it clean."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(o,{type:"tip",children:e.jsx(n.p,{children:"Product components are designed to work together. The product page combines gallery, info, form, and related products."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/button",children:"Button"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/quantity-selector",children:"Quantity Selector"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".product-form"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base product form styles"})]})})]})}function h(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}function s(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
