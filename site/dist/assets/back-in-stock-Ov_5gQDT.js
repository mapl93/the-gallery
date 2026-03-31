import{j as e}from"./index-Dg0DyNZX.js";function d(n){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:i,Do:s,DoDont:c,Dont:r,Preview:l,PropTable:a}=t;return i||o("Callout"),s||o("Do"),c||o("DoDont"),r||o("Dont"),l||o("Preview"),a||o("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Email signup form for out-of-stock product notification."}),`
`,e.jsx(l,{html:`<div class="back-in-stock" style="max-width:400px;"><h4 class="back-in-stock__heading">Notify me when available</h4><p class="back-in-stock__text">Enter your email and we'll let you know when this item is back.</p><form class="back-in-stock__form"><input class="back-in-stock__input" type="email" placeholder="your@email.com" /><button class="back-in-stock__submit" type="submit">Notify Me</button></form></div>`,label:"Back in Stock Alert"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(c,{children:[e.jsx(s,{children:"Optimize product images for web — use WebP format and responsive srcset."}),e.jsx(r,{children:"Don't overload product components with too many badges or CTAs — keep it clean."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"tip",children:e.jsx(t.p,{children:"Product components are designed to work together. The product page combines gallery, info, form, and related products."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".back-in-stock"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base back in stock alert styles"})]})})]})}function p(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(d,{...n})}):d(n)}function o(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
