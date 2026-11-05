/**
 * CONFIGURACIÓN EDITABLE — EL JUEGO DE LAS VENTAS
 * ------------------------------------------------
 * Todo lo que el organizador debe confirmar o conectar vive aquí.
 * No se muestran precios, descuentos, cupos vendidos ni disponibilidad
 * numérica hasta que exista una fuente real.
 */

export const OFFER = {
  // Precio numérico (ej. 107). Mientras sea null se muestra `pricePlaceholder`.
  price: 107,
  pricePlaceholder: '[PRECIO POR DEFINIR]',
  // Moneda que se antepone al precio cuando `price` está definido (ej. '$', 'USD', 'Bs.').
  currency: '$',
  // Enlace a la pasarela / checkout oficial (ej. Ticketshow, Stripe Checkout, etc.).
  // Mientras esté vacío, los botones de compra llevan a la sección de entradas
  // y el botón de la tarjeta de oferta queda en estado "checkout próximamente".
  checkoutUrl: '',
  // Disponibilidad: 'open' | 'soon' | 'soldout'
  // 'soon'    -> botón deshabilitado "PRÓXIMAMENTE"
  // 'soldout' -> botón deshabilitado "AGOTADO"
  // Solo usar 'soldout' si existe una fuente real de inventario.
  availability: 'open',
  // Materiales / beneficios adicionales. SOLO agregar si el organizador los confirma.
  // Ej: ['Material digital de apoyo']
  extras: [],
}

export const CONTACT = {
  // Deja vacío lo que no aplique; no se renderiza.
  email: '',
  whatsapp: '', // formato internacional sin "+" ni espacios. Ej: 584121234567
  instagram: '', // URL completa. Ej: https://instagram.com/ecom
  website: '',
}

export const LEGAL = {
  // URLs de documentos. Si están vacías se muestran como "próximamente".
  privacy: '',
  terms: '',
  refund: '',
}

// Certificado: si tienes el diseño oficial, coloca la URL de la imagen (ej. importada o /public).
// Mientras esté vacío se muestra una representación ilustrativa.
export const CERTIFICATE_IMAGE = ''

export const EVENT = {
  name: 'EL JUEGO DE LAS VENTAS',
  subtitle: 'Workshop Inmersivo',
  organizer: 'ECOM',
  dateLong: 'Sábado 21 de noviembre de 2026',
  dateShort: '21 NOV 2026',
  venue: 'Torre Movilnet',
  city: 'Caracas, Venezuela',
  capacity: 70,
  hours: 8,
  speakers: 5,
}

