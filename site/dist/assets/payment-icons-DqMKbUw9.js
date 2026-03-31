import{j as e}from"./index-Dg0DyNZX.js";function p(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:r,Do:s,DoDont:i,Dont:d,Preview:c,PropTable:l}=n;return r||t("Callout"),s||t("Do"),i||t("DoDont"),d||t("Dont"),c||t("Preview"),l||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Payment method icon row (Visa, MC, Apple Pay, etc.)."}),`
`,e.jsx(c,{html:'<div class="payment-icons" style="display:flex;gap:8px;"><span style="padding:4px 8px;border:1px solid var(--color-border-default);border-radius:4px;font-size:12px;">Visa</span><span style="padding:4px 8px;border:1px solid var(--color-border-default);border-radius:4px;font-size:12px;">MC</span><span style="padding:4px 8px;border:1px solid var(--color-border-default);border-radius:4px;font-size:12px;">Amex</span></div>',label:"Payment Icons"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(i,{children:[e.jsx(s,{children:"A/B test marketing components (hero copy, CTA placement, popup timing) to optimize conversion."}),e.jsx(d,{children:"Don't show too many marketing elements at once — popups + banners + badges = fatigue."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(r,{type:"info",children:e.jsx(n.p,{children:"Marketing components often need JavaScript for interactions (countdown timers, popup triggers, etc.)."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(l,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".payment-icons"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base payment icons styles"})]})})]})}function x(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(p,{...o})}):p(o)}function t(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
