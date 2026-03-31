import{j as s}from"./index-Dg0DyNZX.js";function d(t){const e={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...t.components},{Callout:o,Do:r,DoDont:l,Dont:a,Preview:i,PropTable:c}=e;return o||n("Callout"),r||n("Do"),l||n("DoDont"),a||n("Dont"),i||n("Preview"),c||n("PropTable"),s.jsxs(s.Fragment,{children:[s.jsx(e.h2,{children:"Overview"}),`
`,s.jsx(e.p,{children:"Notification toast. 4 feedback variants."}),`
`,s.jsx(i,{html:'<div class="toast is-visible" role="alert" style="position:relative;"><span class="toast__icon">✓</span><div class="toast__content"><p class="toast__title">Saved</p><p class="toast__message">Your changes have been saved.</p></div><button class="toast__close" aria-label="Dismiss">&times;</button></div>',label:"Toast",interaction:{selector:".toast",toggle:"is-visible",triggerLabel:"Show Toast",startVisible:!1}}),`
`,s.jsx(e.h2,{children:"Variants"}),`
`,s.jsx(e.h3,{children:"Info"}),`
`,s.jsx(i,{html:'<div class="toast toast--info is-visible" role="alert" style="position:relative;"><div class="toast__content"><p class="toast__message">Info toast.</p></div></div>',label:"Info"}),`
`,s.jsx(e.h3,{children:"Success"}),`
`,s.jsx(i,{html:'<div class="toast toast--success is-visible" role="alert" style="position:relative;"><div class="toast__content"><p class="toast__message">Success toast.</p></div></div>',label:"Success"}),`
`,s.jsx(e.h3,{children:"Error"}),`
`,s.jsx(i,{html:'<div class="toast toast--error is-visible" role="alert" style="position:relative;"><div class="toast__content"><p class="toast__message">Error toast.</p></div></div>',label:"Error"}),`
`,s.jsx(e.h3,{children:"Warning"}),`
`,s.jsx(i,{html:'<div class="toast toast--warning is-visible" role="alert" style="position:relative;"><div class="toast__content"><p class="toast__message">Warning toast.</p></div></div>',label:"Warning"}),`
`,s.jsx(e.h2,{children:"Usage Guidelines"}),`
`,s.jsxs(l,{children:[s.jsx(r,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),s.jsx(a,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,s.jsx(e.h2,{children:"Accessibility"}),`
`,s.jsx(o,{type:"warning",children:s.jsx(e.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,s.jsxs(e.ul,{children:[`
`,s.jsxs(e.li,{children:["Use ",s.jsx(e.code,{children:'role="alert"'})," or ",s.jsx(e.code,{children:'aria-live="assertive"'})," for important notifications."]}),`
`]}),`
`,s.jsx(e.h2,{children:"API Reference"}),`
`,s.jsxs(c,{children:[s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx(e.code,{children:".toast"})}),s.jsx("td",{children:"class"}),s.jsx("td",{children:"—"}),s.jsx("td",{children:"Base toast styles"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx(e.code,{children:".toast--info"})}),s.jsx("td",{children:"modifier"}),s.jsx("td",{children:"—"}),s.jsx("td",{children:"Info variant"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx(e.code,{children:".toast--success"})}),s.jsx("td",{children:"modifier"}),s.jsx("td",{children:"—"}),s.jsx("td",{children:"Success variant"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx(e.code,{children:".toast--error"})}),s.jsx("td",{children:"modifier"}),s.jsx("td",{children:"—"}),s.jsx("td",{children:"Error variant"})]}),s.jsxs("tr",{children:[s.jsx("td",{children:s.jsx(e.code,{children:".toast--warning"})}),s.jsx("td",{children:"modifier"}),s.jsx("td",{children:"—"}),s.jsx("td",{children:"Warning variant"})]})]})]})}function x(t={}){const{wrapper:e}=t.components||{};return e?s.jsx(e,{...t,children:s.jsx(d,{...t})}):d(t)}function n(t,e){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
