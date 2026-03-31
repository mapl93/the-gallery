import{j as n}from"./index-Dg0DyNZX.js";function a(t){const e={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t.components},{Callout:c,Do:r,DoDont:d,Dont:l,Preview:s,PropTable:o}=e;return c||i("Callout"),r||i("Do"),d||i("DoDont"),l||i("Dont"),s||i("Preview"),o||i("PropTable"),n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"Overview"}),`
`,n.jsx(e.p,{children:"The button is the foundation for all interactive actions in The Gallery. It comes in 5 variants × 3 sizes × 6 states, giving you full flexibility for any context."}),`
`,n.jsx(s,{html:'<button class="btn">Primary</button> <button class="btn btn--secondary">Secondary</button> <button class="btn btn--outline">Outline</button> <button class="btn btn--link">Link</button> <button class="btn btn--danger">Danger</button>',label:"All Variants"}),`
`,n.jsx(e.h2,{children:"Variants"}),`
`,n.jsx(e.h3,{children:"Primary"}),`
`,n.jsx(e.p,{children:'The default button. Use it for the main action on a page — "Add to Cart", "Checkout", "Submit".'}),`
`,n.jsx(s,{html:'<button class="btn">Primary Button</button>',label:"Primary"}),`
`,n.jsx(e.h3,{children:"Secondary"}),`
`,n.jsx(e.p,{children:"For supporting actions that sit alongside a primary button."}),`
`,n.jsx(s,{html:'<button class="btn btn--secondary">Secondary Button</button>',label:"Secondary"}),`
`,n.jsx(e.h3,{children:"Outline"}),`
`,n.jsx(e.p,{children:"Lower visual weight. Good for filter toggles, secondary navigation, or when many buttons appear together."}),`
`,n.jsx(s,{html:'<button class="btn btn--outline">Outline Button</button>',label:"Outline"}),`
`,n.jsx(e.h3,{children:"Link"}),`
`,n.jsxs(e.p,{children:["Renders as a text link with button semantics. Use sparingly — prefer actual ",n.jsx(e.code,{children:"<a>"})," elements for navigation."]}),`
`,n.jsx(s,{html:'<button class="btn btn--link">Link Button</button>',label:"Link"}),`
`,n.jsx(e.h3,{children:"Danger"}),`
`,n.jsx(e.p,{children:"For destructive actions: delete, remove, cancel order."}),`
`,n.jsx(s,{html:'<button class="btn btn--danger">Danger Button</button>',label:"Danger"}),`
`,n.jsx(e.h2,{children:"Sizes"}),`
`,n.jsx(s,{html:'<button class="btn btn--sm">Small</button> <button class="btn">Default</button> <button class="btn btn--lg">Large</button>',label:"Sizes"}),`
`,n.jsxs(e.table,{children:[n.jsx(e.thead,{children:n.jsxs(e.tr,{children:[n.jsx(e.th,{children:"Class"}),n.jsx(e.th,{children:"Use case"})]})}),n.jsxs(e.tbody,{children:[n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:".btn--sm"})}),n.jsx(e.td,{children:"Inline actions, table rows"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.em,{children:"(default)"})}),n.jsx(e.td,{children:"Most buttons"})]}),n.jsxs(e.tr,{children:[n.jsx(e.td,{children:n.jsx(e.code,{children:".btn--lg"})}),n.jsx(e.td,{children:"Hero CTAs, full-width mobile"})]})]})]}),`
`,n.jsx(e.h2,{children:"Usage Guidelines"}),`
`,n.jsxs(d,{children:[n.jsx(r,{children:"Use one primary button per section to establish a clear action hierarchy."}),n.jsx(l,{children:"Don't place multiple primary buttons side by side — demote one to secondary or outline."})]}),`
`,n.jsxs(d,{children:[n.jsx(r,{children:'Use the danger variant for destructive actions like "Delete" or "Remove".'}),n.jsx(l,{children:"Don't use danger for non-destructive actions — it creates unnecessary alarm."})]}),`
`,n.jsx(e.h2,{children:"Accessibility"}),`
`,n.jsx(c,{type:"tip",children:n.jsxs(e.p,{children:["Always provide visible text inside buttons. If using an icon-only button, add ",n.jsx(e.code,{children:"aria-label"})," for screen readers."]})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Buttons are focusable by default — don't override ",n.jsx(e.code,{children:"tabindex"})," unless necessary."]}),`
`,n.jsxs(e.li,{children:["Use ",n.jsx(e.code,{children:"<button>"})," for actions and ",n.jsx(e.code,{children:"<a>"})," for navigation. Never use ",n.jsx(e.code,{children:"<div>"})," with a click handler."]}),`
`,n.jsxs(e.li,{children:["Disabled buttons (",n.jsx(e.code,{children:"disabled"})," attribute) are excluded from the tab order automatically."]}),`
`]}),`
`,n.jsx(e.h2,{children:"API Reference"}),`
`,n.jsxs(o,{children:[n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".btn"})}),n.jsx("td",{children:"class"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Base button styles (primary by default)"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".btn--secondary"})}),n.jsx("td",{children:"modifier"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Secondary variant"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".btn--outline"})}),n.jsx("td",{children:"modifier"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Outline variant"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".btn--link"})}),n.jsx("td",{children:"modifier"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Link-style variant"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".btn--danger"})}),n.jsx("td",{children:"modifier"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Danger/destructive variant"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".btn--sm"})}),n.jsx("td",{children:"modifier"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Small size"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".btn--lg"})}),n.jsx("td",{children:"modifier"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Large size"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:"disabled"})}),n.jsx("td",{children:"attribute"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Disables the button (reduced opacity, no pointer events)"})]})]})]})}function x(t={}){const{wrapper:e}=t.components||{};return e?n.jsx(e,{...t,children:n.jsx(a,{...t})}):a(t)}function i(t,e){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
