import{j as e}from"./index-Dg0DyNZX.js";function h(t){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:s,Do:o,DoDont:r,Dont:c,Preview:l,PropTable:d}=n;return s||i("Callout"),o||i("Do"),r||i("DoDont"),c||i("Dont"),l||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Increment/decrement quantity control."}),`
`,e.jsx(l,{html:'<div class="qty"><button class="qty__btn" aria-label="Decrease">−</button><input class="qty__input" type="number" value="1" min="1" /><button class="qty__btn" aria-label="Increase">+</button></div>',label:"Quantity Selector"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(o,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(c,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(n.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".qty"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base quantity selector styles"})]})})]})}function u(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(h,{...t})}):h(t)}function i(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
