import React, { useEffect, useRef, useState } from 'react'
import logoEcom from '../../assets/Elementos graficos/LOGO ECOM.webp'
import { CTA, HERO, EDICION_PASADA, MARCAS, CIERRE } from './config'
import { useScrollProgress, clamp } from './useScrollProgress'
import Galeria3D from './Galeria3D'
import Anillo3D from './Anillo3D'
import './Landing2027.css'

const easeOut = (t) => 1 - Math.pow(1 - t, 3)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function trackLead(placement) {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: 'ECOM 2027', content_category: placement })
  }
}

function CtaButton({ placement, className = '' }) {
  return (
    <a
      href={CTA.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`l27-cta ${className}`}
      onClick={() => trackLead(placement)}
    >
      <span>{CTA.label}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  )
}

/* ───────────────────────── HERO ───────────────────────── */

function Hero() {
  const hasVideo = Boolean(HERO.videoSrc || HERO.videoSrcWebm)
  const [vimeoReady, setVimeoReady] = useState(false)

  // Embed de Vimeo en modo fondo: sin controles, en silencio, autoplay y loop
  const vimeoSrc = HERO.vimeo?.id
    ? `https://player.vimeo.com/video/${HERO.vimeo.id}?${new URLSearchParams({
        ...(HERO.vimeo.hash ? { h: HERO.vimeo.hash } : {}),
        background: '1',
        autoplay: '1',
        loop: '1',
        muted: '1',
        autopause: '0',
        dnt: '1',
      })}`
    : ''

  const scrollToStory = (e) => {
    e.preventDefault()
    document.getElementById('edicion-pasada')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="l27-hero">
      <div className="l27-hero__media">
        {vimeoSrc ? (
          <>
            {/* Póster visible mientras carga el video */}
            <img
              className="l27-hero__video l27-hero__poster"
              src={HERO.poster}
              alt=""
              fetchpriority="high"
              decoding="async"
            />
            <iframe
              className={`l27-hero__vimeo${vimeoReady ? ' is-ready' : ''}`}
              src={vimeoSrc}
              title="Video ECOM"
              allow="autoplay; fullscreen; picture-in-picture"
              tabIndex={-1}
              aria-hidden="true"
              onLoad={() => setTimeout(() => setVimeoReady(true), 600)}
            />
          </>
        ) : hasVideo ? (
          <video
            className="l27-hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO.poster}
          >
            {HERO.videoSrcWebm && <source src={HERO.videoSrcWebm} type="video/webm" />}
            {HERO.videoSrc && <source src={HERO.videoSrc} type="video/mp4" />}
          </video>
        ) : (
          <img
            className="l27-hero__video l27-hero__poster"
            src={HERO.poster}
            alt=""
            fetchpriority="high"
            decoding="async"
          />
        )}
        <div className="l27-hero__shade" />
      </div>

      <nav className="l27-topbar">
        <img src={logoEcom} alt="ECOM" className="l27-topbar__logo" />
      </nav>

      <div className="l27-hero__content">
        <p className="l27-kicker">{HERO.kicker}</p>
        <h1 className="l27-hero__title">{HERO.title}</h1>
        <p className="l27-hero__sub">{HERO.subtitle}</p>
        <div className="l27-hero__actions">
          <CtaButton placement="hero" />
          <a href="#edicion-pasada" className="l27-ghost" onClick={scrollToStory}>
            Ver la edición pasada
          </a>
        </div>
      </div>

      <div className="l27-scroll-hint" aria-hidden="true">
        <span />
      </div>
    </header>
  )
}

/* ─────────────── SCROLLYTELLING: EDICIÓN PASADA ─────────────── */

function CountUp({ value, prefix = '', suffix = '', active }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = prefersReducedMotion() ? 0 : 1400
    const start = performance.now()
    let frame
    const tick = (now) => {
      const t = duration ? clamp((now - start) / duration) : 1
      setShown(Math.round(easeOut(t) * value))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, value])

  return (
    <span className="l27-count">
      {prefix}
      {shown.toLocaleString('es-VE')}
      {suffix}
    </span>
  )
}

