import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import LaunchDarklyProvider from './LaunchDarklyProvider.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LaunchDarklyProvider>
      <App />
    </LaunchDarklyProvider>
  </React.StrictMode>
);
