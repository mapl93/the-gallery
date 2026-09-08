import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { applyStoredThemePreference } from './lib/theme';

import '@platform-web/index.css';
import '@platform-web/theme.js';
import './styles/docs.css';
import './styles/exhibit.css';
import './styles/studio.css';

applyStoredThemePreference();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
