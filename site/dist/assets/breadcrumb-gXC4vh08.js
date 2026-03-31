import{j as e}from"./index-Dg0DyNZX.js";function d(i){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:s,Do:a,DoDont:t,Dont:o,Preview:c,PropTable:l}=n;return s||r("Callout"),a||r("Do"),t||r("DoDont"),o||r("Dont"),c||r("Preview"),l||r("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Navigation trail."}),`
`,e.jsx(c,{html:'<nav class="breadcrumb" aria-label="Breadcrumb"><a class="breadcrumb__link" href="#">Home</a><span> / </span><a class="breadcrumb__link" href="#">Collection</a><span> / </span><span aria-current="page">Product</span></nav>',label:"Breadcrumb"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(t,{children:[e.jsx(a,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(o,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"warning",children:e.jsx(n.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"<nav>"})," with ",e.jsx(n.code,{children:"aria-label"})," to identify the navigation region."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(l,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".breadcrumb"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base breadcrumb styles"})]})})]})}function x(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}function r(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
