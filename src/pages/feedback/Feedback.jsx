import React, { useEffect, useRef, useState } from 'react'
import logoEcom from '../../assets/Elementos graficos/LOGO ECOM.webp'
import { ChessPiece, PieceDefs } from '../eljuegodelasventas/ChessPiece'
import { SPEAKERS, MODULES, photoOf } from '../eljuegodelasventas/data'
import { EVENT } from '../eljuegodelasventas/config'
import {
  FEEDBACK_ENDPOINT, LIKED_OPTIONS, IMPROVE_OPTIONS, IMPROVE_NONE, TOPIC_OPTIONS,
} from './config'
import '../eljuegodelasventas/ElJuegoDeLasVentas.css'
import './Feedback.css'

/* ───────────────────────── datos ───────────────────────── */

const SENT_KEY = 'ejdlv-feedback-enviado'

// Conferencias en el orden en que se dictaron (temario oficial).
const TALKS = MODULES.map((m) => ({ ...m, speaker: SPEAKERS.find((s) => s.id === m.speaker) }))

const EMPTY = {
  nombre: '',
  experiencia: null,
  gusto: [],
  gustoOtro: '',
  mejoras: [],
  mejorasOtro: '',
  temas: [],
  temasOtro: '',
  conferencias: {}, // speakerId -> 1..5, o 0 = "No la vi"
}

// Cada jugada avanza una pieza: del peón al rey.
const STEPS = [
  {
    key: 'experiencia',
    piece: 'pawn',
    title: <>¿Qué tal fue tu <em>experiencia?</em></>,
    hint: 'Del 1 al 10, ¿qué puntaje le das a El Juego de las Ventas?',
  },
  {
    key: 'gusto',
    piece: 'bishop',
    title: <>¿Qué fue lo que <em>más te gustó?</em></>,
    hint: 'Elige todas las opciones que quieras.',
  },
  {
    key: 'mejoras',
    piece: 'rook',
    title: <>¿Qué <em>mejorarías?</em></>,
    hint: 'Tu sinceridad nos ayuda a hacer una mejor próxima edición.',
  },
  {
    key: 'temas',
    piece: 'queen',
    title: <>¿Qué tema quieres ver en la <em>próxima edición?</em></>,
    hint: 'Elige los que te interesen o propón uno nuevo.',
  },
  {
    key: 'conferencias',
    piece: 'king',
    title: <>Califica cada <em>conferencia</em></>,
    hint: 'Toca las estrellas. Si no viste alguna, márcala como “No la vi”.',
  },
]

const INTRO = -1
const DONE = STEPS.length

const STAR_LABELS = ['Mala', 'Regular', 'Buena', 'Muy buena', '¡Excelente!']

const reaction = (n) => {
  if (n <= 3) return '😕 Lo sentimos. Cuéntanos qué falló en las siguientes jugadas.'
  if (n <= 6) return '🤔 Gracias por tu sinceridad. Queremos llegar mucho más lejos.'
  if (n <= 8) return '🙌 ¡Qué bueno! Vamos por ese 10 en la próxima.'
  return '♚ ¡Jaque mate! Nos alegra muchísimo que lo hayas disfrutado.'
}

const hasAnswer = (a, key) => {
  switch (key) {
    case 'experiencia': return a.experiencia !== null
    case 'gusto': return a.gusto.length > 0 || a.gustoOtro.trim() !== ''
    case 'mejoras': return a.mejoras.length > 0 || a.mejorasOtro.trim() !== ''
    case 'temas': return a.temas.length > 0 || a.temasOtro.trim() !== ''
    case 'conferencias': return TALKS.every((t) => a.conferencias[t.speaker.id] !== undefined)
    default: return false
  }
}

// Una fila plana: cada clave es una columna en Google Sheets.
const buildRow = (a, id) => {
  const row = {
    ID: id,
    Nombre: a.nombre.trim(),
    'Experiencia (1-10)': a.experiencia,
    'Lo que más gustó': a.gusto.join(', '),
    'Lo que más gustó (comentario)': a.gustoOtro.trim(),
    'Qué mejoraría': a.mejoras.join(', '),
    'Qué mejoraría (comentario)': a.mejorasOtro.trim(),
    'Temas próxima edición': a.temas.join(', '),
    'Temas próxima edición (otro)': a.temasOtro.trim(),
  }
  TALKS.forEach(({ speaker: s }) => {
    const v = a.conferencias[s.id]
    row[`Conferencia ${s.first} ${s.last} (1-5)`] = v === 0 ? 'No la vi' : v ?? ''
  })
  return row
}

