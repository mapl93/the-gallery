import{j as e}from"./index-Dg0DyNZX.js";function c(n){const o={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:t,Do:s,DoDont:r,Dont:l,Preview:a,PropTable:d}=o;return t||i("Callout"),s||i("Do"),r||i("DoDont"),l||i("Dont"),a||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(o.h2,{children:"Overview"}),`
`,e.jsx(o.p,{children:"Site footer with link columns and bottom bar."}),`
`,e.jsx(a,{html:'<footer class="footer" style="position:relative;"><div class="footer__grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;"><div><h4 class="footer__heading">Shop</h4><nav class="footer__links"><a href="#">New Arrivals</a><a href="#">Collections</a></nav></div><div><h4 class="footer__heading">About</h4><nav class="footer__links"><a href="#">Our Story</a><a href="#">Artists</a></nav></div><div><h4 class="footer__heading">Support</h4><nav class="footer__links"><a href="#">FAQ</a><a href="#">Contact</a></nav></div></div><div class="footer__bottom">© 2026 The Gallery</div></footer>',label:"Footer"}),`
`,e.jsx(o.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(s,{children:"Keep global chrome consistent across all pages — header and footer should be in the layout template."}),e.jsx(l,{children:"Don't duplicate global elements inside individual sections or pages."})]}),`
`,e.jsx(o.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"info",children:e.jsx(o.p,{children:"Global components are typically included in your theme layout, not in individual pages."})}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Use ",e.jsx(o.code,{children:"<nav>"})," with ",e.jsx(o.code,{children:"aria-label"})," to identify the navigation region."]}),`
`]}),`
`,e.jsx(o.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(o.code,{children:".footer"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base footer styles"})]})})]})}function f(n={}){const{wrapper:o}=n.components||{};return o?e.jsx(o,{...n,children:e.jsx(c,{...n})}):c(n)}function i(n,o){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};
