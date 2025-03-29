const contactForm = document.querySelector('.ud-contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      fullName: this.fullName.value,
      email: this.email.value,
      phone: this.phone.value,
      message: this.message.value
    };

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Using EmailJS service to send emails
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY')
      .then(function(response) {
        alert('Message sent successfully!');
        contactForm.reset();
      }, function(error) {
        alert('Failed to send message. Please try again.');
        console.error('EmailJS error:', error);
      });
  });
} 