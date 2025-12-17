document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    const cookiePopup = document.getElementById('cookieConsentPopup');
    
    if (!hasConsented) {
        // Show cookie consent popup
        if (cookiePopup) {
            cookiePopup.classList.add('show');
            cookiePopup.setAttribute('aria-hidden', 'false');
            cookiePopup.removeAttribute('inert');
            cookiePopup.querySelector('button, [href], input, select, textarea')?.focus();
        }
    } else if (cookiePopup) {
        cookiePopup.setAttribute('aria-hidden', 'true');
        cookiePopup.setAttribute('inert', '');
    }

    // Handle accept button click
    document.getElementById('acceptCookies')?.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'true');
        cookiePopup?.classList.remove('show');
        cookiePopup?.setAttribute('aria-hidden', 'true');
        cookiePopup?.setAttribute('inert', '');
        
        // Set cookie preferences
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: document.getElementById('marketingCookies')?.checked || false
        };
        
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    });

    // Handle reject button click
    document.getElementById('rejectCookies')?.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'false');
        cookiePopup?.classList.remove('show');
        cookiePopup?.setAttribute('aria-hidden', 'true');
        cookiePopup?.setAttribute('inert', '');
        
        // Set minimal cookie preferences
        const preferences = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    });
});
