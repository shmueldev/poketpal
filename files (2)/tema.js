/**
 * tema.js
 * ─────────────────────────────────────────────
 * Gestiona el cambio de tema claro / oscuro.
 *
 * Estrategia: un único toggle de clase `.light`
 * en <html> modifica todas las CSS variables a la
 * vez → transición 100 % sincronizada sin lag.
 * ─────────────────────────────────────────────
 */

import { isDarkTheme, setIsDarkTheme } from './js/estado.js';
import { cargarSeccion }               from './router.js';

const themeToggle       = document.getElementById('themeToggle');
const themeToggleCircle = document.getElementById('themeToggleCircle');
const themeIcon         = document.getElementById('themeIcon');
const content           = document.getElementById('content');

/**
 * Aplica el tema oscuro o claro.
 * @param {boolean} oscuro   - true = oscuro, false = claro
 * @param {boolean} animar   - anima el círculo del toggle
 */
export function aplicarTema(oscuro, animar = true) {
  setIsDarkTheme(oscuro);

  // Un solo cambio de clase → todas las CSS vars cambian simultáneamente
  document.documentElement.classList.toggle('light', !oscuro);

  // Animar el círculo del toggle
  themeToggleCircle.style.transform = oscuro
    ? 'translateX(0) rotate(0deg)'
    : 'translateX(28px) rotate(360deg)';

  if (animar) {
    setTimeout(() => { themeIcon.textContent = oscuro ? '🌙' : '☀️'; }, 220);
  } else {
    themeIcon.textContent = oscuro ? '🌙' : '☀️';
  }

  // Recargar la sección activa para que los template literals
  // usen el nuevo valor de isDarkTheme
  const seccionActiva = document.querySelector('.menu-item.active');
  if (seccionActiva) {
    content.style.opacity   = '0';
    content.style.transform = 'translateY(8px)';
    setTimeout(() => {
      cargarSeccion(seccionActiva.dataset.section);
      content.style.transition = 'opacity .4s ease, transform .4s ease';
      content.style.opacity    = '1';
      content.style.transform  = 'translateY(0)';
    }, 180);
  }
}

/** Inicializa el listener del botón y carga el tema guardado. */
export function iniciarTema() {
  themeToggle.addEventListener('click', () => {
    const nuevoTema = !isDarkTheme;
    aplicarTema(nuevoTema, true);
    localStorage.setItem('tema', nuevoTema ? 'oscuro' : 'claro');
  });

  // Restaurar preferencia guardada
  const guardado = localStorage.getItem('tema');
  if (guardado) {
    aplicarTema(guardado === 'oscuro', false);
  }
}
