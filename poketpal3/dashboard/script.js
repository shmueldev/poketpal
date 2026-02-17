const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleSidebar");
const overlay = document.getElementById("overlay");
const content = document.getElementById("content");
const menuItems = document.querySelectorAll(".menu-item");
const themeToggle = document.getElementById("themeToggle");

const sectionTitle = document.getElementById("sectionTitle");
const sectionSubtitle = document.getElementById("sectionSubtitle");

let sidebarOpen = false;
let isDarkTheme = true;

// ===== THEME FUNCTIONALITY =====
function applyTheme(dark, animate = true) {
  const body = document.body;
  const header = document.querySelector("header");
  const sidebar = document.getElementById("sidebar");
  const toggleCircle = document.getElementById("themeToggleCircle");
  const themeIcon = document.getElementById("themeIcon");

  if (dark) {
    // Dark theme
    body.className =
      "bg-zinc-950 text-white overflow-hidden transition-all duration-700 ease-in-out";
    header.className =
      "h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 transition-all duration-700 ease-in-out";
    sidebar.className = sidebar.className
      .replace(/bg-zinc-900|bg-white/g, "bg-zinc-900")
      .replace(/border-zinc-800|border-gray-200/g, "border-zinc-800");
    sectionSubtitle.className =
      "text-sm text-zinc-400 transition-all duration-700 ease-in-out";

    // Animate toggle
    if (animate) {
      toggleCircle.style.transform = "translateX(0) rotate(0deg)";
      setTimeout(() => {
        themeIcon.textContent = "🌙";
      }, 250);
    } else {
      toggleCircle.style.transform = "translateX(0)";
      themeIcon.textContent = "🌙";
    }

    // Update menu items hover
    menuItems.forEach((item) => {
      item.className = item.className.replace(
        /hover:bg-gray-100/g,
        "hover:bg-zinc-800",
      );
    });
  } else {
    // Light theme
    body.className =
      "bg-gray-50 text-gray-900 overflow-hidden transition-all duration-700 ease-in-out";
    header.className =
      "h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 transition-all duration-700 ease-in-out shadow-sm";
    sidebar.className = sidebar.className
      .replace(/bg-zinc-900|bg-white/g, "bg-white")
      .replace(/border-zinc-800|border-gray-200/g, "border-gray-200");
    sectionSubtitle.className =
      "text-sm text-gray-500 transition-all duration-700 ease-in-out";

    // Animate toggle
    if (animate) {
      toggleCircle.style.transform = "translateX(28px) rotate(360deg)";
      setTimeout(() => {
        themeIcon.textContent = "☀️";
      }, 250);
    } else {
      toggleCircle.style.transform = "translateX(28px)";
      themeIcon.textContent = "☀️";
    }

    // Update menu items hover
    menuItems.forEach((item) => {
      item.className = item.className.replace(
        /hover:bg-zinc-800/g,
        "hover:bg-gray-100",
      );
    });
  }

  // Reload current section to apply theme to content with fade animation
  const activeSection = document.querySelector(".menu-item.bg-purple-600");
  if (activeSection) {
    content.style.opacity = "0";
    content.style.transform = "translateY(10px)";
    setTimeout(() => {
      loadSection(activeSection.dataset.section);
      content.style.transition =
        "opacity 0.5s ease-out, transform 0.5s ease-out";
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
    }, 200);
  }
}

themeToggle.addEventListener("click", () => {
  isDarkTheme = !isDarkTheme;
  applyTheme(isDarkTheme, true);
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  isDarkTheme = savedTheme === "dark";
  applyTheme(isDarkTheme, false);
}

// ===== SIDEBAR FUNCTIONALITY =====
toggleBtn.addEventListener("click", () => {
  sidebarOpen = !sidebarOpen;
  updateSidebar();
});

overlay.addEventListener("click", () => {
  sidebarOpen = false;
  updateSidebar();
});

function updateSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
  } else {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  }
}

