import{j as e}from"./index-Dg0DyNZX.js";function a(i){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:s,Do:r,DoDont:o,Dont:l,Preview:c,PropTable:d}=t;return s||n("Callout"),r||n("Do"),o||n("DoDont"),l||n("Dont"),c||n("Preview"),d||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Draggable image comparison slider with labeled overlays."}),`
`,e.jsx(c,{html:'<div class="before-after" style="max-width:500px;display:grid;grid-template-columns:1fr 1fr;gap:4px;"><div><img src="https://placehold.co/250x200/d4c5b0/1a1a1a?text=Before" alt="Before" style="width:100%;border-radius:8px 0 0 8px;" /><span style="display:block;text-align:center;font-size:13px;margin-top:4px;">Before</span></div><div><img src="https://placehold.co/250x200/f5f0eb/1a1a1a?text=After" alt="After" style="width:100%;border-radius:0 8px 8px 0;" /><span style="display:block;text-align:center;font-size:13px;margin-top:4px;">After</span></div></div>',label:"Before / After Image Slider"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(r,{children:"Use section components for page builder blocks — they're designed to be reorderable in Shopify's theme editor."}),e.jsx(l,{children:"Don't hard-code section content — use Shopify schema settings for customizability."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(t.p,{children:"Sections map to Shopify's section architecture. Each one can have its own schema settings."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["All images must have descriptive ",e.jsx(t.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".before-after"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base before / after image slider styles"})]})})]})}function p(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(a,{...i})}):a(i)}function n(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
