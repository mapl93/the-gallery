import{j as e}from"./index-Dg0DyNZX.js";function d(i){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:o,Do:r,DoDont:s,Dont:l,Preview:a,PropTable:c}=n;return o||t("Callout"),r||t("Do"),s||t("DoDont"),l||t("Dont"),a||t("Preview"),c||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Numbered pagination for review list."}),`
`,e.jsx(a,{html:'<div class="review-pagination"><button class="review-pagination__btn">1</button><button class="review-pagination__btn" aria-current="page">2</button><button class="review-pagination__btn">3</button></div>',label:"Review Pagination"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(s,{children:[e.jsx(r,{children:"Display aggregate ratings prominently — social proof drives conversions."}),e.jsx(l,{children:"Don't hide negative reviews — authenticity builds trust."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(o,{type:"info",children:e.jsx(n.p,{children:"Review components work with Shopify product metafields or third-party review apps."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"<nav>"})," with ",e.jsx(n.code,{children:"aria-label"})," to identify the navigation region."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".review-pagination"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base review pagination styles"})]})})]})}function p(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}function t(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
