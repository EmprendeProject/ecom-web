import React from 'react';
import { Link } from 'react-router-dom';
import headerImg from '../assets/STANDS copy/2.png';
import navLogoImg from '../assets/STANDS copy/1.png';
import './Links.css';

export default function Links() {
  return (
    <div className="links-page">
      {/* Top Navbar */}
      <div className="links-navbar">
        <button className="nav-icon-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <img src={navLogoImg} alt="ECOM 2026" className="nav-title-img" />
        {/* Placeholder to keep flex structure centered */}
        <div style={{ width: 28 }}></div>
      </div>

      <div className="links-container">


        {/* Header Image */}
        <div className="links-header-img-wrapper">
          <img src={headerImg} alt="ECOM Header" className="links-header-img" />
        </div>

        {/* Title & Subtitle */}
        <div className="links-header">
          <p className="links-subtitle">
            Se parte del primer evento de comercio electronico del pais y unete a la corriente de negocios mas importante del 2026
          </p>
        </div>

        {/* Main Buttons */}
        <div className="links-buttons">
          <Link to="/entradas" className="link-item btn-neon-cyan">
            <span className="btn-text">COMPRAR ENTRADAS</span>
          </Link>

          <Link to="/stands" className="link-item btn-dark-purple">
            <span className="btn-text">COMPRAR STANDS</span>
          </Link>

          <Link to="/stands#patrocinios" className="link-item btn-dark-purple">
            <span className="btn-text">SER PATROCINADOR</span>
          </Link>
        </div>

        {/* List Links (like speaker lineup in reference) */}
        <div className="links-list">
          <a href="#speaker-lineup" className="list-link">OFERTAS EXCLUSIVAS</a>
          <div className="list-divider"></div>
          <a href="#event-schedule" className="list-link">CRONOGRAMA DE EVENTOS</a>
        </div>

        {/* Bottom Icons */}
        <div className="bottom-icons">
          {/* Instagram */}
          <button className="icon-action-btn">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </button>
          {/* TikTok */}
          <button className="icon-action-btn">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
          </button>
          {/* Correo */}
          <button className="icon-action-btn">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </button>
          {/* WhatsApp */}
          <button className="icon-action-btn">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="links-footer">
          <div className="footer-title">ECOM 2026</div>
          <div className="footer-links">
            <a href="#">PRIVACIDAD</a>
            <a href="#">TÉRMINOS</a>
            <a href="#">ACCESO</a>
          </div>
          <div className="footer-copy">© PRODUCCIONES ECOM C.A. -  TODOS LOS DERECHOS RESERVADOS.</div>
        </div>
      </div>
    </div>
  );
}
