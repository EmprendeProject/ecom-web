import React, { useEffect, useState } from 'react';
import img19 from '../assets/entradas/19.png';
import img20 from '../assets/entradas/20.png';
import projectLogo from '../assets/Elementos graficos/1.png';
import imgAdquiereEntradas from '../assets/Elementos graficos/ADQUIERE TUS ENTRADAS.png';
import imgFlyer from '../assets/Elementos graficos/flyer.jpg';
import './Tickets.css';

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
          href="https://www.ticketshow.app/evento/e17ed289-9c12-41fe-bf4b-9704de1262b0/comprar"
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

export default function Tickets() {
  return (
    <div className="tickets-page">
      <div className="tickets-top-banner">
        🚨 ¡OFERTA VÁLIDA POR SÓLO 7 DÍAS! 🚨
      </div>

      <main className="tickets-main">
        {/* Imagen adquiere entradas */}
        <div className="tickets-header-img-wrapper">
          <img src={imgAdquiereEntradas} alt="Adquiere tus entradas" className="tickets-header-img" />
        </div>

        {/* Imagen flyer */}
        <div className="tickets-flyer-wrapper">
          <img src={imgFlyer} alt="Flyer ECOM 2026" className="tickets-flyer-img" />
        </div>

        {/* Botón comprar online */}
        <div className="tickets-top-cta">
          <a
            href="https://www.ticketshow.app/evento/e17ed289-9c12-41fe-bf4b-9704de1262b0/comprar"
            target="_blank"
            rel="noopener noreferrer"
            className="tickets-btn-online"
            onClick={() => window.fbq && window.fbq('track', 'InitiateCheckout', { content_name: 'Comprar Online', content_category: 'Entradas' })}
          >
            🛒 COMPRAR ONLINE
          </a>
        </div>

        {/* Imagen 19 - Entrada General */}
        <div className="tickets-card-wrapper">
          <img
            src={img19}
            alt="Entrada General ECOM 2026"
            className="tickets-img"
          />
          <div className="tickets-cta-wrapper">
            <a
              href="https://www.ticketshow.app/evento/e17ed289-9c12-41fe-bf4b-9704de1262b0/comprar"
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
          <img
            src={img20}
            alt="Entrada VIP ECOM 2026"
            className="tickets-img"
          />
          <div className="tickets-cta-wrapper">
            <a
              href="https://www.ticketshow.app/evento/e17ed289-9c12-41fe-bf4b-9704de1262b0/comprar"
              target="_blank"
              rel="noopener noreferrer"
              className="tickets-btn tickets-btn--vip"
              onClick={() => window.fbq && window.fbq('track', 'InitiateCheckout', { content_name: 'Entrada VIP', content_category: 'Entradas' })}
            >
              ¡COMPRAR ENTRADA VIP!
            </a>
          </div>
        </div>
      </main>

      <footer className="tickets-footer">
        <img src={projectLogo} alt="Logo" className="tickets-footer-logo" />
      </footer>

      {/* Floating countdown bar */}
      <div className="tk-countdown-float-bar">
        <CountdownTimer />
      </div>
    </div>
  );
}
