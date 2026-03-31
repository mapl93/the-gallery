import{j as e}from"./index-Dg0DyNZX.js";function l(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:s,Do:t,DoDont:c,Dont:r,Preview:d,PropTable:a}=n;return s||i("Callout"),t||i("Do"),c||i("DoDont"),r||i("Dont"),d||i("Preview"),a||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Collapsible content panels."}),`
`,e.jsx(d,{html:'<div class="accordion"><div class="accordion__item"><button class="accordion__trigger" aria-expanded="true"><span>Section One</span><svg class="accordion__icon" width="16" height="16" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button><div class="accordion__panel"><div class="accordion__content"><p>Content for section one.</p></div></div></div><div class="accordion__item"><button class="accordion__trigger" aria-expanded="false"><span>Section Two</span><svg class="accordion__icon" width="16" height="16" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button></div></div>',label:"Accordion"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(c,{children:[e.jsx(t,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(r,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"warning",children:e.jsx(n.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"aria-expanded"})," and ",e.jsx(n.code,{children:"aria-controls"})," to communicate state to screen readers."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".accordion"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base accordion styles"})]})})]})}function x(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(l,{...o})}):l(o)}function i(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
