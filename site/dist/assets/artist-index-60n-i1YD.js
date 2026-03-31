import{j as e}from"./index-Dg0DyNZX.js";function c(i){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:r,Do:s,DoDont:o,Dont:l,Preview:d,PropTable:a}=t;return r||n("Callout"),s||n("Do"),o||n("DoDont"),l||n("Dont"),d||n("Preview"),a||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Filterable grid of artist cards with portraits, medium, and location info."}),`
`,e.jsx(d,{html:'<div class="artist-index" style="max-width:600px;"><div class="artist-index__header"><h1 class="artist-index__heading">Our Artists</h1><p class="artist-index__intro">Meet the makers behind every piece.</p></div><div class="artist-index__filters" style="display:flex;gap:8px;margin:16px 0;"><button class="artist-index__filter-btn" aria-pressed="true">All</button><button class="artist-index__filter-btn">Ceramics</button><button class="artist-index__filter-btn">Textiles</button></div></div>',label:"Artist Index Grid"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(o,{children:[e.jsx(s,{children:"Use high-quality images and thoughtful copy — storytelling components are editorial by nature."}),e.jsx(l,{children:"Don't use storytelling blocks for product-heavy pages — they're designed for brand narrative."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(r,{type:"tip",children:e.jsx(t.p,{children:"These components are unique to The Gallery's editorial focus. They work best with curated content."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".artist-index"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base artist index grid styles"})]})})]})}function x(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(c,{...i})}):c(i)}function n(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
