import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import logoEcom from '../../assets/Elementos graficos/LOGO ECOM.webp'
import { ChessPiece, PieceDefs } from './ChessPiece'
import { OFFER, CONTACT, LEGAL, CERTIFICATE_IMAGE, EVENT } from './config'
import {
  SPEAKERS, PROBLEMS, STAGES, MODULES, PILLARS, JOURNEY,
  BENEFITS_70, INCLUDES, FAQ, photoOf,
} from './data'
import './ElJuegoDeLasVentas.css'

/* ───────────────────────── helpers ───────────────────────── */

const speakerById = (id) => SPEAKERS.find((s) => s.id === id)

const trackCheckout = () => {
  if (typeof window.fbq === 'function') window.fbq('track', 'InitiateCheckout')
}

// Todos los CTA apuntan al checkout oficial si está configurado; si no, a la sección de entradas.
const ctaProps = () =>
  OFFER.checkoutUrl
    ? { href: OFFER.checkoutUrl, target: '_blank', rel: 'noopener noreferrer', onClick: trackCheckout }
    : { href: '#entradas' }

const priceLabel = () =>
  OFFER.price === null || OFFER.price === undefined || OFFER.price === ''
    ? OFFER.pricePlaceholder
    : `${OFFER.currency ? OFFER.currency + ' ' : ''}${OFFER.price}`

const Arrow = () => (
  <svg className="ejv-btn__arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Button({ variant = 'blue', size, children, className = '', ...props }) {
  return (
    <a className={`ejv-btn ejv-btn--${variant} ${size ? `ejv-btn--${size}` : ''} ${className}`} {...props}>
      <span>{children}</span>
      <Arrow />
    </a>
  )
}

function Eyebrow({ children, tone }) {
  return <p className={`ejv-eyebrow ${tone ? `ejv-eyebrow--${tone}` : ''}`}>{children}</p>
}

function Wordmark({ className = '' }) {
  return (
    <span className={`ejv-wordmark ${className}`} aria-label="El Juego de las Ventas">
      <span className="ejv-wordmark__sq" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span className="ejv-wordmark__txt">
        <b>EL JUEGO</b>
        <b>DE LAS VENTAS</b>
      </span>
    </span>
  )
}

// Foto recortada del ponente, o un placeholder editorial si aún no existe el archivo.
function Cutout({ speaker, className = '', eager = false }) {
  const src = photoOf(speaker)
  return (
    <div className={`ejv-cutout ${src ? 'has-photo' : 'is-placeholder'} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={`${speaker.first} ${speaker.last}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable="false"
        />
      ) : (
        <div className="ejv-cutout__ph" role="img" aria-label={`${speaker.first} ${speaker.last}`}>
          <ChessPiece type={speaker.piece} variant="outline" className="ejv-cutout__piece" />
          <span className="ejv-cutout__ini">{speaker.initials}</span>
        </div>
      )}
    </div>
  )
}

/* ───────────────────────── navbar ───────────────────────── */

const NAV = [
  ['Temario', '#temario'],
  ['Ponentes', '#ponentes'],
  ['Experiencia', '#experiencia'],
  ['Entradas', '#entradas'],
]

