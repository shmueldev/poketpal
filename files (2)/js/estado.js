/**
 * estado.js
 * ─────────────────────────────────────────────
 * Estado global compartido de la aplicación.
 * Cualquier módulo que necesite saber el tema
 * actual importa `isDarkTheme` desde aquí.
 * ─────────────────────────────────────────────
 */

export let isDarkTheme = true;

/**
 * Actualiza el valor del tema globalmente.
 * @param {boolean} valor
 */
export function setIsDarkTheme(valor) {
  isDarkTheme = valor;
}
