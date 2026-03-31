import{j as e}from"./index-Dg0DyNZX.js";function d(t){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:s,Do:o,DoDont:l,Dont:r,Preview:c,PropTable:a}=n;return s||i("Callout"),o||i("Do"),l||i("DoDont"),r||i("Dont"),c||i("Preview"),a||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Account preferences sections (profile, password, notifications)."}),`
`,e.jsx(c,{html:'<div style="max-width:480px;"><h2>Account Settings</h2><form style="margin-top:16px;"><div class="field"><label class="field__label">Name</label><input class="input__field" type="text" value="María García" /></div><div class="field" style="margin-top:12px;"><label class="field__label">Email</label><input class="input__field" type="email" value="maria@example.com" /></div><button class="btn" style="margin-top:16px;">Save Changes</button></form></div>',label:"Account Settings"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(o,{children:"Pre-fill fields when possible (e.g., address from previous orders) to reduce friction."}),e.jsx(r,{children:"Don't expose sensitive account data without authentication."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"warning",children:e.jsx(n.p,{children:"Account components require Shopify customer authentication. They render only for logged-in customers."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/input",children:"Input"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/button",children:"Button"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/switch",children:"Switch / Toggle"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".account-settings"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base account settings styles"})]})})]})}function x(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(d,{...t})}):d(t)}function i(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
