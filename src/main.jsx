import React, { StrictMode, useEffect, useState, useRef, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'

import ElJuegoDeLasVentas from './pages/eljuegodelasventas/ElJuegoDeLasVentas.jsx'

// Lazy-loaded routes — each secondary page is its own JS chunk, loaded on demand
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
const ElJuegoDeLasVentas2 = lazy(() => import('./pages/eljuegodelasventas2/ElJuegoDeLasVentas.jsx'))
const EjdlvBroshure = lazy(() => import('./pages/EjdlvBroshure.jsx'))
const Landing2027 = lazy(() => import('./pages/landing2027/Landing2027.jsx'))
const Feedback    = lazy(() => import('./pages/feedback/Feedback.jsx'))

// Fires a Meta Pixel PageView on subsequent SPA route changes (skips the very first
// render because index.html already called fbq('track', 'PageView') on initial load).
function PixelPageView() {
  const location = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip initial mount — index.html already fired PageView immediately in <head>
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
          <Route path="/" element={<ElJuegoDeLasVentas />} />
          <Route path="/stands" element={<App />} />
          <Route path="/entradas" element={<Entradas />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/links" element={<Links />} />
          <Route path="/patrocinios" element={<Patrocinios />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/pdfentradas" element={<PdfEntradas />} />
          <Route path="/pdfstands" element={<PdfStands />} />
          <Route path="/cronograma" element={<Cronograma />} />
          <Route path="/eljuegodelasventas" element={<ElJuegoDeLasVentas />} />
          <Route path="/eljuegodelasventas2" element={<ElJuegoDeLasVentas2 />} />
          <Route path="/ejdlvbroshure" element={<EjdlvBroshure />} />
          <Route path="/landing2027" element={<Landing2027 />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/encuesta" element={<Feedback />} />
          <Route path="/programacion" element={<ExternalRedirect to="https://www.instagram.com/p/DduCfzAFOW4/?img_index=1" />} />
          <Route path="/ticketshow" element={<ExternalRedirect to="https://www.ticketshow.app/evento/e30f2d30-00c3-42ef-b07c-733d409b59ed/comprar" />} />
          <Route path="/pago10k" element={<ExternalRedirect to="https://www.ticketshow.app/evento/3a0926fa-0aa2-4c45-b85e-07d5a3ea4138/comprar" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
