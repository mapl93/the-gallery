import{j as e}from"./index-Dg0DyNZX.js";function a(i){const l={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:s,Do:r,DoDont:t,Dont:o,Preview:c,PropTable:d}=l;return s||n("Callout"),r||n("Do"),t||n("DoDont"),o||n("Dont"),c||n("Preview"),d||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(l.h2,{children:"Overview"}),`
`,e.jsx(l.p,{children:"Universal label + input + help/error wrapper for all form fields."}),`
`,e.jsx(c,{html:'<div class="field" style="max-width:320px;"><label class="field__label">Email</label><input class="input__field" type="email" placeholder="you@example.com" /></div>',label:"Field Wrapper"}),`
`,e.jsx(l.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(t,{children:[e.jsx(r,{children:"Always pair form inputs with visible labels for accessibility."}),e.jsx(o,{children:"Don't rely on placeholder text as the only label — it disappears on input."})]}),`
`,e.jsx(l.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"tip",children:e.jsxs(l.p,{children:["Use the ",e.jsx(l.code,{children:"field-wrapper"})," component to ensure consistent spacing and label alignment across all form fields."]})}),`
`,e.jsxs(l.ul,{children:[`
`,e.jsxs(l.li,{children:["Associate every input with a ",e.jsx(l.code,{children:"<label>"})," using matching ",e.jsx(l.code,{children:"for"}),"/",e.jsx(l.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(l.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(l.code,{children:".field-wrapper"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base field wrapper styles"})]})})]})}function h(i={}){const{wrapper:l}=i.components||{};return l?e.jsx(l,{...i,children:e.jsx(a,{...i})}):a(i)}function n(i,l){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
