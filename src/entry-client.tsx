import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'store';
import { isServer } from 'utils/helpers';

const store = createStore(
  !isServer && window.__PRELOADED_STATE__ != null ? window.__PRELOADED_STATE__ : undefined
);

!isServer && delete window.__PRELOADED_STATE__;

ReactDOM.hydrateRoot(
  document.getElementById('app')!,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
