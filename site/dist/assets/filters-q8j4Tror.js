import{j as e}from"./index-Dg0DyNZX.js";function a(i){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:o,Do:s,DoDont:r,Dont:l,Preview:c,PropTable:d}=n;return o||t("Callout"),s||t("Do"),r||t("DoDont"),l||t("Dont"),c||t("Preview"),d||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Sidebar and active filter bar with swatches."}),`
`,e.jsx(c,{html:'<div class="filters"><div class="filters__bar"><div class="filter-group"><button class="filter-group__title">Category</button></div><div class="filter-group"><button class="filter-group__title">Price</button></div><div class="filter-group"><button class="filter-group__title">Color</button></div></div></div>',label:"Collection Filters"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(s,{children:"Use the collection grid with product cards for consistent spacing and responsive behavior."}),e.jsx(l,{children:"Don't mix collection grid with manual floats or absolute positioning."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(o,{type:"info",children:e.jsx(n.p,{children:"Collection components handle responsive breakpoints automatically via CSS Grid."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/checkbox",children:"Checkbox"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/radio",children:"Radio"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/tag",children:"Tag"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".filters"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base collection filters styles"})]})})]})}function x(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}function t(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
