import{j as e}from"./index-Dg0DyNZX.js";function a(l){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...l.components},{Callout:s,Do:t,DoDont:r,Dont:o,Preview:c,PropTable:d}=n;return s||i("Callout"),t||i("Do"),r||i("DoDont"),o||i("Dont"),c||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Form layout with sections, rows, columns, actions, and error summary."}),`
`,e.jsx(c,{html:'<form class="form" style="max-width:400px;"><div class="field"><label class="field__label">Name</label><input class="input__field" type="text" placeholder="Your name" /></div><div class="field"><label class="field__label">Email</label><input class="input__field" type="email" placeholder="you@example.com" /></div><button class="btn" type="submit">Submit</button></form>',label:"Form"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(t,{children:"Always pair form inputs with visible labels for accessibility."}),e.jsx(o,{children:"Don't rely on placeholder text as the only label — it disappears on input."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"tip",children:e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"field-wrapper"})," component to ensure consistent spacing and label alignment across all form fields."]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/field-wrapper",children:"Field Wrapper"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".form"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base form styles"})]})})]})}function p(l={}){const{wrapper:n}=l.components||{};return n?e.jsx(n,{...l,children:e.jsx(a,{...l})}):a(l)}function i(l,n){throw new Error("Expected component `"+l+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
