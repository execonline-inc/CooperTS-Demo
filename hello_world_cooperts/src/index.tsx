import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { loader, TranslationsLoader } from './Translations';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* TranslationsLoader makes translations available for use within App and all */}
    {/* its children via Context. */}
    <TranslationsLoader
      // To switch languages, change the value being passed into the loader below.
      loader={loader('en')}
      loading={<p>Loading, please wait...</p>}
    >
      <App />
    </TranslationsLoader>
  </React.StrictMode>
);
