import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import logoEcom from '../assets/Elementos graficos/LOGO ECOM.webp';
import './Cronograma.css';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SCHEDULE = {
  1: [
    { id: 'd1-3',  time: '10:10 am', room: 'Salón Ecom',   speaker: 'Richard Ujueta',                             category: 'ECOMMERCE',    title: 'La economía digital venezolana como factor exponencial del creciente productivo y de los servicios del país.' },
    { id: 'd1-4',  time: '10:10 am', room: 'Salón Escala', speaker: 'Iñaki Umerez',                               category: 'STARTUP',      title: 'DE LA IDEA A MÁS DE 100.000 USUARIOS: Claves de escala, finanzas y ejecución.' },
    { id: 'd1-5',  time: '10:40 am', room: 'Salón Ecom',   speaker: 'Hugo Pino',                                  category: 'CRYPTO',       title: 'Lo que hacen los eCommerce del 1% que ganan (mucho) dinero' },
    { id: 'd1-6',  time: '10:40 am', room: 'Salón Escala', speaker: 'Jean Iovino',                                category: 'IA',           title: 'Como innovar en un mundo donde todo es IA y RRSS' },
    { id: 'd1-7',  time: '11:10 am', room: 'Salón Ecom',   speaker: 'DROPI: Andrea Mariño y Jenny Collazos',      category: 'ECOMMERCE',    title: 'La infraestructura detrás del e-commerce en Latinoamérica' },
    { id: 'd1-8',  time: '11:10 am', room: 'Salón Escala', speaker: 'Joco Gonzales',                              category: 'IA',           title: 'Hiper-personalización con Inteligencia Artificial' },
    { id: 'd1-9',  time: '11:40 am', room: 'Salón Ecom',   speaker: 'Ivanna Valentina',                           category: 'CONTENIDO',    title: 'Virality - Los 5 pasos para un video viral' },
    { id: 'd1-10', time: '11:40 am', room: 'Salón Escala', speaker: 'Carlos Ecomplus',                            category: 'IA',           title: 'De cero a 30 ventas al día con inteligencia artificial' },
    { id: 'd1-11', time: '12:30 pm', room: 'Salón Ecom',   speaker: 'RECESO',                                     category: 'EVENTO',       title: 'Break' },
    { id: 'd1-12', time: '12:30 pm', room: 'Salón Escala', speaker: 'Sebas Adsurdo · Santiago Cruz · Andrea Petit', category: 'PANEL',      title: 'ADS: La guía para hacer anuncios en META ADS', panel: true },
    { id: 'd1-13', time: '1:45 pm',  room: 'Salón Ecom',   speaker: 'Arianna Lupi',                               category: 'ECOMMERCE',    title: 'Como hacer que tu tienda aparezca en la IA y en Google' },
    { id: 'd1-14', time: '1:45 pm',  room: 'Salón Escala', speaker: 'Dropanas',                                   category: 'DROPSHIPPING', title: 'Dropshipping en Venezuela: El Paso a Paso para Hacerlo Posible' },
    { id: 'd1-15', time: '2:30 pm',  room: 'Salón Ecom',   speaker: 'Unidigital: Corina Cedeño',                  category: 'FINANZAS',     title: 'Miedo vs. Realidad: Cómo transformar la obligación de la facturación digital en la armadura de tu negocio.' },
    { id: 'd1-16', time: '2:30 pm',  room: 'Salón Escala', speaker: 'Patricia Bastidas',                          category: 'MARKETING',    title: 'Que es un estratega digital y porque gana +$1.000 por proyecto' },
    { id: 'd1-17', time: '3:00 pm',  room: 'Salón Ecom',   speaker: 'Jesus Gomez',                                category: 'ECOMMERCE',    title: 'No vine a dar una conferencia. VINE A PAGAR UNA DEUDA.' },
    { id: 'd1-18', time: '3:00 pm',  room: 'Salón Escala', speaker: 'Heiberg Castellanos',                        category: 'FINANZAS',     title: 'Facturar no es ganar: Las bases financieras del negocio digital' },
    { id: 'd1-19', time: '3:40 pm',  room: 'Salón Ecom',   speaker: 'Juan Silva',                                 category: 'IA',           title: 'Revolución de las ventas con IA Conversacional' },
    { id: 'd1-20', time: '3:40 pm',  room: 'Salón Escala', speaker: 'Sellibri: José Baldó',                       category: 'ECOMMERCE',    title: 'Comercio sin límites' },
    { id: 'd1-21', time: '4:20 pm',  room: 'Salón Ecom',   speaker: 'RECESO',                                     category: 'EVENTO',       title: 'Break' },
    { id: 'd1-22', time: '4:20 pm',  room: 'Salón Escala', speaker: 'Mateo Costa',                                category: 'ECOMMERCE',    title: 'Como duplicar tu facturación sin invertir más en anuncios' },
    { id: 'd1-23', time: '5:15 pm',  room: 'Salón Ecom',   speaker: 'Rapero Marketero',                           category: 'IA',           title: 'IA QUE VENDE — Cómo usar IA en todo el proceso para vender más en menos tiempo' },
    { id: 'd1-24', time: '5:15 pm',  room: 'Salón Escala', speaker: 'ChateaPRO',                                  category: 'VENTAS',       title: 'Vende como las Grandes Ligas: automatiza tu operación con Chatea Pro' },
    { id: 'd1-25', time: '5:50 pm',  room: 'Salón Ecom',   speaker: 'Mauricio Cuevas',                            category: 'IA',           title: 'Ventas infinitas por WhatsApp, como vender de forma recurrente sin que te bloqueen' },
    { id: 'd1-26', time: '6:00 pm',  room: 'Salón Escala', speaker: 'RECESO',                                     category: 'EVENTO',       title: 'Cierre del Salón Escala' },
    { id: 'd1-27', time: '6:30 pm',  room: 'Salón Ecom',   speaker: 'Manuel Trejo',                               category: 'VENTAS',       title: 'Persuade MATCH' },
  ],
  2: [
    { id: 'd2-1',  time: '8:20 am',  room: 'Salón Escala', speaker: 'MASTERMIND PRIVADO',                         category: 'MASTERMIND',   title: 'Mastermind Privada #2 — Sesión cerrada' },
    { id: 'd2-2',  time: '9:20 am',  room: 'Salón Escala', speaker: 'MASTERMIND PRIVADO',                         category: 'MASTERMIND',   title: 'Mastermind Privada #1 — Sesión cerrada' },
    { id: 'd2-4',  time: '10:10 am', room: 'Salón Ecom',   speaker: 'Paola Alvarado',                             category: 'MARKETING',    title: 'MARKETING QUE SÍ VENDE — Cómo construir una marca que todo un país quiere comprar' },
    { id: 'd2-5',  time: '10:10 am', room: 'Salón Escala', speaker: 'Roosevelt Rodríguez',                        category: 'ECOMMERCE',    title: 'MARCAS DE ECOMMERCE SIN FRONTERAS' },
    { id: 'd2-6',  time: '10:50 am', room: 'Salón Ecom',   speaker: 'RICARDO IV MONTILLA R4',                     category: 'FINANZAS',     title: 'Soluciones de cobro para el comercio electrónico' },
    { id: 'd2-7',  time: '10:50 am', room: 'Salón Escala', speaker: 'Leocontraeltiempo',                          category: 'ECOMMERCE',    title: 'EL E-COMMERCE NO ESPERA — Deja de buscar el momento perfecto y empieza a construir.' },
    { id: 'd2-8',  time: '11:20 am', room: 'Salón Ecom',   speaker: 'Alfonso Blasini',                            category: 'IMPORTACIÓN',  title: 'Importación de China con Inteligencia Artificial' },
    { id: 'd2-9',  time: '11:20 am', room: 'Salón Escala', speaker: 'Faiders Altamar',                            category: 'ECOMMERCE',    title: 'Nicho Black: Gana dinero donde otros solo ven restricciones' },
    { id: 'd2-10', time: '12:00 pm', room: 'Salón Ecom',   speaker: 'Miguel Hernandez',                           category: 'ECOMMERCE',    title: 'Como ChateaPro cambió mi vida en 3 pasos' },
    { id: 'd2-11', time: '12:00 pm', room: 'Salón Escala', speaker: 'CALIDEX',                                    category: 'LOGÍSTICA',    title: 'Logística de Colombia a Venezuela. una marca en el tiempo' },
    { id: 'd2-12', time: '12:30 pm', room: 'Salón Ecom',   speaker: 'Victoria Poggioli',                          category: 'MARKETING',    title: 'Organiza y crece: 5 pasos para estructurar tu marca, dejar de improvisar y empezar a escalar.' },
    { id: 'd2-13', time: '12:30 pm', room: 'Salón Escala', speaker: 'Yvan Bohorquez · Joco Gonzales · Carlos Rojas · Angel Rodríguez', category: 'PANEL', title: 'IA SIN FILTROS', panel: true },
    { id: 'd2-14', time: '1:10 pm',  room: 'Salón Ecom',   speaker: 'RECESO',                                     category: 'EVENTO',       title: 'Break' },
    { id: 'd2-15', time: '1:45 pm',  room: 'Salón Ecom',   speaker: 'Gabo y Santiago',                            category: 'ADS',          title: 'Como armar tu suite de IA para vender en redes sociales' },
    { id: 'd2-16', time: '1:45 pm',  room: 'Salón Escala', speaker: 'ZOOM: Carlos Atencio',                       category: 'LOGÍSTICA',    title: 'ZOOM más allá de la entrega: tecnología que mueve al eCommerce venezolano.' },
    { id: 'd2-17', time: '2:30 pm',  room: 'Salón Ecom',   speaker: 'Santiago Cruz',                              category: 'ECOMMERCE',    title: 'Lo que aprendí vendiendo $1 millón de dólares al mes antes de los 25 años' },
    { id: 'd2-18', time: '2:30 pm',  room: 'Salón Escala', speaker: 'Pierina Rivas',                              category: 'MARKETING',    title: 'PIEDRA, PAPEL O VENTA — Las piezas que hacen que vender ya no dependa de la suerte.' },
    { id: 'd2-19', time: '3:10 pm',  room: 'Salón Ecom',   speaker: 'THE FACTORY HKA',                            category: 'ECOMMERCE',    title: 'Factura, Automatiza y Escala: El motor definitivo para tu Ecommerce en Venezuela.' },
    { id: 'd2-20', time: '3:10 pm',  room: 'Salón Escala', speaker: 'Jesus Camacho',                              category: 'MARKETING',    title: 'El Efecto Iceberg: como convertir lo que sabes en 20k/mes desde Venezuela' },
    { id: 'd2-21', time: '3:40 pm',  room: 'Salón Ecom',   speaker: 'Andrea Petit',                               category: 'ADS',          title: 'ROADS: el mapa hacia la rentabilidad de tus ads en Venezuela' },
    { id: 'd2-22', time: '3:40 pm',  room: 'Salón Escala', speaker: 'Apolo Pay: Daniel Peláez',                   category: 'FINANZAS',     title: 'COMO REDUCIR LA FRICCIÓN DE PAGO EN EL ECOMMERCE VENEZOLANO' },
    { id: 'd2-23', time: '4:20 pm',  room: 'Salón Ecom',   speaker: 'RECESO',                                     category: 'EVENTO',       title: 'Break' },
    { id: 'd2-24', time: '4:20 pm',  room: 'Salón Escala', speaker: 'Juan Balza',                                 category: 'MARKETING',    title: 'Convierte tu marketing en un proceso que realmente Posicione y Venda' },
    { id: 'd2-25', time: '5:15 pm',  room: 'Salón Ecom',   speaker: 'Luis Alvarez',                               category: 'IA',           title: 'Como tener un ejército de vendedores en WhatsApp' },
    { id: 'd2-26', time: '5:15 pm',  room: 'Salón Escala', speaker: 'Luis Manuel Díaz',                           category: 'IA',           title: 'Cómo frenar la fuga de clientes y escalar tus ventas con Agentes de IA en WhatsApp e Instagram' },
    { id: 'd2-27', time: '5:45 pm',  room: 'Salón Ecom',   speaker: 'Roosevelt Rodríguez · Faiders Altamar · Leonardo Franco · Mateo Costa', category: 'PANEL', title: 'Como vivir del Ecommerce en Todo Latam', panel: true },
    { id: 'd2-28', time: '6:00 pm',  room: 'Salón Escala', speaker: 'RECESO',                                     category: 'EVENTO',       title: 'Cierre del Salón Escala' },
    { id: 'd2-29', time: '6:30 pm',  room: 'Salón Ecom',   speaker: 'Adriana Felisolas',                          category: 'IMPORTACIÓN',  title: 'Cómo hacer dinero importando desde China' },
  ],
};

