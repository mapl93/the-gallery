import{j as e}from"./index-Dg0DyNZX.js";function d(i){const o={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i.components},{Callout:n,Do:s,DoDont:r,Dont:c,Preview:a,PropTable:l}=o;return n||t("Callout"),s||t("Do"),r||t("DoDont"),c||t("Dont"),a||t("Preview"),l||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(o.h2,{children:"Overview"}),`
`,e.jsx(o.p,{children:'"Someone just bought..." notification toast, bottom-left.'}),`
`,e.jsx(a,{html:'<div class="social-proof" data-visible style="position:relative;max-width:320px;display:flex;align-items:center;gap:12px;padding:12px;border-radius:8px;"><img class="social-proof__image" src="https://placehold.co/48x48/f5f0eb/1a1a1a?text=P" alt="" style="border-radius:4px;" /><div><p class="social-proof__text">Someone in Buenos Aires purchased <strong>Artisan Vase</strong></p><span class="social-proof__time">2 min ago</span></div><button class="social-proof__close">&times;</button></div>',label:"Social Proof Notifications",interaction:{selector:".social-proof",toggle:"attr:data-visible=",triggerLabel:"Show Notification",startVisible:!0}}),`
`,e.jsx(o.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(s,{children:"A/B test marketing components (hero copy, CTA placement, popup timing) to optimize conversion."}),e.jsx(c,{children:"Don't show too many marketing elements at once — popups + banners + badges = fatigue."})]}),`
`,e.jsx(o.h2,{children:"Accessibility"}),`
`,e.jsx(n,{type:"info",children:e.jsx(o.p,{children:"Marketing components often need JavaScript for interactions (countdown timers, popup triggers, etc.)."})}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Use ",e.jsx(o.code,{children:'role="alert"'})," or ",e.jsx(o.code,{children:'aria-live="assertive"'})," for important notifications."]}),`
`]}),`
`,e.jsx(o.h2,{children:"API Reference"}),`
`,e.jsx(l,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(o.code,{children:".social-proof"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base social proof notifications styles"})]})})]})}function x(i={}){const{wrapper:o}=i.components||{};return o?e.jsx(o,{...i,children:e.jsx(d,{...i})}):d(i)}function t(i,o){throw new Error("Expected component `"+i+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
