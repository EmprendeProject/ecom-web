/**
 * Google Apps Script — recibe el feedback de /feedback y lo guarda en Google Sheets.
 * (Este archivo NO forma parte de la web; se copia y pega en Google.)
 *
 * CÓMO CONECTARLO (≈5 minutos):
 * 1. Crea una hoja nueva en Google Sheets (ej. "Feedback El Juego de las Ventas").
 * 2. Menú Extensiones → Apps Script. Borra lo que haya y pega TODO este archivo.
 * 3. Guarda (ícono de disquete).
 * 4. Implementar → Nueva implementación → ⚙️ tipo "Aplicación web":
 *      - Ejecutar como: Yo
 *      - Quién tiene acceso: Cualquier persona
 * 5. Autoriza los permisos y copia la URL que termina en /exec.
 * 6. Pégala en src/pages/feedback/config.js → FEEDBACK_ENDPOINT y vuelve a desplegar la web.
 *
 * Las columnas se crean solas con la primera respuesta (y si mañana agregas
 * una pregunta nueva, se agrega su columna al final).
 *
 * Si editas este script, publica una versión nueva:
 * Implementar → Gestionar implementaciones → ✏️ → Versión: "Nueva versión" → Implementar.
 */

const SHEET_NAME = 'Respuestas'

function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const data = Object.assign({ Fecha: new Date() }, JSON.parse(e.postData.contents))
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME)

    let headers = sheet.getLastRow() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      : []
    const missing = Object.keys(data).filter((k) => headers.indexOf(k) === -1)
    if (missing.length) {
      headers = headers.concat(missing)
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold')
      sheet.setFrozenRows(1)
    }

    sheet.appendRow(headers.map((h) => (h in data ? data[h] : '')))
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
