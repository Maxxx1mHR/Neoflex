import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary.tsx';
import { LanguageProvider } from '@context/LanguageContext.tsx';
import { App } from './App.tsx';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
