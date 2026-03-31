import{j as e}from"./index-Dg0DyNZX.js";function a(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:s,Do:r,DoDont:o,Dont:l,Preview:h,PropTable:c}=i;return s||n("Callout"),r||n("Do"),o||n("DoDont"),l||n("Dont"),h||n("Preview"),c||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(i.h2,{children:"Overview"}),`
`,e.jsx(i.p,{children:"Filterable tag cloud of review themes with counts."}),`
`,e.jsx(h,{html:'<div class="review-highlights"><button class="review-highlights__tag is-active" aria-pressed="true">Quality <span class="review-highlights__count">42</span></button><button class="review-highlights__tag">Craftsmanship <span class="review-highlights__count">38</span></button><button class="review-highlights__tag">Packaging <span class="review-highlights__count">21</span></button></div>',label:"Review Highlights / Themes"}),`
`,e.jsx(i.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(r,{children:"Display aggregate ratings prominently — social proof drives conversions."}),e.jsx(l,{children:"Don't hide negative reviews — authenticity builds trust."})]}),`
`,e.jsx(i.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(i.p,{children:"Review components work with Shopify product metafields or third-party review apps."})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(i.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(i.code,{children:".review-highlights"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base review highlights / themes styles"})]})})]})}function g(t={}){const{wrapper:i}=t.components||{};return i?e.jsx(i,{...t,children:e.jsx(a,{...t})}):a(t)}function n(t,i){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};
