import{j as e}from"./index-Dg0DyNZX.js";function o(i){const t={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:l,Do:s,DoDont:a,Dont:n,Preview:c,PropTable:d}=t;return l||r("Callout"),s||r("Do"),a||r("DoDont"),n||r("Dont"),c||r("Preview"),d||r("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Overview"}),`
`,e.jsx(t.p,{children:"Related/recommended article grid with next/prev navigation."}),`
`,e.jsx(c,{html:'<div class="related-articles" style="max-width:600px;"><h3>Related Articles</h3><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:12px;"><article class="article-card"><a class="article-card__media" href="#"><img src="https://placehold.co/280x170/f5f0eb/1a1a1a?text=R1" alt="" /></a><div class="article-card__body"><h4 class="article-card__title"><a href="#">Glaze Chemistry</a></h4></div></article><article class="article-card"><a class="article-card__media" href="#"><img src="https://placehold.co/280x170/f5f0eb/1a1a1a?text=R2" alt="" /></a><div class="article-card__body"><h4 class="article-card__title"><a href="#">Studio Tour</a></h4></div></article></div></div>',label:"Related Articles"}),`
`,e.jsx(t.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(a,{children:[e.jsx(s,{children:"Use the article body/prose component for rich text — it handles typography, images, and spacing."}),e.jsx(n,{children:"Don't manually style article content with inline styles — let the prose class handle it."})]}),`
`,e.jsx(t.h2,{children:"Accessibility"}),`
`,e.jsx(l,{type:"info",children:e.jsx(t.p,{children:"Blog components support Shopify's article template system. Use metafields for custom article data."})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(t.h2,{children:"Dependencies"}),`
`,e.jsx(t.p,{children:"This component uses:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"/components/article-card",children:"Article Card"})}),`
`]}),`
`,e.jsx(t.h2,{children:"API Reference"}),`
`,e.jsx(d,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(t.code,{children:".related-articles"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base related articles styles"})]})})]})}function x(i={}){const{wrapper:t}=i.components||{};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}function r(i,t){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
