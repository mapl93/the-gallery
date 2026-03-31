import{j as e}from"./index-Dg0DyNZX.js";function a(c){const s={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...c.components},{Callout:d,Do:t,DoDont:i,Dont:n,Preview:o,PropTable:l}=s;return d||r("Callout"),t||r("Do"),i||r("DoDont"),n||r("Dont"),o||r("Preview"),l||r("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Horizontal scroll product carousel (related products, recently viewed)."}),`
`,e.jsx(o,{html:'<div class="product-slider"><div class="product-slider__header"><h2 class="product-slider__title">You May Also Like</h2></div><div class="product-slider__track" style="display:flex;gap:16px;overflow:hidden;"><article class="product-card" style="min-width:200px;"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=1" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Vase</h3><span class="price"><span class="price__current">$90</span></span></div></article><article class="product-card" style="min-width:200px;"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=2" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Bowl</h3><span class="price"><span class="price__current">$75</span></span></div></article></div></div>',label:"Product Slider"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(i,{children:[e.jsx(t,{children:"Optimize product images for web — use WebP format and responsive srcset."}),e.jsx(n,{children:"Don't overload product components with too many badges or CTAs — keep it clean."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(d,{type:"tip",children:e.jsx(s.p,{children:"Product components are designed to work together. The product page combines gallery, info, form, and related products."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Associate every input with a ",e.jsx(s.code,{children:"<label>"})," using matching ",e.jsx(s.code,{children:"for"}),"/",e.jsx(s.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(s.h2,{children:"Dependencies"}),`
`,e.jsx(s.p,{children:"This component uses:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/components/product-card",children:"Product Card"})}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsx(l,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".product-slider"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base product slider styles"})]})})]})}function h(c={}){const{wrapper:s}=c.components||{};return s?e.jsx(s,{...c,children:e.jsx(a,{...c})}):a(c)}function r(c,s){throw new Error("Expected component `"+c+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
