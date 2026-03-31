import{j as e}from"./index-Dg0DyNZX.js";function o(i){const l={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...i.components},{Callout:r,Do:d,DoDont:t,Dont:a,Preview:s,PropTable:c}=l;return r||n("Callout"),d||n("Do"),t||n("DoDont"),a||n("Dont"),s||n("Preview"),c||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(l.h2,{children:"Overview"}),`
`,e.jsx(l.p,{children:"Single and dual-handle range slider with value display."}),`
`,e.jsx(s,{html:'<div class="slider" style="max-width:320px;"><label class="slider__label">Volume</label><input type="range" class="slider__input" min="0" max="100" value="60" /><span class="slider__value">60</span></div>',label:"Slider / Range"}),`
`,e.jsx(l.h2,{children:"Variants"}),`
`,e.jsx(l.h3,{children:"Single"}),`
`,e.jsx(s,{html:'<div class="slider" style="max-width:320px;"><label class="slider__label">Single</label><input type="range" class="slider__input" min="0" max="100" value="50" /></div>',label:"Single"}),`
`,e.jsx(l.h3,{children:"Range"}),`
`,e.jsx(s,{html:'<div class="range-slider" style="max-width:320px;"><label>Price Range</label><div class="range-slider__track"><div class="range-slider__fill" style="left:20%;width:60%;"></div></div><input class="range-slider__input" type="range" min="0" max="500" value="100" /><input class="range-slider__input" type="range" min="0" max="500" value="400" /></div>',label:"Range"}),`
`,e.jsx(l.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(t,{children:[e.jsx(d,{children:"Always pair form inputs with visible labels for accessibility."}),e.jsx(a,{children:"Don't rely on placeholder text as the only label — it disappears on input."})]}),`
`,e.jsx(l.h2,{children:"Accessibility"}),`
`,e.jsx(r,{type:"tip",children:e.jsxs(l.p,{children:["Use the ",e.jsx(l.code,{children:"field-wrapper"})," component to ensure consistent spacing and label alignment across all form fields."]})}),`
`,e.jsxs(l.ul,{children:[`
`,e.jsxs(l.li,{children:["Associate every input with a ",e.jsx(l.code,{children:"<label>"})," using matching ",e.jsx(l.code,{children:"for"}),"/",e.jsx(l.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(l.h2,{children:"API Reference"}),`
`,e.jsxs(c,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(l.code,{children:".slider"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base slider / range styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(l.code,{children:".slider--single"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Single variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(l.code,{children:".slider--range"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Range variant"})]})]})]})}function x(i={}){const{wrapper:l}=i.components||{};return l?e.jsx(l,{...i,children:e.jsx(o,{...i})}):o(i)}function n(i,l){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
