import{j as e}from"./index-Dg0DyNZX.js";function a(n){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:s,Do:t,DoDont:d,Dont:r,Preview:o,PropTable:c}=i;return s||l("Callout"),t||l("Do"),d||l("DoDont"),r||l("Dont"),o||l("Preview"),c||l("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(i.h2,{children:"Overview"}),`
`,e.jsx(i.p,{children:"Styled fieldset group with legend."}),`
`,e.jsx(o,{html:'<fieldset class="fieldset" style="max-width:400px;"><legend class="fieldset__legend">Shipping Address</legend><div class="field"><label class="field__label">Street</label><input class="input__field" type="text" /></div></fieldset>',label:"Fieldset"}),`
`,e.jsx(i.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(d,{children:[e.jsx(t,{children:"Always pair form inputs with visible labels for accessibility."}),e.jsx(r,{children:"Don't rely on placeholder text as the only label — it disappears on input."})]}),`
`,e.jsx(i.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"tip",children:e.jsxs(i.p,{children:["Use the ",e.jsx(i.code,{children:"field-wrapper"})," component to ensure consistent spacing and label alignment across all form fields."]})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Associate every input with a ",e.jsx(i.code,{children:"<label>"})," using matching ",e.jsx(i.code,{children:"for"}),"/",e.jsx(i.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(i.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(i.code,{children:".fieldset"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base fieldset styles"})]})})]})}function x(n={}){const{wrapper:i}=n.components||{};return i?e.jsx(i,{...n,children:e.jsx(a,{...n})}):a(n)}function l(n,i){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
