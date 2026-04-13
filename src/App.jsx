import React, { useState, useCallback, useEffect } from 'react';
import ecomLogoWhite from './assets/Elementos graficos/11.png';
import projectLogo from './assets/Elementos graficos/1.png';
import bannerBg from './assets/Elementos graficos/2.png';
import headlineText from './assets/Elementos graficos/titulo principal.png';

import stat1 from './assets/STANDS ELEMENTOS /4.png';
import stat2 from './assets/STANDS ELEMENTOS /5.png';
import stat3 from './assets/STANDS ELEMENTOS /6.png';
import stat4 from './assets/STANDS ELEMENTOS /7.png';
import standsAnterioresTitle from './assets/Elementos graficos/9.png';
import marcasTitle from './assets/Elementos graficos/10.png';
import stand1Foto from './assets/fotos/stands 1.jpeg';
import stand2Foto from './assets/fotos/stands 2.jpeg';
import stand3Foto from './assets/fotos/stands 3.jpeg';
import stand4Foto from './assets/fotos/stands 4.jpeg';
import razon1 from './assets/Elementos graficos/12.png';
import razon2 from './assets/Elementos graficos/13.png';
import razon3 from './assets/Elementos graficos/14.png';
import razon4 from './assets/Elementos graficos/15.png';
import stands2026Title from './assets/Elementos graficos/16.png';
import stand2x2 from './assets/Elementos graficos/17.png';
import stand4x2 from './assets/Elementos graficos/18.png';
import stand6x2 from './assets/Elementos graficos/19.png';
import precioTitle from './assets/Elementos graficos/20.png';
import precioTable from './assets/Elementos graficos/21.png';
import './App.css';

const STANDS_PHOTOS = [stand1Foto, stand2Foto, stand3Foto, stand4Foto];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const total = STANDS_PHOTOS.length;

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  return (
    <div className="carousel-container">
      <div className="carousel-row">
        <button className="carousel-btn prev-btn" onClick={prev} aria-label="Anterior">&#8249;</button>

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {STANDS_PHOTOS.map((src, i) => (
              <div className="carousel-slide" key={i}>
                <img src={src} alt={`Stand anterior ${i + 1}`} className="carousel-photo" />
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-btn next-btn" onClick={next} aria-label="Siguiente">&#8250;</button>
      </div>

      <div className="carousel-dots">
        {STANDS_PHOTOS.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    const scriptId = 'niuvixtool-vsl-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://vsl.niuvixtool.com/embed/vsl-engine.js";
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="landing-page">
      {/* 1. Top Navbar (Dark) */}
      <div className="top-navbar">
        <img src={projectLogo} alt="eCom 2026 logo" className="top-logo" />
      </div>

      {/* 2. Sub Navbar (White) */}
      <nav className="sub-navbar">
        <ul className="nav-links">
          <li><a href="#inicio" className="active">Inicio</a></li>
          <li><a href="#entradas">Entradas</a></li>
          <li><a href="#stands">Stands</a></li>
          <li><a href="#patrocinios">Patrocinios</a></li>
          <li><a href="#testimonios">¿Que dicen de nosotros?</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>

      {/* 3. Hero Banner */}
      <section className="hero-banner" style={{ backgroundImage: `url('${bannerBg}')` }}>
      </section>

      {/* 4. Main Content Area */}
      <main className="main-content">
        {/* Headline & Rocket */}
        <div className="headline-section" id="inicio">
          <div className="headline-wrapper">
            <img src={headlineText} alt="El evento de ecommerce más grande de Venezuela" className="headline-text" />
          </div>
        </div>

        {/* VSL Video Container */}
        <div className="vsl-section" style={{ width: '100%', maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
          <vsl-player data-id="48239000-2fdd-47e5-9b6e-f00f2d5d67ea"></vsl-player>
        </div>
        
        <div className="vsl-cta-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '20px' }}>
          <a href="#stands" className="btn-black">adquirir un stands</a>
        </div>

        {/* 5. Stats Cards */}
        <section className="stats-section">
          <div className="stats-grid">
            <img src={stat1} alt="+15 Marcas Participaron" className="stat-card" />
            <img src={stat2} alt="+1.000 Asistentes" className="stat-card" />
            <img src={stat3} alt="Segunda Edición" className="stat-card" />
            <img src={stat4} alt="+20 Ponentes Nacionales e Internacionales" className="stat-card" />
          </div>
        </section>



      </main>
    </div>
  )
}

export default App;
