document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    if (!form || !submitBtn) return;

    async function handleSubmit(event) {
        event.preventDefault();
        
        // Validate form
        if (!form.checkValidity()) {
            event.stopPropagation();
            // Trigger native validation UI + focus first invalid field
            if (typeof form.reportValidity === 'function') {
                form.reportValidity();
            }
            const firstInvalid = form.querySelector(':invalid');
            firstInvalid?.focus();
            return false;
        }

        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) {
            btnText.textContent = 'Sending...';
        }
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
        submitBtn.setAttribute('aria-busy', 'true');

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Send email using EmailJS or your preferred service
            const emailData = {
                service_id: 'YOUR_SERVICE_ID',
                template_id: 'YOUR_TEMPLATE_ID',
                user_id: 'YOUR_USER_ID',
                template_params: {
                    from_name: data.fullName,
                    from_email: data.email,
                    phone: data.phone,
                    message: data.message,
                    to_email: 'info@sanbytez.africa'
                }
            };

            // Simulate email sending (replace with actual EmailJS call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showModal('Success!', 'Your message has been sent. We\'ll get back to you soon!', 'success');
            form.reset();
        } catch (error) {
            console.error('Error sending message:', error);
            showModal('Error', 'Failed to send message. Please try again later.', 'error');
        } finally {
            // Reset button state
            if (btnText) {
                btnText.textContent = 'Send Message';
            }
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            submitBtn.removeAttribute('aria-busy');
        }

        return false;
    }

    function showModal(title, message, type) {
        // Remove existing modal if any
        const existingModal = document.getElementById('messageModal');
        if (existingModal) {
            existingModal.remove();
        }

        const isSuccess = type === 'success';
        const modalHtml = `
            <div id="messageModal" class="modal fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="messageModalTitle" aria-describedby="messageModalBody">
                <div class="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
                <div class="flex min-h-screen items-center justify-center p-4">
                    <div class="modal-content relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
                        <button type="button" class="modal-close absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close">
                            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div class="text-center">
                            <div class="w-16 h-16 mx-auto mb-4 rounded-full ${isSuccess ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center">
                                ${isSuccess 
                                    ? '<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
                                    : '<svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
                                }
                            </div>
                            <h3 id="messageModalTitle" class="text-2xl font-bold text-gray-900 mb-2">${title}</h3>
                            <p id="messageModalBody" class="text-gray-600">${message}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = document.getElementById('messageModal');
        if (!modal) return;

        // Wire up close handlers for dynamically created modal
        const doClose = () => closeMessageModal();
        modal.querySelector('.modal-overlay')?.addEventListener('click', doClose);
        modal.querySelector('.modal-close')?.addEventListener('click', doClose);

        // Open using shared modal helper if present
        if (typeof window.__sbOpenModal === 'function') {
            window.__sbOpenModal(modal);
        } else {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            modal.querySelector('.modal-content')?.setAttribute('tabindex', '-1');
            modal.querySelector('.modal-content')?.focus();
        }

        // Close on Escape (scoped)
        const onKeyDown = (e) => {
            if (e.key === 'Escape') closeMessageModal();
        };
        document.addEventListener('keydown', onKeyDown, { once: true });
    }

    function closeMessageModal() {
        const modal = document.getElementById('messageModal');
        if (modal) {
            if (typeof window.__sbCloseModal === 'function') {
                window.__sbCloseModal(modal);
            } else {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
            setTimeout(() => modal.remove(), 300);
        }
    }

    // Attach the submit handler
    window.handleSubmit = handleSubmit;
    window.closeMessageModal = closeMessageModal;
});
