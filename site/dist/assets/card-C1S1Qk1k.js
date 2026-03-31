import{j as e}from"./index-Dg0DyNZX.js";function h(n){const d={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...n.components},{Callout:a,Do:s,DoDont:l,Dont:r,Preview:i,PropTable:c}=d;return a||t("Callout"),s||t("Do"),l||t("DoDont"),r||t("Dont"),i||t("Preview"),c||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(d.h2,{children:"Overview"}),`
`,e.jsx(d.p,{children:"Container with border, shadow, and hover lift. Flat and elevated variants."}),`
`,e.jsx(i,{html:'<div class="card" style="max-width:320px;"><div class="card__media"><img src="https://placehold.co/320x200/f5f0eb/1a1a1a?text=Card" alt="Card" /></div><div class="card__body" style="padding:16px;"><h3>Card Title</h3><p>Card body content.</p></div></div>',label:"Card"}),`
`,e.jsx(d.h2,{children:"Variants"}),`
`,e.jsx(d.h3,{children:"Default"}),`
`,e.jsx(i,{html:'<div class="card" style="max-width:280px;padding:16px;"><h3>Default Card</h3><p>Standard card with shadow.</p></div>',label:"Default"}),`
`,e.jsx(d.h3,{children:"Flat"}),`
`,e.jsx(i,{html:'<div class="card card--flat" style="max-width:280px;padding:16px;"><h3>Flat Card</h3><p>No shadow variant.</p></div>',label:"Flat"}),`
`,e.jsx(d.h3,{children:"Elevated"}),`
`,e.jsx(i,{html:'<div class="card card--elevated" style="max-width:280px;padding:16px;"><h3>Elevated Card</h3><p>Extra shadow.</p></div>',label:"Elevated"}),`
`,e.jsx(d.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(s,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(r,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(d.h2,{children:"Accessibility"}),`
`,e.jsx(a,{type:"warning",children:e.jsx(d.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:["All images must have descriptive ",e.jsx(d.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(d.h2,{children:"API Reference"}),`
`,e.jsxs(c,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(d.code,{children:".card"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base card styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(d.code,{children:".card--flat"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Flat variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(d.code,{children:".card--elevated"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Elevated variant"})]})]})]})}function x(n={}){const{wrapper:d}=n.components||{};return d?e.jsx(d,{...n,children:e.jsx(h,{...n})}):h(n)}function t(n,d){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
