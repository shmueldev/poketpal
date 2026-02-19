/**
 * graficas.js
 * ─────────────────────────────────────────────
 * Sección: Análisis Detallado
 * Muestra KPIs, scatter de doble línea,
 * torta semicírculo y tabla de movimientos.
 * ─────────────────────────────────────────────
 */

const kpis = [
  { lbl: "Total Balance",  icon: "account_balance", val: "$45,230", trend: "+5.2% este mes",    tc: "text-green-400" },
  { lbl: "Ahorro Mensual", icon: "savings",          val: "$2,150",  trend: "+1.2% vs mes ant.", tc: "text-green-400" },
];

const mesesGrafico = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN"];

const categorias = [
  { lbl: "Comida",     color: "text-purple-400", dot: "#9213ec", monto: "$1,120", pct: 35 },
  { lbl: "Transporte", color: "text-green-400",  dot: "#4ade80", monto: "$800",   pct: 25 },
  { lbl: "Entret.",    color: "text-red-400",    dot: "#f87171", monto: "$640",   pct: 20 },
  { lbl: "Otros",      color: "text-yellow-400", dot: "#facc15", monto: "$640",   pct: 20 },
];

const movimientos = [
  { icon: "shopping_cart",  ib: "bg-red-500/10",    ic: "text-red-400",    nombre: "Supermercado",  cat: "Comida",     fecha: "Hoy, 09:32",  monto: "-$128.50", mc: "text-red-400",   badge: "bg-red-500/10 text-red-400"     },
  { icon: "directions_car", ib: "bg-blue-500/10",   ic: "text-blue-400",   nombre: "Gasolina",      cat: "Transporte", fecha: "Hoy, 07:15",  monto: "-$65.00",  mc: "text-red-400",   badge: "bg-blue-500/10 text-blue-400"   },
  { icon: "payments",       ib: "bg-green-500/10",  ic: "text-green-400",  nombre: "Nómina",        cat: "Ingreso",    fecha: "Ayer, 12:00", monto: "+$3,200",  mc: "text-green-400", badge: "bg-green-500/10 text-green-400"  },
  { icon: "sports_esports", ib: "bg-purple-500/10", ic: "text-purple-400", nombre: "Netflix",       cat: "Entret.",    fecha: "Ayer, 20:45", monto: "-$15.99",  mc: "text-red-400",   badge: "bg-purple-500/10 text-purple-400"},
  { icon: "restaurant",     ib: "bg-orange-500/10", ic: "text-orange-400", nombre: "Restaurante",   cat: "Comida",     fecha: "Lun, 14:20",  monto: "-$42.00",  mc: "text-red-400",   badge: "bg-orange-500/10 text-orange-400"},
];

// Puntos scatter: x, yIngresos, yGastos — viewBox 0 0 300 80
const scatterPuntos = [
  { x: 25,  yi: 48, yg: 65 },
  { x: 85,  yi: 30, yg: 55 },
  { x: 145, yi: 42, yg: 62 },
  { x: 205, yi: 18, yg: 45 },
  { x: 255, yi: 25, yg: 52 },
  { x: 285, yi: 8,  yg: 38 },
];

function renderKpis() {
  return kpis.map((s) => `
    <div class="t-card p-5 rounded-xl">
      <div class="flex items-center justify-between mb-3">
        <p class="text-xs font-semibold uppercase tracking-wide t-muted">${s.lbl}</p>
        <span class="material-symbols-outlined text-purple-400 text-[20px]">${s.icon}</span>
      </div>
      <p class="text-2xl font-bold t-text">${s.val}</p>
      <p class="text-xs ${s.tc} mt-1 flex items-center gap-1">
        <span class="material-symbols-outlined text-sm">trending_up</span>${s.trend}
      </p>
    </div>`).join("");
}

function renderCategorias() {
  return categorias.map((c) => `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
      <!-- Ícono / dot -->
      <span style="
        width:32px;height:32px;border-radius:10px;background:${c.dot}18;
        display:flex;align-items:center;justify-content:center;flex-shrink:0;
        box-shadow:0 0 8px ${c.dot}44;
      ">
        <span style="width:8px;height:8px;border-radius:50%;background:${c.dot};box-shadow:0 0 5px ${c.dot};display:inline-block;"></span>
      </span>
      <!-- Label + barra -->
      <div style="flex:1;min-width:0;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span class="text-[11px] font-semibold t-text">${c.lbl}</span>
          <span class="text-[11px] font-bold ${c.color}">${c.monto}</span>
        </div>
        <div style="height:5px;border-radius:999px;background:var(--border);overflow:hidden;">
          <div style="
            height:100%;width:${c.pct}%;border-radius:999px;
            background:linear-gradient(90deg,${c.dot}cc,${c.dot});
            box-shadow:0 0 8px ${c.dot}88;
            transition:width .6s ease;
          "></div>
        </div>
      </div>
      <!-- Porcentaje -->
      <span class="text-[10px] font-bold t-muted" style="min-width:28px;text-align:right;">${c.pct}%</span>
    </div>`).join("");
}

