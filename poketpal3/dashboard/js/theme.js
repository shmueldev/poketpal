const themeToggle = document.getElementById("themeToggle");
let isDarkTheme = true;

// ===== THEME FUNCTIONALITY =====
function applyTheme(dark, animate = true) {
  const body = document.body;
  const header = document.querySelector("header");
  const sidebarTheme = document.getElementById("sidebar");
  const toggleCircle = document.getElementById("themeToggleCircle");
  const themeIcon = document.getElementById("themeIcon");


  if (dark) {

    // Dark theme
    body.className = "bg-zinc-950 text-white overflow-hidden transition-all duration-700 ease-in-out";
    header.className = "h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 transition-all duration-700 ease-in-out";
    sidebarTheme.className = sidebarTheme.className
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
    body.className = "bg-gray-50 text-gray-900 overflow-hidden transition-all duration-700 ease-in-out";
    header.className = "h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 transition-all duration-700 ease-in-out shadow-sm";
    sidebarTheme.className = sidebarTheme.className
      .replace(/bg-zinc-900|bg-white/g, "bg-white")
      .replace(/border-zinc-800|border-gray-200/g, "border-gray-200");
    sectionSubtitle.className = "text-sm text-gray-500 transition-all duration-700 ease-in-out";

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
