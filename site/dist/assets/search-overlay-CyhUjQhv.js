import{j as e}from"./index-Dg0DyNZX.js";function d(r){const s={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...r.components},{Callout:l,Do:i,DoDont:o,Dont:t,Preview:a,PropTable:c}=s;return l||n("Callout"),i||n("Do"),o||n("DoDont"),t||n("Dont"),a||n("Preview"),c||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Full-screen search with results."}),`
`,e.jsx(a,{html:'<div class="search-overlay" style="position:relative;padding:24px;background:var(--color-surface-primary);border:1px solid var(--color-border-default);border-radius:8px;max-width:480px;"><div class="search-box"><input class="search-box__input" type="search" placeholder="Search products…" /></div><div class="search-results" style="margin-top:16px;"><a class="search-result" href="#" style="display:flex;gap:12px;align-items:center;padding:8px 0;"><img class="search-result__image" src="https://placehold.co/48x48/f5f0eb/1a1a1a?text=V" alt="" style="border-radius:4px;" /><span>Artisan Vase</span></a></div></div>',label:"Search Overlay"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(i,{children:"Keep global chrome consistent across all pages — header and footer should be in the layout template."}),e.jsx(t,{children:"Don't duplicate global elements inside individual sections or pages."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(l,{type:"info",children:e.jsx(s.p,{children:"Global components are typically included in your theme layout, not in individual pages."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Close on ",e.jsx(s.code,{children:"Escape"})," key press."]}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".search-overlay"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base search overlay styles"})]})})]})}function p(r={}){const{wrapper:s}=r.components||{};return s?e.jsx(s,{...r,children:e.jsx(d,{...r})}):d(r)}function n(r,s){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
