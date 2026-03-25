// Wacht tot de pagina geladen is
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll voor navigatielinks (passief voor betere performance)
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

    // Navbar scroll effect - OPTIMIZED (geen repaints)
    const navbar = document.querySelector('.navbar');
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                if (window.scrollY > 10) {
                    navbar.style.background = 'rgba(26, 26, 26, 0.98)';
                    navbar.style.boxShadow = '0 5px 20px rgba(56, 189, 248, 0.1)';
                } else {
                    navbar.style.background = 'rgba(26, 26, 26, 0.95)';
                    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
                }
                ticking = false;
            });
            ticking = true;
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

    // Active nav link bij scrollen - OPTIMIZED
    const sections = document.querySelectorAll('section');
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
});
