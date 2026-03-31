import{j as e}from"./index-Dg0DyNZX.js";function l(s){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:n,Do:r,DoDont:a,Dont:c,Preview:o,PropTable:d}=t;return n||i("Callout"),r||i("Do"),a||i("DoDont"),c||i("Dont"),o||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Individual artist card with portrait, name, medium, and piece count."}),`
`,e.jsx(o,{html:'<div class="artist-card" style="max-width:280px;"><div class="artist-card__portrait"><img src="https://placehold.co/280x350/f5f0eb/1a1a1a?text=Artist" alt="" style="width:100%;border-radius:8px;" /></div><h3 class="artist-card__name">María García</h3><span class="artist-card__medium">Ceramics</span><span class="artist-card__location">Buenos Aires</span><span class="artist-card__piece-count">42 pieces</span></div>',label:"Artist Card"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(a,{children:[e.jsx(r,{children:"Use high-quality images and thoughtful copy — storytelling components are editorial by nature."}),e.jsx(c,{children:"Don't use storytelling blocks for product-heavy pages — they're designed for brand narrative."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(n,{type:"tip",children:e.jsx(t.p,{children:"These components are unique to The Gallery's editorial focus. They work best with curated content."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["All images must have descriptive ",e.jsx(t.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".artist-card"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base artist card styles"})]})})]})}function p(s={}){const{wrapper:t}=s.components||{};return t?e.jsx(t,{...s,children:e.jsx(l,{...s})}):l(s)}function i(s,t){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
