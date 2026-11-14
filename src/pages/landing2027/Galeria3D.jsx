import React, { useEffect, useState } from 'react'
import { GALERIA } from './config'
import './Galeria3D.css'

/**
 * Galería 3D "stacked cards → 3D fan"
 * ------------------------------------
 * Estado 1 (apilado):  mazo de tarjetas, solo asoma el borde superior de las de atrás.
 * Estado 2 (abanico):  hover/focus en la sección → las tarjetas giran en Y y se separan en diagonal.
 * Estado 3 (activa):   hover/focus en una tarjeta → sube 50px y muestra su pill.
 * Móvil / táctil:      tap en la sección alterna apilado ↔ abanico; tap en una tarjeta la eleva.
 *
 * Los transforms se calculan aquí y se pasan como variables CSS
 * (--tx, --ty, --tz, --ry, --s); el CSS solo los combina.
 */

// Táctil o pantalla pequeña → modo "tap"
const TOUCH_QUERY = '(hover: none), (max-width: 767px)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

// Parámetros de cada estado (desktop vs. móvil)
const LAYOUT = {
  desktop: { spread: 140, depth: 120, rotate: -28 },
  mobile: { spread: 70, depth: 90, rotate: -20 },
  stackOffset: 22, // px que asoma cada tarjeta de atrás
  stackScale: 0.06, // reducción de escala por nivel
  lift: 50, // px que sube la tarjeta activa
}

function cardVars(i, { open, active, isTouch, reduced }) {
  const { spread, depth, rotate } = isTouch ? LAYOUT.mobile : LAYOUT.desktop

  if (!open) {
    // ESTADO 1 — apilado
    return {
      '--tx': '0px',
      '--ty': `${-i * LAYOUT.stackOffset}px`,
      '--tz': '0px',
      '--ry': '0deg',
      '--s': 1 - i * LAYOUT.stackScale,
    }
  }

  // ESTADO 2 — abanico (+ ESTADO 3 si es la activa)
  return {
    '--tx': `${i * spread}px`,
    '--ty': `${active === i ? -LAYOUT.lift : 0}px`,
    '--tz': reduced ? '0px' : `${-i * depth}px`,
    '--ry': reduced ? '0deg' : `${rotate}deg`,
    '--s': 1,
  }
}

export default function Galeria3D() {
  const { cards } = GALERIA
  const isTouch = useMediaQuery(TOUCH_QUERY)
  const reduced = useMediaQuery(REDUCED_QUERY)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  const { spread } = isTouch ? LAYOUT.mobile : LAYOUT.desktop
  // Desplaza el stage a la izquierda para centrar visualmente el abanico
  const shift = open ? -((cards.length - 1) * spread) / 2 : 0

  const close = () => {
    setOpen(false)
    setActive(null)
  }

  /* ── Mouse (desktop) ── */
  const onSectionEnter = () => !isTouch && setOpen(true)
  const onSectionLeave = () => !isTouch && close()
  const onCardEnter = (i) => !isTouch && setActive(i)
  const onCardLeave = () => !isTouch && setActive(null)

  /* ── Tap (móvil) ── */
  const onSectionClick = () => {
    if (!isTouch) return
    if (open) close()
    else setOpen(true)
  }
  const onCardClick = (e, i) => {
    if (!isTouch) return
    e.stopPropagation()
    if (!open) setOpen(true)
    else setActive((cur) => (cur === i ? null : i))
  }

  /* ── Teclado ── */
  const onCardFocus = (i) => {
    setOpen(true)
    setActive(i)
  }
  const onStageBlur = (e) => {
    // Cierra solo si el foco salió del stage completo
    if (!e.currentTarget.contains(e.relatedTarget)) close()
  }
  const onCardKey = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActive((cur) => (cur === i ? null : i))
    } else if (e.key === 'Escape') {
      e.currentTarget.blur()
      close()
    }
  }

  return (
    <section
      className={`g3d${open ? ' is-open' : ''}${reduced ? ' is-reduced' : ''}`}
      onPointerEnter={onSectionEnter}
      onPointerLeave={onSectionLeave}
      onClick={onSectionClick}
      aria-label={GALERIA.title}
    >
      <header className="g3d__head">
        <p className="l27-kicker">{GALERIA.kicker}</p>
        <h2 className="g3d__title">{GALERIA.title}</h2>
      </header>

      <div className="g3d__stage" style={{ '--shift': `${shift}px` }} onBlur={onStageBlur}>
        {cards.map((card, i) => (
          <figure
            key={card.label}
            className={`g3d__card${active === i ? ' is-active' : ''}`}
            style={{
              ...cardVars(i, { open, active, isTouch, reduced }),
              zIndex: cards.length - i,
              transitionDelay: `${i * 40}ms`,
            }}
            tabIndex={0}
            onPointerEnter={() => onCardEnter(i)}
            onPointerLeave={onCardLeave}
            onClick={(e) => onCardClick(e, i)}
            onFocus={() => onCardFocus(i)}
            onKeyDown={(e) => onCardKey(e, i)}
          >
            <span className="g3d__pill">{card.label}</span>
            <div className="g3d__frame">
              <img src={card.src} alt={card.alt || card.label} loading="lazy" decoding="async" />
            </div>
          </figure>
        ))}
      </div>

      <p className="g3d__hint" aria-hidden="true">
        {isTouch ? 'Toca para abrir' : 'Pasa el mouse para explorar'}
      </p>
    </section>
  )
}
