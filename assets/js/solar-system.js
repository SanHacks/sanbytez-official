document.addEventListener('DOMContentLoaded', function() {
    const solarSystem = document.querySelector('.solar-system');
    const planets = document.querySelectorAll('.planet');
    const sun = document.querySelector('.sun');
    const orbits = document.querySelectorAll('.orbit');

    function initSolarSystem() {
        // Fade in solar system
        setTimeout(() => {
            solarSystem.classList.add('visible');
        }, 500);

        // Initialize planet positions
        orbits.forEach((orbit, index) => {
            const planet = orbit.querySelector('.planet');
            if (planet) {
                // Set initial random position on orbit
                const randomAngle = Math.random() * 360;
                planet.style.transform = `rotate(${randomAngle}deg) translateX(${orbit.offsetWidth / 2}px) rotate(-${randomAngle}deg)`;
            }
        });

        // Add hover effects for planets
        planets.forEach(planet => {
            const ring = planet.querySelector('.planet-ring');

            planet.addEventListener('mouseenter', function() {
                this.style.transform = `${this.style.transform} scale(1.2)`;
                if (ring) ring.style.transform = 'translate(-50%, -50%) rotateX(75deg) scale(1.2)';
                this.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.3)';
            });

            planet.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' scale(1.2)', '');
                if (ring) ring.style.transform = 'translate(-50%, -50%) rotateX(75deg)';
                this.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.2)';
            });

            // Click navigation with smooth scroll
            planet.addEventListener('click', function() {
                const content = this.querySelector('.planet-content');
                if (content) {
                    const section = content.querySelector('span').textContent.toLowerCase();
                    const targetSection = document.getElementById(section);
                    if (targetSection) {
                        targetSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Enhanced sun interactions
        if (sun) {
            const sunGlow = sun.querySelector('.sun-glow');
            let glowAnimation;

            sun.addEventListener('mouseenter', () => {
                if (sunGlow) {
                    clearTimeout(glowAnimation);
                    sunGlow.style.transform = 'translate(-50%, -50%) scale(1.2)';
                    sunGlow.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)';
                }
            });

            sun.addEventListener('mouseleave', () => {
                if (sunGlow) {
                    sunGlow.style.transform = 'translate(-50%, -50%) scale(1)';
                    sunGlow.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)';
                    
                    // Smooth transition back to original state
                    glowAnimation = setTimeout(() => {
                        sunGlow.style.transform = 'translate(-50%, -50%)';
                    }, 300);
                }
            });

            // Smooth scroll to top with easing
            sun.addEventListener('click', () => {
                const scrollToTop = () => {
                    const currentPosition = window.pageYOffset;
                    if (currentPosition > 0) {
                        window.requestAnimationFrame(scrollToTop);
                        window.scrollTo(0, currentPosition - currentPosition / 8);
                    }
                };
                scrollToTop();
            });
        }
    }

    // Initialize when everything is loaded
    window.addEventListener('load', initSolarSystem);
});

