import{j as e}from"./index-Dg0DyNZX.js";function c(r){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...r.components},{Callout:s,Do:t,DoDont:o,Dont:l,Preview:d,PropTable:a}=n;return s||i("Callout"),t||i("Do"),o||i("DoDont"),l||i("Dont"),d||i("Preview"),a||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Side panel overlay. Left or right."}),`
`,e.jsx(d,{html:'<div class="drawer-overlay is-open" style="position:relative;min-height:300px;background:rgba(0,0,0,0.2);"><div class="drawer is-open" style="position:absolute;right:0;top:0;bottom:0;width:320px;"><div class="drawer__header"><h2>Drawer</h2><button class="drawer__close">&times;</button></div><div class="drawer__body"><p>Drawer content here.</p></div><div class="drawer__footer"><button class="btn">Done</button></div></div></div>',label:"Drawer",interaction:{selector:".drawer-overlay, .drawer",toggle:"is-open",triggerLabel:"Open Drawer",startVisible:!0}}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(t,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(l,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"warning",children:e.jsx(n.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Trap focus inside the overlay while open. Return focus to the trigger on close."}),`
`,e.jsxs(n.li,{children:["Close on ",e.jsx(n.code,{children:"Escape"})," key press."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".drawer"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base drawer styles"})]})})]})}function p(r={}){const{wrapper:n}=r.components||{};return n?e.jsx(n,{...r,children:e.jsx(c,{...r})}):c(r)}function i(r,n){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
