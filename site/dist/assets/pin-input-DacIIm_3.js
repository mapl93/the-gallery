import{j as e}from"./index-Dg0DyNZX.js";function p(i){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:l,Do:s,DoDont:c,Dont:r,Preview:o,PropTable:d}=n;return l||t("Callout"),s||t("Do"),c||t("DoDont"),r||t("Dont"),o||t("Preview"),d||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"One-time code input with individual character cells."}),`
`,e.jsx(o,{html:'<div class="pin-input"><input class="pin-input__field pin-input__field--filled" type="text" maxlength="1" value="4" /><input class="pin-input__field pin-input__field--filled" type="text" maxlength="1" value="2" /><input class="pin-input__field" type="text" maxlength="1" /><input class="pin-input__field" type="text" maxlength="1" /></div>',label:"Pin Input / OTP"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(c,{children:[e.jsx(s,{children:"Always pair form inputs with visible labels for accessibility."}),e.jsx(r,{children:"Don't rely on placeholder text as the only label — it disappears on input."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(l,{type:"tip",children:e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"field-wrapper"})," component to ensure consistent spacing and label alignment across all form fields."]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".pin-input"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base pin input / otp styles"})]})})]})}function h(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(p,{...i})}):p(i)}function t(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