function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`ejv-nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="ejv-nav__bar">
        <a href="#top" className="ejv-nav__logo" aria-label="ECOM — inicio" onClick={() => setOpen(false)}>
          <img src={logoEcom} alt="ECOM" width="120" height="23" />
        </a>

        <nav className="ejv-nav__links" aria-label="Principal">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <Button variant="white" size="sm" className="ejv-nav__cta" {...ctaProps()}>
          RESERVAR MI CUPO
        </Button>

        <button
          type="button"
          className="ejv-nav__burger"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="ejv-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span />
        </button>
      </div>

      <div id="ejv-menu" className="ejv-menu" hidden={!open}>
        <nav aria-label="Menú móvil">
          {NAV.map(([label, href], i) => (
            <a key={href} href={href} style={{ '--i': i }} onClick={() => setOpen(false)}>
              <small>0{i + 1}</small>{label}
            </a>
          ))}
        </nav>
        <Button variant="white" {...ctaProps()} onClick={(e) => { setOpen(false); ctaProps().onClick?.(e) }}>
          RESERVAR MI CUPO
        </Button>
        <p className="ejv-menu__meta">{EVENT.dateShort} · {EVENT.venue.toUpperCase()}, CARACAS</p>
      </div>
    </header>
  )
}

/* ───────────────────────── 1. hero ───────────────────────── */

const HERO_INFO = [
  { k: 'date', t: '21 NOV 2026' },
  { k: 'pin', t: 'TORRE MOVILNET, CARACAS' },
  { k: 'clock', t: '8 HORAS DE EXPERIENCIA' },
  { k: 'seat', t: '70 CUPOS' },
]

const InfoIcon = ({ k }) => {
  const p = {
    date: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
    pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
    seat: <><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19c.5-3.4 2.7-5 5.5-5s5 1.6 5.5 5" /><circle cx="17" cy="9.5" r="2.3" /><path d="M16.5 14.2c2.3.1 3.7 1.4 4 4" /></>,
  }[k]
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {p}
    </svg>
  )
}

function Hero() {
  return (
    <section className="ejv-hero" id="top" data-hero>
      <div className="ejv-hero__bg" aria-hidden="true">
        <div className="ejv-hero__glow ejv-hero__glow--a" />
        <div className="ejv-hero__glow ejv-hero__glow--b" />
        <div className="ejv-hero__grid" />
        <div className="ejv-hero__board" />
        <span className="ejv-float ejv-float--sq1" />
        <span className="ejv-float ejv-float--sq2" />
        <span className="ejv-float ejv-float--ring" />
        <span className="ejv-float ejv-float--line" />
        <ChessPiece type="queen" variant="outline" className="ejv-float ejv-float--piece1" />
        <ChessPiece type="rook" variant="outline" className="ejv-float ejv-float--piece2" />
      </div>

      <div className="ejv-container ejv-hero__inner">
        <div className="ejv-hero__head">
          <p className="ejv-tag ejv-tag--glass ejv-in" style={{ '--d': 0 }}>
            <i /> ECOM PRESENTA · WORKSHOP INMERSIVO
          </p>
          <h1 className="ejv-hero__title" aria-label="El juego de las ventas">
            <span className="ejv-line" aria-hidden="true"><b style={{ '--d': 1 }}>EL JUEGO</b></span>
            <span className="ejv-line ejv-line--outline" aria-hidden="true"><b style={{ '--d': 2 }}>DE LAS</b></span>
            <span className="ejv-line" aria-hidden="true"><b style={{ '--d': 3 }}>VENTAS</b></span>
          </h1>
        </div>

        <div className="ejv-hero__cast" aria-label="Los cinco especialistas">
          {SPEAKERS.map((s, i) => (
            <figure className="ejv-cast" key={s.id} style={{ '--i': i }}>
              <div className="ejv-cast__inner">
                <Cutout speaker={s} eager />
                <figcaption>
                  <b>{s.first}</b>
                  <span>{s.tag}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <div className="ejv-hero__body ejv-in" style={{ '--d': 4 }}>
          <p className="ejv-hero__sub">
            Aprende las 5 herramientas que pueden transformar la manera en que tu negocio atrae clientes y genera ventas.
          </p>
          <p className="ejv-hero__text">
            8 horas de formación teórico-práctica junto a 5 especialistas en marketing, anuncios, contenido e inteligencia artificial. Una experiencia presencial para aprender, implementar y conectar con otros empresarios.
          </p>

          <ul className="ejv-hero__info">
            {HERO_INFO.map((i) => (
              <li key={i.k}><InfoIcon k={i.k} />{i.t}</li>
            ))}
          </ul>

          <div className="ejv-hero__ctas">
            <Button variant="white" size="lg" {...ctaProps()}>QUIERO ASEGURAR MI CUPO</Button>
            <a className="ejv-btn ejv-btn--ghost ejv-btn--lg" href="#solucion"><span>DESCUBRIR EL WORKSHOP</span></a>
          </div>
          <p className="ejv-hero__micro">Una experiencia presencial diseñada para 70 participantes.</p>
        </div>
      </div>
    </section>
  )
}

/* cinta de texto entre hero y problema */
function Marquee() {
  const items = ['EL JUEGO DE LAS VENTAS', '21 NOV 2026', 'TORRE MOVILNET · CARACAS', '5 HERRAMIENTAS', '70 CUPOS', 'WORKSHOP INMERSIVO']
  const row = (k) => (
    <div className="ejv-marquee__row" aria-hidden={k === 'b'} key={k}>
      {items.map((t) => (
        <span key={t + k}>{t}<ChessPiece type="pawn" variant="solid" className="ejv-marquee__dot" /></span>
      ))}
    </div>
  )
  return (
    <div className="ejv-marquee" role="presentation">
      <div className="ejv-marquee__track">{row('a')}{row('b')}</div>
    </div>
  )
}

/* ───────────────────────── 2. problema ───────────────────────── */

function Problem() {
  return (
    <section className="ejv-sec ejv-problem" id="problema">
      <div className="ejv-container">
        <div className="ejv-problem__head">
          <Eyebrow>EL PROBLEMA</Eyebrow>
          <h2 className="ejv-h2" data-reveal>
            El problema no es solo vender. <em>Es no tener un sistema.</em>
          </h2>
          <p className="ejv-lead" data-reveal style={{ '--d': 1 }}>
            Publicas contenido, inviertes en publicidad, respondes mensajes y buscas constantemente nuevos clientes. Pero ¿todas esas acciones trabajan juntas para hacer crecer tu negocio?
          </p>
        </div>

        <ul className="ejv-problem__grid">
          {PROBLEMS.map((p, i) => (
            <li className="ejv-pcard" key={p.n} data-reveal style={{ '--d': i }}>
              <span className="ejv-pcard__n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>

        <div className="ejv-closing" data-reveal>
          <p className="ejv-closing__a">No necesitas más herramientas aisladas.</p>
          <p className="ejv-closing__b">
            Necesitas aprender a <mark>conectarlas estratégicamente.</mark>
          </p>
          <svg className="ejv-closing__net" viewBox="0 0 220 120" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M24 90 70 30 120 70 170 24 200 84" />
              <path d="M70 30 170 24M24 90 120 70 200 84" strokeDasharray="3 5" opacity=".6" />
            </g>
            {[[24, 90], [70, 30], [120, 70], [170, 24], [200, 84]].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="7" fill="#0648E8" />
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 3. solución ───────────────────────── */

function Solution() {
  return (
    <section className="ejv-sec ejv-solution ejv-dark ejv-gridbg" id="solucion">
      <div className="ejv-solution__glow" aria-hidden="true" />
      <div className="ejv-container">
        <Eyebrow tone="light">LA NUEVA FORMA DE VENDER</Eyebrow>
        <h2 className="ejv-h2 ejv-h2--light" data-reveal>
          5 herramientas. Un mismo objetivo: <em>hacer crecer tu negocio.</em>
        </h2>

        <ol className="ejv-flow">
          {STAGES.map((s, i) => (
            <li className="ejv-stage" key={s.n} data-lit style={{ '--i': i }}>
              <div className="ejv-stage__node">
                <ChessPiece type={s.piece} variant="solid" />
              </div>
              <div className="ejv-stage__card">
                <span className="ejv-stage__n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────────────────────── 4. módulos ───────────────────────── */

function Modules() {
  return (
    <section id="temario" className="ejv-modules">
      <div className="ejv-sec ejv-modules__intro">
        <div className="ejv-container">
          <Eyebrow>TEMARIO</Eyebrow>
          <h2 className="ejv-h2" data-reveal>Qué vas a <em>aprender</em></h2>
          <p className="ejv-lead" data-reveal style={{ '--d': 1 }}>
            Cinco módulos, cinco especialistas y un mismo sistema comercial.
          </p>
        </div>
      </div>

      {MODULES.map((m, i) => {
        const s = speakerById(m.speaker)
        const dark = i % 2 === 1
        return (
          <article
            key={m.n}
            className={`ejv-mod ${dark ? 'ejv-mod--dark ejv-dark' : 'ejv-mod--light'} ${i % 2 ? 'is-flip' : ''}`}
          >
            <div className="ejv-container ejv-mod__grid">
              <div className="ejv-mod__visual" data-reveal>
                <span className="ejv-mod__num" aria-hidden="true">{m.n}</span>
                <div className="ejv-mod__frame">
                  <Cutout speaker={s} />
                </div>
                <span className="ejv-tag ejv-tag--solid ejv-mod__tag">{s.tag}</span>
              </div>

              <div className="ejv-mod__body" data-reveal style={{ '--d': 1 }}>
                <p className="ejv-mod__label">
                  <span>MÓDULO {m.n}</span>
                  <b>{s.first} {s.last}</b>
                </p>
                <h3 className="ejv-mod__title">{m.title}</h3>
                <p className="ejv-mod__learn">Aprenderás sobre:</p>
                <ul className="ejv-mod__list">
                  {m.points.map((p) => (
                    <li key={p}>
                      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                        <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}

/* ───────────────────────── 5. expertos ───────────────────────── */

const CARD_TONES = ['blue', 'black', 'white', 'blue', 'black']

function Experts() {
  return (
    <section className="ejv-sec ejv-experts ejv-dark ejv-gridbg" id="ponentes">
      <div className="ejv-container">
        <Eyebrow tone="light">LOS EXPERTOS</Eyebrow>
        <h2 className="ejv-h2 ejv-h2--light" data-reveal>
          5 mentes. 5 especialidades. <em>Una experiencia.</em>
        </h2>
      </div>

      <div className="ejv-container ejv-experts__wrap">
        <ul className="ejv-experts__track" tabIndex={0} aria-label="Galería de ponentes. Desliza para ver más.">
          {SPEAKERS.map((s, i) => (
            <li className={`ejv-ex ejv-ex--${CARD_TONES[i]}`} key={s.id} data-reveal style={{ '--d': i }}>
              <div className="ejv-ex__photo">
                <Cutout speaker={s} />
                <span className="ejv-ex__idx" aria-hidden="true">0{i + 1}</span>
              </div>
              <div className="ejv-ex__info">
                <p className="ejv-ex__first">{s.first}</p>
                <p className="ejv-ex__last">{s.last}</p>
                <p className="ejv-ex__area">{s.area}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────────────────── 6. aprende haciendo ───────────────────────── */

const VisualLearn = () => (
  <svg viewBox="0 0 320 200" className="ejv-viz" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="64" y="18" width="200" height="124" rx="10" opacity=".35" />
      <rect x="46" y="34" width="200" height="124" rx="10" opacity=".65" />
      <rect x="28" y="50" width="200" height="124" rx="10" fill="rgba(255,255,255,.06)" />
      <path d="M48 76h90M48 94h130M48 112h70" opacity=".8" />
      <path d="M48 150V134m16 16v-26m16 26v-34m16 34v-20" strokeWidth="6" opacity=".9" />
      <circle cx="192" cy="118" r="18" />
      <path d="m184 118 6 6 11-12" strokeWidth="3" />
    </g>
  </svg>
)

const VisualPractice = () => (
  <svg viewBox="0 0 320 200" className="ejv-viz" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="24" y="22" width="248" height="152" rx="10" fill="rgba(255,255,255,.06)" />
      <path d="M24 48h248" />
      <circle cx="42" cy="35" r="3.5" fill="currentColor" />
      <circle cx="56" cy="35" r="3.5" />
      <circle cx="70" cy="35" r="3.5" />
      <rect x="42" y="64" width="110" height="46" rx="6" />
      <path d="M42 126h84M42 142h60" opacity=".8" />
      <rect x="172" y="64" width="80" height="12" rx="6" fill="currentColor" opacity=".9" />
      <path d="m176 96 5 5 9-10M176 120l5 5 9-10" />
      <path d="M200 98h50M200 122h36" opacity=".8" />
      <path d="M232 140l0 30 8-8 6 14 6-3-6-13 11-1z" fill="#fff" stroke="#090A0F" strokeWidth="1.5" />
    </g>
  </svg>
)

const VisualConnect = () => (
  <svg viewBox="0 0 320 200" className="ejv-viz" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M160 100 70 52M160 100 250 48M160 100 62 148M160 100 258 152M70 52 62 148M250 48 258 152M70 52 250 48" opacity=".6" />
      {[[70, 52], [250, 48], [62, 148], [258, 152]].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="16" fill="rgba(255,255,255,.08)" />
          <circle cx={x} cy={y - 3} r="4.5" />
          <path d={`M${x - 8} ${y + 9}c1-6 4-8 8-8s7 2 8 8`} />
        </g>
      ))}
      <circle cx="160" cy="100" r="26" fill="currentColor" opacity=".15" />
      <circle cx="160" cy="100" r="26" />
      <path d="M149 100h22M160 89v22" strokeWidth="3" />
    </g>
  </svg>
)

const PILLAR_VIZ = { aprende: VisualLearn, practica: VisualPractice, conecta: VisualConnect }
const PILLAR_TONE = { aprende: 'blue', practica: 'black', conecta: 'white' }

function Learn() {
  return (
    <section className="ejv-sec ejv-learn" id="experiencia">
      <div className="ejv-container">
        <Eyebrow>NO ES UN EVENTO PARA SOLO ESCUCHAR</Eyebrow>
        <h2 className="ejv-h2" data-reveal>
          No vienes solamente a escuchar. <em>Vienes a aprender haciendo.</em>
        </h2>
        <p className="ejv-lead" data-reveal style={{ '--d': 1 }}>
          Una jornada que combina conocimiento, demostraciones, ejercicios y aplicación de herramientas.
        </p>

        <div className="ejv-pillars">
          {PILLARS.map((p, i) => {
            const Viz = PILLAR_VIZ[p.key]
            return (
              <article className={`ejv-pillar ejv-pillar--${PILLAR_TONE[p.key]}`} key={p.key} data-reveal style={{ '--d': i }}>
                <Viz />
                <span className="ejv-pillar__n" aria-hidden="true">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 7. recorrido ───────────────────────── */

function Journey() {
  return (
    <section className="ejv-sec ejv-journey ejv-dark ejv-gridbg" id="recorrido">
      <div className="ejv-container ejv-journey__grid">
        <div className="ejv-journey__intro">
          <Eyebrow tone="light">EL RETO DE LAS 8 HORAS</Eyebrow>
          <h2 className="ejv-h2 ejv-h2--light ejv-h2--md" data-reveal>
            8 horas para cambiar tu forma de <em>entender las ventas.</em>
          </h2>
          <p className="ejv-journey__note">
            Recorrido temático de la jornada. Los horarios por módulo se publicarán cuando sean confirmados oficialmente.
          </p>
        </div>

        <ol className="ejv-timeline">
          {JOURNEY.map((j, i) =>
            j.type === 'break' ? (
              <li className="ejv-tl ejv-tl--break" key={i} data-reveal>
                <span className="ejv-tl__n" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3" /></svg>
                </span>
                <div className="ejv-tl__card">
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                </div>
              </li>
            ) : (
              <li className="ejv-tl" key={i} data-reveal>
                <span className="ejv-tl__n">{j.n}</span>
                <div className="ejv-tl__card">
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                </div>
              </li>
            ),
          )}
        </ol>
      </div>
    </section>
  )
}

/* ───────────────────────── 8. 70 personas ───────────────────────── */

function Seventy() {
  return (
    <section className="ejv-sec ejv-seventy" id="cupos">
      <div className="ejv-seventy__bg" aria-hidden="true" />
      <div className="ejv-container ejv-seventy__grid">
        <div className="ejv-seventy__visual" data-reveal aria-hidden="true">
          <span className="ejv-seventy__big">70</span>
          <div className="ejv-seats">
            {Array.from({ length: EVENT.capacity }).map((_, i) => (
              <i key={i} style={{ '--i': i }} />
            ))}
          </div>
        </div>

        <div className="ejv-seventy__body">
          <Eyebrow tone="light">EXPERIENCIA EXCLUSIVA</Eyebrow>
          <h2 className="ejv-h2 ejv-h2--light ejv-h2--md" data-reveal>
            70 personas. Una experiencia diseñada para aprender y <em>conectar.</em>
          </h2>
          <p className="ejv-lead ejv-lead--light" data-reveal style={{ '--d': 1 }}>
            Un formato de capacidad limitada para compartir conocimientos, realizar actividades prácticas y generar conexiones con otros emprendedores y empresarios.
          </p>
          <ul className="ejv-benefits">
            {BENEFITS_70.map((b, i) => (
              <li key={b} data-reveal style={{ '--d': i + 1 }}>
                <span>0{i + 1}</span>{b}
              </li>
            ))}
          </ul>
          <Button variant="white" size="lg" {...ctaProps()}>QUIERO FORMAR PARTE</Button>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 9. oferta ───────────────────────── */

function Offer() {
  const [notice, setNotice] = useState(false)
  const unavailable = OFFER.availability === 'soon' || OFFER.availability === 'soldout'
  const label = OFFER.availability === 'soldout' ? 'AGOTADO' : OFFER.availability === 'soon' ? 'PRÓXIMAMENTE' : 'COMPRAR MI ENTRADA'
  const includes = [...INCLUDES, ...OFFER.extras]

  const cta = unavailable ? (
    <button type="button" className="ejv-btn ejv-btn--blue ejv-btn--lg ejv-btn--block" disabled>
      <span>{label}</span>
    </button>
  ) : OFFER.checkoutUrl ? (
    <Button variant="blue" size="lg" className="ejv-btn--block" {...ctaProps()}>{label}</Button>
  ) : (
    <button type="button" className="ejv-btn ejv-btn--blue ejv-btn--lg ejv-btn--block" onClick={() => setNotice(true)}>
      <span>{label}</span><Arrow />
    </button>
  )

  return (
    <section className="ejv-sec ejv-offer ejv-dark ejv-gridbg" id="entradas">
      <div className="ejv-offer__glow" aria-hidden="true" />
      <div className="ejv-container">
        <Eyebrow tone="light">TU ENTRADA</Eyebrow>
        <h2 className="ejv-h2 ejv-h2--light" data-reveal>
          Tu entrada al juego <em>incluye:</em>
        </h2>

        <div className="ejv-offer__grid">
          <ul className="ejv-includes">
            {includes.map((t, i) => (
              <li key={t} data-reveal style={{ '--d': i }}>
                <span className="ejv-includes__tick" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="ejv-ticket" data-reveal style={{ '--d': 2 }}>
            <div className="ejv-ticket__edge" aria-hidden="true" />
            <div className="ejv-ticket__inner">
              <div className="ejv-ticket__top">
                <ChessPiece type="king" variant="3d" className="ejv-ticket__piece" />
                <span className="ejv-tag ejv-tag--glass"><i /> ENTRADA GENERAL</span>
              </div>
              <h3 className="ejv-ticket__name">EL JUEGO<br />DE LAS VENTAS</h3>
              <p className="ejv-ticket__sub">Workshop inmersivo</p>
              <p className="ejv-ticket__when">21 de noviembre · Caracas</p>

              <div className="ejv-ticket__price">
                <span>PRECIO</span>
                <strong className={OFFER.price === null ? 'is-tbd' : ''}>{priceLabel()}</strong>
              </div>

              {cta}
              {notice && (
                <p className="ejv-ticket__notice" role="status">
                  El enlace de pago oficial se publicará muy pronto.
                </p>
              )}
              <p className="ejv-ticket__foot">70 cupos en total · Evento presencial</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 10. certificado ───────────────────────── */

function Certificate() {
  return (
    <section className="ejv-sec ejv-cert" id="certificado">
      <div className="ejv-container ejv-cert__grid">
        <div>
          <Eyebrow>CERTIFICADO DE PARTICIPACIÓN</Eyebrow>
          <h2 className="ejv-h2 ejv-h2--md" data-reveal>
            Tu aprendizaje también merece ser <em>reconocido.</em>
          </h2>
          <p className="ejv-lead" data-reveal style={{ '--d': 1 }}>
            Al participar en El Juego de las Ventas recibirás un certificado digital de participación en el workshop inmersivo.
          </p>
          <p className="ejv-cert__legal" data-reveal style={{ '--d': 2 }}>
            Es un certificado de participación. No constituye un título académico ni una acreditación profesional.
          </p>
        </div>

        <div className="ejv-cert__stage" data-reveal>
          <div className="ejv-cert__card">
            {CERTIFICATE_IMAGE ? (
              <img src={CERTIFICATE_IMAGE} alt="Certificado digital de participación" loading="lazy" />
            ) : (
              <div className="ejv-diploma" role="img" aria-label="Representación ilustrativa del certificado digital de participación">
                <div className="ejv-diploma__frame">
                  <img className="ejv-diploma__logo" src={logoEcom} alt="" />
                  <p className="ejv-diploma__kicker">CERTIFICADO DE PARTICIPACIÓN</p>
                  <p className="ejv-diploma__lead">Se otorga a</p>
                  <p className="ejv-diploma__name">Nombre del participante</p>
                  <p className="ejv-diploma__text">
                    por su participación en el workshop inmersivo <b>EL JUEGO DE LAS VENTAS</b>
                  </p>
                  <div className="ejv-diploma__foot">
                    <span>Caracas · 21 de noviembre de 2026</span>
                    <ChessPiece type="king" variant="solid" className="ejv-diploma__seal" />
                    <span>ECOM</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {!CERTIFICATE_IMAGE && <p className="ejv-cert__cap">Representación ilustrativa</p>}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 11. FAQ ───────────────────────── */

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="ejv-sec ejv-faq" id="faq">
      <div className="ejv-container ejv-faq__grid">
        <div className="ejv-faq__intro">
          <Eyebrow>PREGUNTAS FRECUENTES</Eyebrow>
          <h2 className="ejv-h2 ejv-h2--md" data-reveal>Antes de hacer tu <em>movimiento</em></h2>
        </div>
        <div className="ejv-acc">
          {FAQ.map((f, i) => {
            const isOpen = open === i
            return (
              <div className={`ejv-acc__item ${isOpen ? 'is-open' : ''}`} key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-b-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-p-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <i aria-hidden="true" />
                  </button>
                </h3>
                <div className="ejv-acc__panel" id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`}>
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 12. CTA final ───────────────────────── */

