import{j as e}from"./index-Dg0DyNZX.js";function a(s){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:t,Do:l,DoDont:o,Dont:r,Preview:d,PropTable:c}=n;return t||i("Callout"),l||i("Do"),o||i("DoDont"),r||i("Dont"),d||i("Preview"),c||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Password field with show/hide toggle and strength meter."}),`
`,e.jsx(d,{html:'<div class="password-input" style="max-width:320px;"><label class="field__label">Password</label><div style="position:relative;"><input class="input__field" type="password" value="secret123" /><button class="password-input__toggle" aria-label="Show password" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);">👁</button></div></div>',label:"Password Input"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(l,{children:"Always pair form inputs with visible labels for accessibility."}),e.jsx(r,{children:"Don't rely on placeholder text as the only label — it disappears on input."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"tip",children:e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"field-wrapper"})," component to ensure consistent spacing and label alignment across all form fields."]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/input",children:"Input"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".password-input"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base password input styles"})]})})]})}function p(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(a,{...s})}):a(s)}function i(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
