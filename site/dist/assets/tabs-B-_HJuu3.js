import{j as e}from"./index-Dg0DyNZX.js";function d(t){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:i,Do:a,DoDont:o,Dont:l,Preview:r,PropTable:c}=n;return i||s("Callout"),a||s("Do"),o||s("DoDont"),l||s("Dont"),r||s("Preview"),c||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Tab navigation with panels."}),`
`,e.jsx(r,{html:'<div class="tabs"><div class="tabs__list" role="tablist"><button class="tabs__tab" role="tab" aria-selected="true">Tab 1</button><button class="tabs__tab" role="tab">Tab 2</button><button class="tabs__tab" role="tab">Tab 3</button></div><div class="tabs__panel" role="tabpanel"><p>Content for Tab 1.</p></div></div>',label:"Tabs"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(a,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(l,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"warning",children:e.jsx(n.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"aria-expanded"})," and ",e.jsx(n.code,{children:"aria-controls"})," to communicate state to screen readers."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".tabs"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base tabs styles"})]})})]})}function h(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(d,{...t})}):d(t)}function s(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
