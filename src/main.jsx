import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Formulario from './pages/Formulario.jsx'
import Entradas from './pages/Entradas.jsx'
import Links from './pages/Links.jsx'
import Patrocinios from './pages/Patrocinios.jsx'
import Tickets from './pages/Tickets.jsx'
import ComunicadoModal from './components/ComunicadoModal.jsx'
import PdfEntradas from './pages/PdfEntradas.jsx'
import PdfStands from './pages/PdfStands.jsx'

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

function GlobalModalManager() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenComunicado')
    if (!hasSeen) {
      setShowModal(true)
    }
  }, [])

  if (!showModal) return null

  return (
    <ComunicadoModal onClose={() => {
      localStorage.setItem('hasSeenComunicado', 'true')
      setShowModal(false)
    }} />
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PixelPageView />
      <GlobalModalManager />
      <Routes>
        <Route path="/" element={<Links />} />
        <Route path="/stands" element={<App />} />
        <Route path="/entradas" element={<Entradas />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/links" element={<Links />} />
        <Route path="/patrocinios" element={<Patrocinios />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/pdfentradas" element={<PdfEntradas />} />
        <Route path="/pdfstands" element={<PdfStands />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
