import{j as e}from"./index-Dg0DyNZX.js";function a(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:t,Do:s,DoDont:r,Dont:l,Preview:c,PropTable:d}=n;return t||i("Callout"),s||i("Do"),r||i("DoDont"),l||i("Dont"),c||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Floating content panel with arrow, triggered on click."}),`
`,e.jsx(c,{html:'<div class="popover popover--open" style="position:relative;display:inline-block;"><button class="btn btn--outline">Trigger</button><div class="popover__content" style="position:relative;margin-top:8px;"><div class="popover__arrow"></div><p class="popover__title">Popover</p><p>Some additional content.</p></div></div>',label:"Popover",interaction:{selector:".popover",toggle:"popover--open",triggerLabel:"Toggle Popover",startVisible:!0}}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(s,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(l,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"warning",children:e.jsx(n.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Close on ",e.jsx(n.code,{children:"Escape"})," key press."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".popover"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base popover styles"})]})})]})}function h(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(a,{...o})}):a(o)}function i(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
