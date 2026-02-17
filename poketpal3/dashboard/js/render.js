const content = document.getElementById("content");
// const menuItems = document.querySelectorAll(".menu-item");

const sectionTitle = document.getElementById("sectionTitle");
const sectionSubtitle = document.getElementById("sectionSubtitle");

// ===== SECTION CONFIG =====
const sections = {
  graficas: {
    title: "Análisis Detallado",
    subtitle: "Visualiza tus finanzas en tiempo real",
    content: () => `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <!-- Goal Card 1 -->
                <div class="glass-panel p-8 rounded-xl flex flex-col items-center text-center">
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
                <div class="glass-panel p-8 rounded-xl flex flex-col items-center text-center">
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
                <div class="glass-panel p-8 rounded-xl flex flex-col items-center text-center">
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
            <section class="glass-panel p-10 rounded-xl relative overflow-hidden">
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
                <div class="glass-panel p-6 rounded-xl flex items-center gap-6">
                    <div class="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                        <span class="material-symbols-outlined">trending_up</span>
                    </div>
                    <div>
                        <p class="text-white/50 text-sm">Ahorro mensual promedio</p>
                        <p class="text-2xl font-bold">$2,400.00</p>
                    </div>
                </div>
                <div class="glass-panel p-6 rounded-xl flex items-center gap-6">
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
  metas: {
    title: "Tus Metas",
    subtitle: "Gestiona tus objetivos financieros",
    content: () => `
          <div class="space-y-4">
            ${generateGoalCards(4)}
          </div>
        `,
  },
  historial: {
    title: "Historial de Movimientos",
    subtitle: "Consulta tus transacciones recientes",
    content: () => `
          <div class="${isDarkTheme ? "bg-zinc-900" : "bg-white"} rounded-xl p-6 transition-colors duration-300 shadow-lg">
            <table class="w-full text-left">
              <thead class="${isDarkTheme ? "text-zinc-400 border-b border-zinc-700" : "text-gray-500 border-b border-gray-200"}">
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
        `,
  },
};

function loadSection(sectionKey) {
  const section = sections[sectionKey];
  if (section) {
    // Actualizamos el texto del encabezado
    sectionTitle.textContent = section.title;
    sectionSubtitle.textContent = section.subtitle;
    
    // Ejecutamos la función de contenido e inyectamos el HTML
    content.innerHTML = section.content(); 
  }
}

// loadSection("graficas");
