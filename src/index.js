import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { App } from './App';

// Styles
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="goscrum/">
      <Provider store={store} >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

