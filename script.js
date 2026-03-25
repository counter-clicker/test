// Wacht tot de pagina geladen is
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll voor navigatielinks
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

    // Navbar scroll effect - Smooth fade
    const navbar = document.querySelector('.navbar');
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrollPercent = Math.min(window.scrollY / 500, 1);
                if (window.scrollY > 20) {
                    navbar.style.background = `linear-gradient(135deg, rgba(26, 26, 26, ${0.95 + scrollPercent * 0.03}), rgba(10, 10, 10, ${0.98 + scrollPercent * 0.01}))`;
                    navbar.style.boxShadow = `0 5px ${15 + scrollPercent * 15}px rgba(56, 189, 248, ${0.05 + scrollPercent * 0.1})`;
                } else {
                    navbar.style.background = 'linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(15, 15, 15, 0.98))';
                    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // SECTIE FADE EFFECT - Luxe overgangen
    const sections = document.querySelectorAll('section');
    
    // Observer voor fade effect bij scrollen
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Voeg fade class toe wanneer sectie in beeld komt
                entry.target.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Zet initiële stijlen voor fade
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        fadeObserver.observe(section);
        
        // Stagger effect - elke sectie komt iets later
        setTimeout(() => {
            if (section.getBoundingClientRect().top < window.innerHeight) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        }, index * 100);
    });

    // Contactformulier afhandeling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const naam = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const bericht = this.querySelector('textarea').value;
            
            if (naam && email && bericht) {
                alert('💎✨ Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op. ✨💎');
                this.reset();
            } else {
                alert('💎 Vul alstublieft alle verplichte velden in. 💎');
            }
        });
    }

    // Active nav link bij scrollen
    const navLinks = document.querySelectorAll('.nav-menu a');
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(function() {
            let current = '';
            const scrollPosition = window.scrollY + 150;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            scrollTimeout = null;
        }, 50);
    });

    // Diamant glitter effect op scroll
    const body = document.body;
    window.addEventListener('scroll', function() {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const intensity = scrollPercent * 0.1;
        body.style.background = `linear-gradient(135deg, 
            rgba(245, 247, 250, ${1 - intensity}), 
            rgba(233, 236, 239, ${1 - intensity * 0.5}))`;
    });
});
