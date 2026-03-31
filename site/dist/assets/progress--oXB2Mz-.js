import{j as e}from"./index-Dg0DyNZX.js";function a(r){const s={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...r.components},{Callout:t,Do:l,DoDont:d,Dont:c,Preview:n,PropTable:o}=s;return t||i("Callout"),l||i("Do"),d||i("DoDont"),c||i("Dont"),n||i("Preview"),o||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"Overview"}),`
`,e.jsx(s.p,{children:"Determinate and indeterminate progress indicators. Bar and circle variants."}),`
`,e.jsx(n,{html:'<div class="progress" style="max-width:400px;"><div class="progress__label">Loading… <span class="progress__value">65%</span></div><div class="progress__track"><div class="progress__bar" style="width:65%"></div></div></div>',label:"Progress Bar / Circle"}),`
`,e.jsx(s.h2,{children:"Variants"}),`
`,e.jsx(s.h3,{children:"Bar"}),`
`,e.jsx(n,{html:'<div class="progress" style="max-width:400px;"><div class="progress__label">Progress <span class="progress__value">65%</span></div><div class="progress__track"><div class="progress__bar" style="width:65%"></div></div></div>',label:"Bar"}),`
`,e.jsx(s.h3,{children:"Circle"}),`
`,e.jsx(n,{html:'<div class="progress-circle" style="width:80px;height:80px;"><svg viewBox="0 0 36 36"><circle class="progress-circle__bg" cx="18" cy="18" r="15.9" fill="none" stroke-width="3"/><circle class="progress-circle__fill" cx="18" cy="18" r="15.9" fill="none" stroke-width="3" stroke-dasharray="65 35"/></svg><span class="progress-circle__text">65%</span></div>',label:"Circle"}),`
`,e.jsx(s.h3,{children:"Indeterminate"}),`
`,e.jsx(n,{html:'<div class="progress progress--indeterminate" style="max-width:400px;"><div class="progress__track"><div class="progress__bar"></div></div></div>',label:"Indeterminate"}),`
`,e.jsx(s.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(d,{children:[e.jsx(l,{children:"Use this component consistently across your theme for a cohesive UI."}),e.jsx(c,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,e.jsx(s.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"info",children:e.jsx(s.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Use ",e.jsx(s.code,{children:'aria-live="polite"'})," or ",e.jsx(s.code,{children:'role="status"'})," so screen readers announce loading state."]}),`
`]}),`
`,e.jsx(s.h2,{children:"API Reference"}),`
`,e.jsxs(o,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".progress"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base progress bar / circle styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".progress--bar"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Bar variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".progress--circle"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Circle variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(s.code,{children:".progress--indeterminate"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Indeterminate variant"})]})]})]})}function x(r={}){const{wrapper:s}=r.components||{};return s?e.jsx(s,{...r,children:e.jsx(a,{...r})}):a(r)}function i(r,s){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