function FinalCta() {
  return (
    <section className="ejv-final" id="final">
      <div className="ejv-final__bg" aria-hidden="true">
        <div className="ejv-final__board" />
        <div className="ejv-final__glow" />
      </div>
      <div className="ejv-container ejv-final__grid">
        <div className="ejv-final__copy">
          <Eyebrow tone="light">EL SIGUIENTE MOVIMIENTO</Eyebrow>
          <h2 className="ejv-final__title" data-reveal>
            En los negocios, no se trata solo de jugar. <em>Se trata de aprender a jugar mejor.</em>
          </h2>
          <p className="ejv-lead ejv-lead--light" data-reveal style={{ '--d': 1 }}>
            El siguiente movimiento de tu negocio comienza con las decisiones y herramientas que aprendes a utilizar hoy.
          </p>
          <Button variant="white" size="lg" {...ctaProps()}>ASEGURAR MI ENTRADA</Button>
        </div>
        <div className="ejv-final__piece" aria-hidden="true">
          <ChessPiece type="king" variant="3d" />
          <span className="ejv-final__shadow" />
        </div>
      </div>

      <div className="ejv-container">
        <ul className="ejv-final__info">
          <li><b>21 NOVIEMBRE 2026</b></li>
          <li><b>TORRE MOVILNET · CARACAS</b></li>
          <li><b>70 CUPOS · 5 ESPECIALISTAS · 8 HORAS</b></li>
        </ul>
      </div>
    </section>
  )
}

