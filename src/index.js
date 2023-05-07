import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import './index.css';
const root = ReactDom.createRoot(document.getElementById('root'));
// import { Provider } from 'react-redux';

root.render(
  // <Provider store={store}>
  // </Provider>
  <App />
);
