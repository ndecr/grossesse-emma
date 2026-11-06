import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
  delay: 50,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
