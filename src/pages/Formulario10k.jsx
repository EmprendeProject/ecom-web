import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectLogo from '../assets/Elementos graficos/1.webp';
import tituloWebinar from '../assets/Elementos graficos/titulo webinar.webp';
import expertosImg from '../assets/Elementos graficos/expertos.webp';
import OptimizedImage from '../components/OptimizedImage';
import './Formulario10k.css';

const META_PIXEL_ID = '2204861446644503';

// Inicializa el stub de fbq (se puede llamar múltiples veces sin problema)
function initFbqStub() {
  if (window.fbq) return;
  const fbq = function() {
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
  };
  window.fbq = fbq;
  window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
}

export default function Formulario10k() {
  useEffect(() => {
    initFbqStub();

    // Inyectar el script solo si no está ya en el DOM
    const SCRIPT_ID = 'meta-pixel-script';
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      script.onload = () => {
        window.fbq('init', META_PIXEL_ID);
        window.fbq('track', 'PageView');
      };
      // Si el script falla en cargar, igual intentamos con el stub en cola
      script.onerror = () => {
        window.fbq('init', META_PIXEL_ID);
        window.fbq('track', 'PageView');
      };
      document.head.appendChild(script);
    } else {
      // Script ya cargado, solo trackear PageView
      window.fbq('track', 'PageView');
    }
  }, []);

  const handleCtaClick = () => {
    if (window.fbq) {
      window.fbq('track', 'Lead', { content_name: 'Clase Gratis 10k' });
    }
  };

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
          <OptimizedImage src={tituloWebinar} alt="Título Webinar" className="f10k-title-img" priority />
          <p className="f10k-subtitle">
            Cómo construir desde cero un negocio de ecommerce que genere tus primeros <strong>$10.000</strong> antes de que termine el 2026, vendiendo desde Venezuela.
          </p>
          <a
            href="https://wa.me/+584220282663?text=Quiero%20participar%20en%20la%20clase%20de%20ECOM"
            target="_blank"
            rel="noopener noreferrer"
            id="f10k-cta-btn"
            className="f10k-cta-btn"
            onClick={handleCtaClick}
          >
            Quiero unirme a la clase gratis
          </a>
        </section>

        <section className="f10k-card-wrapper">
          <div className="f10k-expertos-wrapper">
            <OptimizedImage src={expertosImg} alt="Expertos" className="f10k-expertos-img" />
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
                <strong>Selección de Producto Winner</strong>
                <span> Criterios clave para identificar un producto ganador de alta demanda y excelente margen de ganancia, incluso sin inventario ni experiencia previa.</span>
              </div>
            </div>
            <div className="f10k-benefit-item">
              <span className="f10k-benefit-num">2</span>
              <div className="f10k-benefit-body">
                <strong>Estrategia Comercial para Ventas Masivas</strong>
                <span> El paso a paso para armar una estructura de ventas clara y automatizada que te permita escalar y cerrar pedidos a diario por chat.</span>
              </div>
            </div>
            <div className="f10k-benefit-item">
              <span className="f10k-benefit-num">3</span>
              <div className="f10k-benefit-body">
                <strong>Sistema de Monetización en Bolívares y Dólares</strong>
                <span> Conocerás la estructura exacta para cobrar de forma ágil y generar tus primeros ingresos vendiendo productos físicos por internet, aceptando Pago Móvil o divisas sin complicaciones.</span>
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
            onClick={handleCtaClick}
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
