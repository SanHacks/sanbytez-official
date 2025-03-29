document.addEventListener('DOMContentLoaded', function() {
    // Handle overlay and reveal animation
    setTimeout(() => {
        const overlay = document.querySelector('.solar-system-overlay');
        const solarSystem = document.querySelector('.solar-system');
        
        if (overlay && solarSystem) {
            overlay.classList.add('fade-out');
            solarSystem.classList.add('visible');
        }
    }, 1500);

    // Initialize orbits and planets
    const orbits = document.querySelectorAll('.orbit');
    orbits.forEach((orbit, index) => {
        const radius = (index + 1) * 100; // 100px increment for each orbit
        const planet = orbit.querySelector('.planet');
        if (planet) {
            // Set orbit radius as CSS variable
            planet.style.setProperty('--orbit-radius', `${radius}px`);
            // Add orbit animation with different speeds for each planet
            planet.style.animation = `orbit ${10 + index * 5}s linear infinite`;
        }
    });

    // Add hover effects and click handlers for planets
    const planets = document.querySelectorAll('.planet');
    planets.forEach(planet => {
        // Hover effect
        planet.addEventListener('mouseenter', function() {
            this.style.transform = `${this.style.transform} scale(1.2)`;
        });

        planet.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.2)', '');
        });

        // Click navigation
        planet.addEventListener('click', function() {
            const content = this.querySelector('.planet-content');
            if (content) {
                const icon = content.querySelector('i');
                if (icon) {
                    // Map icons to section IDs
                    const sectionMap = {
                        'lni-gift': '#offers',
                        'lni-layout': '#pricing',
                        'lni-move': '#testimonials',
                        'lni-layers': '#contact'
                    };
                    
                    // Find matching section and scroll
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
            }
        });
    });

    // Sun interaction
    const sun = document.querySelector('.sun');
    if (sun) {
        sun.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add pulse animation class
        sun.classList.add('pulse-animation');
    }
});
