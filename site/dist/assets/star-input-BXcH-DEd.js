import{j as e}from"./index-Dg0DyNZX.js";function d(n){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:s,Do:a,DoDont:r,Dont:l,Preview:o,PropTable:c}=t;return s||i("Callout"),a||i("Do"),r||i("DoDont"),l||i("Dont"),o||i("Preview"),c||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Interactive star rating input for review forms with RTL trick."}),`
`,e.jsx(o,{html:'<div class="star-input"><label class="star-input__label"><input class="star-input__radio" type="radio" name="star" value="1" /><span>★</span></label><label class="star-input__label"><input class="star-input__radio" type="radio" name="star" value="2" /><span>★</span></label><label class="star-input__label"><input class="star-input__radio" type="radio" name="star" value="3" /><span>★</span></label><label class="star-input__label"><input class="star-input__radio" type="radio" name="star" value="4" checked /><span>★</span></label><label class="star-input__label"><input class="star-input__radio" type="radio" name="star" value="5" /><span>★</span></label></div>',label:"Star Rating (Interactive)"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(a,{children:"Display aggregate ratings prominently — social proof drives conversions."}),e.jsx(l,{children:"Don't hide negative reviews — authenticity builds trust."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(t.p,{children:"Review components work with Shopify product metafields or third-party review apps."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Associate every input with a ",e.jsx(t.code,{children:"<label>"})," using matching ",e.jsx(t.code,{children:"for"}),"/",e.jsx(t.code,{children:"id"})," attributes."]}),`
`,e.jsx(t.li,{children:'Provide a text alternative for the rating value (e.g., "4 out of 5 stars").'}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".star-input"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base star rating (interactive) styles"})]})})]})}function u(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(d,{...n})}):d(n)}function i(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