function EdicionPasada() {
  const { steps, year } = EDICION_PASADA
  const n = steps.length
  const frames = useRef([])
  const [active, setActive] = useState(0)

  const ref = useScrollProgress((p) => {
    const t = p * n
    frames.current.forEach((frame, i) => {
      if (!frame) return
      // Cada foto se revela de abajo hacia arriba durante el final del paso anterior
      const reveal = i === 0 ? 1 : clamp((t - (i - 0.4)) / 0.4)
      frame.style.clipPath = `inset(${((1 - reveal) * 100).toFixed(2)}% 0 0 0)`
      // Zoom lento ("Ken Burns") ligado al scroll
      const zoom = 1.18 - 0.18 * clamp((t - i + 0.4) / 1.4)
      frame.firstChild.style.transform = `scale(${zoom.toFixed(4)})`
    })
    setActive(clamp(Math.floor(t + 0.2), 0, n - 1))
  })

  return (
    <section
      id="edicion-pasada"
      className="l27-story"
      ref={ref}
      style={{ '--steps': n }}
      aria-label={`Edición ${year}`}
    >
      <div className="l27-story__sticky">
        <div className="l27-story__media">
          {steps.map((s, i) => (
            <div
              className="l27-story__frame"
              key={i}
              ref={(el) => (frames.current[i] = el)}
              style={{ zIndex: i + 1 }}
            >
              <img src={s.image} alt="" loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
            </div>
          ))}
          <div className="l27-story__shade" />
        </div>

        <div className="l27-story__year" aria-hidden="true">
          {year}
        </div>

        <div className="l27-story__texts">
          {steps.map((s, i) => (
            <article
              key={i}
              className={`l27-step${i === active ? ' is-active' : ''}${i < active ? ' is-past' : ''}`}
              aria-hidden={i !== active}
            >
              {s.kicker && <p className="l27-kicker">{s.kicker}</p>}
              {s.stat && (
                <CountUp {...s.stat} active={i <= active} />
              )}
              <h2 className={s.stat ? 'l27-step__label' : 'l27-step__title'}>{s.title}</h2>
              {s.text && <p className="l27-step__text">{s.text}</p>}
            </article>
          ))}
        </div>

        <ol className="l27-story__dots" aria-hidden="true">
          {steps.map((_, i) => (
            <li key={i} className={i <= active ? 'is-on' : ''} />
          ))}
        </ol>

        <div className="l27-story__bar" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}

/* ─────────────── SCROLLYTELLING: MARCAS ─────────────── */

function Marcas() {
  const { logos } = MARCAS
  const items = useRef([])
  const [done, setDone] = useState(false)

  const ref = useScrollProgress((p) => {
    const w = window.innerWidth
    const h = window.innerHeight
    const N = logos.length
    items.current.forEach((el, i) => {
      if (!el) return
      // Cada logo arranca disperso fuera de su lugar (espiral dorada) y vuela a la grilla
      const delay = (i / N) * 0.4
      const e = easeOut(clamp((p - 0.08 - delay) / 0.35))
      const angle = i * 2.39996
      const radius = 0.55 + (i % 3) * 0.15
      const dx = Math.cos(angle) * w * radius * (1 - e)
      const dy = Math.sin(angle) * h * radius * (1 - e)
      const rot = (i % 2 ? 1 : -1) * 25 * (1 - e)
      el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${(0.5 + 0.5 * e).toFixed(3)})`
      el.style.opacity = e.toFixed(3)
    })
    setDone(p > 0.82)
  })

  return (
    <section className="l27-brands" ref={ref} aria-label={MARCAS.title}>
      <div className="l27-brands__sticky">
        <div className="l27-brands__glow" aria-hidden="true" />
        <header className="l27-brands__head">
          <p className="l27-kicker">{MARCAS.kicker}</p>
          <h2 className="l27-brands__title">{MARCAS.title}</h2>
        </header>

        <ul className="l27-brands__grid">
          {logos.map((logo, i) => (
            <li key={logo.name} className="l27-brand" ref={(el) => (items.current[i] = el)}>
              <img src={logo.src} alt={logo.name} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>

        <div className={`l27-brands__closing${done ? ' is-visible' : ''}`}>
          <p>{MARCAS.closing}</p>
          <CtaButton placement="marcas" />
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── CIERRE ───────────────────────── */

function Cierre() {
  return (
    <section className="l27-final">
      <h2>{CIERRE.title}</h2>
      <p>{CIERRE.text}</p>
      <CtaButton placement="cierre" />
      <footer className="l27-footer">
        <img src={logoEcom} alt="ECOM" />
        <span>© {new Date().getFullYear()} ECOM Venezuela</span>
      </footer>
    </section>
  )
}

export default function Landing2027() {
  useEffect(() => {
    const prev = document.title
    document.title = 'ECOM 2027 | El evento de ecommerce más grande de Venezuela'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div className="l27">
      <Hero />
      <EdicionPasada />
      <Anillo3D />
      <Marcas />
      <Galeria3D />
      <Cierre />
    </div>
  )
}
