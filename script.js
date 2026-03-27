document.addEventListener('DOMContentLoaded', function() {
    
    // --- DIAMOND DUST PARTICLE SYSTEM ---
    const canvas = document.getElementById('diamond-dust');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        function initCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            for(let i = 0; i < 80; i++) { // Verhoogd naar 80 voor meer effect
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 2.5 + 0.5,
                    speedY: Math.random() * 0.4 - 0.8,
                    speedX: Math.random() * 0.4 - 0.2,
                    opacity: Math.random(),
                    blinkRate: Math.random() * 0.02 + 0.005
                });
            }
        }

        function drawParticles() {
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
            requestAnimationFrame(drawParticles);
        }
        initCanvas();
        drawParticles();
        window.addEventListener('resize', initCanvas);
    }

    // --- DYNAMISCH LED LICHT EFFECT OP ELEMENTEN ---
    const ledLight = document.querySelector('.navbar::after');
    const allElements = document.querySelectorAll('h1, h2, h3, p, .btn-glow, .premium-card, img');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const ledTop = 70 + scrollY;
        const ledBottom = 270 + scrollY;

        allElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elTop = rect.top + scrollY;
            const elCenter = elTop + rect.height / 2;

            // Controleer of element onder het LED licht is
            if (elCenter < ledBottom && elCenter > ledTop) {
                // Bereken intensiteit - sterker wanneer dichter bij navbar
                let distance = Math.abs(ledTop + 100 - elCenter);
                let intensity = Math.max(0, 1 - (distance / 150));
                
                // REALISTISCH LICHT EFFECT
                const glowColor = `rgba(0, 242, 255, ${intensity * 0.6})`;
                const shadowColor = `rgba(0, 100, 255, ${intensity * 0.4})`;
                
                if (el.tagName.match(/H[1-3]|P/) || el.classList.contains('btn-glow')) {
                    // TEKST GLOW - 3D effect
                    el.style.textShadow = `
                        0 0 10px ${glowColor},
                        0 0 20px ${glowColor},
                        0 5px 15px ${shadowColor},
                        0 -5px 15px ${glowColor}
                    `;
                    el.style.color = `hsl(200, 100%, ${80 + intensity * 10}%)`;
                }
                
                if (el.classList.contains('premium-card')) {
                    // CARD GLOW - realistisch 3D
                    el.style.boxShadow = `
                        0 8px 32px rgba(0, 0, 0, 0.7),
                        0 0 ${40 + intensity * 60}px rgba(0, 242, 255, ${0.3 + intensity * 0.4}),
                        0 0 ${20 + intensity * 40}px rgba(0, 150, 255, ${0.2 + intensity * 0.3}),
                        inset 0 1px 0 rgba(255, 255, 255, ${0.1 + intensity * 0.15})
                    `;
                    el.style.borderColor = `rgba(125, 211, 252, ${0.3 + intensity * 0.4})`;
                }
                
                if (el.tagName === 'IMG') {
                    // AFBEELDING GLOW - realistisch
                    el.style.filter = `
                        brightness(${1 + intensity * 0.3})
                        drop-shadow(0 0 ${15 + intensity * 30}px rgba(0, 242, 255, ${intensity * 0.5}))
                        drop-shadow(0 5px 20px rgba(0, 0, 0, 0.6))
                    `;
                }
            } else {
                // Reset wanneer niet onder licht
                if (el.tagName.match(/H[1-3]|P/) || el.classList.contains('btn-glow')) {
                    el.style.textShadow = '';
                    el.style.color = '';
                }
                if (el.classList.contains('premium-card')) {
                    el.style.boxShadow = '';
                    el.style.borderColor = '';
                }
                if (el.tagName === 'IMG') {
                    el.style.filter = '';
                }
            }
        });
    }, { passive: true });

    // --- GEOPTIMALISEERD SCROLL EFFECT (HOGE FPS) ---
    let tick = false;
    const navbar = document.querySelector('.navbar');
    const textElements = document.querySelectorAll('h1, h2, h3, p, .btn-glow');
    const cards = document.querySelectorAll('.premium-card');

    window.addEventListener('scroll', () => {
        if (!tick) {
            window.requestAnimationFrame(() => {
                // Navbar achtergrond
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // VERBETERDE Tekst glow effect
                const navbarHeight = navbar.offsetHeight;
                textElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const distanceFromNav = rect.top - navbarHeight;

                    if (distanceFromNav < 150 && distanceFromNav > -50) {
                        let intensity = 1 - (Math.abs(distanceFromNav) / 150);
                        el.style.filter = `drop-shadow(0 0 ${intensity * 8}px rgba(0, 242, 255, 0.8)) drop-shadow(0 0 ${intensity * 12}px rgba(0, 150, 255, 0.4))`;
                    } else {
                        el.style.filter = 'none';
                    }
                });

                // NIEUWE: Card glow effect bij scroll nabijheid
                cards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const distanceFromNav = rect.top - navbarHeight;

                    if (distanceFromNav < 250 && distanceFromNav > -100) {
                        let intensity = 1 - (Math.abs(distanceFromNav - 75) / 200);
                        if (intensity > 0) {
                            card.style.boxShadow = `
                                0 8px 32px rgba(0, 0, 0, 0.7),
                                0 0 ${40 + intensity * 40}px rgba(125, 211, 252, ${0.08 + intensity * 0.3}),
                                inset 0 1px 0 rgba(255, 255, 255, 0.1)
                            `;
                        }
                    }
                });

                tick = false;
            });
            tick = true;
        }
    }, { passive: true });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- FADE-IN OBSERVER ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.premium-card, .section-title, .over-image').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
