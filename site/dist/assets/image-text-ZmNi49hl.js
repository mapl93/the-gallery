import{j as e}from"./index-Dg0DyNZX.js";function a(i){const t={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:s,Do:r,DoDont:d,Dont:c,Preview:l,PropTable:o}=t;return s||n("Callout"),r||n("Do"),d||n("DoDont"),c||n("Dont"),l||n("Preview"),o||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Split image + text section. Reversed, stacked, overlay, and offset variants."}),`
`,e.jsx(l,{html:`<div class="image-text" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:700px;"><div class="image-text__media"><img src="https://placehold.co/350x250/f5f0eb/1a1a1a?text=Image" alt="" style="width:100%;border-radius:8px;" /></div><div class="image-text__content"><span class="image-text__eyebrow">Our Story</span><h2 class="image-text__title">Crafted with Purpose</h2><p class="image-text__body">Every piece is made with intention, connecting the maker's hand to the everyday.</p><a class="image-text__cta btn" href="#">Learn More</a></div></div>`,label:"Image with Text"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(d,{children:[e.jsx(r,{children:"Use section components for page builder blocks — they're designed to be reorderable in Shopify's theme editor."}),e.jsx(c,{children:"Don't hard-code section content — use Shopify schema settings for customizability."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(t.p,{children:"Sections map to Shopify's section architecture. Each one can have its own schema settings."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["All images must have descriptive ",e.jsx(t.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(t.h2,{children:"Dependencies"}),`
`,e.jsx(t.p,{children:"This component uses:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsxs(o,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".image-text"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base image with text styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".image-text--reversed"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Reversed variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".image-text--stacked"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Stacked variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".image-text--overlay"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Overlay variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".image-text--offset"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Offset variant"})]})]})]})}function x(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(a,{...i})}):a(i)}function n(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
