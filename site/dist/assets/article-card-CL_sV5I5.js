import{j as e}from"./index-Dg0DyNZX.js";function h(r){const a={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...r.components},{Callout:l,Do:c,DoDont:d,Dont:s,Preview:i,PropTable:n}=a;return l||t("Callout"),c||t("Do"),d||t("DoDont"),s||t("Dont"),i||t("Preview"),n||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(a.h2,{children:"Overview"}),`
`,e.jsx(a.p,{children:"Blog post card with 5 variants: standard, featured, minimal, horizontal, editorial."}),`
`,e.jsx(i,{html:'<article class="article-card" style="max-width:320px;"><a class="article-card__media" href="#"><img src="https://placehold.co/400x240/f5f0eb/1a1a1a?text=Article" alt="" /></a><div class="article-card__body"><span class="article-card__category">Studio Life</span><h3 class="article-card__title"><a href="#">Behind the Kiln</a></h3><p class="article-card__excerpt">An inside look at the ceramic process.</p></div></article>',label:"Article Card"}),`
`,e.jsx(a.h2,{children:"Variants"}),`
`,e.jsx(a.h3,{children:"Standard"}),`
`,e.jsx(i,{html:'<article class="article-card" style="max-width:280px;"><a class="article-card__media" href="#"><img src="https://placehold.co/280x170/f5f0eb/1a1a1a?text=Standard" alt="" /></a><div class="article-card__body"><h3 class="article-card__title"><a href="#">Standard Card</a></h3></div></article>',label:"Standard"}),`
`,e.jsx(a.h3,{children:"Featured"}),`
`,e.jsx(i,{html:'<article class="article-card article-card--featured" style="max-width:480px;"><a class="article-card__media" href="#"><img src="https://placehold.co/480x280/f5f0eb/1a1a1a?text=Featured" alt="" /></a><div class="article-card__body"><h3 class="article-card__title"><a href="#">Featured Card</a></h3></div></article>',label:"Featured"}),`
`,e.jsx(a.h3,{children:"Minimal"}),`
`,e.jsx(i,{html:'<article class="article-card article-card--minimal" style="max-width:280px;"><div class="article-card__body"><h3 class="article-card__title"><a href="#">Minimal Card</a></h3><p class="article-card__excerpt">No image variant.</p></div></article>',label:"Minimal"}),`
`,e.jsx(a.h3,{children:"Horizontal"}),`
`,e.jsx(i,{html:'<article class="article-card article-card--horizontal" style="max-width:480px;"><a class="article-card__media" href="#"><img src="https://placehold.co/160x120/f5f0eb/1a1a1a?text=H" alt="" /></a><div class="article-card__body"><h3 class="article-card__title"><a href="#">Horizontal</a></h3></div></article>',label:"Horizontal"}),`
`,e.jsx(a.h3,{children:"Editorial"}),`
`,e.jsx(i,{html:'<article class="article-card article-card--editorial" style="max-width:320px;"><div class="article-card__body"><h3 class="article-card__title"><a href="#">Editorial Style</a></h3></div></article>',label:"Editorial"}),`
`,e.jsx(a.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(d,{children:[e.jsx(c,{children:"Use the article body/prose component for rich text — it handles typography, images, and spacing."}),e.jsx(s,{children:"Don't manually style article content with inline styles — let the prose class handle it."})]}),`
`,e.jsx(a.h2,{children:"Accessibility"}),`
`,e.jsx(l,{type:"info",children:e.jsx(a.p,{children:"Blog components support Shopify's article template system. Use metafields for custom article data."})}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:["All images must have descriptive ",e.jsx(a.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(a.h2,{children:"Dependencies"}),`
`,e.jsx(a.p,{children:"This component uses:"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsx(a.li,{children:e.jsx(a.a,{href:"/components/badge",children:"Badge"})}),`
`]}),`
`,e.jsx(a.h2,{children:"API Reference"}),`
`,e.jsxs(n,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(a.code,{children:".article-card"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base article card styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(a.code,{children:".article-card--standard"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Standard variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(a.code,{children:".article-card--featured"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Featured variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(a.code,{children:".article-card--minimal"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Minimal variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(a.code,{children:".article-card--horizontal"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Horizontal variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(a.code,{children:".article-card--editorial"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Editorial variant"})]})]})]})}function x(r={}){const{wrapper:a}=r.components||{};return a?e.jsx(a,{...r,children:e.jsx(h,{...r})}):h(r)}function t(r,a){throw new Error("Expected component `"+r+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
