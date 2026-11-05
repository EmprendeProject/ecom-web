import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import logoEcom from '../../assets/Elementos graficos/LOGO ECOM.webp'
import imgFooter from '../../assets/el juego de las ventas/futter.webp'
import imgCertificado from '../../assets/el juego de las ventas/certificado.webp'
import { ChessPiece, PieceDefs } from './ChessPiece'
import { OFFER, EVENT, META_PIXEL_ID } from './config'
import {
  SPEAKERS, MODULES,
  INCLUDES, photoOf,
} from './data'
import './ElJuegoDeLasVentas.css'

/* ───────────────────────── helpers ───────────────────────── */

const speakerById = (id) => SPEAKERS.find((s) => s.id === id)

const initMetaPixel = () => {
  if (typeof window === 'undefined') return
  if (!window.fbq) {
    const n = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    window.fbq = n
    if (!window._fbq) window._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    const s = document.createElement('script')
    s.async = true
    s.src = 'https://connect.facebook.net/en_US/fbevents.js'
    const first = document.getElementsByTagName('script')[0]
    first?.parentNode?.insertBefore(s, first)
  }

  try {
    window.fbq('init', META_PIXEL_ID)
    window.fbq('trackSingle', META_PIXEL_ID, 'PageView')
    window.fbq('trackSingle', META_PIXEL_ID, 'ViewContent', {
      content_name: 'El Juego de las Ventas — Workshop Inmersivo',
      content_category: 'Workshop',
      content_ids: ['el-juego-de-las-ventas-2026'],
      content_type: 'product',
      value: OFFER.price || 107,
      currency: 'USD',
    })
  } catch (err) {
    console.warn('Meta Pixel tracking error:', err)
  }
}

const trackCheckout = () => {
  if (typeof window.fbq === 'function') {
    const data = {
      content_name: 'El Juego de las Ventas — Workshop Inmersivo',
      content_category: 'Workshop',
      content_ids: ['el-juego-de-las-ventas-2026'],
      content_type: 'product',
      value: OFFER.price || 107,
      currency: 'USD',
    }
    window.fbq('track', 'InitiateCheckout', data)
    window.fbq('trackSingle', META_PIXEL_ID, 'InitiateCheckout', data)
  }
}

// Todos los CTA apuntan al checkout oficial si está configurado; si no, a la sección de entradas.
const ctaProps = () =>
  OFFER.checkoutUrl
    ? { href: OFFER.checkoutUrl, target: '_blank', rel: 'noopener noreferrer', onClick: trackCheckout }
    : { href: '#entradas' }

const priceLabel = () => {
  if (OFFER.price === null || OFFER.price === undefined || OFFER.price === '') {
    return OFFER.pricePlaceholder
  }
  return OFFER.currency === '$' ? `$${OFFER.price}` : `${OFFER.currency ? OFFER.currency + ' ' : ''}${OFFER.price}`
}

const Arrow = () => (
  <svg className="ejv-btn__arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Button({ variant = 'blue', size, children, className = '', ...props }) {
  return (
    <a className={`ejv-btn ejv-btn--${variant} ${size ? `ejv-btn--${size}` : ''} ${className}`} {...props}>
      <span className="ejv-btn__text">{children}</span>
      <span className="ejv-btn__arrow-wrap">
        <Arrow />
      </span>
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
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          width="800"
          height="1067"
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

        <div className="ejv-hero__body ejv-in" style={{ '--d': 4 }}>
          <p className="ejv-hero__sub">
            Aprende las 5 herramientas que pueden transformar la manera en que tu negocio atrae clientes y genera ventas.
          </p>

          <ul className="ejv-hero__info">
            {HERO_INFO.map((i) => (
              <li key={i.k}><InfoIcon k={i.k} />{i.t}</li>
            ))}
          </ul>

          <div className="ejv-hero__ctas">
            <Button variant="hero" size="lg" {...ctaProps()}>
              QUIERO ASEGURAR MI CUPO
            </Button>
          </div>
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
      </div>
    </section>
  )
}

