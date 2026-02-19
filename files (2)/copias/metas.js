/**
 * metas.js
 * ─────────────────────────────────────────────
 * Sección: Tus Metas
 * Muestra tarjetas de objetivos con progreso
 * circular, barra de progreso global y estadísticas.
 * ─────────────────────────────────────────────
 */

const objetivos = [
  { label: "Fondo de Emergencia", goal: "$5,000", saved: "$3,750", pct: 75 },
  { label: "Viaje a Japón", goal: "$12,000", saved: "$4,800", pct: 40 },
  { label: "Inversión 2024", goal: "$50,000", saved: "$7,500", pct: 15 },
];

const statsInferiores = [
  {
    icon: "trending_up",
    ib: "bg-green-500/10",
    ic: "text-green-400",
    lbl: "Ahorro mensual promedio",
    val: "$2,400.00",
  },
  // {
  //   icon: "calendar_today",
  //   ib: "bg-purple-500/10",
  //   ic: "text-purple-400",
  //   lbl: "Estimado finalización",
  //   val: "Oct 2024",
  // },
];


/** Calcula el stroke-dashoffset para el círculo SVG según el porcentaje. */
function calcularOffset(pct) {
  const circunferencia = 314.2; // 2π × r(50)
  return Math.round(circunferencia * (1 - pct / 100));
}


function renderSparkline() {
  return `
  <div class="t-card p-5 rounded-xl">
    <div class="flex items-end justify-between mb-3">
      <div>
        <p class="text-xs t-muted">Ahorro mensual promedio</p>
        <p class="text-3xl font-bold text-green-400 leading-none mt-1">$2,400</p>
        <p class="text-[10px] t-muted mt-1">promedio mensual</p>
      </div>
      <div class="text-right">
        <p class="text-sm font-bold text-green-400">↑ +12.5%</p>
        <p class="text-[10px] t-muted">vs mes ant.</p>
      </div>
    </div>

    <div class="w-full" style="height:40px;">
      <svg width="100%" height="100%" viewBox="0 0 300 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lgSparkMetas" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stop-color="#4ade80" stop-opacity=".25"/>
            <stop offset="100%" stop-color="#4ade80" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path d="M0,28 L60,22 L120,30 L180,12 L240,18 L300,5 L300,40 L0,40 Z"
          fill="url(#lgSparkMetas)"/>
        <path d="M0,28 L60,22 L120,30 L180,12 L240,18 L300,5"
          fill="none" stroke="#4ade80" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="300" cy="5" r="3.5" fill="#4ade80" stroke="white" stroke-width="1.5"
          style="filter:drop-shadow(0 0 4px #4ade80)"/>
      </svg>
    </div>

    <div class="grid grid-cols-4 gap-2 mt-3 pt-3 border-t t-divide">
      <div class="text-center">
        <p class="text-xs font-bold t-text">$1,650</p>
        <p class="text-[9px] t-muted">mín</p>
      </div>
      <div class="text-center">
        <p class="text-xs font-bold t-text">$3,000</p>
        <p class="text-[9px] t-muted">máx</p>
      </div>
      <div class="text-center">
        <p class="text-xs font-bold t-text">$2,400</p>
        <p class="text-[9px] t-muted">prom</p>
      </div>
      <div class="text-center">
        <p class="text-xs font-bold text-green-400">$3,000</p>
        <p class="text-[9px] t-muted">actual</p>
      </div>
    </div>
  </div>`;
}

