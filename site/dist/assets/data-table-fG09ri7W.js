import{j as t}from"./index-Dg0DyNZX.js";function h(r){const e={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...r.components},{Callout:l,Do:s,DoDont:i,Dont:a,Preview:n,PropTable:o}=e;return l||d("Callout"),s||d("Do"),i||d("DoDont"),a||d("Dont"),n||d("Preview"),o||d("PropTable"),t.jsxs(t.Fragment,{children:[t.jsx(e.h2,{children:"Overview"}),`
`,t.jsx(e.p,{children:"Styled data table. Striped, hover, and sortable variants."}),`
`,t.jsx(n,{html:'<div class="table-wrapper"><table class="table"><thead><tr><th>Name</th><th>Type</th><th>Origin</th></tr></thead><tbody><tr><td>Celadon Vase</td><td>Stoneware</td><td>Japan</td></tr><tr><td>Raku Bowl</td><td>Earthenware</td><td>Korea</td></tr><tr><td>Porcelain Cup</td><td>Porcelain</td><td>China</td></tr></tbody></table></div>',label:"Table"}),`
`,t.jsx(e.h2,{children:"Variants"}),`
`,t.jsx(e.h3,{children:"Striped"}),`
`,t.jsx(n,{html:'<div class="table-wrapper"><table class="table table--striped"><thead><tr><th>Item</th><th>Price</th></tr></thead><tbody><tr><td>Vase</td><td>$120</td></tr><tr><td>Bowl</td><td>$80</td></tr><tr><td>Plate</td><td>$65</td></tr></tbody></table></div>',label:"Striped"}),`
`,t.jsx(e.h3,{children:"Hover"}),`
`,t.jsx(n,{html:'<div class="table-wrapper"><table class="table table--hover"><thead><tr><th>Item</th><th>Price</th></tr></thead><tbody><tr><td>Vase</td><td>$120</td></tr><tr><td>Bowl</td><td>$80</td></tr></tbody></table></div>',label:"Hover"}),`
`,t.jsx(e.h3,{children:"Sortable"}),`
`,t.jsx(n,{html:'<div class="table-wrapper"><table class="table"><thead><tr><th><button class="table__sort-btn">Name <span class="table__sort-icon">↕</span></button></th><th>Price</th></tr></thead><tbody><tr><td>Vase</td><td>$120</td></tr><tr><td>Bowl</td><td>$80</td></tr></tbody></table></div>',label:"Sortable"}),`
`,t.jsx(e.h2,{children:"Usage Guidelines"}),`
`,t.jsxs(i,{children:[t.jsx(s,{children:"Use this component consistently across your theme for a cohesive UI."}),t.jsx(a,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,t.jsx(e.h2,{children:"Accessibility"}),`
`,t.jsx(l,{type:"info",children:t.jsx(e.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,t.jsx(e.h2,{children:"API Reference"}),`
`,t.jsxs(o,{children:[t.jsxs("tr",{children:[t.jsx("td",{children:t.jsx(e.code,{children:".table"})}),t.jsx("td",{children:"class"}),t.jsx("td",{children:"—"}),t.jsx("td",{children:"Base table styles"})]}),t.jsxs("tr",{children:[t.jsx("td",{children:t.jsx(e.code,{children:".table--striped"})}),t.jsx("td",{children:"modifier"}),t.jsx("td",{children:"—"}),t.jsx("td",{children:"Striped variant"})]}),t.jsxs("tr",{children:[t.jsx("td",{children:t.jsx(e.code,{children:".table--hover"})}),t.jsx("td",{children:"modifier"}),t.jsx("td",{children:"—"}),t.jsx("td",{children:"Hover variant"})]}),t.jsxs("tr",{children:[t.jsx("td",{children:t.jsx(e.code,{children:".table--sortable"})}),t.jsx("td",{children:"modifier"}),t.jsx("td",{children:"—"}),t.jsx("td",{children:"Sortable variant"})]})]})]})}function x(r={}){const{wrapper:e}=r.components||{};return e?t.jsx(e,{...r,children:t.jsx(h,{...r})}):h(r)}function d(r,e){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
