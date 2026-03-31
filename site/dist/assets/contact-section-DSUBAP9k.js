import{j as e}from"./index-Dg0DyNZX.js";function d(t){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...t.components},{Callout:s,Do:o,DoDont:l,Dont:r,Preview:c,PropTable:a}=n;return s||i("Callout"),o||i("Do"),l||i("DoDont"),r||i("Dont"),c||i("Preview"),a||i("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Two-column contact layout with info and form."}),`
`,e.jsx(c,{html:'<div class="contact-section" style="max-width:500px;display:grid;grid-template-columns:1fr 1fr;gap:24px;"><div><h3>Get in Touch</h3><p style="font-size:14px;">Buenos Aires, Argentina<br/>hello@thegallery.co</p></div><form><div class="field"><label class="field__label">Name</label><input class="input__field" type="text" /></div><div class="field" style="margin-top:8px;"><label class="field__label">Message</label><textarea class="textarea__field" rows="3"></textarea></div><button class="btn" style="margin-top:8px;">Send</button></form></div>',label:"Contact Form"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(l,{children:[e.jsx(o,{children:"Use section components for page builder blocks — they're designed to be reorderable in Shopify's theme editor."}),e.jsx(r,{children:"Don't hard-code section content — use Shopify schema settings for customizability."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(s,{type:"info",children:e.jsx(n.p,{children:"Sections map to Shopify's section architecture. Each one can have its own schema settings."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/input",children:"Input"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/textarea",children:"Textarea"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".contact-section"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base contact form styles"})]})})]})}function x(t={}){const{wrapper:n}=t.components||{};return n?e.jsx(n,{...t,children:e.jsx(d,{...t})}):d(t)}function i(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
