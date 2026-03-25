document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. DIAMOND DUST SYSTEM (Optimaliseerd) ---
    const canvas = document.getElementById('diamond-dust');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        function initCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            for(let i = 0; i < 60; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.5 + 0.5,
                    speedY: Math.random() * 0.4 - 0.8,
                    speedX: Math.random() * 0.4 - 0.2,
                    opacity: Math.random(),
                    blinkRate: Math.random() * 0.01 + 0.005
                });
            }
        }

        function drawParticles() {
            const rect = canvas.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = '#7dd3fc';
                particles.forEach(p => {
                    p.opacity += p.blinkRate;
                    if(p.opacity >= 1 || p.opacity <= 0) p.blinkRate *= -1;
                    p.y += p.speedY; p.x += p.speedX;
                    if(p.y < 0) p.y = height;
                    if(p.x > width) p.x = 0;
                    ctx.globalAlpha = Math.abs(p.opacity);
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                });
            }
            requestAnimationFrame(drawParticles);
        }
        initCanvas(); drawParticles();
        window.addEventListener('resize', initCanvas);
    }

    // --- 2. NAVBAR SCROLL & LED-LICHT LOGICA ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        // Navbar kleur veranderen
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // LED Licht schijnt op tekst
        const navHeight = navbar.offsetHeight;
        const textElements = document.querySelectorAll('h1, h2, h3, p, .btn-glow, .dienst-card');

        textElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const dist = rect.top - navHeight;

            // Als tekst binnen 250px van de balk komt
            if (dist < 250 && dist > -150) {
                el.classList.add('light-reactive');
                // Hoe dichterbij, hoe intenser (tussen 0 en 1)
                let intensity = 1 - (Math.max(0, Math.abs(dist)) / 250);
                let shadowPos = (1 - intensity) * 15; 

                el.style.setProperty('--shadow-dist', `${shadowPos}px`);
                el.style.setProperty('--shadow-opacity', intensity * 0.7);
                el.style.filter = `drop-shadow(0 0 ${intensity * 4}px rgba(0, 242, 255, 0.5))`;
            } else {
                el.style.setProperty('--shadow-opacity', '0');
                el.style.filter = 'none';
            }
        });
    });

    // --- 3. FADE-IN ANIMATIES ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.premium-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // --- 4. SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });
});
