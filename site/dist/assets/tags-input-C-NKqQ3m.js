import{j as e}from"./index-Dg0DyNZX.js";function d(t){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:i,Do:l,DoDont:c,Dont:o,Preview:r,PropTable:a}=n;return i||s("Callout"),l||s("Do"),c||s("DoDont"),o||s("Dont"),r||s("Preview"),a||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Multi-value text input that produces removable tag chips."}),`
`,e.jsx(r,{html:'<div class="tags-input" style="max-width:360px;"><span class="tags-input__tag">Ceramic <button class="tags-input__remove">&times;</button></span><span class="tags-input__tag">Handmade <button class="tags-input__remove">&times;</button></span><input class="tags-input__field" type="text" placeholder="Add tag…" /></div>',label:"Tags Input"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(c,{children:[e.jsx(l,{children:"Always pair form inputs with visible labels for accessibility."}),e.jsx(o,{children:"Don't rely on placeholder text as the only label — it disappears on input."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"tip",children:e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"field-wrapper"})," component to ensure consistent spacing and label alignment across all form fields."]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/tag",children:"Tag"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".tags-input"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base tags input styles"})]})})]})}function p(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(d,{...t})}):d(t)}function s(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