// ===== SECTION CONFIG =====
const sections = {
     historial: {
        title: "Historial de Movimientos",
        subtitle: "Consulta tus transacciones recientes",
        content: () => `
          <div class="${isDarkTheme ? 'bg-zinc-900' : 'bg-white'} rounded-xl p-6 transition-colors duration-300 shadow-lg">
            <table class="w-full text-left">
              <thead class="${isDarkTheme ? 'text-zinc-400 border-b border-zinc-700' : 'text-gray-500 border-b border-gray-200'}">
                <tr>
                  <th class="py-2">Fecha</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody class="space-y-2">
                ${generateTableRows(6)}
              </tbody>
            </table>
          </div>
        `},
//   historial: {
//     title: "Historial de Movimientos",
//     subtitle: "Consulta tus transacciones recientes",
//     content: () => `
//           <!-- Filters & Search Section -->
//                 <div class="bg-white rounded-xl shadow-sm border border-primary/5 p-4 mb-6">
//                     <div class="flex flex-col lg:flex-row gap-4 items-center">
//                         <div class="w-full lg:flex-1">
//                             <div class="relative">
//                                 <span
//                                     class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/60">search</span>
//                                 <input
//                                     class="w-full bg-background-light dark:bg-background-dark border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/50 text-sm placeholder:text-gray-400"
//                                     placeholder="Buscar por concepto, referencia o ID..." type="text" />
//                             </div>
//                         </div>
//                         <div class="flex flex-wrap gap-2 w-full lg:w-auto">
//                             <button
//                                 class="flex items-center gap-2 bg-background-light dark:bg-background-dark px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-primary/10 transition-colors">
//                                 <span class="material-symbols-outlined text-sm">category</span>
//                                 Categoría
//                                 <span class="material-symbols-outlined text-sm">expand_more</span>
//                             </button>
//                             <button
//                                 class="flex items-center gap-2 bg-background-light dark:bg-background-dark px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-primary/10 transition-colors">
//                                 <span class="material-symbols-outlined text-sm">calendar_month</span>
//                                 Rango de Fecha
//                                 <span class="material-symbols-outlined text-sm">expand_more</span>
//                             </button>
//                             <button
//                                 class="flex items-center gap-2 bg-background-light dark:bg-background-dark px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-primary/10 transition-colors">
//                                 <span class="material-symbols-outlined text-sm">filter_list</span>
//                                 Tipo
//                                 <span class="material-symbols-outlined text-sm">expand_more</span>
//                             </button>
//                             <button
//                                 class="bg-primary text-white p-2.5 rounded-xl hover:bg-primary/90 transition-colors">
//                                 <span class="material-symbols-outlined">download</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <!-- Transaction Table Container -->
//                 <div class="bg-white rounded-xl shadow-sm border border-primary/5 overflow-hidden">
//                     <div class="overflow-x-auto">
//                         <table class="w-full text-left border-collapse">
//                             <thead>
//                                 <tr
//                                     class="bg-primary/5 dark:bg-primary/10 text-primary uppercase text-xs font-bold tracking-wider">
//                                     <th class="px-6 py-4">Fecha</th>
//                                     <th class="px-6 py-4">Concepto</th>
//                                     <th class="px-6 py-4">Categoría</th>
//                                     <th class="px-6 py-4 text-right">Monto</th>
//                                     <th class="px-6 py-4 text-center">Estado</th>
//                                     <th class="px-6 py-4 text-center">Acciones</th>
//                                 </tr>
//                             </thead>
//                             <tbody class="divide-y divide-gray-100 dark:divide-white/5">
//                                 <!-- Transaction Row 1 -->
//                                 <tr class="hover:bg-primary/5 dark:hover:bg-primary/5 transition-colors group">
//                                     <td class="px-6 py-5 whitespace-nowrap">
//                                         <div class="flex flex-col">
//                                             <span class="text-sm font-semibold">12 Oct, 2023</span>
//                                             <span class="text-xs text-gray-400">10:45 AM</span>
//                                         </div>
//                                     </td>
//                                     <td class="px-6 py-5">
//                                         <div class="flex items-center gap-3">
//                                             <div
//                                                 class="size-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
//                                                 <span class="material-symbols-outlined">menu_book</span>
//                                             </div>
//                                             <div class="flex flex-col">
//                                                 <span class="text-sm font-bold">Curso: Inversiones 101</span>
//                                                 <span class="text-xs text-gray-400">ID: FE-98234</span>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td class="px-6 py-5 whitespace-nowrap">
//                                         <span
//                                             class="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300">EDUCACIÓN</span>
//                                     </td>
//                                     <td class="px-6 py-5 text-right whitespace-nowrap">
//                                         <span class="text-sm font-bold text-red-500">-$45.00</span>
//                                     </td>
//                                     <td class="px-6 py-5 text-center">
//                                         <span
//                                             class="px-3 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold">COMPLETADO</span>
//                                     </td>
//                                     <td class="px-6 py-5 text-center">
//                                         <button class="text-gray-400 hover:text-primary"><span
//                                                 class="material-symbols-outlined">more_vert</span></button>
//                                     </td>
//                                 </tr>
//                                 <!-- Transaction Row 2 -->
//                                 <tr class="hover:bg-primary/5 dark:hover:bg-primary/5 transition-colors group">
//                                     <td class="px-6 py-5 whitespace-nowrap">
//                                         <div class="flex flex-col">
//                                             <span class="text-sm font-semibold">10 Oct, 2023</span>
//                                             <span class="text-xs text-gray-400">03:20 PM</span>
//                                         </div>
//                                     </td>
//                                     <td class="px-6 py-5">
//                                         <div class="flex items-center gap-3">
//                                             <div
//                                                 class="size-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
//                                                 <span class="material-symbols-outlined">add_card</span>
//                                             </div>
//                                             <div class="flex flex-col">
//                                                 <span class="text-sm font-bold">Recarga de Saldo</span>
//                                                 <span class="text-xs text-gray-400">Transferencia Bancaria</span>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td class="px-6 py-5 whitespace-nowrap">
//                                         <span
//                                             class="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300">DEPÓSITO</span>
//                                     </td>
//                                     <td class="px-6 py-5 text-right whitespace-nowrap">
//                                         <span class="text-sm font-bold text-green-500">+$200.00</span>
//                                     </td>
//                                     <td class="px-6 py-5 text-center">
//                                         <span
//                                             class="px-3 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold">COMPLETADO</span>
//                                     </td>
//                                     <td class="px-6 py-5 text-center">
//                                         <button class="text-gray-400 hover:text-primary"><span
//                                                 class="material-symbols-outlined">more_vert</span></button>
//                                     </td>
//                                 </tr>
//                                 <!-- Transaction Row 3 -->
//                                 <tr class="hover:bg-primary/5 dark:hover:bg-primary/5 transition-colors group">
//                                     <td class="px-6 py-5 whitespace-nowrap">
//                                         <div class="flex flex-col">
//                                             <span class="text-sm font-semibold">08 Oct, 2023</span>
//                                             <span class="text-xs text-gray-400">11:10 AM</span>
//                                         </div>
//                                     </td>
//                                     <td class="px-6 py-5">
//                                         <div class="flex items-center gap-3">
//                                             <div
//                                                 class="size-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
//                                                 <span class="material-symbols-outlined">savings</span>
//                                             </div>
//                                             <div class="flex flex-col">
//                                                 <span class="text-sm font-bold">Meta: Ahorro Master</span>
//                                                 <span class="text-xs text-gray-400">Aportación Automática</span>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td class="px-6 py-5 whitespace-nowrap">
//                                         <span
//                                             class="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300">AHORROS</span>
//                                     </td>
//                                     <td class="px-6 py-5 text-right whitespace-nowrap">
//                                         <span class="text-sm font-bold text-red-500">-$25.00</span>
//                                     </td>
//                                     <td class="px-6 py-5 text-center">
//                                         <span
//                                             class="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-[10px] font-bold">PENDIENTE</span>
//                                     </td>
//                                     <td class="px-6 py-5 text-center">
//                                         <button class="text-gray-400 hover:text-primary"><span
//                                                 class="material-symbols-outlined">more_vert</span></button>
//                                     </td>
//                                 </tr>
//                                 <!-- Transaction Row 4 -->
//                                 <tr class="hover:bg-primary/5 dark:hover:bg-primary/5 transition-colors group">
//                                     <td class="px-6 py-5 whitespace-nowrap">
//                                         <div class="flex flex-col">
//                                             <span class="text-sm font-semibold">05 Oct, 2023</span>
//                                             <span class="text-xs text-gray-400">09:00 AM</span>
//                                         </div>
//                                     </td>
//                                     <td class="px-6 py-5">
//                                         <div class="flex items-center gap-3">
//                                             <div
//                                                 class="size-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
//                                                 <span class="material-symbols-outlined">redeem</span>
//                                             </div>
//                                             <div class="flex flex-col">
//                                                 <span class="text-sm font-bold">Bono de Bienvenida</span>
//                                                 <span class="text-xs text-gray-400">Promoción Octubre</span>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td class="px-6 py-5 whitespace-nowrap">
//                                         <span
//                                             class="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300">RECOMPENSA</span>
//                                     </td>
//                                     <td class="px-6 py-5 text-right whitespace-nowrap">
//                                         <span class="text-sm font-bold text-green-500">+$10.00</span>
//                                     </td>
//                                     <td class="px-6 py-5 text-center">
//                                         <span
//                                             class="px-3 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold">COMPLETADO</span>
//                                     </td>
//                                     <td class="px-6 py-5 text-center">
//                                         <button class="text-gray-400 hover:text-primary"><span
//                                                 class="material-symbols-outlined">more_vert</span></button>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                     <!-- Pagination Footer -->
//                     <div
//                         class="px-6 py-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
//                         <span class="text-xs text-gray-500 dark:text-gray-400">Mostrando 4 de 128 transacciones</span>
//                         <div class="flex gap-2">
//                             <button
//                                 class="size-8 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800 text-gray-500 disabled:opacity-50"
//                                 disabled="">
//                                 <span class="material-symbols-outlined text-sm">chevron_left</span>
//                             </button>
//                             <button
//                                 class="size-8 flex items-center justify-center rounded bg-primary text-white text-xs font-bold">1</button>
//                             <button
//                                 class="size-8 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-bold">2</button>
//                             <button
//                                 class="size-8 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-bold">3</button>
//                             <button
//                                 class="size-8 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
//                                 <span class="material-symbols-outlined text-sm">chevron_right</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <!-- Summary Cards Section -->
//                 <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
//                     <div class="bg-primary p-6 rounded-xl text-white shadow-lg shadow-primary/20">
//                         <div class="flex items-center justify-between mb-4">
//                             <span class="text-white/80 text-sm font-medium">Balance Educativo</span>
//                             <span class="material-symbols-outlined text-white/60">account_balance</span>
//                         </div>
//                         <div class="text-3xl font-extrabold">$1,240.50</div>
//                         <div class="mt-2 text-xs text-white/60 flex items-center gap-1">
//                             <span class="material-symbols-outlined text-xs">trending_up</span>
//                             +12% respecto al mes anterior
//                         </div>
//                     </div>
//                     <div class="bg-white dark:bg-[#251a31] p-6 rounded-xl border border-primary/5 shadow-sm">
//                         <div class="flex items-center justify-between mb-4">
//                             <span class="text-gray-500 dark:text-gray-400 text-sm font-medium">Gastos en Cursos</span>
//                             <span class="material-symbols-outlined text-primary">school</span>
//                         </div>
//                         <div class="text-3xl font-extrabold text-[#151118] dark:text-white">$345.00</div>
//                         <div class="mt-2 text-xs text-red-400 flex items-center gap-1">
//                             <span class="material-symbols-outlined text-xs">trending_down</span>
//                             -5% este mes
//                         </div>
//                     </div>
//                     <div class="bg-white dark:bg-[#251a31] p-6 rounded-xl border border-primary/5 shadow-sm">
//                         <div class="flex items-center justify-between mb-4">
//                             <span class="text-gray-500 dark:text-gray-400 text-sm font-medium">Metas Alcanzadas</span>
//                             <span class="material-symbols-outlined text-primary">emoji_events</span>
//                         </div>
//                         <div class="text-3xl font-extrabold text-[#151118] dark:text-white">8/10</div>
//                         <div class="mt-2 text-xs text-green-500 flex items-center gap-1">
//                             <span class="material-symbols-outlined text-xs">check_circle</span>
//                             ¡Vas por buen camino!
//                         </div>
//                     </div>
//                 </div>
//         `,
//   },
  metas: {
    title: "Tus Metas",
    subtitle: "Gestiona tus objetivos financieros",
    content: () => `
          <!-- Goals Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

                <!-- Goal Card 1 -->
                <div class="${isDarkTheme ? 'bg-[#151118B3] border-[1px] border-solid border-[rgba(146,19,236,0.1)]' : 'bg-white border-[1px] border-gray-200'} glass-panel p-8 rounded-xl flex flex-col items-center text-center">
                    <div class="relative w-32 h-32 mb-6">
                        <svg class="w-full h-full transform -rotate-90">
                            <circle class="text-white/5" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor"
                                stroke-width="8"></circle>
                            <circle class="text-primary drop-shadow-[0_0_8px_#9213ec]" cx="64" cy="64"
                                fill="transparent" r="58" stroke="currentColor" stroke-dasharray="364.4"
                                stroke-dashoffset="91.1" stroke-width="8"></circle>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-2xl font-bold">75%</span>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-1">Fondo de Emergencia</h3>
                    <p class="text-white/50 text-sm mb-4">Meta: $5,000.00</p>
                    <div class="w-full pt-4 border-t border-white/5 flex justify-between text-sm">
                        <span class="text-white/40">Ahorrado</span>
                        <span class="font-semibold text-primary">$3,750</span>
                    </div>
                </div>

                <!-- Goal Card 2 -->
                <div class="${isDarkTheme ? 'bg-[#151118B3] border-[1px] border-solid border-[rgba(146,19,236,0.1)]' : 'bg-white border-[1px] border-gray-200'} glass-panel p-8 rounded-xl flex flex-col items-center text-center">
                    <div class="relative w-32 h-32 mb-6">
                        <svg class="w-full h-full transform -rotate-90">
                            <circle class="text-white/5" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor"
                                stroke-width="8"></circle>
                            <circle class="text-primary/70 drop-shadow-[0_0_8px_#9213ec]" cx="64" cy="64"
                                fill="transparent" r="58" stroke="currentColor" stroke-dasharray="364.4"
                                stroke-dashoffset="218.6" stroke-width="8"></circle>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-2xl font-bold">40%</span>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-1">Viaje a Japón</h3>
                    <p class="text-white/50 text-sm mb-4">Meta: $12,000.00</p>
                    <div class="w-full pt-4 border-t border-white/5 flex justify-between text-sm">
                        <span class="text-white/40">Ahorrado</span>
                        <span class="font-semibold text-primary">$4,800</span>
                    </div>
                </div>

                <!-- Goal Card 3 -->
                <div class="${isDarkTheme ? 'bg-[#151118B3] border-[1px] border-solid border-[rgba(146,19,236,0.1)]' : 'bg-white border-[1px] border-gray-200'} glass-panel p-8 rounded-xl flex flex-col items-center text-center">
                    <div class="relative w-32 h-32 mb-6">
                        <svg class="w-full h-full transform -rotate-90">
                            <circle class="text-white/5" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor"
                                stroke-width="8"></circle>
                            <circle class="text-primary/40 drop-shadow-[0_0_8px_#9213ec]" cx="64" cy="64"
                                fill="transparent" r="58" stroke="currentColor" stroke-dasharray="364.4"
                                stroke-dashoffset="309.7" stroke-width="8"></circle>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-2xl font-bold">15%</span>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-1">Inversión 2024</h3>
                    <p class="text-white/50 text-sm mb-4">Meta: $50,000.00</p>
                    <div class="w-full pt-4 border-t border-white/5 flex justify-between text-sm">
                        <span class="text-white/40">Ahorrado</span>
                        <span class="font-semibold text-primary">$7,500</span>
                    </div>
                </div>
            </div>
            <!-- Global Savings Progress -->
            <section class="${isDarkTheme ? 'bg-[#151118B3] border-[1px] border-solid border-[rgba(146,19,236,0.1)]' : 'bg-white border-[1px] border-gray-200'} glass-panel p-10 rounded-xl relative overflow-hidden">
                <div class="absolute top-0 right-0 p-8 opacity-10">
                    <span class="material-symbols-outlined text-9xl">account_balance</span>
                </div>
                <div class="relative z-10">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 class="text-2xl font-bold mb-1">Meta Global de Ahorro</h2>
                            <p class="text-white/50">Progreso acumulado de todos tus objetivos activos</p>
                        </div>
                        <div class="text-right">
                            <span class="text-4xl font-extrabold text-white">62%</span>
                            <p class="text-white/40 text-sm">Completado</p>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <div class="w-full h-4 bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-primary via-[#b360f2] to-[#d8b4fe] rounded-full shadow-[0_0_15px_rgba(146,19,236,0.4)]"
                                style="width: 62%"></div>
                        </div>
                        <div class="flex justify-between items-center text-sm">
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-primary"></span>
                                <span class="text-white/60">Actual: <span
                                        class="text-white font-medium">$32,450.00</span></span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full bg-white/20"></span>
                                <span class="text-white/60">Objetivo Total: <span
                                        class="text-white font-medium">$52,000.00</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Bottom Stats Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                <div class="${isDarkTheme ? 'bg-[#151118B3] border-[1px] border-solid border-[rgba(146,19,236,0.1)]' : 'bg-white border-[1px] border-gray-200'} glass-panel p-6 rounded-xl flex items-center gap-6">
                    <div class="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                        <span class="material-symbols-outlined">trending_up</span>
                    </div>
                    <div>
                        <p class="text-white/50 text-sm">Ahorro mensual promedio</p>
                        <p class="text-2xl font-bold">$2,400.00</p>
                    </div>
                </div>
                <div class="${isDarkTheme ? 'bg-[#151118B3] border-[1px] border-solid border-[rgba(146,19,236,0.1)]' : 'bg-white border-[1px] border-gray-200'} glass-panel p-6 rounded-xl flex items-center gap-6">
                    <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span class="material-symbols-outlined">calendar_today</span>
                    </div>
                    <div>
                        <p class="text-white/50 text-sm">Estimado finalización global</p>
                        <p class="text-2xl font-bold">Octubre 2024</p>
                    </div>
                </div>
            </div>
        `,
  },
  graficas: {
    title: "Análisis Detallado",
    subtitle: "Visualiza tus finanzas en tiempo real",
    content: () => `
    <!-- Metrics Summary Cards -->
                <div class="flex flex-wrap gap-4 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

                    <!-- Statistics 1 -->
                    <div class= ${isDarkTheme ? 'bg-[#151118B3] border-[1px] border-solid border-[rgba(146,19,236,0.1)]' : 'bg-white border-[1px] border-gray-200'} flex min-w-[240px] flex-1 flex-col gap-2 rounded-xl p-6">
                        <div class="flex justify-between items-start">
                            <p
                                class="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">
                                Total Balance</p>
                            <span class="material-symbols-outlined text-primary">account_balance</span>
                        </div>
                        <div class="flex items-baseline gap-2">
                            <p class="text-slate-900 dark:text-white tracking-tight text-3xl font-extrabold">$45,230.00
                            </p>
                        </div>
                        <div class="flex items-center gap-1 text-emerald-500 text-sm font-bold">
                            <span class="material-symbols-outlined text-[18px]">trending_up</span>
                            <span>+5.2% este mes</span>
                        </div>
                    </div>

                    <!-- Statistics 2 -->
                    <div class="${isDarkTheme ? 'bg-[#151118B3] border-[2px] border-solid border-[rgba(146,19,236,0.1)]' : 'bg-white border-[1px] border-gray-200'} flex min-w-[240px] flex-1 flex-col gap-2 rounded-xl p-6">
                        <div class="flex justify-between items-start">
                            <p class="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">
                                Ahorro Mensual
                            </p>
                            <span class="material-symbols-outlined text-primary">savings</span>
                        </div>
                        <div class="flex items-baseline gap-2">
                            <p class="text-slate-900 dark:text-white tracking-tight text-3xl font-extrabold">$2,150.00
                            </p>
                        </div>
                        <div class="flex items-center gap-1 text-emerald-500 text-sm font-bold">
                            <span class="material-symbols-outlined text-[18px]">trending_up</span>
                            <span>+1.2% vs prev</span>
                        </div>
                    </div>

                    <!-- Statistics 3 -->
                    <div class="${isDarkTheme ? 'bg-[#151118B3] border-[2px] border-solid border-[rgba(146,19,236,0.1)]' : 'bg-white border-[1px] border-gray-200'} flex min-w-[240px] flex-1 flex-col gap-2 rounded-xl p-6">
                        <div class="flex justify-between items-start">
                            <p
                                class="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">
                                Retorno Inv.</p>
                            <span class="material-symbols-outlined text-primary">query_stats</span>
                        </div>
                        <div class="flex items-baseline gap-2">
                            <p class="text-slate-900 dark:text-white tracking-tight text-3xl font-extrabold">+12.5%</p>
                        </div>
                        <div class="flex items-center gap-1 text-emerald-500 text-sm font-bold">
                            <span class="material-symbols-outlined text-[18px]">trending_up</span>
                            <span>+0.8% anual</span>
                        </div>
                    </div>
                </div>

                <!-- Interactive Charts Section -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                    <!-- Market Trends Large Line Chart -->
                    <div class="${isDarkTheme ? 'bg-[#151118B3] border-[2px] border-solid border-[rgba(146,19,236,0.1)]' : 'bg-white border-[1px] border-gray-200'} lg:col-span-2 flex flex-col gap-4 rounded-xl p-6 shadow-sm">
                        <div class="flex items-center justify-between mb-2">
                            <div>
                                <h3 class="text-slate-900 dark:text-white text-lg font-bold">Tendencias del Mercado</h3>
                                <p class="text-slate-500 dark:text-[#ad9db9] text-sm">Valor total de activos en los
                                    últimos 6 meses</p>
                            </div>
                            <div class="flex gap-2">
                                <button
                                    class="px-3 py-1 text-xs font-bold rounded-lg bg-primary/10 text-primary border border-primary/20">6M</button>
                                <button
                                    class="px-3 py-1 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">1Y</button>
                            </div>
                        </div>
                        <div class="mt-2">
                            <div class="flex items-baseline gap-2 mb-4">
                                <p class="text-slate-900 dark:text-white tracking-tight text-4xl font-black">$124,500
                                </p>
                                <span class="text-emerald-500 text-base font-bold">+14.2%</span>
                            </div>
                            <div class="h-64 w-full relative">
                                <svg class="w-full h-full" preserveaspectratio="none" viewbox="0 0 500 200">
                                    <defs>
                                        <lineargradient id="lineGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                            <stop offset="0%" stop-color="#9213ec" stop-opacity="0.3"></stop>
                                            <stop offset="100%" stop-color="#9213ec" stop-opacity="0"></stop>
                                        </lineargradient>
                                    </defs>
                                    <path d="M0,160 Q50,140 100,150 T200,80 T300,100 T400,40 T500,60 L500,200 L0,200 Z"
                                        fill="url(#lineGradient)"></path>
                                    <path d="M0,160 Q50,140 100,150 T200,80 T300,100 T400,40 T500,60" fill="none"
                                        stroke="#9213ec" stroke-linecap="round" stroke-width="4"></path>
                                    <!-- Data Points -->
                                    <circle cx="100" cy="150" fill="#9213ec" r="5" stroke="white" stroke-width="2">
                                    </circle>
                                    <circle cx="200" cy="80" fill="#9213ec" r="5" stroke="white" stroke-width="2">
                                    </circle>
                                    <circle cx="400" cy="40" fill="#9213ec" r="5" stroke="white" stroke-width="2">
                                    </circle>
                                </svg>
                                <div
                                    class="flex justify-between mt-4 border-t border-slate-100 dark:border-slate-800 pt-4 px-2">
                                    <span class="text-slate-400 text-xs font-bold">ENE</span>
                                    <span class="text-slate-400 text-xs font-bold">FEB</span>
                                    <span class="text-slate-400 text-xs font-bold">MAR</span>
                                    <span class="text-slate-400 text-xs font-bold">ABR</span>
                                    <span class="text-slate-400 text-xs font-bold">MAY</span>
                                    <span class="text-slate-400 text-xs font-bold">JUN</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- Monthly Expenses Bar Chart -->
                    <div class="${isDarkTheme ? 'bg-[#151118B3] border-[2px] border-solid border-[rgba(146,19,236,0.1)]' : 'bg-white border-[1px] border-gray-200'} flex flex-col gap-4 rounded-xl p-6 shadow-sm">
                        <div class="flex items-center justify-between">
                            <h3 class="text-slate-900 dark:text-white text-lg font-bold">Gastos Mensuales</h3>
                            <span class="material-symbols-outlined text-slate-400">more_vert</span>
                        </div>
                        <div>
                            <p class="text-slate-900 dark:text-white tracking-tight text-3xl font-black truncate">$3,200
                            </p>
                            <p class="text-rose-500 text-sm font-bold mt-1">-5.4% vs mes anterior</p>
                        </div>
                        <div class="flex-1 flex items-end justify-between gap-2 h-48 mt-4 px-2">
                            <div class="flex-1 flex flex-col items-center gap-2">
                                <div class="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group transition-all"
                                    style="height: 65%;">
                                    <div
                                        class="absolute inset-0 bg-primary opacity-40 rounded-t-lg scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform">
                                    </div>
                                </div>
                                <span class="text-slate-400 text-[10px] font-bold">ENE</span>
                            </div>
                            <div class="flex-1 flex flex-col items-center gap-2">
                                <div class="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group"
                                    style="height: 40%;">
                                    <div
                                        class="absolute inset-0 bg-primary opacity-40 rounded-t-lg scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform">
                                    </div>
                                </div>
                                <span class="text-slate-400 text-[10px] font-bold">FEB</span>
                            </div>
                            <div class="flex-1 flex flex-col items-center gap-2">
                                <div class="w-full bg-primary rounded-t-lg relative shadow-lg shadow-primary/20"
                                    style="height: 85%;"></div>
                                <span class="text-primary text-[10px] font-bold">MAR</span>
                            </div>
                            <div class="flex-1 flex flex-col items-center gap-2">
                                <div class="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group"
                                    style="height: 55%;">
                                    <div
                                        class="absolute inset-0 bg-primary opacity-40 rounded-t-lg scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform">
                                    </div>
                                </div>
                                <span class="text-slate-400 text-[10px] font-bold">ABR</span>
                            </div>
                            <div class="flex-1 flex flex-col items-center gap-2">
                                <div class="w-full bg-primary/20 dark:bg-primary/10 rounded-t-lg relative group"
                                    style="height: 70%;">
                                    <div
                                        class="absolute inset-0 bg-primary opacity-40 rounded-t-lg scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform">
                                    </div>
                                </div>
                                <span class="text-slate-400 text-[10px] font-bold">MAY</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Portfolio Distribution & Asset Detail -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div
                        class="lg:col-span-1 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-6 shadow-sm">
                        <h3 class="text-slate-900 dark:text-white text-lg font-bold mb-6">Distribución</h3>
                        <div class="relative flex items-center justify-center py-4">
                            <!-- Simple SVG Doughnut Chart Representation -->
                            <svg class="w-40 h-40 transform -rotate-90">
                                <circle class="text-slate-100 dark:text-slate-800" cx="80" cy="80" fill="transparent"
                                    r="60" stroke="currentColor" stroke-width="16"></circle>
                                <circle class="text-primary" cx="80" cy="80" fill="transparent" r="60"
                                    stroke="currentColor" stroke-dasharray="376.99" stroke-dashoffset="207"
                                    stroke-linecap="round" stroke-width="16"></circle>
                                <circle class="text-indigo-400" cx="80" cy="80" fill="transparent" r="60"
                                    stroke="currentColor" stroke-dasharray="376.99" stroke-dashoffset="300"
                                    stroke-linecap="round" stroke-width="16"></circle>
                            </svg>
                            <div class="absolute flex flex-col items-center">
                                <span class="text-2xl font-black text-slate-900 dark:text-white">100%</span>
                                <span class="text-[10px] text-slate-400 font-bold uppercase">Activos</span>
                            </div>
                        </div>
                        <div class="space-y-3 mt-6">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="size-2 rounded-full bg-primary"></div>
                                    <span class="text-sm font-medium text-slate-600 dark:text-slate-300">Acciones
                                        (STK)</span>
                                </div>
                                <span class="text-sm font-bold text-slate-900 dark:text-white">45%</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="size-2 rounded-full bg-indigo-400"></div>
                                    <span class="text-sm font-medium text-slate-600 dark:text-slate-300">Cripto
                                        (BTC/ETH)</span>
                                </div>
                                <span class="text-sm font-bold text-slate-900 dark:text-white">35%</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <div class="size-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                    <span class="text-sm font-medium text-slate-600 dark:text-slate-300">Bonos
                                        (BND)</span>
                                </div>
                                <span class="text-sm font-bold text-slate-900 dark:text-white">20%</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="lg:col-span-3 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-6 shadow-sm overflow-x-auto">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-slate-900 dark:text-white text-lg font-bold">Rendimiento por Categoría</h3>
                            <button class="text-primary text-sm font-bold flex items-center gap-1">Ver todo <span
                                    class="material-symbols-outlined text-[18px]">chevron_right</span></button>
                        </div>
                        <table class="w-full text-left">
                            <thead>
                                <tr
                                    class="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                                    <th class="pb-4 font-bold">Activo</th>
                                    <th class="pb-4 font-bold">Balance</th>
                                    <th class="pb-4 font-bold">24h Rendimiento</th>
                                    <th class="pb-4 font-bold">7d Tendencia</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr>
                                    <td class="py-4">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="size-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                                                <span class="material-symbols-outlined">trending_up</span>
                                            </div>
                                            <div>
                                                <p class="text-sm font-bold text-slate-900 dark:text-white">Apple Inc.
                                                    (AAPL)</p>
                                                <p class="text-[11px] text-slate-400">Stocks / Technology</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-4">
                                        <p class="text-sm font-bold text-slate-900 dark:text-white">$12,450.00</p>
                                        <p class="text-[11px] text-slate-400">64.5 Shares</p>
                                    </td>
                                    <td class="py-4">
                                        <span class="text-emerald-500 text-sm font-bold">+2.4%</span>
                                    </td>
                                    <td class="py-4">
                                        <div class="w-24 h-8">
                                            <svg class="w-full h-full text-emerald-500" viewbox="0 0 100 30">
                                                <path d="M0,25 L20,15 L40,20 L60,5 L80,10 L100,2" fill="none"
                                                    stroke="currentColor" stroke-linecap="round" stroke-width="2">
                                                </path>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-4">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="size-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                                                <span class="material-symbols-outlined">currency_bitcoin</span>
                                            </div>
                                            <div>
                                                <p class="text-sm font-bold text-slate-900 dark:text-white">Bitcoin
                                                    (BTC)</p>
                                                <p class="text-[11px] text-slate-400">Crypto / Currency</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-4">
                                        <p class="text-sm font-bold text-slate-900 dark:text-white">$18,200.45</p>
                                        <p class="text-[11px] text-slate-400">0.45 BTC</p>
                                    </td>
                                    <td class="py-4">
                                        <span class="text-emerald-500 text-sm font-bold">+5.1%</span>
                                    </td>
                                    <td class="py-4">
                                        <div class="w-24 h-8">
                                            <svg class="w-full h-full text-emerald-500" viewbox="0 0 100 30">
                                                <path d="M0,28 L20,20 L40,15 L60,25 L80,5 L100,0" fill="none"
                                                    stroke="currentColor" stroke-linecap="round" stroke-width="2">
                                                </path>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="py-4">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                                <span class="material-symbols-outlined">description</span>
                                            </div>
                                            <div>
                                                <p class="text-sm font-bold text-slate-900 dark:text-white">Vanguard
                                                    Bond ETF</p>
                                                <p class="text-[11px] text-slate-400">Bonds / Fixed Income</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="py-4">
                                        <p class="text-sm font-bold text-slate-900 dark:text-white">$8,540.20</p>
                                        <p class="text-[11px] text-slate-400">120 Shares</p>
                                    </td>
                                    <td class="py-4">
                                        <span class="text-rose-500 text-sm font-bold">-0.2%</span>
                                    </td>
                                    <td class="py-4">
                                        <div class="w-24 h-8">
                                            <svg class="w-full h-full text-rose-500" viewbox="0 0 100 30">
                                                <path d="M0,5 L20,8 L40,15 L60,10 L80,18 L100,22" fill="none"
                                                    stroke="currentColor" stroke-linecap="round" stroke-width="2">
                                                </path>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>     
        `,
  },
  bot: {
    title: "Asistente Financiero",
    subtitle: "Obtén recomendaciones inteligentes",
    content: () => `
          <div class="${isDarkTheme ? "bg-zinc-900" : "bg-white"} rounded-xl p-6 transition-colors duration-300 shadow-lg animate-fade-in">
            <p class="mb-4 ${isDarkTheme ? "text-zinc-400" : "text-gray-600"} animate-slide-in" style="animation-delay: 0.1s; opacity: 0;">
              Hola Alex 👋 ¿En qué puedo ayudarte hoy?
            </p>
            <input 
              type="text"
              placeholder="Escribe tu pregunta..."
              class="w-full ${isDarkTheme ? "bg-zinc-800 text-white placeholder-zinc-500" : "bg-gray-100 text-gray-900 placeholder-gray-400"} rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 hover:scale-102 focus:scale-102 animate-fade-in"
              style="animation-delay: 0.2s; opacity: 0;"
            />
          </div>
          <!-- Chat Content -->
            <div class="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
                <!-- Bot Welcome -->
                <div class="flex items-start gap-4 max-w-3xl">
                    <div
                        class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20">
                        <span class="material-symbols-outlined text-primary text-lg">smart_toy</span>
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <div
                            class="bot-bubble px-5 py-3.5 rounded-2xl rounded-tl-none text-white text-[15px] leading-relaxed">
                            ¡Hola! Soy tu asistente de FinanzaBot. He analizado tus cuentas recientemente y veo que
                            tienes una oportunidad de ahorro del 12% optimizando tus suscripciones digitales. ¿En qué
                            puedo ayudarte hoy?
                        </div>
                        <span class="text-[10px] text-[#ad9db9] ml-1">10:42 AM</span>
                    </div>
                </div>
                <!-- User Message -->
                <div class="flex items-start gap-4 max-w-3xl self-end">
                    <div class="flex flex-col gap-1.5 items-end">
                        <div
                            class="bg-primary px-5 py-3.5 rounded-2xl rounded-tr-none text-white text-[15px] leading-relaxed shadow-lg shadow-primary/10">
                            ¿Puedes analizar mi presupuesto de este mes y compararlo con el anterior?
                        </div>
                        <span class="text-[10px] text-[#ad9db9] mr-1">10:43 AM</span>
                    </div>
                    <div
                        class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 overflow-hidden border border-white/20">
                        <img alt="User" class="w-full h-full object-cover" data-alt="Portrait of a professional man"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4QREoGJIAYXfSurRYTp1JrNe4606ljbzn5Jv8sW5yjcilSrRFGII6XRuaBVEZLPaO1MhnBqJvbiTcJh3JtIf24V4r6zS_l5opPSIufWbas-b-KoOhqMq2Y5ZG2QLmwTjaHeKZ_H7tYueRfdocg5ZXbJmyHxW4HVSJlW4AbdEkzlFmHD6UHw907WKgVkWicTQxGW2dXT-hZLNNrnbD__Ll-WHurE3op2knRcMxh2dA1eGKUq4p0a6BJNih2Of0IpAkqmiTZ2Kzp5I" />
                    </div>
                </div>
                <!-- Bot Response -->
                <div class="flex items-start gap-4 max-w-3xl">
                    <div
                        class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20">
                        <span class="material-symbols-outlined text-primary text-lg">smart_toy</span>
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <div
                            class="bot-bubble px-5 py-3.5 rounded-2xl rounded-tl-none text-white text-[15px] leading-relaxed">
                            ¡Claro! He procesado tus datos. He notado que tus gastos en <strong
                                class="text-primary font-bold">entretenimiento</strong> han subido un 15% respecto al
                            mes pasado. Sin embargo, has reducido tus gastos en transporte en un 8%.
                            <br /><br />
                            Tu saldo proyectado para fin de mes es de <span
                                class="bg-white/10 px-2 py-0.5 rounded text-primary">$1,240.50</span>.
                        </div>
                        <div class="flex gap-2 mt-2">
                            <div
                                class="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-2 cursor-pointer hover:bg-white/10">
                                <span class="material-symbols-outlined text-xs text-primary">download</span>
                                <span class="text-xs">Descargar PDF</span>
                            </div>
                        </div>
                        <span class="text-[10px] text-[#ad9db9] ml-1">10:44 AM</span>
                    </div>
                </div>
            </div>
            <!-- Footer Suggestions & Input -->
            <footer class="p-6 bg-[#1a1022]/80 backdrop-blur-md border-t border-white/5">
                <div class="max-w-4xl mx-auto flex flex-col gap-4">
                    <!-- Suggestion Chips -->
                    <div class="flex flex-wrap gap-2 mb-2">
                        <button
                            class="px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-xs font-semibold hover:bg-primary/20 transition-all text-white flex items-center gap-2">
                            <span class="material-symbols-outlined text-[14px]">analytics</span> Analiza mis gastos
                        </button>
                        <button
                            class="px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-xs font-semibold hover:bg-primary/20 transition-all text-white flex items-center gap-2">
                            <span class="material-symbols-outlined text-[14px]">trending_up</span> Proyectar ahorros
                        </button>
                        <button
                            class="px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-xs font-semibold hover:bg-primary/20 transition-all text-white flex items-center gap-2">
                            <span class="material-symbols-outlined text-[14px]">account_balance</span> Consultar
                            inversiones
                        </button>
                        <button
                            class="px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-xs font-semibold hover:bg-primary/20 transition-all text-white flex items-center gap-2">
                            <span class="material-symbols-outlined text-[14px]">receipt_long</span> Últimas facturas
                        </button>
                    </div>
                    <!-- Input Field -->
                    <div class="relative flex items-center">
                        <div class="absolute left-4 flex gap-2 text-[#ad9db9]">
                            <button class="hover:text-white transition-colors">
                                <span class="material-symbols-outlined">attach_file</span>
                            </button>
                            <button class="hover:text-white transition-colors">
                                <span class="material-symbols-outlined">sentiment_satisfied</span>
                            </button>
                        </div>
                        <input
                            class="w-full bg-[#2a1b35] border border-white/10 rounded-2xl py-4 pl-24 pr-16 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none placeholder:text-[#ad9db9]/50"
                            placeholder="Hazme una pregunta sobre tus finanzas..." type="text" />
                        <button
                            class="absolute right-2 w-10 h-10 bg-gradient-to-tr from-primary to-[#b149ff] rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:brightness-110 transition-all">
                            <span class="material-symbols-outlined">send</span>
                        </button>
                    </div>
                    <p class="text-[10px] text-[#ad9db9]/50 text-center">FinanzaBot puede cometer errores. Considera
                        verificar la información importante.</p>
                </div>
            </footer>

        `,
  },
};

