import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Formulario from './pages/Formulario.jsx'
import Entradas from './pages/Entradas.jsx'
import Links from './pages/Links.jsx'
import Patrocinios from './pages/Patrocinios.jsx'

// Fires a Meta Pixel PageView on every SPA route change
function PixelPageView() {
  const location = useLocation()
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView')
    }
  }, [location.pathname])
  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PixelPageView />
      <Routes>
        <Route path="/" element={<Links />} />
        <Route path="/stands" element={<App />} />
        <Route path="/entradas" element={<Entradas />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/links" element={<Links />} />
        <Route path="/patrocinios" element={<Patrocinios />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
