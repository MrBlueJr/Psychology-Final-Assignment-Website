document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing once animation has triggered
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe all elements with the 'hidden' class
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Staggered card animations for the grid
    const cardGrids = document.querySelectorAll('.grid');
    cardGrids.forEach(grid => {
        const cards = grid.querySelectorAll('.notepad-card');
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 150}ms`;
        });
    });

    const theoryCards = document.querySelectorAll('.theory-card');
    theoryCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 150}ms`;
    });

    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        // Add hidden class if not present and observe
        if(!stat.classList.contains('hidden')) {
            stat.classList.add('hidden');
            observer.observe(stat);
        }
        stat.style.transitionDelay = `${index * 200}ms`;
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background blur effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
