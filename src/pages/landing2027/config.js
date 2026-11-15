/**
 * CONFIGURACIÓN EDITABLE — LANDING ECOM 2027
 * ------------------------------------------
 * Todo el contenido de la landing vive aquí. Para cambiar imágenes,
 * reemplaza los imports por los archivos reales.
 */

// ── Imágenes provisionales (reemplazar por las reales) ──
import foto1 from '../../assets/fotos/stands 1.jpeg'
import foto2 from '../../assets/fotos/stands 2.jpeg'
import foto3 from '../../assets/fotos/stands 3.jpeg'
import foto4 from '../../assets/fotos/stands 4.jpeg'

import logoDHL from '../../assets/marcas anteriores/DHL.png'
import logoTFHKA from '../../assets/marcas anteriores/TFHKA AI LOGO-02.png'
import logoDropanas from '../../assets/marcas anteriores/WhatsApp Image 2025-10-11 at 5.06.13 PM.png'
import logoAbuday from '../../assets/marcas anteriores/abuday.png'
import logoCalidex from '../../assets/marcas anteriores/calidex.png'
import logoCavecom from '../../assets/marcas anteriores/cavecom-e.png'
import logoDropi from '../../assets/marcas anteriores/dropi.png'
import logoGalanet from '../../assets/marcas anteriores/galanet.png'
import logoKomvii from '../../assets/marcas anteriores/komvii.png'
import logoNewEmprende from '../../assets/marcas anteriores/newemprende horizontal.png'
import logoOferfly from '../../assets/marcas anteriores/oferfly.png'
import logoPancakeMeta from '../../assets/marcas anteriores/pancake & meta.png'
import logoR4 from '../../assets/marcas anteriores/r4.png'
import logoSellibri from '../../assets/marcas anteriores/sellibrí Horizontal - Blanco.png'
import logoZoom from '../../assets/marcas anteriores/zoom.png'

// ── CTA principal (hero, cierre de marcas y cierre final) ──
export const CTA = {
  label: 'QUIERO SER PARTE DE ECOM 2027',
  url: 'https://wa.me/584226324938?text=¡Hola!%20Quiero%20información%20sobre%20ECOM%202027',
}

// ── Hero ──
export const HERO = {
  // Video de fondo. Recomendado: MP4 (H.264) de 10-20 s, sin audio, ≤ 6 MB,
  // colocado en /public (ej. '/videos/hero-2027.mp4'). Mientras esté vacío
  // se muestra la imagen `poster` con un zoom lento.
  // Video de Vimeo (tiene prioridad sobre videoSrc). De la URL
  // vimeo.com/1246927283/cde4f5798c → id: '1246927283', hash: 'cde4f5798c'.
  vimeo: { id: '1246927283', hash: 'cde4f5798c' },
  videoSrc: '',
  videoSrcWebm: '', // opcional, más liviano
  poster: foto1,
  kicker: 'Tercera edición · Caracas, Venezuela',
  title: 'ECOM 2027',
  subtitle: 'El evento de ecommerce más grande de Venezuela vuelve. Todo para aumentar las ventas por internet, en un solo lugar.',
}

// ── Scrollytelling: edición pasada (ECOM 2026 — segunda edición) ──
// Fuente: Tickets.jsx, Cronograma.jsx y material de ubicación de ECOM 2026.
// Cada paso ocupa una "pantalla" de scroll. `stat` es opcional (cuenta hacia arriba).
export const EDICION_PASADA = {
  year: '2026',
  steps: [
    {
      image: foto1,
      kicker: 'ECOM 2026 · Segunda edición',
      title: 'Así se vivió la edición pasada',
      text: '26 y 27 de septiembre en el CC Líder, Caracas. Dos días donde el ecommerce venezolano se reunió en un solo lugar.',
    },
    {
      image: foto2,
      stat: { value: 40, prefix: '+', suffix: '' },
      title: 'ponentes',
      text: 'Expertos en ecommerce, IA, marketing, finanzas, importación y dropshipping.',
    },
    {
      image: foto3,
      stat: { value: 45, prefix: '+', suffix: '' },
      title: 'charlas, paneles y masterminds',
      text: 'En dos salones en simultáneo: Salón Ecom y Salón Escala.',
    },
    {
      image: foto4,
      stat: { value: 50, prefix: '+', suffix: '' },
      title: 'marcas del ecommerce',
      text: 'Proveedores, plataformas y empresas que están moviendo la venta online en Venezuela.',
    },
  ],
}

