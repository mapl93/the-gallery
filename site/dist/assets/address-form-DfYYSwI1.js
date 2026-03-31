import{j as e}from"./index-Dg0DyNZX.js";function a(s){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:l,Do:t,DoDont:r,Dont:d,Preview:o,PropTable:c}=n;return l||i("Callout"),t||i("Do"),r||i("DoDont"),d||i("Dont"),o||i("Preview"),c||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Two-column address input form."}),`
`,e.jsx(o,{html:'<div class="address-form" style="max-width:400px;"><div class="address-form__row" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;"><div class="field"><label class="field__label">First Name</label><input class="input__field" type="text" /></div><div class="field"><label class="field__label">Last Name</label><input class="input__field" type="text" /></div></div><div class="field" style="margin-top:12px;"><label class="field__label">Address</label><input class="input__field" type="text" /></div></div>',label:"Address Form"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(t,{children:"Pre-fill fields when possible (e.g., address from previous orders) to reduce friction."}),e.jsx(d,{children:"Don't expose sensitive account data without authentication."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(l,{type:"warning",children:e.jsx(n.p,{children:"Account components require Shopify customer authentication. They render only for logged-in customers."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/input",children:"Input"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/select",children:"Select"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".address-form"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base address form styles"})]})})]})}function x(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(a,{...s})}):a(s)}function i(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
