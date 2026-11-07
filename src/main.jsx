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
const ElJuegoDeLasVentas = lazy(() => import('./pages/eljuegodelasventas/ElJuegoDeLasVentas.jsx'))
const ElJuegoDeLasVentas2 = lazy(() => import('./pages/eljuegodelasventas2/ElJuegoDeLasVentas.jsx'))
const EjdlvBroshure = lazy(() => import('./pages/EjdlvBroshure.jsx'))

// Rutas de la landing de El Juego de las Ventas: usan el pixel del workshop
// (2204861446644503), que se inicializa y dispara desde la propia página con sus eventos específicos.
const LANDING_PATH = /^\/(eljuegodelasventas\/?)?$/i
const GENERAL_PIXEL_ID = '2204861446644503'
// index.html solo inicializa el pixel general si la primera ruta NO es la landing.
let generalPixelReady = !LANDING_PATH.test(window.location.pathname)

// Fires a Meta Pixel PageView on every SPA route change (skips the very first
// render because index.html / la landing ya dispararon su PageView al cargar).
function PixelPageView() {
  const location = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the initial mount — index.html (o la landing) ya disparó el primer PageView
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    // La landing dispara su propio PageView con su pixel; no duplicar.
    if (LANDING_PATH.test(location.pathname)) return
    if (typeof window.fbq === 'function') {
      if (!generalPixelReady) {
        window.fbq('init', GENERAL_PIXEL_ID)
        generalPixelReady = true
      }
      // trackSingle: el PageView va solo al pixel general, nunca al de la landing.
      window.fbq('trackSingle', GENERAL_PIXEL_ID, 'PageView')
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
          <Route path="/programacion" element={<ExternalRedirect to="https://www.instagram.com/p/DduCfzAFOW4/?img_index=1" />} />
          <Route path="/ticketshow" element={<ExternalRedirect to="https://www.ticketshow.app/evento/e30f2d30-00c3-42ef-b07c-733d409b59ed/comprar" />} />
          <Route path="/pago10k" element={<ExternalRedirect to="https://www.ticketshow.app/evento/3a0926fa-0aa2-4c45-b85e-07d5a3ea4138/comprar" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
