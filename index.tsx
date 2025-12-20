import React from 'react';

// Polyfill for crypto.randomUUID in insecure contexts
if (typeof window !== 'undefined' && !window.crypto.randomUUID) {
  // @ts-ignore - TS may complain about extending built-in crypto
  window.crypto.randomUUID = function() {
    // @ts-ignore - Implicit coercion of array to string for UUID generation trick
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  };
}

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
