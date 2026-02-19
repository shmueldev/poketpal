/**
 * metas.js
 * ─────────────────────────────────────────────
 * Sección: Tus Metas
 * Rediseño visual — cards llamativas, gráficas
 * con más personalidad y vida.
 * ─────────────────────────────────────────────
 */

const objetivos = [
  {
    label: "Fondo de Emergencia",
    goal: "$5,000",
    saved: "$3,750",
    pct: 75,
    icon: "shield",
    color: "#6ee7a0",
    colorBg: "#6ee7a010",
    colorGlow: "#6ee7a033",
    gradFrom: "#4ade80",
    gradTo: "#6ee7a0",
    tag: "En camino 🔥",
    tagClass: "text-green-400",
    tagBg: "background:rgba(110,231,160,.08);border:1px solid rgba(110,231,160,.18);",
  },
  {
    label: "Viaje a Japón",
    goal: "$12,000",
    saved: "$4,800",
    pct: 40,
    icon: "flight_takeoff",
    color: "#c084fc",
    colorBg: "#c084fc10",
    colorGlow: "#c084fc33",
    gradFrom: "#9213ec",
    gradTo: "#c084fc",
    tag: "En progreso ✈️",
    tagClass: "text-purple-400",
    tagBg: "background:rgba(192,132,252,.08);border:1px solid rgba(192,132,252,.18);",
  },
  {
    label: "Inversión 2025",
    goal: "$50,000",
    saved: "$7,500",
    pct: 15,
    icon: "trending_up",
    color: "#f87171",
    colorBg: "#f8717110",
    colorGlow: "#f8717133",
    gradFrom: "#f87171",
    gradTo: "#fca5a5",
    tag: "Inicio 💡",
    tagClass: "text-red-400",
    tagBg: "background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.18);",
  },
];

function calcularOffset(pct) {
  const c = 314.2;
  return Math.round(c * (1 - pct / 100));
}

// Sparkline mensual de ahorro
const sparkPoints = [
  [0,28],[60,22],[120,30],[180,12],[240,18],[300,5]
];
const sparkLine = sparkPoints.map((p,i)=>`${i===0?'M':'L'}${p[0]},${p[1]}`).join(' ');
const sparkFill = sparkLine + ` L300,40 L0,40 Z`;

