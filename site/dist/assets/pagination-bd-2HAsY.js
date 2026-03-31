import{j as n}from"./index-Dg0DyNZX.js";function d(e){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...e.components},{Callout:o,Do:s,DoDont:t,Dont:l,Preview:r,PropTable:c}=i;return o||a("Callout"),s||a("Do"),t||a("DoDont"),l||a("Dont"),r||a("Preview"),c||a("PropTable"),n.jsxs(n.Fragment,{children:[n.jsx(i.h2,{children:"Overview"}),`
`,n.jsx(i.p,{children:"Page navigation controls."}),`
`,n.jsx(r,{html:'<nav class="pagination" aria-label="Pagination"><a class="pagination__link" href="#">&laquo; Prev</a><a class="pagination__link" href="#">1</a><span class="pagination__current">2</span><a class="pagination__link" href="#">3</a><span class="pagination__ellipsis">…</span><a class="pagination__link" href="#">10</a><a class="pagination__link" href="#">Next &raquo;</a></nav>',label:"Pagination"}),`
`,n.jsx(i.h2,{children:"Usage Guidelines"}),`
`,n.jsxs(t,{children:[n.jsx(s,{children:"Use the collection grid with product cards for consistent spacing and responsive behavior."}),n.jsx(l,{children:"Don't mix collection grid with manual floats or absolute positioning."})]}),`
`,n.jsx(i.h2,{children:"Accessibility"}),`
`,n.jsx(o,{type:"info",children:n.jsx(i.p,{children:"Collection components handle responsive breakpoints automatically via CSS Grid."})}),`
`,n.jsxs(i.ul,{children:[`
`,n.jsxs(i.li,{children:["Use ",n.jsx(i.code,{children:"<nav>"})," with ",n.jsx(i.code,{children:"aria-label"})," to identify the navigation region."]}),`
`]}),`
`,n.jsx(i.h2,{children:"API Reference"}),`
`,n.jsx(c,{children:n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(i.code,{children:".pagination"})}),n.jsx("td",{children:"class"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Base pagination styles"})]})})]})}function p(e={}){const{wrapper:i}=e.components||{};return i?n.jsx(i,{...e,children:n.jsx(d,{...e})}):d(e)}function a(e,i){throw new Error("Expected component `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
