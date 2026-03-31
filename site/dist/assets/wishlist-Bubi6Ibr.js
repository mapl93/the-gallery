import{j as e}from"./index-Dg0DyNZX.js";function a(s){const i={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:n,Do:r,DoDont:o,Dont:c,Preview:l,PropTable:d}=i;return n||t("Callout"),r||t("Do"),o||t("DoDont"),c||t("Dont"),l||t("Preview"),d||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(i.h2,{children:"Overview"}),`
`,e.jsx(i.p,{children:"Wishlist page with product grid and heart toggle button."}),`
`,e.jsx(l,{html:'<div class="wishlist" style="max-width:500px;"><div class="wishlist__header"><h2 class="wishlist__title">My Wishlist</h2></div><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:16px;"><article class="product-card"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=W1" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Ceramic Vase</h3></div></article></div></div>',label:"Wishlist"}),`
`,e.jsx(i.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(r,{children:"Pre-fill fields when possible (e.g., address from previous orders) to reduce friction."}),e.jsx(c,{children:"Don't expose sensitive account data without authentication."})]}),`
`,e.jsx(i.h2,{children:"Accessibility"}),`
`,e.jsx(n,{type:"warning",children:e.jsx(i.p,{children:"Account components require Shopify customer authentication. They render only for logged-in customers."})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(i.h2,{children:"Dependencies"}),`
`,e.jsx(i.p,{children:"This component uses:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/components/product-card",children:"Product Card"})}),`
`]}),`
`,e.jsx(i.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(i.code,{children:".wishlist"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base wishlist styles"})]})})]})}function p(s={}){const{wrapper:i}=s.components||{};return i?e.jsx(i,{...s,children:e.jsx(a,{...s})}):a(s)}function t(s,i){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
