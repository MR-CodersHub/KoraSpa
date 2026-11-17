/**
 * KORA SPA — Visual & Motion Animations
 */

// Parallax scrolling effect for elements marked with [data-parallax]
function initParallax() {
  const elements = document.querySelectorAll('[data-parallax]');
  if (!elements.length) return;

  const updateParallax = () => {
    elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate if visible on screen
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const offset = (windowHeight / 2 - (rect.top + rect.height / 2)) * speed;
        el.style.transform = `translateY(${offset}px)`;
      }
    });
  };

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
}

// Animate numbers from 0 up to target
function animateCounter(el, target, duration = 2000) {
  if (!el) return;
  const targetVal = parseFloat(target) || 0;
  const isDecimal = String(target).includes('.');
  let startTime = null;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    // Ease-out cubic easing
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * targetVal;

    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target; // Ensure exact final value
    }
  };

  requestAnimationFrame(step);
}

// Stagger child elements with animation delay
function staggerItems(selector, delay = 100) {
  const items = document.querySelectorAll(selector);
  items.forEach((el, index) => {
    el.style.animationDelay = `${index * delay}ms`;
    el.classList.add('fade-in-up');
  });
}

// Ripple effect on buttons
function initRippleEffect() {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;
      const rect = this.getBoundingClientRect();

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-effect');

      const existingRipple = this.querySelector('.ripple-effect');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
}

// Auto-run animations on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initRippleEffect();

  // Auto-trigger counters marked with [data-counter]
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target.getAttribute('data-counter');
          animateCounter(entry.target, target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }
});
