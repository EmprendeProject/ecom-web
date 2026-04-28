import React, { useState, useEffect, useCallback } from 'react';
import './Patrocinios.css';

// Import all images in order
import img1 from '../assets/patrocinios/1.png';
import img2Boton from '../assets/patrocinios/2 boton.png';
import img3 from '../assets/patrocinios/3.png';
import img4 from '../assets/patrocinios/4.png';
import img5 from '../assets/patrocinios/5.png';
import img6 from '../assets/patrocinios/6.png';
import img7 from '../assets/patrocinios/7.png';
import img8 from '../assets/patrocinios/8.png';
import img9 from '../assets/patrocinios/9.png';
import img10 from '../assets/patrocinios/10.png';
import img11 from '../assets/patrocinios/11.png';
import img12 from '../assets/patrocinios/12.png';
import img13 from '../assets/patrocinios/13.png';
import img14 from '../assets/patrocinios/14.png';
import img15 from '../assets/patrocinios/15.png';
import img16 from '../assets/patrocinios/16.png';
import img17 from '../assets/patrocinios/17.png';
import img18 from '../assets/patrocinios/18.png';
import img18_5 from '../assets/patrocinios/18.5.png';
import img19 from '../assets/patrocinios/19.png';
import img20 from '../assets/patrocinios/20.png';
import img21 from '../assets/patrocinios/21.png';

// Import carousel images
import esp1 from '../assets/patrocinios/espacios publicitarios/1.JPG';
import esp2 from '../assets/patrocinios/espacios publicitarios/2.JPG';
import esp3 from '../assets/patrocinios/espacios publicitarios/3.JPG';
import esp4 from '../assets/patrocinios/espacios publicitarios/4.JPG';
import esp5 from '../assets/patrocinios/espacios publicitarios/5.JPG';

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

const Patrocinios = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="patrocinios-page">
      <div className="patrocinios-container">
        <img src={img1} alt="Patrocinios 1" className="patrocinios-img patrocinios-img-1" />
        
        <a href="#contacto" className="patrocinios-btn-link" onClick={(e) => e.preventDefault()}>
          <img src={img2Boton} alt="Botón Patrocinios" className="patrocinios-img btn-img" />
        </a>

        <img src={img3} alt="Patrocinios 3" className="patrocinios-img" />
        <img src={img4} alt="Patrocinios 4" className="patrocinios-img" />
        <img src={img5} alt="Patrocinios 5" className="patrocinios-img" />
        <img src={img6} alt="Patrocinios 6" className="patrocinios-img" />
        <img src={img7} alt="Patrocinios 7" className="patrocinios-img" />

        <CarouselEspacios />

        <img src={img8} alt="Patrocinios 8" className="patrocinios-img" />
        <img src={img9} alt="Patrocinios 9" className="patrocinios-img" />
        <img src={img10} alt="Patrocinios 10" className="patrocinios-img" />
        <img src={img11} alt="Patrocinios 11" className="patrocinios-img" />
        <img src={img12} alt="Patrocinios 12" className="patrocinios-img" />
        <img src={img13} alt="Patrocinios 13" className="patrocinios-img" />
        <img src={img14} alt="Patrocinios 14" className="patrocinios-img" />
        <img src={img15} alt="Patrocinios 15" className="patrocinios-img" />
        <img src={img16} alt="Patrocinios 16" className="patrocinios-img" />
        <img src={img17} alt="Patrocinios 17" className="patrocinios-img" />
        <img src={img18} alt="Patrocinios 18" className="patrocinios-img" />
        <img src={img18_5} alt="Patrocinios 18.5" className="patrocinios-img" />
        <img src={img19} alt="Patrocinios 19" className="patrocinios-img" />
        <img src={img20} alt="Patrocinios 20" className="patrocinios-img" />
        
        {/* El botón / imagen final (21) */}
        <a href="#contacto" className="patrocinios-btn-link" onClick={(e) => e.preventDefault()}>
          <img src={img21} alt="Botón Final" className="patrocinios-img btn-img" />
        </a>
      </div>
    </div>
  );
};

export default Patrocinios;
