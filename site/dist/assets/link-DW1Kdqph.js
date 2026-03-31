import{j as e}from"./index-Dg0DyNZX.js";function d(i){const n={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...i.components},{Callout:t,Do:r,DoDont:c,Dont:o,Preview:l,PropTable:h}=n;return t||s("Callout"),r||s("Do"),c||s("DoDont"),o||s("Dont"),l||s("Preview"),h||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Styled anchor. Default, subtle, and nav variants."}),`
`,e.jsx(l,{html:'<a class="link" href="#">Default Link</a> &nbsp; <a class="link link--subtle" href="#">Subtle Link</a> &nbsp; <a class="link link--nav" href="#">Nav Link</a>',label:"Link"}),`
`,e.jsx(n.h2,{children:"Variants"}),`
`,e.jsx(n.h3,{children:"Default"}),`
`,e.jsx(l,{html:'<a class="link" href="#">Default Link</a>',label:"Default"}),`
`,e.jsx(n.h3,{children:"Subtle"}),`
`,e.jsx(l,{html:'<a class="link link--subtle" href="#">Subtle Link</a>',label:"Subtle"}),`
`,e.jsx(n.h3,{children:"Nav"}),`
`,e.jsx(l,{html:'<a class="link link--nav" href="#">Nav Link</a>',label:"Nav"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(c,{children:[e.jsx(r,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(o,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"info",children:e.jsx(n.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsxs(h,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".link"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base link styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".link--subtle"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Subtle variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".link--nav"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Nav variant"})]})]})]})}function x(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}function s(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
