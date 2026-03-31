import{j as e}from"./index-Dg0DyNZX.js";function a(n){const o={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:t,Do:s,DoDont:l,Dont:r,Preview:c,PropTable:d}=o;return t||i("Callout"),s||i("Do"),l||i("DoDont"),r||i("Dont"),c||i("Preview"),d||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(o.h2,{children:"Overview"}),`
`,e.jsx(o.p,{children:"Searchable dropdown with filtered options and match highlighting."}),`
`,e.jsx(c,{html:'<div class="combobox combobox--open" style="max-width:320px;position:relative;"><input class="combobox__input" type="text" placeholder="Search…" value="Cer" /><div class="combobox__listbox" style="position:relative;"><div class="combobox__option" data-highlighted>Ceramic</div><div class="combobox__option">Celadon</div></div></div>',label:"Combobox / Autocomplete",interaction:{selector:".combobox",toggle:"combobox--open",triggerLabel:"Open Combobox",startVisible:!0}}),`
`,e.jsx(o.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(s,{children:"Always pair form inputs with visible labels for accessibility."}),e.jsx(r,{children:"Don't rely on placeholder text as the only label — it disappears on input."})]}),`
`,e.jsx(o.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"tip",children:e.jsxs(o.p,{children:["Use the ",e.jsx(o.code,{children:"field-wrapper"})," component to ensure consistent spacing and label alignment across all form fields."]})}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(o.h2,{children:"Dependencies"}),`
`,e.jsx(o.p,{children:"This component uses:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:e.jsx(o.a,{href:"/components/input",children:"Input"})}),`
`]}),`
`,e.jsx(o.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(o.code,{children:".combobox"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base combobox / autocomplete styles"})]})})]})}function x(n={}){const{wrapper:o}=n.components||{};return o?e.jsx(o,{...n,children:e.jsx(a,{...n})}):a(n)}function i(n,o){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
