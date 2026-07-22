import React from 'react';
import Navbar from '../components/Navbar';
import './PdfViewer.css';

const PdfStands = () => {
  return (
    <div className="pdf-viewer-page">
      <Navbar />
      <main className="pdf-viewer-main">
        <div className="pdf-viewer-header">
          <h1 className="pdf-viewer-title">PACKS CORPORATIVOS</h1>
          <p className="pdf-viewer-subtitle">Conoce nuestras opciones exclusivas para empresas en ECOM 2026</p>
          <a
            href="/Ecom-PACKS-CORPORATIVOS.pdf"
            download="Ecom PACKS CORPORATIVOS.pdf"
            className="pdf-download-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Descargar PDF
          </a>
        </div>

        <div className="pdf-embed-wrapper">
          <iframe
            src="/Ecom-PACKS-CORPORATIVOS.pdf"
            title="Ecom PACKS CORPORATIVOS"
            className="pdf-iframe"
            type="application/pdf"
          />
        </div>
      </main>
    </div>
  );
};

export default PdfStands;
