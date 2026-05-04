import React, { useState, useCallback, useEffect } from 'react';
import ecomLogoWhite from './assets/Elementos graficos/11.png';
import headlineText from './assets/Elementos graficos/titulo principal.png';
import Navbar from './components/Navbar';

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
import imgPlanoEcomMuestra from './assets/STANDS/plano ecom muestra.png';

// Logos marcas anteriores
import logoDHL from './assets/marcas anteriores/DHL.png';
import logoTFHKA from './assets/marcas anteriores/TFHKA AI LOGO-02.png';
import logoDropanas from './assets/marcas anteriores/WhatsApp Image 2025-10-11 at 5.06.13 PM.png';
import logoAbuday from './assets/marcas anteriores/abuday.png';
import logoCalidex from './assets/marcas anteriores/calidex.png';
import logoCavecom from './assets/marcas anteriores/cavecom-e.png';
import logoDropi from './assets/marcas anteriores/dropi.png';
import logoGalanet from './assets/marcas anteriores/galanet.png';
import logoKomvii from './assets/marcas anteriores/komvii.png';
import logoNewEmprende from './assets/marcas anteriores/newemprende horizontal.png';
import logoOferfly from './assets/marcas anteriores/oferfly.png';
import logoPancakeMeta from './assets/marcas anteriores/pancake & meta.png';
import logoR4 from './assets/marcas anteriores/r4.png';
import logoSellibri from './assets/marcas anteriores/sellibrí Horizontal - Blanco.png';
import logoZoom from './assets/marcas anteriores/zoom.png';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="carousel-container">
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {STANDS_PHOTOS.map((src, i) => (
            <div className={`carousel-slide ${i === current ? 'active-slide' : ''}`} key={i}>
              <img src={src} alt={`Stand anterior ${i + 1}`} className="carousel-photo" />
              <div className="carousel-overlay"></div>
            </div>
          ))}
        </div>

        <button className="carousel-btn prev-btn" onClick={prev} aria-label="Anterior">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <button className="carousel-btn next-btn" onClick={next} aria-label="Siguiente">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

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
    </div>
  );
}

