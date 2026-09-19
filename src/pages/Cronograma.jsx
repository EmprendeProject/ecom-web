import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Cronograma.css';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SCHEDULE = {
  1: [
    { id: 'd1-1',  time: '9:50 am',  room: 'Salón Ecom',   speaker: 'Host #1',                              category: 'EVENTO',       title: 'Apertura del evento' },
    { id: 'd1-2',  time: '9:50 am',  room: 'Salón Escala', speaker: 'Host #2',                              category: 'EVENTO',       title: 'Apertura del evento' },
    { id: 'd1-3',  time: '10:10 am', room: 'Salón Ecom',   speaker: 'Richard Ujueta',                       category: 'ECOMMERCE',    title: 'La economía digital venezolana como factor exponencial del creciente productivo y de los servicios del país.' },
    { id: 'd1-4',  time: '10:10 am', room: 'Salón Escala', speaker: 'Iñaki Umerez',                         category: 'STARTUP',      title: 'DE LA IDEA A MÁS DE 100.000 USUARIOS: Claves de escala, finanzas y ejecución.' },
    { id: 'd1-5',  time: '10:40 am', room: 'Salón Ecom',   speaker: 'Hugo Pino',                            category: 'CRYPTO',       title: 'Lo que hacen los eCommerce del 1% que ganan (mucho) dinero' },
    { id: 'd1-6',  time: '10:40 am', room: 'Salón Escala', speaker: 'Jean Iovino',                          category: 'IA',           title: 'Como innovar en un mundo donde todo es IA y RRSS' },
    { id: 'd1-7',  time: '11:10 am', room: 'Salón Ecom',   speaker: 'DROPI: Andrea Mariño y Jenny Collazos',category: 'ECOMMERCE',    title: 'La infraestructura detrás del e-commerce en Latinoamérica' },
    { id: 'd1-8',  time: '11:10 am', room: 'Salón Escala', speaker: 'Joco Gonzales',                        category: 'IA',           title: 'Hiper-personalización con Inteligencia Artificial' },
    { id: 'd1-9',  time: '11:40 am', room: 'Salón Ecom',   speaker: 'Ivanna Valentina',                     category: 'CONTENIDO',    title: 'Virality - Los 5 pasos para un video viral' },
    { id: 'd1-10', time: '11:40 am', room: 'Salón Escala', speaker: 'Carlos Ecomplus',                      category: 'IA',           title: 'De cero a 30 ventas al día con inteligencia artificial' },
    { id: 'd1-11', time: '12:10 pm', room: 'Salón Ecom',   speaker: 'Emilio Huerta',                        category: 'ADS',          title: 'Cómo escalar campañas de Meta Ads sin quemar tu presupuesto' },
    { id: 'd1-12', time: '12:10 pm', room: 'Salón Escala', speaker: 'Adrián Romero',                        category: 'MARKETING',    title: 'Email Marketing que vende: flujos de automatización que generan ingresos pasivos' },
    { id: 'd1-13', time: '12:40 pm', room: 'Salón Ecom',   speaker: 'RECESO',                               category: 'EVENTO',       title: 'Almuerzo y networking' },
    { id: 'd1-14', time: '12:40 pm', room: 'Salón Escala', speaker: 'RECESO',                               category: 'EVENTO',       title: 'Almuerzo y networking' },
    { id: 'd1-15', time: '2:00 pm',  room: 'Salón Ecom',   speaker: 'Alejandro Szita',                      category: 'VENTAS',       title: 'Cierre de ventas de alto valor: la psicología detrás de comprar sin objeciones' },
    { id: 'd1-16', time: '2:00 pm',  room: 'Salón Escala', speaker: 'Ángel Velásquez',                      category: 'LOGÍSTICA',    title: 'Logística inteligente: cómo reducir costos y mejorar la experiencia de entrega' },
    { id: 'd1-17', time: '2:30 pm',  room: 'Salón Ecom',   speaker: 'Mariangel Padrón',                     category: 'MARKETING',    title: 'Marca personal que convierte: cómo construir autoridad y monetizarla' },
    { id: 'd1-18', time: '2:30 pm',  room: 'Salón Escala', speaker: 'Carlos López',                         category: 'FINANZAS',     title: 'Finanzas para emprendedores: cómo manejar el dinero de tu negocio digital' },
    { id: 'd1-19', time: '3:00 pm',  room: 'Salón Ecom',   speaker: 'Luis Alvarado',                        category: 'IMPORTACIÓN',  title: 'Importación desde China: guía práctica para emprendedores venezolanos' },
    { id: 'd1-20', time: '3:00 pm',  room: 'Salón Escala', speaker: 'Diana Morales',                        category: 'DROPSHIPPING', title: 'Dropshipping en Venezuela: cómo vender sin inventario y sin fronteras' },
    { id: 'd1-21', time: '3:30 pm',  room: 'Salón Ecom',   speaker: 'Roberto Sandoval',                     category: 'ADS',          title: 'Google Ads para eCommerce: estrategias avanzadas de Shopping y Performance Max' },
    { id: 'd1-22', time: '3:30 pm',  room: 'Salón Escala', speaker: 'Valeria Torres',                       category: 'CONTENIDO',    title: 'UGC y Creadores: cómo colaborar con influencers para escalar tus ventas' },
    { id: 'd1-23', time: '4:00 pm',  room: 'Salón Ecom',   speaker: 'RECESO',                               category: 'EVENTO',       title: 'Break y networking' },
    { id: 'd1-24', time: '4:00 pm',  room: 'Salón Escala', speaker: 'RECESO',                               category: 'EVENTO',       title: 'Break y networking' },
    { id: 'd1-25', time: '4:20 pm',  room: 'Salón Ecom',   speaker: 'Stefany Mendoza',                      category: 'ECOMMERCE',    title: 'Tienda online que vende: CRO y UX para aumentar tu tasa de conversión' },
    { id: 'd1-26', time: '4:20 pm',  room: 'Salón Escala', speaker: 'Miguel Ángel Pérez',                   category: 'IA',           title: 'Automatización con IA: workflows que liberan tu tiempo y escalan tu negocio' },
    { id: 'd1-27', time: '4:50 pm',  room: 'Salón Ecom',   speaker: 'Patricia Guzmán',                      category: 'MARKETING',    title: 'WhatsApp Business avanzado: estrategias de conversión y retención de clientes' },
    { id: 'd1-28', time: '4:50 pm',  room: 'Salón Escala', speaker: 'Enrique Blanco',                       category: 'VENTAS',       title: 'Funnel de ventas ganador: de clic a cliente en menos de 24 horas' },
    { id: 'd1-29', time: '5:20 pm',  room: 'Salón Ecom',   speaker: 'Yolanda Rivas',                        category: 'FINANZAS',     title: 'Cripto y eCommerce: pagos digitales, stablecoins y nuevas oportunidades' },
    { id: 'd1-30', time: '5:20 pm',  room: 'Salón Escala', speaker: 'Hernán Castro',                        category: 'STARTUP',      title: 'De freelancer a agencia: cómo escalar un negocio de servicios digitales' },
    { id: 'd1-31', time: '6:00 pm',  room: 'Salón Ecom',   speaker: 'Panel de Expertos',                    category: 'ECOMMERCE',    title: 'El futuro del eCommerce en Venezuela: tendencias, retos y oportunidades 2025-2026' },
    { id: 'd1-32', time: '6:00 pm',  room: 'Salón Escala', speaker: 'Panel de Emprendedores',               category: 'STARTUP',      title: 'Casos de éxito: emprendedores venezolanos que rompieron barreras' },
    { id: 'd1-33', time: '7:00 pm',  room: 'Salón Ecom',   speaker: 'Ceremonia de Cierre',                  category: 'EVENTO',       title: 'Premiación, networking y cierre oficial del Día 1' },
    { id: 'd1-34', time: '7:00 pm',  room: 'Salón Escala', speaker: 'Networking VIP',                       category: 'EVENTO',       title: 'Espacio exclusivo de networking para asistentes' },
  ],
  2: [
    { id: 'd2-1',  time: '9:50 am',  room: 'Salón Ecom',   speaker: 'Host #1',                              category: 'EVENTO',       title: 'Apertura Día 2' },
    { id: 'd2-2',  time: '9:50 am',  room: 'Salón Escala', speaker: 'Host #2',                              category: 'EVENTO',       title: 'Apertura Día 2' },
    { id: 'd2-3',  time: '10:10 am', room: 'Salón Ecom',   speaker: 'Keynote: Speaker Internacional',       category: 'ECOMMERCE',    title: 'El eCommerce global y cómo Venezuela puede conectarse al mundo digital' },
    { id: 'd2-4',  time: '10:10 am', room: 'Salón Escala', speaker: 'Carolina Ríos',                        category: 'MARKETING',    title: 'TikTok Shop y Social Commerce: la nueva era de vender en redes sociales' },
    { id: 'd2-5',  time: '10:40 am', room: 'Salón Ecom',   speaker: 'Fernando Linares',                     category: 'ADS',          title: 'Meta Ads 2025: las estrategias que están funcionando ahora mismo' },
    { id: 'd2-6',  time: '10:40 am', room: 'Salón Escala', speaker: 'Gabriela Méndez',                      category: 'CONTENIDO',    title: 'Copywriting que convierte: palabras que venden en la era de la IA' },
    { id: 'd2-7',  time: '11:10 am', room: 'Salón Ecom',   speaker: 'Jorge Almeida',                        category: 'LOGÍSTICA',    title: 'Last-mile delivery en Venezuela: soluciones innovadoras para el envío nacional' },
    { id: 'd2-8',  time: '11:10 am', room: 'Salón Escala', speaker: 'Sofía Urbina',                         category: 'IA',           title: 'ChatGPT y LLMs para tu negocio: casos de uso reales que generan dinero' },
    { id: 'd2-9',  time: '11:40 am', room: 'Salón Ecom',   speaker: 'Manuel Herrera',                       category: 'IMPORTACIÓN',  title: 'Alibaba a Venezuela: estrategias de sourcing y negociación con proveedores chinos' },
    { id: 'd2-10', time: '11:40 am', room: 'Salón Escala', speaker: 'Claudia Fuentes',                      category: 'VENTAS',       title: 'Estrategias de upsell y cross-sell para maximizar el ticket promedio' },
    { id: 'd2-11', time: '12:10 pm', room: 'Salón Ecom',   speaker: 'Andrés Bolívar',                       category: 'FINANZAS',     title: 'Monetización y retiro de ganancias: métodos para cobrar desde Venezuela' },
    { id: 'd2-12', time: '12:10 pm', room: 'Salón Escala', speaker: 'Natalia Quintero',                     category: 'DROPSHIPPING', title: 'Dropshipping con marca propia: de producto genérico a brand premium' },
    { id: 'd2-13', time: '12:40 pm', room: 'Salón Ecom',   speaker: 'RECESO',                               category: 'EVENTO',       title: 'Almuerzo y networking' },
    { id: 'd2-14', time: '12:40 pm', room: 'Salón Escala', speaker: 'RECESO',                               category: 'EVENTO',       title: 'Almuerzo y networking' },
    { id: 'd2-15', time: '2:00 pm',  room: 'Salón Ecom',   speaker: 'MASTERMIND PRIVADO',                   category: 'MASTERMIND',   title: 'Mastermind Privado: Ecommerce Avanzado — Sesión cerrada para asistentes VIP' },
    { id: 'd2-16', time: '2:00 pm',  room: 'Salón Escala', speaker: 'MASTERMIND PRIVADO',                   category: 'MASTERMIND',   title: 'Mastermind Privado: Escalabilidad y Sistemas — Sesión cerrada para asistentes VIP' },
    { id: 'd2-17', time: '3:00 pm',  room: 'Salón Ecom',   speaker: 'MASTERMIND PRIVADO',                   category: 'MASTERMIND',   title: 'Mastermind Privado: Marketing Digital Avanzado — Sesión cerrada para asistentes VIP' },
    { id: 'd2-18', time: '3:00 pm',  room: 'Salón Escala', speaker: 'MASTERMIND PRIVADO',                   category: 'MASTERMIND',   title: 'Mastermind Privado: Finanzas y Cripto — Sesión cerrada para asistentes VIP' },
    { id: 'd2-19', time: '4:00 pm',  room: 'Salón Ecom',   speaker: 'RECESO',                               category: 'EVENTO',       title: 'Break y networking' },
    { id: 'd2-20', time: '4:00 pm',  room: 'Salón Escala', speaker: 'RECESO',                               category: 'EVENTO',       title: 'Break y networking' },
    { id: 'd2-21', time: '4:30 pm',  room: 'Salón Ecom',   speaker: 'Panel Final: Top Speakers',            category: 'ECOMMERCE',    title: 'Gran Cierre: Los aprendizajes más importantes del ECOM Venezuela 2026' },
    { id: 'd2-22', time: '4:30 pm',  room: 'Salón Escala', speaker: 'Q&A Abierto',                          category: 'EVENTO',       title: 'Sesión de preguntas y respuestas con los ponentes principales' },
    { id: 'd2-23', time: '5:30 pm',  room: 'Salón Ecom',   speaker: 'Ceremonia de Clausura',                category: 'EVENTO',       title: 'Premiación ECOM Venezuela 2026 y cierre oficial del evento' },
    { id: 'd2-24', time: '5:30 pm',  room: 'Salón Escala', speaker: 'Networking Final VIP',                 category: 'EVENTO',       title: 'Última sesión de networking y despedida oficial' },
  ],
};

