// Three.js Background Setup
let scene, camera, renderer;
const objects = [];

function initThreeBackground() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x8b4513,
        metalness: 0.7,
        roughness: 0.2
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
    objects.push(torus);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x8b4513
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    objects.push(particlesMesh);
}

function animate() {
    requestAnimationFrame(animate);
    objects.forEach(obj => {
        if(obj) {
            obj.rotation.x += 0.01;
            obj.rotation.y += 0.005;
        }
    });
    renderer.render(scene, camera);
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

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
}

// Password Functions
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.classList.remove('fa-eye');
        toggleButton.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleButton.classList.remove('fa-eye-slash');
        toggleButton.classList.add('fa-eye');
    }
}

function checkPasswordStrength(password) {
    let strength = 0;
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[!@#$%^&*()]+/)) strength++;

    const strengthLevels = [
        { width: '0%', color: '#ff4d4d', text: '' },
        { width: '20%', color: '#ff4d4d', text: 'Very Weak' },
        { width: '40%', color: '#ffa64d', text: 'Weak' },
        { width: '60%', color: '#ffff4d', text: 'Medium' },
        { width: '80%', color: '#4dff4d', text: 'Strong' },
        { width: '100%', color: '#23ff23', text: 'Very Strong' }
    ];

    const level = strengthLevels[strength];
    strengthBar.style.width = level.width;
    strengthBar.style.backgroundColor = level.color;
    strengthText.textContent = level.text;
}

// Login Form Handling
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const button = form.querySelector('.login-btn');
    const username = form.querySelector('#username').value;
    const password = form.querySelector('#password').value;
    
    if (!validateForm(username, password)) {
        return;
    }
    
    button.classList.add('loading');
    
    setTimeout(() => {
        button.classList.remove('loading');
        showMainContent();
    }, 1500);
}

function validateForm(username, password) {
    let isValid = true;
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    
    usernameError.textContent = '';
    passwordError.textContent = '';
    
    if (username.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
        isValid = false;
    }
    
    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    
    return isValid;
}

// UI State Management
function showMainContent() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

function showLogin() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('mainContent').style.display = 'none';
}

// Carousel Animation
function initCarousel() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return;

    const items = document.querySelectorAll('.carousel-item');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });
}

// Window Resize Handler
function onWindowResize() {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Newsletter form submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // In a real application, you would send this to your backend
    console.log('Newsletter subscription for:', email);
    
    // Show success message
    alert('Thank you for subscribing to our newsletter!');
    event.target.reset();
}

// Cart functionality
let cartCount = 0;
const cartCountElement = document.getElementById('cartCount');

function updateCartCount(count) {
    cartCount = count;
    cartCountElement.textContent = count;
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initThreeBackground();
    initThemeToggle();
    initCarousel();
    
    // Event Listeners
    window.addEventListener('resize', onWindowResize);
    
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => checkPasswordStrength(e.target.value));
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Initialize cart count
    updateCartCount(0);

    // Start animation
    animate();
});
