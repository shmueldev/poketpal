/**
 * bot.js
 * ─────────────────────────────────────────────
 * Sección: Asistente Financiero
 * Interfaz de chat con el bot FinanzaBot.
 * Muestra mensajes de ejemplo y el área de input.
 * ─────────────────────────────────────────────
 */

import { isDarkTheme } from '../estado.js';

const sugerencias = [
  { icon:'analytics',       txt:'Analiza mis gastos'   },
  { icon:'trending_up',     txt:'Proyectar ahorros'    },
  { icon:'account_balance', txt:'Ver inversiones'      },
  { icon:'receipt_long',    txt:'Últimas facturas'     },
];

function renderSugerencias() {
  return sugerencias.map(c => `
    <button class="t-card-alt border t-divide px-3 py-1.5 rounded-full text-xs font-semibold t-text
                   flex items-center gap-1.5 hover:border-purple-500/50 transition-colors">
      <span class="material-symbols-outlined text-[14px] text-purple-400">${c.icon}</span>${c.txt}
    </button>`).join('');
}

/** Burbuja del bot — usa fondo degradado en oscuro, gris en claro. */
function burbuja(texto) {
  const cls = isDarkTheme
    ? 'bot-bubble text-white'
    : 'bg-gray-100 text-gray-900';
  return `<div class="${cls} px-4 py-3 rounded-2xl rounded-tl-none text-sm leading-relaxed">${texto}</div>`;
}

export const bot = {
  titulo:    'Asistente Financiero',
  subtitulo: 'Obtén recomendaciones inteligentes',
  contenido: () => `
    <!-- Conversación -->
    <div>
      <div class="flex flex-col gap-5 mb-4">
        <!-- Mensaje bot -->
        <div class="flex items-start gap-3 max-w-2xl">
          <div class="w-8 h-8 rounded-full bg-purple-500/15 border border-purple-500/20 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-purple-400 text-[18px]">smart_toy</span>
          </div>
          <div>
            ${burbuja('¡Hola! Soy tu asistente FinanzaBot. He detectado una oportunidad de ahorro del 12% optimizando tus suscripciones digitales. ¿En qué puedo ayudarte hoy?')}
            <p class="text-[10px] t-muted mt-1 ml-1">10:42 AM</p>
          </div>
        </div>

        <!-- Mensaje usuario -->
        <div class="flex items-start gap-3 max-w-2xl self-end">
          <div class="text-right">
            <div class="bg-purple-600 px-4 py-3 rounded-2xl rounded-tr-none text-white text-sm leading-relaxed shadow-lg shadow-purple-500/15">
              ¿Puedes analizar mi presupuesto de este mes y compararlo con el anterior?
            </div>
            <p class="text-[10px] t-muted mt-1 mr-1">10:43 AM</p>
          </div>
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700
                      flex items-center justify-center shrink-0 text-xs font-bold text-white">AM</div>
        </div>

        <!-- Respuesta bot -->
        <div class="flex items-start gap-3 max-w-2xl">
          <div class="w-8 h-8 rounded-full bg-purple-500/15 border border-purple-500/20 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-purple-400 text-[18px]">smart_toy</span>
          </div>
          <div>
            ${burbuja(`¡Claro! Tus gastos en <strong class="text-purple-400">entretenimiento</strong> subieron un 15%, pero redujiste transporte en un 8%.<br/><br/>
              Saldo proyectado: <span class="bg-purple-500/15 text-purple-400 px-2 py-0.5 rounded font-semibold">$1,240.50</span>`)}
            <div class="flex gap-2 mt-2">
              <button class="t-card-alt border t-divide px-3 py-1.5 rounded-lg flex items-center gap-1.5
                            text-xs t-text hover:border-purple-500/50 transition-colors">
                <span class="material-symbols-outlined text-[14px] text-purple-400">download</span>Descargar PDF
              </button>
            </div>
            <p class="text-[10px] t-muted mt-1 ml-1">10:44 AM</p>
          </div>
        </div>
      </div>

      <!-- Footer con input y sugerencias -->
      <div class="t-card rounded-xl p-5">
        <div class="flex flex-wrap gap-2 mb-4">
          ${renderSugerencias()}
        </div>
        <div class="relative flex items-center">
          <div class="absolute left-3 flex gap-1.5 t-muted">
            <button class="hover:text-purple-400 transition-colors">
              <span class="material-symbols-outlined text-[20px]">attach_file</span>
            </button>
            <button class="hover:text-purple-400 transition-colors">
              <span class="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
            </button>
          </div>
          <input class="t-input w-full rounded-xl py-3.5 pl-20 pr-14 text-sm
                        focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            placeholder="Hazme una pregunta sobre tus finanzas…" type="text"/>
          <button class="absolute right-2 w-9 h-9 bg-gradient-to-tr from-purple-600 to-purple-400 rounded-lg
                        flex items-center justify-center text-white hover:brightness-110 transition-all
                        shadow-lg shadow-purple-500/30">
            <span class="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
        <p class="text-[10px] t-muted text-center mt-3">
          FinanzaBot puede cometer errores. Verifica la información importante.
        </p>
      </div>
  `,
};