function renderObjetivos() {
  return objetivos.map((g) => `
    <div class="t-card rounded-2xl overflow-hidden relative" style="transition:transform .2s,box-shadow .2s;" 
      onmouseenter="this.style.transform='translateY(-4px)';this.style.boxShadow='0 16px 40px ${g.colorGlow}'"
      onmouseleave="this.style.transform='';this.style.boxShadow=''">

      <div class="p-5">

        <!-- Header: ícono + etiqueta + menú -->
        <div class="flex items-start justify-between mb-4">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="
              width:40px;height:40px;border-radius:12px;
              background:${g.colorBg};
              box-shadow:0 0 12px ${g.colorGlow};
              display:flex;align-items:center;justify-content:center;flex-shrink:0;
            ">
              <span class="material-symbols-outlined" style="color:${g.color};font-size:20px;">${g.icon}</span>
            </div>
            <div>
              <p class="text-sm font-bold t-text">${g.label}</p>
              <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:999px;${g.tagBg}" class="${g.tagClass}">${g.tag}</span>
            </div>
          </div>
          <button onclick="toggleMenu('menu-${g.label.replace(/\s+/g,'-')}')"
            class="w-8 h-8 rounded-full flex items-center justify-center t-muted hover:bg-purple-500/10 hover:text-purple-400 transition-colors flex-shrink-0">
            <span class="material-symbols-outlined text-[20px]">more_vert</span>
          </button>
          <div id="menu-${g.label.replace(/\s+/g,'-')}"
            class="hidden absolute right-4 top-14 w-36 t-card rounded-xl shadow-lg border t-divide z-20 overflow-hidden">
            <button onclick="toggleMenu('menu-${g.label.replace(/\s+/g,'-')}')"
              class="w-full flex items-center gap-2 px-4 py-2.5 text-sm t-text hover:bg-purple-500/10 hover:text-purple-400 transition-colors">
              <span class="material-symbols-outlined text-[16px]">edit</span>Editar
            </button>
            <button onclick="toggleMenu('menu-${g.label.replace(/\s+/g,'-')}')"
              class="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
              <span class="material-symbols-outlined text-[16px]">delete</span>Eliminar
            </button>
          </div>
        </div>

        <!-- Círculo de progreso + porcentaje central -->
        <div style="display:flex;align-items:center;gap:20px;margin-bottom:16px;">
          <div style="position:relative;width:90px;height:90px;flex-shrink:0;">
            <!-- Fondo decorativo glow -->
            <div style="
              position:absolute;inset:8px;border-radius:50%;
              background:radial-gradient(circle,${g.colorBg} 0%,transparent 70%);
            "></div>
            <svg width="90" height="90" viewBox="0 0 120 120" style="transform:rotate(-90deg);">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" stroke-width="10"/>
              <!-- Segmento de progreso -->
              <circle cx="60" cy="60" r="50" fill="none"
                stroke="url(#grad-${g.label.replace(/\s+/g,'-')})"
                stroke-width="10" stroke-linecap="round"
                stroke-dasharray="314.2"
                stroke-dashoffset="${calcularOffset(g.pct)}"
                style="filter:drop-shadow(0 0 6px ${g.colorGlow});"/>
              <defs>
                <linearGradient id="grad-${g.label.replace(/\s+/g,'-')}" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="${g.gradFrom}"/>
                  <stop offset="100%" stop-color="${g.gradTo}"/>
                </linearGradient>
              </defs>
            </svg>
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;">
              <span class="font-bold t-text" style="font-size:18px;line-height:1;">${g.pct}%</span>
            </div>
          </div>

          <!-- Montos -->
          <div style="flex:1;">
            <p class="text-[10px] t-muted uppercase tracking-wider font-semibold mb-1">Ahorrado</p>
            <p class="text-2xl font-bold" style="color:${g.color};line-height:1;margin-bottom:4px;">${g.saved}</p>
            <p class="text-[11px] t-muted">de <strong class="t-text">${g.goal}</strong> meta</p>

            <!-- Mini barra lineal debajo -->
            <div style="height:4px;border-radius:999px;background:var(--border);overflow:hidden;margin-top:10px;">
              <div style="
                height:100%;width:${g.pct}%;border-radius:999px;
                background:linear-gradient(90deg,${g.gradFrom},${g.gradTo});
                box-shadow:0 0 8px ${g.colorGlow};
              "></div>
            </div>
            <p class="text-[9px] t-muted mt-1">Faltan <strong style="color:${g.color};">${100-g.pct}%</strong> para completar</p>
          </div>
        </div>

      </div>
    </div>`).join("");
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
        <path d="${sparkFill}" fill="url(#lgSparkMetas)"/>
        <path d="${sparkLine}" fill="none" stroke="#4ade80" stroke-width="1.5" stroke-linecap="round"/>
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

window.toggleMenu = function(id) {
  const menu = document.getElementById(id);
  const todosLosMenus = document.querySelectorAll('[id^="menu-"]');
  todosLosMenus.forEach(m => { if (m.id !== id) m.classList.add('hidden'); });
  menu.classList.toggle('hidden');
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

    <!-- Botón nueva meta -->
    <div class="w-full flex justify-end pb-4">
      <button class="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors" style="box-shadow:0 0 12px rgba(146,19,236,.4)">
        <span class="material-symbols-outlined text-[18px]">add_circle</span>
        Nueva Meta
      </button>
    </div>

    <!-- Cards de objetivos -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      ${renderObjetivos()}
    </div>

    <!-- Progreso global — rediseñado -->
    <div class="t-card rounded-2xl relative overflow-hidden mb-4" style="padding:0;">

      <div class="p-6 relative">
        <!-- Ícono de fondo decorativo -->
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

          <!-- Barra segmentada por categoría -->
          <div style="display:flex;height:10px;border-radius:999px;overflow:hidden;gap:2px;margin-bottom:10px;">
            <div style="flex:75;background:linear-gradient(90deg,#4ade80,#6ee7a0);box-shadow:0 0 6px #4ade8033;border-radius:999px 0 0 999px;position:relative;">
              <span style="position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;color:#4ade80;white-space:nowrap;">75%</span>
            </div>
            <div style="flex:40;background:linear-gradient(90deg,#9213ec,#c084fc);box-shadow:0 0 6px #9213ec33;">
              <span style="display:none"></span>
            </div>
            <div style="flex:15;background:linear-gradient(90deg,#f87171,#fca5a5);box-shadow:0 0 6px #f8717133;border-radius:0 999px 999px 0;">
            </div>
            <div style="flex:${100-Math.round((75+40+15)/3)};background:var(--border);border-radius:0 999px 999px 0;"></div>
          </div>

          <!-- Leyenda de la barra -->
          <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:16px;">
            <span style="font-size:10px;font-weight:600;color:#6ee7a0;display:flex;align-items:center;gap:4px;">
              <span style="width:8px;height:8px;border-radius:50%;background:#4ade80;box-shadow:0 0 3px #4ade8066;display:inline-block;"></span>
              Emergencia 75%
            </span>
            <span style="font-size:10px;font-weight:600;color:#c084fc;display:flex;align-items:center;gap:4px;">
              <span style="width:8px;height:8px;border-radius:50%;background:#c084fc;box-shadow:0 0 3px #c084fc66;display:inline-block;"></span>
              Japón 40%
            </span>
            <span style="font-size:10px;font-weight:600;color:#f87171;display:flex;align-items:center;gap:4px;">
              <span style="width:8px;height:8px;border-radius:50%;background:#f87171;box-shadow:0 0 3px #f8717166;display:inline-block;"></span>
              Inversión 15%
            </span>
          </div>

          <div class="flex justify-between text-xs t-muted pt-3 border-t t-divide">
            <span>Actual: <strong class="t-text font-semibold">$32,450</strong></span>
            <span>Objetivo: <strong class="t-text font-semibold">$52,000</strong></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Fila inferior: stat + sparkline -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="t-card p-5 rounded-xl flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 flex-shrink-0"
          style="box-shadow:0 0 12px rgba(74,222,128,.12);">
          <span class="material-symbols-outlined text-[26px]">trending_up</span>
        </div>
        <div>
          <p class="text-xs t-muted">Ahorro mensual promedio</p>
          <p class="text-2xl font-bold t-text">$2,400.00</p>
          <p class="text-[10px] text-green-400 font-semibold mt-0.5">↑ +12.5% vs mes ant.</p>
        </div>
      </div>
      ${renderSparkline()}
    </div>

  `,
};