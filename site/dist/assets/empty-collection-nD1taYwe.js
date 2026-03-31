import{j as e}from"./index-Dg0DyNZX.js";function a(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:i,Do:l,DoDont:s,Dont:c,Preview:r,PropTable:d}=n;return i||t("Callout"),l||t("Do"),s||t("DoDont"),c||t("Dont"),r||t("Preview"),d||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Empty state with icon, message, and CTA for empty collections."}),`
`,e.jsx(r,{html:'<div class="empty-collection"><div class="empty-collection__icon">☐</div><h2 class="empty-collection__heading">No products found</h2><p class="empty-collection__text">Try adjusting your filters or browse our full catalog.</p><a class="empty-collection__cta" href="#">Browse All</a></div>',label:"Empty Collection State"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(s,{children:[e.jsx(l,{children:"Use the collection grid with product cards for consistent spacing and responsive behavior."}),e.jsx(c,{children:"Don't mix collection grid with manual floats or absolute positioning."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"info",children:e.jsx(n.p,{children:"Collection components handle responsive breakpoints automatically via CSS Grid."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".empty-collection"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base empty collection state styles"})]})})]})}function p(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(a,{...o})}):a(o)}function t(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
