/**
 * historial.js
 * ─────────────────────────────────────────────
 * Sección: Historial de Movimientos
 * Muestra filtros, tabla de transacciones y
 * tarjetas de resumen financiero.
 * ─────────────────────────────────────────────
 */

import { isDarkTheme } from '../estado.js';

const transacciones = [
  { date:'12 Oct, 2023', time:'10:45 AM', name:'Curso: Inversiones 101', sub:'ID: FE-98234',          icon:'menu_book',   ib:'bg-blue-500/10',   ic:'text-blue-400',   cat:'EDUCACIÓN',  amt:'-$45.00',  ac:'text-red-400'   },
  { date:'10 Oct, 2023', time:'03:20 PM', name:'Recarga de Saldo',       sub:'Transferencia Bancaria', icon:'add_card',    ib:'bg-green-500/10',  ic:'text-green-400',  cat:'DEPÓSITO',   amt:'+$200.00', ac:'text-green-400' },
  { date:'08 Oct, 2023', time:'11:10 AM', name:'Meta: Ahorro Master',    sub:'Aportación Automática',  icon:'savings',     ib:'bg-orange-500/10', ic:'text-orange-400', cat:'AHORROS',    amt:'-$25.00',  ac:'text-red-400'   },
  { date:'05 Oct, 2023', time:'09:00 AM', name:'Bono de Bienvenida',     sub:'Promoción Octubre',      icon:'redeem',      ib:'bg-purple-500/10', ic:'text-purple-400', cat:'RECOMPENSA', amt:'+$10.00',  ac:'text-green-400' },
];

const resumenCards = [
  { lbl:'Gastos en Cursos', icon:'school',       val:'$345.00', trend:'-5% este mes',         tc:'text-red-400'   },
  { lbl:'Metas Alcanzadas', icon:'emoji_events', val:'8 / 10',  trend:'¡Vas por buen camino!', tc:'text-green-400' },
];

const filtros = [
  { icon:'category',      label:'Categoría'     },
  { icon:'calendar_month',label:'Rango de Fecha'},
  { icon:'filter_list',   label:'Tipo'          },
];

function renderFiltros() {
  return filtros.map(f => `
    <button class="t-card-alt flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold t-text hover:border-purple-500/50 transition-colors">
      <span class="material-symbols-outlined text-[16px] text-purple-400">${f.icon}</span>${f.label}
      <span class="material-symbols-outlined text-[14px] t-muted">expand_more</span>
    </button>`).join('');
}

function renderFilas() {
  return transacciones.map((r, i) => `
    <tr class="border-t t-divide hover:bg-purple-500/5 transition-colors">
      <td class="px-5 py-4 whitespace-nowrap">
        <p class="text-sm font-semibold t-text">${r.date}</p>
        <p class="text-xs t-muted">${r.time}</p>
      </td>
      <td class="px-5 py-4">
        <div class="flex items-center gap-3">
          <div class="size-9 rounded-full ${r.ib} ${r.ic} flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[18px]">${r.icon}</span>
          </div>
          <div>
            <p class="text-sm font-semibold t-text">${r.name}</p>
            <p class="text-xs t-muted">${r.sub}</p>
          </div>
        </div>
      </td>
      <td class="px-5 py-4 whitespace-nowrap">
        <span class="t-card-alt px-2.5 py-1 rounded-full text-[10px] font-bold t-muted">${r.cat}</span>
      </td>
      <td class="px-5 py-4 text-right">
        <span class="text-sm font-bold ${r.ac}">${r.amt}</span>
      </td>
      <td class="px-5 py-4 text-center">
        <button id="btnRow-${i}" onclick="toggleRowMenu(event, ${i})"
          class="t-muted hover:text-purple-400 transition-colors">
          <span class="material-symbols-outlined text-[20px]">more_vert</span>
        </button>
      </td>
    </tr>`).join('');
}

function renderResumen() {
  return resumenCards.map(c => `
    <div class="t-card p-5 rounded-xl">
      <div class="flex items-center justify-between mb-3">
        <p class="text-xs font-semibold uppercase tracking-wide t-muted">${c.lbl}</p>
        <span class="material-symbols-outlined text-purple-400 text-[20px]">${c.icon}</span>
      </div>
      <p class="text-2xl font-bold t-text">${c.val}</p>
      <p class="text-xs ${c.tc} mt-1">${c.trend}</p>
    </div>`).join('');
}

