import { useEffect, useRef } from 'react'

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))

/**
 * Mide cuánto se ha recorrido una sección "alta" con contenido sticky.
 * progress = 0 cuando la sección toca el borde superior de la pantalla,
 * progress = 1 cuando su final llega al borde inferior.
 *
 * `onProgress(p)` se llama dentro de requestAnimationFrame y está pensado
 * para escribir estilos directamente en el DOM (sin re-renders de React).
 */
export function useScrollProgress(onProgress) {
  const ref = useRef(null)
  const cb = useRef(onProgress)

  useEffect(() => {
    cb.current = onProgress
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    let last = -1

    const measure = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const distance = rect.height - window.innerHeight
      const p = distance > 0 ? clamp(-rect.top / distance) : 0
      if (p !== last) {
        last = p
        el.style.setProperty('--p', p.toFixed(4))
        cb.current?.(p)
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}

export { clamp }
