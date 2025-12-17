// Main JavaScript for Tailwind-based website
// Handles navigation, modals, services rendering, and interactive features

document.addEventListener('DOMContentLoaded', function() {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  if (!prefersReducedMotion) initSmoothScroll();
  
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
  if (!prefersReducedMotion) {
    initScrollAnimations();
  } else {
    // Ensure content is visible when motion is reduced
    document.querySelectorAll('[data-animate], section').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.transition = 'none';
    });
  }
  
  // Counter animations
  if (!prefersReducedMotion) initCounters();
  
  // Parallax effects
  if (!prefersReducedMotion) initParallax();
  
  // Interactive buttons
  if (!prefersReducedMotion) initButtonEffects();
  
  // Form interactions
  initFormInteractions();
  
  // Image lazy loading
  initLazyLoading();
  
  // Typing animation
  if (!prefersReducedMotion) initTypingAnimation();
  
  // Scroll progress bar
  initScrollProgress();
  
  // Custom cursor
  if (!prefersReducedMotion) initCustomCursor();
  
  // Particle system
  if (!prefersReducedMotion) initParticleSystem();
  
  // 3D Tilt effects
  if (!prefersReducedMotion) init3DTilt();
  
  // Magnetic hover
  if (!prefersReducedMotion) initMagneticHover();
  
  // Enhanced hero animations
  if (!prefersReducedMotion) initHeroAnimations();
});

