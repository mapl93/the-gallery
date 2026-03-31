import{j as e}from"./index-Dg0DyNZX.js";function d(s){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:t,Do:i,DoDont:o,Dont:c,Preview:l,PropTable:a}=n;return t||r("Callout"),i||r("Do"),o||r("DoDont"),c||r("Dont"),l||r("Preview"),a||r("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Price display with sale and compare-at states."}),`
`,e.jsx(l,{html:'<span class="price"><span class="price__current">$120.00</span></span> <span class="price price--on-sale"><span class="price__compare">$150.00</span> <span class="price__current">$120.00</span></span>',label:"Price"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(i,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(c,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"info",children:e.jsx(n.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".price"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base price styles"})]})})]})}function p(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(d,{...s})}):d(s)}function r(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
