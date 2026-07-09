import React, { useEffect, useState } from 'react';
import './ComunicadoModal.css';
import comunicadoImg from '../assets/Elementos graficos/COMUNICADO.png';

export default function ComunicadoModal({ onClose }) {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Trigger transition on mount
    const timer = setTimeout(() => setIsRendered(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseTransition = () => {
    setIsRendered(false);
    setTimeout(() => {
      onClose();
    }, 300); // match transition duration
  };

  return (
    <div
      className={`comunicado-overlay ${isRendered ? 'active' : ''}`}
      onClick={handleCloseTransition}
      role="dialog"
      aria-modal="true"
      aria-labelledby="comunicado-title"
    >
      <div
        className={`comunicado-container ${isRendered ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="comunicado-close-top"
          onClick={handleCloseTransition}
          aria-label="Cerrar comunicado"
        >
          &times;
        </button>

        <h2 id="comunicado-title" className="sr-only">Comunicado Importante</h2>

        <div className="comunicado-content">
          <img
            src={comunicadoImg}
            alt="Comunicado Oficial ECOM 2026"
            className="comunicado-image"
          />
        </div>

        <button
          type="button"
          className="comunicado-close-btn"
          onClick={handleCloseTransition}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