function initDropdowns() {
  if (!document.getElementById('menuHistory')) {
    const mh = document.createElement('div');
    mh.id = 'menuHistory';
    mh.className = 'hidden t-card rounded-xl shadow-lg border t-divide z-50 overflow-hidden';
    mh.style.cssText = 'position:fixed;width:160px;';
    mh.innerHTML = `
      <button onclick="toggleMenuHistory(event)"
        class="w-full flex items-center gap-2 px-4 py-2.5 text-sm t-text hover:bg-purple-500/10 hover:text-purple-400 transition-colors">
        <span class="material-symbols-outlined text-[16px]">table_view</span>Exportar CSV
      </button>
      <button onclick="toggleMenuHistory(event)"
        class="w-full flex items-center gap-2 px-4 py-2.5 text-sm t-text hover:bg-purple-500/10 hover:text-purple-400 transition-colors">
        <span class="material-symbols-outlined text-[16px]">picture_as_pdf</span>Exportar PDF
      </button>`;
    document.body.appendChild(mh);
  }

  if (!document.getElementById('menuRow')) {
    const mr = document.createElement('div');
    mr.id = 'menuRow';
    mr.className = 'hidden t-card rounded-xl shadow-lg border t-divide z-50 overflow-hidden';
    mr.style.cssText = 'position:fixed;width:160px;';
    mr.innerHTML = `
      <!-- <button onclick="document.getElementById('menuRow').classList.add('hidden')"
        class="w-full flex items-center gap-2 px-4 py-2.5 text-sm t-text hover:bg-purple-500/10 hover:text-purple-400 transition-colors">
        <span class="material-symbols-outlined text-[16px]">visibility</span>Ver detalle
      </button> -->
      <button onclick="document.getElementById('menuRow').classList.add('hidden')"
        class="w-full flex items-center gap-2 px-4 py-2.5 text-sm t-text hover:bg-purple-500/10 hover:text-purple-400 transition-colors">
        <span class="material-symbols-outlined text-[16px]">edit</span>Editar
      </button>
      <button onclick="document.getElementById('menuRow').classList.add('hidden')"
        class="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
        <span class="material-symbols-outlined text-[16px]">delete</span>Eliminar
      </button>`;
    document.body.appendChild(mr);
  }
}

window.toggleMenuHistory = function(event) {
  event.stopPropagation();
  initDropdowns();
  const menu = document.getElementById('menuHistory');
  const btn  = document.getElementById('btnDownload');

  if (menu.classList.contains('hidden')) {
    const rect = btn.getBoundingClientRect();
    menu.style.top  = (rect.bottom + 6) + 'px';
    menu.style.left = (rect.right - 160) + 'px';
    menu.classList.remove('hidden');
    setTimeout(() => {
      document.addEventListener('click', function cerrar() {
        menu.classList.add('hidden');
        document.removeEventListener('click', cerrar);
      });
    }, 0);
  } else {
    menu.classList.add('hidden');
  }
};

window.toggleRowMenu = function(event, idx) {
  event.stopPropagation();
  initDropdowns();
  const menu = document.getElementById('menuRow');
  const btn  = document.getElementById('btnRow-' + idx);

  if (!menu.classList.contains('hidden') && menu.dataset.openFor === String(idx)) {
    menu.classList.add('hidden');
    return;
  }

  const rect = btn.getBoundingClientRect();
  menu.style.top  = (rect.bottom + 4) + 'px';
  menu.style.left = (rect.right - 160) + 'px';
  menu.dataset.openFor = idx;
  menu.classList.remove('hidden');

  setTimeout(() => {
    document.addEventListener('click', function cerrar() {
      menu.classList.add('hidden');
      document.removeEventListener('click', cerrar);
    });
  }, 0);
};

export const historial = {
  titulo:    'Historial de Movimientos',
  subtitulo: 'Consulta tus transacciones recientes',
  contenido: () => `

    <!-- Filtros -->
    <div class="t-card rounded-xl p-4 mb-4">
      <div class="flex flex-col lg:flex-row gap-3 items-center">

        <!-- Buscador -->
        <div class="w-full lg:flex-1 relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-[20px]">search</span>
          <input class="t-input w-full rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            placeholder="Buscar por concepto, referencia o ID…" type="text"/>
        </div>

        <!-- Botones de filtro + descarga -->
        <div class="flex flex-wrap gap-2 w-full lg:w-auto" style="position:relative;">
          ${renderFiltros()}

          <!-- Botón descarga -->
          <button id="btnDownload" onclick="toggleMenuHistory(event)"
            class="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors">
            <span class="material-symbols-outlined text-[20px]">download</span>
          </button>

        </div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="t-card rounded-xl overflow-hidden mb-4">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="t-card-alt text-purple-400 uppercase text-[10px] font-bold tracking-widest">
              <th class="px-5 py-3.5">Fecha</th>
              <th class="px-5 py-3.5">Concepto</th>
              <th class="px-5 py-3.5">Categoría</th>
              <th class="px-5 py-3.5 text-right">Monto</th>
              <th class="px-5 py-3.5 text-center">Acc.</th>
            </tr>
          </thead>
          <tbody>${renderFilas()}</tbody>
        </table>
      </div>
      <!-- Paginación -->
      <div class="border-t t-divide px-5 py-3 flex items-center justify-between">
        <span class="text-xs t-muted">Mostrando 4 de 128 transacciones</span>
        <div class="flex gap-1.5">
          <button class="size-7 flex items-center justify-center rounded t-card-alt t-muted opacity-40" disabled>
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button class="size-7 flex items-center justify-center rounded bg-purple-600 text-white text-xs font-bold">1</button>
          <button class="size-7 flex items-center justify-center rounded t-card-alt t-muted text-xs font-bold">2</button>
          <button class="size-7 flex items-center justify-center rounded t-card-alt t-muted text-xs font-bold">3</button>
          <button class="size-7 flex items-center justify-center rounded t-card-alt t-muted">
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Tarjetas resumen -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-purple-600 p-5 rounded-xl text-white shadow-lg shadow-purple-500/20">
        <div class="flex items-center justify-between mb-3">
          <p class="text-xs font-semibold uppercase tracking-wide text-white/70">Balance Educativo</p>
          <span class="material-symbols-outlined text-white/50 text-[20px]">account_balance</span>
        </div>
        <p class="text-2xl font-bold">$1,240.50</p>
        <p class="text-xs text-white/60 mt-1 flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">trending_up</span>+12% mes anterior
        </p>
      </div>
      ${renderResumen()}
    </div>
  `,
};