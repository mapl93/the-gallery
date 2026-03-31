import{j as n}from"./index-Dg0DyNZX.js";function a(e){const t={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...e.components},{Callout:l,Do:o,DoDont:r,Dont:c,Preview:i,PropTable:d}=t;return l||s("Callout"),o||s("Do"),r||s("DoDont"),c||s("Dont"),i||s("Preview"),d||s("PropTable"),n.jsxs(n.Fragment,{children:[n.jsx(t.h2,{children:"Overview"}),`
`,n.jsx(t.p,{children:"Social sharing buttons. Inline and sticky sidebar variants."}),`
`,n.jsx(i,{html:'<div class="share-buttons" style="display:flex;gap:8px;"><button class="btn btn--outline btn--sm">Twitter</button><button class="btn btn--outline btn--sm">Facebook</button><button class="btn btn--outline btn--sm">Copy Link</button></div>',label:"Share Buttons"}),`
`,n.jsx(t.h2,{children:"Variants"}),`
`,n.jsx(t.h3,{children:"Inline"}),`
`,n.jsx(i,{html:'<div class="share-buttons share-buttons--inline" style="display:flex;gap:8px;"><button class="btn btn--outline btn--sm">Share</button></div>',label:"Inline"}),`
`,n.jsx(t.h3,{children:"Sticky"}),`
`,n.jsx(i,{html:'<div class="share-buttons share-buttons--sticky" style="display:flex;flex-direction:column;gap:8px;"><button class="btn btn--outline btn--sm">T</button><button class="btn btn--outline btn--sm">F</button></div>',label:"Sticky"}),`
`,n.jsx(t.h2,{children:"Usage Guidelines"}),`
`,n.jsxs(r,{children:[n.jsx(o,{children:"Use the article body/prose component for rich text — it handles typography, images, and spacing."}),n.jsx(c,{children:"Don't manually style article content with inline styles — let the prose class handle it."})]}),`
`,n.jsx(t.h2,{children:"Accessibility"}),`
`,n.jsx(l,{type:"info",children:n.jsx(t.p,{children:"Blog components support Shopify's article template system. Use metafields for custom article data."})}),`
`,n.jsxs(t.ul,{children:[`
`,n.jsxs(t.li,{children:["Use ",n.jsx(t.code,{children:"<button>"})," elements for actions and ",n.jsx(t.code,{children:"<a>"})," for navigation. Never use ",n.jsx(t.code,{children:"<div>"})," with a click handler."]}),`
`]}),`
`,n.jsx(t.h2,{children:"API Reference"}),`
`,n.jsxs(d,{children:[n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(t.code,{children:".share-buttons"})}),n.jsx("td",{children:"class"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Base share buttons styles"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(t.code,{children:".share-buttons--inline"})}),n.jsx("td",{children:"modifier"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Inline variant"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(t.code,{children:".share-buttons--sticky"})}),n.jsx("td",{children:"modifier"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Sticky variant"})]})]})]})}function x(e={}){const{wrapper:t}=e.components||{};return t?n.jsx(t,{...e,children:n.jsx(a,{...e})}):a(e)}function s(e,t){throw new Error("Expected component `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
