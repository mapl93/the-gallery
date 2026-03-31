import{j as e}from"./index-Dg0DyNZX.js";function a(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:t,Do:l,DoDont:s,Dont:c,Preview:r,PropTable:d}=n;return t||i("Callout"),l||i("Do"),s||i("DoDont"),c||i("Dont"),r||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Full-width collection header with optional background image."}),`
`,e.jsx(r,{html:'<div class="collection-hero" style="padding:32px;"><h1 class="collection-hero__title">Artisan Ceramics</h1><p class="collection-hero__description">Handcrafted pieces from independent studios around the world.</p><span class="collection-hero__count">42 products</span></div>',label:"Collection Hero"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(s,{children:[e.jsx(l,{children:"Use the collection grid with product cards for consistent spacing and responsive behavior."}),e.jsx(c,{children:"Don't mix collection grid with manual floats or absolute positioning."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"info",children:e.jsx(n.p,{children:"Collection components handle responsive breakpoints automatically via CSS Grid."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["All images must have descriptive ",e.jsx(n.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".collection-hero"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base collection hero styles"})]})})]})}function p(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(a,{...o})}):a(o)}function i(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
