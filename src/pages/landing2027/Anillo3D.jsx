import React, { useEffect, useRef, useState } from 'react'
import { ANILLO } from './config'
import './Anillo3D.css'

/**
 * Anillo 3D de tarjetas que gira de forma continua (solo CSS 3D + rAF).
 * ---------------------------------------------------------------------
 * PROFUNDIDAD: el anillo se renderiza DOS veces, en dos capas idénticas y
 * sincronizadas (mismo ángulo e inclinación):
 *   · capa trasera  (z-index 1, debajo del titular) → solo tarjetas de la mitad posterior
 *   · capa delantera (z-index 3, encima del titular) → solo tarjetas de la mitad frontal
 * En cada frame se calcula el ángulo efectivo de cada tarjeta y se decide en qué
 * capa es visible. Se eligió esto en vez de mix-blend-mode/clip porque es exacto
 * para cualquier tamaño de pantalla y no altera los colores del titular.
 *
 * SOMBREADO: según cos(ángulo efectivo), opacidad 0.35 → 1 y brillo 0.45 → 1.
 *
 * INTERACCIÓN: hover ralentiza con easing, arrastre horizontal con inercia,
 * mouse vertical inclina el anillo entre -15° y -30°.
 */

const MOBILE_QUERY = '(max-width: 767px)'
const BASE_SPEED = -360 / 12 // grados por segundo: una vuelta cada 12 s (0 → -360)
const HOVER_FACTOR = 0.25 // velocidad relativa con el mouse encima
const GAP = 8 // px entre tarjetas
const STATIC_ANGLE = -20 // ángulo fijo con prefers-reduced-motion

function useMatch(query) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const on = (e) => setM(e.matches)
    mql.addEventListener('change', on)
    return () => mql.removeEventListener('change', on)
  }, [query])
  return m
}

/* Fuente de acento (serif itálica) cargada solo en esta página y sin bloquear el render */
function useAccentFont() {
  useEffect(() => {
    const id = 'l27-playfair-italic'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap'
    document.head.appendChild(link)
  }, [])
}

