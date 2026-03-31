import{j as e}from"./index-Dg0DyNZX.js";function h(t){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:s,Do:o,DoDont:l,Dont:r,Preview:c,PropTable:d}=n;return s||i("Callout"),o||i("Do"),l||i("DoDont"),r||i("Dont"),c||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Shimmer loading placeholder."}),`
`,e.jsx(c,{html:'<div class="skeleton" style="width:200px;height:16px;margin-bottom:8px;"></div><div class="skeleton" style="width:160px;height:16px;margin-bottom:8px;"></div><div class="skeleton skeleton--circle" style="width:48px;height:48px;"></div>',label:"Loading Skeleton"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(o,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(r,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(n.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:'aria-live="polite"'})," or ",e.jsx(n.code,{children:'role="status"'})," so screen readers announce loading state."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".skeleton"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base loading skeleton styles"})]})})]})}function x(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(h,{...t})}):h(t)}function i(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
