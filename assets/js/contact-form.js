document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    async function handleSubmit(event) {
        event.preventDefault();
        
        // Validate form
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return false;
        }

        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) {
            btnText.textContent = 'Sending...';
        }
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

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
            form.classList.remove('was-validated');
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
            <div id="messageModal" class="modal fixed inset-0 z-50 overflow-y-auto">
                <div class="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
                <div class="flex min-h-screen items-center justify-center p-4">
                    <div class="modal-content relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all">
                        <button class="modal-close absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" onclick="closeMessageModal()">
                            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div class="text-center">
                            <div class="w-16 h-16 mx-auto mb-4 rounded-full ${isSuccess ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center">
                                <i class="lni lni-${isSuccess ? 'checkmark-circle' : 'cross-circle'} text-${isSuccess ? 'green' : 'red'}-600 text-3xl"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-2">${title}</h3>
                            <p class="text-gray-600">${message}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = document.getElementById('messageModal');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Close on overlay click
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            closeMessageModal();
        });
    }

    function closeMessageModal() {
        const modal = document.getElementById('messageModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            setTimeout(() => modal.remove(), 300);
        }
    }

    // Attach the submit handler
    window.handleSubmit = handleSubmit;
    window.closeMessageModal = closeMessageModal;
});