/* ───────────────────────── 13. footer ───────────────────────── */

function Footer() {
  const legal = [
    ['Política de privacidad', LEGAL.privacy],
    ['Términos y condiciones', LEGAL.terms],
    ['Política de reembolso', LEGAL.refund],
  ].filter(([, url]) => url)

  const contacts = [
    CONTACT.email && ['Email', `mailto:${CONTACT.email}`, CONTACT.email],
    CONTACT.whatsapp && ['WhatsApp', `https://wa.me/${CONTACT.whatsapp}`, 'Escríbenos'],
    CONTACT.instagram && ['Instagram', CONTACT.instagram, 'Síguenos'],
    CONTACT.website && ['Web', CONTACT.website, CONTACT.website.replace(/^https?:\/\//, '')],
  ].filter(Boolean)

  return (
    <footer className="ejv-footer">
      <div className="ejv-container">
        <div className="ejv-footer__top">
          <div className="ejv-footer__brand">
            <img src={logoEcom} alt="ECOM" width="110" height="21" />
            <span className="ejv-footer__x" aria-hidden="true">×</span>
            <Wordmark />
          </div>
          <p className="ejv-footer__where">
            Sábado 21 de noviembre de 2026<br />Torre Movilnet · Caracas, Venezuela
          </p>
        </div>

        <div className="ejv-footer__cols">
          <nav aria-label="Secciones">
            <h4>Secciones</h4>
            <a href="#temario">Temario</a>
            <a href="#ponentes">Ponentes</a>
            <a href="#experiencia">Experiencia</a>
            <a href="#faq">Preguntas frecuentes</a>
            <a href="#entradas">Entradas</a>
          </nav>
          {contacts.length > 0 && (
            <div>
              <h4>Contacto del organizador</h4>
              {contacts.map(([k, href, txt]) => (
                <a key={k} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{k}: {txt}</a>
              ))}
            </div>
          )}
          {legal.length > 0 && (
            <div>
              <h4>Legal</h4>
              {legal.map(([k, url]) => (
                <a key={k} href={url} target="_blank" rel="noopener noreferrer">{k}</a>
              ))}
            </div>
          )}
        </div>

        <p className="ejv-footer__copy">© 2026 ECOM. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

/* ───────────────────────── barra sticky móvil ───────────────────────── */

function StickyBar({ visible }) {
  return (
    <div className={`ejv-sticky ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <div className="ejv-sticky__txt">
        <b>EL JUEGO DE LAS VENTAS</b>
        <span>21 NOV · CARACAS</span>
      </div>
      <a className="ejv-btn ejv-btn--white ejv-btn--sm" tabIndex={visible ? 0 : -1} {...ctaProps()}>
        <span>RESERVAR MI CUPO</span>
      </a>
    </div>
  )
}

/* ───────────────────────── página ───────────────────────── */

export default function ElJuegoDeLasVentas() {
  const rootRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [hideSticky, setHideSticky] = useState(false)

  // SEO básico de la ruta
  useEffect(() => {
    const prevTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content')
    document.title = 'El Juego de las Ventas — Workshop Inmersivo | ECOM · 21 nov 2026, Caracas'
    meta?.setAttribute(
      'content',
      'Workshop presencial de 8 horas con 5 especialistas en contenido, anuncios, landing pages, IA y automatización. 21 de noviembre de 2026, Torre Movilnet, Caracas. 70 cupos.',
    )
    return () => {
      document.title = prevTitle
      if (meta && prevDesc) meta.setAttribute('content', prevDesc)
    }
  }, [])

  // Animaciones de entrada: solo se ocultan los elementos si JS está activo.
  useLayoutEffect(() => {
    const root = rootRef.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = root.querySelectorAll('[data-reveal], [data-lit]')
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return undefined
    }
    root.classList.add('ejv-anim')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      root.classList.remove('ejv-anim')
    }
  }, [])

  // Scroll: navbar, parallax moderado y barra sticky
  useEffect(() => {
    const root = rootRef.current
    const hero = root.querySelector('[data-hero]')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = window.scrollY
        setScrolled(y > 24)
        setPastHero(y > window.innerHeight * 0.7)
        if (!reduce && y < window.innerHeight * 1.2) hero.style.setProperty('--sy', `${y}px`)
      })
    }

    const onMove = (e) => {
      if (reduce) return
      const r = hero.getBoundingClientRect()
      hero.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
      hero.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    hero.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      hero.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // La barra sticky se oculta cuando ya se ve la oferta o el CTA final
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const targets = ['entradas', 'final'].map((id) => document.getElementById(id)).filter(Boolean)
    const seen = new Set()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? seen.add(en.target.id) : seen.delete(en.target.id)))
      setHideSticky(seen.size > 0)
    }, { threshold: 0.25 })
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <div className="ejv" ref={rootRef}>
      <PieceDefs />
      <a className="ejv-skip" href="#problema">Saltar al contenido</a>
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Solution />
        <Modules />
        <Experts />
        <Learn />
        <Journey />
        <Seventy />
        <Offer />
        <Certificate />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyBar visible={pastHero && !hideSticky} />
    </div>
  )
}