/* cinta de texto entre hero y problema */
function Marquee() {
  const items = ['EL JUEGO DE LAS VENTAS', '21 NOV 2026', 'TORRE MOVILNET · CARACAS', '5 HERRAMIENTAS', 'CUPOS LIMITADOS', 'WORKSHOP INMERSIVO']
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

/* ───────────────────────── 4. módulos ───────────────────────── */

function Modules() {
  const [openSet, setOpenSet] = useState(() => new Set())

  const toggleModule = (n) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })
  }

  const allOpen = openSet.size === MODULES.length

  const toggleAll = () => {
    if (allOpen) {
      setOpenSet(new Set())
    } else {
      setOpenSet(new Set(MODULES.map((m) => m.n)))
    }
  }

  return (
    <section id="temario" className="ejv-sec ejv-modules">
      <div className="ejv-container">
        <div className="ejv-modules__head">
          <div>
            <Eyebrow>TEMARIO</Eyebrow>
            <h2 className="ejv-h2" data-reveal>Qué vas a <em>aprender</em></h2>
          </div>
          <div className="ejv-modules__actions" data-reveal style={{ '--d': 1 }}>
            <button
              type="button"
              className="ejv-btn ejv-btn--blue ejv-btn--sm ejv-modules__toggle-all"
              onClick={toggleAll}
              aria-expanded={allOpen}
            >
              <span>{allOpen ? 'CERRAR TODOS LOS MÓDULOS' : 'DESPLEGAR TEMARIO COMPLETO'}</span>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transform: allOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="ejv-acc-modules" data-reveal>
          {MODULES.map((m, i) => {
            const s = speakerById(m.speaker)
            const isOpen = openSet.has(m.n)
            return (
              <div
                key={m.n}
                className={`ejv-acc-mod ${isOpen ? 'is-open' : ''}`}
                style={{ '--d': i }}
              >
                <button
                  type="button"
                  className="ejv-acc-mod__header"
                  onClick={() => toggleModule(m.n)}
                  aria-expanded={isOpen}
                  aria-controls={`mod-body-${m.n}`}
                  id={`mod-head-${m.n}`}
                >
                  <span className="ejv-acc-mod__n">{m.n}</span>
                  <div className="ejv-acc-mod__meta">
                    <div className="ejv-acc-mod__speaker">
                      <span className="ejv-acc-mod__badge">MÓDULO {m.n}</span>
                      <strong className="ejv-acc-mod__author">{s.first} {s.last}</strong>
                      <span className="ejv-tag ejv-tag--solid ejv-acc-mod__tag">{s.tag}</span>
                    </div>
                    <h3 className="ejv-acc-mod__title">{m.title}</h3>
                  </div>
                  <div className="ejv-acc-mod__action">
                    <span className="ejv-acc-mod__action-text">
                      {isOpen ? 'CERRAR' : 'DESPLEGAR'}
                    </span>
                    <span className="ejv-acc-mod__icon" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s var(--ease)',
                        }}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </button>

                <div
                  id={`mod-body-${m.n}`}
                  role="region"
                  aria-labelledby={`mod-head-${m.n}`}
                  className="ejv-acc-mod__collapse"
                >
                  <div className="ejv-acc-mod__content">
                    <div className="ejv-acc-mod__body">
                      <ul className="ejv-acc-mod__list">
                        {m.points.map((p) => (
                          <li key={p}>
                            <span className="ejv-acc-mod__tick" aria-hidden="true">
                              <svg viewBox="0 0 24 24" width="12" height="12">
                                <path
                                  d="m5 12.5 4.5 4.5L19 7.5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className="ejv-acc-mod__text">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
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

/* ───────────────────────── 6. oferta ───────────────────────── */

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
        <Eyebrow tone="light">TU PARTICIPACIÓN</Eyebrow>
        <h2 className="ejv-h2 ejv-h2--light" data-reveal>
          Tu participación <em>incluye:</em>
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
                <span>PRECIO HOY</span>
                <strong className={OFFER.price === null ? 'is-tbd' : ''}>{priceLabel()}</strong>
              </div>

              {cta}
              {notice && (
                <p className="ejv-ticket__notice" role="status">
                  El enlace de pago oficial se publicará muy pronto.
                </p>
              )}
              <p className="ejv-ticket__foot">Cupos limitados · Evento presencial</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 7. certificado ───────────────────────── */

function Certificate() {
  return (
    <section className="ejv-sec ejv-cert" id="certificado">
      <div className="ejv-container ejv-cert__grid">
        <div className="ejv-cert__info">
          <Eyebrow>CERTIFICADO DE PARTICIPACIÓN</Eyebrow>
          <h2 className="ejv-h2 ejv-h2--md" data-reveal>
            Tu aprendizaje también merece ser <em>reconocido.</em>
          </h2>
          <p className="ejv-lead" data-reveal style={{ '--d': 1 }}>
            Al participar en El Juego de las Ventas recibirás un certificado digital de participación en el workshop inmersivo.
          </p>
        </div>

        <div className="ejv-cert__stage" data-reveal>
          <div className="ejv-cert__card">
            <img
              src={imgCertificado}
              alt="Certificado digital de participación - El Juego de las Ventas"
              loading="lazy"
              decoding="async"
              width="1000"
              height="707"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 10. footer ───────────────────────── */

function Footer() {
  return (
    <footer className="ejv-footer" id="footer">
      <div className="ejv-container">
        <div className="ejv-footer__banner" data-reveal>
          <img
            src={imgFooter}
            alt="El Juego de las Ventas — Workshop Inmersivo"
            className="ejv-footer__banner-img"
            loading="lazy"
            decoding="async"
            width="1320"
            height="434"
          />
        </div>

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
        <span className="ejv-sticky__meta">
          <i className="ejv-sticky__dot" aria-hidden="true" />
          21 NOV · CARACAS · <em>$107</em>
        </span>
      </div>
      <Button variant="hero" size="sm" className="ejv-sticky__cta" tabIndex={visible ? 0 : -1} {...ctaProps()}>
        QUIERO MI CUPO
      </Button>
    </div>
  )
}

/* ───────────────────────── página ───────────────────────── */

export default function ElJuegoDeLasVentas() {
  const rootRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [hideSticky, setHideSticky] = useState(false)

  // SEO y tracking Meta Pixel
  useEffect(() => {
    initMetaPixel()
    const prevTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content')
    document.title = 'El Juego de las Ventas — Workshop Inmersivo | ECOM · 21 nov 2026, Caracas'
    meta?.setAttribute(
      'content',
      'Workshop presencial de 8 horas con 5 especialistas en contenido, anuncios, landing pages, IA y automatización. 21 de noviembre de 2026, Torre Movilnet, Caracas. Cupos limitados.',
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
      els.forEach((el) => {
        el.classList.add('is-in')
        el.setAttribute('data-revealed', 'true')
      })
      return undefined
    }
    root.classList.add('ejv-anim')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in')
            en.target.setAttribute('data-revealed', 'true')
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

  // La barra sticky se oculta cuando ya se ve la oferta o el footer
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const targets = ['entradas', 'footer'].map((id) => document.getElementById(id)).filter(Boolean)
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
      <a className="ejv-skip" href="#temario">Saltar al contenido</a>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <Marquee />
        <Modules />
        <Experts />
        <Offer />
        <Certificate />
      </main>
      <Footer />
      <StickyBar visible={pastHero && !hideSticky} />
    </div>
  )
}
