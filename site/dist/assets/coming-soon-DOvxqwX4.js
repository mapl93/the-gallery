import{j as e}from"./index-Dg0DyNZX.js";function d(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:s,Do:t,DoDont:r,Dont:l,Preview:c,PropTable:a}=n;return s||i("Callout"),t||i("Do"),r||i("DoDont"),l||i("Dont"),c||i("Preview"),a||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Split-screen editorial landing page with newsletter and password modal."}),`
`,e.jsx(c,{html:'<div class="coming-soon" style="position:relative;min-height:300px;display:flex;align-items:center;justify-content:center;background:#f5f0eb;border-radius:8px;"><div class="coming-soon__inner" style="text-align:center;"><h1 class="coming-soon__heading" style="font-size:1.75rem;">Coming Soon</h1><p class="coming-soon__subtitle">Something exciting is brewing in the studio.</p><form class="coming-soon__form" style="display:flex;gap:8px;margin-top:16px;"><input class="coming-soon__input" type="email" placeholder="your@email.com" /><button class="coming-soon__submit btn">Notify Me</button></form></div></div>',label:"Coming Soon / Password"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(t,{children:"Keep page templates simple and focused on their primary purpose."}),e.jsx(l,{children:"Don't add navigation-heavy sidebars to simple pages like 404 or policy pages."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(n.p,{children:"Page components map to Shopify template types. Each has a corresponding .json template file."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".coming-soon"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base coming soon / password styles"})]})})]})}function m(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(d,{...o})}):d(o)}function i(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
