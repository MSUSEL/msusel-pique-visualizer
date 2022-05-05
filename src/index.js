import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);

/*
Got rid of this so the React components don't rerender twice.
<React.StrictMode>
    <App />
  </React.StrictMode>
 */

