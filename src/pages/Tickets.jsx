import React, { useEffect, useState } from 'react';
import img19 from '../assets/entradas/19.png';
import img20 from '../assets/entradas/20.png';
import projectLogo from '../assets/Elementos graficos/1.png';
import imgAdquiereEntradas from '../assets/Elementos graficos/ADQUIERE TUS ENTRADAS.png';
import imgFlyer from '../assets/Elementos graficos/flyer.jpg';
import imgElevento from '../assets/Elementos graficos/elevento.png';
import imgFecha2 from '../assets/Elementos graficos/fecha 2.png';
import logoEcom from '../assets/Elementos graficos/LOGO ECOM.png';
import OptimizedImage from '../components/OptimizedImage';
import './Tickets.css';

// Ponentes images
import ponente1 from '../assets/ponentes/1.png';
import ponente2 from '../assets/ponentes/2.jpeg';
import ponente3 from '../assets/ponentes/3.png';
import ponente4 from '../assets/ponentes/4.png';
import ponente5 from '../assets/ponentes/5.jpg';
import ponente6 from '../assets/ponentes/6.jpg';
import ponente7 from '../assets/ponentes/7.png';
import ponente8 from '../assets/ponentes/8.jpeg';
import ponente9 from '../assets/ponentes/9.jpg';
import ponente10 from '../assets/ponentes/10.png';
import ponente11 from '../assets/ponentes/11.png';
import ponente12 from '../assets/ponentes/12.jpg';
import ponente13 from '../assets/ponentes/13.jpg';
import ponente14 from '../assets/ponentes/14.png';
import ponente15 from '../assets/ponentes/15.jpg';

const PONENTES = [
  ponente1, ponente2, ponente3, ponente4, ponente5, ponente6, ponente7,
  ponente8, ponente9, ponente10, ponente11, ponente12, ponente13, ponente14, ponente15,
];