function loadSection(section) {
  const data = sections[section];

  // Fade out animation
  content.style.opacity = "0";
  content.style.transform = "translateY(20px)";

  setTimeout(() => {
    sectionTitle.textContent = data.title;
    sectionSubtitle.textContent = data.subtitle;
    content.innerHTML = data.content();

    // Fade in animation
    content.style.transition =
      "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";

    requestAnimationFrame(() => {
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
    });

    // Active style with smooth transition
    menuItems.forEach((item) => {
      item.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      item.classList.remove("bg-purple-600");
      if (item.dataset.section === section) {
        item.classList.add("bg-purple-600");
        // Add scale animation
        item.style.transform = "scale(1.02)";
        setTimeout(() => {
          item.style.transform = "scale(1)";
        }, 200);
      }
    });

    // Close sidebar on mobile after click
    if (window.innerWidth < 768) {
      sidebarOpen = false;
      updateSidebar();
    }
  }, 300);
}

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    loadSection(item.dataset.section);
  });
});

// generar cards - generar contenido repetitivo
// function generateCards(n) {
//   let cards = "";
//   for (let i = 0; i < n; i++) {
//     cards += `
//           <div class="${isDarkTheme ? "bg-zinc-900 hover:bg-zinc-800" : "bg-white hover:bg-gray-50"} p-6 rounded-xl transition-all duration-500 ease-out shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 animate-fade-in" style="animation-delay: ${i * 0.1}s; opacity: 0;">
//             <h3 class="text-sm ${isDarkTheme ? "text-zinc-400" : "text-gray-500"} mb-2 transition-colors duration-300">Ingresos</h3>
//             <p class="text-2xl font-bold transition-transform duration-300 hover:scale-110">${"$"} ${Math.floor(Math.random() * 10000)}</p>
//           </div>
//         `;
//   }
//   return cards;
// }

