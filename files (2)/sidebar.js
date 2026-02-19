/**
 * sidebar.js
 * ─────────────────────────────────────────────
 * Controla el comportamiento del sidebar:
 *   · Desktop → colapsa (solo iconos) o expande
 *   · Móvil   → siempre fijo con icono + label,
 *               el botón toggle está oculto vía CSS
 * ─────────────────────────────────────────────
 */

// const sidebar = document.getElementById('sidebar');
// const sidebarToggle = document.getElementById('sidebarToggle');

/**
 * Alterna entre el estado colapsado (solo iconos)
 * y el estado expandido (iconos + etiquetas).
 * Solo opera en viewports de escritorio (≥ 768px).
 */

// 1. Selector corregido con el punto (.)
const sidebarLogo = document.querySelector('.logo-aside');
const sidebarToggle = document.querySelector('#sidebarToggle');
const sidebar = document.querySelector('#sidebar'); // Asegúrate de tener esta variable

function alternarSidebar() {
  if (window.innerWidth < 768) return;

  // Alternamos la clase y guardamos si quedó colapsado o no
  const estaColapsado = sidebar.classList.toggle('collapsed');
  
  // Ajustamos el ancho
  sidebar.style.width = estaColapsado ? '4rem' : '16rem';

  // 2. Cambiamos el icono dependiendo de si está colapsado o no
  // Si está colapsado muestra 'house', si no, muestra 'menu'
  sidebarLogo.textContent = estaColapsado ? 'menu' : 'close';
}

// 3. El listener debe llamar a la FUNCIÓN, no a una variable
export function iniciarSidebar() {
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', alternarSidebar);
  }
}