const CATEGORIES = ['TODAS','ECOMMERCE','IA','MARKETING','VENTAS','FINANZAS','ADS','LOGÍSTICA','IMPORTACIÓN','STARTUP','CONTENIDO','DROPSHIPPING','CRYPTO','MASTERMIND','EVENTO'];

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

const EV_S1 = new Date('2026-10-25T10:00:00-04:00');
const EV_E1 = new Date('2026-10-25T20:00:00-04:00');
const EV_S2 = new Date('2026-10-26T09:50:00-04:00');
const EV_E2 = new Date('2026-10-26T17:30:00-04:00');

function getStatus(session, day) {
  const now = new Date();
  const es = day === 1 ? EV_S1 : EV_S2;
  const ee = day === 1 ? EV_E1 : EV_E2;
  if (now < es || now > ee) return 'normal';
  const base = day === 1 ? '2026-10-25' : '2026-10-26';
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

  if (isBreak) {
    return (
      <div className="conf-card break-card">
        <span>{session.title}</span>
      </div>
    );
  }

  return (
    <button
      className={`conf-card${status === 'live' ? ' card-live' : ''}${status === 'done' ? ' card-done' : ''}${isMaster ? ' card-master' : ''}`}
      onClick={() => onClick(session)}
    >
      <div className="card-top-row">
        <span className="card-speaker">{session.speaker}</span>
        <StatusPill status={status} />
      </div>
      <p className="card-title">{session.title}</p>
      <div className="card-bottom-row">
        <CatBadge category={session.category} />
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

  const dayMeta = day === 1
    ? { weekday: 'SÁBADO', hours: '10AM – 8PM', label: 'DÍA 1' }
    : { weekday: 'DOMINGO', hours: '10AM – 6PM', label: 'DÍA 2' };

  return (
    <div className="cr-root">

      {/* STICKY NAV */}
      <nav className={`cr-nav${scrolled ? ' cr-nav-scrolled' : ''}`}>
        <div className="cr-nav-inner">
          <Link to="/" className="cr-brand">
            <span className="brand-main">ECOM</span>
            <span className="brand-dot">•</span>
            <span className="brand-sub">PROGRAMACIÓN</span>
          </Link>
          <div className="cr-nav-days">
            <button className={`nav-day-btn${day === 1 ? ' active' : ''}`} onClick={() => setDay(1)}>DÍA 1</button>
            <button className={`nav-day-btn${day === 2 ? ' active' : ''}`} onClick={() => setDay(2)}>DÍA 2</button>
          </div>
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
          <p className="hero-label">ECOM VENEZUELA 2026</p>
          <h1 className="hero-title">PROGRAMACIÓN</h1>
          <p className="hero-hours">{dayMeta.weekday} {dayMeta.hours}</p>
          <p className="hero-daylabel">{dayMeta.label}</p>

          <div className="day-switcher">
            <button className={`day-sw-btn${day === 1 ? ' active' : ''}`} onClick={() => setDay(1)}>
              <span className="dsw-main">SÁBADO</span>
              <span className="dsw-sub">DÍA 1</span>
            </button>
            <button className={`day-sw-btn${day === 2 ? ' active' : ''}`} onClick={() => setDay(2)}>
              <span className="dsw-main">DOMINGO</span>
              <span className="dsw-sub">DÍA 2</span>
            </button>
          </div>
        </div>
      </header>

      {/* CONTROLS */}
      <section className="cr-controls">
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
        <div className="filters-row">
          {CATEGORIES.map(c => (
            <button key={c} className={`f-pill${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="cr-schedule">
        {/* Column headers */}
        <div className="sched-header">
          <div className="sh-hora">HORA</div>
          <div className="sh-ecom"><span className="sh-dot dot-e" />SALÓN ECOM</div>
          <div className="sh-escala"><span className="sh-dot dot-s" />SALÓN ESCALA</div>
        </div>

        {/* DESKTOP GRID */}
        <div className="sched-desktop">
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
        <div className="sched-mobile">
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
