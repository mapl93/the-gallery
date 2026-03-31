import{j as e}from"./index-Dg0DyNZX.js";function a(n){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:s,Do:o,DoDont:l,Dont:c,Preview:r,PropTable:d}=i;return s||t("Callout"),o||t("Do"),l||t("DoDont"),c||t("Dont"),r||t("Preview"),d||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(i.h2,{children:"Overview"}),`
`,e.jsx(i.p,{children:"Vertical timeline with connected dots and active state."}),`
`,e.jsx(r,{html:'<div class="timeline"><div class="timeline__item timeline__item--active"><span class="timeline__date">2024</span><h4 class="timeline__title">Founded</h4><p class="timeline__content">Studio established in Buenos Aires.</p></div><div class="timeline__item"><span class="timeline__date">2025</span><h4 class="timeline__title">First Collection</h4><p class="timeline__content">Launched the artisan ceramic line.</p></div></div>',label:"Timeline"}),`
`,e.jsx(i.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(o,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(c,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(i.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(i.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(i.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(i.code,{children:".timeline"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base timeline styles"})]})})]})}function m(n={}){const{wrapper:i}=n.components||{};return i?e.jsx(i,{...n,children:e.jsx(a,{...n})}):a(n)}function t(n,i){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
