import{j as e}from"./index-Dg0DyNZX.js";function d(n){const i={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:t,Do:s,DoDont:l,Dont:o,Preview:a,PropTable:c}=i;return t||r("Callout"),s||r("Do"),l||r("DoDont"),o||r("Dont"),a||r("Preview"),c||r("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(i.h2,{children:"Overview"}),`
`,e.jsx(i.p,{children:"Form with star input, text fields, and photo upload for writing reviews."}),`
`,e.jsx(a,{html:'<div class="review-form" style="max-width:480px;"><div class="review-form__group"><label class="review-form__label">Rating</label><div class="star-input"><label class="star-input__label"><input class="star-input__radio" type="radio" name="rf" value="5" checked /><span>★</span></label></div></div><div class="review-form__group"><label class="review-form__label">Your Review</label><textarea class="review-form__textarea" rows="3" placeholder="Share your experience…"></textarea></div><button class="btn">Submit Review</button></div>',label:"Write-a-Review Form"}),`
`,e.jsx(i.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(s,{children:"Display aggregate ratings prominently — social proof drives conversions."}),e.jsx(o,{children:"Don't hide negative reviews — authenticity builds trust."})]}),`
`,e.jsx(i.h2,{children:"Accessibility"}),`
`,e.jsx(t,{type:"info",children:e.jsx(i.p,{children:"Review components work with Shopify product metafields or third-party review apps."})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Associate every input with a ",e.jsx(i.code,{children:"<label>"})," using matching ",e.jsx(i.code,{children:"for"}),"/",e.jsx(i.code,{children:"id"})," attributes."]}),`
`]}),`
`,e.jsx(i.h2,{children:"Dependencies"}),`
`,e.jsx(i.p,{children:"This component uses:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/components/star-input",children:"Star Rating (Interactive)"})}),`
`]}),`
`,e.jsx(i.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(i.code,{children:".review-form"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base write-a-review form styles"})]})})]})}function p(n={}){const{wrapper:i}=n.components||{};return i?e.jsx(i,{...n,children:e.jsx(d,{...n})}):d(n)}function r(n,i){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
