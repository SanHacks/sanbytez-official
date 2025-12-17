document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    
    if (!hasConsented) {
        // Show cookie consent popup
        const cookiePopup = document.getElementById('cookieConsentPopup');
        if (cookiePopup) {
            cookiePopup.classList.add('show');
        }
    }

    // Handle accept button click
    document.getElementById('acceptCookies')?.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'true');
        document.getElementById('cookieConsentPopup')?.classList.remove('show');
        
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
        document.getElementById('cookieConsentPopup')?.classList.remove('show');
        
        // Set minimal cookie preferences
        const preferences = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    });
});
