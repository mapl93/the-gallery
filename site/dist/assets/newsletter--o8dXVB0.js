import{j as e}from"./index-Dg0DyNZX.js";function p(t){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:i,Do:o,DoDont:r,Dont:l,Preview:c,PropTable:d}=n;return i||s("Callout"),o||s("Do"),r||s("DoDont"),l||s("Dont"),c||s("Preview"),d||s("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Email capture section with form."}),`
`,e.jsx(c,{html:'<div class="newsletter" style="max-width:480px;"><h3 class="newsletter__title">Stay in the loop</h3><p class="newsletter__description">New collections, artist stories, and studio access.</p><form style="display:flex;gap:8px;"><input class="input__field" type="email" placeholder="your@email.com" style="flex:1;" /><button class="btn">Subscribe</button></form></div>',label:"Newsletter Signup"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(o,{children:"A/B test marketing components (hero copy, CTA placement, popup timing) to optimize conversion."}),e.jsx(l,{children:"Don't show too many marketing elements at once — popups + banners + badges = fatigue."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"info",children:e.jsx(n.p,{children:"Marketing components often need JavaScript for interactions (countdown timers, popup triggers, etc.)."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/input",children:"Input"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".newsletter"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base newsletter signup styles"})]})})]})}function h(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(p,{...t})}):p(t)}function s(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