// function generateGoalCards(n) {
//   let cards = "";
//   for (let i = 0; i < n; i++) {
//     const progress = Math.random() * 100;
//     cards += `
//           <div class="${isDarkTheme ? "bg-zinc-900" : "bg-white"} p-6 rounded-xl transition-all duration-500 ease-out shadow-lg hover:shadow-2xl hover:scale-102 animate-fade-in" style="animation-delay: ${i * 0.1}s; opacity: 0;">
//             <h3 class="font-semibold mb-2 transition-colors duration-300">Meta ${i + 1}</h3>
//             <div class="w-full ${isDarkTheme ? "bg-zinc-800" : "bg-gray-200"} h-3 rounded-full overflow-hidden transition-all duration-300">
//               <div class="bg-gradient-to-r from-purple-600 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out" style="width: 0%; animation: progressBar 1s ease-out ${i * 0.1 + 0.5}s forwards; --progress: ${progress}%"></div>
//             </div>
//             <p class="text-xs ${isDarkTheme ? "text-zinc-400" : "text-gray-500"} mt-2 transition-colors duration-300">${Math.floor(progress)}% completado</p>
//           </div>
//         `;
//   }
//   return cards;
// }

function generateTableRows(n) {
  let rows = "";
  for (let i = 0; i < n; i++) {
    rows += `
          <tr class="${isDarkTheme ? "border-b border-zinc-800" : "border-b border-gray-200"} transition-all duration-300 hover:bg-opacity-50 ${isDarkTheme ? "hover:bg-zinc-800" : "hover:bg-gray-100"} animate-fade-in" style="animation-delay: ${i * 0.1}s; opacity: 0;">
            <td class="py-3">16/02/2026</td>
            <td class="font-semibold">${"$"} ${Math.floor(Math.random() * 500)}</td>
            <td class="text-green-400 font-medium">✓ Completado</td>
          </tr>
        `;
  }
  return rows;
}

// Default load
loadSection("historial");
