import{j as e}from"./index-Dg0DyNZX.js";function d(n){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n.components},{Callout:i,Do:r,DoDont:s,Dont:c,Preview:l,PropTable:a}=t;return i||o("Callout"),r||o("Do"),s||o("DoDont"),c||o("Dont"),l||o("Preview"),a||o("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Rich article content: drop cap, blockquotes, pull quotes, callouts, figures, code, product embeds."}),`
`,e.jsx(l,{html:'<div class="prose" style="max-width:600px;"><h2>The Art of Ceramics</h2><p>Each piece begins as a lump of clay, transformed through hours of careful work into a functional piece of art.</p><blockquote>"Clay remembers everything."<cite>— Traditional saying</cite></blockquote><h3>The Process</h3><p>From wedging to glazing, every step requires patience and precision.</p></div>',label:"Article Body / Prose"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(s,{children:[e.jsx(r,{children:"Use the article body/prose component for rich text — it handles typography, images, and spacing."}),e.jsx(c,{children:"Don't manually style article content with inline styles — let the prose class handle it."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"info",children:e.jsx(t.p,{children:"Blog components support Shopify's article template system. Use metafields for custom article data."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".article-body"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base article body / prose styles"})]})})]})}function p(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(d,{...n})}):d(n)}function o(n,t){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
