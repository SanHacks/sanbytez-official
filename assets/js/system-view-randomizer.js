document.addEventListener('DOMContentLoaded', function() {
    // Available services for randomization
    const services = [
        'sun',      // Core Services
        'mercury',  // Web Development
        'venus',    // Mobile Apps
        'earth',    // AI Solutions
        'mars',     // Cloud Services
        'jupiter',  // Cybersecurity
        'saturn',   // Consulting
        'uranus',   // DevOps
        'neptune'   // Support
    ];
    
    // Randomly select a service
    const randomService = services[Math.floor(Math.random() * services.length)];
    
    // Update the selected service
    const solarSystem = document.getElementById('solar-system');
    if (solarSystem) {
        solarSystem.className = randomService;
    }
    
    // Update the active link in the data section
    document.querySelectorAll('#data a').forEach(link => {
        link.classList.remove('active');
        if (link.classList.contains(randomService)) {
            link.classList.add('active');
        }
    });

    // Available options for randomization
    const viewOptions = ['2D', '3D'];
    const zoomOptions = ['zoom-large', 'zoom-close'];
    const scaleOptions = ['scale-stretched', 'scale-d', 'scale-s'];
    
    // Randomly select options
    const randomView = viewOptions[Math.floor(Math.random() * viewOptions.length)];
    const randomZoom = zoomOptions[Math.floor(Math.random() * zoomOptions.length)];
    const randomScale = scaleOptions[Math.floor(Math.random() * scaleOptions.length)];
    
    // Get the body element
    const body = document.body;
    
    // Remove default classes
    body.classList.remove('view-2D', 'view-3D', 'zoom-large', 'zoom-close');
    
    // Add random classes
    body.classList.add(`view-${randomView}`);
    body.classList.add(randomZoom);
    
    // Update the universe div
    const universe = document.getElementById('universe');
    if (universe) {
        universe.className = randomScale;
    }
    
    // Update the corresponding controls
    const viewInput = document.querySelector('.set-view input');
    const zoomInput = document.querySelector('.set-zoom input');
    const scaleInputs = document.querySelectorAll('[name="scale"]');
    
    if (viewInput) {
        viewInput.checked = randomView === '3D';
    }
    
    if (zoomInput) {
        zoomInput.checked = randomZoom === 'zoom-close';
    }
    
    if (scaleInputs) {
        scaleInputs.forEach(input => {
            if (
                (input.classList.contains('set-speed') && randomScale === 'scale-stretched') ||
                (input.classList.contains('set-size') && randomScale === 'scale-s') ||
                (input.classList.contains('set-distance') && randomScale === 'scale-d')
            ) {
                input.checked = true;
            }
        });
    }
});
