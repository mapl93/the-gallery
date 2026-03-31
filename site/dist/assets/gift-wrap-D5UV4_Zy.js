import{j as e}from"./index-Dg0DyNZX.js";function a(i){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:t,Do:o,DoDont:s,Dont:c,Preview:l,PropTable:d}=n;return t||r("Callout"),o||r("Do"),s||r("DoDont"),c||r("Dont"),l||r("Preview"),d||r("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Gift wrap checkbox with optional message field."}),`
`,e.jsx(l,{html:'<div class="gift-wrap" style="max-width:400px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><label class="checkbox"><input class="checkbox__input" type="checkbox" /><span class="checkbox__label">Add gift wrapping (+$5.00)</span></label></div>',label:"Gift Wrap Option"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(s,{children:[e.jsx(o,{children:"Show real-time updates (totals, quantities) when the user modifies the cart."}),e.jsx(c,{children:"Don't require a page reload for cart changes — use AJAX for a smooth experience."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"tip",children:e.jsx(n.p,{children:"Cart components are designed for Shopify's AJAX Cart API. Wire up the JS interactions in your theme."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/checkbox",children:"Checkbox"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".gift-wrap"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base gift wrap option styles"})]})})]})}function x(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(a,{...i})}):a(i)}function r(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
