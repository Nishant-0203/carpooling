// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from "@/components/ui/sonner"
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

      <App />
      <Toaster position="top-center"
      richColors 
      expand={true}
      closeButton/>
    </BrowserRouter>
  </React.StrictMode>
);
