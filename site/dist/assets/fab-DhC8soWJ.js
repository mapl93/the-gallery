import{j as e}from"./index-Dg0DyNZX.js";function h(i){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:o,Do:s,DoDont:r,Dont:l,Preview:c,PropTable:d}=t;return o||n("Callout"),s||n("Do"),r||n("DoDont"),l||n("Dont"),c||n("Preview"),d||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Floating action button. Fixed position with scroll-triggered visibility."}),`
`,e.jsx(c,{html:'<div style="position:relative;min-height:80px;display:flex;align-items:center;justify-content:center;"><button class="fab fab--visible" aria-label="Scroll to top" style="position:relative;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5m-7 7l7-7 7 7"/></svg></button></div>',label:"FAB / Back-to-Top",interaction:{selector:".fab",toggle:"fab--visible",triggerLabel:"Show FAB",startVisible:!1}}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(s,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(l,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(o,{type:"info",children:e.jsx(t.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Use ",e.jsx(t.code,{children:"<button>"})," elements for actions and ",e.jsx(t.code,{children:"<a>"})," for navigation. Never use ",e.jsx(t.code,{children:"<div>"})," with a click handler."]}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".fab"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base fab / back-to-top styles"})]})})]})}function x(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(h,{...i})}):h(i)}function n(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
