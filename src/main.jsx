import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Formulario from './pages/Formulario.jsx'
import Entradas from './pages/Entradas.jsx'
import Links from './pages/Links.jsx'
import Patrocinios from './pages/Patrocinios.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
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
