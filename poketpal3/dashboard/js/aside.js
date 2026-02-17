// ===== SIDEBAR FUNCTIONALITY =====
// elements
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleSidebar");
const overlay = document.getElementById("overlay");
let sidebarOpen = false;

// function aside
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
