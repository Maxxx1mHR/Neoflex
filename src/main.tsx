import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