const newId = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const ATTEMPTS = 3
const ATTEMPT_TIMEOUT_MS = 20000

// Error que no se arregla reintentando (el script respondió, pero con ok:false).
class ScriptError extends Error {}

async function postOnce(row) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), ATTEMPT_TIMEOUT_MS)
  try {
    // text/plain = petición "simple" (sin preflight CORS); Apps Script responde con CORS abierto,
    // así que podemos leer su respuesta y confirmar que la fila se guardó.
    const res = await fetch(FEEDBACK_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(row),
      keepalive: true, // si la persona cierra la pestaña mientras se envía, la petición igual termina
      signal: ctrl.signal,
    })
    const data = await res.json().catch(() => null)
    if (data && data.ok === false) throw new ScriptError(data.error || 'El Apps Script respondió ok:false')
    if (!res.ok || !data?.ok) throw new Error(`Respuesta inesperada del Apps Script (HTTP ${res.status})`)
  } finally {
    clearTimeout(timer)
  }
}

// Solo se considera enviado si Apps Script confirma { ok: true }.
// La conexión con Google a veces se corta o tarda mucho: se reintenta automáticamente.
// Cada respuesta lleva un ID único, así que un reintento nunca duplica la fila.
async function sendFeedback(row) {
  if (!FEEDBACK_ENDPOINT) {
    throw new Error('FEEDBACK_ENDPOINT está vacío: configura la URL del Apps Script en config.js')
  }
  let lastErr
  for (let i = 0; i < ATTEMPTS; i++) {
    try {
      return await postOnce(row)
    } catch (err) {
      lastErr = err
      console.warn(`[feedback] intento ${i + 1}/${ATTEMPTS} falló:`, err)
      if (err instanceof ScriptError) break
      if (i < ATTEMPTS - 1) await wait(1500 * (i + 1))
    }
  }
  throw lastErr
}

const wasSent = () => {
  try { return localStorage.getItem(SENT_KEY) === '1' } catch { return false }
}

/* ───────────────────────── piezas de UI ───────────────────────── */

