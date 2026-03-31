import{j as e}from"./index-Dg0DyNZX.js";function d(t){const s={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:o,Do:r,DoDont:c,Dont:i,Preview:l,PropTable:a}=s;return o||n("Callout"),r||n("Do"),c||n("DoDont"),i||n("Dont"),l||n("Preview"),a||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Step-by-step checkout progress bar with complete/current/upcoming states."}),`
`,e.jsx(l,{html:'<div class="checkout-progress" style="display:flex;align-items:center;gap:16px;"><div class="checkout-progress__step" data-status="complete"><div class="checkout-progress__indicator">✓</div><span class="checkout-progress__label">Cart</span></div><div class="checkout-progress__step" data-status="current"><div class="checkout-progress__indicator">2</div><span class="checkout-progress__label">Shipping</span></div><div class="checkout-progress__step"><div class="checkout-progress__indicator">3</div><span class="checkout-progress__label">Payment</span></div></div>',label:"Checkout Progress Indicator"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(c,{children:[e.jsx(r,{children:"Keep page templates simple and focused on their primary purpose."}),e.jsx(i,{children:"Don't add navigation-heavy sidebars to simple pages like 404 or policy pages."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(o,{type:"info",children:e.jsx(s.p,{children:"Page components map to Shopify template types. Each has a corresponding .json template file."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.code,{children:'aria-live="polite"'})," or ",e.jsx(s.code,{children:'role="status"'})," so screen readers announce loading state."]}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".checkout-progress"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base checkout progress indicator styles"})]})})]})}function h(t={}){const{wrapper:s}=t.components||{};return s?e.jsx(s,{...t,children:e.jsx(d,{...t})}):d(t)}function n(t,s){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
