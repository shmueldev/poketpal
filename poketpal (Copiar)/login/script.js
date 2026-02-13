document.addEventListener('DOMContentLoaded', function() {
    const toggleBtns = document.querySelectorAll('.hero__toggle-btn');
    const toggle = document.querySelector('.hero__toggle');
    const wrapper = document.querySelector('.hero__wrapper');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.getAttribute('data-mode');
            
            toggleBtns.forEach(b => b.classList.remove('hero__toggle-btn--active'));
            this.classList.add('hero__toggle-btn--active');
            
            if (mode === 'register') {
                toggle.classList.add('is-register');
                wrapper.classList.add('is-register');
                loginForm.classList.remove('hero__form-wrapper--active');
                registerForm.classList.add('hero__form-wrapper--active');
            } else {
                toggle.classList.remove('is-register');
                wrapper.classList.remove('is-register');
                registerForm.classList.remove('hero__form-wrapper--active');
                loginForm.classList.add('hero__form-wrapper--active');
            }
        });
    });

    const forms = document.querySelectorAll('.hero__form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulario enviado');
        });
    });

    const togglePasswordBtns = document.querySelectorAll('.hero__toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        });
    });
});