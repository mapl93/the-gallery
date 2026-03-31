import{j as e}from"./index-Dg0DyNZX.js";function a(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:t,Do:s,DoDont:r,Dont:l,Preview:c,PropTable:d}=n;return t||i("Callout"),s||i("Do"),r||i("DoDont"),l||i("Dont"),c||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Radio button with label."}),`
`,e.jsx(c,{html:'<fieldset style="border:none;padding:0;"><label class="radio"><input class="radio__input" type="radio" name="demo" checked /><span class="radio__label">Option A</span></label> <label class="radio"><input class="radio__input" type="radio" name="demo" /><span class="radio__label">Option B</span></label></fieldset>',label:"Radio"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(s,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(l,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"info",children:e.jsx(n.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".radio"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base radio styles"})]})})]})}function p(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(a,{...o})}):a(o)}function i(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
