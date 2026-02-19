/**
 * secciones/index.js
 * ─────────────────────────────────────────────
 * Punto de entrada único para todas las secciones.
 * El router importa solo este archivo; añadir una
 * sección nueva = agregar una línea aquí.
 * ─────────────────────────────────────────────
 */

import { historial } from './historial.js';
import { metas }     from './metas.js';
import { graficas }  from './graficas.js';
import { bot }       from './bot.js';

export const secciones = {
  historial,
  metas,
  graficas,
  bot,
};
