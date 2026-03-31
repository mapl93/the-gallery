import{j as e}from"./index-Dg0DyNZX.js";function c(i){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:t,Do:l,DoDont:a,Dont:o,Preview:r,PropTable:d}=n;return t||s("Callout"),l||s("Do"),a||s("DoDont"),o||s("Dont"),r||s("Preview"),d||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Sticky site header with logo, navigation, and action buttons."}),`
`,e.jsx(r,{html:'<header class="header" style="position:relative;"><a class="header__logo" href="#">The Gallery</a><nav style="display:flex;gap:16px;"><a class="header__nav-link" href="#" aria-current="page">Shop</a><a class="header__nav-link" href="#">Artists</a><a class="header__nav-link" href="#">About</a></nav><div class="header__actions"><button class="header__cart-count">0</button></div></header>',label:"Header"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(a,{children:[e.jsx(l,{children:"Keep global chrome consistent across all pages — header and footer should be in the layout template."}),e.jsx(o,{children:"Don't duplicate global elements inside individual sections or pages."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"info",children:e.jsx(n.p,{children:"Global components are typically included in your theme layout, not in individual pages."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"<nav>"})," with ",e.jsx(n.code,{children:"aria-label"})," to identify the navigation region."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".header"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base header styles"})]})})]})}function x(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(c,{...i})}):c(i)}function s(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
