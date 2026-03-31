import{j as e}from"./index-Dg0DyNZX.js";function h(t){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:i,Do:s,DoDont:r,Dont:l,Preview:c,PropTable:d}=n;return i||o("Callout"),s||o("Do"),r||o("DoDont"),l||o("Dont"),c||o("Preview"),d||o("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Mutually exclusive toggle buttons (e.g., grid/list view)."}),`
`,e.jsx(c,{html:'<div class="toggle-group"><button class="toggle toggle--active">Grid</button><button class="toggle">List</button></div>',label:"Toggle / Toggle Group"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(s,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(l,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"info",children:e.jsx(n.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"<button>"})," elements for actions and ",e.jsx(n.code,{children:"<a>"})," for navigation. Never use ",e.jsx(n.code,{children:"<div>"})," with a click handler."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".toggle-group"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base toggle / toggle group styles"})]})})]})}function a(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(h,{...t})}):h(t)}function o(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default};