// ── Scrollytelling: empresas que han confiado ──
export const MARCAS = {
  kicker: 'Ellos ya estuvieron',
  title: 'Empresas que han confiado en ECOM',
  closing: 'Tu marca puede ser la siguiente.',
  logos: [
    { src: logoPancakeMeta, name: 'Pancake & Meta' },
    { src: logoDropi, name: 'Dropi' },
    { src: logoSellibri, name: 'Sellibri' },
    { src: logoR4, name: 'R4' },
    { src: logoNewEmprende, name: 'New Emprende' },
    { src: logoZoom, name: 'Zoom' },
    { src: logoKomvii, name: 'Komvii' },
    { src: logoDropanas, name: 'Dropanas' },
    { src: logoAbuday, name: 'Abuday' },
    { src: logoOferfly, name: 'Oferfly' },
    { src: logoCalidex, name: 'Calidex' },
    { src: logoGalanet, name: 'Galanet' },
    { src: logoTFHKA, name: 'The Factory HKA' },
    { src: logoCavecom, name: 'Cavecom-e' },
    { src: logoDHL, name: 'DHL' },
  ],
}

// ── Cierre ──
export const CIERRE = {
  title: 'La tercera edición ya se está armando.',
  text: 'Asegura tu lugar en ECOM 2027 antes que nadie.',
}

// ── Galería 3D (tarjetas apiladas → abanico) ──
// Agrega o quita tarjetas aquí; las posiciones se calculan solas.
// Proporción recomendada de las imágenes: 4:3, ~1200×900 px.
export const GALERIA = {
  kicker: 'Lo que vas a vivir',
  title: 'Una experiencia en cada rincón',
  cards: [
    { src: foto2, label: '01 Stands', alt: 'Stands de marcas en ECOM' },
    { src: foto3, label: '02 Conferencias', alt: 'Conferencias en el escenario de ECOM' },
    { src: foto4, label: '03 Networking', alt: 'Asistentes haciendo networking en ECOM' },
  ],
}

// ── Anillo 3D ("Un año de construyendo") ──
// Las tarjetas son cuadradas: la imagen se recorta con object-fit: cover.
// `position` ajusta el recorte (ej. 'center 25%' para mostrar caras en flyers verticales).
// En móvil se usan solo las primeras 12 tarjetas.
import ponente1 from '../../assets/ponentes/1.webp'
import ponente2 from '../../assets/ponentes/2.webp'
import ponente3 from '../../assets/ponentes/3.webp'
import ponente4 from '../../assets/ponentes/4.webp'
import ponente5 from '../../assets/ponentes/5.webp'
import ponente7 from '../../assets/ponentes/7.webp'
import ponente8 from '../../assets/ponentes/8.webp'
import ponente9 from '../../assets/ponentes/9.webp'
import ponente10 from '../../assets/ponentes/10.webp'
import ponente11 from '../../assets/ponentes/11.webp'
import ponente12 from '../../assets/ponentes/12.webp'
import ponente13 from '../../assets/ponentes/13.webp'

const flyer = (img, n) => ({ img, alt: `Flyer de ponente confirmado ECOM 2026 (${n})`, position: 'center 22%' })
const stand = (img, n) => ({ img, alt: `Stand de marca en ECOM 2026 (${n})` })

export const ANILLO = {
  line1: 'Un Año de',
  line2: 'Construyendo',
  accent: '¡Sí! Hicimos un gran trabajo.',
  footerLeft: 'Diseñado y desarrollado por',
  footerRight: 'ECOM Venezuela',
  listTitle: 'Momentos de ECOM 2026',
  cards: [
    flyer(ponente1, 1), flyer(ponente2, 2), stand(foto1, 1), flyer(ponente3, 3),
    flyer(ponente4, 4), stand(foto2, 2), flyer(ponente5, 5), flyer(ponente7, 6),
    stand(foto3, 3), flyer(ponente8, 7), flyer(ponente9, 8), stand(foto4, 4),
    flyer(ponente10, 9), flyer(ponente11, 10), flyer(ponente12, 11), flyer(ponente13, 12),
  ],
}
