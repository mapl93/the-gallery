import{j as e}from"./index-Dg0DyNZX.js";function d(t){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:i,Do:s,DoDont:r,Dont:l,Preview:c,PropTable:a}=n;return i||o("Callout"),s||o("Do"),r||o("DoDont"),l||o("Dont"),c||o("Preview"),a||o("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Hover tooltip using aria-label."}),`
`,e.jsx(c,{html:'<span class="tooltip"><button class="btn btn--outline">Hover me</button><span class="tooltip__content">Tooltip text</span></span>',label:"Tooltip"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(s,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(l,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"warning",children:e.jsx(n.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".tooltip"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base tooltip styles"})]})})]})}function h(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(d,{...t})}):d(t)}function o(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
