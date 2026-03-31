import{j as n}from"./index-Dg0DyNZX.js";function c(t){const e={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...t.components},{Callout:s,Do:d,DoDont:l,Dont:r,Preview:i,PropTable:a}=e;return s||o("Callout"),d||o("Do"),l||o("DoDont"),r||o("Dont"),i||o("Preview"),a||o("PropTable"),n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"Overview"}),`
`,n.jsx(e.p,{children:"Action menu with items, separators, labels, and keyboard shortcuts."}),`
`,n.jsx(i,{html:'<div class="dropdown dropdown--open" style="position:relative;display:inline-block;"><button class="btn btn--outline">Menu ▾</button><div class="dropdown__menu" style="position:relative;margin-top:4px;"><button class="dropdown__item">Edit</button><button class="dropdown__item">Duplicate</button><div class="dropdown__separator"></div><button class="dropdown__item">Delete</button></div></div>',label:"Dropdown Menu",interaction:{selector:".dropdown",toggle:"dropdown--open",triggerLabel:"Open Menu",startVisible:!0}}),`
`,n.jsx(e.h2,{children:"Variants"}),`
`,n.jsx(e.h3,{children:"Default"}),`
`,n.jsx(i,{html:'<div class="dropdown dropdown--open" style="position:relative;display:inline-block;"><button class="btn btn--outline">Actions</button><div class="dropdown__menu" style="position:relative;"><button class="dropdown__item">Edit</button><button class="dropdown__item">Share</button></div></div>',label:"Default"}),`
`,n.jsx(e.h3,{children:"Danger"}),`
`,n.jsx(i,{html:'<div class="dropdown dropdown--open" style="position:relative;display:inline-block;"><button class="btn btn--outline">Actions</button><div class="dropdown__menu" style="position:relative;"><button class="dropdown__item dropdown__item--danger">Delete</button></div></div>',label:"Danger"}),`
`,n.jsx(e.h2,{children:"Usage Guidelines"}),`
`,n.jsxs(l,{children:[n.jsx(d,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),n.jsx(r,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,n.jsx(e.h2,{children:"Accessibility"}),`
`,n.jsx(s,{type:"warning",children:n.jsx(e.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Close on ",n.jsx(e.code,{children:"Escape"})," key press."]}),`
`,n.jsxs(e.li,{children:["Use ",n.jsx(e.code,{children:"<nav>"})," with ",n.jsx(e.code,{children:"aria-label"})," to identify the navigation region."]}),`
`]}),`
`,n.jsx(e.h2,{children:"API Reference"}),`
`,n.jsxs(a,{children:[n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".dropdown-menu"})}),n.jsx("td",{children:"class"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Base dropdown menu styles"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".dropdown-menu--danger"})}),n.jsx("td",{children:"modifier"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Danger variant"})]})]})]})}function h(t={}){const{wrapper:e}=t.components||{};return e?n.jsx(e,{...t,children:n.jsx(c,{...t})}):c(t)}function o(t,e){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
