import{j as e}from"./index-Dg0DyNZX.js";function h(t){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:o,Do:s,DoDont:l,Dont:c,Preview:r,PropTable:d}=n;return o||i("Callout"),s||i("Do"),l||i("DoDont"),c||i("Dont"),r||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Dropdown select with label."}),`
`,e.jsx(r,{html:'<div class="select" style="max-width:320px;"><label class="select__label">Country</label><select class="select__field"><option>Choose an option</option><option>Argentina</option><option>Mexico</option><option>Spain</option></select></div>',label:"Select"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(s,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(c,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(o,{type:"info",children:e.jsx(n.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".select"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base select styles"})]})})]})}function x(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(h,{...t})}):h(t)}function i(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