const Check = ({ size = 12 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

const Arrow = ({ back = false }) => (
  <svg className="ejv-btn__arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" style={back ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" />
  </svg>
)

function Wordmark() {
  return (
    <span className="ejv-wordmark" aria-label="El Juego de las Ventas">
      <span className="ejv-wordmark__sq" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="ejv-wordmark__txt"><b>EL JUEGO</b><b>DE LAS VENTAS</b></span>
    </span>
  )
}

// Tablero de 5 casillas: una pieza por jugada.
function Board({ step, className = '' }) {
  return (
    <ol className={`ejf-board ${className}`} aria-hidden="true">
      {STEPS.map((s, i) => (
        <li key={s.key} className={i < step ? 'is-done' : i === step ? 'is-current' : ''}>
          <ChessPiece type={s.piece} variant="solid" />
        </li>
      ))}
    </ol>
  )
}

function Scale({ value, onChange }) {
  return (
    <div className="ejf-q">
      <div className="ejf-scale" role="radiogroup" aria-label="Puntaje del 1 al 10">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} de 10`}
            className={`ejf-scale__btn ${value !== null && n <= value ? 'is-fill' : ''} ${value === n ? 'is-on' : ''}`}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="ejf-scale__legend" aria-hidden="true">
        <span>1 · Nada bien</span>
        <span>10 · ¡Increíble!</span>
      </div>
      {value !== null && (
        <p className="ejf-react" key={reaction(value)} role="status">{reaction(value)}</p>
      )}
    </div>
  )
}

function Chips({ options, value, onChange, exclusive }) {
  const toggle = (o) => {
    if (value.includes(o)) return onChange(value.filter((v) => v !== o))
    if (o === exclusive) return onChange([o])
    return onChange([...value.filter((v) => v !== exclusive), o])
  }
  return (
    <div className="ejf-chips">
      {options.map((o) => {
        const on = value.includes(o)
        return (
          <button key={o} type="button" aria-pressed={on} className="ejf-chip" onClick={() => toggle(o)}>
            <span className="ejf-chip__tick"><Check size={11} /></span>
            {o}
          </button>
        )
      })}
    </div>
  )
}

function TextField({ id, label, value, onChange, placeholder, multiline = true }) {
  const Tag = multiline ? 'textarea' : 'input'
  return (
    <div className="ejf-field">
      <label className="ejf-field__label" htmlFor={id}>{label}</label>
      <Tag
        id={id}
        className={multiline ? 'ejf-textarea' : 'ejf-input'}
        value={value}
        placeholder={placeholder}
        maxLength={multiline ? 1000 : 80}
        onChange={(e) => onChange(e.target.value)}
        {...(multiline ? { rows: 3 } : { type: 'text', autoComplete: 'name' })}
      />
    </div>
  )
}

function TalkRating({ talk, value, onChange }) {
  const s = talk.speaker
  const photo = photoOf(s)
  const name = `${s.first} ${s.last}`
  return (
    <li className={`ejf-talk ${value !== undefined ? 'is-done' : ''} ${value === 0 ? 'is-skipped' : ''}`}>
      <div className="ejf-talk__photo">
        {photo ? (
          <img src={photo} alt="" loading="lazy" decoding="async" width="800" height="1067" draggable="false" />
        ) : (
          <span className="ejf-talk__ini">{s.initials}</span>
        )}
      </div>
      <div className="ejf-talk__info">
        <p className="ejf-talk__n">CONFERENCIA {talk.n} · {s.tag}</p>
        <p className="ejf-talk__name">{name}</p>
        <p className="ejf-talk__topic">{talk.title}</p>
      </div>
      <div className="ejf-talk__rate">
        <div className="ejf-stars" role="radiogroup" aria-label={`Calificación para ${name}`}>
          {STAR_LABELS.map((label, i) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={value === i + 1}
              aria-label={`${i + 1} de 5 — ${label}`}
              className={`ejf-star ${value > i ? 'is-on' : ''}`}
              onClick={() => onChange(i + 1)}
            >
              <Star />
            </button>
          ))}
        </div>
        <span className="ejf-talk__label" aria-hidden="true">
          {value > 0 ? STAR_LABELS[value - 1] : ''}
        </span>
        <button
          type="button"
          className="ejf-talk__skip"
          aria-pressed={value === 0}
          onClick={() => onChange(value === 0 ? undefined : 0)}
        >
          No la vi
        </button>
      </div>
    </li>
  )
}

/* ───────────────────────── página ───────────────────────── */

export default function Feedback() {
  const [step, setStep] = useState(() => (wasSent() ? DONE : INTRO))
  const [a, setA] = useState(EMPTY)
  const submissionId = useRef(null) // se conserva entre reintentos manuales para no duplicar
  const [status, setStatus] = useState('idle') // idle | sending | error

  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Tu feedback — El Juego de las Ventas | ECOM'
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex'
    document.head.appendChild(robots)
    return () => {
      document.title = prevTitle
      robots.remove()
    }
  }, [])

  const set = (key, v) => setA((p) => ({ ...p, [key]: v }))
  const rateTalk = (id, v) => setA((p) => {
    const conferencias = { ...p.conferencias }
    if (v === undefined) delete conferencias[id]
    else conferencias[id] = v
    return { ...p, conferencias }
  })

  const go = (n) => {
    setStep(n)
    setStatus('idle')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async () => {
    setStatus('sending')
    if (!submissionId.current) submissionId.current = newId()
    try {
      await sendFeedback(buildRow(a, submissionId.current))
      try { localStorage.setItem(SENT_KEY, '1') } catch { /* almacenamiento bloqueado */ }
      go(DONE)
    } catch (err) {
      console.error('[feedback] error al enviar', err)
      setStatus('error')
    }
  }

  const restart = () => {
    try { localStorage.removeItem(SENT_KEY) } catch { /* almacenamiento bloqueado */ }
    setA(EMPTY)
    submissionId.current = null
    go(INTRO)
  }

  const current = STEPS[step]
  const inQuiz = step >= 0 && step < DONE
  const answered = inQuiz && hasAnswer(a, current.key)
  const isLast = step === DONE - 1
  const firstName = a.nombre.trim().split(/\s+/)[0]

  const talksLeft = TALKS.filter((t) => a.conferencias[t.speaker.id] === undefined).length

  return (
    <div className="ejv ejf">
      <PieceDefs />

      <div className="ejf-bg" aria-hidden="true">
        <div className="ejv-hero__glow ejv-hero__glow--a" />
        <div className="ejv-hero__glow ejv-hero__glow--b" />
        <div className="ejv-hero__grid" />
        <div className="ejv-hero__board" />
        <span className="ejv-float ejv-float--ring" />
        <span className="ejv-float ejv-float--sq1" />
        <ChessPiece type="queen" variant="outline" className="ejv-float ejv-float--piece1" />
        <ChessPiece type="rook" variant="outline" className="ejv-float ejv-float--piece2" />
      </div>

      <header className={`ejf-top ${inQuiz ? 'ejf-top--quiz' : ''}`}>
        <div className="ejf-brand">
          <img src={logoEcom} alt="ECOM" width="110" height="21" />
          <span className="ejf-brand__x" aria-hidden="true">×</span>
          <Wordmark />
        </div>
        {inQuiz && <Board step={step} className="ejf-board--top" />}
      </header>

      <main className="ejf-main">
        <div className="ejf-card">
          <div className="ejf-card__inner">

            {/* ───── bienvenida ───── */}
            {step === INTRO && (
              <section className="ejf-step ejf-intro" key="intro">
                <p className="ejv-eyebrow ejv-eyebrow--light">TU OPINIÓN · {EVENT.dateShort}</p>
                <h1 className="ejf-intro__title" aria-label="¿Cómo estuvo El Juego?">
                  <span className="ejv-line" aria-hidden="true"><b style={{ '--d': 0 }}>¿CÓMO</b></span>
                  <span className="ejv-line ejv-line--outline" aria-hidden="true"><b style={{ '--d': 1 }}>ESTUVO</b></span>
                  <span className="ejv-line" aria-hidden="true"><b style={{ '--d': 2 }}>EL JUEGO?</b></span>
                </h1>
                <p className="ejf-intro__sub">
                  Gracias por jugar con nosotros. Tu opinión define la próxima partida:
                  son <strong>5 jugadas rápidas</strong> y te toma menos de 2 minutos.
                </p>
                <Board step={-1} className="ejf-board--intro" />
                <TextField
                  id="ejf-nombre"
                  label="¿Cómo te llamas? (opcional)"
                  placeholder="Tu nombre"
                  value={a.nombre}
                  onChange={(v) => set('nombre', v)}
                  multiline={false}
                />
                <div className="ejf-intro__cta">
                  <button type="button" className="ejv-btn ejv-btn--hero ejv-btn--lg ejv-btn--block" onClick={() => go(0)}>
                    <span className="ejv-btn__text">EMPEZAR</span>
                    <span className="ejv-btn__arrow-wrap"><Arrow /></span>
                  </button>
                </div>
              </section>
            )}

            {/* ───── jugadas ───── */}
            {inQuiz && (
              <section className="ejf-step" key={current.key} aria-labelledby="ejf-q-title">
                <div className="ejf-step__head">
                  <div>
                    <p className="ejv-eyebrow ejv-eyebrow--light">JUGADA {step + 1} DE {STEPS.length}</p>
                    <h1 className="ejf-title" id="ejf-q-title">{current.title}</h1>
                    <p className="ejf-hint">{current.hint}</p>
                  </div>
                  <ChessPiece type={current.piece} variant="3d" className="ejf-step__piece" />
                </div>

                {current.key === 'experiencia' && (
                  <Scale value={a.experiencia} onChange={(v) => set('experiencia', v)} />
                )}

                {current.key === 'gusto' && (
                  <div className="ejf-q">
                    <Chips options={LIKED_OPTIONS} value={a.gusto} onChange={(v) => set('gusto', v)} />
                    <TextField
                      id="ejf-gusto"
                      label="¿Algo más que quieras destacar?"
                      placeholder="Ej. Un momento o una herramienta que te voló la cabeza…"
                      value={a.gustoOtro}
                      onChange={(v) => set('gustoOtro', v)}
                    />
                  </div>
                )}

                {current.key === 'mejoras' && (
                  <div className="ejf-q">
                    <Chips options={IMPROVE_OPTIONS} value={a.mejoras} onChange={(v) => set('mejoras', v)} exclusive={IMPROVE_NONE} />
                    <TextField
                      id="ejf-mejoras"
                      label="Cuéntanos más (opcional)"
                      placeholder="¿Qué cambiarías para que la experiencia fuera un 10?"
                      value={a.mejorasOtro}
                      onChange={(v) => set('mejorasOtro', v)}
                    />
                  </div>
                )}

                {current.key === 'temas' && (
                  <div className="ejf-q">
                    <Chips options={TOPIC_OPTIONS} value={a.temas} onChange={(v) => set('temas', v)} />
                    <TextField
                      id="ejf-temas"
                      label="¿Otro tema? Propónlo"
                      placeholder="Escribe el tema que te gustaría aprender…"
                      value={a.temasOtro}
                      onChange={(v) => set('temasOtro', v)}
                    />
                  </div>
                )}

                {current.key === 'conferencias' && (
                  <ul className="ejf-q ejf-talks">
                    {TALKS.map((t) => (
                      <TalkRating
                        key={t.n}
                        talk={t}
                        value={a.conferencias[t.speaker.id]}
                        onChange={(v) => rateTalk(t.speaker.id, v)}
                      />
                    ))}
                  </ul>
                )}

                {status === 'sending' && (
                  <p className="ejf-sending" role="status">
                    Guardando tu respuesta… puede tardar unos segundos, no cierres esta página.
                  </p>
                )}

                {status === 'error' && (
                  <p className="ejf-error" role="alert">
                    No pudimos enviar tu respuesta. Revisa tu conexión e inténtalo de nuevo.
                  </p>
                )}

                <div className="ejf-actions">
                  <button type="button" className="ejf-back" onClick={() => go(step - 1)}>
                    <Arrow back /> ATRÁS
                  </button>

                  {isLast ? (
                    <button
                      type="button"
                      className="ejv-btn ejv-btn--hero ejf-next"
                      disabled={!answered || status === 'sending'}
                      onClick={submit}
                    >
                      <span className="ejv-btn__text">
                        {status === 'sending'
                          ? 'ENVIANDO…'
                          : answered ? 'ENVIAR MI FEEDBACK' : `FALTAN ${talksLeft}`}
                      </span>
                      {status !== 'sending' && answered && <span className="ejv-btn__arrow-wrap"><Arrow /></span>}
                    </button>
                  ) : step === 0 ? (
                    <button type="button" className="ejv-btn ejv-btn--hero ejf-next" disabled={!answered} onClick={() => go(1)}>
                      <span className="ejv-btn__text">SIGUIENTE</span>
                      <span className="ejv-btn__arrow-wrap"><Arrow /></span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`ejv-btn ${answered ? 'ejv-btn--hero' : 'ejv-btn--ghost'} ejf-next`}
                      onClick={() => go(step + 1)}
                    >
                      <span className="ejv-btn__text">{answered ? 'SIGUIENTE' : 'OMITIR'}</span>
                      <span className="ejv-btn__arrow-wrap"><Arrow /></span>
                    </button>
                  )}
                </div>
              </section>
            )}

            {/* ───── gracias ───── */}
            {step === DONE && (
              <section className="ejf-step ejf-done" key="done">
                <div className="ejf-done__piece">
                  <ChessPiece type="king" variant="3d" />
                  <span className="ejf-done__shadow" aria-hidden="true" />
                </div>
                <p className="ejv-eyebrow ejv-eyebrow--light">FEEDBACK RECIBIDO</p>
                <h1 className="ejf-title ejf-title--center">
                  ¡Jaque mate{firstName ? <>, <em>{firstName}</em></> : ''}!
                </h1>
                <p className="ejf-done__text">
                  Gracias por tomarte el tiempo. Leemos cada respuesta para que la próxima
                  edición de <strong>El Juego de las Ventas</strong> sea todavía mejor.
                </p>
                <button type="button" className="ejf-again" onClick={restart}>
                  Enviar otra respuesta
                </button>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
