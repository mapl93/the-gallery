import{j as n}from"./index-Dg0DyNZX.js";function d(s){const e={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:i,Do:r,DoDont:a,Dont:o,Preview:l,PropTable:c}=e;return i||t("Callout"),r||t("Do"),a||t("DoDont"),o||t("Dont"),l||t("Preview"),c||t("PropTable"),n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"Overview"}),`
`,n.jsx(e.p,{children:"Star rating display with half-star support."}),`
`,n.jsx(l,{html:'<div class="rating"><div class="rating__stars"><span class="rating__star rating__star--filled">★</span><span class="rating__star rating__star--filled">★</span><span class="rating__star rating__star--filled">★</span><span class="rating__star rating__star--filled">★</span><span class="rating__star">★</span></div><span class="rating__count">(24)</span></div>',label:"Rating Stars"}),`
`,n.jsx(e.h2,{children:"Usage Guidelines"}),`
`,n.jsxs(a,{children:[n.jsx(r,{children:"Use this component consistently across your theme for a cohesive UI."}),n.jsx(o,{children:"Don't override the component's built-in states with custom CSS — use the provided variants instead."})]}),`
`,n.jsx(e.h2,{children:"Accessibility"}),`
`,n.jsx(i,{type:"info",children:n.jsx(e.p,{children:"Primitive components are building blocks. They're referenced by higher-level components throughout the system."})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:'Provide a text alternative for the rating value (e.g., "4 out of 5 stars").'}),`
`]}),`
`,n.jsx(e.h2,{children:"API Reference"}),`
`,n.jsx(c,{children:n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".rating"})}),n.jsx("td",{children:"class"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Base rating stars styles"})]})})]})}function p(s={}){const{wrapper:e}=s.components||{};return e?n.jsx(e,{...s,children:n.jsx(d,{...s})}):d(s)}function t(s,e){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
