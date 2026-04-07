import React from 'react';
import { Link } from 'react-router-dom';
import projectLogo from '../assets/Elementos graficos/1.png';
import bannerBg from '../assets/Elementos graficos/2.png';
import './Formulario.css';

export default function Formulario() {
  return (
    <div className="form-page">
      {/* Header */}
      <header className="form-header">
        <Link to="/" className="form-header-logo-link" aria-label="Volver al inicio">
          <img src={projectLogo} alt="eCom 2026 logo" className="form-header-logo" />
        </Link>
      </header>

      {/* Banner Header */}
      <div className="form-banner">
        <img src={bannerBg} alt="eCom 2026 Banner" className="form-banner-img" />
      </div>

      {/* Hero */}
      <section className="form-hero">
        <h1 className="form-hero-title">
          ¿LISTO PARA <span className="form-purple">PARTICIPAR?</span>
        </h1>
        <p className="form-hero-subtitle">
          Completa el formulario y unete a la lista de espera, para ser de los primeros en adquirir entradas de Ecom 2026.
        </p>
      </section>

      {/* Form Wrapper */}
      <section className="form-body">
        <div className="form-card">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScNnVixZ3oe7lrlRuxqgEiRxRiZhUAX_iZHaZ3G5Wf3vizHJw/viewform?embedded=true"
            width="700"
            height="1250"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Formulario de contacto eCom 2026"
          >
            Cargando…
          </iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="form-footer">
        <p>© 2026 eCom Venezuela · Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
