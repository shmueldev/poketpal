    // const content = document.getElementById("content");
    // const menuItems = document.querySelectorAll(".menu-item");

    // const sectionTitle = document.getElementById("sectionTitle");
    // const sectionSubtitle = document.getElementById("sectionSubtitle");

    // ===== SECTION CONFIG =====
    const sections = {
      graficas: {
        title: "Análisis Detallado",
        subtitle: "Visualiza tus finanzas en tiempo real",
        content: () => `
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            ${generateCards(6)}
          </div>
        `
      },
      metas: {
        title: "Tus Metas",
        subtitle: "Gestiona tus objetivos financieros",
        content: () => `
          <div class="space-y-4">
            ${generateGoalCards(4)}
          </div>
        `
      },
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
        `
      },
      bot: {
        title: "Asistente Financiero",
        subtitle: "Obtén recomendaciones inteligentes",
        content: () => `
          <div class="${isDarkTheme ? 'bg-zinc-900' : 'bg-white'} rounded-xl p-6 transition-colors duration-300 shadow-lg animate-fade-in">
            <p class="mb-4 ${isDarkTheme ? 'text-zinc-400' : 'text-gray-600'} animate-slide-in" style="animation-delay: 0.1s; opacity: 0;">
              Hola Alex 👋 ¿En qué puedo ayudarte hoy?
            </p>
            <input 
              type="text"
              placeholder="Escribe tu pregunta..."
              class="w-full ${isDarkTheme ? 'bg-zinc-800 text-white placeholder-zinc-500' : 'bg-gray-100 text-gray-900 placeholder-gray-400'} rounded-lg p-3 outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 hover:scale-102 focus:scale-102 animate-fade-in"
              style="animation-delay: 0.2s; opacity: 0;"
            />
          </div>
        `
      }
    };

   