function Ring({ cards, layer, ringRef, cardRefs }) {
  return (
    <div className={`a3d__scene a3d__scene--${layer}`} aria-hidden="true">
      <div className="a3d__ring" ref={ringRef}>
        {cards.map((c, i) => (
          <div
            className="a3d__card"
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{ '--i': i }}
          >
            <img
              src={c.img}
              alt=""
              loading="lazy"
              decoding="async"
              draggable="false"
              style={c.position ? { objectPosition: c.position } : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Anillo3D() {
  useAccentFont()
  const isMobile = useMatch(MOBILE_QUERY)
  const reduced = useMatch('(prefers-reduced-motion: reduce)')
  const cards = isMobile ? ANILLO.cards.slice(0, 12) : ANILLO.cards
  const N = cards.length

  const sectionRef = useRef(null)
  const backRing = useRef(null)
  const frontRing = useRef(null)
  const backCards = useRef([])
  const frontCards = useRef([])

  // Estado mutable de la animación (fuera de React para no re-renderizar por frame)
  const st = useRef({
    angle: 0,
    speed: 1, // multiplicador actual de BASE_SPEED (con easing)
    speedTarget: 1,
    tilt: -22,
    tiltTarget: -22,
    inertia: 0, // grados/s extra tras soltar un arrastre
    dragging: false,
    lastX: 0,
    lastT: 0,
  })

  /* ── Radio del cilindro: R = (ancho + gap) / (2·tan(π/N)) ── */
  useEffect(() => {
    const setRadius = () => {
      const w = frontCards.current[0]?.offsetWidth || 160
      const r = (w + GAP) / (2 * Math.tan(Math.PI / N))
      ;[backRing.current, frontRing.current].forEach((ring) => {
        ring?.style.setProperty('--r', `${r.toFixed(1)}px`)
        ring?.style.setProperty('--step', `${360 / N}deg`)
      })
    }
    setRadius()
    window.addEventListener('resize', setRadius)
    return () => window.removeEventListener('resize', setRadius)
  }, [N])

  /* ── Bucle de animación ── */
  useEffect(() => {
    const s = st.current
    let frame = 0
    let last = 0
    let visible = false

    // Aplica ángulo/inclinación a ambas capas y reparte tarjetas entre delante/detrás
    const paint = () => {
      const t = `rotateX(${s.tilt.toFixed(2)}deg) rotateY(${s.angle.toFixed(2)}deg)`
      if (backRing.current) backRing.current.style.transform = t
      if (frontRing.current) frontRing.current.style.transform = t
      for (let i = 0; i < N; i++) {
        const eff = (((i * 360) / N + s.angle) % 360 + 360) % 360
        const cos = Math.cos((eff * Math.PI) / 180)
        const isFront = cos >= 0
        const depth = (cos + 1) / 2 // 0 = atrás, 1 = frente
        const shown = isFront ? frontCards.current[i] : backCards.current[i]
        const hidden = isFront ? backCards.current[i] : frontCards.current[i]
        if (shown) {
          shown.style.visibility = 'visible'
          shown.style.opacity = (0.35 + 0.65 * depth).toFixed(3)
          shown.style.filter = `brightness(${(0.45 + 0.55 * depth).toFixed(3)})`
        }
        if (hidden) hidden.style.visibility = 'hidden'
      }
    }

    if (reduced) {
      s.angle = STATIC_ANGLE
      s.tilt = -22
      paint()
      return
    }

    const tick = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
      last = now
      // Easing de velocidad (hover) e inclinación (mouse vertical)
      const k = 1 - Math.exp(-dt * 4)
      s.speed += (s.speedTarget - s.speed) * k
      s.tilt += (s.tiltTarget - s.tilt) * k
      if (!s.dragging) {
        s.angle += (BASE_SPEED * s.speed + s.inertia) * dt
        s.inertia *= Math.exp(-dt * 2.5) // la inercia se disipa y vuelve la rotación automática
      }
      paint()
      frame = visible ? requestAnimationFrame(tick) : 0
    }

    // Pausa cuando la sección no está en pantalla
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) {
        last = 0
        frame = requestAnimationFrame(tick)
      }
    })
    if (sectionRef.current) io.observe(sectionRef.current)
    paint()

    return () => {
      io.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [N, reduced])

  /* ── Interacción ── */
  const onEnter = () => (st.current.speedTarget = HOVER_FACTOR)
  const onLeave = () => {
    const s = st.current
    s.speedTarget = 1
    s.tiltTarget = -22
    s.dragging = false
  }
  const onMove = (e) => {
    const s = st.current
    if (e.pointerType === 'mouse') {
      const rect = sectionRef.current.getBoundingClientRect()
      const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height))
      s.tiltTarget = -15 - 15 * y // -15° arriba → -30° abajo
    }
    if (!s.dragging || reduced) return
    const now = performance.now()
    const dx = e.clientX - s.lastX
    const dt = Math.max((now - s.lastT) / 1000, 0.001)
    const delta = dx * 0.35 // px → grados
    s.angle += delta
    s.inertia = delta / dt - BASE_SPEED * s.speed // velocidad al soltar, relativa a la automática
    s.lastX = e.clientX
    s.lastT = now
  }
  const onDown = (e) => {
    if (reduced) return
    const s = st.current
    s.dragging = true
    s.inertia = 0
    s.lastX = e.clientX
    s.lastT = performance.now()
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onUp = (e) => {
    const s = st.current
    // Si se quedó quieto antes de soltar, no hay lanzamiento
    if (s.dragging && performance.now() - s.lastT > 120) s.inertia = 0
    s.dragging = false
    s.inertia = Math.max(-900, Math.min(900, s.inertia))
    if (e.pointerType !== 'mouse') s.speedTarget = 1
  }

  return (
    <section
      className="a3d"
      ref={sectionRef}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onEnter()}
      onPointerLeave={onLeave}
      onPointerMove={onMove}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      aria-labelledby="a3d-title"
    >
      <Ring cards={cards} layer="back" ringRef={backRing} cardRefs={backCards} />

      <h2 className="a3d__title" id="a3d-title">
        <span className="a3d__line">{ANILLO.line1}</span>
        <span className="a3d__line a3d__line--2">{ANILLO.line2}</span>
      </h2>

      <Ring cards={cards} layer="front" ringRef={frontRing} cardRefs={frontCards} />

      <footer className="a3d__footer">
        <p className="a3d__accent">{ANILLO.accent}</p>
        <div className="a3d__credits">
          <span>{ANILLO.footerLeft}</span>
          <span>{ANILLO.footerRight}</span>
        </div>
      </footer>

      {/* Lista accesible: el anillo es decorativo (aria-hidden) */}
      <div className="a3d__sr">
        <h3>{ANILLO.listTitle}</h3>
        <ul>
          {ANILLO.cards.map((c, i) => (
            <li key={i}>{c.alt}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
