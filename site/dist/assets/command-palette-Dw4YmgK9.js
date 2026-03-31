import{j as e}from"./index-Dg0DyNZX.js";function a(t){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:i,Do:o,DoDont:l,Dont:c,Preview:r,PropTable:d}=n;return i||s("Callout"),o||s("Do"),l||s("DoDont"),c||s("Dont"),r||s("Preview"),d||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"⌘K command palette with search input and grouped results."}),`
`,e.jsx(r,{html:'<div class="command-palette command-palette--open" style="position:relative;max-width:480px;"><input class="cmd-palette__input" type="text" placeholder="Type a command…" /><div class="cmd-palette__results"><button class="cmd-palette__item">Go to Products</button><button class="cmd-palette__item">Go to Orders</button></div></div>',label:"Command Palette",interaction:{selector:".command-palette",toggle:"command-palette--open",triggerLabel:"Open Palette",startVisible:!0}}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(o,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(c,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"warning",children:e.jsx(n.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Trap focus inside the overlay while open. Return focus to the trigger on close."}),`
`,e.jsxs(n.li,{children:["Close on ",e.jsx(n.code,{children:"Escape"})," key press."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/modal",children:"Modal"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".cmd-palette"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base command palette styles"})]})})]})}function h(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}function s(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
