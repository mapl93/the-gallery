import{j as n}from"./index-Dg0DyNZX.js";function a(t){const e={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...t.components},{Callout:o,Do:r,DoDont:d,Dont:c,Preview:s,PropTable:l}=e;return o||i("Callout"),r||i("Do"),d||i("DoDont"),c||i("Dont"),s||i("Preview"),l||i("PropTable"),n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{children:"Overview"}),`
`,n.jsx(e.p,{children:"Announcement bar extensions: countdown, rotating messages, dismissible."}),`
`,n.jsx(s,{html:'<div class="announcement-bar--countdown" style="padding:12px;text-align:center;background:var(--color-surface-secondary);">🎉 Sale ends in <strong>2d 14h 38m</strong> — Free shipping on all orders!</div>',label:"Announcement Bar (Extended)"}),`
`,n.jsx(e.h2,{children:"Variants"}),`
`,n.jsx(e.h3,{children:"Countdown"}),`
`,n.jsx(s,{html:'<div class="announcement-bar--countdown" style="padding:12px;text-align:center;">Sale ends in 2d 14h 38m!</div>',label:"Countdown"}),`
`,n.jsx(e.h3,{children:"Rotating"}),`
`,n.jsx(s,{html:'<div class="announcement-bar--rotating" style="padding:12px;text-align:center;"><div class="announcement-bar__slides"><div class="announcement-bar__slide">Free shipping over $150</div></div></div>',label:"Rotating"}),`
`,n.jsx(e.h3,{children:"Dismissible"}),`
`,n.jsx(s,{html:'<div class="announcement-bar--dismissible" style="padding:12px;text-align:center;position:relative;">Limited offer! <button class="announcement-bar__dismiss" style="position:absolute;right:12px;">&times;</button></div>',label:"Dismissible"}),`
`,n.jsx(e.h2,{children:"Usage Guidelines"}),`
`,n.jsxs(d,{children:[n.jsx(r,{children:"A/B test marketing components (hero copy, CTA placement, popup timing) to optimize conversion."}),n.jsx(c,{children:"Don't show too many marketing elements at once — popups + banners + badges = fatigue."})]}),`
`,n.jsx(e.h2,{children:"Accessibility"}),`
`,n.jsx(o,{type:"info",children:n.jsx(e.p,{children:"Marketing components often need JavaScript for interactions (countdown timers, popup triggers, etc.)."})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Ensure proper color contrast ratios (4.5:1 for text, 3:1 for large text) when customizing tokens."}),`
`]}),`
`,n.jsx(e.h2,{children:"Dependencies"}),`
`,n.jsx(e.p,{children:"This component uses:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"/components/announcement-bar",children:"Announcement Bar"})}),`
`]}),`
`,n.jsx(e.h2,{children:"API Reference"}),`
`,n.jsxs(l,{children:[n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".announcement-bar--countdown"})}),n.jsx("td",{children:"class"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Base announcement bar (extended) styles"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".announcement-bar--countdown--countdown"})}),n.jsx("td",{children:"modifier"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Countdown variant"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".announcement-bar--countdown--rotating"})}),n.jsx("td",{children:"modifier"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Rotating variant"})]}),n.jsxs("tr",{children:[n.jsx("td",{children:n.jsx(e.code,{children:".announcement-bar--countdown--dismissible"})}),n.jsx("td",{children:"modifier"}),n.jsx("td",{children:"—"}),n.jsx("td",{children:"Dismissible variant"})]})]})]})}function x(t={}){const{wrapper:e}=t.components||{};return e?n.jsx(e,{...t,children:n.jsx(a,{...t})}):a(t)}function i(t,e){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
