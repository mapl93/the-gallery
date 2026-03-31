import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './styles/docs.css';
import './styles/preview-tokens.css';
import '@components-css/reset.css';
import '@components-css/foundations.css';
import '@components-css/utilities.css';
import '@components-css/primitives.css';
import '@components-css/layout.css';
import '@components-css/forms.css';
import '@components-css/global.css';
import '@components-css/product.css';
import '@components-css/collection.css';
import '@components-css/storytelling.css';
import '@components-css/marketing.css';
import '@components-css/cart.css';
import '@components-css/account.css';
import '@components-css/blog.css';
import '@components-css/sections.css';
import '@components-css/ceramics.css';
import '@components-css/coming-soon.css';
import '@components-css/reviews.css';
import '@components-css/pages.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
