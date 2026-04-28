import React, { useState, useEffect, useCallback } from 'react';
import './Patrocinios.css';

// Import all images in order
import img1 from '../assets/patrocinios/1.png';
import img2Boton from '../assets/patrocinios/2 boton.png';
import img3 from '../assets/patrocinios/3.png';
import img4 from '../assets/patrocinios/4.png';
import img6 from '../assets/patrocinios/6.png';
import img8 from '../assets/patrocinios/8.png';
import img9 from '../assets/patrocinios/9.png';
import img13 from '../assets/patrocinios/13.png';
import img14 from '../assets/patrocinios/14.png';
import img15 from '../assets/patrocinios/15.png';
import img16 from '../assets/patrocinios/16.png';
import img17 from '../assets/patrocinios/17.png';
import img18_5 from '../assets/patrocinios/18.5.png';
import img19 from '../assets/patrocinios/19.png';

// Import carousel images
import esp1 from '../assets/patrocinios/espacios publicitarios/1.JPG';
import esp2 from '../assets/patrocinios/espacios publicitarios/2.JPG';
import esp3 from '../assets/patrocinios/espacios publicitarios/3.JPG';
import esp4 from '../assets/patrocinios/espacios publicitarios/4.JPG';
import esp5 from '../assets/patrocinios/espacios publicitarios/5.JPG';

// Logos marcas anteriores
import logoDHL from '../assets/marcas anteriores/DHL.png';
import logoTFHKA from '../assets/marcas anteriores/TFHKA AI LOGO-02.png';
import logoDropanas from '../assets/marcas anteriores/WhatsApp Image 2025-10-11 at 5.06.13 PM.png';
import logoAbuday from '../assets/marcas anteriores/abuday.png';
import logoCalidex from '../assets/marcas anteriores/calidex.png';
import logoCavecom from '../assets/marcas anteriores/cavecom-e.png';
import logoDropi from '../assets/marcas anteriores/dropi.png';
import logoGalanet from '../assets/marcas anteriores/galanet.png';
import logoKomvii from '../assets/marcas anteriores/komvii.png';
import logoNewEmprende from '../assets/marcas anteriores/newemprende horizontal.png';
import logoOferfly from '../assets/marcas anteriores/oferfly.png';
import logoPancakeMeta from '../assets/marcas anteriores/pancake & meta.png';
import logoR4 from '../assets/marcas anteriores/r4.png';
import logoSellibri from '../assets/marcas anteriores/sellibrí Horizontal - Blanco.png';
import logoZoom from '../assets/marcas anteriores/zoom.png';
import marcasConfiaronTitle from '../assets/STANDS/8.png';
import stand1Foto from '../assets/fotos/stands 1.jpeg';
import stand2Foto from '../assets/fotos/stands 2.jpeg';
import stand3Foto from '../assets/fotos/stands 3.jpeg';
import stand4Foto from '../assets/fotos/stands 4.jpeg';

const STANDS_PHOTOS = [stand1Foto, stand2Foto, stand3Foto, stand4Foto];

const ESPACIOS_PHOTOS = [esp1, esp2, esp3, esp4, esp5];

function CarouselEspacios() {
  const [current, setCurrent] = useState(0);
  const total = ESPACIOS_PHOTOS.length;

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="carousel-espacios-container">
      <div className="carousel-espacios-viewport">
        <div
          className="carousel-espacios-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {ESPACIOS_PHOTOS.map((src, i) => (
            <div className={`carousel-espacios-slide ${i === current ? 'active' : ''}`} key={i}>
              <img src={src} alt={`Espacio publicitario ${i + 1}`} className="carousel-espacios-img" />
            </div>
          ))}
        </div>

        <button className="carousel-espacios-btn prev-btn" onClick={prev} aria-label="Anterior">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <button className="carousel-espacios-btn next-btn" onClick={next} aria-label="Siguiente">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

        <div className="carousel-espacios-dots">
          {ESPACIOS_PHOTOS.map((_, i) => (
            <button
              key={i}
              className={`carousel-espacios-dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Ir a foto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CarouselMarcas() {
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
    <div className="marcas-carousel-container">
      <div className="marcas-carousel-viewport">
        <div
          className="marcas-carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {STANDS_PHOTOS.map((src, i) => (
            <div className={`marcas-carousel-slide ${i === current ? 'active-slide' : ''}`} key={i}>
              <img src={src} alt={`Stand anterior ${i + 1}`} className="marcas-carousel-photo" />
              <div className="marcas-carousel-overlay"></div>
            </div>
          ))}
        </div>

        <button className="marcas-carousel-btn prev-btn" onClick={prev} aria-label="Anterior">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <button className="marcas-carousel-btn next-btn" onClick={next} aria-label="Siguiente">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

        <div className="marcas-carousel-dots">
          {STANDS_PHOTOS.map((_, i) => (
            <button
              key={i}
              className={`marcas-carousel-dot ${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Ir a foto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const Patrocinios = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="patrocinios-page">
      <div className="patrocinios-container">
        <img src={img1} alt="Patrocinios 1" className="patrocinios-img patrocinios-img-small" />
        
        <a href="#contacto" className="patrocinios-btn-link" onClick={(e) => e.preventDefault()}>
          <img src={img2Boton} alt="Botón Patrocinios" className="patrocinios-img btn-img" />
        </a>

        <img src={img3} alt="Patrocinios 3" className="patrocinios-img patrocinios-img-small" />
        <img src={img4} alt="Patrocinios 4" className="patrocinios-img" />
      </div>

      <section id="nuestros-espacios" className="nuestros-espacios-section">
        <div className="patrocinios-container" style={{ gap: '10px' }}>
          <img src={img6} alt="Patrocinios 6" className="patrocinios-img nuestros-espacios-title" />
          <CarouselEspacios />
        </div>
      </section>

      <div className="patrocinios-container">
        <img src={img8} alt="Patrocinios 8" className="patrocinios-img patrocinios-img-tier" />
        <img src={img9} alt="Patrocinios 9" className="patrocinios-img" />
        <img src={img13} alt="Patrocinios 13" className="patrocinios-img patrocinios-img-tier" />
        <img src={img14} alt="Patrocinios 14" className="patrocinios-img" />
        <img src={img15} alt="Patrocinios 15" className="patrocinios-img" />
        <img src={img16} alt="Patrocinios 16" className="patrocinios-img" />
        <img src={img17} alt="Patrocinios 17" className="patrocinios-img" />
        <img src={img18_5} alt="Patrocinios 18.5" className="patrocinios-img" />
        <img src={img19} alt="Patrocinios 19" className="patrocinios-img" />
      </div>

      <section className="patrocinios-marcas-section">
        <div className="marcas-title-wrapper">
            <img src={marcasConfiaronTitle} alt="Marcas que han confiado" className="marcas-title-img" />
          </div>

          <CarouselMarcas />

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

    </div>
  );
};

export default Patrocinios;
