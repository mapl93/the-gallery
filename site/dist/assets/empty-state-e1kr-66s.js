import{j as e}from"./index-Dg0DyNZX.js";function a(n){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:i,Do:o,DoDont:r,Dont:c,Preview:l,PropTable:h}=t;return i||s("Callout"),o||s("Do"),r||s("DoDont"),c||s("Dont"),l||s("Preview"),h||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Placeholder for empty collections, carts, search results."}),`
`,e.jsx(l,{html:'<div class="empty-state" style="max-width:400px;"><div class="empty-state__icon">📦</div><h3 class="empty-state__heading">Nothing here yet</h3><p class="empty-state__text">Start browsing to discover unique artisan pieces.</p><a class="empty-state__cta btn" href="#">Explore</a></div>',label:"Empty State"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(o,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(c,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"info",children:e.jsx(t.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(h,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".empty-state"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base empty state styles"})]})})]})}function p(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(a,{...n})}):a(n)}function s(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
