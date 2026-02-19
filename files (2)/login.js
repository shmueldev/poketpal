let currentMode = "login";

function switchMode(mode) {
  if (currentMode === mode) return;
  currentMode = mode;

  const pill = document.getElementById("toggle-pill");
  const labelLogin = document.getElementById("label-login");
  const labelRegister = document.getElementById("label-register");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const title = document.getElementById("form-title");
  const subtitle = document.getElementById("form-subtitle");

  if (mode === "register") {
    pill.classList.add("register");
    labelLogin.classList.remove("active");
    labelLogin.classList.add("inactive");
    labelRegister.classList.remove("inactive");
    labelRegister.classList.add("active");
    loginForm.classList.remove("visible-panel");
    loginForm.classList.add("hidden-panel");
    registerForm.classList.remove("hidden-panel");
    registerForm.classList.add("visible-panel");
    title.textContent = "Crea tu cuenta";
    subtitle.textContent = "Regístrate para comenzar tu camino financiero.";
  } else {
    pill.classList.remove("register");
    labelRegister.classList.remove("active");
    labelRegister.classList.add("inactive");
    labelLogin.classList.remove("inactive");
    labelLogin.classList.add("active");
    registerForm.classList.remove("visible-panel");
    registerForm.classList.add("hidden-panel");
    loginForm.classList.remove("hidden-panel");
    loginForm.classList.add("visible-panel");
    title.textContent = "Bienvenido de nuevo";
    subtitle.textContent = "Inicia sesión para acceder a tu panel educativo.";
  }
}

function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn.querySelector(".material-symbols-outlined");
  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "visibility_off";
  } else {
    input.type = "password";
    icon.textContent = "visibility";
  }
}
