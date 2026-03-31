import{j as e}from"./index-Dg0DyNZX.js";function a(t){const c={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:r,Do:s,DoDont:o,Dont:d,Preview:n,PropTable:l}=c;return r||i("Callout"),s||i("Do"),o||i("DoDont"),d||i("Dont"),n||i("Preview"),l||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(c.h2,{children:"Overview"}),`
`,e.jsx(c.p,{children:"Responsive product grid."}),`
`,e.jsx(n,{html:'<div class="collection-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;"><article class="product-card"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=1" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Vase</h3></div></article><article class="product-card"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=2" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Bowl</h3></div></article><article class="product-card"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=3" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Plate</h3></div></article></div>',label:"Collection Grid"}),`
`,e.jsx(c.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(s,{children:"Use the collection grid with product cards for consistent spacing and responsive behavior."}),e.jsx(d,{children:"Don't mix collection grid with manual floats or absolute positioning."})]}),`
`,e.jsx(c.h2,{children:"Accessibility"}),`
`,e.jsx(r,{type:"info",children:e.jsx(c.p,{children:"Collection components handle responsive breakpoints automatically via CSS Grid."})}),`
`,e.jsxs(c.ul,{children:[`
`,e.jsx(c.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(c.h2,{children:"Dependencies"}),`
`,e.jsx(c.p,{children:"This component uses:"}),`
`,e.jsxs(c.ul,{children:[`
`,e.jsx(c.li,{children:e.jsx(c.a,{href:"/components/product-card",children:"Product Card"})}),`
`]}),`
`,e.jsx(c.h2,{children:"API Reference"}),`
`,e.jsx(l,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(c.code,{children:".collection-grid"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base collection grid styles"})]})})]})}function h(t={}){const{wrapper:c}=t.components||{};return c?e.jsx(c,{...t,children:e.jsx(a,{...t})}):a(t)}function i(t,c){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
