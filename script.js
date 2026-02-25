// ============= MOBILE NAVIGATION =============

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============= SMOOTH SCROLL =============

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============= NAVBAR BACKGROUND ON SCROLL =============

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// ============= HERO TEXT FADE ON SCROLL =============

window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        const scrollPosition = window.pageYOffset;
        
        // Fade out completely after scrolling 300px
        const opacity = 1 - (scrollPosition / 300);
        
        // Move text up as it fades (parallax effect)
        const moveDistance = scrollPosition * 0.5;
        
        // Apply effects
        heroContent.style.opacity = Math.max(0, opacity);
        heroContent.style.transform = `translateY(-${moveDistance}px)`;
        
        // Hide completely when opacity reaches 0
        if (opacity <= 0) {
            heroContent.style.visibility = 'hidden';
        } else {
            heroContent.style.visibility = 'visible';
        }
    }
});

// ============= GALLERY ANIMATIONS =============


// ============= FORM SUBMISSION =============

const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = '#28a745';
                contactForm.reset();
            } else {
                formStatus.textContent = 'Oops! Something went wrong.';
                formStatus.style.color = '#dc3545';
            }
        } catch (error) {
            formStatus.textContent = 'Network error. Please try again.';
            formStatus.style.color = '#dc3545';
        }
        
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    });
}