function SpeakersCarousel() {
  const items = [...PONENTES, ...PONENTES];
  const trackRef = React.useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  // Auto-scroll logic
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    let animationId;
    let isPaused = false;
    
    const scroll = () => {
      if (!isPaused && !isDragging) {
        track.scrollLeft += 1;
        // Reset scroll when reaching the halfway point (since items are duplicated)
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    
    const pause = () => isPaused = true;
    const play = () => isPaused = false;
    
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', play);
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', play);
    
    return () => {
      cancelAnimationFrame(animationId);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', play);
      track.removeEventListener('touchstart', pause);
      track.removeEventListener('touchend', play);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragMoved(false);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setDragMoved(true);
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleCardClick = (src) => {
    if (!dragMoved) {
      setSelectedImg(src);
    }
  };

  return (
    <>
      <div className="sp-carousel-section">
        <p className="sp-carousel-label">PONENTES</p>
        <div 
          className="sp-carousel-track-wrapper" 
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="sp-carousel-track">
            {items.map((src, i) => (
              <div 
                key={i} 
                className="sp-carousel-card"
                onClick={() => handleCardClick(src)}
              >
                <img src={src} alt={`Ponente ${(i % PONENTES.length) + 1}`} className="sp-carousel-img" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImg && (
        <div className="sp-modal-overlay" onClick={() => setSelectedImg(null)}>
          <div className="sp-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="sp-modal-close" onClick={() => setSelectedImg(null)}>×</button>
            <img src={selectedImg} alt="Ponente" className="sp-modal-img" />
          </div>
        </div>
      )}
    </>
  );
}

const BASE_PURCHASE_URL = 'https://www.ticketshow.app/evento/e30f2d30-00c3-42ef-b07c-733d409b59ed/comprar';

/** Reads fbclid from the current page URL and appends it to the purchase URL if present */
function buildPurchaseUrl(fbclid) {
  if (!fbclid) return BASE_PURCHASE_URL;
  return `${BASE_PURCHASE_URL}?fbclid=${encodeURIComponent(fbclid)}`;
}

function CountdownTimer({ purchaseUrl }) {
  const TARGET_DATE = new Date('2026-09-25T23:59:59');

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
    <div className="tk-countdown-wrapper">
      <div className="tk-countdown-inner">
        <div className="tk-countdown-left">
          <p className="tk-countdown-label">¿preparado?</p>
          <div className="tk-countdown-grid">
            <div className="tk-countdown-block">
              <span className="tk-countdown-number">{pad(timeLeft.days)}</span>
              <span className="tk-countdown-unit">DÍAS</span>
            </div>
            <span className="tk-countdown-colon">:</span>
            <div className="tk-countdown-block">
              <span className="tk-countdown-number">{pad(timeLeft.hours)}</span>
              <span className="tk-countdown-unit">HORAS</span>
            </div>
          </div>
        </div>
        <a
          href={purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tk-countdown-buy-btn"
          onClick={() => window.fbq && window.fbq('track', 'InitiateCheckout', { content_name: 'Entrada General', content_category: 'Entradas' })}
        >
          COMPRAR ENTRADAS
        </a>
      </div>
    </div>
  );
}

const STATS = [
  { prefix: '',  value: 2,  suffix: '',    label: 'DÍAS DE EVENTO',          icon: '📅' },
  { prefix: '+', value: 40, suffix: '',    label: 'PONENTES',                 icon: '🎤' },
  { prefix: '+', value: 6,  suffix: '',    label: 'EXPERIENCIAS DE NEGOCIO',  icon: '🚀' },
  { prefix: '+', value: 50, suffix: '',    label: 'MARCAS DEL ECOMMERCE',     icon: '🏆' },
];

function useCountUp(target, duration = 1800, started) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function StatCard({ prefix, value, suffix, label, icon, started }) {
  const count = useCountUp(value, 1600, started);
  return (
    <div className="sc-card">
      <span className="sc-icon">{icon}</span>
      <span className="sc-number">{prefix}{count}{suffix}</span>
      <span className="sc-label">{label}</span>
    </div>
  );
}

function StatsCounter() {
  const [started, setStarted] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sc-section" ref={ref}>
      {STATS.map((stat, i) => (
        <StatCard key={i} {...stat} started={started} />
      ))}
    </div>
  );
}

export default function Tickets() {
  const [purchaseUrl, setPurchaseUrl] = useState(BASE_PURCHASE_URL);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get('fbclid');
    setPurchaseUrl(buildPurchaseUrl(fbclid));
  }, []);

  return (
    <div className="tickets-page">
      <div className="tickets-top-banner">
        🚨 ¡OFERTA VÁLIDA POR SÓLO 7 DÍAS! 🚨
      </div>

      <main className="tickets-main">
        {/* Logo superior */}
        <div className="tickets-top-logo">
          <OptimizedImage src={logoEcom} alt="ECOM" className="tickets-logo-img" priority />
        </div>

        {/* Contenedor agrupado para elevento y fecha 2 (sin separación) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', width: '100%', marginTop: '-15px' }}>
          {/* Imagen elevento */}
          <div className="tickets-header-img-wrapper" style={{ marginBottom: '0' }}>
            <OptimizedImage src={imgElevento} alt="El Evento ECOM 2026" className="tickets-header-img" priority />
          </div>

          {/* Imagen fecha 2 */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0', padding: '0' }}>
            <OptimizedImage src={imgFecha2} alt="Fecha ECOM 2026" style={{ maxWidth: '200px', width: '100%', height: 'auto', margin: '0', padding: '0', border: 'none' }} priority />
          </div>
        </div>

        {/* Texto AUMENTAR las ventas */}
        <div className="ev-info-section">
          <div className="ev-info-headline">
            <p className="ev-info-cta-text">Todo para <strong>AUMENTAR las ventas por internet</strong> en un solo lugar.</p>
          </div>
        </div>


        {/* Contadores animados */}
        <StatsCounter />

        {/* Botón comprar online */}
        <div className="tickets-top-cta">
          <a
            href={purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tickets-btn-online"
            onClick={() => window.fbq && window.fbq('track', 'InitiateCheckout', { content_name: 'Comprar Online', content_category: 'Entradas' })}
          >
            🛒 COMPRAR ONLINE
          </a>
        </div>


        {/* Texto arriba del carrusel */}
        <div className="ev-info-section">
          <div className="ev-info-headline">
            <p className="ev-info-sub">Los verdaderos expertos.<br />Los mejores proveedores y empresas más importantes.</p>
          </div>
        </div>

        {/* Carrusel de ponentes */}
        <SpeakersCarousel />

        {/* Imagen 19 - Entrada General */}
        {/* Urgency Section (Barra + Preventa) */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div className="tk-progress-container">
            <div className="tk-progress-bar">
              <div className="tk-progress-fill"></div>
            </div>
            <p className="tk-progress-text">🔥 <strong>+75%</strong> ENTRADAS VENDIDAS</p>
          </div>
          <p className="tickets-preventa-badge">PREVENTA HASTA EL 5 DE SEPTIEMBRE</p>
        </div>
        <div className="tickets-card-wrapper">
          <OptimizedImage
            src={img19}
            alt="Entrada General ECOM 2026"
            className="tickets-img"
          />
          <div className="tickets-cta-wrapper">
            <a
              href={purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tickets-btn tickets-btn--general"
              onClick={() => window.fbq && window.fbq('track', 'InitiateCheckout', { content_name: 'Entrada General', content_category: 'Entradas' })}
            >
              ¡COMPRAR ENTRADA!
            </a>
          </div>
        </div>

        {/* Imagen 20 - Entrada VIP */}
        <div className="tickets-card-wrapper">
          <OptimizedImage
            src={img20}
            alt="Entrada VIP ECOM 2026"
            className="tickets-img"
          />
          <div className="tickets-cta-wrapper">
            <a
              href={purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tickets-btn tickets-btn--vip"
              onClick={() => window.fbq && window.fbq('track', 'InitiateCheckout', { content_name: 'Entrada VIP', content_category: 'Entradas' })}
            >
              ¡COMPRAR ENTRADA VIP!
            </a>
          </div>
          <div className="tickets-cta-wrapper" style={{ marginTop: '15px' }}>
            <a
              href="https://wa.me/584226324938?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20comprar%20la%20entrada%20VIP%20de%20ECOM2026"
              target="_blank"
              rel="noopener noreferrer"
              className="tickets-btn tickets-btn--whatsapp"
              onClick={() => window.fbq && window.fbq('track', 'Lead', { content_name: 'Compra Whatsapp VIP', content_category: 'Entradas' })}
            >
              COMPRAR POR WHATSAPP
            </a>
          </div>
        </div>
      </main>

      <footer className="tickets-footer">
        <OptimizedImage src={projectLogo} alt="Logo" className="tickets-footer-logo" />
      </footer>

      {/* Floating countdown bar */}
      <div className="tk-countdown-float-bar">
        <CountdownTimer purchaseUrl={purchaseUrl} />
      </div>
    </div>
  );
}
