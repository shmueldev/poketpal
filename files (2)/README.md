# FinanzaBot Dashboard

Interfaz web de gestión financiera personal con cambio de tema oscuro/claro, sidebar adaptativo y navegación por secciones sin recarga de página.

---

## Tabla de contenidos

1. [Descripción general](#descripción-general)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Arquitectura de módulos JS](#arquitectura-de-módulos-js)
4. [Sistema de temas](#sistema-de-temas)
5. [Sidebar adaptativo](#sidebar-adaptativo)
6. [Secciones de contenido](#secciones-de-contenido)
7. [Dependencias externas](#dependencias-externas)
8. [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
9. [Cómo añadir una nueva sección](#cómo-añadir-una-nueva-sección)

---

## Descripción general

FinanzaBot es un dashboard financiero de una sola página (SPA) construido con HTML semántico, CSS variables y JavaScript modular nativo (`ES Modules`). No requiere bundler ni framework — se puede servir directamente desde cualquier servidor estático.

**Características principales:**

- Tema oscuro / claro con transición instantánea y sincronizada
- Sidebar colapsable en escritorio e icono+etiqueta en móvil
- Navegación entre secciones con animación de entrada
- Preferencia de tema persistida en `localStorage`
- Código dividido en módulos con responsabilidad única

---

## Estructura del proyecto

```
finanzabot/
│
├── index.html                  # Documento HTML raíz
│
├── css/
│   └── estilos.css             # Variables de tema y clases semánticas globales
│
└── js/
    ├── main.js                 # Punto de entrada — inicializa todos los módulos
    ├── estado.js               # Estado global compartido (isDarkTheme)
    ├── sidebar.js              # Lógica de colapso/expansión del sidebar
    ├── tema.js                 # Cambio de tema oscuro ↔ claro
    ├── router.js               # Navegación y renderizado de secciones
    │
    └── secciones/
        ├── index.js            # Barrel — re-exporta todas las secciones
        ├── historial.js        # Sección: Historial de Movimientos
        ├── metas.js            # Sección: Tus Metas
        ├── graficas.js         # Sección: Análisis Detallado
        └── bot.js              # Sección: Asistente Financiero
```

---

## Arquitectura de módulos JS

El JavaScript está completamente modularizado usando `ES Modules` nativos del navegador. El archivo `index.html` solo carga un único script:

```html
<script type="module" src="js/main.js"></script>
```

El grafo de dependencias es el siguiente:

```
main.js
 ├── sidebar.js
 ├── tema.js
 │    ├── estado.js
 │    └── router.js  ← (import circular controlado)
 └── router.js
      └── secciones/index.js
           ├── historial.js  └── estado.js
           ├── metas.js
           ├── graficas.js
           └── bot.js        └── estado.js
```

### `main.js`

Punto de entrada único. Importa e inicializa cada módulo en el orden correcto: primero el sidebar (sin dependencias), luego el tema, finalmente el router (que carga la sección inicial).

### `estado.js`

Fuente única de verdad para el estado global. Actualmente expone `isDarkTheme` y su setter `setIsDarkTheme()`. Cualquier módulo que necesite saber el tema actual importa desde aquí, evitando variables globales sueltas.

### `sidebar.js`

Maneja el toggle del sidebar en escritorio (colapsar ↔ expandir). En móvil el botón está oculto por CSS y el sidebar siempre muestra icono + etiqueta debajo — no hay lógica JS para este caso.

### `tema.js`

Gestiona el cambio de tema. La estrategia clave es modificar una única clase (`.light`) en `<html>` para que todas las CSS variables cambien simultáneamente, logrando una transición perfectamente sincronizada. También persiste la preferencia en `localStorage`.

### `router.js`

Controla la navegación entre secciones. Al cambiar de sección aplica una animación de salida, inyecta el HTML de la nueva sección en `#content`, actualiza el título y el ítem activo del menú, y aplica la animación de entrada.

### `secciones/index.js`

Barrel file que re-exporta todas las secciones bajo el objeto `secciones`. El router solo importa este archivo — añadir una nueva sección no requiere tocar el router.

---

## Sistema de temas

El cambio de tema **no manipula clases en elementos individuales**. En cambio, usa CSS variables definidas en `:root`:

```css
/* Tema oscuro (por defecto) */
:root {
  --bg-card:     #18181b;
  --text-primary:#ffffff;
  --border:      #3f3f46;
  /* ... */
}

/* Tema claro */
:root.light {
  --bg-card:     #ffffff;
  --text-primary:#18181b;
  --border:      #e4e4e7;
  /* ... */
}
```

Los elementos usan clases semánticas que consumen estas variables:

| Clase        | Uso                                      |
|--------------|------------------------------------------|
| `.t-card`    | Tarjetas y contenedores principales      |
| `.t-card-alt`| Fondos secundarios (cabeceras de tabla…) |
| `.t-input`   | Campos de texto e inputs                 |
| `.t-text`    | Texto principal                          |
| `.t-muted`   | Texto secundario                         |
| `.t-subtle`  | Texto terciario / placeholders           |
| `.t-divide`  | Bordes divisores                         |

Al alternar `.light` en `<html>`, **todos** los elementos cambian al mismo tiempo → sin desfase visual.

---

## Sidebar adaptativo

El sidebar tiene dos comportamientos según el viewport:

**Desktop (≥ 768px)**
- Arranca colapsado (`w-16`): solo iconos centrados
- El botón `menu` alterna entre colapsado y expandido (`w-16` ↔ `16rem`)
- Las etiquetas aparecen con transición suave al expandir

**Móvil (< 768px)**
- Siempre visible y fijo en `4.5rem`
- El botón toggle se oculta via CSS (`display: none`)
- Los ítems muestran el icono arriba y la etiqueta debajo (9px)
- No desplaza ni superpone el contenido principal

---

## Secciones de contenido

Cada sección es un módulo independiente que exporta un objeto con tres propiedades:

```js
export const miSeccion = {
  titulo:    'Título de la sección',
  subtitulo: 'Descripción breve',
  contenido: () => `<!-- HTML como string -->`,
};
```

La función `contenido()` se ejecuta en cada renderizado, lo que permite que el HTML refleje siempre el tema actual (`isDarkTheme`) sin necesidad de re-suscripciones.

| Módulo         | Sección                  | Contenido principal                                              |
|----------------|--------------------------|------------------------------------------------------------------|
| `historial.js` | Historial de Movimientos | Filtros, tabla de transacciones, paginación, tarjetas de resumen |
| `metas.js`     | Tus Metas                | Progresos circulares SVG, barra global, estadísticas             |
| `graficas.js`  | Análisis Detallado       | KPIs, gráfico de línea, barras, donut, tabla de activos          |
| `bot.js`       | Asistente Financiero     | Chat con burbujas, sugerencias rápidas, input con acciones       |

---

## Dependencias externas

Todas las dependencias se cargan desde CDN, sin instalación local:

| Dependencia               | Versión  | Uso                                  |
|---------------------------|----------|--------------------------------------|
| Tailwind CSS              | CDN      | Clases de utilidad para layout       |
| Google Fonts — Sora       | Variable | Tipografía principal (pesos 300–800) |
| Material Symbols Outlined | Variable | Iconografía de la interfaz           |

---

## Cómo ejecutar el proyecto

Los ES Modules requieren que los archivos se sirvan desde un servidor HTTP (no funcionan con `file://`). Cualquiera de estas opciones sirve:

```bash
# Con la extensión Live Server de VS Code
# Clic derecho en index.html → "Open with Live Server"

# Con Node.js (npx)
npx serve .

# Con Python
python3 -m http.server 8080

# Con PHP
php -S localhost:8080
```

Luego abrir `http://localhost:8080` en el navegador.

---

## Cómo añadir una nueva sección

1. **Crear el módulo** en `js/secciones/miSeccion.js`:

```js
// js/secciones/miSeccion.js
export const miSeccion = {
  titulo:    'Mi Nueva Sección',
  subtitulo: 'Descripción breve',
  contenido: () => `
    <div class="t-card p-5 rounded-xl">
      <p class="text-sm t-text">Contenido aquí…</p>
    </div>
  `,
};
```

2. **Registrarla** en `js/secciones/index.js`:

```js
import { miSeccion } from './miSeccion.js';

export const secciones = {
  historial,
  metas,
  graficas,
  bot,
  miSeccion, // ← añadir aquí
};
```

3. **Añadir el botón** de navegación en `index.html`:

```html
<button class="menu-item menu-item-desk …" data-section="miSeccion">
  <span class="material-symbols-outlined …">star</span>
  <span class="nav-label …">Mi Sección</span>
</button>
```

El router detecta automáticamente el nuevo `data-section` y conecta la navegación.
