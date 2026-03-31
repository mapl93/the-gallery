import{j as e}from"./index-Dg0DyNZX.js";function d(n){const s={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:t,Do:r,DoDont:o,Dont:l,Preview:c,PropTable:a}=s;return t||i("Callout"),r||i("Do"),o||i("DoDont"),l||i("Dont"),c||i("Preview"),a||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Workshop/class cards with date, level, price, and spot availability."}),`
`,e.jsx(c,{html:'<div class="workshop-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:500px;"><div class="card" style="padding:16px;"><h4>Intro to Wheel Throwing</h4><p style="font-size:14px;">Sat, April 5 · 2PM</p><span class="badge badge--success">Spots Available</span></div><div class="card" style="padding:16px;"><h4>Glaze Workshop</h4><p style="font-size:14px;">Sat, April 12 · 2PM</p><span class="badge badge--warning">Almost Full</span></div></div>',label:"Workshop Listing"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(r,{children:"Use these specialty components to tell the artisan story behind your products."}),e.jsx(l,{children:"Don't use generic product descriptions — ceramics customers value process, materials, and provenance."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"tip",children:e.jsx(s.p,{children:"Ceramics components are designed specifically for artisan e-commerce. They showcase craft and materials."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(s.h2,{children:"Dependencies"}),`
`,e.jsx(s.p,{children:"This component uses:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".workshop-grid"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base workshop listing styles"})]})})]})}function h(n={}){const{wrapper:s}=n.components||{};return s?e.jsx(s,{...n,children:e.jsx(d,{...n})}):d(n)}function i(n,s){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
