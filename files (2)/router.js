/**
 * router.js
 * ─────────────────────────────────────────────
 * Gestiona la navegación entre secciones:
 *   · Inyecta el HTML de cada sección en #content
 *   · Actualiza el título y subtítulo del header
 *   · Marca el ítem activo en el menú
 *   · Aplica animación de entrada al contenido
 * ─────────────────────────────────────────────
 */

import { secciones } from './js/secciones/index.js';

const content         = document.getElementById('content');
const sectionTitle    = document.getElementById('sectionTitle');
const sectionSubtitle = document.getElementById('sectionSubtitle');

/**
 * Carga y renderiza una sección en el área de contenido.
 * @param {string} id - Identificador de la sección (ej: 'historial')
 */
export function cargarSeccion(id) {
  const seccion = secciones[id];
  if (!seccion) return;

  // Ocultar antes de actualizar
  content.style.opacity   = '0';
  content.style.transform = 'translateY(16px)';

  setTimeout(() => {
    sectionTitle.textContent    = seccion.titulo;
    sectionSubtitle.textContent = seccion.subtitulo;
    content.innerHTML           = seccion.contenido();

    // Animar entrada
    content.style.transition = 'opacity .45s ease, transform .45s ease';
    requestAnimationFrame(() => {
      content.style.opacity   = '1';
      content.style.transform = 'translateY(0)';
    });

    // Actualizar ítem activo en el menú
    document.querySelectorAll('.menu-item').forEach(item => {
      item.classList.toggle('active', item.dataset.section === id);
    });
  }, 260);
}

/** Registra los listeners de navegación y carga la sección inicial. */
export function iniciarRouter() {
  document.querySelectorAll('.menu-item').forEach(btn => {
    btn.addEventListener('click', () => cargarSeccion(btn.dataset.section));
  });

  cargarSeccion('historial');
}
