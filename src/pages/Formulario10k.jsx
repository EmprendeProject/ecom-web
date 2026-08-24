import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import projectLogo from '../assets/Elementos graficos/1.png';
import tituloWebinar from '../assets/Elementos graficos/titulo webinar.png';
import './Formulario10k.css';

const WHATSAPP_LINK = 'https://chat.whatsapp.com/'; // Reemplaza con tu enlace real

function CheckIcon() {
  return (
    <svg className="f10k-success-icon" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="25" stroke="#b14cf7" strokeWidth="2" />
      <path d="M14 27l8 8 16-16" stroke="#b14cf7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Formulario10k() {
  const [form, setForm] = useState({
    telefono: '+58',
    correo: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const newErrors = {};
    if (!form.telefono.trim() || form.telefono.trim() === '+58') {
      newErrors.telefono = 'El numero es requerido';
    } else if (!/^\+?[\d\s\-()]{7,20}$/.test(form.telefono.trim())) {
      newErrors.telefono = 'Ingresa un numero valido';
    }
    if (!form.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo.trim())) {
      newErrors.correo = 'Ingresa un correo valido';
    }
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);

    // Simulated submission — replace with Google Sheets / Airtable API call
    await new Promise(res => setTimeout(res, 1500));

    setLoading(false);
    setSubmitted(true);

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: 'Formulario10k',
        content_category: 'WhatsApp Launch',
      });
    }
  }

  return (
    <div className="f10k-page">
      <header className="f10k-header">
        <Link to="/" className="f10k-logo-link" aria-label="Volver al inicio">
          <img src={projectLogo} alt="eCom 2026 logo" className="f10k-logo" />
        </Link>
      </header>

      <main className="f10k-main">
        <div className="f10k-glow f10k-glow-1" aria-hidden="true" />
        <div className="f10k-glow f10k-glow-2" aria-hidden="true" />

        <section className="f10k-hero">

          <img src={tituloWebinar} alt="Título Webinar" className="f10k-title-img" />
          <p className="f10k-subtitle">
            Cómo construir desde cero un negocio de ecommerce que genere tus primeros <strong>$10.000</strong> antes de que termine el 2026, vendiendo desde Venezuela.
          </p>

        </section>

        <section className="f10k-card-wrapper">
          <div className="f10k-card">
            {!submitted ? (
              <>
                <h2 className="f10k-card-title">Reserva tu lugar ahora</h2>
                <p className="f10k-card-desc">Completa el formulario y nos ponemos en contacto contigo.</p>

                <form className="f10k-form" onSubmit={handleSubmit} noValidate>

                  {/* Telefono */}
                  <div className={`f10k-field${errors.telefono ? ' f10k-field--error' : ''}`}>
                    <label className="f10k-label" htmlFor="f10k-telefono">
                      Numero de WhatsApp <span className="f10k-required">*</span>
                    </label>
                    <div className="f10k-input-wrap">
                      <span className="f10k-input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.67a16 16 0 0 0 6 6l.82-.82a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16.92z"/></svg>
                      </span>
                      <input id="f10k-telefono" className="f10k-input" type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+58 412 000 0000" autoComplete="tel" />
                    </div>
                    {errors.telefono && <span className="f10k-error-msg">{errors.telefono}</span>}
                  </div>

                  {/* Correo */}
                  <div className={`f10k-field${errors.correo ? ' f10k-field--error' : ''}`}>
                    <label className="f10k-label" htmlFor="f10k-correo">
                      Correo electronico <span className="f10k-required">*</span>
                    </label>
                    <div className="f10k-input-wrap">
                      <span className="f10k-input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      </span>
                      <input id="f10k-correo" className="f10k-input" type="email" name="correo" value={form.correo} onChange={handleChange} placeholder="tucorreo@ejemplo.com" autoComplete="email" />
                    </div>
                    {errors.correo && <span className="f10k-error-msg">{errors.correo}</span>}
                  </div>

                  <button id="f10k-submit-btn" type="submit" className="f10k-submit-btn" disabled={loading}>
                    {loading ? (
                      <span className="f10k-spinner" />
                    ) : (
                      <>
                        <svg className="f10k-btn-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.12 1.524 5.855L0 24l6.341-1.498A11.933 11.933 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                        Quiero unirme al grupo
                      </>
                    )}
                  </button>

                  <p className="f10k-disclaimer">
                    Tus datos estan seguros. Solo los usaremos para anadirte al grupo de WhatsApp.
                  </p>
                </form>
              </>
            ) : (
              <div className="f10k-success">
                <CheckIcon />
                <h2 className="f10k-success-title">Ya casi estas dentro!</h2>
                <p className="f10k-success-text">
                  Recibimos tu informacion. En breve te anadiremos al grupo privado de WhatsApp donde recibiras todo sobre el lanzamiento de <strong>ECOM 2026</strong>.
                </p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="f10k-whatsapp-cta" id="f10k-whatsapp-join-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.12 1.524 5.855L0 24l6.341-1.498A11.933 11.933 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                  Unirme al grupo ahora
                </a>
                <Link to="/" className="f10k-home-link">Volver al inicio</Link>
              </div>
            )}
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
      </main>

      <footer className="f10k-footer">
        <p>2026 eCom Venezuela - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
