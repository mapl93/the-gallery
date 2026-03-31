import{j as e}from"./index-Dg0DyNZX.js";function a(i){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:t,Do:l,DoDont:o,Dont:r,Preview:c,PropTable:d}=n;return t||s("Callout"),l||s("Do"),o||s("DoDont"),r||s("Dont"),c||s("Preview"),d||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Login and registration forms with social auth and dividers."}),`
`,e.jsx(c,{html:'<div class="auth" style="max-width:380px;"><div class="auth__header"><h2 class="auth__title">Sign In</h2><p class="auth__subtitle">Welcome back</p></div><form class="auth__form"><div class="field"><label class="field__label">Email</label><input class="input__field" type="email" placeholder="your@email.com" /></div><div class="field"><label class="field__label">Password</label><input class="input__field" type="password" placeholder="••••••••" /></div><button class="btn" style="width:100%;margin-top:12px;">Sign In</button></form></div>',label:"Auth Forms (Login / Register)"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(l,{children:"Pre-fill fields when possible (e.g., address from previous orders) to reduce friction."}),e.jsx(r,{children:"Don't expose sensitive account data without authentication."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"warning",children:e.jsx(n.p,{children:"Account components require Shopify customer authentication. They render only for logged-in customers."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/input",children:"Input"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/button",children:"Button"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/form",children:"Form"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".auth"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base auth forms (login / register) styles"})]})})]})}function u(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}function s(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
