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
});

// Render services from data
function renderServices() {
  const container = document.getElementById('services-container');
  if (!container || typeof servicesData === 'undefined') return;

  container.innerHTML = servicesData.map(service => `
    <div class="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300">
      <div class="w-16 h-16 mb-6 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
        <i class="${service.icon} text-white text-2xl"></i>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-3">${service.title}</h3>
      <p class="text-gray-600 leading-relaxed mb-4">${service.description}</p>
      <button onclick="openServiceModal('${service.id}')" class="text-blue-900 font-semibold hover:text-blue-800 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
        Learn More
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
