document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formGroups = document.querySelectorAll('.ud-form-group');
    
    // Add entrance animations
    formGroups.forEach((group, index) => {
        group.classList.add('animate__fadeInUp');
        group.style.animationDelay = `${0.1 * index}s`;
    });

    async function handleSubmit(event) {
        event.preventDefault();
        
        // Validate form
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            animateError();
            return false;
        }

        // Show loading state
        const btnText = submitBtn.querySelector('.btn-text');
        const spinner = submitBtn.querySelector('.spinner-border');
        btnText.textContent = 'Sending...';
        spinner.classList.remove('d-none');
        submitBtn.disabled = true;

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
            btnText.textContent = 'Send Message';
            spinner.classList.add('d-none');
            submitBtn.disabled = false;
        }

        return false;
    }

    function showModal(title, message, type) {
        const modalHtml = `
            <div class="modal fade" id="messageModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center">
                                <i class="lni lni-${type === 'success' ? 'checkmark-circle' : 'cross-circle'} 
                                   text-${type === 'success' ? 'success' : 'danger'} 
                                   display-1 mb-4"></i>
                                <p>${message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('messageModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add new modal
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = new bootstrap.Modal(document.getElementById('messageModal'));
        modal.show();
    }

    function animateError() {
        const invalidInputs = form.querySelectorAll(':invalid');
        invalidInputs.forEach(input => {
            input.closest('.ud-form-group').classList.add('animate__shakeX');
            setTimeout(() => {
                input.closest('.ud-form-group').classList.remove('animate__shakeX');
            }, 1000);
        });
    }

    // Attach the submit handler
    window.handleSubmit = handleSubmit;
});
