import{j as e}from"./index-Dg0DyNZX.js";function a(n){const s={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:i,Do:r,DoDont:o,Dont:c,Preview:l,PropTable:d}=s;return i||t("Callout"),r||t("Do"),o||t("DoDont"),c||t("Dont"),l||t("Preview"),d||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Password reset request form with success state."}),`
`,e.jsx(l,{html:'<div class="password-reset" style="max-width:380px;text-align:center;"><div class="password-reset__icon">🔑</div><h2 class="password-reset__title">Reset Password</h2><p class="password-reset__text">Enter your email to receive a reset link.</p><form style="margin-top:16px;"><input class="input__field" type="email" placeholder="your@email.com" style="width:100%;" /><button class="btn" style="width:100%;margin-top:12px;">Send Reset Link</button></form></div>',label:"Password Reset"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(r,{children:"Pre-fill fields when possible (e.g., address from previous orders) to reduce friction."}),e.jsx(c,{children:"Don't expose sensitive account data without authentication."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"warning",children:e.jsx(s.p,{children:"Account components require Shopify customer authentication. They render only for logged-in customers."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Associate every input with a ",e.jsx(s.code,{children:"<label>"})," using matching ",e.jsx(s.code,{children:"for"}),"/",e.jsx(s.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(s.h2,{children:"Dependencies"}),`
`,e.jsx(s.p,{children:"This component uses:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/components/input",children:"Input"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".password-reset"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base password reset styles"})]})})]})}function x(n={}){const{wrapper:s}=n.components||{};return s?e.jsx(s,{...n,children:e.jsx(a,{...n})}):a(n)}function t(n,s){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
