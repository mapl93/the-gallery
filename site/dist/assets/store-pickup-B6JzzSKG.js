import{j as e}from"./index-Dg0DyNZX.js";function p(n){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:s,Do:i,DoDont:r,Dont:c,Preview:l,PropTable:a}=t;return s||o("Callout"),i||o("Do"),r||o("DoDont"),c||o("Dont"),l||o("Preview"),a||o("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Expandable store pickup locations with availability status."}),`
`,e.jsx(l,{html:'<div class="store-pickup" aria-expanded="true" style="max-width:400px;"><button class="store-pickup__toggle"><span class="store-pickup__toggle-icon">📍</span> Store Pickup Available</button><div class="store-pickup__content"><div class="store-pickup__location"><span class="store-pickup__status-icon" style="color:green;">●</span><span class="store-pickup__location-name">Buenos Aires Studio</span><span class="store-pickup__location-detail">Usually ready in 2 hours</span></div></div></div>',label:"Store Pickup Availability"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(i,{children:"Optimize product images for web — use WebP format and responsive srcset."}),e.jsx(c,{children:"Don't overload product components with too many badges or CTAs — keep it clean."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"tip",children:e.jsx(t.p,{children:"Product components are designed to work together. The product page combines gallery, info, form, and related products."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".store-pickup"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base store pickup availability styles"})]})})]})}function u(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(p,{...n})}):p(n)}function o(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
