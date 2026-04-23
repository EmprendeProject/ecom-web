import React, { useState, useCallback, useEffect } from 'react';
import ecomLogoWhite from './assets/Elementos graficos/11.png';
import projectLogo from './assets/Elementos graficos/1.png';
import bannerBg from './assets/Elementos graficos/2.png';
import headlineText from './assets/Elementos graficos/titulo principal.png';

import stat1 from './assets/STANDS/4.png';
import stat2 from './assets/STANDS/5.png';
import stat3 from './assets/STANDS/6.png';
import stat4 from './assets/STANDS/7.png';
import marcasConfiaronTitle from './assets/STANDS/8.png';

import imgSTANDS8 from './assets/STANDS/8.png';
import imgSTANDS9 from './assets/STANDS/9.png';
import imgSTANDS10 from './assets/STANDS/10.png';
import imgSTANDS11 from './assets/STANDS/11.png';
import imgSTANDS12 from './assets/STANDS/12.png';
import imgSTANDS13 from './assets/STANDS/13.png';
import imgSTANDS14 from './assets/STANDS/14.png';
import imgSTANDS17 from './assets/STANDS/17.png';
import imgSTANDS18 from './assets/STANDS/18.png';
import imgSTANDS19 from './assets/STANDS/19.png';
import imgSTANDS20 from './assets/STANDS/20.png';
import imgSTANDS21 from './assets/STANDS/21.png';
import imgSTANDS22 from './assets/STANDS/22.png';
import imgSTANDS23 from './assets/STANDS/23.png';
import imgSTANDS24 from './assets/STANDS/24.png';
import imgSTANDS25 from './assets/STANDS/25.png';
import imgSTANDS26 from './assets/STANDS/26.png';
import imgSTANDS27 from './assets/STANDS/27.png';
import imgSTANDS28 from './assets/STANDS/28.png';

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
        
        <div className="vsl-cta-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '20px', paddingBottom: '60px' }}>
          <a href="https://wa.me/584226324938?text=¡Hola!%20Me%20gustaría%20información%20sobre%20los%20stands%20de%20ECOM2026" target="_blank" rel="noopener noreferrer" className="btn-black">
            ADQUIRIR UN STAND
          </a>
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

        {/* 6. Marcas que han confiado */}
        <section className="marcas-section">
          <div className="marcas-title-wrapper">
            <img src={marcasConfiaronTitle} alt="Marcas que han confiado" className="marcas-title-img" />
          </div>
          <Carousel />
        </section>

        {/* Imagen 9 */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '40px 20px', backgroundColor: '#ffffff' }}>
          <img src={imgSTANDS9} alt="Imagen 9" style={{ maxWidth: '800px', width: '100%', height: 'auto' }} />
        </div>

        {/* 7. Razones */}
        <section className="razones-section" style={{ backgroundColor: '#2a2a2a', padding: '80px 20px' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <img src={imgSTANDS8} alt="Razón 8" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '15px' }} />
            <img src={imgSTANDS10} alt="Razón 10" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '15px' }} />
            <img src={imgSTANDS11} alt="Razón 11" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '15px' }} />
            <img src={imgSTANDS12} alt="Razón 12" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '15px' }} />
            <img src={imgSTANDS13} alt="Razón 13" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '15px' }} />
            <img src={imgSTANDS14} alt="Razón 14" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '15px' }} />
          </div>
        </section>

        {/* 8. Nuestros Stands */}
        <section className="nuestros-stands-section" style={{ backgroundColor: '#ffffff', padding: '80px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px' }}>
          <img src={imgSTANDS17} alt="Stand 17" style={{ width: '100%', maxWidth: '1000px', height: 'auto' }} />
          <img src={imgSTANDS18} alt="Stand 18" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          <img src={imgSTANDS19} alt="Stand 19" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          <img src={imgSTANDS20} alt="Stand 20" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          <img src={imgSTANDS21} alt="Stand 21" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          <img src={imgSTANDS22} alt="Stand 22" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          <img src={imgSTANDS23} alt="Stand 23" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
        </section>

        {/* 9. Por qué participar */}
        <section className="por-que-participar-section" style={{ backgroundColor: '#2a2a2a', padding: '80px 20px' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <img src={imgSTANDS24} alt="Por qué 24" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '15px' }} />
            <img src={imgSTANDS25} alt="Por qué 25" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '15px' }} />
            <img src={imgSTANDS26} alt="Por qué 26" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '15px' }} />
            <img src={imgSTANDS27} alt="Por qué 27" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '15px' }} />
            <img src={imgSTANDS28} alt="Por qué 28" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '15px' }} />
          </div>
        </section>
      </main>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/584226324938?text=¡Hola!%20Me%20gustaría%20información%20sobre%20los%20stands%20de%20ECOM2026" 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.05 1.25C7.94 1.25 1.34 7.84 1.34 15.95c0 2.6.67 5.14 1.94 7.4L1.25 30.75l7.56-1.98c2.19 1.15 4.63 1.76 7.24 1.76 8.11 0 14.71-6.59 14.71-14.7S24.16 1.25 16.05 1.25zm0 24.64c-2.2 0-4.36-.59-6.26-1.71l-.45-.27-4.66 1.22 1.24-4.54-.29-.47c-1.23-1.96-1.88-4.22-1.88-6.57 0-6.83 5.56-12.4 12.39-12.4 3.31 0 6.42 1.29 8.76 3.63 2.34 2.34 3.63 5.45 3.63 8.76 0 6.83-5.56 12.4-12.39 12.4zm6.79-9.27c-.37-.19-2.21-1.09-2.56-1.21-.34-.13-.6-.19-.85.19-.25.37-.96 1.21-1.18 1.46-.22.25-.45.28-.82.09-.37-.19-1.58-.58-3-1.85-1.11-1-1.86-2.23-2.08-2.61-.22-.37-.02-.57.16-.76.17-.17.37-.43.56-.65.19-.22.25-.37.37-.62.13-.25.06-.47-.03-.65-.09-.19-.85-2.05-1.16-2.81-.31-.74-.62-.64-.85-.65-.22-.01-.47-.01-.72-.01-.25 0-.66.09-1.01.47-.35.37-1.34 1.31-1.34 3.2 0 1.89 1.37 3.72 1.56 3.97.19.25 2.71 4.14 6.56 5.8 3.32 1.43 3.86 1.15 4.56 1.08.7-.06 2.21-.9 2.53-1.77.31-.87.31-1.62.22-1.77-.09-.16-.34-.25-.71-.44z"/>
        </svg>
      </a>
    </div>
  )
}

export default App;
