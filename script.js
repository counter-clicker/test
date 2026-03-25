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

    // Navbar scroll effect - FADE (geen harde overgang)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        let opacity = Math.min(scrollPosition / 200, 0.98);
        let blurAmount = Math.min(5 + scrollPosition / 100, 15);
        
        if (scrollPosition > 10) {
            navbar.style.background = `rgba(26, 26, 26, ${0.9 + opacity * 0.08})`;
            navbar.style.backdropFilter = `blur(${blurAmount}px)`;
            navbar.style.boxShadow = '0 5px 25px rgba(56, 189, 248, 0.15)';
        } else {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        }
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
                alert('✨ Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op. ✨');
                this.reset();
            } else {
                alert('💎 Vul alstublieft alle verplichte velden in. 💎');
            }
        });
    }

    // Active nav link bij scrollen
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer voor fade-in animaties
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
