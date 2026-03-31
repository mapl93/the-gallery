import{j as e}from"./index-Dg0DyNZX.js";function a(t){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:c,Do:o,DoDont:i,Dont:l,Preview:r,PropTable:h}=n;return c||s("Callout"),o||s("Do"),i||s("DoDont"),l||s("Dont"),r||s("Preview"),h||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Checkbox with label."}),`
`,e.jsx(r,{html:'<label class="checkbox"><input class="checkbox__input" type="checkbox" checked /><span class="checkbox__label">Accept terms</span></label> <label class="checkbox"><input class="checkbox__input" type="checkbox" /><span class="checkbox__label">Subscribe to newsletter</span></label>',label:"Checkbox"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(i,{children:[e.jsx(o,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(l,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(c,{type:"info",children:e.jsx(n.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(h,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".checkbox"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base checkbox styles"})]})})]})}function x(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}function s(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
