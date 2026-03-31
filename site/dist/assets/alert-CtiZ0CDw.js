import{j as e}from"./index-Dg0DyNZX.js";function o(n){const s={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...n.components},{Callout:l,Do:t,DoDont:c,Dont:a,Preview:r,PropTable:d}=s;return l||i("Callout"),t||i("Do"),c||i("DoDont"),a||i("Dont"),r||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Inline feedback banner. info, success, warning, error variants."}),`
`,e.jsx(r,{html:'<div class="alert alert--info"><span class="alert__icon">ℹ️</span><div class="alert__content"><p class="alert__title">Info</p><p class="alert__message">This is an informational message.</p></div><button class="alert__dismiss" aria-label="Dismiss">&times;</button></div>',label:"Alert / Banner"}),`
`,e.jsx(s.h2,{children:"Variants"}),`
`,e.jsx(s.h3,{children:"Info"}),`
`,e.jsx(r,{html:'<div class="alert alert--info"><span class="alert__icon">ℹ️</span><div class="alert__content"><p class="alert__title">Info</p><p class="alert__message">Informational alert.</p></div></div>',label:"Info"}),`
`,e.jsx(s.h3,{children:"Success"}),`
`,e.jsx(r,{html:'<div class="alert alert--success"><span class="alert__icon">✓</span><div class="alert__content"><p class="alert__title">Success</p><p class="alert__message">Operation completed.</p></div></div>',label:"Success"}),`
`,e.jsx(s.h3,{children:"Warning"}),`
`,e.jsx(r,{html:'<div class="alert alert--warning"><span class="alert__icon">⚠</span><div class="alert__content"><p class="alert__title">Warning</p><p class="alert__message">Please review.</p></div></div>',label:"Warning"}),`
`,e.jsx(s.h3,{children:"Error"}),`
`,e.jsx(r,{html:'<div class="alert alert--error"><span class="alert__icon">✕</span><div class="alert__content"><p class="alert__title">Error</p><p class="alert__message">Something went wrong.</p></div></div>',label:"Error"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(c,{children:[e.jsx(t,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(a,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(l,{type:"info",children:e.jsx(s.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.code,{children:'role="alert"'})," or ",e.jsx(s.code,{children:'aria-live="assertive"'})," for important notifications."]}),`
`]}),`
`,e.jsx(s.h2,{children:"Dependencies"}),`
`,e.jsx(s.p,{children:"This component uses:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/components/close-button",children:"Close Button"})}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsxs(d,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".alert"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base alert / banner styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".alert--info"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Info variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".alert--success"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Success variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".alert--warning"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Warning variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".alert--error"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Error variant"})]})]})]})}function x(n={}){const{wrapper:s}=n.components||{};return s?e.jsx(s,{...n,children:e.jsx(o,{...n})}):o(n)}function i(n,s){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
