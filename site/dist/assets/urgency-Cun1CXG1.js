import{j as e}from"./index-Dg0DyNZX.js";function h(i){const n={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...i.components},{Callout:t,Do:c,DoDont:o,Dont:d,Preview:s,PropTable:l}=n;return t||r("Callout"),c||r("Do"),o||r("DoDont"),d||r("Dont"),s||r("Preview"),l||r("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Low-stock, selling-fast, viewers count, and recent-sale indicators."}),`
`,e.jsx(s,{html:'<div class="urgency"><span class="urgency__text">🔥 Only 3 left in stock!</span></div>',label:"Urgency Indicators"}),`
`,e.jsx(n.h2,{children:"Variants"}),`
`,e.jsx(n.h3,{children:"Viewers"}),`
`,e.jsx(s,{html:'<div class="urgency urgency--viewers">👀 15 people are viewing this right now</div>',label:"Viewers"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(c,{children:"A/B test marketing components (hero copy, CTA placement, popup timing) to optimize conversion."}),e.jsx(d,{children:"Don't show too many marketing elements at once — popups + banners + badges = fatigue."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"info",children:e.jsx(n.p,{children:"Marketing components often need JavaScript for interactions (countdown timers, popup triggers, etc.)."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsxs(l,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".urgency"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base urgency indicators styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".urgency--low-stock"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Low stock variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".urgency--selling-fast"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Selling fast variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".urgency--viewers"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Viewers variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".urgency--recent-sale"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Recent sale variant"})]})]})]})}function a(i={}){const{wrapper:n}=i.components||{};return n?e.jsx(n,{...i,children:e.jsx(h,{...i})}):h(i)}function r(i,n){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as default};
