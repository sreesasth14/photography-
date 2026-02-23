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

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
            entry.target.style.filter = 'blur(0) brightness(1)';
        }
    });
}, observerOptions);

// Aperture Gallery Animation
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'perspective(1000px) scale(0.5) rotate(20deg)';
    item.style.filter = 'blur(10px) brightness(0)';
    item.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
    item.style.transformStyle = 'preserve-3d';
    
    setTimeout(() => {
        observer.observe(item);
    }, index * 150);
});

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

// ============= GALLERY LIGHTBOX =============

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const enlargedImg = document.createElement('img');
        enlargedImg.src = img.src;
        enlargedImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            animation: zoomIn 0.3s ease;
        `;
        
        overlay.appendChild(enlargedImg);
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        });
    });
});

// Add CSS animations for lightbox
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes zoomIn {
        from { transform: scale(0.8); }
        to { transform: scale(1); }
    }
`;
document.head.appendChild(style);
