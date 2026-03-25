document.addEventListener('DOMContentLoaded', function() {
    
    // --- DIAMOND DUST PARTICLE SYSTEM (LUXE EFFECT) ---
    const canvas = document.getElementById('diamond-dust');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        function initCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            
            // Creëer 80 diamant stofdeeltjes
            for(let i = 0; i < 80; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 2 + 0.5,
                    speedY: Math.random() * 0.5 - 1, // Zweeft langzaam omhoog
                    speedX: Math.random() * 0.5 - 0.25,
                    opacity: Math.random(),
                    blinkRate: Math.random() * 0.02 + 0.005
                });
            }
        }

        function drawParticles() {
    // Check of het canvas in beeld is
    const rect = canvas.getBoundingClientRect();
    const isVisible = (rect.top < window.innerHeight && rect.bottom > 0);

    if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#7dd3fc';
        
        particles.forEach(p => {
            p.opacity += p.blinkRate;
            if(p.opacity >= 1 || p.opacity <= 0) p.blinkRate *= -1;
            
            p.y += p.speedY;
            p.x += p.speedX;
            
            if(p.y < 0) p.y = height;
            if(p.x < 0) p.x = width;
            if(p.x > width) p.x = 0;

            ctx.globalAlpha = Math.abs(p.opacity) * 0.8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    // Gebruik requestAnimationFrame altijd, maar teken alleen als isVisible true is
    requestAnimationFrame(drawParticles);
}

        initCanvas();
        drawParticles();
        window.addEventListener('resize', initCanvas);
    }

    // --- NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- LUXURY FADE-IN OBSERVER ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Initialiseer elementen voor fade
    const fadeElements = document.querySelectorAll('.premium-card, .section-title, .over-image');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(el);
    });

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('💎 Aanvraag succesvol ontvangen! Een van onze master barbers neemt spoedig contact met u op.');
            this.reset();
        });
    }
});
