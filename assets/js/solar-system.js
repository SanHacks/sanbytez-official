document.addEventListener('DOMContentLoaded', function() {
    // Initialize planet positions
    const planets = document.querySelectorAll('.planet');
    planets.forEach((planet, index) => {
        // Set initial random position on orbit
        const randomAngle = Math.random() * 360;
        planet.style.transform = `rotate(${randomAngle}deg) translateX(150px)`;
    });

    // Add hover effects
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            this.style.transform = `${this.style.transform} scale(1.1)`;
        });

        planet.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.1)', '');
        });

        // Add click effect for navigation
        const content = planet.querySelector('.planet-content');
        if (content) {
            content.addEventListener('click', function() {
                // Get the icon class which indicates the section
                const icon = this.querySelector('i');
                if (icon) {
                    // Map icons to section IDs
                    const sectionMap = {
                        'lni-shopify': '#offers',
                        'lni-consulting': '#pricing',
                        'lni-customer': '#testimonials',
                        'lni-support': '#contact'
                    };
                    
                    // Find the matching section based on icon class
                    for (const [iconClass, sectionId] of Object.entries(sectionMap)) {
                        if (icon.classList.contains(iconClass)) {
                            const section = document.querySelector(sectionId);
                            if (section) {
                                section.scrollIntoView({ behavior: 'smooth' });
                            }
                            break;
                        }
                    }
                }
            });
        }
    });

    // Add sun pulse animation
    const sun = document.querySelector('.sun');
    if (sun) {
        sun.addEventListener('click', function() {
            // Scroll to top when sun is clicked
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Optional: Add continuous rotation animation
    // Removed continuous rotation animation
    function rotatePlanets() {
        planets.forEach((planet, index) => {
            const orbit = planet.closest('.orbit');
            if (orbit) {
                const speed = parseFloat(getComputedStyle(orbit).animationDuration);
                const time = Date.now() / (speed * 1000);
                const angle = (time * 360) % 360;
                planet.style.transform = `rotate(${angle}deg) translateX(150px)`;
            }
        });
        requestAnimationFrame(rotatePlanets);
    }

    // Start the rotation animation
    rotatePlanets();
});
