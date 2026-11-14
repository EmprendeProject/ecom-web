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
  videoSrc: '',
  videoSrcWebm: '', // opcional, más liviano
  poster: foto1,
  kicker: 'Caracas · Venezuela',
  title: 'ECOM 2027',
  subtitle: 'El evento de ecommerce más grande de Venezuela vuelve. Más grande, más marcas, más negocio.',
}

// ── Scrollytelling: edición pasada ──
// Cada paso ocupa una "pantalla" de scroll. `stat` es opcional (cuenta hacia arriba).
export const EDICION_PASADA = {
  year: '2026',
  steps: [
    {
      image: foto1,
      kicker: 'Edición 2026',
      title: 'Así se vivió la edición pasada',
      text: 'Dos días donde el ecommerce venezolano se reunió en un solo lugar.',
    },
    {
      image: foto2,
      stat: { value: 1000, prefix: '+', suffix: '' },
      title: 'asistentes',
      text: 'Emprendedores, marcas y equipos de ventas buscando crecer.',
    },
    {
      image: foto3,
      stat: { value: 15, prefix: '+', suffix: '' },
      title: 'marcas expositoras',
      text: 'Empresas que llevaron su stand y salieron con clientes nuevos.',
    },
    {
      image: foto4,
      stat: { value: 20, prefix: '+', suffix: '' },
      title: 'ponentes nacionales e internacionales',
      text: 'Los que están moviendo el ecommerce, compartiendo lo que funciona.',
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
  title: 'La próxima edición ya se está armando.',
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
