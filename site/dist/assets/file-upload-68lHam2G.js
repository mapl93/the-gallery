import{j as e}from"./index-Dg0DyNZX.js";function c(l){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...l.components},{Callout:s,Do:o,DoDont:t,Dont:d,Preview:r,PropTable:a}=n;return s||i("Callout"),o||i("Do"),t||i("DoDont"),d||i("Dont"),r||i("Preview"),a||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Drag-and-drop file upload zone with preview list."}),`
`,e.jsx(r,{html:'<div class="file-upload" style="max-width:400px;"><input class="file-upload__input" type="file" id="demo-upload" /><label for="demo-upload"><span class="file-upload__icon">📁</span><span class="file-upload__text">Click to upload or drag and drop</span><span class="file-upload__hint">PNG, JPG up to 10MB</span></label></div>',label:"File Upload / Dropzone"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(t,{children:[e.jsx(o,{children:"Always pair form inputs with visible labels for accessibility."}),e.jsx(d,{children:"Don't rely on placeholder text as the only label — it disappears on input."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"tip",children:e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"field-wrapper"})," component to ensure consistent spacing and label alignment across all form fields."]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".file-upload"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base file upload / dropzone styles"})]})})]})}function h(l={}){const{wrapper:n}=l.components||{};return n?e.jsx(n,{...l,children:e.jsx(c,{...l})}):c(l)}function i(l,n){throw new Error("Expected component `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
