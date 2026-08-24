import React from 'react';
import { Link } from 'react-router-dom';
import projectLogo from '../assets/Elementos graficos/1.png';
import tituloWebinar from '../assets/Elementos graficos/titulo webinar.png';
import expertosImg from '../assets/Elementos graficos/expertos.png';
import './Formulario10k.css';

export default function Formulario10k() {
  return (
    <div className="f10k-page">
      <div className="f10k-urgency-banner" role="alert">
        <span className="f10k-urgency-dot" aria-hidden="true" />
        ¡Solo son <strong>300 cupos!</strong>
        <span className="f10k-urgency-dot" aria-hidden="true" />
      </div>

      <main className="f10k-main">
        <div className="f10k-glow f10k-glow-1" aria-hidden="true" />
        <div className="f10k-glow f10k-glow-2" aria-hidden="true" />

        <section className="f10k-hero">
          <img src={tituloWebinar} alt="Título Webinar" className="f10k-title-img" />
          <p className="f10k-subtitle">
            Cómo construir desde cero un negocio de ecommerce que genere tus primeros <strong>$10.000</strong> antes de que termine el 2026, vendiendo desde Venezuela.
          </p>
          <a
            href="https://wa.me/+584220282663?text=Quiero%20participar%20en%20la%20clase%20de%20ECOM"
            target="_blank"
            rel="noopener noreferrer"
            id="f10k-cta-btn"
            className="f10k-cta-btn"
          >
            Quiero unirme a la clase gratis
          </a>
        </section>

        <section className="f10k-card-wrapper">
          <div className="f10k-expertos-wrapper">
            <img src={expertosImg} alt="Expertos" className="f10k-expertos-img" />
            <div className="f10k-expertos-bio">
              <p className="f10k-expertos-names">Edward, Johan y Bryan</p>
              <p className="f10k-expertos-names">Creadores de ECOM Venezuela</p>
              <p className="f10k-expertos-desc">
                Empresarios y organizadores del evento de comercio electrónico más grande del país. No son gurús de afuera: venden online desde Venezuela, cobran en dólares y bolívares, y cierran ventas por WhatsApp igual que tú.
              </p>
            </div>
          </div>
        </section>

        <section className="f10k-benefits">
          <p className="f10k-benefits-heading">En una sola sesión, en vivo, te llevas:</p>
          <div className="f10k-benefits-list">
            <div className="f10k-benefit-item">
              <span className="f10k-benefit-num">1</span>
              <div className="f10k-benefit-body">
                <strong>Qué vender para arrancar ya.</strong>
                <span> Un producto que la gente ya está comprando, aunque no tengas inventario ni experiencia.</span>
              </div>
            </div>
            <div className="f10k-benefit-item">
              <span className="f10k-benefit-num">2</span>
              <div className="f10k-benefit-body">
                <strong>Cómo cobrar en Venezuela sin enredos.</strong>
                <span> Dólares, bolívares y pago móvil en un solo sistema.</span>
              </div>
            </div>
            <div className="f10k-benefit-item">
              <span className="f10k-benefit-num">3</span>
              <div className="f10k-benefit-body">
                <strong>Cómo cerrar ventas por WhatsApp todos los días.</strong>
                <span> El sistema real de venta por chat, sin depender de tus horas.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="f10k-cta-bottom">
          <a
            href="https://wa.me/+584220282663?text=Quiero%20participar%20en%20la%20clase%20de%20ECOM"
            target="_blank"
            rel="noopener noreferrer"
            id="f10k-cta-btn-bottom"
            className="f10k-cta-btn"
          >
            Quiero unirme a la clase gratis
          </a>
        </section>
      </main>

      <footer className="f10k-footer">
        <p>2026 eCom Venezuela - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
