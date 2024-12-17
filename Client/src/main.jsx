// src/index.js or src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import Tailwind styles
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
