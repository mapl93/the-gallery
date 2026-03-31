import{j as e}from"./index-Dg0DyNZX.js";function a(o){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:n,Do:r,DoDont:s,Dont:l,Preview:c,PropTable:d}=t;return n||i("Callout"),r||i("Do"),s||i("DoDont"),l||i("Dont"),c||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Toolbar with sort dropdown and write-review CTA."}),`
`,e.jsx(c,{html:'<div class="review-toolbar"><div class="review-toolbar__sort"><label>Sort by</label><select class="review-toolbar__sort-select"><option>Most Recent</option><option>Highest Rated</option><option>Most Helpful</option></select></div><button class="review-toolbar__write-btn btn btn--outline">Write a Review</button></div>',label:"Review Sort / Filter Bar"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(s,{children:[e.jsx(r,{children:"Display aggregate ratings prominently — social proof drives conversions."}),e.jsx(l,{children:"Don't hide negative reviews — authenticity builds trust."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(n,{type:"info",children:e.jsx(t.p,{children:"Review components work with Shopify product metafields or third-party review apps."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".review-toolbar"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base review sort / filter bar styles"})]})})]})}function p(o={}){const{wrapper:t}=o.components||{};return t?e.jsx(t,{...o,children:e.jsx(a,{...o})}):a(o)}function i(o,t){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
