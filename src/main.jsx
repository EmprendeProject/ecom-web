import React, { StrictMode, useEffect, useState, useRef, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'

// Lazy-loaded routes — each page is its own JS chunk, loaded on demand
const App         = lazy(() => import('./App.jsx'))
const Formulario  = lazy(() => import('./pages/Formulario.jsx'))
const Entradas    = lazy(() => import('./pages/Entradas.jsx'))
const Links       = lazy(() => import('./pages/Links.jsx'))
const Patrocinios = lazy(() => import('./pages/Patrocinios.jsx'))
const Tickets     = lazy(() => import('./pages/Tickets.jsx'))
const ComunicadoModal = lazy(() => import('./components/ComunicadoModal.jsx'))
const PdfEntradas = lazy(() => import('./pages/PdfEntradas.jsx'))
const PdfStands   = lazy(() => import('./pages/PdfStands.jsx'))
const Cronograma  = lazy(() => import('./pages/Cronograma.jsx'))

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
      <Suspense fallback={null}>
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
          <Route path="/cronograma" element={<Cronograma />} />
          <Route path="/ticketshow" element={<ExternalRedirect to="https://www.ticketshow.app/evento/e30f2d30-00c3-42ef-b07c-733d409b59ed/comprar" />} />
          <Route path="/pago10k" element={<ExternalRedirect to="https://www.ticketshow.app/evento/3a0926fa-0aa2-4c45-b85e-07d5a3ea4138/comprar" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
