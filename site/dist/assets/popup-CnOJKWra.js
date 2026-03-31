import{j as e}from"./index-Dg0DyNZX.js";function a(t){const i={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...t.components},{Callout:l,Do:o,DoDont:p,Dont:r,Preview:s,PropTable:d}=i;return l||n("Callout"),o||n("Do"),p||n("DoDont"),r||n("Dont"),s||n("Preview"),d||n("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(i.h2,{children:"Overview"}),`
`,e.jsx(i.p,{children:"Marketing popup with image, content, and CTA. Split and slide variants."}),`
`,e.jsx(s,{html:'<div class="popup-overlay" data-open style="position:relative;min-height:200px;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div class="popup" style="position:relative;padding:24px;max-width:360px;"><button class="popup__close">&times;</button><h3 class="popup__title">10% Off Your First Order</h3><p class="popup__text">Sign up now and get a welcome discount.</p><form style="display:flex;gap:8px;"><input class="input__field" type="email" placeholder="Email" style="flex:1;" /><button class="btn">Get Offer</button></form></div></div>',label:"Popup / Overlay",interaction:{selector:".popup-overlay",toggle:"attr:data-open=",triggerLabel:"Show Popup",startVisible:!0}}),`
`,e.jsx(i.h2,{children:"Variants"}),`
`,e.jsx(i.h3,{children:"Default"}),`
`,e.jsx(s,{html:'<div class="popup" style="position:relative;padding:24px;max-width:300px;border:1px solid var(--color-border-default);border-radius:12px;"><h3 class="popup__title">Default Popup</h3><p class="popup__text">Centered overlay popup.</p></div>',label:"Default"}),`
`,e.jsx(i.h3,{children:"Split"}),`
`,e.jsx(s,{html:'<div class="popup popup--split" style="position:relative;max-width:500px;display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--color-border-default);border-radius:12px;overflow:hidden;"><div class="popup__media" style="background:#f5f0eb;min-height:150px;"></div><div style="padding:24px;"><h3 class="popup__title">Split Popup</h3><p class="popup__text">With media side.</p></div></div>',label:"Split"}),`
`,e.jsx(i.h3,{children:"Slide"}),`
`,e.jsx(s,{html:'<div class="popup popup--slide" style="position:relative;padding:24px;max-width:300px;border:1px solid var(--color-border-default);border-radius:12px;"><h3 class="popup__title">Slide Popup</h3><p class="popup__text">Slides in from edge.</p></div>',label:"Slide"}),`
`,e.jsx(i.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(p,{children:[e.jsx(o,{children:"A/B test marketing components (hero copy, CTA placement, popup timing) to optimize conversion."}),e.jsx(r,{children:"Don't show too many marketing elements at once — popups + banners + badges = fatigue."})]}),`
`,e.jsx(i.h2,{children:"Accessibility"}),`
`,e.jsx(l,{type:"info",children:e.jsx(i.p,{children:"Marketing components often need JavaScript for interactions (countdown timers, popup triggers, etc.)."})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Trap focus inside the overlay while open. Return focus to the trigger on close."}),`
`,e.jsxs(i.li,{children:["Close on ",e.jsx(i.code,{children:"Escape"})," key press."]}),`
`,e.jsxs(i.li,{children:["All images must have descriptive ",e.jsx(i.code,{children:"alt"})," text."]}),`
`]}),`
`,e.jsx(i.h2,{children:"Dependencies"}),`
`,e.jsx(i.p,{children:"This component uses:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:e.jsx(i.a,{href:"/components/close-button",children:"Close Button"})}),`
`]}),`
`,e.jsx(i.h2,{children:"API Reference"}),`
`,e.jsxs(d,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(i.code,{children:".popup"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Base popup / overlay styles"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(i.code,{children:".popup--split"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Split variant"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(i.code,{children:".popup--slide"})}),e.jsx("td",{children:"modifier"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Slide variant"})]})]})]})}function h(t={}){const{wrapper:i}=t.components||{};return i?e.jsx(i,{...t,children:e.jsx(a,{...t})}):a(t)}function n(t,i){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
