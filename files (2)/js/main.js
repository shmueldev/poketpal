/**
 * main.js
 * ─────────────────────────────────────────────
 * Punto de entrada de la aplicación.
 * Inicializa cada módulo en el orden correcto:
 *   1. Sidebar  — no depende de nada
 *   2. Tema     — necesita router (para recargar sección al cambiar tema)
 *   3. Router   — carga la sección inicial y registra navegación
 * ─────────────────────────────────────────────
 */

import { iniciarSidebar } from '../sidebar.js';
import { iniciarTema }    from '../tema.js';
import { iniciarRouter }  from '../router.js';

iniciarSidebar();
iniciarTema();
iniciarRouter();
