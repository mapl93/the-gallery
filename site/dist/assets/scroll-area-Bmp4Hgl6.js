import{j as e}from"./index-Dg0DyNZX.js";function c(i){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:r,Do:t,DoDont:s,Dont:l,Preview:a,PropTable:d}=n;return r||o("Callout"),t||o("Do"),s||o("DoDont"),l||o("Dont"),a||o("Preview"),d||o("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Custom-styled scrollbar container."}),`
`,e.jsx(a,{html:'<div class="scroll-area" style="max-height:120px;overflow:auto;max-width:300px;border:1px solid var(--color-border-default);border-radius:8px;padding:12px;"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p></div>',label:"Scroll Area"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(s,{children:[e.jsx(t,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(l,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(r,{type:"warning",children:e.jsx(n.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".scroll-area"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base scroll area styles"})]})})]})}function u(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(c,{...i})}):c(i)}function o(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
