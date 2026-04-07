import React, { useState, useCallback } from 'react';
import ecomLogoWhite from './assets/Elementos graficos/11.png';
import projectLogo from './assets/Elementos graficos/1.png';
import bannerBg from './assets/Elementos graficos/2.png';
import headlineText from './assets/Elementos graficos/titulo principal.png';

import stat1 from './assets/Elementos graficos/5.png';
import stat2 from './assets/Elementos graficos/6.png';
import stat3 from './assets/Elementos graficos/7.png';
import stat4 from './assets/Elementos graficos/8.png';
import standsAnterioresTitle from './assets/Elementos graficos/9.png';
import marcasTitle from './assets/Elementos graficos/10.png';
import stand1Foto from './assets/stands/stands 1.jpeg';
import stand2Foto from './assets/stands/stands 2.jpeg';
import stand3Foto from './assets/stands/stands 3.jpeg';
import stand4Foto from './assets/stands/stands 4.jpeg';
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
        <div className="vsl-section">
          <div className="video-player">
             <div className="play-button-overlay">
               <div className="play-button-circle">
                 <div className="play-triangle"></div>
               </div>
             </div>
             
             {/* Fake Video Controls for UI accuracy */}
             <div className="video-controls">
                <div className="controls-left">
                  <span className="control-icon play-small">▶</span>
                  <span className="control-icon next">⏭</span>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                    <div className="progress-handle"></div>
                  </div>
                </div>
                <div className="controls-right">
                  <span className="control-icon volume">🔊</span>
                  <span className="control-icon settings">⚙</span>
                  <span className="control-icon fullscreen">⛶</span>
                </div>
             </div>
          </div>
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

        {/* 6. Stands Anteriores */}
        <section className="stands-anteriores-section">
          <div className="stands-title-wrapper">
            <img src={standsAnterioresTitle} alt="Stands que se sumaron a la versión anterior" className="stands-title-img" />
          </div>
          
          <Carousel />

          <div className="stands-cta-wrapper">
            <button className="btn-secondary">Quiero mas información de stands</button>
          </div>
        </section>

        {/* 7. Marcas Que Han Confiado */}
        <section className="marcas-section" id="patrocinios">
          <div className="marcas-title-wrapper">
            <img src={marcasTitle} alt="Marcas que han confiado en nosotros" className="marcas-title-img" />
          </div>
          <div className="logos-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="logo-placeholder">LOGO</div>
            ))}
          </div>
        </section>

        {/* 8. Razones Por Las Que */}
        <section className="razones-section">
          <h2 className="razones-title">
             <span className="light">RAZONES POR LAS QUE</span><br/>
             DEBERÍAS PARTICIPAR<br/>
             <span className="purple">ECOM</span> COMO STAND
          </h2>
          <div className="razones-grid">
            <img src={razon1} alt="Razón 1" className="razon-card" />
            <img src={razon2} alt="Razón 2" className="razon-card" />
            <img src={razon3} alt="Razón 3" className="razon-card" />
            <img src={razon4} alt="Razón 4" className="razon-card" />
          </div>
        </section>

        {/* 9. Nuestros Stands 2026 */}
        <section className="nuestros-stands-section" id="stands">
          <div className="nuestros-title-wrapper">
            <img src={stands2026Title} alt="Nuestros Stands 2026" className="nuestros-title-img" />
          </div>
          
          <div className="stands-images-grid">
             <div className="stand-item">
               <img src={stand2x2} alt="Stand 2x2" />
               <div className="stand-label">2X2</div>
             </div>
             <div className="stand-item">
               <img src={stand4x2} alt="Stand 4x2" />
               <div className="stand-label">4X2</div>
             </div>
          </div>
          <div className="stand-item stand-large">
             <img src={stand6x2} alt="Stand 6x2 Tipo Isla" />
             <div className="stand-label">6X2 TIPO ISLA</div>
          </div>

          <p className="stands-disclaimer">
            ALTURA MÁXIMA PERMITIDA PARA LA DECORACIÓN DEL STAND : 3 m.
          </p>

          <div className="stands-includes-box">
             <div className="includes-left">
               <h3>LO QUE<br/>INCLUYE<br/>CADA<br/>STAND:</h3>
             </div>
             <div className="includes-right">
               <ul>
                 <li>Panelería de acuerdo a la medida comprada.</li>
                 <li>Un toma corriente doble de 1Kva.</li>
                 <li>Escarapelas y pases de cortesía, de acuerdo a la medida comprada.</li>
               </ul>
             </div>
          </div>
        </section>

        {/* 10. Precios */}
        <section className="precios-section" id="entradas">
          <div className="precios-title-wrapper">
            <img src={precioTitle} alt="Precio de ventas de los stands 2026" className="precios-title-img" />
          </div>
          
          <div className="precios-table-wrapper">
             <img src={precioTable} alt="Tabla de precios" className="precios-table-img" />
          </div>

          <p className="precios-disclaimer">
            LAS ESCARAPELAS / GAFETES son credenciales utilizadas para IDENTIFICAR a las<br/>
            personas que representan la marca. Las cortesías serán entregadas CON REGISTRO PREVIO DE ASISTENTE.
          </p>

          <button className="btn-tertiary">VALOR ADICIONAL DE LA ESCARAPELA: $25 USD</button>
        </section>

        {/* 11. ¿Por Qué Participar? */}
        <section className="por-que-participar-section" id="testimonios">
          <h2 className="por-que-title">
             ¿POR QUÉ <span className="purple">PARTICIPAR?</span>
          </h2>
          <div className="por-que-content">
            <p><strong>Conexión Directa:</strong> Rompe la pantalla. El contacto humano genera una confianza que los canales digitales no pueden replicar, acelerando tus ventas.</p>
            <p><strong>Liderazgo Sectorial:</strong> Deja de ser un observador en redes y conviértete en protagonista dentro del lugar donde se definen las tendencias.</p>
            <p><strong>Pulso del Mercado:</strong> Sal de la oficina para entender qué necesita tu cliente hoy. Escucha, aprende y ajusta tu oferta en tiempo real.</p>
            <p><strong>Impacto Tangible:</strong> No buscamos solo "likes", buscamos leads. Creamos el ambiente perfecto para que cada charla sea una oportunidad comercial.</p>
          </div>
        </section>

        {/* 12. Google Form Contact */}
        <section className="google-form-section" id="contacto">
          <h2 className="google-form-title">
            ¿LISTO PARA <span className="purple">PARTICIPAR?</span>
          </h2>
          <p className="google-form-subtitle">Completa el formulario y un asesor se pondrá en contacto contigo.</p>
          <div className="google-form-wrapper">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScNnVixZ3oe7lrlRuxqgEiRxRiZhUAX_iZHaZ3G5Wf3vizHJw/viewform?embedded=true"
              width="700"
              height="520"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Formulario de contacto eCom 2026"
            >
              Cargando…
            </iframe>
          </div>
        </section>

        {/* 13. Footer */}
        <footer className="footer-section" id="footer">
          <div className="footer-content">
            <img src={projectLogo} alt="eCom 2026 logo" className="footer-logo" />
            <div className="footer-contact">
              <p><strong>CORREO:</strong> gerencia@ecomvenezuela.com</p>
              <p><strong>NÚMERO:</strong> +57 312 8289360</p>
            </div>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 5 3.66 9.14 8.44 9.88v-7H7.9v-2.88h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.64.78-1.64 1.57v1.88h2.8l-.45 2.88h-2.35v7.03c4.89-.66 8.64-4.85 8.64-9.93C22 6.48 17.52 2 12 2z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}

export default App;
