import{j as e}from"./index-Dg0DyNZX.js";function c(t){const s={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...t.components},{Callout:r,Do:o,DoDont:d,Dont:a,Preview:i,PropTable:l}=s;return r||n("Callout"),o||n("Do"),d||n("DoDont"),a||n("Dont"),i||n("Preview"),l||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Row of trust/guarantee badges with icons."}),`
`,e.jsx(i,{html:'<div class="trust-badges" style="display:flex;gap:16px;"><div class="trust-badge"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span>Secure Checkout</span></div><div class="trust-badge"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 12H4m8-8v16"/></svg><span>Free Shipping</span></div></div>',label:"Trust Badges"}),`
`,e.jsx(s.h2,{children:"Variants"}),`
`,e.jsx(s.h3,{children:"Default"}),`
`,e.jsx(i,{html:'<div class="trust-badges" style="display:flex;gap:16px;"><div class="trust-badge"><span>🔒 Secure</span></div><div class="trust-badge"><span>🚚 Free Shipping</span></div></div>',label:"Default"}),`
`,e.jsx(s.h3,{children:"Compact"}),`
`,e.jsx(i,{html:'<div class="trust-badges trust-badges--compact" style="display:flex;gap:8px;"><div class="trust-badge"><span>🔒</span></div><div class="trust-badge"><span>🚚</span></div></div>',label:"Compact"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(d,{children:[e.jsx(o,{children:"A/B test marketing components (hero copy, CTA placement, popup timing) to optimize conversion."}),e.jsx(a,{children:"Don't show too many marketing elements at once — popups + banners + badges = fatigue."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(r,{type:"info",children:e.jsx(s.p,{children:"Marketing components often need JavaScript for interactions (countdown timers, popup triggers, etc.)."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsxs(l,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".trust-badges"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base trust badges styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".trust-badges--compact"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Compact variant"})]})]})]})}function h(t={}){const{wrapper:s}=t.components||{};return s?e.jsx(s,{...t,children:e.jsx(c,{...t})}):c(t)}function n(t,s){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
