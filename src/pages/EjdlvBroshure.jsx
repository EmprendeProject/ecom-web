import { useEffect } from 'react'
import brochureUrl from '../assets/el juego de las ventas/brochure el juego de las ventas 2da preventa.pdf'

// Página mínima: el brochure del evento a pantalla completa, sin marcos ni UI adicional.
const style = {
  position: 'fixed',
  inset: 0,
  width: '100vw',
  height: '100dvh',
  border: 0,
  margin: 0,
  padding: 0,
  display: 'block',
  background: '#ffffff',
}

export default function EjdlvBroshure() {
  useEffect(() => {
    const prevTitle = document.title
    const prevOverflow = document.body.style.overflow
    document.title = 'Brochure · El Juego de las Ventas'
    document.body.style.overflow = 'hidden'
    return () => {
      document.title = prevTitle
      document.body.style.overflow = prevOverflow
    }
  }, [])

  return (
    <iframe
      src={`${brochureUrl}#view=FitH&navpanes=0`}
      title="Brochure El Juego de las Ventas"
      style={style}
    />
  )
}