const CATEGORIES = ['TODAS','ECOMMERCE','IA','MARKETING','VENTAS','FINANZAS','ADS','LOGÍSTICA','IMPORTACIÓN','STARTUP','CONTENIDO','DROPSHIPPING','CRYPTO','PANEL','MASTERMIND','EVENTO'];

const CAT_COLORS = {
  ECOMMERCE:    { bg: 'rgba(139,92,246,0.25)',  border: '#8b5cf6', text: '#c4b5fd' },
  IA:           { bg: 'rgba(236,72,153,0.2)',   border: '#ec4899', text: '#f9a8d4' },
  MARKETING:    { bg: 'rgba(99,102,241,0.25)',  border: '#6366f1', text: '#a5b4fc' },
  VENTAS:       { bg: 'rgba(245,158,11,0.2)',   border: '#d97706', text: '#fcd34d' },
  FINANZAS:     { bg: 'rgba(16,185,129,0.2)',   border: '#10b981', text: '#6ee7b7' },
  ADS:          { bg: 'rgba(239,68,68,0.2)',    border: '#ef4444', text: '#fca5a5' },
  LOGÍSTICA:    { bg: 'rgba(14,165,233,0.2)',   border: '#0ea5e9', text: '#7dd3fc' },
  IMPORTACIÓN:  { bg: 'rgba(251,146,60,0.2)',   border: '#f97316', text: '#fdba74' },
  STARTUP:      { bg: 'rgba(168,85,247,0.25)',  border: '#a855f7', text: '#d8b4fe' },
  CONTENIDO:    { bg: 'rgba(219,39,119,0.2)',   border: '#db2777', text: '#f9a8d4' },
  DROPSHIPPING: { bg: 'rgba(52,211,153,0.2)',   border: '#34d399', text: '#6ee7b7' },
  CRYPTO:       { bg: 'rgba(251,191,36,0.2)',   border: '#f59e0b', text: '#fde68a' },
  PANEL:        { bg: 'rgba(6,182,212,0.2)',    border: '#06b6d4', text: '#67e8f9' },
  MASTERMIND:   { bg: 'rgba(167,139,250,0.3)',  border: '#a78bfa', text: '#ede9fe' },
  EVENTO:       { bg: 'rgba(100,116,139,0.2)',  border: '#64748b', text: '#cbd5e1' },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function parseTime(t) {
  const m = t.match(/(\d+):(\d+)\s*(am|pm)/i);
  if (!m) return 0;
  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  const p = m[3].toLowerCase();
  if (p === 'pm' && h !== 12) h += 12;
  if (p === 'am' && h === 12) h = 0;
  return h * 60 + min;
}

const EV_S1 = new Date('2026-09-26T10:00:00-04:00');
const EV_E1 = new Date('2026-09-26T20:00:00-04:00');
const EV_S2 = new Date('2026-09-27T09:50:00-04:00');
const EV_E2 = new Date('2026-09-27T17:30:00-04:00');

function getStatus(session, day) {
  const now = new Date();
  const es = day === 1 ? EV_S1 : EV_S2;
  const ee = day === 1 ? EV_E1 : EV_E2;
  if (now < es || now > ee) return 'normal';
  const base = day === 1 ? '2026-09-26' : '2026-09-27';
  const start = new Date(`${base}T00:00:00-04:00`);
  start.setMinutes(start.getMinutes() + parseTime(session.time));
  const end = new Date(start.getTime() + 30 * 60000);
  if (now >= start && now < end) return 'live';
  if (now < start) return 'next';
  return 'done';
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function CatBadge({ category }) {
  const c = CAT_COLORS[category] || CAT_COLORS.EVENTO;
  return (
    <span className="cat-badge" style={{ background: c.bg, borderColor: c.border, color: c.text }}>
      {category}
    </span>
  );
}

function StatusPill({ status }) {
  if (status === 'live') return <span className="status-live"><span className="pulse-dot" />EN VIVO</span>;
  if (status === 'next') return <span className="status-next">SIGUIENTE</span>;
  if (status === 'done') return <span className="status-done">FINALIZADA</span>;
  return null;
}

function ConfCard({ session, status, onClick }) {
  const isBreak = session.speaker === 'RECESO';
  const isMaster = session.category === 'MASTERMIND';
  const isPanel  = session.panel === true;

  if (isBreak) {
    return (
      <div className="conf-card break-card">
        <span>{session.title}</span>
      </div>
    );
  }

  const speakers = isPanel ? session.speaker.split(' · ') : null;

  return (
    <button
      className={`conf-card${status === 'live' ? ' card-live' : ''}${status === 'done' ? ' card-done' : ''}${isMaster ? ' card-master' : ''}${isPanel ? ' card-panel' : ''}`}
      onClick={() => onClick(session)}
    >
      <div className="card-top-row">
        {isPanel ? (
          <div className="card-speakers-panel">
            {speakers.map((s, i) => <span key={i} className="panel-speaker-name">{s}</span>)}
          </div>
        ) : (
          <span className="card-speaker">{session.speaker}</span>
        )}
        <StatusPill status={status} />
      </div>
      <p className="card-title">{session.title}</p>
      <div className="card-bottom-row">
        <CatBadge category={session.category} />
        {isPanel && <span className="panel-badge">🎙 CONVERSATORIO</span>}
      </div>
    </button>
  );
}

// ─── SESSION MODAL ─────────────────────────────────────────────────────────────
function SessionModal({ session, day, agenda, onToggle, onClose }) {
  const status = getStatus(session, day);
  const saved = agenda.includes(session.id);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', h);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">✕</button>
        <div className="modal-badges">
          <CatBadge category={session.category} />
          <StatusPill status={status} />
        </div>
        <h2 className="modal-speaker">{session.speaker}</h2>
        <p className="modal-title-text">"{session.title}"</p>
        <div className="modal-meta">
          <span>🕐 {session.time}</span>
          <span>📍 {session.room}</span>
        </div>
        <button
          className={`btn-add-agenda${saved ? ' saved' : ''}`}
          onClick={() => onToggle(session.id)}
        >
          {saved ? '✅ EN MI AGENDA' : '⭐ AGREGAR A MI AGENDA'}
        </button>
      </div>
    </div>
  );
}

// ─── MY AGENDA PANEL ──────────────────────────────────────────────────────────
function AgendaPanel({ agenda, onRemove, onOpen, onClose }) {
  const all = [...SCHEDULE[1], ...SCHEDULE[2]];
  const saved = all.filter(s => agenda.includes(s.id));

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="agenda-panel" onClick={e => e.stopPropagation()}>
        <div className="agenda-panel-hdr">
          <h3>⭐ Mi Agenda</h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        {saved.length === 0 ? (
          <div className="agenda-empty">
            <p>Aún no has guardado conferencias.</p>
            <p>Haz click en cualquier sesión y presiona <strong>⭐ Agregar a mi agenda</strong>.</p>
          </div>
        ) : (
          <div className="agenda-list">
            {saved.map(s => (
              <div key={s.id} className="agenda-item">
                <button className="agenda-item-body" onClick={() => onOpen(s)}>
                  <span className="ag-time">{s.time}</span>
                  <div className="ag-info">
                    <span className="ag-speaker">{s.speaker}</span>
                    <span className="ag-ttl">{s.title}</span>
                    <CatBadge category={s.category} />
                  </div>
                </button>
                <button className="agenda-remove" onClick={() => onRemove(s.id)} aria-label="Eliminar">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Cronograma() {
  const [day, setDay] = useState(1);
  const [cat, setCat] = useState('TODAS');
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(null);
  const [showAgenda, setShowAgenda] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [agenda, setAgenda] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ecom_agenda') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('ecom_agenda', JSON.stringify(agenda));
  }, [agenda]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const toggleAgenda = useCallback((id) => {
    setAgenda(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  }, []);

  const sessions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCHEDULE[day].filter(s => {
      const catOk = cat === 'TODAS' || s.category === cat;
      const qOk = !q || s.speaker.toLowerCase().includes(q) || s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [day, cat, query]);

  const times = useMemo(() => {
    const ts = [...new Set(sessions.map(s => s.time))];
    return ts.sort((a, b) => parseTime(a) - parseTime(b));
  }, [sessions]);

  const byTime = useMemo(() => {
    const map = {};
    times.forEach(t => {
      map[t] = {
        ecom:   sessions.find(s => s.time === t && s.room === 'Salón Ecom'),
        escala: sessions.find(s => s.time === t && s.room === 'Salón Escala'),
      };
    });
    return map;
  }, [times, sessions]);

  const openModal = useCallback(s => { setModal(s); setShowAgenda(false); }, []);

  const [dayFade, setDayFade] = useState(true);
  const switchDay = useCallback((d) => {
    if (d === day) return;
    setDayFade(false);
    setTimeout(() => { setDay(d); setDayFade(true); }, 180);
  }, [day]);

  const ecomCount   = useMemo(() => sessions.filter(s => s.room === 'Salón Ecom'   && s.speaker !== 'RECESO').length, [sessions]);
  const escalaCount = useMemo(() => sessions.filter(s => s.room === 'Salón Escala' && s.speaker !== 'RECESO').length, [sessions]);

  const dayMeta = day === 1
    ? { weekday: 'SÁBADO', hours: 'horario de 9:00 am a 8:00 pm', label: 'DÍA 1', date: '26 SEP 2026' }
    : { weekday: 'DOMINGO', hours: 'horario de 9:00 am a 8:00 pm', label: 'DÍA 2', date: '27 SEP 2026' };

  return (
    <div className="cr-root">

      {/* STICKY NAV */}
      <nav className={`cr-nav${scrolled ? ' cr-nav-scrolled' : ''}`}>
        <div className="cr-nav-inner">
          <Link to="/" className="cr-brand">
            <img src={logoEcom} alt="ECOM Venezuela" className="nav-logo" />
            <span className="brand-sep" />
            <span className="brand-sub">PROGRAMACIÓN</span>
          </Link>
          <button
            className={`nav-agenda-btn${agenda.length > 0 ? ' has-items' : ''}`}
            onClick={() => setShowAgenda(true)}
          >
            ⭐ MI AGENDA
            {agenda.length > 0 && <span className="agenda-badge">{agenda.length}</span>}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="cr-hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="cr-hero-content">
          <h1 className="hero-title">PROGRAMACIÓN</h1>
          <p className="hero-hours">{dayMeta.weekday} {dayMeta.hours}</p>
          <p className="hero-daylabel">{dayMeta.label} · {dayMeta.date}</p>

          <div className="day-switcher">
            <button className={`day-sw-btn${day === 1 ? ' active' : ''}`} onClick={() => switchDay(1)}>
              <span className="dsw-main">SÁBADO</span>
              <span className="dsw-sub">DÍA 1 · 26 SEP</span>
            </button>
            <button className={`day-sw-btn${day === 2 ? ' active' : ''}`} onClick={() => switchDay(2)}>
              <span className="dsw-main">DOMINGO</span>
              <span className="dsw-sub">DÍA 2 · 27 SEP</span>
            </button>
          </div>
        </div>
      </header>

      {/* CONTROLS */}
      <section className="cr-controls">
        <div className="search-filter-row">
          <div className="search-box">
            <span className="search-ico">🔍</span>
            <input
              className="search-inp"
              type="text"
              placeholder="Buscar ponente o conferencia..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && <button className="search-x" onClick={() => setQuery('')}>✕</button>}
          </div>
          <button
            className={`filter-toggle-btn${showFilters ? ' active' : ''}${cat !== 'TODAS' ? ' has-filter' : ''}`}
            onClick={() => setShowFilters(v => !v)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            FILTRAR
            {cat !== 'TODAS' && <span className="filter-active-dot" />}
          </button>
        </div>

        {showFilters && (
          <div className="filters-dropdown">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`f-pill${cat === c ? ' active' : ''}`}
                onClick={() => { setCat(c); setShowFilters(false); }}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* SCHEDULE */}
      <section className="cr-schedule">
        {/* Column headers */}
        <div className="sched-header">
          <div className="sh-hora">HORA</div>
          <div className="sh-ecom">
            <span className="sh-dot dot-e" />
            SALÓN ECOM
            {ecomCount > 0 && <span className="sh-count">{ecomCount} sesiones</span>}
          </div>
          <div className="sh-escala">
            <span className="sh-dot dot-s" />
            SALÓN ESCALA
            {escalaCount > 0 && <span className="sh-count">{escalaCount} sesiones</span>}
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className={`sched-desktop${dayFade ? ' day-visible' : ' day-hidden'}`}>
          {times.length === 0 && <p className="no-results">Sin resultados para tu búsqueda.</p>}
          {times.map(t => {
            const slot = byTime[t];
            const se = slot.ecom   ? getStatus(slot.ecom,   day) : 'normal';
            const ss = slot.escala ? getStatus(slot.escala, day) : 'normal';
            const rowLive = se === 'live' || ss === 'live';
            return (
              <div key={t} className={`sched-row${rowLive ? ' row-live' : ''}`}>
                <div className="row-time"><span className="time-txt">{t}</span></div>
                <div className="row-ecom">
                  {slot.ecom ? <ConfCard session={slot.ecom} status={se} onClick={openModal} /> : <div className="empty-cell" />}
                </div>
                <div className="row-escala">
                  {slot.escala ? <ConfCard session={slot.escala} status={ss} onClick={openModal} /> : <div className="empty-cell" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE STACK */}
        <div className={`sched-mobile${dayFade ? ' day-visible' : ' day-hidden'}`}>
          {times.length === 0 && <p className="no-results">Sin resultados para tu búsqueda.</p>}
          {times.map(t => {
            const slot = byTime[t];
            const se = slot.ecom   ? getStatus(slot.ecom,   day) : 'normal';
            const ss = slot.escala ? getStatus(slot.escala, day) : 'normal';
            return (
              <div key={t} className="mob-block">
                <div className="mob-time">{t}</div>
                {slot.ecom && (
                  <div className="mob-room">
                    <div className="mob-room-tag mob-tag-e"><span className="sh-dot dot-e" />SALÓN ECOM</div>
                    <ConfCard session={slot.ecom} status={se} onClick={openModal} />
                  </div>
                )}
                {slot.escala && (
                  <div className="mob-room">
                    <div className="mob-room-tag mob-tag-s"><span className="sh-dot dot-s" />SALÓN ESCALA</div>
                    <ConfCard session={slot.escala} status={ss} onClick={openModal} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cr-footer">
        <img src={logoEcom} alt="ECOM Venezuela" className="footer-logo" />
        <p className="footer-copy">© 2026 ECOM Venezuela · Todos los derechos reservados</p>
        <p className="footer-note">La programación está sujeta a cambios sin previo aviso.</p>
      </footer>

      {/* MODALS */}
      {modal && (
        <SessionModal
          session={modal}
          day={day}
          agenda={agenda}
          onToggle={toggleAgenda}
          onClose={() => setModal(null)}
        />
      )}
      {showAgenda && (
        <AgendaPanel
          agenda={agenda}
          onRemove={id => setAgenda(p => p.filter(x => x !== id))}
          onOpen={s => { setModal(s); setShowAgenda(false); }}
          onClose={() => setShowAgenda(false)}
        />
      )}
    </div>
  );
}
