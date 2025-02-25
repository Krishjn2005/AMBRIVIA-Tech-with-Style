// Carousel Animation
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.carousel-item');
    
    // Clone items for infinite scroll
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });

    // Smooth scroll handling
    const smoothScroll = (target, duration) => {
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    // Add intersection observer for animation triggers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe product cards for animation
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });
});

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

// Initialize any necessary elements when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount(0);
});
