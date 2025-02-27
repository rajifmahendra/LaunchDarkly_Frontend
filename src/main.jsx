import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LaunchDarklyProvider from './LaunchDarklyProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <LaunchDarklyProvider>
    <App />
  </LaunchDarklyProvider>
);
