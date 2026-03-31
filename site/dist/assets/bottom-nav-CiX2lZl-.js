import{j as n}from"./index-Dg0DyNZX.js";function d(o){const e={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:a,Do:s,DoDont:i,Dont:l,Preview:r,PropTable:c}=e;return a||t("Callout"),s||t("Do"),i||t("DoDont"),l||t("Dont"),r||t("Preview"),c||t("PropTable"),n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"Overview"}),`
`,n.jsx(e.p,{children:"Fixed bottom navigation for mobile with badge support."}),`
`,n.jsx(r,{html:'<nav class="bottom-nav" style="position:relative;display:flex;justify-content:space-around;padding:8px 0;border-top:1px solid var(--color-border-default);"><a class="bottom-nav__item" href="#" aria-current="page"><span class="bottom-nav__icon">🏠</span><span class="bottom-nav__label">Home</span></a><a class="bottom-nav__item" href="#"><span class="bottom-nav__icon">🔍</span><span class="bottom-nav__label">Search</span></a><a class="bottom-nav__item" href="#"><span class="bottom-nav__icon">🛒</span><span class="bottom-nav__label">Cart</span><span class="bottom-nav__badge">2</span></a></nav>',label:"Bottom Navigation Bar"}),`
`,n.jsx(e.h2,{children:"Usage Guidelines"}),`
`,n.jsxs(i,{children:[n.jsx(s,{children:"Keep global chrome consistent across all pages — header and footer should be in the layout template."}),n.jsx(l,{children:"Don't duplicate global elements inside individual sections or pages."})]}),`
`,n.jsx(e.h2,{children:"Accessibility"}),`
`,n.jsx(a,{type:"info",children:n.jsx(e.p,{children:"Global components are typically included in your theme layout, not in individual pages."})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Use ",n.jsx(e.code,{children:"<nav>"})," with ",n.jsx(e.code,{children:"aria-label"})," to identify the navigation region."]}),`
`]}),`
`,n.jsx(e.h2,{children:"API Reference"}),`
`,n.jsx(c,{children:n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".bottom-nav"})}),n.jsx("td",{children:"class"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Base bottom navigation bar styles"})]})})]})}function h(o={}){const{wrapper:e}=o.components||{};return e?n.jsx(e,{...o,children:n.jsx(d,{...o})}):d(o)}function t(o,e){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
