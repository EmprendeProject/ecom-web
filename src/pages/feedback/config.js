/**
 * CONFIGURACIÓN — FEEDBACK DE EL JUEGO DE LAS VENTAS
 * ---------------------------------------------------
 * Las respuestas se guardan en una hoja de Google Sheets a través de un
 * Web App de Google Apps Script. Instrucciones paso a paso en ./apps-script.gs
 *
 * IMPORTANTE: mientras FEEDBACK_ENDPOINT esté vacío, las respuestas NO se
 * guardan en ningún lado (solo se imprimen en la consola del navegador).
 */

// URL del Web App de Apps Script (termina en /exec).
// Hoja destino: https://docs.google.com/spreadsheets/d/1V8HxEsGo-NBiH4OhiQskxSidfWel6AQFB91jVxCzr0Q/edit
export const FEEDBACK_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzSJwTRs1NSPvm4vTyQADIuG-YwGUXxZXXVT9nCg2QDYAmgDP6oq8FmiSIRQSfSElAt7A/exec'

// Paso 2 — ¿Qué fue lo que más te gustó?
export const LIKED_OPTIONS = [
  'Los ponentes',
  'El contenido práctico',
  'Las herramientas de IA',
  'El networking',
  'La organización',
  'El lugar',
  'El material entregable',
  'El café y la merienda',
  'El certificado',
]

// Paso 3 — ¿Qué mejorarías? es texto libre (sin opciones).

// Paso 4 — ¿Qué tema te gustaría ver en la próxima edición?
export const TOPIC_OPTIONS = [
  'E-commerce y tiendas online',
  'Ventas por WhatsApp',
  'TikTok y contenido en video',
  'Marca personal',
  'Cierre de ventas y negociación',
  'IA avanzada y automatización',
  'Email marketing',
  'Finanzas para emprendedores',
  'Logística y envíos',
]
