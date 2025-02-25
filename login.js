// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    icon.classList.toggle('fa-sun', savedTheme === 'dark-theme');
    icon.classList.toggle('fa-moon', savedTheme === 'light-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark-theme' : 'light-theme');
    icon.classList.toggle('fa-sun', isDark);
    icon.classList.toggle('fa-moon', !isDark);
});

// Password Toggle
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.querySelector('i').classList.toggle('fa-eye');
    togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
});

// Password Strength
function checkPasswordStrength(password) {
    let strength = 0;
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[!@#$%^&*()]+/)) strength++;

    switch (strength) {
        case 0:
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '#ff4d4d';
            strengthText.textContent = '';
            break;
        case 1:
            strengthBar.style.width = '20%';
            strengthBar.style.backgroundColor = '#ff4d4d';
            strengthText.textContent = 'Very Weak';
            break;
        case 2:
            strengthBar.style.width = '40%';
            strengthBar.style.backgroundColor = '#ffa64d';
            strengthText.textContent = 'Weak';
            break;
        case 3:
            strengthBar.style.width = '60%';
            strengthBar.style.backgroundColor = '#ffff4d';
            strengthText.textContent = 'Medium';
            break;
        case 4:
            strengthBar.style.width = '80%';
            strengthBar.style.backgroundColor = '#4dff4d';
            strengthText.textContent = 'Strong';
            break;
        case 5:
            strengthBar.style.width = '100%';
            strengthBar.style.backgroundColor = '#23ff23';
            strengthText.textContent = 'Very Strong';
            break;
    }
}

passwordInput.addEventListener('input', (e) => {
    checkPasswordStrength(e.target.value);
});

// Form Validation
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

function validateForm() {
    let isValid = true;

    if (usernameInput.value.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters long';
        isValid = false;
    } else {
        usernameError.textContent = '';
    }

    if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    return isValid;
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    if (!validateForm()) return;

    const loginBtn = loginForm.querySelector('.login-btn');
    loginBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // In a real application, you would make an API call here
        console.log('Login attempt:', { username, password, rememberMe });

        if (rememberMe) {
            localStorage.setItem('rememberedUser', username);
        } else {
            localStorage.removeItem('rememberedUser');
        }

        // Simulate successful login
        loginBtn.classList.remove('loading');
        window.location.href = 'home.html';
    }, 1500);
}

// Check for remembered user
const rememberedUser = localStorage.getItem('rememberedUser');
if (rememberedUser) {
    usernameInput.value = rememberedUser;
    document.getElementById('rememberMe').checked = true;
}
