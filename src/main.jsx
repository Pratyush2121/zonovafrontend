import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global fetch wrapper to proxy API requests to Netlify backend when deployed on Vercel
const originalFetch = window.fetch;
window.fetch = function (url, options) {
  if (typeof url === 'string') {
    const backendUrl = import.meta.env.VITE_API_URL || '';
    if (backendUrl && (url.startsWith('/api/') || url.startsWith('/uploads/'))) {
      url = `${backendUrl}${url}`;
    }
  }
  return originalFetch(url, options);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
