import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import projectLogo from '../assets/Elementos graficos/1.png';
import footerLogo from '../assets/Elementos graficos/2.png';
import titulo1 from '../assets/entradas/1.png';
import entradasGif from '../assets/entradas/entradas ecom gif.gif';
import ubicacionImg from '../assets/entradas/ubicacion.png';
import img4 from '../assets/entradas/4.png';
import etapaFieles from '../assets/entradas/Etapa Fieles.png';
import img19 from '../assets/entradas/19.png';
import img20 from '../assets/entradas/20.png';
import img13 from '../assets/entradas/13.png';
import img21 from '../assets/entradas/21.png';
import './Entradas.css';

function CountdownTimer() {
  const TARGET_DATE = new Date('2026-08-28T23:59:59');

  const calcTimeLeft = () => {
    const diff = TARGET_DATE - new Date();
    if (diff <= 0) return { days: 0, hours: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="countdown-wrapper">
      <div className="countdown-inner">
        <div className="countdown-left">
          <p className="countdown-label">estas preparado?</p>
          <div className="countdown-grid">
            <div className="countdown-block">
              <span className="countdown-number">{pad(timeLeft.days)}</span>
              <span className="countdown-unit">DÍAS</span>
            </div>
            <span className="countdown-colon">:</span>
            <div className="countdown-block">
              <span className="countdown-number">{pad(timeLeft.hours)}</span>
              <span className="countdown-unit">HORAS</span>
            </div>
          </div>
        </div>
        <a href="https://api.whatsapp.com/send?text=¡Hola!%20Me%20gustaría%20saber%20cómo%20comprar%20las%20entradas%20de%20ECOM2026" target="_blank" rel="noopener noreferrer" className="countdown-buy-btn">COMPRAR ENTRADAS</a>
      </div>
    </div>
  );
}

export default function Entradas() {
  useEffect(() => {
    // Inject the VSL script when the component mounts
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
    <div className="entradas-page">
      {/* App Bar */}
      <header className="entradas-header">
        <Link to="/" className="entradas-header-logo-link" aria-label="Volver al inicio">
          <img src={projectLogo} alt="eCom 2026 logo" className="entradas-header-logo" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="entradas-main">
        {/* Imagen 1 */}
        <div className="entradas-image-container">
          <img src={titulo1} alt="Entradas" className="entradas-imagen-1" style={{ maxWidth: '600px', width: '90%' }} />
        </div>

        {/* Video VSL */}
        <div className="vsl-section" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
          <vsl-player data-id="9fef7564-d1bc-46c7-9a73-62f0f508fb2b"></vsl-player>
        </div>


        {/* Call to Action */}
        <div className="entradas-cta-wrapper">
          <a href="https://api.whatsapp.com/send?text=¡Hola!%20Me%20gustaría%20saber%20cómo%20comprar%20las%20entradas%20de%20ECOM2026" target="_blank" rel="noopener noreferrer" className="entradas-cta-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>¡COMPRAR ENTRADA!</a>
        </div>
        <div className="entradas-image-container margin-top-large">
          <img src={ubicacionImg} alt="Ubicación" className="entradas-imagen" style={{ borderRadius: '20px' }} />
        </div>
        <div className="entradas-image-container margin-top-large">
          <img src={entradasGif} alt="Entradas Ecom Gif" className="entradas-imagen" style={{ borderRadius: '20px' }} />
        </div>
      </main>

      {/* Sección Blanca */}
      <section className="entradas-white-section" id="ecom-es-para-ti-si">
        <div className="entradas-white-content">
          <img src={img4} alt="Entradas 4" className="entradas-imagen" style={{ maxWidth: '400px', width: '70%', marginTop: '30px' }} />
          
          <div className="entradas-benefits-list">
            <div className="entradas-benefit-item">
              <span className="benefit-emoji">👨‍💻</span> 
              <span>ERES <span className="benefit-highlight">FREELANCE</span></span>
            </div>
            <div className="entradas-benefit-item">
              <span className="benefit-emoji">🛒</span> 
              <span>HACES <span className="benefit-highlight">ECOMMERCE</span> O <span className="benefit-highlight">DROPSHIPPING</span></span>
            </div>
            <div className="entradas-benefit-item">
              <span className="benefit-emoji">🏪</span> 
              <span>TIENES UN <span className="benefit-highlight">NEGOCIO</span> FISICO O DIGITAL</span>
            </div>
            <div className="entradas-benefit-item">
              <span className="benefit-emoji">🚀</span> 
              <span>ERES <span className="benefit-highlight">EMPRENDEDOR</span></span>
            </div>
            <div className="entradas-benefit-item">
              <span className="benefit-emoji">❤️</span> 
              <span>ERES AMANTE AL <span className="benefit-highlight">MARKETING</span></span>
            </div>
            <div className="entradas-benefit-item">
              <span className="benefit-emoji">📦</span> 
              <span>ERES <span className="benefit-highlight">PROVEEDOR</span> O DISTRIBUIDOR</span>
            </div>
            <div className="entradas-benefit-item">
              <span className="benefit-emoji">🧪</span> 
              <span>TIENES UN <span className="benefit-highlight">LABORATORIO</span></span>
            </div>
            <div className="entradas-benefit-item">
              <span className="benefit-emoji">🏢</span> 
              <span>TIENES UNA <span className="benefit-highlight">EMPRESA DE SERVICIOS</span> PARA EL ECOMMERCE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Púrpura - Tickets */}
      <section className="entradas-purple-section" id="tickets">
        <div className="entradas-purple-content">
          <h2 className="entradas-tickets-title">ADQUIERE TUS ENTRADAS!👇🏻</h2>
          
          <img src={img19} alt="Entradas 19" className="entradas-imagen" />
          <div className="entradas-cta-wrapper">
            <a href="https://api.whatsapp.com/send?text=¡Hola!%20Me%20gustaría%20saber%20cómo%20comprar%20las%20entradas%20de%20ECOM2026" target="_blank" rel="noopener noreferrer" className="entradas-cta-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>¡COMPRAR ENTRADA!</a>
          </div>
          
          <img src={img20} alt="Entradas 20" className="entradas-imagen" />
          <div className="entradas-cta-wrapper">
            <a href="https://api.whatsapp.com/send?text=¡Hola!%20Me%20gustaría%20saber%20cómo%20comprar%20las%20entradas%20de%20ECOM2026" target="_blank" rel="noopener noreferrer" className="entradas-cta-btn vip-btn" style={{ textDecoration: 'none', textAlign: 'center' }}>¡COMPRAR ENTRADA VIP!</a>
          </div>
          
          <img src={etapaFieles} alt="Etapa Fieles" className="entradas-imagen" style={{ marginTop: '-15px', marginBottom: '-5px' }} />
          <p className="entradas-etapa-texto">
            Obtén beneficios especiales por "Pronto Pago" según las etapas de compra. Cuanto antes compres tu entrada, más beneficios exclusivos!
          </p>
          <img src={img13} alt="Entradas 13" className="entradas-imagen" />
          <img src={img21} alt="Entradas 21" className="entradas-imagen" />
        </div>
      </section>

      {/* Footer Contacto */}
      <footer className="entradas-footer">

        <div className="footer-socials">
          <a href="#" className="footer-social-btn" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 5 3.66 9.14 8.44 9.88v-7H7.9v-2.88h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.64.78-1.64 1.57v1.88h2.8l-.45 2.88h-2.35v7.03c4.89-.66 8.64-4.85 8.64-9.93C22 6.48 17.52 2 12 2z"/>
            </svg>
          </a>
          <a href="#" className="footer-social-btn" aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
            </svg>
          </a>
          <a href="#" className="footer-social-btn" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="#" className="footer-social-btn" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </a>
          <a href="#" className="footer-social-btn" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.95v7.4c-.01 1.96-.81 3.82-2.15 5.22-1.34 1.4-3.3 2.25-5.26 2.25-1.99 0-3.95-.91-5.31-2.35-1.36-1.44-2.14-3.39-2.14-5.35 0-1.99.8-3.92 2.18-5.32 1.38-1.4 3.32-2.22 5.3-2.22.46 0 .93.04 1.39.11V12.1c-.48-.09-.97-.13-1.45-.13-1.07 0-2.13.44-2.88 1.25-.75.81-1.17 1.9-1.17 2.99 0 1.1.4 2.16 1.14 2.94.74.78 1.78 1.25 2.87 1.25 1.09 0 2.13-.44 2.88-1.25.75-.81 1.17-1.9 1.17-2.99V.02zm0 0" />
            </svg>
          </a>
        </div>
        
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
          <img src={projectLogo} alt="Logo" style={{ width: '100%', maxWidth: '200px', filter: 'brightness(1.1)' }} />
        </div>
      </footer>
      {/* Floating Contador */}
      <div className="countdown-float-bar">
        <CountdownTimer />
      </div>
    </div>
  );
}
