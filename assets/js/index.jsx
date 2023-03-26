import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App';
import TranslationProvider from './components/TranslationProvider';
import reducers from './reducers/index';
import { guessLocale } from './utils/locale';
import '../css/index.css';

const preloadedState = window.PRELOADED_STATE;
delete window.PRELOADED_STATE;

const locale = guessLocale();
const store = configureStore({
  reducer: reducers,
  preloadedState: { ...preloadedState, locale },
  middleware: [thunk],
});

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <TranslationProvider>
        <App />
      </TranslationProvider>
    </BrowserRouter>
  </Provider>,
);
