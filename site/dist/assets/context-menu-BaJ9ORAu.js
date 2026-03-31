import{j as e}from"./index-Dg0DyNZX.js";function a(t){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:i,Do:s,DoDont:r,Dont:c,Preview:d,PropTable:l}=n;return i||o("Callout"),s||o("Do"),r||o("DoDont"),c||o("Dont"),d||o("Preview"),l||o("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Right-click context menu. Shares dropdown-menu styles."}),`
`,e.jsx(d,{html:'<div class="context-menu context-menu--open" style="position:relative;display:inline-block;padding:12px;border-radius:8px;"><button class="dropdown__item">Copy</button><button class="dropdown__item">Paste</button><div class="dropdown__separator"></div><button class="dropdown__item">Inspect</button></div>',label:"Context Menu",interaction:{selector:".context-menu",toggle:"context-menu--open",triggerLabel:"Show Menu",startVisible:!0}}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(s,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(c,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"warning",children:e.jsx(n.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Close on ",e.jsx(n.code,{children:"Escape"})," key press."]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"<nav>"})," with ",e.jsx(n.code,{children:"aria-label"})," to identify the navigation region."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/dropdown-menu",children:"Dropdown Menu"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(l,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".context-menu"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base context menu styles"})]})})]})}function h(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}function o(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