function renderScatter() {
  const lineaI = scatterPuntos.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.yi}`).join(' ');
  const lineaG = scatterPuntos.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.yg}`).join(' ');

  const ptsI = scatterPuntos.map((p, i) => {
    const last = i === scatterPuntos.length - 1;
    return `<circle cx="${p.x}" cy="${p.yi}" r="${last ? 5.5 : 4}"
      fill="#4ade80" stroke="${last ? 'white' : 'var(--bg-card)'}" stroke-width="${last ? 2 : 1.5}"
      style="filter:drop-shadow(0 0 ${last ? 6 : 3}px #4ade80${last ? '' : '88'})"/>`;
  }).join('');

  const ptsG = scatterPuntos.map((p, i) => {
    const last = i === scatterPuntos.length - 1;
    return `<circle cx="${p.x}" cy="${p.yg}" r="${last ? 5.5 : 4}"
      fill="#f87171" stroke="${last ? 'white' : 'var(--bg-card)'}" stroke-width="${last ? 2 : 1.5}"
      style="filter:drop-shadow(0 0 ${last ? 6 : 3}px #f87171${last ? '' : '88'})"/>`;
  }).join('');

  return `
    <!-- Líneas guía -->
    <line x1="0" y1="20" x2="300" y2="20" stroke="var(--border)" stroke-width="1"/>
    <line x1="0" y1="40" x2="300" y2="40" stroke="var(--border)" stroke-width="1"/>
    <line x1="0" y1="60" x2="300" y2="60" stroke="var(--border)" stroke-width="1"/>
    <!-- Conectores punteados -->
    <path d="${lineaI}" fill="none" stroke="#4ade8033" stroke-width="1.5" stroke-dasharray="4 3"/>
    <path d="${lineaG}" fill="none" stroke="#f8717133" stroke-width="1.5" stroke-dasharray="4 3"/>
    <!-- Puntos -->
    ${ptsI}${ptsG}`;
}

function renderTablaMovimientos() {
  return movimientos.map((m, i) => `
    <tr class="group transition-colors hover:bg-purple-500/5 ${i < movimientos.length - 1 ? 'border-b t-divide' : ''}">
      <td class="py-3 pr-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl ${m.ib} flex items-center justify-center ${m.ic} shrink-0 group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-[17px]">${m.icon}</span>
          </div>
          <div>
            <p class="text-xs font-semibold t-text">${m.nombre}</p>
            <p class="text-[10px] t-muted">${m.fecha}</p>
          </div>
        </div>
      </td>
      <td class="py-3 pr-3">
        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${m.badge}">${m.cat}</span>
      </td>
      <td class="py-3 text-right">
        <p class="text-sm font-bold ${m.mc}">${m.monto}</p>
      </td>
    </tr>`).join("");
}

