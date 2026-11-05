import { useEffect } from 'react'
import p1 from '../assets/el juego de las ventas/brochure/page-1.webp'
import p2 from '../assets/el juego de las ventas/brochure/page-2.webp'
import p3 from '../assets/el juego de las ventas/brochure/page-3.webp'
import p4 from '../assets/el juego de las ventas/brochure/page-4.webp'
import p5 from '../assets/el juego de las ventas/brochure/page-5.webp'
import p6 from '../assets/el juego de las ventas/brochure/page-6.webp'
import p7 from '../assets/el juego de las ventas/brochure/page-7.webp'

// Brochure del evento (7 páginas, exportadas del PDF original a WebP 1200 px de ancho).
// Se muestra como una columna continua a pantalla completa: sin marcos, bordes ni UI extra.
const PAGES = [p1, p2, p3, p4, p5, p6, p7]
const BG = '#030a2e'

const wrapStyle = {
  minHeight: '100dvh',
  background: BG,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const imgStyle = {
  display: 'block',
  width: '100%',
  maxWidth: 900,
  height: 'auto',
  margin: 0,
  padding: 0,
  border: 0,
  userSelect: 'none',
  WebkitUserSelect: 'none',
}

export default function EjdlvBroshure() {
  useEffect(() => {
    const prevTitle = document.title
    const prevBg = document.body.style.background
    const prevMargin = document.body.style.margin
    document.title = 'Brochure · El Juego de las Ventas'
    document.body.style.background = BG
    document.body.style.margin = '0'
    return () => {
      document.title = prevTitle
      document.body.style.background = prevBg
      document.body.style.margin = prevMargin
    }
  }, [])

  return (
    <main style={wrapStyle}>
      {PAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Brochure El Juego de las Ventas, página ${i + 1} de ${PAGES.length}`}
          width="1200"
          height="1600"
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : 'auto'}
          decoding="async"
          draggable="false"
          style={imgStyle}
        />
      ))}
    </main>
  )
}
