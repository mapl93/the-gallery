import{j as e}from"./index-Dg0DyNZX.js";function d(s){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:t,Do:l,DoDont:o,Dont:r,Preview:c,PropTable:a}=n;return t||i("Callout"),l||i("Do"),o||i("DoDont"),r||i("Dont"),c||i("Preview"),a||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Custom commission request form with reference image upload."}),`
`,e.jsx(c,{html:'<div class="commission-form" style="max-width:480px;"><h3>Request a Commission</h3><form style="margin-top:16px;"><div class="field"><label class="field__label">Name</label><input class="input__field" type="text" /></div><div class="field" style="margin-top:12px;"><label class="field__label">Description</label><textarea class="textarea__field" rows="3" placeholder="Describe your vision…"></textarea></div><button class="btn" style="margin-top:12px;">Submit Request</button></form></div>',label:"Commission Form"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(l,{children:"Use these specialty components to tell the artisan story behind your products."}),e.jsx(r,{children:"Don't use generic product descriptions — ceramics customers value process, materials, and provenance."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"tip",children:e.jsx(n.p,{children:"Ceramics components are designed specifically for artisan e-commerce. They showcase craft and materials."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`,e.jsxs(n.li,{children:["All images must have descriptive ",e.jsx(n.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/input",children:"Input"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/textarea",children:"Textarea"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/file-upload",children:"File Upload / Dropzone"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".commission-form"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base commission form styles"})]})})]})}function x(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(d,{...s})}):d(s)}function i(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
