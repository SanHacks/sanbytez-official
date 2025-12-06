// Main JavaScript for Tailwind-based website
// Handles navigation, modals, services rendering, and interactive features

document.addEventListener('DOMContentLoaded', function() {
  // Load services data and render
  if (typeof servicesData !== 'undefined') {
    renderServices();
  } else {
    // Load services data if not already loaded
    const script = document.createElement('script');
    script.src = 'assets/js/services-data.js';
    script.onload = renderServices;
    document.head.appendChild(script);
  }

  // Mobile menu toggle
  initMobileMenu();
  
  // Smooth scroll navigation
  initSmoothScroll();
  
  // Sticky header
  initStickyHeader();
  
  // Active navigation highlighting
  initActiveNavigation();
  
  // Modals
  initModals();
  
  // FAQ Accordion
  initFAQ();
  
  // Back to top button
  initBackToTop();
  
  // Scroll animations
  initScrollAnimations();
  
  // Counter animations
  initCounters();
  
  // Parallax effects
  initParallax();
  
  // Interactive buttons
  initButtonEffects();
  
  // Form interactions
  initFormInteractions();
  
  // Image lazy loading
  initLazyLoading();
  
  // Typing animation
  initTypingAnimation();
});

// Render services from data
function renderServices() {
  const container = document.getElementById('services-container');
  if (!container || typeof servicesData === 'undefined') return;

  container.innerHTML = servicesData.map(service => `
    <div class="service-card group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
      <div class="w-16 h-16 mb-6 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
        <i class="${service.icon} text-white text-2xl group-hover:scale-110 transition-transform duration-300"></i>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors duration-300">${service.title}</h3>
      <p class="text-gray-600 leading-relaxed mb-4">${service.description}</p>
      <button onclick="openServiceModal('${service.id}')" class="text-blue-900 font-semibold hover:text-blue-800 flex items-center gap-2 group-hover:gap-3 transition-all duration-300 group-hover:font-bold">
        Learn More
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  `).join('');
}

// Mobile menu
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    // Animate hamburger icon
    const icon = btn.querySelector('svg');
    if (icon) {
      icon.classList.toggle('rotate-90');
    }
  });

  // Close menu when clicking a link
  const links = menu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// Smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Sticky header
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('shadow-lg');
      header.classList.remove('border-b');
    } else {
      header.classList.remove('shadow-lg');
      header.classList.add('border-b');
    }
    
    lastScroll = currentScroll;
  });
}

// Active navigation
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-blue-900', 'font-bold');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('text-blue-900', 'font-bold');
        // Add underline
        const underline = link.querySelector('span');
        if (underline) {
          underline.classList.add('w-full');
        }
      }
    });
  });
}

// Modals
function initModals() {
  // Close modals on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal(this.closest('.modal'));
      }
    });
  });

  // Close modals on X button
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', function() {
      closeModal(this.closest('.modal'));
    });
  });
}

function openServiceModal(serviceId) {
  if (typeof servicesData === 'undefined') return;
  const service = servicesData.find(s => s.id === serviceId);
  if (!service) return;

  const modal = document.getElementById('serviceModal');
  if (!modal) return;

  const title = modal.querySelector('.modal-title');
  const body = modal.querySelector('.modal-body');
  
  if (title) title.textContent = service.title;
  if (body) {
    body.innerHTML = `
      <p class="text-gray-600 mb-4">${service.description}</p>
      <h4 class="font-semibold text-gray-900 mb-3">Key Features:</h4>
      <ul class="space-y-2">
        ${service.features.map(feature => `
          <li class="flex items-center text-gray-700">
            <svg class="w-5 h-5 text-blue-900 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            ${feature}
          </li>
        `).join('')}
      </ul>
    `;
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// FAQ Accordion
function initFAQ() {
  document.querySelectorAll('.faq-button').forEach(button => {
    button.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('i');
      const isOpen = !content.classList.contains('hidden');

      // Close all other FAQs
      document.querySelectorAll('.faq-content').forEach(item => {
        if (item !== content) {
          item.classList.add('hidden');
          const otherButton = item.previousElementSibling;
          otherButton?.classList.remove('active');
          const otherIcon = otherButton?.querySelector('i');
          if (otherIcon) {
            otherIcon.classList.remove('rotate-180');
          }
        }
      });

      // Toggle current FAQ
      if (isOpen) {
        content.classList.add('hidden');
        this.classList.remove('active');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        content.classList.remove('hidden');
        this.classList.add('active');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

// Back to top
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Enhanced scroll animations with stagger effect
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for cards
        const delay = entry.target.classList.contains('service-card') || 
                     entry.target.classList.contains('pricing-card') || 
                     entry.target.classList.contains('testimonial-card') 
                     ? index * 100 : 0;
        
        setTimeout(() => {
          entry.target.classList.add('animate-fade-in');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }, delay);
      }
    });
  }, observerOptions);

  // Observe all sections and cards with initial state
  document.querySelectorAll('section').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
  });

  // Observe cards with stagger
  document.querySelectorAll('.service-card, .pricing-card, .testimonial-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(el);
  });
}

// Counter animations for statistics
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current) + (counter.getAttribute('data-suffix') || '');
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + (counter.getAttribute('data-suffix') || '');
      }
    };
    
    updateCounter();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

// Parallax scrolling effects
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Interactive button effects (ripple, hover)
function initButtonEffects() {
  // Add ripple effect to buttons
  document.querySelectorAll('button, a[class*="btn"], .cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Add magnetic effect to CTA buttons
  document.querySelectorAll('a[href="#contact"], .cta-button').forEach(button => {
    button.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });
}

// Form input interactions
function initFormInteractions() {
  const inputs = document.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    // Floating label effect
    input.addEventListener('focus', function() {
      this.parentElement?.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement?.classList.remove('focused');
      }
    });
    
    // Check if input has value on load
    if (input.value) {
      input.parentElement?.classList.add('focused');
    }
    
    // Real-time validation feedback
    input.addEventListener('input', function() {
      if (this.checkValidity()) {
        this.classList.remove('border-red-500');
        this.classList.add('border-green-500');
      } else {
        this.classList.remove('border-green-500');
        this.classList.add('border-red-500');
      }
    });
  });
}

// Lazy loading images with fade-in
function initLazyLoading() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('animate-fade-in');
          img.classList.remove('opacity-0');
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  }, { rootMargin: '50px' });

  document.querySelectorAll('img[data-src]').forEach(img => {
    img.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    imageObserver.observe(img);
  });
}

// Typing animation for hero text
function initTypingAnimation() {
  const typingElement = document.querySelector('[data-typing]');
  if (!typingElement) return;
  
  const text = typingElement.textContent;
  const words = text.split(' ');
  typingElement.textContent = '';
  typingElement.classList.add('typing-cursor');
  
  let wordIndex = 0;
  let charIndex = 0;
  
  const type = () => {
    if (wordIndex < words.length) {
      const word = words[wordIndex];
      if (charIndex < word.length) {
        typingElement.textContent += word[charIndex];
        charIndex++;
        setTimeout(type, 100);
      } else {
        typingElement.textContent += ' ';
        wordIndex++;
        charIndex = 0;
        setTimeout(type, wordIndex === words.length ? 0 : 200);
      }
    } else {
      typingElement.classList.remove('typing-cursor');
    }
  };
  
  // Start typing after a delay
  setTimeout(type, 500);
}
