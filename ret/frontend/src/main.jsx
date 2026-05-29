import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Your main css file
import { BrowserRouter } from 'react-router-dom';
console.log("NEW BUILD LOADED");

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
  
);