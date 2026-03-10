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

    // Contactformulier afhandeling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simpele form validatie
            const naam = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const bericht = this.querySelector('textarea').value;
            
            if (naam && email && bericht) {
                // Hier zou normaal de data naar een server gestuurd worden
                alert('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.');
                this.reset(); // Maak formulier leeg
            } else {
                alert('Vul alstublieft alle verplichte velden in.');
            }
        });
    }

    // Active nav link bij scrollen (voor later als we meerdere secties hebben)
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

    // Klein effect: navbar wordt donkerder bij scrollen
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#111';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.backgroundColor = '#1a1a1a';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        }
    });

});
