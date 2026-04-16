import React from 'react';
import { Link } from 'react-router-dom';
import headerImg from '../assets/STANDS copy/2.png';
import navLogoImg from '../assets/STANDS copy/1.png';
import './Links.css';

const WA_URL_STANDS = "https://wa.me/584226324938?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20saber%20informaci%C3%B3n%20de%20los%20STAND%20de%20ECOM2026";
const WA_URL_PATROCINIOS = "https://wa.me/584226324938?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20saber%20informaci%C3%B3n%20de%20los%20PATROCINIOS%20de%20ECOM2026";
const WA_URL_GENERIC = "https://wa.me/584226324938?text=Hola!%20me%20gustar%C3%ADa%20saber%20informaci%C3%B3n%20sobre%20patrocinios%20y%20stands";

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
        <div style={{ width: 28 }}></div>
      </div>

      <div className="links-container">

        {/* Header Image */}
        <div className="links-header-img-wrapper">
          <img src={headerImg} alt="ECOM Header" className="links-header-img" />
        </div>

        {/* Subtitle */}
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

          <a href={WA_URL_STANDS} target="_blank" rel="noopener noreferrer" className="link-item btn-dark-purple">
            <span className="btn-text">COMPRAR STANDS</span>
          </a>

          <a href={WA_URL_PATROCINIOS} target="_blank" rel="noopener noreferrer" className="link-item btn-dark-purple">
            <span className="btn-text">SER PATROCINADOR</span>
          </a>
        </div>

      </div>

      {/* Footer con redes sociales */}
      <div className="links-footer-social">
        <a href="https://www.instagram.com/ecom.venezuela/" target="_blank" rel="noopener noreferrer" className="icon-action-btn" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a href="https://www.tiktok.com/@ecom.venezuela" target="_blank" rel="noopener noreferrer" className="icon-action-btn" aria-label="TikTok">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
          </svg>
        </a>
        <a href={WA_URL_GENERIC} target="_blank" rel="noopener noreferrer" className="icon-action-btn" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </a>
      </div>

    </div>
  );
}
