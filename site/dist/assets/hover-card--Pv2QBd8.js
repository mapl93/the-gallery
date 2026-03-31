import{j as e}from"./index-Dg0DyNZX.js";function a(i){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:s,Do:o,DoDont:r,Dont:c,Preview:d,PropTable:l}=n;return s||t("Callout"),o||t("Do"),r||t("DoDont"),c||t("Dont"),d||t("Preview"),l||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Content preview on hover. For product previews, user cards."}),`
`,e.jsx(d,{html:'<div class="hover-card" style="position:relative;display:inline-block;"><a href="#">Hover me</a><div class="hover-card__content" style="position:relative;margin-top:8px;padding:16px;"><p>Hover card content with details.</p></div></div>',label:"Hover Card"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(o,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(c,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"warning",children:e.jsx(n.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["All images must have descriptive ",e.jsx(n.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(l,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".hover-card"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base hover card styles"})]})})]})}function x(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}function t(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
