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
            for(let i = 0; i < 100; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 3 + 0.5,
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

    // --- DYNAMISCH LED SPOTLIGHT EFFECT OP ELEMENTEN ---
    const allElements = document.querySelectorAll('h1, h2, h3, p, .btn-glow, .premium-card, img');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const navbarHeight = 70;
        const spotlightTop = navbarHeight + scrollY;
        const spotlightBottom = spotlightTop + 800;
        const spotlightCenterX = window.innerWidth / 2;

        // Update navbar styling on scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        allElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elTop = rect.top + scrollY;
            const elCenter = elTop + rect.height / 2;
            const elCenterX = rect.left + rect.width / 2;

            if (elCenter < spotlightBottom && elCenter > spotlightTop) {
                let verticalDistance = Math.abs(spotlightTop + 150 - elCenter);
                let verticalIntensity = Math.max(0, 1 - (verticalDistance / 250));
                
                let horizontalDistance = Math.abs(spotlightCenterX - elCenterX);
                let horizontalIntensity = Math.max(0, 1 - (horizontalDistance / 500));
                
                let totalIntensity = verticalIntensity * horizontalIntensity;
                
                if (totalIntensity > 0.05) {
                    const glowColor = `rgba(0, 242, 255, ${totalIntensity * 0.8})`;
                    const shadowColor = `rgba(0, 100, 255, ${totalIntensity * 0.6})`;
                    
                    if (el.tagName.match(/H[1-3]|P/) || el.classList.contains('btn-glow')) {
                        el.style.textShadow = `
                            0 0 20px ${glowColor},
                            0 0 40px ${glowColor},
                            0 10px 25px ${shadowColor},
                            0 -10px 25px ${glowColor}
                        `;
                        el.style.color = `hsl(200, 100%, ${80 + totalIntensity * 18}%)`;
                    }
                    
                    if (el.classList.contains('premium-card')) {
                        el.style.boxShadow = `
                            0 8px 32px rgba(0, 0, 0, 0.7),
                            0 0 ${60 + totalIntensity * 80}px rgba(0, 242, 255, ${0.3 + totalIntensity * 0.6}),
                            0 0 ${40 + totalIntensity * 60}px rgba(0, 150, 255, ${0.2 + totalIntensity * 0.5}),
                            inset 0 1px 0 rgba(255, 255, 255, ${0.1 + totalIntensity * 0.25})
                        `;
                        el.style.borderColor = `rgba(125, 211, 252, ${0.3 + totalIntensity * 0.6})`;
                    }
                    
                    if (el.tagName === 'IMG') {
                        el.style.filter = `
                            brightness(${1 + totalIntensity * 0.5})
                            drop-shadow(0 0 ${25 + totalIntensity * 50}px rgba(0, 242, 255, ${totalIntensity * 0.7}))
                            drop-shadow(0 10px 30px rgba(0, 0, 0, 0.9))
                        `;
                    }
                } else {
                    resetElement(el);
                }
            } else {
                resetElement(el);
            }
        });
    }, { passive: true });

    function resetElement(el) {
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
