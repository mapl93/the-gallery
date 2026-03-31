import{j as e}from"./index-Dg0DyNZX.js";function o(s){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:i,Do:a,DoDont:c,Dont:d,Preview:r,PropTable:l}=n;return i||t("Callout"),a||t("Do"),c||t("DoDont"),d||t("Dont"),r||t("Preview"),l||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Calendar-based date selection with month navigation."}),`
`,e.jsx(r,{html:'<div class="datepicker" style="max-width:300px;"><div class="datepicker__calendar"><div class="datepicker__header"><button class="datepicker__nav-btn">&lsaquo;</button><span class="datepicker__month-year">March 2026</span><button class="datepicker__nav-btn">&rsaquo;</button></div><div class="datepicker__weekdays"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div><div class="datepicker__grid"><button class="datepicker__day">28</button><button class="datepicker__day datepicker__day--today">29</button><button class="datepicker__day datepicker__day--selected">30</button><button class="datepicker__day">31</button></div></div></div>',label:"Date Picker"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(c,{children:[e.jsx(a,{children:"Always pair form inputs with visible labels for accessibility."}),e.jsx(d,{children:"Don't rely on placeholder text as the only label — it disappears on input."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"tip",children:e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"field-wrapper"})," component to ensure consistent spacing and label alignment across all form fields."]})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Associate every input with a ",e.jsx(n.code,{children:"<label>"})," using matching ",e.jsx(n.code,{children:"for"}),"/",e.jsx(n.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/input",children:"Input"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(l,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".date-picker"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base date picker styles"})]})})]})}function h(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}function t(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
