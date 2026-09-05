import React, { StrictMode, useEffect, useState, useRef } from 'react'
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

// Fires a Meta Pixel PageView on every SPA route change (skips the very first
// render because index.html already called fbq('track', 'PageView') on load).
function PixelPageView() {
  const location = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the initial mount — index.html already fired the first PageView
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
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

function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PixelPageView />
      {/* <GlobalModalManager /> */}
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
        <Route path="/ticketshow" element={<ExternalRedirect to="https://www.ticketshow.app/evento/e30f2d30-00c3-42ef-b07c-733d409b59ed/comprar" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