function App() {
  const [isPlanoZoomOpen, setIsPlanoZoomOpen] = useState(false);

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
      <Navbar />


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
          <iframe 
            src="https://player.vimeo.com/video/1187733199?autoplay=0&loop=1&autopause=0&title=0&byline=0&portrait=0&badge=0" 
            style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)', border: '1px solid rgba(177, 76, 247, 0.2)' }} 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowFullScreen
            title="ECOM Video"
          ></iframe>
        </div>
        
        <div className="vsl-cta-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '30px auto 0 auto', padding: '0 20px', width: '100%', maxWidth: '900px' }}>
          <a 
            href="#stands" 
            onClick={(e) => { e.preventDefault(); document.getElementById('stands').scrollIntoView({ behavior: 'smooth' }); }} 
            className="btn-vsl-cta"
          >
            ADQUIRIR UN STAND
          </a>
          <h2 className="stands-intro-title">
            Conoce mas de ECOM 2026
          </h2>
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

          {/* Logos grid de marcas */}
          <div className="marcas-logos-grid">
            <div className="marca-logo-item"><img src={logoPancakeMeta} alt="Pancake & Meta" /></div>
            <div className="marca-logo-item"><img src={logoDropi} alt="Dropi" /></div>
            <div className="marca-logo-item"><img src={logoSellibri} alt="Sellibri" /></div>
            <div className="marca-logo-item"><img src={logoR4} alt="R4" /></div>
            <div className="marca-logo-item"><img src={logoNewEmprende} alt="New Emprende" /></div>
            <div className="marca-logo-item"><img src={logoZoom} alt="Zoom" /></div>
            <div className="marca-logo-item"><img src={logoKomvii} alt="Komvii" /></div>
            <div className="marca-logo-item"><img src={logoDropanas} alt="Dropanas" /></div>
            <div className="marca-logo-item"><img src={logoAbuday} alt="Abuday" /></div>
            <div className="marca-logo-item"><img src={logoOferfly} alt="Oferfly" /></div>
            <div className="marca-logo-item"><img src={logoCalidex} alt="Calidex" /></div>
            <div className="marca-logo-item"><img src={logoGalanet} alt="Galanet" /></div>
            <div className="marca-logo-item"><img src={logoTFHKA} alt="The Factory HKA" /></div>
            <div className="marca-logo-item"><img src={logoCavecom} alt="Cavecom-e" /></div>
            <div className="marca-logo-item"><img src={logoDHL} alt="DHL" /></div>
          </div>
        </section>

        {/* Imagen 9 */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '10px 0 40px 0', backgroundColor: '#ffffff' }}>
          <img src={imgSTANDS9} alt="Imagen 9" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        {/* 7. Razones */}
        <section className="razones-section" style={{ backgroundColor: '#111111', padding: '80px 40px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '50px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <img src={imgSTANDS10} alt="Razón 10" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              width: '100%'
            }}>
              <img src={imgSTANDS11} alt="Razón 11" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
              <img src={imgSTANDS12} alt="Razón 12" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
              <img src={imgSTANDS13} alt="Razón 13" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
              <img src={imgSTANDS14} alt="Razón 14" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
            </div>
          </div>
        </section>

        {/* 8. Nuestros Stands */}
        <section id="stands" className="nuestros-stands-section" style={{ backgroundColor: '#ffffff', padding: '80px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px' }}>
          <img src={imgSTANDS17} alt="Stand 17" style={{ width: '100%', maxWidth: '1000px', height: 'auto' }} />
          <img src={imgSTANDS18} alt="Stand 18" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
          <img src={imgSTANDS19} alt="Stand 19" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
          <img src={imgSTANDS20} alt="Stand 20" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
          <img src={imgSTANDS21} alt="Stand 21" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
          <img src={imgSTANDS22} alt="Stand 22" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
          <img src={imgSTANDS23} alt="Stand 23" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
          
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '900px', marginTop: '10px' }}>
            <a href="https://wa.me/584226324938?text=¡Hola!%20Me%20gustaría%20información%20sobre%20los%20stands%20de%20ECOM2026" target="_blank" rel="noopener noreferrer" className="btn-vsl-cta">
              ADQUIRIR UN STAND
            </a>
          </div>
          <div className="vsl-pre-text" style={{ maxWidth: '900px', width: '100%', marginBottom: '2px' }}>
            <p className="vsl-pre-question" style={{ color: 'rgba(0,0,0,0.5)' }}>Toca para ver el mapa completo</p>
            <p className="vsl-pre-cta" style={{ color: '#000000' }}>AMPLIAR PLANO 👇🏻</p>
          </div>
          <button
            type="button"
            className="plano-zoom-trigger"
            onClick={() => setIsPlanoZoomOpen(true)}
            aria-label="Ampliar plano ECOM"
          >
            <img
              src={imgPlanoEcomMuestra}
              alt="Plano ECOM muestra"
              style={{ width: '100%', maxWidth: '900px', height: 'auto', marginTop: '0', marginBottom: '10px', borderRadius: '15px' }}
            />
          </button>
        </section>

        {/* 9. Por qué participar */}
        <section className="por-que-participar-section" style={{ backgroundColor: '#111111', padding: '80px 40px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '50px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <img src={imgSTANDS24} alt="Por qué 24" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px', /* Un poquito más juntas */
              width: '100%'
            }}>
              <img src={imgSTANDS25} alt="Por qué 25" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
              <img src={imgSTANDS26} alt="Por qué 26" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
              <img src={imgSTANDS27} alt="Por qué 27" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
              <img src={imgSTANDS28} alt="Por qué 28" style={{ width: '100%', maxWidth: '1000px', height: 'auto', borderRadius: '15px' }} />
            </div>
          </div>
        </section>
      </main>

      {isPlanoZoomOpen && (
        <div
          className="plano-zoom-overlay"
          onClick={() => setIsPlanoZoomOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Cerrar zoom del plano"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setIsPlanoZoomOpen(false);
          }}
        >
          <button
            type="button"
            className="plano-zoom-close"
            onClick={() => setIsPlanoZoomOpen(false)}
            aria-label="Cerrar"
          >
            ×
          </button>
          <img
            src={imgPlanoEcomMuestra}
            alt="Plano ECOM muestra ampliado"
            className="plano-zoom-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  )
}

export default App;
