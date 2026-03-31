import{j as e}from"./index-Dg0DyNZX.js";function a(i){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:n,Do:s,DoDont:r,Dont:c,Preview:l,PropTable:d}=t;return n||o("Callout"),s||o("Do"),r||o("DoDont"),c||o("Dont"),l||o("Preview"),d||o("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Art-directed grid collage with featured item spanning 2×2."}),`
`,e.jsx(l,{html:'<div class="collage-section" style="display:grid;grid-template-columns:2fr 1fr;grid-template-rows:1fr 1fr;gap:8px;max-width:500px;"><div style="grid-row:span 2;"><img src="https://placehold.co/300x400/f5f0eb/1a1a1a?text=Main" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" /></div><div><img src="https://placehold.co/200x195/f5f0eb/1a1a1a?text=Top" alt="" style="width:100%;border-radius:8px;" /></div><div><img src="https://placehold.co/200x195/f5f0eb/1a1a1a?text=Bottom" alt="" style="width:100%;border-radius:8px;" /></div></div>',label:"Collage Section"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(s,{children:"Use section components for page builder blocks — they're designed to be reorderable in Shopify's theme editor."}),e.jsx(c,{children:"Don't hard-code section content — use Shopify schema settings for customizability."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(n,{type:"info",children:e.jsx(t.p,{children:"Sections map to Shopify's section architecture. Each one can have its own schema settings."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".collage-section"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base collage section styles"})]})})]})}function x(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(a,{...i})}):a(i)}function o(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