export const graficas = {
  titulo:    "Análisis Detallado",
  subtitulo: "Visualiza tus finanzas en tiempo real",
  contenido: () => /*html*/`

    <!-- KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      ${renderKpis()}
    </div>

    <!-- Gráficos -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

      <!-- Scatter doble línea — altura reducida -->
      <div class="t-card lg:col-span-2 rounded-xl p-5">
        <div class="flex items-start justify-between mb-3">
          <div>
            <p class="text-sm font-semibold t-text">Ingresos vs Gastos</p>
            <p class="text-xs t-muted mt-0.5">Comparativa mensual · últimos 6 meses</p>
          </div>
          <div class="flex gap-3 items-center">
            <span class="flex items-center gap-1.5 text-[11px] font-semibold text-green-400">
              <span class="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" style="box-shadow:0 0 5px #4ade80"></span>Ingresos
            </span>
            <span class="flex items-center gap-1.5 text-[11px] font-semibold text-red-400">
              <span class="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" style="box-shadow:0 0 5px #f87171"></span>Gastos
            </span>
          </div>
        </div>

        <!-- CAMBIO: aspect ratio más compacto 16/3 en lugar de 16/5 -->
        <div class="w-full aspect-[16/7]">
          <svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 300 80">
            ${renderScatter()}
          </svg>
        </div>

        <div class="flex justify-between pt-3 border-t t-divide">
          ${mesesGrafico.map((m) => `<span class="text-[10px] font-bold t-muted">${m}</span>`).join("")}
        </div>
      </div>

      <!-- Gastos por Categoría — rediseñado -->
      <div class="t-card rounded-xl p-5 flex flex-col">

        <!-- Header -->
        <div class="flex items-center justify-between mb-3">
          <div>
            <p class="text-sm font-semibold t-text">Gastos por Categoría</p>
            <p class="text-xs t-muted mt-0.5">Mayo 2025</p>
          </div>
          <span class="material-symbols-outlined t-muted text-[18px]">more_vert</span>
        </div>

        <!-- Total destacado -->
        <div style="
          background:linear-gradient(135deg,#9213ec22,#f8717111);
          border:1px solid var(--border);
          border-radius:14px;
          padding:12px 16px;
          margin-bottom:16px;
          display:flex;
          align-items:center;
          justify-content:space-between;
        ">
          <div>
            <p class="text-[10px] t-muted uppercase tracking-wider font-semibold">Gasto Total</p>
            <p class="text-2xl font-bold t-text" style="line-height:1.1;">$3,200</p>
          </div>
          <div style="text-align:right;">
            <span style="
              background:#f8717122;border:1px solid #f8717144;
              color:#f87171;font-size:10px;font-weight:700;
              padding:3px 8px;border-radius:999px;display:inline-block;margin-bottom:4px;
            ">↓ 5.4%</span>
            <p class="text-[10px] t-muted">vs mes ant.</p>
          </div>
        </div>

        <!-- Torta semicírculo compacta -->
        <div style="position:relative;width:100%;max-width:180px;margin:0 auto 12px;">
          <svg viewBox="-1.15 -1.15 2.3 1.3" width="100%" style="display:block;overflow:visible;">
            <path d="M-1,0 A1,1,0,0,1,1,0 Z" fill="var(--bg-card-alt, var(--bg-card))"/>
            <path d="M0,0 L-1,0 A1,1,0,0,1,-0.454,-0.891 Z" fill="#9213ec" style="filter:drop-shadow(0 0 6px #9213ecaa)"/>
            <path d="M0,0 L-0.454,-0.891 A1,1,0,0,1,0.309,-0.951 Z" fill="#4ade80" style="filter:drop-shadow(0 0 5px #4ade80aa)"/>
            <path d="M0,0 L0.309,-0.951 A1,1,0,0,1,0.809,-0.588 Z" fill="#f87171" style="filter:drop-shadow(0 0 5px #f87171aa)"/>
            <path d="M0,0 L0.809,-0.588 A1,1,0,0,1,1,0 Z" fill="#facc15" style="filter:drop-shadow(0 0 5px #facc15aa)"/>
            <path d="M-0.62,0 A0.62,0.62,0,0,1,0.62,0 Z" fill="var(--bg-card)"/>
            <rect x="-1.15" y="-0.01" width="2.3" height=".2" fill="var(--bg-card)"/>
          </svg>
        </div>

        <!-- Categorías con barras de progreso -->
        <div style="flex:1;">
          ${renderCategorias()}
        </div>

      </div>

    </div>

    <!-- Tabla movimientos recientes -->
    <div class="t-card rounded-xl p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <p class="text-sm font-semibold t-text">Movimientos Recientes</p>
          <p class="text-xs t-muted mt-0.5">Últimas transacciones registradas</p>
        </div>
        <button class="flex items-center gap-1 text-[11px] font-bold text-purple-400 hover:text-purple-300 transition-colors">
          Ver todo <span class="material-symbols-outlined text-[15px]">chevron_right</span>
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b t-divide">
              <th class="pb-2.5 text-left text-[10px] font-bold uppercase tracking-wider t-muted">Concepto</th>
              <th class="pb-2.5 text-left text-[10px] font-bold uppercase tracking-wider t-muted">Categoría</th>
              <th class="pb-2.5 text-right text-[10px] font-bold uppercase tracking-wider t-muted">Monto</th>
            </tr>
          </thead>
          <tbody>
            ${renderTablaMovimientos()}
          </tbody>
        </table>
      </div>
    </div>

  `,
};