// Render services from data
function renderServices() {
  const container = document.getElementById('services-container');
  if (!container || typeof servicesData === 'undefined') return;

  container.innerHTML = servicesData.map(service => `
    <div class="service-card tilt-3d magnetic-hover group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer" data-animate="scale-in">
      <div class="w-16 h-16 mb-6 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <i class="${service.icon} text-white text-2xl group-hover:scale-110 transition-transform duration-300 relative z-10"></i>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors duration-300">${service.title}</h3>
      <p class="text-gray-600 leading-relaxed mb-4">${service.description}</p>
      <button onclick="openServiceModal('${service.id}')" class="text-blue-900 font-semibold hover:text-blue-800 flex items-center gap-2 group-hover:gap-3 transition-all duration-300 group-hover:font-bold magnetic-hover">
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

  const closeMenu = () => {
    if (menu.classList.contains('hidden')) return;
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
  };

  const openMenu = () => {
    if (!menu.classList.contains('hidden')) return;
    menu.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close menu');
  };

  btn.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) openMenu();
    else closeMenu();
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
      closeMenu();
    });
  });

  // Close menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (menu.classList.contains('hidden')) return;
    if (menu.contains(target) || btn.contains(target)) return;
    closeMenu();
  });
}

// Enhanced smooth scroll with easing
function initSmoothScroll() {
  // Easing function for smooth scroll
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        const startPosition = window.pageYOffset;
        const distance = offsetPosition - startPosition;
        const duration = 1000; // 1 second
        let start = null;

        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percentage = Math.min(progress / duration, 1);
          const eased = easeInOutCubic(percentage);
          
          window.scrollTo(0, startPosition + distance * eased);
          
          if (progress < duration) {
            requestAnimationFrame(step);
          } else {
            // Update URL + move focus for a11y
            try {
              history.pushState(null, '', href);
            } catch (_) {
              // ignore
            }
            if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
          }
        }
        
        requestAnimationFrame(step);
      }
    });
  });
}

// Enhanced sticky header with smooth transitions
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;
  
  function updateHeader() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('shadow-xl', 'bg-white');
      header.classList.remove('border-b', 'bg-white/95');
      header.style.backdropFilter = 'none';
    } else {
      header.classList.remove('shadow-xl');
      header.classList.add('border-b', 'bg-white/95');
      header.style.backdropFilter = 'blur(12px)';
    }
    
    // Hide/show header on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

// Active navigation with debouncing
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  let ticking = false;
  
  const updateActiveNav = () => {
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
      link.removeAttribute('aria-current');
      const underline = link.querySelector('span');
      if (underline) underline.classList.remove('w-full');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('text-blue-900', 'font-bold');
        link.setAttribute('aria-current', 'page');
        // Add underline
        if (underline) {
          underline.classList.add('w-full');
        }
      }
    });
    
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateActiveNav);
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', requestTick, { passive: true });
}

// Modals
function initModals() {
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  const state = {
    lastFocused: null,
  };

  const getOpenModal = () => document.querySelector('.modal:not(.hidden)');

  const trapFocus = (modal, e) => {
    if (e.key !== 'Tab') return;
    const focusables = Array.from(modal.querySelectorAll(focusableSelector))
      .filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const openModal = (modal) => {
    if (!modal) return;
    state.lastFocused = document.activeElement;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    const content = modal.querySelector('.modal-content') || modal;
    if (!content.hasAttribute('tabindex')) content.setAttribute('tabindex', '-1');
    content.focus();
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    const toFocus = state.lastFocused;
    state.lastFocused = null;
    if (toFocus && typeof toFocus.focus === 'function') {
      setTimeout(() => toFocus.focus(), 0);
    }
  };

  // Expose for other scripts (e.g., contact form)
  window.__sbOpenModal = openModal;
  window.__sbCloseModal = closeModal;

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

  // Open modal buttons (privacy/terms)
  document.querySelectorAll('[data-open-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-open-modal');
      if (!id) return;
      openModal(document.getElementById(id));
    });
  });

  // Escape closes the currently open modal
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = getOpenModal();
    if (open) closeModal(open);
  });

  // Focus trapping for open modal
  document.addEventListener('keydown', (e) => {
    const open = getOpenModal();
    if (!open) return;
    trapFocus(open, e);
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

  if (typeof window.__sbOpenModal === 'function') window.__sbOpenModal(modal);
  else {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modal) {
  if (!modal) return;
  if (typeof window.__sbCloseModal === 'function') window.__sbCloseModal(modal);
  else {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// FAQ Accordion
function initFAQ() {
  document.querySelectorAll('.faq-button').forEach((button, index) => {
    const content = button.nextElementSibling;
    const btnId = button.id || `faq-btn-${index + 1}`;
    const panelId = content?.id || `faq-panel-${index + 1}`;
    button.id = btnId;
    if (content) {
      content.id = panelId;
      content.setAttribute('role', 'region');
      content.setAttribute('aria-labelledby', btnId);
    }
    button.setAttribute('aria-controls', panelId);
    button.setAttribute('aria-expanded', 'false');

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
          otherButton?.setAttribute('aria-expanded', 'false');
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
        this.setAttribute('aria-expanded', 'false');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        content.classList.remove('hidden');
        this.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

// Back to top with debouncing
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  let ticking = false;
  
  const updateBackToTop = () => {
    if (window.pageYOffset > 300) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100');
    }
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateBackToTop);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick, { passive: true });

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
        const element = entry.target;
        const animationType = element.getAttribute('data-animate') || 'fade-up';
        const delay = parseInt(element.getAttribute('data-delay')) || 0;
        
        // Stagger animation for cards
        const cardDelay = element.classList.contains('service-card') || 
                         element.classList.contains('pricing-card') || 
                         element.classList.contains('testimonial-card') 
                         ? index * 100 : delay;
        
        setTimeout(() => {
          applyAnimation(element, animationType);
          observer.unobserve(element);
        }, cardDelay);
      }
    });
  }, observerOptions);

  // Observe all sections with initial state
  document.querySelectorAll('section').forEach((el) => {
    if (!el.hasAttribute('data-animate')) {
      el.setAttribute('data-animate', 'fade-up');
    }
    setInitialState(el, el.getAttribute('data-animate'));
    observer.observe(el);
  });

  // Observe elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach((el) => {
    setInitialState(el, el.getAttribute('data-animate'));
    observer.observe(el);
  });

  // Observe cards with stagger
  document.querySelectorAll('.service-card, .pricing-card, .testimonial-card').forEach((el, index) => {
    if (!el.hasAttribute('data-animate')) {
      el.setAttribute('data-animate', 'scale-in');
    }
    setInitialState(el, el.getAttribute('data-animate'));
    el.style.transition = `opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`;
    observer.observe(el);
  });
}

// Set initial state based on animation type
function setInitialState(element, animationType) {
  element.style.willChange = 'opacity, transform';
  
  switch(animationType) {
    case 'slide-up':
      element.style.opacity = '0';
      element.style.transform = 'translateY(50px)';
      break;
    case 'slide-left':
      element.style.opacity = '0';
      element.style.transform = 'translateX(-50px)';
      break;
    case 'slide-right':
      element.style.opacity = '0';
      element.style.transform = 'translateX(50px)';
      break;
    case 'scale-in':
      element.style.opacity = '0';
      element.style.transform = 'scale(0.8)';
      break;
    case 'rotate-in':
      element.style.opacity = '0';
      element.style.transform = 'rotate(-10deg) scale(0.9)';
      break;
    case 'fade-up':
    default:
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
  }
  
  if (!element.style.transition) {
    element.style.transition = 'opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
  }
}

// Apply animation
function applyAnimation(element, animationType) {
  element.style.opacity = '1';
  element.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0deg)';
  element.classList.add('animated');
  
  // Remove will-change after animation
  setTimeout(() => {
    element.style.willChange = 'auto';
  }, 800);
}

// Counter animations for statistics
function initCounters() {
  const counters = document.querySelectorAll('[data-count], .counter-stat');
  
  const animateCounter = (counter) => {
    const target = parseFloat(counter.getAttribute('data-count')) || parseFloat(counter.textContent.replace(/[^0-9.]/g, ''));
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (target - startValue) * easeOut;
      
      if (progress < 1) {
        if (target % 1 === 0) {
          counter.textContent = Math.floor(current) + suffix;
        } else {
          counter.textContent = current.toFixed(1) + suffix;
        }
        requestAnimationFrame(updateCounter);
      } else {
        if (target % 1 === 0) {
          counter.textContent = Math.floor(target) + suffix;
        } else {
          counter.textContent = target.toFixed(1) + suffix;
        }
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => {
    if (counter.classList.contains('counter-stat') && !counter.hasAttribute('data-count')) {
      const text = counter.textContent.replace(/[^0-9.]/g, '');
      counter.setAttribute('data-count', text);
      counter.textContent = '0' + (counter.getAttribute('data-suffix') || '');
    }
    counterObserver.observe(counter);
  });
}

// Enhanced parallax scrolling effects
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  let ticking = false;
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    parallaxElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementCenter = elementTop + rect.height / 2;
      const windowCenter = scrolled + windowHeight / 2;
      
      const distance = elementCenter - windowCenter;
      const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
      const yPos = distance * speed;
      
      element.style.transform = `translateY(${yPos}px)`;
      element.style.willChange = 'transform';
    });
    
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', requestTick, { passive: true });
  updateParallax(); // Initial call
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

  const setError = (input, message) => {
    const descId = input.getAttribute('aria-describedby');
    const errorEl = descId ? document.getElementById(descId) : null;
    input.setAttribute('aria-invalid', 'true');
    input.classList.remove('border-green-500');
    input.classList.add('border-red-500');
    if (errorEl) {
      errorEl.textContent = message || 'Please check this field.';
      errorEl.classList.remove('hidden');
    }
  };

  const clearError = (input) => {
    const descId = input.getAttribute('aria-describedby');
    const errorEl = descId ? document.getElementById(descId) : null;
    input.removeAttribute('aria-invalid');
    input.classList.remove('border-red-500');
    input.classList.add('border-green-500');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
    }
  };

  const neutral = (input) => {
    const descId = input.getAttribute('aria-describedby');
    const errorEl = descId ? document.getElementById(descId) : null;
    input.removeAttribute('aria-invalid');
    input.classList.remove('border-red-500', 'border-green-500');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
    }
  };

  const validate = (input) => {
    // Don't aggressively mark required-but-empty as invalid while typing
    const value = (input.value || '').trim();
    const touched = input.dataset.touched === 'true';
    if (!touched && value.length === 0) {
      neutral(input);
      return;
    }
    if (input.checkValidity()) clearError(input);
    else setError(input, input.validationMessage);
  };

  inputs.forEach(input => {
    // Floating label effect
    input.addEventListener('focus', function() {
      this.parentElement?.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.dataset.touched = 'true';
      if (!this.value) {
        this.parentElement?.classList.remove('focused');
      }
      validate(this);
    });
    
    // Check if input has value on load
    if (input.value) {
      input.parentElement?.classList.add('focused');
      input.dataset.touched = 'true';
    }
    
    // Real-time validation feedback
    input.addEventListener('input', function() {
      validate(this);
    });

    // Intercept native invalid bubbles and show inline errors
    input.addEventListener('invalid', function(e) {
      e.preventDefault();
      this.dataset.touched = 'true';
      validate(this);
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

// Scroll progress bar
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;
  
  const updateProgress = () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / windowHeight) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  };
  
  let ticking = false;
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', requestTick, { passive: true });
  updateProgress();
}

// Custom cursor with trail
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;
  
  // Hide default cursor on desktop
  if (window.matchMedia('(pointer: fine)').matches) {
    // Don't hide the OS cursor for users navigating with keyboard or assistive tech
    document.body.style.cursor = '';
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const trails = [];
    const trailCount = 5;

    // Hide until first mouse move (prevents top-left artifact)
    cursor.style.opacity = '0';
    
    // Create trail elements
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.opacity = (1 - i / trailCount) * 0.5;
      trail.style.opacity = '0';
      document.body.appendChild(trail);
      trails.push({ element: trail, x: 0, y: 0 });
    }
    
    // Update cursor position
    const updateCursor = () => {
      // Smooth cursor movement
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      // Update trails
      let prevX = cursorX;
      let prevY = cursorY;
      
      trails.forEach((trail, index) => {
        trail.x += (prevX - trail.x) * 0.2;
        trail.y += (prevY - trail.y) * 0.2;
        
        trail.element.style.left = trail.x + 'px';
        trail.element.style.top = trail.y + 'px';
        
        prevX = trail.x;
        prevY = trail.y;
      });
      
      requestAnimationFrame(updateCursor);
    };
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
      trails.forEach((t, i) => {
        t.element.style.opacity = (1 - i / trailCount) * 0.5;
      });
    }, { passive: true });
    
    // Cursor hover states
    const interactiveElements = document.querySelectorAll('a, button, .cta-button, .service-card, .pricing-card, input, textarea, select');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#3b82f6';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#1e40af';
      });
    });
    
    updateCursor();
  } else {
    // Hide custom cursor on touch devices
    cursor.style.display = 'none';
  }
}

// Particle system for hero
function initParticleSystem() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  
  const particleCount = 30;
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = 15 + Math.random() * 10;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    // Random size
    const size = 2 + Math.random() * 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    particles.push(particle);
  }
}

// 3D Tilt effect with requestAnimationFrame
function init3DTilt() {
  const tiltElements = document.querySelectorAll('.tilt-3d');
  
  tiltElements.forEach(element => {
    let rafId = null;
    
    const updateTilt = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        element.style.transition = 'none';
      });
    };
    
    element.addEventListener('mousemove', updateTilt, { passive: true });
    
    element.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      element.style.transition = 'transform 0.5s ease-out';
    });
  });
}

// Magnetic hover effect with requestAnimationFrame
function initMagneticHover() {
  const magneticElements = document.querySelectorAll('.magnetic-hover');
  
  magneticElements.forEach(element => {
    let rafId = null;
    
    const updateMagnetic = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.3;
        const moveY = y * 0.3;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    element.addEventListener('mousemove', updateMagnetic, { passive: true });
    
    element.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      element.style.transform = 'translate(0, 0)';
    });
  });
}

// Hero animations
function initHeroAnimations() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;
  
  // Animate hero elements on load
  setTimeout(() => {
    const elements = heroContent.querySelectorAll('[data-animate]');
    elements.forEach((el, index) => {
      const delay = parseInt(el.getAttribute('data-delay')) || index * 100;
      setTimeout(() => {
        const animationType = el.getAttribute('data-animate');
        applyAnimation(el, animationType);
      }, delay);
    });
  }, 300);
}
