import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.js';

try {
  const html = renderToString(React.createElement(App));
  console.log('SUCCESS! Rendered HTML length:', html.length);
  console.log('Sample snippet:', html.substring(0, 300));
} catch (err) {
  console.error('ERROR DURING RENDER:', err);
}
