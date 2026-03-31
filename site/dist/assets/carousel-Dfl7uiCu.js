import{j as e}from"./index-Dg0DyNZX.js";function a(s){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:t,Do:o,DoDont:l,Dont:r,Preview:d,PropTable:c}=n;return t||i("Callout"),o||i("Do"),l||i("DoDont"),r||i("Dont"),d||i("Preview"),c||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Horizontal scroll carousel with snap, nav buttons, and dots."}),`
`,e.jsx(d,{html:'<div class="carousel" style="max-width:400px;overflow:hidden;"><div class="carousel__track" style="display:flex;gap:16px;"><div class="carousel__slide" style="min-width:100%;"><img src="https://placehold.co/400x250/f5f0eb/1a1a1a?text=Slide+1" alt="Slide 1" style="width:100%;border-radius:8px;" /></div></div></div>',label:"Carousel / Slider"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(o,{children:"Use semantic HTML (section, nav, aside) alongside the layout classes."}),e.jsx(r,{children:"Don't nest layout overlays (modal inside drawer, etc.) — it creates confusing z-index stacking."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"warning",children:e.jsx(n.p,{children:"Layout components handle z-index and focus trapping. Test keyboard navigation before shipping."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".carousel"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base carousel / slider styles"})]})})]})}function x(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(a,{...s})}):a(s)}function i(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
