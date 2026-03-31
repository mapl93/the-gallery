import{j as e}from"./index-Dg0DyNZX.js";function a(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:i,Do:r,DoDont:s,Dont:l,Preview:c,PropTable:d}=n;return i||t("Callout"),r||t("Do"),s||t("DoDont"),l||t("Dont"),c||t("Preview"),d||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Top-of-page promotional bar."}),`
`,e.jsx(c,{html:'<div class="announcement" style="position:relative;text-align:center;padding:8px;">Free shipping on orders over $150 ✦ Limited time offer</div>',label:"Announcement Bar"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(s,{children:[e.jsx(r,{children:"Keep global chrome consistent across all pages — header and footer should be in the layout template."}),e.jsx(l,{children:"Don't duplicate global elements inside individual sections or pages."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"info",children:e.jsx(n.p,{children:"Global components are typically included in your theme layout, not in individual pages."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".announcement"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base announcement bar styles"})]})})]})}function p(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(a,{...o})}):a(o)}function t(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
