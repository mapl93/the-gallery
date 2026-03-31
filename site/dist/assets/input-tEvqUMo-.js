import{j as e}from"./index-Dg0DyNZX.js";function a(i){const s={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...i.components},{Callout:l,Do:r,DoDont:c,Dont:d,Preview:t,PropTable:o}=s;return l||n("Callout"),r||n("Do"),c||n("DoDont"),d||n("Dont"),t||n("Preview"),o||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Text input with label, message, icon. 4 types × 4 states."}),`
`,e.jsx(t,{html:'<div class="input" style="max-width:320px;"><label class="input__label">Name</label><input class="input__field" type="text" placeholder="Enter your name" /></div>',label:"Input"}),`
`,e.jsx(s.h2,{children:"Variants"}),`
`,e.jsx(s.h3,{children:"Default"}),`
`,e.jsx(t,{html:'<div class="input" style="max-width:320px;"><label class="input__label">Default</label><input class="input__field" type="text" placeholder="Placeholder" /></div>',label:"Default"}),`
`,e.jsx(s.h3,{children:"Error"}),`
`,e.jsx(t,{html:'<div class="input input--error" style="max-width:320px;"><label class="input__label">With error</label><input class="input__field" type="text" value="Invalid" /><span class="input__message">This field is required</span></div>',label:"Error"}),`
`,e.jsx(s.h3,{children:"Success"}),`
`,e.jsx(t,{html:'<div class="input input--success" style="max-width:320px;"><label class="input__label">Success</label><input class="input__field" type="text" value="Valid" /></div>',label:"Success"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(c,{children:[e.jsx(r,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(d,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(l,{type:"info",children:e.jsx(s.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Associate every input with a ",e.jsx(s.code,{children:"<label>"})," using matching ",e.jsx(s.code,{children:"for"}),"/",e.jsx(s.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsxs(o,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".input"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base input styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".input--error"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Error variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".input--success"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Success variant"})]})]})]})}function x(i={}){const{wrapper:s}=i.components||{};return s?e.jsx(s,{...i,children:e.jsx(a,{...i})}):a(i)}function n(i,s){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
