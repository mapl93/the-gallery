import{j as e}from"./index-Dg0DyNZX.js";function d(s){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s.components},{Callout:i,Do:o,DoDont:r,Dont:l,Preview:a,PropTable:c}=n;return i||t("Callout"),o||t("Do"),r||t("DoDont"),l||t("Dont"),a||t("Preview"),c||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"Customer testimonial cards in a responsive grid."}),`
`,e.jsx(a,{html:'<div class="testimonials" style="max-width:600px;"><h2 class="testimonials__title">What our customers say</h2><div class="testimonials__grid" style="display:grid;gap:16px;"><div class="testimonial"><blockquote class="testimonial__quote">"The craftsmanship is exceptional. Each piece tells a story."</blockquote><div class="testimonial__author"><span class="testimonial__name">María García</span><span class="testimonial__detail">Collector</span></div></div></div></div>',label:"Testimonials"}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(o,{children:"A/B test marketing components (hero copy, CTA placement, popup timing) to optimize conversion."}),e.jsx(l,{children:"Don't show too many marketing elements at once — popups + banners + badges = fatigue."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"info",children:e.jsx(n.p,{children:"Marketing components often need JavaScript for interactions (countdown timers, popup triggers, etc.)."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/avatar",children:"Avatar"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(c,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".testimonials"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base testimonials styles"})]})})]})}function p(s={}){const{wrapper:n}=s.components||{};return n?e.jsx(n,{...s,children:e.jsx(d,{...s})}):d(s)}function t(s,n){throw new Error("Expected component `"+s+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
