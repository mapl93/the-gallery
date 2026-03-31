import{j as e}from"./index-Dg0DyNZX.js";function d(t){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:s,Do:o,DoDont:r,Dont:l,Preview:a,PropTable:c}=n;return s||i("Callout"),o||i("Do"),r||i("DoDont"),l||i("Dont"),a||i("Preview"),c||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Swatches and pills for product variant selection."}),`
`,e.jsx(a,{html:'<div class="variant-selector"><span class="variant-selector__label">Size</span><div style="display:flex;gap:8px;margin-top:8px;"><button class="variant-pill">S</button><button class="variant-pill variant-pill--selected">M</button><button class="variant-pill">L</button><button class="variant-pill variant-pill--unavailable">XL</button></div></div>',label:"Variant Selector"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(o,{children:"Optimize product images for web — use WebP format and responsive srcset."}),e.jsx(l,{children:"Don't overload product components with too many badges or CTAs — keep it clean."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"tip",children:e.jsx(n.p,{children:"Product components are designed to work together. The product page combines gallery, info, form, and related products."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".variant-selector"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base variant selector styles"})]})})]})}function h(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(d,{...t})}):d(t)}function i(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
