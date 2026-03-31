import{j as e}from"./index-Dg0DyNZX.js";function a(o){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:n,Do:r,DoDont:s,Dont:c,Preview:i,PropTable:d}=t;return n||l("Callout"),r||l("Do"),s||l("DoDont"),c||l("Dont"),i||l("Preview"),d||l("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Product image gallery with thumbnails, zoom, and dots."}),`
`,e.jsx(i,{html:'<div class="product-gallery" style="max-width:400px;"><div class="product-gallery__main"><img src="https://placehold.co/400x400/f5f0eb/1a1a1a?text=Main" alt="Product" /></div><div class="product-gallery__thumbs"><button class="product-gallery__thumb" aria-selected="true"><img src="https://placehold.co/80x80/f5f0eb/1a1a1a?text=1" alt="Thumb 1" /></button><button class="product-gallery__thumb"><img src="https://placehold.co/80x80/f5f0eb/1a1a1a?text=2" alt="Thumb 2" /></button><button class="product-gallery__thumb"><img src="https://placehold.co/80x80/f5f0eb/1a1a1a?text=3" alt="Thumb 3" /></button></div></div>',label:"Product Gallery"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(s,{children:[e.jsx(r,{children:"Optimize product images for web — use WebP format and responsive srcset."}),e.jsx(c,{children:"Don't overload product components with too many badges or CTAs — keep it clean."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(n,{type:"tip",children:e.jsx(t.p,{children:"Product components are designed to work together. The product page combines gallery, info, form, and related products."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["All images must have descriptive ",e.jsx(t.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".product-gallery"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base product gallery styles"})]})})]})}function u(o={}){const{wrapper:t}=o.components||{};return t?e.jsx(t,{...o,children:e.jsx(a,{...o})}):a(o)}function l(o,t){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
