import{j as e}from"./index-Dg0DyNZX.js";function a(n){const d={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n.components},{Callout:l,Do:s,DoDont:i,Dont:r,Preview:o,PropTable:c}=d;return l||t("Callout"),s||t("Do"),i||t("DoDont"),r||t("Dont"),o||t("Preview"),c||t("PropTable"),e.jsxs(e.Fragment,{children:[e.jsx(d.h2,{children:"Overview"}),`
`,e.jsx(d.p,{children:"A dialog overlay with header, body, and footer sections. The modal traps focus and provides a backdrop for critical interactions like confirmations, forms, or detail views."}),`
`,e.jsx(o,{html:'<div class="modal-overlay" aria-hidden="false" style="position:relative;min-height:300px;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div class="modal" style="position:relative;"><div class="modal__header"><h2 class="modal__title">Confirm Order</h2></div><div class="modal__body" style="padding:16px;"><p>Are you sure you want to place this order for <strong>$240.00</strong>?</p></div><div class="modal__footer" style="padding:16px;display:flex;gap:8px;justify-content:flex-end;"><button class="btn btn--outline">Cancel</button><button class="btn">Confirm</button></div></div></div>',label:"Modal",interaction:{selector:".modal-overlay",toggle:"attr:aria-hidden=false",triggerLabel:"Open Modal",startVisible:!0}}),`
`,e.jsx(d.h2,{children:"Anatomy"}),`
`,e.jsx(d.p,{children:"The modal is composed of three optional sections:"}),`
`,e.jsxs(d.table,{children:[e.jsx(d.thead,{children:e.jsxs(d.tr,{children:[e.jsx(d.th,{children:"Element"}),e.jsx(d.th,{children:"Class"}),e.jsx(d.th,{children:"Purpose"})]})}),e.jsxs(d.tbody,{children:[e.jsxs(d.tr,{children:[e.jsx(d.td,{children:"Overlay"}),e.jsx(d.td,{children:e.jsx(d.code,{children:".modal-overlay"})}),e.jsx(d.td,{children:"Darkened backdrop, click to dismiss"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:"Container"}),e.jsx(d.td,{children:e.jsx(d.code,{children:".modal"})}),e.jsx(d.td,{children:"The dialog box itself"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:"Header"}),e.jsx(d.td,{children:e.jsx(d.code,{children:".modal__header"})}),e.jsx(d.td,{children:"Title row"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:"Body"}),e.jsx(d.td,{children:e.jsx(d.code,{children:".modal__body"})}),e.jsx(d.td,{children:"Main content area"})]}),e.jsxs(d.tr,{children:[e.jsx(d.td,{children:"Footer"}),e.jsx(d.td,{children:e.jsx(d.code,{children:".modal__footer"})}),e.jsx(d.td,{children:"Action buttons (confirm/cancel)"})]})]})]}),`
`,e.jsx(d.h2,{children:"Usage Guidelines"}),`
`,e.jsxs(i,{children:[e.jsx(s,{children:"Use modals for focused tasks that require a decision — confirmations, short forms, important alerts."}),e.jsx(r,{children:"Don't use modals for long content or multi-step flows. Use a dedicated page or drawer instead."})]}),`
`,e.jsxs(i,{children:[e.jsx(s,{children:"Always include a visible close mechanism — a cancel button, X icon, or backdrop click."}),e.jsx(r,{children:"Don't trap users in a modal with no way out. Every modal must be dismissible."})]}),`
`,e.jsx(d.h2,{children:"Accessibility"}),`
`,e.jsx(l,{type:"warning",children:e.jsxs(d.p,{children:["Modals ",e.jsx(d.strong,{children:"must"})," trap keyboard focus while open. The user should not be able to tab to elements behind the overlay."]})}),`
`,e.jsxs(d.ul,{children:[`
`,e.jsxs(d.li,{children:["Set ",e.jsx(d.code,{children:'aria-hidden="false"'})," on the overlay when open, ",e.jsx(d.code,{children:'"true"'})," when closed."]}),`
`,e.jsxs(d.li,{children:["Use ",e.jsx(d.code,{children:'role="dialog"'})," and ",e.jsx(d.code,{children:'aria-modal="true"'})," on the ",e.jsx(d.code,{children:".modal"})," element."]}),`
`,e.jsxs(d.li,{children:["Add ",e.jsx(d.code,{children:"aria-labelledby"})," pointing to the modal title's ",e.jsx(d.code,{children:"id"}),"."]}),`
`,e.jsx(d.li,{children:"Return focus to the trigger element when the modal closes."}),`
`,e.jsxs(d.li,{children:["Close on ",e.jsx(d.code,{children:"Escape"})," key press."]}),`
`]}),`
`,e.jsx(d.pre,{children:e.jsx(d.code,{className:"language-html",children:`<div class="modal-overlay" aria-hidden="false">
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="modal__header">
      <h2 class="modal__title" id="modal-title">Title</h2>
    </div>
    <div class="modal__body">…</div>
    <div class="modal__footer">
      <button class="btn btn--outline">Cancel</button>
      <button class="btn">Confirm</button>
    </div>
  </div>
</div>
`})}),`
`,e.jsx(d.h2,{children:"API Reference"}),`
`,e.jsxs(c,{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(d.code,{children:".modal-overlay"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Full-screen backdrop with overlay opacity"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(d.code,{children:".modal"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Dialog container with shadow and radius"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(d.code,{children:".modal__header"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Header section with title"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(d.code,{children:".modal__title"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Title text styling"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(d.code,{children:".modal__body"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Main content area"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(d.code,{children:".modal__footer"})}),e.jsx("td",{children:"class"}),e.jsx("td",{children:"—"}),e.jsx("td",{children:"Footer with action buttons"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(d.code,{children:"aria-hidden"})}),e.jsx("td",{children:"attribute"}),e.jsx("td",{children:e.jsx(d.code,{children:"true"})}),e.jsx("td",{children:"Controls overlay visibility"})]})]}),`
`,e.jsx(l,{type:"tip",children:e.jsxs(d.p,{children:["Pair the modal with the ",e.jsx(d.code,{children:"button"})," component for consistent action styling in the footer."]})})]})}function x(n={}){const{wrapper:d}=n.components||{};return d?e.jsx(d,{...n,children:e.jsx(a,{...n})}):a(n)}function t(n,d){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
