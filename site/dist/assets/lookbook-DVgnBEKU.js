import{j as o}from"./index-Dg0DyNZX.js";function a(s){const e={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:t,Do:n,DoDont:l,Dont:c,Preview:r,PropTable:d}=e;return t||i("Callout"),n||i("Do"),l||i("DoDont"),c||i("Dont"),r||i("Preview"),d||i("PropTable"),o.jsxs(o.Fragment,{children:[o.jsx(e.h2,{children:"Overview"}),`
`,o.jsx(e.p,{children:"Asymmetric image grid with hover captions and shoppable hotspots."}),`
`,o.jsx(r,{html:'<div class="lookbook"><div class="lookbook__header"><h2 class="lookbook__title">Lookbook</h2></div><div class="lookbook__grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><div class="lookbook__cell"><img src="https://placehold.co/300x200/f5f0eb/1a1a1a?text=Look+1" alt="" style="width:100%;" /><span class="lookbook__caption">Spring Collection</span></div><div class="lookbook__cell"><img src="https://placehold.co/300x200/f5f0eb/1a1a1a?text=Look+2" alt="" style="width:100%;" /><span class="lookbook__caption">Studio Series</span></div></div></div>',label:"Lookbook"}),`
`,o.jsx(e.h2,{children:"Usage Guidelines"}),`
`,o.jsxs(l,{children:[o.jsx(n,{children:"Use section components for page builder blocks — they're designed to be reorderable in Shopify's theme editor."}),o.jsx(c,{children:"Don't hard-code section content — use Shopify schema settings for customizability."})]}),`
`,o.jsx(e.h2,{children:"Accessibility"}),`
`,o.jsx(t,{type:"info",children:o.jsx(e.p,{children:"Sections map to Shopify's section architecture. Each one can have its own schema settings."})}),`
`,o.jsxs(e.ul,{children:[`
`,o.jsxs(e.li,{children:["All images must have descriptive ",o.jsx(e.code,{children:"alt"})," text."]}),`
`]}),`
`,o.jsx(e.h2,{children:"API Reference"}),`
`,o.jsx(d,{children:o.jsxs("tr",{children:[o.jsx("td",{children:o.jsx(e.code,{children:".lookbook"})}),o.jsx("td",{children:"class"}),o.jsx("td",{children:"—"}),o.jsx("td",{children:"Base lookbook styles"})]})})]})}function p(s={}){const{wrapper:e}=s.components||{};return e?o.jsx(e,{...s,children:o.jsx(a,{...s})}):a(s)}function i(s,e){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
