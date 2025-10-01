// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initSmoothScroll();
  initHeaderScroll();
  initMobileMenu();
  initFloatingCTA();
  initPageTransition();
  initScrollAnimations();
});

// Smooth scrolling with offset for fixed header
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if(!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// Header scroll effect
function initHeaderScroll() {
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if(window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if(menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      const isActive = navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if(icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
      menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
  }
}

function closeMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if(navLinks && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    if(menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      const icon = menuToggle.querySelector('i');
      if(icon) { 
        icon.classList.remove('fa-times'); 
        icon.classList.add('fa-bars'); 
      }
    }
  }
}

// Floating CTA functionality
function initFloatingCTA() {
  const ctaFloating = document.querySelector('.cta-floating');
  const ctaMain = ctaFloating && ctaFloating.querySelector('.cta-main');
  
  if(ctaMain && ctaFloating) {
    ctaMain.addEventListener('click', () => {
      ctaFloating.classList.toggle('open');
      const opts = ctaFloating.querySelector('.cta-options');
      if(opts) {
        opts.setAttribute('aria-hidden', ctaFloating.classList.contains('open') ? 'false' : 'true');
      }
    });
  }
}

// Page transition
function initPageTransition() {
  const pageTransition = document.querySelector('.page-transition');
  if(pageTransition) {
    setTimeout(() => {
      pageTransition.style.transition = 'transform 0.5s ease';
      pageTransition.style.transform = 'translateY(-100%)';
      pageTransition.setAttribute('aria-hidden', 'true');
    }, 100);
  }
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
  const observerOptions = { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll(
    '.about-text, .about-image, .skill-card, .portfolio-item, .service-card, .contact-item, .contact-form, .fade-in, .slide-in-left, .slide-in-right, .zoom-in'
  );
  
  animateElements.forEach(el => observer.observe(el));
}