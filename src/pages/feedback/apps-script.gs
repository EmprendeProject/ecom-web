/**
 * Google Apps Script — recibe el feedback de /feedback y lo guarda en Google Sheets.
 * (Este archivo NO forma parte de la web; se copia y pega en Google.)
 *
 * Hoja de destino:
 * https://docs.google.com/spreadsheets/d/1V8HxEsGo-NBiH4OhiQskxSidfWel6AQFB91jVxCzr0Q/edit
 *
 * CÓMO CONECTARLO (≈3 minutos, con la cuenta dueña de la hoja):
 * 1. Abre la hoja → menú Extensiones → Apps Script.
 * 2. Borra lo que haya en el editor y pega TODO este archivo. Guarda (💾).
 * 3. Botón azul "Implementar" → "Nueva implementación" → ⚙️ tipo "Aplicación web":
 *      - Ejecutar como: Yo
 *      - Quién tiene acceso: Cualquier persona
 * 4. "Implementar" → "Autorizar acceso" → elige tu cuenta.
 *    Si aparece "Google no verificó esta app": Configuración avanzada → Ir a … (no seguro).
 *    Es normal: el script es tuyo y solo escribe en esta hoja.
 * 5. Copia la URL de la aplicación web (termina en /exec) y pásasela al desarrollador,
 *    o pégala en src/pages/feedback/config.js → FEEDBACK_ENDPOINT.
 *
 * Prueba rápida: abre la URL /exec en el navegador; debe decir {"ok":true,...}.
 *
 * Las columnas se crean solas con la primera respuesta (y si se agrega una
 * pregunta nueva, su columna aparece al final).
 *
 * Si editas este script, publica una versión nueva:
 * Implementar → Gestionar implementaciones → ✏️ → Versión: "Nueva versión" → Implementar.
 * (Así la URL /exec se mantiene igual.)
 */

const SPREADSHEET_ID = '1V8HxEsGo-NBiH4OhiQskxSidfWel6AQFB91jVxCzr0Q'

function getSheet_() {
  // Se escribe en la primera pestaña de la hoja.
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0]
}

function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const data = Object.assign({ Fecha: new Date() }, JSON.parse(e.postData.contents))
    const sheet = getSheet_()

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
    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

// Permite comprobar en el navegador que la implementación funciona.
function doGet() {
  return json_({ ok: true, hoja: getSheet_().getParent().getName() })
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
