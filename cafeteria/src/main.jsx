import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.jsx';
import { SelecaoProvider } from './context/SelecaoContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SelecaoProvider>
    <App />
    </SelecaoProvider>
  </StrictMode>
);