function renderObjetivos() {
  return objetivos
    .map(
      (g) => `
    
    <!-- contenedor del contenido de las cards -->
     <div class="t-card p-6 rounded-xl flex flex-col items-center text-center relative">

      <!-- Menú tres puntos -->
      <div class="absolute top-3 right-3">
        <button onclick="toggleMenu('menu-${g.label.replace(/\s+/g,'-')}')"
          class="w-8 h-8 rounded-full flex items-center justify-center t-muted hover:bg-purple-500/10 hover:text-purple-400 transition-colors">
          <span class="material-symbols-outlined text-[20px]">more_vert</span>
        </button>
        <div id="menu-${g.label.replace(/\s+/g,'-')}"
          class="hidden absolute right-0 mt-1 w-36 t-card rounded-xl shadow-lg border t-divide z-20 overflow-hidden">
          <button onclick="toggleMenu('menu-${g.label.replace(/\s+/g,'-')}')"
            class="w-full flex items-center gap-2 px-4 py-2.5 text-sm t-text hover:bg-purple-500/10 hover:text-purple-400 transition-colors">
            <span class="material-symbols-outlined text-[16px]">edit</span>
            Editar
          </button>
          <button onclick="toggleMenu('menu-${g.label.replace(/\s+/g,'-')}')"
            class="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            <span class="material-symbols-outlined text-[16px]">delete</span>
            Eliminar
          </button>
        </div>
      </div>

      <div class="relative w-28 h-28 mb-4">
        <svg class="w-full h-full -rotate-90">
          <circle class="t-muted opacity-10" cx="56" cy="56" fill="transparent" r="50" stroke="currentColor" stroke-width="8"/>
          <circle cx="56" cy="56" fill="transparent" r="50" stroke="#9213ec"
            stroke-dasharray="314.2" stroke-dashoffset="${calcularOffset(g.pct)}"
            stroke-width="8" stroke-linecap="round"
            style="filter:drop-shadow(0 0 6px #9213ec88)"/>
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-xl font-bold t-text">${g.pct}%</span>
        </div>
      </div>
      <p class="text-sm font-semibold t-text mb-0.5">${g.label}</p>
      <p class="text-xs t-muted mb-3">Meta: ${g.goal}</p>
      <div class="border-t t-divide w-full pt-3 flex justify-between text-xs">
        <span class="t-muted">Ahorrado</span>
        <span class="font-bold text-purple-400">${g.saved}</span>
      </div>
    </div>`,
    )
    .join("");
}

function renderStats() {
  return statsInferiores
    .map(
      (s) => `
    <div class="t-card p-5 rounded-xl flex items-center gap-4">
      <div class="w-12 h-12 rounded-full ${s.ib} flex items-center justify-center ${s.ic} shrink-0">
        <span class="material-symbols-outlined">${s.icon}</span>
      </div>
      <div>
        <p class="text-xs t-muted">${s.lbl}</p>
        <p class="text-xl font-bold t-text">${s.val}</p>
      </div>
    </div>`,
    )
    .join("");
}

// Manejo global del menú desplegable
window.toggleMenu = function(id) {
  const menu = document.getElementById(id);
  const todosLosMenus = document.querySelectorAll('[id^="menu-"]');
  
  todosLosMenus.forEach(m => {
    if (m.id !== id) m.classList.add('hidden');
  });

  menu.classList.toggle('hidden');

  // Cierra al hacer clic fuera
  setTimeout(() => {
    document.addEventListener('click', function cerrar(e) {
      if (!menu.contains(e.target)) {
        menu.classList.add('hidden');
        document.removeEventListener('click', cerrar);
      }
    });
  }, 0);
};

export const metas = {
  titulo: "Tus Metas",
  subtitulo: "Gestiona tus objetivos financieros",
  contenido: () => `

    <!-- btn new task -->
    <div class="w-full flex justify-end pb-4">
      <button class="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors" style="box-shadow: 0 0 12px rgba(146,19,236,.4)">
        <span class="material-symbols-outlined text-[18px]">add_circle</span>
          Nueva Meta
      </button>
    </div>

    <!-- Tarjetas de objetivos -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      ${renderObjetivos()}
    </div>

    <!-- Progreso global -->
    <div class="t-card p-6 rounded-xl relative overflow-hidden mb-4">
      <div class="absolute top-0 right-0 p-6 opacity-5">
        <span class="material-symbols-outlined text-[96px]">account_balance</span>
      </div>
      <div class="relative z-10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <p class="text-base font-semibold t-text">Meta Global de Ahorro</p>
            <p class="text-xs t-muted mt-0.5">Progreso acumulado de todos tus objetivos</p>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold text-purple-400">62%</p>
            <p class="text-xs t-muted">Completado</p>
          </div>
        </div>
        <div class="w-full h-2.5 rounded-full overflow-hidden t-card-alt">
          <div class="h-full rounded-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-300"
            style="width:62%;box-shadow:0 0 12px rgba(146,19,236,.4)"></div>
        </div>
        <div class="flex justify-between mt-2.5 text-xs t-muted">
          <span>Actual: <strong class="t-text font-semibold">$32,450</strong></span>
          <span>Objetivo: <strong class="t-text font-semibold">$52,000</strong></span>
        </div>
      </div>
    </div>

    <!-- Estadísticas inferiores -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${renderStats()}
        <!-- Estadísticas inferiores -->
  ${renderSparkline()}
    </div>
    
  `,
};
