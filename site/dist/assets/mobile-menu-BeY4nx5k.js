import{j as e}from"./index-Dg0DyNZX.js";function c(i){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:s,Do:o,DoDont:r,Dont:t,Preview:a,PropTable:d}=n;return s||l("Callout"),o||l("Do"),r||l("DoDont"),t||l("Dont"),a||l("Preview"),d||l("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Mobile navigation list inside a drawer."}),`
`,e.jsx(a,{html:'<nav style="max-width:300px;border:1px solid var(--color-border-default);border-radius:8px;padding:16px;"><a class="mobile-nav__link" href="#" style="display:block;padding:8px 0;">Shop</a><a class="mobile-nav__link" href="#" style="display:block;padding:8px 0;">Artists</a><a class="mobile-nav__link" href="#" style="display:block;padding:8px 0;">About</a><a class="mobile-nav__link" href="#" style="display:block;padding:8px 0;">Contact</a></nav>',label:"Mobile Menu"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(o,{children:"Keep global chrome consistent across all pages — header and footer should be in the layout template."}),e.jsx(t,{children:"Don't duplicate global elements inside individual sections or pages."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(n.p,{children:"Global components are typically included in your theme layout, not in individual pages."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"<nav>"})," with ",e.jsx(n.code,{children:"aria-label"})," to identify the navigation region."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/drawer",children:"Drawer"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".mobile-nav"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base mobile menu styles"})]})})]})}function p(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(c,{...i})}):c(i)}function l(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
