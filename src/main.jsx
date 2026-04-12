import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Formulario from './pages/Formulario.jsx'
import Entradas from './pages/Entradas.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/stands" element={<App />} />
        <Route path="/entradas" element={<Entradas />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
