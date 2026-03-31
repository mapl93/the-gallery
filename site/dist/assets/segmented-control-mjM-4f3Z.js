import{j as e}from"./index-Dg0DyNZX.js";function d(s){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:l,Do:i,DoDont:o,Dont:r,Preview:a,PropTable:c}=n;return l||t("Callout"),i||t("Do"),o||t("DoDont"),r||t("Dont"),a||t("Preview"),c||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Inline radio-like control with sliding indicator."}),`
`,e.jsx(a,{html:'<div class="segmented"><label class="segmented__item"><input class="segmented__input" type="radio" name="seg" checked /><span class="segmented__label">Day</span></label><label class="segmented__item"><input class="segmented__input" type="radio" name="seg" /><span class="segmented__label">Week</span></label><label class="segmented__item"><input class="segmented__input" type="radio" name="seg" /><span class="segmented__label">Month</span></label></div>',label:"Segmented Control"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(i,{children:"Always pair form inputs with visible labels for accessibility."}),e.jsx(r,{children:"Don't rely on placeholder text as the only label — it disappears on input."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(l,{type:"tip",children:e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"field-wrapper"})," component to ensure consistent spacing and label alignment across all form fields."]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".segmented"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base segmented control styles"})]})})]})}function h(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(d,{...s})}):d(s)}function t(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
