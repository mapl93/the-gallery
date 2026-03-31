import{j as e}from"./index-Dg0DyNZX.js";function d(i){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:s,Do:o,DoDont:l,Dont:r,Preview:c,PropTable:a}=n;return s||t("Callout"),o||t("Do"),l||t("DoDont"),r||t("Dont"),c||t("Preview"),a||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Full-screen image viewer with navigation and captions."}),`
`,e.jsx(c,{html:'<div class="lightbox lightbox--open" style="position:relative;min-height:200px;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;"><img src="https://placehold.co/400x300/f5f0eb/1a1a1a?text=Lightbox" alt="Lightbox" style="max-width:100%;" /><button class="lightbox__close" style="position:absolute;top:8px;right:8px;color:#fff;">&times;</button></div>',label:"Lightbox",interaction:{selector:".lightbox",toggle:"lightbox--open",triggerLabel:"Open Lightbox",startVisible:!0}}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(o,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(r,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"warning",children:e.jsx(n.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Trap focus inside the overlay while open. Return focus to the trigger on close."}),`
`,e.jsxs(n.li,{children:["Close on ",e.jsx(n.code,{children:"Escape"})," key press."]}),`
`,e.jsxs(n.li,{children:["All images must have descriptive ",e.jsx(n.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/modal",children:"Modal"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".lightbox"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base lightbox styles"})]})})]})}function x(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(d,{...i})}):d(i)}function t(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
