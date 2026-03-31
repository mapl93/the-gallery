import{j as e}from"./index-Dg0DyNZX.js";function d(o){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o.components},{Callout:i,Do:s,DoDont:r,Dont:c,Preview:l,PropTable:a}=n;return i||t("Callout"),s||t("Do"),r||t("DoDont"),c||t("Dont"),l||t("Preview"),a||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Overview"}),`
`,e.jsx(n.p,{children:"GDPR cookie consent banner with preferences modal."}),`
`,e.jsx(l,{html:'<div class="cookie-banner" data-visible style="position:relative;"><div class="cookie-banner__inner"><p class="cookie-banner__text">We use cookies for a better experience. <a href="#">Learn more</a></p><div class="cookie-banner__actions"><button class="btn">Accept</button><button class="btn btn--outline">Preferences</button></div></div></div>',label:"Cookie Consent",interaction:{selector:".cookie-banner",toggle:"attr:data-visible=",triggerLabel:"Show Banner",startVisible:!0}}),`
`,e.jsx(n.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(r,{children:[e.jsx(s,{children:"A/B test marketing components (hero copy, CTA placement, popup timing) to optimize conversion."}),e.jsx(c,{children:"Don't show too many marketing elements at once — popups + banners + badges = fatigue."})]}),`
`,e.jsx(n.h2,{children:"Accessibility"}),`
`,e.jsx(i,{type:"info",children:e.jsx(n.p,{children:"Marketing components often need JavaScript for interactions (countdown timers, popup triggers, etc.)."})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:'role="alert"'})," or ",e.jsx(n.code,{children:'aria-live="assertive"'})," for important notifications."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Dependencies"}),`
`,e.jsx(n.p,{children:"This component uses:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"/components/button",children:"Button"})}),`
`]}),`
`,e.jsx(n.h2,{children:"API Reference"}),`
`,e.jsx(a,{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(n.code,{children:".cookie-banner"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base cookie consent styles"})]})})]})}function p(o={}){const{wrapper:n}=o.components||{};return n?e.jsx(n,{...o,children:e.jsx(d,{...o})}):d(o)}function t(o,n){throw new Error("Expected component `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
