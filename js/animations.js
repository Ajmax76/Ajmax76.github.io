// Essential animations only
document.addEventListener('DOMContentLoaded', function() {
  initHoverEffects();
  initScrollProgress();
});

// Enhanced hover effects
function initHoverEffects() {
  // Add hover effects to cards
  const cards = document.querySelectorAll('.skill-card, .service-card, .pricing-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// Scroll progress indicator (kept as it's useful)
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--warm-orange), var(--soft-brown));
    z-index: 1001;
    transition: width 0.1s ease;
  `;
  
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - winHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}